"use client";

import React, { useState } from "react";
import { saveEnquiry } from "@/lib/store";
import { EventType } from "@/lib/types";
import { Send, CheckCircle2, AlertCircle, MessageSquare, Crown } from "lucide-react";

interface EnquiryFormProps {
  initialStyle?: string;
  onSuccess?: () => void;
}

export default function EnquiryForm({ initialStyle = "", onSuccess }: EnquiryFormProps) {
  // Completely blank initial form as explicitly requested: "there shouldn't be already filled form"
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    eventType: "" as EventType | "",
    eventDate: "",
    eventLocation: "",
    guestCount: "",
    budgetRange: "", // Open text input as requested
    message: initialStyle ? `Interested in: ${initialStyle}` : "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const eventTypes: EventType[] = [
    "Wedding",
    "Traditional Engagement",
    "Romantic Proposal",
    "Retirement Party",
    "Milestone Birthday",
    "Corporate Event & Gala",
    "Bridal / Baby Shower",
    "Private Soirée",
    "Other",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.eventType) {
      setError("Please fill in your name, email, phone number, and select an event category.");
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const created = saveEnquiry({
        ...formData,
        eventType: formData.eventType as EventType,
      });

      setSubmittedId(created.id);
      setIsSubmitting(false);
      if (onSuccess) onSuccess();
    } catch {
      const created = saveEnquiry({
        ...formData,
        eventType: formData.eventType as EventType,
      });
      setSubmittedId(created.id);
      setIsSubmitting(false);
    }
  };

  const getWhatsAppEnquiryLink = () => {
    const text = `Hello Event 21! I would like to plan an event.%0A%0A*Name:* ${encodeURIComponent(
      formData.fullName
    )}%0A*Event Category:* ${encodeURIComponent(formData.eventType)}%0A*Date:* ${encodeURIComponent(
      formData.eventDate || "TBD"
    )}%0A*Location:* ${encodeURIComponent(
      formData.eventLocation || "Not specified"
    )}%0A*Estimated Guests:* ${encodeURIComponent(
      formData.guestCount || "Not specified"
    )}%0A*Estimated Budget:* ${encodeURIComponent(
      formData.budgetRange || "To be discussed"
    )}%0A*Message:* ${encodeURIComponent(formData.message || "Consultation requested")}`;

    return `https://wa.me/2348060549596?text=${text}`;
  };

  if (submittedId) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-brand-gold/30 shadow-elevated text-center animate-fade-in relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-brand-soft-lavender/50 rounded-full blur-2xl pointer-events-none" />

        <div className="w-16 h-16 bg-brand-soft-lavender text-brand-purple rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-purple/20">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-brand-gold font-semibold">
          Royal Consultation Request Received
        </span>

        <h3 className="font-serif text-3xl sm:text-4xl font-bold text-brand-plum mt-1 mb-3">
          Thank You, {formData.fullName.split(" ")[0]}!
        </h3>

        <p className="text-sm text-brand-plum/75 font-sans max-w-md mx-auto mb-8 leading-relaxed">
          Your event brief (Reference:{" "}
          <strong className="text-brand-purple font-mono">{submittedId}</strong>) has been received
          by our lead planner. We look forward to bringing regal elegance to your milestone.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={getWhatsAppEnquiryLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#20ba59] transition-all shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Fast-Track on WhatsApp (08060549596)</span>
          </a>

          <button
            type="button"
            onClick={() => {
              setSubmittedId(null);
              setFormData({
                fullName: "",
                email: "",
                phone: "",
                eventType: "",
                eventDate: "",
                eventLocation: "",
                guestCount: "",
                budgetRange: "",
                message: "",
              });
            }}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-brand-warm-border text-brand-plum/75 hover:text-brand-plum text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Submit Another Brief
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-brand-warm-border shadow-elevated relative overflow-hidden"
    >
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Row 1: Full Name & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-brand-plum/80 mb-2 font-sans">
            Your Full Name <span className="text-brand-pink">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Chief & Mrs. Adeleke"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full px-4 py-3.5 rounded-xl border border-brand-warm-border bg-brand-warm-white text-sm text-brand-plum placeholder:text-brand-plum/30 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-hidden transition-all"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-brand-plum/80 mb-2 font-sans">
            Email Address <span className="text-brand-pink">*</span>
          </label>
          <input
            type="email"
            required
            placeholder="e.g. adeleke@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3.5 rounded-xl border border-brand-warm-border bg-brand-warm-white text-sm text-brand-plum placeholder:text-brand-plum/30 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-hidden transition-all"
          />
        </div>
      </div>

      {/* Row 2: Phone, Category & Preferred Date */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-brand-plum/80 mb-2 font-sans">
            Phone / WhatsApp <span className="text-brand-pink">*</span>
          </label>
          <input
            type="tel"
            required
            placeholder="e.g. 08060549596"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3.5 rounded-xl border border-brand-warm-border bg-brand-warm-white text-sm text-brand-plum placeholder:text-brand-plum/30 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-hidden transition-all"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-brand-plum/80 mb-2 font-sans">
            Event Category <span className="text-brand-pink">*</span>
          </label>
          <select
            required
            value={formData.eventType}
            onChange={(e) => setFormData({ ...formData, eventType: e.target.value as EventType })}
            className="w-full px-4 py-3.5 rounded-xl border border-brand-warm-border bg-brand-warm-white text-sm text-brand-plum focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-hidden transition-all"
          >
            <option value="" disabled>
              Select event category...
            </option>
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-brand-plum/80 mb-2 font-sans">
            Preferred Date
          </label>
          <input
            type="date"
            value={formData.eventDate}
            onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
            className="w-full px-4 py-3.5 rounded-xl border border-brand-warm-border bg-brand-warm-white text-sm text-brand-plum focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-hidden transition-all"
          />
        </div>
      </div>

      {/* Row 3: Location, Guest Count & OPEN BUDGET INPUT FIELD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-brand-plum/80 mb-2 font-sans">
            Location / Venue City
          </label>
          <input
            type="text"
            placeholder="e.g. Ojodu Berger, Ikeja, Lagos"
            value={formData.eventLocation}
            onChange={(e) => setFormData({ ...formData, eventLocation: e.target.value })}
            className="w-full px-4 py-3.5 rounded-xl border border-brand-warm-border bg-brand-warm-white text-sm text-brand-plum placeholder:text-brand-plum/30 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-hidden transition-all"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-brand-plum/80 mb-2 font-sans">
            Estimated Guests
          </label>
          <input
            type="text"
            placeholder="e.g. 50, 250, or 600 guests"
            value={formData.guestCount}
            onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
            className="w-full px-4 py-3.5 rounded-xl border border-brand-warm-border bg-brand-warm-white text-sm text-brand-plum placeholder:text-brand-plum/30 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-hidden transition-all"
          />
        </div>

        {/* User Request: "estimated budget should be an input field" */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-brand-plum/80 mb-2 font-sans">
            Estimated Budget (Input)
          </label>
          <input
            type="text"
            placeholder="e.g. ₦3,500,000 or ₦15M"
            value={formData.budgetRange}
            onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
            className="w-full px-4 py-3.5 rounded-xl border border-brand-warm-border bg-brand-warm-white text-sm text-brand-plum placeholder:text-brand-plum/30 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-hidden transition-all"
          />
        </div>
      </div>

      {/* Row 4: Message / Royal Vision */}
      <div className="mb-6">
        <label className="block text-xs uppercase tracking-wider font-semibold text-brand-plum/80 mb-2 font-sans">
          Your Event Vision & Specific Requirements
        </label>
        <textarea
          rows={4}
          placeholder="Describe your desired vibe, theme, colour palette, special requests (e.g. low fog & sparklers, traditional coordination, Gifts by Adeola souvenirs or EruIyawo wrapping)..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3.5 rounded-xl border border-brand-warm-border bg-brand-warm-white text-sm text-brand-plum placeholder:text-brand-plum/30 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple focus:outline-hidden transition-all"
        />
      </div>

      {/* Submit Button & Direct WhatsApp CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-brand-warm-border/60">
        <p className="text-xs text-brand-plum/60 font-sans">
          Direct Studio Hotline: <strong className="text-brand-purple">08060549596</strong>
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-md hover:shadow-lg active:scale-[0.99] disabled:opacity-50"
        >
          {isSubmitting ? (
            <span>Submitting Brief...</span>
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
