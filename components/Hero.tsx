"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Crown, Sparkles, HeartHandshake } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-brand-plum text-white">
      {/* Background Image with Royal Gradient Veils */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/ballroom-first-dance.jpg"
          alt="Event 21 Grand Ballroom Royal Celebration"
          fill
          priority
          className="object-cover object-center scale-105 animate-slow-zoom filter brightness-[0.78] contrast-[1.08]"
          sizes="100vw"
        />

        {/* Multi-layered luxury royal overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-plum-dark via-brand-plum/70 to-brand-plum-dark/85 mix-blend-multiply" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-brand-plum/40 to-brand-plum-dark/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-plum-dark/90 via-transparent to-brand-plum-dark/90" />
      </div>

      {/* Decorative Royal Ambient Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-brand-gold/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 text-center flex flex-col items-center">
        {/* Royal Crest / Badge */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-brand-gold/40 text-brand-gold-light text-xs font-sans tracking-[0.25em] uppercase font-semibold mb-8 animate-fade-in shadow-lg">
          <Crown className="w-4 h-4 text-brand-gold animate-bounce-subtle" />
          <span>The Royal Standard in Event Planning & Styling</span>
        </div>

        {/* Regal Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.08] mb-6 text-white text-balance drop-shadow-md">
          Curating Regal Experiences. <br />
          <span className="italic font-normal font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#F7E7CE] via-[#E5CF92] to-[#C5A059]">
            Orchestrating Royalty.
          </span>
        </h1>

        {/* Reworded Royal Copy */}
        <p className="text-base sm:text-lg md:text-xl text-white/85 font-sans leading-relaxed max-w-2xl mx-auto font-light mb-10 text-balance drop-shadow-xs">
          Where grand occasions meet regal poise. From prestigious Nigerian traditional engagements
          and fairytale white weddings to intimate surprise proposals and stately retirement
          receptions, Event 21 transforms your vision into timeless majesty.
        </p>

        {/* Classy Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full bg-gradient-to-r from-brand-purple to-[#8E51C9] hover:from-brand-purple-hover hover:to-brand-purple text-white text-xs font-semibold uppercase tracking-[0.2em] transition-all shadow-elevated hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] border border-white/20"
          >
            <span>Plan Your Royal Event</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <Link
            href="/gallery"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-[0.18em] transition-all border border-white/30 hover:border-brand-gold"
          >
            <span>Explore Royal Work</span>
          </Link>
        </div>

        {/* Royal Floating Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-16 sm:mt-20 w-full max-w-4xl pt-8 border-t border-white/15 backdrop-blur-xs">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-brand-gold/40 transition-colors">
            <span className="block font-serif text-xl sm:text-2xl font-bold text-white">
              Bespoke
            </span>
            <span className="text-[10px] sm:text-xs text-brand-gold-light uppercase tracking-wider font-sans mt-0.5 block">
              Royal Styling
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
              Proposals
            </span>
            <span className="text-[10px] sm:text-xs text-brand-gold-light uppercase tracking-wider font-sans mt-0.5 block">
              & Retirement Galas
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
