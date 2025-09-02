'use client';

import React, { useState } from 'react';
import { Container, Stack, PageHeader } from '@/components/layout';
import { EnhancedValueCard } from '@/components/cards';
import { LineChart } from '@/components/charts';

export default function AnalyticsAdminPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [selectedMetric, setSelectedMetric] = useState<'users' | 'revenue' | 'nfts' | 'gas'>('users');

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalUsers: 8947,
      activeUsers30d: 5234,
      newUsers30d: 1247,
      totalRevenue: 2890000,
      revenue30d: 456000,
      totalNFTsMinted: 18934,
      nftsMinted30d: 2341,
      avgGasPrice: 25.6,
      totalGasUsed: 185.7,
    },
    
    // User analytics
    userGrowth: [
      { name: 'Jan', value: 1200 },
      { name: 'Feb', value: 1800 },
      { name: 'Mar', value: 2400 },
      { name: 'Apr', value: 3200 },
      { name: 'May', value: 4100 },
      { name: 'Jun', value: 5600 },
      { name: 'Jul', value: 6800 },
      { name: 'Aug', value: 8947 },
    ],
    
    // Revenue analytics
    revenueData: [
      { name: 'Jan', value: 125000 },
      { name: 'Feb', value: 189000 },
      { name: 'Mar', value: 234000 },
      { name: 'Apr', value: 298000 },
      { name: 'May', value: 367000 },
      { name: 'Jun', value: 445000 },
      { name: 'Jul', value: 523000 },
      { name: 'Aug', value: 612000 },
    ],
    
    // NFT minting analytics
    mintingData: [
      { name: 'Jan', value: 450 },
      { name: 'Feb', value: 780 },
      { name: 'Mar', value: 1200 },
      { name: 'Apr', value: 1650 },
      { name: 'May', value: 2100 },
      { name: 'Jun', value: 2800 },
      { name: 'Jul', value: 3200 },
      { name: 'Aug', value: 3850 },
    ],
    
    // Gas analytics
    gasData: [
      { name: 'Jan', value: 35.2 },
      { name: 'Feb', value: 42.1 },
      { name: 'Mar', value: 38.7 },
      { name: 'Apr', value: 29.4 },
      { name: 'May', value: 25.6 },
      { name: 'Jun', value: 31.8 },
      { name: 'Jul', value: 28.3 },
      { name: 'Aug', value: 25.6 },
    ],
  };

  const projectPerformance = [
    {
      name: 'GC Cards',
      users: 3420,
      revenue: 854000,
      avgPrice: 0.25,
      volume24h: 12.5,
      growth: 15.3,
      holders: 2847,
      transactions: 15678,
    },
    {
      name: 'BTC Bot',
      users: 1850,
      revenue: 1480000,
      avgPrice: 0.8,
      volume24h: 8.3,
      growth: 22.8,
      holders: 1654,
      transactions: 8934,
    },
    {
      name: 'Algo Trader',
      users: 2890,
      revenue: 1301000,
      avgPrice: 0.45,
      volume24h: 15.7,
      growth: 18.7,
      holders: 2456,
      transactions: 12456,
    },
    {
      name: 'VC NFT',
      users: 774,
      revenue: 1625400,
      avgPrice: 2.1,
      volume24h: 32.1,
      growth: 28.5,
      holders: 623,
      transactions: 3421,
    },
  ];

  const topUsers = [
    {
      address: '0x1234...5678',
      ensName: 'whale.eth',
      nftsOwned: 156,
      totalValue: 234000,
      transactions: 287,
      lastActive: '2 min ago',
      tier: 'whale',
    },
    {
      address: '0x8765...4321',
      ensName: 'crypto.eth',
      nftsOwned: 89,
      totalValue: 178000,
      transactions: 156,
      lastActive: '15 min ago',
      tier: 'vip',
    },
    {
      address: '0x9999...1111',
      ensName: 'alice.eth',
      nftsOwned: 67,
      totalValue: 89000,
      transactions: 134,
      lastActive: '1 hour ago',
      tier: 'premium',
    },
    {
      address: '0x5555...7777',
      ensName: null,
      nftsOwned: 45,
      totalValue: 67000,
      transactions: 89,
      lastActive: '3 hours ago',
      tier: 'basic',
    },
  ];

  const getChartData = () => {
    switch (selectedMetric) {
      case 'users': return analyticsData.userGrowth;
      case 'revenue': return analyticsData.revenueData;
      case 'nfts': return analyticsData.mintingData;
      case 'gas': return analyticsData.gasData;
      default: return analyticsData.userGrowth;
    }
  };

  const getChartTitle = () => {
    switch (selectedMetric) {
      case 'users': return 'User Growth';
      case 'revenue': return 'Revenue Trend';
      case 'nfts': return 'NFTs Minted';
      case 'gas': return 'Gas Price History';
      default: return 'Analytics';
    }
  };

  const getMinMaxValues = (data: Array<{ name: string; value: number }>) => {
    if (data.length === 0) return { min: 0, max: 100 };
    const values = data.map(d => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    // Add some padding to the chart
    const padding = (max - min) * 0.1;
    return {
      min: Math.floor(Math.max(0, min - padding)),
      max: Math.ceil(max + padding)
    };
  };

  const getCurrentValueAndMonth = (data: Array<{ name: string; value: number }>) => {
    if (data.length === 0) return { value: 0, month: '' };
    const lastItem = data[data.length - 1];
    return {
      value: lastItem.value,
      month: lastItem.name
    };
  };

  const getTimeframeValue = () => {
    switch (selectedTimeRange) {
      case '7d': return 'weekly';
      case '30d': return 'monthly';
      case '90d': return 'monthly';
      case '1y': return 'yearly';
      default: return 'monthly';
    }
  };

  const handleTimeframeChange = (value: string) => {
    switch (value) {
      case 'weekly': setSelectedTimeRange('7d'); break;
      case 'monthly': setSelectedTimeRange('30d'); break;
      case 'yearly': setSelectedTimeRange('1y'); break;
      default: setSelectedTimeRange('30d');
    }
  }


  const handleExport = (type: 'csv' | 'json' | 'pdf') => {
    console.log(`Exporting analytics as ${type}`);
    // TODO: Implement actual export functionality
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'whale': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'vip': return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      case 'premium': return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      case 'basic': return 'bg-gradient-to-r from-gray-500 to-gray-600';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Container fluid className="py-4 sm:py-6">
      <Stack spacing="lg">
        <PageHeader 
          title="Analytics Dashboard"
          showBackButton={true}
        />

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <EnhancedValueCard
            title="Celkem Uživatelů"
            value={analyticsData.overview.totalUsers}
            formatter={(v) => v.toLocaleString()}
            trend={{
              value: ((analyticsData.overview.newUsers30d / analyticsData.overview.totalUsers) * 100),
              direction: 'up',
              period: '30 dní'
            }}
            className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20"
          />
          
          <EnhancedValueCard
            title="Revenue (Total)"
            value={analyticsData.overview.totalRevenue}
            formatter={(v) => `$${v.toLocaleString()}`}
            trend={{
              value: 23.5,
              direction: 'up',
              period: '30 dní'
            }}
            className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20"
          />
          
          <EnhancedValueCard
            title="NFTs Minted"
            value={analyticsData.overview.totalNFTsMinted}
            formatter={(v) => v.toLocaleString()}
            trend={{
              value: ((analyticsData.overview.nftsMinted30d / analyticsData.overview.totalNFTsMinted) * 100),
              direction: 'up',
              period: '30 dní'
            }}
            className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border-yellow-500/20"
          />
          
          <EnhancedValueCard
            title="Avg Gas Price"
            value={analyticsData.overview.avgGasPrice}
            formatter={(v) => `${v} gwei`}
            trend={{
              value: 8.2,
              direction: 'down',
              period: '24h'
            }}
            className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Main Chart */}
          <div className="xl:col-span-2">
            <div className="bg-[#151515] rounded-xl border border-[#333333] p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">Analytics Trends</h3>
                
                <div className="flex space-x-2">
                  {/* Metric Selector */}
                  <select
                    value={selectedMetric}
                    onChange={(e) => setSelectedMetric(e.target.value as 'users' | 'revenue' | 'nfts' | 'gas')}
                    className="bg-[#1a1a1a] border border-[#333333] rounded-lg px-3 py-1 text-white text-sm focus:border-[#F9D523] focus:outline-none"
                  >
                    <option value="users">Users</option>
                    <option value="revenue">Revenue</option>
                    <option value="nfts">NFTs</option>
                    <option value="gas">Gas Price</option>
                  </select>
                  
                  {/* Time Range Selector */}
                  <select
                    value={selectedTimeRange}
                    onChange={(e) => setSelectedTimeRange(e.target.value as '7d' | '30d' | '90d' | '1y')}
                    className="bg-[#1a1a1a] border border-[#333333] rounded-lg px-3 py-1 text-white text-sm focus:border-[#F9D523] focus:outline-none"
                  >
                    <option value="7d">7 dní</option>
                    <option value="30d">30 dní</option>
                    <option value="90d">90 dní</option>
                    <option value="1y">1 rok</option>
                  </select>
                </div>
              </div>
              
              <div className="h-80">
                {
                  (() => {
                    const chartData = getChartData();
                    const { min, max } = getMinMaxValues(chartData);
                    const { value: currentValue, month: currentMonth } = getCurrentValueAndMonth(chartData);
                    
                    return (
                      <LineChart 
                        title={getChartTitle()}
                        data={chartData}
                        currentValue={currentValue}
                        currentMonth={currentMonth}
                        minValue={min}
                        maxValue={max}
                        timeframe={getTimeframeValue()}
                        onTimeframeChange={handleTimeframeChange}
                      />
                    );
                  })()
                }
              </div>
            </div>
          </div>

          {/* Top Users */}
          <div className="bg-[#151515] rounded-xl border border-[#333333] p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Top Holders</h3>
            
            <div className="space-y-4">
              {topUsers.map((user, index) => (
                <div key={user.address} className="flex items-center space-x-3 p-3 bg-[#1a1a1a] rounded-lg">
                  <div className="w-8 h-8 bg-[#F9D523] rounded-full flex items-center justify-center">
                    <span className="text-[#151515] font-bold text-sm">#{index + 1}</span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="text-white text-sm font-medium truncate">
                        {user.ensName || `${user.address.slice(0, 6)}...${user.address.slice(-4)}`}
                      </p>
                      <span className={`px-2 py-1 rounded text-xs text-white ${getTierColor(user.tier)}`}>
                        {user.tier.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-[#666666]">
                      {user.nftsOwned} NFTs • ${user.totalValue.toLocaleString()}
                    </p>
                    <p className="text-xs text-[#666666]">
                      {user.transactions} txs • {user.lastActive}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full text-center text-[#F9D523] text-sm mt-4 hover:text-[#e3c320] transition-colors">
              View All Users →
            </button>
          </div>
        </div>

        {/* Project Performance */}
        <div className="bg-[#151515] rounded-xl border border-[#333333] p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white">Project Performance</h3>
            <div className="flex space-x-2">
              <button 
                onClick={() => handleExport('csv')}
                className="bg-[#333333] hover:bg-[#444444] text-white px-3 py-2 rounded-lg text-sm transition-colors"
              >
                Export CSV
              </button>
              <button 
                onClick={() => handleExport('json')}
                className="bg-[#333333] hover:bg-[#444444] text-white px-3 py-2 rounded-lg text-sm transition-colors"
              >
                Export JSON
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#1a1a1a] border-b border-[#333333]">
                <tr>
                  <th className="text-left p-4 text-[#666666] text-sm font-medium">Project</th>
                  <th className="text-left p-4 text-[#666666] text-sm font-medium">Users</th>
                  <th className="text-left p-4 text-[#666666] text-sm font-medium">Revenue</th>
                  <th className="text-left p-4 text-[#666666] text-sm font-medium">Avg Price</th>
                  <th className="text-left p-4 text-[#666666] text-sm font-medium">24h Volume</th>
                  <th className="text-left p-4 text-[#666666] text-sm font-medium">Growth</th>
                  <th className="text-left p-4 text-[#666666] text-sm font-medium">Holders</th>
                  <th className="text-left p-4 text-[#666666] text-sm font-medium">Transactions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#333333]">
                {projectPerformance.map((project) => (
                  <tr key={project.name} className="hover:bg-[#1a1a1a]/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-[#F9D523] to-[#e3c320] rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#151515]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="font-medium text-white">{project.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-white">{project.users.toLocaleString()}</td>
                    <td className="p-4 text-white font-medium">${project.revenue.toLocaleString()}</td>
                    <td className="p-4 text-white">{project.avgPrice} ETH</td>
                    <td className="p-4 text-white">{project.volume24h} ETH</td>
                    <td className="p-4">
                      <span className="text-green-400">+{project.growth}%</span>
                    </td>
                    <td className="p-4 text-white">{project.holders.toLocaleString()}</td>
                    <td className="p-4 text-white">{project.transactions.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Real-time Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Active Users */}
          <div className="bg-[#151515] rounded-xl border border-[#333333] p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">Live Users</h4>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="text-3xl font-bold text-[#F9D523] mb-2">342</div>
            <p className="text-sm text-[#666666]">Currently active</p>
            
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#666666]">Desktop</span>
                <span className="text-white">68%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#666666]">Mobile</span>
                <span className="text-white">32%</span>
              </div>
            </div>
          </div>

          {/* Transaction Volume */}
          <div className="bg-[#151515] rounded-xl border border-[#333333] p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">24h Volume</h4>
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-[#F9D523] mb-2">89.4 ETH</div>
            <p className="text-sm text-green-400">+15.3% from yesterday</p>
          </div>

          {/* Network Status */}
          <div className="bg-[#151515] rounded-xl border border-[#333333] p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">Network</h4>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-3xl font-bold text-[#F9D523] mb-2">25.6</div>
            <p className="text-sm text-[#666666]">Gwei average</p>
            
            <div className="mt-4">
              <p className="text-sm text-[#666666]">Block time: 12.1s</p>
            </div>
          </div>

          {/* Error Rate */}
          <div className="bg-[#151515] rounded-xl border border-[#333333] p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">Error Rate</h4>
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-[#F9D523] mb-2">0.02%</div>
            <p className="text-sm text-green-400">Below 0.1% target</p>
          </div>
        </div>
      </Stack>
    </Container>
  );
}
