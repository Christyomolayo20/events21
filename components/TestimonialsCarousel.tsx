"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles, ArrowUpRight } from "lucide-react";
import { getPublishedTestimonials } from "@/lib/store";
import { INITIAL_TESTIMONIALS } from "@/lib/data";
import { Testimonial } from "@/lib/types";

export default function TestimonialsCarousel() {
  // Always initialize with genuine published defaults so SSR & initial mobile render is never empty
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    return INITIAL_TESTIMONIALS.filter((t) => t.isPublished);
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const loadData = useCallback(() => {
    const list = getPublishedTestimonials();
    if (list && list.length > 0) {
      setTestimonials(list);
    } else {
      setTestimonials(INITIAL_TESTIMONIALS.filter((t) => t.isPublished));
    }
  }, []);

  useEffect(() => {
    loadData();
    window.addEventListener("events21_testimonials_updated", loadData);
    return () => window.removeEventListener("events21_testimonials_updated", loadData);
  }, [loadData]);

  // Active list always has fallback
  const activeList =
    testimonials && testimonials.length > 0
      ? testimonials
      : INITIAL_TESTIMONIALS.filter((t) => t.isPublished);

  const handleNext = useCallback(() => {
    if (activeList.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % activeList.length);
  }, [activeList.length]);

  const handlePrev = useCallback(() => {
    if (activeList.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + activeList.length) % activeList.length);
  }, [activeList.length]);

  // Comfortable automatic scroll timer (6 seconds), pauses on hover or touch
  useEffect(() => {
    if (activeList.length <= 1 || isPaused) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }

    autoPlayRef.current = setInterval(() => {
      handleNext();
    }, 6000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [activeList.length, isPaused, handleNext]);

  // Mobile swipe gestures
  const minSwipeDistance = 40;
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

  if (activeList.length === 0) {
    return null;
  }

  const current = activeList[currentIndex % activeList.length];
  const hasImage = Boolean(current.image);

  return (
    <section
      id="testimonials"
      className="relative w-full min-h-[520px] sm:min-h-[580px] md:min-h-[640px] bg-[#18061B] text-white overflow-hidden flex flex-col justify-between"
      aria-label="Client Testimonials Carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* BACKGROUND LAYER 1: Ambient blur fill to seamlessly match section tones */}
      {hasImage && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.image}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover blur-3xl opacity-25 scale-110 transition-all duration-1000 ease-out"
          />
        </div>
      )}

      {/* BACKGROUND LAYER 2: Uncropped image fitting automatically with NO cutting or cropping */}
      {hasImage && (
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center p-4 sm:p-8 md:p-12 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.image}
            alt={current.clientName}
            className="max-w-full max-h-full w-auto h-auto object-contain object-center opacity-70 filter brightness-[0.55] contrast-105 transition-all duration-1000 ease-out"
          />
        </div>
      )}

      {/* BACKGROUND LAYER 3: Luxury Royal Plum Vignette Scrim for Crystal-Clear Text Contrast */}
      <div className="absolute inset-0 z-1 pointer-events-none bg-gradient-to-t from-[#18061B] via-[#18061B]/65 to-[#18061B]/80" />
      <div className="absolute inset-0 z-1 pointer-events-none bg-radial from-transparent via-[#18061B]/50 to-[#18061B]/90" />

      {/* FOREGROUND CONTENT LAYER: Expands and Fills the Section */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-12 md:px-16 pt-16 sm:pt-20 md:pt-24 pb-12 flex-1 flex flex-col justify-between text-center">
        {/* Top Header Badge */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-brand-soft-lavender text-xs font-sans tracking-widest uppercase font-semibold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
            <span>Client Kind Words • Cherished Hosts</span>
          </div>

          {/* Star Rating */}
          <div className="flex items-center justify-center gap-1.5 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                  i < (current.rating || 5)
                    ? "fill-brand-gold text-brand-gold drop-shadow-md"
                    : "text-white/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Grand Testimonial Quote */}
        <div className="my-auto py-4 sm:py-6 max-w-4xl mx-auto">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-gold flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Quote className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
          </div>

          <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed sm:leading-snug md:leading-tight text-white font-normal drop-shadow-lg tracking-wide">
            &ldquo;{current.quote || current.text}&rdquo;
          </blockquote>

          {current.quote && current.text && current.text !== current.quote && (
            <p className="mt-4 text-xs sm:text-sm text-white/75 font-sans leading-relaxed max-w-2xl mx-auto font-light line-clamp-2 sm:line-clamp-3">
              {current.text}
            </p>
          )}
        </div>

        {/* Client Identity & Event Role */}
        <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-xl mx-auto">
          {current.image && (
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-brand-gold shrink-0 shadow-lg ring-2 ring-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={current.image}
                alt={current.clientName}
                className="w-full h-full object-cover object-center"
              />
            </div>
          )}
          <div className="text-center sm:text-left">
            <cite className="not-italic font-serif font-bold text-lg sm:text-xl text-white block drop-shadow-xs">
              {current.clientName}
            </cite>
            {(current.roleOrEvent || current.clientRole || current.eventName) && (
              <span className="text-xs sm:text-sm font-sans font-medium text-brand-gold tracking-wider uppercase block mt-0.5">
                {current.roleOrEvent ||
                  [current.clientRole, current.eventName].filter(Boolean).join(" • ")}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* SECTION CAROUSEL CONTROLS: Floating Left / Right Arrows Across Section Edges */}
      {activeList.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="absolute left-3 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-xl hover:scale-105 active:scale-95 group"
          >
            <ChevronLeft className="w-6 h-6 text-brand-gold group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next testimonial"
            className="absolute right-3 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-xl hover:scale-105 active:scale-95 group"
          >
            <ChevronRight className="w-6 h-6 text-brand-gold group-hover:translate-x-0.5 transition-transform" />
          </button>
        </>
      )}

      {/* BOTTOM CONTROL & PAGINATION BAR */}
      <div className="relative z-10 w-full bg-[#18061B]/80 backdrop-blur-md border-t border-white/10 py-4 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Pagination Dots */}
        <div className="flex items-center gap-2">
          {activeList.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all rounded-full cursor-pointer ${
                currentIndex % activeList.length === idx
                  ? "w-8 h-2 bg-brand-gold shadow-sm"
                  : "w-2 h-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
          <span className="text-[11px] font-sans font-medium text-white/60 ml-2 tracking-widest">
            {String((currentIndex % activeList.length) + 1).padStart(2, "0")} /{" "}
            {String(activeList.length).padStart(2, "0")}
          </span>
        </div>

        {/* Mobile quick navigation arrows */}
        <div className="flex sm:hidden items-center gap-3">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white"
          >
            <ChevronLeft className="w-4 h-4 text-brand-gold" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next testimonial"
            className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white"
          >
            <ChevronRight className="w-4 h-4 text-brand-gold" />
          </button>
        </div>

        {/* Verified Client Badge */}
        <div className="inline-flex items-center gap-2 text-xs font-sans font-semibold text-brand-soft-lavender uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
          <span>Verified Host Experiences</span>
        </div>
      </div>
    </section>
  );
}
