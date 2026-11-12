import { NextResponse } from "next/server";
import { getAdminEmail, getEmailFrom, sendEmail } from "@/lib/email";
import {
  buildEnquiryAdminEmail,
  buildEnquiryClientEmail,
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
    const limit = checkRateLimit("enquiries", clientIp, 10, 10 * 60 * 1000);
    if (!limit.allowed) {
      return NextResponse.json(
        {
          error: `Too many enquiry submissions. Please wait ${limit.retryAfterSeconds} seconds and try again.`,
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      eventType,
      eventDate,
      eventLocation,
      guestCount,
      budgetRange,
      message,
    } = body;

    if (
      !fullName ||
      !String(fullName).trim() ||
      !email ||
      !String(email).trim() ||
      !phone ||
      !String(phone).trim() ||
      !eventType ||
      !String(eventType).trim()
    ) {
      return NextResponse.json(
        {
          error:
            "Missing required fields (fullName, email, phone, eventType are required).",
        },
        { status: 400 }
      );
    }

    const cleanEmail = sanitize(email, 120).toLowerCase();
    if (!EMAIL_REGEX.test(cleanEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address format." },
        { status: 400 }
      );
    }

    const cleanPhoneDigits = String(phone).replace(/\D/g, "");
    if (cleanPhoneDigits.length < 8) {
      return NextResponse.json(
        { error: "Please provide a valid phone number (at least 8 digits)." },
        { status: 400 }
      );
    }

    const cleanEventType = sanitize(eventType, 80);
    const cleanEventDate = sanitize(eventDate || "TBD", 40);

    if (
      isDuplicateSubmission(
        "enquiries",
        [cleanEmail, cleanEventType, cleanEventDate],
        60_000
      )
    ) {
      return NextResponse.json(
        {
          error:
            "This enquiry was just submitted. Please wait a minute before sending another identical enquiry.",
        },
        { status: 409 }
      );
    }

    const enquiry = {
      id: `enq-${Date.now().toString(36).toUpperCase()}`,
      fullName: sanitize(fullName, 100),
      email: cleanEmail,
      phone: sanitize(phone, 30),
      eventType: cleanEventType,
      eventDate: cleanEventDate,
      eventLocation: sanitize(eventLocation || "Lagos, Nigeria", 100),
      guestCount: sanitize(guestCount || "Not specified", 40),
      budgetRange: sanitize(budgetRange || "Not specified", 50),
      message: message ? sanitize(message, 1000) : undefined,
      status: "New",
      createdAt: new Date().toISOString(),
    };

    // 1. Save enquiry to Supabase first
    let savedToDatabase = false;
    const supabase = getSupabase();
    if (supabase) {
      try {
        const { error: dbErr } = await supabase.from("enquiries").upsert({
          id: enquiry.id,
          full_name: enquiry.fullName,
          email: enquiry.email,
          phone: enquiry.phone,
          event_type: enquiry.eventType,
          event_date: enquiry.eventDate,
          event_location: enquiry.eventLocation,
          guest_count: enquiry.guestCount,
          budget_range: enquiry.budgetRange,
          message: enquiry.message || "",
          status: enquiry.status,
          created_at: enquiry.createdAt,
        });
        if (!dbErr) {
          savedToDatabase = true;
        } else {
          console.warn("Supabase enquiry upsert notice:", dbErr.message);
        }
      } catch (err) {
        console.warn("Supabase enquiry sync skipped:", err);
      }
    }

    // 2. Dispatch client confirmation & admin notification via Resend
    const adminEmail = getAdminEmail();
    const sender = getEmailFrom();
    const clientTemplate = buildEnquiryClientEmail(enquiry, adminEmail);
    const adminTemplate = buildEnquiryAdminEmail(enquiry, adminEmail);

    const [clientOutcome, adminOutcome] = await Promise.allSettled([
      sendEmail({
        to: enquiry.email,
        from: sender,
        replyTo: adminEmail,
        subject: clientTemplate.subject,
        html: clientTemplate.html,
        text: clientTemplate.text,
      }),
      sendEmail({
        to: adminEmail,
        from: sender,
        replyTo: enquiry.email,
        subject: adminTemplate.subject,
        html: adminTemplate.html,
        text: adminTemplate.text,
      }),
    ]);

    const clientRes =
      clientOutcome.status === "fulfilled"
        ? clientOutcome.value
        : { success: false, messageId: undefined };
    const adminRes =
      adminOutcome.status === "fulfilled"
        ? adminOutcome.value
        : { success: false, messageId: undefined };

    return NextResponse.json(
      {
        success: true,
        enquiry,
        savedToDatabase,
        clientEmailDelivered: clientRes.success,
        adminEmailDelivered: adminRes.success,
        clientMessageId: clientRes.messageId || null,
        adminMessageId: adminRes.messageId || null,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Enquiry API error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process enquiry" },
      { status: 500 }
    );
  }
}
