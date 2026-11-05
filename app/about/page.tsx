"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Palette,
  Building2,
  PartyPopper,
  Layers,
  Award,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Eye,
  Heart,
  ArrowUpRight,
  Clock,
  Compass,
} from "lucide-react";
import { getFounderInfo } from "@/lib/store";
import { FounderInfo } from "@/lib/types";
import ConsultationCTA from "@/components/ConsultationCTA";

export default function AboutPage() {
  const [founder, setFounder] = useState<FounderInfo>(getFounderInfo());

  useEffect(() => {
    const handleUpdate = () => {
      setFounder(getFounderInfo());
    };

    window.addEventListener("events21_founder_updated", handleUpdate);
    return () => {
      window.removeEventListener("events21_founder_updated", handleUpdate);
    };
  }, []);

  const whatWeDo = [
    {
      title: "Event Planning & Management",
      icon: Calendar,
      description: "Comprehensive end-to-end planning, timeline coordination, and budget management.",
    },
    {
      title: "Event Design & Decoration",
      icon: Palette,
      description: "Bespoke spatial design, floral architecture, custom stagecraft, and ambient styling.",
    },
    {
      title: "Corporate Event Production",
      icon: Building2,
      description: "High-impact conferences, corporate galas, and executive banquets executed with protocol.",
    },
    {
      title: "Social & Milestone Celebrations",
      icon: PartyPopper,
      description: "Luxury weddings, cultural engagements, and landmark celebrations tailored to your story.",
    },
    {
      title: "Vendor and Production Management",
      icon: Layers,
      description: "Vetted vendor sourcing, technical stagecraft, and flawless backstage coordination.",
    },
  ];

  const coreValues = [
    { name: "Excellence", icon: Award, text: "Uncompromising standards in every detail." },
    { name: "Creativity & Innovation", icon: Sparkles, text: "Fresh concepts and distinct aesthetic styling." },
    { name: "Professionalism", icon: ShieldCheck, text: "Punctuality, clear timelines, and calm execution." },
    { name: "Integrity", icon: HeartHandshake, text: "Transparent budgeting and trusted partnerships." },
    { name: "Attention to Detail", icon: Eye, text: "Precision across both visible décor and backstage flow." },
    { name: "Client Satisfaction", icon: Heart, text: "A stress-free experience so you can enjoy your celebration." },
  ];

  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24">
      {/* 1. HERO HEADER - Simple, Editorial, Uncluttered */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-20 text-center">
        <span className="text-xs uppercase tracking-[0.2em] text-brand-purple font-medium block mb-3">
          About EVENTS21
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brand-plum leading-tight mb-5">
          Creating Memorable Experiences. Delivering Excellence.
        </h1>
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-brand-plum/75 font-sans leading-relaxed">
          At EVENTS21, we believe that every celebration is more than just an event; it is an opportunity
          to create meaningful experiences, lasting impressions and unforgettable memories.
        </p>
      </section>

      {/* 2. THE STORY & PHILOSOPHY - Clean Split Layout */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Photo */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-brand-warm-border h-[380px] sm:h-[460px] w-full bg-brand-plum">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/about-team-portrait.jpg"
                alt="EVENTS21 Celebration Styling"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center center" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-serif italic text-lg sm:text-xl text-white">
                  &ldquo;EVENTS21 – All Your Event Needs.&rdquo;
                </p>
                <p className="text-xs uppercase tracking-widest text-brand-gold mt-1">
                  Established in 2021 • Serving Nationwide
                </p>
              </div>
            </div>
          </div>

          {/* Narrative */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <span className="text-xs uppercase tracking-[0.2em] text-brand-purple font-medium block">
              Who We Are
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-brand-plum leading-snug">
              Transforming Ideas into Beautiful Realities
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-brand-plum/80 font-sans leading-relaxed font-light">
              <p>
                Established in 2021, <strong>EVENTS21</strong> is a professional event planning, design and
                production company with over four years of industry experience, specialising in weddings,
                corporate events and social celebrations.
              </p>
              <p>
                Over the years, we have built our reputation around creativity, integrity, professionalism,
                attention to detail and a commitment to delivering exceptional event experiences. We combine
                innovative concepts, thoughtful planning, aesthetic design and seamless coordination to transform
                our clients&apos; ideas into beautifully executed realities.
              </p>
              <p>
                At EVENTS21, we understand that successful events require more than beautiful décor. They demand
                strategic planning, effective communication, careful budgeting, stakeholder management, strong vendor
                relationships and flawless execution.
              </p>
            </div>

            {/* Philosophy Note */}
            <div className="pt-2">
              <div className="p-5 rounded-2xl bg-brand-soft-lavender/40 border border-brand-purple/15">
                <span className="text-xs uppercase tracking-wider text-brand-purple font-semibold block mb-1">
                  Our Philosophy
                </span>
                <p className="font-serif italic text-lg text-brand-plum">
                  &ldquo;Our philosophy is simple: adding value through seamless event planning.&rdquo;
                </p>
                <p className="text-xs text-brand-plum/70 font-sans mt-1.5">
                  We are committed to creating experiences that reflect our clients&apos; personalities, objectives,
                  and aspirations while maintaining the highest standards of service delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT WE DO - Minimalist, Unnumbered Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-brand-purple font-medium block mb-2">
            Expertise
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-brand-plum">
            What We Do
          </h2>
          <p className="text-sm text-brand-plum/70 font-sans mt-2">
            Tailored solutions from initial ideation to day-of coordination.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whatWeDo.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`p-6 rounded-2xl bg-white border border-brand-warm-border hover:border-brand-purple/40 transition-colors flex flex-col justify-between ${
                  idx === 4 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-soft-lavender text-brand-purple flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-brand-plum mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-plum/75 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-brand-warm-border/40">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-purple hover:underline"
                  >
                    <span>View Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. EXPERIENCE & CORE VALUES - Clean Combined Section (NO NUMBERING) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        <div className="rounded-3xl bg-brand-plum text-white p-8 sm:p-12 md:p-14">
          {/* Experience at a Glance */}
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.2em] text-brand-gold font-medium block mb-2">
              Track Record
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white">
              Experience at a Glance
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-14">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
              <div className="font-serif text-4xl sm:text-5xl font-bold text-brand-gold mb-1">
                5+
              </div>
              <div className="font-serif text-lg text-white font-medium mb-1">
                Years of Experience
              </div>
              <div className="text-xs text-brand-soft-lavender/70 font-sans">
                In the event industry since 2021
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
              <div className="font-serif text-4xl sm:text-5xl font-bold text-brand-gold mb-1">
                360°
              </div>
              <div className="font-serif text-lg text-white font-medium mb-1">
                Event Solutions
              </div>
              <div className="text-xs text-brand-soft-lavender/70 font-sans">
                From concept to execution
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-10">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs uppercase tracking-[0.2em] text-brand-gold font-medium block mb-2">
                Guiding Principles
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-white">
                Our Core Values
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {coreValues.map((val) => {
                const Icon = val.icon;
                return (
                  <div
                    key={val.name}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3.5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/10 text-brand-gold shrink-0 flex items-center justify-center mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-semibold text-white">
                        {val.name}
                      </h4>
                      <p className="text-xs text-brand-soft-lavender/75 font-sans mt-0.5">
                        {val.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. MEET THE FOUNDER - Clean & Simple */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-brand-warm-border">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Photo */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm rounded-2xl overflow-hidden border border-brand-warm-border aspect-[3/4] bg-brand-plum">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={founder.image || "/images/adeola-oyeyode-founder.jpg"}
                  alt="Adeola Oyeyode - Founder & Creative Director EVENTS21"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 20%" }}
                />
              </div>
            </div>

            {/* Narrative */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <span className="text-xs uppercase tracking-[0.2em] text-brand-purple font-medium block">
                Meet the Founder
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-brand-plum font-normal">
                Adeola Oyeyode
              </h2>
              <p className="text-xs uppercase tracking-widest text-brand-gold font-semibold -mt-2">
                Founder &amp; Creative Director EVENTS21
              </p>

              <div className="space-y-3 text-sm text-brand-plum/80 font-sans leading-relaxed font-light pt-2">
                <p>
                  Adeola Oyeyode is an experienced event planning professional, creative director and
                  entrepreneur with over 10 years of experience in event planning, programme coordination,
                  event management and production.
                </p>
                <p>
                  Her journey began at Covenant University, where she worked as a Programme Coordinator at
                  the University&apos;s Entrepreneurial Centre for over five years, directing workshops,
                  conferences, institutional programmes and corporate engagements before establishing EVENTS21
                  in 2021.
                </p>
                <p>
                  With an academic background in Agricultural Economics and a Master&apos;s degree in Business
                  Administration (MBA), Adeola combines business strategy with creative thinking, operational
                  efficiency, and a strong understanding of client expectations.
                </p>
              </div>

              {/* Founder Philosophy Quote */}
              <div className="p-4 rounded-xl bg-brand-warm-gray border border-brand-warm-border">
                <span className="text-[11px] uppercase tracking-wider text-brand-purple font-medium block mb-0.5">
                  Her Guiding Philosophy
                </span>
                <p className="font-serif italic text-base sm:text-lg text-brand-plum">
                  &ldquo;Adding Value Through Seamless Event Planning.&rdquo;
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  <span>Book a Consultation</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONSULTATION CTA */}
      <ConsultationCTA
        title="Let's Plan Your Next Event"
        subtitle="Schedule a consultation with Adeola and the EVENTS21 team. From concept to execution, we bring your vision to life."
      />
    </div>
  );
}