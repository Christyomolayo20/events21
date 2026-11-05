import { NextResponse } from "next/server";
import { sendEmail, OFFICIAL_EMAIL } from "@/lib/email";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

function buildStatusUpdateEmailHtml(booking: {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  eventType: string;
  date: string;
  timeSlot: string;
  status: string;
  note?: string;
}) {
  let statusBadgeColor = "#2A1736";
  let statusDescription = "";

  switch (booking.status) {
    case "Confirmed":
      statusBadgeColor = "#15803D"; // green
      statusDescription = "Your consultation slot is officially confirmed. Our team is looking forward to connecting with you!";
      break;
    case "Completed":
      statusBadgeColor = "#2563EB"; // blue
      statusDescription = "Thank you for meeting with us! It was a pleasure discussing your vision for your celebration.";
      break;
    case "Cancelled":
      statusBadgeColor = "#DC2626"; // red
      statusDescription = "Your consultation appointment has been cancelled. If you would like to reschedule or choose a different date, please feel free to reach out.";
      break;
    default:
      statusBadgeColor = "#C5A265"; // gold
      statusDescription = `Your consultation status is currently updated to: ${booking.status}.`;
  }

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>EVENTS21 Consultation Update</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #FBF8F5; margin: 0; padding: 24px; color: #2A1736; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #E8DFD5; }
    .header { background: #2A1736; padding: 30px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 24px; color: #C5A265; font-family: 'Playfair Display', Georgia, serif; }
    .header p { margin: 6px 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: #F5EFEB; }
    .content { padding: 32px; }
    .badge { display: inline-block; background-color: ${statusBadgeColor}; color: #ffffff; padding: 6px 14px; border-radius: 999px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px; }
    .details { background: #FAF7F4; border-radius: 12px; border: 1px solid #E8DFD5; padding: 18px 22px; margin: 20px 0; font-size: 14px; }
    .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #ECE4DA; }
    .row:last-child { border-bottom: none; }
    .lbl { color: #6B5B73; font-weight: 500; }
    .val { color: #2A1736; font-weight: 600; text-align: right; }
    .footer { background: #FAF7F4; padding: 20px 30px; text-align: center; border-top: 1px solid #E8DFD5; font-size: 12px; color: #6B5B73; }
    .btn { display: inline-block; background: #25D366; color: #ffffff !important; padding: 11px 24px; border-radius: 999px; text-decoration: none; font-size: 13px; font-weight: 600; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>EVENTS21</h1>
      <p>Appointment Status Update</p>
    </div>
    <div class="content">
      <div class="badge">${booking.status}</div>
      <p style="font-size: 16px; line-height: 1.6; margin-top: 0;">
        Dear <strong>${booking.fullName}</strong>,<br><br>
        ${statusDescription}
      </p>

      <div class="details">
        <div class="row"><span class="lbl">Reference</span><span class="val">#${booking.id}</span></div>
        <div class="row"><span class="lbl">Event Category</span><span class="val">${booking.eventType}</span></div>
        <div class="row"><span class="lbl">Date</span><span class="val">${booking.date}</span></div>
        <div class="row"><span class="lbl">Time Slot</span><span class="val">${booking.timeSlot}</span></div>
        <div class="row"><span class="lbl">Status</span><span class="val" style="color: ${statusBadgeColor};">${booking.status}</span></div>
        ${booking.note ? `<div class="row"><span class="lbl">Notes</span><span class="val">${booking.note}</span></div>` : ""}
      </div>

      <p style="font-size: 14px; line-height: 1.6; color: #2A1736;">
        If you have any questions or would like to adjust your celebration brief, feel free to contact us:
      </p>
      <center>
        <a href="https://wa.me/2348060549596?text=Hello%20Events%2021!%20Inquiring%20about%20my%20appointment%20(Ref:%20${booking.id})" class="btn">
          Chat on WhatsApp
        </a>
      </center>
    </div>
    <div class="footer">
      <p style="margin: 0 0 4px;"><strong>EVENTS21 — All Your Event Needs.</strong></p>
      <p style="margin: 0;">Email: ${OFFICIAL_EMAIL} | Phone: +234 806 054 9596</p>
    </div>
  </div>
</body>
</html>
  `;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, status, booking } = body;

    if (!id || !status || !booking) {
      return NextResponse.json({ error: "Missing required parameters (id, status, booking)." }, { status: 400 });
    }

    const clientEmail = booking.email;
    const clientName = booking.fullName || "Valued Client";

    // 1. Send status update to client
    const clientSubject = `Consultation Status Update: ${status} - EVENTS21 (#${id})`;
    const clientHtml = buildStatusUpdateEmailHtml({ ...booking, id, status });

    const clientRes = await sendEmail({
      to: clientEmail,
      subject: clientSubject,
      html: clientHtml,
    });

    // 2. Send status update alert to admin at Royaltyeventservice@gmail.com
    const adminSubject = `Status Changed: ${clientName} (#${id}) is now "${status}"`;
    const adminHtml = `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2>Consultation Status Updated</h2>
        <p>The status of appointment <strong>#${id}</strong> for <strong>${clientName}</strong> has been updated to: <span style="font-weight: bold; color: #4A1E4A;">${status}</span>.</p>
        <p><strong>Date:</strong> ${booking.date} at ${booking.timeSlot}</p>
        <p><strong>Client Email:</strong> ${clientEmail} | <strong>Phone:</strong> ${booking.phone}</p>
        <p><a href="https://events21.vercel.app/admin">Open Admin Portal</a></p>
      </div>
    `;

    const adminRes = await sendEmail({
      to: OFFICIAL_EMAIL,
      subject: adminSubject,
      html: adminHtml,
    });

    // 3. Update Supabase if available
    const supabase = getSupabase();
    if (supabase) {
      try {
        await supabase.from("consultations").update({ status }).eq("id", id);
      } catch (err) {
        console.warn("Supabase status sync error:", err);
      }
    }

    return NextResponse.json({
      success: true,
      clientEmailSent: clientRes.success,
      adminEmailSent: adminRes.success,
      clientProvider: clientRes.provider,
      message: `Status updated to ${status}. Notification attempted.`,
    });
  } catch (error: any) {
    console.error("Status update error:", error);
    return NextResponse.json({ error: error?.message || "Failed to update consultation status" }, { status: 500 });
  }
}
