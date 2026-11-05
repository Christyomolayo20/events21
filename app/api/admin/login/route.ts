import { NextResponse } from "next/server";
import crypto from "crypto";

const ADMIN_SECRET = "Event$21";
let failedAttempts = 0;
let lastFailedTime = 0;

export async function POST(request: Request) {
  try {
    const now = Date.now();
    // Brute-force throttle: if > 5 consecutive failed attempts within 15 seconds
    if (failedAttempts >= 5 && now - lastFailedTime < 15000) {
      return NextResponse.json(
        { success: false, error: "Too many login attempts. Please wait 15 seconds and try again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const password = typeof body.password === "string" ? body.password : "";

    // Timing-safe constant-time comparison
    const passwordBuf = Buffer.from(password);
    const targetBuf = Buffer.from(ADMIN_SECRET);

    const isMatch =
      passwordBuf.length === targetBuf.length &&
      crypto.timingSafeEqual(passwordBuf, targetBuf);

    if (isMatch) {
      failedAttempts = 0;
      return NextResponse.json({ success: true, message: "Authenticated successfully" });
    }

    failedAttempts++;
    lastFailedTime = now;
    return NextResponse.json({ success: false, error: "Invalid admin password" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Authentication error" }, { status: 500 });
  }
}
