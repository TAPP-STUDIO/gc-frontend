'use client';

import React, { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { 
  DashboardButton, 
  DashboardCard, 
  StatCard, 
  ValueCard,
  ChartCard,
  InfoCard,
  DashboardChart,
  DashboardTable 
} from '@/components/dashboard';

// Portfolio data
const portfolioData = {
  stats: {
    totalCards: 22,
    gcCards: 7,
    btcBot: 2,
    algoTrader: 13
  },
  chartData: [
    { name: 'Jan', value: 2000 },
    { name: 'Feb', value: 2500 },
    { name: 'Mar', value: 3200 },
    { name: 'Apr', value: 2800 },
    { name: 'May', value: 4200 },
    { name: 'Jun', value: 5100 },
    { name: 'Jul', value: 6800 },
    { name: 'Aug', value: 7500 },
    { name: 'Sep', value: 8200 },
    { name: 'Oct', value: 9100 },
    { name: 'Nov', value: 9800 },
    { name: 'Dec', value: 10000 }
  ],
  claimData: [
    { name: 'Jan', value: 500 },
    { name: 'Feb', value: 800 },
    { name: 'Mar', value: 1200 },
    { name: 'Apr', value: 1500 },
    { name: 'May', value: 2100 },
    { name: 'Jun', value: 2400 },
    { name: 'Jul', value: 2800 },
    { name: 'Aug', value: 3100 },
    { name: 'Sep', value: 3300 },
    { name: 'Oct', value: 3450 },
    { name: 'Nov', value: 3480 },
    { name: 'Dec', value: 3500 }
  ],
  claimHistory: [
    { 
      project: 'GC Cards', 
      date: '1.1.2025', 
      amount: 2500,
      claim: 2500,
      status: 'completed'
    },
    { 
      project: 'BTC BOT', 
      date: '1.1.2025', 
      amount: 2500,
      claim: 2500,
      status: 'completed'
    },
    { 
      project: 'GC Cards', 
      date: '1.1.2025', 
      amount: 2500,
      claim: 2500,
      status: 'pending'
    },
    { 
      project: 'Algo Trader', 
      date: '1.1.2025', 
      amount: 2500,
      claim: 2500,
      status: 'completed'
    },

  ]
};

export default function PortfolioDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('M');

  // Mock user data - nahradit skutečnými daty
  const userProfile = {
    name: "Jan Novák",
    email: "jan.novak@email.cz",
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb3",
    kycVerified: true,
  };

  return (
    <div className="min-h-screen">
      {/* Transparentní TopBar */}
      <TopBar 
        title="Moje portfolio"
        userProfile={userProfile}
        notificationCount={3}
      />
      
      <div className="p-4 sm:p-6 lg:p-8">

      {/* Value Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <ValueCard 
          label="Počet karet" 
          value={portfolioData.stats.totalCards}
          variant="active"
        />
        <ValueCard 
          label="GC cards" 
          value={portfolioData.stats.gcCards}
          variant="active"
        />
        <ValueCard 
          label="BTC Bot" 
          value={portfolioData.stats.btcBot}
          variant="active"
        />
        <ValueCard 
          label="Algo Trader" 
          value={portfolioData.stats.algoTrader}
          variant="active"
        />

      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6 mb-8">
        {/* Portfolio Chart - 2 columns */}
        <div className="lg:col-span-2">
          <ChartCard 
            title="Vývoj portfolia"
            value="10 000 $"
            controls={
              <>
                {['D', 'W', 'M', 'Y'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedTimeframe(period)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                      selectedTimeframe === period 
                        ? 'bg-white/20 text-white border border-white/30 shadow-lg' 
                        : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </>
            }
          >
            <DashboardChart 
              data={portfolioData.chartData}
              height={280}
              lineColor="#FFFFFF"
            />
          </ChartCard>
        </div>

        {/* Right Stats */}
        <div className="space-y-4">
          <StatCard
            title="Hodnota portfolia"
            value="10 000 $"
            trend={{ value: 12.5, isPositive: true }}
          />
          
          <InfoCard 
            title="Celkové výnosy"
            icon={
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          >
            <div className="space-y-2">
              <p className="text-3xl font-bold text-white">
                3 500 $
              </p>
              <p className="text-xs text-[#4ADE80] font-medium">+35% tento měsíc</p>
            </div>
          </InfoCard>

          <InfoCard 
            title="Další claim BTC BOT"
            icon={
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
          >
            <div className="space-y-3">
              <p className="text-2xl font-bold text-white">1. 1. 2026</p>
              <DashboardButton variant="primary" size="sm" className="w-full">
                Vyzvednout odměnu
              </DashboardButton>
            </div>
          </InfoCard>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
        {/* Claim Chart */}
        <div className="lg:col-span-2">
          <ChartCard 
            title="Celkové claimy"
            value="3 500 $"
            controls={
              <select className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-white/30">
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Daily</option>
              </select>
            }
          >
            <DashboardChart 
              data={portfolioData.claimData}
              height={220}
              lineColor="#FFFFFF"
            />
          </ChartCard>
        </div>

        {/* Claim History Table */}
        <DashboardCard variant="default" padding="none">
          <div className="p-6 border-b border-white/10">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Historie claimů</h3>
              <div className="flex gap-2">
                <select className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-white/30">
                  <option>Všechny projekty</option>
                  <option>GC Cards</option>
                  <option>BTC BOT</option>
                  <option>Algo Trader</option>

                </select>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <DashboardTable
              columns={[
                { 
                  key: 'project', 
                  label: 'Projekt',
                  render: (value) => (
                    <span className="font-medium text-white">{value}</span>
                  )
                },
                { 
                  key: 'date', 
                  label: 'Datum',
                  render: (value) => (
                    <span className="text-white/70 text-sm">{value}</span>
                  )
                },
                { 
                  key: 'claim', 
                  label: 'Částka',
                  render: (value, item) => (
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold">{value} $</span>
                      {item.status === 'completed' ? (
                        <span className="w-2 h-2 bg-[#4ADE80] rounded-full" />
                      ) : (
                        <span className="w-2 h-2 bg-[#F59E0B] rounded-full animate-pulse" />
                      )}
                    </div>
                  )
                }
              ]}
              data={portfolioData.claimHistory}
            />
          </div>
          
          <div className="p-4 border-t border-white/10">
            <button className="text-white text-sm font-medium hover:text-white/80 transition-colors">
              Zobrazit vše →
            </button>
          </div>
        </DashboardCard>
      </div>
      </div>
    </div>
  );
}
