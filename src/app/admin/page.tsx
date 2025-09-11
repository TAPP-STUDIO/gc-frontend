'use client';

import React from 'react';
import { 
  DashboardButton, 
  DashboardCard, 
  StatCard,
  DashboardChart,
  DashboardTable 
} from '@/components/dashboard';

// Admin dashboard data
const adminData = {
  stats: {
    totalUsers: 1247,
    activeUsers: 892,
    totalNFTs: 8934,
    totalValue: 3153750,
    monthlyRewards: 45670,
    systemHealth: 98.5
  },
  chartData: [
    { name: 'Jan', value: 800 },
    { name: 'Feb', value: 950 },
    { name: 'Mar', value: 1100 },
    { name: 'Apr', value: 1050 },
    { name: 'May', value: 1300 },
    { name: 'Jun', value: 1450 },
    { name: 'Jul', value: 1680 },
    { name: 'Aug', value: 1820 },
    { name: 'Sep', value: 2100 },
    { name: 'Oct', value: 2400 },
    { name: 'Nov', value: 2800 },
    { name: 'Dec', value: 3153 }
  ],
  projects: [
    { 
      name: 'GC Cards',
      minted: 3420,
      maxSupply: 10000,
      floorPrice: 0.25,
      volume24h: 12.5,
      status: 'active'
    },
    { 
      name: 'BTC Bot',
      minted: 1850,
      maxSupply: 5000,
      floorPrice: 0.8,
      volume24h: 8.3,
      status: 'active'
    },
    { 
      name: 'Algo Trader',
      minted: 2890,
      maxSupply: 7500,
      floorPrice: 0.45,
      volume24h: 15.7,
      status: 'active'
    },
    { 
      name: 'VC NFT',
      minted: 774,
      maxSupply: 1500,
      floorPrice: 2.1,
      volume24h: 32.1,
      status: 'presale'
    }
  ]
};

