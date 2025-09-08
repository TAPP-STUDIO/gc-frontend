'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface DashboardButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export const DashboardButton: React.FC<DashboardButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className,
  icon
}) => {
  const baseStyles = 'relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg overflow-hidden';
  
  const variants = {
    primary: `
      bg-white/20 
      text-white 
      border border-white/30
      hover:bg-white/30 
      hover:border-white/50
      hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]
      active:scale-95
    `,
    secondary: `
      bg-[#1E3A3A]/50 
      text-white 
      border border-white/10
      hover:bg-[#2A4A4A]/50 
      hover:border-white/20
      hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]
    `,
    outline: `
      bg-transparent 
      text-white 
      border border-white/30
      hover:bg-white/10 
      hover:border-white/50
      hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]
    `,
    ghost: `
      bg-transparent 
      text-white/70 
      hover:bg-white/10 
      hover:text-white
    `
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

// Export specific button variants for convenience
export const PrimaryButton: React.FC<Omit<DashboardButtonProps, 'variant'>> = (props) => (
  <DashboardButton {...props} variant="primary" />
);

export const SecondaryButton: React.FC<Omit<DashboardButtonProps, 'variant'>> = (props) => (
  <DashboardButton {...props} variant="secondary" />
);

export const OutlineButton: React.FC<Omit<DashboardButtonProps, 'variant'>> = (props) => (
  <DashboardButton {...props} variant="outline" />
);

export const GhostButton: React.FC<Omit<DashboardButtonProps, 'variant'>> = (props) => (
  <DashboardButton {...props} variant="ghost" />
);
