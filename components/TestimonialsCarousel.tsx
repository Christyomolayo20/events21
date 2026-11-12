"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Quote, ArrowUpRight, Star } from "lucide-react";
import { getPublishedTestimonials, reconcileTestimonialsFromServer } from "@/lib/store";
import { Testimonial } from "@/lib/types";

export default function TestimonialsCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHoverOrFocusPaused, setIsHoverOrFocusPaused] = useState(false);
  const [isInteractionPaused, setIsInteractionPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const syncFromLocal = useCallback(() => {
    const published = getPublishedTestimonials();
    setTestimonials(published);
    setCurrentIndex((prev) => (published.length === 0 ? 0 : prev % published.length));
  }, []);

  const syncFromServer = useCallback(async () => {
    const res = await reconcileTestimonialsFromServer();
    if (res.ok) {
      const published = res.testimonials.filter((t) => t.isPublished !== false);
      setTestimonials(published);
      setCurrentIndex((prev) => (published.length === 0 ? 0 : prev % published.length));
    } else {
      syncFromLocal();
    }
  }, [syncFromLocal]);

  useEffect(() => {
    syncFromLocal();
    syncFromServer();

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        syncFromServer();
      }
    };

    window.addEventListener("events21_testimonials_updated", syncFromLocal);
    window.addEventListener("focus", syncFromServer);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("events21_testimonials_updated", syncFromLocal);
      window.removeEventListener("focus", syncFromServer);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [syncFromLocal, syncFromServer]);

  const pauseAutoplayTemporarily = useCallback((durationMs = 10000) => {
    setIsInteractionPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsInteractionPaused(false);
    }, durationMs);
  }, []);

  const goToSlide = useCallback(
    (newIndex: number, fromUserInteraction = false) => {
      if (testimonials.length <= 1) return;
      const safeIndex = ((newIndex % testimonials.length) + testimonials.length) % testimonials.length;
      setCurrentIndex(safeIndex);
      if (fromUserInteraction) {
        pauseAutoplayTemporarily(10000);
      }
    },
    [testimonials.length, pauseAutoplayTemporarily]
  );

  const handleNext = useCallback(
    (fromUserInteraction = false) => {
      if (testimonials.length <= 1) return;
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      if (fromUserInteraction) {
        pauseAutoplayTemporarily(10000);
      }
    },
    [testimonials.length, pauseAutoplayTemporarily]
  );

  const handlePrev = useCallback(
    (fromUserInteraction = false) => {
      if (testimonials.length <= 1) return;
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      if (fromUserInteraction) {
        pauseAutoplayTemporarily(10000);
      }
    },
    [testimonials.length, pauseAutoplayTemporarily]
  );

  const isPaused = isHoverOrFocusPaused || isInteractionPaused;

  // Autoplay timer (7s) when not paused and multiple testimonials exist
  useEffect(() => {
    if (testimonials.length <= 1 || isPaused) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }

    autoPlayRef.current = setInterval(() => {
      handleNext(false);
    }, 7000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [testimonials.length, isPaused, handleNext]);

  // Touch swipe handlers for mobile
  const minSwipeDistance = 40;
  const onTouchStart = (e: React.TouchEvent) => {
    setIsHoverOrFocusPaused(true);
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    setIsHoverOrFocusPaused(false);
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      handleNext(true);
    } else if (distance < -minSwipeDistance) {
      handlePrev(true);
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      handlePrev(true);
    } else if (e.key === "ArrowRight") {
      handleNext(true);
    }
  };

  // Minimal fallback when no testimonials are published in Admin
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
            Thoughtfully planned, beautifully styled celebrations. Genuine reviews published from our client archive appear here.
          </p>
        </div>
      </section>
    );
  }

  const safeIndex = currentIndex % testimonials.length;
  const current = testimonials[safeIndex] || testimonials[0];
  const hasImage = Boolean(current?.image && current.image.trim());
  const reviewText = (current?.quote || current?.text || "").trim();
  const rating = Math.min(5, Math.max(1, Math.round(Number(current?.rating) || 5)));
  const eventLabel =
    current?.roleOrEvent ||
    [current?.clientRole, current?.eventName].filter(Boolean).join(" • ") ||
    "";

  return (
    <section
      id="testimonials"
      className="relative w-full py-16 sm:py-20 md:py-24 bg-[#15051B] text-white overflow-hidden"
      aria-label="Client Testimonials"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setIsHoverOrFocusPaused(true)}
      onMouseLeave={() => setIsHoverOrFocusPaused(false)}
      onFocus={() => setIsHoverOrFocusPaused(true)}
      onBlur={() => setIsHoverOrFocusPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Heading */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-brand-gold font-sans font-medium block mb-2">
            Words of Praise
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-normal">
            Client Testimonials
          </h2>
        </div>

        {/* Single Source of Truth Testimonial Card with Uploaded Client Photo as Card Background */}
        <article
          key={current.id}
          className={`relative rounded-3xl overflow-hidden border border-white/15 shadow-elevated min-h-[380px] sm:min-h-[430px] flex flex-col justify-between p-6 sm:p-10 md:p-12 text-left animate-fade-in ${hasImage
            ? "bg-[#1A0822]"
            : "bg-gradient-to-br from-[#2B1238] via-[#1E0B29] to-[#120418]"
            }`}
        >
          {/* Card Background Layer: Uploaded client photo centered without excessive zoom/crop distortion */}
          {hasImage ? (
            <div className="absolute inset-0 z-0 pointer-events-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={current.image}
                alt={`${current.clientName} celebration backdrop`}
                className="w-full h-full object-cover object-[50%_25%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120418]/95 via-[#180720]/75 to-[#120418]/65" />
              <div className="absolute inset-0 bg-[#120418]/30" />
            </div>
          ) : (
            <div
              className="absolute inset-0 z-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at top right, rgba(200, 159, 86, 0.16), transparent 55%)",
              }}
            />
          )}

          {/* Top Bar: Quote Emblem & Five-Star Rating */}
          <div className="relative z-10 flex items-center justify-between gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-brand-gold flex items-center justify-center shadow-sm shrink-0">
              <Quote className="w-4 h-4 fill-current opacity-95" />
            </div>

            <div
              className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/15"
              aria-label={`${rating} out of 5 stars`}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3.5 h-3.5 ${star <= rating
                    ? "fill-brand-gold text-brand-gold"
                    : "text-white/25"
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Centerpiece Quote */}
          <blockquote className="relative z-10 my-auto font-serif text-lg sm:text-xl md:text-2xl text-white font-normal leading-relaxed drop-shadow-md">
            &ldquo;{reviewText}&rdquo;
          </blockquote>

          {/* Bottom Client Identity & Event Type */}
          <div className="relative z-10 pt-6 mt-6 border-t border-white/20">
            <cite className="not-italic font-serif font-semibold text-base sm:text-lg text-brand-gold block drop-shadow-sm">
              {current.clientName}
            </cite>
            {eventLabel && (
              <span className="text-[11px] sm:text-xs font-sans text-white/80 uppercase tracking-[0.14em] block mt-1">
                {eventLabel}
              </span>
            )}
          </div>
        </article>

        {/* Controls Bar: Identical Content & Accessible Navigation on Mobile & Desktop */}
        <div className="mt-6 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
          <div className="text-white/70 tracking-widest text-[11px] font-medium">
            {String(safeIndex + 1).padStart(2, "0")} /{" "}
            {String(testimonials.length).padStart(2, "0")}
          </div>

          {testimonials.length > 1 && (
            <div className="flex items-center gap-1" role="tablist" aria-label="Choose a testimonial">
              {testimonials.map((t, idx) => {
                const isActive = safeIndex === idx;
                return (
                  <button
                    key={t.id || idx}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => goToSlide(idx, true)}
                    aria-label={`View testimonial ${idx + 1} from ${t.clientName}`}
                    className="p-1.5 flex items-center justify-center cursor-pointer"
                  >
                    <span
                      className={`block transition-all duration-300 rounded-full ${isActive
                        ? "w-7 h-1.5 bg-brand-gold shadow-sm"
                        : "w-2 h-2 bg-white/35 hover:bg-white/65"
                        }`}
                    />
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex items-center gap-3 ml-auto sm:ml-0">
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-white/80 hover:text-brand-gold transition-colors py-1.5 px-2"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {testimonials.length > 1 && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handlePrev(true)}
                  aria-label="Previous testimonial"
                  className="w-9 h-9 rounded-full border border-white/25 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4 text-brand-gold" />
                </button>
                <button
                  type="button"
                  onClick={() => handleNext(true)}
                  aria-label="Next testimonial"
                  className="w-9 h-9 rounded-full border border-white/25 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer active:scale-95"
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
