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
      icon: Compass,
      tag: "Foundations",
    },
    {
      title: "Client & Team Management",
      description: "Handle client communication, event teams, logistics, and coordination.",
      icon: Users,
      tag: "Leadership",
    },
  ];

  const audienceGroups = [
    {
      title: "Aspiring Event Planners",
      description: "People who want to enter the event planning industry and build their foundational skills.",
      icon: Compass,
    },
    {
      title: "Emerging Event Planners",
      description: "Planners who want to improve their skills, professionalism, and ability to coordinate events.",
      icon: Target,
    },
    {
      title: "Entrepreneurs",
      description: "Individuals who want to establish or grow an event planning business.",
      icon: Building,
    },
    {
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
      badge: "Completion Token",
      icon: Award,
    },
    {
      title: "Six-Month Internship Placement",
      description: "Participants receive a six-month internship placement opportunity.",
      badge: "6 Months Practical",
      icon: Briefcase,
    },
    {
      title: "Three Months of Field Support",
      description: "Participants receive three months of support with fieldwork.",
      badge: "3 Months On-Site",
      icon: Users,
    },
  ];

  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24 bg-brand-warm-white">
      {/* =========================================================================
          SECTION A: HERO
      ========================================================================= */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24">
        {/* Ambient brand glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-soft-lavender/60 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-soft-lavender border border-brand-purple/20 text-brand-purple text-xs font-sans tracking-widest uppercase font-semibold mb-6 shadow-2xs">
            <GraduationCap className="w-3.5 h-3.5 text-brand-gold" />
            <span>Events 21 Training &amp; Mentorship</span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-brand-plum tracking-tight leading-[1.12] mb-4">
            Royal Planners Academy
          </h1>

          {/* Subheading */}
          <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-brand-purple font-normal mb-8 text-balance">
            Learn the Art and Business of Event Planning.
          </p>

          {/* Introduction Paragraphs */}
          <div className="space-y-4 text-brand-plum/80 font-sans text-sm sm:text-base leading-relaxed max-w-3xl mx-auto text-balance mb-10">
            <p>
              Welcome to Royal Planners Academy, a training platform created to equip aspiring and emerging event planners with the knowledge, practical skills, and professional mindset needed to thrive in the event industry.
            </p>
            <p>
              Our training combines event planning fundamentals, coordination, design, vendor management, budgeting, client relations, and the business of running an event planning brand.
            </p>
            <p className="font-medium text-brand-plum">
              Whether you are starting from scratch or looking to improve your existing skills, we are here to help you build your capacity and grow with confidence.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brand-purple hover:bg-brand-purple-hover text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-elevated hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Register Your Interest</span>
              <ArrowRight className="w-4 h-4 text-brand-gold-light" />
            </a>

            <a
              href="#programme"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-brand-plum/20 hover:border-brand-purple bg-white text-brand-plum hover:text-brand-purple text-xs font-semibold uppercase tracking-widest transition-colors shadow-2xs"
            >
              <span>Explore the Programme</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION B: WHAT YOU WILL LEARN
      ========================================================================= */}
      <section id="programme" className="scroll-mt-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold-dark text-[11px] font-sans font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3 text-brand-gold" />
            <span>Curriculum Focus</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-plum">
            What You Will Learn
          </h2>
        </div>

        {/* 2 Simple Learning Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {learningCards.map((card, idx) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-warm-border hover:border-brand-purple/40 shadow-xs hover:shadow-subtle transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-brand-soft-lavender text-brand-purple flex items-center justify-center border border-brand-purple/15">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-brand-warm-gray text-brand-plum/70">
                      Module 0{idx + 1} • {card.tag}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-brand-plum mb-3">
                    {card.title}
                  </h3>

                  <p className="text-sm text-brand-plum/75 font-sans leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION C: WHO IS THE ACADEMY FOR?
      ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-soft-lavender text-brand-purple text-[11px] font-sans font-semibold uppercase tracking-wider mb-2">
            <Users className="w-3 h-3 text-brand-purple" />
            <span>Target Participants</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-plum">
            Who Is It For?
          </h2>
        </div>

        {/* 4 Audience Groups in a Simple Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {audienceGroups.map((group) => {
            const Icon = group.icon;

            return (
              <div
                key={group.title}
                className="bg-white rounded-2xl p-6 border border-brand-warm-border hover:border-brand-purple/30 shadow-2xs hover:shadow-subtle transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-soft-lavender/60 text-brand-purple flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
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
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="bg-gradient-to-br from-brand-plum via-[#2E1235] to-brand-plum text-white rounded-3xl p-8 sm:p-12 md:p-14 shadow-elevated relative overflow-hidden">
          {/* Subtle gold accent glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mb-8 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-brand-gold-light text-[11px] font-sans font-semibold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
              <span>The Events 21 Difference</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
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
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-soft-lavender text-brand-purple text-[11px] font-sans font-semibold uppercase tracking-wider mb-2">
            <Award className="w-3 h-3 text-brand-gold" />
            <span>Practical Experience</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-plum">
            More Than Training
          </h2>
        </div>

        {/* 3 Prominent Deliverable Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deliverables.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="bg-white rounded-3xl p-8 border border-brand-warm-border hover:border-brand-purple/40 shadow-xs hover:shadow-subtle transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-brand-soft-lavender text-brand-purple flex items-center justify-center border border-brand-purple/15">
                      <Icon className="w-6 h-6 text-brand-purple" />
                    </div>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-gold/15 text-brand-gold-dark">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-plum mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-plum/75 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION F: REGISTRATION
      ========================================================================= */}
      <section id="register" className="scroll-mt-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-center">
        <div className="max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-[11px] font-sans font-semibold uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-brand-gold" />
            <span>Enrollment &amp; Next Cohort</span>
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
