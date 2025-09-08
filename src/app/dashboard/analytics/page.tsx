'use client';

import React, { useState, useEffect } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { DashboardButton, StatCard } from '@/components/dashboard';
import { 
  PortfolioChart, 
  AllocationChart, 
  PerformanceChart,
  VolumeChart,
  ChartContainer 
} from '@/components/charts';
import { usePortfolio, useApi } from '@/hook';
import { Calendar, Download, Filter, BarChart3, TrendingUp, PieChart } from 'lucide-react';

// Mock analytics data
const analyticsData = {
  overview: {
    totalReturn: 24.5,
    sharpeRatio: 1.42,
    volatility: 12.8,
    maxDrawdown: -8.3,
    winRate: 67.4,
    avgHoldingPeriod: 45
  },
  performance: {
    oneDay: 2.4,
    oneWeek: 5.8,
    oneMonth: 12.3,
    threeMonths: 18.7,
    sixMonths: 24.5,
    oneYear: 42.1,
    ytd: 28.9
  },
  benchmarkComparison: [
    { name: 'Jan', portfolio: 1000, sp500: 1000, crypto: 1000 },
    { name: 'Feb', portfolio: 1150, sp500: 1080, crypto: 1200 },
    { name: 'Mar', portfolio: 1230, sp500: 1120, crypto: 1350 },
    { name: 'Apr', portfolio: 1180, sp500: 1090, crypto: 1100 },
    { name: 'May', portfolio: 1320, sp500: 1150, crypto: 1280 },
    { name: 'Jun', portfolio: 1450, sp500: 1200, crypto: 1450 },
    { name: 'Jul', portfolio: 1380, sp500: 1180, crypto: 1320 },
    { name: 'Aug', portfolio: 1520, sp500: 1220, crypto: 1480 },
    { name: 'Sep', portfolio: 1480, sp500: 1210, crypto: 1400 },
    { name: 'Oct', portfolio: 1620, sp500: 1250, crypto: 1550 },
    { name: 'Nov', portfolio: 1580, sp500: 1240, crypto: 1480 },
    { name: 'Dec', portfolio: 1680, sp500: 1280, crypto: 1600 }
  ],
  allocation: [
    { name: 'GC Cards', value: 45, amount: 12500 },
    { name: 'BTC Bots', value: 25, amount: 6800 },
    { name: 'Algo Traders', value: 20, amount: 5400 },
    { name: 'Cash', value: 10, amount: 2700 }
  ],
  tradingVolume: [
    { name: 'Jan', volume: 45000 },
    { name: 'Feb', volume: 52000 },
    { name: 'Mar', volume: 48000 },
    { name: 'Apr', volume: 61000 },
    { name: 'May', volume: 55000 },
    { name: 'Jun', volume: 67000 },
    { name: 'Jul', volume: 59000 },
    { name: 'Aug', volume: 73000 },
    { name: 'Sep', volume: 65000 },
    { name: 'Oct', volume: 78000 },
    { name: 'Nov', volume: 71000 },
    { name: 'Dec', volume: 82000 }
  ],
  riskMetrics: [
    { name: 'Value at Risk (95%)', value: -2.8, unit: '%' },
    { name: 'Expected Shortfall', value: -4.2, unit: '%' },
    { name: 'Beta', value: 1.15, unit: '' },
    { name: 'Alpha', value: 3.2, unit: '%' },
    { name: 'Information Ratio', value: 0.85, unit: '' },
    { name: 'Calmar Ratio', value: 2.95, unit: '' }
  ]
};

const timeFrames = [
  { key: '1D', label: '1 den' },
  { key: '1W', label: '1 týden' },
  { key: '1M', label: '1 měsíc' },
  { key: '3M', label: '3 měsíce' },
  { key: '6M', label: '6 měsíců' },
  { key: '1Y', label: '1 rok' },
  { key: 'YTD', label: 'Letošní rok' },
  { key: 'ALL', label: 'Vše' }
];

