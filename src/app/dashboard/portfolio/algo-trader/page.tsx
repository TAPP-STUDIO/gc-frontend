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

interface AlgorithmRecord {
  id: string;
  name: string;
  purchaseDate: string;
  value: string;
}

export default function AlgoTraderPage() {
  const router = useRouter();
  const [selectedTimeframe, setSelectedTimeframe] = useState('M');
  const [claimProgress] = useState(73); // Percentage for claim progress
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid'); // New: View mode toggle
  
  // Mock data - nahraďte skutečnými daty z API
  const [userProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john@example.com',
    kycVerified: true
  });

  const [portfolioValue] = useState(12500);
  const [totalClaimed] = useState(5800);
  const [nextClaimDate] = useState('15. 1. 2026');
  const [claimAmount] = useState(2400);

  const [claimHistory] = useState<ClaimRecord[]>([
    { id: '1', project: 'Algo Trader', date: '1.1.2026', amount: '2 400' },
    { id: '2', project: 'Algo Trader', date: '15.12.2025', amount: '2 200' },
    { id: '3', project: 'Algo Trader', date: '1.12.2025', amount: '2 350' },
    { id: '4', project: 'Algo Trader', date: '15.11.2025', amount: '2 100' },
    { id: '5', project: 'Algo Trader', date: '1.11.2025', amount: '2 050' },
    { id: '6', project: 'Algo Trader', date: '15.10.2025', amount: '1 950' },
  ]);

  const [myAlgorithms] = useState<AlgorithmRecord[]>([
    { id: '1', name: 'Mean Reversion Strategy', purchaseDate: '1.1.2025', value: '4 500' },
    { id: '2', name: 'Momentum Trading Algo', purchaseDate: '20.12.2024', value: '3 200' },
    { id: '3', name: 'Arbitrage Algorithm', purchaseDate: '5.11.2024', value: '2 800' },
    { id: '4', name: 'ML Sentiment Analysis', purchaseDate: '22.10.2024', value: '4 200' },
    { id: '5', name: 'Grid Trading Algorithm', purchaseDate: '15.10.2024', value: '3 800' },
    { id: '6', name: 'News Sentiment AI Bot', purchaseDate: '8.10.2024', value: '3 600' },
  ]);

  // Portfolio chart datasets with timeframes - same structure as portfolio
  const portfolioChartDatasets = {
    D: [ // Daily data (last 7 days)
      { name: 'Po', portfolio: 12350 },
      { name: 'Út', portfolio: 12380 },
      { name: 'St', portfolio: 12420 },
      { name: 'Čt', portfolio: 12410 },
      { name: 'Pá', portfolio: 12460 },
      { name: 'So', portfolio: 12480 },
      { name: 'Ne', portfolio: 12500 }
    ],
    W: [ // Weekly data (last 8 weeks)
      { name: 'T1', portfolio: 11800 },
      { name: 'T2', portfolio: 11950 },
      { name: 'T3', portfolio: 12100 },
      { name: 'T4', portfolio: 12200 },
      { name: 'T5', portfolio: 12300 },
      { name: 'T6', portfolio: 12350 },
      { name: 'T7', portfolio: 12450 },
      { name: 'T8', portfolio: 12500 }
    ],
    M: [ // Monthly data
      { name: 'Jan', portfolio: 8500 },
      { name: 'Feb', portfolio: 9200 },
      { name: 'Mar', portfolio: 9800 },
      { name: 'Apr', portfolio: 10200 },
      { name: 'May', portfolio: 10800 },
      { name: 'Jun', portfolio: 11200 },
      { name: 'Jul', portfolio: 11600 },
      { name: 'Aug', portfolio: 11900 },
      { name: 'Sep', portfolio: 12100 },
      { name: 'Oct', portfolio: 12300 },
      { name: 'Nov', portfolio: 12400 },
      { name: 'Dec', portfolio: 12500 }
    ],
    Y: [ // Yearly data
      { name: '2021', portfolio: 4000 },
      { name: '2022', portfolio: 7200 },
      { name: '2023', portfolio: 9800 },
      { name: '2024', portfolio: 12500 }
    ]
  };

  // Claims chart datasets
  const claimChartDatasets = {
    D: [ // Daily claims
      { name: 'Po', claims: 120 },
      { name: 'Út', claims: 140 },
      { name: 'St', claims: 110 },
      { name: 'Čt', claims: 160 },
      { name: 'Pá', claims: 130 },
      { name: 'So', claims: 125 },
      { name: 'Ne', claims: 150 }
    ],
    W: [ // Weekly claims  
      { name: 'T1', claims: 800 },
      { name: 'T2', claims: 850 },
      { name: 'T3', claims: 900 },
      { name: 'T4', claims: 950 },
      { name: 'T5', claims: 1000 },
      { name: 'T6', claims: 1050 },
      { name: 'T7', claims: 1100 },
      { name: 'T8', claims: 1150 }
    ],
    M: [ // Monthly claims
      { name: 'Jan', claims: 1200 },
      { name: 'Feb', claims: 1600 },
      { name: 'Mar', claims: 2100 },
      { name: 'Apr', claims: 2600 },
      { name: 'May', claims: 3100 },
      { name: 'Jun', claims: 3600 },
      { name: 'Jul', claims: 4100 },
      { name: 'Aug', claims: 4600 },
      { name: 'Sep', claims: 5000 },
      { name: 'Oct', claims: 5300 },
      { name: 'Nov', claims: 5600 },
      { name: 'Dec', claims: 5800 }
    ],
    Y: [ // Yearly claims
      { name: '2021', claims: 600 },
      { name: '2022', claims: 2200 },
      { name: '2023', claims: 3800 },
      { name: '2024', claims: 5800 }
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
        <span className="text-[#8B5CF6] font-semibold">{value} $</span>
      )
    }
  ];

  return (
    <div className="min-h-screen">
      {/* TopBar */}
      <TopBar 
        title="Algo Trader" 
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
            label="Celkem algoritmů" 
            value={myAlgorithms.length}
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
              title={`Vývoj Algo Trader portfolia (${getTimeframeLabel()})`}
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
                      <div className="w-3 h-3 rounded-full bg-[#8B5CF6]" />
                      <span className="text-white/70">AI Algoritmy</span>
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
                <p className="text-xs text-white/50">{myAlgorithms.length} AI Algoritmů</p>
              </div>
            </InfoCard>

            <InfoCard 
              title="Vyzvednout odměnu"
              icon={
                <svg className="w-5 h-5 text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c1.1 0 2 .9 2 2v1M9 9h1m4 0h.01M9 17h1m4 0h.01M4 9v8a2 2 0 002 2h8a2 2 0 002-2V9M4 9V7a2 2 0 012-2h8a2 2 0 012 2v2M4 9h12" />
                </svg>
              }
            >
              <div className="space-y-3">
                <p className="text-sm text-white/70">Dostupné k vyzvednutí</p>
                <p className="text-xl font-bold text-[#8B5CF6]">{claimAmount.toLocaleString()} $</p>
                
                {/* Progress Bar - AI themed */}
                <div className="mb-4">
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] h-2 rounded-full transition-all duration-500"
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

        {/* My Algorithms Section with Grid/List View Toggle */}
        <div className="space-y-4">
          <DashboardCard 
            variant="default" 
            className="p-0"
          >
            <div className="p-6 border-b border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Moje algoritmy
                  </h3>
                  <p className="text-sm text-white/70">
                    Přehled vlastněných AI Algoritmů
                  </p>
                </div>
                
                {/* View Mode Toggle */}
                <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-all duration-300 ${
                      viewMode === 'grid'
                        ? 'bg-[#8B5CF6] text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-all duration-300 ${
                      viewMode === 'list'
                        ? 'bg-[#8B5CF6] text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Algorithms Display */}
            <div className="p-6">
              {viewMode === 'grid' ? (
                /* Grid View */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {myAlgorithms.map((algorithm) => (
                    <div 
                      key={algorithm.id} 
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-white/10 hover:border-[#8B5CF6]/30 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] flex items-center justify-center">
                          <span className="text-white font-bold text-sm">AI</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-white group-hover:text-[#8B5CF6] transition-colors">
                            {algorithm.name}
                          </h4>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-xs text-white/70">Aktivní od:</span>
                          <span className="text-xs text-white/90">{algorithm.purchaseDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-white/70">Investice:</span>
                          <span className="text-sm font-semibold text-[#8B5CF6]">{algorithm.value} $</span>
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
                        <th className="text-left py-3 text-sm font-medium text-white/70">Algoritmus</th>
                        <th className="text-left py-3 text-sm font-medium text-white/70">Aktivní od</th>
                        <th className="text-right py-3 text-sm font-medium text-white/70">Investice $</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myAlgorithms.map((algorithm) => (
                        <tr key={algorithm.id} className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                          <td className="py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] flex items-center justify-center">
                                <span className="text-white font-bold text-xs">AI</span>
                              </div>
                              <span className="text-sm text-white group-hover:text-[#8B5CF6] transition-colors">{algorithm.name}</span>
                            </div>
                          </td>
                          <td className="py-3 text-sm text-white/70">{algorithm.purchaseDate}</td>
                          <td className="py-3 text-sm text-[#8B5CF6] font-semibold text-right">{algorithm.value}</td>
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