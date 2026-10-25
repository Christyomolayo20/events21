"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Award, HeartHandshake, Eye, CheckCircle2, ArrowUpRight } from "lucide-react";
import { getFounderInfo, getTeamMembers } from "@/lib/store";
import { FounderInfo, TeamMember } from "@/lib/types";
import ConsultationCTA from "@/components/ConsultationCTA";

export default function AboutPage() {
  const [founder, setFounder] = useState<FounderInfo>(getFounderInfo());
  const [team, setTeam] = useState<TeamMember[]>(getTeamMembers());

  useEffect(() => {
    const handleUpdate = () => {
      setFounder(getFounderInfo());
      setTeam(getTeamMembers());
    };

    window.addEventListener("events21_founder_updated", handleUpdate);
    window.addEventListener("events21_team_updated", handleUpdate);

    return () => {
      window.removeEventListener("events21_founder_updated", handleUpdate);
      window.removeEventListener("events21_team_updated", handleUpdate);
    };
  }, []);

  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-20">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 md:mb-20 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-soft-lavender border border-brand-purple/20 text-brand-purple text-xs font-sans tracking-widest uppercase font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Story, Values &amp; People</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-brand-plum leading-tight mb-4">
            Curating Royalty with{" "}
            <span className="italic font-normal font-serif text-brand-purple">
              Soul, Heart &amp; Precision.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-brand-plum/75 font-sans leading-relaxed">
            Events 21 (Royalty Twenty One Events) is built on the belief that extraordinary celebrations
            come from authentic storytelling, artistic curation, and seamless logistical execution.
          </p>
        </div>
      </section>

      {/* A. ABOUT EVENTS 21 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-brand-warm-border shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-elevated border border-brand-warm-border h-[340px] sm:h-[400px] w-full bg-brand-plum">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/about-team-portrait.jpg"
                  alt="Events 21 Event Planning Team"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center center" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="font-serif italic text-lg text-brand-soft-lavender">
                    "Thoughtfully Planned. Beautifully Styled."
                  </p>
                  <p className="text-xs font-sans uppercase tracking-widest text-brand-gold mt-1">
                    Events 21 • Serving Nationwide &amp; Available to Travel
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs uppercase tracking-widest text-brand-purple font-semibold font-sans block">
                About Events 21
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-plum leading-tight">
                Our Event Planning Philosophy
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-brand-plum/80 font-sans leading-relaxed font-light">
                <p>
                  Founded with a vision to deliver regal celebration experiences across Nigeria and beyond, Events 21
                  is a full-service event planning, luxury design, rental, and educational brand. We believe every
                  host deserves to be an unburdened guest at their own celebration.
                </p>
                <p>
                  From orchestrating grand white weddings, corporate galas, and milestone jubilees to styling authentic
                  cultural engagements with bespoke Eru Iyawo packaging, our craft touches every layer of celebration.
                  We pair end-to-end event planning with visionary floral design, an exclusive luxury rental collection, and
                  practical industry training through the Royal Planners Academy. Across every celebration and masterclass,
                  our work is defined by poise, cultural reverence, and meticulous attention to every detail.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* B. OUR VISION & C. OUR COMMITMENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* B. Our Vision */}
          <div className="bg-gradient-to-br from-brand-warm-white via-white to-brand-soft-lavender/30 rounded-3xl p-8 sm:p-10 border border-brand-warm-border shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-soft-lavender text-brand-purple flex items-center justify-center mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase tracking-widest text-brand-purple font-semibold font-sans block mb-2">
                Our Vision
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-plum mb-4">
                The Royal Standard of Celebration
              </h3>
              <p className="text-sm sm:text-base text-brand-plum/80 font-sans leading-relaxed">
                To be the benchmark event planning and styling brand recognized for elevating African celebrations
                into timeless works of art—delivering an unmatched standard of beauty, cultural respect, and
                peace of mind for families and hosts nationwide, and available to travel.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-brand-warm-border/60">
              <span className="text-xs italic text-brand-purple font-serif">
                "Where meaningful moments turn into lasting memories."
              </span>
            </div>
          </div>

          {/* C. Our Commitment */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-warm-border shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-warm-gray text-brand-gold flex items-center justify-center mb-6">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold font-sans block mb-2">
                Our Commitment
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-plum mb-4">
                Dedication to Detail &amp; Host Satisfaction
              </h3>
              <p className="text-sm sm:text-base text-brand-plum/80 font-sans leading-relaxed mb-4">
                We are steadfast in our commitment to transparent communication, minute-by-minute day-of timelines,
                vetted vendor networks, and respectful hospitality.
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-brand-plum/80 font-sans">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0" />
                  <span>Uncompromising professionalism &amp; punctuality</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0" />
                  <span>Creativity harmonized with realistic budget control</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0" />
                  <span>Backstage calm and zero-stress coordination</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* D. MEET THE FOUNDER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        <div className="bg-gradient-to-br from-white via-brand-warm-white to-brand-soft-lavender/30 rounded-3xl p-8 sm:p-12 border border-brand-purple/20 shadow-subtle">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Founder Image (1st uploaded image) */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative w-60 h-72 sm:w-68 sm:h-84 rounded-3xl overflow-hidden shadow-elevated border-4 border-white ring-2 ring-brand-purple/20 bg-brand-plum shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={founder.image || "/images/founder-events21.jpg"}
                  alt={`${founder.name} - ${founder.title}`}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "top center" }}
                />
              </div>

              <div className="mt-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-[10px] font-sans font-semibold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Founder Spotlight</span>
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-plum mt-2">
                  {founder.name}
                </h3>
                <p className="text-xs uppercase tracking-widest text-brand-gold font-sans font-semibold mt-0.5">
                  {founder.title}
                </p>
                <p className="text-xs text-brand-purple font-sans font-medium mt-0.5">
                  Events 21 • Gifts by Adeola
                </p>
              </div>
            </div>

            {/* Founder Story & Vision */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-block text-xs uppercase tracking-widest text-brand-purple font-semibold font-sans">
                A Message from the Founder
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-plum leading-snug">
                "Curating Celebrations with Authentic Nigerian Warmth and High-Fashion Poise."
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-brand-plum/80 font-sans leading-relaxed">
                <p>{founder.bio}</p>
                <div className="p-5 rounded-2xl bg-white border border-brand-warm-border shadow-2xs">
                  <span className="text-xs font-semibold text-brand-purple uppercase tracking-wider block mb-1">
                    The Founder&apos;s Philosophy
                  </span>
                  <p className="text-xs sm:text-sm text-brand-plum/80 italic font-serif">
                    &ldquo;{founder.vision}&rdquo;
                  </p>
                </div>
              </div>

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

      {/* E. MEET THE TEAM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <span className="text-xs uppercase tracking-widest text-brand-purple font-semibold font-sans block mb-2">
            The Production Squad
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-plum">
            Meet the Team Behind Events 21
          </h2>
          <p className="text-sm text-brand-plum/70 font-sans mt-2">
            Dedicated stylists, coordinators, and logistics leads executing every milestone with care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {team.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-3xl overflow-hidden border border-brand-warm-border shadow-xs flex flex-col justify-between group hover:border-brand-purple/40 transition-all"
            >
              <div className="relative w-full h-[320px] sm:h-[360px] overflow-hidden bg-brand-plum">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ objectPosition: "center center" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <span className="text-xs uppercase tracking-wider text-brand-gold font-semibold font-sans block">
                    {member.role}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-7">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-plum mb-2">
                  {member.name}
                </h3>
                {member.bio && (
                  <p className="text-xs sm:text-sm text-brand-plum/75 font-sans leading-relaxed">
                    {member.bio}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* F. CONSULTATION CTA */}
      <ConsultationCTA
        title="Let's Plan Your Royal Celebration"
        subtitle="Schedule a 1-on-1 consultation with Adeola and the Events 21 team. Let's discuss your date, styling concepts, and vision."
      />
    </div>
  );
}
