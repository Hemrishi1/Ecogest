"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Trees,
  Factory,
  Layers,
  Box,
  ShieldCheck,
  Disc,
  ArrowRight,
} from "lucide-react";
import { HOME_CONTENT } from "@/content/site-content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const ICON_MAP: Record<string, React.ReactNode> = {
  Trees: <Trees className="w-6 h-6 text-timber-600" />,
  Factory: <Factory className="w-6 h-6 text-timber-600" />,
  Layers: <Layers className="w-6 h-6 text-timber-600" />,
  Box: <Box className="w-6 h-6 text-timber-600" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-timber-600" />,
  Disc: <Disc className="w-6 h-6 text-timber-600" />,
};

export function CoreServicesStrip() {
  const { coreServicesHeading, coreServices } = HOME_CONTENT;

  return (
    <section className="py-16 sm:py-24 bg-cream-100">
      <Container>
        <SectionHeading
          badge="What We Deliver"
          title={coreServicesHeading}
          description="Integrated solutions spanning direct European softwood timber imports and industrial wooden packaging manufacturing."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreServices.map((service) => (
            <Card
              key={service.id}
              className="flex flex-col justify-between group overflow-hidden bg-white border border-timber-200/80 hover:border-timber-400"
            >
              <div>
                {/* Image Placeholder Frame */}
                <div className="relative w-full h-48 bg-charcoal-100 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm p-2 rounded-lg shadow-sm border border-timber-200">
                    {ICON_MAP[service.icon]}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-forest-900 group-hover:text-timber-600 transition-colors">
                    {service.title}
                  </h3>
                  {service.description && (
                    <p className="text-sm text-charcoal-600 mt-2.5 leading-relaxed">
                      {service.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="px-6 pb-6 pt-0">
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-timber-700 hover:text-timber-800 group/link"
                >
                  <span>Explore Solutions</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
