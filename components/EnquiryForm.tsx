"use client";

import React, { useState } from "react";
import { saveEnquiry } from "@/lib/store";
import { EventType } from "@/lib/types";
import { Send, CheckCircle2, AlertCircle, MessageSquare, ArrowRight } from "lucide-react";

interface EnquiryFormProps {
  initialStyle?: string;
  onSuccess?: () => void;
}

export default function EnquiryForm({ initialStyle = "", onSuccess }: EnquiryFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    eventType: "Wedding" as EventType,
    eventDate: "",
    eventLocation: "Lagos, Nigeria",
    guestCount: "200-400 guests",
    budgetRange: "₦5M – ₦10M",
    message: initialStyle ? `Interested in styling similar to: ${initialStyle}` : "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const eventTypes: EventType[] = [
    "Wedding",
    "Traditional Engagement",
    "Milestone Birthday",
    "Corporate Event & Gala",
    "Bridal / Baby Shower",
    "Private Soirée",
    "Other",
  ];

  const budgetOptions = [
    "₦2,000,000 – ₦5,000,000",
    "₦5,000,000 – ₦10,000,000",
    "₦10,000,000 – ₦25,000,000",
    "₦25,000,000+",
    "Undecided / Consultation needed",
  ];

  const guestOptions = [
    "Intimate (Under 50 guests)",
    "50 – 150 guests",
    "150 – 350 guests",
    "350 – 600 guests",
    "600+ guests",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError("Please fill in all required contact details.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Post to API route
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // 2. Save to local reactive store for instant admin portal reflection
      const created = saveEnquiry(formData);
      setSubmittedId(created.id);
      setIsSubmitting(false);

      if (onSuccess) onSuccess();
    } catch (err) {
      // Fallback: save to client store directly
      const created = saveEnquiry(formData);
      setSubmittedId(created.id);
      setIsSubmitting(false);
    }
  };

  const getWhatsAppEnquiryLink = () => {
    const text = `Hello Event 21! I would like to plan an event.%0A%0A*Name:* ${encodeURIComponent(
      formData.fullName
    )}%0A*Event:* ${encodeURIComponent(formData.eventType)}%0A*Date:* ${encodeURIComponent(
      formData.eventDate || "TBD"
    )}%0A*Location:* ${encodeURIComponent(
      formData.eventLocation
    )}%0A*Guests:* ${encodeURIComponent(formData.guestCount)}%0A*Budget:* ${encodeURIComponent(
      formData.budgetRange
    )}%0A*Message:* ${encodeURIComponent(formData.message)}`;

    return `https://wa.me/2348123456789?text=${text}`;
  };

  if (submittedId) {
    return (
      <div className="bg-white rounded-2xl p-8 sm:p-10 border border-brand-warm-border shadow-elevated text-center animate-fade-in">
        <div className="w-16 h-16 bg-brand-soft-lavender text-brand-purple rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <span className="text-[11px] font-sans uppercase tracking-widest text-brand-gold font-semibold">
          Enquiry Received
        </span>
        <h3 className="font-serif text-3xl font-bold text-brand-plum mt-1 mb-3">
          Thank You, {formData.fullName.split(" ")[0]}!
        </h3>
        <p className="text-sm text-brand-plum/70 font-sans max-w-md mx-auto mb-6 leading-relaxed">
          Your event brief (Reference:{" "}
          <strong className="text-brand-purple font-mono">{submittedId}</strong>) has been logged in
          our system. Our lead planner will review your details and contact you within 24 hours.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={getWhatsAppEnquiryLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#20ba59] transition-colors shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Fast-Track on WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => {
              setSubmittedId(null);
              setFormData({
                fullName: "",
                email: "",
                phone: "",
                eventType: "Wedding",
                eventDate: "",
                eventLocation: "Lagos, Nigeria",
                guestCount: "200-400 guests",
                budgetRange: "₦5M – ₦10M",
                message: "",
              });
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-full border border-brand-warm-border text-brand-plum/70 hover:text-brand-plum text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Submit Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-6 sm:p-10 border border-brand-warm-border shadow-elevated"
    >
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {/* Full Name */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-brand-plum/80 mb-2 font-sans">
            Your Full Name <span className="text-brand-pink">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Adeola & Tunde Adeleke"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-brand-warm-border bg-brand-warm-white text-sm text-brand-plum placeholder:text-brand-plum/30 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-hidden transition-all"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-brand-plum/80 mb-2 font-sans">
            Email Address <span className="text-brand-pink">*</span>
          </label>
          <input
            type="email"
            required
            placeholder="e.g. adeola@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-brand-warm-border bg-brand-warm-white text-sm text-brand-plum placeholder:text-brand-plum/30 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-hidden transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        {/* Phone */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-brand-plum/80 mb-2 font-sans">
            Phone / WhatsApp <span className="text-brand-pink">*</span>
          </label>
          <input
            type="tel"
            required
            placeholder="e.g. +234 801 234 5678"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-brand-warm-border bg-brand-warm-white text-sm text-brand-plum placeholder:text-brand-plum/30 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-hidden transition-all"
          />
        </div>

        {/* Event Type */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-brand-plum/80 mb-2 font-sans">
            Event Category <span className="text-brand-pink">*</span>
          </label>
          <select
            value={formData.eventType}
            onChange={(e) => setFormData({ ...formData, eventType: e.target.value as EventType })}
            className="w-full px-4 py-3 rounded-xl border border-brand-warm-border bg-brand-warm-white text-sm text-brand-plum focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-hidden transition-all"
          >
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Preferred Date */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-brand-plum/80 mb-2 font-sans">
            Preferred Date
          </label>
          <input
            type="date"
            value={formData.eventDate}
            onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-brand-warm-border bg-brand-warm-white text-sm text-brand-plum focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-hidden transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        {/* Location */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-brand-plum/80 mb-2 font-sans">
            Location / Venue City
          </label>
          <input
            type="text"
            placeholder="e.g. Victoria Island, Lagos"
            value={formData.eventLocation}
            onChange={(e) => setFormData({ ...formData, eventLocation: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-brand-warm-border bg-brand-warm-white text-sm text-brand-plum placeholder:text-brand-plum/30 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-hidden transition-all"
          />
        </div>

        {/* Guest Count */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-brand-plum/80 mb-2 font-sans">
            Estimated Guests
          </label>
          <select
            value={formData.guestCount}
            onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-brand-warm-border bg-brand-warm-white text-sm text-brand-plum focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-hidden transition-all"
          >
            {guestOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Budget Range */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-brand-plum/80 mb-2 font-sans">
            Estimated Budget
          </label>
          <select
            value={formData.budgetRange}
            onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-brand-warm-border bg-brand-warm-white text-sm text-brand-plum focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-hidden transition-all"
          >
            {budgetOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message / Vision */}
      <div className="mb-6">
        <label className="block text-xs uppercase tracking-wider font-semibold text-brand-plum/80 mb-2 font-sans">
          Your Event Vision & Specific Requests
        </label>
        <textarea
          rows={4}
          placeholder="Tell us about the vibe, theme, colour palette, or specific services you require (e.g. full planning, decor, cold fireworks, Gifts by Adeola)..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-brand-warm-border bg-brand-warm-white text-sm text-brand-plum placeholder:text-brand-plum/30 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-hidden transition-all"
        />
      </div>

      {/* Submit Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-brand-warm-border/60">
        <p className="text-xs text-brand-plum/50 font-sans">
          All inquiries receive a personal response within 24 hours.
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-sm hover:shadow active:scale-[0.99] disabled:opacity-50"
        >
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            <>
              <span>Submit Event Brief</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
