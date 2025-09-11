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

interface CardRecord {
  id: string;
  name: string;
  purchaseDate: string;
  value: string;
}

export default function GCCardsPage() {
  const router = useRouter();
  const [selectedTimeframe, setSelectedTimeframe] = useState('M');
  const [claimProgress] = useState(45); // Percentage for claim progress
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid'); // New: View mode toggle
  
  // Mock data - nahraďte skutečnými daty z API
  const [userProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john@example.com',
    kycVerified: true
  });

  const [portfolioValue] = useState(6800);
  const [totalClaimed] = useState(2850);
  const [nextClaimDate] = useState('1. 1. 2026');
  const [claimAmount] = useState(2000);

  const [claimHistory] = useState<ClaimRecord[]>([
    { id: '1', project: 'GC Cards', date: '1.1.2026', amount: '2 000' },
    { id: '2', project: 'GC Cards', date: '1.1.2025', amount: '2 000' },
    { id: '3', project: 'GC Cards', date: '1.1.2025', amount: '2 000' },
    { id: '4', project: 'GC Cards', date: '1.1.2025', amount: '2 000' },
    { id: '5', project: 'GC Cards', date: '1.1.2025', amount: '2 000' },
    { id: '6', project: 'GC Cards', date: '1.1.2025', amount: '2 000' },
  ]);

  const [myCards] = useState<CardRecord[]>([
    { id: '1', name: 'Gold Card Premium', purchaseDate: '1.1.2025', value: '1 500' },
    { id: '2', name: 'Silver Card Standard', purchaseDate: '15.12.2024', value: '800' },
    { id: '3', name: 'Diamond Card Elite', purchaseDate: '10.11.2024', value: '2 200' },
    { id: '4', name: 'Platinum Card VIP', purchaseDate: '5.11.2024', value: '1 800' },
    { id: '5', name: 'Bronze Card Basic', purchaseDate: '20.10.2024', value: '600' },
    { id: '6', name: 'Emerald Card Exclusive', purchaseDate: '15.10.2024', value: '2 500' },
  ]);

  // Portfolio chart datasets with timeframes - same structure as portfolio
  const portfolioChartDatasets = {
    D: [ // Daily data (last 7 days)
      { name: 'Po', portfolio: 6650 },
      { name: 'Út', portfolio: 6680 },
      { name: 'St', portfolio: 6720 },
      { name: 'Čt', portfolio: 6750 },
      { name: 'Pá', portfolio: 6780 },
      { name: 'So', portfolio: 6790 },
      { name: 'Ne', portfolio: 6800 }
    ],
    W: [ // Weekly data (last 8 weeks)
      { name: 'T1', portfolio: 6200 },
      { name: 'T2', portfolio: 6350 },
      { name: 'T3', portfolio: 6450 },
      { name: 'T4', portfolio: 6580 },
      { name: 'T5', portfolio: 6650 },
      { name: 'T6', portfolio: 6700 },
      { name: 'T7', portfolio: 6750 },
      { name: 'T8', portfolio: 6800 }
    ],
    M: [ // Monthly data
      { name: 'Jan', portfolio: 5000 },
      { name: 'Feb', portfolio: 5200 },
      { name: 'Mar', portfolio: 5400 },
      { name: 'Apr', portfolio: 5300 },
      { name: 'May', portfolio: 5600 },
      { name: 'Jun', portfolio: 5800 },
      { name: 'Jul', portfolio: 6000 },
      { name: 'Aug', portfolio: 6200 },
      { name: 'Sep', portfolio: 6100 },
      { name: 'Oct', portfolio: 6400 },
      { name: 'Nov', portfolio: 6600 },
      { name: 'Dec', portfolio: 6800 }
    ],
    Y: [ // Yearly data
      { name: '2021', portfolio: 2000 },
      { name: '2022', portfolio: 3500 },
      { name: '2023', portfolio: 5200 },
      { name: '2024', portfolio: 6800 }
    ]
  };

  // Claims chart datasets
  const claimChartDatasets = {
    D: [ // Daily claims
      { name: 'Po', claims: 50 },
      { name: 'Út', claims: 75 },
      { name: 'St', claims: 60 },
      { name: 'Čt', claims: 90 },
      { name: 'Pá', claims: 80 },
      { name: 'So', claims: 70 },
      { name: 'Ne', claims: 85 }
    ],
    W: [ // Weekly claims  
      { name: 'T1', claims: 400 },
      { name: 'T2', claims: 450 },
      { name: 'T3', claims: 500 },
      { name: 'T4', claims: 550 },
      { name: 'T5', claims: 600 },
      { name: 'T6', claims: 650 },
      { name: 'T7', claims: 700 },
      { name: 'T8', claims: 750 }
    ],
    M: [ // Monthly claims
      { name: 'Jan', claims: 500 },
      { name: 'Feb', claims: 650 },
      { name: 'Mar', claims: 800 },
      { name: 'Apr', claims: 950 },
      { name: 'May', claims: 1100 },
      { name: 'Jun', claims: 1300 },
      { name: 'Jul', claims: 1500 },
      { name: 'Aug', claims: 1750 },
      { name: 'Sep', claims: 2000 },
      { name: 'Oct', claims: 2250 },
      { name: 'Nov', claims: 2550 },
      { name: 'Dec', claims: 2850 }
    ],
    Y: [ // Yearly claims
      { name: '2021', claims: 200 },
      { name: '2022', claims: 800 },
      { name: '2023', claims: 1600 },
      { name: '2024', claims: 2850 }
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
      key: 'project' as keyof ClaimRecord, 
      label: 'Projekt',
      render: (value: string) => (
        <span className="font-medium text-white">{value}</span>
      )
    },
    { 
      key: 'date' as keyof ClaimRecord, 
      label: 'Datum',
      render: (value: string) => (
        <span className="text-white/70 text-sm">{value}</span>
      )
    },
    { 
      key: 'amount' as keyof ClaimRecord, 
      label: 'Částka',
      render: (value: string) => (
        <span className="text-[#F9D523] font-semibold">{value} $</span>
      )
    }
  ];

  return (
    <div className="min-h-screen">
      {/* TopBar */}
      <TopBar 
        title="GC Cards" 
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
            label="Celkem karet" 
            value={myCards.length}
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
              title={`Vývoj GC Cards portfolia (${getTimeframeLabel()})`}
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
                      <div className="w-3 h-3 rounded-full bg-[#F9D523]" />
                      <span className="text-white/70">GC Cards</span>
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
                <p className="text-xs text-white/50">7 GC Cards</p>
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
                <p className="text-xl font-bold text-[#F9D523]">{claimAmount.toLocaleString()} $</p>
                
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#F9D523] to-[#B29819] h-2 rounded-full transition-all duration-500"
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

        {/* My Cards Section with Grid/List View Toggle */}
        <div className="space-y-4">
          <DashboardCard 
            variant="default" 
            className="p-0"
          >
            <div className="p-6 border-b border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Moje karty
                  </h3>
                  <p className="text-sm text-white/70">
                    Přehled vlastněných GC Cards
                  </p>
                </div>
                
                {/* View Mode Toggle */}
                <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-all duration-300 ${
                      viewMode === 'grid'
                        ? 'bg-[#F9D523] text-[#0A1628]'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-all duration-300 ${
                      viewMode === 'list'
                        ? 'bg-[#F9D523] text-[#0A1628]'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Cards Display */}
            <div className="p-6">
              {viewMode === 'grid' ? (
                /* Grid View */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {myCards.map((card) => (
                    <div 
                      key={card.id} 
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-white/10 hover:border-[#F9D523]/30 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B29819] to-[#F9D523] flex items-center justify-center">
                          <span className="text-black font-bold text-sm">GC</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-white group-hover:text-[#F9D523] transition-colors">
                            {card.name}
                          </h4>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-xs text-white/70">Nákup:</span>
                          <span className="text-xs text-white/90">{card.purchaseDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-white/70">Cena:</span>
                          <span className="text-sm font-semibold text-[#F9D523]">{card.value} $</span>
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
                        <th className="text-left py-3 text-sm font-medium text-white/70">Karta</th>
                        <th className="text-left py-3 text-sm font-medium text-white/70">Nákup</th>
                        <th className="text-right py-3 text-sm font-medium text-white/70">Cena $</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myCards.map((card) => (
                        <tr key={card.id} className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                          <td className="py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#B29819] to-[#F9D523] flex items-center justify-center">
                                <span className="text-black font-bold text-xs">GC</span>
                              </div>
                              <span className="text-sm text-white group-hover:text-[#F9D523] transition-colors">{card.name}</span>
                            </div>
                          </td>
                          <td className="py-3 text-sm text-white/70">{card.purchaseDate}</td>
                          <td className="py-3 text-sm text-[#F9D523] font-semibold text-right">{card.value}</td>
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