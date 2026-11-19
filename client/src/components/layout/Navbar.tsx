"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Phone,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { NAVIGATION_LINKS, SITE_METADATA } from "@/content/site-content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-forest-900 text-cream-100 text-xs py-2 border-b border-forest-800 hidden md:block">
        <Container className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-timber-200">
              <ShieldCheck className="w-3.5 h-3.5 text-timber-300" />
              European Softwood Timber Sourcing • ISPM-15 Export Standards
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <a
              href={`https://wa.me/919321233436?text=${encodeURIComponent(
                "Hello Ecogest India, I would like to inquire about softwood timber and packaging solutions."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#25D366] transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp: +91 9321233436</span>
            </a>
            <span className="text-forest-700">|</span>
            <a
              href={`tel:${SITE_METADATA.phoneClean}`}
              className="flex items-center gap-1.5 hover:text-timber-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-timber-400" />
              <span>{SITE_METADATA.phone}</span>
            </a>
            <span className="text-forest-700">|</span>
            <a
              href={`mailto:${SITE_METADATA.email}`}
              className="hover:text-timber-300 transition-colors"
            >
              {SITE_METADATA.email}
            </a>
          </div>
        </Container>
      </div>

      {/* Main Sticky Navigation */}
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-300 w-full",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-timber-100 py-1.5 sm:py-2"
            : "bg-white border-b border-timber-100 py-2 sm:py-3"
        )}
      >
        <Container className="flex items-center justify-between gap-3 max-w-[1440px]">
          {/* Logo */}
          <Link href="/" className="flex items-center group py-0.5 shrink-0">
            <div className="relative w-36 sm:w-44 lg:w-48 h-16 sm:h-20 lg:h-22 transition-transform group-hover:scale-[1.02]">
              <Image
                src="/assets/logo/logo.svg"
                alt="Ecogest India Pvt. Ltd. Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 shrink-0">
            {NAVIGATION_LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));

              if (link.dropdown) {
                return (
                  <div
                    key={link.label}
                    className="relative group"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button
                      className={cn(
                        "flex items-center gap-1 px-2.5 xl:px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
                        isActive
                          ? "text-forest-800 font-semibold bg-timber-50"
                          : "text-charcoal-700 hover:text-forest-800 hover:bg-cream-100"
                      )}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform duration-200 shrink-0",
                          dropdownOpen ? "rotate-180" : ""
                        )}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    <div
                      className={cn(
                        "absolute top-full left-0 w-72 bg-white rounded-xl shadow-elevated border border-timber-100 p-2 transition-all duration-200 z-50",
                        dropdownOpen
                          ? "opacity-100 visible translate-y-1"
                          : "opacity-0 invisible pointer-events-none translate-y-3"
                      )}
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block p-3 rounded-lg hover:bg-cream-100 transition-colors group/item"
                        >
                          <div className="text-sm font-semibold text-charcoal-900 group-hover/item:text-forest-700">
                            {item.label}
                          </div>
                          {item.description && (
                            <p className="text-xs text-charcoal-500 mt-0.5 line-clamp-2">
                              {item.description}
                            </p>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "px-2.5 xl:px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
                    isActive
                      ? "text-forest-800 font-semibold bg-timber-50"
                      : "text-charcoal-700 hover:text-forest-800 hover:bg-cream-100"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center space-x-2 shrink-0">
            <a
              href={`https://wa.me/919321233436?text=${encodeURIComponent(
                "Hello Ecogest India, I would like to inquire about softwood timber and packaging solutions."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-semibold rounded-lg text-xs lg:text-sm px-3 py-2 lg:px-3.5 lg:py-2.5 gap-1.5 bg-[#25D366] text-white hover:bg-[#20ba59] transition-all shadow-sm hover:shadow hover:-translate-y-0.5 whitespace-nowrap"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white shrink-0" />
              <span className="hidden xl:inline">Contact on WhatsApp</span>
              <span className="xl:hidden">WhatsApp</span>
            </a>

            <Button
              href="/quote"
              variant="secondary"
              size="sm"
              icon={<ArrowRight className="w-4 h-4" />}
              className="whitespace-nowrap"
            >
              Get a Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-md text-charcoal-700 hover:text-forest-800 hover:bg-cream-100 lg:hidden focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </Container>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
