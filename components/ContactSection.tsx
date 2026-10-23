"use client";

import React from "react";
import EnquiryForm from "./EnquiryForm";
import { Sparkles, MessageCircle, Mail, Instagram, MapPin } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact-enquiry" className="py-14 md:py-20 bg-brand-warm-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-soft-lavender border border-brand-purple/20 text-brand-purple text-xs font-sans tracking-widest uppercase font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Begin Your Royal Journey</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-plum leading-tight mb-3">
            Let's Create{" "}
            <span className="italic font-normal font-serif text-brand-purple">
              Something Regal.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-brand-plum/75 font-sans leading-relaxed">
            Tell us about your upcoming celebration, wedding, proposal, or retirement milestone.
            Let us explore how we can orchestrate your vision with effortless elegance.
          </p>
        </div>

        {/* Embedded Interactive Blank Form */}
        <div className="mb-10">
          <EnquiryForm />
        </div>

        {/* Studio Direct Communication Avenues */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <a
            href="https://wa.me/2348060549596?text=Hello%20Event%2021!%20I%20would%20like%20to%20enquire%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-2xl bg-white border border-brand-warm-border hover:border-brand-purple/40 shadow-xs hover:shadow-subtle transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-[#E8F8EE] text-[#25D366] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-serif font-bold text-brand-plum mb-1">WhatsApp Hotline</h4>
            <p className="text-xs text-brand-purple font-mono font-semibold">08060549596</p>
            <span className="text-[11px] text-brand-plum/50 block mt-1">Direct instant chat</span>
          </a>

          <a
            href="mailto:Royaltyeventservice@gmail.com"
            className="p-6 rounded-2xl bg-white border border-brand-warm-border hover:border-brand-purple/40 shadow-xs hover:shadow-subtle transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-brand-soft-lavender text-brand-purple flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-serif font-bold text-brand-plum mb-1">Official Email</h4>
            <p className="text-xs text-brand-purple font-sans font-medium break-all">
              Royaltyeventservice@gmail.com
            </p>
            <span className="text-[11px] text-brand-plum/50 block mt-1">Written proposals & decks</span>
          </a>

          <div className="p-6 rounded-2xl bg-white border border-brand-warm-border shadow-xs">
            <div className="w-10 h-10 rounded-full bg-brand-warm-gray text-brand-gold flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-serif font-bold text-brand-plum mb-1">Studio Location</h4>
            <p className="text-xs text-brand-plum/80 font-sans leading-tight">
              No 12, Johnson Estate, Ojodu Berger, Lagos, Nigeria
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
