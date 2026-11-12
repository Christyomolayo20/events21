const WEBSITE_URL = "https://events21.com";
const STUDIO_ADDRESS = "No 12, Johnson Estate, Ojodu Berger, Lagos, Nigeria";
const STUDIO_PHONE = "+234 806 054 9596";
const STUDIO_WHATSAPP = "2348060549596";

export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface DetailRow {
  label: string;
  value: string;
  highlight?: boolean;
}

function renderEmailShell({
  preheader,
  eyebrow,
  title,
  badge,
  badgeColor = "#6E35A5",
  greeting,
  intro,
  rows,
  noteTitle,
  noteBody,
  ctaLabel,
  ctaHref,
  ctaColor = "#30213A",
  footerEmail,
  isAdmin = false,
}: {
  preheader: string;
  eyebrow: string;
  title: string;
  badge?: string;
  badgeColor?: string;
  greeting: string;
  intro: string;
  rows: DetailRow[];
  noteTitle?: string;
  noteBody?: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaColor?: string;
  footerEmail: string;
  isAdmin?: boolean;
}) {
  const rowsHtml = rows
    .filter((r) => r.value)
    .map(
      (r) => `
      <tr>
        <td style="padding:10px 14px;border-bottom:1px solid #EAE5DF;color:#6B5B73;font-size:13px;font-weight:600;width:38%;vertical-align:top;">
          ${escapeHtml(r.label)}
        </td>
        <td style="padding:10px 14px;border-bottom:1px solid #EAE5DF;color:${
          r.highlight ? "#6E35A5" : "#30213A"
        };font-size:13px;font-weight:600;text-align:right;vertical-align:top;word-break:break-word;">
          ${escapeHtml(r.value)}
        </td>
      </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)} | Events 21</title>
</head>
<body style="margin:0;padding:0;background-color:#F8F6F4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#30213A;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#F8F6F4;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background-color:#FFFFFF;border:1px solid #EAE5DF;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="background:linear-gradient(135deg,#211628 0%,#30213A 100%);padding:30px 28px;text-align:center;">
              <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#C5A059;font-weight:700;">
                ${escapeHtml(eyebrow)}
              </p>
              <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.25;color:#FFFFFF;font-weight:700;">
                Events 21
              </h1>
              <p style="margin:6px 0 0;font-size:12px;color:#E5CF92;letter-spacing:0.06em;">
                ${escapeHtml(title)}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 26px;">
              ${
                badge
                  ? `<div style="display:inline-block;padding:6px 14px;border-radius:999px;background-color:${badgeColor};color:#FFFFFF;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:18px;">
                      ${escapeHtml(badge)}
                    </div>`
                  : ""
              }
              <p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#30213A;">
                ${greeting}
              </p>
              <p style="margin:0 0 20px;font-size:14px;line-height:1.65;color:#4E3D58;">
                ${intro}
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#FFFCF8;border:1px solid #EAE5DF;border-radius:12px;border-collapse:separate;margin:0 0 20px;">
                ${rowsHtml}
              </table>
              ${
                noteBody
                  ? `<div style="background-color:#FFF9ED;border-left:4px solid #C5A059;padding:14px 16px;border-radius:6px;margin:0 0 20px;font-size:13px;line-height:1.55;color:#4E3D58;">
                      ${noteTitle ? `<strong style="color:#30213A;display:block;margin-bottom:4px;">${escapeHtml(noteTitle)}</strong>` : ""}
                      ${escapeHtml(noteBody)}
                    </div>`
                  : ""
              }
              ${
                ctaLabel && ctaHref
                  ? `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:8px;">
                      <tr>
                        <td align="center">
                          <a href="${escapeHtml(ctaHref)}" style="display:inline-block;padding:12px 26px;background-color:${ctaColor};color:#FFFFFF;text-decoration:none;border-radius:999px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">
                            ${escapeHtml(ctaLabel)}
                          </a>
                        </td>
                      </tr>
                    </table>`
                  : ""
              }
            </td>
          </tr>
          <tr>
            <td style="background-color:#FAF7F4;padding:20px 26px;border-top:1px solid #EAE5DF;text-align:center;font-size:12px;line-height:1.6;color:#6B5B73;">
              <p style="margin:0 0 4px;font-weight:700;color:#30213A;">Events 21 — All Your Event Needs</p>
              ${
                isAdmin
                  ? `<p style="margin:0 0 4px;">Automated Notification Gateway • <a href="${WEBSITE_URL}/admin" style="color:#6E35A5;text-decoration:underline;">Open Admin Portal</a></p>`
                  : `<p style="margin:0 0 4px;">${escapeHtml(STUDIO_ADDRESS)}</p>`
              }
              <p style="margin:0;">
                Website: <a href="${WEBSITE_URL}" style="color:#6E35A5;text-decoration:underline;">${WEBSITE_URL}</a> |
                Email: <a href="mailto:${escapeHtml(footerEmail)}" style="color:#6E35A5;text-decoration:underline;">${escapeHtml(footerEmail)}</a> |
                Phone: ${escapeHtml(STUDIO_PHONE)}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// 1. Academy Application Templates
export function buildAcademyApplicantEmail(
  reg: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    experienceLevel: string;
    businessName?: string;
    reasonForJoining?: string;
    createdAt: string;
  },
  adminEmail: string
) {
  const subject = `Application Received: Events21 Planners Academy (#${reg.id})`;
  const html = renderEmailShell({
    preheader: `Your Events21 Planners Academy application (#${reg.id}) has been received.`,
    eyebrow: "Events21 Planners Academy",
    title: "Application Confirmation",
    badge: "Application Received",
    badgeColor: "#6E35A5",
    greeting: `Dear <strong>${escapeHtml(reg.fullName)}</strong>,`,
    intro:
      "Thank you for applying to <strong>Events21 Planners Academy</strong>. We have received your application details and our admissions team will review your submission shortly.",
    rows: [
      { label: "Application Reference", value: `#${reg.id}`, highlight: true },
      { label: "Applicant Name", value: reg.fullName },
      { label: "Email Address", value: reg.email },
      { label: "Phone Number", value: reg.phone },
      { label: "Selected Programme / Level", value: reg.experienceLevel },
      { label: "Brand / Business", value: reg.businessName || "Not specified" },
      { label: "Goals & Notes", value: reg.reasonForJoining || "Not specified" },
      { label: "Submitted At", value: new Date(reg.createdAt).toUTCString() },
    ],
    noteTitle: "Next Steps",
    noteBody:
      "Our academy coordinator will contact you via email or WhatsApp regarding upcoming cohort dates, tuition details, and onboarding.",
    ctaLabel: "Visit Events 21 Academy",
    ctaHref: `${WEBSITE_URL}/services/events21-planners-academy`,
    footerEmail: adminEmail,
  });

  const text = `Events 21 — Events21 Planners Academy Application Confirmation\nReference: #${reg.id}\nApplicant: ${reg.fullName}\nProgramme / Experience Level: ${reg.experienceLevel}\nEmail: ${reg.email}\nPhone: ${reg.phone}\nWebsite: ${WEBSITE_URL}`;
  return { subject, html, text };
}

export function buildAcademyAdminEmail(
  reg: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    experienceLevel: string;
    businessName?: string;
    reasonForJoining?: string;
    createdAt: string;
  },
  adminEmail: string
) {
  const subject = `New Academy Application: ${reg.fullName} (#${reg.id})`;
  const html = renderEmailShell({
    preheader: `New Events21 Planners Academy application from ${reg.fullName}.`,
    eyebrow: "Events21 Admissions Alert",
    title: "New Academy Application",
    badge: "Action Required",
    badgeColor: "#30213A",
    greeting: "Hello Events 21 Admissions Team,",
    intro:
      "A prospective student has submitted a new application to <strong>Events21 Planners Academy</strong> via events21.com.",
    rows: [
      { label: "Application Reference", value: `#${reg.id}`, highlight: true },
      { label: "Applicant Name", value: reg.fullName },
      { label: "Email Address", value: reg.email },
      { label: "Phone / WhatsApp", value: reg.phone },
      { label: "Selected Programme / Level", value: reg.experienceLevel },
      { label: "Business / Brand Name", value: reg.businessName || "None provided" },
      { label: "Statement / Reason", value: reg.reasonForJoining || "None provided" },
      { label: "Submitted At", value: new Date(reg.createdAt).toUTCString() },
    ],
    ctaLabel: "Open Admin Control Room",
    ctaHref: `${WEBSITE_URL}/admin`,
    footerEmail: adminEmail,
    isAdmin: true,
  });

  const text = `New Events21 Planners Academy Application (#${reg.id})\nName: ${reg.fullName}\nEmail: ${reg.email}\nPhone: ${reg.phone}\nProgramme: ${reg.experienceLevel}\nBrand: ${reg.businessName || "-"}\nReason: ${reg.reasonForJoining || "-"}\nAdmin: ${WEBSITE_URL}/admin`;
  return { subject, html, text };
}

// 2. Consultation & Appointment Booking Templates
export function buildConsultationClientEmail(
  booking: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    eventType: string;
    date: string;
    timeSlot: string;
    message?: string;
  },
  adminEmail: string
) {
  const subject = `Appointment Confirmed: Your Events 21 Consultation (#${booking.id})`;
  const html = renderEmailShell({
    preheader: `Your Events 21 consultation on ${booking.date} at ${booking.timeSlot} is confirmed.`,
    eyebrow: "Appointment Confirmation",
    title: "Consultation Booking Confirmed",
    badge: "Confirmed",
    badgeColor: "#15803D",
    greeting: `Dear <strong>${escapeHtml(booking.fullName)}</strong>,`,
    intro:
      "Thank you for booking an appointment with <strong>Events 21</strong>. Your consultation slot has been scheduled with the details below.",
    rows: [
      { label: "Booking Reference", value: `#${booking.id}`, highlight: true },
      { label: "Event Category", value: booking.eventType },
      { label: "Appointment Date", value: booking.date },
      { label: "Time Slot", value: booking.timeSlot },
      { label: "Phone Number", value: booking.phone },
      { label: "Client Email", value: booking.email },
      { label: "Notes / Brief", value: booking.message || "None provided" },
    ],
    noteTitle: "Preparing for Your Session",
    noteBody:
      "Please keep your preferred event dates, venue preferences, or estimated guest count handy. If you need to reschedule, reply to this email or message us on WhatsApp.",
    ctaLabel: "Chat on WhatsApp",
    ctaHref: `https://wa.me/${STUDIO_WHATSAPP}?text=${encodeURIComponent(
      `Hello Events 21, following up on my consultation appointment (Ref: #${booking.id}).`
    )}`,
    ctaColor: "#25D366",
    footerEmail: adminEmail,
  });

  const text = `Events 21 — Consultation Confirmed (#${booking.id})\nClient: ${booking.fullName}\nCategory: ${booking.eventType}\nDate: ${booking.date}\nTime: ${booking.timeSlot}\nPhone: ${booking.phone}\nWebsite: ${WEBSITE_URL}`;
  return { subject, html, text };
}

export function buildConsultationAdminEmail(
  booking: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    eventType: string;
    date: string;
    timeSlot: string;
    message?: string;
    createdAt: string;
  },
  adminEmail: string
) {
  const subject = `New Consultation Booking: ${booking.fullName} — ${booking.date} (${booking.timeSlot})`;
  const html = renderEmailShell({
    preheader: `New appointment booked by ${booking.fullName} for ${booking.date} at ${booking.timeSlot}.`,
    eyebrow: "Booking Notification",
    title: "New Consultation & Appointment",
    badge: "New Booking",
    badgeColor: "#30213A",
    greeting: "Hello Events 21 Team,",
    intro:
      "A client has booked an appointment and consultation slot through the website.",
    rows: [
      { label: "Booking Reference", value: `#${booking.id}`, highlight: true },
      { label: "Client Name", value: booking.fullName },
      { label: "Email Address", value: booking.email },
      { label: "Phone / WhatsApp", value: booking.phone },
      { label: "Appointment Date", value: booking.date, highlight: true },
      { label: "Time Slot", value: booking.timeSlot, highlight: true },
      { label: "Event Category", value: booking.eventType },
      { label: "Client Notes", value: booking.message || "None provided" },
      { label: "Booked At", value: new Date(booking.createdAt).toUTCString() },
    ],
    ctaLabel: "Manage Appointment in Admin",
    ctaHref: `${WEBSITE_URL}/admin`,
    footerEmail: adminEmail,
    isAdmin: true,
  });

  const text = `New Consultation Booked (#${booking.id})\nClient: ${booking.fullName}\nEmail: ${booking.email}\nPhone: ${booking.phone}\nDate: ${booking.date}\nTime: ${booking.timeSlot}\nCategory: ${booking.eventType}\nNotes: ${booking.message || "-"}\nAdmin: ${WEBSITE_URL}/admin`;
  return { subject, html, text };
}

// 3. Consultation Status Update Templates
export function buildConsultationStatusClientEmail(
  booking: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    eventType: string;
    date: string;
    timeSlot: string;
    status: string;
    note?: string;
  },
  adminEmail: string
) {
  let badgeColor = "#30213A";
  let summary = `Your consultation status has been updated to ${booking.status}.`;
  if (booking.status === "Confirmed") {
    badgeColor = "#15803D";
    summary = "Your consultation appointment is confirmed. Our team looks forward to speaking with you.";
  } else if (booking.status === "Completed") {
    badgeColor = "#2563EB";
    summary = "Thank you for meeting with Events 21. It was a pleasure discussing your upcoming celebration.";
  } else if (booking.status === "Cancelled") {
    badgeColor = "#DC2626";
    summary = "Your consultation appointment has been cancelled. You are welcome to book another convenient date anytime.";
  }

  const subject = `Appointment Status Update (${booking.status}): Events 21 (#${booking.id})`;
  const html = renderEmailShell({
    preheader: `Your Events 21 consultation (#${booking.id}) status is now ${booking.status}.`,
    eyebrow: "Consultation Update",
    title: "Appointment Status Changed",
    badge: booking.status,
    badgeColor,
    greeting: `Dear <strong>${escapeHtml(booking.fullName)}</strong>,`,
    intro: escapeHtml(summary),
    rows: [
      { label: "Booking Reference", value: `#${booking.id}`, highlight: true },
      { label: "Event Category", value: booking.eventType },
      { label: "Appointment Date", value: booking.date },
      { label: "Time Slot", value: booking.timeSlot },
      { label: "Updated Status", value: booking.status, highlight: true },
      { label: "Notes", value: booking.note || "" },
    ],
    ctaLabel: "Visit Events 21",
    ctaHref: `${WEBSITE_URL}/contact`,
    footerEmail: adminEmail,
  });

  const text = `Events 21 — Consultation Status Update (#${booking.id})\nClient: ${booking.fullName}\nStatus: ${booking.status}\nDate: ${booking.date} at ${booking.timeSlot}\nWebsite: ${WEBSITE_URL}`;
  return { subject, html, text };
}

