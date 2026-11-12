import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import {
  checkResendDomainStatus,
  getAdminEmail,
  getEmailFrom,
  getResendApiKey,
  getResendEmailDeliveryStatus,
  sendEmail,
  WEBSITE_URL,
} from "@/lib/email";
import { buildAdminTestEmail } from "@/lib/emailTemplates";

export const dynamic = "force-dynamic";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET(request: Request) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json(
      { success: false, error: "Admin authentication required." },
      { status: 401 }
    );
  }

  const hasResendKey = Boolean(getResendApiKey());
  const emailFrom = getEmailFrom();
  const adminEmail = getAdminEmail();
  const domainStatus = await checkResendDomainStatus("events21.com");

  return NextResponse.json({
    success: true,
    target: adminEmail,
    sender: emailFrom,
    website: WEBSITE_URL,
    configuredProviders: {
      resend: hasResendKey,
    },
    domainStatus,
  });
}

export async function POST(request: Request) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json(
      { success: false, error: "Admin authentication required to dispatch test emails." },
      { status: 401 }
    );
  }

  const clientIp = getClientIp(request);
  const limit = checkRateLimit("admin-test-email", clientIp, 5, 5 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: `Rate limit reached. Please wait ${limit.retryAfterSeconds}s before testing again.`,
      },
      { status: 429 }
    );
  }

  try {
    const body = await request.json().catch(() => ({}));
    const defaultTarget = getAdminEmail();
    const requestedTo =
      typeof body?.to === "string" && body.to.trim()
        ? body.to.trim().toLowerCase()
        : defaultTarget;

    if (!EMAIL_REGEX.test(requestedTo)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid recipient email address." },
        { status: 400 }
      );
    }

    const emailFrom = getEmailFrom();
    const domainStatus = await checkResendDomainStatus("events21.com");
    const timestamp = new Date().toISOString();
    const template = buildAdminTestEmail({
      target: requestedTo,
      sender: emailFrom,
      timestamp,
    });

    const result = await sendEmail({
      to: requestedTo,
      from: emailFrom,
      replyTo: defaultTarget,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });

    const deliveryStatus = result.messageId
      ? await getResendEmailDeliveryStatus(result.messageId)
      : null;

    return NextResponse.json(
      {
        success: result.success,
        target: requestedTo,
        sender: emailFrom,
        provider: result.provider,
        messageId: result.messageId || null,
        deliveryStatus,
        domainStatus,
        error: result.error || null,
        configuredProviders: {
          resend: Boolean(getResendApiKey()),
        },
      },
      { status: result.success ? 200 : 502 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        target: getAdminEmail(),
        error: error?.message || "Failed to execute email verification test.",
      },
      { status: 500 }
    );
  }
}
