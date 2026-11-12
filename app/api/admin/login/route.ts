import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  createAdminSessionToken,
  isAdminAuthenticated,
  verifyAdminPassword,
} from "@/lib/adminAuth";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const authenticated = isAdminAuthenticated(request);
  return NextResponse.json(
    { authenticated },
    { status: authenticated ? 200 : 401 }
  );
}

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const limit = checkRateLimit("admin-login", clientIp, 8, 60 * 1000);
    if (!limit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many login attempts. Please wait ${limit.retryAfterSeconds} seconds and try again.`,
        },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const password = typeof body.password === "string" ? body.password : "";

    if (verifyAdminPassword(password)) {
      const token = createAdminSessionToken();
      const response = NextResponse.json({
        success: true,
        message: "Authenticated successfully",
      });
      response.cookies.set(ADMIN_SESSION_COOKIE, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: SESSION_TTL_SECONDS,
      });
      return response;
    }

    return NextResponse.json(
      { success: false, error: "Invalid admin password" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json({ error: "Authentication error" }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return response;
}
