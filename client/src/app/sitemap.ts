import { MetadataRoute } from "next";
import { SITE_METADATA } from "@/content/site-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_METADATA.siteUrl;

  const routes = [
    "",
    "/about",
    "/timber",
    "/manufacturing",
    "/pallets",
    "/industrial-products",
    "/quality",
    "/industries",
    "/contact",
    "/quote",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route === "/quote" || route === "/contact" ? 0.9 : 0.8,
  }));
}
