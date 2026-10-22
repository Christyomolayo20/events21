import React from "react";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "full" | "minimal" | "white" | "with-gifts";
  size?: "sm" | "md" | "lg";
  className?: string;
  showSubtitle?: boolean;
}

export default function Logo({
  variant = "full",
  size = "md",
  className = "",
  showSubtitle = true,
}: LogoProps) {
  const isLarge = size === "lg";
  const isSmall = size === "sm";

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group transition-opacity hover:opacity-90 ${className}`}
      aria-label="Event 21 - Home"
    >
      {/* Brand Icon Badge */}
      <div
        className={`relative flex items-center justify-center rounded-xl overflow-hidden shrink-0 shadow-sm border border-brand-purple/20 ${
          isSmall ? "w-9 h-9" : isLarge ? "w-14 h-14" : "w-11 h-11"
        } bg-[#532180]`}
      >
        <Image
          src="/images/events21-logo.jpg"
          alt="Event 21"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Brand Wordmark */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span
            className={`font-serif tracking-wider font-bold leading-none ${
              variant === "white"
                ? "text-white"
                : "text-brand-plum group-hover:text-brand-purple transition-colors"
            } ${isSmall ? "text-lg" : isLarge ? "text-2xl md:text-3xl" : "text-xl"}`}
          >
            EVENTS 21
          </span>

          {variant === "with-gifts" && (
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-sans font-medium tracking-wide bg-brand-blush-pink text-brand-pink border border-brand-pink/20">
              + Gifts by Adeola
            </span>
          )}
        </div>

        {showSubtitle && (
          <span
            className={`font-sans tracking-[0.2em] uppercase font-semibold text-[9px] md:text-[10px] mt-0.5 ${
              variant === "white" ? "text-gray-300" : "text-brand-gold"
            }`}
          >
            All Your Event Needs
          </span>
        )}
      </div>
    </Link>
  );
}