export function buildConsultationStatusAdminEmail(
  booking: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    eventType: string;
    date: string;
    timeSlot: string;
    status: string;
  },
  adminEmail: string
) {
  const subject = `Appointment Status Updated: ${booking.fullName} (#${booking.id}) -> ${booking.status}`;
  const html = renderEmailShell({
    preheader: `Appointment #${booking.id} status changed to ${booking.status}.`,
    eyebrow: "Admin Audit Notice",
    title: "Consultation Status Updated",
    badge: booking.status,
    badgeColor: "#30213A",
    greeting: "Hello Events 21 Admin,",
    intro: `The consultation record for <strong>${escapeHtml(booking.fullName)}</strong> has been updated.`,
    rows: [
      { label: "Booking Reference", value: `#${booking.id}`, highlight: true },
      { label: "Client Name", value: booking.fullName },
      { label: "Client Email", value: booking.email },
      { label: "Phone", value: booking.phone },
      { label: "Date & Time", value: `${booking.date} (${booking.timeSlot})` },
      { label: "New Status", value: booking.status, highlight: true },
    ],
    ctaLabel: "Open Admin Portal",
    ctaHref: `${WEBSITE_URL}/admin`,
    footerEmail: adminEmail,
    isAdmin: true,
  });

  const text = `Consultation #${booking.id} (${booking.fullName}) status updated to ${booking.status}. Date: ${booking.date} ${booking.timeSlot}.`;
  return { subject, html, text };
}

