"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react";
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

        {/* Testimonial Card Frame */}
        <div
          className="relative bg-white rounded-3xl p-8 sm:p-12 md:p-14 border border-brand-warm-border shadow-xs transition-all duration-300"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Subtle Decorative Quote Icon */}
          <div className="w-12 h-12 rounded-full bg-brand-soft-lavender/50 text-brand-purple flex items-center justify-center mx-auto mb-6">
            <Quote className="w-6 h-6 fill-brand-purple/20" />
          </div>

          {/* Star Rating */}
          <div className="flex items-center justify-center gap-1 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                  i < (current.rating || 5)
                    ? "fill-brand-gold text-brand-gold"
                    : "text-brand-warm-border"
                }`}
              />
            ))}
          </div>

          {/* Testimonial Quote */}
          <blockquote className="font-serif text-lg sm:text-xl md:text-2xl text-brand-plum leading-relaxed font-normal mb-8 max-w-2xl mx-auto">
            &ldquo;{current.quote || current.text}&rdquo;
          </blockquote>

          {/* Client Bio */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {current.image && (
              <div className="w-12 h-12 rounded-full overflow-hidden border border-brand-warm-border shrink-0 shadow-xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={current.image}
                  alt={current.clientName}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            )}
            <div className="text-center sm:text-left">
              <cite className="not-italic font-serif font-bold text-brand-plum text-base block">
                {current.clientName}
              </cite>
              {(current.roleOrEvent || current.clientRole || current.eventName) && (
                <span className="text-xs text-brand-purple font-sans font-medium block">
                  {current.roleOrEvent ||
                    [current.clientRole, current.eventName].filter(Boolean).join(" • ")}
                </span>
              )}
            </div>
          </div>

          {/* Navigation Controls */}
          {testimonials.length > 1 && (
            <div className="flex items-center justify-between absolute inset-x-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full bg-white/90 border border-brand-warm-border shadow-xs hover:bg-brand-purple hover:text-white hover:border-brand-purple text-brand-plum flex items-center justify-center pointer-events-auto transition-all active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full bg-white/90 border border-brand-warm-border shadow-xs hover:bg-brand-purple hover:text-white hover:border-brand-purple text-brand-plum flex items-center justify-center pointer-events-auto transition-all active:scale-95"
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
                className={`h-2 rounded-full transition-all ${
                  currentIndex === idx
                    ? "w-7 bg-brand-purple"
                    : "w-2 bg-brand-warm-border hover:bg-brand-plum/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
