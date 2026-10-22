"use client";

import React, { useState } from "react";
import Link from "next/link";
import EnquiryForm from "./EnquiryForm";
import { Sparkles, MessageCircle, Phone, Mail, Instagram, ArrowUpRight } from "lucide-react";

export default function ContactSection() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section id="contact-enquiry" className="py-20 md:py-28 bg-brand-warm-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-soft-lavender border border-brand-purple/20 text-brand-purple text-xs font-sans tracking-widest uppercase font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Begin Your Journey</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-plum leading-tight mb-4">
            Let's Create <br />
            <span className="italic font-normal font-serif text-brand-purple">
              Something Special.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-brand-plum/75 font-sans leading-relaxed">
            Tell us what you are planning, and let's explore how we can bring your vision to life with
            effortless elegance, thoughtful styling, and seamless execution.
          </p>
        </div>

        {/* Embedded Interactive Form */}
        <div className="mb-12">
          <EnquiryForm />
        </div>

        {/* Alternative Quick Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <a
            href="https://wa.me/2348123456789?text=Hello%20Event%2021!%20I%20would%20like%20to%20enquire%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-white border border-brand-warm-border hover:border-brand-purple/40 shadow-xs hover:shadow-subtle transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-[#E8F8EE] text-[#25D366] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-serif font-bold text-brand-plum mb-1">WhatsApp Chat</h4>
            <p className="text-xs text-brand-plum/60 font-sans">Immediate quick questions</p>
          </a>

          <a
            href="mailto:hello@events21.ng"
            className="p-5 rounded-2xl bg-white border border-brand-warm-border hover:border-brand-purple/40 shadow-xs hover:shadow-subtle transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-brand-soft-lavender text-brand-purple flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-serif font-bold text-brand-plum mb-1">Direct Email</h4>
            <p className="text-xs text-brand-plum/60 font-sans">hello@events21.ng</p>
          </a>

          <a
            href="https://www.instagram.com/events_21/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-white border border-brand-warm-border hover:border-brand-purple/40 shadow-xs hover:shadow-subtle transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-brand-blush-pink text-brand-pink flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Instagram className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-serif font-bold text-brand-plum mb-1">Instagram</h4>
            <p className="text-xs text-brand-plum/60 font-sans">@events_21 (Official)</p>
          </a>
        </div>
      </div>
    </section>
  );
}
