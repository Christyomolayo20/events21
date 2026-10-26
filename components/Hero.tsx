"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { getBrandConfig } from "@/lib/store";

// User-specified highlight segments from master wedding footage:
// 1. 0:19 - 0:24 (19.0s to 24.0s - Bride royal entrance)
// 2. 1:28 - 1:41 (88.0s to 101.0s - Grand ballroom celebration & dancing)
// 3. 2:06 - 2:14 (126.0s to 134.0s - First dance & celebratory cheers)
const HIGHLIGHT_SEGMENTS = [
  { start: 19.0, end: 24.0 },
  { start: 88.0, end: 101.0 },
  { start: 126.0, end: 134.0 },
];

export default function Hero() {
  const [config, setConfig] = useState(getBrandConfig());
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentSegmentRef = useRef<number>(0);

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

  const triggerPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

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
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;

    let animFrameId: number;

    const handleLoadedMetadata = () => {
      const dur = video.duration || 0;
      // If long source video (> 134s), seek to start of first highlight segment
      if (dur >= 134) {
        currentSegmentRef.current = 0;
        try {
          video.currentTime = HIGHLIGHT_SEGMENTS[0].start;
        } catch {
          // Seek pending
        }
      }
      triggerPlay();
    };

    const handleCanPlay = () => {
      triggerPlay();
    };

    // Continuous loop check supporting both stitched 26s asset and full multi-segment master
    const loopCheck = () => {
      if (videoRef.current) {
        const v = videoRef.current;
        const dur = v.duration || 0;

        // If playing the full-length video (> 134s), sequence through the 3 highlight segments
        if (dur >= 134) {
          const segIndex = currentSegmentRef.current;
          const currentSeg = HIGHLIGHT_SEGMENTS[segIndex];

          if (v.currentTime >= currentSeg.end || v.currentTime < currentSeg.start - 1.0) {
            const nextIndex = (segIndex + 1) % HIGHLIGHT_SEGMENTS.length;
            currentSegmentRef.current = nextIndex;
            v.currentTime = HIGHLIGHT_SEGMENTS[nextIndex].start;
          }
        } else if (dur > 0 && v.currentTime >= dur - 0.2) {
          // Pre-stitched 26s web asset: loop seamlessly to beginning
          v.currentTime = 0;
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
  }, [videoSrc, prefersReducedMotion, triggerPlay]);

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
      {/* Background Video Stage - Full-Bleed Cinematic Backdrop across PC, Tablet & Mobile */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-brand-plum-dark">
        {/* Poster Frame */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={posterSrc}
          alt="Events 21 Grand Royal Celebration"
          className={`absolute inset-0 w-full h-full object-cover object-[center_28%] sm:object-[center_25%] filter brightness-[0.92] contrast-[1.05] transition-opacity duration-700 ${
            isVideoLoaded && !prefersReducedMotion ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Primary Full-Bleed Video */}
        {!prefersReducedMotion && (
          <video
            ref={videoRef}
            key={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={posterSrc}
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover object-[center_28%] sm:object-[center_25%] filter brightness-[0.92] contrast-[1.05] transition-opacity duration-700 ${
              isVideoLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}

        {/* Cinematic Vignette Scrim for Luxury Contrast & CTA Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-plum-dark/90 via-black/25 to-brand-plum-dark/45 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-brand-plum-dark/55 pointer-events-none" />
      </div>

      {/* Subtle Ambient Lighting Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-purple/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-brand-gold/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero CTA Container - Centered in Hero Section */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center py-8 sm:py-12">
        {/* Desktop CTA Arrangement: Minimalist horizontal text links */}
        <div className="hidden sm:inline-flex items-center justify-center gap-6 text-xs sm:text-sm font-sans tracking-[0.28em] uppercase font-semibold text-white drop-shadow-md">
          <Link
            href="/contact"
            id="hero-cta-plan"
            className="text-white hover:text-brand-gold transition-colors duration-300 py-2 border-b border-transparent hover:border-brand-gold focus:outline-none focus:text-brand-gold"
          >
            Plan Your Event
          </Link>

          <span className="text-white/40 font-light select-none text-base">|</span>

          <Link
            href="/gallery"
            id="hero-cta-portfolio"
            className="text-white hover:text-brand-gold transition-colors duration-300 py-2 border-b border-transparent hover:border-brand-gold focus:outline-none focus:text-brand-gold"
          >
            View Portfolio
          </Link>
        </div>

        {/* Mobile CTA Arrangement: Plain text links without background colors, stacked vertically */}
        <div className="flex sm:hidden flex-col items-center justify-center gap-4 text-xs font-sans tracking-[0.28em] uppercase font-semibold text-white drop-shadow-md">
          <Link
            href="/contact"
            id="hero-cta-plan-mobile"
            className="text-white hover:text-brand-gold transition-colors duration-300 py-1.5 border-b border-transparent hover:border-brand-gold focus:outline-none focus:text-brand-gold text-center active:text-brand-gold"
          >
            Plan Your Event
          </Link>

          <Link
            href="/gallery"
            id="hero-cta-portfolio-mobile"
            className="text-white hover:text-brand-gold transition-colors duration-300 py-1.5 border-b border-transparent hover:border-brand-gold focus:outline-none focus:text-brand-gold text-center active:text-brand-gold"
          >
            View Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}
