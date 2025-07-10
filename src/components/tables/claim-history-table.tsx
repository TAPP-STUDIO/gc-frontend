import React, { useState } from 'react';
import { Button } from '../ui/button';

interface ClaimHistoryItem {
  id: string;
  project: string;
  date: string;
  amount: number;
}

interface ClaimHistoryTableProps {
  title: string;
  data: ClaimHistoryItem[];
  pageSize?: number;
  className?: string;
}

export const ClaimHistoryTable: React.FC<ClaimHistoryTableProps> = ({
  title,
  data,
  pageSize = 6,
  className = ""
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = data.slice(startIndex, startIndex + pageSize);
  
  const getVisiblePages = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className={`bg-[#151515] rounded-lg p-4 sm:p-6 ${className}`}>
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">{title}</h3>
      
      {/* Mobile: Card layout, Desktop: Table layout */}
      <div className="overflow-hidden">
        {/* Desktop Table Header - hidden on mobile */}
        <div className="hidden sm:grid sm:grid-cols-3 gap-4 pb-4 border-b border-[#333333]">
          <div className="text-[#666666] font-medium text-sm lg:text-base">Projekt</div>
          <div className="text-[#666666] font-medium text-sm lg:text-base">Datum</div>
          <div className="text-[#666666] font-medium text-sm lg:text-base text-right">Claim $</div>
        </div>
        
        {/* Mobile: Card layout */}
        <div className="sm:hidden space-y-3">
          {paginatedData.map((item) => (
            <div 
              key={item.id}
              className="bg-[#1a1a1a] rounded-lg p-4 border border-[#2a2a2a] hover:border-[#F9D523] transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium text-white text-sm">{item.project}</div>
                <div className="text-[#F9D523] font-bold text-sm">
                  {item.amount.toLocaleString()} $
                </div>
              </div>
              <div className="text-[#666666] text-xs">{item.date}</div>
            </div>
          ))}
        </div>
        
        {/* Desktop: Table layout */}
        <div className="hidden sm:block space-y-0">
          {paginatedData.map((item) => (
            <div 
              key={item.id}
              className="grid grid-cols-3 gap-4 py-3 sm:py-4 border-b border-[#2a2a2a] last:border-b-0 hover:bg-[#1a1a1a] transition-colors"
            >
              <div className="text-white font-medium text-sm lg:text-base">{item.project}</div>
              <div className="text-white text-sm lg:text-base">{item.date}</div>
              <div className="text-white text-right font-medium text-sm lg:text-base">
                {item.amount.toLocaleString()} $
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-1 sm:space-x-2 mt-4 sm:mt-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 sm:w-10 sm:h-10 p-0 border border-[#F9D523] text-[#F9D523] hover:bg-[#F9D523] hover:text-[#151515] text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ←
          </Button>
          
          {getVisiblePages().map(page => (
            <Button
              key={page}
              variant={page === currentPage ? "primary" : "ghost"}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 sm:w-10 sm:h-10 p-0 border text-sm sm:text-base transition-all duration-200 ${
                page === currentPage 
                  ? 'bg-[#F9D523] text-[#151515] border-[#F9D523] scale-110' 
                  : 'border-[#F9D523] text-[#F9D523] hover:bg-[#F9D523] hover:text-[#151515] hover:scale-105'
              }`}
            >
              {page}
            </Button>
          ))}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="w-8 h-8 sm:w-10 sm:h-10 p-0 border border-[#F9D523] text-[#F9D523] hover:bg-[#F9D523] hover:text-[#151515] text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            →
          </Button>
        </div>
      )}
      
      {/* Mobile: Summary info */}
      <div className="sm:hidden mt-4 pt-4 border-t border-[#333333]">
        <div className="flex justify-between items-center text-xs text-[#666666]">
          <span>Celkem záznamů: {data.length}</span>
          <span>Strana {currentPage} z {totalPages}</span>
        </div>
      </div>
    </div>
  );
};