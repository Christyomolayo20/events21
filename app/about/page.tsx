import React from "react";
import Link from "next/link";
import { ArrowUpRight, Heart, Sparkles, Clock, Crown, Users, Award, Check } from "lucide-react";

export const metadata = {
  title: "About Us | Event 21 • Lagos Event Planning Studio & Gifts by Adeola",
  description:
    "Meet Adeola Oyeyode (CEO & Creative Director) and the passionate team behind Event 21 and Gifts by Adeola. Discover our royal approach to luxury Nigerian wedding planning, cultural celebrations, and flawless execution.",
};

export default function AboutPage() {
  const steps = [
    {
      number: "01",
      title: "Discovery & Vision Consultation",
      description:
        "We begin by listening deeply to your story, aesthetic preferences, guest expectations, and budget parameters to formulate a bespoke event blueprint.",
    },
    {
      number: "02",
      title: "Concept Curation & Spatial Design",
      description:
        "We develop custom mood boards, floral architectures, lighting schemes, and spatial floor plans that reflect your unique narrative.",
    },
    {
      number: "03",
      title: "Vendor Vetting & Contract Management",
      description:
        "Leveraging our vetted Lagos and nationwide network of caterers, decorators, cinematographers, and MCs to negotiate contracts and ensure reliability.",
    },
    {
      number: "04",
      title: "Minute-by-Minute Execution",
      description:
        "On the big day, our lead planners manage every vendor cue, bridal party transition, and timeline beat so you remain entirely in the moment.",
    },
  ];

  const teamCards = [
    {
      image: "/images/about-team-portrait.jpg",
      badge: "The Production Crew",
      title: "The Event 21 Family",
      subtitle: "Passionate Stylists & Logistical Coordinators",
      description:
        "Our unified squad coordinates backstage logistics, vendor handoffs, stage lighting cues, and VIP guest greeting with effortless grace.",
    },
    {
      image: "/images/about-founder-welcome.jpg",
      badge: "Event Day Energy",
      title: "Vibrant Presence & Joy",
      subtitle: "Warmth & Reassuring Guidance",
      description:
        "Bringing contagious celebration joy, calm problem-solving, and high-fashion aesthetics to every client reception.",
    },
    {
      image: "/images/about-team-seated.jpg",
      badge: "Coordination Squad",
      title: "Unified Teamwork & Precision",
      subtitle: "On-the-ground execution unit",
      description:
        "Every lead coordinator has an assigned cue and radio protocol, ensuring zero client stress from morning prep to the final dance.",
    },
    {
      image: "/images/about-founder-boys.jpg",
      badge: "Heart & Legacy",
      title: "Built on Family Devotion",
      subtitle: "Values passed through generations",
      description:
        "A boutique studio built upon deep family values, authentic relationships, and creating celebrations that form heirloom memories.",
    },
  ];

  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-soft-lavender border border-brand-purple/20 text-brand-purple text-xs font-sans tracking-widest uppercase font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Story &amp; Leadership</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-brand-plum leading-tight mb-4">
            The Passion, The People,{" "}
            <span className="italic font-normal font-serif text-brand-purple">
              The Royal Experience.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-brand-plum/75 font-sans leading-relaxed">
            At Event 21, we believe the best celebrations are not merely attended; they are felt.
            Based in Ojodu Berger, Lagos, our dedicated planners, stylists, and coordination crew bring
            unwavering warmth, cultural reverence, and minute-by-minute execution to your most cherished
            milestones.
          </p>
        </div>
      </section>

      {/* COMPREHENSIVE ABOUT EVENT 21 EDITORIAL SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 md:mb-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-brand-warm-border shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Team Portrait Container with Fixed Height & Top-Center Focus */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-elevated border border-brand-warm-border h-[340px] sm:h-[420px] w-full bg-brand-plum">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/about-team-portrait.jpg"
                  alt="The Event 21 Team and Crew in Lagos"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center center" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="font-serif italic text-lg text-brand-soft-lavender">
                    "All Your Event Needs"
                  </p>
                  <p className="text-xs font-sans uppercase tracking-widest text-brand-gold mt-1">
                    The Event 21 Team • Lagos, Nigeria
                  </p>
                </div>
              </div>
            </div>

            {/* Editorial Content */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
              <div className="inline-block text-xs uppercase tracking-widest text-brand-purple font-semibold font-sans">
                About Event 21
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-plum leading-[1.2]">
                Every Celebration{" "}
                <span className="italic font-normal font-serif text-brand-purple">
                  Has a Story.
                </span>
              </h2>

              <div className="space-y-3.5 text-sm sm:text-base text-brand-plum/80 font-sans leading-relaxed font-light">
                <p>
                  Based in Lagos, Nigeria, <strong>Event 21</strong> is a bespoke event planning and
                  styling boutique founded on a singular conviction: that extraordinary events are
                  born from thoughtful curation, authentic storytelling, and meticulous attention to
                  every detail.
                </p>
                <p>
                  Whether bringing to life a multi-day traditional Yoruba wedding steeped in regal
                  heritage, directing a contemporary ballroom white wedding with dramatic stagecraft,
                  or designing an intimate milestone dinner, we bridge the gap between creative vision
                  and effortless execution.
                </p>
                <p className="text-xs sm:text-sm text-brand-plum/70">
                  You should never feel like a coordinator at your own milestone. We handle the
                  budgets, timelines, vendor handoffs, and logistics so you can savor every emotion
                  with the people you love.
                </p>
              </div>

              {/* Core Values / Pillars */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2.5 text-xs font-sans text-brand-plum font-medium">
                  <div className="w-5 h-5 rounded-full bg-brand-soft-lavender text-brand-purple flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Curated &amp; Vetted Vendor Network</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-sans text-brand-plum font-medium">
                  <div className="w-5 h-5 rounded-full bg-brand-soft-lavender text-brand-purple flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Minute-by-Minute Day-of Timelines</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-sans text-brand-plum font-medium">
                  <div className="w-5 h-5 rounded-full bg-brand-soft-lavender text-brand-purple flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Cultural Heritage &amp; Protocol Precision</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-sans text-brand-plum font-medium">
                  <div className="w-5 h-5 rounded-full bg-brand-blush-pink text-brand-pink flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Gifts by Adeola Sub-brand Integration</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
                >
                  <span>Book a Consultation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CEO & Creative Director Spotlight (Using 2nd Image) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 md:mb-20">
        <div className="bg-gradient-to-br from-brand-warm-white via-white to-brand-soft-lavender/30 rounded-3xl p-6 sm:p-10 lg:p-12 border border-brand-purple/20 shadow-subtle">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* CEO Portrait Container with Fixed Dimensions & Perfect Centering */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden shadow-elevated border-4 border-white ring-2 ring-brand-purple/20 bg-brand-plum shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/adeola-oyeyode-ceo.jpg"
                  alt="Adeola Oyeyode - CEO and Creative Director of Event 21 & Gifts by Adeola"
                  className="w-full h-full object-cover object-center"
                  style={{ objectPosition: "center center" }}
                />
              </div>

              <div className="mt-4">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-[11px] font-sans font-semibold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Executive Leadership</span>
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-plum mt-2">
                  Adeola Oyeyode
                </h2>
                <p className="text-xs uppercase tracking-widest text-brand-gold font-sans font-semibold mt-0.5">
                  CEO &amp; Creative Director
                </p>
                <p className="text-xs text-brand-purple font-sans font-medium mt-0.5">
                  Event 21 • Gifts by Adeola
                </p>
              </div>
            </div>

            {/* CEO Story / Bio & Creative Philosophy */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="inline-block text-xs uppercase tracking-widest text-brand-purple font-semibold font-sans">
                A Note from Adeola
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-plum leading-snug">
                "Curating Royalty with Soul, Heart, and Precision."
              </h3>

              <div className="space-y-3 text-sm sm:text-base text-brand-plum/80 font-sans leading-relaxed">
                <p>
                  Welcome to Event 21. When I founded this studio, my goal was to reshape the event
                  experience in Nigeria. I wanted every couple, executive, and celebrant to experience
                  the true luxury of being a cherished guest at their own celebration.
                </p>
                <p>
                  As Creative Director, I oversee every visual and logistical dimension—from the richness
                  of authentic Yoruba aso-oke colors and royal wedding staging to the intimate details of
                  bespoke <strong>Wrapping of Eru Iyawo</strong> and curated gifting on a realistic budget.
                </p>
                <p className="text-xs sm:text-sm text-brand-plum/70 italic bg-white/70 p-4 rounded-xl border border-brand-warm-border">
                  "Whether we are coordinating a 1,200-guest ballroom reception or delivering a handcrafted
                  milestone hamper, our standard remains uncompromising: regal elegance, punctual execution,
                  and authentic Nigerian hospitality."
                </p>
              </div>

              {/* Direct Touchpoint: Only Book a Consultation as requested */}
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md"
                >
                  <span>Book a Consultation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Heritage & Brand Emblem Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 md:mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Brand Crest Card */}
          <div className="rounded-3xl p-8 bg-white border border-brand-warm-border shadow-xs flex flex-col justify-between items-center text-center">
            <div className="w-full flex flex-col items-center">
              <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shadow-subtle border border-brand-warm-border bg-white mb-5 p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/royalty-events-crest.jpg"
                  alt="Royalty One Twenty One Events Brand Crest"
                  className="w-full h-full object-contain object-center"
                />
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-[10px] font-sans font-semibold uppercase tracking-widest mb-2">
                <Crown className="w-3.5 h-3.5 text-brand-gold" />
                <span>The Royal Seal</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-brand-plum">
                Royalty One 21
              </h3>
              <p className="font-serif italic text-sm text-brand-purple mt-1">
                Curating Regal Experiences. Orchestrating Royalty.
              </p>
            </div>

            <div className="pt-5 border-t border-brand-warm-border/60 w-full mt-4">
              <p className="text-xs text-brand-plum/70 font-sans leading-relaxed">
                Registered in Lagos, Nigeria. A hallmark of distinction, regal event styling, and seamless coordination.
              </p>
            </div>
          </div>

          {/* Couple Heritage Showcase with Top-Centered Framing */}
          <div className="rounded-3xl overflow-hidden shadow-xs border border-brand-warm-border bg-white flex flex-col justify-between">
            <div className="relative w-full h-[320px] sm:h-[350px] overflow-hidden bg-brand-plum shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/the-kayodes-traditional-couple.jpg"
                alt="The Kayodes - Authentic Yoruba Wedding Couple Styled by Event 21"
                className="w-full h-full object-cover"
                style={{ objectPosition: "top center" }}
              />
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3.5 py-1.5 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider bg-white/95 backdrop-blur-md text-brand-plum shadow-xs">
                  Cultural Heritage
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-7">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-gold font-sans block mb-1">
                Yoruba Wedding Styling
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-plum mb-2">
                Preserving Tradition, Elevating Majesty
              </h3>
              <p className="text-xs sm:text-sm text-brand-plum/70 font-sans leading-relaxed">
                We celebrate Nigeria’s rich cultural heritage with authentic aso-oke beadwork, traditional
                Alaga protocol coordination, and majestic aesthetic staging.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Showcase Gallery Grid with Top-Centered Framing */}
      <section className="py-12 md:py-16 bg-brand-warm-white/70 border-y border-brand-warm-border/60 mb-14 md:mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-10 md:mb-12">
            <span className="text-xs uppercase tracking-widest text-brand-purple font-semibold font-sans block mb-2">
              Our People &amp; Spirit
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-plum">
              Meet the Faces Behind Event 21
            </h2>
            <p className="text-sm text-brand-plum/70 font-sans mt-2">
              Real people, genuine smiles, and a relentless commitment to orchestrating perfection for your special day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {teamCards.map((card, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-3xl overflow-hidden border border-brand-warm-border hover:border-brand-purple/40 shadow-xs hover:shadow-elevated transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Container with Fixed Height & Top-Centered Focus */}
                <div className="relative w-full h-[320px] sm:h-[360px] overflow-hidden bg-brand-plum shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ objectPosition: "top center" }}
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3.5 py-1.5 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider bg-white/95 backdrop-blur-md text-brand-plum shadow-xs">
                      {card.badge}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 sm:p-7 flex flex-col justify-between grow">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-brand-gold font-sans block mb-1">
                      {card.subtitle}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-plum mb-2 group-hover:text-brand-purple transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-plum/70 font-sans leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Values & Principles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 md:mb-20">
        <div className="max-w-xl mx-auto text-center mb-10">
          <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold font-sans block mb-2">
            Our Principles
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-plum">
            How We Approach Every Event
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-brand-warm-white border border-brand-warm-border space-y-4">
            <div className="w-12 h-12 rounded-xl bg-brand-soft-lavender text-brand-purple flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-brand-plum">Cultural Reverence</h3>
            <p className="text-sm text-brand-plum/70 font-sans leading-relaxed">
              Whether honoring traditional Yoruba engagement rites, modern civil ceremonies, or
              intercultural fusions, we treat your heritage and family protocols with the utmost
              respect.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-brand-warm-white border border-brand-warm-border space-y-4">
            <div className="w-12 h-12 rounded-xl bg-brand-soft-lavender text-brand-purple flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-brand-plum">Punctual Logistics</h3>
            <p className="text-sm text-brand-plum/70 font-sans leading-relaxed">
              Nigerian events often carry an unfair stereotype for timing. We break the mold with
              rigorous vendor call sheets, structured soundchecks, and backstage precision.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-brand-warm-white border border-brand-warm-border space-y-4">
            <div className="w-12 h-12 rounded-xl bg-brand-blush-pink text-brand-pink flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-brand-plum">Bespoke Hospitality</h3>
            <p className="text-sm text-brand-plum/70 font-sans leading-relaxed">
              From guest arrival greeting to VIP hostessing and custom souvenir curation via
              <strong> Gifts by Adeola</strong>, every attendee experiences warmth and luxury.
            </p>
          </div>
        </div>
      </section>

      {/* The 4-Step Process & CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-brand-purple font-semibold font-sans block mb-2">
            The Workflow
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-plum">
            Our 4-Stage Planning Journey
          </h2>
          <p className="text-sm text-brand-plum/70 font-sans mt-2">
            A structured, stress-free path from your initial idea to celebratory perfection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div
              key={s.number}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-brand-warm-border shadow-xs hover:border-brand-purple/40 transition-colors"
            >
              <div className="text-3xl font-serif font-bold text-brand-purple/30 mb-3">
                {s.number}
              </div>
              <h3 className="font-serif text-lg font-bold text-brand-plum mb-2">{s.title}</h3>
              <p className="text-xs sm:text-sm text-brand-plum/70 font-sans leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div className="mt-12 bg-brand-plum text-white rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <h3 className="font-serif text-3xl font-bold">Ready to Start Your Planning Journey?</h3>
            <p className="text-white/80 text-sm font-sans">
              Schedule an introductory consultation with our lead planners to discuss dates, venues, and
              design concepts.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-md"
              >
                <span>Book a Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
