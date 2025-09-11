'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/contexts/WalletContext';
import { TopBar } from '@/components/layout/TopBar';
import { 
  DashboardButton, 
  DashboardCard, 
  StatCard, 
  ValueCard,
  ChartCard,
  InfoCard,
  DashboardTable 
} from '@/components/dashboard';
import { ProjectsChart } from '@/components/charts';

// Portfolio data s časovými rámci - stejná struktura jako projects
const portfolioChartDatasets = {
  D: [ // Denní data (posledních 7 dní) - portfolio hodnoty
    { name: 'Po', portfolio: 9800 },
    { name: 'Út', portfolio: 9850 },
    { name: 'St', portfolio: 9780 },
    { name: 'Čt', portfolio: 9920 },
    { name: 'Pá', portfolio: 9880 },
    { name: 'So', portfolio: 9950 },
    { name: 'Ne', portfolio: 10000 }
  ],
  W: [ // Týdenní data (posledních 8 týdnů)
    { name: 'T1', portfolio: 8200 },
    { name: 'T2', portfolio: 8350 },
    { name: 'T3', portfolio: 8450 },
    { name: 'T4', portfolio: 8580 },
    { name: 'T5', portfolio: 8680 },
    { name: 'T6', portfolio: 8780 },
    { name: 'T7', portfolio: 8850 },
    { name: 'T8', portfolio: 10000 }
  ],
  M: [ // Měsíční data (posledních 12 měsíců)
    { name: 'Jan', portfolio: 2000 },
    { name: 'Feb', portfolio: 2500 },
    { name: 'Mar', portfolio: 3200 },
    { name: 'Apr', portfolio: 2800 },
    { name: 'May', portfolio: 4200 },
    { name: 'Jun', portfolio: 5100 },
    { name: 'Jul', portfolio: 6800 },
    { name: 'Aug', portfolio: 7500 },
    { name: 'Sep', portfolio: 8200 },
    { name: 'Oct', portfolio: 9100 },
    { name: 'Nov', portfolio: 9800 },
    { name: 'Dec', portfolio: 10000 }
  ],
  Y: [ // Roční data (posledních 5 let)
    { name: '2020', portfolio: 1200 },
    { name: '2021', portfolio: 2800 },
    { name: '2022', portfolio: 5800 },
    { name: '2023', portfolio: 7800 },
    { name: '2024', portfolio: 10000 }
  ]
};

// Claim data s časovými rámci
const claimChartDatasets = {
  D: [ // Denní data
    { name: 'Po', claims: 180 },
    { name: 'Út', claims: 220 },
    { name: 'St', claims: 150 },
    { name: 'Čt', claims: 280 },
    { name: 'Pá', claims: 190 },
    { name: 'So', claims: 210 },
    { name: 'Ne', claims: 250 }
  ],
  W: [ // Týdenní data
    { name: 'T1', claims: 1200 },
    { name: 'T2', claims: 1350 },
    { name: 'T3', claims: 1450 },
    { name: 'T4', claims: 1580 },
    { name: 'T5', claims: 1680 },
    { name: 'T6', claims: 1780 },
    { name: 'T7', claims: 1850 },
    { name: 'T8', claims: 1900 }
  ],
  M: [ // Měsíční data - původní data
    { name: 'Jan', claims: 500 },
    { name: 'Feb', claims: 800 },
    { name: 'Mar', claims: 1200 },
    { name: 'Apr', claims: 1500 },
    { name: 'May', claims: 2100 },
    { name: 'Jun', claims: 2400 },
    { name: 'Jul', claims: 2800 },
    { name: 'Aug', claims: 3100 },
    { name: 'Sep', claims: 3300 },
    { name: 'Oct', claims: 3450 },
    { name: 'Nov', claims: 3480 },
    { name: 'Dec', claims: 3500 }
  ],
  Y: [ // Roční data
    { name: '2020', claims: 800 },
    { name: '2021', claims: 1700 },
    { name: '2022', claims: 2900 },
    { name: '2023', claims: 3350 },
    { name: '2024', claims: 3500 }
  ]
};

