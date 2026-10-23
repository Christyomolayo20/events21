"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Eye, ArrowUpRight } from "lucide-react";
import { getPortfolio } from "@/lib/store";
import { PortfolioItem } from "@/lib/types";
import LightboxModal from "@/components/LightboxModal";

export default function GalleryPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    setItems(getPortfolio());
    const handleUpdate = () => {
      setItems(getPortfolio());
    };
    window.addEventListener("events21_portfolio_updated", handleUpdate);
    return () => window.removeEventListener("events21_portfolio_updated", handleUpdate);
  }, []);

  const categories = ["All", "Weddings", "Traditional", "Ballrooms & Decor", "Celebrations", "Proposals"];

  const filteredItems =
    activeCategory === "All"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-soft-lavender border border-brand-purple/20 text-brand-purple text-xs font-sans tracking-widest uppercase font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Visual Portfolio</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-brand-plum leading-tight mb-6">
            The Gallery: Real Moments, <br />
            <span className="italic font-normal font-serif text-brand-purple">
              Exquisite Details.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-brand-plum/75 font-sans leading-relaxed">
            Explore a curated selection of weddings, traditional celebrations, and grand ballroom
            atmospheres orchestrated by Event 21. Click any photograph to view the full project
            story.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-sans tracking-wide transition-all ${
                activeCategory === cat
                  ? "bg-brand-plum text-white font-semibold shadow-xs"
                  : "bg-white text-brand-plum/70 border border-brand-warm-border hover:border-brand-purple hover:text-brand-purple"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-brand-warm-border hover:border-brand-purple/40 shadow-xs hover:shadow-elevated transition-all duration-300 flex flex-col justify-between w-full max-w-[420px] mx-auto"
              >
                {/* Photo */}
                <div className="relative w-full h-[360px] sm:h-[400px] overflow-hidden bg-brand-plum shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ objectPosition: "center center" }}
                  />
                  <div className="absolute inset-0 bg-brand-plum-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-brand-plum text-xs font-sans font-semibold uppercase tracking-wider transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
                      <Eye className="w-4 h-4 text-brand-purple" />
                      <span>View Story</span>
                    </span>
                  </div>

                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider bg-white/95 backdrop-blur-xs text-brand-plum shadow-xs">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 sm:p-6 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-plum group-hover:text-brand-purple transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-brand-plum/60 font-sans mt-1 line-clamp-2">
                      {item.subtitle}
                    </p>
                    <span className="text-[11px] text-brand-gold font-sans font-medium mt-2 block">
                      {item.location} • {item.year}
                    </span>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-brand-warm-gray text-brand-plum/60 group-hover:bg-brand-purple group-hover:text-white flex items-center justify-center shrink-0 transition-colors mt-0.5">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center max-w-xl mx-auto p-8 rounded-3xl bg-brand-warm-white border border-brand-warm-border">
          <h3 className="font-serif text-2xl font-bold text-brand-plum mb-2">
            Inspired by What You See?
          </h3>
          <p className="text-sm text-brand-plum/70 font-sans mb-6">
            Let us design a bespoke aesthetic and flawless execution tailored to your celebration.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-sm"
          >
            <span>Plan Your Celebration</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        item={selectedItem}
        items={filteredItems}
        onClose={() => setSelectedItem(null)}
        onSelect={(item) => setSelectedItem(item)}
      />
    </div>
  );
}
