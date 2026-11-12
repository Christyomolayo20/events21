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
}: LogoProps) {
  const isLarge = size === "lg";
  const isSmall = size === "sm";

  return (
    <Link
      href="/"
      className={`inline-flex items-center group transition-opacity hover:opacity-95 shrink-0 ${className}`}
      aria-label="Events 21 - All Your Event Needs"
    >
      <div
        className={`relative shrink-0 rounded-xl overflow-hidden shadow-sm transition-transform duration-200 group-hover:scale-[1.03] ${
          variant === "white"
            ? "border border-brand-gold/45"
            : "border border-brand-gold/30"
        } ${
          isSmall
            ? "w-[110px] h-[44px]"
            : isLarge
            ? "w-[175px] h-[70px] sm:w-[195px] sm:h-[78px]"
            : "w-[120px] h-[48px] sm:w-[135px] sm:h-[54px]"
        }`}
      >
        <Image
          src="/images/events21-brand-logo.png"
          alt="Events 21 — All Your Event Needs"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
    </Link>
  );
}
