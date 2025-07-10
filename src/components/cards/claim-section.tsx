import React from 'react';
import { Button } from '../ui/button';

interface ClaimSectionProps {
  title: string;
  date: string;
  amount: number;
  progress: number;
  onClaim?: () => void;
  loading?: boolean;
  className?: string;
}

export const ClaimSection: React.FC<ClaimSectionProps> = ({
  title,
  date,
  amount,
  progress,
  onClaim,
  loading = false,
  className = ""
}) => {
  return (
    <div className={`bg-[#151515] rounded-lg p-6 ${className}`}>
      <div className="grid grid-cols-2 gap-6">
        {/* Left side - Next claim info */}
        <div>
          <h3 className="text-lg font-medium text-white mb-4">{title}</h3>
          <div className="text-3xl font-bold text-white mb-4">{date}</div>
          
          {/* Progress bar */}
          <div className="w-full bg-[#333333] rounded-full h-2">
            <div 
              className="bg-[#F9D523] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Right side - Claim button */}
        <div className="flex flex-col justify-center items-center">
          <div className="text-lg font-medium text-white mb-2">Claim</div>
          <Button
            onClick={onClaim}
            loading={loading}
            size="lg"
            className="bg-[#F9D523] hover:bg-[#e3c320] text-[#151515] font-bold px-8 py-4 text-xl min-w-[200px]"
          >
            CLAIM {amount.toLocaleString()} $
          </Button>
        </div>
      </div>
    </div>
  );
};