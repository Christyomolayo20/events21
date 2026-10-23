import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Sparkles, MessageSquare } from "lucide-react";
import { SERVICES_DATA } from "@/lib/data";

export const metadata = {
  title: "Our Services | Event 21 • Full Planning, Styling & Coordination",
  description:
    "Explore Event 21's event planning, day-of coordination, luxury wedding styling, corporate productions, and Gifts by Adeola concierge.",
};

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-20">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 md:mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-soft-lavender border border-brand-purple/20 text-brand-purple text-xs font-sans tracking-widest uppercase font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tailored Offerings</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-brand-plum leading-tight mb-4">
            Bespoke Planning &amp;{" "}
            <span className="italic font-normal font-serif text-brand-purple">
              Production Services.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-brand-plum/75 font-sans leading-relaxed">
            Every celebration requires a unique degree of support. Whether you need an experienced
            director for your wedding day or end-to-end concept production, our services are built
            for peace of mind and unforgettable experiences.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 md:space-y-14">
        {SERVICES_DATA.map((service, index) => {
          const isEven = index % 2 === 1;

          return (
            <div
              key={service.id}
              id={service.id}
              className={`scroll-mt-32 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-brand-warm-border shadow-xs hover:shadow-subtle transition-all`}
            >
              {/* Image Column with Fixed Height & Centered Focus */}
              <div
                className={`lg:col-span-6 relative rounded-2xl overflow-hidden h-[280px] sm:h-[340px] lg:h-[380px] w-full bg-brand-plum shadow-md ${
                  isEven ? "lg:order-2" : "lg:order-1"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover object-center"
                  style={{ objectPosition: "center center" }}
                />
              </div>

              {/* Content Column */}
              <div
                className={`lg:col-span-6 space-y-5 ${
                  isEven ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div>
                  <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold font-sans block mb-1">
                    {service.tagline}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-brand-plum">
                    {service.title}
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-brand-plum/80 font-sans leading-relaxed">
                  {service.description}
                </p>

                {/* Inclusions */}
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-brand-purple font-semibold font-sans mb-3">
                    What&apos;s Included:
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {service.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-brand-plum/75 font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-purple shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Suitable for note */}
                <div className="p-3.5 rounded-xl bg-brand-warm-white border border-brand-warm-border/70 text-xs text-brand-plum/70 font-sans">
                  <strong className="text-brand-plum font-semibold">Ideal for: </strong>
                  {service.suitableFor}
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                  >
                    <span>Enquire About This Service</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>

                  <a
                    href={`https://wa.me/2348060549596?text=Hello%20Event%2021!%20I%20would%20like%20to%20enquire%20about%20your%20*${encodeURIComponent(
                      service.title
                    )}*`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full border border-brand-warm-border text-brand-plum hover:text-[#25D366] text-xs font-medium uppercase tracking-wider transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Gifting Section Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-[#FFF9FB] rounded-3xl p-8 sm:p-12 border border-brand-pink/25 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-widest text-brand-pink font-semibold font-sans block mb-2">
              Looking for Gifting?
            </span>
            <h3 className="font-serif text-3xl font-bold text-brand-plum mb-3">
              Explore Gifts by Adeola
            </h3>
            <p className="text-sm text-brand-plum/75 font-sans leading-relaxed">
              Elevate your event favours, bridesmaid proposals, and celebratory gifting with our
              dedicated sub-brand curated by Adeola.
            </p>
          </div>
          <Link
            href="/gifts-by-adeola"
            className="px-8 py-3.5 rounded-full bg-brand-pink hover:bg-brand-pink-hover text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-sm shrink-0"
          >
            <span>Visit Gifting Boutique</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
