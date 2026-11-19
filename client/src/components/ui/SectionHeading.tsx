import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
  titleClassName?: string;
  dark?: boolean;
}

export function SectionHeading({
  badge,
  title,
  description,
  align = "center",
  className,
  titleClassName,
  dark = false,
}: SectionHeadingProps) {
  const alignmentClass =
    align === "center"
      ? "text-center mx-auto"
      : align === "right"
      ? "text-right ml-auto"
      : "text-left";

  return (
    <div className={cn("max-w-3xl mb-12", alignmentClass, className)}>
      {badge && (
        <span
          className={cn(
            "inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 border",
            dark
              ? "bg-forest-800 text-timber-300 border-forest-600"
              : "bg-timber-50 text-timber-700 border-timber-200"
          )}
        >
          {badge}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight mb-4",
          dark ? "text-cream-50" : "text-forest-900",
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-base sm:text-lg leading-relaxed",
            dark ? "text-charcoal-300" : "text-charcoal-600"
          )}
        >
          {description}
        </p>
      )}
      <div
        className={cn(
          "h-1 w-20 rounded-full mt-4",
          dark ? "bg-timber-400" : "bg-timber-500",
          align === "center" ? "mx-auto" : align === "right" ? "ml-auto" : ""
        )}
      />
    </div>
  );
}
