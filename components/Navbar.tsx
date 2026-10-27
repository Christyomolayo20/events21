"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { Menu, X, ArrowUpRight, Crown, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open to prevent background interference
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "Gifting", href: "/gifts-by-adeola" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-subtle border-b border-brand-warm-border/60 py-2 sm:py-2.5 lg:py-2"
            : "bg-white/80 backdrop-blur-sm border-b border-brand-warm-border/30 py-2.5 sm:py-3 lg:py-2"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2">
            {/* 1. Events 21 Logo (On mobile: strictly logo badge; desktop: logo badge + brand text + tagline) */}
            <Logo size="md" hideTextOnMobile={true} />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href === "/services" && pathname.startsWith("/services"));

                if (link.name === "Services") {
                  return (
                    <div key={link.name} className="relative group py-2">
                      <Link
                        href={link.href}
                        className={`inline-flex items-center gap-1 text-xs tracking-[0.14em] uppercase font-semibold transition-colors duration-200 ${
                          isActive
                            ? "text-brand-purple"
                            : "text-brand-plum/75 hover:text-brand-purple"
                        }`}
                      >
                        <span>{link.name}</span>
                        <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
                        {isActive && (
                          <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-brand-purple rounded-full" />
                        )}
                      </Link>

                      {/* Dropdown Menu */}
                      <div className="absolute top-full left-0 w-64 pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 z-50">
                        <div className="bg-white rounded-2xl shadow-xl border border-brand-warm-border/80 p-2 space-y-1">
                          <Link
                            href="/services"
                            className="block px-3.5 py-2.5 rounded-xl text-xs font-semibold text-brand-plum hover:bg-brand-soft-lavender/50 hover:text-brand-purple transition-colors"
                          >
                            <span className="block text-brand-plum font-serif text-sm">
                              All Services
                            </span>
                            <span className="block text-[11px] text-brand-plum/60 font-sans font-normal mt-0.5">
                              Packages, Celebrations &amp; Styling
                            </span>
                          </Link>
                          <Link
                            href="/services/royal-planners-academy"
                            className="block px-3.5 py-2.5 rounded-xl text-xs font-semibold text-brand-plum hover:bg-brand-soft-lavender/50 hover:text-brand-purple transition-colors border-t border-brand-warm-border/40"
                          >
                            <div className="flex items-center justify-between">
                              <span className="block text-brand-purple font-serif text-sm font-bold">
                                Royal Planners Academy
                              </span>
                              <span className="text-[9px] uppercase tracking-wider font-sans font-bold px-1.5 py-0.5 rounded-full bg-brand-gold/15 text-brand-gold">
                                Training
                              </span>
                            </div>
                            <span className="block text-[11px] text-brand-plum/60 font-sans font-normal mt-0.5">
                              Event planning training &amp; mentorship
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-xs tracking-[0.14em] uppercase font-semibold transition-colors duration-200 ${
                      isActive
                        ? "text-brand-purple"
                        : "text-brand-plum/75 hover:text-brand-purple"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-brand-purple rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Right Action CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/contact"
                id="nav-cta-plan-desktop"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-bold tracking-[0.16em] uppercase transition-all shadow-md hover:shadow-elevated hover:scale-[1.02] active:scale-[0.98] border border-brand-gold/40"
              >
                <span>Plan Your Event</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-brand-gold-light" />
              </Link>
            </div>

            {/* Mobile Header: Exactly 2 elements on right (Plan Your Event CTA + Hamburger icon) */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 lg:hidden ml-auto">
              {/* 2. Plan Your Event CTA */}
              <Link
                href="/contact"
                id="nav-cta-plan-mobile"
                className="inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-xs border border-brand-gold/30 active:scale-95 transition-all whitespace-nowrap"
              >
                <span>Plan Your Event</span>
                <ArrowUpRight className="w-3 h-3 text-brand-gold-light shrink-0" />
              </Link>

              {/* 3. Hamburger Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 sm:p-2 rounded-xl text-brand-plum hover:text-brand-purple hover:bg-brand-warm-gray transition-colors shrink-0"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-brand-purple" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[84%] max-w-sm bg-brand-warm-white z-50 shadow-modal transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col h-full overflow-hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-brand-warm-border/60 shrink-0">
          <Logo size="sm" hideTextOnMobile={false} />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-full hover:bg-brand-warm-gray text-brand-plum"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 space-y-2">
          <div className="text-[10px] uppercase tracking-widest text-brand-gold font-semibold mb-2">
            Navigation Menu
          </div>
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href === "/services" && pathname.startsWith("/services"));

            if (link.name === "Services") {
              const isAcademyActive = pathname === "/services/royal-planners-academy";

              return (
                <div key={link.name} className="space-y-1">
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3.5 py-2.5 rounded-xl text-base font-serif transition-colors ${
                      isActive && !isAcademyActive
                        ? "text-brand-purple font-bold bg-brand-soft-lavender/60"
                        : "text-brand-plum hover:text-brand-purple hover:bg-brand-warm-gray"
                    }`}
                  >
                    {link.name}
                  </Link>

                  {/* Sublink for Royal Planners Academy */}
                  <Link
                    href="/services/royal-planners-academy"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between ml-3 px-3 py-2 rounded-lg text-sm font-sans transition-colors ${
                      isAcademyActive
                        ? "text-brand-purple font-bold bg-brand-soft-lavender/60"
                        : "text-brand-plum/80 hover:text-brand-purple hover:bg-brand-warm-gray"
                    }`}
                  >
                    <span>Royal Planners Academy</span>
                    <span className="text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-brand-gold/15 text-brand-gold">
                      Academy
                    </span>
                  </Link>
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3.5 py-2.5 rounded-xl text-base font-serif transition-colors ${
                  isActive
                    ? "text-brand-purple font-bold bg-brand-soft-lavender/60"
                    : "text-brand-plum hover:text-brand-purple hover:bg-brand-warm-gray"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="pt-5 border-t border-brand-warm-border/60 mt-5 space-y-3">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white text-xs uppercase tracking-widest font-bold transition-all shadow-md border border-brand-gold/40"
            >
              <span>Plan Your Event</span>
              <ArrowUpRight className="w-4 h-4 text-brand-gold-light" />
            </Link>
            <Link
              href="/services/royal-planners-academy#register"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-white border border-brand-purple/20 text-brand-purple text-xs uppercase tracking-widest font-semibold hover:bg-brand-soft-lavender/50 transition-colors"
            >
              <span>Royal Planners Academy</span>
            </Link>
          </div>
        </div>

        <div className="p-4 sm:p-5 border-t border-brand-warm-border/60 bg-white/70 text-center shrink-0">
          <p className="text-xs text-brand-plum/70 font-sans">
            Ojodu Berger, Lagos, Nigeria •{" "}
            <a
              href="https://www.instagram.com/events_21/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-purple hover:underline font-medium"
            >
              @events_21
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
