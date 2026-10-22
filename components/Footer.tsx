"use client";

import React, { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { Instagram, Phone, Mail, MapPin, ArrowUpRight, Lock, X } from "lucide-react";

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
              <p className="text-white/70 text-sm leading-relaxed max-w-sm font-sans pt-2">
                A bespoke event planning, styling, and management studio based in Lagos, Nigeria.
                Crafting meaningful celebrations, luxury weddings, and unforgettable moments with
                seamless execution.
              </p>
              <div className="pt-2 flex items-center gap-4">
                <a
                  href="https://www.instagram.com/events_21/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-sans transition-colors"
                  aria-label="Event 21 on Instagram"
                >
                  <Instagram className="w-4 h-4 text-brand-pink" />
                  <span>@events_21</span>
                  <ArrowUpRight className="w-3 h-3 text-white/50" />
                </a>

                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 text-white/60 hover:text-white text-xs font-sans transition-colors"
                  title="Admin Portal"
                >
                  <Lock className="w-3 h-3 text-brand-gold" />
                  <span>Admin</span>
                </Link>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-brand-gold font-semibold mb-4">
                Explore
              </h4>
              <ul className="space-y-2.5 text-sm text-white/70 font-sans">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Event 21
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
                    Contact & Inquiries
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
                  <Link href="/gifts-by-adeola#celebration" className="hover:text-brand-pink transition-colors">
                    Celebration Hampers
                  </Link>
                </li>
                <li>
                  <Link href="/gifts-by-adeola#bridal" className="hover:text-brand-pink transition-colors">
                    Bridal Suite Sets
                  </Link>
                </li>
                <li>
                  <Link href="/gifts-by-adeola#corporate" className="hover:text-brand-pink transition-colors">
                    Executive Corporate Gifts
                  </Link>
                </li>
                <li>
                  <Link href="/gifts-by-adeola#bespoke" className="hover:text-brand-pink transition-colors">
                    Bespoke Gift Requests
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Contact & Location */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-brand-gold font-semibold mb-4">
                Connect
              </h4>
              <ul className="space-y-3 text-sm text-white/70 font-sans">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <span>Lagos, Nigeria</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                  <a href="tel:+2348123456789" className="hover:text-white transition-colors">
                    +234 812 345 6789
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                  <a href="mailto:hello@events21.ng" className="hover:text-white transition-colors">
                    hello@events21.ng
                  </a>
                </li>
                <li className="pt-2">
                  <span className="text-xs text-white/50 block">By Appointment Only</span>
                  <span className="text-xs text-white/50 block">Mon – Sat: 9am – 6pm</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
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
              <Link href="/admin" className="hover:text-brand-gold transition-colors">
                Admin Access
              </Link>
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
                    <strong>Information Collection:</strong> We collect contact information (such as
                    your name, telephone number, email, event preferences, and guest requirements) solely
                    to respond to your event inquiries and fulfill custom gifting orders.
                  </p>
                  <p>
                    <strong>Use of Information:</strong> Client data is strictly used for event
                    coordination, vendor liaison, and order delivery. We do not sell, rent, or lease your
                    personal data to any third parties.
                  </p>
                  <p>
                    <strong>Image & Portfolio Usage:</strong> Event photographs and video materials are
                    shared on our portfolio and social channels only with client consent and proper
                    courtesies.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Welcome to Event 21. By engaging our planning, styling, or gifting services, you
                    agree to our service terms.
                  </p>
                  <p>
                    <strong>Consultations & Retainers:</strong> Event dates are secured upon execution
                    of a formal agreement and receipt of the agreed deposit. Detailed timelines and
                    vendor management commence upon contract ratification.
                  </p>
                  <p>
                    <strong>Gifts by Adeola Orders:</strong> Bespoke gift hampers and custom party boxes
                    require advance ordering to ensure timely sourcing and assembly. Delivery is
                    conducted across Lagos and nationwide via insured couriers.
                  </p>
                  <p>
                    <strong>Modifications:</strong> In the rare event of date rescheduling or scope
                    adjustment, client requests are accommodated subject to vendor and calendar
                    availability.
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
