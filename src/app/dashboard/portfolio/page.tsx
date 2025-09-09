'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TopBar } from '@/components/layout/TopBar';
import { 
  DashboardButton, 
  DashboardCard, 
  StatCard, 
  ValueCard,
  InfoCard,
  DashboardTable 
} from '@/components/dashboard';
import { PortfolioUniversalChart } from '@/components/charts'; // ✅ NOVÝ IMPORT - Sjednocený graf

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
  const [claimFilter, setClaimFilter] = useState('all');
  const router = useRouter();

  // Mock user data - nahradit skutečnými daty
  const userProfile = {
    name: "Jan Novák",
    email: "jan.novak@email.cz",
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb3",
    kycVerified: true,
  };

  // Handlers pro navigaci na detail projektů
  const handleViewProject = (projectType: string) => {
    switch(projectType) {
      case 'gc-cards':
        router.push('/dashboard/portfolio/gc-cards');
        break;
      case 'btc-bot':
        router.push('/dashboard/portfolio/btc-bot');
        break;
      case 'algo-trader':
        router.push('/dashboard/portfolio/algo-trader');
        break;
      default:
        router.push('/dashboard/portfolio');
    }
  };

  // Filtrace historie claimů
  const filteredClaimHistory = claimFilter === 'all' 
    ? portfolioData.claimHistory 
    : portfolioData.claimHistory.filter(claim => 
        claim.project.toLowerCase().includes(claimFilter.toLowerCase())
      );

  return (
    <div className="min-h-screen">
      {/* Transparentní TopBar */}
      <TopBar 
        title="Moje portfolio"
        userProfile={userProfile}
        notificationCount={3}
      />
      
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Value Cards Grid - ÚPRAVA PODLE ÚKOLU 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {/* ÚPRAVA: Odstranění žlutého orámování, změna textu na "Zobrazit" */}
          <ValueCard 
            label="Počet karet" 
            value={portfolioData.stats.totalCards}
            variant="default"
            onClick={() => handleViewProject('all')}
            className="group cursor-pointer"
          >
            <DashboardButton 
              variant="secondary" 
              size="sm"
              className="mt-3"
              onClick={(e) => {
                e.stopPropagation();
                handleViewProject('all');
              }}
            >
              Zobrazit
            </DashboardButton>
          </ValueCard>

          <ValueCard 
            label="GC cards" 
            value={portfolioData.stats.gcCards}
            variant="default"
            onClick={() => handleViewProject('gc-cards')}
            className="group cursor-pointer"
          >
            <DashboardButton 
              variant="secondary" 
              size="sm"
              className="mt-3"
              onClick={(e) => {
                e.stopPropagation();
                handleViewProject('gc-cards');
              }}
            >
              Zobrazit
            </DashboardButton>
          </ValueCard>

          <ValueCard 
            label="BTC Bot" 
            value={portfolioData.stats.btcBot}
            variant="default"
            onClick={() => handleViewProject('btc-bot')}
            className="group cursor-pointer"
          >
            <DashboardButton 
              variant="secondary" 
              size="sm"
              className="mt-3"
              onClick={(e) => {
                e.stopPropagation();
                handleViewProject('btc-bot');
              }}
            >
              Zobrazit
            </DashboardButton>
          </ValueCard>

          <ValueCard 
            label="Algo Trader" 
            value={portfolioData.stats.algoTrader}
            variant="default"
            onClick={() => handleViewProject('algo-trader')}
            className="group cursor-pointer"
          >
            <DashboardButton 
              variant="secondary" 
              size="sm"
              className="mt-3"
              onClick={(e) => {
                e.stopPropagation();
                handleViewProject('algo-trader');
              }}
            >
              Zobrazit
            </DashboardButton>
          </ValueCard>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 lg:gap-20 mb-20">
          {/* ✅ HLAVNÍ PORTFOLIO GRAF - NOVÁ IMPLEMENTACE */}
          <div className="lg:col-span-2">
            <PortfolioUniversalChart 
              data={portfolioData.chartData}
              title="Vývoj portfolia"
              height={320}
              currentValue="10 000 $"
              trend={{ value: 15.8, isPositive: true }}
              showGrid={true}
              animate={true}
              primaryColor="#F9D523"
            />
          </div>

          {/* Info Cards - 1 column */}
          <div className="space-y-3 lg:space-y-4">
            <InfoCard 
              title="Aktuální hodnota"
              icon={
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              }
            >
              <div className="space-y-2">
                <p className="text-2xl font-bold text-white">10 000 $</p>
                <p className="text-xs text-white/50">Naposledy aktualizováno: 1.1.2026</p>
                <DashboardButton variant="primary" size="sm" className="w-full">
                  Vyzvednout odměnu
                </DashboardButton>
              </div>
            </InfoCard>
          </div>
        </div>

        {/* Bottom Section - ÚPRAVA PODLE ÚKOLŮ 2, 3, 4 */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 lg:gap-12">
          {/* ✅ CLAIM CHART - NOVÁ IMPLEMENTACE */}
          <div className="lg:col-span-2">
            <PortfolioUniversalChart 
              data={portfolioData.claimData}
              title="Celkové výplaty"
              height={320}
              currentValue="3 500 $"
              trend={{ value: 8.2, isPositive: true }}
              showGrid={true}
              animate={true}
              primaryColor="#10B981" // Zelená pro claims
            />
          </div>

          {/* Claim History Table - ÚPRAVA PODLE ÚKOLU 2 */}
          <DashboardCard 
            variant="default" 
            padding="none"
            className="group cursor-pointer transition-all duration-300 hover:border-[#F9D523]/50 hover:shadow-[0_0_30px_rgba(249,213,35,0.15)]"
          >
            <div className="p-6 border-b border-white/10">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Historie claimů</h3>
                <div className="flex gap-2">
                  {/* ÚPRAVA: Funkční filtrování */}
                  <select 
                    value={claimFilter}
                    onChange={(e) => setClaimFilter(e.target.value)}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-white/30"
                  >
                    <option value="all">Všechny projekty</option>
                    <option value="gc cards">GC Cards</option>
                    <option value="btc bot">BTC BOT</option>
                    <option value="algo trader">Algo Trader</option>
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
                      <span className="text-white font-semibold">{value} $</span>
                    )
                  }
                ]}
                data={filteredClaimHistory}
                className=""
              />
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}