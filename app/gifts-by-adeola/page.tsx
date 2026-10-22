"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, MessageSquare, CheckCircle2, Package, Gift, Heart, Send, X, ShieldCheck, Truck, Clock } from "lucide-react";
import { GIFTS_CATALOGUE } from "@/lib/data";
import { GiftItem } from "@/lib/types";
import { saveGiftRequest } from "@/lib/store";

export default function GiftsByAdeolaPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [customSubmitted, setCustomSubmitted] = useState(false);

  const [customForm, setCustomForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    recipientName: "",
    occasion: "Bridal Party Proposal",
    budget: "₦50,000 – ₦100,000",
    itemsRequested: "",
    deliveryDate: "",
    deliveryAddress: "",
    personalMessage: "",
  });

  const categories = ["All", "Celebration", "Bridal Suite", "Corporate", "Milestones", "Bespoke"];

  const filteredItems =
    activeCategory === "All"
      ? GIFTS_CATALOGUE
      : GIFTS_CATALOGUE.filter((item) => item.category === activeCategory);

  const getWhatsAppOrderLink = (gift: GiftItem) => {
    const text = `Hello Gifts by Adeola! I would like to order the *${encodeURIComponent(
      gift.name
    )}* (₦${gift.price.toLocaleString()}).%0A%0ACould you confirm availability, delivery timelines in Lagos, and personalization options?`;
    return `https://wa.me/2348123456789?text=${text}`;
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
    )}%0A*Budget:* ${encodeURIComponent(customForm.budget)}%0A*Delivery Date:* ${encodeURIComponent(
      customForm.deliveryDate || "TBD"
    )}%0A*Address:* ${encodeURIComponent(
      customForm.deliveryAddress
    )}%0A*Details:* ${encodeURIComponent(customForm.itemsRequested)}`;

    return `https://wa.me/2348123456789?text=${text}`;
  };

  const faqs = [
    {
      q: "Where do you deliver?",
      a: "We offer dedicated hand delivery across all areas of Lagos (Island & Mainland) and partner with insured logistics couriers for delivery across Nigeria.",
    },
    {
      q: "Can I personalize the ribbon, colors, and items?",
      a: "Yes! Every box includes handwritten calligraphy notes and satin ribbon matching. We can also custom print names on robes, tumblers, and glassware.",
    },
    {
      q: "Do you handle bulk corporate or wedding guest favors?",
      a: "Absolutely. We specialize in quantities from 10 to 500+ units with tiered volume pricing and branded company or couple monograms.",
    },
    {
      q: "How early should I place an order?",
      a: "Standard hampers require 24–48 hours notice. Custom or bulk orders typically require 5–10 days for optimal sourcing and bespoke assembly.",
    },
  ];

  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28 bg-[#FFFBFD]">
      {/* Sub-brand Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blush-pink border border-brand-pink/25 text-brand-pink text-xs font-sans tracking-widest uppercase font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gifts by Adeola • Connected Gifting Studio</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-brand-plum leading-tight mb-6">
            Make Every Gift <br />
            <span className="italic font-normal font-serif text-brand-pink">
              Feel Personal.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-brand-plum/75 font-sans leading-relaxed max-w-2xl mx-auto">
            Thoughtfully curated celebration hampers, bridal suite sets, and bespoke luxury gifting.
            Created by Adeola to complement life&apos;s most meaningful milestones.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <button
              type="button"
              onClick={() => setIsCustomModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-sm"
            >
              <Gift className="w-4 h-4" />
              <span>Request Custom Curation</span>
            </button>

            <a
              href="https://wa.me/2348123456789?text=Hello%20Adeola!%20I%20am%20interested%20in%20your%20gifting%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-brand-pink/30 hover:border-brand-pink text-brand-pink bg-white/80 text-xs font-semibold uppercase tracking-widest transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat with Adeola</span>
            </a>
          </div>
        </div>

        {/* Value Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-6 rounded-2xl bg-white border border-brand-pink/15 text-center shadow-xs">
            <div className="w-10 h-10 rounded-full bg-brand-blush-pink text-brand-pink flex items-center justify-center mx-auto mb-3">
              <Package className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-brand-plum mb-1">Keepsake Packaging</h4>
            <p className="text-xs text-brand-plum/65 font-sans">
              Rigid presentation boxes, double-faced satin ribbon & wax seals.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-brand-pink/15 text-center shadow-xs">
            <div className="w-10 h-10 rounded-full bg-brand-blush-pink text-brand-pink flex items-center justify-center mx-auto mb-3">
              <Heart className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-brand-plum mb-1">Calligraphy Notes</h4>
            <p className="text-xs text-brand-plum/65 font-sans">
              Every order includes a personalized, handwritten message card.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-brand-pink/15 text-center shadow-xs">
            <div className="w-10 h-10 rounded-full bg-brand-blush-pink text-brand-pink flex items-center justify-center mx-auto mb-3">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-brand-plum mb-1">Doorstep Delivery</h4>
            <p className="text-xs text-brand-plum/65 font-sans">
              Careful, timed hand delivery throughout Lagos and nationwide shipping.
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
              Curated Gift Sets & Hampers
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
                  <Image
                    src={gift.image}
                    alt={gift.name}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                      Package Includes:
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
                  <span>Order on WhatsApp (₦{gift.price.toLocaleString()})</span>
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
                    Bespoke Curation
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-brand-plum mt-1">
                    Request a Custom Gift Box
                  </h3>
                  <p className="text-xs text-brand-plum/70 font-sans mt-1">
                    Tell us what you have in mind and we will design a personalized proposal.
                  </p>
                </div>

                <div className="space-y-4 text-xs font-sans">
                  <div>
                    <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                      Your Name *
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
                        placeholder="+234 801 234 5678"
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
                        placeholder="e.g. Bride / Husband"
                        value={customForm.recipientName}
                        onChange={(e) =>
                          setCustomForm({ ...customForm, recipientName: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-brand-pink/25 bg-[#FFF9FB] text-sm text-brand-plum focus:outline-brand-pink"
                      />
                    </div>
                    <div>
                      <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                        Occasion
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 30th Birthday, Bridal Shower"
                        value={customForm.occasion}
                        onChange={(e) => setCustomForm({ ...customForm, occasion: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-brand-pink/25 bg-[#FFF9FB] text-sm text-brand-plum focus:outline-brand-pink"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                        Estimated Budget
                      </label>
                      <select
                        value={customForm.budget}
                        onChange={(e) => setCustomForm({ ...customForm, budget: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-brand-pink/25 bg-[#FFF9FB] text-sm text-brand-plum focus:outline-brand-pink"
                      >
                        <option value="₦35,000 – ₦50,000">₦35,000 – ₦50,000</option>
                        <option value="₦50,000 – ₦100,000">₦50,000 – ₦100,000</option>
                        <option value="₦100,000 – ₦250,000">₦100,000 – ₦250,000</option>
                        <option value="₦250,000+ (Bulk / VIP)">₦250,000+ (Bulk / VIP)</option>
                      </select>
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
                      placeholder="e.g. Lekki Phase 1, Lagos"
                      value={customForm.deliveryAddress}
                      onChange={(e) =>
                        setCustomForm({ ...customForm, deliveryAddress: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-pink/25 bg-[#FFF9FB] text-sm text-brand-plum focus:outline-brand-pink"
                    />
                  </div>

                  <div>
                    <label className="block uppercase font-semibold text-brand-plum/80 mb-1">
                      Items or Theme Preference
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Perfume, silk robe with initials, champagne, scented candle, blush and gold ribbons..."
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
