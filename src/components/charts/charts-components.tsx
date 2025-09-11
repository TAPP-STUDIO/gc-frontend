'use client';

// ===================================
// CHART COMPONENTS
// ===================================

import React from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}

interface BaseChartProps {
  data: ChartData[];
  height?: number;
  className?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  animate?: boolean;
}

// Portfolio value chart - LEGACY VERSION
interface PortfolioChartProps extends BaseChartProps {
  valueKey?: string;
  compareKey?: string;
  showComparison?: boolean;
  title?: string;
}

export function PortfolioChart({ 
  data, 
  height = 300, 
  className = '',
  valueKey = 'value',
  compareKey,
  showComparison = false,
  showGrid = true,
  showTooltip = true,
  animate = true,
  title = 'Vývoj portfolia'
}: PortfolioChartProps) {
  return (
    <div className={`glass-card p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#F9D523] rounded-full" />
            <span className="text-white/70">Portfolio</span>
          </div>
          {showComparison && compareKey && (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-white/70">Benchmark</span>
            </div>
          )}
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />}
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          {showTooltip && (
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                color: 'white'
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Hodnota']}
            />
          )}
          <Area
            type="monotone"
            dataKey={valueKey}
            stroke="#F9D523"
            strokeWidth={2}
            fill="url(#portfolioGradient)"
            isAnimationActive={animate}
          />
          {showComparison && compareKey && (
            <Area
              type="monotone"
              dataKey={compareKey}
              stroke="#3B82F6"
              strokeWidth={2}
              fill="url(#benchmarkGradient)"
              isAnimationActive={animate}
            />
          )}
          <defs>
            <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F9D523" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#F9D523" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="benchmarkGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// Projects Chart - LEGACY VERSION (zachovat pro projects page kde je reference)
interface ProjectsChartProps {
  data: Array<{ 
    name: string; 
    [key: string]: string | number; 
  }>;
  height?: number;
  className?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
  animate?: boolean;
  showProjects?: boolean;
  showStocks?: boolean;
  projectsKey?: string;
  stocksKey?: string;
}

export function ProjectsChart({ 
  data, 
  height = 300, 
  className = '',
  showProjects = true,
  showStocks = false,
  projectsKey = 'projects',
  stocksKey = 'stocks',
  showGrid = true,
  showTooltip = true,
  animate = true
}: ProjectsChartProps) {
  const hasProjectsData = showProjects && data.some(d => d[projectsKey] !== undefined);
  const hasStocksData = showStocks && data.some(d => d[stocksKey] !== undefined);
  
  return (
    <div className={`${className}`}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />}
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
            tickFormatter={(value) => `${value.toLocaleString()}`}
          />
          {showTooltip && (
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                color: 'white'
              }}
              formatter={(value: number, name: string) => {
                const label = name === projectsKey ? 'Projekty' : name === stocksKey ? 'Akcie' : name;
                return [`${value.toLocaleString()}`, label];
              }}
            />
          )}
          
          {/* Projekty čára - zlatá */}
          {hasProjectsData && (
            <Area
              type="monotone"
              dataKey={projectsKey}
              stroke="#F9D523"
              strokeWidth={2}
              fill="url(#projectsGradient)"
              isAnimationActive={animate}
            />
          )}
          
          {/* Akcie čára - zelená */}
          {hasStocksData && (
            <Area
              type="monotone"
              dataKey={stocksKey}
              stroke="#10B981"
              strokeWidth={2}
              fill="url(#stocksGradient)"
              isAnimationActive={animate}
            />
          )}
          
          <defs>
            <linearGradient id="projectsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F9D523" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#F9D523" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="stocksGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// Chart container with loading and error states
interface ChartContainerProps {
  loading?: boolean;
  error?: string | null;
  children: React.ReactNode;
  className?: string;
}

export function ChartContainer({ 
  loading = false, 
  error = null, 
  children, 
  className = '' 
}: ChartContainerProps) {
  if (loading) {
    return (
      <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-white/10 rounded w-1/3" />
          <div className="h-48 bg-white/10 rounded" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 ${className}`}>
        <div className="text-center py-8">
          <div className="text-red-400 mb-2">Chyba při načítání grafu</div>
          <div className="text-white/60 text-sm">{error}</div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// ===================================
// OSTATNÍ LEGACY KOMPONENTY - zachovány pro specializované použití
// ===================================

// Trading volume chart
interface VolumeChartProps extends BaseChartProps {
  volumeKey?: string;
}

export function VolumeChart({ 
  data, 
  height = 200, 
  className = '',
  volumeKey = 'volume',
  showGrid = true,
  showTooltip = true,
  animate = true
}: VolumeChartProps) {
  return (
    <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-white mb-4">Objem obchodů</h3>
      
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />}
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
          />
          {showTooltip && (
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                color: 'white'
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Objem']}
            />
          )}
          <Bar 
            dataKey={volumeKey} 
            fill="#F9D523"
            radius={[2, 2, 0, 0]}
            isAnimationActive={animate}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Asset allocation pie chart
interface AllocationChartProps {
  data: ChartData[];
  height?: number;
  className?: string;
  colors?: string[];
}

export function AllocationChart({ 
  data, 
  height = 300, 
  className = '',
  colors = ['#F9D523', '#FF6B35', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']
}: AllocationChartProps) {
  return (
    <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-white mb-4">Rozložení aktiv</h3>
      
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={60}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0,0,0,0.8)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              color: 'white'
            }}
            formatter={(value: number, name: string) => [
              `${value.toFixed(1)}%`, 
              name
            ]}
          />
          <Legend 
            wrapperStyle={{ color: 'rgba(255,255,255,0.8)' }}
            formatter={(value) => value}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// Mini chart for cards
interface MiniChartProps {
  data: ChartData[];
  trend: 'up' | 'down' | 'neutral';
  height?: number;
  className?: string;
}

export function MiniChart({ 
  data, 
  trend, 
  height = 60, 
  className = '' 
}: MiniChartProps) {
  const trendColors = {
    up: '#10B981',
    down: '#EF4444',
    neutral: '#6B7280'
  };

  return (
    <div className={className} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={trendColors[trend]}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Performance metrics chart
interface PerformanceMetric {
  name: string;
  returns: number;
  volatility: number;
  sharpe: number;
}

interface PerformanceChartProps {
  metrics: PerformanceMetric[];
  height?: number;
  className?: string;
}

export function PerformanceChart({ 
  metrics, 
  height = 300, 
  className = '' 
}: PerformanceChartProps) {
  const colors = ['#F9D523', '#3B82F6', '#EF4444', '#10B981', '#8B5CF6'];

  return (
    <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-white mb-4">Performance Metriky</h3>
      
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={metrics} layout="horizontal">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            type="number"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
          />
          <YAxis 
            type="category"
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
            width={80}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0,0,0,0.8)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              color: 'white'
            }}
            formatter={(value: number, name: string) => {
              const formatters = {
                returns: (v: number) => `${v.toFixed(1)}%`,
                volatility: (v: number) => `${v.toFixed(1)}%`,
                sharpe: (v: number) => v.toFixed(2)
              };
              const formatter = formatters[name as keyof typeof formatters] || ((v: number) => v.toString());
              return [formatter(value), name === 'returns' ? 'Výnos' : name === 'volatility' ? 'Volatilita' : 'Sharpe Ratio'];
            }}
          />
          <Bar dataKey="returns" fill={colors[0]} name="returns" />
          <Bar dataKey="volatility" fill={colors[1]} name="volatility" />
          <Bar dataKey="sharpe" fill={colors[2]} name="sharpe" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}