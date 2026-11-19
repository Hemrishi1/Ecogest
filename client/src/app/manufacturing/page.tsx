import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { MANUFACTURING_CONTENT } from "@/content/site-content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { Factory, ArrowRight, ShieldCheck, Check } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Industrial Packaging Manufacturing - Pallets, Boxes & Crates",
  description:
    "Ecogest India manufactures export-standard wooden packaging, including standard & customized wooden pallets, EPAL export pallets (planned), boxes, crates, and heavy-duty packaging.",
  path: "/manufacturing",
});

export default function ManufacturingPage() {
  const { hero, productsHeading, products } = MANUFACTURING_CONTENT;

  return (
    <>
      {/* Header Banner */}
      <section className="bg-forest-900 text-cream-50 py-16 sm:py-24 relative overflow-hidden">
        <Container>
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-800 text-timber-300 text-xs font-semibold uppercase tracking-wider border border-forest-700">
              <Factory className="w-3.5 h-3.5" />
              Industrial Manufacturing Facility
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
                Request Packaging Quote
              </Button>
              <Button href="/pallets" variant="outline" size="md" className="text-cream-100 border-cream-300/40">
                View Pallet Catalog
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Manufacturing Lineup */}
      <section className="py-16 sm:py-24 bg-white">
        <Container>
          <SectionHeading
            badge="Precision Built"
            title={productsHeading}
            description="Manufactured with precision engineering, reliable fasteners, and ISPM-15 heat-treated wood for domestic and global sea-worthy shipments."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((item) => (
              <Card
                key={item.id}
                className="flex flex-col justify-between overflow-hidden border-timber-200 group"
              >
                <div>
                  <div className="relative w-full h-48 bg-charcoal-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {item.badge && (
                      <div className="absolute top-3 right-3 bg-timber-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        {item.badge}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold text-forest-900 group-hover:text-timber-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-charcoal-600 mt-2.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-timber-700 hover:text-timber-800"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Quality Standards Callout */}
      <section className="py-16 bg-cream-100 border-t border-timber-100">
        <Container>
          <div className="bg-forest-900 rounded-2xl text-cream-50 p-8 sm:p-12 shadow-elevated grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-timber-300">
                Compliance Guarantee
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream-50">
                Export Compliance &amp; ISPM-15 Heat Treatment
              </h3>
              <p className="text-sm sm:text-base text-cream-200/90 leading-relaxed">
                All manufacturing products can be provided with full ISPM-15 heat treatment certification and phytosanitary compliance for unhindered worldwide customs clearance.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Button href="/quality" variant="white" size="lg">
                View Certifications
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <FinalCtaSection />
    </>
  );
}
