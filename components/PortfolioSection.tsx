"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus, Eye, Play } from "lucide-react";
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

  const categories = ["All", "Weddings", "Traditional", "Decor", "Celebrations", "Corporate Events", "Proposals"];

  const filteredItems =
    activeCategory === "All"
      ? items
      : items.filter((item) => {
          if (activeCategory === "Decor") {
            return item.category === "Decor" || (item.category as string) === "Ballrooms & Decor";
          }
          return item.category === activeCategory;
        });

  return (
    <section className="py-14 md:py-20 bg-white border-b border-brand-warm-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-purple font-semibold font-sans block mb-2">
              Selected Portfolio
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-plum leading-tight">
              Stories We Have{" "}
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
          {filteredItems.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-brand-warm-white border border-brand-warm-border/80 hover:border-brand-purple/40 transition-all duration-500 shadow-xs hover:shadow-elevated flex flex-col justify-between w-full max-w-[420px] mx-auto"
              >
                {/* Photo Container with Fixed Height & Top-Center Alignment */}
                <div className="relative w-full h-[380px] sm:h-[420px] overflow-hidden bg-brand-plum shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ objectPosition: "top center" }}
                  />
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-brand-plum-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-brand-plum text-xs font-sans font-semibold uppercase tracking-wider transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
                      {item.videoUrl ? (
                        <>
                          <Play className="w-4 h-4 text-brand-purple fill-brand-purple" />
                          <span>Watch Video</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4 text-brand-purple" />
                          <span>View Story</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider bg-white/90 backdrop-blur-md text-brand-plum shadow-xs">
                      {item.category}
                    </span>
                  </div>

                  {/* Video Badge */}
                  {item.videoUrl && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider bg-brand-purple text-white shadow-xs">
                        <Play className="w-3 h-3 fill-white" />
                        <span>Video Reel</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Caption Bar */}
                <div className="p-5 sm:p-6 flex items-start justify-between gap-4 bg-white grow">
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
