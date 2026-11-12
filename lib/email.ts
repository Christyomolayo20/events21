import tls from "tls";

export const OFFICIAL_EMAIL = "Royaltyeventservice@gmail.com";
export const OWNER_EMAIL = "christianahomolayo19@gmail.com";
export const OFFICIAL_SENDER_NAME = "EVENTS21";

export interface SendEmailOptions {
    to: string | string[];
    from?: string;
    replyTo?: string;
    subject: string;
    html: string;
    text?: string;
}

/**
 * Send an email directly via Gmail/Custom SMTP using native Node TLS (zero external npm dependencies required).
 */
function sendViaNativeSmtp(
    host: string,
    port: number,
    user: string,
    pass: string,
    options: SendEmailOptions
): Promise<{ success: boolean; provider: string; error?: string }> {
    return new Promise((resolve) => {
        const recipients = Array.isArray(options.to) ? options.to : [options.to];
        const fromAddr = user || OFFICIAL_EMAIL;
        const fromHeader = options.from || `${OFFICIAL_SENDER_NAME} <${fromAddr}>`;
        const cleanPass = pass.replace(/\s+/g, ""); // strip any spaces from Google App Password

        const socket = tls.connect(
            {
                host,
                port,
                servername: host,
                rejectUnauthorized: false,
            },
            () => {
                // Connected
            }
        );

        let stage = 0;
        let authStep = 0;
        let rcptIndex = 0;
        let settled = false;
        let rxBuffer = "";

        socket.setEncoding("utf-8");
        socket.setTimeout(15000);

        const finish = (success: boolean, err?: string) => {
            if (settled) return;
            settled = true;
            try {
                socket.write("QUIT\r\n");
                socket.end();
            } catch { }
            resolve({
                success,
                provider: `smtp:${host}`,
                error: err,
            });
        };

        socket.on("timeout", () => {
            socket.destroy();
            finish(false, "SMTP connection timed out");
        });

        socket.on("error", (err) => {
            finish(false, `SMTP socket error: ${err.message}`);
        });

        socket.on("data", (chunk: string) => {
            rxBuffer += chunk;
            const lines = rxBuffer.split(/\r?\n/);
            rxBuffer = lines.pop() ?? "";

            for (const line of lines) {
                if (!line.trim()) continue;
                // Wait for final line of multi-line SMTP responses (e.g. "250 ..." instead of "250-...")
                if (/^\d{3}-/.test(line)) continue;
                const match = line.match(/^(\d{3})\s?/);
                if (!match) continue;
                const code = parseInt(match[1], 10);

                // Error code received
                if (code >= 400) {
                    finish(false, `SMTP error code ${code}: ${line.trim()}`);
                    return;
                }

                // 220 Service ready
                if (stage === 0 && code === 220) {
                    stage = 1;
                    socket.write(`EHLO events21.vercel.app\r\n`);
                    continue;
                }

                // 250 Requested mail action okay / EHLO response
                if (stage === 1 && code === 250) {
                    stage = 2;
                    socket.write(`AUTH LOGIN\r\n`);
                    continue;
                }

                // 334 Server challenge for AUTH
                if (stage === 2 && code === 334) {
                    if (authStep === 0) {
                        authStep = 1;
                        socket.write(`${Buffer.from(user).toString("base64")}\r\n`);
                    } else if (authStep === 1) {
                        authStep = 2;
                        socket.write(`${Buffer.from(cleanPass).toString("base64")}\r\n`);
                    }
                    continue;
                }

                // 235 Authentication successful
                if (stage === 2 && code === 235) {
                    stage = 3;
                    socket.write(`MAIL FROM:<${fromAddr}>\r\n`);
                    continue;
                }

                // 250 sender accepted
                if (stage === 3 && code === 250) {
                    stage = 4;
                    socket.write(`RCPT TO:<${recipients[rcptIndex]}>\r\n`);
                    continue;
                }

                // 250 recipient accepted
                if (stage === 4 && code === 250) {
                    rcptIndex++;
                    if (rcptIndex < recipients.length) {
                        socket.write(`RCPT TO:<${recipients[rcptIndex]}>\r\n`);
                    } else {
                        stage = 5;
                        socket.write(`DATA\r\n`);
                    }
                    continue;
                }

                // 354 Start mail input
                if (stage === 5 && code === 354) {
                    stage = 6;
                    const toHeader = recipients.join(", ");
                    const boundary = `----=_Part_${Date.now().toString(36)}`;
                    const plainText = options.text || options.html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

                    const emailMessage = [
                        `From: ${fromHeader}`,
                        `To: ${toHeader}`,
                        options.replyTo ? `Reply-To: ${options.replyTo}` : "",
                        `Subject: ${options.subject}`,
                        `MIME-Version: 1.0`,
                        `Content-Type: multipart/alternative; boundary="${boundary}"`,
                        "",
                        `--${boundary}`,
                        `Content-Type: text/plain; charset=utf-8`,
                        `Content-Transfer-Encoding: 7bit`,
                        "",
                        plainText,
                        "",
                        `--${boundary}`,
                        `Content-Type: text/html; charset=utf-8`,
                        `Content-Transfer-Encoding: 7bit`,
                        "",
                        options.html,
                        "",
                        `--${boundary}--`,
                        "",
                        ".\r\n",
                    ]
                        .filter(Boolean)
                        .join("\r\n");

                    socket.write(emailMessage);
                    continue;
                }

                // 250 message accepted for delivery
                if (stage === 6 && code === 250) {
                    finish(true);
                    return;
                }
            }
        });
    });
}

