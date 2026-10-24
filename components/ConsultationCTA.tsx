"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, MessageCircle, Sparkles, Calendar } from "lucide-react";

interface ConsultationCTAProps {
  title?: string;
  subtitle?: string;
}

export default function ConsultationCTA({
  title = "Ready to Bring Your Vision to Life?",
  subtitle = "Whether planning a regal wedding, an intimate milestone birthday, or a grand gala across Ibadan, Lagos, or nationwide, we are here to guide every step with poise.",
}: ConsultationCTAProps) {
  return (
    <section className="py-16 md:py-24 bg-brand-warm-white relative overflow-hidden">
      {/* Subtle Ambient Background Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-soft-lavender/60 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-brand-purple/20 text-brand-purple text-xs font-sans tracking-widest uppercase font-semibold mb-4 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Start the Conversation</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-plum leading-tight mb-4">
          {title}
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-brand-plum/75 font-sans max-w-2xl mx-auto leading-relaxed mb-8">
          {subtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-md hover:shadow-lg active:scale-98"
          >
            <Calendar className="w-4 h-4" />
            <span>Book a Consultation</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <a
            href="https://wa.me/2348060549596?text=Hello%20Events%2021!%20I%20would%20like%20to%20discuss%20an%20upcoming%20celebration."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white hover:bg-brand-warm-gray text-brand-plum border border-brand-warm-border text-xs font-semibold uppercase tracking-wider transition-all shadow-xs"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>Chat via WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
