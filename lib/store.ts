"use client";

import {
  BRAND_CONFIG,
  GIFTS_CATALOGUE,
  INITIAL_ENQUIRIES,
  INITIAL_GIFT_REQUESTS,
  PORTFOLIO_DATA,
  DEFAULT_FOUNDER_INFO,
  DEFAULT_TEAM_MEMBERS,
  INITIAL_TESTIMONIALS,
  INITIAL_CONSULTATIONS,
} from "./data";
import {
  EventEnquiry,
  GiftItem,
  GiftRequest,
  PortfolioItem,
  Testimonial,
  ConsultationBooking,
  TeamMember,
  FounderInfo,
  AcademyRegistration,
} from "./types";
import { pushConsultationToSupabase, pushEnquiryToSupabase, pushAcademyRegistrationToSupabase } from "./supabase";

const ENQUIRIES_KEY = "events21_enquiries";
const GIFT_REQUESTS_KEY = "events21_gift_requests";
const GIFT_CATALOGUE_KEY = "events21_gift_catalogue";
const PORTFOLIO_KEY = "events21_portfolio";
const SETTINGS_KEY = "events21_settings";
const ADMIN_AUTH_KEY = "events21_admin_auth";
const TESTIMONIALS_KEY = "events21_testimonials";
const CONSULTATIONS_KEY = "events21_consultations";
const FOUNDER_KEY = "events21_founder";
const TEAM_KEY = "events21_team";
const ACADEMY_REGISTRATIONS_KEY = "events21_academy_registrations";


// --- CLIENT-SIDE IMAGE COMPRESSION (Prevents QuotaExceededError & Speeds Up Browsing) ---
export function compressImageFile(
  file: File,
  maxWidth = 1600,
  maxHeight = 1600,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    // If not an image, fallback to FileReader
    if (!file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") resolve(reader.result);
        else reject(new Error("Failed to read non-image file"));
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = Math.max(width, 1);
        canvas.height = Math.max(height, 1);
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        // Draw and compress image
        ctx.drawImage(img, 0, 0, width, height);
        // Use JPEG for photographic content to keep storage small
        const mime = file.type === "image/png" ? "image/jpeg" : "image/jpeg";
        const dataUrl = canvas.toDataURL(mime, quality);
        resolve(dataUrl);
      };
      img.onerror = () => {
        // Fallback to raw data url if canvas decode fails
        resolve(e.target?.result as string);
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// --- INDEXEDDB STORAGE (Virtually unlimited capacity for high-res images) ---
const DB_NAME = "events21_database";
const DB_VERSION = 1;
const STORE_NAME = "events21_store";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      return reject(new Error("IndexedDB not available"));
    }
    const req = window.indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbGet<T>(key: string): Promise<T | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => resolve((req.result as T) ?? null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

async function idbSet<T>(key: string, value: T): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(value, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn("IndexedDB persistence warning:", err);
  }
}

// --- SAFE LOCALSTORAGE HELPER (Never crashes when quota is exceeded) ---
function safeLocalStorageSet(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // LocalStorage quota reached: silently pass because IndexedDB already holds the full data!
  }
}

function safeLocalStorageGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    return JSON.parse(saved);
  } catch {
    return fallback;
  }
}

// --- IN-MEMORY CACHE ---
let cachePortfolio: PortfolioItem[] | null = null;
let cacheGifts: GiftItem[] | null = null;
let cacheEnquiries: EventEnquiry[] | null = null;
let cacheGiftRequests: GiftRequest[] | null = null;
let cacheConfig: typeof BRAND_CONFIG | null = null;
let cacheTestimonials: Testimonial[] | null = null;
let cacheConsultations: ConsultationBooking[] | null = null;
let cacheFounder: FounderInfo | null = null;
let cacheTeam: TeamMember[] | null = null;
let cacheAcademy: AcademyRegistration[] | null = null;

