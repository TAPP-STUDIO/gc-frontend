'use client';

import React from 'react';
import { Container, Stack, PageHeader } from '@/components/layout';
import { EnhancedValueCard } from '@/components/cards';

export default function AdminDashboard() {
  // Mock admin dashboard data
  const adminStats = {
    totalValue: 1245000,
    activeUsers: 1247,
    totalNFTs: 8934,
    monthlyRewards: 45670,
    pendingTransactions: 23,
    systemHealth: 98.5
  };

  const nftProjects = [
    { 
      name: 'GC Cards', 
      totalMinted: 3420, 
      maxSupply: 10000, 
      floorPrice: 0.25, 
      volume24h: 12.5,
      status: 'active',
      activeUsers: 342,
      lastActivity: '2 min ago'
    },
    { 
      name: 'BTC Bot', 
      totalMinted: 1850, 
      maxSupply: 5000, 
      floorPrice: 0.8, 
      volume24h: 8.3,
      status: 'active',
      activeUsers: 187,
      lastActivity: '8 min ago'
    },
    { 
      name: 'Algo Trader', 
      totalMinted: 2890, 
      maxSupply: 7500, 
      floorPrice: 0.45, 
      volume24h: 15.7,
      status: 'active',
      activeUsers: 298,
      lastActivity: '1 min ago'
    },
    { 
      name: 'VC NFT', 
      totalMinted: 774, 
      maxSupply: 1500, 
      floorPrice: 2.1, 
      volume24h: 32.1,
      status: 'presale',
      activeUsers: 89,
      lastActivity: '5 min ago'
    }
  ];

  const recentActivity = [
    { 
      type: 'mint', 
      user: '0x1234...5678', 
      nft: 'GC Cards', 
      amount: 3, 
      value: '$750',
      time: '2 min ago',
      hash: '0xabcd...efgh'
    },
    { 
      type: 'reward', 
      user: '0x8765...4321', 
      amount: 124.5, 
      value: '$124.50',
      time: '5 min ago',
      hash: '0x1234...5678'
    },
    { 
      type: 'transfer', 
      user: '0x9876...1234', 
      nft: 'BTC Bot', 
      amount: 1,
      value: '$800', 
      time: '8 min ago',
      hash: '0x9999...1111'
    },
    { 
      type: 'claim', 
      user: '0x5432...8765', 
      amount: 89.2,
      value: '$89.20', 
      time: '12 min ago',
      hash: '0x7777...3333'
    },
  ];

  const systemAlerts = [
    { 
      type: 'warning', 
      title: 'Vysoká síťová aktivita',
      message: 'Gas fees jsou nyní nad průměrem', 
      time: '5 min ago',
      severity: 'medium'
    },
    { 
      type: 'info', 
      title: 'Scheduled Maintenance',
      message: 'Plánovaná údržba v neděli 2:00 AM', 
      time: '2 hours ago',
      severity: 'low'
    },
    { 
      type: 'success', 
      title: 'Backup dokončen',
      message: 'Automatické zálohování úspěšně provedeno', 
      time: '6 hours ago',
      severity: 'low'
    },
  ];

  const handleQuickAction = (action: string) => {
    console.log(`Admin action: ${action}`);
    // TODO: Implement actual actions
  };

  return (
    <Container fluid className="py-4 sm:py-6">
      <Stack spacing="lg">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-[#666666]">Gavlik Capital - Kompletní správa DApp</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => handleQuickAction('emergency')}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span>Emergency Stop</span>
            </button>
            <button 
              onClick={() => handleQuickAction('export')}
              className="bg-[#333333] hover:bg-[#444444] text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Export Data
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <EnhancedValueCard
            title="Celková Hodnota"
            value={adminStats.totalValue}
            formatter={(v) => `$${v.toLocaleString()}`}
            trend={{
              value: 12.5,
              direction: 'up',
              period: 'měsíc'
            }}
            className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20"
          />
          
          <EnhancedValueCard
            title="Aktivní Uživatelé"
            value={adminStats.activeUsers}
            formatter={(v) => v.toLocaleString()}
            trend={{
              value: 8.3,
              direction: 'up',
              period: 'týden'
            }}
            className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20"
          />
          
          <EnhancedValueCard
            title="Celkem NFTs"
            value={adminStats.totalNFTs}
            formatter={(v) => v.toLocaleString()}
            trend={{
              value: 156,
              direction: 'up',
              period: 'dnes'
            }}
            className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20"
          />
          
          <EnhancedValueCard
            title="Měsíční Odměny"
            value={adminStats.monthlyRewards}
            formatter={(v) => `$${v.toLocaleString()}`}
            trend={{
              value: 23.1,
              direction: 'up',
              period: 'měsíc'
            }}
            className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border-yellow-500/20"
          />
          
          <EnhancedValueCard
            title="Čekající Transakce"
            value={adminStats.pendingTransactions}
            formatter={(v) => String(v)}
            trend={{
              value: 5,
              direction: 'down',
              period: 'hodina'
            }}
            className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20"
          />
          
          <EnhancedValueCard
            title="System Health"
            value={adminStats.systemHealth}
            formatter={(v) => `${v}%`}
            trend={{
              value: 0.2,
              direction: 'up',
              period: 'dnes'
            }}
            className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-emerald-500/20"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* NFT Projects Overview - 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-[#151515] rounded-xl border border-[#333333] p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">NFT Projekty - Admin Přehled</h3>
                <button 
                  onClick={() => handleQuickAction('manage-nfts')}
                  className="text-[#F9D523] hover:text-[#e3c320] text-sm font-medium transition-colors"
                >
                  Správa všech →
                </button>
              </div>
              
              <div className="space-y-4">
                {nftProjects.map((project, index) => (
                  <div key={index} className="bg-[#1a1a1a] rounded-lg p-4 border border-[#333333] hover:border-[#555555] transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#F9D523] to-[#e3c320] rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-[#151515]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{project.name}</h4>
                          <p className="text-sm text-[#666666]">
                            {project.totalMinted.toLocaleString()} / {project.maxSupply.toLocaleString()} minted
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-white font-semibold">{project.floorPrice} ETH</p>
                        <p className="text-sm text-[#666666]">Floor Price</p>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-[#333333] rounded-full h-2 mb-3">
                      <div 
                        className="bg-[#F9D523] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(project.totalMinted / project.maxSupply) * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          project.status === 'active' 
                            ? 'bg-green-500/20 text-green-500' 
                            : 'bg-yellow-500/20 text-yellow-500'
                        }`}>
                          {project.status === 'active' ? 'Aktivní' : 'Předprodej'}
                        </span>
                        <span className="text-xs text-[#666666]">
                          {project.activeUsers} aktivních uživatelů
                        </span>
                        <span className="text-xs text-[#666666]">
                          Poslední aktivita: {project.lastActivity}
                        </span>
                      </div>
                      
                      <button className="text-[#F9D523] hover:text-[#e3c320] text-sm font-medium transition-colors">
                        Admin Panel →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Recent Activity & Alerts */}
          <div className="space-y-6">
            
            {/* System Alerts */}
            <div className="bg-[#151515] rounded-xl border border-[#333333] p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Systémové Alerty</h3>
              
              <div className="space-y-3">
                {systemAlerts.map((alert, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-[#1a1a1a] transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      alert.type === 'warning' ? 'bg-yellow-500' :
                      alert.type === 'info' ? 'bg-blue-500' : 'bg-green-500'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{alert.title}</p>
                      <p className="text-xs text-[#666666] mt-1">{alert.message}</p>
                      <p className="text-xs text-[#666666] mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full text-center text-[#F9D523] text-sm mt-4 hover:text-[#e3c320] transition-colors">
                Zobrazit všechny alerty →
              </button>
            </div>

            {/* Recent Activity */}
            <div className="bg-[#151515] rounded-xl border border-[#333333] p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Poslední Aktivita</h3>
              
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 rounded hover:bg-[#1a1a1a] transition-colors">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'mint' ? 'bg-green-500/20' :
                      activity.type === 'reward' ? 'bg-yellow-500/20' :
                      activity.type === 'transfer' ? 'bg-blue-500/20' : 'bg-purple-500/20'
                    }`}>
                      {activity.type === 'mint' && (
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {activity.type === 'reward' && (
                        <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {activity.type === 'transfer' && (
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      )}
                      {activity.type === 'claim' && (
                        <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white">
                        {activity.type === 'mint' && `Minted ${activity.amount} ${activity.nft}`}
                        {activity.type === 'reward' && `Reward: $${activity.amount}`}
                        {activity.type === 'transfer' && `Transferred ${activity.amount} ${activity.nft}`}
                        {activity.type === 'claim' && `Claimed $${activity.amount}`}
                      </p>
                      <p className="text-xs text-[#666666] truncate">
                        {activity.user} • {activity.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white font-medium">{activity.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full text-center text-[#F9D523] text-sm mt-4 hover:text-[#e3c320] transition-colors">
                Zobrazit všechnu aktivitu →
              </button>
            </div>
          </div>
        </div>
      </Stack>
    </Container>
  );
}
