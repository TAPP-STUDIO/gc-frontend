"use client";

import React from 'react';

interface LineChartProps {
  title: string;
  data: Array<{ name: string; value: number }>;
  currentValue: number;
  currentMonth: string;
  minValue?: number;
  maxValue?: number;
  timeframe?: string;
  onTimeframeChange?: (value: string) => void;
  className?: string;
}

export const LineChart: React.FC<LineChartProps> = ({
  title,
  data,
  currentValue,
  currentMonth,
  minValue = 0,
  maxValue = 1100,
  timeframe = "monthly",
  onTimeframeChange,
  className = ""
}) => {
  const currentIndex = data.findIndex(item => item.name === currentMonth);
  const chartHeight = 280;
  const chartWidth = 100; // percentage
  
  // Create SVG path for the line
  const createPath = () => {
    if (data.length === 0) return '';
    
    const points = data.map((point, index) => {
      const x = (index / (data.length - 1)) * chartWidth;
      const y = chartHeight - ((point.value - minValue) / (maxValue - minValue)) * chartHeight;
      return `${x},${y}`;
    });
    
    return `M ${points.join(' L ')}`;
  };

  return (
    <div className={`bg-[#151515] rounded-lg p-4 sm:p-6 h-full flex flex-col ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-4 flex-shrink-0">
        <h3 className="text-lg sm:text-xl font-semibold text-white">{title}</h3>
        <div className="relative">
          <select 
            value={timeframe}
            onChange={(e) => onTimeframeChange?.(e.target.value)}
            className="bg-transparent border border-[#F9D523] text-[#F9D523] rounded-full px-3 sm:px-4 py-1 text-sm appearance-none cursor-pointer pr-8 min-w-[100px]"
          >
            <option value="monthly">monthly</option>
            <option value="yearly">yearly</option>
            <option value="weekly">weekly</option>
          </select>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1L6 6L11 1" stroke="#F9D523" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Chart Area - flexibilní výška */}
      <div className="relative flex-1 min-h-0">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs sm:text-sm text-[#666666] py-4">
          <span>${maxValue}</span>
          <span>${Math.round(maxValue * 0.75)}</span>
          <span>${Math.round(maxValue * 0.5)}</span>
          <span>${Math.round(maxValue * 0.25)}</span>
          <span>${minValue}</span>
        </div>

        {/* Chart container */}
        <div className="ml-8 sm:ml-12 mr-4 h-full relative pb-8">
          {/* Grid lines */}
          <div className="absolute inset-0 pb-8">
            {[0, 25, 50, 75, 100].map((percent) => (
              <div
                key={percent}
                className="absolute w-full border-t border-dashed border-[#333333]"
                style={{ top: `${percent}%` }}
              />
            ))}
          </div>

          {/* SVG Chart */}
          <svg 
            className="absolute inset-0 w-full h-full pb-8"
            preserveAspectRatio="none"
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          >
            {/* Main line - tenčí */}
            <path
              d={createPath()}
              fill="none"
              stroke="#F9D523"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
            
            {/* Current value point */}
            {currentIndex !== -1 && (
              <circle
                cx={(currentIndex / (data.length - 1)) * chartWidth}
                cy={chartHeight - ((data[currentIndex].value - minValue) / (maxValue - minValue)) * chartHeight}
                r="4"
                fill="#F9D523"
                stroke="#151515"
                strokeWidth="2"
              />
            )}
            
            {/* Vertical line at current month - tenčí */}
            {currentIndex !== -1 && (
              <line
                x1={(currentIndex / (data.length - 1)) * chartWidth}
                y1="0"
                x2={(currentIndex / (data.length - 1)) * chartWidth}
                y2={chartHeight}
                stroke="#F9D523"
                strokeWidth="0.5"
                strokeDasharray="2 2"
                opacity="0.8"
              />
            )}
          </svg>

          {/* Current value badge */}
          {currentIndex !== -1 && (
            <div 
              className="absolute bg-[#F9D523] text-[#151515] px-2 sm:px-3 py-1 rounded font-bold text-sm sm:text-lg transform -translate-x-1/2 -translate-y-8"
              style={{
                left: `${(currentIndex / (data.length - 1)) * 100}%`,
                top: `${((maxValue - data[currentIndex].value) / (maxValue - minValue)) * 100}%`
              }}
            >
              ${currentValue.toFixed(2)}
            </div>
          )}

          {/* X-axis labels - uvnitř kontejneru na spodku */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs sm:text-sm text-[#666666] px-1">
            {data.map((point, index) => (
              <span 
                key={index} 
                className="text-center select-none"
                style={{
                  minWidth: '30px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {point.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};