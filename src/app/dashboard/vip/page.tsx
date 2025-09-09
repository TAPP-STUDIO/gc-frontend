'use client';

import React, { useState, useEffect } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { 
  DashboardCard, 
  DashboardButton, 
  StatCard, 
  ValueCard,
  ChartCard,
  InfoCard,
  DashboardTable 
} from '@/components/dashboard';
import { PortfolioUniversalChart } from '@/components/charts';
import { ArrowLeft, TrendingUp, Crown, Calendar, Download, Filter, Grid3X3, List, Users, Award } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface UserProfile {
  name: string;
  avatar?: string;
  email?: string;
  address?: string;
  kycVerified?: boolean;
}

interface VipMember {
  id: number;
  name: string;
  email: string;
  address: string;
  joinDate: string;
  status: 'active' | 'pending';
  level: string;
  cardsOwned: number;
  totalInvestment: number;
}

interface VipClaim {
  id: string;
  member: string;
  date: string;
  amount: string;
}

export default function VipPage() {
  const router = useRouter();
  const [selectedTimeframe, setSelectedTimeframe] = useState('M');
  const [claimProgress, setClaimProgress] = useState(85); // Percentage for VIP claim progress
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid'); // View mode toggle
  const [claimCooldown, setClaimCooldown] = useState(false);
  
  // Mock data - nahraďte skutečnými daty z API
  const [userProfile] = useState<UserProfile>({
    name: 'Admin User',
    email: 'admin@gavlikcapital.com',
    kycVerified: true
  });

  const [vipPortfolioValue] = useState(95000);
  const [totalMembers] = useState(6);
  const [totalInvestment] = useState(634000);
  const [vipClaimAmount] = useState(2500);

  // VIP Members data
  const [vipMembers] = useState<VipMember[]>([
    {
      id: 1,
      name: 'Pavel Novák',
      email: 'pavel.novak@email.cz',
      address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb3',
      joinDate: '2024-01-15',
      status: 'active',
      level: 'VIP',
      cardsOwned: 156,
      totalInvestment: 125000
    },
    {
      id: 2,
      name: 'Anna Svobodová',
      email: 'anna.svobodova@email.cz',
      address: '0x8f7E3b2C9d1A6548FbD2E7C8A4B6E5D3F9A2C1B4',
      joinDate: '2024-02-03',
      status: 'active',
      level: 'VIP',
      cardsOwned: 89,
      totalInvestment: 78000
    },
    {
      id: 3,
      name: 'Martin Dvořák',
      email: 'martin.dvorak@email.cz',
      address: '0x5D2F8E4A7B1C9E6D8F2A5C7B4E9D6F8A1C3B7E9D',
      joinDate: '2024-03-12',
      status: 'active',
      level: 'VIP',
      cardsOwned: 234,
      totalInvestment: 189000
    },
    {
      id: 4,
      name: 'Tereza Krásná',
      email: 'tereza.krasna@email.cz',
      address: '0x9A3B6E2D8F1C5A7E4B9D2F6A8C1E5B7D9F3A6C8E',
      joinDate: '2024-04-08',
      status: 'pending',
      level: 'VIP',
      cardsOwned: 67,
      totalInvestment: 54000
    },
    {
      id: 5,
      name: 'Tomáš Veselý',
      email: 'tomas.vesely@email.cz',
      address: '0x6C8A2E5D1F9B7A4E8C2D5F7A9B1E4D6F8A2C5E7D',
      joinDate: '2024-05-20',
      status: 'active',
      level: 'VIP',
      cardsOwned: 198,
      totalInvestment: 156000
    },
    {
      id: 6,
      name: 'Lucie Černá',
      email: 'lucie.cerna@email.cz',
      address: '0x1E4B7D9F2A5C8E6D1F4A7C9E2B5D8F1A4C7E9B2D',
      joinDate: '2024-06-15',
      status: 'active',
      level: 'VIP',
      cardsOwned: 45,
      totalInvestment: 32000
    }
  ]);

  const [vipClaimHistory] = useState<VipClaim[]>([
    { id: '1', member: 'Pavel Novák', date: '1.1.2026', amount: '3 500' },
    { id: '2', member: 'Anna Svobodová', date: '1.1.2026', amount: '2 800' },
    { id: '3', member: 'Martin Dvořák', date: '1.1.2026', amount: '4 200' },
    { id: '4', member: 'Tereza Krásná', date: '1.1.2025', amount: '2 500' },
    { id: '5', member: 'Tomáš Veselý', date: '1.1.2025', amount: '3 800' },
    { id: '6', member: 'Lucie Černá', date: '1.1.2025', amount: '1 900' },
  ]);

  // VIP Portfolio chart datasets with timeframes
  const vipPortfolioDatasets = {
    D: [ // Daily data (last 7 days)
      { name: 'Po', portfolio: 92500 },
      { name: 'Út', portfolio: 93200 },
      { name: 'St', portfolio: 93800 },
      { name: 'Čt', portfolio: 94200 },
      { name: 'Pá', portfolio: 94600 },
      { name: 'So', portfolio: 94800 },
      { name: 'Ne', portfolio: 95000 }
    ],
    W: [ // Weekly data (last 8 weeks)
      { name: 'T1', portfolio: 88000 },
      { name: 'T2', portfolio: 89500 },
      { name: 'T3', portfolio: 90200 },
      { name: 'T4', portfolio: 91800 },
      { name: 'T5', portfolio: 92500 },
      { name: 'T6', portfolio: 93200 },
      { name: 'T7', portfolio: 94100 },
      { name: 'T8', portfolio: 95000 }
    ],
    M: [ // Monthly data
      { name: 'Jan', portfolio: 45000 },
      { name: 'Feb', portfolio: 52000 },
      { name: 'Mar', portfolio: 48000 },
      { name: 'Apr', portfolio: 61000 },
      { name: 'May', portfolio: 58000 },
      { name: 'Jun', portfolio: 67000 },
      { name: 'Jul', portfolio: 73000 },
      { name: 'Aug', portfolio: 69000 },
      { name: 'Sep', portfolio: 78000 },
      { name: 'Oct', portfolio: 82000 },
      { name: 'Nov', portfolio: 89000 },
      { name: 'Dec', portfolio: 95000 }
    ],
    Y: [ // Yearly data
      { name: '2021', portfolio: 23000 },
      { name: '2022', portfolio: 45000 },
      { name: '2023', portfolio: 67000 },
      { name: '2024', portfolio: 95000 }
    ]
  };

  // VIP Claims chart datasets
  const vipClaimsDatasets = {
    D: [ // Daily VIP claims
      { name: 'Po', claims: 2500 },
      { name: 'Út', claims: 3200 },
      { name: 'St', claims: 2800 },
      { name: 'Čt', claims: 3500 },
      { name: 'Pá', claims: 3100 },
      { name: 'So', claims: 2900 },
      { name: 'Ne', claims: 3400 }
    ],
    W: [ // Weekly VIP claims  
      { name: 'T1', claims: 18000 },
      { name: 'T2', claims: 19500 },
      { name: 'T3', claims: 21200 },
      { name: 'T4', claims: 22800 },
      { name: 'T5', claims: 24500 },
      { name: 'T6', claims: 26100 },
      { name: 'T7', claims: 27800 },
      { name: 'T8', claims: 29500 }
    ],
    M: [ // Monthly VIP claims
      { name: 'Jan', claims: 15000 },
      { name: 'Feb', claims: 18200 },
      { name: 'Mar', claims: 21500 },
      { name: 'Apr', claims: 24800 },
      { name: 'May', claims: 28100 },
      { name: 'Jun', claims: 31200 },
      { name: 'Jul', claims: 34500 },
      { name: 'Aug', claims: 37800 },
      { name: 'Sep', claims: 41100 },
      { name: 'Oct', claims: 44200 },
      { name: 'Nov', claims: 47500 },
      { name: 'Dec', claims: 50800 }
    ],
    Y: [ // Yearly VIP claims
      { name: '2021', claims: 12000 },
      { name: '2022', claims: 28000 },
      { name: '2023', claims: 38500 },
      { name: '2024', claims: 50800 }
    ]
  };

  // Functions for timeframe handling
  const getTimeframeLabel = () => {
    const labels = {
      D: 'tento týden',
      W: 'posledních 8 týdnů', 
      M: 'posledních 12 měsíců',
      Y: 'posledních 5 let'
    };
    return labels[selectedTimeframe as keyof typeof labels] || labels.M;
  };

  // Funkce pro VIP claim
  const handleVipClaim = () => {
    if (claimCooldown) return;
    
    setClaimCooldown(true);
    console.log('VIP Claim executed!');
    
    // Simulace API volání
    setTimeout(() => {
      setClaimCooldown(false);
      alert('VIP Claim successful! You received special VIP rewards.');
    }, 2000);
  };

  // Utility functions
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const averageInvestment = Math.round(totalInvestment / totalMembers);
  const activeMembers = vipMembers.filter(member => member.status === 'active').length;
  const totalCards = vipMembers.reduce((sum, member) => sum + member.cardsOwned, 0);

  // Table columns for VIP claims history
  const claimColumns = [
    { 
      key: 'member', 
      label: 'Člen',
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
        title="VIP Club" 
        userProfile={userProfile}
        notificationCount={3}
      />
      
      <div className="p-4 sm:p-6 lg:p-8">
        
        {/* Back Button */}
        <div className="mb-6">
          <DashboardButton
            onClick={() => router.push('/dashboard')}
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
            label="VIP Členové" 
            value={totalMembers}
            variant="default"
            className="h-28 min-h-[7rem] flex flex-col justify-between"
          >
            <p className="text-xs text-white/70 mt-auto">Celkem aktivních: {activeMembers}</p>
          </ValueCard>

          <ValueCard 
            label="VIP Portfolio" 
            value={`${vipPortfolioValue.toLocaleString()} $`}
            variant="default"
            className="h-28 min-h-[7rem] flex flex-col justify-center"
          />

          <ValueCard 
            label="Celkové investice" 
            value={`${totalInvestment.toLocaleString()} $`}
            variant="default"
            className="h-28 min-h-[7rem] flex flex-col justify-center"
          />

          <ValueCard 
            label="Průměrná investice" 
            value={`${averageInvestment.toLocaleString()} $`}
            variant="default"
            className="h-28 min-h-[7rem] flex flex-col justify-center"
          />
        </div>

        {/* Main Charts Grid - same layout as GC Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 lg:gap-20 mb-20">
          {/* LEFT - VIP Portfolio Graf */}
          <div className="lg:col-span-2">
            <ChartCard 
              title={`Vývoj VIP portfolia (${getTimeframeLabel()})`}
              value={`${vipPortfolioValue.toLocaleString()} $`}
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
                      <span className="text-white/70">VIP Portfolio</span>
                    </div>
                  </div>
                </div>
              }
            >
              {/* VIP Portfolio Graf */}
              <PortfolioUniversalChart 
                data={vipPortfolioDatasets[selectedTimeframe as keyof typeof vipPortfolioDatasets] || vipPortfolioDatasets.M}
                height={320}
                primaryColor="#8B5CF6"
                primaryKey="portfolio"
                showGrid={true}
                showTooltip={true}
                animate={true}
                className="w-full"
              />
            </ChartCard>
          </div>

          {/* RIGHT - VIP Info Cards */}
          <div className="space-y-3 lg:space-y-4">
            <InfoCard 
              title="VIP Portfolio"
              icon={
                <Crown className="w-5 h-5 text-[#8B5CF6]" />
              }
            >
              <div className="space-y-2">
                <p className="text-2xl font-bold text-white">{vipPortfolioValue.toLocaleString()} $</p>
                <p className="text-xs text-white/50">{totalMembers} VIP členů</p>
              </div>
            </InfoCard>

            <InfoCard 
              title="VIP Claim"
              icon={
                <Award className="w-5 h-5 text-[#8B5CF6]" />
              }
            >
              <div className="space-y-3">
                <p className="text-sm text-white/70">Dostupné k vyzvednutí</p>
                <p className="text-xl font-bold text-[#8B5CF6]">{vipClaimAmount.toLocaleString()} $</p>
                
                {/* Progress Bar - VIP themed */}
                <div className="mb-4">
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#8B5CF6] to-[#F9D523] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${claimProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-white/50 mt-1">Next claim in 2 days</p>
                </div>
                
                <DashboardButton 
                  variant="primary" 
                  size="sm" 
                  className={`w-full transition-all duration-300 ${
                    claimCooldown 
                      ? 'bg-gray-500 cursor-not-allowed opacity-50' 
                      : 'bg-gradient-to-r from-[#8B5CF6] to-[#F9D523] hover:from-purple-600 hover:to-[#E6C547] hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]'
                  }`}
                  onClick={handleVipClaim}
                  disabled={claimCooldown}
                >
                  {claimCooldown ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    'VIP CLAIM 2,500 $'
                  )}
                </DashboardButton>
              </div>
            </InfoCard>

            <InfoCard 
              title="VIP Benefits"
              icon={
                <TrendingUp className="w-5 h-5 text-[#F9D523]" />
              }
            >
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-[#8B5CF6] rounded-full mr-3"></div>
                  <span className="text-white/90">Higher claim rewards</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-[#8B5CF6] rounded-full mr-3"></div>
                  <span className="text-white/90">Exclusive events access</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-[#8B5CF6] rounded-full mr-3"></div>
                  <span className="text-white/90">Priority support</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-[#8B5CF6] rounded-full mr-3"></div>
                  <span className="text-white/90">Early access</span>
                </div>
              </div>
            </InfoCard>
          </div>
        </div>

        {/* Bottom Section - VIP Claims Chart */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 lg:gap-12 mb-8">
          {/* LEFT - VIP Claims Graf */}
          <div className="lg:col-span-2">
            <ChartCard 
              title={`VIP Claims historie (${getTimeframeLabel()})`}
              value={`50,800 $`}
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
                      <span className="text-white/70">VIP Claims</span>
                    </div>
                  </div>
                </div>
              }
            >
              {/* VIP Claims Graf */}
              <PortfolioUniversalChart 
                data={vipClaimsDatasets[selectedTimeframe as keyof typeof vipClaimsDatasets] || vipClaimsDatasets.M}
                height={320}
                primaryColor="#8B5CF6"
                primaryKey="claims"
                showGrid={true}
                showTooltip={true}
                animate={true}
                className="w-full"
              />
            </ChartCard>
          </div>

          {/* RIGHT - VIP Claims History Table */}
          <div className="space-y-4">
            <DashboardCard 
              variant="default" 
              className="p-0"
            >
              <div className="p-6 border-b border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Poslední VIP Claims
                    </h3>
                    <p className="text-sm text-white/70">
                      Nejnovější VIP výplaty
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <DashboardTable
                  columns={claimColumns}
                  data={vipClaimHistory.slice(0, 4)} // Show only first 4 items
                  className="w-full"
                />
              </div>
            </DashboardCard>
          </div>
        </div>

        {/* VIP Members Section with Grid/List View Toggle */}
        <div className="space-y-4">
          <DashboardCard 
            variant="default" 
            className="p-0"
          >
            <div className="p-6 border-b border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    VIP Členové
                  </h3>
                  <p className="text-sm text-white/70">
                    Seznam všech VIP členů s přehledem portfolia
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
            
            {/* VIP Members Display */}
            <div className="p-6">
              {viewMode === 'grid' ? (
                /* Grid View */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {vipMembers.map((member) => (
                    <div 
                      key={member.id} 
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-white/10 hover:border-[#8B5CF6]/30 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#F9D523] flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-white group-hover:text-[#8B5CF6] transition-colors">
                            {member.name}
                          </h4>
                          <div className="flex items-center gap-1">
                            <div className={`w-2 h-2 rounded-full ${
                              member.status === 'active' ? 'bg-green-400' : 'bg-yellow-400'
                            }`}></div>
                            <span className="text-xs text-[#8B5CF6]">{member.level}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-xs text-white/70">Vstup:</span>
                          <span className="text-xs text-white/90">{new Date(member.joinDate).toLocaleDateString('cs-CZ')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-white/70">Karty:</span>
                          <span className="text-xs text-white/90">{member.cardsOwned}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-white/70">Investice:</span>
                          <span className="text-sm font-semibold text-[#8B5CF6]">{member.totalInvestment.toLocaleString()} $</span>
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
                        <th className="text-left py-3 text-sm font-medium text-white/70">Člen</th>
                        <th className="text-left py-3 text-sm font-medium text-white/70">Level</th>
                        <th className="text-left py-3 text-sm font-medium text-white/70">Karty</th>
                        <th className="text-right py-3 text-sm font-medium text-white/70">Investice</th>
                        <th className="text-left py-3 text-sm font-medium text-white/70">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vipMembers.map((member) => (
                        <tr key={member.id} className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                          <td className="py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#F9D523] flex items-center justify-center">
                                <span className="text-white font-bold text-xs">
                                  {member.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <span className="text-sm text-white group-hover:text-[#8B5CF6] transition-colors">{member.name}</span>
                                <div className="text-xs text-white/50 font-mono">{formatAddress(member.address)}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3">
                            <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-[#8B5CF6]/20 text-[#8B5CF6] border border-[#8B5CF6]/30">
                              {member.level}
                            </span>
                          </td>
                          <td className="py-3 text-sm text-white/70">{member.cardsOwned}</td>
                          <td className="py-3 text-sm text-[#8B5CF6] font-semibold text-right">{member.totalInvestment.toLocaleString()} $</td>
                          <td className="py-3">
                            <div className="flex items-center">
                              <div className={`w-2 h-2 rounded-full mr-2 ${
                                member.status === 'active' ? 'bg-green-400' : 'bg-yellow-400'
                              }`}></div>
                              <span className={`text-xs ${
                                member.status === 'active' ? 'text-green-400' : 'text-yellow-400'
                              }`}>
                                {member.status === 'active' ? 'Aktivní' : 'Čekající'}
                              </span>
                            </div>
                          </td>
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