// Background hydration from IndexedDB on startup
if (typeof window !== "undefined") {
  (async () => {
    try {
      const idbPortfolio = await idbGet<PortfolioItem[]>(PORTFOLIO_KEY);
      if (idbPortfolio && Array.isArray(idbPortfolio) && idbPortfolio.length > 0) {
        cachePortfolio = idbPortfolio;
        safeLocalStorageSet(PORTFOLIO_KEY, idbPortfolio);
        window.dispatchEvent(new Event("events21_portfolio_updated"));
      }

      const idbGifts = await idbGet<GiftItem[]>(GIFT_CATALOGUE_KEY);
      if (idbGifts && Array.isArray(idbGifts) && idbGifts.length > 0) {
        cacheGifts = idbGifts;
        safeLocalStorageSet(GIFT_CATALOGUE_KEY, idbGifts);
        window.dispatchEvent(new Event("events21_gift_catalogue_updated"));
      }

      const idbTestimonials = await idbGet<Testimonial[]>(TESTIMONIALS_KEY);
      if (idbTestimonials && Array.isArray(idbTestimonials)) {
        cacheTestimonials = idbTestimonials;
        safeLocalStorageSet(TESTIMONIALS_KEY, idbTestimonials);
        window.dispatchEvent(new Event("events21_testimonials_updated"));
      }

      const idbConsultations = await idbGet<ConsultationBooking[]>(CONSULTATIONS_KEY);
      if (idbConsultations && Array.isArray(idbConsultations)) {
        cacheConsultations = idbConsultations;
        safeLocalStorageSet(CONSULTATIONS_KEY, idbConsultations);
        window.dispatchEvent(new Event("events21_consultations_updated"));
      }

      const idbAcademy = await idbGet<AcademyRegistration[]>(ACADEMY_REGISTRATIONS_KEY);
      if (idbAcademy && Array.isArray(idbAcademy)) {
        cacheAcademy = idbAcademy;
        safeLocalStorageSet(ACADEMY_REGISTRATIONS_KEY, idbAcademy);
        window.dispatchEvent(new Event("events21_academy_updated"));
      }
    } catch {
      // Ignored
    }
  })();
}


// --- ENQUIRIES ---
export function getEnquiries(): EventEnquiry[] {
  if (typeof window === "undefined") return INITIAL_ENQUIRIES;
  if (cacheEnquiries) return cacheEnquiries;
  const stored = safeLocalStorageGet<EventEnquiry[]>(ENQUIRIES_KEY, INITIAL_ENQUIRIES);
  cacheEnquiries = stored;
  return stored;
}

export function saveEnquiry(enquiry: Omit<EventEnquiry, "id" | "status" | "createdAt">): EventEnquiry {
  const newEnquiry: EventEnquiry = {
    ...enquiry,
    id: `enq-${Date.now().toString(36).toUpperCase()}`,
    status: "New",
    createdAt: new Date().toISOString(),
  };

  const existing = getEnquiries();
  const updated = [newEnquiry, ...existing];
  cacheEnquiries = updated;
  safeLocalStorageSet(ENQUIRIES_KEY, updated);
  idbSet(ENQUIRIES_KEY, updated);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("events21_enquiries_updated"));
  }

  // Sync to Supabase in background
  pushEnquiryToSupabase(newEnquiry).catch(() => {});

  return newEnquiry;
}

export function updateEnquiryStatus(id: string, status: EventEnquiry["status"], notes?: string): void {
  const existing = getEnquiries();
  const updated = existing.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        status,
        ...(notes !== undefined ? { notes } : {}),
      };
    }
    return item;
  });
  cacheEnquiries = updated;
  safeLocalStorageSet(ENQUIRIES_KEY, updated);
  idbSet(ENQUIRIES_KEY, updated);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("events21_enquiries_updated"));
  }
}

export function deleteEnquiry(id: string): void {
  const existing = getEnquiries();
  const updated = existing.filter((item) => item.id !== id);
  cacheEnquiries = updated;
  safeLocalStorageSet(ENQUIRIES_KEY, updated);
  idbSet(ENQUIRIES_KEY, updated);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("events21_enquiries_updated"));
  }
}

