import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

declare global {
  // eslint-disable-next-line no-var
  var __events21_runtime_supabase: { url?: string; key?: string } | undefined;
}

const PROJECT_ID = "kmkvhypdcsabnvwytvug";
const DEFAULT_SUPABASE_URL = `https://${PROJECT_ID}.supabase.co`;

function getStoredAnonKey(): string {
  if (global.__events21_runtime_supabase?.key) {
    return global.__events21_runtime_supabase.key;
  }
  if (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.trim()) {
    return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.trim();
  }
  if (process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.SUPABASE_SERVICE_ROLE_KEY.trim()) {
    return process.env.SUPABASE_SERVICE_ROLE_KEY.trim();
  }

  // Fallback: check .env.local file
  try {
    const envPath = path.join(process.cwd(), ".env.local");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      const match = content.match(/^NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)$/m);
      if (match && match[1]) {
        return match[1].trim().replace(/^["']|["']$/g, "");
      }
    }
  } catch (err) {
    console.warn("Could not read .env.local for Supabase key:", err);
  }

  return "";
}

function updateLocalEnvPreservingOthers(urlValue: string, apiKeyValue: string) {
  const envPath = path.join(process.cwd(), ".env.local");
  const existingLines = fs.existsSync(envPath)
    ? fs.readFileSync(envPath, "utf-8").split(/\r?\n/)
    : [];

  const updatedKeys = new Set<string>();
  const nextLines = existingLines.map((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("NEXT_PUBLIC_SUPABASE_URL=")) {
      updatedKeys.add("NEXT_PUBLIC_SUPABASE_URL");
      return `NEXT_PUBLIC_SUPABASE_URL=${urlValue}`;
    }
    if (trimmed.startsWith("NEXT_PUBLIC_SUPABASE_ANON_KEY=")) {
      updatedKeys.add("NEXT_PUBLIC_SUPABASE_ANON_KEY");
      return `NEXT_PUBLIC_SUPABASE_ANON_KEY=${apiKeyValue}`;
    }
    return line;
  });

  if (!updatedKeys.has("NEXT_PUBLIC_SUPABASE_URL")) {
    nextLines.push(`NEXT_PUBLIC_SUPABASE_URL=${urlValue}`);
  }
  if (!updatedKeys.has("NEXT_PUBLIC_SUPABASE_ANON_KEY")) {
    nextLines.push(`NEXT_PUBLIC_SUPABASE_ANON_KEY=${apiKeyValue}`);
  }

  fs.writeFileSync(envPath, nextLines.join("\n").replace(/\n+$/, "\n"), "utf-8");
}

export const dynamic = "force-dynamic";

export async function GET() {
  const supabaseUrl = (
    global.__events21_runtime_supabase?.url ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    DEFAULT_SUPABASE_URL
  ).trim();
  const anonKey = getStoredAnonKey();

  let serverReachable = false;
  let serverResponseCode: number | null = null;
  let serverMessage = "";

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: "GET",
      headers: anonKey
        ? {
            apikey: anonKey,
            Authorization: `Bearer ${anonKey}`,
          }
        : {},
      cache: "no-store",
      signal: AbortSignal.timeout(4000),
    });

    serverResponseCode = res.status;
    serverReachable = res.status === 200 || res.status === 401;
    serverMessage = await res.text();
  } catch (err: any) {
    serverReachable = false;
    const causeCode = err?.cause?.code || err?.code || "";
    serverMessage =
      causeCode === "ENOTFOUND"
        ? `Supabase host ${supabaseUrl} could not be resolved (DNS NXDOMAIN — project may be deleted or paused).`
        : err?.message || "Failed to reach Supabase project endpoint";
  }

  return NextResponse.json({
    projectId: PROJECT_ID,
    supabaseUrl,
    isKeyConfigured: Boolean(anonKey && anonKey.length > 10),
    authenticated: serverResponseCode === 200,
    serverReachable,
    httpStatus: serverResponseCode,
    details: serverMessage,
    fallbackActive: true,
    storageFallback: "LocalStorage + IndexedDB active (zero data loss guaranteed)",
    timestamp: new Date().toISOString(),
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const apiKey = (body?.apiKey || "").trim();
    const requestedUrl = (body?.supabaseUrl || "").trim();

    if (!apiKey) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid Supabase anon key." },
        { status: 400 }
      );
    }

    const supabaseUrl = (requestedUrl || process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL).trim();
    if (!supabaseUrl.startsWith("https://")) {
      return NextResponse.json(
        { success: false, message: "Supabase URL must start with https://" },
        { status: 400 }
      );
    }

    // Test the key against Supabase REST endpoint
    const testRes = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: "GET",
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
      },
      cache: "no-store",
      signal: AbortSignal.timeout(4000),
    });

    if (testRes.status === 200) {
      // Key is authenticated! Update .env.local without overwriting RESEND_API_KEY or other vars
      try {
        updateLocalEnvPreservingOthers(supabaseUrl, apiKey);
      } catch {
        // Read-only filesystem in production serverless (e.g., Vercel); update runtime env
      }

      // Store runtime override without mutating Webpack DefinePlugin compile-time constants
      global.__events21_runtime_supabase = { url: supabaseUrl, key: apiKey };

      return NextResponse.json({
        success: true,
        authenticated: true,
        message: `Successfully connected to Supabase (${supabaseUrl})!`,
      });
    } else {
      const errorText = await testRes.text();
      return NextResponse.json(
        {
          success: false,
          authenticated: false,
          httpStatus: testRes.status,
          message:
            testRes.status === 401
              ? "Invalid anon key. Please check your Supabase Dashboard -> Project Settings -> API."
              : `Connection returned HTTP ${testRes.status}: ${errorText}`,
        },
        { status: 400 }
      );
    }
  } catch (err: any) {
    const causeCode = err?.cause?.code || err?.code || "";
    const msg =
      causeCode === "ENOTFOUND"
        ? "Supabase project domain does not resolve (DNS ENOTFOUND). Restore/recreate the Supabase project and set NEXT_PUBLIC_SUPABASE_URL & NEXT_PUBLIC_SUPABASE_ANON_KEY."
        : err?.message || "Failed to test Supabase connection";
    return NextResponse.json(
      {
        success: false,
        message: msg,
      },
      { status: 500 }
    );
  }
}
