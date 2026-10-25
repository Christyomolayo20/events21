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

  // Ensure video plays immediately on page load and loops 129s - 133s (02:09 - 02:13)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;

    let animFrameId: number;

    const startPlayback = () => {
      video.defaultMuted = true;
      video.muted = true;
      video.playsInline = true;

      // Cue to 02:09 immediately
      if (Math.abs(video.currentTime - SEGMENT_START) > 0.4) {
        try {
          video.currentTime = SEGMENT_START;
        } catch {
          // Seeking pending
        }
      }

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsVideoLoaded(true);
          })
          .catch(() => {
            // Autoplay unblock retry on user interaction
            const resumeOnInteraction = () => {
              video.play().catch(() => {});
              window.removeEventListener("touchstart", resumeOnInteraction);
              window.removeEventListener("click", resumeOnInteraction);
            };
            window.addEventListener("touchstart", resumeOnInteraction, { once: true });
            window.addEventListener("click", resumeOnInteraction, { once: true });
          });
      }
    };

    const handleLoadedMetadata = () => {
      video.currentTime = SEGMENT_START;
      video.play().catch(() => {});
      setIsVideoLoaded(true);
    };

    const handleCanPlay = () => {
      if (video.currentTime < SEGMENT_START - 0.5) {
        video.currentTime = SEGMENT_START;
      }
      video.play().catch(() => {});
      setIsVideoLoaded(true);
    };

    const loopCheck = () => {
      if (videoRef.current) {
        const cur = videoRef.current.currentTime;
        // Loop back when reaching or exceeding 133s (02:13)
        if (cur >= SEGMENT_END) {
          videoRef.current.currentTime = SEGMENT_START;
        } else if (cur > 0.5 && cur < SEGMENT_START - 0.5) {
          videoRef.current.currentTime = SEGMENT_START;
        }

        if (videoRef.current.paused) {
          videoRef.current.play().catch(() => {});
        }
      }
      animFrameId = requestAnimationFrame(loopCheck);
    };

    startPlayback();
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("canplay", handleCanPlay);
    animFrameId = requestAnimationFrame(loopCheck);

    return () => {
      cancelAnimationFrame(animFrameId);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [videoSrc, prefersReducedMotion]);

  return (
    <section className="relative min-h-[92vh] sm:min-h-[94vh] lg:min-h-screen flex items-end justify-center overflow-hidden bg-brand-plum text-white pb-14 sm:pb-20">
      {/* Background Video Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Cinematic Background Video (02:09 - 02:13 loop, immediate autoplay, responsive) */}
        {!prefersReducedMotion && (
          <video
            ref={videoRef}
            key={videoSrc}
            autoPlay
            muted
            playsInline
            preload="auto"
            poster={posterSrc}
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05]"
          >
            <source src={`${videoSrc}#t=129,133`} type="video/mp4" />
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}

        {/* Minimal Vignette Scrim for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-plum-dark/90 via-black/20 to-brand-plum-dark/40" />
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
