import { NextResponse } from "next/server";
import { getAdminEmail, getEmailFrom, sendEmail } from "@/lib/email";
import {
  buildGiftRequestAdminEmail,
  buildGiftRequestClientEmail,
} from "@/lib/emailTemplates";
import { checkRateLimit, getClientIp, isDuplicateSubmission } from "@/lib/rateLimit";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

function sanitize(val: unknown, maxLen = 500): string {
  if (typeof val !== "string") return "";
  return val.trim().slice(0, maxLen).replace(/[<>]/g, "");
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const limit = checkRateLimit("gift-requests", clientIp, 10, 10 * 60 * 1000);
    if (!limit.allowed) {
      return NextResponse.json(
        {
          error: `Too many requests. Please wait ${limit.retryAfterSeconds} seconds before trying again.`,
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      recipientName,
      occasion,
      budget,
      itemsRequested,
      deliveryDate,
      deliveryAddress,
      personalMessage,
    } = body;

    if (
      !fullName ||
      !String(fullName).trim() ||
      !phone ||
      !String(phone).trim() ||
      !occasion ||
      !String(occasion).trim() ||
      !budget ||
      !String(budget).trim()
    ) {
      return NextResponse.json(
        { error: "Please provide your full name, phone number, occasion, and target budget." },
        { status: 400 }
      );
    }

    const cleanPhoneDigits = String(phone).replace(/\D/g, "");
    if (cleanPhoneDigits.length < 8) {
      return NextResponse.json(
        { error: "Please provide a valid WhatsApp / phone number (at least 8 digits)." },
        { status: 400 }
      );
    }

    const cleanEmail = email ? sanitize(email, 120).toLowerCase() : "";
    if (cleanEmail && !EMAIL_REGEX.test(cleanEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address or leave it blank." },
        { status: 400 }
      );
    }

    const cleanOccasion = sanitize(occasion, 120);
    const cleanBudget = sanitize(budget, 80);

    if (
      isDuplicateSubmission(
        "gift-requests",
        [cleanPhoneDigits, cleanOccasion, cleanBudget],
        60_000
      )
    ) {
      return NextResponse.json(
        {
          error:
            "This custom gift request was just received. Please wait a moment before submitting again.",
        },
        { status: 409 }
      );
    }

    const giftRequest = {
      id: `gft-${Date.now().toString(36).toUpperCase()}`,
      fullName: sanitize(fullName, 100),
      email: cleanEmail,
      phone: sanitize(phone, 30),
      recipientName: sanitize(recipientName, 100),
      occasion: cleanOccasion,
      budget: cleanBudget,
      itemsRequested: sanitize(itemsRequested, 800),
      deliveryDate: sanitize(deliveryDate, 40),
      deliveryAddress: sanitize(deliveryAddress, 250),
      personalMessage: sanitize(personalMessage, 500),
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    // 1. Save to Supabase gift_requests table first
    let savedToDatabase = false;
    const supabase = getSupabase();
    if (supabase) {
      try {
        const { error: dbErr } = await supabase.from("gift_requests").upsert({
          id: giftRequest.id,
          full_name: giftRequest.fullName,
          email: giftRequest.email || "",
          phone: giftRequest.phone,
          recipient_name: giftRequest.recipientName || "",
          occasion: giftRequest.occasion,
          budget: giftRequest.budget,
          items_requested: giftRequest.itemsRequested || "",
          delivery_date: giftRequest.deliveryDate || "",
          delivery_address: giftRequest.deliveryAddress || "",
          personal_message: giftRequest.personalMessage || "",
          status: giftRequest.status,
          created_at: giftRequest.createdAt,
        });
        if (!dbErr) {
          savedToDatabase = true;
        } else {
          console.warn("Supabase gift_requests upsert notice:", dbErr.message);
        }
      } catch (err) {
        console.warn("Supabase gift request sync skipped:", err);
      }
    }

    // 2. Dispatch admin notification and optional customer confirmation
    const adminEmail = getAdminEmail();
    const sender = getEmailFrom();
    const adminTemplate = buildGiftRequestAdminEmail(giftRequest, adminEmail);

    const adminPromise = sendEmail({
      to: adminEmail,
      from: sender,
      replyTo: cleanEmail || adminEmail,
      subject: adminTemplate.subject,
      html: adminTemplate.html,
      text: adminTemplate.text,
    });

    const clientPromise = cleanEmail
      ? (() => {
          const clientTemplate = buildGiftRequestClientEmail(giftRequest, adminEmail);
          return sendEmail({
            to: cleanEmail,
            from: sender,
            replyTo: adminEmail,
            subject: clientTemplate.subject,
            html: clientTemplate.html,
            text: clientTemplate.text,
          });
        })()
      : Promise.resolve({ success: false, messageId: undefined });

    const [adminOutcome, clientOutcome] = await Promise.allSettled([
      adminPromise,
      clientPromise,
    ]);

    const adminRes =
      adminOutcome.status === "fulfilled"
        ? adminOutcome.value
        : { success: false, messageId: undefined };
    const clientRes =
      clientOutcome.status === "fulfilled"
        ? clientOutcome.value
        : { success: false, messageId: undefined };

    return NextResponse.json(
      {
        success: true,
        giftRequest,
        savedToDatabase,
        adminEmailDelivered: adminRes.success,
        clientEmailDelivered: clientRes.success,
        adminMessageId: adminRes.messageId || null,
        clientMessageId: clientRes.messageId || null,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Gift request API error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process custom gift request" },
      { status: 500 }
    );
  }
}

