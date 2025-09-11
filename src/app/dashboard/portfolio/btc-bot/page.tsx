'use client';

import React, { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { 
  DashboardCard, 
  DashboardButton, 
  ValueCard,
  ChartCard,
  InfoCard,
  DashboardTable,
  TableColumn 
} from '@/components/dashboard';
import { ProjectsChart } from '@/components/charts';
import { ArrowLeft, Grid3X3, List } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface UserProfile {
  name: string;
  avatar?: string;
  email?: string;
  address?: string;
  kycVerified?: boolean;
}

interface ClaimRecord {
  id: string;
  project: string;
  date: string;
  amount: string;
}

interface BotRecord {
  id: string;
  name: string;
  purchaseDate: string;
  value: string;
}

export default function BTCBotPage() {
  const router = useRouter();
  const [selectedTimeframe, setSelectedTimeframe] = useState('M');
  const [claimProgress] = useState(62); // Percentage for claim progress
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid'); // New: View mode toggle
  
  // Mock data - nahraďte skutečnými daty z API
  const [userProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john@example.com',
    kycVerified: true
  });

  const [portfolioValue] = useState(8750);
  const [totalClaimed] = useState(4200);
  const [nextClaimDate] = useState('1. 2. 2026');
  const [claimAmount] = useState(1800);

  const [claimHistory] = useState<ClaimRecord[]>([
    { id: '1', project: 'BTC BOT', date: '1.1.2026', amount: '1 800' },
    { id: '2', project: 'BTC BOT', date: '1.12.2025', amount: '1 750' },
    { id: '3', project: 'BTC BOT', date: '1.11.2025', amount: '1 900' },
    { id: '4', project: 'BTC BOT', date: '1.10.2025', amount: '2 100' },
    { id: '5', project: 'BTC BOT', date: '1.9.2025', amount: '1 850' },
    { id: '6', project: 'BTC BOT', date: '1.8.2025', amount: '1 950' },
  ]);

  const [myBots] = useState<BotRecord[]>([
    { id: '1', name: 'BTC Trading Bot #1', purchaseDate: '1.1.2025', value: '5 000' },
    { id: '2', name: 'BTC DCA Bot #2', purchaseDate: '15.12.2024', value: '3 000' },
    { id: '3', name: 'BTC Grid Bot #3', purchaseDate: '10.11.2024', value: '2 000' },
    { id: '4', name: 'BTC Scalping Bot #4', purchaseDate: '5.11.2024', value: '2 500' },
    { id: '5', name: 'BTC Swing Bot #5', purchaseDate: '20.10.2024', value: '1 800' },
    { id: '6', name: 'BTC Momentum Bot #6', purchaseDate: '15.10.2024', value: '3 200' },
  ]);

  // Portfolio chart datasets with timeframes - same structure as portfolio
  const portfolioChartDatasets = {
    D: [ // Daily data (last 7 days)
      { name: 'Po', portfolio: 8650 },
      { name: 'Út', portfolio: 8680 },
      { name: 'St', portfolio: 8720 },
      { name: 'Čt', portfolio: 8710 },
      { name: 'Pá', portfolio: 8740 },
      { name: 'So', portfolio: 8750 },
      { name: 'Ne', portfolio: 8750 }
    ],
    W: [ // Weekly data (last 8 weeks)
      { name: 'T1', portfolio: 8200 },
      { name: 'T2', portfolio: 8350 },
      { name: 'T3', portfolio: 8450 },
      { name: 'T4', portfolio: 8580 },
      { name: 'T5', portfolio: 8650 },
      { name: 'T6', portfolio: 8700 },
      { name: 'T7', portfolio: 8720 },
      { name: 'T8', portfolio: 8750 }
    ],
    M: [ // Monthly data
      { name: 'Jan', portfolio: 7000 },
      { name: 'Feb', portfolio: 7200 },
      { name: 'Mar', portfolio: 7100 },
      { name: 'Apr', portfolio: 7400 },
      { name: 'May', portfolio: 7800 },
      { name: 'Jun', portfolio: 8000 },
      { name: 'Jul', portfolio: 7900 },
      { name: 'Aug', portfolio: 8200 },
      { name: 'Sep', portfolio: 8400 },
      { name: 'Oct', portfolio: 8300 },
      { name: 'Nov', portfolio: 8600 },
      { name: 'Dec', portfolio: 8750 }
    ],
    Y: [ // Yearly data
      { name: '2021', portfolio: 3000 },
      { name: '2022', portfolio: 4500 },
      { name: '2023', portfolio: 6200 },
      { name: '2024', portfolio: 8750 }
    ]
  };

  // Claims chart datasets
  const claimChartDatasets = {
    D: [ // Daily claims
      { name: 'Po', claims: 80 },
      { name: 'Út', claims: 95 },
      { name: 'St', claims: 75 },
      { name: 'Čt', claims: 110 },
      { name: 'Pá', claims: 90 },
      { name: 'So', claims: 85 },
      { name: 'Ne', claims: 100 }
    ],
    W: [ // Weekly claims  
      { name: 'T1', claims: 600 },
      { name: 'T2', claims: 650 },
      { name: 'T3', claims: 700 },
      { name: 'T4', claims: 750 },
      { name: 'T5', claims: 800 },
      { name: 'T6', claims: 850 },
      { name: 'T7', claims: 900 },
      { name: 'T8', claims: 950 }
    ],
    M: [ // Monthly claims
      { name: 'Jan', claims: 800 },
      { name: 'Feb', claims: 1200 },
      { name: 'Mar', claims: 1500 },
      { name: 'Apr', claims: 1800 },
      { name: 'May', claims: 2100 },
      { name: 'Jun', claims: 2400 },
      { name: 'Jul', claims: 2700 },
      { name: 'Aug', claims: 3000 },
      { name: 'Sep', claims: 3300 },
      { name: 'Oct', claims: 3600 },
      { name: 'Nov', claims: 3900 },
      { name: 'Dec', claims: 4200 }
    ],
    Y: [ // Yearly claims
      { name: '2021', claims: 400 },
      { name: '2022', claims: 1200 },
      { name: '2023', claims: 2800 },
      { name: '2024', claims: 4200 }
    ]
  };

  // Functions for timeframe handling - same as portfolio
  const getTimeframeLabel = () => {
    const labels = {
      D: 'tento týden',
      W: 'posledních 8 týdnů', 
      M: 'posledních 12 měsíců',
      Y: 'posledních 5 let'
    };
    return labels[selectedTimeframe as keyof typeof labels] || labels.M;
  };

  // Table columns for claims history
  const claimColumns: TableColumn<ClaimRecord>[] = [
    { 
      key: 'project', 
      label: 'Projekt',
      render: (value: string) => (
        <span className="font-medium text-white">{value}</span>
      )
    },
    { 
      key: 'date', 
      label: 'Datum',
      render: (value: string) => (
        <span className="text-white/70 text-sm">{value}</span>
      )
    },
    { 
      key: 'amount', 
      label: 'Částka',
      render: (value: string) => (
        <span className="text-[#F7931A] font-semibold">{value} $</span>
      )
    }
  ];

  return (
    <div className="min-h-screen">
      {/* TopBar */}
      <TopBar 
        title="BTC BOT" 
        userProfile={userProfile}
        notificationCount={3}
      />
      
      <div className="p-4 sm:p-6 lg:p-8">
        
        {/* Back Button */}
        <div className="mb-6">
          <DashboardButton
            onClick={() => router.push('/dashboard/portfolio')}
            variant="secondary"
            size="sm"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Zpět
          </DashboardButton>
        </div>

        {/* Quick Stats Cards - FIXNÍ VÝŠKY A ŠÍŘKY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <ValueCard 
            label="Celkem botů" 
            value={myBots.length}
            variant="default"
            className="h-28 min-h-[7rem] flex flex-col justify-between"
          >
            <p className="text-xs text-white/70 mt-auto">Vlastněno</p>
          </ValueCard>

          <ValueCard 
            label="Hodnota portfolia" 
            value={`${portfolioValue.toLocaleString()} $`}
            variant="default"
            className="h-28 min-h-[7rem] flex flex-col justify-center"
          />

          <ValueCard 
            label="Celkem claimnuto" 
            value={`${totalClaimed.toLocaleString()} $`}
            variant="default"
            className="h-28 min-h-[7rem] flex flex-col justify-center"
          />

          <ValueCard 
            label="Další claim" 
            value={nextClaimDate}
            variant="default"
            className="h-28 min-h-[7rem] flex flex-col justify-center"
          />
        </div>

        {/* Main Charts Grid - same layout as portfolio */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 lg:gap-20 mb-20">
          {/* LEFT - Portfolio Graf */}
          <div className="lg:col-span-2">
            <ChartCard 
              title={`Vývoj BTC Bot portfolia (${getTimeframeLabel()})`}
              value={`${portfolioValue.toLocaleString()} $`}
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
                      <div className="w-3 h-3 rounded-full bg-[#F7931A]" />
                      <span className="text-white/70">BTC Bots</span>
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

          {/* RIGHT - Info Cards */}
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
                <p className="text-2xl font-bold text-white">{portfolioValue.toLocaleString()} $</p>
                <p className="text-xs text-white/50">{myBots.length} BTC Botů</p>
              </div>
            </InfoCard>

            <InfoCard 
              title="Vyzvednout odměnu"
              icon={
                <svg className="w-5 h-5 text-[#F7931A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c1.1 0 2 .9 2 2v1M9 9h1m4 0h.01M9 17h1m4 0h.01M4 9v8a2 2 0 002 2h8a2 2 0 002-2V9M4 9V7a2 2 0 012-2h8a2 2 0 012 2v2M4 9h12" />
                </svg>
              }
            >
              <div className="space-y-3">
                <p className="text-sm text-white/70">Dostupné k vyzvednutí</p>
                <p className="text-xl font-bold text-[#F7931A]">{claimAmount.toLocaleString()} $</p>
                
                {/* Progress Bar - Bitcoin themed */}
                <div className="mb-4">
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#F7931A] to-[#D17310] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${claimProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-white/50 mt-1">Pokrok: {claimProgress}%</p>
                </div>
                
                <DashboardButton variant="primary" size="sm" className="w-full">
                  CLAIM {claimAmount.toLocaleString()} $
                </DashboardButton>
              </div>
            </InfoCard>
          </div>
        </div>

        {/* Bottom Section - Claims Chart */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 lg:gap-12 mb-8">
          {/* LEFT - Claims Graf */}
          <div className="lg:col-span-2">
            <ChartCard 
              title={`Historie claimů (${getTimeframeLabel()})`}
              value={`${totalClaimed.toLocaleString()} $`}
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

          {/* RIGHT - Claims History Table */}
          <div className="space-y-4">
            <DashboardCard 
              variant="default" 
              className="p-0"
            >
              <div className="p-6 border-b border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Poslední výplaty
                    </h3>
                    <p className="text-sm text-white/70">
                      Nejnovější claimi
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <DashboardTable
                  columns={claimColumns}
                  data={claimHistory.slice(0, 4)} // Show only first 4 items
                  className="w-full"
                />
              </div>
            </DashboardCard>
          </div>
        </div>

        {/* My Bots Section with Grid/List View Toggle */}
        <div className="space-y-4">
          <DashboardCard 
            variant="default" 
            className="p-0"
          >
            <div className="p-6 border-b border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Moje boty
                  </h3>
                  <p className="text-sm text-white/70">
                    Přehled vlastněných BTC Botů
                  </p>
                </div>
                
                {/* View Mode Toggle */}
                <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-all duration-300 ${
                      viewMode === 'grid'
                        ? 'bg-[#F7931A] text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-all duration-300 ${
                      viewMode === 'list'
                        ? 'bg-[#F7931A] text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Bots Display */}
            <div className="p-6">
              {viewMode === 'grid' ? (
                /* Grid View */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {myBots.map((bot) => (
                    <div 
                      key={bot.id} 
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-white/10 hover:border-[#F7931A]/30 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F7931A] to-[#D17310] flex items-center justify-center">
                          <span className="text-white font-bold text-sm">₿</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-white group-hover:text-[#F7931A] transition-colors">
                            {bot.name}
                          </h4>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-xs text-white/70">Spuštěn:</span>
                          <span className="text-xs text-white/90">{bot.purchaseDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-white/70">Investice:</span>
                          <span className="text-sm font-semibold text-[#F7931A]">{bot.value} $</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* List View */
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 text-sm font-medium text-white/70">Bot</th>
                        <th className="text-left py-3 text-sm font-medium text-white/70">Spuštěn</th>
                        <th className="text-right py-3 text-sm font-medium text-white/70">Investice $</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myBots.map((bot) => (
                        <tr key={bot.id} className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                          <td className="py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F7931A] to-[#D17310] flex items-center justify-center">
                                <span className="text-white font-bold text-xs">₿</span>
                              </div>
                              <span className="text-sm text-white group-hover:text-[#F7931A] transition-colors">{bot.name}</span>
                            </div>
                          </td>
                          <td className="py-3 text-sm text-white/70">{bot.purchaseDate}</td>
                          <td className="py-3 text-sm text-[#F7931A] font-semibold text-right">{bot.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </DashboardCard>
        </div>

      </div>
    </div>
  );
}