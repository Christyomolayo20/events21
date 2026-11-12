import { NextResponse } from "next/server";
import { sendEmail, OFFICIAL_EMAIL } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    target: OFFICIAL_EMAIL,
    configuredProviders: {
      smtp: Boolean(process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS),
      resend: Boolean(process.env.RESEND_API_KEY),
      brevo: Boolean(process.env.BREVO_API_KEY),
    },
  });
}

export async function POST() {
  try {
    const result = await sendEmail({
      to: OFFICIAL_EMAIL,
      subject: "Test Email from EVENTS21 Notification System",
      html: `
        <div style="font-family: sans-serif; padding: 24px; background: #FAF7F4; color: #2A1736; border-radius: 12px;">
          <h2 style="color: #4A1E4A; margin-top: 0;">EVENTS21 Automated Email Test</h2>
          <p>This is a verification test to confirm that automated emails are working correctly for <strong>${OFFICIAL_EMAIL}</strong>.</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          <p><strong>Service:</strong> EVENTS21 Automated Mail Gateway</p>
          <hr style="border: none; border-top: 1px solid #E2D9CF; margin: 20px 0;" />
          <p style="font-size: 12px; color: #6B5B73;">EVENTS21 — All Your Event Needs.</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: result.success,
      target: OFFICIAL_EMAIL,
      provider: result.provider,
      messageId: result.messageId || null,
      error: result.error || null,
      configuredProviders: {
        smtp: Boolean(process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS),
        resend: Boolean(process.env.RESEND_API_KEY),
        brevo: Boolean(process.env.BREVO_API_KEY),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, target: OFFICIAL_EMAIL, error: error?.message || "Failed to test email" },
      { status: 500 }
    );
  }
}
