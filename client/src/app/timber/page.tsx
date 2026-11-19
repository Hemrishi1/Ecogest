import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { TIMBER_CONTENT } from "@/content/site-content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import {
  Trees,
  CheckCircle2,
  PackageCheck,
  Building2,
  Armchair,
  Cog,
  Warehouse,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Imported Softwood Timber Trading - European & South American Lumber",
  description:
    "Ecogest India delivers high-quality imported softwood timber including European Softwood Lumber, South American Lumber, Kiln-Dried Sawn Timber, and Structural Wood.",
  path: "/timber",
});

const APP_ICONS: Record<string, React.ReactNode> = {
  PackageCheck: <PackageCheck className="w-6 h-6 text-timber-600" />,
  Building2: <Building2 className="w-6 h-6 text-timber-600" />,
  Armchair: <Armchair className="w-6 h-6 text-timber-600" />,
  Cog: <Cog className="w-6 h-6 text-timber-600" />,
  Warehouse: <Warehouse className="w-6 h-6 text-timber-600" />,
};

export default function TimberPage() {
  const { hero, productRange, applications } = TIMBER_CONTENT;

  return (
    <>
      {/* Hero Header */}
      <section className="bg-forest-900 text-cream-50 py-16 sm:py-24 relative overflow-hidden">
        <Container>
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-800 text-timber-300 text-xs font-semibold uppercase tracking-wider border border-forest-700">
              <Trees className="w-3.5 h-3.5" />
              Direct Softwood Importation
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
                Request Timber Pricing
              </Button>
              <Button href="/contact" variant="outline" size="md" className="text-cream-100 border-cream-300/40">
                Contact Timber Desk
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Product Range Grid */}
      <section className="py-16 sm:py-24 bg-white">
        <Container>
          <SectionHeading
            badge="Softwood Portfolio"
            title={productRange.heading}
            description="Backed by strong European sourcing networks in Austria and Germany, ensuring dependable supply and consistent international grading standards."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productRange.items.map((item, idx) => (
              <Card key={idx} className="flex flex-col justify-between overflow-hidden border-timber-200">
                <div>
                  <div className="relative w-full h-48 bg-charcoal-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold text-forest-900 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-charcoal-600 leading-relaxed">
                      {item.description}
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
                    Inquire Specifications
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Applications Strip */}
      <section className="py-16 bg-cream-100 border-y border-timber-100">
        <Container>
          <SectionHeading
            badge="Versatility &amp; Performance"
            title={applications.heading}
            description="Our imported softwood timber serves essential applications across Indian manufacturing, infrastructure, and logistics."
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {applications.items.map((app, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl border border-timber-200 text-center flex flex-col items-center justify-center space-y-3 shadow-subtle hover:shadow-card transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-timber-50 border border-timber-200 flex items-center justify-center">
                  {APP_ICONS[app.icon]}
                </div>
                <h4 className="font-serif font-bold text-forest-900 text-sm">
                  {app.name}
                </h4>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <FinalCtaSection />
    </>
  );
}
