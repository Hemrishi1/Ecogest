import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Compass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 bg-cream-50">
      <Container className="text-center space-y-6 max-w-xl">
        <div className="w-20 h-20 bg-timber-100 text-timber-700 rounded-3xl flex items-center justify-center mx-auto shadow-sm border border-timber-200">
          <Compass className="w-10 h-10" />
        </div>

        <span className="inline-block px-3.5 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-bold uppercase tracking-wider">
          404 - Page Not Found
        </span>

        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-forest-900">
          We Couldn&apos;t Find That Page
        </h1>

        <p className="text-charcoal-600 text-base leading-relaxed">
          The requested page could not be located. It might have been moved, renamed, or temporarily unavailable. Explore our timber solutions or return home.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Button href="/" variant="primary" size="md" icon={<Home className="w-4 h-4" />}>
            Back to Homepage
          </Button>
          <Button href="/contact" variant="outline" size="md">
            Contact Support
          </Button>
        </div>

        <div className="pt-8 border-t border-timber-200 text-xs text-charcoal-500">
          Popular destinations:{" "}
          <Link href="/timber" className="text-timber-700 underline mx-1 hover:text-timber-900">
            Softwood Timber
          </Link>
          •
          <Link href="/pallets" className="text-timber-700 underline mx-1 hover:text-timber-900">
            Wooden Pallets
          </Link>
          •
          <Link href="/manufacturing" className="text-timber-700 underline mx-1 hover:text-timber-900">
            Industrial Packaging
          </Link>
        </div>
      </Container>
    </div>
  );
}
