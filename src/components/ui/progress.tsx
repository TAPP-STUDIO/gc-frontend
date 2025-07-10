import React from 'react';
import { cn } from '@/lib/utils';
import { BaseProps, Status } from '@/lib/types';

interface ProgressProps extends BaseProps {
  value: number;
  max?: number;
  variant?: Status;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
}

const progressVariants = {
  default: 'bg-[#F9D523]',
  success: 'bg-[#10B981]',
  warning: 'bg-[#F59E0B]',
  error: 'bg-[#EF4444]',
  info: 'bg-[#3B82F6]'
};

const progressSizes = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3'
};

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  variant = 'default',
  size = 'md',
  showLabel = false,
  label,
  className,
  ...props
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn('w-full', className)} {...props}>
      {(showLabel || label) && (
        <div className="flex justify-between mb-1">
          <span className="text-sm text-white">
            {label || `${Math.round(percentage)}%`}
          </span>
          {showLabel && !label && (
            <span className="text-sm text-[#666666]">
              {value} / {max}
            </span>
          )}
        </div>
      )}
      
      <div className={cn(
        'w-full bg-[#333333] rounded-full overflow-hidden',
        progressSizes[size]
      )}>
        <div
          className={cn(
            'h-full transition-all duration-300 ease-out rounded-full',
            progressVariants[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};