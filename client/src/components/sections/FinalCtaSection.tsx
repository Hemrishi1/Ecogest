import React from "react";
import { ArrowRight, Phone } from "lucide-react";
import { HOME_CONTENT, SITE_METADATA } from "@/content/site-content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function FinalCtaSection() {
  const { finalCta } = HOME_CONTENT;

  return (
    <section className="py-16 sm:py-20 bg-forest-900 text-cream-50 relative overflow-hidden">
      {/* Decorative background lines */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FAF6F0_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="inline-block px-3.5 py-1 rounded-full bg-timber-700/60 border border-timber-500/40 text-timber-200 text-xs font-bold uppercase tracking-wider">
            Partner With Ecogest India
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-cream-50 tracking-tight">
            {finalCta.heading}
          </h2>

          <p className="text-base sm:text-lg text-cream-200/90 max-w-2xl mx-auto leading-relaxed">
            {finalCta.subheading}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href={finalCta.ctaPrimary.href}
              variant="secondary"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
              className="w-full sm:w-auto px-8"
            >
              {finalCta.ctaPrimary.label}
            </Button>

            <Button
              href={finalCta.ctaSecondary.href}
              variant="outline"
              size="lg"
              icon={<Phone className="w-4 h-4" />}
              className="w-full sm:w-auto text-cream-100 border-cream-200/40 hover:bg-white/10"
            >
              {finalCta.ctaSecondary.label}
            </Button>
          </div>

          <div className="pt-4 text-xs text-charcoal-400">
            Or call our industrial support desk directly at{" "}
            <a
              href={`tel:${SITE_METADATA.phoneClean}`}
              className="text-timber-300 font-semibold underline underline-offset-2 hover:text-timber-200"
            >
              {SITE_METADATA.phone}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
