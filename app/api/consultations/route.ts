import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { getAdminEmail, getEmailFrom, sendEmail } from "@/lib/email";
import {
  buildConsultationAdminEmail,
  buildConsultationClientEmail,
} from "@/lib/emailTemplates";
import { checkRateLimit, getClientIp, isDuplicateSubmission } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

function sanitize(input: unknown, maxLen = 300): string {
  if (typeof input !== "string") return "";
  return input.trim().slice(0, maxLen).replace(/[<>]/g, "");
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const clientIp = getClientIp(req);
    const limit = checkRateLimit("consultations", clientIp, 10, 10 * 60 * 1000);
    if (!limit.allowed) {
      return NextResponse.json(
        {
          error: `Too many booking attempts. Please wait ${limit.retryAfterSeconds} seconds and try again.`,
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { fullName, email, phone, eventType, date, timeSlot, message } = body;

    if (
      !fullName ||
      !String(fullName).trim() ||
      !email ||
      !String(email).trim() ||
      !phone ||
      !String(phone).trim() ||
      !eventType ||
      !String(eventType).trim() ||
      !date ||
      !String(date).trim() ||
      !timeSlot ||
      !String(timeSlot).trim()
    ) {
      return NextResponse.json(
        {
          error:
            "Missing required booking details (fullName, email, phone, eventType, date, and timeSlot are required).",
        },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase().slice(0, 120);
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

    const cleanDate = sanitize(date, 20);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(cleanDate)) {
      return NextResponse.json(
        { error: "Please provide a valid consultation date (YYYY-MM-DD)." },
        { status: 400 }
      );
    }

    const parsedDate = new Date(`${cleanDate}T00:00:00Z`);
    if (Number.isNaN(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== cleanDate) {
      return NextResponse.json({ error: "Invalid consultation date." }, { status: 400 });
    }

    const todayLagos = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Lagos" }).format(
      new Date()
    );
    if (cleanDate < todayLagos) {
      return NextResponse.json(
        { error: "Past dates cannot be booked. Please select an upcoming date." },
        { status: 400 }
      );
    }

    if (parsedDate.getUTCDay() === 0) {
      return NextResponse.json(
        {
          error:
            "Consultations are closed on Sundays. Please select a date Monday through Saturday.",
        },
        { status: 400 }
      );
    }

    const cleanTimeSlot = sanitize(timeSlot, 20);

    if (isDuplicateSubmission("consultations", [cleanEmail, cleanDate, cleanTimeSlot], 60_000)) {
      return NextResponse.json(
        {
          error:
            "A consultation request for this exact date and time slot was just submitted. Please check your confirmation or choose another slot.",
        },
        { status: 409 }
      );
    }

    const bookingId =
      typeof body.id === "string" && body.id.trim()
        ? sanitize(body.id, 40)
        : `cst-${Date.now().toString(36).toUpperCase()}`;
    const createdAt =
      typeof body.createdAt === "string" && body.createdAt.trim()
        ? body.createdAt
        : new Date().toISOString();

    const booking = {
      id: bookingId,
      fullName: sanitize(fullName, 100),
      email: cleanEmail,
      phone: sanitize(phone, 30),
      eventType: sanitize(eventType || "Event Planning", 80),
      date: cleanDate,
      timeSlot: cleanTimeSlot,
      message: message ? sanitize(message, 1000) : undefined,
      status: "Confirmed",
      createdAt,
    };

    // 1. Check Supabase slot availability and save booking BEFORE dispatching emails
    let savedToDatabase = false;
    const supabase = getSupabase();
    if (supabase) {
      try {
        const { data: existingSlot } = await supabase
          .from("consultations")
          .select("id")
          .eq("consultation_date", booking.date)
          .eq("time_slot", booking.timeSlot)
          .neq("status", "Cancelled")
          .limit(1);

        if (Array.isArray(existingSlot) && existingSlot.length > 0) {
          return NextResponse.json(
            {
              error: `The ${booking.timeSlot} slot on ${booking.date} is already reserved. Please select another time slot.`,
            },
            { status: 409 }
          );
        }

        const { error: upsertErr } = await supabase.from("consultations").upsert({
          id: booking.id,
          full_name: booking.fullName,
          email: booking.email,
          phone: booking.phone,
          event_type: booking.eventType,
          consultation_date: booking.date,
          time_slot: booking.timeSlot,
          message: booking.message || "",
          status: booking.status,
          created_at: booking.createdAt,
        });

        if (!upsertErr) {
          savedToDatabase = true;
        } else {
          console.warn("Supabase consultation upsert notice:", upsertErr.message);
        }
      } catch (err) {
        console.warn("Supabase consultation sync warning:", err);
      }
    }

    // 2. Dispatch confirmation to customer & notification to admin via Resend
    const adminEmail = getAdminEmail();
    const sender = getEmailFrom();
    const clientTemplate = buildConsultationClientEmail(booking, adminEmail);
    const adminTemplate = buildConsultationAdminEmail(booking, adminEmail);

    const [clientOutcome, adminOutcome] = await Promise.allSettled([
      sendEmail({
        to: booking.email,
        from: sender,
        replyTo: adminEmail,
        subject: clientTemplate.subject,
        html: clientTemplate.html,
        text: clientTemplate.text,
      }),
      sendEmail({
        to: adminEmail,
        from: sender,
        replyTo: booking.email,
        subject: adminTemplate.subject,
        html: adminTemplate.html,
        text: adminTemplate.text,
      }),
    ]);

    const clientRes =
      clientOutcome.status === "fulfilled"
        ? clientOutcome.value
        : { success: false, provider: "resend", error: "Client email dispatch error" };
    const adminRes =
      adminOutcome.status === "fulfilled"
        ? adminOutcome.value
        : { success: false, provider: "resend", error: "Admin email dispatch error" };

    return NextResponse.json(
      {
        success: true,
        booking,
        savedToDatabase,
        clientEmailDelivered: clientRes.success,
        adminEmailDelivered: adminRes.success,
        clientMessageId: clientRes.messageId || null,
        adminMessageId: adminRes.messageId || null,
        emailWarning:
          !clientRes.success || !adminRes.success
            ? "Your appointment is saved, though automated email confirmation could not be sent right now."
            : null,
        message: clientRes.success
          ? `Consultation booked and confirmation sent to ${booking.email}.`
          : "Consultation slot recorded.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Consultation booking API error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process consultation booking" },
      { status: 500 }
    );
  }
}
