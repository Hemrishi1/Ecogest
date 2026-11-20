"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Mail,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { NAVIGATION_LINKS, SITE_METADATA } from "@/content/site-content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 180);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 20);

      // Disappear when scrolling down, reappear when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setIsVisible(false);
        setDropdownOpen(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top Utility Bar with Continuous Circular Ticker (including Contact Details) */}
      <div className="bg-forest-900 text-cream-100 text-xs py-2 border-b border-forest-800 overflow-hidden">
        <div className="w-full overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,black_2%,black_98%,transparent)]">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused] cursor-default">
            {/* Set 1 */}
            <div className="flex items-center gap-8 pr-8 shrink-0">
              <span className="flex items-center gap-1.5 text-timber-200 whitespace-nowrap">
                <ShieldCheck className="w-3.5 h-3.5 text-timber-300 shrink-0" />
                European Softwood Timber Sourcing • ISPM-15 Export Standards
              </span>

              <span className="text-forest-700 select-none">•</span>

              <a
                href={`https://wa.me/919321233436?text=${encodeURIComponent(
                  "Hello Ecogest India, I would like to inquire about softwood timber and packaging solutions."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-[#25D366] transition-colors whitespace-nowrap text-cream-100"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                <span>WhatsApp: +91 9321233436</span>
              </a>

              <span className="text-forest-700 select-none">•</span>

              <a
                href={`tel:${SITE_METADATA.phoneClean}`}
                className="flex items-center gap-1.5 hover:text-timber-300 transition-colors whitespace-nowrap text-cream-100"
              >
                <Phone className="w-3.5 h-3.5 text-timber-400 shrink-0" />
                <span>Call: {SITE_METADATA.phone}</span>
              </a>

              <span className="text-forest-700 select-none">•</span>

              <a
                href={`mailto:${SITE_METADATA.email}`}
                className="flex items-center gap-1.5 hover:text-timber-300 transition-colors whitespace-nowrap text-cream-100"
              >
                <Mail className="w-3.5 h-3.5 text-timber-400 shrink-0" />
                <span>{SITE_METADATA.email}</span>
              </a>

              <span className="text-forest-700 select-none">•</span>

              <span className="flex items-center gap-1.5 text-timber-200 whitespace-nowrap">
                <ShieldCheck className="w-3.5 h-3.5 text-timber-300 shrink-0" />
                Direct Softwood Lumber Imports from Europe & South America
              </span>

              <span className="text-forest-700 select-none">•</span>

              <span className="flex items-center gap-1.5 text-timber-200 whitespace-nowrap">
                <ShieldCheck className="w-3.5 h-3.5 text-timber-300 shrink-0" />
                Heat-Treated Industrial Wooden Pallets & Packaging Solutions
              </span>

              <span className="text-forest-700 select-none">•</span>
            </div>

            {/* Set 2 (Exact Duplicate for Seamless Continuous Circular Loop) */}
            <div className="flex items-center gap-8 pr-8 shrink-0" aria-hidden="true">
              <span className="flex items-center gap-1.5 text-timber-200 whitespace-nowrap">
                <ShieldCheck className="w-3.5 h-3.5 text-timber-300 shrink-0" />
                European Softwood Timber Sourcing • ISPM-15 Export Standards
              </span>

              <span className="text-forest-700 select-none">•</span>

              <a
                href={`https://wa.me/919321233436?text=${encodeURIComponent(
                  "Hello Ecogest India, I would like to inquire about softwood timber and packaging solutions."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-[#25D366] transition-colors whitespace-nowrap text-cream-100"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                <span>WhatsApp: +91 9321233436</span>
              </a>

              <span className="text-forest-700 select-none">•</span>

              <a
                href={`tel:${SITE_METADATA.phoneClean}`}
                className="flex items-center gap-1.5 hover:text-timber-300 transition-colors whitespace-nowrap text-cream-100"
              >
                <Phone className="w-3.5 h-3.5 text-timber-400 shrink-0" />
                <span>Call: {SITE_METADATA.phone}</span>
              </a>

              <span className="text-forest-700 select-none">•</span>

              <a
                href={`mailto:${SITE_METADATA.email}`}
                className="flex items-center gap-1.5 hover:text-timber-300 transition-colors whitespace-nowrap text-cream-100"
              >
                <Mail className="w-3.5 h-3.5 text-timber-400 shrink-0" />
                <span>{SITE_METADATA.email}</span>
              </a>

              <span className="text-forest-700 select-none">•</span>

              <span className="flex items-center gap-1.5 text-timber-200 whitespace-nowrap">
                <ShieldCheck className="w-3.5 h-3.5 text-timber-300 shrink-0" />
                Direct Softwood Lumber Imports from Europe & South America
              </span>

              <span className="text-forest-700 select-none">•</span>

              <span className="flex items-center gap-1.5 text-timber-200 whitespace-nowrap">
                <ShieldCheck className="w-3.5 h-3.5 text-timber-300 shrink-0" />
                Heat-Treated Industrial Wooden Pallets & Packaging Solutions
              </span>

              <span className="text-forest-700 select-none">•</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-300 ease-in-out w-full",
          isVisible ? "translate-y-0" : "-translate-y-full shadow-none pointer-events-none",
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
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        if (timeoutRef.current) clearTimeout(timeoutRef.current);
                        setDropdownOpen((prev) => !prev);
                      }}
                      aria-expanded={dropdownOpen}
                      aria-haspopup="true"
                      className={cn(
                        "flex items-center gap-1 px-2.5 xl:px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap cursor-pointer",
                        isActive || dropdownOpen
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

                    {/* Dropdown Menu Container with seamless hover bridge */}
                    <div
                      className={cn(
                        "absolute top-full left-0 pt-2 w-72 transition-all duration-200 z-50",
                        dropdownOpen
                          ? "opacity-100 visible pointer-events-auto translate-y-0"
                          : "opacity-0 invisible pointer-events-none translate-y-1"
                      )}
                    >
                      <div className="bg-white rounded-xl shadow-elevated border border-timber-100 p-2">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setDropdownOpen(false)}
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
