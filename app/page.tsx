import React from "react";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import GiftsSection from "@/components/GiftsSection";
import ContactSection from "@/components/ContactSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <ServicesSection />
      <PortfolioSection />
      <GiftsSection />
      <ContactSection />
    </div>
  );
}
