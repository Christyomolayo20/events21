"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function IntroSection() {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-brand-warm-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Visual Showcase Frame */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-elevated border border-brand-warm-border bg-brand-plum h-[340px] sm:h-[400px] w-full group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/about-team-portrait.jpg"
                alt="Events 21 Event Planning Team"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ objectPosition: "center center" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] font-sans uppercase tracking-widest text-brand-gold font-semibold block mb-1">
                  Royalty Twenty One Events
                </span>
                <p className="font-serif italic text-lg sm:text-xl text-brand-soft-lavender">
                  "Thoughtfully Planned. Beautifully Styled."
                </p>
              </div>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-soft-lavender border border-brand-purple/20 text-brand-purple text-xs font-sans tracking-widest uppercase font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Brand Philosophy</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-plum leading-[1.2]">
              Every Celebration{" "}
              <span className="italic font-normal font-serif text-brand-purple">
                Deserves Poise &amp; Peace of Mind.
              </span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-brand-plum/80 font-sans leading-relaxed font-light">
              <p>
                At <strong>Events 21</strong>, we believe you should never feel like a coordinator at your own milestone.
                We bridge the gap between creative visual architecture and seamless day-of execution, crafting celebrations
                that reflect who you are without the stress of managing the moving parts.
              </p>
              <p className="text-sm sm:text-base text-brand-plum/70">
                From vibrant traditional Yoruba engagements and contemporary white weddings to milestone birthdays and private dinners—serving clients nationwide and available to travel, our team orchestrates every timeline, vendor, and floral installation with genuine care and unwavering professionalism.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-purple hover:text-brand-purple-hover font-sans group transition-colors"
              >
                <span>Read Our Full Story</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="/services"
                className="text-xs font-semibold uppercase tracking-wider text-brand-plum/60 hover:text-brand-plum font-sans transition-colors"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
