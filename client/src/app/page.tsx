import React from "react";
import { Hero } from "@/components/sections/Hero";
import { CoreServicesStrip } from "@/components/sections/CoreServicesStrip";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { ExpertiseSection } from "@/components/sections/ExpertiseSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CoreServicesStrip />
      <AboutTeaser />
      <WhyChooseUsSection />
      <ExpertiseSection />
      <IndustriesSection showAll={false} />
      <FinalCtaSection />
    </>
  );
}
