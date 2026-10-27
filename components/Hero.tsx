"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { getBrandConfig } from "@/lib/store";

// Three specific highlight segments from the master wedding footage requested by user:
// Segment 1: 00:19–00:24 (19.0s to 24.0s - Bride royal balcony entrance)
// Segment 2: 01:28–01:41 (88.0s to 101.0s - Bridal hair styling & preparations)
// Segment 3: 02:06–02:13 (126.0s to 133.0s - Bridal party & couple celebratory embrace)
// After segment 3 finishes, returns to segment 1 (19.0s) and repeats continuously.
const HIGHLIGHT_SEGMENTS = [
  { start: 19.0, end: 24.0 },
  { start: 88.0, end: 101.0 },
  { start: 126.0, end: 133.0 },
] as const;

export default function Hero() {
  const [config, setConfig] = useState(getBrandConfig());
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const currentSegmentRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const animFrameRef = useRef<number | null>(null);

  // Sync brand settings and reduced motion preference
  useEffect(() => {
    setConfig(getBrandConfig());
    const handleUpdate = () => setConfig(getBrandConfig());
    window.addEventListener("events21_settings_updated", handleUpdate);

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

  // Trigger video playback safely respecting browser autoplay policies
  const triggerPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Playback started
        })
        .catch(() => {
          // If autoplay is blocked by browser policy, resume on first user interaction
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

  // Segment Playback Sequence Controller:
  // 1. Play 19.0s -> 24.0s
  // 2. Seek to 88.0s -> play through 101.0s
  // 3. Seek to 126.0s -> play through 133.0s
  // 4. Return to 19.0s and repeat continuously
  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;

    let isMounted = true;

    // Fast-seek helper preventing multi-seeking conflicts
    const seekTo = (targetSec: number, newSegmentIndex: number) => {
      if (!video) return;
      isSeekingRef.current = true;
      currentSegmentRef.current = newSegmentIndex;
      video.currentTime = targetSec;
    };

    // When metadata loads, set initial position to 19.0s
    const handleLoadedMetadata = () => {
      if (!isMounted) return;
      const dur = video.duration || 0;
      if (dur >= 133.0) {
        seekTo(HIGHLIGHT_SEGMENTS[0].start, 0);
      }
      triggerPlay();
    };

    // When seek completes, confirm playback and mark ready
    const handleSeeked = () => {
      if (!isMounted) return;
      isSeekingRef.current = false;
      if (!isVideoLoaded && video.currentTime >= 18.5) {
        setIsVideoLoaded(true);
      }
      if (video.paused) {
        video.play().catch(() => {});
      }
    };

    const handleCanPlay = () => {
      if (!isMounted) return;
      triggerPlay();
    };

    // High-precision sequence monitor via requestAnimationFrame
    const monitorPlayback = () => {
      if (!isMounted) return;

      if (videoRef.current && !isSeekingRef.current) {
        const v = videoRef.current;
        const dur = v.duration || 0;

        if (dur >= 133.0) {
          const cur = v.currentTime;
          const segIndex = currentSegmentRef.current;

          // Segment 1: 19.0s to 24.0s
          if (segIndex === 0) {
            if (cur < 18.5) {
              seekTo(19.0, 0);
            } else if (cur >= 24.0) {
              // Jump to Segment 2 (01:28 = 88.0s)
              seekTo(88.0, 1);
            }
          }
          // Segment 2: 88.0s to 101.0s (01:28–01:41)
          else if (segIndex === 1) {
            if (cur < 87.5 || (cur >= 24.0 && cur < 88.0)) {
              seekTo(88.0, 1);
            } else if (cur >= 101.0) {
              // Jump to Segment 3 (02:06 = 126.0s)
              seekTo(126.0, 2);
            }
          }
          // Segment 3: 126.0s to 133.0s (02:06–02:13)
          else if (segIndex === 2) {
            if (cur < 125.5 || (cur >= 101.0 && cur < 126.0)) {
              seekTo(126.0, 2);
            } else if (cur >= 133.0) {
              // Return to Segment 1 (19.0s) and repeat
              seekTo(19.0, 0);
            }
          } else {
            // Guard against invalid segment index
            seekTo(19.0, 0);
          }
        } else if (dur > 0 && v.currentTime >= dur - 0.2) {
          v.currentTime = 0;
        }

        if (v.paused && !isSeekingRef.current) {
          v.play().catch(() => {});
        }
      }

      animFrameRef.current = requestAnimationFrame(monitorPlayback);
    };

    // If metadata already loaded prior to effect running
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("seeked", handleSeeked);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("ended", handleLoadedMetadata);

    animFrameRef.current = requestAnimationFrame(monitorPlayback);

    return () => {
      isMounted = false;
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("seeked", handleSeeked);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("ended", handleLoadedMetadata);
    };
  }, [videoSrc, prefersReducedMotion, triggerPlay, isVideoLoaded]);

  const handleInteraction = () => {
    triggerPlay();
  };

  return (
    <section
      onMouseEnter={handleInteraction}
      onPointerEnter={handleInteraction}
      onMouseMove={handleInteraction}
      className="relative w-full min-h-[92vh] sm:min-h-screen lg:min-h-screen xl:min-h-screen flex items-center justify-center overflow-hidden bg-brand-plum text-white select-none"
    >
      {/* Background Video Stage: Full-Bleed Immersive Backdrop across PC, Tablet & Mobile */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-brand-plum-dark">
        {/* Exact Poster Frame (Matches 19.0s frame to prevent blank screen) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={posterSrc}
          alt="Events 21 Grand Royal Celebration"
          className={`absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05] transition-opacity duration-700 ease-out ${
            isVideoLoaded && !prefersReducedMotion ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        />

        {/* Primary Video Element: Full-Bleed Hero Background without artificial scale-down */}
        {!prefersReducedMotion && (
          <video
            ref={videoRef}
            key={videoSrc}
            autoPlay
            loop={false}
            muted
            playsInline
            preload="auto"
            poster={posterSrc}
            className={`absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05] transition-opacity duration-700 ease-out ${
              isVideoLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}

        {/* Cinematic Scrim for Text Contrast and Luxury Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-plum-dark/90 via-black/25 to-brand-plum-dark/45 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-brand-plum-dark/55 pointer-events-none" />
      </div>

      {/* Subtle Ambient Lighting Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-purple/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-brand-gold/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero CTA Container - Centered within Hero Section */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center py-8 sm:py-12">
        {/* Desktop CTA Arrangement: Minimalist horizontal text links with | divider */}
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

        {/* Mobile CTA Arrangement: Vertically stacked text links per specification */}
        <div className="flex sm:hidden flex-col items-center justify-center gap-4 text-xs font-sans tracking-[0.26em] uppercase font-semibold text-white drop-shadow-md">
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
