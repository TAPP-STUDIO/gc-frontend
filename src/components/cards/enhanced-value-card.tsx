import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { formatCurrency, formatPercentage } from '@/lib/utils';

interface EnhancedValueCardProps {
  title: string;
  value: string | number;
  formatter?: (value: string | number) => string;
  trend?: {
    value: number;
    direction: 'up' | 'down';
    period?: string;
  };
  action?: {
    label: string;
    onClick: () => void;
  };
  loading?: boolean;
  icon?: React.ReactNode;
  status?: 'default' | 'success' | 'warning' | 'error';
  className?: string;
}

export const EnhancedValueCard: React.FC<EnhancedValueCardProps> = ({
  title,
  value,
  formatter = (v) => typeof v === 'number' ? formatCurrency(v) : String(v),
  trend,
  action,
  loading = false,
  icon,
  status = 'default',
  className
}) => {
  const trendColor = trend?.direction === 'up' ? 'text-[#10B981]' : 'text-[#EF4444]';
  const trendIcon = trend?.direction === 'up' ? '↗' : '↘';

  if (loading) {
    return (
      <Card className={className}>
        <div className="space-y-3">
          <div className="h-4 bg-[#333333] rounded w-1/2"></div>
          <div className="h-8 bg-[#333333] rounded w-3/4"></div>
          <div className="h-4 bg-[#333333] rounded w-1/3"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          {icon && <span className="text-[#F9D523]">{icon}</span>}
          <h3 className="text-lg font-medium text-white">{title}</h3>
        </div>
        {status !== 'default' && (
          <Badge variant={status} size="sm">
            {status}
          </Badge>
        )}
      </div>

      <div className="space-y-2">
        <div className="text-4xl font-bold text-white">
          {formatter(value)}
        </div>
        
        {trend && (
          <div className={`flex items-center text-sm ${trendColor}`}>
            <span className="mr-1">{trendIcon}</span>
            <span>{formatPercentage(Math.abs(trend.value))}</span>
            {trend.period && (
              <span className="text-[#666666] ml-1">za {trend.period}</span>
            )}
          </div>
        )}
        
        {action && (
          <button
            onClick={action.onClick}
            className="mt-3 text-[#F9D523] hover:text-[#e3c320] text-sm font-medium transition-colors"
          >
            {action.label}
          </button>
        )}
      </div>
    </Card>
  );
};