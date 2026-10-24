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
  category: "Corporate Gifts" | "Hampers" | "Souvenirs" | "Wrapping of Eru Iyawo" | "Wrapping of EruIyawo" | "Celebration" | "Bespoke";
  price: number; // in NGN
  description: string;
  details: string[];
  image: string;
  videoUrl?: string;
  mediaType?: "image" | "video";
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

export type PortfolioCategory =
  | "Weddings"
  | "Traditional"
  | "Decor"
  | "Celebrations"
  | "Corporate Events"
  | "Proposals";

export interface PortfolioItem {
  id: string;
  title: string;
  subtitle: string;
  category: PortfolioCategory;
  year: string;
  location: string;
  image: string;
  videoUrl?: string;
  mediaType?: "image" | "video";
  featured?: boolean;
  description: string;
  highlights?: string[];
  gallery?: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  snippet?: string;
  description: string;
  image: string;
  inclusions: string[];
  suitableFor: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  roleOrEvent?: string; // e.g. "Bride & Groom", "Milestone 80th Celebrant", "Corporate Gala"
  clientRole?: string;
  eventName?: string;
  text: string;
  quote?: string;
  rating: number; // 1 to 5
  image?: string;
  isPublished: boolean;
  createdAt: string;
}

export type ConsultationStatus = "Pending Confirmation" | "Confirmed" | "Completed" | "Cancelled";

export interface ConsultationBooking {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  eventType: EventType;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "10:00 AM", "02:00 PM"
  message?: string;
  status: ConsultationStatus;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
}

export interface FounderInfo {
  name: string;
  title: string;
  image: string;
  bio: string;
  vision: string;
}

