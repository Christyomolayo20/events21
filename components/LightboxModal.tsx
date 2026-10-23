"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, Calendar, MapPin, Sparkles, Play, Video as VideoIcon } from "lucide-react";
import { PortfolioItem } from "@/lib/types";

interface LightboxModalProps {
  item: PortfolioItem | null;
  items: PortfolioItem[];
  onClose: () => void;
  onSelect: (item: PortfolioItem) => void;
}

export default function LightboxModal({ item, items, onClose, onSelect }: LightboxModalProps) {
  const currentIndex = item ? items.findIndex((i) => i.id === item.id) : -1;
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);
  const [viewMode, setViewMode] = React.useState<"image" | "video">("image");

  // Reset active image index and view mode when item changes
  useEffect(() => {
    setActiveImageIndex(0);
    setViewMode(item?.videoUrl ? "video" : "image");
  }, [item?.id, item?.videoUrl]);

  const projectImages = item
    ? item.gallery && item.gallery.length > 0
      ? item.gallery
      : [item.image]
    : [];

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

  const currentDisplayImage = projectImages[activeImageIndex] || item.image;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-brand-plum-dark/90 backdrop-blur-md animate-fade-in">
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors focus:outline-hidden cursor-pointer"
        aria-label="Close modal"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Prev Project button */}
      <button
        type="button"
        onClick={handlePrev}
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors focus:outline-hidden cursor-pointer"
        aria-label="Previous item"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next Project button */}
      <button
        type="button"
        onClick={handleNext}
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors focus:outline-hidden cursor-pointer"
        aria-label="Next item"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Content Modal Card */}
      <div
        className="relative max-w-5xl w-full bg-brand-plum rounded-2xl overflow-hidden shadow-modal border border-white/10 flex flex-col lg:flex-row max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Media Container with Image & Video Support */}
        <div className="relative w-full lg:w-3/5 bg-black flex flex-col justify-between min-h-[340px] lg:min-h-[540px]">
          <div className="relative flex-1 w-full flex items-center justify-center p-4">
            {viewMode === "video" && item.videoUrl ? (
              <video
                src={item.videoUrl}
                controls
                autoPlay
                playsInline
                loop
                className="max-h-[60vh] max-w-full rounded-lg mx-auto"
              />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={currentDisplayImage}
                alt={item.title}
                className="max-h-[60vh] max-w-full object-contain mx-auto"
              />
            )}
          </div>

          {/* Media Navigation & Thumbnail Strip */}
          <div className="p-3 bg-brand-plum-dark/90 backdrop-blur-xs border-t border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {item.videoUrl && (
                <button
                  type="button"
                  onClick={() => setViewMode("video")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-medium transition-all ${
                    viewMode === "video"
                      ? "bg-brand-purple text-white shadow-xs"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Video Reel</span>
                </button>
              )}

              {projectImages.length > 0 && (
                <button
                  type="button"
                  onClick={() => setViewMode("image")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-medium transition-all ${
                    viewMode === "image"
                      ? "bg-brand-purple text-white shadow-xs"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                >
                  <VideoIcon className="w-3.5 h-3.5" />
                  <span>Photos ({projectImages.length})</span>
                </button>
              )}
            </div>

            {/* Thumbnail Strip */}
            {viewMode === "image" && projectImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto py-1 px-1">
                {projectImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-12 h-9 rounded-md overflow-hidden border transition-all shrink-0 cursor-pointer ${
                      activeImageIndex === idx
                        ? "border-brand-gold ring-1 ring-brand-gold scale-105"
                        : "border-white/20 opacity-60 hover:opacity-100"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
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
