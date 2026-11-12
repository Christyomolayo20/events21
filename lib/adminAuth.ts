import crypto from "crypto";
import { NextRequest } from "next/server";

export const ADMIN_SESSION_COOKIE = "events21_admin_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours

function getAdminSecret(): string {
  return (process.env.ADMIN_PASSWORD || "Event$21").trim();
}

function getSigningKey(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    `events21-session-key-${getAdminSecret()}`
  );
}

export function verifyAdminPassword(password: string): boolean {
  const target = getAdminSecret();
  const a = Buffer.from(password);
  const b = Buffer.from(target);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function signPayload(payloadBase64: string): string {
  return crypto
    .createHmac("sha256", getSigningKey())
    .update(payloadBase64)
    .digest("base64url");
}

export function createAdminSessionToken(): string {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const nonce = crypto.randomBytes(8).toString("hex");
  const payload = Buffer.from(JSON.stringify({ role: "admin", exp, nonce })).toString("base64url");
  const sig = signPayload(payload);
  return `${payload}.${sig}`;
}

export function verifyAdminSessionToken(token: string | undefined | null): boolean {
  if (!token || typeof token !== "string") return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payload, sig] = parts;
  if (!payload || !sig) return false;

  const expectedSig = signPayload(payload);
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return false;
  }

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (parsed?.role !== "admin" || typeof parsed?.exp !== "number") return false;
    return parsed.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

function parseCookieValue(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null;
  const pairs = cookieHeader.split(";");
  for (const pair of pairs) {
    const eqIndex = pair.indexOf("=");
    if (eqIndex <= 0) continue;
    const k = pair.slice(0, eqIndex).trim();
    if (k === name) {
      return decodeURIComponent(pair.slice(eqIndex + 1).trim());
    }
  }
  return null;
}

export function isAdminAuthenticated(request: Request | NextRequest): boolean {
  if ("cookies" in request && typeof request.cookies?.get === "function") {
    const cookieVal = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    if (verifyAdminSessionToken(cookieVal)) return true;
  }
  const rawCookie = parseCookieValue(request.headers.get("cookie"), ADMIN_SESSION_COOKIE);
  return verifyAdminSessionToken(rawCookie);
}

