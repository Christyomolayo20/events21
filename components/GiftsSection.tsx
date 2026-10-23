"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, MessageSquare, CheckCircle2, Instagram, Gift } from "lucide-react";
import { getGiftCatalogue } from "@/lib/store";
import { GiftItem } from "@/lib/types";

export default function GiftsSection() {
  const [gifts, setGifts] = useState<GiftItem[]>([]);

  useEffect(() => {
    setGifts(getGiftCatalogue());
    const handleUpdate = () => {
      setGifts(getGiftCatalogue());
    };
    window.addEventListener("events21_gift_catalogue_updated", handleUpdate);
    return () => window.removeEventListener("events21_gift_catalogue_updated", handleUpdate);
  }, []);

  const featuredGifts = gifts.slice(0, 3);

  const getWhatsAppOrderLink = (gift: GiftItem) => {
    const text = `Hello Gifts by Adeola! I would like to enquire about / order the *${encodeURIComponent(
      gift.name
    )}* (₦${gift.price.toLocaleString()}). Could you provide delivery and customization details?`;
    return `https://wa.me/2348060549596?text=${text}`;
  };

  return (
    <section className="py-14 md:py-20 bg-[#FFF9FB] border-b border-brand-pink/15 relative overflow-hidden">
      {/* Decorative delicate blush accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blush-pink/60 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-soft-lavender/50 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Sub-brand Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blush-pink border border-brand-pink/25 text-brand-pink text-xs font-sans tracking-widest uppercase font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gifts by Adeola</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-plum leading-tight mb-3">
            Thoughtful Gifts.{" "}
            <span className="italic font-normal font-serif text-brand-pink">
              Curated on a Budget.
            </span>
          </h2>

          {/* User's Exact Brand Copy with Eru Iyawo */}
          <p className="text-base sm:text-lg text-brand-plum/85 font-sans leading-relaxed font-medium max-w-2xl mx-auto mb-4">
            We help you curate thoughtful gifts on a budget. Corporate Gifts, Hampers, Souvenirs &amp;
            Wrapping of Eru Iyawo.
          </p>

          {/* Official Instagram Page Link: https://www.instagram.com/giftsbyadeola/ */}
          <div className="inline-flex items-center justify-center pt-1">
            <a
              href="https://www.instagram.com/giftsbyadeola/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-brand-pink hover:text-white text-brand-pink border border-brand-pink/30 text-xs font-sans font-semibold tracking-wide transition-all shadow-xs group"
            >
              <Instagram className="w-4 h-4 text-brand-pink group-hover:text-white transition-colors" />
              <span>Follow @giftsbyadeola on Instagram</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
            </a>
          </div>
        </div>

        {/* 4 Core Pillars Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10 text-center text-xs font-sans">
          <div className="p-3.5 rounded-xl bg-white border border-brand-pink/20 shadow-xs">
            <span className="font-bold text-brand-plum block">Wrapping of Eru Iyawo</span>
            <span className="text-[11px] text-brand-plum/60 mt-0.5 block">Traditional Yoruba Trunks</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-brand-pink/20 shadow-xs">
            <span className="font-bold text-brand-plum block">Corporate Gifts</span>
            <span className="text-[11px] text-brand-plum/60 mt-0.5 block">Executive Appreciation</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-brand-pink/20 shadow-xs">
            <span className="font-bold text-brand-plum block">Thoughtful Hampers</span>
            <span className="text-[11px] text-brand-plum/60 mt-0.5 block">Celebration &amp; Milestones</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-brand-pink/20 shadow-xs">
            <span className="font-bold text-brand-plum block">Guest Souvenirs</span>
            <span className="text-[11px] text-brand-plum/60 mt-0.5 block">Custom VIP Keepsakes</span>
          </div>
        </div>

        {/* Featured Gift Cards with Fixed Dimensions & Well-Centered Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {featuredGifts.map((gift) => (
            <div
              key={gift.id}
              className="group bg-white rounded-2xl overflow-hidden border border-brand-pink/20 hover:border-brand-pink/50 shadow-xs hover:shadow-elevated transition-all duration-300 flex flex-col justify-between w-full max-w-[400px] mx-auto"
            >
              <div>
                {/* Photo with fixed height, centered */}
                <div className="relative w-full h-[260px] sm:h-[280px] bg-[#FAF3F6] overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={gift.image}
                    alt={gift.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ objectPosition: "center center" }}
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider bg-white/95 backdrop-blur-xs text-brand-pink border border-brand-pink/20 shadow-xs">
                      {gift.category}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-brand-plum group-hover:text-brand-pink transition-colors mb-1.5 line-clamp-1">
                    {gift.name}
                  </h3>
                  <div className="text-sm font-semibold text-brand-purple font-sans mb-3">
                    ₦{gift.price.toLocaleString()}
                  </div>

                  <p className="text-xs text-brand-plum/70 font-sans leading-relaxed mb-4 line-clamp-2">
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

              {/* Order via WhatsApp Action (Connected to 08060549596) */}
              <div className="p-6 pt-0">
                <a
                  href={getWhatsAppOrderLink(gift)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-brand-blush-pink hover:bg-brand-pink text-brand-pink hover:text-white border border-brand-pink/30 text-xs font-semibold uppercase tracking-wider transition-all duration-200"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Order via WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to Dedicated Gifting Experience */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-pink/20 shadow-subtle flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-plum mb-2">
              Preparing Your Traditional Eru Iyawo or Corporate Event?
            </h3>
            <p className="text-xs sm:text-sm text-brand-plum/70 font-sans">
              Work directly with Adeola to design completely customized gift boxes, traditional bridal
              wrapping, and souvenirs within your budget.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/gifts-by-adeola"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-sm"
            >
              <span>Explore Full Catalogue</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <a
              href="https://wa.me/2348060549596?text=Hello%20Adeola!%20I%20would%20like%20to%20discuss%20wrapping%20of%20Eru%20Iyawo%20or%20curated%20gifting%20on%20a%20budget."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-full border border-brand-pink/30 hover:border-brand-pink text-brand-pink text-xs uppercase tracking-widest font-semibold transition-colors bg-brand-blush-pink/40"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat with Adeola</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
