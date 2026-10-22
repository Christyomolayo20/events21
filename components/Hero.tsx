"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28 overflow-hidden bg-brand-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tagline & Badge */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-soft-lavender border border-brand-purple/20 text-brand-purple text-xs font-sans tracking-widest uppercase font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
            <span>Event 21 • Lagos, Nigeria</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-brand-plum tracking-tight leading-[1.12] mb-6">
            Beautifully Planned. <br className="hidden sm:inline" />
            <span className="italic font-normal font-serif text-brand-purple">
              Unforgettable
            </span>{" "}
            Moments.
          </h1>

          <p className="text-base sm:text-lg text-brand-plum/75 font-sans leading-relaxed max-w-2xl mx-auto font-light mb-8">
            Thoughtfully curated experiences, meaningful celebrations, and attention to the details
            that make every moment special. From luxury Nigerian weddings to intimate soirees and
            bespoke gifting.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              <span>Plan Your Event</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/gallery"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-brand-plum/25 hover:border-brand-purple text-brand-plum hover:text-brand-purple text-xs font-semibold uppercase tracking-widest bg-white/70 backdrop-blur-xs transition-colors"
            >
              <span>Explore Our Work</span>
            </Link>
          </div>
        </div>

        {/* Hero Feature Visual: A Defining Moment from Event 21 */}
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-elevated border border-brand-warm-border group max-w-5xl mx-auto">
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-brand-plum">
            <Image
              src="/images/ballroom-first-dance.jpg"
              alt="Event 21 Grand Ballroom First Dance Celebration"
              fill
              priority
              className="object-cover object-center transition-transform duration-1000 group-hover:scale-[1.02]"
              sizes="(max-width: 1280px) 100vw, 1200px"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-plum-dark/80 via-transparent to-black/20" />

            {/* In-photo Editorial Caption */}
            <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 right-4 sm:right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
              <div>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-brand-gold font-sans font-semibold block mb-1">
                  Featured Celebration
                </span>
                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold">
                  The Ballroom Symphony: Sparklers & Low Fog
                </h3>
                <p className="text-xs sm:text-sm text-white/80 font-sans mt-1">
                  Wedding Reception • Lagos, Nigeria
                </p>
              </div>

              <Link
                href="/gallery"
                className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-sans font-medium transition-colors border border-white/20"
              >
                <span>View Project Story</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Sub-hero Quick Proof Points */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 md:pt-16 max-w-4xl mx-auto border-t border-brand-warm-border/60 mt-12 md:mt-16 text-center">
          <div>
            <span className="block font-serif text-2xl sm:text-3xl font-bold text-brand-plum">
              Bespoke
            </span>
            <span className="text-xs text-brand-plum/60 uppercase tracking-wider font-sans mt-1 block">
              Tailored Planning
            </span>
          </div>
          <div>
            <span className="block font-serif text-2xl sm:text-3xl font-bold text-brand-plum">
              Cultural
            </span>
            <span className="text-xs text-brand-plum/60 uppercase tracking-wider font-sans mt-1 block">
              Heritage & Protocol
            </span>
          </div>
          <div>
            <span className="block font-serif text-2xl sm:text-3xl font-bold text-brand-plum">
              Flawless
            </span>
            <span className="text-xs text-brand-plum/60 uppercase tracking-wider font-sans mt-1 block">
              Day-Of Execution
            </span>
          </div>
          <div>
            <span className="block font-serif text-2xl sm:text-3xl font-bold text-brand-pink">
              Gifts
            </span>
            <span className="text-xs text-brand-plum/60 uppercase tracking-wider font-sans mt-1 block">
              By Adeola
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
