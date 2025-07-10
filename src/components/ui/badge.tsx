import React from 'react';
import { cn } from '@/lib/utils';
import { BaseProps, Status } from '@/lib/types';

interface BadgeProps extends BaseProps {
  variant?: Status;
  size?: 'sm' | 'md' | 'lg';
}

const badgeVariants = {
  default: 'bg-[#333333] text-white',
  success: 'bg-[#10B981] text-white',
  warning: 'bg-[#F59E0B] text-white',
  error: 'bg-[#EF4444] text-white',
  info: 'bg-[#3B82F6] text-white'
};

const badgeSizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base'
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        badgeVariants[variant],
        badgeSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};