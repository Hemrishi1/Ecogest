"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Send, CheckCircle2, AlertCircle, Loader2, ShieldCheck } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";
import { submitContactForm, ContactFormData } from "@/lib/api";
import { Button } from "@/components/ui/Button";

const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    privacyConsent: false,
  });

  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [honeypot, setHoneypot] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

    const res = await submitContactForm({
      ...formData,
      turnstileToken: turnstileToken || "dev-turnstile-token",
      honeypot,
    });

    setLoading(false);

    if (res.success) {
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
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
      <div className="bg-forest-50 border border-forest-200 rounded-2xl p-8 text-center space-y-4">
        <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto text-forest-700">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-forest-900">
          Message Received
        </h3>
        <p className="text-charcoal-600 max-w-md mx-auto text-sm leading-relaxed">
          Thank you for contacting Ecogest India. Our team will review your message and reach back to you shortly.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-4 text-xs font-semibold uppercase tracking-wider text-timber-700 hover:text-timber-800 underline underline-offset-4"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-timber-100 shadow-card p-6 sm:p-8 space-y-5"
    >
      <h3 className="font-serif text-2xl font-bold text-forest-900">
        Send Us a Message
      </h3>
      <p className="text-sm text-charcoal-500">
        Fill out the details below and our team will get in touch with you.
      </p>

      {error && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Hidden Honeypot Field */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact_website_hp">Leave this empty</label>
        <input
          id="contact_website_hp"
          type="text"
          name="website_hp"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            placeholder="John Doe"
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
            placeholder="john@company.com"
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
            placeholder="+91 98765 43210"
            className="w-full px-4 py-2.5 rounded-lg border border-charcoal-200 text-sm focus:outline-none focus:ring-2 focus:ring-timber-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
            Company Name
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Acme Industrial Ltd."
            className="w-full px-4 py-2.5 rounded-lg border border-charcoal-200 text-sm focus:outline-none focus:ring-2 focus:ring-timber-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
          Subject
        </label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Softwood lumber supply enquiry"
          className="w-full px-4 py-2.5 rounded-lg border border-charcoal-200 text-sm focus:outline-none focus:ring-2 focus:ring-timber-500 focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
          Your Message *
        </label>
        <textarea
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Please describe your requirements, specifications, or inquiry..."
          className="w-full px-4 py-2.5 rounded-lg border border-charcoal-200 text-sm focus:outline-none focus:ring-2 focus:ring-timber-500 focus:border-transparent transition-all resize-none"
        />
      </div>

      {/* Privacy Consent Checkbox */}
      <div className="flex items-start gap-2.5 pt-1">
        <input
          type="checkbox"
          id="contact-privacy"
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
        <label htmlFor="contact-privacy" className="text-xs text-charcoal-600 leading-relaxed cursor-pointer">
          I consent to the collection and processing of my business contact information as outlined in the{" "}
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
        variant="primary"
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
        {loading ? "Sending Message..." : "Submit Message"}
      </Button>
    </form>
  );
}