// --- GIFT REQUESTS ---
export function getGiftRequests(): GiftRequest[] {
  if (typeof window === "undefined") return INITIAL_GIFT_REQUESTS;
  if (cacheGiftRequests) return cacheGiftRequests;
  const stored = safeLocalStorageGet<GiftRequest[]>(GIFT_REQUESTS_KEY, INITIAL_GIFT_REQUESTS);
  cacheGiftRequests = stored;
  return stored;
}

export function saveGiftRequest(req: Omit<GiftRequest, "id" | "status" | "createdAt">): GiftRequest {
  const newReq: GiftRequest = {
    ...req,
    id: `gft-${Date.now().toString(36).toUpperCase()}`,
    status: "Pending",
    createdAt: new Date().toISOString(),
  };

  const existing = getGiftRequests();
  const updated = [newReq, ...existing];
  cacheGiftRequests = updated;
  safeLocalStorageSet(GIFT_REQUESTS_KEY, updated);
  idbSet(GIFT_REQUESTS_KEY, updated);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("events21_gifts_updated"));
  }
  return newReq;
}

export function updateGiftStatus(id: string, status: GiftRequest["status"]): void {
  const existing = getGiftRequests();
  const updated = existing.map((item) => (item.id === id ? { ...item, status } : item));
  cacheGiftRequests = updated;
  safeLocalStorageSet(GIFT_REQUESTS_KEY, updated);
  idbSet(GIFT_REQUESTS_KEY, updated);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("events21_gifts_updated"));
  }
}

export function deleteGiftRequest(id: string): void {
  const existing = getGiftRequests();
  const updated = existing.filter((item) => item.id !== id);
  cacheGiftRequests = updated;
  safeLocalStorageSet(GIFT_REQUESTS_KEY, updated);
  idbSet(GIFT_REQUESTS_KEY, updated);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("events21_gifts_updated"));
  }
}

// --- GIFTS CATALOGUE (ADMIN EDITABLE & IMAGE/VIDEO UPLOAD) ---
export function getGiftCatalogue(): GiftItem[] {
  if (typeof window === "undefined") return GIFTS_CATALOGUE;
  if (cacheGifts) return cacheGifts;
  const stored = safeLocalStorageGet<GiftItem[]>(GIFT_CATALOGUE_KEY, GIFTS_CATALOGUE);
  const missingDefaults = GIFTS_CATALOGUE.filter((d) => !stored.some((s) => s.id === d.id));
  const combined = [...stored, ...missingDefaults];
  // Merge any new default videoUrl or updated images
  const merged = combined.map((item) => {
    const defaultMatch = GIFTS_CATALOGUE.find((d) => d.id === item.id);
    if (defaultMatch) {
      const isEruIyawoImage = item.image && item.image.includes("eru-iyawo");
      return {
        ...item,
        price: item.price !== undefined ? item.price : defaultMatch.price,
        image: isEruIyawoImage
          ? defaultMatch.image
          : (item.image?.startsWith("data:") ? item.image : defaultMatch.image),
        description: item.description || defaultMatch.description,
        details: item.details || defaultMatch.details,
        videoUrl: item.videoUrl || defaultMatch.videoUrl,
        mediaType: item.mediaType || defaultMatch.mediaType,
      };
    }
    return item;
  });
  cacheGifts = merged;
  return merged;
}

export function addGiftItem(item: Omit<GiftItem, "id">): GiftItem {
  const newItem: GiftItem = {
    ...item,
    id: `gift-${Date.now().toString(36)}`,
  };
  const existing = getGiftCatalogue();
  const updated = [newItem, ...existing];
  cacheGifts = updated;
  safeLocalStorageSet(GIFT_CATALOGUE_KEY, updated);
  idbSet(GIFT_CATALOGUE_KEY, updated);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("events21_gift_catalogue_updated"));
  }
  return newItem;
}

