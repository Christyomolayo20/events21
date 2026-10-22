import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Heart, Award, Sparkles, Clock, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "About Us | Event 21 • Lagos Event Planning Studio",
  description:
    "Learn about Event 21, our approach to luxury Nigerian wedding planning, cultural celebrations, and effortless execution in Lagos and beyond.",
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

  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-soft-lavender border border-brand-purple/20 text-brand-purple text-xs font-sans tracking-widest uppercase font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Philosophy</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-brand-plum leading-tight mb-6">
            Crafting Celebrations That <br />
            <span className="italic font-normal font-serif text-brand-purple">
              Resonate for a Lifetime.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-brand-plum/75 font-sans leading-relaxed">
            At Event 21, we believe the best celebrations are not merely attended; they are felt.
            Rooted in Lagos, we blend authentic Nigerian cultural warmth with world-class production
            refinement.
          </p>
        </div>

        {/* Feature Imagery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto">
          <div className="md:col-span-7 relative aspect-[16/11] rounded-2xl overflow-hidden shadow-elevated border border-brand-warm-border bg-brand-plum">
            <Image
              src="/images/the-kayodes-traditional.jpg"
              alt="The Kayodes Traditional Yoruba Wedding"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 60vw"
              priority
            />
          </div>
          <div className="md:col-span-5 relative aspect-[4/5] rounded-2xl overflow-hidden shadow-elevated border border-brand-warm-border bg-brand-plum">
            <Image
              src="/images/the-kayodes-white-wedding.jpg"
              alt="The Kayodes White Wedding Coordination"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </div>
      </section>

      {/* Brand Values & Principles */}
      <section className="py-16 md:py-24 bg-white border-y border-brand-warm-border/60">
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
                <strong>Gifts by Adeola</strong>, every attendee experiences warmth and luxury.
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
