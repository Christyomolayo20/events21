import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { SERVICES_DATA } from "@/lib/data";
import ConsultationCTA from "@/components/ConsultationCTA";

export const metadata = {
  title: "Services | Events 21 • Event Planning, Styling & Coordination",
  description:
    "Explore Events 21's event planning, luxury wedding styling, milestone birthday celebrations, and coordination services in Ibadan, Lagos, and nationwide.",
};

export default function ServicesPage() {
  // Enhanced service items with authentic imagery treatment
  const servicesList = SERVICES_DATA.map((service) => {
    if (service.id === "social-celebrations") {
      return {
        ...service,
        image: "/images/decor-tablescape-celebration.jpg",
        title: "Milestone Birthdays & Celebrations",
        description:
          "From intimate milestone birthday dinners and anniversaries to grand jubilee galas. We create bespoke tablescapes, ambient lighting, and bespoke celebration experiences tailored to the celebrant.",
      };
    }
    if (service.id === "royal-wedding-design") {
      return {
        ...service,
        image: "/images/landing-couple-traditional.jpg",
        title: "Wedding Planning & Royal Styling",
        description:
          "Comprehensive design and execution for traditional Nigerian engagements and contemporary white weddings. We harmoniously merge cultural heritage with high-fashion aesthetics and exquisite floral architecture.",
      };
    }
    if (service.id === "proposal-planning") {
      return {
        ...service,
        image: "/images/landing-couple-white.jpg",
        title: "Surprise Proposal Concepts",
        description:
          "Intimate and cinematic proposal experiences. From private candlelit rooftop setups to custom floral backdrops, we orchestrate unforgettable surprise moments with discreet precision.",
      };
    }
    return service;
  });

  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-20">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-soft-lavender border border-brand-purple/20 text-brand-purple text-xs font-sans tracking-widest uppercase font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Offerings</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-brand-plum leading-tight mb-4">
            Curated Planning &amp;{" "}
            <span className="italic font-normal font-serif text-brand-purple">
              Styling Services.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-brand-plum/75 font-sans leading-relaxed">
            Straightforward, visually driven event management. Every service is built around
            intentional design, cultural respect, and seamless day-of execution across Ibadan, Lagos, and nationwide.
          </p>
        </div>
      </section>

      {/* Services Grid (Visually Driven, Consistent Sizing, Zero Repetition) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service) => (
            <div
              key={service.id}
              id={service.id}
              className="group bg-white rounded-3xl overflow-hidden border border-brand-warm-border hover:border-brand-purple/40 shadow-xs hover:shadow-subtle transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Photo Container with Fixed Height & Centered Framing to Prevent Cropping */}
                <div className="relative w-full h-[320px] sm:h-[340px] bg-brand-plum overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ objectPosition: "top center" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                </div>

                {/* Content: Service Name & Meaningful Description */}
                <div className="p-6 sm:p-7">
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-brand-plum mb-3 group-hover:text-brand-purple transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-sm text-brand-plum/75 font-sans leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Purposeful Enquiry Link */}
              <div className="px-6 pb-6 pt-2 border-t border-brand-warm-border/40 mt-auto flex items-center justify-between">
                <Link
                  href={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="text-xs font-semibold uppercase tracking-wider text-brand-purple hover:text-brand-purple-hover font-sans inline-flex items-center gap-1.5 transition-colors group/link"
                >
                  <span>Enquire About This Service</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Single Purposeful Consultation CTA Section */}
      <ConsultationCTA
        title="Discuss Your Upcoming Event"
        subtitle="Tell us about your celebration date and vision. Let us explore how Events 21 can orchestrate your event with effortless grace."
      />
    </div>
  );
}