export function updateGiftItem(id: string, updates: Partial<GiftItem>): void {
  const existing = getGiftCatalogue();
  const updated = existing.map((item) => (item.id === id ? { ...item, ...updates } : item));
  cacheGifts = updated;
  safeLocalStorageSet(GIFT_CATALOGUE_KEY, updated);
  idbSet(GIFT_CATALOGUE_KEY, updated);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("events21_gift_catalogue_updated"));
  }
}

export function deleteGiftItem(id: string): void {
  const existing = getGiftCatalogue();
  const updated = existing.filter((item) => item.id !== id);
  cacheGifts = updated;
  safeLocalStorageSet(GIFT_CATALOGUE_KEY, updated);
  idbSet(GIFT_CATALOGUE_KEY, updated);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("events21_gift_catalogue_updated"));
  }
}

// Store version stamp for automatic cross-device sync & cache invalidation
const DATA_VERSION_KEY = "events21_sync_version";
const CURRENT_DATA_VERSION = "2026_10_26_v4";

// --- PORTFOLIO (ADMIN EDIT, MULTI-IMAGE, VIDEO & DELETE) ---
export function getPortfolio(): PortfolioItem[] {
  if (typeof window === "undefined") return PORTFOLIO_DATA;
  if (cachePortfolio) return cachePortfolio;

  // Check if store version is outdated to ensure mobile and web always see the latest curated showcases
  const storedVersion = safeLocalStorageGet<string | null>(DATA_VERSION_KEY, null);
  const isVersionOutdated = storedVersion !== CURRENT_DATA_VERSION;

  const stored = safeLocalStorageGet<PortfolioItem[]>(PORTFOLIO_KEY, PORTFOLIO_DATA);

  // Separate genuinely custom admin projects from default canonical showcases
  const customAdminItems = stored.filter(
    (s) => !PORTFOLIO_DATA.some((d) => d.id === s.id)
  );

  // Map canonical items with latest verified imagery & text while allowing admin modifications
  const canonicalItems = PORTFOLIO_DATA.map((defaultItem) => {
    const adminSaved = stored.find((s) => s.id === defaultItem.id);
    if (!adminSaved || isVersionOutdated) {
      return defaultItem;
    }
    return {
      ...defaultItem,
      ...adminSaved,
      // Ensure authentic high-res images are retained if admin hasn't replaced with a new custom photo
      image:
        adminSaved.image && !adminSaved.image.includes("landing-couple-traditional.jpg")
          ? adminSaved.image
          : defaultItem.image,
      gallery:
        adminSaved.gallery && adminSaved.gallery.length >= (defaultItem.gallery?.length || 0)
          ? adminSaved.gallery
          : (defaultItem.gallery || []),
    };
  });

  const merged = [...canonicalItems, ...customAdminItems];
  cachePortfolio = merged;

  // Persist updated merged state and version
  if (isVersionOutdated) {
    safeLocalStorageSet(DATA_VERSION_KEY, CURRENT_DATA_VERSION);
    safeLocalStorageSet(PORTFOLIO_KEY, merged);
  }

  return merged;
}

export function addPortfolioItem(item: Omit<PortfolioItem, "id">): PortfolioItem {
  const newItem: PortfolioItem = {
    ...item,
    id: `port-${Date.now().toString(36)}`,
  };
  const existing = getPortfolio();
  const updated = [newItem, ...existing];
  cachePortfolio = updated;
  safeLocalStorageSet(PORTFOLIO_KEY, updated);
  idbSet(PORTFOLIO_KEY, updated);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("events21_portfolio_updated"));
  }
  return newItem;
}

export function updatePortfolioItem(id: string, updates: Partial<PortfolioItem>): void {
  const existing = getPortfolio();
  const updated = existing.map((item) => (item.id === id ? { ...item, ...updates } : item));
  cachePortfolio = updated;
  safeLocalStorageSet(PORTFOLIO_KEY, updated);
  idbSet(PORTFOLIO_KEY, updated);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("events21_portfolio_updated"));
  }
}

