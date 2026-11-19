import React from "react";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { CONTACT_CONTENT, SITE_METADATA } from "@/content/site-content";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { MapPin, Phone, Mail, Globe, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export const metadata: Metadata = constructMetadata({
  title: "Contact Us - Ecogest India Pvt. Ltd.",
  description:
    "Contact Ecogest India Pvt. Ltd. in Dombivli, Thane, Maharashtra. Call +91 9321233436 or email kanhaiya.mali@ecogestindia.com for softwood timber and packaging inquiries.",
  path: "/contact",
});

export default function ContactPage() {
  const { hero, details, company } = CONTACT_CONTENT;

  return (
    <>
      {/* Header Banner */}
      <section className="bg-forest-900 text-cream-50 py-16 sm:py-24 relative overflow-hidden">
        <Container>
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-800 text-timber-300 text-xs font-semibold uppercase tracking-wider border border-forest-700">
              <Mail className="w-3.5 h-3.5" />
              Corporate Communication
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

      {/* Main Content: Info + Form */}
      <section className="py-16 sm:py-24 bg-cream-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Direct Contact Info */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-timber-700">
                  Registered Office
                </span>
                <h2 className="font-serif text-3xl font-bold text-forest-900 mt-1">
                  {company}
                </h2>
                <p className="text-charcoal-600 text-sm mt-2 leading-relaxed">
                  Supplier of imported softwood timber and industrial wood packaging solutions.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-xl border border-timber-200 shadow-subtle flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-timber-100 flex items-center justify-center text-timber-800 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
                      {details.addressLabel}
                    </h4>
                    <p className="text-sm font-medium text-charcoal-900 mt-1 leading-snug">
                      {details.addressValue}
                    </p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-timber-200 shadow-subtle flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-timber-100 flex items-center justify-center text-timber-800 shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
                      {details.phoneLabel}
                    </h4>
                    <a
                      href={`tel:${SITE_METADATA.phoneClean}`}
                      className="text-sm font-semibold text-forest-800 hover:text-timber-700 transition-colors mt-1 block"
                    >
                      {details.phoneValue}
                    </a>
                  </div>
                </div>

                {/* WhatsApp Highlight Box */}
                <div className="bg-[#f0fbf4] p-5 rounded-xl border border-[#25D366]/40 shadow-sm flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-lg bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <WhatsAppIcon className="w-7 h-7 fill-white" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-green-900">
                        Instant WhatsApp Chat
                      </h4>
                      <p className="text-xs text-charcoal-600 mt-0.5">
                        Direct conversation with commercial desk
                      </p>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/919321233436?text=${encodeURIComponent(
                      "Hello Ecogest India, I would like to inquire about softwood timber and packaging solutions."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#25D366] text-white text-xs font-bold hover:bg-[#20ba59] transition-all hover:scale-105 shadow whitespace-nowrap"
                  >
                    <span>Contact on WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="bg-white p-5 rounded-xl border border-timber-200 shadow-subtle flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-timber-100 flex items-center justify-center text-timber-800 shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
                      {details.emailLabel}
                    </h4>
                    <a
                      href={`mailto:${details.emailValue}`}
                      className="text-sm font-semibold text-forest-800 hover:text-timber-700 transition-colors mt-1 block break-all"
                    >
                      {details.emailValue}
                    </a>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-timber-200 shadow-subtle flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-timber-100 flex items-center justify-center text-timber-800 shrink-0">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
                      {details.websiteLabel}
                    </h4>
                    <a
                      href={details.websiteHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-forest-800 hover:text-timber-700 transition-colors mt-1 block"
                    >
                      {details.websiteValue}
                    </a>
                  </div>
                </div>
              </div>

              {/* Working Hours / Response Promise */}
              <div className="p-5 rounded-xl bg-forest-900 text-cream-50 border border-forest-800 space-y-2">
                <div className="flex items-center gap-2 text-timber-300 font-semibold text-sm">
                  <Clock className="w-4 h-4" />
                  <span>Rapid Response Time</span>
                </div>
                <p className="text-xs text-cream-200/90 leading-relaxed">
                  Our commercial team responds to all trade inquiries and quote requests within 1 business day.
                </p>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="mt-16 bg-white p-4 rounded-2xl border border-timber-200 shadow-card">
            <div className="flex items-center justify-between pb-4 px-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-timber-600" />
                <span className="font-serif font-bold text-forest-900 text-lg">
                  Location: Lodha Signet, Dombivli, Maharashtra
                </span>
              </div>
              <a
                href="https://maps.google.com/?q=Lodha+Signet+Dombivli"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-timber-700 hover:underline"
              >
                Open in Google Maps
              </a>
            </div>
            <div className="w-full h-96 rounded-xl overflow-hidden bg-cream-100 border border-timber-100">
              <iframe
                title="Ecogest India Office Location"
                src={SITE_METADATA.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
