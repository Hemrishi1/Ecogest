"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ABOUT_CONTENT } from "@/content/site-content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function AboutTeaser() {
  const { heritage } = ABOUT_CONTENT;

  return (
    <section className="py-16 sm:py-24 bg-white border-y border-timber-100">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden shadow-card border border-timber-200">
              <Image
                src="/assets/hero/about-hero.svg"
                alt="European Timber Heritage - Ecogest India"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-forest-800 text-cream-50 p-5 rounded-xl shadow-elevated border border-forest-600 max-w-xs">
              <p className="font-serif text-2xl font-bold text-timber-300">
                Since 1984
              </p>
              <p className="text-xs text-cream-200 mt-0.5 leading-snug">
                Representing leading softwood productions from Austria &amp; Germany.
              </p>
            </div>
          </div>

          {/* Right Column: Copy */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-timber-50 text-timber-700 border border-timber-200">
              About Ecogest India
            </span>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest-900 leading-tight">
              {heritage.heading}
            </h2>

            <div className="space-y-4 text-charcoal-700 leading-relaxed text-base sm:text-lg">
              {heritage.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <Button
                href="/about"
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Read Full Heritage &amp; Vision
              </Button>
              <Button href="/quote" variant="outline" size="md">
                Request a Quote
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
