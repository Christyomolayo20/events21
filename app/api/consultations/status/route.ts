import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getAdminEmail, getEmailFrom, sendEmail } from "@/lib/email";
import {
  buildConsultationStatusAdminEmail,
  buildConsultationStatusClientEmail,
} from "@/lib/emailTemplates";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const ALLOWED_STATUSES = new Set(["Confirmed", "Completed", "Cancelled", "Pending"]);
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json(
      { error: "Admin authentication required to update consultation status." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { id, status, booking } = body;

    if (!id || !status || !booking || !ALLOWED_STATUSES.has(String(status))) {
      return NextResponse.json(
        { error: "Missing or invalid parameters (id, valid status, booking)." },
        { status: 400 }
      );
    }

    const clientEmail = typeof booking.email === "string" ? booking.email.trim().toLowerCase() : "";
    const clientName = String(booking.fullName || "Valued Client").trim();

    // 1. Update Supabase first so status persistence never depends on email result
    let updatedInDatabase = false;
    const supabase = getSupabase();
    if (supabase) {
      try {
        const { error: updateErr } = await supabase
          .from("consultations")
          .update({ status })
          .eq("id", id);
        if (!updateErr) {
          updatedInDatabase = true;
        }
      } catch (err) {
        console.warn("Supabase status sync error:", err);
      }
    }

    // 2. Dispatch client & admin status notifications via Resend
    const adminEmail = getAdminEmail();
    const sender = getEmailFrom();
    const normalizedBooking = {
      id: String(id),
      fullName: clientName,
      email: clientEmail,
      phone: String(booking.phone || ""),
      eventType: String(booking.eventType || "Event Planning"),
      date: String(booking.date || ""),
      timeSlot: String(booking.timeSlot || ""),
      status: String(status),
      note: typeof booking.note === "string" ? booking.note : undefined,
    };

    const clientTemplate = buildConsultationStatusClientEmail(normalizedBooking, adminEmail);
    const adminTemplate = buildConsultationStatusAdminEmail(normalizedBooking, adminEmail);

    const clientPromise =
      EMAIL_REGEX.test(clientEmail)
        ? sendEmail({
            to: clientEmail,
            from: sender,
            replyTo: adminEmail,
            subject: clientTemplate.subject,
            html: clientTemplate.html,
            text: clientTemplate.text,
          })
        : Promise.resolve({
            success: false,
            provider: "validation",
            error: "Invalid client email",
            messageId: undefined as string | undefined,
          });

    const adminPromise = sendEmail({
      to: adminEmail,
      from: sender,
      replyTo: EMAIL_REGEX.test(clientEmail) ? clientEmail : adminEmail,
      subject: adminTemplate.subject,
      html: adminTemplate.html,
      text: adminTemplate.text,
    });

    const [clientOutcome, adminOutcome] = await Promise.allSettled([clientPromise, adminPromise]);
    const clientRes =
      clientOutcome.status === "fulfilled"
        ? clientOutcome.value
        : { success: false, provider: "resend", messageId: undefined };
    const adminRes =
      adminOutcome.status === "fulfilled"
        ? adminOutcome.value
        : { success: false, provider: "resend", messageId: undefined };

    return NextResponse.json({
      success: true,
      updatedInDatabase,
      clientEmailSent: clientRes.success,
      adminEmailSent: adminRes.success,
      clientProvider: clientRes.provider,
      clientMessageId: clientRes.messageId || null,
      message: clientRes.success
        ? `Status updated to ${status} and confirmation dispatched.`
        : `Status updated to ${status}.`,
    });
  } catch (error: any) {
    console.error("Status update error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update consultation status" },
      { status: 500 }
    );
  }
}
