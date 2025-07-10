import React from 'react';
import { cn } from '@/lib/utils';
import { BaseProps } from '@/lib/types';

interface GridProps extends BaseProps {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  responsive?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

const colsClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  12: 'grid-cols-12'
};

const gapClasses = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  xxl: 'gap-12'
};

export const Grid: React.FC<GridProps> = ({
  cols = 1,
  gap = 'md',
  responsive,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'grid',
        colsClasses[cols],
        gapClasses[gap],
        responsive?.sm && `sm:grid-cols-${responsive.sm}`,
        responsive?.md && `md:grid-cols-${responsive.md}`,
        responsive?.lg && `lg:grid-cols-${responsive.lg}`,
        responsive?.xl && `xl:grid-cols-${responsive.xl}`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};