import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { INDUSTRIES_CONTENT } from "@/content/site-content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { Factory, ShieldCheck } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Industries We Serve - Logistics, Export, FMCG, Pharma, Engineering",
  description:
    "Ecogest India provides imported softwood timber and export-compliant wooden packaging for Logistics, Export & Shipping, Engineering, Manufacturing, FMCG, Pharmaceuticals, and Construction.",
  path: "/industries",
});

export default function IndustriesPage() {
  const { hero } = INDUSTRIES_CONTENT;

  return (
    <>
      {/* Header Banner */}
      <section className="bg-forest-900 text-cream-50 py-16 sm:py-24 relative overflow-hidden">
        <Container>
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-800 text-timber-300 text-xs font-semibold uppercase tracking-wider border border-forest-700">
              <Factory className="w-3.5 h-3.5" />
              Sectors &amp; Applications
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-cream-50">
              {hero.title}
            </h1>
            <p className="text-lg sm:text-xl font-medium text-timber-300">
              {hero.subtitle}
            </p>
            <p className="text-base sm:text-lg text-cream-200/90 leading-relaxed font-light">
              {hero.description}
            </p>
          </div>
        </Container>
      </section>

      {/* Full Industries List */}
      <IndustriesSection showAll={true} />

      <FinalCtaSection />
    </>
  );
}
