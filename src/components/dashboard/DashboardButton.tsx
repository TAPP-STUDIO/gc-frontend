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
  const baseStyles = 'relative inline-flex items-center justify-center font-medium rounded-xl overflow-hidden cursor-pointer transform-gpu';
  
  const variants = {
    primary: `
      bg-white/10 
      text-white 
      border border-white/30
      backdrop-filter backdrop-blur-md
      hover:bg-gradient-to-r hover:from-[#B29819] hover:to-[#F9D523]
      hover:text-[#151515]
      hover:border-[#F9D523]
      hover:shadow-[0_0_30px_rgba(249,213,35,0.4)]
      active:scale-95
      transition-all duration-500
    `,
    secondary: `
      bg-white/10 
      text-white 
      border border-white/20
      backdrop-filter backdrop-blur-md
      hover:bg-gradient-to-r hover:from-[#B29819] hover:to-[#F9D523]
      hover:text-[#151515]
      hover:border-[#F9D523]
      hover:shadow-[0_0_20px_rgba(249,213,35,0.3)]
      transition-all duration-500
    `,
    outline: `
      bg-transparent 
      text-white 
      border border-white/30
      backdrop-filter backdrop-blur-md
      hover:bg-gradient-to-r hover:from-[#B29819] hover:to-[#F9D523]
      hover:text-[#151515]
      hover:border-[#F9D523]
      hover:shadow-[0_0_20px_rgba(249,213,35,0.3)]
      transition-all duration-500
    `,
    ghost: `
      bg-transparent 
      text-white/70 
      hover:bg-gradient-to-r hover:from-[#B29819] hover:to-[#F9D523]
      hover:text-[#151515]
      transition-all duration-300
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
