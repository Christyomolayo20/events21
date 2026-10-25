import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  Calendar,
  Award,
  Users,
  Compass,
  Briefcase,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
  Target,
  Layers,
  Crown,
} from "lucide-react";
import AcademyRegistrationForm from "@/components/AcademyRegistrationForm";

export const metadata = {
  title: "Royal Planners Academy | Event Planning Training",
  description:
    "Build your event planning skills with Royal Planners Academy. Explore practical training, industry experience, internship placement, and fieldwork support.",
};

export default function RoyalPlannersAcademyPage() {
  const learningCards = [
    {
      title: "Event Planning Fundamentals",
      description: "Understand the planning process, timelines, event briefs, and execution.",
      image: "/images/academy-table-styling.jpg",
      imageAlt: "Event Table Setting & Styling Masterclass by Events 21",
      icon: Compass,
      tag: "Module 01 • Planning Fundamentals",
      detail: "Timelines, spatial layouts, client event briefs, budget modeling, and day-of execution sequencing.",
    },
    {
      title: "Client & Team Management",
      description: "Handle client communication, event teams, logistics, and coordination.",
      image: "/images/academy-floral-centerpiece.jpg",
      imageAlt: "Luxury Floral Styling and Ballroom Logistics by Events 21",
      icon: Users,
      tag: "Module 02 • Leadership & Logistics",
      detail: "Client relations, vendor contracts, bridal party concierge, backstage coordination, and emergency protocols.",
    },
  ];

  const audienceGroups = [
    {
      number: "01",
      title: "Aspiring Event Planners",
      description: "People who want to enter the event planning industry and build their foundational skills.",
      icon: Compass,
    },
    {
      number: "02",
      title: "Emerging Event Planners",
      description: "Planners who want to improve their skills, professionalism, and ability to coordinate events.",
      icon: Target,
    },
    {
      number: "03",
      title: "Entrepreneurs",
      description: "Individuals who want to establish or grow an event planning business.",
      icon: Building,
    },
    {
      number: "04",
      title: "Related Professionals",
      description: "Professionals in related fields who want to expand their expertise into event management.",
      icon: Briefcase,
    },
  ];

  const whyLearnBenefits = [
    "Industry-informed training grounded in real event experience.",
    "Practical examples and event case studies.",
    "Professional standards and attention to detail.",
    "Knowledge of client management, logistics, and vendor relationships.",
    "Guidance on building a sustainable event planning business.",
  ];

  const deliverables = [
    {
      title: "Certificate of Participation",
      description: "Participants receive a certificate of participation.",
      badge: "Certificate",
      icon: Award,
    },
    {
      title: "Six-Month Internship Placement",
      description: "Participants receive a six-month internship placement opportunity.",
      badge: "6-Month Internship",
      icon: Briefcase,
    },
    {
      title: "Three Months of Field Support",
      description: "Participants receive three months of support with fieldwork.",
      badge: "3-Month Field Support",
      icon: Users,
    },
  ];

  return (
    <div className="bg-brand-warm-white">
      {/* =========================================================================
          SECTION A: HERO (Cinematic Team Background with Luxury Scrim)
      ========================================================================= */}
      <section className="relative min-h-[75vh] md:min-h-[82vh] flex items-center justify-center overflow-hidden bg-brand-plum text-white pt-28 pb-16 md:pt-36 md:pb-24">
        {/* Background Image: Team on About Us Page */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/about-team-seated.jpg"
            alt="Events 21 Academy Mentors and Event Planning Team"
            className="w-full h-full object-cover object-center filter brightness-[0.6] contrast-[1.1] scale-105"
          />
          {/* Luxury Royal Plum Scrim Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-plum-dark via-brand-plum-dark/85 to-brand-plum-dark/65" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-brand-plum-dark/40 to-brand-plum-dark/80 pointer-events-none" />
        </div>

        {/* Ambient lighting glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/20 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-brand-gold/15 rounded-full blur-[120px] pointer-events-none" />

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          {/* Distinction Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-brand-gold/40 text-brand-gold-light text-xs font-sans tracking-[0.2em] uppercase font-semibold mb-6 shadow-lg">
            <GraduationCap className="w-4 h-4 text-brand-gold" />
            <span>Events 21 Professional Training &amp; Mentorship</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-4 drop-shadow-md text-balance">
            Royal Planners Academy
          </h1>

          {/* Subheading */}
          <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-brand-gold-light font-normal mb-7 text-balance drop-shadow-sm">
            Learn the Art and Business of Event Planning.
          </p>

          {/* Introduction Paragraphs */}
          <div className="space-y-4 text-white/90 font-sans text-sm sm:text-base leading-relaxed max-w-2xl mx-auto text-balance mb-9 font-light">
            <p>
              Welcome to Royal Planners Academy, a training platform created to equip aspiring and emerging event planners with the knowledge, practical skills, and professional mindset needed to thrive in the event industry.
            </p>
            <p>
              Our training combines event planning fundamentals, coordination, design, vendor management, budgeting, client relations, and the business of running an event planning brand.
            </p>
            <p className="font-medium text-white">
              Whether you are starting from scratch or looking to improve your existing skills, we are here to help you build your capacity and grow with confidence.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            {/* Primary CTA */}
            <a
              href="#register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-brand-purple to-[#8E51C9] hover:from-brand-purple-hover hover:to-brand-purple text-white text-xs font-semibold uppercase tracking-[0.2em] transition-all shadow-elevated hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] border border-brand-gold/40"
            >
              <span>Register Your Interest</span>
              <ArrowRight className="w-4 h-4 text-brand-gold-light" />
            </a>

            {/* Secondary CTA */}
            <a
              href="#learn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-[0.18em] transition-all border border-white/30 hover:border-brand-gold"
            >
              <span>Explore the Programme</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION B: WHAT YOU WILL LEARN (Showcasing Real Styling & Coordination)
      ========================================================================= */}
      <section id="learn" className="scroll-mt-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-soft-lavender border border-brand-purple/20 text-brand-purple text-[11px] font-sans font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Core Curriculum</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-plum">
            What You Will Learn
          </h2>
          <p className="text-xs sm:text-sm text-brand-plum/70 font-sans mt-3 max-w-lg mx-auto">
            Grounded in actual event production, tablescape styling, and live day-of logistics.
          </p>
        </div>

        {/* 2 Learning Cards with Uploaded Image Visuals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {learningCards.map((card, idx) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="group bg-white rounded-3xl overflow-hidden border border-brand-warm-border hover:border-brand-purple/40 shadow-xs hover:shadow-elevated transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Photo Visual */}
                  <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-brand-plum">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={card.image}
                      alt={card.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ objectPosition: "center center" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[10px] font-sans font-bold uppercase tracking-wider text-brand-plum shadow-xs">
                        {card.tag}
                      </span>
                    </div>
                  </div>

                  {/* Text Details */}
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-soft-lavender text-brand-purple flex items-center justify-center shrink-0 border border-brand-purple/15">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-brand-plum group-hover:text-brand-purple transition-colors">
                        {card.title}
                      </h3>
                    </div>

                    <p className="text-sm sm:text-base text-brand-plum/80 font-sans leading-relaxed mb-3 font-medium">
                      {card.description}
                    </p>

                    <p className="text-xs text-brand-plum/60 font-sans leading-relaxed">
                      {card.detail}
                    </p>
                  </div>
                </div>

                <div className="px-6 sm:px-8 pb-6 pt-3 border-t border-brand-warm-border/50 flex items-center justify-between text-xs text-brand-purple font-sans font-semibold">
                  <span>Practical Module {idx + 1}</span>
                  <span className="text-brand-gold uppercase tracking-wider text-[11px]">Hands-On Training</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION C: WHO IS THE ACADEMY FOR?
      ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 bg-white/60 border-y border-brand-warm-border/60">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-soft-lavender text-brand-purple text-[11px] font-sans font-semibold uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5 text-brand-purple" />
            <span>Target Participants</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-plum">
            Who Is It For?
          </h2>
        </div>

        {/* 4 Audience Groups */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {audienceGroups.map((group) => {
            const Icon = group.icon;

            return (
              <div
                key={group.title}
                className="bg-white rounded-2xl p-6 border border-brand-warm-border hover:border-brand-purple/40 shadow-xs hover:shadow-subtle transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-soft-lavender text-brand-purple flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-serif font-bold text-sm text-brand-gold">
                      {group.number}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-brand-plum mb-2">
                    {group.title}
                  </h3>
                  <p className="text-xs text-brand-plum/70 font-sans leading-relaxed">
                    {group.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION D: WHY LEARN WITH US?
      ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-22">
        <div className="bg-gradient-to-br from-brand-plum via-[#2E1235] to-brand-plum text-white rounded-3xl p-8 sm:p-12 md:p-14 shadow-elevated relative overflow-hidden">
          {/* Subtle gold accent glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mb-8 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-brand-gold-light text-[11px] font-sans font-semibold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
              <span>The Events 21 Difference</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Why Learn with Royal Planners Academy?
            </h2>
          </div>

          {/* Clean Readable Benefits List */}
          <ul className="space-y-4 relative z-10">
            {whyLearnBenefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-3.5 text-sm sm:text-base text-white/90 font-sans leading-relaxed">
                <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* =========================================================================
          SECTION E: WHAT YOU RECEIVE (MORE THAN TRAINING)
      ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold-dark text-[11px] font-sans font-semibold uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5 text-brand-gold" />
            <span>Comprehensive Package</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-plum">
            More Than Training
          </h2>
          <p className="text-xs sm:text-sm text-brand-plum/70 font-sans mt-3">
            Real field exposure and direct mentorship beyond classroom sessions.
          </p>
        </div>

        {/* 3 Prominent Deliverable Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {deliverables.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="bg-white rounded-3xl p-8 border border-brand-warm-border hover:border-brand-gold/60 shadow-xs hover:shadow-subtle transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-brand-soft-lavender text-brand-purple flex items-center justify-center border border-brand-purple/15">
                      <Icon className="w-6 h-6 text-brand-purple" />
                    </div>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-plum mb-3">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-plum/75 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-brand-warm-border/50 text-[11px] uppercase tracking-wider text-brand-gold font-sans font-semibold">
                  Guaranteed Benefit
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION F: REGISTRATION
      ========================================================================= */}
      <section id="register" className="scroll-mt-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        <div className="max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-[11px] font-sans font-semibold uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-brand-gold" />
            <span>Admissions &amp; Registration</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-plum leading-tight mb-4">
            Take the First Step Towards Your Event Planning Career.
          </h2>
          <p className="text-sm sm:text-base text-brand-plum/75 font-sans leading-relaxed">
            Ready to develop your event planning skills and build your confidence in the industry? Register your interest in Royal Planners Academy, and our team will provide further information about the programme and the next steps.
          </p>
        </div>

        {/* Interactive Registration Form Component */}
        <AcademyRegistrationForm />
      </section>
    </div>
  );
}
