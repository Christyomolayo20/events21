import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, CheckCircle2, Crown, Calendar } from "lucide-react";
import { SERVICES_DATA } from "@/lib/data";
import ConsultationCTA from "@/components/ConsultationCTA";

export const metadata = {
  title: "Services & Scope | Events 21 • Event Planning, Styling & Coordination",
  description:
    "Explore the complete scope of Events 21's luxury wedding planning, romantic proposal concepts, milestone celebrations, and royal event coordination—serving clients nationwide and available to travel.",
};

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-20 bg-brand-warm-white">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 md:mb-14">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-soft-lavender border border-brand-purple/20 text-brand-purple text-xs font-sans tracking-widest uppercase font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Service Scope</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-brand-plum leading-tight mb-4">
            Curated Planning &amp;{" "}
            <span className="italic font-normal font-serif text-brand-purple">
              Styling Services.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-brand-plum/75 font-sans leading-relaxed">
            Every celebration orchestrated by Events 21 is anchored in intentional spatial design, cultural reverence,
            and flawless day-of logistics. Below is the detailed breakdown of what we offer and what is included in each service.
          </p>
        </div>

        {/* Quick Navigation Jump Anchors */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8 max-w-4xl mx-auto">
          {SERVICES_DATA.map((service) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              className="px-4 py-2 rounded-full text-xs font-sans font-medium bg-white border border-brand-warm-border text-brand-plum/80 hover:border-brand-purple hover:text-brand-purple hover:bg-brand-soft-lavender/30 transition-all shadow-2xs"
            >
              {service.title.split("&")[0].trim()}
            </a>
          ))}
          <Link
            href="/services/royal-planners-academy"
            className="px-4 py-2 rounded-full text-xs font-sans font-semibold bg-brand-soft-lavender/70 border border-brand-purple/30 text-brand-purple hover:bg-brand-purple hover:text-white transition-all shadow-2xs"
          >
            Royal Planners Academy ★
          </Link>
        </div>
      </section>

      {/* Expanded "Reading More" Editorial Service Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16 mb-16 md:mb-24">
        {SERVICES_DATA.map((service, index) => {
          const isEven = index % 2 === 1;

          return (
            <article
              key={service.id}
              id={service.id}
              className="scroll-mt-28 md:scroll-mt-36 bg-white rounded-3xl overflow-hidden border border-brand-warm-border/80 shadow-xs hover:shadow-subtle transition-all duration-300"
            >
              <div
                className={`flex flex-col ${
                  isEven ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-stretch`}
              >
                {/* Visual Media Column */}
                <div className="lg:w-5/12 relative min-h-[340px] sm:min-h-[420px] lg:min-h-full bg-brand-plum overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    style={{ objectPosition: "top center" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                  {/* Service Number Badge */}
                  <div className="absolute top-5 left-5 z-10">
                    <span className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-xs text-[11px] font-sans font-bold tracking-widest uppercase text-brand-plum shadow-md">
                      Service 0{index + 1}
                    </span>
                  </div>
                </div>

                {/* Content Details Column */}
                <div className="lg:w-7/12 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    {/* Tagline */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-soft-lavender text-brand-purple text-[11px] font-sans font-semibold uppercase tracking-wider mb-3">
                      <Crown className="w-3.5 h-3.5 text-brand-gold" />
                      <span>{service.tagline}</span>
                    </div>

                    {/* Title */}
                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-plum leading-snug mb-4">
                      {service.title}
                    </h2>

                    {/* Narrative Description */}
                    <p className="text-sm sm:text-base text-brand-plum/80 font-sans leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* What This Service Includes (Bullet Points) */}
                    <div className="mb-6 pt-5 border-t border-brand-warm-border/60">
                      <h3 className="text-xs uppercase tracking-widest text-brand-purple font-semibold font-sans mb-3.5">
                        What This Service Includes:
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {service.inclusions.map((inclusion, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2.5 text-xs text-brand-plum/80 font-sans leading-relaxed"
                          >
                            <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0 mt-0.5" />
                            <span>{inclusion}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Suitable For Banner */}
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-brand-soft-lavender/40 border border-brand-purple/15 text-xs text-brand-plum/85 font-sans leading-relaxed mb-6">
                      <span className="font-semibold text-brand-purple block mb-0.5">
                        Suitable For:
                      </span>
                      {service.suitableFor}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-brand-warm-border/60">
                    <Link
                      href={`/contact?service=${encodeURIComponent(service.title)}`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-xs"
                    >
                      <span>Enquire for this Service</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-brand-plum/20 hover:border-brand-purple text-brand-plum hover:text-brand-purple text-xs font-semibold uppercase tracking-widest transition-colors bg-white"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Consultation</span>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}

        {/* Feature Spotlight: Royal Planners Academy */}
        <article
          id="royal-planners-academy"
          className="scroll-mt-28 md:scroll-mt-36 bg-gradient-to-br from-white via-[#FAF7F5] to-brand-soft-lavender/30 rounded-3xl overflow-hidden border-2 border-brand-purple/30 shadow-subtle hover:shadow-elevated transition-all duration-300"
        >
          <div className="flex flex-col lg:flex-row items-stretch">
            {/* Visual Media Column */}
            <div className="lg:w-5/12 relative min-h-[340px] sm:min-h-[420px] lg:min-h-full bg-brand-plum overflow-hidden shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/about-team-seated.jpg"
                alt="Royal Planners Academy Training by Events 21"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                style={{ objectPosition: "center center" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-plum-dark/60 via-transparent to-transparent" />
              <div className="absolute top-5 left-5 z-10">
                <span className="px-3.5 py-1.5 rounded-full bg-brand-purple text-white text-[11px] font-sans font-bold tracking-widest uppercase shadow-md">
                  Training Programme
                </span>
              </div>
            </div>

            {/* Content Details Column */}
            <div className="lg:w-7/12 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold-dark text-[11px] font-sans font-semibold uppercase tracking-wider mb-3">
                  <Crown className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Academy &amp; Mentorship</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-plum leading-snug mb-4">
                  Royal Planners Academy
                </h2>

                <p className="text-sm sm:text-base text-brand-plum/80 font-sans leading-relaxed mb-6">
                  Practical event planning training designed to equip aspiring and emerging planners with the skills, knowledge, and professional confidence to thrive in the event industry.
                </p>

                {/* Key Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 pt-5 border-t border-brand-warm-border/60">
                  <div className="p-3.5 rounded-xl bg-white border border-brand-warm-border/80">
                    <span className="block font-serif font-bold text-sm text-brand-plum mb-0.5">
                      Event Planning Fundamentals
                    </span>
                    <span className="text-xs text-brand-plum/70 font-sans">
                      Timelines, briefs, planning process &amp; execution.
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-brand-warm-border/80">
                    <span className="block font-serif font-bold text-sm text-brand-plum mb-0.5">
                      Client &amp; Team Management
                    </span>
                    <span className="text-xs text-brand-plum/70 font-sans">
                      Client relations, logistics, teams &amp; coordination.
                    </span>
                  </div>
                </div>

                {/* Value Add Highlights */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="px-3 py-1 rounded-full bg-white border border-brand-warm-border text-xs text-brand-plum font-sans font-medium">
                    ✓ Certificate of Participation
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white border border-brand-warm-border text-xs text-brand-plum font-sans font-medium">
                    ✓ 6-Month Internship Placement
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white border border-brand-warm-border text-xs text-brand-plum font-sans font-medium">
                    ✓ 3 Months Field Support
                  </span>
                </div>
              </div>

              {/* Actions Bar */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-brand-warm-border/60">
                <Link
                  href="/services/royal-planners-academy"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-xs"
                >
                  <span>Explore the Academy</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/services/royal-planners-academy#register"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-brand-plum/20 hover:border-brand-purple text-brand-plum hover:text-brand-purple text-xs font-semibold uppercase tracking-widest transition-colors bg-white shadow-2xs"
                >
                  <span>Register Your Interest</span>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* Purposeful Consultation CTA Section */}
      <ConsultationCTA
        title="Ready to Orchestrate Your Event?"
        subtitle="Schedule a consultation with Adeola and the Events 21 royal planning team. Let us tailor our services to your vision, guest count, and milestone celebration."
      />
    </div>
  );
}