export function deletePortfolioItem(id: string): void {
  const existing = getPortfolio();
  const updated = existing.filter((item) => item.id !== id);
  cachePortfolio = updated;
  safeLocalStorageSet(PORTFOLIO_KEY, updated);
  idbSet(PORTFOLIO_KEY, updated);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("events21_portfolio_updated"));
  }
}

// --- SETTINGS ---
export function getBrandConfig() {
  if (typeof window === "undefined") return BRAND_CONFIG;
  if (cacheConfig) return cacheConfig;
  const saved = safeLocalStorageGet(SETTINGS_KEY, BRAND_CONFIG);
  cacheConfig = { ...BRAND_CONFIG, ...saved };
  return cacheConfig;
}

export function updateBrandConfig(updates: Partial<typeof BRAND_CONFIG>) {
  const current = getBrandConfig();
  const merged = { ...current, ...updates };
  cacheConfig = merged;
  safeLocalStorageSet(SETTINGS_KEY, merged);
  idbSet(SETTINGS_KEY, merged);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("events21_settings_updated"));
  }
  return merged;
}

// --- ADMIN AUTH ---
export const ADMIN_PASSWORD = "Event$21";

export function checkAdminAuth(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(ADMIN_AUTH_KEY) === "authenticated";
}

export function loginAdmin(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(ADMIN_AUTH_KEY, "authenticated");
    }
    return true;
  }
  return false;
}

export function logoutAdmin(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
  }
}

// --- TESTIMONIALS (ADMIN MANAGED, 5-STAR RATING, OPTIONAL IMAGE, PUBLISH/UNPUBLISH) ---
export function getTestimonials(): Testimonial[] {
  if (typeof window === "undefined") return INITIAL_TESTIMONIALS;
  if (cacheTestimonials) return cacheTestimonials;

  const stored = safeLocalStorageGet<Testimonial[] | null>(TESTIMONIALS_KEY, null);
  if (stored && Array.isArray(stored)) {
    cacheTestimonials = stored;
    return stored;
  }

  // If nothing stored yet, initialize with authoritative published testimonials
  cacheTestimonials = [...INITIAL_TESTIMONIALS];
  return cacheTestimonials;
}

export function getPublishedTestimonials(): Testimonial[] {
  const all = getTestimonials();
  return all.filter((t) => t.isPublished);
}

export async function syncTestimonialsToServer(list: Testimonial[]): Promise<boolean> {
  try {
    const res = await fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ testimonials: list }),
    });
    return res.ok;
  } catch (err) {
    console.warn("Could not sync testimonials to server:", err);
    return false;
  }
}

export function addTestimonial(item: Omit<Testimonial, "id" | "createdAt">): Testimonial {
  const newTestimonial: Testimonial = {
    ...item,
    id: `testi-${Date.now().toString(36)}`,
    createdAt: new Date().toISOString(),
  };
  const existing = getTestimonials();
  const updated = [newTestimonial, ...existing];
  cacheTestimonials = updated;
  safeLocalStorageSet(TESTIMONIALS_KEY, updated);
  idbSet(TESTIMONIALS_KEY, updated);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("events21_testimonials_updated"));
    // Sync with server in background
    syncTestimonialsToServer(updated).catch(() => {});
  }
  return newTestimonial;
}

export function updateTestimonial(id: string, updates: Partial<Testimonial>): void {
  const existing = getTestimonials();
  const updated = existing.map((item) => (item.id === id ? { ...item, ...updates } : item));
  cacheTestimonials = updated;
  safeLocalStorageSet(TESTIMONIALS_KEY, updated);
  idbSet(TESTIMONIALS_KEY, updated);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("events21_testimonials_updated"));
    // Sync with server in background
    syncTestimonialsToServer(updated).catch(() => {});
  }
}

