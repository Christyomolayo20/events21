"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, MessageSquare, CheckCircle2, Instagram, Gift, Crown, Sparkle, ShoppingBag } from "lucide-react";
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
    const priceText = gift.price && gift.price > 0 ? ` (₦${gift.price.toLocaleString()})` : "";
    const text = `Hello Adeola! I would like to order the *${encodeURIComponent(
      gift.name
    )}*${encodeURIComponent(priceText)} from Gifts by Adeola.%0A%0ACould you please confirm availability, payment instructions, and delivery timelines?`;
    return `https://wa.me/2348060549596?text=${text}`;
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#FAF8F5] via-white to-[#FDFBF9] border-b border-brand-warm-border/60 relative overflow-hidden">
      {/* Decorative ambient royal glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-soft-lavender/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-blush-pink/30 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Sub-brand Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-soft-lavender border border-brand-purple/20 text-brand-purple text-xs font-sans tracking-widest uppercase font-semibold mb-3.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Gifts by Adeola • By Events 21</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-plum leading-tight mb-3.5">
            Thoughtful Gifts.{" "}
            <span className="italic font-normal font-serif text-brand-purple">
              Curated on a Budget.
            </span>
          </h2>

          {/* User's Exact Brand Copy with Eru Iyawo */}
          <p className="text-base sm:text-lg text-brand-plum/85 font-sans leading-relaxed font-medium max-w-2xl mx-auto mb-5">
            We help you curate thoughtful gifts on a budget. Corporate Gifts, Hampers, Souvenirs &amp;
            Wrapping of Eru Iyawo.
          </p>

          {/* Official Instagram Page Link: https://www.instagram.com/giftsbyadeola/ */}
          <div className="inline-flex items-center justify-center pt-1">
            <a
              href="https://www.instagram.com/giftsbyadeola/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-brand-plum hover:text-white text-brand-plum border border-brand-warm-border text-xs font-sans font-semibold tracking-wide transition-all shadow-xs group"
            >
              <Instagram className="w-4 h-4 text-brand-pink group-hover:text-white transition-colors" />
              <span>Follow @giftsbyadeola on Instagram</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-brand-gold opacity-80 group-hover:opacity-100" />
            </a>
          </div>
        </div>

        {/* 4 Core Pillars Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-4xl mx-auto mb-12 text-center text-xs font-sans">
          <div className="p-4 rounded-2xl bg-white border border-brand-warm-border hover:border-brand-purple/30 shadow-xs hover:shadow-subtle transition-all">
            <span className="font-bold text-brand-plum block">Wrapping of Eru Iyawo</span>
            <span className="text-[11px] text-brand-plum/65 mt-0.5 block">Traditional Yoruba Trunks</span>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-brand-warm-border hover:border-brand-purple/30 shadow-xs hover:shadow-subtle transition-all">
            <span className="font-bold text-brand-plum block">Corporate Gifts</span>
            <span className="text-[11px] text-brand-plum/65 mt-0.5 block">Executive Appreciation</span>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-brand-warm-border hover:border-brand-purple/30 shadow-xs hover:shadow-subtle transition-all">
            <span className="font-bold text-brand-plum block">Thoughtful Hampers</span>
            <span className="text-[11px] text-brand-plum/65 mt-0.5 block">Celebration &amp; Milestones</span>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-brand-warm-border hover:border-brand-purple/30 shadow-xs hover:shadow-subtle transition-all">
            <span className="font-bold text-brand-plum block">Guest Souvenirs</span>
            <span className="text-[11px] text-brand-plum/65 mt-0.5 block">Custom VIP Keepsakes</span>
          </div>
        </div>

        {/* Featured Gift Cards with Clean Presentation and No Prices */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredGifts.map((gift) => (
            <div
              key={gift.id}
              className="group bg-white rounded-2xl overflow-hidden border border-brand-warm-border hover:border-brand-purple/30 shadow-xs hover:shadow-elevated transition-all duration-300 flex flex-col justify-between w-full max-w-[400px] mx-auto"
            >
              <div>
                {/* Photo with fixed height, centered */}
                <div className="relative w-full h-[270px] sm:h-[290px] bg-brand-plum overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={gift.image}
                    alt={gift.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ objectPosition: "center center" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                  <div className="absolute top-3.5 right-3.5 z-10">
                    <span className="px-3 py-1 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider bg-white/95 backdrop-blur-xs text-brand-plum border border-brand-warm-border/60 shadow-xs">
                      {gift.category}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-soft-lavender/60 border border-brand-purple/15 text-[11px] text-brand-purple font-sans font-medium">
                      <Sparkles className="w-3 h-3 text-brand-gold" />
                      <span>Curated to Your Budget</span>
                    </div>
                    {gift.price && gift.price > 0 ? (
                      <span className="font-serif font-bold text-base text-brand-plum">
                        ₦{gift.price.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-[11px] font-sans font-medium text-brand-purple">
                        Budget Tier
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-xl font-bold text-brand-plum group-hover:text-brand-purple transition-colors mb-2 line-clamp-1">
                    {gift.name}
                  </h3>

                  <p className="text-xs text-brand-plum/70 font-sans leading-relaxed mb-4 line-clamp-2">
                    {gift.description}
                  </p>

                  <ul className="space-y-1.5 border-t border-brand-warm-border/50 pt-3.5">
                    {gift.details.slice(0, 3).map((detail, idx) => (
                      <li key={idx} className="text-[11px] text-brand-plum/75 font-sans flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-brand-gold shrink-0" />
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
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-brand-plum hover:bg-brand-purple text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-xs group/btn"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to Dedicated Gifting Experience */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-warm-border shadow-subtle flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs text-brand-purple font-semibold uppercase tracking-wider mb-1">
              <Crown className="w-3.5 h-3.5 text-brand-gold" />
              <span>Dedicated Gifting Atelier</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-plum mb-2">
              Preparing Your Traditional Eru Iyawo or Corporate Event?
            </h3>
            <p className="text-xs sm:text-sm text-brand-plum/70 font-sans">
              Work directly with Adeola to design completely customized gift boxes, traditional bridal
              wrapping, and souvenirs tailored to your exact budget tier.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/gifts-by-adeola"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-sm"
            >
              <span>Explore Full Catalogue</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-full border border-brand-plum/20 hover:border-brand-purple text-brand-plum hover:text-brand-purple text-xs uppercase tracking-widest font-semibold transition-colors bg-white shadow-xs"
            >
              <span>Book a Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
