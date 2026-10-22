"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, MessageSquare, CheckCircle2 } from "lucide-react";
import { GIFTS_CATALOGUE } from "@/lib/data";
import { GiftItem } from "@/lib/types";

export default function GiftsSection() {
  const featuredGifts = GIFTS_CATALOGUE.slice(0, 3);

  const getWhatsAppOrderLink = (gift: GiftItem) => {
    const text = `Hello Gifts by Adeola! I would like to order / enquire about the *${encodeURIComponent(
      gift.name
    )}* (₦${gift.price.toLocaleString()}). Could you provide delivery and customization details?`;
    return `https://wa.me/2348123456789?text=${text}`;
  };

  return (
    <section className="py-20 md:py-28 bg-[#FFF9FB] border-b border-brand-pink/15 relative overflow-hidden">
      {/* Decorative delicate blush accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blush-pink/60 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-soft-lavender/50 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Sub-brand Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blush-pink border border-brand-pink/25 text-brand-pink text-xs font-sans tracking-widest uppercase font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connected Gifting Studio</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-plum leading-tight mb-4">
            Thoughtful Gifts. <br />
            <span className="italic font-normal font-serif text-brand-pink">
              Beautifully Presented.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-brand-plum/75 font-sans leading-relaxed">
            Discover thoughtful gifting designed to make special moments even more meaningful. From
            bridal party proposals and anniversary hampers to curated VIP event souvenirs.
          </p>
        </div>

        {/* Featured Gift Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredGifts.map((gift) => (
            <div
              key={gift.id}
              className="group bg-white rounded-2xl overflow-hidden border border-brand-pink/20 hover:border-brand-pink/50 shadow-xs hover:shadow-elevated transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Photo */}
                <div className="relative aspect-[4/3] w-full bg-[#FAF3F6] overflow-hidden">
                  <Image
                    src={gift.image}
                    alt={gift.name}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider bg-white/95 backdrop-blur-xs text-brand-pink border border-brand-pink/20 shadow-xs">
                      {gift.category}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-serif text-xl font-bold text-brand-plum group-hover:text-brand-pink transition-colors">
                      {gift.name}
                    </h3>
                  </div>
                  <div className="text-sm font-semibold text-brand-purple font-sans mb-3">
                    ₦{gift.price.toLocaleString()}
                  </div>

                  <p className="text-xs text-brand-plum/70 font-sans leading-relaxed mb-4">
                    {gift.description}
                  </p>

                  <ul className="space-y-1.5 border-t border-brand-pink/10 pt-3">
                    {gift.details.slice(0, 3).map((detail, idx) => (
                      <li key={idx} className="text-[11px] text-brand-plum/70 font-sans flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-brand-pink shrink-0" />
                        <span className="line-clamp-1">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Order via WhatsApp Action */}
              <div className="p-6 pt-0">
                <a
                  href={getWhatsAppOrderLink(gift)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-brand-blush-pink hover:bg-brand-pink text-brand-pink hover:text-white border border-brand-pink/30 text-xs font-semibold uppercase tracking-wider transition-all duration-200"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to Dedicated Gifting Experience */}
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-brand-pink/20 shadow-subtle flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="font-serif text-2xl font-bold text-brand-plum mb-2">
              Need Custom Gifting for Your Event?
            </h3>
            <p className="text-xs sm:text-sm text-brand-plum/70 font-sans">
              We curate custom gift suites for bridal parties, corporate year-end appreciation, and
              VIP guest welcome hampers. Custom ribbon matching and calligraphy available.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/gifts-by-adeola"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-sm"
            >
              <span>Explore Gifts by Adeola</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/gifts-by-adeola#bespoke"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full border border-brand-pink/30 hover:border-brand-pink text-brand-pink text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              <span>Custom Request</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
