import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { SITE_METADATA } from "@/content/site-content";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest-900 text-cream-100 border-t border-forest-800">
      {/* Top Banner / Value Proposition */}
      <div className="border-b border-forest-800/80 bg-forest-950/40 py-8">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-timber-600/20 border border-timber-500/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-timber-300" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-cream-50 text-base">
                  European Heritage Since 1984
                </h4>
                <p className="text-xs text-charcoal-300 mt-1">
                  Active in European timber sales from Austria and Germany across global markets.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-timber-600/20 border border-timber-500/30 flex items-center justify-center shrink-0">
                <Globe className="w-6 h-6 text-timber-300" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-cream-50 text-base">
                  30,000 m³ Softwood Export
                </h4>
                <p className="text-xs text-charcoal-300 mt-1">
                  Annual average exported to India with more than a decade of consistent supply.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-timber-600/20 border border-timber-500/30 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-timber-300" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-cream-50 text-base">
                  Export Packaging Manufacturing
                </h4>
                <p className="text-xs text-charcoal-300 mt-1">
                  ISPM-15 heat-treated compliant pallets, crates, and heavy-duty industrial packaging.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Footer Body */}
      <div className="py-14 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
            {/* Column 1: Company Profile */}
            <div className="lg:col-span-4 space-y-4">
              <div className="relative w-48 sm:w-56 h-20 sm:h-24">
                <Image
                  src="/assets/logo/logo-white.svg"
                  alt="Ecogest India Pvt. Ltd. White Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
              <p className="text-sm text-charcoal-300 leading-relaxed">
                Ecogest India Pvt. Ltd. is a trusted supplier of imported softwood timber and industrial wood packaging solutions in India. Built on a strong European softwood timber heritage, committed to quality, sustainability, and long-term business partnerships.
              </p>
              <div className="pt-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-800/80 border border-timber-600/40 text-xs text-timber-300">
                  <span>ISPM-15 &amp; Sea-Worthy Packaging Standard</span>
                </div>
              </div>
            </div>

            {/* Column 2: Products & Solutions */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-sm font-semibold tracking-wider uppercase text-timber-300">
                Products &amp; Solutions
              </h4>
              <ul className="space-y-2 text-sm text-charcoal-300">
                <li>
                  <Link
                    href="/timber"
                    className="hover:text-timber-200 transition-colors flex items-center gap-1.5"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-timber-400" />
                    Imported Softwood Timber
                  </Link>
                </li>
                <li>
                  <Link
                    href="/manufacturing"
                    className="hover:text-timber-200 transition-colors flex items-center gap-1.5"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-timber-400" />
                    Packaging Manufacturing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pallets"
                    className="hover:text-timber-200 transition-colors flex items-center gap-1.5"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-timber-400" />
                    Two-Way &amp; Four-Way Pallets
                  </Link>
                </li>
                <li>
                  <Link
                    href="/industrial-products"
                    className="hover:text-timber-200 transition-colors flex items-center gap-1.5"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-timber-400" />
                    Industrial Boxes &amp; Crates
                  </Link>
                </li>
                <li>
                  <Link
                    href="/industrial-products"
                    className="hover:text-timber-200 transition-colors flex items-center gap-1.5"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-timber-400" />
                    Cable Drums &amp; Structures
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Quick Navigation */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-sm font-semibold tracking-wider uppercase text-timber-300">
                Company
              </h4>
              <ul className="space-y-2 text-sm text-charcoal-300">
                <li>
                  <Link href="/about" className="hover:text-timber-200 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/quality" className="hover:text-timber-200 transition-colors">
                    Quality &amp; Standards
                  </Link>
                </li>
                <li>
                  <Link href="/industries" className="hover:text-timber-200 transition-colors">
                    Industries We Serve
                  </Link>
                </li>
                <li>
                  <Link href="/quote" className="hover:text-timber-200 transition-colors">
                    Request a Quote
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-timber-200 transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Registered Contact */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-sm font-semibold tracking-wider uppercase text-timber-300">
                Contact Information
              </h4>
              <div className="space-y-3 text-sm text-charcoal-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-timber-400 shrink-0 mt-1" />
                  <span>{SITE_METADATA.address.full}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-timber-400 shrink-0" />
                  <a
                    href={`tel:${SITE_METADATA.phoneClean}`}
                    className="hover:text-timber-200 transition-colors"
                  >
                    {SITE_METADATA.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-timber-400 shrink-0" />
                  <a
                    href={`mailto:${SITE_METADATA.email}`}
                    className="hover:text-timber-200 transition-colors break-all"
                  >
                    {SITE_METADATA.email}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-timber-400 shrink-0" />
                  <a
                    href={`https://${SITE_METADATA.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-timber-200 transition-colors flex items-center gap-1"
                  >
                    {SITE_METADATA.website}
                    <ExternalLink className="w-3 h-3 text-charcoal-400" />
                  </a>
                </div>

                <div className="pt-2">
                  <a
                    href={`https://wa.me/919321233436?text=${encodeURIComponent(
                      "Hello Ecogest India, I would like to inquire about softwood timber and packaging solutions."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#25D366] text-white text-xs font-bold hover:bg-[#20ba59] transition-all hover:scale-105 shadow"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-white" />
                    <span>Contact on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Copyright & Disclaimer Bar */}
      <div className="border-t border-forest-800 bg-forest-950 py-5 text-xs text-charcoal-400">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            &copy; {currentYear} {SITE_METADATA.legalName}. All rights reserved.
          </p>
          <p className="text-charcoal-400">
            Austrian &amp; German Softwood Timber Heritage • Industrial Packaging Manufacturing
          </p>
        </Container>
      </div>
    </footer>
  );
}
