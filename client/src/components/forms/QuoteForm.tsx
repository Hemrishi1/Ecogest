"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";
import { submitQuoteForm, QuoteFormData } from "@/lib/api";
import { QUOTE_CONTENT } from "@/content/site-content";
import { Button } from "@/components/ui/Button";

const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

interface QuoteFormProps {
  defaultProduct?: string;
}

export function QuoteForm({ defaultProduct }: QuoteFormProps) {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: "",
    company: "",
    email: "",
    phone: "",
    productInterest: defaultProduct || QUOTE_CONTENT.productOptions[0],
    quantity: "",
    message: "",
    privacyConsent: false,
  });

  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [honeypot, setHoneypot] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.privacyConsent) {
      setError("Please accept the privacy policy to proceed.");
      return;
    }

    if (!turnstileToken && process.env.NODE_ENV === "production") {
      setError("Please complete the security verification challenge.");
      return;
    }

    setLoading(true);
    setError(null);

    const res = await submitQuoteForm({
      ...formData,
      turnstileToken: turnstileToken || "dev-turnstile-token",
      honeypot,
    });

    setLoading(false);

    if (res.success) {
      setSuccess(true);
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        productInterest: defaultProduct || QUOTE_CONTENT.productOptions[0],
        quantity: "",
        message: "",
        privacyConsent: false,
      });
      setTurnstileToken("");
      setHoneypot("");
    } else {
      setError(res.message);
    }
  };

  if (success) {
    return (
      <div className="bg-forest-50 border border-forest-200 rounded-2xl p-8 sm:p-12 text-center space-y-4">
        <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto text-forest-700">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="font-serif text-3xl font-bold text-forest-900">
          Quote Request Submitted
        </h3>
        <p className="text-charcoal-600 max-w-md mx-auto text-sm leading-relaxed">
          Thank you for requesting a quote from Ecogest India. Our commercial and technical team will prepare custom pricing and technical specifications for you shortly.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-4 text-xs font-semibold uppercase tracking-wider text-timber-700 hover:text-timber-800 underline underline-offset-4"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-timber-100 shadow-card p-6 sm:p-10 space-y-6"
    >
      <div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900">
          Request a Custom Quote
        </h3>
        <p className="text-sm text-charcoal-500 mt-1">
          Tell us about your timber sourcing or wooden packaging requirements.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Hidden Honeypot Field */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="quote_website_hp">Leave this empty</label>
        <input
          id="quote_website_hp"
          type="text"
          name="website_hp"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Ram Prasad"
            className="w-full px-4 py-2.5 rounded-lg border border-charcoal-200 text-sm focus:outline-none focus:ring-2 focus:ring-timber-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
            Company Name *
          </label>
          <input
            type="text"
            name="company"
            required
            value={formData.company}
            onChange={handleChange}
            placeholder="Acme Industrial Logistics"
            className="w-full px-4 py-2.5 rounded-lg border border-charcoal-200 text-sm focus:outline-none focus:ring-2 focus:ring-timber-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
            Work Email *
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="ram@company.com"
            className="w-full px-4 py-2.5 rounded-lg border border-charcoal-200 text-sm focus:outline-none focus:ring-2 focus:ring-timber-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98xxxxxx56"
            className="w-full px-4 py-2.5 rounded-lg border border-charcoal-200 text-sm focus:outline-none focus:ring-2 focus:ring-timber-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
            Product / Category Interest *
          </label>
          <select
            name="productInterest"
            required
            value={formData.productInterest}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-charcoal-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-timber-500 focus:border-transparent transition-all cursor-pointer"
          >
            {QUOTE_CONTENT.productOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
            Estimated Quantity / Dimensions
          </label>
          <input
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="e.g. 500 pallets or 50 m³ timber"
            className="w-full px-4 py-2.5 rounded-lg border border-charcoal-200 text-sm focus:outline-none focus:ring-2 focus:ring-timber-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
          Project Details / Specifications *
        </label>
        <textarea
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Please specify timber species, dimensions, load requirements (dynamic/static), heat treatment needs (ISPM-15), delivery location..."
          className="w-full px-4 py-2.5 rounded-lg border border-charcoal-200 text-sm focus:outline-none focus:ring-2 focus:ring-timber-500 focus:border-transparent transition-all resize-none"
        />
      </div>

      {/* Privacy Consent Checkbox */}
      <div className="flex items-start gap-2.5 pt-1">
        <input
          type="checkbox"
          id="quote-privacy"
          required
          checked={formData.privacyConsent}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              privacyConsent: e.target.checked,
            }))
          }
          className="mt-1 h-4 w-4 rounded border-charcoal-300 text-forest-700 focus:ring-forest-600 cursor-pointer"
        />
        <label htmlFor="quote-privacy" className="text-xs text-charcoal-600 leading-relaxed cursor-pointer">
          I consent to the collection and processing of my business details as outlined in the{" "}
          <Link href="/privacy" target="_blank" className="text-forest-700 underline font-medium hover:text-timber-700">
            Privacy Policy
          </Link>
          . *
        </label>
      </div>

      {/* Cloudflare Turnstile Challenge */}
      <div className="pt-1 flex justify-start">
        <Turnstile
          siteKey={TURNSTILE_SITE_KEY}
          onSuccess={(token) => {
            setTurnstileToken(token);
            if (error) setError(null);
          }}
          onError={() => {
            console.warn("[Turnstile] Challenge load error");
          }}
          onExpire={() => setTurnstileToken("")}
        />
      </div>

      <Button
        type="submit"
        variant="secondary"
        size="lg"
        disabled={loading}
        className="w-full"
        icon={
          loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )
        }
      >
        {loading ? "Submitting Quote Request..." : "Request Quotation"}
      </Button>
    </form>
  );
}
