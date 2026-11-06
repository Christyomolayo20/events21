import { NextResponse } from "next/server";
import { sendEmail, OFFICIAL_EMAIL, OWNER_EMAIL } from "@/lib/email";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const STUDIO_PHONE = "+234 806 054 9596";
const STUDIO_WHATSAPP = "2348060549596";

function sanitize(val: unknown, maxLen = 500): string {
  if (typeof val !== "string") return "";
  return val.trim().slice(0, maxLen).replace(/[<>]/g, "");
}

function buildClientEnquiryEmailHtml(enquiry: {
  id: string;
  fullName: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
  guestCount: string;
  budgetRange: string;
  message?: string;
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>EVENTS21 Enquiry Received</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #FAF8F5; margin: 0; padding: 24px; color: #2A1736; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #E8DFD5; }
    .header { background: #2A1736; padding: 32px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 24px; color: #C5A265; font-family: 'Playfair Display', Georgia, serif; }
    .header p { margin: 6px 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: #F5EFEB; }
    .content { padding: 32px; }
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
      <p>Celebration Enquiry Received</p>
    </div>
    <div class="content">
      <p style="font-size: 16px; line-height: 1.6; margin-top: 0;">
        Dear <strong>${enquiry.fullName}</strong>,<br><br>
        Thank you for contacting <strong>EVENTS21</strong>. We have received your event brief and our lead planning team is reviewing your vision.
      </p>

      <div class="details">
        <div class="row"><span class="lbl">Reference ID</span><span class="val">#${enquiry.id}</span></div>
        <div class="row"><span class="lbl">Event Category</span><span class="val">${enquiry.eventType}</span></div>
        <div class="row"><span class="lbl">Estimated Date</span><span class="val">${enquiry.eventDate}</span></div>
        <div class="row"><span class="lbl">Location</span><span class="val">${enquiry.eventLocation}</span></div>
        <div class="row"><span class="lbl">Guest Count</span><span class="val">${enquiry.guestCount}</span></div>
        <div class="row"><span class="lbl">Budget Scope</span><span class="val">${enquiry.budgetRange}</span></div>
      </div>

      <p style="font-size: 14px; line-height: 1.6; color: #2A1736;">
        We typically respond within 24–48 business hours with next steps and availability. For immediate inquiries or quick coordination, reach us directly via WhatsApp:
      </p>
      <center>
        <a href="https://wa.me/${STUDIO_WHATSAPP}?text=Hello%20Events%2021,%20following%20up%20on%20my%20event%20enquiry%20(Ref:%20${enquiry.id})" class="btn">
          Chat on WhatsApp
        </a>
      </center>
    </div>
    <div class="footer">
      <p style="margin: 0 0 4px;"><strong>EVENTS21 — All Your Event Needs.</strong></p>
      <p style="margin: 0;">Email: ${OFFICIAL_EMAIL} | Phone: ${STUDIO_PHONE}</p>
    </div>
  </div>
</body>
</html>
  `;
}

function buildAdminEnquiryEmailHtml(enquiry: {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
  guestCount: string;
  budgetRange: string;
  message?: string;
  createdAt: string;
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New Event Enquiry</title>
</head>
<body style="font-family: sans-serif; background-color: #F4F1EA; margin: 0; padding: 20px; color: #2A1736;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #E2D9CF;">
    <div style="background: #2A1736; padding: 24px; color: #ffffff;">
      <h2 style="margin: 0; color: #C5A265; font-size: 20px;">🔔 New Event Enquiry</h2>
      <p style="margin: 6px 0 0; font-size: 12px; color: #E0D3C5;">Events 21 Website Lead</p>
    </div>
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 8px 0; color: #6B5B73; width: 35%;">Reference</td><td style="padding: 8px 0; font-weight: bold;">#${enquiry.id}</td></tr>
        <tr><td style="padding: 8px 0; color: #6B5B73;">Client Name</td><td style="padding: 8px 0; font-weight: bold;">${enquiry.fullName}</td></tr>
        <tr><td style="padding: 8px 0; color: #6B5B73;">Email</td><td style="padding: 8px 0;"><a href="mailto:${enquiry.email}">${enquiry.email}</a></td></tr>
        <tr><td style="padding: 8px 0; color: #6B5B73;">Phone</td><td style="padding: 8px 0;"><a href="tel:${enquiry.phone}">${enquiry.phone}</a></td></tr>
        <tr><td style="padding: 8px 0; color: #6B5B73;">Event Type</td><td style="padding: 8px 0; font-weight: bold; color: #4A1E4A;">${enquiry.eventType}</td></tr>
        <tr><td style="padding: 8px 0; color: #6B5B73;">Event Date</td><td style="padding: 8px 0;">${enquiry.eventDate}</td></tr>
        <tr><td style="padding: 8px 0; color: #6B5B73;">Location</td><td style="padding: 8px 0;">${enquiry.eventLocation}</td></tr>
        <tr><td style="padding: 8px 0; color: #6B5B73;">Guest Count</td><td style="padding: 8px 0;">${enquiry.guestCount}</td></tr>
        <tr><td style="padding: 8px 0; color: #6B5B73;">Budget</td><td style="padding: 8px 0; font-weight: bold;">${enquiry.budgetRange}</td></tr>
        <tr><td style="padding: 8px 0; color: #6B5B73;">Message</td><td style="padding: 8px 0;">${enquiry.message || "None"}</td></tr>
      </table>
      <div style="margin-top: 24px; text-align: center;">
        <a href="https://events21.vercel.app/admin" style="display: inline-block; background: #2A1736; color: #ffffff; padding: 10px 22px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: bold;">
          View in Admin Control Room
        </a>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, eventType, eventDate, eventLocation, guestCount, budgetRange, message } = body;

    if (!fullName || !email || !phone || !eventType) {
      return NextResponse.json({ error: "Missing required fields (fullName, email, phone, eventType are required)." }, { status: 400 });
    }

    const enquiryId = `enq-${Date.now().toString(36).toUpperCase()}`;
    const createdAt = new Date().toISOString();

    const enquiry = {
      id: enquiryId,
      fullName: sanitize(fullName, 100),
      email: sanitize(email, 100).toLowerCase(),
      phone: sanitize(phone, 30),
      eventType: sanitize(eventType, 80),
      eventDate: sanitize(eventDate || "TBD", 40),
      eventLocation: sanitize(eventLocation || "Lagos, Nigeria", 100),
      guestCount: sanitize(guestCount || "Not specified", 40),
      budgetRange: sanitize(budgetRange || "Not specified", 50),
      message: message ? sanitize(message, 1000) : undefined,
      status: "New",
      createdAt,
    };

    // 1. Send receipt email to client
    const clientSubject = `We have received your event enquiry: ${enquiry.eventType} (#${enquiry.id})`;
    const clientHtml = buildClientEnquiryEmailHtml(enquiry);
    const clientEmailPromise = sendEmail({
      to: enquiry.email,
      from: `EVENTS21 <${OFFICIAL_EMAIL}>`,
      replyTo: OFFICIAL_EMAIL,
      subject: clientSubject,
      html: clientHtml,
    });

    // 2. Send notification to admin at [OFFICIAL_EMAIL, OWNER_EMAIL]
    const adminSubject = `🔔 New Event Enquiry: ${enquiry.fullName} - ${enquiry.eventType} (${enquiry.eventDate})`;
    const adminHtml = buildAdminEnquiryEmailHtml(enquiry);
    const adminEmailPromise = sendEmail({
      to: [OFFICIAL_EMAIL, OWNER_EMAIL],
      from: `EVENTS21 Enquiries <${OFFICIAL_EMAIL}>`,
      replyTo: enquiry.email,
      subject: adminSubject,
      html: adminHtml,
    });

    const [clientRes, adminRes] = await Promise.all([clientEmailPromise, adminEmailPromise]);

    // 3. Sync to Supabase in background if available
    const supabase = getSupabase();
    if (supabase) {
      try {
        await supabase.from("enquiries").upsert({
          id: enquiry.id,
          full_name: enquiry.fullName,
          email: enquiry.email,
          phone: enquiry.phone,
          event_type: enquiry.eventType,
          event_date: enquiry.eventDate,
          event_location: enquiry.eventLocation,
          guest_count: enquiry.guestCount,
          budget_range: enquiry.budgetRange,
          message: enquiry.message || null,
          status: enquiry.status,
          created_at: enquiry.createdAt,
        });
      } catch (err) {
        console.warn("Supabase enquiry sync skipped:", err);
      }
    }

    return NextResponse.json({
      success: true,
      enquiry,
      clientEmailDelivered: clientRes.success,
      adminEmailDelivered: adminRes.success,
    });
  } catch (error: any) {
    console.error("Enquiry API error:", error);
    return NextResponse.json({ error: error?.message || "Failed to process enquiry" }, { status: 500 });
  }
}
