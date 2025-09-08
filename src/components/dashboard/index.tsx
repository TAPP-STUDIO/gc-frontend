'use client';

import React from 'react';
import { DashboardButton } from './DashboardButton';
import { DashboardCard, StatCard, ValueCard, InfoCard, ChartCard } from './DashboardCard';

export { 
  DashboardButton, 
  DashboardCard, 
  StatCard, 
  ValueCard,
  InfoCard,
  ChartCard
};

// Chart Component
interface ChartProps {
  data: Array<{ name: string; value: number }>;
  height?: number;
  showGrid?: boolean;
  lineColor?: string;
  className?: string;
}

export const DashboardChart: React.FC<ChartProps> = ({
  data,
  height = 300,
  showGrid = true,
  lineColor = '#FFFFFF',
  className = ''
}) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;

  return (
    <div className={`relative ${className}`} style={{ height }}>
      {/* Grid Background */}
      {showGrid && (
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, #FFFFFF 0, #FFFFFF 1px, transparent 1px, transparent 40px),
              repeating-linear-gradient(90deg, #FFFFFF 0, #FFFFFF 1px, transparent 1px, transparent 40px)
            `
          }}
        />
      )}
      
      {/* Chart Line */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0.3" />
            <stop offset="50%" stopColor={lineColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0.2" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Area under line */}
        <path
          d={`
            M 0 ${height}
            ${data.map((point, index) => {
              const x = (index / (data.length - 1)) * 100;
              const y = height - ((point.value - minValue) / range) * height * 0.8 - height * 0.1;
              return `L ${x}% ${y}`;
            }).join(' ')}
            L 100% ${height}
            Z
          `}
          fill="url(#areaGradient)"
        />
        
        {/* Connecting lines between points */}
        {data.slice(0, -1).map((point, index) => {
          const x1 = (index / (data.length - 1)) * 100;
          const y1 = height - ((point.value - minValue) / range) * height * 0.8 - height * 0.1;
          const x2 = ((index + 1) / (data.length - 1)) * 100;
          const y2 = height - ((data[index + 1].value - minValue) / range) * height * 0.8 - height * 0.1;
          
          return (
            <line
              key={`line-${index}`}
              x1={`${x1}%`}
              y1={y1}
              x2={`${x2}%`}
              y2={y2}
              stroke={lineColor}
              strokeWidth="2"
              strokeOpacity="0.5"
            />
          );
        })}
        
        {/* Main smooth curve */}
        <path
          d={`
            M 0 ${height - ((data[0].value - minValue) / range) * height * 0.8 - height * 0.1}
            ${data.slice(1).map((point, index) => {
              const x = ((index + 1) / (data.length - 1)) * 100;
              const y = height - ((point.value - minValue) / range) * height * 0.8 - height * 0.1;
              
              // Create smooth curve using quadratic bezier
              const prevX = (index / (data.length - 1)) * 100;
              const prevY = height - ((data[index].value - minValue) / range) * height * 0.8 - height * 0.1;
              const cpX = (prevX + x) / 2;
              const cpY = (prevY + y) / 2;
              
              return `Q ${cpX}% ${cpY}, ${x}% ${y}`;
            }).join(' ')}
          `}
          stroke={lineColor}
          strokeWidth="3"
          fill="none"
          strokeOpacity="0.8"
          filter="url(#glow)"
        />
        
        {/* Data points */}
        {data.map((point, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = height - ((point.value - minValue) / range) * height * 0.8 - height * 0.1;
          
          return (
            <g key={index}>
              {/* Outer glow */}
              <circle
                cx={`${x}%`}
                cy={y}
                r="10"
                fill={lineColor}
                fillOpacity="0.05"
              />
              {/* Middle ring */}
              <circle
                cx={`${x}%`}
                cy={y}
                r="6"
                fill={lineColor}
                fillOpacity="0.1"
              />
              {/* White border */}
              <circle
                cx={`${x}%`}
                cy={y}
                r="4"
                fill="none"
                stroke={lineColor}
                strokeWidth="1"
                strokeOpacity="0.3"
              />
              {/* Inner dot */}
              <circle
                cx={`${x}%`}
                cy={y}
                r="3"
                fill={lineColor}
                fillOpacity="0.8"
              />
            </g>
          );
        })}
      </svg>
      
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-white/30 -ml-10">
        <span>{maxValue.toLocaleString()}</span>
        <span>{Math.round((maxValue + minValue) / 2).toLocaleString()}</span>
        <span>{minValue.toLocaleString()}</span>
      </div>
      
      {/* X-axis labels */}
      <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-white/30">
        {data.filter((_, i) => i % Math.ceil(data.length / 6) === 0).map((point, index) => (
          <span key={index}>{point.name}</span>
        ))}
      </div>
    </div>
  );
};

// Table Component
interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: any, item: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  className?: string;
}

export function DashboardTable<T>({ columns, data, className = '' }: TableProps<T>) {
  return (
    <div className={`${className}`}>
      <table className="w-full">
        <thead className="border-b border-white/10">
          <tr>
            {columns.map((column) => (
              <th 
                key={String(column.key)} 
                className="text-left py-3 px-4 text-xs font-semibold text-white/50 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr 
              key={rowIndex} 
              className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
            >
              {columns.map((column) => (
                <td 
                  key={String(column.key)} 
                  className="py-4 px-4"
                >
                  {column.render 
                    ? column.render(item[column.key], item)
                    : String(item[column.key])
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
