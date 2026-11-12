import { Resend } from "resend";

export const WEBSITE_URL = "https://events21.com";
export const DEFAULT_ADMIN_EMAIL = "royaltyeventservices@gmail.com";
export const DEFAULT_EMAIL_FROM = "Events 21 <notifications@events21.com>";

// Kept for backward-compatible named imports
export const OFFICIAL_EMAIL = DEFAULT_ADMIN_EMAIL;
export const OWNER_EMAIL = DEFAULT_ADMIN_EMAIL;
export const OFFICIAL_SENDER_NAME = "Events 21";

export interface SendEmailOptions {
  to: string | string[];
  from?: string;
  replyTo?: string;
  subject: string;
  html: string;
  text?: string;
}

export interface SendEmailResult {
  success: boolean;
  provider: string;
  messageId?: string;
  error?: string;
  statusCode?: number;
}

export interface ResendDomainCheck {
  checked: boolean;
  domain: string;
  found: boolean;
  verified: boolean;
  status?: string;
  missingOrPendingRecords?: Array<{
    record: string;
    type: string;
    name: string;
    value: string;
    status: string;
  }>;
  error?: string;
}

export function getResendApiKey(): string {
  return (process.env.RESEND_API_KEY || "").trim();
}

export function getEmailFrom(): string {
  return (
    process.env.EMAIL_FROM ||
    process.env.RESEND_FROM ||
    DEFAULT_EMAIL_FROM
  ).trim();
}

export function getAdminEmail(): string {
  return (process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL).trim();
}

function getResendClient(): Resend | null {
  const apiKey = getResendApiKey();
  if (!apiKey) return null;
  return new Resend(apiKey);
}

/**
 * Check Resend verification status and DNS records for the sending domain (default: events21.com).
 */
export async function checkResendDomainStatus(
  domainName = "events21.com"
): Promise<ResendDomainCheck> {
  const resend = getResendClient();
  if (!resend) {
    return {
      checked: false,
      domain: domainName,
      found: false,
      verified: false,
      error: "RESEND_API_KEY is not configured in server environment.",
    };
  }

  try {
    const listRes = await resend.domains.list();
    if (listRes.error) {
      return {
        checked: false,
        domain: domainName,
        found: false,
        verified: false,
        error: listRes.error.message || "Failed to list Resend domains.",
      };
    }

    const match = listRes.data?.data?.find(
      (d) => d.name.toLowerCase() === domainName.toLowerCase()
    );

    if (!match) {
      return {
        checked: true,
        domain: domainName,
        found: false,
        verified: false,
        error: `Domain "${domainName}" was not found in the active Resend account.`,
      };
    }

    const detailRes = await resend.domains.get(match.id);
    if (detailRes.error || !detailRes.data) {
      const verified = match.status === "verified";
      return {
        checked: true,
        domain: match.name,
        found: true,
        verified,
        status: match.status,
      };
    }

    const records = detailRes.data.records || [];
    const pendingRecords = records
      .filter((r) => r.status !== "verified")
      .map((r) => ({
        record: r.record,
        type: r.type,
        name: r.name,
        value: r.value,
        status: r.status,
      }));

    return {
      checked: true,
      domain: detailRes.data.name,
      found: true,
      verified: detailRes.data.status === "verified",
      status: detailRes.data.status,
      missingOrPendingRecords: pendingRecords,
    };
  } catch (err: any) {
    return {
      checked: false,
      domain: domainName,
      found: false,
      verified: false,
      error: err?.message || "Failed to inspect Resend domain verification status.",
    };
  }
}

/**
 * Inspect Resend email delivery event status using the message ID returned by emails.send.
 */
export async function getResendEmailDeliveryStatus(messageId: string): Promise<{
  checked: boolean;
  lastEvent?: string;
  error?: string;
}> {
  const resend = getResendClient();
  if (!resend || !messageId) {
    return { checked: false };
  }
  try {
    const res = await resend.emails.get(messageId);
    if (res.error) {
      return { checked: false, error: res.error.message };
    }
    return {
      checked: true,
      lastEvent: res.data?.last_event,
    };
  } catch (err: any) {
    return { checked: false, error: err?.message || "Could not check delivery status" };
  }
}

/**
 * Send email through the official Resend Node.js SDK using verified events21.com domain configuration.
 */
export async function sendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
  const recipients = (Array.isArray(options.to) ? options.to : [options.to])
    .map((addr) => addr.trim())
    .filter(Boolean);

  if (recipients.length === 0) {
    return {
      success: false,
      provider: "validation",
      error: "No valid recipient email address provided.",
    };
  }

  const resend = getResendClient();
  if (!resend) {
    const msg =
      "RESEND_API_KEY is not configured in server environment variables.";
    console.warn(`[EMAIL NOTICE] Skipped email (${options.subject}): ${msg}`);
    return {
      success: false,
      provider: "unconfigured",
      error: msg,
    };
  }

  const fromAddress = getEmailFrom();
  const replyTo = (options.replyTo || getAdminEmail()).trim();
  const plainText =
    options.text ||
    options.html
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  try {
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: recipients,
      replyTo,
      subject: options.subject,
      html: options.html,
      text: plainText,
    });

    if (error) {
      const safeError = error.message || "Resend rejected email request.";
      console.error("[RESEND ERROR]", {
        subject: options.subject,
        statusCode: error.statusCode ?? null,
        name: error.name,
        message: safeError,
      });
      return {
        success: false,
        provider: "resend",
        error: safeError,
        statusCode: error.statusCode ?? undefined,
      };
    }

    return {
      success: true,
      provider: "resend",
      messageId: data?.id,
    };
  } catch (err: any) {
    const safeError = err?.message || "Unexpected Resend SDK error.";
    console.error("[RESEND EXCEPTION]", {
      subject: options.subject,
      message: safeError,
    });
    return {
      success: false,
      provider: "resend",
      error: safeError,
    };
  }
}
