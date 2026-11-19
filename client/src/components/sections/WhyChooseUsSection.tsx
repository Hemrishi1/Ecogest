import React from "react";
import { Globe, Truck, Award, Headphones } from "lucide-react";
import { ABOUT_CONTENT } from "@/content/site-content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const ICON_MAP: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-7 h-7 text-forest-700" />,
  Truck: <Truck className="w-7 h-7 text-forest-700" />,
  Award: <Award className="w-7 h-7 text-forest-700" />,
  Headphones: <Headphones className="w-7 h-7 text-forest-700" />,
};

interface WhyChooseUsProps {
  dark?: boolean;
}

export function WhyChooseUsSection({ dark = false }: WhyChooseUsProps) {
  const { whyChooseUs } = ABOUT_CONTENT;

  return (
    <section className={dark ? "py-16 sm:py-24 bg-forest-900 text-cream-50" : "py-16 sm:py-24 bg-cream-50"}>
      <Container>
        <SectionHeading
          badge="Our Competitive Edge"
          title={whyChooseUs.heading}
          description="Built on direct European relationships and reliable Indian industrial delivery."
          dark={dark}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUs.items.map((item, idx) => (
            <Card
              key={idx}
              className={
                dark
                  ? "bg-forest-950/70 border-forest-700 p-6 flex flex-col justify-between"
                  : "bg-white p-6 flex flex-col justify-between border-timber-200"
              }
            >
              <div>
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${
                    dark ? "bg-forest-800 text-timber-300" : "bg-timber-50 text-forest-800 border border-timber-200"
                  }`}
                >
                  {ICON_MAP[item.icon]}
                </div>
                <h3
                  className={`font-serif text-lg font-bold mb-3 ${
                    dark ? "text-cream-50" : "text-forest-900"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    dark ? "text-charcoal-300" : "text-charcoal-600"
                  }`}
                >
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-timber-100/30 flex items-center justify-between text-xs font-semibold text-timber-600">
                <span>0{idx + 1}</span>
                <span className="w-8 h-0.5 bg-timber-400 rounded-full" />
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
