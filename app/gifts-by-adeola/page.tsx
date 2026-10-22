"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, MessageSquare, CheckCircle2, Package, Gift, Heart, Send, X, Truck, Instagram, ArrowUpRight } from "lucide-react";
import { getGiftCatalogue, saveGiftRequest } from "@/lib/store";
import { GiftItem } from "@/lib/types";

export default function GiftsByAdeolaPage() {
  const [catalogue, setCatalogue] = useState<GiftItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [customSubmitted, setCustomSubmitted] = useState(false);

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
    "Wrapping of EruIyawo",
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
    )}%0A*Details / EruIyawo:* ${encodeURIComponent(customForm.itemsRequested)}`;

    return `https://wa.me/2348060549596?text=${text}`;
  };

  const faqs = [
    {
      q: "What is Wrapping of EruIyawo?",
      a: "EruIyawo is the traditional Yoruba engagement bridal gift presentation. We take your gifts, luggage, fabrics, tubers of yam, and ceremonial items, and wrap them in royal matching fabrics, ribbons, acrylic display cases, and bespoke calligraphy labels fit for the traditional Alaga ceremony.",
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
      a: "Yes, we handle orders from 10 to 500+ units for corporate retreats, end-of-year banquets, and wedding guest favor boxes with custom branding.",
    },
  ];

  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28 bg-[#FFFBFD]">
      {/* Sub-brand Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blush-pink border border-brand-pink/25 text-brand-pink text-xs font-sans tracking-widest uppercase font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gifts by Adeola</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-brand-plum leading-tight mb-4">
            Thoughtful Gifts. <br />
            <span className="italic font-normal font-serif text-brand-pink">
              Curated on a Budget.
            </span>
          </h1>

          {/* Exact Brand Copy from User */}
          <p className="text-base sm:text-lg text-brand-plum/85 font-sans leading-relaxed max-w-2xl mx-auto mb-6 font-medium">
            We help you curate thoughtful gifts on a budget. Corporate Gifts, Hampers, Souvenirs &
            Wrapping of EruIyawo.
          </p>

          {/* Direct Link to Official Instagram: https://www.instagram.com/giftsbyadeola/ */}
          <div className="mb-8">
            <a
              href="https://www.instagram.com/giftsbyadeola/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-brand-pink hover:text-white text-brand-pink border border-brand-pink/30 text-xs font-sans font-semibold tracking-wide transition-all shadow-xs group"
            >
              <Instagram className="w-4 h-4 text-brand-pink group-hover:text-white transition-colors" />
              <span>Visit Official Instagram: @giftsbyadeola</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setIsCustomModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-sm"
            >
              <Gift className="w-4 h-4" />
              <span>Request Custom Curation</span>
            </button>

            <a
              href="https://wa.me/2348060549596?text=Hello%20Adeola!%20I%20am%20interested%20in%20wrapping%20of%20EruIyawo%20or%20curated%20gifting%20on%20a%20budget."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-brand-pink/30 hover:border-brand-pink text-brand-pink bg-white/80 text-xs font-semibold uppercase tracking-widest transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp (08060549596)</span>
            </a>
          </div>
        </div>

        {/* 4 Core Pillars Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="p-6 rounded-2xl bg-white border border-brand-pink/15 text-center shadow-xs">
            <div className="w-10 h-10 rounded-full bg-brand-blush-pink text-brand-pink flex items-center justify-center mx-auto mb-3">
              <Package className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-brand-plum mb-1">
              Wrapping of EruIyawo
            </h4>
            <p className="text-xs text-brand-plum/65 font-sans">
              Royal presentation of traditional Yoruba engagement gifts & luggage.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-brand-pink/15 text-center shadow-xs">
            <div className="w-10 h-10 rounded-full bg-brand-blush-pink text-brand-pink flex items-center justify-center mx-auto mb-3">
              <Gift className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-brand-plum mb-1">
              Corporate Gifts
            </h4>
            <p className="text-xs text-brand-plum/65 font-sans">
              Branded executive packages, retreats, and year-end client appreciation.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-brand-pink/15 text-center shadow-xs">
            <div className="w-10 h-10 rounded-full bg-brand-blush-pink text-brand-pink flex items-center justify-center mx-auto mb-3">
              <Heart className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-brand-plum mb-1">
              Thoughtful Hampers
            </h4>
            <p className="text-xs text-brand-plum/65 font-sans">
              Celebration gift baskets, wine duos, and milestone hampers on a budget.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-brand-pink/15 text-center shadow-xs">
            <div className="w-10 h-10 rounded-full bg-brand-blush-pink text-brand-pink flex items-center justify-center mx-auto mb-3">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-brand-plum mb-1">
              Event Souvenirs
            </h4>
            <p className="text-xs text-brand-plum/65 font-sans">
              Custom VIP guest favors, scented diffusers, and keepsake tokens.
            </p>
          </div>
        </div>
      </section>

      {/* Catalogue & Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-pink font-semibold font-sans block mb-2">
              The Collection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-plum">
              Curated Gift Sets & Services
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-sans tracking-wide transition-all ${
                  activeCategory === cat
                    ? "bg-brand-pink text-white font-semibold shadow-xs"
                    : "bg-white text-brand-plum/70 border border-brand-pink/20 hover:border-brand-pink hover:text-brand-pink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((gift) => (
            <div
              key={gift.id}
              className="group bg-white rounded-2xl overflow-hidden border border-brand-pink/20 hover:border-brand-pink/50 shadow-xs hover:shadow-elevated transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Photo */}
                <div className="relative aspect-[4/3] w-full bg-[#FAF3F6] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={gift.image}
                    alt={gift.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
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
                </div>

                {/* Details */}
                <div className="p-6 sm:p-7">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-plum mb-1.5 group-hover:text-brand-pink transition-colors">
                    {gift.name}
                  </h3>

                  <div className="text-base font-semibold text-brand-purple font-sans mb-3">
                    ₦{gift.price.toLocaleString()}
                  </div>

                  <p className="text-xs sm:text-sm text-brand-plum/70 font-sans leading-relaxed mb-4">
                    {gift.description}
                  </p>

                  <div className="border-t border-brand-pink/15 pt-3">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-gold font-sans block mb-2">
                      Package Highlights:
                    </span>
                    <ul className="space-y-1.5">
                      {gift.details.map((detail, idx) => (
                        <li key={idx} className="text-xs text-brand-plum/75 font-sans flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-pink shrink-0 mt-0.5" />
                          <span>{detail}</span>
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

      {/* FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-16 border-t border-brand-pink/20">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-brand-pink font-semibold font-sans block mb-2">
            Information
          </span>
          <h3 className="font-serif text-3xl font-bold text-brand-plum">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white border border-brand-pink/15 shadow-xs">
              <h4 className="font-serif font-bold text-base text-brand-plum mb-2">{faq.q}</h4>
              <p className="text-xs sm:text-sm text-brand-plum/70 font-sans leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Request Modal */}
      {isCustomModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-plum-dark/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white max-w-xl w-full rounded-3xl p-6 sm:p-8 shadow-modal border border-brand-pink/30 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => {
                setIsCustomModalOpen(false);
                setCustomSubmitted(false);
              }}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-brand-blush-pink text-brand-plum/60"
            >
              <X className="w-5 h-5" />
            </button>

            {customSubmitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 bg-brand-blush-pink text-brand-pink rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-brand-plum mb-2">
                  Request Logged!
                </h3>
                <p className="text-sm text-brand-plum/70 font-sans max-w-sm mx-auto mb-6">
                  Thank you! Adeola will review your custom gifting requirements and reach out via
                  WhatsApp or phone.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={getCustomWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send via WhatsApp Now</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomModalOpen(false);
                      setCustomSubmitted(false);
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-full border border-brand-warm-border text-brand-plum text-xs font-semibold uppercase tracking-wider"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCustomSubmit}>
                <div className="mb-6">
                  <span className="text-[10px] font-sans uppercase tracking-widest text-brand-pink font-semibold">
                    Bespoke Curation On A Budget
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-brand-plum mt-1">
                    Request Custom Gifting or EruIyawo Wrapping
                  </h3>
                  <p className="text-xs text-brand-plum/70 font-sans mt-1">
                    Tell us what you have in mind and your target budget limit.
                  </p>
                </div>

                <div className="space-y-4 text-xs font-sans">
                  <div>
                    <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bunmi Balogun"
                      value={customForm.fullName}
                      onChange={(e) => setCustomForm({ ...customForm, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-pink/25 bg-[#FFF9FB] text-sm text-brand-plum focus:outline-brand-pink"
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
                        placeholder="08060549596"
                        value={customForm.phone}
                        onChange={(e) => setCustomForm({ ...customForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-brand-pink/25 bg-[#FFF9FB] text-sm text-brand-plum focus:outline-brand-pink"
                      />
                    </div>
                    <div>
                      <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="bunmi@example.com"
                        value={customForm.email}
                        onChange={(e) => setCustomForm({ ...customForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-brand-pink/25 bg-[#FFF9FB] text-sm text-brand-plum focus:outline-brand-pink"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                        Recipient Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Bride, Groom, Corporate Staff"
                        value={customForm.recipientName}
                        onChange={(e) =>
                          setCustomForm({ ...customForm, recipientName: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-brand-pink/25 bg-[#FFF9FB] text-sm text-brand-plum focus:outline-brand-pink"
                      />
                    </div>
                    <div>
                      <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                        Occasion / Service
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Wrapping of EruIyawo, Corporate, Birthday"
                        value={customForm.occasion}
                        onChange={(e) => setCustomForm({ ...customForm, occasion: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-brand-pink/25 bg-[#FFF9FB] text-sm text-brand-plum focus:outline-brand-pink"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                        Your Budget (Open Input)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. ₦40,000 or ₦100,000"
                        value={customForm.budget}
                        onChange={(e) => setCustomForm({ ...customForm, budget: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-brand-pink/25 bg-[#FFF9FB] text-sm text-brand-plum focus:outline-brand-pink"
                      />
                    </div>
                    <div>
                      <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                        Target Delivery Date
                      </label>
                      <input
                        type="date"
                        value={customForm.deliveryDate}
                        onChange={(e) =>
                          setCustomForm({ ...customForm, deliveryDate: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-brand-pink/25 bg-[#FFF9FB] text-sm text-brand-plum focus:outline-brand-pink"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                      Delivery Location (Lagos or Nationwide)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. No 12, Johnson Estate, Ojodu Berger, Lagos"
                      value={customForm.deliveryAddress}
                      onChange={(e) =>
                        setCustomForm({ ...customForm, deliveryAddress: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-pink/25 bg-[#FFF9FB] text-sm text-brand-plum focus:outline-brand-pink"
                    />
                  </div>

                  <div>
                    <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                      Items / EruIyawo Details
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. 10 engagement luggage trunks, tubers of yam, fabrics, custom bridal tags in royal purple..."
                      value={customForm.itemsRequested}
                      onChange={(e) =>
                        setCustomForm({ ...customForm, itemsRequested: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-pink/25 bg-[#FFF9FB] text-sm text-brand-plum focus:outline-brand-pink"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsCustomModalOpen(false)}
                      className="px-5 py-2.5 rounded-full border border-brand-warm-border text-brand-plum font-semibold text-xs uppercase tracking-wider"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-7 py-2.5 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm"
                    >
                      Submit Custom Brief
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
