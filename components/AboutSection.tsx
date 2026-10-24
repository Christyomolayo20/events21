"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-14 md:py-20 bg-white border-y border-brand-warm-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Complementary Editorial Photo (5 cols) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-elevated border border-brand-warm-border h-[340px] sm:h-[420px] w-full bg-brand-plum">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/about-team-portrait.jpg"
                alt="The Event 21 Team and Crew"
                className="w-full h-full object-cover object-center"
                style={{ objectPosition: "center center" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-serif italic text-lg text-brand-soft-lavender">
                  "All Your Event Needs"
                </p>
                <p className="text-xs font-sans uppercase tracking-widest text-brand-gold mt-1">
                  The Events 21 Team • Serving Nationwide & Available to Travel
                </p>
              </div>
            </div>
          </div>

          {/* Editorial Content (7 cols) */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
            <div className="inline-block text-xs uppercase tracking-widest text-brand-purple font-semibold font-sans">
              About Events 21
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-plum leading-[1.2]">
              Every Celebration{" "}
              <span className="italic font-normal font-serif text-brand-purple">
                Has a Story.
              </span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-brand-plum/80 font-sans leading-relaxed font-light">
              <p>
                Serving clients nationwide and available to travel, <strong>Events 21</strong> is a bespoke event planning and
                styling boutique founded on a singular conviction: that extraordinary events are
                born from thoughtful curation, authentic storytelling, and meticulous attention to
                every detail.
              </p>
              <p>
                Whether bringing to life a multi-day traditional Yoruba wedding steeped in regal
                heritage, directing a contemporary ballroom white wedding with dramatic stagecraft,
                or designing an intimate milestone dinner, we bridge the gap between creative vision
                and effortless execution.
              </p>
              <p className="text-sm sm:text-base text-brand-plum/70">
                You should never feel like a coordinator at your own milestone. We handle the
                budgets, timelines, vendor handoffs, and logistics so you can savor every emotion
                with the people you love.
              </p>
            </div>

            {/* Core Values / Pillars */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2.5 text-xs font-sans text-brand-plum font-medium">
                <div className="w-5 h-5 rounded-full bg-brand-soft-lavender text-brand-purple flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span>Curated & Vetted Vendor Network</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-sans text-brand-plum font-medium">
                <div className="w-5 h-5 rounded-full bg-brand-soft-lavender text-brand-purple flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span>Minute-by-Minute Day-of Timelines</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-sans text-brand-plum font-medium">
                <div className="w-5 h-5 rounded-full bg-brand-soft-lavender text-brand-purple flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span>Cultural Heritage & Protocol Precision</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-sans text-brand-plum font-medium">
                <div className="w-5 h-5 rounded-full bg-brand-blush-pink text-brand-pink flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span>Gifts by Adeola Sub-brand Integration</span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-purple hover:text-brand-purple-hover font-sans group transition-colors"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact"
                className="text-xs font-semibold uppercase tracking-wider text-brand-plum/60 hover:text-brand-plum font-sans transition-colors"
              >
                Consult With Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