// Portfolio data - zachovat původní obsah
const portfolioData = {
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
  const { user, walletAddress } = useWallet();

  // User profile from wallet context
  const userProfile = {
    name: user?.username || user?.firstName || 'Uživatel',
    email: walletAddress || 'Není nastaveno', // WalletUser doesn't have email, using wallet address instead
    address: walletAddress || 'Není připojeno',
    kycVerified: user?.role === 'user', // Assuming verified users have 'user' role
  };
  
  // Portfolio stats from real user data
  const portfolioStats = {
    totalCards: user?.nftHoldings?.length || 0,
    gcCards: user?.nftHoldings?.filter(nft => nft.project === 'GC Cards')?.length || 0,
    btcBot: user?.nftHoldings?.filter(nft => nft.project === 'BTC Bot')?.length || 0,
    algoTrader: user?.nftHoldings?.filter(nft => nft.project === 'Algo Trader')?.length || 0
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

  // Funkce pro získání popisu časového rámce
  const getTimeframeLabel = () => {
    const labels = {
      D: 'tento týden',
      W: 'posledních 8 týdnů', 
      M: 'posledních 12 měsíců',
      Y: 'posledních 5 let'
    };
    return labels[selectedTimeframe as keyof typeof labels] || labels.M;
  };

  return (
    <div className="min-h-screen">
      {/* TopBar */}
      <TopBar 
        title="Moje portfolio"
        userProfile={userProfile}
        notificationCount={3}
      />
      
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Value Cards Grid - using real data */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <ValueCard 
            label="Počet karet" 
            value={portfolioStats.totalCards}
            variant="default"
            className=""
          >
            <p className="text-xs text-white/70 mt-2">Vlastněno</p>
          </ValueCard>

          <ValueCard 
            label="GC cards" 
            value={portfolioStats.gcCards}
            variant="default"
            onClick={() => handleViewProject('gc-cards')}
            className="group cursor-pointer hover:shadow-lg hover:shadow-white/5 transition-all duration-300"
          >
            <DashboardButton 
              variant="secondary" 
              size="sm"
              className="mt-3"
              onClick={() => handleViewProject('gc-cards')}
            >
              Zobrazit
            </DashboardButton>
          </ValueCard>

          <ValueCard 
            label="BTC Bot" 
            value={portfolioStats.btcBot}
            variant="default"
            onClick={() => handleViewProject('btc-bot')}
            className="group cursor-pointer hover:shadow-lg hover:shadow-white/5 transition-all duration-300"
          >
            <DashboardButton 
              variant="secondary" 
              size="sm"
              className="mt-3"
              onClick={() => handleViewProject('btc-bot')}
            >
              Zobrazit
            </DashboardButton>
          </ValueCard>

          <ValueCard 
            label="Algo Trader" 
            value={portfolioStats.algoTrader}
            variant="default"
            onClick={() => handleViewProject('algo-trader')}
            className="group cursor-pointer hover:shadow-lg hover:shadow-white/5 transition-all duration-300"
          >
            <DashboardButton 
              variant="secondary" 
              size="sm"
              className="mt-3"
              onClick={() => handleViewProject('algo-trader')}
            >
              Zobrazit
            </DashboardButton>
          </ValueCard>
        </div>

        {/* Main Grid - DVA GRAFY vedle sebe */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 lg:gap-20 mb-20">
          {/* LEFT - Portfolio Graf */}
          <div className="lg:col-span-2">
            <ChartCard 
              title={`Vývoj portfolia (${getTimeframeLabel()})`}
              value={`${user?.portfolioValue?.toLocaleString() || '0'} $`}
              controls={
                <div className="flex flex-col gap-4">
                  {/* Časové období */}
                  <div className="flex gap-1">
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
                  </div>
                  
                  {/* Legenda */}
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-[#F9D523]" />
                      <span className="text-white/70">Portfolio</span>
                    </div>
                  </div>
                </div>
              }
            >
              {/* Portfolio Graf */}
              <ProjectsChart 
                data={portfolioChartDatasets[selectedTimeframe as keyof typeof portfolioChartDatasets] || portfolioChartDatasets.M}
                height={320}
                showProjects={true}
                showStocks={false}
                projectsKey="portfolio"
                stocksKey="stocks"
                showGrid={true}
                showTooltip={true}
                animate={true}
                className="w-full"
              />
            </ChartCard>
          </div>

          {/* RIGHT - Info Card */}
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
                <p className="text-2xl font-bold text-white">${user?.portfolioValue?.toLocaleString() || '0'}</p>
                <p className="text-xs text-white/50">Naposledy aktualizováno: {new Date().toLocaleDateString('cs-CZ')}</p>
              </div>
            </InfoCard>

            <InfoCard 
              title="Vyzvednout odměnu"
              icon={
                <svg className="w-5 h-5 text-[#F9D523]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c1.1 0 2 .9 2 2v1M9 9h1m4 0h.01M9 17h1m4 0h.01M4 9v8a2 2 0 002 2h8a2 2 0 002-2V9M4 9V7a2 2 0 012-2h8a2 2 0 012 2v2M4 9h12" />
                </svg>
              }
            >
              <div className="space-y-3">
                <p className="text-sm text-white/70">Dostupné k vyzvednutí</p>
                <p className="text-xl font-bold text-[#F9D523]">${((user?.portfolioValue || 0) * 0.25).toLocaleString()}</p>
                <DashboardButton variant="primary" size="sm" className="w-full">
                  Vyzvednout odměnu
                </DashboardButton>
              </div>
            </InfoCard>
          </div>
        </div>

        {/* Bottom Section - DRUHÝ GRAF pro Claims */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 lg:gap-12 mb-8">
          {/* LEFT - Claims Graf */}
          <div className="lg:col-span-2">
            <ChartCard 
              title={`Historie claimů (${getTimeframeLabel()})`}
              value="3 500 $"
              controls={
                <div className="flex flex-col gap-4">
                  {/* Časové období */}
                  <div className="flex gap-1">
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
                  </div>
                  
                  {/* Legenda */}
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                      <span className="text-white/70">Výplaty</span>
                    </div>
                  </div>
                </div>
              }
            >
              {/* Claims Graf */}
              <ProjectsChart 
                data={claimChartDatasets[selectedTimeframe as keyof typeof claimChartDatasets] || claimChartDatasets.M}
                height={320}
                showProjects={true}
                showStocks={false}
                projectsKey="claims"
                stocksKey="stocks"
                showGrid={true}
                showTooltip={true}
                animate={true}
                className="w-full"
              />
            </ChartCard>
          </div>

          {/* RIGHT - Stats Cards */}
          <div className="space-y-4">
            <StatCard
              title="Celkem vyplaceno"
              value="3 500 $"
              trend={{ value: 8.2, isPositive: true }}
            />
            
            <StatCard
              title="Průměrná výplata"
              value="875 $"
              trend={{ value: 4.1, isPositive: true }}
            />
            
            <InfoCard 
              title="Další výplata"
              icon={
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
            >
              <div className="space-y-2">
                <p className="text-3xl font-bold text-white">1.2.2025</p>
                <p className="text-xs text-[#4ADE80] font-medium">Odhadovaná částka: 890 $</p>
              </div>
            </InfoCard>
          </div>
        </div>

        {/* Bottom Section - Claim History Table */}
        <div className="space-y-4">
          <DashboardCard 
            variant="default" 
            className="p-0"
          >
            <div className="p-6 border-b border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Historie claimů
                  </h3>
                  <p className="text-sm text-white/70">
                    Přehled všech výplat a claimů
                  </p>
                </div>
                
                {/* Claim Filter */}
                <div className="flex gap-2">
                  <select 
                    value={claimFilter}
                    onChange={(e) => setClaimFilter(e.target.value)}
                    className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-[#F9D523]/50 focus:bg-white/10 transition-all"
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
                    render: (value) => (
                      <span className="text-[#F9D523] font-semibold">{value} $</span>
                    )
                  }
                ]}
                data={filteredClaimHistory}
                className="w-full"
              />
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
