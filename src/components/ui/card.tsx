import React from 'react';
import { cn } from '@/lib/utils';
import { BaseProps } from '@/lib/types';

interface CardProps extends BaseProps {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const cardVariants = {
  default: 'bg-[#151515] border-transparent',
  elevated: 'bg-[#151515] border-transparent shadow-lg',
  outlined: 'bg-[#151515] border-[#333333]'
};

const cardPadding = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-6'
};

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  hover = false,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'rounded-lg border transition-all duration-200',
        cardVariants[variant],
        cardPadding[padding],
        hover && 'hover:border-[#555555] hover:shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};