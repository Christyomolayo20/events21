export type EventType =
  | "Wedding"
  | "Traditional Engagement"
  | "Romantic Proposal"
  | "Retirement Party"
  | "Milestone Birthday"
  | "Corporate Event & Gala"
  | "Bridal / Baby Shower"
  | "Private Soirée"
  | "Other";

export type EnquiryStatus = "New" | "In Review" | "Contacted" | "Booked" | "Archived";

export interface EventEnquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  eventType: EventType;
  eventDate: string;
  eventLocation: string;
  guestCount: string;
  budgetRange: string; // Open text input as requested
  message: string;
  status: EnquiryStatus;
  createdAt: string;
  source?: string;
  notes?: string;
}

export interface GiftItem {
  id: string;
  name: string;
  category: "Corporate Gifts" | "Hampers" | "Souvenirs" | "Wrapping of EruIyawo" | "Celebration" | "Bespoke";
  price: number; // in NGN
  description: string;
  details: string[];
  image: string;
  popular?: boolean;
  inStock: boolean;
}

export interface GiftRequest {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  recipientName: string;
  occasion: string;
  budget: string;
  itemsRequested?: string;
  deliveryDate: string;
  deliveryAddress: string;
  personalMessage?: string;
  status: "Pending" | "Sourcing" | "Assembled" | "Delivered";
  createdAt: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Weddings" | "Traditional" | "Ballrooms & Decor" | "Celebrations" | "Proposals";
  year: string;
  location: string;
  image: string;
  featured?: boolean;
  description: string;
  highlights?: string[];
  gallery?: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  inclusions: string[];
  suitableFor: string;
}
