"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { getBrandConfig } from "@/lib/store";

export default function Hero() {
  const [config, setConfig] = useState(getBrandConfig());
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setConfig(getBrandConfig());
    const handleUpdate = () => setConfig(getBrandConfig());
    window.addEventListener("events21_settings_updated", handleUpdate);

    // Detect reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    return () => {
      window.removeEventListener("events21_settings_updated", handleUpdate);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  const videoSrc = config.heroVideoUrl || "/images/hero-video.mp4";
  const posterSrc = config.heroPosterUrl || "/images/hero-poster.jpg";

  // Calculate loop bounds:
  // 1:28 (88s) to 1:40 (100s) on full-length video, or full duration on the extracted 12s asset.
  const getLoopBounds = useCallback((dur: number) => {
    if (dur >= 100) {
      return { start: 88.0, end: 100.0 };
    }
    return { start: 0.0, end: dur > 0 ? dur : 12.0 };
  }, []);

  const triggerPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    const dur = video.duration || 0;
    const { start, end } = getLoopBounds(dur);

    if (video.currentTime >= end || (dur >= 100 && video.currentTime < start)) {
      try {
        video.currentTime = start;
      } catch {
        // Seek pending
      }
    }

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsVideoLoaded(true))
        .catch(() => {
          const resume = () => {
            if (videoRef.current) {
              videoRef.current.play().catch(() => {});
            }
            window.removeEventListener("pointerdown", resume);
            window.removeEventListener("touchstart", resume);
            window.removeEventListener("mousemove", resume);
          };
          window.addEventListener("pointerdown", resume, { once: true });
          window.addEventListener("touchstart", resume, { once: true });
          window.addEventListener("mousemove", resume, { once: true });
        });
    }
  }, [getLoopBounds]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;

    let animFrameId: number;

    const handleLoadedMetadata = () => {
      triggerPlay();
    };

    const handleCanPlay = () => {
      triggerPlay();
    };

    const loopCheck = () => {
      if (videoRef.current) {
        const v = videoRef.current;
        const dur = v.duration || 0;
        const { start, end } = getLoopBounds(dur);

        if (v.currentTime >= end || (dur >= 100 && v.currentTime < start - 0.5)) {
          v.currentTime = start;
        }

        if (v.paused) {
          v.play().catch(() => {});
        }
      }
      animFrameId = requestAnimationFrame(loopCheck);
    };

    triggerPlay();
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("ended", triggerPlay);
    animFrameId = requestAnimationFrame(loopCheck);

    return () => {
      cancelAnimationFrame(animFrameId);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("ended", triggerPlay);
    };
  }, [videoSrc, prefersReducedMotion, triggerPlay, getLoopBounds]);

  const handleSectionHover = () => {
    triggerPlay();
  };

  return (
    <section
      onMouseEnter={handleSectionHover}
      onPointerEnter={handleSectionHover}
      onMouseMove={handleSectionHover}
      className="relative min-h-[92vh] sm:min-h-[94vh] lg:min-h-screen landscape:min-h-screen flex items-center justify-center overflow-hidden bg-brand-plum text-white select-none"
    >
      {/* Background Video Stage - Proportional, Unzoomed Native Resolution across PC, Tablet & Mobile */}
      <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center bg-brand-plum-dark">
        {!prefersReducedMotion && (
          <>
            {/* Ambient Blurred Video Glow for Widescreen PC & Tablet Depth */}
            <div className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none select-none">
              <video
                key={`${videoSrc}-ambient`}
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                aria-hidden="true"
                className="w-full h-full object-cover blur-3xl opacity-35 brightness-75 scale-110"
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            </div>

            {/* Primary High-Definition Video - Scaled to Natural Aspect Ratio without Excessive Zoom */}
            <div className="relative z-0 h-full w-full flex items-center justify-center pointer-events-none">
              <video
                ref={videoRef}
                key={videoSrc}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster={posterSrc}
                className="h-full w-full object-cover sm:object-cover sm:max-w-[500px] md:max-w-[580px] lg:max-w-[660px] xl:max-w-[720px] sm:aspect-[9/16] landscape:max-w-[340px] landscape:aspect-[9/16] object-[center_24%] sm:object-[center_18%] filter brightness-[0.96] contrast-[1.04] transition-all duration-500 shadow-2xl"
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            </div>
          </>
        )}

        {/* Cinematic Vignette Scrim for Contrast & Natural Edge Feathering */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-plum-dark/95 via-transparent to-brand-plum-dark/50 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-brand-plum-dark/65 pointer-events-none" />
      </div>

      {/* Subtle Ambient Lighting Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-purple/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-brand-gold/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero CTA Container - Centered in Hero Section */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center py-8 sm:py-12 landscape:py-4">
        {/* Desktop CTA Arrangement (Clean, minimalist horizontal arrangement preserved) */}
        <div className="hidden sm:inline-flex items-center justify-center gap-6 text-xs sm:text-sm font-sans tracking-[0.28em] uppercase font-semibold text-white/95 drop-shadow-md">
          {/* Link 1: Plan Your Event */}
          <Link
            href="/contact"
            id="hero-cta-plan"
            className="text-white hover:text-brand-gold transition-colors duration-300 py-2 border-b border-transparent hover:border-brand-gold focus:outline-none focus:text-brand-gold"
          >
            Plan Your Event
          </Link>

          {/* Minimalist Divider */}
          <span className="text-white/40 font-light select-none text-base">|</span>

          {/* Link 2: View Portfolio */}
          <Link
            href="/gallery"
            id="hero-cta-portfolio"
            className="text-white hover:text-brand-gold transition-colors duration-300 py-2 border-b border-transparent hover:border-brand-gold focus:outline-none focus:text-brand-gold"
          >
            View Portfolio
          </Link>
        </div>

        {/* Mobile CTA Arrangement: Stacked vertically in portrait, side-by-side in landscape */}
        <div className="flex sm:hidden flex-col landscape:flex-row items-center justify-center gap-3 sm:gap-3.5 w-full max-w-[280px] landscape:max-w-md">
          {/* 1. Plan Your Event (Primary CTA) */}
          <Link
            href="/contact"
            id="hero-cta-plan-mobile"
            className="w-full landscape:w-auto landscape:px-6 py-3.5 px-6 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-bold uppercase tracking-[0.2em] transition-all shadow-lg border border-brand-gold/40 text-center active:scale-95"
          >
            Plan Your Event
          </Link>

          {/* 2. View Portfolio (Secondary CTA) */}
          <Link
            href="/gallery"
            id="hero-cta-portfolio-mobile"
            className="w-full landscape:w-auto landscape:px-6 py-3.5 px-6 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white/95 text-xs font-semibold uppercase tracking-[0.2em] transition-all shadow-md border border-white/30 text-center active:scale-95"
          >
            View Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}
