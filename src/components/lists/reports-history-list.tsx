import React, { useState } from 'react';
import { Button } from '../ui/button';

interface ReportItem {
  id: string;
  title: string;
  date: string;
  category?: string;
}

interface ReportsHistoryListProps {
  reports: ReportItem[];
  onViewReport?: (reportId: string) => void;
  pageSize?: number;
  className?: string;
}

export const ReportsHistoryList: React.FC<ReportsHistoryListProps> = ({
  reports,
  onViewReport,
  pageSize = 5,
  className = ""
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(reports.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedReports = reports.slice(startIndex, startIndex + pageSize);
  
  const getVisiblePages = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handleViewReport = (reportId: string) => {
    if (onViewReport) {
      onViewReport(reportId);
    }
  };

  return (
    <div className={className}>
      <div className="space-y-0">
        {paginatedReports.map((report, index) => (
          <div 
            key={report.id}
            className={`flex items-center justify-between py-4 px-0 hover:bg-[#1a1a1a] transition-colors rounded-lg ${
              index < paginatedReports.length - 1 ? 'border-b border-[#333333]' : ''
            }`}
          >
            <div className="flex-1">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <h3 className="text-white font-medium text-sm sm:text-base">
                    {report.title}
                  </h3>
                  {report.category && (
                    <p className="text-[#666666] text-xs mt-1">
                      {report.category}
                    </p>
                  )}
                </div>
                <div className="text-white text-sm sm:text-base">
                  {report.date}
                </div>
              </div>
            </div>
            
            <div className="ml-4">
              <Button
                onClick={() => handleViewReport(report.id)}
                variant="outline"
                size="sm"
                className="border-[#F9D523] text-[#F9D523] hover:bg-[#F9D523] hover:text-[#151515] px-4 py-2 text-sm rounded-full transition-all duration-200"
              >
                Zobrazit
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center space-x-1 sm:space-x-2 mt-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 sm:w-10 sm:h-10 p-0 border border-[#F9D523] text-[#F9D523] hover:bg-[#F9D523] hover:text-[#151515] text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed rounded-full"
          >
            &lt;
          </Button>
          
          {getVisiblePages().map(page => (
            <Button
              key={page}
              variant={page === currentPage ? "primary" : "ghost"}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 sm:w-10 sm:h-10 p-0 text-sm sm:text-base transition-all duration-200 ${
                page === currentPage 
                  ? 'bg-[#F9D523] text-[#151515] scale-110' 
                  : 'text-[#F9D523] hover:text-[#151515] hover:bg-[#F9D523] hover:scale-105'
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
            className="w-8 h-8 sm:w-10 sm:h-10 p-0 border border-[#F9D523] text-[#F9D523] hover:bg-[#F9D523] hover:text-[#151515] text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed rounded-full"
          >
            &gt;
          </Button>
        </div>
      )}
    </div>
  );
};