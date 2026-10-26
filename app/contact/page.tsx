"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import ConsultationCalendar from "@/components/ConsultationCalendar";
import EnquiryForm from "@/components/EnquiryForm";
import { Sparkles, Phone, Mail, MapPin, Instagram, Clock, MessageSquare, Calendar, Send } from "lucide-react";
import { BRAND_CONFIG } from "@/lib/data";

function ContactContent() {
  const searchParams = useSearchParams();
  const service = searchParams.get("service") || "";
  const preferredStyle = searchParams.get("preferredStyle") || "";

  const initialContext = preferredStyle
    ? `Style Reference: ${preferredStyle}`
    : service
    ? `Interested in: ${service}`
    : "";

  const [activeMode, setActiveMode] = useState<"calendar" | "brief">("calendar");

  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Short Introductory Heading & Invitation */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-soft-lavender border border-brand-purple/20 text-brand-purple text-xs font-sans tracking-widest uppercase font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consultation &amp; Enquiries</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-brand-plum leading-tight mb-4">
            Schedule Your{" "}
            <span className="italic font-normal font-serif text-brand-purple">
              Event Consultation.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-brand-plum/75 font-sans leading-relaxed">
            Every memorable celebration begins with an intentional conversation. Select an available
            date and time slot for a 1-on-1 consultation, or send us your detailed event brief.
          </p>

          {/* Mode Switcher: Calendar Booking vs Event Brief */}
          <div className="inline-flex flex-col sm:flex-row items-center p-1.5 rounded-2xl sm:rounded-full bg-brand-warm-gray border border-brand-warm-border mt-6 w-full sm:w-auto max-w-sm sm:max-w-none gap-1 sm:gap-0">
            <button
              type="button"
              onClick={() => setActiveMode("calendar")}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 sm:py-2 rounded-xl sm:rounded-full text-xs font-sans font-semibold tracking-wide transition-all w-full sm:w-auto ${
                activeMode === "calendar"
                  ? "bg-brand-purple text-white shadow-xs"
                  : "text-brand-plum/70 hover:text-brand-plum"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Consultation Slot</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveMode("brief")}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 sm:py-2 rounded-xl sm:rounded-full text-xs font-sans font-semibold tracking-wide transition-all w-full sm:w-auto ${
                activeMode === "brief"
                  ? "bg-brand-purple text-white shadow-xs"
                  : "text-brand-plum/70 hover:text-brand-plum"
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Event Brief</span>
            </button>
          </div>
        </div>

        {/* 2-Column Layout: Official Contact Info on Left, Booking Calendar on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Official Business Contact Information (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-warm-border shadow-xs space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-brand-gold font-semibold font-sans block mb-1">
                  Events 21 Studio
                </span>
                <h2 className="font-serif text-2xl font-bold text-brand-plum">
                  Official Contact Details
                </h2>
              </div>

              <div className="space-y-4 text-sm font-sans text-brand-plum/80">
                {/* Phone Number (Merged WhatsApp & Direct Phone) */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-soft-lavender text-brand-purple flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-brand-plum/50 font-semibold">
                      Phone Number
                    </span>
                    <a
                      href="tel:08060549596"
                      className="font-medium hover:text-brand-purple transition-colors text-base font-sans block text-brand-plum"
                    >
                      +234 806 054 9596
                    </a>
                    <span className="text-[11px] text-brand-plum/50 block">Calls &amp; WhatsApp</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-soft-lavender text-brand-purple flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-brand-plum/50 font-semibold">
                      Official Email
                    </span>
                    <a
                      href="mailto:Royaltyeventservice@gmail.com"
                      className="font-medium hover:text-brand-purple transition-colors break-all text-xs block"
                    >
                      Royaltyeventservice@gmail.com
                    </a>
                  </div>
                </div>

                {/* Studio Location & Service Coverage */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-warm-gray text-brand-gold flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-brand-plum/50 font-semibold">
                      Studio Address &amp; Coverage
                    </span>
                    <span className="font-medium text-xs leading-relaxed block text-brand-plum">
                      No 12, Johnson Estate, Ojodu Berger, Lagos, Nigeria
                    </span>
                    <span className="block text-xs text-brand-purple font-medium mt-1">
                      Serving clients nationwide &amp; available to travel
                    </span>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-warm-gray text-brand-plum/60 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-brand-plum/50 font-semibold">
                      Consultation Hours
                    </span>
                    <span className="font-medium text-xs block">
                      Mon – Sat: 9:00 AM – 6:00 PM
                    </span>
                    <span className="text-[11px] text-brand-plum/50 block mt-0.5">
                      Strictly by scheduled appointment
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Consultation Calendar & Booking Interface (8 cols) */}
          <div className="lg:col-span-8">
            {activeMode === "calendar" ? (
              <ConsultationCalendar initialService={service} />
            ) : (
              <EnquiryForm initialStyle={initialContext} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="pt-40 text-center text-sm font-sans">Loading consultation portal...</div>}>
      <ContactContent />
    </Suspense>
  );
}
