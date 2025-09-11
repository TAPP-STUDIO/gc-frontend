import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { LoadingSpinner } from '../ui/loading';
import { cn } from '@/lib/utils';

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: unknown, row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
  };
  sorting?: {
    key: keyof T;
    direction: 'asc' | 'desc';
    onSort: (key: keyof T) => void;
  };
  className?: string;
  emptyMessage?: string;
}

export default function DataTable<T>({
  data,
  columns,
  loading = false,
  pagination,
  sorting,
  className,
  emptyMessage = 'Žádná data k zobrazení'
}: DataTableProps<T>) {
  const handleSort = (column: Column<T>) => {
    if (!column.sortable || !sorting) return;
    sorting.onSort(column.key);
  };

  const getSortIcon = (column: Column<T>) => {
    if (!column.sortable || !sorting) return null;
    
    const isActive = sorting.key === column.key;
    const direction = sorting.direction;
    
    return (
      <span className="ml-1">
        {isActive ? (
          direction === 'asc' ? '↑' : '↓'
        ) : (
          <span className="text-[#666666]">↕</span>
        )}
      </span>
    );
  };

  const renderPagination = () => {
    if (!pagination) return null;
    
    const { page, pageSize, total, onPageChange } = pagination;
    const totalPages = Math.ceil(total / pageSize);
    const pages = [];
    
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, page + 2);
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#333333]">
        <div className="text-sm text-[#666666]">
          Zobrazeno {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, total)} z {total}
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
          >
            ←
          </Button>
          
          {pages.map(pageNum => (
            <Button
              key={pageNum}
              variant={pageNum === page ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => onPageChange(pageNum)}
            >
              {pageNum}
            </Button>
          ))}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
          >
            →
          </Button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <Card className={className}>
        <div className="flex justify-center items-center py-8">
          <LoadingSpinner variant="inline" size="lg" text="Načítám data..." />
        </div>
      </Card>
    );
  }

  return (
    <Card padding="none" className={className}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#333333]">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={cn(
                    'px-6 py-4 text-left text-sm font-medium text-[#666666] uppercase tracking-wider',
                    column.sortable && 'cursor-pointer hover:text-white transition-colors',
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right'
                  )}
                  style={{ width: column.width }}
                  onClick={() => handleSort(column)}
                >
                  <div className="flex items-center">
                    {column.label}
                    {getSortIcon(column)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-8 text-center text-[#666666]"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b border-[#333333] hover:bg-[#1a1a1a] transition-colors"
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className={cn(
                        'px-6 py-4 text-white',
                        column.align === 'center' && 'text-center',
                        column.align === 'right' && 'text-right'
                      )}
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : String(row[column.key] ?? '-')
                      }
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {renderPagination()}
    </Card>
  );
}

// Named export pro zpětnou kompatibilitu
export { DataTable };