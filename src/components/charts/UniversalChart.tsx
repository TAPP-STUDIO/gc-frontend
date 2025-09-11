/**
 * UNIVERSAL CHART COMPONENT
 * ========================
 * 
 * Sjednocená implementace všech grafů v aplikaci
 * Založeno na referenčním grafu z dashboard/projects
 * 
 * Podporuje:
 * - Časové filtry (D, W, M, Y)
 * - Toggle pro více datových sad  
 * - Jednotný design systém
 * - Responzivní chování
 * - Animace a tooltips
 * - Type safety
 * 
 * @autor: Gavlik Capital Frontend Team
 * @verze: 1.0.0
 */

'use client';

import React, { useState, useCallback } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// ===================================
// TYPES & INTERFACES
// ===================================

interface ChartData {
  name: string;
  [key: string]: string | number;
}

interface ChartTimeframes {
  [key: string]: ChartData[];
}

interface ChartTrend {
  value: number;
  isPositive: boolean;
}

interface UniversalChartProps {
  // === ZÁKLADNÍ PROPS ===
  data: ChartData[];
  title?: string;
  height?: number;
  className?: string;
  
  // === DATOVÉ KLÍČE ===
  primaryKey?: string;
  secondaryKey?: string;
  
  // === ZOBRAZENÍ ===
  showGrid?: boolean;
  showTooltip?: boolean;
  animate?: boolean;
  showFilters?: boolean;
  showToggle?: boolean;
  
  // === STYLING ===
  primaryColor?: string;
  secondaryColor?: string;
  containerStyle?: 'default' | 'glass' | 'solid';
  
  // === DATA & FUNKČNOST ===
  timeframes?: ChartTimeframes;
  currentValue?: string;
  trend?: ChartTrend;
  
  // === CALLBACKS ===
  onTimeframeChange?: (timeframe: string) => void;
  onToggleChange?: (showPrimary: boolean, showSecondary: boolean) => void;
  
  // === LABELY ===
  primaryLabel?: string;
  secondaryLabel?: string;
  valueFormatter?: (value: number) => string;
}

// ===================================
// CUSTOM TOOLTIP COMPONENT
// ===================================

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number | string;
    color: string;
  }>;
  label?: string;
  valueFormatter?: (value: number) => string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ 
  active, 
  payload, 
  label,
  valueFormatter
}) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg p-3 shadow-xl">
      <p className="font-medium mb-2 text-white">{label}</p>
      {payload.map((entry, index) => (
        <p key={index} className="text-sm flex items-center gap-2">
          <span 
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-white/70">{entry.name}:</span>
          <span className="font-medium text-white">
            {typeof entry.value === 'number' 
              ? (valueFormatter ? valueFormatter(entry.value) : entry.value.toLocaleString())
              : entry.value
            }
          </span>
        </p>
      ))}
    </div>
  );
};

// ===================================
// MAIN UNIVERSAL CHART COMPONENT
// ===================================

