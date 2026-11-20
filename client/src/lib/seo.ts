import { Metadata } from "next";
import { SITE_METADATA } from "@/content/site-content";

interface PageSeoProps {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
}

export function constructMetadata({
  title,
  description = SITE_METADATA.description,
  path = "",
  keywords = [],
}: PageSeoProps): Metadata {
  const url = `${SITE_METADATA.siteUrl}${path}`;
  const fullTitle = `${title} | ${SITE_METADATA.companyName}`;

  const defaultKeywords = [
    "Ecogest India",
    "softwood timber India",
    "imported timber supplier",
    "European softwood lumber",
    "wooden pallets manufacturer India",
    "two-way pallets",
    "four-way block pallets",
    "industrial wooden packaging",
    "cable drums",
    "machinery wooden boxes",
    "ISPM-15 certified pallets",
    "kiln-dried sawn timber",
    "Austria timber",
    "Germany timber",
  ];

  return {
    title: fullTitle,
    description,
    keywords: [...keywords, ...defaultKeywords],
    authors: [{ name: SITE_METADATA.companyName }],
    creator: SITE_METADATA.companyName,
    metadataBase: new URL(SITE_METADATA.siteUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url,
      title: fullTitle,
      description,
      siteName: SITE_METADATA.companyName,
      images: [
        {
          url: `${SITE_METADATA.siteUrl}/assets/hero/hero-bg.jpeg`,
          width: 1200,
          height: 600,
          alt: SITE_METADATA.companyName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [`${SITE_METADATA.siteUrl}/assets/hero/hero-bg.jpeg`],
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon.jpeg", type: "image/jpeg" },
        { url: "/favicon.png", type: "image/png" },
      ],
      apple: "/assets/logo/logo-icon.svg",
    },
  };
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_METADATA.legalName,
    alternateName: SITE_METADATA.companyName,
    url: SITE_METADATA.siteUrl,
    logo: `${SITE_METADATA.siteUrl}/assets/logo/logo.svg`,
    description: SITE_METADATA.description,
    telephone: SITE_METADATA.phone,
    email: SITE_METADATA.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_METADATA.address.street,
      addressLocality: SITE_METADATA.address.locality,
      addressRegion: SITE_METADATA.address.state,
      postalCode: SITE_METADATA.address.postalCode,
      addressCountry: "IN",
    },
    sameAs: [
      `https://${SITE_METADATA.website}`,
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE_METADATA.phone,
        contactType: "sales and customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    ],
  };
}
