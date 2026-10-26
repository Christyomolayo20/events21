import React from "react";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "full" | "minimal" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
  showSubtitle?: boolean;
  hideTextOnMobile?: boolean;
}

export default function Logo({
  variant = "full",
  size = "md",
  className = "",
  showSubtitle = true,
  hideTextOnMobile = false,
}: LogoProps) {
  const isLarge = size === "lg";
  const isSmall = size === "sm";

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group transition-opacity hover:opacity-90 ${className}`}
      aria-label="Events 21 - Home"
    >
      {/* Brand Logo Emblem - Transparent, No White Box, Bigger & Clearly Visible */}
      <div
        className={`relative flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${
          isSmall
            ? "w-16 h-12 sm:w-20 sm:h-14"
            : isLarge
            ? "w-32 h-22 sm:w-40 sm:h-28"
            : "w-20 h-14 sm:w-24 sm:h-16 md:w-28 md:h-18 lg:w-32 lg:h-20"
        }`}
      >
        <Image
          src={
            variant === "white"
              ? "/images/royalty-logo-white.png"
              : "/images/royalty-logo-transparent.png"
          }
          alt="Royalty Twenty One Events"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Brand Wordmark (Strictly Events 21) - hidden on mobile when hideTextOnMobile is true */}
      <div className={`flex-col ${hideTextOnMobile ? "hidden lg:flex" : "flex"}`}>
        <span
          className={`font-serif tracking-wider font-bold leading-none ${
            variant === "white"
              ? "text-white"
              : "text-brand-plum group-hover:text-brand-purple transition-colors"
          } ${isSmall ? "text-lg" : isLarge ? "text-2xl md:text-3xl" : "text-xl"}`}
        >
          EVENTS 21
        </span>

        {showSubtitle && (
          <span
            className={`font-sans tracking-[0.2em] uppercase font-semibold text-[9px] md:text-[10px] mt-1 ${
              variant === "white" ? "text-amber-200" : "text-brand-gold"
            }`}
          >
            All Your Event Needs
          </span>
        )}
      </div>
    </Link>
  );
}
