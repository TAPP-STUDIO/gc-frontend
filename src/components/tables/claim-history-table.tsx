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
    <div className={`bg-[#151515] rounded-lg p-6 ${className}`}>
      <h3 className="text-xl font-semibold text-white mb-6">{title}</h3>
      
      {/* Table */}
      <div className="overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-3 gap-4 pb-4 border-b border-[#333333]">
          <div className="text-[#666666] font-medium">Projekt</div>
          <div className="text-[#666666] font-medium">Datum</div>
          <div className="text-[#666666] font-medium text-right">Claim $</div>
        </div>
        
        {/* Rows */}
        <div className="space-y-0">
          {paginatedData.map((item) => (
            <div 
              key={item.id}
              className="grid grid-cols-3 gap-4 py-4 border-b border-[#2a2a2a] last:border-b-0 hover:bg-[#1a1a1a] transition-colors"
            >
              <div className="text-white font-medium">{item.project}</div>
              <div className="text-white">{item.date}</div>
              <div className="text-white text-right font-medium">{item.amount.toLocaleString()} $</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 p-0 border border-[#F9D523] text-[#F9D523] hover:bg-[#F9D523] hover:text-[#151515]"
          >
            ←
          </Button>
          
          {getVisiblePages().map(page => (
            <Button
              key={page}
              variant={page === currentPage ? "primary" : "ghost"}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 p-0 border ${
                page === currentPage 
                  ? 'bg-[#F9D523] text-[#151515] border-[#F9D523]' 
                  : 'border-[#F9D523] text-[#F9D523] hover:bg-[#F9D523] hover:text-[#151515]'
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
            className="w-8 h-8 p-0 border border-[#F9D523] text-[#F9D523] hover:bg-[#F9D523] hover:text-[#151515]"
          >
            →
          </Button>
        </div>
      )}
    </div>
  );
};