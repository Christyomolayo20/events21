"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowUpRight, Sparkles, Eye } from "lucide-react";
import { getPortfolio } from "@/lib/store";
import { PORTFOLIO_DATA } from "@/lib/data";
import { PortfolioItem } from "@/lib/types";
import LightboxModal from "./LightboxModal";

export default function FeaturedEventsCarousel() {
  // Initialize with canonical featured items for instant SSR paint
  const [items, setItems] = useState<PortfolioItem[]>(() => {
    const featured = PORTFOLIO_DATA.filter((i) => i.featured);
    return featured.length > 0 ? featured : PORTFOLIO_DATA.slice(0, 5);
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);

  // Load portfolio items and subscribe to updates
  useEffect(() => {
    const loadItems = () => {
      const all = getPortfolio();
      const featured = all.filter((i) => i.featured);
      setItems(featured.length > 0 ? featured : all.slice(0, 6));
    };

    loadItems();
    window.addEventListener("events21_portfolio_updated", loadItems);

    // Responsive visible count
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => {
      window.removeEventListener("events21_portfolio_updated", loadItems);
      window.removeEventListener("resize", updateVisibleCount);
    };
  }, []);

  const maxIndex = Math.max(0, items.length - visibleCount);

  // Keep index within bounds when visibleCount changes on rotate/resize
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  }, [maxIndex]);

  // Touch & Swipe handlers
  const minSwipeDistance = 45;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Keyboard navigation
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  if (items.length === 0) return null;

  return (
    <section
      className="py-14 sm:py-18 md:py-24 bg-white border-b border-brand-warm-border/60 overflow-hidden"
      aria-label="Featured Events Carousel"
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 md:mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-soft-lavender border border-brand-purple/20 text-brand-purple text-xs font-sans tracking-widest uppercase font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Selected Celebrations</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-plum leading-tight">
              Featured{" "}
              <span className="italic font-normal font-serif text-brand-purple">
                Events &amp; Portfolio.
              </span>
            </h2>
          </div>

          {/* Carousel Arrow Controls */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous event"
              className="w-11 h-11 rounded-full border border-brand-warm-border bg-white text-brand-plum hover:bg-brand-purple hover:text-white hover:border-brand-purple flex items-center justify-center transition-all shadow-xs active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-brand-purple cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next event"
              className="w-11 h-11 rounded-full border border-brand-warm-border bg-white text-brand-plum hover:bg-brand-purple hover:text-white hover:border-brand-purple flex items-center justify-center transition-all shadow-xs active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-brand-purple cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Viewport & Cards */}
        <div
          className="relative overflow-hidden -mx-2 px-2"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-3"
              >
                <div
                  onClick={() => setSelectedItem(item)}
                  className="group cursor-pointer rounded-2xl overflow-hidden bg-brand-warm-white border border-brand-warm-border/80 hover:border-brand-purple/40 transition-all duration-300 shadow-xs hover:shadow-elevated flex flex-col h-full"
                >
                  {/* Photo Container with Top-Centered Framing to Prevent Unintended Cropping */}
                  <div className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] overflow-hidden bg-brand-plum shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ objectPosition: "top center" }}
                    />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider bg-white/95 backdrop-blur-md text-brand-plum shadow-xs">
                        {item.category}
                      </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-brand-plum-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-brand-plum text-xs font-sans font-semibold uppercase tracking-wider shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <Eye className="w-3.5 h-3.5 text-brand-purple" />
                        <span>View Celebration</span>
                      </span>
                    </div>
                  </div>

                  {/* Informative Card Details */}
                  <div className="p-5 sm:p-6 bg-white flex flex-col justify-between grow border-t border-brand-warm-border/50">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] uppercase tracking-wider text-brand-purple font-semibold font-sans block">
                          {item.category}
                        </span>
                        <span className="text-[10px] text-brand-gold font-sans font-medium">
                          {item.location} • {item.year}
                        </span>
                      </div>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-brand-plum group-hover:text-brand-purple transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      {item.subtitle && (
                        <p className="text-xs text-brand-plum/65 font-sans mt-1 line-clamp-2">
                          {item.subtitle}
                        </p>
                      )}
                    </div>

                    <div className="pt-4 mt-3 border-t border-brand-warm-border/40 flex items-center justify-between text-xs text-brand-purple font-semibold font-sans group-hover:text-brand-plum transition-colors">
                      <span>Explore Gallery</span>
                      <span className="w-7 h-7 rounded-full bg-brand-warm-gray text-brand-plum/60 group-hover:bg-brand-purple group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Pagination Dots */}
        <div className="flex sm:hidden items-center justify-center gap-2 mt-6">
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to event slide ${idx + 1}`}
              className={`transition-all rounded-full cursor-pointer ${
                currentIndex === idx
                  ? "w-7 h-2 bg-brand-purple shadow-xs"
                  : "w-2 h-2 bg-brand-plum/20 hover:bg-brand-plum/40"
              }`}
            />
          ))}
        </div>

        {/* Action Link to Full Portfolio */}
        <div className="text-center mt-10 md:mt-14">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-brand-plum/20 hover:border-brand-purple text-brand-plum hover:text-brand-purple text-xs uppercase tracking-widest font-semibold transition-colors bg-white shadow-xs cursor-pointer"
          >
            <span>Explore Complete Gallery</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        item={selectedItem}
        items={items}
        onClose={() => setSelectedItem(null)}
        onSelect={(item) => setSelectedItem(item)}
      />
    </section>
  );
}
