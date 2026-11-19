import React from "react";
import { Clock, Leaf, ShieldCheck, CheckCircle } from "lucide-react";
import { ABOUT_CONTENT } from "@/content/site-content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

export function ExpertiseSection() {
  const { expertise, vision, sustainability } = ABOUT_CONTENT;

  return (
    <section className="py-16 sm:py-24 bg-white border-y border-timber-100">
      <Container>
        <SectionHeading
          badge="Core Principles"
          title={expertise.heading}
          description="Decades of European market presence combined with environmental responsibility and forward-looking industrial supply."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Experience Card */}
          <Card className="p-8 border-l-4 border-l-timber-600 bg-cream-50/50">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-timber-100 flex items-center justify-center text-timber-700">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-timber-700">
                  Proven Heritage
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

          {/* Environment Card */}
          <Card className="p-8 border-l-4 border-l-forest-600 bg-forest-50/30">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-forest-100 flex items-center justify-center text-forest-700">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-forest-700">
                  Ecological Commitment
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

        {/* Vision Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-forest-900 via-forest-800 to-forest-900 text-cream-50 p-8 sm:p-12 shadow-elevated border border-forest-700">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="inline-block px-3.5 py-1 rounded-full bg-forest-700/80 border border-timber-400/40 text-timber-200 text-xs font-bold uppercase tracking-wider">
              {vision.heading}
            </span>
            <p className="font-serif text-xl sm:text-2xl text-cream-50 font-medium leading-relaxed italic">
              &ldquo;{vision.statement}&rdquo;
            </p>
            <div className="pt-2 text-xs font-semibold uppercase tracking-widest text-timber-300">
              Ecogest India Private Limited
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
