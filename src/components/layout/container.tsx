import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl"; // různá max šířka
  fluid?: boolean; // pokud true, full width bez max-width
}

export function Container({ children, className = "", size = "md", fluid = false }: ContainerProps) {
  // Tailwind max-width podle size
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <div
      className={`
        mx-auto 
        px-4 sm:px-6 md:px-8
        ${fluid ? "w-full max-w-full" : maxWidthClasses[size]} 
        ${className}
      `}
    >
      {children}
    </div>
  );
}