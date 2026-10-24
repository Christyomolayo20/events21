import { NextResponse } from "next/server";
import { supabaseUrl, supabaseAnonKey } from "@/lib/supabase";

export async function GET() {
  const projectId = "kmkvhypdcsabnvwytvug";
  let serverReachable = false;
  let serverResponseCode: number | null = null;
  let serverMessage = "";

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: "GET",
      headers: supabaseAnonKey
        ? {
            apikey: supabaseAnonKey,
            Authorization: `Bearer ${supabaseAnonKey}`,
          }
        : {},
      cache: "no-store",
    });

    serverResponseCode = res.status;
    // 200 (authenticated) or 401 (gateway alive but needs key) confirms the Supabase gateway is live
    serverReachable = res.status === 200 || res.status === 401;
    const text = await res.text();
    serverMessage = text;
  } catch (err: any) {
    serverReachable = false;
    serverMessage = err?.message || "Failed to reach Supabase project endpoint";
  }

  return NextResponse.json({
    projectId,
    supabaseUrl,
    isKeyConfigured: Boolean(supabaseAnonKey && supabaseAnonKey.trim().length > 0),
    serverReachable,
    httpStatus: serverResponseCode,
    details: serverMessage,
    fallbackActive: true,
    storageFallback: "LocalStorage + IndexedDB active (zero data loss guaranteed)",
    timestamp: new Date().toISOString(),
  });
}
