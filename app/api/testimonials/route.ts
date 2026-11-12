import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Testimonial } from "@/lib/types";
import { getSupabase } from "@/lib/supabase";

declare global {
  // eslint-disable-next-line no-var
  var __events21_testimonials: Testimonial[] | undefined;
}

export const dynamic = "force-dynamic";

const TMP_FILE = path.join("/tmp", "events21_testimonials.json");
const PUBLIC_FILE = path.join(process.cwd(), "public", "testimonials.json");

// Legacy IDs to permanently purge
const LEGACY_DEFAULT_IDS = new Set([
  "testi-bukola-dara",
  "testi-the-kayodes",
  "testi-adeleke-jubilee",
]);

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
};

function sanitizeString(val: unknown, maxLen = 800): string {
  if (typeof val !== "string") return "";
  return val.trim().slice(0, maxLen).replace(/[<>]/g, "");
}

function sanitizeImage(val: unknown): string | undefined {
  if (typeof val !== "string") return undefined;
  const trimmed = val.trim();
  if (!trimmed) return undefined;
  if (
    trimmed.startsWith("/") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("data:image/")
  ) {
    return trimmed;
  }
  return undefined;
}

function normalizeRating(val: unknown): number {
  const num = Math.round(Number(val));
  if (Number.isNaN(num)) return 5;
  return Math.min(5, Math.max(1, num));
}

function normalizeTestimonial(item: Testimonial): Testimonial {
  const cleanQuote = sanitizeString(item.quote || item.text, 800);
  const clientRole = sanitizeString(item.clientRole, 100) || undefined;
  const eventName = sanitizeString(item.eventName, 120) || undefined;
  const roleOrEvent =
    sanitizeString(item.roleOrEvent, 160) ||
    [clientRole, eventName].filter(Boolean).join(" • ") ||
    undefined;

  return {
    ...item,
    id: sanitizeString(item.id, 100) || `testi-${Date.now().toString(36)}`,
    clientName: sanitizeString(item.clientName, 100),
    clientRole,
    eventName,
    roleOrEvent,
    quote: cleanQuote,
    text: cleanQuote,
    rating: normalizeRating(item.rating),
    image: sanitizeImage(item.image),
    isPublished: item.isPublished !== false,
    createdAt:
      typeof item.createdAt === "string" && item.createdAt.trim()
        ? item.createdAt
        : new Date().toISOString(),
  };
}

function filterOutLegacy(list: unknown): Testimonial[] {
  if (!Array.isArray(list)) return [];
  return list
    .filter(
      (item): item is Testimonial =>
        Boolean(item && typeof item === "object" && item.id && !LEGACY_DEFAULT_IDS.has(item.id))
    )
    .map(normalizeTestimonial);
}

function loadStoredTestimonials(): Testimonial[] {
  if (global.__events21_testimonials && Array.isArray(global.__events21_testimonials)) {
    return filterOutLegacy(global.__events21_testimonials);
  }

  // 1. Try reading from /tmp (persists within serverless worker)
  try {
    if (fs.existsSync(TMP_FILE)) {
      const data = fs.readFileSync(TMP_FILE, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        const cleaned = filterOutLegacy(parsed);
        global.__events21_testimonials = cleaned;
        return cleaned;
      }
    }
  } catch (err) {
    console.warn("Could not read testimonials from /tmp:", err);
  }

  // 2. Try reading from public/testimonials.json
  try {
    if (fs.existsSync(PUBLIC_FILE)) {
      const data = fs.readFileSync(PUBLIC_FILE, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        const cleaned = filterOutLegacy(parsed);
        global.__events21_testimonials = cleaned;
        return cleaned;
      }
    }
  } catch (err) {
    console.warn("Could not read testimonials from public file:", err);
  }

  global.__events21_testimonials = [];
  return [];
}

