import type { Metadata } from "next";
import "@/styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { constructMetadata, getOrganizationSchema } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Premium Imported Softwood Timber & Industrial Packaging Solutions",
  description:
    "Ecogest India Pvt. Ltd. is a trusted supplier of imported European softwood timber and industrial wood packaging solutions including two-way and four-way pallets, boxes, and cable drums in India.",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = getOrganizationSchema();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-cream-50 text-charcoal-900 font-sans antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
