import React from 'react';
import { cn } from '@/lib/utils';
import {ClickableProps, LoadingProps, Size, Variant } from '@/lib/types';

interface ButtonProps extends ClickableProps, LoadingProps {
  variant?: Variant;
  size?: Size;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const buttonVariants = {
  primary: 'bg-[#F9D523] text-[#151515] hover:bg-[#e3c320] border-transparent',
  secondary: 'bg-[#333333] text-white hover:bg-[#444444] border-[#333333]',
  outline: 'bg-transparent text-[#F9D523] hover:bg-[#F9D523] hover:text-[#151515] border-[#F9D523]',
  ghost: 'bg-transparent text-white hover:bg-[#333333] border-transparent',
  danger: 'bg-[#EF4444] text-white hover:bg-[#DC2626] border-transparent'
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  loading = false,
  disabled = false,
  className,
  children,
  onClick,
  type = 'button',
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        // Base styles
        'inline-flex items-center justify-center font-semibold rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#F9D523] focus:ring-offset-2 focus:ring-offset-[#151515]',
        // Variant styles
        buttonVariants[variant],
        // Size styles
        buttonSizes[size],
        // Width
        fullWidth ? 'w-full' : 'w-auto',
        // Disabled state
        isDisabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      
      {icon && iconPosition === 'left' && !loading && (
        <span className={cn('mr-2', children ? 'mr-2' : 'mr-0')}>
          {icon}
        </span>
      )}
      
      {children}
      
      {icon && iconPosition === 'right' && !loading && (
        <span className={cn('ml-2', children ? 'ml-2' : 'ml-0')}>
          {icon}
        </span>
      )}
    </button>
  );
};