function persistTestimonials(list: Testimonial[]): void {
  const cleaned = filterOutLegacy(list);
  global.__events21_testimonials = cleaned;

  // Persist to /tmp
  try {
    fs.writeFileSync(TMP_FILE, JSON.stringify(cleaned, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not write testimonials to /tmp:", err);
  }

  // Persist to public/testimonials.json if filesystem is writable
  try {
    fs.writeFileSync(PUBLIC_FILE, JSON.stringify(cleaned, null, 2), "utf-8");
  } catch {
    // Expected on read-only serverless filesystems
  }
}

export async function GET() {
  const testimonials = loadStoredTestimonials();

  // If Supabase is available, fetch the authoritative stored testimonials list (including empty [])
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && Array.isArray(data)) {
        const mapped: Testimonial[] = data
          .map((d: any) =>
            normalizeTestimonial({
              id: d.id,
              clientName: d.client_name || d.clientName || "",
              clientRole: d.client_role || d.clientRole,
              eventName: d.event_name || d.eventName,
              roleOrEvent: d.role_or_event || d.roleOrEvent,
              quote: d.quote || d.text || "",
              text: d.text || d.quote || "",
              rating: Number(d.rating) || 5,
              image: d.image || undefined,
              isPublished: d.is_published ?? d.isPublished ?? true,
              createdAt: d.created_at || d.createdAt || new Date().toISOString(),
            })
          )
          .filter((t) => !LEGACY_DEFAULT_IDS.has(t.id));

        persistTestimonials(mapped);
        return NextResponse.json(
          { success: true, testimonials: mapped, source: "supabase" },
          { headers: NO_CACHE_HEADERS }
        );
      }
    } catch {
      // Supabase table may not exist yet; fall back safely
    }
  }

  return NextResponse.json(
    { success: true, testimonials, source: "memory_file" },
    { headers: NO_CACHE_HEADERS }
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    let current = loadStoredTestimonials();

    if (Array.isArray(body.testimonials)) {
      // Full list replacement from admin sync
      current = filterOutLegacy(body.testimonials);
    } else if (body.testimonial && typeof body.testimonial === "object") {
      // Single testimonial add or update
      const rawItem = body.testimonial as Testimonial;
      const cleanName = sanitizeString(rawItem.clientName, 100);
      const cleanQuote = sanitizeString(rawItem.quote || rawItem.text, 800);
      if (!cleanName || !cleanQuote) {
        return NextResponse.json(
          { success: false, message: "Client name and testimonial quote are required." },
          { status: 400, headers: NO_CACHE_HEADERS }
        );
      }

      const item = normalizeTestimonial(rawItem);
      if (!LEGACY_DEFAULT_IDS.has(item.id)) {
        const index = current.findIndex((t) => t.id === item.id);
        if (index >= 0) {
          current[index] = item;
        } else {
          current = [item, ...current];
        }
      }
    }

    persistTestimonials(current);

    // Sync to Supabase if configured
    const supabase = getSupabase();
    if (supabase) {
      try {
        if (Array.isArray(body.testimonials)) {
          const { data: existingRows } = await supabase.from("testimonials").select("id");
          const currentIds = new Set(current.map((t) => t.id));
          const idsToDelete = (existingRows || [])
            .map((r: { id: string }) => r.id)
            .filter((id) => id && !currentIds.has(id));

          if (idsToDelete.length > 0) {
            await supabase.from("testimonials").delete().in("id", idsToDelete);
          }

          for (const item of current) {
            await supabase.from("testimonials").upsert({
              id: item.id,
              client_name: item.clientName,
              client_role: item.clientRole || null,
              event_name: item.eventName || null,
              role_or_event: item.roleOrEvent || null,
              quote: item.quote || item.text,
              text: item.text || item.quote,
              rating: item.rating,
              image: item.image || null,
              is_published: item.isPublished,
              created_at: item.createdAt,
            });
          }
        } else if (body.testimonial && !LEGACY_DEFAULT_IDS.has(body.testimonial.id)) {
          const item = normalizeTestimonial(body.testimonial as Testimonial);
          await supabase.from("testimonials").upsert({
            id: item.id,
            client_name: item.clientName,
            client_role: item.clientRole || null,
            event_name: item.eventName || null,
            role_or_event: item.roleOrEvent || null,
            quote: item.quote || item.text,
            text: item.text || item.quote,
            rating: item.rating,
            image: item.image || null,
            is_published: item.isPublished,
            created_at: item.createdAt,
          });
        }
      } catch (err) {
        console.warn("Supabase background sync skipped for testimonial:", err);
      }
    }

    return NextResponse.json(
      {
        success: true,
        count: current.length,
        testimonials: current,
      },
      { headers: NO_CACHE_HEADERS }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || "Failed to save testimonials" },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    // Robust URL parsing that handles both absolute and relative request URLs
    let idToDelete: string | null = null;
    try {
      const url = new URL(req.url, "http://localhost");
      idToDelete = url.searchParams.get("id");
    } catch {
      // Fallback
    }

    if (!idToDelete) {
      try {
        const body = await req.json();
        idToDelete = body?.id || null;
      } catch {
        // Body may be empty in standard DELETE requests
      }
    }

    if (!idToDelete) {
      return NextResponse.json(
        { success: false, message: "ID parameter is required" },
        { status: 400, headers: NO_CACHE_HEADERS }
      );
    }

    const current = loadStoredTestimonials();
    const updated = current.filter((t) => t.id !== idToDelete);
    persistTestimonials(updated);

    const supabase = getSupabase();
    if (supabase) {
      try {
        const { error: sbError } = await supabase
          .from("testimonials")
          .delete()
          .eq("id", idToDelete);
        if (sbError) {
          console.warn("Supabase delete notice:", sbError.message);
        }
      } catch (err) {
        console.warn("Supabase delete notice:", err);
      }
    }

    return NextResponse.json(
      {
        success: true,
        deletedId: idToDelete,
        testimonials: updated,
      },
      { headers: NO_CACHE_HEADERS }
    );
  } catch (err: any) {
    console.error("Testimonial delete error:", err);
    return NextResponse.json(
      { success: false, message: err?.message || "Failed to delete testimonial" },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}
