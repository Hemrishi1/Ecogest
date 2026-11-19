"use client";

import React, { useState } from "react";
import { Phone, X } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { SITE_METADATA } from "@/content/site-content";

export function FloatingContact() {
  const [showCallOption, setShowCallOption] = useState(false);

  const whatsappUrl = `https://wa.me/919321233436?text=${encodeURIComponent(
    "Hello Ecogest India Team, I am interested in imported softwood timber and industrial wooden packaging solutions."
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Secondary Quick Call Button (Toggled) */}
      {showCallOption && (
        <a
          href={`tel:${SITE_METADATA.phoneClean}`}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-forest-800 text-cream-50 shadow-xl border border-forest-600 hover:bg-forest-900 transition-all duration-200 hover:scale-105 animate-in fade-in slide-in-from-bottom-2"
          aria-label="Direct Phone Call"
        >
          <Phone className="w-4 h-4 text-timber-300 fill-current" />
          <span className="text-xs font-semibold whitespace-nowrap">
            Call: {SITE_METADATA.phone}
          </span>
        </a>
      )}

      <div className="flex items-center gap-2">
        {/* Toggle phone popup */}
        <button
          onClick={() => setShowCallOption(!showCallOption)}
          className="w-10 h-10 rounded-full bg-forest-800 hover:bg-forest-900 text-cream-50 shadow-md border border-forest-700 flex items-center justify-center transition-transform hover:scale-110"
          aria-label="Toggle Phone option"
          title={showCallOption ? "Close phone option" : "Direct phone call"}
        >
          {showCallOption ? (
            <X className="w-4 h-4" />
          ) : (
            <Phone className="w-4 h-4 text-timber-300" />
          )}
        </button>

        {/* Primary Direct "Contact on WhatsApp" Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] text-white shadow-2xl hover:bg-[#20ba59] transition-all duration-300 hover:scale-105 hover:shadow-[#25D366]/40 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 border-2 border-white/20"
          aria-label="Contact on WhatsApp"
        >
          <div className="relative">
            <WhatsAppIcon className="w-6 h-6 fill-white" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
          </div>
          <span className="text-sm font-bold tracking-wide whitespace-nowrap drop-shadow-sm">
            Contact on WhatsApp
          </span>
        </a>
      </div>
    </div>
  );
}