/**
 * Universal email dispatcher:
 * 1. Checks Gmail App Password or SMTP credentials (process.env.GMAIL_APP_PASSWORD, process.env.SMTP_PASS)
 * 2. Checks Resend API key (process.env.RESEND_API_KEY)
 * 3. Checks Brevo API key (process.env.BREVO_API_KEY)
 */
export async function sendEmail(
    options: SendEmailOptions
): Promise<{ success: boolean; provider: string; error?: string; messageId?: string }> {
    const recipients = Array.isArray(options.to) ? options.to : [options.to];
    const providerErrors: string[] = [];

    // 1. Direct Native SMTP if Gmail App Password is configured (Full freedom to send to Royaltyeventservice@gmail.com & clients)
    const gmailPass = (process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || "").trim();
    const smtpUser = (process.env.GMAIL_USER || process.env.SMTP_USER || OFFICIAL_EMAIL).trim();
    const smtpHost = (process.env.SMTP_HOST || "smtp.gmail.com").trim();
    const smtpPort = Number(process.env.SMTP_PORT) || 465;

    if (gmailPass) {
        try {
            const result = await sendViaNativeSmtp(smtpHost, smtpPort, smtpUser, gmailPass, options);
            if (result.success) {
                return result;
            }
            if (result.error) providerErrors.push(result.error);
            console.warn("Native SMTP attempt error:", result.error);
        } catch (err: any) {
            const msg = err?.message || "Native SMTP error";
            providerErrors.push(`SMTP: ${msg}`);
            console.warn("Native SMTP error:", msg);
        }
    }

    // 2. Resend API (HTTP POST)
    const resendApiKey = (process.env.RESEND_API_KEY || "").trim();
    if (resendApiKey) {
        try {
            // Use verified custom domain if provided via RESEND_FROM, otherwise standard Resend onboarding sender
            const configuredFrom = (process.env.RESEND_FROM || "").trim();
            const fromAddress =
                configuredFrom ||
                (options.from && !options.from.includes(OFFICIAL_EMAIL)
                    ? options.from
                    : `${OFFICIAL_SENDER_NAME} <onboarding@resend.dev>`);

            const res = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${resendApiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    from: fromAddress,
                    to: recipients,
                    reply_to: options.replyTo || OFFICIAL_EMAIL,
                    subject: options.subject,
                    html: options.html,
                    text: options.text,
                }),
                signal: AbortSignal.timeout(15000),
            });

            const data = await res.json().catch(() => ({}));

            if (res.ok) {
                return { success: true, provider: "resend", messageId: data.id };
            }

            // If Resend returns 403 validation_error (recipient address outside unverified test sandbox):
            if (res.status === 403 && data.name === "validation_error") {
                console.warn(
                    "[Resend Sandbox Restriction] Target recipient outside verified sandbox. Delivering priority alert to registered owner inbox:",
                    OWNER_EMAIL
                );

                const ownerCopyRes = await fetch("https://api.resend.com/emails", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${resendApiKey}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        from: fromAddress,
                        to: [OWNER_EMAIL],
                        reply_to: recipients[0] || OFFICIAL_EMAIL,
                        subject: `[ADMIN ALERT for Royaltyeventservice@gmail.com] ${options.subject}`,
                        html: `
              <div style="background:#FFF9EB;padding:14px 20px;border-left:4px solid #C5A265;margin-bottom:20px;font-family:sans-serif;font-size:13px;color:#2A1736;line-height:1.5;">
                <strong style="color:#C5A265;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:4px;">Events 21 Notification Gateway</strong>
                Intended for: <strong>${recipients.join(", ")}</strong><br>
                <em>Note: To deliver directly into Royaltyeventservice@gmail.com and guest inboxes without Resend sandbox restriction, either verify your sending domain at <a href="https://resend.com/domains" target="_blank" style="color:#2A1736;font-weight:bold;">resend.com/domains</a> or set GMAIL_APP_PASSWORD for Royaltyeventservice@gmail.com.</em>
              </div>
              ${options.html}
            `,
                    }),
                    signal: AbortSignal.timeout(15000),
                });

                const ownerData = await ownerCopyRes.json().catch(() => ({}));
                if (ownerCopyRes.ok) {
                    return {
                        success: true,
                        provider: "resend:owner-notified",
                        messageId: ownerData.id,
                    };
                }
                providerErrors.push(
                    `Resend (${res.status}): ${data?.message || "Sandbox restriction"}; Owner fallback (${ownerCopyRes.status}): ${ownerData?.message || "Failed"}`
                );
            } else {
                providerErrors.push(
                    `Resend HTTP ${res.status}: ${data?.message || res.statusText || "Request rejected"}`
                );
            }

            console.warn("Resend API response:", data);
        } catch (err: any) {
            const msg = err?.message || "Resend request failed";
            providerErrors.push(`Resend: ${msg}`);
            console.warn("Resend fetch error:", msg);
        }
    }

    // 3. Brevo API (HTTP POST)
    const brevoApiKey = (process.env.BREVO_API_KEY || "").trim();
    if (brevoApiKey) {
        try {
            const res = await fetch("https://api.brevo.com/v3/smtp/email", {
                method: "POST",
                headers: {
                    "api-key": brevoApiKey,
                    "Content-Type": "application/json",
                    accept: "application/json",
                },
                body: JSON.stringify({
                    sender: { name: OFFICIAL_SENDER_NAME, email: OFFICIAL_EMAIL },
                    to: recipients.map((email) => ({ email })),
                    replyTo: { email: options.replyTo || OFFICIAL_EMAIL },
                    subject: options.subject,
                    htmlContent: options.html,
                    textContent: options.text,
                }),
                signal: AbortSignal.timeout(15000),
            });

            if (res.ok) {
                return { success: true, provider: "brevo" };
            }
            const data = await res.json().catch(() => ({}));
            providerErrors.push(`Brevo HTTP ${res.status}: ${data?.message || "Request rejected"}`);
            console.warn("Brevo API error:", data);
        } catch (err: any) {
            const msg = err?.message || "Brevo fetch error";
            providerErrors.push(`Brevo: ${msg}`);
            console.warn("Brevo fetch error:", msg);
        }
    }

    // 4. Honest failure reporting (distinguishes failed key vs completely unconfigured)
    const note =
        providerErrors.length > 0
            ? providerErrors.join(" | ")
            : "No active email provider configured (set GMAIL_APP_PASSWORD or a valid RESEND_API_KEY in Vercel & .env.local).";
    console.log(`[EMAIL NOTICE] To: ${recipients.join(", ")} | Subject: ${options.subject} | ${note}`);

    return {
        success: false,
        provider: providerErrors.length > 0 ? "error" : "unconfigured",
        error: note,
    };
}
