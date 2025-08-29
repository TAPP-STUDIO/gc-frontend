'use client';

import React, { useState } from 'react';
import { Container, Stack, PageHeader } from '@/components/layout';
import { EnhancedValueCard } from '@/components/cards';

export default function RewardsAdminPage() {
  //const [selectedReward, setSelectedReward] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'pending' | 'scheduled' | 'history'>('pending');

  // Mock rewards data
  const rewardsPools = [
    {
      id: 'gc-cards-pool',
      name: 'GC Cards Dividends',
      type: 'dividend',
      totalPool: 125000,
      currency: 'USDT',
      holders: 3420,
      perNFTReward: 36.55,
      status: 'active',
      lastDistribution: '2024-08-15',
      nextDistribution: '2024-09-01',
      distributionFrequency: 'monthly',
      totalDistributed: 890000,
      roi: 15.2,
    },
    {
      id: 'btc-bot-rewards',
      name: 'BTC Bot Trading Profits',
      type: 'reward',
      totalPool: 85600,
      currency: 'BTC',
      holders: 1850,
      perNFTReward: 0.0463,
      status: 'active',
      lastDistribution: '2024-08-20',
      nextDistribution: '2024-08-27',
      distributionFrequency: 'weekly',
      totalDistributed: 456000,
      roi: 22.8,
    },
    {
      id: 'algo-trader-profits',
      name: 'Algo Trader Returns',
      type: 'reward',
      totalPool: 156000,
      currency: 'ETH',
      holders: 2890,
      perNFTReward: 0.054,
      status: 'calculating',
      lastDistribution: '2024-08-10',
      nextDistribution: '2024-08-25',
      distributionFrequency: 'bi-weekly',
      totalDistributed: 723000,
      roi: 18.7,
    },
    {
      id: 'vc-nft-rewards',
      name: 'VC NFT Investment Yields',
      type: 'dividend',
      totalPool: 234000,
      currency: 'USDT',
      holders: 774,
      perNFTReward: 302.32,
      status: 'pending',
      lastDistribution: '2024-07-15',
      nextDistribution: '2024-09-15',
      distributionFrequency: 'quarterly',
      totalDistributed: 2100000,
      roi: 28.5,
    },
  ];

  const pendingDistributions = [
    {
      id: 'dist-1',
      poolId: 'gc-cards-pool',
      poolName: 'GC Cards Dividends',
      scheduledDate: '2024-09-01',
      amount: 125000,
      currency: 'USDT',
      recipients: 3420,
      status: 'approved',
      approvedBy: 'admin@gavlik.capital',
      approvedAt: '2024-08-25T10:00:00Z',
    },
    {
      id: 'dist-2',
      poolId: 'btc-bot-rewards',
      poolName: 'BTC Bot Trading Profits',
      scheduledDate: '2024-08-27',
      amount: 85600,
      currency: 'BTC',
      recipients: 1850,
      status: 'pending',
      approvedBy: null,
      approvedAt: null,
    },
    {
      id: 'dist-3',
      poolId: 'vc-nft-rewards',
      poolName: 'VC NFT Investment Yields',
      scheduledDate: '2024-09-15',
      amount: 234000,
      currency: 'USDT',
      recipients: 774,
      status: 'calculating',
      approvedBy: null,
      approvedAt: null,
    },
  ];

  const distributionHistory = [
    {
      id: 'hist-1',
      poolName: 'GC Cards Dividends',
      date: '2024-08-15',
      amount: 125000,
      currency: 'USDT',
      recipients: 3420,
      avgReward: 36.55,
      gasUsed: 2.5,
      txHash: '0xabc123...def456',
      status: 'completed',
    },
    {
      id: 'hist-2',
      poolName: 'BTC Bot Trading Profits',
      date: '2024-08-20',
      amount: 0.0856,
      currency: 'BTC',
      recipients: 1850,
      avgReward: 0.0463,
      gasUsed: 1.8,
      txHash: '0x789abc...123def',
      status: 'completed',
    },
    {
      id: 'hist-3',
      poolName: 'Algo Trader Returns',
      date: '2024-08-10',
      amount: 156.3,
      currency: 'ETH',
      recipients: 2890,
      avgReward: 0.054,
      gasUsed: 3.2,
      txHash: '0x456789...abcdef',
      status: 'completed',
    },
  ];

  const rewardsStats = {
    totalPools: rewardsPools.length,
    totalDistributed: rewardsPools.reduce((sum, pool) => sum + pool.totalDistributed, 0),
    totalHolders: rewardsPools.reduce((sum, pool) => sum + pool.holders, 0),
    avgROI: rewardsPools.reduce((sum, pool) => sum + pool.roi, 0) / rewardsPools.length,
  };

  const handleRewardAction = (action: string, rewardId: string | null = null) => {
    console.log(`Admin action: ${action} for reward: ${rewardId}`);
    // TODO: Implement actual actions
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'calculating': return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      case 'approved': return 'bg-purple-500/20 text-purple-500 border-purple-500/30';
      case 'completed': return 'bg-green-500/20 text-green-500 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    if (currency === 'BTC' || currency === 'ETH') {
      return `${amount.toFixed(4)} ${currency}`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('cs-CZ');
  };

  return (
    <Container fluid className="py-4 sm:py-6">
      <Stack spacing="lg">
        <PageHeader 
          title="Správa Odměn & Dividend"
          showBackButton={true}
        />

        {/* Rewards Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <EnhancedValueCard
            title="Celkem Poolů"
            value={rewardsStats.totalPools}
            formatter={(v) => String(v)}
            className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20"
          />
          
          <EnhancedValueCard
            title="Celkem Rozděleno"
            value={rewardsStats.totalDistributed}
            formatter={(v) => `$${v.toLocaleString()}`}
            trend={{
              value: 23.5,
              direction: 'up',
              period: 'měsíc'
            }}
            className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20"
          />
          
          <EnhancedValueCard
            title="Celkem Holderů"
            value={rewardsStats.totalHolders}
            formatter={(v) => v.toLocaleString()}
            className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20"
          />
          
          <EnhancedValueCard
            title="Průměrný ROI"
            value={rewardsStats.avgROI}
            formatter={(v) => `${v.toFixed(1)}%`}
            trend={{
              value: 2.1,
              direction: 'up',
              period: 'rok'
            }}
            className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border-yellow-500/20"
          />
        </div>

        {/* Rewards Pools Overview */}
        <div className="bg-[#151515] rounded-xl border border-[#333333] p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white">Aktivní Reward Pooly</h3>
            <button 
              onClick={() => handleRewardAction('create-pool')}
              className="bg-[#F9D523] hover:bg-[#e3c320] text-[#151515] px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Nový Pool
            </button>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {rewardsPools.map((pool) => (
              <div key={pool.id} className="bg-[#1a1a1a] rounded-lg p-4 border border-[#333333] hover:border-[#555555] transition-colors">
                
                {/* Pool Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-white">{pool.name}</h4>
                    <p className="text-sm text-[#666666]">{pool.type === 'dividend' ? 'Dividend Pool' : 'Reward Pool'}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(pool.status)}`}>
                    {pool.status}
                  </span>
                </div>

                {/* Pool Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-[#151515] rounded-lg p-3">
                    <p className="text-xs text-[#666666]">Pool Size</p>
                    <p className="text-lg font-bold text-white">{formatCurrency(pool.totalPool, pool.currency)}</p>
                  </div>
                  <div className="bg-[#151515] rounded-lg p-3">
                    <p className="text-xs text-[#666666]">Holders</p>
                    <p className="text-lg font-bold text-white">{pool.holders.toLocaleString()}</p>
                  </div>
                  <div className="bg-[#151515] rounded-lg p-3">
                    <p className="text-xs text-[#666666]">Per NFT</p>
                    <p className="text-lg font-bold text-white">{formatCurrency(pool.perNFTReward, pool.currency)}</p>
                  </div>
                  <div className="bg-[#151515] rounded-lg p-3">
                    <p className="text-xs text-[#666666]">ROI</p>
                    <p className="text-lg font-bold text-green-400">{pool.roi}%</p>
                  </div>
                </div>

                {/* Distribution Info */}
                <div className="text-sm text-[#666666] mb-4 space-y-1">
                  <p>Frequency: {pool.distributionFrequency}</p>
                  <p>Last: {formatDate(pool.lastDistribution)}</p>
                  <p>Next: {formatDate(pool.nextDistribution)}</p>
                  <p>Total Distributed: {formatCurrency(pool.totalDistributed, pool.currency)}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-[#333333]">
                  <button 
                    onClick={() => handleRewardAction('distribute', pool.id)}
                    className="flex-1 bg-[#F9D523] hover:bg-[#e3c320] text-[#151515] px-3 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    Distribute Now
                  </button>
                  <button 
                    onClick={() => handleRewardAction('edit', pool.id)}
                    className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-3 py-2 rounded-lg font-medium transition-colors border border-blue-500/30 text-sm"
                  >
                    Edit Pool
                  </button>
                  <button 
                    onClick={() => handleRewardAction('pause', pool.id)}
                    className="flex-1 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 px-3 py-2 rounded-lg font-medium transition-colors border border-orange-500/30 text-sm"
                  >
                    {pool.status === 'active' ? 'Pause' : 'Resume'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Distribution Management Tabs */}
        <div className="bg-[#151515] rounded-xl border border-[#333333] overflow-hidden">
          
          {/* Tab Headers */}
          <div className="flex border-b border-[#333333]">
            {[
              { id: 'pending', label: 'Čekající Distribuce', count: pendingDistributions.length },
              { id: 'scheduled', label: 'Naplánované', count: 5 },
              { id: 'history', label: 'Historie', count: distributionHistory.length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#F9D523] text-[#151515] border-b-2 border-[#F9D523]'
                    : 'text-[#666666] hover:text-white hover:bg-[#1a1a1a]'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'pending' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold text-white">Čekající Distribuce</h4>
                  <button 
                    onClick={() => handleRewardAction('bulk-approve')}
                    className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-2 rounded-lg font-medium transition-colors border border-green-500/30"
                  >
                    Approve All
                  </button>
                </div>
                
                {pendingDistributions.map((dist) => (
                  <div key={dist.id} className="bg-[#1a1a1a] rounded-lg p-4 border border-[#333333]">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h5 className="font-semibold text-white">{dist.poolName}</h5>
                        <p className="text-sm text-[#666666] mt-1">
                          Scheduled: {formatDate(dist.scheduledDate)} • {dist.recipients} recipients
                        </p>
                        <p className="text-lg font-bold text-[#F9D523] mt-2">
                          {formatCurrency(dist.amount, dist.currency)}
                        </p>
                        {dist.approvedBy && (
                          <p className="text-xs text-green-400 mt-2">
                            Approved by {dist.approvedBy} at {formatDate(dist.approvedAt!)}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(dist.status)}`}>
                          {dist.status}
                        </span>
                        
                        <div className="flex space-x-2">
                          {dist.status === 'pending' && (
                            <>
                              <button 
                                onClick={() => handleRewardAction('approve', dist.id)}
                                className="text-green-400 hover:text-green-300 text-sm transition-colors"
                              >
                                Approve
                              </button>
                              <button 
                                onClick={() => handleRewardAction('reject', dist.id)}
                                className="text-red-400 hover:text-red-300 text-sm transition-colors"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          <button 
                            onClick={() => handleRewardAction('view', dist.id)}
                            className="text-[#F9D523] hover:text-[#e3c320] text-sm transition-colors"
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Historie Distribucí</h4>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#1a1a1a] border-b border-[#333333]">
                      <tr>
                        <th className="text-left p-3 text-[#666666] text-sm font-medium">Pool</th>
                        <th className="text-left p-3 text-[#666666] text-sm font-medium">Datum</th>
                        <th className="text-left p-3 text-[#666666] text-sm font-medium">Částka</th>
                        <th className="text-left p-3 text-[#666666] text-sm font-medium">Recipients</th>
                        <th className="text-left p-3 text-[#666666] text-sm font-medium">Avg Reward</th>
                        <th className="text-left p-3 text-[#666666] text-sm font-medium">Gas</th>
                        <th className="text-left p-3 text-[#666666] text-sm font-medium">TX Hash</th>
                        <th className="text-left p-3 text-[#666666] text-sm font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#333333]">
                      {distributionHistory.map((hist) => (
                        <tr key={hist.id} className="hover:bg-[#1a1a1a]/50 transition-colors">
                          <td className="p-3 text-white text-sm">{hist.poolName}</td>
                          <td className="p-3 text-white text-sm">{formatDate(hist.date)}</td>
                          <td className="p-3 text-white text-sm font-medium">{formatCurrency(hist.amount, hist.currency)}</td>
                          <td className="p-3 text-white text-sm">{hist.recipients.toLocaleString()}</td>
                          <td className="p-3 text-[#F9D523] text-sm">{formatCurrency(hist.avgReward, hist.currency)}</td>
                          <td className="p-3 text-white text-sm">{hist.gasUsed} ETH</td>
                          <td className="p-3 text-blue-400 text-sm font-mono">{hist.txHash}</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(hist.status)}`}>
                              {hist.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'scheduled' && (
              <div className="text-center py-8">
                <div className="text-[#666666] mb-4">
                  <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>Scheduled distributions will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Emergency Actions */}
        <div className="bg-[#151515] rounded-xl border border-red-500/30 p-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            Emergency Actions
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button 
              onClick={() => handleRewardAction('pause-all')}
              className="p-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg border border-red-500/30 transition-colors"
            >
              <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-medium">Pause All Distributions</p>
            </button>
            
            <button 
              onClick={() => handleRewardAction('emergency-withdraw')}
              className="p-4 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded-lg border border-orange-500/30 transition-colors"
            >
              <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm font-medium">Emergency Withdraw</p>
            </button>
            
            <button 
              onClick={() => handleRewardAction('recalculate-all')}
              className="p-4 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg border border-yellow-500/30 transition-colors"
            >
              <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <p className="text-sm font-medium">Recalculate All</p>
            </button>
            
            <button 
              onClick={() => handleRewardAction('audit-trail')}
              className="p-4 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg border border-blue-500/30 transition-colors"
            >
              <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <p className="text-sm font-medium">Generate Audit Trail</p>
            </button>
          </div>
        </div>
      </Stack>
    </Container>
  );
}
