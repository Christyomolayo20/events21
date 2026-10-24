"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles, ArrowUpRight } from "lucide-react";
import { getPublishedTestimonials } from "@/lib/store";
import { Testimonial } from "@/lib/types";

export default function TestimonialsCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const loadData = useCallback(() => {
    const list = getPublishedTestimonials();
    setTestimonials(list);
  }, []);

  useEffect(() => {
    loadData();
    window.addEventListener("events21_testimonials_updated", loadData);
    return () => window.removeEventListener("events21_testimonials_updated", loadData);
  }, [loadData]);

  const handleNext = useCallback(() => {
    if (testimonials.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    if (testimonials.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Comfortable automatic scroll timer (5.5 seconds), pauses on hover or interaction
  useEffect(() => {
    if (testimonials.length <= 1 || isPaused) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }

    autoPlayRef.current = setInterval(() => {
      handleNext();
    }, 5500);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [testimonials.length, isPaused, handleNext]);

  // Touch & Swipe handlers
  const minSwipeDistance = 45;

  const onTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    setIsPaused(false);
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
  };

  // If no published genuine testimonials exist, avoid rendering fabricated reviews
  if (testimonials.length === 0) {
    return null;
  }

  const current = testimonials[currentIndex];

  return (
    <section
      className="py-16 md:py-24 bg-brand-warm-white/70 border-b border-brand-warm-border/60 overflow-hidden"
      aria-label="Client Testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle Section Header */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-soft-lavender border border-brand-purple/20 text-brand-purple text-xs font-sans tracking-widest uppercase font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Client Kind Words</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-plum leading-tight mb-8">
          Words from Our{" "}
          <span className="italic font-normal font-serif text-brand-purple">
            Cherished Hosts.
          </span>
        </h2>

        {/* Testimonial Card Frame with Uploaded Image Background */}
        <div
          className={`relative rounded-3xl p-8 sm:p-12 md:p-14 overflow-hidden border shadow-elevated transition-all duration-500 ${
            current.image
              ? "border-brand-purple/30 bg-brand-plum text-white"
              : "bg-white text-brand-plum border-brand-warm-border"
          }`}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Uploaded Image as Card Background */}
          {current.image && (
            <div className="absolute inset-0 z-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={current.image}
                alt={current.clientName}
                className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-105 scale-105 transition-all duration-1000 ease-out"
              />
              {/* Luxury royal gradient overlay to guarantee perfect text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-plum via-brand-plum/85 to-brand-plum/70 backdrop-blur-[1px]" />
              <div className="absolute inset-0 bg-radial-at-c from-transparent via-brand-plum/40 to-brand-plum/80" />
            </div>
          )}

          {/* Testimonial Content Layer */}
          <div className="relative z-10">
            {/* Subtle Decorative Quote Icon */}
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 ${
                current.image
                  ? "bg-white/10 text-brand-gold border border-white/15 backdrop-blur-md"
                  : "bg-brand-soft-lavender/50 text-brand-purple"
              }`}
            >
              <Quote className="w-6 h-6 fill-current" />
            </div>

            {/* Star Rating */}
            <div className="flex items-center justify-center gap-1.5 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                    i < (current.rating || 5)
                      ? "fill-brand-gold text-brand-gold drop-shadow-xs"
                      : current.image
                      ? "text-white/20"
                      : "text-brand-warm-border"
                  }`}
                />
              ))}
            </div>

            {/* Testimonial Quote */}
            <blockquote
              className={`font-serif text-lg sm:text-xl md:text-2xl leading-relaxed font-normal mb-8 max-w-2xl mx-auto ${
                current.image ? "text-white drop-shadow-xs" : "text-brand-plum"
              }`}
            >
              &ldquo;{current.quote || current.text}&rdquo;
            </blockquote>

            {/* Client Bio */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              {current.image && (
                <div className="w-13 h-13 rounded-full overflow-hidden border-2 border-brand-gold/60 shrink-0 shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={current.image}
                    alt={current.clientName}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              )}
              <div className="text-center sm:text-left">
                <cite
                  className={`not-italic font-serif font-bold text-base sm:text-lg block ${
                    current.image ? "text-white" : "text-brand-plum"
                  }`}
                >
                  {current.clientName}
                </cite>
                {(current.roleOrEvent || current.clientRole || current.eventName) && (
                  <span
                    className={`text-xs font-sans font-medium block mt-0.5 ${
                      current.image ? "text-brand-gold" : "text-brand-purple"
                    }`}
                  >
                    {current.roleOrEvent ||
                      [current.clientRole, current.eventName].filter(Boolean).join(" • ")}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          {testimonials.length > 1 && (
            <div className="flex items-center justify-between absolute inset-x-4 top-1/2 -translate-y-1/2 pointer-events-none z-20">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className={`w-11 h-11 rounded-full shadow-md flex items-center justify-center pointer-events-auto transition-all active:scale-95 cursor-pointer ${
                  current.image
                    ? "bg-white/15 hover:bg-white text-white hover:text-brand-plum backdrop-blur-md border border-white/20"
                    : "bg-white/90 border border-brand-warm-border text-brand-plum hover:bg-brand-purple hover:text-white hover:border-brand-purple"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className={`w-11 h-11 rounded-full shadow-md flex items-center justify-center pointer-events-auto transition-all active:scale-95 cursor-pointer ${
                  current.image
                    ? "bg-white/15 hover:bg-white text-white hover:text-brand-plum backdrop-blur-md border border-white/20"
                    : "bg-white/90 border border-brand-warm-border text-brand-plum hover:bg-brand-purple hover:text-white hover:border-brand-purple"
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Pagination Dots */}
        {testimonials.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx
                    ? "w-7 bg-brand-purple"
                    : "w-2 bg-brand-warm-border hover:bg-brand-plum/40"
                }`}
              />
            ))}
          </div>
        )}

        {/* Explore All Testimonials Page Link */}
        <div className="mt-8 text-center">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-brand-plum/20 hover:border-brand-purple text-brand-plum hover:text-brand-purple text-xs font-sans uppercase tracking-widest font-semibold transition-colors bg-white shadow-xs"
          >
            <span>Read All Client Reviews &amp; Stories</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
