import { MetadataRoute } from "next";
import { SITE_METADATA } from "@/content/site-content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_METADATA.siteUrl}/sitemap.xml`,
  };
}