export default function AdminDashboard() {
  const handleEmergencyStop = () => {
    console.log('Emergency stop triggered');
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Admin Header - UNIFIED GLASS CARD STYLE */}
      <DashboardCard 
        variant="highlighted" 
        className="mb-6 border-red-500/20 bg-gradient-to-br from-red-500/5 to-transparent"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-white/60 text-sm">Gavlik Capital - Kompletní správa DApp</p>
          </div>
          <div className="flex items-center gap-4">
            <span 
              className="px-4 py-2 text-red-400 text-xs font-bold rounded-full uppercase tracking-wider"
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                backdropFilter: 'blur(10px)'
              }}
            >
              Super Admin
            </span>
            <DashboardButton 
              variant="outline"
              onClick={handleEmergencyStop}
              className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
            >
              Emergency Stop
            </DashboardButton>
          </div>
        </div>
      </DashboardCard>

      {/* Admin Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <StatCard
          title="Celková hodnota"
          value={`$${adminData.stats.totalValue.toLocaleString()}`}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title="Aktivní uživatelé"
          value={adminData.stats.activeUsers}
          trend={{ value: 8.3, isPositive: true }}
        />
        <StatCard
          title="Celkem NFTs"
          value={adminData.stats.totalNFTs.toLocaleString()}
          trend={{ value: 156, isPositive: true }}
        />
        <StatCard
          title="Měsíční odměny"
          value={`$${adminData.stats.monthlyRewards.toLocaleString()}`}
          trend={{ value: 23.1, isPositive: true }}
        />
        <StatCard
          title="System Health"
          value={`${adminData.stats.systemHealth}%`}
          badge="OK"
        />
        <StatCard
          title="Total Users"
          value={adminData.stats.totalUsers.toLocaleString()}
          trend={{ value: 89, isPositive: true }}
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Portfolio Value Chart - UNIFIED STYLE */}
        <div className="lg:col-span-2">
          <DashboardCard variant="highlighted" className="h-full">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-xs text-red-400/70 uppercase tracking-wider mb-1">
                  Total Portfolio Value
                </p>
                <h2 className="text-3xl font-bold text-white">$3,153,750</h2>
              </div>
              <div className="flex gap-2">
                {['D', 'W', 'M', 'Y'].map((period) => (
                  <DashboardButton
                    key={period}
                    variant={period === 'M' ? 'primary' : 'ghost'}
                    size="sm"
                    className={period === 'M' ? 'bg-red-500 border-red-500 text-white' : ''}
                  >
                    {period}
                  </DashboardButton>
                ))}
              </div>
            </div>
            
            <DashboardChart 
              data={adminData.chartData}
              height={250}
              lineColor="#EF4444"
            />
          </DashboardCard>
        </div>

        {/* System Status - UNIFIED STYLE */}
        <div className="space-y-4">
          <DashboardCard variant="default" className="border-red-500/20">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">System Status</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 rounded-lg hover:bg-white/5 transition-all">
                <span className="text-sm text-white/70">Smart Contracts</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-green-400">Online</span>
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                </div>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg hover:bg-white/5 transition-all">
                <span className="text-sm text-white/70">IPFS Node</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-green-400">Online</span>
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                </div>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg hover:bg-white/5 transition-all">
                <span className="text-sm text-white/70">API Server</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-green-400">Online</span>
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                </div>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg hover:bg-white/5 transition-all">
                <span className="text-sm text-white/70">Database</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-green-400">Online</span>
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard variant="default">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Pending Actions</h3>
            </div>
            <h3 className="text-2xl font-bold text-red-400 mb-1">23</h3>
            <p className="text-xs text-white/60 mb-4">Transactions waiting</p>
            <DashboardButton 
              variant="outline"
              className="w-full border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500"
            >
              Review All
            </DashboardButton>
          </DashboardCard>
        </div>
      </div>

      {/* NFT Projects Table - UNIFIED STYLE */}
      <DashboardCard variant="default" padding="none">
        <div className="p-6 border-b border-white/10">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">NFT Projects Overview</h3>
            </div>
            <DashboardButton 
              variant="primary"
              className="bg-red-500 border-red-500 hover:bg-red-600"
            >
              Add New Project
            </DashboardButton>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <DashboardTable
            columns={[
              { 
                key: 'name', 
                label: 'Project',
                render: (value) => (
                  <span className="font-medium text-white">{value}</span>
                )
              },
              { 
                key: 'minted', 
                label: 'Minted',
                render: (value, item) => {
                  const mintedValue = Number(value);
                  const maxSupplyValue = Number(item.maxSupply);
                  return (
                    <div>
                      <span className="text-white">{mintedValue.toLocaleString()}</span>
                      <span className="text-[#7FDBDB]/50 text-xs"> / {maxSupplyValue.toLocaleString()}</span>
                      <div className="w-full bg-[#1E3A3A] rounded-full h-1 mt-1">
                        <div 
                          className="bg-gradient-to-r from-red-500 to-red-400 h-1 rounded-full"
                          style={{ width: `${(mintedValue / maxSupplyValue) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                }
              },
              { 
                key: 'floorPrice', 
                label: 'Floor Price',
                render: (value) => (
                  <span className="text-[#F9D523]">{value} ETH</span>
                )
              },
              { 
                key: 'volume24h', 
                label: '24h Volume',
                render: (value) => (
                  <span className="text-white">{value} ETH</span>
                )
              },
              { 
                key: 'status', 
                label: 'Status',
                render: (value) => (
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    value === 'active' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {value === 'active' ? 'Active' : 'Presale'}
                  </span>
                )
              }
            ]}
            data={adminData.projects}
          />
        </div>
        
        <div className="p-6 border-t border-white/10">
          <DashboardButton 
            variant="ghost"
            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
          >
            View All Projects →
          </DashboardButton>
        </div>
      </DashboardCard>
    </div>
  );
}
