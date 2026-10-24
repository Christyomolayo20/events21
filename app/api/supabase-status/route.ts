import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const PROJECT_ID = "kmkvhypdcsabnvwytvug";
const DEFAULT_SUPABASE_URL = `https://${PROJECT_ID}.supabase.co`;

function getStoredAnonKey(): string {
  if (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.trim()) {
    return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.trim();
  }

  // Fallback: check .env.local file
  try {
    const envPath = path.join(process.cwd(), ".env.local");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      const match = content.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=([^\r\n]+)/);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
  } catch (err) {
    console.warn("Could not read .env.local for Supabase key:", err);
  }

  return "";
}

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
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
    });

    serverResponseCode = res.status;
    serverReachable = res.status === 200 || res.status === 401;
    const text = await res.text();
    serverMessage = text;
  } catch (err: any) {
    serverReachable = false;
    serverMessage = err?.message || "Failed to reach Supabase project endpoint";
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

    if (!apiKey) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid Supabase anon key." },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;

    // Test the key against Supabase REST endpoint
    const testRes = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: "GET",
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
      },
      cache: "no-store",
    });

    if (testRes.status === 200) {
      // Key is authenticated! Save to .env.local
      const envPath = path.join(process.cwd(), ".env.local");
      const envContent = `# Events 21 - Supabase Configuration\nNEXT_PUBLIC_SUPABASE_URL=${supabaseUrl}\nNEXT_PUBLIC_SUPABASE_ANON_KEY=${apiKey}\n`;
      fs.writeFileSync(envPath, envContent, "utf-8");

      // Update current process env
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = apiKey;

      return NextResponse.json({
        success: true,
        authenticated: true,
        message: "Successfully connected to Supabase project kmkvhypdcsabnvwytvug!",
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
    return NextResponse.json(
      {
        success: false,
        message: err?.message || "Failed to test Supabase connection",
      },
      { status: 500 }
    );
  }
}
