'use client';

import React, { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { DashboardCard } from '@/components/dashboard';
import { DashboardButton } from '@/components/dashboard/DashboardButton';
import { PortfolioChart } from '@/components/charts';

// Mock data pro VIP portfolio graf
const vipPortfolioData = [
  { name: 'Jan', value: 45000 },
  { name: 'Feb', value: 52000 },
  { name: 'Mar', value: 48000 },
  { name: 'Apr', value: 61000 },
  { name: 'May', value: 58000 },
  { name: 'Jun', value: 67000 },
  { name: 'Jul', value: 73000 },
  { name: 'Aug', value: 69000 },
  { name: 'Sep', value: 78000 },
  { name: 'Oct', value: 82000 },
  { name: 'Nov', value: 89000 },
  { name: 'Dec', value: 95000 }
];

const vipPortfolioDataYearly = [
  { name: '2021', value: 23000 },
  { name: '2022', value: 45000 },
  { name: '2023', value: 67000 },
  { name: '2024', value: 95000 }
];

// Mock data pro VIP členy
const vipMembers = [
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
];

const vipStats = {
  totalMembers: vipMembers.length,
  totalInvestment: vipMembers.reduce((sum, member) => sum + member.totalInvestment, 0),
  averageInvestment: Math.round(vipMembers.reduce((sum, member) => sum + member.totalInvestment, 0) / vipMembers.length),
  activeMembers: vipMembers.filter(member => member.status === 'active').length,
  totalCards: vipMembers.reduce((sum, member) => sum + member.cardsOwned, 0),
  currentPortfolioValue: 95000 // Aktuální hodnota VIP portfolia
};

const formatAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export default function VipPage() {
  const [timeframe, setTimeframe] = useState('monthly');
  const [claimCooldown, setClaimCooldown] = useState(false);

  // Mock user data
  const userProfile = {
    name: "Admin User",
    email: "admin@gavlikcapital.com",
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb3",
    kycVerified: true,
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

  // Filter dat podle timeframe
  const getFilteredData = () => {
    if (timeframe === 'yearly') {
      return vipPortfolioDataYearly;
    }
    return vipPortfolioData;
  };

  return (
    <div className="min-h-screen">
      {/* TopBar */}
      <TopBar 
        title="VIP Club"
        userProfile={userProfile}
        notificationCount={3}
      />
      
      <div className="p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">VIP Dashboard</h1>
          <p className="text-white/70">Exkluzívní přístup pro VIP členy Gavlik Capital</p>
        </div>

        {/* VIP Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard className="text-center p-6">
            <div className="text-3xl font-bold text-[#F9D523] mb-2">
              {vipStats.totalMembers}
            </div>
            <div className="text-white/70 text-sm">
              VIP Členové
            </div>
          </DashboardCard>
          
          <DashboardCard className="text-center p-6">
            <div className="text-3xl font-bold text-[#F9D523] mb-2">
              ${vipStats.totalInvestment.toLocaleString()}
            </div>
            <div className="text-white/70 text-sm">
              Celková investice
            </div>
          </DashboardCard>
          
          <DashboardCard className="text-center p-6">
            <div className="text-3xl font-bold text-[#F9D523] mb-2">
              {vipStats.totalCards}
            </div>
            <div className="text-white/70 text-sm">
              Celkové karty
            </div>
          </DashboardCard>

          <DashboardCard className="text-center p-6">
            <div className="text-3xl font-bold text-[#F9D523] mb-2">
              ${vipStats.averageInvestment.toLocaleString()}
            </div>
            <div className="text-white/70 text-sm">
              Průměrná investice
            </div>
          </DashboardCard>
        </div>

        {/* Main Content Grid - Graf a VIP Claim */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          
          {/* VIP Portfolio Graf - Hlavní graf */}
          <div className="xl:col-span-2">
            <DashboardCard>
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2">VIP Portfolio Performance</h2>
                    <p className="text-white/70 text-sm">Celkové portfolio všech VIP akcionářů</p>
                  </div>
                  
                  {/* Timeframe selector */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setTimeframe('monthly')}
                      className={`px-3 py-1 rounded-lg text-sm transition-all ${
                        timeframe === 'monthly' 
                          ? 'bg-[#F9D523] text-black font-medium' 
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setTimeframe('yearly')}
                      className={`px-3 py-1 rounded-lg text-sm transition-all ${
                        timeframe === 'yearly' 
                          ? 'bg-[#F9D523] text-black font-medium' 
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      Yearly
                    </button>
                  </div>
                </div>
                
                {/* Aktuální hodnota */}
                <div className="mb-6">
                  <div className="text-3xl font-bold text-white mb-1">
                    ${vipStats.currentPortfolioValue.toLocaleString()}
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-green-400 mr-2">↗ +12.3%</span>
                    <span className="text-white/70">vs last month</span>
                  </div>
                </div>
              </div>
              
              {/* Graf */}
              <div className="p-6">
                <div className="h-80">
                  <PortfolioChart 
                    data={getFilteredData()}
                    height={320}
                    title=""
                    className="h-full"
                  />
                </div>
              </div>
            </DashboardCard>
          </div>

          {/* VIP Claim Section */}
          <div className="space-y-6">
            
            {/* VIP Claim */}
            <DashboardCard>
              <div className="p-6 text-center">
                <h3 className="text-lg font-bold text-white mb-2">VIP Claim</h3>
                <p className="text-white/70 text-sm mb-4">Odmeny pro VIP členy</p>
                
                <div className="mb-4">
                  <div className="text-2xl font-bold text-[#F9D523] mb-1">2,500 $</div>
                  <div className="text-white/70 text-xs">Dostupná odmena</div>
                </div>
                
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#F9D523] to-[#B29819] h-2 rounded-full transition-all duration-500"
                      style={{ width: '85%' }}
                    ></div>
                  </div>
                  <div className="text-xs text-white/70 mt-1">Next claim in 2 days</div>
                </div>
                
                {/* VIP Claim Button */}
                <DashboardButton 
                  variant="primary"
                  className={`w-full transition-all duration-300 ${
                    claimCooldown 
                      ? 'bg-gray-500 cursor-not-allowed opacity-50' 
                      : 'bg-gradient-to-r from-purple-500 to-[#F9D523] hover:from-purple-600 hover:to-[#E6C547] hover:shadow-[0_0_20px_rgba(249,213,35,0.4)]'
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
            </DashboardCard>

            {/* VIP Benefits */}
            <DashboardCard>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">VIP Benefits</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-[#F9D523] rounded-full mr-3"></div>
                    <span className="text-white/90">Higher claim rewards</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-[#F9D523] rounded-full mr-3"></div>
                    <span className="text-white/90">Exclusive events access</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-[#F9D523] rounded-full mr-3"></div>
                    <span className="text-white/90">Priority support</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-[#F9D523] rounded-full mr-3"></div>
                    <span className="text-white/90">Early access to features</span>
                  </div>
                </div>
              </div>
            </DashboardCard>

          </div>
        </div>

        {/* VIP Members List */}
        <DashboardCard className="overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white mb-2">VIP Členové</h2>
            <p className="text-white/70">Seznam všech VIP členů s přehledem jejich portfolia</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="border-b border-white/10">
                <tr className="bg-white/5">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/70">Člen</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/70">Úroveň</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/70">Karty</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/70">Investice</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/70">Datum vstupu</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/70">Status</th>
                </tr>
              </thead>
              <tbody>
                {vipMembers.map((member) => (
                  <tr 
                    key={member.id} 
                    className="border-b border-white/5 hover:bg-white/5 hover:border-l-4 hover:border-l-[#F9D523] hover:translate-x-1 transition-all duration-300 cursor-pointer"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F9D523] to-[#B29819] flex items-center justify-center text-black font-bold text-sm mr-3">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-medium text-white">{member.name}</div>
                          <div className="text-white/50 text-sm">{member.email}</div>
                          <div className="text-white/40 text-xs font-mono">
                            {formatAddress(member.address)}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-[#F9D523]/20 text-[#F9D523] border border-[#F9D523]/30">
                        {member.level}
                      </span>
                    </td>
                    
                    <td className="py-4 px-6 text-white">{member.cardsOwned}</td>
                    
                    <td className="py-4 px-6 text-[#F9D523] font-medium">${member.totalInvestment.toLocaleString()}</td>
                    
                    <td className="py-4 px-6 text-white/70">{new Date(member.joinDate).toLocaleDateString('cs-CZ')}</td>
                    
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          member.status === 'active' ? 'bg-green-400' : 'bg-yellow-400'
                        }`}></div>
                        <span className={`text-sm ${
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
          
          <div className="p-6 border-t border-white/10 bg-white/[0.02]">
            <div className="flex items-center justify-between">
              <p className="text-white/70 text-sm">
                Zobrazeno {vipMembers.length} z {vipStats.totalMembers} členů
              </p>
              <div className="flex gap-2">
                <DashboardButton variant="outline" size="sm">
                  Export CSV
                </DashboardButton>
                <DashboardButton variant="primary" size="sm">
                  Přidat člena
                </DashboardButton>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