export function deleteTestimonial(id: string): void {
  const existing = getTestimonials();
  const updated = existing.filter((item) => item.id !== id);
  cacheTestimonials = updated;
  safeLocalStorageSet(TESTIMONIALS_KEY, updated);
  idbSet(TESTIMONIALS_KEY, updated);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("events21_testimonials_updated"));
    // Sync with server in background
    syncTestimonialsToServer(updated).catch(() => {});
    fetch(`/api/testimonials?id=${encodeURIComponent(id)}`, { method: "DELETE" }).catch(() => {});
  }
}

// --- CONSULTATION BOOKINGS & CALENDAR SYSTEM ---
export const STANDARD_CONSULTATION_SLOTS = [
  "09:00 AM",
  "10:30 AM",
  "12:00 PM",
  "02:00 PM",
  "03:30 PM",
  "05:00 PM",
];

export function getConsultations(): ConsultationBooking[] {
  if (typeof window === "undefined") return INITIAL_CONSULTATIONS;
  if (cacheConsultations) return cacheConsultations;
  const stored = safeLocalStorageGet<ConsultationBooking[]>(CONSULTATIONS_KEY, INITIAL_CONSULTATIONS);
  cacheConsultations = stored;
  return stored;
}

export function getAvailableTimeSlots(dateString: string): { slot: string; available: boolean }[] {
  const consultations = getConsultations();
  const bookedOnDate = new Set(
    consultations
      .filter((c) => c.date === dateString && c.status !== "Cancelled")
      .map((c) => c.timeSlot)
  );

  return STANDARD_CONSULTATION_SLOTS.map((slot) => ({
    slot,
    available: !bookedOnDate.has(slot),
  }));
}

export function bookConsultation(
  bookingData: Omit<ConsultationBooking, "id" | "status" | "createdAt">
): { success: boolean; booking?: ConsultationBooking; error?: string } {
  const existing = getConsultations();

  // Check collision
  const collision = existing.find(
    (c) =>
      c.date === bookingData.date &&
      c.timeSlot === bookingData.timeSlot &&
      c.status !== "Cancelled"
  );

  if (collision) {
    return {
      success: false,
      error: `The ${bookingData.timeSlot} slot on ${bookingData.date} is already reserved. Please select another time slot.`,
    };
  }

  const newBooking: ConsultationBooking = {
    ...bookingData,
    id: `cst-${Date.now().toString(36).toUpperCase()}`,
    status: "Confirmed",
    createdAt: new Date().toISOString(),
  };

  const updated = [newBooking, ...existing];
  cacheConsultations = updated;
  safeLocalStorageSet(CONSULTATIONS_KEY, updated);
  idbSet(CONSULTATIONS_KEY, updated);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("events21_consultations_updated"));
  }

  // Sync to Supabase in background
  pushConsultationToSupabase(newBooking).catch(() => {});

  return { success: true, booking: newBooking };
}

export function updateConsultationStatus(
  id: string,
  status: ConsultationBooking["status"]
): void {
  const existing = getConsultations();
  const updated = existing.map((item) => (item.id === id ? { ...item, status } : item));
  cacheConsultations = updated;
  safeLocalStorageSet(CONSULTATIONS_KEY, updated);
  idbSet(CONSULTATIONS_KEY, updated);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("events21_consultations_updated"));
  }
}

export function deleteConsultation(id: string): void {
  const existing = getConsultations();
  const updated = existing.filter((item) => item.id !== id);
  cacheConsultations = updated;
  safeLocalStorageSet(CONSULTATIONS_KEY, updated);
  idbSet(CONSULTATIONS_KEY, updated);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("events21_consultations_updated"));
  }
}

// --- FOUNDER INFO ---
export function getFounderInfo(): FounderInfo {
  if (typeof window === "undefined") return DEFAULT_FOUNDER_INFO;
  if (cacheFounder) return cacheFounder;
  const stored = safeLocalStorageGet<FounderInfo>(FOUNDER_KEY, DEFAULT_FOUNDER_INFO);
  cacheFounder = { ...DEFAULT_FOUNDER_INFO, ...stored };
  return cacheFounder;
}

