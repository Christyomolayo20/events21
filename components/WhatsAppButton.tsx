"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { BRAND_CONFIG } from "@/lib/data";
import { getBrandConfig } from "@/lib/store";

export default function WhatsAppButton() {
  const [config, setConfig] = useState(BRAND_CONFIG);

  useEffect(() => {
    setConfig(getBrandConfig());
    const handleUpdate = () => setConfig(getBrandConfig());
    window.addEventListener("events21_settings_updated", handleUpdate);
    return () => window.removeEventListener("events21_settings_updated", handleUpdate);
  }, []);

  const whatsappDigits = (config.whatsappNumber || BRAND_CONFIG.whatsappNumber).replace(/[^0-9]/g, "");
  const displayPhone = config.phone || BRAND_CONFIG.phone;
  const whatsappUrl = `https://wa.me/${whatsappDigits}?text=Hello%20Events%2021!%20I%20would%20like%20to%20enquire%20about%20your%20event%20planning%2C%20styling%2C%20and%20gifting%20services.`;

  return (
    <aside
      aria-label="Contact via WhatsApp"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-3 group"
    >
      {/* Sleek Tooltip / Badge */}
      <span className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-brand-plum text-xs font-sans font-medium shadow-elevated border border-brand-warm-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
        <span>Chat on WhatsApp: {displayPhone}</span>
      </span>

      {/* Direct WhatsApp Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat directly on WhatsApp with Events 21 (${displayPhone})`}
        className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 group/btn"
      >
        {/* Animated Ping Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping opacity-60 pointer-events-none" />

        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 relative z-10 fill-white text-[#25D366] transition-transform group-hover/btn:scale-110" />
      </a>
    </aside>
  );
}
