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
  premium: 'cta-button-premium',
  glass: 'cta-button-glass', 
  verified: 'verified-badge',
  outline: 'btn-premium-outline'
};

const buttonSizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg'
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
    buttonSizes[size],
    'inline-flex items-center justify-center font-bold transition-all duration-400 focus:outline-none focus:ring-4 focus:ring-teal-400/40',
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
          {children}
        </a>
      );
    }
    
    // For internal links, use Next.js Link
    return (
      <Link
        href={href}
        className={baseClasses}
      >
        {children}
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
      {children}
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