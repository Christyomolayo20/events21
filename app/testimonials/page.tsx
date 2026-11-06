"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Quote, ArrowUpRight, Calendar, MessageSquare, Star, Sparkles } from "lucide-react";
import { getPublishedTestimonials } from "@/lib/store";
import { Testimonial } from "@/lib/types";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check local published store
    const local = getPublishedTestimonials();
    if (local && local.length > 0) {
      setTestimonials(local);
      setLoading(false);
    }

    // 2. Reconcile with server API
    const loadFromServer = async () => {
      try {
        const res = await fetch("/api/testimonials", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.testimonials) && data.testimonials.length > 0) {
            const published = data.testimonials.filter((t: Testimonial) => t.isPublished);
            if (published.length > 0) {
              setTestimonials(published);
            }
          }
        }
      } catch (err) {
        console.warn("Could not load testimonials from server:", err);
      } finally {
        setLoading(false);
      }
    };

    loadFromServer();
  }, []);

  return (
    <div className="pt-24 pb-20 md:pt-32 md:pb-28 bg-[#FAF8F5] min-h-screen">
      {/* 1. Page Header */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 sm:mb-16">
        <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-brand-purple font-sans font-semibold block mb-3">
          Client Reflections
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brand-plum font-normal leading-[1.15] mb-5 text-balance">
          Words of Praise &amp; Appreciation
        </h1>
        <div className="w-16 h-px bg-brand-gold/60 mx-auto mb-6" />
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-brand-plum/75 font-sans leading-relaxed font-light">
          Every celebration orchestrated by Events 21 is a unique journey. Read genuine reflections from the
          couples, families, and honorees we have had the privilege to serve across Nigeria and abroad.
        </p>
      </section>

      {/* 2. Testimonials Grid with Background Image for Each Review */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
        {loading && testimonials.length === 0 ? (
          <div className="py-20 text-center text-brand-plum/50 font-sans text-sm">
            Loading client stories...
          </div>
        ) : testimonials.length === 0 ? (
          <div className="max-w-xl mx-auto bg-white rounded-3xl p-10 sm:p-14 text-center border border-brand-warm-border shadow-xs">
            <div className="w-12 h-12 rounded-full bg-brand-soft-lavender text-brand-purple flex items-center justify-center mx-auto mb-4">
              <Quote className="w-5 h-5 fill-current opacity-70" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-brand-plum mb-2">
              Authentic Reviews Coming Soon
            </h3>
            <p className="text-xs sm:text-sm text-brand-plum/70 font-sans leading-relaxed mb-6">
              In accordance with our strict brand standards, only authentic reviews from our couples and milestone clients are displayed. Check back soon or book your consultation today.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
            >
              <span>Book a Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((item) => {
              const hasImage = Boolean(item.image && item.image.trim());
              const reviewText = (item.quote || item.text || "").trim();

              return (
                <div
                  key={item.id}
                  className={`group relative rounded-3xl overflow-hidden min-h-[420px] sm:min-h-[460px] p-8 sm:p-9 flex flex-col justify-between transition-all duration-500 hover:shadow-elevated hover:-translate-y-1 ${
                    hasImage
                      ? "bg-black text-white"
                      : "bg-[#24132E] text-white border border-brand-warm-border/30"
                  }`}
                >
                  {/* Uploaded image as full card background */}
                  {hasImage && (
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.clientName}
                        className="w-full h-full object-cover object-center filter brightness-[0.65] contrast-[1.08] transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {/* Dark Luxury Scrim */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-[#1A0720]/80 to-black/60" />
                    </div>
                  )}

                  {/* Top: Quote Mark & Stars */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-brand-gold flex items-center justify-center">
                        <Quote className="w-4 h-4 fill-current opacity-90" />
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${
                              s <= (item.rating || 5)
                                ? "fill-brand-gold text-brand-gold"
                                : "text-white/20"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Testimonial Quote */}
                    <blockquote className="font-serif text-lg sm:text-xl text-white font-normal leading-relaxed drop-shadow-sm">
                      &ldquo;{reviewText}&rdquo;
                    </blockquote>
                  </div>

                  {/* Bottom: Client Identity */}
                  <div className="relative z-10 pt-6 mt-6 border-t border-white/20">
                    <cite className="not-italic font-serif font-bold text-lg text-brand-gold block drop-shadow-sm">
                      {item.clientName}
                    </cite>
                    {(item.clientRole || item.eventName || item.roleOrEvent) && (
                      <span className="text-[11px] font-sans text-white/70 uppercase tracking-wider block mt-1">
                        {item.roleOrEvent || [item.clientRole, item.eventName].filter(Boolean).join(" • ")}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 3. Bottom CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-brand-warm-border shadow-xs">
          <span className="text-xs uppercase tracking-[0.2em] text-brand-purple font-medium block mb-2">
            Let&apos;s Plan Together
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-brand-plum font-normal mb-4">
            Ready to Experience Events 21 Poise?
          </h2>
          <p className="text-sm sm:text-base text-brand-plum/75 font-sans max-w-xl mx-auto leading-relaxed mb-6 font-light">
            Whether preparing for a grand wedding or an intimate milestone, we invite you to begin the conversation with our creative planning team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Consultation</span>
            </Link>
            <a
              href="https://wa.me/2348060549596?text=Hello%20Events%2021!%20I%20would%20like%20to%20discuss%20planning%20an%20event."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-brand-warm-border text-brand-plum hover:text-brand-purple text-xs font-semibold uppercase tracking-wider transition-colors bg-[#FAF8F5]"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
