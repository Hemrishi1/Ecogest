import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { ABOUT_CONTENT, SITE_METADATA } from "@/content/site-content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { ShieldCheck, Globe, Clock, Leaf } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "About Us - Strong European Softwood Timber Heritage",
  description:
    "Learn about Ecogest India's European softwood timber heritage since 1984, group companies Ecogest SRL Italy & Gatta Marco SRL, and 30,000 m³ annual softwood exports to India.",
  path: "/about",
});

export default function AboutPage() {
  const { heritage, vision, expertise, sustainability } = ABOUT_CONTENT;

  return (
    <>
      {/* Header Banner */}
      <section className="bg-forest-900 text-cream-50 py-16 sm:py-24 relative overflow-hidden">
        <Container>
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-800 text-timber-300 text-xs font-semibold uppercase tracking-wider border border-forest-700">
              <ShieldCheck className="w-3.5 h-3.5" />
              Company Heritage
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-cream-50">
              About Ecogest India
            </h1>
            <p className="text-base sm:text-xl text-cream-200/90 leading-relaxed font-light">
              Strong European softwood timber heritage, combining Austrian and German sourcing with dependable Indian industrial supply.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Heritage Details */}
      <section className="py-16 sm:py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <SectionHeading
                badge="Since 1984"
                title={heritage.heading}
                align="left"
                className="mb-6"
              />
              <div className="space-y-4 text-charcoal-700 text-base sm:text-lg leading-relaxed">
                {heritage.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="relative w-full h-[320px] rounded-2xl overflow-hidden shadow-card border border-timber-200">
                <Image
                  src="/assets/hero/about-hero.svg"
                  alt="Ecogest European Softwood Heritage"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Group Key Figures */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-cream-100 border border-timber-200">
                  <div className="font-serif text-2xl font-bold text-forest-900">
                    30,000 m³
                  </div>
                  <div className="text-xs text-charcoal-600 mt-1">
                    Annual average softwood export to India
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-cream-100 border border-timber-200">
                  <div className="font-serif text-2xl font-bold text-forest-900">
                    10+ Years
                  </div>
                  <div className="text-xs text-charcoal-600 mt-1">
                    Consistent supply &amp; trust in Indian wood industry
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-cream-100 border-y border-timber-100">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-5">
            <span className="inline-block px-3.5 py-1 rounded-full bg-timber-100 text-timber-800 text-xs font-bold uppercase tracking-wider">
              {vision.heading}
            </span>
            <p className="font-serif text-2xl sm:text-3xl text-forest-900 font-semibold leading-relaxed">
              &ldquo;{vision.statement}&rdquo;
            </p>
          </div>
        </Container>
      </section>

      {/* Expertise & Experience Section */}
      <section className="py-16 sm:py-24 bg-white">
        <Container>
          <SectionHeading
            badge="Institutional Strength"
            title={expertise.heading}
            description="Proven decades of timber trading backed by an enduring commitment to the natural environment."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 border border-timber-200 bg-cream-50/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-timber-100 text-timber-800 flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase text-timber-600 tracking-wider">
                    Foundation
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-forest-900">
                    {expertise.items[0].title}
                  </h3>
                </div>
              </div>
              <p className="text-charcoal-700 leading-relaxed text-base">
                {expertise.items[0].description}
              </p>
            </Card>

            <Card className="p-8 border border-forest-200 bg-forest-50/30">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center">
                  <Leaf className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase text-forest-700 tracking-wider">
                    Core Responsibility
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-forest-900">
                    {expertise.items[1].title}
                  </h3>
                </div>
              </div>
              <p className="text-charcoal-700 leading-relaxed text-base">
                {expertise.items[1].description}
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUsSection dark />

      {/* Sustainability Section */}
      <section className="py-16 bg-white border-t border-timber-100">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="inline-block px-3.5 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-bold uppercase tracking-wider">
              {sustainability.heading}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900">
              Committed to Sustainable Industrial Growth
            </h2>
            <p className="text-charcoal-600 leading-relaxed text-base sm:text-lg">
              {sustainability.statement}
            </p>
          </div>
        </Container>
      </section>

      <FinalCtaSection />
    </>
  );
}
