"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SERVICES_DATA } from "@/lib/data";

export default function ServicesSection() {
  return (
    <section className="py-14 md:py-20 bg-brand-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <span className="text-xs uppercase tracking-widest text-brand-purple font-semibold font-sans block mb-2">
            What We Do
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-plum leading-tight">
            Curated Planning &amp;{" "}
            <span className="italic font-normal font-serif text-brand-purple">
              Design Services.
            </span>
          </h2>
        </div>

        {/* Clean Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl overflow-hidden border border-brand-warm-border hover:border-brand-purple/40 shadow-xs hover:shadow-subtle transition-all duration-300 flex flex-col justify-between w-full max-w-[400px] mx-auto"
            >
              <div>
                {/* Photo with fixed height & width, top-centered to prevent clipping */}
                <div className="relative w-full h-[320px] sm:h-[350px] bg-brand-plum overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ objectPosition: "top center" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                </div>

                {/* Details */}
                <div className="p-6 sm:p-7">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-gold font-sans block mb-1">
                    {service.tagline}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-plum mb-2.5 group-hover:text-brand-purple transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-plum/70 font-sans leading-relaxed line-clamp-3">
                    {service.snippet || service.description}
                  </p>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="px-6 pb-6 pt-3 border-t border-brand-warm-border/40 mt-auto flex items-center justify-between">
                <Link
                  href={`/services#${service.id}`}
                  className="text-xs font-semibold uppercase tracking-wider text-brand-plum/80 hover:text-brand-purple font-sans inline-flex items-center gap-1 group/link transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </Link>

                <Link
                  href={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="text-xs text-brand-purple font-sans font-medium hover:underline"
                >
                  Enquire
                </Link>
              </div>
            </div>
          ))}

          {/* Service Card 6: Royal Planners Academy */}
          <div
            id="service-royal-planners-academy"
            className="group bg-white rounded-2xl overflow-hidden border border-brand-warm-border hover:border-brand-purple/40 shadow-xs hover:shadow-subtle transition-all duration-300 flex flex-col justify-between w-full max-w-[400px] mx-auto"
          >
            <div>
              {/* Photo */}
              <div className="relative w-full h-[320px] sm:h-[350px] bg-brand-plum overflow-hidden shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/about-team-seated.jpg"
                  alt="Royal Planners Academy by Events 21"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ objectPosition: "center center" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider bg-white/95 backdrop-blur-xs text-brand-purple shadow-xs">
                    New Service
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 sm:p-7">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-gold font-sans block mb-1">
                  Professional Event Planning Training
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-plum mb-2.5 group-hover:text-brand-purple transition-colors">
                  Royal Planners Academy
                </h3>
                <p className="text-xs sm:text-sm text-brand-plum/70 font-sans leading-relaxed">
                  Practical event planning training designed to equip aspiring and emerging planners with the skills, knowledge, and professional confidence to thrive in the event industry.
                </p>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="px-6 pb-6 pt-3 border-t border-brand-warm-border/40 mt-auto flex items-center justify-between">
              <Link
                href="/services/royal-planners-academy"
                className="text-xs font-semibold uppercase tracking-wider text-brand-purple hover:text-brand-purple-hover font-sans inline-flex items-center gap-1 group/link transition-colors"
              >
                <span>Explore the Academy</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </Link>

              <Link
                href="/services/royal-planners-academy#register"
                className="text-xs text-brand-plum/80 font-sans font-medium hover:text-brand-purple hover:underline"
              >
                Register
              </Link>
            </div>
          </div>
        </div>

        {/* View All Services Footer Link */}
        <div className="text-center mt-10 md:mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-brand-plum/20 hover:border-brand-purple text-brand-plum hover:text-brand-purple text-xs uppercase tracking-widest font-semibold transition-colors bg-white shadow-xs"
          >
            <span>View Detailed Service Breakdown</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
