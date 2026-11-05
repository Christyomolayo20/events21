"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
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
    } else {
      setTestimonials([]);
    }

    // 2. Reconcile with server API
    try {
      const res = await fetch("/api/testimonials", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.testimonials)) {
          const published = data.testimonials.filter((t: Testimonial) => t.isPublished);
          setTestimonials(published);
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

  // If no testimonials created from admin, render nothing
  if (testimonials.length === 0) {
    return null;
  }

  const changeSlide = useCallback(
    (newIndex: number) => {
      if (isAnimating || testimonials.length <= 1) return;
      setIsAnimating(true);
      setCurrentIndex(newIndex);
      setTimeout(() => setIsAnimating(false), 350);
    },
    [testimonials.length, isAnimating]
  );

  const handleNext = useCallback(() => {
    changeSlide((currentIndex + 1) % testimonials.length);
  }, [changeSlide, currentIndex, testimonials.length]);

  const handlePrev = useCallback(() => {
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

  const current = testimonials[currentIndex % testimonials.length] || testimonials[0];
  const reviewText = (current?.quote || current?.text || "").trim();

  return (
    <section
      id="testimonials"
      className="relative w-full py-16 sm:py-20 md:py-24 bg-gradient-to-b from-[#24132E] via-brand-plum to-[#1B0C22] text-white overflow-hidden"
      aria-label="Client Testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Subtle ambient lighting glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-purple/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-normal">
            Testimonials
          </h2>
        </div>

        {/* Minimalist Testimonial Stage */}
        <div className="relative min-h-[220px] sm:min-h-[240px] flex flex-col justify-center text-center">
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-brand-gold flex items-center justify-center mx-auto mb-5">
            <Quote className="w-4 h-4 fill-current opacity-80" />
          </div>

          <div
            className={`transition-all duration-300 ease-out ${
              isAnimating ? "opacity-0 translate-y-2 scale-98" : "opacity-100 translate-y-0 scale-100"
            }`}
          >
            {/* ONLY the testimonial quote */}
            <blockquote className="max-w-2xl mx-auto font-serif text-lg sm:text-xl md:text-2xl text-white font-normal leading-relaxed mb-6 px-4">
              &ldquo;{reviewText}&rdquo;
            </blockquote>

            {/* ONLY the client name */}
            <cite className="not-italic font-serif font-medium text-base sm:text-lg text-brand-gold block">
              &mdash; {current.clientName}
            </cite>
          </div>
        </div>

        {/* Minimal Controls if more than 1 testimonial */}
        {testimonials.length > 1 && (
          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="text-xs font-sans tracking-widest text-white/50">
              {String((currentIndex % testimonials.length) + 1).padStart(2, "0")} /{" "}
              {String(testimonials.length).padStart(2, "0")}
            </div>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => changeSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all rounded-full cursor-pointer ${
                    currentIndex % testimonials.length === idx
                      ? "w-6 h-1.5 bg-brand-gold"
                      : "w-1.5 h-1.5 bg-white/25 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="w-8 h-8 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-brand-gold" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="w-8 h-8 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 text-brand-gold" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
