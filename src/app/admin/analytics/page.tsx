'use client';

import React, { useState } from 'react';
import { 
  DashboardButton, 
  DashboardCard, 
  StatCard,
  DashboardTable 
} from '@/components/dashboard';
import { AnalyticsUniversalChart } from '@/components/charts'; // ✅ NOVÝ IMPORT - Sjednocený admin graf

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

  const getCurrentValue = () => {
    switch (selectedMetric) {
      case 'users': return analyticsData.overview.totalUsers.toLocaleString();
      case 'revenue': return `$${analyticsData.overview.totalRevenue.toLocaleString()}`;
      case 'nfts': return analyticsData.overview.totalNFTsMinted.toLocaleString();
      case 'gas': return `${analyticsData.overview.avgGasPrice} gwei`;
      default: return '';
    }
  };

  const getTrend = () => {
    switch (selectedMetric) {
      case 'users': return { value: 23.5, isPositive: true };
      case 'revenue': return { value: 15.2, isPositive: true };
      case 'nfts': return { value: 28.7, isPositive: true };
      case 'gas': return { value: 8.2, isPositive: false };
      default: return { value: 0, isPositive: true };
    }
  };

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
    <div className="p-6 lg:p-8">
      {/* Admin Page Header - UNIFIED STYLE */}
      <DashboardCard variant="highlighted" className="mb-6 border-red-500/20 bg-gradient-to-br from-red-500/5 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Analytics Dashboard</h1>
              <p className="text-white/60 text-sm">Pokročilá analýza uživatelů a výkonu</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <DashboardButton variant="outline" className="border-red-500 text-red-400">
              Export Data
            </DashboardButton>
            <DashboardButton variant="primary" className="bg-red-500 border-red-500">
              Real-time View
            </DashboardButton>
          </div>
        </div>
      </DashboardCard>

      {/* Analytics Overview - UNIFIED STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Celkem Uživatelů"
          value={analyticsData.overview.totalUsers.toLocaleString()}
          trend={{
            value: ((analyticsData.overview.newUsers30d / analyticsData.overview.totalUsers) * 100),
            isPositive: true
          }}
        />
        
        <StatCard
          title="Revenue (Total)"
          value={`$${analyticsData.overview.totalRevenue.toLocaleString()}`}
          trend={{
            value: 23.5,
            isPositive: true
          }}
        />
        
        <StatCard
          title="NFTs Minted"
          value={analyticsData.overview.totalNFTsMinted.toLocaleString()}
          trend={{
            value: ((analyticsData.overview.nftsMinted30d / analyticsData.overview.totalNFTsMinted) * 100),
            isPositive: true
          }}
        />
        
        <StatCard
          title="Avg Gas Price"
          value={`${analyticsData.overview.avgGasPrice} gwei`}
          trend={{
            value: 8.2,
            isPositive: false
          }}
        />
      </div>

      {/* Charts Section - UNIFIED STYLE */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        
        {/* ✅ HLAVNÍ GRAF - NOVÁ IMPLEMENTACE */}
        <div className="xl:col-span-2">
          <div className="mb-4 flex justify-end space-x-2">
            {/* Metric Selector */}
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value as 'users' | 'revenue' | 'nfts' | 'gas')}
              className="bg-white/5 border border-white/20 rounded-lg px-3 py-1 text-white text-sm focus:border-red-400 focus:outline-none backdrop-blur-md"
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
              className="bg-white/5 border border-white/20 rounded-lg px-3 py-1 text-white text-sm focus:border-red-400 focus:outline-none backdrop-blur-md"
            >
              <option value="7d">7 dní</option>
              <option value="30d">30 dní</option>
              <option value="90d">90 dní</option>
              <option value="1y">1 rok</option>
            </select>
          </div>

          <AnalyticsUniversalChart 
            data={getChartData()}
            title={getChartTitle()}
            primaryKey="value"
            height={300}
            currentValue={getCurrentValue()}
            trend={getTrend()}
            primaryColor="#EF4444" // Červená pro admin
          />
        </div>

        {/* Top Users - UNIFIED STYLE */}
        <DashboardCard variant="default">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">Top Holders</h3>
          </div>
          
          <div className="space-y-3">
            {topUsers.map((user, index) => (
              <div key={user.address} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-300" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">#{index + 1}</span>
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
                  <p className="text-xs text-white/60">
                    {user.nftsOwned} NFTs • ${user.totalValue.toLocaleString()}
                  </p>
                  <p className="text-xs text-white/40">
                    {user.transactions} txs • {user.lastActive}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <DashboardButton variant="ghost" className="w-full mt-4 text-red-400 hover:text-red-300">
            View All Users →
          </DashboardButton>
        </DashboardCard>
      </div>

      {/* Project Performance - UNIFIED STYLE */}
      <DashboardCard variant="default" padding="none">
        <div className="p-6 border-b border-white/10">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Project Performance</h3>
            </div>
            <div className="flex space-x-2">
              <DashboardButton variant="outline" onClick={() => handleExport('csv')}>
                Export CSV
              </DashboardButton>
              <DashboardButton variant="outline" onClick={() => handleExport('json')}>
                Export JSON
              </DashboardButton>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <DashboardTable
            columns={[
              { 
                key: 'name', 
                label: 'Project',
                render: (value) => (
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-400 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="font-medium text-white">{value}</span>
                  </div>
                )
              },
              { 
                key: 'users', 
                label: 'Users',
                render: (value) => <span className="text-white">{value.toLocaleString()}</span>
              },
              { 
                key: 'revenue', 
                label: 'Revenue',
                render: (value) => <span className="text-white font-medium">${value.toLocaleString()}</span>
              },
              { 
                key: 'avgPrice', 
                label: 'Avg Price',
                render: (value) => <span className="text-white">{value} ETH</span>
              },
              { 
                key: 'volume24h', 
                label: '24h Volume',
                render: (value) => <span className="text-white">{value} ETH</span>
              },
              { 
                key: 'growth', 
                label: 'Growth',
                render: (value) => <span className="text-green-400">+{value}%</span>
              },
              { 
                key: 'holders', 
                label: 'Holders',
                render: (value) => <span className="text-white">{value.toLocaleString()}</span>
              },
              { 
                key: 'transactions', 
                label: 'Transactions',
                render: (value) => <span className="text-white">{value.toLocaleString()}</span>
              }
            ]}
            data={projectPerformance}
          />
        </div>
      </DashboardCard>

      {/* Real-time Stats - UNIFIED STYLE */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {/* Active Users */}
        <DashboardCard variant="default">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center mr-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <h4 className="text-lg font-semibold text-white">Live Users</h4>
            </div>
          </div>
          <div className="text-3xl font-bold text-red-400 mb-2">342</div>
          <p className="text-sm text-white/60 mb-4">Currently active</p>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Desktop</span>
              <span className="text-white">68%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Mobile</span>
              <span className="text-white">32%</span>
            </div>
          </div>
        </DashboardCard>

        {/* Transaction Volume */}
        <DashboardCard variant="default">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-white">24h Volume</h4>
            </div>
          </div>
          <div className="text-3xl font-bold text-red-400 mb-2">89.4 ETH</div>
          <p className="text-sm text-green-400">+15.3% from yesterday</p>
        </DashboardCard>

        {/* Network Status */}
        <DashboardCard variant="default">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center mr-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <h4 className="text-lg font-semibold text-white">Network</h4>
            </div>
          </div>
          <div className="text-3xl font-bold text-red-400 mb-2">25.6</div>
          <p className="text-sm text-white/60 mb-2">Gwei average</p>
          <p className="text-sm text-white/60">Block time: 12.1s</p>
        </DashboardCard>

        {/* Error Rate */}
        <DashboardCard variant="default">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-white">Error Rate</h4>
            </div>
          </div>
          <div className="text-3xl font-bold text-red-400 mb-2">0.02%</div>
          <p className="text-sm text-green-400">Below 0.1% target</p>
        </DashboardCard>
      </div>
    </div>
  );
}