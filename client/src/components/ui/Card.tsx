import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  bordered?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Card({
  hover = true,
  bordered = true,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl overflow-hidden transition-all duration-300",
        bordered && "border border-timber-100",
        hover && "hover:shadow-card hover:-translate-y-1 hover:border-timber-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
