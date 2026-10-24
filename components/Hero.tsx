"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Crown } from "lucide-react";
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

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-brand-plum text-white">
      {/* Background Video Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Fallback & Poster Image (always present behind video and for reduced motion) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={posterSrc}
          alt="Events 21 Grand Royal Celebration"
          className={`absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05] transition-opacity duration-700 ${
            isVideoLoaded && !prefersReducedMotion ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Cinematic Background Video (16:9 widescreen, vivid, clearly visible) */}
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
            className={`absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05] transition-opacity duration-700 ${
              isVideoLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}

        {/* Balanced Minimal Scrim: Clear video view in center with contrast for text */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-plum-dark/85 via-black/30 to-brand-plum-dark/45" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-brand-plum-dark/60 pointer-events-none" />
      </div>

      {/* Subtle Ambient Lighting Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-brand-purple/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-brand-gold/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 text-center flex flex-col items-center">
        {/* Brand Crest / Distinction Badge */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-brand-gold/40 text-brand-gold-light text-xs font-sans tracking-[0.25em] uppercase font-semibold mb-6 sm:mb-8 animate-fade-in shadow-lg">
          <Crown className="w-4 h-4 text-brand-gold animate-bounce-subtle" />
          <span>The Royal Standard in Event Planning & Styling</span>
        </div>

        {/* Cinematic Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.08] mb-6 text-white text-balance drop-shadow-md">
          Curating Regal Experiences. <br />
          <span className="italic font-normal font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#F7E7CE] via-[#E5CF92] to-[#C5A059]">
            Orchestrating Royalty.
          </span>
        </h1>

        {/* Clear, Concise Brand Statement */}
        <p className="text-base sm:text-lg md:text-xl text-white/90 font-sans leading-relaxed max-w-2xl mx-auto font-light mb-10 text-balance drop-shadow-sm">
          Where thoughtful design meets flawless execution. Specialising in luxury weddings,
          milestone celebrations, and cultural gatherings across Ibadan, Lagos, and destinations nationwide.
        </p>

        {/* Primary and Secondary Calls to Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full bg-gradient-to-r from-brand-purple to-[#8E51C9] hover:from-brand-purple-hover hover:to-brand-purple text-white text-xs font-semibold uppercase tracking-[0.2em] transition-all shadow-elevated hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] border border-white/20"
          >
            <span>Book a Consultation</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <Link
            href="/gallery"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-[0.18em] transition-all border border-white/30 hover:border-brand-gold"
          >
            <span>Explore Our Work</span>
          </Link>
        </div>

        {/* Clean Signature Value Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-14 sm:mt-18 w-full max-w-4xl pt-8 border-t border-white/15 backdrop-blur-xs">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-brand-gold/40 transition-colors">
            <span className="block font-serif text-xl sm:text-2xl font-bold text-white">
              Bespoke
            </span>
            <span className="text-[10px] sm:text-xs text-brand-gold-light uppercase tracking-wider font-sans mt-0.5 block">
              Event Styling
            </span>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-brand-gold/40 transition-colors">
            <span className="block font-serif text-xl sm:text-2xl font-bold text-white">
              Weddings
            </span>
            <span className="text-[10px] sm:text-xs text-brand-gold-light uppercase tracking-wider font-sans mt-0.5 block">
              Traditional & White
            </span>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-brand-gold/40 transition-colors">
            <span className="block font-serif text-xl sm:text-2xl font-bold text-white">
              Celebrations
            </span>
            <span className="text-[10px] sm:text-xs text-brand-gold-light uppercase tracking-wider font-sans mt-0.5 block">
              Birthdays & Galas
            </span>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-brand-gold/40 transition-colors">
            <span className="block font-serif text-xl sm:text-2xl font-bold text-brand-pink">
              Gifts
            </span>
            <span className="text-[10px] sm:text-xs text-brand-pink/90 uppercase tracking-wider font-sans mt-0.5 block">
              By Adeola
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
