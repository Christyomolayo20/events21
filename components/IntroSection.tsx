"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function IntroSection() {
  return (
    <section className="py-20 sm:py-24 md:py-28 bg-[#FAF8F5] border-b border-brand-warm-border/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle Brand Tagline */}
        <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-brand-purple font-sans font-semibold block mb-4">
          The Brand Philosophy
        </span>

        {/* Editorial Headline */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-plum font-normal leading-[1.2] mb-8 text-balance">
          Every Celebration Deserves Poise &amp; Peace of Mind
        </h2>

        {/* Fine Decorative Accent Divider */}
        <div className="w-16 h-px bg-brand-gold/60 mx-auto mb-8" />

        {/* Narrative Prose */}
        <div className="space-y-6 text-base sm:text-lg text-brand-plum/85 font-sans leading-relaxed font-light max-w-3xl mx-auto">
          <p>
            At <strong>Events 21</strong>, we believe you should never feel like a coordinator at your own milestone.
            We bridge the gap between creative visual architecture and seamless day-of execution, crafting celebrations
            that reflect who you are without the stress of managing the moving parts.
          </p>
          <p className="text-sm sm:text-base text-brand-plum/70 leading-relaxed">
            From vibrant traditional Yoruba engagements and contemporary white weddings to milestone birthdays and private dinners—serving clients nationwide and available to travel, our team orchestrates every timeline, vendor, and floral installation with genuine care and unwavering professionalism.
          </p>
        </div>

        {/* Human Navigation Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-purple hover:text-brand-purple-hover font-sans group transition-colors py-2 border-b border-brand-purple/30 hover:border-brand-purple"
          >
            <span>Read Our Full Story</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-plum/70 hover:text-brand-plum font-sans transition-colors py-2 border-b border-transparent hover:border-brand-plum/40"
          >
            <span>Explore Services &amp; Packages</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
