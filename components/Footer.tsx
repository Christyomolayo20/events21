"use client";

import React, { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { Instagram, Phone, Mail, MapPin, ArrowUpRight, MessageSquare, X } from "lucide-react";

export default function Footer() {
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | null>(null);

  return (
    <>
      <footer className="bg-brand-plum text-brand-warm-white border-t border-brand-plum-dark/40 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-white/10">
            {/* Col 1: Brand & Tagline (span 2) */}
            <div className="lg:col-span-2 space-y-4">
              <Logo variant="white" size="md" />
              <p className="text-white/75 text-sm leading-relaxed max-w-sm font-sans pt-2">
                A premier royal event planning, styling, and management studio based in Lagos,
                Nigeria. Specializing in luxury weddings, stately retirement celebrations, romantic
                proposals, and bespoke cultural gifting.
              </p>

              {/* Social Channels: Both Event 21 and Gifts by Adeola */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="https://www.instagram.com/events_21/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-sans transition-colors"
                  aria-label="Event 21 Instagram"
                >
                  <Instagram className="w-3.5 h-3.5 text-brand-gold" />
                  <span>@events_21</span>
                  <ArrowUpRight className="w-3 h-3 text-white/50" />
                </a>

                <a
                  href="https://www.instagram.com/giftsbyadeola/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-pink/20 hover:bg-brand-pink/30 text-white text-xs font-sans transition-colors border border-brand-pink/30"
                  aria-label="Gifts by Adeola Instagram"
                >
                  <Instagram className="w-3.5 h-3.5 text-brand-pink" />
                  <span>@giftsbyadeola</span>
                  <ArrowUpRight className="w-3 h-3 text-white/50" />
                </a>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-brand-gold font-semibold mb-4">
                Explore Event 21
              </h4>
              <ul className="space-y-2.5 text-sm text-white/70 font-sans">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Our Studio
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-white transition-colors">
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="hover:text-white transition-colors">
                    Portfolio & Gallery
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Plan Your Celebration
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Gifting Sub-brand */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-brand-pink font-semibold mb-4">
                Gifts by Adeola
              </h4>
              <ul className="space-y-2.5 text-sm text-white/70 font-sans">
                <li>
                  <Link href="/gifts-by-adeola" className="hover:text-brand-pink transition-colors">
                    Gifting Boutique
                  </Link>
                </li>
                <li>
                  <Link href="/gifts-by-adeola" className="hover:text-brand-pink transition-colors">
                    Wrapping of Eru Iyawo
                  </Link>
                </li>
                <li>
                  <Link href="/gifts-by-adeola" className="hover:text-brand-pink transition-colors">
                    Corporate Gifts
                  </Link>
                </li>
                <li>
                  <Link href="/gifts-by-adeola" className="hover:text-brand-pink transition-colors">
                    Thoughtful Hampers
                  </Link>
                </li>
                <li>
                  <Link href="/gifts-by-adeola" className="hover:text-brand-pink transition-colors">
                    Guest Souvenirs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Verified Contact & Address */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-brand-gold font-semibold mb-4">
                Lagos Studio
              </h4>
              <ul className="space-y-3 text-sm text-white/70 font-sans">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <span className="leading-snug">
                    No 12, Johnson Estate, Ojodu Berger, Lagos, Lagos, Nigeria
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                  <a href="tel:08060549596" className="hover:text-white transition-colors">
                    08060549596
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                  <a
                    href="mailto:Royaltyeventservice@gmail.com"
                    className="hover:text-white transition-colors break-all"
                  >
                    Royaltyeventservice@gmail.com
                  </a>
                </li>
                <li className="pt-2">
                  <a
                    href="https://wa.me/2348060549596?text=Hello%20Event%2021!%20I%20would%20like%20to%20enquire%20about%20your%20services."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp: 08060549596</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar (Admin removed entirely from user side) */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 font-sans">
            <p>© {new Date().getFullYear()} Event 21 & Gifts by Adeola. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => setActiveModal("privacy")}
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => setActiveModal("terms")}
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal for Privacy & Terms */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white text-brand-plum max-w-lg w-full rounded-2xl p-6 sm:p-8 shadow-modal relative max-h-[85vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-brand-warm-gray text-brand-plum/70"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif text-2xl font-bold text-brand-plum mb-4">
              {activeModal === "privacy" ? "Privacy Policy" : "Terms of Service"}
            </h3>
            <div className="text-sm text-brand-plum/80 leading-relaxed space-y-3 font-sans">
              {activeModal === "privacy" ? (
                <>
                  <p>
                    At Event 21 and Gifts by Adeola, your privacy and event confidentiality are of
                    paramount importance.
                  </p>
                  <p>
                    <strong>Information Collection:</strong> We collect contact information solely
                    to respond to your event inquiries and fulfill custom gifting orders.
                  </p>
                  <p>
                    <strong>Location:</strong> No 12, Johnson Estate, Ojodu Berger, Lagos, Lagos,
                    Nigeria.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Welcome to Event 21. By engaging our planning, styling, or gifting services, you
                    agree to our service terms.
                  </p>
                  <p>
                    <strong>Gifts by Adeola Orders:</strong> Wrapping of Eru Iyawo, corporate gifts,
                    hampers, and souvenirs require advance booking for optimal artisan preparation.
                  </p>
                </>
              )}
            </div>
            <div className="mt-6 pt-4 border-t border-brand-warm-border flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 rounded-full bg-brand-purple text-white text-xs font-medium uppercase tracking-wider hover:bg-brand-purple-hover"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
