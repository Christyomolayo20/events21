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
            ? "bg-white/95 backdrop-blur-md shadow-subtle border-b border-brand-warm-border/60 py-3.5"
            : "bg-white/80 backdrop-blur-sm border-b border-brand-warm-border/30 py-4.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Pure Event 21 Logo */}
            <Logo size="md" />

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
                              Weddings, Celebrations &amp; Decor
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

            {/* Right Action CTA (Admin lock removed completely as requested) */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-semibold tracking-widest uppercase transition-all shadow-sm hover:shadow active:scale-[0.98]"
              >
                <span>Plan Your Event</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                href="/contact"
                className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-purple text-white text-xs font-semibold uppercase tracking-wider shadow-xs"
              >
                <span>Plan</span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-brand-plum hover:text-brand-purple hover:bg-brand-warm-gray transition-colors"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
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
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[82%] max-w-sm bg-brand-warm-white z-50 shadow-modal transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5 flex items-center justify-between border-b border-brand-warm-border/60">
          <Logo size="sm" />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-full hover:bg-brand-warm-gray text-brand-plum"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-2">
          <div className="text-[10px] uppercase tracking-widest text-brand-gold font-semibold mb-2">
            Event 21 Studio
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
                    className={`flex items-center justify-between ml-4 px-3 py-2 rounded-lg text-sm font-sans transition-colors ${
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
                className={`block px-3.5 py-3 rounded-xl text-base font-serif transition-colors ${
                  isActive
                    ? "text-brand-purple font-bold bg-brand-soft-lavender/60"
                    : "text-brand-plum hover:text-brand-purple hover:bg-brand-warm-gray"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="pt-6 border-t border-brand-warm-border/60 mt-6">
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-brand-purple text-white text-xs uppercase tracking-widest font-semibold hover:bg-brand-purple-hover transition-colors shadow-sm"
            >
              <span>Plan Your Event</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="p-5 border-t border-brand-warm-border/60 bg-white/70 text-center">
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
