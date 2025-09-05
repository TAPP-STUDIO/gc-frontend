'use client';

import React from 'react';
import Link from 'next/link';

interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'premium' | 'glass' | 'verified' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
  external?: boolean;
}

const buttonVariants = {
  premium: 'unified-button',
  glass: 'unified-button', 
  verified: 'verified-badge',
  outline: 'unified-button'
};

const buttonSizes = {
  sm: 'unified-button-sm',
  md: 'unified-button-md',
  lg: 'unified-button-lg'
};

const verifiedSizes = {
  sm: 'verified-badge-sm',
  md: 'verified-badge-md',
  lg: 'verified-badge-lg'
};

export const PremiumButton: React.FC<PremiumButtonProps> = ({
  variant = 'premium',
  size = 'md',
  className = '',
  children,
  href,
  external = false,
  disabled = false,
  ...props
}) => {
  const baseClasses = [
    buttonVariants[variant],
    variant === 'verified' ? verifiedSizes[size] : buttonSizes[size],
    variant === 'verified' ? 'inline-flex items-center justify-center transition-all duration-400 focus:outline-none focus:ring-4 focus:ring-teal-400/40' : 'inline-flex items-center justify-center font-medium transition-all duration-400 focus:outline-none focus:ring-4 focus:ring-teal-400/40',
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className
  ].filter(Boolean).join(' ');

  // If href is provided, render as a link
  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
        >
          <span>{children}</span>
        </a>
      );
    }
    
    // For internal links, use Next.js Link
    return (
      <Link
        href={href}
        className={baseClasses}
      >
        <span>{children}</span>
      </Link>
    );
  }

  // Render as button
  return (
    <button
      className={baseClasses}
      disabled={disabled}
      {...props}
    >
      <span>{children}</span>
    </button>
  );
};

// Export individual variants for convenience
export const VerifiedBadge: React.FC<Omit<PremiumButtonProps, 'variant'>> = (props) => (
  <PremiumButton variant="verified" {...props} />
);

export const PremiumCTA: React.FC<Omit<PremiumButtonProps, 'variant'>> = (props) => (
  <PremiumButton variant="premium" {...props} />
);

export const GlassCTA: React.FC<Omit<PremiumButtonProps, 'variant'>> = (props) => (
  <PremiumButton variant="glass" {...props} />
);

export const OutlineCTA: React.FC<Omit<PremiumButtonProps, 'variant'>> = (props) => (
  <PremiumButton variant="outline" {...props} />
);