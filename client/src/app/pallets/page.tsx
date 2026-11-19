import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { PALLETS_CONTENT } from "@/content/site-content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { Layers, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Wooden Pallets - Two-Way Stringer & Four-Way Block Pallets",
  description:
    "Ecogest India manufactures durable two-way stringer pallets and heavy-duty four-way block pallets, plus closed boarded, wing type, reversible, and single deck pallets.",
  path: "/pallets",
});

export default function PalletsPage() {
  const { hero, twoWay, fourWay, typesHeading, types } = PALLETS_CONTENT;

  return (
    <>
      {/* Header Banner */}
      <section className="bg-forest-900 text-cream-50 py-16 sm:py-24 relative overflow-hidden">
        <Container>
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-800 text-timber-300 text-xs font-semibold uppercase tracking-wider border border-forest-700">
              <Layers className="w-3.5 h-3.5" />
              Industrial Pallet Engineering
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
            <div className="pt-2 flex flex-wrap gap-4">
              <Button href="/quote" variant="secondary" size="md">
                Request Pallet Quote
              </Button>
              <Button href="/contact" variant="outline" size="md" className="text-cream-100 border-cream-300/40">
                Custom Pallet Sizing
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Two-Way & Four-Way Pallet Showcase */}
      <section className="py-16 sm:py-24 bg-white">
        <Container className="space-y-16">
          {/* Two-Way Wooden Pallet */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 relative">
              <div className="relative w-full h-[320px] sm:h-[380px] rounded-2xl overflow-hidden shadow-card border border-timber-200">
                <Image
                  src={twoWay.image}
                  alt={twoWay.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute top-4 left-4 bg-timber-700 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-md shadow-md">
                {twoWay.alias}
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <span className="inline-block px-3 py-1 rounded-full bg-timber-100 text-timber-800 text-xs font-bold uppercase tracking-wider">
                Cost-Effective &amp; Reliable
              </span>
              <h2 className="text-3xl font-serif font-bold text-forest-900">
                {twoWay.title}
              </h2>
              <p className="text-charcoal-700 leading-relaxed text-base sm:text-lg">
                {twoWay.description}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-3">
                  Key Features
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {twoWay.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-sm text-charcoal-800 bg-cream-50 p-2.5 rounded-lg border border-timber-100"
                    >
                      <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Button href="/quote" variant="primary" size="md">
                  Inquire Stringer Pallets
                </Button>
              </div>
            </div>
          </div>

          <hr className="border-timber-100" />

          {/* Four-Way Wooden Pallet */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 lg:order-2 relative">
              <div className="relative w-full h-[320px] sm:h-[380px] rounded-2xl overflow-hidden shadow-card border border-timber-200">
                <Image
                  src={fourWay.image}
                  alt={fourWay.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute top-4 left-4 bg-forest-800 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-md shadow-md">
                {fourWay.alias}
              </div>
            </div>

            <div className="lg:col-span-6 lg:order-1 space-y-5">
              <span className="inline-block px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-bold uppercase tracking-wider">
                Maximum Handling Efficiency
              </span>
              <h2 className="text-3xl font-serif font-bold text-forest-900">
                {fourWay.title}
              </h2>
              <p className="text-charcoal-700 leading-relaxed text-base sm:text-lg">
                {fourWay.description}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-3">
                  Key Features
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {fourWay.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-sm text-charcoal-800 bg-cream-50 p-2.5 rounded-lg border border-timber-100"
                    >
                      <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Button href="/quote" variant="secondary" size="md">
                  Inquire Block Pallets
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* TYPES OF PALLETS Card Grid */}
      <section className="py-16 sm:py-24 bg-cream-100 border-y border-timber-100">
        <Container>
          <SectionHeading
            badge="Versatile Configurations"
            title={typesHeading}
            description="Explore our complete line of industrial wooden pallet constructions engineered for specific transport, racking, and payload configurations."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {types.map((pallet) => (
              <Card
                key={pallet.id}
                className="flex flex-col justify-between overflow-hidden border-timber-200 bg-white group"
              >
                <div>
                  <div className="relative w-full h-48 bg-charcoal-100">
                    <Image
                      src={pallet.image}
                      alt={pallet.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold text-forest-900 group-hover:text-timber-600 transition-colors">
                      {pallet.name}
                    </h3>
                    <p className="text-sm text-charcoal-600 mt-2.5 leading-relaxed">
                      {pallet.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Button
                    href="/quote"
                    variant="outline"
                    size="sm"
                    className="w-full text-xs font-semibold"
                  >
                    Request Custom Size
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <FinalCtaSection />
    </>
  );
}
