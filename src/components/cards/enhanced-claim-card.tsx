import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { formatCurrency, formatDate } from '@/lib/utils';

interface EnhancedClaimCardProps {
  title: string;
  amount: number;
  nextClaimDate: string | Date;
  progress: number;
  status?: 'available' | 'pending' | 'locked';
  onClaim?: () => void;
  loading?: boolean;
  className?: string;
  estimatedReward?: number;
  lastClaim?: string | Date;
}

const statusConfig = {
  available: {
    color: 'success' as const,
    label: 'Dostupné',
    canClaim: true
  },
  pending: {
    color: 'warning' as const,
    label: 'Čeká se',
    canClaim: false
  },
  locked: {
    color: 'error' as const,
    label: 'Zamčeno',
    canClaim: false
  }
};

export const EnhancedClaimCard: React.FC<EnhancedClaimCardProps> = ({
  title,
  amount,
  nextClaimDate,
  progress,
  status = 'available',
  onClaim,
  loading = false,
  className,
  estimatedReward,
  lastClaim
}) => {
  const config = statusConfig[status];
  const progressVariant = progress >= 100 ? 'success' : 'default';

  return (
    <Card className={className}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <Badge variant={config.color} size="sm">
              {config.label}
            </Badge>
          </div>
          <div className="text-5xl font-bold text-[#F9D523] mb-2">
            {formatCurrency(amount)}
          </div>
        </div>
        
        <Button
          onClick={onClaim}
          disabled={!config.canClaim || loading}
          loading={loading}
          size="lg"
          className="min-w-[100px]"
        >
          CLAIM
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-white">Další claim</span>
            <span className="text-[#666666] text-sm">
              {formatDate(nextClaimDate)}
            </span>
          </div>
          
          <Progress
            value={progress}
            variant={progressVariant}
            showLabel
            label={`${Math.round(progress)}%`}
          />
        </div>

        {estimatedReward && (
          <div className="flex justify-between items-center py-2 border-t border-[#333333]">
            <span className="text-[#666666]">Odhadovaná odměna</span>
            <span className="text-white font-medium">
              {formatCurrency(estimatedReward)}
            </span>
          </div>
        )}

        {lastClaim && (
          <div className="flex justify-between items-center">
            <span className="text-[#666666]">Poslední claim</span>
            <span className="text-white text-sm">
              {formatDate(lastClaim, 'relative')}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
};