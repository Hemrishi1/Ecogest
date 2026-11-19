import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { INDUSTRIAL_PRODUCTS_CONTENT } from "@/content/site-content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { Box, Disc, Package, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Industrial Wooden Products - Cable Drums, Boxes & Crates",
  description:
    "Heavy-duty wooden cable drums, durable machinery wooden boxes, and export-grade wooden crates manufactured by Ecogest India.",
  path: "/industrial-products",
});

export default function IndustrialProductsPage() {
  const { hero, products } = INDUSTRIAL_PRODUCTS_CONTENT;

  return (
    <>
      {/* Header Banner */}
      <section className="bg-forest-900 text-cream-50 py-16 sm:py-24 relative overflow-hidden">
        <Container>
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-800 text-timber-300 text-xs font-semibold uppercase tracking-wider border border-forest-700">
              <Box className="w-3.5 h-3.5" />
              Heavy-Duty Engineered Wood Products
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
                Get Industrial Quote
              </Button>
              <Button href="/contact" variant="outline" size="md" className="text-cream-100 border-cream-300/40">
                Custom Engineering Support
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Detailed Products Showcase */}
      <section className="py-16 sm:py-24 bg-white">
        <Container className="space-y-16">
          {products.map((product, idx) => {
            const isEven = idx % 2 === 1;

            return (
              <div
                key={product.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
              >
                <div
                  className={`lg:col-span-6 relative ${
                    isEven ? "lg:order-2" : ""
                  }`}
                >
                  <div className="relative w-full h-[320px] sm:h-[380px] rounded-2xl overflow-hidden shadow-card border border-timber-200 bg-white">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                </div>

                <div
                  className={`lg:col-span-6 space-y-5 ${
                    isEven ? "lg:order-1" : ""
                  }`}
                >
                  <span className="inline-block px-3 py-1 rounded-full bg-timber-100 text-timber-800 text-xs font-bold uppercase tracking-wider">
                    Industrial Grade
                  </span>
                  <h2 className="text-3xl font-serif font-bold text-forest-900">
                    {product.name}
                  </h2>
                  <p className="text-charcoal-700 leading-relaxed text-base sm:text-lg">
                    {product.description}
                  </p>

                  {product.details && (
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
                        Design &amp; Quality Highlights
                      </h4>
                      {product.details.map((detail, dIdx) => (
                        <div
                          key={dIdx}
                          className="flex items-center gap-2.5 text-sm text-charcoal-800"
                        >
                          <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-3">
                    <Button
                      href="/quote"
                      variant="primary"
                      size="md"
                    >
                      Inquire About {product.name}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </Container>
      </section>

      <FinalCtaSection />
    </>
  );
}
