"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Quote, ArrowUpRight } from "lucide-react";
import { getPublishedTestimonials } from "@/lib/store";
import { Testimonial } from "@/lib/types";

export default function TestimonialsCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const loadData = useCallback(async () => {
    // 1. Load from local store (only admin-managed items)
    const localList = getPublishedTestimonials();
    if (localList && localList.length > 0) {
      setTestimonials(localList);
    }

    // 2. Reconcile with server API
    try {
      const res = await fetch("/api/testimonials", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.testimonials) && data.testimonials.length > 0) {
          const published = data.testimonials.filter((t: Testimonial) => t.isPublished);
          if (published.length > 0) {
            setTestimonials(published);
          }
        } else if (localList && localList.length > 0) {
          // Push local testimonials to server so API has them
          fetch("/api/testimonials", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ testimonials: localList }),
          }).catch(() => {});
        }
      }
    } catch {
      // Safely retain existing state on network errors
    }
  }, []);

  useEffect(() => {
    loadData();
    window.addEventListener("events21_testimonials_updated", loadData);
    return () => window.removeEventListener("events21_testimonials_updated", loadData);
  }, [loadData]);

  const changeSlide = useCallback(
    (newIndex: number) => {
      if (isAnimating || testimonials.length <= 1) return;
      setIsAnimating(true);
      setCurrentIndex(newIndex);
      setTimeout(() => setIsAnimating(false), 400);
    },
    [testimonials.length, isAnimating]
  );

  const handleNext = useCallback(() => {
    if (testimonials.length <= 1) return;
    changeSlide((currentIndex + 1) % testimonials.length);
  }, [changeSlide, currentIndex, testimonials.length]);

  const handlePrev = useCallback(() => {
    if (testimonials.length <= 1) return;
    changeSlide((currentIndex - 1 + testimonials.length) % testimonials.length);
  }, [changeSlide, currentIndex, testimonials.length]);

  // Autoplay timer (7s)
  useEffect(() => {
    if (testimonials.length <= 1 || isPaused) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }

    autoPlayRef.current = setInterval(() => {
      handleNext();
    }, 7000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [testimonials.length, isPaused, handleNext]);

  // Touch Swipe for mobile
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

  // If no testimonials created from admin yet, render an elegant minimal anchor section
  if (testimonials.length === 0) {
    return (
      <section
        id="testimonials"
        className="relative w-full py-16 sm:py-20 bg-[#1A0822] text-white text-center overflow-hidden border-t border-brand-warm-border/20"
        aria-label="Client Testimonials"
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-brand-gold flex items-center justify-center mx-auto mb-4">
            <Quote className="w-4 h-4 fill-current opacity-80" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-2">
            Client Words of Praise
          </h2>
          <p className="text-xs sm:text-sm text-brand-gold-light/75 font-sans font-light max-w-md mx-auto">
            Thoughtfully planned, beautifully styled celebrations. Genuine reviews from our clients appear here.
          </p>
        </div>
      </section>
    );
  }

  const current = testimonials[currentIndex % testimonials.length] || testimonials[0];
  const hasImage = Boolean(current?.image && current.image.trim());
  const reviewText = (current?.quote || current?.text || "").trim();

  return (
    <section
      id="testimonials"
      className="relative w-full min-h-[480px] sm:min-h-[520px] md:min-h-[560px] py-18 sm:py-24 md:py-28 bg-[#15051B] text-white overflow-hidden flex flex-col justify-center"
      aria-label="Client Testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Dynamic Background: Uses the uploaded image of the active testimonial */}
      {hasImage ? (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={current.id || current.image}
            src={current.image}
            alt={current.clientName}
            className={`w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.08] transition-all duration-700 ease-out transform ${
              isAnimating ? "opacity-30 scale-105" : "opacity-100 scale-100"
            }`}
          />
          {/* Luxury Scrim Overlay: Guarantees high text contrast and editorial atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#15051B] via-[#1B0A22]/85 to-[#15051B]/90" />
          <div className="absolute inset-0 bg-[#15051B]/55" />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#24132E] via-brand-plum to-[#1B0C22] pointer-events-none" />
      )}

      {/* Foreground Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        {/* Section Title */}
        <div className="mb-6 sm:mb-8">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-brand-gold font-sans font-medium block mb-2">
            Words of Praise
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-normal drop-shadow-sm">
            Client Testimonials
          </h2>
        </div>

        {/* Minimalist Testimonial Stage */}
        <div className="relative min-h-[190px] sm:min-h-[210px] flex flex-col justify-center">
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-brand-gold flex items-center justify-center mx-auto mb-5 shadow-sm">
            <Quote className="w-4 h-4 fill-current opacity-90" />
          </div>

          <div
            className={`transition-all duration-400 ease-out ${
              isAnimating ? "opacity-0 translate-y-2 scale-98" : "opacity-100 translate-y-0 scale-100"
            }`}
          >
            {/* ONLY the testimonial quote */}
            <blockquote className="max-w-2xl mx-auto font-serif text-lg sm:text-xl md:text-2xl text-white font-normal leading-relaxed mb-5 px-4 drop-shadow-md">
              &ldquo;{reviewText}&rdquo;
            </blockquote>

            {/* ONLY the client name */}
            <cite className="not-italic font-serif font-medium text-base sm:text-lg text-brand-gold block drop-shadow-sm">
              &mdash; {current.clientName}
            </cite>
          </div>
        </div>

        {/* Controls & Dedicated Page Link */}
        <div className="mt-8 pt-5 border-t border-white/15 flex items-center justify-between text-xs font-sans">
          {/* Slide counter */}
          <div className="text-white/60 tracking-widest text-[11px]">
            {String((currentIndex % testimonials.length) + 1).padStart(2, "0")} /{" "}
            {String(testimonials.length).padStart(2, "0")}
          </div>

          {/* Dots */}
          {testimonials.length > 1 && (
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => changeSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all rounded-full cursor-pointer ${
                    currentIndex % testimonials.length === idx
                      ? "w-7 h-1.5 bg-brand-gold shadow-xs"
                      : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Action links & Navigation */}
          <div className="flex items-center gap-3">
            <Link
              href="/testimonials"
              className="hidden sm:inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-white/70 hover:text-brand-gold transition-colors py-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>

            {testimonials.length > 1 && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                  className="w-8 h-8 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4 text-brand-gold" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className="w-8 h-8 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer active:scale-95"
                >
                  <ChevronRight className="w-4 h-4 text-brand-gold" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
