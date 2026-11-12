import crypto from "crypto";

interface RateRecord {
  timestamps: number[];
}

interface DedupRecord {
  expiresAt: number;
}

declare global {
  // eslint-disable-next-line no-var
  var __events21_rate_limits: Map<string, RateRecord> | undefined;
  // eslint-disable-next-line no-var
  var __events21_dedup_cache: Map<string, DedupRecord> | undefined;
}

const rateStore = global.__events21_rate_limits ?? new Map<string, RateRecord>();
if (!global.__events21_rate_limits) {
  global.__events21_rate_limits = rateStore;
}

const dedupStore = global.__events21_dedup_cache ?? new Map<string, DedupRecord>();
if (!global.__events21_dedup_cache) {
  global.__events21_dedup_cache = dedupStore;
}

export function getClientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  return "local";
}

export function checkRateLimit(
  namespace: string,
  clientKey: string,
  maxRequests = 10,
  windowMs = 10 * 60 * 1000
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const fullKey = `${namespace}:${clientKey}`;
  const cutoff = now - windowMs;

  if (rateStore.size > 500) {
    rateStore.forEach((rec, k) => {
      const fresh = rec.timestamps.filter((t: number) => t > cutoff);
      if (fresh.length === 0) rateStore.delete(k);
      else rec.timestamps = fresh;
    });
  }

  const record = rateStore.get(fullKey) ?? { timestamps: [] };
  record.timestamps = record.timestamps.filter((t) => t > cutoff);

  if (record.timestamps.length >= maxRequests) {
    const oldest = record.timestamps[0] || now;
    const retryAfterSeconds = Math.max(1, Math.ceil((oldest + windowMs - now) / 1000));
    rateStore.set(fullKey, record);
    return { allowed: false, retryAfterSeconds };
  }

  record.timestamps.push(now);
  rateStore.set(fullKey, record);
  return { allowed: true, retryAfterSeconds: 0 };
}

export function isDuplicateSubmission(
  namespace: string,
  parts: Array<string | number | undefined | null>,
  windowMs = 60 * 1000
): boolean {
  const now = Date.now();
  if (dedupStore.size > 500) {
    dedupStore.forEach((rec, k) => {
      if (rec.expiresAt <= now) dedupStore.delete(k);
    });
  }

  const normalized = parts.map((p) => String(p ?? "").trim().toLowerCase()).join("|");
  const digest = crypto.createHash("sha256").update(`${namespace}:${normalized}`).digest("hex");
  const existing = dedupStore.get(digest);

  if (existing && existing.expiresAt > now) {
    return true;
  }

  dedupStore.set(digest, { expiresAt: now + windowMs });
  return false;
}

