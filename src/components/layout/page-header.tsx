'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface PageHeaderProps {
  title: string;
  backTo?: string;
  backLabel?: string;
  className?: string;
  showBackButton?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  backTo,
  backLabel = "Dashboard",
  className = "",
  showBackButton = true,
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (backTo) {
      router.push(backTo);
    } else {
      router.back();
    }
  };

  return (
    <div className={`mb-4 ${className}`}>
      {/* Navigační breadcrumb - ŠIPKA + CÍL */}
      {showBackButton && (
        <div className="flex items-center space-x-2 mb-2">
          <button 
            onClick={handleBack}
            className="text-[#666666] hover:text-[#F9D523] transition-colors p-1 rounded-md hover:bg-white/5 flex items-center space-x-2"
            aria-label={`Zpět na ${backLabel}`}
          >
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
            <span className="text-sm">{backLabel}</span>
          </button>
        </div>
      )}
      
      {/* Název stránky */}
      <h1 className="text-2xl sm:text-3xl font-bold text-white">
        {title}
      </h1>
    </div>
  );
};