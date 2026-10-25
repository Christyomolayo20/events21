"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getBrandConfig } from "@/lib/store";

const SEGMENT_START = 129.0; // 02:09
const SEGMENT_END = 133.0; // 02:13

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

  // Segment Looping & High-Precision Monitoring (02:09 - 02:13)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;

    let animFrameId: number;

    const setupVideo = () => {
      video.defaultMuted = true;
      video.muted = true;
      video.playsInline = true;

      // Seek to 129s when ready
      if (Math.abs(video.currentTime - SEGMENT_START) > 0.5) {
        try {
          video.currentTime = SEGMENT_START;
        } catch {
          // Seeking not ready yet
        }
      }
    };

    const handleLoadedMetadata = () => {
      video.currentTime = SEGMENT_START;
    };

    const handleSeeked = () => {
      if (video.currentTime >= SEGMENT_START - 0.5 && video.currentTime <= SEGMENT_END + 0.5) {
        setIsVideoLoaded(true);
        video.play().catch(() => {});
      }
    };

    const handleCanPlay = () => {
      if (video.currentTime < SEGMENT_START - 0.5) {
        video.currentTime = SEGMENT_START;
      } else {
        setIsVideoLoaded(true);
        video.play().catch(() => {});
      }
    };

    const loopCheck = () => {
      if (videoRef.current) {
        const cur = videoRef.current.currentTime;
        // Loop back when reaching or exceeding 133s (02:13)
        if (cur >= SEGMENT_END) {
          videoRef.current.currentTime = SEGMENT_START;
        } else if (cur > 0.2 && cur < SEGMENT_START - 0.5) {
          // Prevent accidental playback of earlier segments
          videoRef.current.currentTime = SEGMENT_START;
        }
      }
      animFrameId = requestAnimationFrame(loopCheck);
    };

    setupVideo();
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("seeked", handleSeeked);
    video.addEventListener("canplay", handleCanPlay);
    animFrameId = requestAnimationFrame(loopCheck);

    return () => {
      cancelAnimationFrame(animFrameId);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("seeked", handleSeeked);
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [videoSrc, prefersReducedMotion]);

  return (
    <section className="relative min-h-[90vh] sm:min-h-[92vh] lg:min-h-screen flex items-end sm:items-center justify-center overflow-hidden bg-brand-plum text-white pb-20 sm:pb-0">
      {/* Background Video Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Fallback & Poster Image (visible until video reaches 02:09 segment) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={posterSrc}
          alt="Events 21 Grand Royal Celebration"
          className={`absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05] transition-opacity duration-700 ${
            isVideoLoaded && !prefersReducedMotion ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        />

        {/* Cinematic Background Video (02:09 - 02:13 loop, 16:9 widescreen, vivid, responsive) */}
        {!prefersReducedMotion && (
          <video
            ref={videoRef}
            key={videoSrc}
            autoPlay
            muted
            playsInline
            preload="auto"
            poster={posterSrc}
            className={`absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05] transition-opacity duration-700 ${
              isVideoLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}

        {/* Balanced Minimal Scrim: Clear video view with contrast for CTA visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-plum-dark/85 via-black/25 to-brand-plum-dark/40" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-brand-plum-dark/50 pointer-events-none" />
      </div>

      {/* Subtle Ambient Lighting Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-purple/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-brand-gold/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Minimal Hero Actions Container - No Text, Only the 2 Brand CTAs */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto">
          {/* Primary CTA: Plan Your Event */}
          <Link
            href="/contact"
            id="hero-cta-plan"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full bg-gradient-to-r from-brand-purple to-[#8E51C9] hover:from-brand-purple-hover hover:to-brand-purple text-white text-xs font-semibold uppercase tracking-[0.2em] transition-all shadow-elevated hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] border border-brand-gold/40 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-plum"
          >
            <span>Plan Your Event</span>
            <ArrowUpRight className="w-4 h-4 text-brand-gold-light" />
          </Link>

          {/* Secondary CTA: View Portfolio */}
          <Link
            href="/gallery"
            id="hero-cta-portfolio"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-[0.18em] transition-all border border-white/30 hover:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-plum shadow-md"
          >
            <span>View Portfolio</span>
            <ArrowUpRight className="w-4 h-4 text-white/80" />
          </Link>
        </div>
      </div>
    </section>
  );
}
