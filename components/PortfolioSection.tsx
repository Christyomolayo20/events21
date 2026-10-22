"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus, Eye } from "lucide-react";
import { getPortfolio } from "@/lib/store";
import { PortfolioItem } from "@/lib/types";
import LightboxModal from "./LightboxModal";

export default function PortfolioSection() {
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
    <section className="py-20 md:py-28 bg-white border-b border-brand-warm-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-purple font-semibold font-sans block mb-3">
              Selected Portfolio
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-plum leading-tight">
              Stories We Have <br />
              <span className="italic font-normal font-serif text-brand-purple">
                Brought to Life.
              </span>
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
                    ? "bg-brand-plum text-white font-semibold shadow-xs"
                    : "bg-brand-warm-gray text-brand-plum/70 hover:text-brand-plum hover:bg-brand-warm-border/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Masonry / Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => {
            // Give subtle varied proportions for an editorial feel
            const isWide = index === 0 || index === 3;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`group cursor-pointer rounded-2xl overflow-hidden bg-brand-warm-white border border-brand-warm-border/80 hover:border-brand-purple/40 transition-all duration-500 shadow-xs hover:shadow-elevated flex flex-col ${
                  isWide ? "md:col-span-2 lg:col-span-2" : "col-span-1"
                }`}
              >
                {/* Photo Container */}
                <div
                  className={`relative w-full overflow-hidden bg-brand-plum ${
                    isWide ? "aspect-[16/9] sm:aspect-[21/9]" : "aspect-[4/3] sm:aspect-[1/1]"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-brand-plum-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-brand-plum text-xs font-sans font-semibold uppercase tracking-wider transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
                      <Eye className="w-4 h-4 text-brand-purple" />
                      <span>View Story</span>
                    </span>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider bg-white/90 backdrop-blur-md text-brand-plum shadow-xs">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Caption Bar */}
                <div className="p-5 sm:p-6 flex items-start justify-between gap-4 bg-white">
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-plum group-hover:text-brand-purple transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-brand-plum/60 font-sans mt-1 line-clamp-1">
                      {item.subtitle}
                    </p>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-brand-warm-gray text-brand-plum/60 group-hover:bg-brand-purple group-hover:text-white flex items-center justify-center shrink-0 transition-colors mt-0.5">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Work Action */}
        <div className="text-center mt-12 md:mt-16">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-sm hover:shadow"
          >
            <span>Explore Complete Gallery</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        item={selectedItem}
        items={filteredItems}
        onClose={() => setSelectedItem(null)}
        onSelect={(item) => setSelectedItem(item)}
      />
    </section>
  );
}
