"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import EnquiryForm from "@/components/EnquiryForm";
import { Sparkles, Phone, Mail, MapPin, Instagram, Clock, MessageSquare } from "lucide-react";

function ContactContent() {
  const searchParams = useSearchParams();
  const service = searchParams.get("service") || "";
  const preferredStyle = searchParams.get("preferredStyle") || "";

  const initialContext = preferredStyle
    ? `Style Reference: ${preferredStyle}`
    : service
    ? `Interested in: ${service}`
    : "";

  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-soft-lavender border border-brand-purple/20 text-brand-purple text-xs font-sans tracking-widest uppercase font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consultation & Inquiries</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-brand-plum leading-tight mb-6">
            Let's Plan Your <br />
            <span className="italic font-normal font-serif text-brand-purple">
              Next Celebration.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-brand-plum/75 font-sans leading-relaxed">
            Every memorable event starts with an intentional conversation. Complete the enquiry
            brief below, or reach out to our team directly via WhatsApp or telephone.
          </p>
        </div>

        {/* 2 Column Layout: Details on Left, Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Contact Details Card (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-warm-border shadow-xs space-y-6">
              <h3 className="font-serif text-2xl font-bold text-brand-plum">
                Studio Information
              </h3>

              <div className="space-y-4 text-sm font-sans text-brand-plum/80">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-soft-lavender text-brand-purple flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-brand-plum/50 font-semibold">
                      Location
                    </span>
                    <span className="font-medium text-xs leading-relaxed block">
                      No 12, Johnson Estate, Ojodu Berger, Lagos, Lagos, Nigeria
                    </span>
                    <span className="block text-xs text-brand-plum/60 mt-0.5">
                      Available for travel nationwide
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-soft-lavender text-brand-purple flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-brand-plum/50 font-semibold">
                      Hotline & Telephone
                    </span>
                    <a
                      href="tel:08060549596"
                      className="font-medium hover:text-brand-purple transition-colors text-base font-mono"
                    >
                      08060549596
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-soft-lavender text-brand-purple flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-brand-plum/50 font-semibold">
                      Email Address
                    </span>
                    <a
                      href="mailto:Royaltyeventservice@gmail.com"
                      className="font-medium hover:text-brand-purple transition-colors break-all text-xs"
                    >
                      Royaltyeventservice@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-blush-pink text-brand-pink flex items-center justify-center shrink-0">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-brand-plum/50 font-semibold">
                      Instagram Pages
                    </span>
                    <div className="space-y-0.5">
                      <a
                        href="https://www.instagram.com/events_21/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-brand-purple hover:underline block text-xs"
                      >
                        Event 21: @events_21
                      </a>
                      <a
                        href="https://www.instagram.com/giftsbyadeola/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-brand-pink hover:underline block text-xs"
                      >
                        Gifts by Adeola: @giftsbyadeola
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-warm-gray text-brand-gold flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-brand-plum/50 font-semibold">
                      Consultation Hours
                    </span>
                    <span className="font-medium text-xs">Mon – Sat: 9:00am – 6:00pm</span>
                    <span className="block text-xs text-brand-plum/60 mt-0.5">
                      Consultations strictly by appointment
                    </span>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp banner */}
              <div className="pt-4 border-t border-brand-warm-border">
                <a
                  href="https://wa.me/2348060549596?text=Hello%20Event%2021!%20I%20would%20like%20to%20plan%20an%20event."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-wider font-semibold transition-colors shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp: 08060549596</span>
                </a>
              </div>
            </div>

            {/* Gifts by Adeola callout */}
            <div className="p-6 rounded-3xl bg-[#FFF9FB] border border-brand-pink/20 space-y-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-pink font-sans block">
                Gifts by Adeola
              </span>
              <h4 className="font-serif text-lg font-bold text-brand-plum">
                Curated Gifting on a Budget
              </h4>
              <p className="text-xs text-brand-plum/70 font-sans leading-relaxed">
                Corporate gifts, hampers, guest souvenirs, and bespoke wrapping of traditional Yoruba
                EruIyawo.
              </p>
              <div className="pt-2">
                <a
                  href="https://www.instagram.com/giftsbyadeola/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-brand-pink font-semibold uppercase tracking-wider hover:underline inline-flex items-center gap-1"
                >
                  <span>Visit @giftsbyadeola</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form (8 cols) */}
          <div className="lg:col-span-8">
            <EnquiryForm initialStyle={initialContext} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="pt-40 text-center text-sm">Loading enquiry form...</div>}>
      <ContactContent />
    </Suspense>
  );
}
