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
    <div className={`bg-[#151515] rounded-lg p-4 sm:p-6 h-full flex flex-col ${className}`}>
      {/* Mobile: Stack vertically, Desktop: Side by side */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 sm:gap-6 flex-1">
        {/* Left side - Next claim info */}
        <div className="flex-1 space-y-3 sm:space-y-4">
          <h3 className="text-base sm:text-lg font-medium text-white">{title}</h3>
          
          {/* Datum - responsive velikost */}
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
            {date}
          </div>
          
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm text-[#666666]">
              <span>Pokrok</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-[#333333] rounded-full h-2">
              <div 
                className="bg-[#F9D523] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right side - Claim button */}
        <div className="flex flex-col items-center lg:items-end justify-center space-y-2">
          <div className="text-sm sm:text-base font-medium text-white">
            Claim
          </div>
          
          <Button
            onClick={onClaim}
            disabled={loading}
            className="bg-[#F9D523] hover:bg-[#e3c320] text-[#151515] font-bold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base whitespace-nowrap"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-[#151515] border-t-transparent rounded-full animate-spin" />
                <span>Claim...</span>
              </div>
            ) : (
              `CLAIM ${amount.toLocaleString()} $`
            )}
          </Button>
        </div>
      </div>
      
      {/* Mobile enhancement - dodatečná sekce */}
      <div className="mt-4 pt-4 border-t border-[#333333] lg:hidden">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-[#666666] mb-1">Částka</div>
            <div className="text-white font-semibold">{amount.toLocaleString()} $</div>
          </div>
          <div>
            <div className="text-[#666666] mb-1">Stav</div>
            <div className="text-[#F9D523] font-semibold">
              {progress >= 100 ? 'Připraveno' : 'Čeká'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};