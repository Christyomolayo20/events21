"use client";

import { BRAND_CONFIG, GIFTS_CATALOGUE, INITIAL_ENQUIRIES, INITIAL_GIFT_REQUESTS, PORTFOLIO_DATA } from "./data";
import { EventEnquiry, GiftItem, GiftRequest, PortfolioItem } from "./types";

const ENQUIRIES_KEY = "events21_enquiries";
const GIFT_REQUESTS_KEY = "events21_gift_requests";
const GIFT_CATALOGUE_KEY = "events21_gift_catalogue";
const PORTFOLIO_KEY = "events21_portfolio";
const SETTINGS_KEY = "events21_settings";
const ADMIN_AUTH_KEY = "events21_admin_auth";

// --- ENQUIRIES ---
export function getEnquiries(): EventEnquiry[] {
  if (typeof window === "undefined") return INITIAL_ENQUIRIES;
  try {
    const saved = localStorage.getItem(ENQUIRIES_KEY);
    if (!saved) {
      localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(INITIAL_ENQUIRIES));
      return INITIAL_ENQUIRIES;
    }
    return JSON.parse(saved);
  } catch {
    return INITIAL_ENQUIRIES;
  }
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
  if (typeof window !== "undefined") {
    localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(updated));
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
  if (typeof window !== "undefined") {
    localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("events21_enquiries_updated"));
  }
}

export function deleteEnquiry(id: string): void {
  const existing = getEnquiries();
  const updated = existing.filter((item) => item.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("events21_enquiries_updated"));
  }
}

// --- GIFT REQUESTS ---
export function getGiftRequests(): GiftRequest[] {
  if (typeof window === "undefined") return INITIAL_GIFT_REQUESTS;
  try {
    const saved = localStorage.getItem(GIFT_REQUESTS_KEY);
    if (!saved) {
      localStorage.setItem(GIFT_REQUESTS_KEY, JSON.stringify(INITIAL_GIFT_REQUESTS));
      return INITIAL_GIFT_REQUESTS;
    }
    return JSON.parse(saved);
  } catch {
    return INITIAL_GIFT_REQUESTS;
  }
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
  if (typeof window !== "undefined") {
    localStorage.setItem(GIFT_REQUESTS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("events21_gifts_updated"));
  }
  return newReq;
}

export function updateGiftStatus(id: string, status: GiftRequest["status"]): void {
  const existing = getGiftRequests();
  const updated = existing.map((item) => (item.id === id ? { ...item, status } : item));
  if (typeof window !== "undefined") {
    localStorage.setItem(GIFT_REQUESTS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("events21_gifts_updated"));
  }
}

export function deleteGiftRequest(id: string): void {
  const existing = getGiftRequests();
  const updated = existing.filter((item) => item.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem(GIFT_REQUESTS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("events21_gifts_updated"));
  }
}

// --- GIFTS CATALOGUE (ADMIN EDITABLE & IMAGE UPLOAD) ---
export function getGiftCatalogue(): GiftItem[] {
  if (typeof window === "undefined") return GIFTS_CATALOGUE;
  try {
    const saved = localStorage.getItem(GIFT_CATALOGUE_KEY);
    if (!saved) {
      localStorage.setItem(GIFT_CATALOGUE_KEY, JSON.stringify(GIFTS_CATALOGUE));
      return GIFTS_CATALOGUE;
    }
    return JSON.parse(saved);
  } catch {
    return GIFTS_CATALOGUE;
  }
}

export function addGiftItem(item: Omit<GiftItem, "id">): GiftItem {
  const newItem: GiftItem = {
    ...item,
    id: `gift-${Date.now().toString(36)}`,
  };
  const existing = getGiftCatalogue();
  const updated = [newItem, ...existing];
  if (typeof window !== "undefined") {
    localStorage.setItem(GIFT_CATALOGUE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("events21_gift_catalogue_updated"));
  }
  return newItem;
}

export function updateGiftItem(id: string, updates: Partial<GiftItem>): void {
  const existing = getGiftCatalogue();
  const updated = existing.map((item) => (item.id === id ? { ...item, ...updates } : item));
  if (typeof window !== "undefined") {
    localStorage.setItem(GIFT_CATALOGUE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("events21_gift_catalogue_updated"));
  }
}

export function deleteGiftItem(id: string): void {
  const existing = getGiftCatalogue();
  const updated = existing.filter((item) => item.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem(GIFT_CATALOGUE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("events21_gift_catalogue_updated"));
  }
}

// --- PORTFOLIO (ADMIN EDIT & DELETE) ---
export function getPortfolio(): PortfolioItem[] {
  if (typeof window === "undefined") return PORTFOLIO_DATA;
  try {
    const saved = localStorage.getItem(PORTFOLIO_KEY);
    if (!saved) {
      localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(PORTFOLIO_DATA));
      return PORTFOLIO_DATA;
    }
    return JSON.parse(saved);
  } catch {
    return PORTFOLIO_DATA;
  }
}

export function addPortfolioItem(item: Omit<PortfolioItem, "id">): PortfolioItem {
  const newItem: PortfolioItem = {
    ...item,
    id: `port-${Date.now().toString(36)}`,
  };
  const existing = getPortfolio();
  const updated = [newItem, ...existing];
  if (typeof window !== "undefined") {
    localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("events21_portfolio_updated"));
  }
  return newItem;
}

export function updatePortfolioItem(id: string, updates: Partial<PortfolioItem>): void {
  const existing = getPortfolio();
  const updated = existing.map((item) => (item.id === id ? { ...item, ...updates } : item));
  if (typeof window !== "undefined") {
    localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("events21_portfolio_updated"));
  }
}

export function deletePortfolioItem(id: string): void {
  const existing = getPortfolio();
  const updated = existing.filter((item) => item.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("events21_portfolio_updated"));
  }
}

// --- SETTINGS ---
export function getBrandConfig() {
  if (typeof window === "undefined") return BRAND_CONFIG;
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (!saved) return BRAND_CONFIG;
    return { ...BRAND_CONFIG, ...JSON.parse(saved) };
  } catch {
    return BRAND_CONFIG;
  }
}

export function updateBrandConfig(updates: Partial<typeof BRAND_CONFIG>) {
  const current = getBrandConfig();
  const merged = { ...current, ...updates };
  if (typeof window !== "undefined") {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(merged));
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
