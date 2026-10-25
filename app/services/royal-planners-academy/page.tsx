import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  Sparkles,
  Award,
  Users,
  Briefcase,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
} from "lucide-react";
import AcademyRegistrationForm from "@/components/AcademyRegistrationForm";

export const metadata = {
  title: "Royal Planners Academy | Event Planning Training | Events 21",
  description:
    "Equip yourself with practical skills, event design mastery, and business acumen at Royal Planners Academy by Events 21. Fieldwork support and internship placement included.",
};

export default function RoyalPlannersAcademyPage() {
  const audienceGroups = [
    {
      num: "01",
      title: "Aspiring Event Planners",
      description:
        "Individuals eager to break into the luxury event industry and build a rock-solid foundation in logistics, design, and protocol.",
    },
    {
      num: "02",
      title: "Emerging Coordinators",
      description:
        "Practicing planners and coordinators looking to refine their execution, elevate their clientele, and master high-budget productions.",
    },
    {
      num: "03",
      title: "Creative Entrepreneurs",
      description:
        "Founders launching or expanding event decor, rental, or planning businesses who require proven systems, contracts, and pricing clarity.",
    },
    {
      num: "04",
      title: "Allied Industry Experts",
      description:
        "Florists, caterers, stylists, and hospitality professionals seeking to expand their services into comprehensive event management.",
    },
  ];

  const whyLearnBenefits = [
    "Industry-informed training grounded in real high-society event productions.",
    "Live case studies dissecting actual floor plans, budgets, and day-of contingencies.",
    "Uncompromising professional standards, luxury etiquette, and attention to detail.",
    "Direct knowledge of client consultation, vendor contracts, and backstage logistics.",
    "Actionable roadmap for pricing, branding, and running a sustainable planning brand.",
  ];

  const deliverables = [
    {
      title: "Certificate of Participation",
      description:
        "Official certification from Events 21 validating your completion of the masterclass and foundational event management competencies.",
      badge: "Credential",
      icon: Award,
    },
    {
      title: "Six-Month Internship Placement",
      description:
        "Direct placement opportunity working on live luxury weddings, corporate galas, and cultural engagements with the Events 21 team.",
      badge: "Hands-On",
      icon: Briefcase,
    },
    {
      title: "Three Months of Field Support",
      description:
        "Dedicated backstage advisory, contract review, and vendor recommendations to guide you through your first independent events.",
      badge: "Mentorship",
      icon: Users,
    },
  ];

  return (
    <div className="bg-brand-warm-white">
      {/* =========================================================================
          SECTION A: HERO (Visible Team Image Background & Plain Minimalist CTAs)
      ========================================================================= */}
      <section className="relative min-h-[72vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden bg-brand-plum text-white pt-28 pb-16 md:pt-36 md:pb-20">
        {/* Visible Background Team Photograph */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/about-team-seated.jpg"
            alt="Events 21 Academy Mentors and Event Planning Team"
            className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05]"
          />
          {/* Subtle Balanced Scrim - Keeps team clearly visible while ensuring text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/35" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          {/* Distinction Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-brand-gold-light text-[11px] font-sans tracking-[0.22em] uppercase font-semibold mb-5 shadow-sm">
            <GraduationCap className="w-3.5 h-3.5 text-brand-gold" />
            <span>Events 21 Professional Training &amp; Mentorship</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.08] mb-4 drop-shadow-md text-balance">
            Royal Planners Academy
          </h1>

          {/* Subheading */}
          <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-brand-gold-light font-normal mb-8 sm:mb-10 text-balance drop-shadow-sm">
            Learn the Art and Business of Event Planning.
          </p>

          {/* Plain & Simple CTAs - Matching Landing Page Style */}
          <div className="inline-flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-sans tracking-[0.22em] sm:tracking-[0.26em] uppercase font-semibold text-white/95 drop-shadow-sm">
            <a
              href="#register"
              id="academy-cta-register"
              className="text-white hover:text-brand-gold transition-colors duration-300 py-1.5 border-b border-transparent hover:border-brand-gold focus:outline-none focus:text-brand-gold"
            >
              REGISTER FOR NEXT COHORT
            </a>
            <span className="text-brand-gold/60 select-none">|</span>
            <a
              href="#curriculum"
              id="academy-cta-curriculum"
              className="text-white hover:text-brand-gold transition-colors duration-300 py-1.5 border-b border-transparent hover:border-brand-gold focus:outline-none focus:text-brand-gold"
            >
              EXPLORE CURRICULUM
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION B: WELCOME & ACADEMY MISSION (Editorial Introduction)
      ========================================================================= */}
      <section className="bg-white border-b border-brand-warm-border/70 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-soft-lavender/70 border border-brand-purple/20 text-brand-purple text-[11px] font-sans font-semibold uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>The Academy Mission</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-plum leading-tight mb-8">
            Equipping Tomorrow&apos;s Event Leaders with Real-World Mastery
          </h2>

          {/* Exact User Text Relocated to Prominent Editorial Position */}
          <div className="space-y-5 text-brand-plum/85 font-sans text-base sm:text-lg leading-relaxed max-w-3xl mx-auto font-light text-left sm:text-center">
            <p>
              Welcome to Royal Planners Academy, a training platform created to equip aspiring and emerging event planners with the knowledge, practical skills, and professional mindset needed to thrive in the event industry.
            </p>
            <p>
              Our training combines event planning fundamentals, coordination, design, vendor management, budgeting, client relations, and the business of running an event planning brand.
            </p>
            <p className="font-normal text-brand-plum">
              Whether you are starting from scratch or looking to improve your existing skills, we are here to help you build your capacity and grow with confidence.
            </p>
          </div>

          {/* 3 Editorial Pillars */}
          <div className="mt-12 pt-10 border-t border-brand-warm-border/60 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="p-5 rounded-2xl bg-brand-warm-white/80 border border-brand-warm-border/70">
              <span className="font-serif font-bold text-lg text-brand-purple block mb-1.5">
                01. Practical Immersion
              </span>
              <p className="text-xs text-brand-plum/70 font-sans leading-relaxed">
                Hands-on tablescaping, room layouts, production call sheets, and live simulations.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-brand-warm-white/80 border border-brand-warm-border/70">
              <span className="font-serif font-bold text-lg text-brand-purple block mb-1.5">
                02. Executive Mentorship
              </span>
              <p className="text-xs text-brand-plum/70 font-sans leading-relaxed">
                Direct guidance from Adeola and senior wedding leads on client dynamics and logistics.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-brand-warm-white/80 border border-brand-warm-border/70">
              <span className="font-serif font-bold text-lg text-brand-purple block mb-1.5">
                03. Business Architecture
              </span>
              <p className="text-xs text-brand-plum/70 font-sans leading-relaxed">
                Transparent pricing structures, vendor contract clauses, and scaling your brand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION C: CORE CURRICULUM (Uncropped Photography & Editorial Layout)
      ========================================================================= */}
      <section id="curriculum" className="scroll-mt-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-soft-lavender border border-brand-purple/20 text-brand-purple text-[11px] font-sans font-semibold uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5 text-brand-gold" />
            <span>Masterclass Modules</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-plum">
            What You Will Learn
          </h2>
          <p className="text-sm text-brand-plum/75 font-sans mt-3">
            Comprehensive curriculum balancing creative styling artistry with rigorous operational execution.
          </p>
        </div>

        <div className="space-y-16 md:space-y-24">
          {/* Module 01: Event Planning Fundamentals & Spatial Design */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Uncropped Photo: Gold Charger Plate with White Plate & Rose Folded Satin Napkin */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-white p-3 rounded-2xl border border-brand-warm-border shadow-xs">
                <div className="relative w-full aspect-square bg-[#FAF7F2] rounded-xl overflow-hidden flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/academy-table-styling.jpg"
                    alt="Artful Table Setting and Napkin Styling Masterclass by Events 21"
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="pt-3 px-2 text-center">
                  <span className="text-[11px] uppercase tracking-widest font-sans font-semibold text-brand-gold">
                    Masterclass Focus
                  </span>
                  <p className="text-xs text-brand-plum/70 font-sans mt-0.5">
                    Artful Tablescaping &amp; Precision Place Settings
                  </p>
                </div>
              </div>
            </div>

            {/* Module 01 Narrative & Syllabus */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs uppercase tracking-widest text-brand-purple font-semibold font-sans block">
                Module 01 • Operational Rigor
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-brand-plum leading-tight">
                Event Planning Fundamentals &amp; Spatial Design
              </h3>
              <p className="text-sm sm:text-base text-brand-plum/80 font-sans leading-relaxed">
                Master the full lifecycle of event production. From deconstructing a client brief to drafting minute-by-minute schedules and budget modeling, you will learn the exact operational blueprints used on 500+ guest royal celebrations.
              </p>

              <div className="pt-3 space-y-2.5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0 mt-1" />
                  <p className="text-xs sm:text-sm text-brand-plum/85 font-sans leading-relaxed">
                    <strong>Event Brief &amp; Moodboarding:</strong> Translating client dreams into functional aesthetic directives.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0 mt-1" />
                  <p className="text-xs sm:text-sm text-brand-plum/85 font-sans leading-relaxed">
                    <strong>Floor Plans &amp; Spatial Flow:</strong> Table spacing, guest journey mapping, and bridal party entrance sightlines.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0 mt-1" />
                  <p className="text-xs sm:text-sm text-brand-plum/85 font-sans leading-relaxed">
                    <strong>Day-of Production Sequencing:</strong> Setup load-in, Alaga &amp; protocol timing, service coordination, and strike down.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0 mt-1" />
                  <p className="text-xs sm:text-sm text-brand-plum/85 font-sans leading-relaxed">
                    <strong>Budget Architecture &amp; Contingency:</strong> Realistic forecasting, vendor disbursements, and cashflow safeguards.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Module 02: Client & Team Management & Floral Architecture */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Module 02 Narrative & Syllabus (Left on desktop) */}
            <div className="lg:col-span-7 space-y-4 order-2 lg:order-1">
              <span className="text-xs uppercase tracking-widest text-brand-purple font-semibold font-sans block">
                Module 02 • High-Touch Leadership
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-brand-plum leading-tight">
                Client Relations, Floral Styling &amp; Live Coordination
              </h3>
              <p className="text-sm sm:text-base text-brand-plum/80 font-sans leading-relaxed">
                Elevate from an organizer to a trusted luxury consultant. Learn how to navigate high-stakes client communication, lead cross-functional event crews, and manage luxury floral installations without chaos.
              </p>

              <div className="pt-3 space-y-2.5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-1" />
                  <p className="text-xs sm:text-sm text-brand-plum/85 font-sans leading-relaxed">
                    <strong>Client Consultation &amp; Alignment:</strong> Managing client emotions, expectation boundaries, and family stakeholders.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-1" />
                  <p className="text-xs sm:text-sm text-brand-plum/85 font-sans leading-relaxed">
                    <strong>Floral Architecture &amp; Lighting:</strong> Centerpiece ergonomics, focal backdrop installations, and mood lighting.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-1" />
                  <p className="text-xs sm:text-sm text-brand-plum/85 font-sans leading-relaxed">
                    <strong>Vendor Contract Negotiation:</strong> SLA agreements, caterer timing, sound engineers, and security coordination.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-1" />
                  <p className="text-xs sm:text-sm text-brand-plum/85 font-sans leading-relaxed">
                    <strong>Crisis Protocols &amp; Backstage Calm:</strong> Weather contingencies, power switchovers, and instantaneous problem-solving.
                  </p>
                </div>
              </div>
            </div>

            {/* Uncropped Photo: White Sculptural Seashell Rose Floral Centerpiece in Grand Ballroom */}
            <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
              <div className="w-full max-w-sm bg-white p-3 rounded-2xl border border-brand-warm-border shadow-xs">
                <div className="relative w-full aspect-[3/4] bg-[#FAF7F2] rounded-xl overflow-hidden flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/academy-floral-centerpiece.jpg"
                    alt="Sculptural Floral Seashell Centerpiece and Ballroom Dining by Events 21"
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <div className="pt-3 px-2 text-center">
                  <span className="text-[11px] uppercase tracking-widest font-sans font-semibold text-brand-gold">
                    Masterclass Focus
                  </span>
                  <p className="text-xs text-brand-plum/70 font-sans mt-0.5">
                    Sculptural Floral Styling &amp; Ballroom Logistics
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION D: WHO IS IT FOR? (Minimalist Editorial Grid)
      ========================================================================= */}
      <section className="bg-white border-y border-brand-warm-border/70 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-brand-purple font-semibold font-sans block mb-2">
              Target Candidates
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-plum">
              Who Is the Academy For?
            </h2>
            <p className="text-sm text-brand-plum/70 font-sans mt-2">
              Tailored pathways designed to empower creators at key stages of their journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {audienceGroups.map((group) => (
              <div
                key={group.title}
                className="pt-6 border-t border-brand-warm-border flex flex-col justify-between"
              >
                <div>
                  <span className="font-serif text-2xl font-bold text-brand-gold block mb-2">
                    {group.num}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-brand-plum mb-2">
                    {group.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-plum/75 font-sans leading-relaxed">
                    {group.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION E: WHY LEARN WITH US & WHAT YOU RECEIVE
      ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="bg-brand-plum text-white rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-elevated">
          {/* Subtle gold glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mb-12 relative z-10">
            <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold font-sans block mb-2">
              The Events 21 Difference
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Why Learn with Royal Planners Academy?
            </h2>
          </div>

          {/* Benefits List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14 relative z-10">
            {whyLearnBenefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-white/90 font-sans leading-relaxed font-light">
                  {benefit}
                </span>
              </div>
            ))}
          </div>

          {/* Guaranteed Deliverables Header */}
          <div className="pt-10 border-t border-white/15 relative z-10">
            <div className="mb-8">
              <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold font-sans block mb-1">
                Tangible Outcomes
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                More Than Training: Real Industry Backing
              </h3>
            </div>

            {/* 3 Deliverable Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {deliverables.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-brand-gold/15 text-brand-gold flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-sans font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-gold/20 text-brand-gold-light">
                          {item.badge}
                        </span>
                      </div>
                      <h4 className="font-serif text-lg font-bold text-white mb-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-white/80 font-sans leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION F: ADMISSIONS & REGISTRATION FORM
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
