"use client";

import React, { useState } from "react";
import { MessageSquare, X } from "lucide-react";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {isOpen && (
        <div className="mb-3 w-76 bg-white rounded-3xl shadow-modal border border-brand-warm-border p-5 animate-fade-in text-brand-plum">
          <div className="flex items-center justify-between pb-3 border-b border-brand-warm-border/60">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
              <span className="text-xs font-serif font-bold text-brand-plum">Event 21 Studio Hotline</span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-brand-plum/40 hover:text-brand-plum"
              aria-label="Close message"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-brand-plum/80 font-sans my-3 leading-relaxed">
            Planning a celebration, proposal, retirement party, or need Gifts by Adeola? Chat directly with our lead planner.
          </p>

          <div className="text-[11px] font-mono font-semibold text-brand-purple mb-3 bg-brand-soft-lavender/60 py-1 px-2.5 rounded-lg text-center">
            Hotline: 08060549596
          </div>

          <a
            href="https://wa.me/2348060549596?text=Hello%20Event%2021!%20I%20would%20like%20to%20enquire%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#20ba59] transition-colors shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    </div>
  );
}
