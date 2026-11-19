"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "white";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  external,
  icon,
  iconPosition = "right",
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed group shadow-sm";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-6 py-3.5 gap-2.5 font-semibold",
  };

  const variantStyles = {
    primary:
      "bg-forest-700 text-cream-50 hover:bg-forest-800 focus:ring-forest-600 shadow-forest-900/10 hover:shadow-md hover:-translate-y-0.5",
    secondary:
      "bg-timber-600 text-cream-50 hover:bg-timber-700 focus:ring-timber-500 shadow-timber-900/10 hover:shadow-md hover:-translate-y-0.5",
    outline:
      "bg-transparent border border-forest-700 text-forest-800 hover:bg-forest-50 focus:ring-forest-600",
    ghost:
      "bg-transparent text-charcoal-700 hover:text-forest-800 hover:bg-timber-100/50 shadow-none",
    white:
      "bg-cream-50 text-forest-900 hover:bg-white hover:text-forest-950 focus:ring-cream-200 shadow-md hover:-translate-y-0.5",
  };

  const combinedClasses = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className="transition-transform group-hover:-translate-x-0.5">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span className="transition-transform group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {content}
    </button>
  );
}
