import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { QUALITY_CONTENT } from "@/content/site-content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import {
  ShieldAlert,
  Anchor,
  TreePine,
  Compass,
  CheckCircle2,
  Award,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Quality & Certifications - ISPM-15 & Sea-Worthy Packaging",
  description:
    "Ecogest India maintains strict standards: ISPM-15 Heat Treatment Compliance, Sea-Worthy Export Packaging, Sustainable Wood Usage, and Precision Engineering Design.",
  path: "/quality",
});

const QUALITY_ICONS: Record<string, React.ReactNode> = {
  ShieldAlert: <ShieldAlert className="w-8 h-8 text-forest-700" />,
  Anchor: <Anchor className="w-8 h-8 text-forest-700" />,
  TreePine: <TreePine className="w-8 h-8 text-forest-700" />,
  Compass: <Compass className="w-8 h-8 text-forest-700" />,
};

export default function QualityPage() {
  const { hero, standardsHeading, standards, sustainabilityNote } =
    QUALITY_CONTENT;

  return (
    <>
      {/* Header Banner */}
      <section className="bg-forest-900 text-cream-50 py-16 sm:py-24 relative overflow-hidden">
        <Container>
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-800 text-timber-300 text-xs font-semibold uppercase tracking-wider border border-forest-700">
              <Award className="w-3.5 h-3.5" />
              Quality Assurance &amp; Compliance
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

      {/* Standards Section */}
      <section className="py-16 sm:py-24 bg-white">
        <Container>
          <SectionHeading
            badge="Rigorous Protocols"
            title={standardsHeading}
            description="We maintain high standards of manufacturing quality and export compliance to ensure reliable industrial packaging solutions."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {standards.map((std, idx) => (
              <Card
                key={idx}
                className="p-8 border border-timber-200 bg-cream-50/50 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl bg-timber-100 flex items-center justify-center">
                      {QUALITY_ICONS[std.icon]}
                    </div>
                    {std.badge && (
                      <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-forest-100 text-forest-800 border border-forest-200">
                        {std.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-forest-900 mb-3">
                    {std.title}
                  </h3>
                  <p className="text-charcoal-700 leading-relaxed text-base">
                    {std.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-timber-200/60 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-timber-700">
                  <CheckCircle2 className="w-4 h-4 text-forest-600" />
                  <span>Strict Operational Standard</span>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ISPM-15 Specific Feature Banner */}
      <section className="py-16 bg-cream-100 border-y border-timber-100">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 relative">
              <div className="relative w-full h-[280px] rounded-xl overflow-hidden shadow-card border border-timber-200 bg-white p-4">
                <Image
                  src="/assets/icons/ispm15-stamp.svg"
                  alt="ISPM-15 IPPC Heat Treatment Standard Stamp"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-timber-700">
                Global Phytosanitary Regulation
              </span>
              <h2 className="font-serif text-3xl font-bold text-forest-900">
                ISPM-15 Heat Treatment Compliance
              </h2>
              <p className="text-charcoal-700 text-base sm:text-lg leading-relaxed">
                International trade requires solid wood packaging material to undergo certified phytosanitary treatment. Ecogest India provides thermal heat treatment meeting strict ISPM-15 guidelines, complete with required IPPC markings for smooth passage through international customs checkpoints.
              </p>
              <div className="pt-2">
                <Button href="/quote" variant="secondary" size="md">
                  Request ISPM-15 Pallets
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Sustainability Section */}
      <section className="py-16 sm:py-20 bg-forest-900 text-cream-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="inline-block px-3.5 py-1 rounded-full bg-forest-800 text-timber-300 text-xs font-bold uppercase tracking-wider border border-forest-700">
              {sustainabilityNote.heading}
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-cream-50">
              Sustainable Wood Usage &amp; Environmental Stewardship
            </h2>
            <p className="text-cream-200/90 leading-relaxed text-base sm:text-lg">
              {sustainabilityNote.statement}
            </p>
          </div>
        </Container>
      </section>

      <FinalCtaSection />
    </>
  );
}
