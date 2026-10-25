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

  // Calculate loop segment:
  // If the source video is full-length (duration >= 133s), cue to 02:09 (129s) - 02:13 (133s).
  // If the video is pre-trimmed (like the local 7s asset), loop 0s - 4s (or full clip duration).
  const getLoopBounds = useCallback((dur: number) => {
    if (dur >= 133) {
      return { start: 129.0, end: 133.0 };
    }
    const end = dur > 0 ? Math.min(dur, 4.0) : 4.0;
    return { start: 0.0, end };
  }, []);

  // Safe playback starter
  const triggerPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    const dur = video.duration || 0;
    const { start, end } = getLoopBounds(dur);

    if (video.currentTime >= end || video.currentTime < start) {
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
          // Fallback user interaction listener for strict browser autoplay policies
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

  // Autoplay immediately on mount & loop repeatedly
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

    // Continuous 60fps frame loop check for seamless looping
    const loopCheck = () => {
      if (videoRef.current) {
        const v = videoRef.current;
        const dur = v.duration || 0;
        const { start, end } = getLoopBounds(dur);

        if (v.currentTime >= end || (dur >= 133 && v.currentTime < start - 0.5)) {
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

  // Immediately play/resume repeatedly whenever user hovers on the hero section
  const handleSectionHover = () => {
    triggerPlay();
  };

  return (
    <section
      onMouseEnter={handleSectionHover}
      onPointerEnter={handleSectionHover}
      onMouseMove={handleSectionHover}
      className="relative min-h-[92vh] sm:min-h-[94vh] lg:min-h-screen flex items-end justify-center overflow-hidden bg-brand-plum text-white pb-14 sm:pb-20 select-none"
    >
      {/* Background Video Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Cinematic Background Video (Immediate Autoplay + Repeated Hover Loop) */}
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
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05]"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}

        {/* Minimal Vignette Scrim for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-plum-dark/90 via-black/20 to-brand-plum-dark/40 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-brand-plum-dark/50 pointer-events-none" />
      </div>

      {/* Subtle Ambient Lighting Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-purple/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-brand-gold/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Minimal Hero Actions Container - Plain & Simple Links Separated by Pipe, Moved Down */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center pb-4 sm:pb-8">
        <div className="inline-flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-sans tracking-[0.24em] sm:tracking-[0.28em] uppercase font-semibold text-white/90">
          {/* Link 1: Plan Your Event */}
          <Link
            href="/contact"
            id="hero-cta-plan"
            className="text-white hover:text-brand-gold transition-colors duration-300 py-1.5 border-b border-transparent hover:border-brand-gold focus:outline-none focus:text-brand-gold"
          >
            Plan Your Event
          </Link>

          {/* Minimalist Divider */}
          <span className="text-white/40 font-light select-none text-sm sm:text-base">|</span>

          {/* Link 2: View Portfolio */}
          <Link
            href="/gallery"
            id="hero-cta-portfolio"
            className="text-white hover:text-brand-gold transition-colors duration-300 py-1.5 border-b border-transparent hover:border-brand-gold focus:outline-none focus:text-brand-gold"
          >
            View Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}
