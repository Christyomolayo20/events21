"use client";

import { BRAND_CONFIG, GIFTS_CATALOGUE, INITIAL_ENQUIRIES, INITIAL_GIFT_REQUESTS, PORTFOLIO_DATA } from "./data";
import { EventEnquiry, GiftItem, GiftRequest, PortfolioItem } from "./types";

const ENQUIRIES_KEY = "events21_enquiries";
const GIFT_REQUESTS_KEY = "events21_gift_requests";
const GIFT_CATALOGUE_KEY = "events21_gift_catalogue";
const PORTFOLIO_KEY = "events21_portfolio";
const SETTINGS_KEY = "events21_settings";
const ADMIN_AUTH_KEY = "events21_admin_auth";

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

// --- GIFTS CATALOGUE (ADMIN EDITABLE & IMAGE UPLOAD) ---
export function getGiftCatalogue(): GiftItem[] {
  if (typeof window === "undefined") return GIFTS_CATALOGUE;
  if (cacheGifts) return cacheGifts;
  const stored = safeLocalStorageGet<GiftItem[]>(GIFT_CATALOGUE_KEY, GIFTS_CATALOGUE);
  cacheGifts = stored;
  return stored;
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

// --- PORTFOLIO (ADMIN EDIT, MULTI-IMAGE & DELETE) ---
export function getPortfolio(): PortfolioItem[] {
  if (typeof window === "undefined") return PORTFOLIO_DATA;
  if (cachePortfolio) return cachePortfolio;
  const stored = safeLocalStorageGet<PortfolioItem[]>(PORTFOLIO_KEY, PORTFOLIO_DATA);
  cachePortfolio = stored;
  return stored;
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
