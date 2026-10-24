"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  MessageSquare,
  CheckCircle2,
  Package,
  Gift,
  Heart,
  Send,
  X,
  Truck,
  Instagram,
  ArrowUpRight,
  Crown,
  Play,
  ChevronDown,
  ShieldCheck,
  Clock,
  Sparkle,
} from "lucide-react";
import { getGiftCatalogue, saveGiftRequest } from "@/lib/store";
import { GiftItem } from "@/lib/types";

export default function GiftsByAdeolaPage() {
  const [catalogue, setCatalogue] = useState<GiftItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [customSubmitted, setCustomSubmitted] = useState(false);
  const [activeGiftVideo, setActiveGiftVideo] = useState<{ title: string; url: string } | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const [customForm, setCustomForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    recipientName: "",
    occasion: "",
    budget: "",
    itemsRequested: "",
    deliveryDate: "",
    deliveryAddress: "",
    personalMessage: "",
  });

  useEffect(() => {
    setCatalogue(getGiftCatalogue());
    const handleUpdate = () => setCatalogue(getGiftCatalogue());
    window.addEventListener("events21_gift_catalogue_updated", handleUpdate);
    return () => window.removeEventListener("events21_gift_catalogue_updated", handleUpdate);
  }, []);

  const categories = [
    "All",
    "Wrapping of Eru Iyawo",
    "Corporate Gifts",
    "Hampers",
    "Souvenirs",
  ];

  const filteredItems =
    activeCategory === "All"
      ? catalogue
      : catalogue.filter((item) => item.category === activeCategory);

  const getWhatsAppOrderLink = (gift: GiftItem) => {
    const text = `Hello Gifts by Adeola! I would like to order / enquire about the *${encodeURIComponent(
      gift.name
    )}* (₦${gift.price.toLocaleString()}).%0A%0ACould you confirm availability, delivery timelines in Lagos, and personalization options?`;
    return `https://wa.me/2348060549596?text=${text}`;
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveGiftRequest(customForm);
    setCustomSubmitted(true);
  };

  const getCustomWhatsAppLink = () => {
    const text = `Hello Gifts by Adeola! I would like to make a custom gift request.%0A%0A*Name:* ${encodeURIComponent(
      customForm.fullName
    )}%0A*Occasion:* ${encodeURIComponent(customForm.occasion)}%0A*Recipient:* ${encodeURIComponent(
      customForm.recipientName
    )}%0A*Target Budget:* ${encodeURIComponent(customForm.budget)}%0A*Delivery Date:* ${encodeURIComponent(
      customForm.deliveryDate || "TBD"
    )}%0A*Address:* ${encodeURIComponent(
      customForm.deliveryAddress
    )}%0A*Details / Eru Iyawo:* ${encodeURIComponent(customForm.itemsRequested)}`;

    return `https://wa.me/2348060549596?text=${text}`;
  };

  const faqs = [
    {
      q: "What is Wrapping of Eru Iyawo?",
      a: "Eru Iyawo is the traditional Yoruba engagement bridal gift presentation. We take your gifts, luggage, fabrics, tubers of yam, and ceremonial items, and wrap them in royal matching fabrics, ribbons, acrylic display cases, and bespoke calligraphy labels fit for the traditional Alaga ceremony.",
    },
    {
      q: "Can you work within my specific budget?",
      a: "Yes! Our core philosophy is: 'We help you curate thoughtful gifts on a budget.' Whether you have ₦30,000 or ₦500,000+, Adeola designs packages that look premium and thoughtful without unnecessary markup.",
    },
    {
      q: "Where do you deliver?",
      a: "We offer dedicated hand delivery across all areas of Lagos (Ojodu Berger, Mainland, Island, Ikeja, Lekki) and dispatch via insured couriers nationwide across Nigeria.",
    },
    {
      q: "Do you handle corporate appreciation gifts & bulk souvenirs?",
      a: "Yes, we handle orders from 10 to 500+ units for corporate retreats, end-of-year banquets, and wedding guest favor boxes with custom company branding.",
    },
    {
      q: "How early should I book Eru Iyawo wrapping?",
      a: "We recommend booking at least 2 to 4 weeks prior to the traditional wedding ceremony so our atelier can formulate the color theme, procure matching luxury ribbons and trunks, and arrange seamless logistics.",
    },
  ];

  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-[#FFF5F8] via-[#FFFBFD] to-brand-warm-white">
      {/* Sub-brand Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16">
        <div className="text-center max-w-3xl mx-auto">
          {/* Sub-brand Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blush-pink border border-brand-pink/25 text-brand-pink text-xs font-sans tracking-widest uppercase font-semibold mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-pink animate-pulse" />
            <span>Gifts by Adeola • By Events 21</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-brand-plum leading-tight mb-4">
            Thoughtful Gifts.{" "}
            <span className="italic font-normal font-serif text-brand-pink">
              Curated on a Budget.
            </span>
          </h1>

          {/* Exact Brand Copy */}
          <p className="text-base sm:text-lg text-brand-plum/85 font-sans leading-relaxed max-w-2xl mx-auto mb-6 font-medium">
            We help you curate thoughtful gifts on a budget. Corporate Gifts, Hampers, Souvenirs &amp;
            Wrapping of Eru Iyawo.
          </p>

          {/* Official Instagram Page Link */}
          <div className="mb-8">
            <a
              href="https://www.instagram.com/giftsbyadeola/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-brand-pink hover:text-white text-brand-pink border border-brand-pink/30 text-xs font-sans font-semibold tracking-wide transition-all shadow-xs group"
            >
              <Instagram className="w-4 h-4 text-brand-pink group-hover:text-white transition-colors" />
              <span>Visit Official Instagram: @giftsbyadeola</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
            <button
              type="button"
              onClick={() => setIsCustomModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              <Gift className="w-4 h-4" />
              <span>Request Custom Curation</span>
            </button>

            <a
              href="https://wa.me/2348060549596?text=Hello%20Adeola!%20I%20am%20interested%20in%20wrapping%20of%20Eru%20Iyawo%20or%20curated%20gifting%20on%20a%20budget."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-brand-pink/30 hover:border-brand-pink text-brand-pink bg-white text-xs font-semibold uppercase tracking-widest transition-colors shadow-2xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Trust Badges Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mt-10 pt-8 border-t border-brand-pink/20">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/70 border border-brand-pink/15 text-xs text-brand-plum/80 font-sans">
            <ShieldCheck className="w-4 h-4 text-brand-pink shrink-0" />
            <span>Budget Friendly Tiering</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/70 border border-brand-pink/15 text-xs text-brand-plum/80 font-sans">
            <Truck className="w-4 h-4 text-brand-pink shrink-0" />
            <span>Lagos &amp; Nationwide Delivery</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/70 border border-brand-pink/15 text-xs text-brand-plum/80 font-sans">
            <Sparkle className="w-4 h-4 text-brand-gold shrink-0" />
            <span>Bespoke Hand Finishing</span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/70 border border-brand-pink/15 text-xs text-brand-plum/80 font-sans">
            <Clock className="w-4 h-4 text-brand-pink shrink-0" />
            <span>Reliable Event Timelines</span>
          </div>
        </div>

        {/* 4 Core Pillars Highlights (Interactive Filter Triggers) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mt-8">
          <button
            type="button"
            onClick={() => setActiveCategory("Wrapping of Eru Iyawo")}
            className={`p-5 rounded-2xl bg-white border text-center transition-all cursor-pointer ${
              activeCategory === "Wrapping of Eru Iyawo"
                ? "border-brand-pink shadow-md bg-brand-blush-pink/20"
                : "border-brand-pink/20 hover:border-brand-pink/60 shadow-2xs hover:shadow-xs"
            }`}
          >
            <div className="w-11 h-11 rounded-full bg-brand-blush-pink text-brand-pink flex items-center justify-center mx-auto mb-2.5">
              <Package className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-brand-plum mb-1">
              Wrapping of Eru Iyawo
            </h4>
            <p className="text-xs text-brand-plum/70 font-sans leading-relaxed">
              Traditional Yoruba bridal trunks, luggage, and ceremonial tubers of yam.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory("Corporate Gifts")}
            className={`p-5 rounded-2xl bg-white border text-center transition-all cursor-pointer ${
              activeCategory === "Corporate Gifts"
                ? "border-brand-pink shadow-md bg-brand-blush-pink/20"
                : "border-brand-pink/20 hover:border-brand-pink/60 shadow-2xs hover:shadow-xs"
            }`}
          >
            <div className="w-11 h-11 rounded-full bg-brand-blush-pink text-brand-pink flex items-center justify-center mx-auto mb-2.5">
              <Gift className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-brand-plum mb-1">
              Corporate Gifts
            </h4>
            <p className="text-xs text-brand-plum/70 font-sans leading-relaxed">
              Branded executive packages, retreats, and year-end client appreciation.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory("Hampers")}
            className={`p-5 rounded-2xl bg-white border text-center transition-all cursor-pointer ${
              activeCategory === "Hampers"
                ? "border-brand-pink shadow-md bg-brand-blush-pink/20"
                : "border-brand-pink/20 hover:border-brand-pink/60 shadow-2xs hover:shadow-xs"
            }`}
          >
            <div className="w-11 h-11 rounded-full bg-brand-blush-pink text-brand-pink flex items-center justify-center mx-auto mb-2.5">
              <Heart className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-brand-plum mb-1">
              Thoughtful Hampers
            </h4>
            <p className="text-xs text-brand-plum/70 font-sans leading-relaxed">
              Celebration gift baskets, wine duos, and milestone hampers on a budget.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory("Souvenirs")}
            className={`p-5 rounded-2xl bg-white border text-center transition-all cursor-pointer ${
              activeCategory === "Souvenirs"
                ? "border-brand-pink shadow-md bg-brand-blush-pink/20"
                : "border-brand-pink/20 hover:border-brand-pink/60 shadow-2xs hover:shadow-xs"
            }`}
          >
            <div className="w-11 h-11 rounded-full bg-brand-blush-pink text-brand-pink flex items-center justify-center mx-auto mb-2.5">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-brand-plum mb-1">
              Event Souvenirs
            </h4>
            <p className="text-xs text-brand-plum/70 font-sans leading-relaxed">
              Custom VIP guest favors, scented diffusers, and keepsake tokens.
            </p>
          </button>
        </div>
      </section>

      {/* CREATIVE FEATURE SPOTLIGHT: The Artisanal Eru Iyawo Atelier */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 md:mb-20">
        <div className="bg-gradient-to-br from-white via-[#FFF8FA] to-brand-blush-pink/40 rounded-3xl p-6 sm:p-10 lg:p-12 border border-brand-pink/25 shadow-subtle">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-pink/10 text-brand-pink text-[11px] font-sans font-semibold uppercase tracking-wider mb-2">
              <Crown className="w-3.5 h-3.5 text-brand-gold" />
              <span>Traditional Bridal Artistry</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-plum">
              The Eru Iyawo Wrapping Atelier
            </h2>
            <p className="text-xs sm:text-sm text-brand-plum/75 font-sans mt-2">
              Honoring Yoruba traditional marriage customs with breathtaking presentation, royal color coordination,
              and meticulous display architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Olive Green Traditional Platform Presentation */}
            <div className="group bg-white rounded-2xl overflow-hidden border border-brand-pink/25 shadow-xs hover:shadow-elevated transition-all flex flex-col justify-between">
              <div>
                <div className="relative w-full h-[300px] sm:h-[340px] bg-brand-plum overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/eru-iyawo-traditional-green.jpg"
                    alt="Authentic Traditional Yoruba Eru Iyawo Presentation on Olive Velvet Riser by Gifts by Adeola"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ objectPosition: "center center" }}
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider bg-white/95 backdrop-blur-xs text-brand-pink shadow-xs">
                      Traditional Staging
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 z-10">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveGiftVideo({
                          title: "Traditional Eru Iyawo Wrapping Live Reel",
                          url: "https://assets.mixkit.co/videos/preview/mixkit-hands-wrapping-a-gift-box-with-ribbon-42013-large.mp4",
                        })
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider bg-brand-pink text-white shadow-md hover:bg-brand-pink-hover transition-colors cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-white" />
                      <span>Watch Reel</span>
                    </button>
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-gold font-sans block mb-1">
                    Ceremonial Arrangement
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-plum mb-2">
                    Olive Velvet &amp; Ceremonial Alaga Presentation
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-plum/70 font-sans leading-relaxed mb-4">
                    Full aesthetic styling of traditional bridal luggage, tubers of yam, ceremonial calabashes,
                    woven delicacy hampers, and coordinating aso-oke fabrics wrapped in royal satin ribbons.
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-brand-plum/75 font-sans pt-3 border-t border-brand-pink/15">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-pink shrink-0" />
                      <span>Custom color ribbons</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-pink shrink-0" />
                      <span>Tubers of yam wrapping</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-pink shrink-0" />
                      <span>Ceremonial fruit baskets</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-pink shrink-0" />
                      <span>Alaga protocol layout</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href="https://wa.me/2348060549596?text=Hello%20Adeola!%20I%20would%20like%20to%20enquire%20about%20the%20Traditional%20Olive%20Velvet%20Eru%20Iyawo%20Presentation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Book This Eru Iyawo Concept</span>
                </a>
              </div>
            </div>

            {/* Architectural Tiered Ladder Display */}
            <div className="group bg-white rounded-2xl overflow-hidden border border-brand-pink/25 shadow-xs hover:shadow-elevated transition-all flex flex-col justify-between">
              <div>
                <div className="relative w-full h-[300px] sm:h-[340px] bg-brand-plum overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/eru-iyawo-ladder-display.jpg"
                    alt="Tiered A-Frame Ladder Eru Iyawo Display with Magenta Florals & Acrylic Signage by Gifts by Adeola"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ objectPosition: "center center" }}
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider bg-white/95 backdrop-blur-xs text-brand-pink shadow-xs">
                      Architectural Staging
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-gold font-sans block mb-1">
                    Modern Heritage
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-plum mb-2">
                    Tiered Ladder Display &amp; Illuminated Signage
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-plum/70 font-sans leading-relaxed mb-4">
                    A dramatic multi-tier wooden A-frame display with magenta rose ribbons, emerald green velvet
                    draped pedestals, woven wicker hampers, and custom warm illuminated acrylic couple plaque.
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-brand-plum/75 font-sans pt-3 border-t border-brand-pink/15">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-pink shrink-0" />
                      <span>Multi-tier ladder riser</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-pink shrink-0" />
                      <span>Illuminated acrylic sign</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-pink shrink-0" />
                      <span>Magenta floral styling</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-pink shrink-0" />
                      <span>Pedestal velvet drape</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href="https://wa.me/2348060549596?text=Hello%20Adeola!%20I%20would%20like%20to%20enquire%20about%20the%20Tiered%20Ladder%20Eru%20Iyawo%20Staging."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Book Tiered Ladder Staging</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue & Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 md:mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-pink font-semibold font-sans block mb-2">
              The Curated Collection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-plum">
              Gift Sets &amp; Bespoke Packages
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-sans tracking-wide transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-brand-pink text-white font-semibold shadow-xs"
                    : "bg-white text-brand-plum/75 border border-brand-pink/20 hover:border-brand-pink hover:text-brand-pink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid with Fixed Heights & Well-Centered Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((gift) => (
            <div
              key={gift.id}
              className="group bg-white rounded-3xl overflow-hidden border border-brand-pink/20 hover:border-brand-pink/50 shadow-xs hover:shadow-elevated transition-all duration-300 flex flex-col justify-between w-full max-w-[400px] mx-auto"
            >
              <div>
                {/* Photo with fixed height & centered */}
                <div className="relative w-full h-[280px] sm:h-[300px] bg-[#FAF3F6] overflow-hidden shrink-0">
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
                  {gift.popular && (
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider bg-brand-pink text-white shadow-xs">
                        Most Requested
                      </span>
                    </div>
                  )}
                  {gift.videoUrl && (
                    <div className="absolute bottom-3 left-3 z-10">
                      <button
                        type="button"
                        onClick={() => setActiveGiftVideo({ title: gift.name, url: gift.videoUrl! })}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider bg-brand-pink text-white shadow-md hover:bg-brand-pink-hover transition-colors cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        <span>Watch Video</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-6 sm:p-7">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-plum mb-1.5 group-hover:text-brand-pink transition-colors line-clamp-1">
                    {gift.name}
                  </h3>

                  <div className="text-base font-semibold text-brand-purple font-sans mb-3">
                    ₦{gift.price.toLocaleString()}
                  </div>

                  <p className="text-xs sm:text-sm text-brand-plum/70 font-sans leading-relaxed mb-4 line-clamp-2">
                    {gift.description}
                  </p>

                  <div className="border-t border-brand-pink/15 pt-3">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-gold font-sans block mb-2">
                      Package Highlights:
                    </span>
                    <ul className="space-y-1.5">
                      {gift.details.slice(0, 3).map((detail, idx) => (
                        <li key={idx} className="text-xs text-brand-plum/75 font-sans flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-pink shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Order via WhatsApp */}
              <div className="p-6 pt-0">
                <a
                  href={getWhatsAppOrderLink(gift)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-brand-blush-pink hover:bg-brand-pink text-brand-pink hover:text-white border border-brand-pink/30 text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Order on WhatsApp (08060549596)</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Bespoke Curation Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-20">
        <div className="relative rounded-3xl overflow-hidden bg-brand-plum text-white p-8 sm:p-12 shadow-xl border border-white/10">
          <div className="relative z-10 max-w-2xl">
            <span className="text-[11px] uppercase tracking-widest text-brand-gold font-semibold font-sans block mb-2">
              Bespoke Gifting Concierge
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold mb-3">
              Need Something One-of-a-Kind?
            </h3>
            <p className="text-sm text-white/80 font-sans leading-relaxed mb-6">
              Whether you are preparing traditional bridal trunks, end-of-year corporate client gifts,
              or milestone anniversary souvenirs, Adeola curates thoughtful packages tailored strictly to your target budget.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setIsCustomModalOpen(true)}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-md cursor-pointer"
              >
                <Gift className="w-4 h-4" />
                <span>Submit Custom Brief</span>
              </button>
              <a
                href="https://wa.me/2348060549596?text=Hello%20Adeola!%20I%20would%20like%20to%20discuss%20a%20custom%20gift%20curation."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-widest transition-colors border border-white/20"
              >
                <MessageSquare className="w-3.5 h-3.5 text-brand-gold" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-widest text-brand-pink font-semibold font-sans block mb-2">
            Helpful Information
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-brand-plum">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-brand-pink/20 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaq(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-brand-blush-pink/15 transition-colors"
                >
                  <h4 className="font-serif font-bold text-base text-brand-plum">{faq.q}</h4>
                  <ChevronDown
                    className={`w-5 h-5 text-brand-pink transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-brand-plum/75 font-sans leading-relaxed border-t border-brand-pink/10 pt-3 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Custom Request Modal */}
      {isCustomModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-plum-dark/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-brand-pink/20 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => {
                setIsCustomModalOpen(false);
                setCustomSubmitted(false);
              }}
              className="absolute top-5 right-5 text-brand-plum/50 hover:text-brand-plum p-1.5 rounded-full hover:bg-brand-pink/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {customSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-brand-blush-pink text-brand-pink flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-brand-plum">
                  Custom Brief Received!
                </h3>
                <p className="text-xs sm:text-sm text-brand-plum/75 font-sans leading-relaxed max-w-sm mx-auto">
                  Thank you! Adeola will review your details and contact you shortly with concept proposals.
                </p>
                <div className="pt-3">
                  <a
                    href={getCustomWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send Directly via WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-[11px] uppercase tracking-wider text-brand-pink font-semibold font-sans block mb-1">
                    Bespoke Curation
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-brand-plum">
                    Request Custom Gifting or Eru Iyawo Wrapping
                  </h3>
                  <p className="text-xs text-brand-plum/70 font-sans mt-1">
                    Tell us what you are looking for, your budget tier, and delivery date.
                  </p>
                </div>

                <form onSubmit={handleCustomSubmit} className="space-y-4 text-xs font-sans">
                  <div>
                    <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bukola Adeleke"
                      value={customForm.fullName}
                      onChange={(e) => setCustomForm({ ...customForm, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-pink/20 focus:border-brand-pink focus:outline-hidden text-brand-plum"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 08012345678"
                        value={customForm.phone}
                        onChange={(e) => setCustomForm({ ...customForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-brand-pink/20 focus:border-brand-pink focus:outline-hidden text-brand-plum"
                      />
                    </div>
                    <div>
                      <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. buki@gmail.com"
                        value={customForm.email}
                        onChange={(e) => setCustomForm({ ...customForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-brand-pink/20 focus:border-brand-pink focus:outline-hidden text-brand-plum"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                        Occasion *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Wrapping of Eru Iyawo, Corporate, Birthday"
                        value={customForm.occasion}
                        onChange={(e) => setCustomForm({ ...customForm, occasion: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-brand-pink/20 focus:border-brand-pink focus:outline-hidden text-brand-plum"
                      />
                    </div>
                    <div>
                      <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                        Budget Range (₦) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. ₦50,000 - ₦150,000"
                        value={customForm.budget}
                        onChange={(e) => setCustomForm({ ...customForm, budget: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-brand-pink/20 focus:border-brand-pink focus:outline-hidden text-brand-plum"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                      Recipient / Beneficiary Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. The Bride, Board of Directors, Dad"
                      value={customForm.recipientName}
                      onChange={(e) => setCustomForm({ ...customForm, recipientName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-pink/20 focus:border-brand-pink focus:outline-hidden text-brand-plum"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                        Target Date
                      </label>
                      <input
                        type="date"
                        value={customForm.deliveryDate}
                        onChange={(e) => setCustomForm({ ...customForm, deliveryDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-brand-pink/20 focus:border-brand-pink focus:outline-hidden text-brand-plum"
                      />
                    </div>
                    <div>
                      <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                        Delivery City / Area
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ikeja, Lagos"
                        value={customForm.deliveryAddress}
                        onChange={(e) => setCustomForm({ ...customForm, deliveryAddress: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-brand-pink/20 focus:border-brand-pink focus:outline-hidden text-brand-plum"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                      Items / Eru Iyawo Details
                    </label>
                    <textarea
                      rows={3}
                      placeholder="List any preferred items, colors, themes, number of boxes/luggage for Eru Iyawo, or specific requests..."
                      value={customForm.itemsRequested}
                      onChange={(e) => setCustomForm({ ...customForm, itemsRequested: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-pink/20 focus:border-brand-pink focus:outline-hidden text-brand-plum"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsCustomModalOpen(false)}
                      className="px-5 py-2.5 rounded-full border border-brand-pink/20 text-brand-plum text-xs uppercase tracking-wider font-semibold hover:bg-brand-pink/10 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Request</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Video Player Modal */}
      {activeGiftVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveGiftVideo(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-brand-plum rounded-3xl overflow-hidden p-4 sm:p-6 border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10 text-white">
              <h4 className="font-serif text-lg font-bold">{activeGiftVideo.title}</h4>
              <button
                type="button"
                onClick={() => setActiveGiftVideo(null)}
                className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <video
              src={activeGiftVideo.url}
              controls
              autoPlay
              playsInline
              className="w-full max-h-[65vh] rounded-2xl mx-auto bg-black"
            />
          </div>
        </div>
      )}
    </div>
  );
}
