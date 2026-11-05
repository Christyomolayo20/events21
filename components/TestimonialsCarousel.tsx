"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { getPublishedTestimonials } from "@/lib/store";
import { INITIAL_TESTIMONIALS } from "@/lib/data";
import { Testimonial } from "@/lib/types";

export default function TestimonialsCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    return INITIAL_TESTIMONIALS.filter((t) => t.isPublished);
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const loadData = useCallback(async () => {
    // 1. Load from local store
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

  const activeList = testimonials.length > 0 ? testimonials : INITIAL_TESTIMONIALS;

  const changeSlide = useCallback(
    (newIndex: number) => {
      if (isAnimating || activeList.length <= 1) return;
      setIsAnimating(true);
      setCurrentIndex(newIndex);
      setTimeout(() => setIsAnimating(false), 400);
    },
    [activeList.length, isAnimating]
  );

  const handleNext = useCallback(() => {
    changeSlide((currentIndex + 1) % activeList.length);
  }, [changeSlide, currentIndex, activeList.length]);

  const handlePrev = useCallback(() => {
    changeSlide((currentIndex - 1 + activeList.length) % activeList.length);
  }, [changeSlide, currentIndex, activeList.length]);

  // Autoplay timer (7s)
  useEffect(() => {
    if (activeList.length <= 1 || isPaused) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }

    autoPlayRef.current = setInterval(() => {
      handleNext();
    }, 7000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [activeList.length, isPaused, handleNext]);

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

  const current = activeList[currentIndex % activeList.length] || activeList[0];
  const hasImage = Boolean(current?.image && current.image.trim());
  const reviewText = (current?.quote || current?.text || "").trim();
  const roleText = (
    current?.roleOrEvent ||
    [current?.clientRole, current?.eventName].filter(Boolean).join(" • ")
  ).trim();

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
      {/* Subtle ambient lighting glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-purple/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Eyebrow & Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <span className="text-xs uppercase tracking-[0.2em] text-brand-gold font-medium block mb-2">
            Client Words
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal leading-tight">
            Cherished Experiences
          </h2>
        </div>

        {/* Testimonial Stage Card */}
        <div className="relative min-h-[300px] sm:min-h-[320px] flex flex-col justify-center text-center">
          {/* Subtle Quote Icon Accent */}
          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 text-brand-gold flex items-center justify-center mx-auto mb-6">
            <Quote className="w-5 h-5 fill-current opacity-80" />
          </div>

          {/* Animated Quote Container */}
          <div
            className={`transition-all duration-400 ease-out ${
              isAnimating ? "opacity-0 translate-y-2 scale-98" : "opacity-100 translate-y-0 scale-100"
            }`}
          >
            {/* Star Rating */}
            {Boolean(current?.rating && current.rating > 0) && (
              <div className="flex items-center justify-center gap-1.5 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${
                      i < (current.rating || 5)
                        ? "fill-brand-gold text-brand-gold"
                        : "text-white/20"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Testimonial Quote Text */}
            <blockquote className="max-w-3xl mx-auto font-serif text-lg sm:text-2xl md:text-3xl text-white font-normal leading-relaxed sm:leading-snug mb-8 px-4">
              &ldquo;{reviewText}&rdquo;
            </blockquote>

            {/* Client Identity & Portrait Avatar */}
            <div className="flex items-center justify-center gap-3.5">
              {hasImage && (
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-brand-gold/60 shrink-0 shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={current.image}
                    alt={current.clientName}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              )}
              <div className="text-left">
                <cite className="not-italic font-serif font-bold text-base sm:text-lg text-white block">
                  {current.clientName}
                </cite>
                {roleText && (
                  <span className="text-xs uppercase tracking-wider text-brand-gold-light/90 font-sans block mt-0.5">
                    {roleText}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Bar */}
        <div className="mt-10 sm:mt-12 pt-6 border-t border-white/10 flex items-center justify-between">
          {/* Slide Indicator Counter */}
          <div className="text-xs font-sans tracking-widest text-white/50">
            {String((currentIndex % activeList.length) + 1).padStart(2, "0")} /{" "}
            {String(activeList.length).padStart(2, "0")}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {activeList.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => changeSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all rounded-full cursor-pointer ${
                  currentIndex % activeList.length === idx
                    ? "w-7 h-1.5 bg-brand-gold"
                    : "w-1.5 h-1.5 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* Arrow Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              disabled={activeList.length <= 1}
              aria-label="Previous testimonial"
              className="w-9 h-9 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-brand-gold" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={activeList.length <= 1}
              aria-label="Next testimonial"
              className="w-9 h-9 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 text-brand-gold" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}