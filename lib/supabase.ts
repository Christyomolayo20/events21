import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Supabase Project Ref: kmkvhypdcsabnvwytvug
const SUPABASE_PROJECT_ID = "kmkvhypdcsabnvwytvug";
const DEFAULT_SUPABASE_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co`;

export const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;

export function getSupabaseAnonKey(): string {
  if (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.trim()
  ) {
    return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.trim();
  }
  if (
    process.env.SUPABASE_SERVICE_ROLE_KEY &&
    process.env.SUPABASE_SERVICE_ROLE_KEY.trim()
  ) {
    return process.env.SUPABASE_SERVICE_ROLE_KEY.trim();
  }
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("events21_supabase_key");
      if (stored && stored.trim()) return stored.trim();
    } catch {
      // Ignore storage errors
    }
  }
  return "";
}

export const supabaseAnonKey = getSupabaseAnonKey();

let cachedClient: SupabaseClient | null = null;
let lastKeyUsed: string = "";

export function getSupabase(): SupabaseClient | null {
  const currentKey = getSupabaseAnonKey();
  if (!currentKey) return null;
  if (cachedClient && lastKeyUsed === currentKey) {
    return cachedClient;
  }
  cachedClient = createClient(supabaseUrl, currentKey);
  lastKeyUsed = currentKey;
  return cachedClient;
}

// Fallback exported singleton client
export const supabase = getSupabase();

/**
 * Check if active connection to Supabase is configured
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(getSupabaseAnonKey());
}

/**
 * Safe Supabase push for Consultation Bookings
 */
export async function pushConsultationToSupabase(booking: Record<string, any>) {
  const client = getSupabase();
  if (!client) return { success: false, reason: "Supabase key not set in environment" };
  try {
    const { data, error } = await client.from("consultations").insert([
      {
        id: booking.id,
        full_name: booking.fullName,
        email: booking.email,
        phone: booking.phone,
        event_type: booking.eventType,
        consultation_date: booking.date,
        time_slot: booking.timeSlot,
        message: booking.message,
        status: booking.status,
        created_at: booking.createdAt,
      },
    ]);
    if (error) {
      console.warn("Supabase consultations insert notice:", error.message);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (err) {
    console.warn("Supabase consultation sync skipped:", err);
    return { success: false, err };
  }
}

/**
 * Safe Supabase push for Event Enquiries
 */
export async function pushEnquiryToSupabase(enquiry: Record<string, any>) {
  const client = getSupabase();
  if (!client) return { success: false, reason: "Supabase key not set in environment" };
  try {
    const { data, error } = await client.from("enquiries").insert([
      {
        id: enquiry.id,
        full_name: enquiry.fullName,
        email: enquiry.email,
        phone: enquiry.phone,
        event_type: enquiry.eventType,
        event_date: enquiry.eventDate,
        event_location: enquiry.eventLocation,
        guest_count: enquiry.guestCount,
        budget_range: enquiry.budgetRange,
        message: enquiry.message,
        status: enquiry.status,
        created_at: enquiry.createdAt,
      },
    ]);
    if (error) {
      console.warn("Supabase enquiries insert notice:", error.message);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (err) {
    console.warn("Supabase enquiry sync skipped:", err);
    return { success: false, err };
  }
}

/**
 * Safe Supabase push for Royal Planners Academy Registrations
 */
export async function pushAcademyRegistrationToSupabase(registration: Record<string, any>) {
  const client = getSupabase();
  if (!client) return { success: false, reason: "Supabase key not set in environment" };
  try {
    const { data, error } = await client.from("academy_registrations").insert([
      {
        id: registration.id,
        full_name: registration.fullName,
        email: registration.email,
        phone: registration.phone,
        experience_level: registration.experienceLevel,
        business_name: registration.businessName || "",
        reason_for_joining: registration.reasonForJoining || "",
        status: registration.status || "New Enquiry",
        created_at: registration.createdAt,
      },
    ]);
    if (error) {
      console.warn("Supabase academy registrations insert notice:", error.message);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (err) {
    console.warn("Supabase academy registration sync skipped:", err);
    return { success: false, err };
  }
}

