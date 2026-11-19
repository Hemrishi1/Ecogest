import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { SITE_METADATA } from "@/content/site-content";
import { Container } from "@/components/ui/Container";
import { ShieldCheck, AlertCircle, ArrowLeft } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Privacy Policy - Ecogest India Pvt. Ltd.",
  description: "Privacy policy and data retention information for Ecogest India Pvt. Ltd.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      {/* Header Banner */}
      <section className="bg-forest-900 text-cream-50 py-14 sm:py-20 relative overflow-hidden">
        <Container>
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-800 text-timber-300 text-xs font-semibold uppercase tracking-wider border border-forest-700">
              <ShieldCheck className="w-3.5 h-3.5" />
              Legal &amp; Privacy
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-cream-50">
              Privacy Policy
            </h1>
            <p className="text-sm sm:text-base text-cream-200/90 leading-relaxed font-light">
              How Ecogest India Pvt. Ltd. handles and protects information submitted through our commercial website.
            </p>
          </div>
        </Container>
      </section>

      {/* Policy Body */}
      <section className="py-14 sm:py-20 bg-cream-50">
        <Container className="max-w-4xl">
          {/* Legal Review Disclaimer */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3 mb-10">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>Notice:</strong> This is a placeholder privacy statement outlining current technical data handling practices. It is subject to formal legal counsel review in accordance with applicable Indian and international data protection laws.
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-timber-200 shadow-card space-y-8 text-charcoal-700 text-sm sm:text-base leading-relaxed">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-forest-900 mb-3">
                1. Data We Collect
              </h2>
              <p>
                When you submit a contact inquiry or quote request on {SITE_METADATA.legalName}, we collect the following business contact details:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-charcoal-600">
                <li>Full name and organization/company name</li>
                <li>Work email address and telephone contact number</li>
                <li>Product and packaging interest specifications</li>
                <li>Technical project notes and dimensions</li>
                <li>Timestamp and standard network identifiers for anti-spam/security verification</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-forest-900 mb-3">
                2. Purpose of Processing
              </h2>
              <p>
                Your submitted data is processed exclusively for commercial communication, including:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-charcoal-600">
                <li>Responding to inquiries regarding imported softwood timber supply</li>
                <li>Preparing commercial pricing quotations for pallets, crates, and packaging</li>
                <li>Providing technical specifications and delivery logistics consultation</li>
                <li>Protecting our contact systems against bot attacks and automated spam</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-forest-900 mb-3">
                3. Data Retention &amp; Security
              </h2>
              <p>
                We maintain automated data retention schedules. Commercial form submissions are stored securely and automatically pruned after the retention period (default 365 days). We employ industry-standard transport encryption (HTTPS/TLS), rate limiting, and bot protection challenges to secure transmission.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-forest-900 mb-3">
                4. Third-Party Services
              </h2>
              <p>
                We utilize trusted operational infrastructure to deliver this website:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-charcoal-600">
                <li><strong>Cloudflare Turnstile:</strong> For privacy-preserving bot detection without personal tracking or cookies.</li>
                <li><strong>Google Maps Embed:</strong> To display our registered office location in Dombivli, Maharashtra.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-forest-900 mb-3">
                5. Contacting Our Data Privacy Desk
              </h2>
              <p>
                If you have questions about your submitted data or wish to request data deletion, please contact:
              </p>
              <div className="mt-3 p-4 bg-cream-100 rounded-lg border border-timber-200 text-charcoal-900 font-medium">
                <p>{SITE_METADATA.legalName}</p>
                <p>Address: {SITE_METADATA.address.full}</p>
                <p>Email: <a href={`mailto:${SITE_METADATA.email}`} className="text-forest-700 underline">{SITE_METADATA.email}</a></p>
                <p>Phone: {SITE_METADATA.phone}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-timber-100 flex items-center justify-between">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-timber-700 hover:text-timber-900 text-sm font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to Homepage
              </Link>
              <span className="text-xs text-charcoal-400">
                Last updated: November 2026
              </span>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