export default function AnalyticsPage() {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('1Y');
  const [loading, setLoading] = useState(true);
  const [showBenchmark, setShowBenchmark] = useState(true);
  
  // Mock user data
  const userProfile = {
    name: "Jan Novák",
    email: "jan.novak@email.cz",
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb3",
    kycVerified: true,
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [selectedTimeFrame]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number, decimals = 1) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`;
  };

  const getPerformanceColor = (value: number) => {
    return value >= 0 ? 'text-green-500' : 'text-red-500';
  };

  const exportData = () => {
    // Mock export functionality
    console.log('Exporting analytics data...');
  };

  return (
    <div className="min-h-screen">
      {/* TopBar */}
      <TopBar 
        title="Analytics & Reporting"
        userProfile={userProfile}
        notificationCount={3}
      />
      
      <div className="p-4 sm:p-6 lg:p-8">
        
        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-8">
          
          {/* Time frame selector */}
          <div className="flex flex-wrap gap-2">
            {timeFrames.map((timeFrame) => (
              <button
                key={timeFrame.key}
                onClick={() => setSelectedTimeFrame(timeFrame.key)}
                className={`
                  px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                  ${selectedTimeFrame === timeFrame.key
                    ? 'bg-[#F9D523] text-black'
                    : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20'
                  }
                `}
              >
                {timeFrame.label}
              </button>
            ))}
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowBenchmark(!showBenchmark)}
              className={`
                px-3 py-1.5 rounded-lg text-sm transition-all flex items-center space-x-2
                ${showBenchmark
                  ? 'bg-[#F9D523]/20 text-[#F9D523] border border-[#F9D523]/40'
                  : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20'
                }
              `}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Benchmark</span>
            </button>
            
            <DashboardButton onClick={exportData} variant="secondary">
              <Download className="w-4 h-4 mr-2" />
              Export
            </DashboardButton>
            
            <DashboardButton variant="secondary">
              <Filter className="w-4 h-4 mr-2" />
              Filtry
            </DashboardButton>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <StatCard
            title="Celkový výnos"
            value={formatPercentage(analyticsData.overview.totalReturn)}
            trend="up"
            className="col-span-2 sm:col-span-1"
          />
          <StatCard
            title="Sharpe Ratio"
            value={analyticsData.overview.sharpeRatio.toFixed(2)}
          />
          <StatCard
            title="Volatilita"
            value={formatPercentage(analyticsData.overview.volatility)}
          />
          <StatCard
            title="Max Drawdown"
            value={formatPercentage(analyticsData.overview.maxDrawdown)}
            trend="down"
          />
          <StatCard
            title="Úspěšnost"
            value={formatPercentage(analyticsData.overview.winRate)}
            trend="up"
          />
          <StatCard
            title="Průměrná doba držení"
            value={`${analyticsData.overview.avgHoldingPeriod} dní`}
          />
        </div>

        {/* Performance by Time Period */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">Výkonnost podle období</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {Object.entries(analyticsData.performance).map(([period, value]) => {
              const labels: Record<string, string> = {
                oneDay: '1D',
                oneWeek: '1T',
                oneMonth: '1M',
                threeMonths: '3M',
                sixMonths: '6M',
                oneYear: '1R',
                ytd: 'YTD'
              };
              
              return (
                <div key={period} className="text-center">
                  <div className="text-white/60 text-sm mb-1">
                    {labels[period]}
                  </div>
                  <div className={`text-lg font-semibold ${getPerformanceColor(value)}`}>
                    {formatPercentage(value)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          
          {/* Portfolio Performance Chart */}
          <div className="lg:col-span-2">
            <ChartContainer loading={loading}>
              <PortfolioChart
                data={analyticsData.benchmarkComparison}
                valueKey="portfolio"
                compareKey={showBenchmark ? "sp500" : undefined}
                showComparison={showBenchmark}
                height={400}
              />
            </ChartContainer>
          </div>
          
          {/* Asset Allocation */}
          <div>
            <ChartContainer loading={loading}>
              <AllocationChart
                data={analyticsData.allocation}
                height={400}
              />
            </ChartContainer>
          </div>
        </div>

        {/* Secondary Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          
          {/* Trading Volume */}
          <ChartContainer loading={loading}>
            <VolumeChart
              data={analyticsData.tradingVolume}
              height={300}
            />
          </ChartContainer>
          
          {/* Performance Metrics */}
          <ChartContainer loading={loading}>
            <PerformanceChart
              metrics={[
                { name: 'Portfolio', returns: 24.5, volatility: 12.8, sharpe: 1.42 },
                { name: 'S&P 500', returns: 18.2, volatility: 15.2, sharpe: 1.19 },
                { name: 'Crypto Index', returns: 31.8, volatility: 28.5, sharpe: 1.12 }
              ]}
              height={300}
            />
          </ChartContainer>
        </div>

        {/* Risk Metrics */}
        <div className="glass-card p-6 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <TrendingUp className="w-6 h-6 text-[#F9D523]" />
            <h2 className="text-xl font-semibold text-white">Rizikové metriky</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analyticsData.riskMetrics.map((metric, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-white/60 text-sm mb-1">
                      {metric.name}
                    </div>
                    <div className={`text-xl font-semibold ${
                      metric.value < 0 ? 'text-red-400' : 'text-white'
                    }`}>
                      {metric.value > 0 && metric.name !== 'Beta' ? '+' : ''}
                      {metric.value.toFixed(metric.unit === '%' ? 1 : 2)}
                      {metric.unit}
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-[#F9D523]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Asset Details Table */}
        <div className="glass-card overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white flex items-center space-x-3">
                <PieChart className="w-6 h-6 text-[#F9D523]" />
                <span>Detailní rozložení aktiv</span>
              </h2>
              <DashboardButton variant="secondary" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Poslední aktualizace: Dnes
              </DashboardButton>
            </div>
          </div>
          
          <div className="data-table">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-4 px-6">Asset</th>
                  <th className="text-left py-4 px-6">Alokace</th>
                  <th className="text-left py-4 px-6">Hodnota</th>
                  <th className="text-left py-4 px-6">Denní změna</th>
                  <th className="text-left py-4 px-6">Výnos YTD</th>
                  <th className="text-left py-4 px-6">Sharpe</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.allocation.map((asset, index) => {
                  const dailyChange = (Math.random() - 0.5) * 10; // Mock data
                  const ytdReturn = Math.random() * 50 - 10; // Mock data
                  const sharpe = Math.random() * 2; // Mock data
                  
                  return (
                    <tr key={index} className="border-t border-white/5 hover:bg-white/5">
                      <td className="py-4 px-6">
                        <div className="font-medium text-white">{asset.name}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="text-white">{asset.value}%</div>
                          <div className="w-20 bg-white/10 rounded-full h-2">
                            <div 
                              className="h-full bg-[#F9D523] rounded-full"
                              style={{ width: `${asset.value}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-white">
                        {formatCurrency(asset.amount)}
                      </td>
                      <td className="py-4 px-6">
                        <span className={getPerformanceColor(dailyChange)}>
                          {formatPercentage(dailyChange)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={getPerformanceColor(ytdReturn)}>
                          {formatPercentage(ytdReturn)}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-white">
                        {sharpe.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
