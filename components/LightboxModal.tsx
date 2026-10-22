"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, Calendar, MapPin, Sparkles } from "lucide-react";
import { PortfolioItem } from "@/lib/types";

interface LightboxModalProps {
  item: PortfolioItem | null;
  items: PortfolioItem[];
  onClose: () => void;
  onSelect: (item: PortfolioItem) => void;
}

export default function LightboxModal({ item, items, onClose, onSelect }: LightboxModalProps) {
  const currentIndex = item ? items.findIndex((i) => i.id === item.id) : -1;

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onSelect(items[currentIndex - 1]);
    } else if (currentIndex === 0) {
      onSelect(items[items.length - 1]);
    }
  }, [currentIndex, items, onSelect]);

  const handleNext = useCallback(() => {
    if (currentIndex < items.length - 1) {
      onSelect(items[currentIndex + 1]);
    } else if (currentIndex === items.length - 1) {
      onSelect(items[0]);
    }
  }, [currentIndex, items, onSelect]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, handlePrev, handleNext]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-brand-plum-dark/90 backdrop-blur-md animate-fade-in">
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors focus:outline-hidden"
        aria-label="Close modal"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Prev button */}
      <button
        type="button"
        onClick={handlePrev}
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors focus:outline-hidden"
        aria-label="Previous item"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next button */}
      <button
        type="button"
        onClick={handleNext}
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors focus:outline-hidden"
        aria-label="Next item"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Content Modal Card */}
      <div
        className="relative max-w-5xl w-full bg-brand-plum rounded-2xl overflow-hidden shadow-modal border border-white/10 flex flex-col lg:flex-row max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Container */}
        <div className="relative w-full lg:w-3/5 h-72 sm:h-96 lg:h-auto bg-black flex items-center justify-center min-h-[320px] lg:min-h-[540px]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-contain"
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        </div>

        {/* Details Container */}
        <div className="w-full lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto text-white bg-brand-plum">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-sans font-medium uppercase tracking-wider bg-brand-purple/40 text-brand-soft-lavender border border-brand-purple/30">
                {item.category}
              </span>
              <span className="text-xs text-white/50 flex items-center gap-1 font-sans">
                <Calendar className="w-3.5 h-3.5" />
                {item.year}
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2 leading-snug">
              {item.title}
            </h3>

            <div className="flex items-center gap-1.5 text-xs text-brand-gold font-sans mb-4">
              <MapPin className="w-3.5 h-3.5" />
              <span>{item.location}</span>
            </div>

            <p className="text-white/80 text-sm leading-relaxed font-sans mb-6">
              {item.description}
            </p>

            {item.highlights && item.highlights.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs uppercase tracking-widest text-brand-gold font-semibold mb-2.5">
                  Event Highlights
                </h4>
                <ul className="space-y-1.5 text-xs text-white/70 font-sans">
                  {item.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Sparkles className="w-3 h-3 text-brand-pink shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
            <Link
              href={`/contact?preferredStyle=${encodeURIComponent(item.title)}`}
              onClick={onClose}
              className="w-full sm:w-auto flex-1 text-center py-2.5 px-4 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white text-xs uppercase tracking-wider font-semibold transition-colors"
            >
              Enquire About This Style
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto py-2.5 px-4 rounded-full border border-white/20 text-white/70 hover:text-white text-xs uppercase tracking-wider transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
