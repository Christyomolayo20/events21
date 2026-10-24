"use client";

import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import { Instagram, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Gifts by Adeola", href: "/gifts-by-adeola" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-brand-plum text-brand-warm-white border-t border-brand-plum-dark/40 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/10">
          {/* Logo & Concise Description */}
          <div className="max-w-md space-y-3">
            <Logo variant="white" size="md" />
            <p className="text-white/75 text-sm leading-relaxed font-sans font-light">
              Events 21 creates thoughtfully planned, beautifully styled celebrations that turn meaningful
              moments into lasting memories.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://www.instagram.com/events_21/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-sans transition-colors"
              aria-label="Events 21 on Instagram"
            >
              <Instagram className="w-3.5 h-3.5 text-brand-gold" />
              <span>@events_21</span>
              <ArrowUpRight className="w-3 h-3 text-white/50" />
            </a>

            <a
              href="https://www.instagram.com/giftsbyadeola/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-pink/20 hover:bg-brand-pink/30 text-white text-xs font-sans transition-colors border border-brand-pink/30"
              aria-label="Gifts by Adeola on Instagram"
            >
              <Instagram className="w-3.5 h-3.5 text-brand-pink" />
              <span>@giftsbyadeola</span>
              <ArrowUpRight className="w-3 h-3 text-white/50" />
            </a>
          </div>
        </div>

        {/* Secondary Row: Navigation Links & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-white/60 font-sans">
          {/* Essential Navigation Links */}
          <nav className="flex flex-wrap items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Copyright & Location Information */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-white/50">
            <span>Serving Clients Nationwide • Available to Travel</span>
            <span className="hidden sm:inline">•</span>
            <span>&copy; {currentYear} Events 21 (Royalty Twenty One Events).</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
