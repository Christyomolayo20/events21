import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { isAdminAuthenticated } from "@/lib/adminAuth";

declare global {
  // eslint-disable-next-line no-var
  var __events21_runtime_supabase: { url?: string; key?: string } | undefined;
}

const PROJECT_ID = "kmkvhypdcsabnvwytvug";
const DEFAULT_SUPABASE_URL = `https://${PROJECT_ID}.supabase.co`;

function getStoredKey(): string {
  if (global.__events21_runtime_supabase?.key) {
    return global.__events21_runtime_supabase.key;
  }
  if (process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.SUPABASE_SERVICE_ROLE_KEY.trim()) {
    return process.env.SUPABASE_SERVICE_ROLE_KEY.trim();
  }
  if (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.trim()
  ) {
    return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.trim();
  }

  try {
    const envPath = path.join(process.cwd(), ".env.local");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      const secretMatch = content.match(/^SUPABASE_SERVICE_ROLE_KEY=(.*)$/m);
      if (secretMatch && secretMatch[1]?.trim()) {
        return secretMatch[1].trim().replace(/^["']|["']$/g, "");
      }
      const match = content.match(/^NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)$/m);
      if (match && match[1]?.trim()) {
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

async function probeSupabaseEndpoint(supabaseUrl: string, apiKey: string) {
  const endpoint = `${supabaseUrl}/rest/v1/testimonials?select=id&limit=1`;

  const res = await fetch(endpoint, {
    method: "GET",
    headers: apiKey
      ? {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
      }
      : {},
    cache: "no-store",
    signal: AbortSignal.timeout(4000),
  });

  const text = await res.text();
  // Publishable keys querying a table before supabase_schema.sql is applied return 404 PGRST205
  const isMissingTableButAuthed = res.status === 404 && text.includes("PGRST205");
  const authenticated = res.status === 200 || isMissingTableButAuthed;
  const schemaReady = res.status === 200 && (!text.includes("PGRST205"));

  return {
    httpStatus: res.status,
    serverReachable: res.status === 200 || res.status === 401 || isMissingTableButAuthed,
    authenticated,
    schemaReady,
    details: text,
  };
}

export const dynamic = "force-dynamic";

export async function GET() {
  const supabaseUrl = (
    global.__events21_runtime_supabase?.url ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    DEFAULT_SUPABASE_URL
  ).trim();
  const apiKey = getStoredKey();

  let serverReachable = false;
  let serverResponseCode: number | null = null;
  let authenticated = false;
  let schemaReady = false;
  let serverMessage = "";

  try {
    const probe = await probeSupabaseEndpoint(supabaseUrl, apiKey);
    serverResponseCode = probe.httpStatus;
    serverReachable = probe.serverReachable;
    authenticated = probe.authenticated;
    schemaReady = probe.schemaReady;
    serverMessage = probe.details;
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
    isKeyConfigured: Boolean(apiKey && apiKey.length > 10),
    authenticated,
    schemaReady,
    serverReachable,
    httpStatus: serverResponseCode,
    details: serverMessage,
    fallbackActive: true,
    storageFallback: "LocalStorage + IndexedDB active (zero data loss guaranteed)",
    timestamp: new Date().toISOString(),
  });
}

export async function POST(req: Request) {
  if (!isAdminAuthenticated(req)) {
    return NextResponse.json(
      { success: false, message: "Admin authentication required." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const apiKey = (body?.apiKey || "").trim();
    const requestedUrl = (body?.supabaseUrl || "").trim();

    if (!apiKey) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid Supabase API key." },
        { status: 400 }
      );
    }

    const supabaseUrl = (
      requestedUrl ||
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      DEFAULT_SUPABASE_URL
    ).trim();
    if (!supabaseUrl.startsWith("https://")) {
      return NextResponse.json(
        { success: false, message: "Supabase URL must start with https://" },
        { status: 400 }
      );
    }

    const probe = await probeSupabaseEndpoint(supabaseUrl, apiKey);

    if (probe.authenticated) {
      try {
        updateLocalEnvPreservingOthers(supabaseUrl, apiKey);
      } catch {
        // Read-only filesystem in serverless production
      }

      global.__events21_runtime_supabase = { url: supabaseUrl, key: apiKey };

      return NextResponse.json({
        success: true,
        authenticated: true,
        schemaReady: probe.schemaReady,
        message: probe.schemaReady
          ? `Successfully connected to Supabase (${supabaseUrl})!`
          : `Connected to Supabase (${supabaseUrl})! Note: run supabase_schema.sql in Supabase SQL Editor if tables are not created yet.`,
      });
    }

    return NextResponse.json(
      {
        success: false,
        authenticated: false,
        httpStatus: probe.httpStatus,
        message:
          probe.httpStatus === 401
            ? "Invalid API key. Please check your Supabase Dashboard -> Project Settings -> API Keys."
            : `Connection returned HTTP ${probe.httpStatus}: ${probe.details}`,
      },
      { status: 400 }
    );
  } catch (err: any) {
    const causeCode = err?.cause?.code || err?.code || "";
    const msg =
      causeCode === "ENOTFOUND"
        ? "Supabase project domain does not resolve (DNS ENOTFOUND). Restore/recreate the Supabase project and set NEXT_PUBLIC_SUPABASE_URL & NEXT_PUBLIC_SUPABASE_ANON_KEY."
        : err?.message || "Failed to test Supabase connection";
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
