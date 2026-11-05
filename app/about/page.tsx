"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Award,
  HeartHandshake,
  Eye,
  CheckCircle2,
  ArrowUpRight,
  Clock,
  Compass,
  ShieldCheck,
  Calendar,
  Layers,
  Building2,
  PartyPopper,
  Palette,
  Heart,
  Quote,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import { getFounderInfo, getTeamMembers } from "@/lib/store";
import { DEFAULT_FOUNDER_INFO } from "@/lib/data";
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

  const whatWeDoItems = [
    {
      title: "Event Planning & Management",
      icon: Calendar,
      description:
        "Comprehensive, end-to-end event planning and strategic management from initial concept development to budget control and flawless on-the-day execution.",
    },
    {
      title: "Event Design & Decoration",
      icon: Palette,
      description:
        "Bespoke aesthetic curation, floral architecture, custom stage styling, thematic lighting, and captivating spatial design that transforms venues into works of art.",
    },
    {
      title: "Corporate Event Production",
      icon: Building2,
      description:
        "High-impact corporate conferences, brand activations, institutional programmes, and executive dinners executed with impeccable dignity and protocol.",
    },
    {
      title: "Social & Milestone Celebrations",
      icon: PartyPopper,
      description:
        "Regal white weddings, authentic traditional engagements, landmark birthdays, and intimate anniversary celebrations designed to reflect personal stories.",
    },
    {
      title: "Vendor and Production Management",
      icon: Layers,
      description:
        "Curated vendor selection, contract negotiation, technical stagecraft oversight, minute-by-minute timeline coordination, and seamless backstage logistics.",
    },
  ];

  const coreValues = [
    {
      name: "Excellence",
      icon: Award,
      description:
        "Uncompromising commitment to top-tier quality, precision, and the highest standards of service across every single detail.",
    },
    {
      name: "Creativity & Innovation",
      icon: Sparkles,
      description:
        "Infusing imaginative ideas, bespoke aesthetic concepts, and cutting-edge design into celebrations that leave lasting impressions.",
    },
    {
      name: "Professionalism",
      icon: ShieldCheck,
      description:
        "Punctual delivery, structured communication, and disciplined execution you can depend on throughout the planning journey.",
    },
    {
      name: "Integrity",
      icon: HeartHandshake,
      description:
        "Honest budgeting, transparent contracts, trusted vendor networks, and respectful partnerships built on mutual confidence.",
    },
    {
      name: "Attention to Detail",
      icon: Eye,
      description:
        "Meticulous care for both the visible décor and the intricate behind-the-scenes processes that make every experience seamless.",
    },
    {
      name: "Client Satisfaction",
      icon: Heart,
      description:
        "Putting host peace of mind first, ensuring our clients feel relaxed, celebrated, and deeply proud of their occasion.",
    },
  ];

  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-20">
      {/* 1. PAGE HEADER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 md:mb-20 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-soft-lavender border border-brand-purple/20 text-brand-purple text-xs font-sans tracking-widest uppercase font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
            <span>About EVENTS21</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-brand-plum leading-tight mb-4">
            Creating Memorable Experiences.{" "}
            <span className="block italic font-normal font-serif text-brand-purple mt-1 sm:mt-2">
              Delivering Excellence.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-brand-plum/80 font-sans leading-relaxed font-light">
            At EVENTS21, we believe that every celebration is more than just an event; it is an opportunity
            to create meaningful experiences, lasting impressions and unforgettable memories.
          </p>
        </div>
      </section>

      {/* 2. ABOUT EVENTS21 NARRATIVE & STORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-14 border border-brand-warm-border shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Visual Editorial Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-elevated border border-brand-warm-border h-[360px] sm:h-[440px] w-full bg-brand-plum group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/about-team-portrait.jpg"
                  alt="EVENTS21 Event Planning & Production Team"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ objectPosition: "center center" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="inline-block px-3 py-1 rounded-full bg-brand-gold/20 backdrop-blur-xs border border-brand-gold/40 text-brand-gold-light text-[10px] font-sans font-semibold uppercase tracking-widest mb-2">
                    Established in 2021
                  </div>
                  <p className="font-serif italic text-xl sm:text-2xl text-white font-medium">
                    &ldquo;EVENTS21 – All Your Event Needs.&rdquo;
                  </p>
                  <p className="text-xs font-sans uppercase tracking-widest text-brand-gold-light/90 mt-1">
                    Serving Nationwide &amp; Available to Travel
                  </p>
                </div>
              </div>
            </div>

            {/* Narrative Prose */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-purple font-semibold font-sans">
                <span className="w-2 h-2 rounded-full bg-brand-purple" />
                <span>Our Story &amp; Philosophy</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-plum leading-tight">
                Transforming Client Visions into Beautifully Executed Realities
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-brand-plum/85 font-sans leading-relaxed font-light">
                <p>
                  Established in 2021, <strong>EVENTS21</strong> is a professional event planning, design and
                  production company with over four years of industry experience, specialising in the planning,
                  coordination and execution of weddings, corporate events and social celebrations.
                </p>

                <p>
                  Over the years, we have built our reputation around creativity, integrity, professionalism,
                  attention to detail and a commitment to delivering exceptional event experiences. We combine
                  innovative concepts, thoughtful planning, aesthetic design and seamless coordination to transform
                  our clients&apos; ideas and visions into beautifully executed realities.
                </p>

                <p>
                  Our expertise spans comprehensive event planning, event decoration and styling, event coordination,
                  production management and vendor coordination. From intimate celebrations to large-scale corporate
                  gatherings and elaborate milestone occasions, we approach every project with intentionality,
                  precision and an understanding that every event deserves its own unique expression.
                </p>

                <p>
                  At EVENTS21, we understand that successful events require more than beautiful décor. They demand
                  strategic planning, effective communication, careful budgeting, stakeholder management, strong vendor
                  relationships and flawless execution. This is why we pay attention to both the visible details and the
                  behind-the-scenes processes that make every experience seamless.
                </p>
              </div>

              {/* Philosophy Card */}
              <div className="pt-3">
                <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-brand-soft-lavender/60 via-brand-warm-white to-brand-blush-pink/40 border border-brand-purple/20 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-purple mb-1.5">
                    <Sparkles className="w-4 h-4 text-brand-gold" />
                    <span>Our Guiding Philosophy</span>
                  </div>
                  <p className="font-serif italic text-lg sm:text-xl font-bold text-brand-plum mb-2">
                    &ldquo;Our philosophy is simple: adding value through seamless event planning.&rdquo;
                  </p>
                  <p className="text-xs sm:text-sm text-brand-plum/80 font-sans leading-relaxed">
                    We are committed to creating experiences that reflect our clients&apos; personalities,
                    objectives and aspirations while maintaining the highest standards of service delivery.
                  </p>
                  <div className="mt-3 pt-3 border-t border-brand-purple/15 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs font-sans text-brand-plum/75">
                      Whether you are planning a wedding, corporate gathering, social celebration or a significant milestone, EVENTS21 brings the creativity, expertise and dedication required to make your occasion truly remarkable.
                    </p>
                    <span className="font-sans font-bold text-xs uppercase tracking-widest text-brand-purple">
                      EVENTS21 – All Your Event Needs.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT WE DO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-sans tracking-widest uppercase font-semibold mb-3">
            <span>Specialised Services</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-plum">
            WHAT WE DO
          </h2>
          <p className="text-sm sm:text-base text-brand-plum/70 font-sans mt-3">
            Full-spectrum event solutions engineered with precision, creative distinction, and seamless logistical execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {whatWeDoItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`bg-white rounded-3xl p-6 sm:p-8 border border-brand-warm-border shadow-xs hover:border-brand-purple/40 hover:shadow-subtle transition-all flex flex-col justify-between group ${
                  index === 4 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-soft-lavender text-brand-purple flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-brand-purple group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-sans uppercase tracking-widest text-brand-gold font-semibold block mb-1">
                    Capability 0{index + 1}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-plum mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-plum/75 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-brand-warm-border/60">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-purple uppercase tracking-wider group-hover:text-brand-purple-hover font-sans"
                  >
                    <span>Learn More</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. OUR EXPERIENCE AT A GLANCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        <div className="relative rounded-3xl bg-gradient-to-br from-brand-plum via-[#2B1B36] to-brand-plum-dark text-white p-8 sm:p-12 md:p-16 overflow-hidden shadow-elevated">
          {/* Subtle Ambient Background Accents */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-pink/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
              <span className="inline-block text-xs uppercase tracking-widest text-brand-gold font-semibold font-sans mb-2">
                Proven Track Record
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                2. Our Experience at a Glance
              </h2>
              <p className="text-sm sm:text-base text-brand-soft-lavender/80 font-sans mt-2">
                Years of dedicated craftsmanship delivering exceptional weddings, corporate events, and celebrations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
              {/* Stat 1: 5+ */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/15 text-center flex flex-col justify-between hover:bg-white/15 transition-all">
                <div className="w-12 h-12 rounded-xl bg-brand-gold/20 text-brand-gold mx-auto flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-serif text-5xl sm:text-6xl font-bold text-brand-gold-light mb-2">
                    5+
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
                    Years of Experience
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-soft-lavender/80 font-sans">
                    In the event industry since 2021
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 text-[11px] font-sans uppercase tracking-widest text-brand-gold">
                  Verified Industry Track Record
                </div>
              </div>

              {/* Stat 2: 360° */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/15 text-center flex flex-col justify-between hover:bg-white/15 transition-all">
                <div className="w-12 h-12 rounded-xl bg-brand-purple-light/25 text-brand-purple-light mx-auto flex items-center justify-center mb-4">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-serif text-5xl sm:text-6xl font-bold text-brand-gold-light mb-2">
                    360°
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
                    Event Solutions
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-soft-lavender/80 font-sans">
                    From concept to execution
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 text-[11px] font-sans uppercase tracking-widest text-brand-gold">
                  End-to-End Orchestration
                </div>
              </div>

              {/* Stat 3: All Your Event Needs */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/15 text-center flex flex-col justify-between hover:bg-white/15 transition-all md:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 rounded-xl bg-brand-pink/20 text-brand-pink mx-auto flex items-center justify-center mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-serif text-4xl sm:text-5xl font-bold text-brand-gold-light mb-2">
                    100%
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
                    Client Commitment
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-soft-lavender/80 font-sans">
                    EVENTS21 – All Your Event Needs.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 text-[11px] font-sans uppercase tracking-widest text-brand-gold">
                  Serving Nationwide &amp; Abroad
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OUR CORE VALUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <span className="inline-block text-xs uppercase tracking-widest text-brand-purple font-semibold font-sans mb-2">
            The Principles That Define Us
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-plum">
            3. Our Core Values
          </h2>
          <p className="text-sm sm:text-base text-brand-plum/70 font-sans mt-2">
            These foundational standards guide our decisions, our work ethics, and the way we care for every client.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={val.name}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-brand-warm-border shadow-xs hover:border-brand-purple/40 hover:shadow-subtle transition-all group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-soft-lavender text-brand-purple flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-brand-purple group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-sans uppercase tracking-widest text-brand-gold font-semibold block">
                      Value 0{idx + 1}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-plum">
                      {val.name}
                    </h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-brand-plum/75 font-sans leading-relaxed">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. MEET THE FOUNDER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24" id="founder">
        <div className="bg-gradient-to-br from-white via-brand-warm-white to-brand-soft-lavender/30 rounded-3xl p-6 sm:p-10 md:p-14 border border-brand-purple/20 shadow-elevated">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Founder Image Frame (Left Column) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-sm sm:max-w-md rounded-3xl overflow-hidden shadow-elevated border-4 border-white ring-2 ring-brand-purple/20 bg-brand-plum aspect-[3/4] group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={founder.image || "/images/adeola-oyeyode-founder.jpg"}
                  alt="Adeola Oyeyode - Founder & Creative Director EVENTS21"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ objectPosition: "center 20%" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                  <span className="inline-block px-3 py-1 rounded-full bg-brand-gold/25 backdrop-blur-xs border border-brand-gold/40 text-brand-gold-light text-[10px] font-sans font-semibold uppercase tracking-wider mb-1.5">
                    Leadership Spotlight
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    {founder.name}
                  </h3>
                  <p className="text-xs font-sans uppercase tracking-widest text-brand-gold mt-0.5">
                    {founder.title}
                  </p>
                </div>
              </div>

              {/* Founder Badges */}
              <div className="mt-6 w-full max-w-sm sm:max-w-md grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-2xl bg-white border border-brand-warm-border shadow-2xs">
                  <div className="font-serif text-lg font-bold text-brand-purple">10+ Years</div>
                  <div className="text-[10px] uppercase tracking-wider text-brand-plum/70 font-sans font-medium">
                    Event Leadership
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-brand-warm-border shadow-2xs">
                  <div className="font-serif text-lg font-bold text-brand-purple">MBA Graduate</div>
                  <div className="text-[10px] uppercase tracking-wider text-brand-plum/70 font-sans font-medium">
                    Business Strategy
                  </div>
                </div>
              </div>
            </div>

            {/* Founder Biography & Credentials (Right Column) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-sans tracking-widest uppercase font-semibold mb-3">
                  <Award className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Meet the Founder</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-plum leading-tight">
                  Adeola Oyeyode
                </h2>
                <p className="text-sm sm:text-base uppercase tracking-widest text-brand-gold font-sans font-semibold mt-1">
                  Founder &amp; Creative Director EVENTS21
                </p>
              </div>

              {/* Full Bio Prose */}
              <div className="space-y-4 text-sm sm:text-base text-brand-plum/85 font-sans leading-relaxed font-light">
                {founder.bio && founder.bio !== DEFAULT_FOUNDER_INFO.bio ? (
                  founder.bio.split(/\n\n+/).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))
                ) : (
                  <>
                    <p>
                      <strong>Adeola Oyeyode</strong> is an experienced event planning professional, creative
                      director and entrepreneur with over 10 years of experience in event planning, programme
                      coordination, event management and production.
                    </p>

                    <p>
                      Her journey in the events industry began at <strong>Covenant University</strong>, where she
                      worked as a Programme Coordinator at the University&apos;s Entrepreneurial Centre for over five
                      years. During this period, she gained valuable experience coordinating workshops, conferences,
                      institutional programmes and corporate engagements. This foundational experience strengthened her
                      expertise in project coordination, stakeholder management, logistics, relationship building and the
                      strategic execution of events.
                    </p>

                    <p>
                      Driven by her passion for creativity, organisation and creating meaningful experiences, Adeola
                      transitioned from programme coordination into entrepreneurship, establishing <strong>EVENTS21 in 2021</strong>.
                    </p>

                    <p>
                      Today, she leads EVENTS21 as its Founder and Creative Director, bringing together years of professional
                      experience, business insight and creative expertise to deliver exceptional weddings, corporate events,
                      social celebrations and large-scale institutional events.
                    </p>

                    <p>
                      With an academic background in <strong>Agricultural Economics</strong> and a <strong>Master&apos;s degree in Business Administration</strong>,
                      Adeola combines business strategy with creative thinking, operational efficiency and a strong understanding of client expectations.
                    </p>

                    <p>
                      Her approach to event planning goes beyond aesthetics. She believes that every successful event requires
                      intentional planning, clear communication, strategic budgeting, effective vendor management, attention to detail
                      and seamless execution.
                    </p>

                    <p>
                      Beyond creating memorable events, Adeola is passionate about contributing to the growth of the event industry
                      through knowledge sharing, professional development and mentoring aspiring event planners.
                    </p>

                    <p>
                      Her vision is to build EVENTS21 into a distinguished and trusted event planning and production brand recognised
                      for excellence, creativity, integrity and exceptional client experiences.
                    </p>
                  </>
                )}
              </div>

              {/* Philosophy Callout Quote */}
              <div className="p-6 rounded-2xl bg-white border border-brand-purple/20 shadow-xs relative">
                <Quote className="w-8 h-8 text-brand-purple/15 absolute top-4 right-4" />
                <span className="text-xs uppercase tracking-widest text-brand-purple font-semibold font-sans block mb-1">
                  Her Guiding Philosophy
                </span>
                <p className="font-serif italic text-xl sm:text-2xl font-bold text-brand-plum">
                  &ldquo;Adding Value Through Seamless Event Planning.&rdquo;
                </p>
                <p className="text-xs font-sans text-brand-gold font-medium mt-1">
                  — Adeola Oyeyode, Founder &amp; Creative Director EVENTS21
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md"
                >
                  <span>Book a Consultation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-brand-soft-lavender/50 text-brand-plum border border-brand-warm-border text-xs font-semibold uppercase tracking-wider transition-all shadow-2xs"
                >
                  <span>Explore Services</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. MEET THE PRODUCTION TEAM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <span className="text-xs uppercase tracking-widest text-brand-purple font-semibold font-sans block mb-2">
            The Production Squad
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-plum">
            Meet the Team Behind EVENTS21
          </h2>
          <p className="text-sm text-brand-plum/70 font-sans mt-2">
            Dedicated stylists, coordinators, and logistics leads executing every milestone with care and composure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {team.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-3xl overflow-hidden border border-brand-warm-border shadow-xs flex flex-col justify-between group hover:border-brand-purple/40 transition-all"
            >
              <div className="relative w-full h-[300px] sm:h-[340px] overflow-hidden bg-brand-plum">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ objectPosition: "center center" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
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

      {/* 8. CONSULTATION CTA */}
      <ConsultationCTA
        title="Ready to Create an Unforgettable Experience?"
        subtitle="Schedule a consultation with Adeola and the EVENTS21 team. From concept to execution, we bring your vision to life."
      />
    </div>
  );
}