'use client';

import React, { useEffect, useRef, useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
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

// Portfolio value chart
interface PortfolioChartProps extends BaseChartProps {
  valueKey?: string;
  compareKey?: string;
  showComparison?: boolean;
  title?: string; // NOVÉ: Konfigurovatelý název
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
  title = 'Vývoj portfolia' // Výchozí název
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
    <div className={`glass-card p-6 ${className}`}>
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
    <div className={`glass-card p-6 ${className}`}>
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

// Price change chart with candlesticks
interface PriceChartProps extends BaseChartProps {
  priceData: Array<{
    name: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }>;
}

export function PriceChart({ 
  priceData, 
  height = 400, 
  className = '',
  showGrid = true,
  showTooltip = true 
}: PriceChartProps) {
  return (
    <div className={`glass-card p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-white mb-4">Cenový graf</h3>
      
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={priceData}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />}
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
          />
          <YAxis 
            domain={['dataMin - 10', 'dataMax + 10']}
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
            tickFormatter={(value) => `$${value.toFixed(2)}`}
          />
          {showTooltip && (
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                color: 'white'
              }}
              formatter={(value: number, name: string) => [
                `$${value.toFixed(2)}`,
                name === 'close' ? 'Uzavírací cena' : name
              ]}
            />
          )}
          <Line
            type="monotone"
            dataKey="close"
            stroke="#F9D523"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Performance metrics chart
interface PerformanceChartProps extends BaseChartProps {
  metrics: Array<{
    name: string;
    returns: number;
    volatility: number;
    sharpe: number;
  }>;
}

export function PerformanceChart({ 
  metrics, 
  height = 300, 
  className = '',
  showGrid = true 
}: PerformanceChartProps) {
  return (
    <div className={`glass-card p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-white mb-4">Výkonnost</h3>
      
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={metrics} layout="horizontal">
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />}
          <XAxis 
            type="number"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
            tickFormatter={(value) => `${value.toFixed(1)}%`}
          />
          <YAxis 
            type="category"
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
            width={100}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0,0,0,0.8)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              color: 'white'
            }}
            formatter={(value: number) => [`${value.toFixed(2)}%`, 'Výnos']}
          />
          <Bar 
            dataKey="returns" 
            fill="#F9D523"
            radius={[0, 2, 2, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Real-time chart with live updates
interface RealtimeChartProps extends BaseChartProps {
  liveData: ChartData[];
  maxDataPoints?: number;
}

export function RealtimeChart({ 
  liveData, 
  height = 250, 
  className = '',
  maxDataPoints = 50 
}: RealtimeChartProps) {
  const [displayData, setDisplayData] = useState<ChartData[]>([]);

  useEffect(() => {
    setDisplayData(prev => {
      const newData = [...prev, ...liveData];
      return newData.slice(-maxDataPoints);
    });
  }, [liveData, maxDataPoints]);

  return (
    <div className={`glass-card p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Live data</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-white/60">Živě</span>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={displayData}>
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#00FF88"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
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
      <div className={`glass-card p-6 ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-white/10 rounded w-1/3" />
          <div className="h-48 bg-white/10 rounded" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`glass-card p-6 ${className}`}>
        <div className="text-center py-8">
          <div className="text-red-400 mb-2">Chyba při načítání grafu</div>
          <div className="text-white/60 text-sm">{error}</div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
