import React from "react";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { QUOTE_CONTENT, SITE_METADATA } from "@/content/site-content";
import { Container } from "@/components/ui/Container";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { Calculator, ShieldCheck, CheckCircle2, Phone, Mail } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export const metadata: Metadata = constructMetadata({
  title: "Request a Quote - Imported Timber & Industrial Packaging",
  description:
    "Request competitive pricing for imported European softwood timber, two-way and four-way pallets, wooden boxes, and cable drums from Ecogest India.",
  path: "/quote",
});

export default function QuotePage() {
  const { hero } = QUOTE_CONTENT;

  return (
    <>
      {/* Header Banner */}
      <section className="bg-forest-900 text-cream-50 py-16 sm:py-24 relative overflow-hidden">
        <Container>
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-800 text-timber-300 text-xs font-semibold uppercase tracking-wider border border-forest-700">
              <Calculator className="w-3.5 h-3.5" />
              Commercial &amp; Technical Quotation
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
          </div>
        </Container>
      </section>

      {/* Main Quote Form Section */}
      <section className="py-16 sm:py-24 bg-cream-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form Column */}
            <div className="lg:col-span-8">
              <QuoteForm />
            </div>

            {/* Sidebar Value Propositon */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-timber-200 shadow-card space-y-4">
                <h4 className="font-serif text-lg font-bold text-forest-900">
                  Why Quote With Ecogest India?
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-2.5 text-xs text-charcoal-700">
                    <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0 mt-0.5" />
                    <span>Direct European sawmill relationships (Austria &amp; Germany)</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-charcoal-700">
                    <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0 mt-0.5" />
                    <span>ISPM-15 heat-treated phytosanitary export compliance</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-charcoal-700">
                    <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0 mt-0.5" />
                    <span>Customized stringer and block pallet load ratings</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-charcoal-700">
                    <CheckCircle2 className="w-4 h-4 text-forest-600 shrink-0 mt-0.5" />
                    <span>Consistent volume supply across Indian industrial hubs</span>
                  </div>
                </div>
              </div>

              {/* Direct Assistance Card */}
              <div className="bg-forest-900 text-cream-50 p-6 rounded-2xl border border-forest-800 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-timber-300">
                  Need Immediate Assistance?
                </span>
                <p className="text-xs text-cream-200/90 leading-relaxed">
                  Call or chat directly with our technical sales specialists for urgent tender submissions or bulk requirements.
                </p>

                <a
                  href={`https://wa.me/919321233436?text=${encodeURIComponent(
                    "Hello Ecogest India, I would like to request an urgent quotation for timber/packaging."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-[#25D366] text-white font-bold text-xs shadow hover:bg-[#20ba59] transition-all hover:scale-105"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white shrink-0" />
                  <span>Contact on WhatsApp</span>
                </a>

                <div className="pt-2 space-y-2 text-sm font-semibold">
                  <a
                    href={`tel:${SITE_METADATA.phoneClean}`}
                    className="flex items-center gap-2 text-timber-300 hover:text-timber-200 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{SITE_METADATA.phone}</span>
                  </a>
                  <a
                    href={`mailto:${SITE_METADATA.email}`}
                    className="flex items-center gap-2 text-cream-100 hover:text-timber-300 transition-colors text-xs break-all"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{SITE_METADATA.email}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