export function updateFounderInfo(updates: Partial<FounderInfo>): FounderInfo {
  const current = getFounderInfo();
  const merged = { ...current, ...updates };
  cacheFounder = merged;
  safeLocalStorageSet(FOUNDER_KEY, merged);
  idbSet(FOUNDER_KEY, merged);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("events21_founder_updated"));
  }
  return merged;
}

// --- TEAM MEMBERS ---
export function getTeamMembers(): TeamMember[] {
  if (typeof window === "undefined") return DEFAULT_TEAM_MEMBERS;
  if (cacheTeam) return cacheTeam;
  const stored = safeLocalStorageGet<TeamMember[]>(TEAM_KEY, DEFAULT_TEAM_MEMBERS);
  cacheTeam = stored;
  return stored;
}

export function addTeamMember(member: Omit<TeamMember, "id">): TeamMember {
  const newMember: TeamMember = {
    ...member,
    id: `team-${Date.now().toString(36)}`,
  };
  const existing = getTeamMembers();
  const updated = [...existing, newMember];
  cacheTeam = updated;
  safeLocalStorageSet(TEAM_KEY, updated);
  idbSet(TEAM_KEY, updated);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("events21_team_updated"));
  }
  return newMember;
}

export function updateTeamMember(id: string, updates: Partial<TeamMember>): void {
  const existing = getTeamMembers();
  const updated = existing.map((m) => (m.id === id ? { ...m, ...updates } : m));
  cacheTeam = updated;
  safeLocalStorageSet(TEAM_KEY, updated);
  idbSet(TEAM_KEY, updated);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("events21_team_updated"));
  }
}

export function deleteTeamMember(id: string): void {
  const existing = getTeamMembers();
  const updated = existing.filter((m) => m.id !== id);
  cacheTeam = updated;
  safeLocalStorageSet(TEAM_KEY, updated);
  idbSet(TEAM_KEY, updated);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("events21_team_updated"));
  }
}

// --- ROYAL PLANNERS ACADEMY REGISTRATIONS ---
export function getAcademyRegistrations(): AcademyRegistration[] {
  if (typeof window === "undefined") return [];
  if (cacheAcademy) return cacheAcademy;
  const stored = safeLocalStorageGet<AcademyRegistration[]>(ACADEMY_REGISTRATIONS_KEY, []);
  cacheAcademy = stored;
  return stored;
}

export function saveAcademyRegistration(
  reg: Omit<AcademyRegistration, "id" | "status" | "createdAt">
): AcademyRegistration {
  const newReg: AcademyRegistration = {
    ...reg,
    id: `rpa-${Date.now().toString(36).toUpperCase()}`,
    status: "New Enquiry",
    createdAt: new Date().toISOString(),
  };

  const existing = getAcademyRegistrations();
  const updated = [newReg, ...existing];
  cacheAcademy = updated;
  safeLocalStorageSet(ACADEMY_REGISTRATIONS_KEY, updated);
  idbSet(ACADEMY_REGISTRATIONS_KEY, updated);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("events21_academy_updated"));
  }

  // Push to Supabase in background if configured
  pushAcademyRegistrationToSupabase(newReg).catch(() => {});

  return newReg;
}

export function updateAcademyRegistrationStatus(
  id: string,
  status: AcademyRegistration["status"],
  notes?: string
): void {
  const existing = getAcademyRegistrations();
  const updated = existing.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        status,
        ...(notes !== undefined ? { notes } : {}),
      };
    }
    return item;
  });
  cacheAcademy = updated;
  safeLocalStorageSet(ACADEMY_REGISTRATIONS_KEY, updated);
  idbSet(ACADEMY_REGISTRATIONS_KEY, updated);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("events21_academy_updated"));
  }
}

export function deleteAcademyRegistration(id: string): void {
  const existing = getAcademyRegistrations();
  const updated = existing.filter((item) => item.id !== id);
  cacheAcademy = updated;
  safeLocalStorageSet(ACADEMY_REGISTRATIONS_KEY, updated);
  idbSet(ACADEMY_REGISTRATIONS_KEY, updated);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("events21_academy_updated"));
  }
}


