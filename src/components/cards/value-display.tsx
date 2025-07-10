import React from 'react';
import { ChevronRight } from 'lucide-react';

interface ValueDisplayProps {
  title: string;
  value: string | number;
  formatter?: (value: string | number) => string;
  className?: string;
  showButton?: boolean;
  onShowClick?: () => void;
}

export const ValueDisplay: React.FC<ValueDisplayProps> = ({
  title,
  value,
  formatter = (v) => typeof v === 'number' ? `${v.toLocaleString()} $` : String(v),
  className = '',
  showButton = false,
  onShowClick,
}) => {
  return (
    <div className={`rounded-lg p-4 text-center ${className}`}>
      <h3 className="text-lg sm:text-xl font-medium text-white mb-2 sm:mb-4">{title}</h3>
      <div className="text-4xl sm:text-6xl font-bold text-white mb-4">
        {formatter(value)}
      </div>
      {showButton && onShowClick && (
        <button
          onClick={onShowClick}
          className="border border-[#F9D523] text-[#F9D523] px-5 py-1 rounded-full bg-transparent
                     hover:bg-[#F9D523] hover:text-black transition-colors duration-300 flex items-center gap-1 mx-auto"
          type="button"
        >
          Zobrazit <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
};