// 4. Event / Contact Enquiry Templates
export function buildEnquiryClientEmail(
  enquiry: {
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
  },
  adminEmail: string
) {
  const subject = `Enquiry Received: ${enquiry.eventType} — Events 21 (#${enquiry.id})`;
  const html = renderEmailShell({
    preheader: `We have received your ${enquiry.eventType} enquiry (#${enquiry.id}).`,
    eyebrow: "Event Enquiry Confirmation",
    title: "Enquiry Received",
    badge: "Received",
    badgeColor: "#6E35A5",
    greeting: `Dear <strong>${escapeHtml(enquiry.fullName)}</strong>,`,
    intro:
      "Thank you for contacting <strong>Events 21</strong>. Our planning team has received your enquiry and will review your details shortly.",
    rows: [
      { label: "Enquiry Reference", value: `#${enquiry.id}`, highlight: true },
      { label: "Event Category", value: enquiry.eventType },
      { label: "Event Date", value: enquiry.eventDate },
      { label: "Location / City", value: enquiry.eventLocation },
      { label: "Estimated Guests", value: enquiry.guestCount },
      { label: "Estimated Budget", value: enquiry.budgetRange },
      { label: "Your Message", value: enquiry.message || "None provided" },
    ],
    noteTitle: "Response Time",
    noteBody:
      "Our studio responds within 24 to 48 business hours. For urgent enquiries, connect with us directly on WhatsApp.",
    ctaLabel: "Message Us on WhatsApp",
    ctaHref: `https://wa.me/${STUDIO_WHATSAPP}?text=${encodeURIComponent(
      `Hello Events 21, following up on my event enquiry (Ref: #${enquiry.id}).`
    )}`,
    ctaColor: "#25D366",
    footerEmail: adminEmail,
  });

  const text = `Events 21 — Enquiry Received (#${enquiry.id})\nCategory: ${enquiry.eventType}\nDate: ${enquiry.eventDate}\nLocation: ${enquiry.eventLocation}\nWebsite: ${WEBSITE_URL}`;
  return { subject, html, text };
}

export function buildEnquiryAdminEmail(
  enquiry: {
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
  },
  adminEmail: string
) {
  const subject = `New Event Enquiry: ${enquiry.fullName} — ${enquiry.eventType} (#${enquiry.id})`;
  const html = renderEmailShell({
    preheader: `New ${enquiry.eventType} enquiry from ${enquiry.fullName}.`,
    eyebrow: "Website Lead Notification",
    title: "New Event / Contact Enquiry",
    badge: "New Enquiry",
    badgeColor: "#30213A",
    greeting: "Hello Events 21 Team,",
    intro: "A visitor has submitted an event enquiry via events21.com.",
    rows: [
      { label: "Enquiry Reference", value: `#${enquiry.id}`, highlight: true },
      { label: "Client Name", value: enquiry.fullName },
      { label: "Email Address", value: enquiry.email },
      { label: "Phone / WhatsApp", value: enquiry.phone },
      { label: "Event Type", value: enquiry.eventType },
      { label: "Estimated Date", value: enquiry.eventDate },
      { label: "Location", value: enquiry.eventLocation },
      { label: "Estimated Guests", value: enquiry.guestCount },
      { label: "Estimated Budget", value: enquiry.budgetRange },
      { label: "Brief / Message", value: enquiry.message || "None provided" },
      { label: "Submitted At", value: new Date(enquiry.createdAt).toUTCString() },
    ],
    ctaLabel: "Open Admin Control Room",
    ctaHref: `${WEBSITE_URL}/admin`,
    footerEmail: adminEmail,
    isAdmin: true,
  });

  const text = `New Event Enquiry (#${enquiry.id})\nClient: ${enquiry.fullName}\nEmail: ${enquiry.email}\nPhone: ${enquiry.phone}\nEvent: ${enquiry.eventType}\nDate: ${enquiry.eventDate}\nLocation: ${enquiry.eventLocation}\nBudget: ${enquiry.budgetRange}\nAdmin: ${WEBSITE_URL}/admin`;
  return { subject, html, text };
}

// 5. Gifts by Adeola Custom Curation Templates
export function buildGiftRequestClientEmail(
  gift: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    occasion: string;
    budget: string;
    recipientName?: string;
    deliveryDate?: string;
    deliveryAddress?: string;
    itemsRequested?: string;
    personalMessage?: string;
  },
  adminEmail: string
) {
  const subject = `Custom Gift Request Received: Gifts by Adeola (#${gift.id})`;
  const html = renderEmailShell({
    preheader: `We have received your custom curation brief (#${gift.id}).`,
    eyebrow: "Gifts by Adeola • Events 21",
    title: "Custom Gift Request Received",
    badge: "Request Received",
    badgeColor: "#6E35A5",
    greeting: `Dear <strong>${escapeHtml(gift.fullName)}</strong>,`,
    intro:
      "Thank you for submitting your custom gifting brief to <strong>Gifts by Adeola (Events 21)</strong>. Adeola and our curation team will review your requirements and share tailored options within your budget.",
    rows: [
      { label: "Request Reference", value: `#${gift.id}`, highlight: true },
      { label: "Occasion", value: gift.occasion },
      { label: "Target Budget", value: gift.budget },
      { label: "Recipient", value: gift.recipientName || "Not specified" },
      { label: "Delivery Date", value: gift.deliveryDate || "Flexible / TBD" },
      { label: "Delivery Location", value: gift.deliveryAddress || "Not specified" },
      { label: "Requested Items / Brief", value: gift.itemsRequested || "Not specified" },
      { label: "Card Note", value: gift.personalMessage || "" },
    ],
    ctaLabel: "Explore Gifts by Adeola",
    ctaHref: `${WEBSITE_URL}/gifts-by-adeola`,
    footerEmail: adminEmail,
  });

  const text = `Gifts by Adeola (Events 21) — Custom Request Received (#${gift.id})\nOccasion: ${gift.occasion}\nBudget: ${gift.budget}\nWebsite: ${WEBSITE_URL}/gifts-by-adeola`;
  return { subject, html, text };
}

export function buildGiftRequestAdminEmail(
  gift: {
    id: string;
    fullName: string;
    email?: string;
    phone: string;
    occasion: string;
    budget: string;
    recipientName?: string;
    deliveryDate?: string;
    deliveryAddress?: string;
    itemsRequested?: string;
    personalMessage?: string;
    createdAt: string;
  },
  adminEmail: string
) {
  const subject = `New Gift Curation Request: ${gift.fullName} — ${gift.occasion} (#${gift.id})`;
  const html = renderEmailShell({
    preheader: `New Gifts by Adeola custom brief from ${gift.fullName}.`,
    eyebrow: "Gifts by Adeola Notification",
    title: "New Custom Gift Brief",
    badge: "New Brief",
    badgeColor: "#30213A",
    greeting: "Hello Events 21 & Adeola,",
    intro:
      "A customer has submitted a custom gift or Eru Iyawo request on events21.com.",
    rows: [
      { label: "Request Reference", value: `#${gift.id}`, highlight: true },
      { label: "Customer Name", value: gift.fullName },
      { label: "Phone / WhatsApp", value: gift.phone },
      { label: "Email Address", value: gift.email || "Not provided" },
      { label: "Occasion", value: gift.occasion },
      { label: "Target Budget", value: gift.budget, highlight: true },
      { label: "Recipient", value: gift.recipientName || "Not specified" },
      { label: "Delivery Date", value: gift.deliveryDate || "Not specified" },
      { label: "Delivery Address", value: gift.deliveryAddress || "Not specified" },
      { label: "Items / Brief", value: gift.itemsRequested || "Not specified" },
      { label: "Card Message", value: gift.personalMessage || "None" },
      { label: "Submitted At", value: new Date(gift.createdAt).toUTCString() },
    ],
    ctaLabel: "Open Admin Control Room",
    ctaHref: `${WEBSITE_URL}/admin`,
    footerEmail: adminEmail,
    isAdmin: true,
  });

  const text = `New Gift Curation Request (#${gift.id})\nCustomer: ${gift.fullName}\nPhone: ${gift.phone}\nEmail: ${gift.email || "-"}\nOccasion: ${gift.occasion}\nBudget: ${gift.budget}\nAdmin: ${WEBSITE_URL}/admin`;
  return { subject, html, text };
}

// 6. Admin Test Email Template
export function buildAdminTestEmail({
  target,
  sender,
  timestamp,
}: {
  target: string;
  sender: string;
  timestamp: string;
}) {
  const subject = "Events 21 Resend Integration Verification Test";
  const html = renderEmailShell({
    preheader: "Live Resend verification email from Events 21.",
    eyebrow: "System Diagnostics",
    title: "Resend Email Gateway Verification",
    badge: "Live Verification",
    badgeColor: "#15803D",
    greeting: "Hello Events 21 Admin,",
    intro:
      "This message confirms that your <strong>Events 21</strong> server-side Resend integration is dispatching emails cleanly from the configured sender address.",
    rows: [
      { label: "Recipient", value: target, highlight: true },
      { label: "Configured Sender", value: sender },
      { label: "Website", value: WEBSITE_URL },
      { label: "Timestamp (UTC)", value: timestamp },
    ],
    ctaLabel: "Open Events 21 Admin",
    ctaHref: `${WEBSITE_URL}/admin`,
    footerEmail: target,
    isAdmin: true,
  });

  const text = `Events 21 Resend Verification Test\nRecipient: ${target}\nSender: ${sender}\nWebsite: ${WEBSITE_URL}\nTimestamp: ${timestamp}`;
  return { subject, html, text };
}

