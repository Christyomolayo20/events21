import tls from "tls";

export const OFFICIAL_EMAIL = "Royaltyeventservice@gmail.com";
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
    let fullLog = "";

    socket.setEncoding("utf-8");
    socket.setTimeout(15000);

    const finish = (success: boolean, err?: string) => {
      try {
        socket.write("QUIT\r\n");
        socket.end();
      } catch {}
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

    socket.on("data", (data: string) => {
      fullLog += data;
      const code = parseInt(data.substring(0, 3), 10);

      // 220 Service ready
      if (stage === 0 && code === 220) {
        stage = 1;
        socket.write(`EHLO events21.vercel.app\r\n`);
        return;
      }

      // 250 Requested mail action okay / EHLO response
      if (stage === 1 && code === 250) {
        stage = 2;
        socket.write(`AUTH LOGIN\r\n`);
        return;
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
        return;
      }

      // 235 Authentication successful
      if (stage === 2 && code === 235) {
        stage = 3;
        socket.write(`MAIL FROM:<${fromAddr}>\r\n`);
        return;
      }

      // 250 sender accepted
      if (stage === 3 && code === 250) {
        stage = 4;
        socket.write(`RCPT TO:<${recipients[rcptIndex]}>\r\n`);
        return;
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
        return;
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
        return;
      }

      // 250 message accepted for delivery
      if (stage === 6 && code === 250) {
        finish(true);
        return;
      }

      // Error code received
      if (code >= 400) {
        finish(false, `SMTP error code ${code}: ${data.trim()}`);
      }
    });
  });
}

/**
 * Universal email dispatcher:
 * 1. Checks Resend API key (process.env.RESEND_API_KEY)
 * 2. Checks Brevo API key (process.env.BREVO_API_KEY)
 * 3. Checks Gmail App Password or SMTP credentials (process.env.GMAIL_APP_PASSWORD, process.env.SMTP_PASS)
 */
export async function sendEmail(
  options: SendEmailOptions
): Promise<{ success: boolean; provider: string; error?: string }> {
  const recipients = Array.isArray(options.to) ? options.to : [options.to];
  const firstRecipient = recipients[0];

  // 1. Check Resend API (HTTP POST)
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: options.from || `${OFFICIAL_SENDER_NAME} <${OFFICIAL_EMAIL}>`,
          to: recipients,
          reply_to: options.replyTo || OFFICIAL_EMAIL,
          subject: options.subject,
          html: options.html,
          text: options.text,
        }),
      });

      if (res.ok) {
        return { success: true, provider: "resend" };
      }
      const data = await res.json().catch(() => ({}));
      console.warn("Resend API response:", data);
    } catch (err: any) {
      console.warn("Resend fetch error:", err?.message);
    }
  }

  // 2. Check Brevo API (HTTP POST)
  const brevoApiKey = process.env.BREVO_API_KEY;
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
      });

      if (res.ok) {
        return { success: true, provider: "brevo" };
      }
      const data = await res.json().catch(() => ({}));
      console.warn("Brevo API error:", data);
    } catch (err: any) {
      console.warn("Brevo fetch error:", err?.message);
    }
  }

  // 3. Check Native SMTP (Gmail or custom host)
  const gmailPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;
  const smtpUser = process.env.GMAIL_USER || process.env.SMTP_USER || OFFICIAL_EMAIL;
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = Number(process.env.SMTP_PORT) || 465;

  if (gmailPass) {
    try {
      const result = await sendViaNativeSmtp(smtpHost, smtpPort, smtpUser, gmailPass, options);
      if (result.success) {
        return result;
      }
      console.warn("Native SMTP attempt error:", result.error);
    } catch (err: any) {
      console.warn("Native SMTP error:", err?.message);
    }
  }

  // 4. If no live credentials configured yet
  const note =
    "No active email provider key or Gmail App Password configured in environment variables (GMAIL_APP_PASSWORD, RESEND_API_KEY, or BREVO_API_KEY).";
  console.log(`[EMAIL NOTICE] To: ${firstRecipient} | Subject: ${options.subject} | ${note}`);

  return {
    success: false,
    provider: "unconfigured",
    error: note,
  };
}
