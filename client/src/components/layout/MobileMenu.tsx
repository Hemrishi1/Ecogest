"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ChevronDown, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { NAVIGATION_LINKS, SITE_METADATA } from "@/content/site-content";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [productsOpen, setProductsOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl flex flex-col justify-between overflow-y-auto">
        <div>
          {/* Header */}
          <div className="p-4 flex items-center justify-between border-b border-timber-100">
            <div className="relative w-40 h-16">
              <Image
                src="/assets/logo/logo.svg"
                alt="Ecogest India Logo"
                fill
                className="object-contain object-left"
              />
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-charcoal-500 hover:text-charcoal-800 hover:bg-cream-100"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav List */}
          <div className="p-4 space-y-1">
            {NAVIGATION_LINKS.map((link) => {
              if (link.dropdown) {
                return (
                  <div key={link.label} className="border-b border-cream-200 pb-2 mb-2">
                    <button
                      onClick={() => setProductsOpen(!productsOpen)}
                      className="flex items-center justify-between w-full px-3 py-2 text-base font-semibold text-charcoal-900 hover:text-forest-800 rounded-lg"
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={cn(
                          "w-5 h-5 transition-transform text-charcoal-400",
                          productsOpen ? "rotate-180" : ""
                        )}
                      />
                    </button>
                    {productsOpen && (
                      <div className="pl-4 pr-2 py-2 space-y-1 bg-cream-50 rounded-lg mt-1">
                        {link.dropdown.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            onClick={onClose}
                            className="block px-3 py-2 text-sm font-medium text-charcoal-700 hover:text-forest-700 hover:bg-cream-100 rounded-md"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={onClose}
                  className="block px-3 py-2.5 text-base font-semibold text-charcoal-800 hover:text-forest-800 hover:bg-cream-100 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-cream-50 border-t border-timber-100 space-y-4">
          <div className="space-y-2 text-xs text-charcoal-600">
            <a
              href={`tel:${SITE_METADATA.phoneClean}`}
              className="flex items-center gap-2 text-forest-800 font-semibold text-sm"
            >
              <Phone className="w-4 h-4 text-timber-600" />
              <span>{SITE_METADATA.phone}</span>
            </a>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-timber-600" />
              <span>{SITE_METADATA.email}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-timber-600 shrink-0 mt-0.5" />
              <span>{SITE_METADATA.address.full}</span>
            </div>
          </div>

          {/* Direct WhatsApp Button */}
          <a
            href={`https://wa.me/919321233436?text=${encodeURIComponent(
              "Hello Ecogest India, I would like to inquire about softwood timber and packaging solutions."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-[#25D366] text-white font-bold text-sm shadow hover:bg-[#20ba59] transition-colors"
          >
            <WhatsAppIcon className="w-5 h-5 fill-white shrink-0" />
            <span>Contact on WhatsApp</span>
          </a>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <Button
              href="/quote"
              variant="secondary"
              size="sm"
              className="w-full text-xs"
              onClick={onClose}
            >
              Get a Quote
            </Button>
            <Button
              href="/contact"
              variant="primary"
              size="sm"
              className="w-full text-xs"
              onClick={onClose}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
