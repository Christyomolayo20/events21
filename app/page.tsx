import React from "react";
import Hero from "@/components/Hero";
import IntroSection from "@/components/IntroSection";
import ServicesSection from "@/components/ServicesSection";
import FeaturedEventsCarousel from "@/components/FeaturedEventsCarousel";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import ConsultationCTA from "@/components/ConsultationCTA";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero section with background video */}
      <Hero />

      {/* 2. Short introduction to Events 21 */}
      <IntroSection />

      {/* 3. Featured services */}
      <ServicesSection />

      {/* 4. Selected events or portfolio carousel */}
      <FeaturedEventsCarousel />

      {/* 5. Client testimonials creative carousel (only displays genuine admin-published reviews) */}
      <TestimonialsCarousel />

      {/* 6. Concise consultation CTA */}
      <ConsultationCTA />
    </div>
  );
}