export const UniversalChart: React.FC<UniversalChartProps> = ({
  // Základní props
  data,
  title = "Graf",
  height = 320,
  className = "",
  
  // Datové klíče
  primaryKey = "value",
  secondaryKey,
  
  // Zobrazení
  showGrid = true,
  showTooltip = true,
  animate = true,
  showFilters = false,
  showToggle = false,
  
  // Styling
  primaryColor = "#F9D523",
  secondaryColor = "#FFFFFF",
  containerStyle = "glass",
  
  // Data & funkčnost
  timeframes,
  currentValue,
  trend,
  
  // Callbacks
  onTimeframeChange,
  onToggleChange,
  
  // Labely
  primaryLabel = "Hodnota",
  secondaryLabel = "Sekundární",
  valueFormatter
}) => {
  
  // ===================================
  // STATE MANAGEMENT
  // ===================================
  
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>(
    timeframes ? Object.keys(timeframes)[2] || 'M' : 'M'
  );
  const [showPrimary, setShowPrimary] = useState<boolean>(true);
  const [showSecondary, setShowSecondary] = useState<boolean>(false);
  
  // ===================================
  // COMPUTED VALUES
  // ===================================
  
  const currentData = timeframes && timeframes[selectedTimeframe] ? timeframes[selectedTimeframe] : data;
  
  const timeframeLabels: { [key: string]: string } = {
    D: 'tento týden',
    W: 'posledních 8 týdnů', 
    M: 'posledních 12 měsíců',
    Y: 'posledních 5 let'
  };
  
  const timeframeLabel = timeframes ? timeframeLabels[selectedTimeframe] || '' : '';
  
  // Container style classes
  const containerClasses = {
    default: 'bg-gray-900 border border-gray-700 rounded-xl',
    glass: 'bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl',
    solid: 'bg-gray-800 border border-gray-600 rounded-xl'
  };
  
  // ===================================
  // EVENT HANDLERS
  // ===================================
  
  const handleTimeframeChange = useCallback((timeframe: string) => {
    setSelectedTimeframe(timeframe);
    onTimeframeChange?.(timeframe);
  }, [onTimeframeChange]);
  
  const handleToggleChange = useCallback((primary: boolean, secondary: boolean) => {
    setShowPrimary(primary);
    setShowSecondary(secondary);
    onToggleChange?.(primary, secondary);
  }, [onToggleChange]);
  
  // ===================================
  // RENDER HELPERS
  // ===================================
  
  const renderTimeframeFilters = () => {
    if (!showFilters || !timeframes) return null;
    
    return (
      <div className="flex gap-1">
        {Object.keys(timeframes).map((period) => (
          <button
            key={period}
            onClick={() => handleTimeframeChange(period)}
            className={`
              px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200
              ${selectedTimeframe === period 
                ? 'bg-[#F9D523] text-black shadow-lg' 
                : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }
            `}
          >
            {period}
          </button>
        ))}
      </div>
    );
  };
  
  const renderToggleControls = () => {
    if (!showToggle || !secondaryKey) return null;
    
    return (
      <div className="flex items-center gap-4 text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showPrimary}
            onChange={(e) => handleToggleChange(e.target.checked, showSecondary)}
            className="w-4 h-4 rounded border-white/30 bg-white/10 text-[#F9D523] focus:ring-[#F9D523] focus:ring-offset-0"
          />
          <span className="text-white/70">{primaryLabel}</span>
        </label>
        
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showSecondary}
            onChange={(e) => handleToggleChange(showPrimary, e.target.checked)}
            className="w-4 h-4 rounded border-white/30 bg-white/10 text-[#F9D523] focus:ring-[#F9D523] focus:ring-offset-0"
          />
          <span className="text-white/70">{secondaryLabel}</span>
        </label>
      </div>
    );
  };
  
  // ===================================
  // MAIN RENDER
  // ===================================
  
  return (
    <div className={`${containerClasses[containerStyle]} p-6 ${className}`}>
      
      {/* ===== HEADER SECTION ===== */}
      <div className="flex flex-col gap-4 mb-6">
        
        {/* Title and Value Row */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">
              {title}
              {timeframeLabel && (
                <span className="text-white/50 font-normal text-sm ml-2">
                  ({timeframeLabel})
                </span>
              )}
            </h3>
            
            {currentValue && (
              <div className="flex items-center gap-3 mt-2">
                <span className="text-2xl font-bold text-white">
                  {currentValue}
                </span>
                
                {trend && (
                  <div className={`
                    flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium
                    ${trend.isPositive 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                    }
                  `}>
                    <span className="text-xs">
                      {trend.isPositive ? '↗' : '↘'}
                    </span>
                    {Math.abs(trend.value)}%
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Controls Row */}
        {(showFilters || showToggle) && (
          <div className="flex flex-col sm:flex-row gap-3">
            {renderTimeframeFilters()}
            {renderToggleControls()}
          </div>
        )}
      </div>
      
      {/* ===== CHART SECTION ===== */}
      <div className="w-full" style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart 
            data={currentData}
            margin={{ top: 5, right: 5, bottom: 25, left: 5 }}
          >
            
            {/* Grid */}
            {showGrid && (
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="rgba(255,255,255,0.1)" 
                strokeWidth={1}
              />
            )}
            
            {/* X Axis */}
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: 'rgba(255,255,255,0.6)', 
                fontSize: 12,
                fontFamily: 'Inter, sans-serif'
              }}
              tickMargin={10}
            />
            
            {/* Y Axis */}
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: 'rgba(255,255,255,0.6)', 
                fontSize: 12,
                fontFamily: 'Inter, sans-serif'
              }}
              tickFormatter={(value) => 
                valueFormatter ? valueFormatter(value) : value.toLocaleString()
              }
              tickMargin={10}
              width={60}
            />
            
            {/* Tooltip */}
            {showTooltip && (
              <Tooltip 
                content={<CustomTooltip valueFormatter={valueFormatter} />}
                cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
              />
            )}
            
            {/* Primary Area */}
            {showPrimary && (
              <Area
                type="monotone"
                dataKey={primaryKey}
                stroke={primaryColor}
                strokeWidth={3}
                fill={`url(#primaryGradient-${primaryKey})`}
                isAnimationActive={animate}
                animationDuration={1500}
                animationEasing="ease-out"
                name={primaryLabel}
              />
            )}
            
            {/* Secondary Area */}
            {showSecondary && secondaryKey && (
              <Area
                type="monotone"
                dataKey={secondaryKey}
                stroke={secondaryColor}
                strokeWidth={2}
                fill={`url(#secondaryGradient-${secondaryKey})`}
                isAnimationActive={animate}
                animationDuration={1500}
                animationEasing="ease-out"
                name={secondaryLabel}
              />
            )}
            
            {/* Gradient Definitions */}
            <defs>
              <linearGradient 
                id={`primaryGradient-${primaryKey}`} 
                x1="0" y1="0" x2="0" y2="1"
              >
                <stop offset="0%" stopColor={primaryColor} stopOpacity={0.4}/>
                <stop offset="50%" stopColor={primaryColor} stopOpacity={0.2}/>
                <stop offset="100%" stopColor={primaryColor} stopOpacity={0}/>
              </linearGradient>
              
              {secondaryKey && (
                <linearGradient 
                  id={`secondaryGradient-${secondaryKey}`} 
                  x1="0" y1="0" x2="0" y2="1"
                >
                  <stop offset="0%" stopColor={secondaryColor} stopOpacity={0.3}/>
                  <stop offset="50%" stopColor={secondaryColor} stopOpacity={0.15}/>
                  <stop offset="100%" stopColor={secondaryColor} stopOpacity={0}/>
                </linearGradient>
              )}
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// ===================================
// CONVENIENCE WRAPPER COMPONENTS
// ===================================

// Dashboard Projects Chart (Reference Implementation)
export const ProjectsUniversalChart: React.FC<Omit<UniversalChartProps, 'primaryKey' | 'secondaryKey' | 'showToggle' | 'showFilters' | 'primaryLabel' | 'secondaryLabel'> & {
  showProjects?: boolean;
  showStocks?: boolean;
}> = ({ 
  // Remove unused props
  ...props 
}) => {
  return (
    <UniversalChart
      {...props}
      primaryKey="projects"
      secondaryKey="stocks"
      primaryLabel="Projekty"
      secondaryLabel="Akcie"
      showToggle={true}
      showFilters={true}
      title="Celková hodnota projektů"
      primaryColor="#F9D523"
      secondaryColor="#FFFFFF"
      valueFormatter={(value) => `${value.toLocaleString()} $`}
    />
  );
};

// Portfolio Charts
export const PortfolioUniversalChart: React.FC<Omit<UniversalChartProps, 'primaryKey'>> = ({ 
  title = "Hodnota portfolia",
  primaryColor = "#F9D523",
  ...props 
}) => {
  return (
    <UniversalChart
      {...props}
      title={title}
      primaryKey="value"
      primaryColor={primaryColor}
      valueFormatter={(value) => `${value.toLocaleString()} $`}
    />
  );
};

// VIP Chart
export const VIPUniversalChart: React.FC<Omit<UniversalChartProps, 'title' | 'primaryColor' | 'primaryKey'>> = ({ 
  ...props 
}) => {
  return (
    <UniversalChart
      {...props}
      title="VIP Portfolio Performance"
      primaryColor="#8B5CF6"
      primaryKey="value"
      showFilters={true}
      valueFormatter={(value) => `$${value.toLocaleString()}`}
    />
  );
};

// Admin Analytics Chart
export const AnalyticsUniversalChart: React.FC<UniversalChartProps> = ({ 
  primaryColor = "#EF4444",
  ...props 
}) => {
  return (
    <UniversalChart
      {...props}
      primaryColor={primaryColor}
      containerStyle="glass"
    />
  );
};