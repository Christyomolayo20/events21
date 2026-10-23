import React from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Heart, Sparkles, Clock, Crown, Users } from "lucide-react";

export const metadata = {
  title: "About Us | Event 21 • Lagos Event Planning Studio",
  description:
    "Meet the passionate team behind Event 21 and Gifts by Adeola. Discover our royal approach to luxury Nigerian wedding planning, cultural celebrations, and flawless execution.",
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

  const teamShowcase = [
    {
      image: "/images/about-team-portrait.jpg",
      badge: "The Full Team",
      title: "The Event 21 Production Family",
      subtitle: "Passionate stylists & day-of coordination specialists",
      description:
        "Our unified squad coordinates backstage logistics, vendor handoffs, and guest protocol with effortless grace.",
    },
    {
      image: "/images/about-founder-welcome.jpg",
      badge: "Creative Direction",
      title: "Vibrant Energy & Leadership",
      subtitle: "Led by Adeola • Founder & Lead Stylist",
      description:
        "Bringing contagious joy, theatrical precision, and high-fashion aesthetics to every celebration.",
    },
    {
      image: "/images/about-team-seated.jpg",
      badge: "Coordination Squad",
      title: "Unified Precision & Teamwork",
      subtitle: "On-the-ground event day management",
      description:
        "Every team member knows their exact cue, ensuring zero client stress from morning preparations to the last dance.",
    },
    {
      image: "/images/about-founder-boys.jpg",
      badge: "Family & Legacy",
      title: "Built on Heart, Culture & Family",
      subtitle: "Next-generation royal leadership",
      description:
        "Event planning rooted in authentic love, familial devotion, and creating memories that endure for generations.",
    },
  ];

  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-soft-lavender border border-brand-purple/20 text-brand-purple text-xs font-sans tracking-widest uppercase font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Story & Team</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-brand-plum leading-tight mb-6">
            The Passion, The People, <br />
            <span className="italic font-normal font-serif text-brand-purple">
              The Royal Experience.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-brand-plum/75 font-sans leading-relaxed">
            At Event 21, we believe the best celebrations are not merely attended; they are felt.
            Rooted in Lagos, our dedicated planners, stylists, and coordination crew bring unwavering
            warmth, cultural reverence, and minute-by-minute execution to your most cherished milestones.
          </p>
        </div>

        {/* Feature Hero Showcase: Royal Crest Emblem + Main Team Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-stretch">
          {/* Brand Crest Seal (1st Image) */}
          <div className="lg:col-span-4 rounded-3xl p-8 bg-gradient-to-br from-brand-warm-white via-white to-brand-soft-lavender/40 border border-brand-purple/20 shadow-xs flex flex-col justify-between items-center text-center">
            <div className="w-full flex flex-col items-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-subtle border border-brand-warm-border bg-white mb-6 p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/royalty-events-crest.jpg"
                  alt="Royalty One Twenty One Events Brand Crest"
                  className="w-full h-full object-contain object-center"
                />
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-[11px] font-sans font-semibold uppercase tracking-widest mb-2">
                <Crown className="w-3.5 h-3.5 text-brand-gold" />
                <span>Royal Brand Emblem</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-brand-plum">
                Royalty One 21
              </h3>
              <p className="font-serif italic text-sm text-brand-purple mt-1">
                Curating Regal Experiences. Orchestrating Royalty.
              </p>
            </div>

            <div className="pt-6 border-t border-brand-warm-border/60 w-full">
              <p className="text-xs text-brand-plum/70 font-sans leading-relaxed">
                A mark of royal poise, cultural grandeur, and timeless memories created in Lagos, Nigeria.
              </p>
            </div>
          </div>

          {/* Main Team Portrait (5th Image) */}
          <div className="lg:col-span-8 rounded-3xl overflow-hidden shadow-elevated border border-brand-warm-border bg-brand-plum relative min-h-[360px] sm:min-h-[440px] flex flex-col justify-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/about-team-portrait.jpg"
              alt="The Event 21 Team and Crew"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-plum-dark/90 via-brand-plum-dark/25 to-transparent" />
            <div className="relative z-10 p-6 sm:p-10 text-white">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-sans font-semibold uppercase tracking-wider mb-2">
                <Users className="w-3.5 h-3.5 text-brand-gold" />
                <span>The Event 21 Family</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold">
                United in Passion, Driven by Excellence
              </h2>
              <p className="text-xs sm:text-sm text-white/85 font-sans max-w-xl mt-1 leading-relaxed">
                From pre-event setup to the final guest farewell, our lead coordinators and stylists ensure every celebration flows with seamless elegance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Showcase Gallery Grid (2nd, 3rd, 4th, 5th Images) */}
      <section className="py-16 md:py-24 bg-brand-warm-white/60 border-y border-brand-warm-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-brand-purple font-semibold font-sans block mb-2">
              Our People & Spirit
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-plum">
              Meet the Faces Behind Event 21
            </h2>
            <p className="text-sm text-brand-plum/70 font-sans mt-3">
              Real people, genuine smiles, and a relentless commitment to orchestrating perfection for your special day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {teamShowcase.map((card, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-3xl overflow-hidden border border-brand-warm-border hover:border-brand-purple/40 shadow-xs hover:shadow-elevated transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Container with Exact 400px Fixed Height */}
                <div className="relative w-full h-[320px] sm:h-[380px] overflow-hidden bg-brand-plum shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ objectPosition: "center center" }}
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
      <section className="py-16 md:py-24 bg-white border-b border-brand-warm-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center mb-14">
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
        </div>
      </section>

      {/* The 4-Step Process */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-brand-purple font-semibold font-sans block mb-2">
            The Workflow
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-plum">
            Our 4-Stage Planning Journey
          </h2>
          <p className="text-sm text-brand-plum/70 font-sans mt-3">
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
        <div className="mt-16 bg-brand-plum text-white rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <h3 className="font-serif text-3xl font-bold">Ready to Start Your Planning Journey?</h3>
            <p className="text-white/80 text-sm font-sans">
              Schedule an introductory consultation with our lead planner to discuss dates, venues,
              and design concepts.
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
