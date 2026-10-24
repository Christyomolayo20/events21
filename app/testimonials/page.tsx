"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Star,
  Quote,
  CheckCircle2,
  Calendar,
  MessageSquare,
  ArrowUpRight,
  Crown,
  Heart,
} from "lucide-react";
import { getPublishedTestimonials } from "@/lib/store";
import { Testimonial } from "@/lib/types";
import ConsultationCTA from "@/components/ConsultationCTA";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [filter, setFilter] = useState<string>("All");

  const loadData = () => {
    setTestimonials(getPublishedTestimonials());
  };

  useEffect(() => {
    loadData();
    window.addEventListener("events21_testimonials_updated", loadData);
    return () => window.removeEventListener("events21_testimonials_updated", loadData);
  }, []);

  const categories = ["All", "Weddings", "Traditional", "Milestones"];

  const filtered =
    filter === "All"
      ? testimonials
      : testimonials.filter((t) => {
          const role = (t.roleOrEvent || t.eventName || t.clientRole || "").toLowerCase();
          if (filter === "Weddings") return role.includes("wedding") || role.includes("bride");
          if (filter === "Traditional") return role.includes("traditional") || role.includes("engagement") || role.includes("eru iyawo");
          if (filter === "Milestones") return role.includes("milestone") || role.includes("birthday") || role.includes("jubilee");
          return true;
        });

  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-[#FAF8F5] via-white to-brand-warm-white">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-soft-lavender border border-brand-purple/20 text-brand-purple text-xs font-sans tracking-widest uppercase font-semibold mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Cherished Host Stories &amp; Reviews</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-brand-plum leading-tight mb-4">
            Words from Our{" "}
            <span className="italic font-normal font-serif text-brand-purple">
              Cherished Hosts.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-brand-plum/80 font-sans leading-relaxed max-w-2xl mx-auto">
            Every celebration orchestrated by Events 21 is a sacred family milestone. Read authentic
            feedback and reflections from our brides, grooms, and milestone hosts across Nigeria.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-xs font-sans tracking-wide transition-all cursor-pointer ${
                  filter === cat
                    ? "bg-brand-plum text-white font-semibold shadow-xs"
                    : "bg-white text-brand-plum/75 border border-brand-warm-border hover:border-brand-purple hover:text-brand-purple"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid with Uploaded Image Backgrounds */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        {filtered.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-16 px-4 bg-white rounded-3xl border border-brand-warm-border shadow-xs">
            <Crown className="w-12 h-12 text-brand-gold mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-brand-plum mb-2">
              No Reviews in this Category Yet
            </h3>
            <p className="text-xs text-brand-plum/70 font-sans mb-6">
              Select another category above or explore all our verified client experiences.
            </p>
            <button
              type="button"
              onClick={() => setFilter("All")}
              className="px-6 py-2.5 rounded-full bg-brand-plum hover:bg-brand-purple text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Show All Reviews
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item) => {
              const hasImage = Boolean(item.image);

              return (
                <article
                  key={item.id}
                  className={`group relative rounded-3xl p-8 sm:p-9 overflow-hidden border shadow-subtle hover:shadow-elevated transition-all duration-500 flex flex-col justify-between ${
                    hasImage
                      ? "border-brand-purple/20 bg-brand-plum text-white"
                      : "bg-white text-brand-plum border-brand-warm-border"
                  }`}
                >
                  {/* Uploaded Image as Card Background */}
                  {hasImage && (
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.clientName}
                        className="w-full h-full object-cover object-center filter brightness-[0.35] contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      {/* Rich luxury royal plum gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-plum via-brand-plum/85 to-brand-plum/70 backdrop-blur-[1px]" />
                      <div className="absolute inset-0 bg-radial-at-c from-transparent via-brand-plum/30 to-brand-plum/80" />
                    </div>
                  )}

                  {/* Top Row: Quote Icon & 5 Star Rating */}
                  <div className="relative z-10 mb-6">
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div
                        className={`w-11 h-11 rounded-full flex items-center justify-center ${
                          hasImage
                            ? "bg-white/10 text-brand-gold border border-white/15 backdrop-blur-md"
                            : "bg-brand-soft-lavender/60 text-brand-purple"
                        }`}
                      >
                        <Quote className="w-5 h-5 fill-current" />
                      </div>

                      {/* 5-Star Rating */}
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < (item.rating || 5)
                                ? "fill-brand-gold text-brand-gold drop-shadow-xs"
                                : hasImage
                                ? "text-white/20"
                                : "text-brand-warm-border"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Review Narrative */}
                    <blockquote
                      className={`font-serif text-base sm:text-lg leading-relaxed font-normal ${
                        hasImage ? "text-white/95 drop-shadow-xs" : "text-brand-plum"
                      }`}
                    >
                      &ldquo;{item.quote || item.text}&rdquo;
                    </blockquote>
                  </div>

                  {/* Bottom: Client Profile & Event Details */}
                  <div className="relative z-10 pt-5 border-t border-white/15 flex items-center gap-3.5">
                    {item.image && (
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand-gold/60 shrink-0 shadow-md">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.clientName}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    )}
                    <div className="min-w-0">
                      <cite
                        className={`not-italic font-serif font-bold text-base block truncate ${
                          hasImage ? "text-white" : "text-brand-plum"
                        }`}
                      >
                        {item.clientName}
                      </cite>
                      {(item.roleOrEvent || item.clientRole || item.eventName) && (
                        <span
                          className={`text-xs font-sans font-medium block truncate ${
                            hasImage ? "text-brand-gold" : "text-brand-purple"
                          }`}
                        >
                          {item.roleOrEvent ||
                            [item.clientRole, item.eventName].filter(Boolean).join(" • ")}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Purposeful Consultation CTA Section */}
      <ConsultationCTA
        title="Ready to Orchestrate Your Unforgettable Event?"
        subtitle="Schedule a consultation with Adeola and the Events 21 royal planning team. Let us tailor our planning, styling, and coordination to your milestone celebration."
      />
    </div>
  );
}
