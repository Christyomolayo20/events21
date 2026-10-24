import { createClient } from "@supabase/supabase-js";

// Supabase Project Ref: kmkvhypdcsabnvwytvug
const SUPABASE_PROJECT_ID = "kmkvhypdcsabnvwytvug";
const DEFAULT_SUPABASE_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co`;

export const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;

export const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "";

// Initialize Supabase Client
export const supabase = supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Check if active connection to Supabase is configured
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(supabase && supabaseAnonKey);
}

/**
 * Safe Supabase push for Consultation Bookings
 */
export async function pushConsultationToSupabase(booking: Record<string, any>) {
  if (!supabase) return { success: false, reason: "Supabase key not set in environment" };
  try {
    const { data, error } = await supabase.from("consultations").insert([
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
  if (!supabase) return { success: false, reason: "Supabase key not set in environment" };
  try {
    const { data, error } = await supabase.from("enquiries").insert([
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
