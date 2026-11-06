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

function sanitizeString(val: unknown, maxLen = 800): string {
  if (typeof val !== "string") return "";
  return val.trim().slice(0, maxLen).replace(/[<>]/g, "");
}

function filterOutLegacy(list: unknown): Testimonial[] {
  if (!Array.isArray(list)) return [];
  return list
    .filter(
      (item): item is Testimonial =>
        Boolean(item && typeof item === "object" && item.id && !LEGACY_DEFAULT_IDS.has(item.id))
    )
    .map((item) => ({
      ...item,
      clientName: sanitizeString(item.clientName, 100),
      quote: sanitizeString(item.quote || item.text, 800),
      text: sanitizeString(item.text || item.quote, 800),
      roleOrEvent: item.roleOrEvent ? sanitizeString(item.roleOrEvent, 100) : undefined,
    }));
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

  // If Supabase is available, attempt to check for Supabase stored testimonials
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        const mapped: Testimonial[] = data
          .map((d: any) => ({
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
          }))
          .filter((t) => !LEGACY_DEFAULT_IDS.has(t.id));

        if (mapped.length > 0) {
          persistTestimonials(mapped);
          return NextResponse.json(
            { success: true, testimonials: mapped, source: "supabase" },
            {
              headers: {
                "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
              },
            }
          );
        }
      }
    } catch {
      // Supabase table may not exist yet; fall back safely
    }
  }

  return NextResponse.json(
    { success: true, testimonials, source: "memory_file" },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    }
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
      const item: Testimonial = body.testimonial;
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

    // Sync to Supabase in background if configured
    const supabase = getSupabase();
    if (supabase) {
      try {
        if (Array.isArray(body.testimonials)) {
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
          const item: Testimonial = body.testimonial;
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

    return NextResponse.json({
      success: true,
      count: current.length,
      testimonials: current,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || "Failed to save testimonials" },
      { status: 500 }
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
        { status: 400 }
      );
    }

    const current = loadStoredTestimonials();
    const updated = current.filter((t) => t.id !== idToDelete);
    persistTestimonials(updated);

    const supabase = getSupabase();
    if (supabase) {
      try {
        await supabase.from("testimonials").delete().eq("id", idToDelete);
      } catch (err) {
        console.warn("Supabase delete notice:", err);
      }
    }

    return NextResponse.json({
      success: true,
      deletedId: idToDelete,
      testimonials: updated,
    });
  } catch (err: any) {
    console.error("Testimonial delete error:", err);
    return NextResponse.json(
      { success: false, message: err?.message || "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}
