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

// Chart Component - AKTUALIZOVÁNO pro podporu více čar
interface ChartProps {
  data: Array<{ 
    name: string; 
    value?: number; 
    projects?: number; 
    stocks?: number; 
  }>;
  height?: number;
  showGrid?: boolean;
  lineColor?: string;
  className?: string;
  // NOVÉ: Podpora pro více čar
  showProjects?: boolean;
  showStocks?: boolean;
}

export const DashboardChart: React.FC<ChartProps> = ({
  data,
  height = 300,
  showGrid = true,
  lineColor = '#F9D523',
  className = '',
  showProjects = true,
  showStocks = false
}) => {
  // ÚPRAVA: Výpočet min/max hodnot pro všechny čáry
  const getAllValues = () => {
    const values: number[] = [];
    data.forEach(d => {
      if (showProjects && d.projects !== undefined) values.push(d.projects);
      if (showStocks && d.stocks !== undefined) values.push(d.stocks);
      if (d.value !== undefined) values.push(d.value);
    });
    return values;
  };
  
  const allValues = getAllValues();
  const maxValue = Math.max(...allValues);
  const minValue = Math.min(...allValues);
  const range = maxValue - minValue;

  // NOVÉ: Funkce pro renderování čáry
  const renderLine = (dataKey: 'projects' | 'stocks' | 'value', color: string, strokeWidth = 3) => {
    const points = data.filter(d => d[dataKey] !== undefined);
    if (points.length === 0) return null;
    
    return (
      <g key={dataKey}>
        {/* Area under line */}
        <path
          d={`
            M 0 ${height}
            ${points.map((point, index) => {
              const x = (index / (data.length - 1)) * 100;
              const value = point[dataKey] || 0;
              const y = height - ((value - minValue) / range) * height * 0.8 - height * 0.1;
              return `L ${x}% ${y}`;
            }).join(' ')}
            L 100% ${height}
            Z
          `}
          fill={`url(#areaGradient-${dataKey})`}
        />
        
        {/* Main curve */}
        <path
          d={`
            M 0 ${height - ((points[0][dataKey]! - minValue) / range) * height * 0.8 - height * 0.1}
            ${points.slice(1).map((point, index) => {
              const x = ((index + 1) / (data.length - 1)) * 100;
              const value = point[dataKey] || 0;
              const y = height - ((value - minValue) / range) * height * 0.8 - height * 0.1;
              
              const prevValue = points[index][dataKey] || 0;
              const prevX = (index / (data.length - 1)) * 100;
              const prevY = height - ((prevValue - minValue) / range) * height * 0.8 - height * 0.1;
              const cpX = (prevX + x) / 2;
              const cpY = (prevY + y) / 2;
              
              return `Q ${cpX}% ${cpY}, ${x}% ${y}`;
            }).join(' ')}
          `}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeOpacity="0.8"
          filter="url(#glow)"
        />
        
        {/* Data points */}
        {points.map((point, index) => {
          const x = (index / (data.length - 1)) * 100;
          const value = point[dataKey] || 0;
          const y = height - ((value - minValue) / range) * height * 0.8 - height * 0.1;
          
          return (
            <g key={`${dataKey}-${index}`} className="transition-all duration-300 cursor-pointer group">
              <circle
                cx={`${x}%`}
                cy={y}
                r="6"
                fill={color}
                fillOpacity="0.2"
                className="group-hover:fill-opacity-40 transition-all duration-300"
              />
              <circle
                cx={`${x}%`}
                cy={y}
                r="3"
                fill={color}
                fillOpacity="0.8"
                className="group-hover:fill-opacity-100 transition-all duration-300"
              />
              <text
                x={`${x}%`}
                y={y - 20}
                textAnchor="middle"
                fill={color}
                fontSize="12"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold"
              >
                {value.toLocaleString()}
              </text>
            </g>
          );
        })}
      </g>
    );
  };

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
      
      {/* Chart SVG */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          {/* Gradients pro projekty */}
          <linearGradient id="areaGradient-projects" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          {/* Gradients pro akcie */}
          <linearGradient id="areaGradient-stocks" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F9D523" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#F9D523" stopOpacity="0" />
          </linearGradient>
          {/* Gradient pro jednu čáru */}
          <linearGradient id="areaGradient-value" x1="0%" y1="0%" x2="0%" y2="100%">
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
        
        {/* NOVÉ: Renderování čar podle přepínačů */}
        {showProjects && renderLine('projects', '#FFFFFF')}
        {showStocks && renderLine('stocks', '#F9D523')}
        {!showProjects && !showStocks && data[0]?.value !== undefined && renderLine('value', lineColor)}
      </svg>
      
      {/* ÚPRAVA: Y-axis labels s lepším paddingem */}
      <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-white/60 -ml-12 font-medium">
        <span className="bg-black/50 px-2 py-1 rounded">{maxValue.toLocaleString()}</span>
        <span className="bg-black/50 px-2 py-1 rounded">{Math.round((maxValue + minValue) / 2).toLocaleString()}</span>
        <span className="bg-black/50 px-2 py-1 rounded">{minValue.toLocaleString()}</span>
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
  render?: (value: T[keyof T], item: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  className?: string;
}

export function DashboardTable<T>({ columns, data, className = '' }: TableProps<T>) {
  return (
    <div className={className}>
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
              className="border-b border-white/5 transition-colors"
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

// Export the TableColumn type
export type { TableColumn };
