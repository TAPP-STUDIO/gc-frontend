'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'highlighted' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  children,
  className,
  variant = 'default',
  padding = 'md',
  hover = false
}) => {
  const baseStyles = 'relative rounded-2xl transition-all duration-300 overflow-hidden';
  
  const variants = {
    default: `
      backdrop-blur-md 
      border border-white/10
      shadow-xl
    `,
    highlighted: `
      backdrop-blur-lg 
      border border-white/20
      shadow-2xl
    `,
    glass: `
      backdrop-blur-xl 
      border border-white/10
      shadow-2xl
    `
  };

  const backgrounds = {
    default: 'bg-[#001718]/80',
    highlighted: 'bg-gradient-to-br from-[#1A3A3A]/60 to-[#001718]/80',
    glass: 'bg-white/5'
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const hoverStyles = hover ? `
    hover:border-white/30 
    hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] 
    hover:scale-[1.02]
    group
  ` : '';

  return (
    <div
      className={cn(
        baseStyles,
        variants[variant],
        backgrounds[variant],
        paddings[padding],
        hoverStyles,
        className
      )}
    >
      {/* Glass overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Stat Card Component
interface StatCardProps {
  title: string;
  value: string | number;
  badge?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  badge,
  trend,
  className
}) => {
  return (
    <div className={cn(
      'group backdrop-blur-md border border-white/10 rounded-2xl p-6',
      'hover:border-white/20 transition-all duration-300',
      'shadow-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]',
      'hover:scale-[1.02] bg-[#001718]/80',
      className
    )}>
      <div className="flex flex-col space-y-3">
        <p className="text-xs text-white/50 uppercase tracking-wider font-medium">{title}</p>
        <div className="flex items-baseline justify-between">
          <h3 className="text-2xl font-bold text-white">
            {value}
          </h3>
          {trend && (
            <span className={cn(
              'text-xs font-medium flex items-center gap-1',
              trend.isPositive ? 'text-[#4ADE80]' : 'text-[#EF4444]'
            )}>
              <svg 
                className={cn('w-3 h-3', !trend.isPositive && 'rotate-180')}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
              {trend.value}%
            </span>
          )}
        </div>
        {badge && (
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 border border-white/20 self-start">
            <span className="text-white text-xs font-bold uppercase tracking-wider">
              {badge}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// Value Card Component
interface ValueCardProps {
  label: string;
  value: string | number;
  variant?: 'default' | 'active';
  onClick?: () => void;
  className?: string;
}

export const ValueCard: React.FC<ValueCardProps> = ({
  label,
  value,
  variant = 'default',
  onClick,
  className
}) => {
  const isActive = variant === 'active';
  
  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative flex flex-col items-center justify-center p-6 rounded-2xl',
        'backdrop-blur-md border transition-all duration-300 cursor-pointer',
        isActive 
          ? 'border-white/20 shadow-xl bg-gradient-to-br from-[#1A3A3A]/60 to-[#001718]/80' 
          : 'border-white/10 hover:border-white/20 bg-[#001718]/60',
        'hover:scale-[1.05] hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]',
        className
      )}
    >
      <span className="text-3xl font-bold text-white mb-2">
        {value}
      </span>
      <span className="text-xs text-white/50 uppercase tracking-wider text-center font-medium">
        {label}
      </span>
      
      {isActive && (
        <button className="mt-3 px-4 py-1.5 bg-white/20 text-white text-xs font-bold rounded-full hover:bg-white/30 transition-all transform hover:scale-105 shadow-lg border border-white/30">
          AKTÍVNY
        </button>
      )}
      
      {/* Glass overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
    </div>
  );
};

// Info Card
interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  children,
  icon,
  className
}) => {
  return (
    <div className={cn(
      'backdrop-blur-lg border border-white/10 rounded-2xl p-6',
      'bg-[#001718]/70 shadow-xl',
      'hover:border-white/20 transition-all duration-300',
      className
    )}>
      <div className="flex items-start gap-4">
        {icon && (
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
          {children}
        </div>
      </div>
    </div>
  );
};

// Chart Container Card
interface ChartCardProps {
  title: string;
  value?: string | number;
  children: React.ReactNode;
  controls?: React.ReactNode;
  className?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  value,
  children,
  controls,
  className
}) => {
  return (
    <div className={cn(
      'backdrop-blur-lg border border-white/10 rounded-2xl p-6',
      'bg-[#001718]/80 shadow-xl',
      'hover:border-white/20 transition-all duration-300',
      className
    )}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-xs text-white/50 uppercase tracking-wider font-medium mb-2">
            {title}
          </p>
          {value && (
            <h2 className="text-3xl font-bold text-white">
              {value}
            </h2>
          )}
        </div>
        {controls && (
          <div className="flex gap-2">
            {controls}
          </div>
        )}
      </div>
      {children}
    </div>
  );
};
