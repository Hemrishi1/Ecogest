import React from "react";
import Link from "next/link";
import {
  Warehouse,
  Ship,
  Cpu,
  Factory,
  ShoppingBag,
  Pill,
  Building,
  ArrowRight,
} from "lucide-react";
import { INDUSTRIES_CONTENT } from "@/content/site-content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const ICON_MAP: Record<string, React.ReactNode> = {
  Warehouse: <Warehouse className="w-6 h-6 text-timber-600" />,
  Ship: <Ship className="w-6 h-6 text-timber-600" />,
  Cpu: <Cpu className="w-6 h-6 text-timber-600" />,
  Factory: <Factory className="w-6 h-6 text-timber-600" />,
  ShoppingBag: <ShoppingBag className="w-6 h-6 text-timber-600" />,
  Pill: <Pill className="w-6 h-6 text-timber-600" />,
  Building: <Building className="w-6 h-6 text-timber-600" />,
};

interface IndustriesSectionProps {
  showAll?: boolean;
}

export function IndustriesSection({ showAll = true }: IndustriesSectionProps) {
  const { sectors } = INDUSTRIES_CONTENT;
  const displaySectors = showAll ? sectors : sectors.slice(0, 6);

  return (
    <section className="py-16 sm:py-24 bg-cream-100">
      <Container>
        <SectionHeading
          badge="Market Applications"
          title="INDUSTRIES WE SERVE"
          description="Reliable wooden packaging and softwood lumber tailored to the distinct operational, hygiene, and transit requirements of Indian industries."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displaySectors.map((sector, idx) => (
            <Card
              key={idx}
              className="p-6 bg-white border border-timber-200/90 hover:border-timber-500 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-timber-50 border border-timber-200 flex items-center justify-center mb-4">
                  {ICON_MAP[sector.icon]}
                </div>
                <h3 className="font-serif text-lg font-bold text-forest-900 mb-2">
                  {sector.name}
                </h3>
                <p className="text-sm text-charcoal-600 leading-relaxed">
                  {sector.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-cream-200">
                <Link
                  href="/quote"
                  className="text-xs font-semibold text-timber-700 hover:text-timber-800 inline-flex items-center gap-1 group"
                >
                  <span>Request industry quote</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
