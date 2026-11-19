"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, PhoneCall, ShieldCheck, Award } from "lucide-react";
import { HOME_CONTENT } from "@/content/site-content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const { hero } = HOME_CONTENT;

  return (
    <section className="relative bg-gradient-to-b from-forest-900 via-forest-800 to-forest-950 text-cream-50 pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
      {/* Background graphic */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <Image
          src={hero.bgImage}
          alt="European Softwood Timber Forest and Lumber"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-700/70 border border-timber-400/40 text-timber-200 text-xs sm:text-sm font-medium shadow-inner">
            <ShieldCheck className="w-4 h-4 text-timber-300" />
            <span>Direct European Sourcing • Softwood Timber &amp; Industrial Packaging</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-cream-50 tracking-tight leading-tight sm:leading-tight">
            {hero.headline}
          </h1>

          {/* Paragraphs */}
          <div className="space-y-4 text-base sm:text-lg text-cream-100/90 leading-relaxed max-w-3xl mx-auto">
            <p>{hero.paragraph1}</p>
            <p className="text-sm sm:text-base text-cream-200/80">{hero.paragraph2}</p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              href={hero.ctaPrimary.href}
              variant="secondary"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
              className="w-full sm:w-auto px-8 py-4 text-base font-bold shadow-xl"
            >
              {hero.ctaPrimary.label}
            </Button>
            <Button
              href={hero.ctaSecondary.href}
              variant="outline"
              size="lg"
              icon={<PhoneCall className="w-4 h-4" />}
              className="w-full sm:w-auto text-cream-100 border-cream-200/40 hover:bg-white/10"
            >
              {hero.ctaSecondary.label}
            </Button>
          </div>
        </div>

        {/* Stats counter strip */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {hero.stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-forest-950/60 backdrop-blur-sm border border-forest-700/60 rounded-xl p-5 text-center transition-transform hover:-translate-y-1"
            >
              <div className="font-serif text-2xl sm:text-4xl font-bold text-timber-300">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-cream-200/80 mt-1 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
