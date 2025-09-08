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
      {/* Admin Header */}
      <div className="dashboard-header rounded-lg mb-6 border-red-500/20">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="dashboard-header-title">Admin Dashboard</h1>
            <p className="text-[#7FDBDB]/60 text-sm">Gavlik Capital - Kompletní správa DApp</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded uppercase">
              Super Admin
            </span>
            <button 
              onClick={handleEmergencyStop}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded transition-all"
            >
              Emergency Stop
            </button>
          </div>
        </div>
      </div>

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
        {/* Portfolio Value Chart */}
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
                  <button
                    key={period}
                    className={`px-3 py-1 text-xs font-medium rounded transition-all ${
                      period === 'M' 
                        ? 'bg-red-500 text-white' 
                        : 'bg-[#1E3A3A] text-[#7FDBDB] hover:bg-[#2A4A4A]'
                    }`}
                  >
                    {period}
                  </button>
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

        {/* System Status */}
        <div className="space-y-4">
          <DashboardCard variant="default" className="border-red-500/20">
            <p className="text-xs text-red-400/70 uppercase tracking-wider mb-2">
              System Status
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#7FDBDB]/70">Smart Contracts</span>
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#7FDBDB]/70">IPFS Node</span>
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#7FDBDB]/70">API Server</span>
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#7FDBDB]/70">Database</span>
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </div>
            </div>
          </DashboardCard>

          <DashboardCard variant="default">
            <p className="text-xs text-[#7FDBDB]/70 uppercase tracking-wider mb-2">
              Pending Actions
            </p>
            <h3 className="text-2xl font-bold text-red-400 mb-1">23</h3>
            <p className="text-xs text-[#7FDBDB]/60">Transactions waiting</p>
            <button className="mt-3 w-full px-3 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded text-sm font-medium hover:bg-red-500/30 transition-all">
              Review All
            </button>
          </DashboardCard>
        </div>
      </div>

      {/* NFT Projects Table */}
      <DashboardCard variant="default" padding="none">
        <div className="p-4 border-b border-[#1E4848]/40">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">NFT Projects Overview</h3>
            <button className="px-4 py-2 bg-red-500 text-white text-sm font-bold rounded hover:bg-red-600 transition-all">
              Add New Project
            </button>
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
                render: (value, item) => (
                  <div>
                    <span className="text-white">{value.toLocaleString()}</span>
                    <span className="text-[#7FDBDB]/50 text-xs"> / {item.maxSupply.toLocaleString()}</span>
                    <div className="w-full bg-[#1E3A3A] rounded-full h-1 mt-1">
                      <div 
                        className="bg-gradient-to-r from-red-500 to-red-400 h-1 rounded-full"
                        style={{ width: `${(value / item.maxSupply) * 100}%` }}
                      />
                    </div>
                  </div>
                )
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
        
        <div className="p-4 border-t border-[#1E4848]/40">
          <button className="text-red-400 text-sm font-medium hover:text-red-300 transition-colors">
            View All Projects →
          </button>
        </div>
      </DashboardCard>
    </div>
  );
}
