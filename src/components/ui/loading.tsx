'use client';

import React from 'react';
import { Loader2, RefreshCw } from 'lucide-react';

interface LoadingSpinnerProps {
  variant?: 'page' | 'button' | 'inline' | 'overlay';
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'red';
  text?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  variant = 'inline',
  size = 'md',
  color = 'primary',
  text,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const colorClasses = {
    primary: 'text-red-500',
    white: 'text-white',
    red: 'text-red-500'
  };

  const spinner = (
    <Loader2 className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin`} />
  );

  switch (variant) {
    case 'page':
      return (
        <div className={`fixed inset-0 bg-[#0a0a0a]/80 backdrop-blur-sm flex items-center justify-center z-50 ${className}`}>
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-12 h-12 text-red-500 animate-spin" />
            {text && (
              <p className="text-white text-lg font-medium">{text}</p>
            )}
          </div>
        </div>
      );

    case 'overlay':
      return (
        <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-lg ${className}`}>
          <div className="flex flex-col items-center space-y-2">
            {spinner}
            {text && (
              <p className="text-white text-sm">{text}</p>
            )}
          </div>
        </div>
      );

    case 'button':
      return (
        <div className={`flex items-center space-x-2 ${className}`}>
          {spinner}
          {text && <span>{text}</span>}
        </div>
      );

    default:
      return (
        <div className={`flex items-center space-x-2 ${className}`}>
          {spinner}
          {text && <span className="text-white">{text}</span>}
        </div>
      );
  }
};

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  width,
  height,
  lines = 1
}) => {
  const baseClasses = 'animate-pulse bg-white/10 rounded';
  
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg'
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseClasses} ${variantClasses[variant]} ${
              index === lines - 1 ? 'w-3/4' : 'w-full'
            }`}
            style={index === 0 ? style : {}}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
};

interface SkeletonTableProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export const SkeletonTable: React.FC<SkeletonTableProps> = ({
  rows = 5,
  columns = 4,
  className = ''
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton key={`header-${index}`} width="60%" height={16} />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          className="grid gap-4 py-2"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={`cell-${rowIndex}-${colIndex}`}
              width={colIndex === 0 ? "80%" : "100%"}
              height={20}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

interface ButtonLoadingProps {
  isLoading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const ButtonLoading: React.FC<ButtonLoadingProps> = ({
  isLoading = false,
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button'
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500',
    secondary: 'bg-white/10 hover:bg-white/20 text-white focus:ring-white/50',
    outline: 'border border-white/30 hover:border-red-500 hover:bg-red-500/10 text-white focus:ring-red-500',
    ghost: 'hover:bg-white/10 text-white focus:ring-white/50'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {isLoading && (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      )}
      {children}
    </button>
  );
};

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'red' | 'green' | 'blue' | 'yellow';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showPercentage = true,
  color = 'red',
  size = 'md',
  className = ''
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const colorClasses = {
    red: 'bg-red-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    yellow: 'bg-yellow-500'
  };

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-white/80 text-sm">{label}</span>}
          {showPercentage && (
            <span className="text-white/60 text-sm">{percentage.toFixed(1)}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-white/10 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export { RefreshCw as RefreshIcon };
