'use client';

import React, { useState, useEffect } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { DashboardCard, DashboardButton, StatCard } from '@/components/dashboard';
import { PortfolioUniversalChart } from '@/components/charts'; // ✅ NOVÝ IMPORT - Sjednocený graf
import { ArrowLeft, TrendingUp, Coins, Calendar, Download, Filter } from 'lucide-react';
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
  const [timeframe, setTimeframe] = useState('M');
  const [claimProgress, setClaimProgress] = useState(45); // Percentage for claim progress
  
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
    { id: '1', project: 'GC Cards', date: '1.1.2026', amount: '2 000 $' },
    { id: '2', project: 'GC Cards', date: '1.1.2025', amount: '2 000 $' },
    { id: '3', project: 'GC Cards', date: '1.1.2025', amount: '2 000 $' },
    { id: '4', project: 'GC Cards', date: '1.1.2025', amount: '2 000 $' },
    { id: '5', project: 'GC Cards', date: '1.1.2025', amount: '2 000 $' },
    { id: '6', project: 'GC Cards', date: '1.1.2025', amount: '2 000 $' },
  ]);

  const [myCards] = useState<CardRecord[]>([
    { id: '1', name: 'Gold Card Premium', purchaseDate: '1.1.2025', value: '1 500' },
    { id: '2', name: 'Silver Card Standard', purchaseDate: '15.12.2024', value: '800' },
    { id: '3', name: 'Diamond Card Elite', purchaseDate: '10.11.2024', value: '2 200' },
  ]);

  // ✅ NOVÁ DATA STRUKTURA PRO ČASOVÉ RÁMCE
  const gcCardsData = {
    portfolio: {
      M: [ // Měsíční data
        { name: 'Jan', value: 5000 },
        { name: 'Feb', value: 5200 },
        { name: 'Mar', value: 5400 },
        { name: 'Apr', value: 5300 },
        { name: 'May', value: 5600 },
        { name: 'Jun', value: 5800 },
        { name: 'Jul', value: 6000 },
        { name: 'Aug', value: 6200 },
        { name: 'Sep', value: 6100 },
        { name: 'Oct', value: 6400 },
        { name: 'Nov', value: 6600 },
        { name: 'Dec', value: 6800 }
      ],
      Y: [ // Roční data
        { name: '2021', value: 2000 },
        { name: '2022', value: 3500 },
        { name: '2023', value: 5200 },
        { name: '2024', value: 6800 }
      ]
    },
    claims: {
      M: [ // Měsíční claims
        { name: 'Jan', value: 500 },
        { name: 'Feb', value: 650 },
        { name: 'Mar', value: 800 },
        { name: 'Apr', value: 950 },
        { name: 'May', value: 1100 },
        { name: 'Jun', value: 1300 },
        { name: 'Jul', value: 1500 },
        { name: 'Aug', value: 1750 },
        { name: 'Sep', value: 2000 },
        { name: 'Oct', value: 2250 },
        { name: 'Nov', value: 2550 },
        { name: 'Dec', value: 2850 }
      ],
      Y: [ // Roční claims
        { name: '2021', value: 200 },
        { name: '2022', value: 800 },
        { name: '2023', value: 1600 },
        { name: '2024', value: 2850 }
      ]
    }
  };

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

        {/* Top Stats - STEJNÁ STRUKTURA JAKO V HLAVNÍM PORTFOLIO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* ✅ PORTFOLIO GRAF - NOVÁ IMPLEMENTACE */}
          <div className="lg:col-span-1">
            <PortfolioUniversalChart 
              data={gcCardsData.portfolio.M} // Default data
              timeframes={{
                M: gcCardsData.portfolio.M,
                Y: gcCardsData.portfolio.Y
              }}
              title="GC Cards Portfolio"
              height={280}
              currentValue={`${portfolioValue.toLocaleString()} $`}
              trend={{ value: 15.2, isPositive: true }}
              showFilters={true}
              primaryColor="#F9D523" // Zlatá pro GC Cards
              onTimeframeChange={(tf) => setTimeframe(tf)}
            />
          </div>

          {/* Claim Stats */}
          <div className="space-y-6">
            {/* Total Claimed */}
            <DashboardCard title="Celkem claimnuto" className="text-center">
              <div className="py-4">
                <div className="text-3xl font-bold text-white">
                  {totalClaimed.toLocaleString()} $
                </div>
                <div className="text-white/60 text-sm mt-1">Lifetime claims</div>
              </div>
            </DashboardCard>

            {/* Next Claim */}
            <DashboardCard title="Další claim" className="text-center">
              <div className="py-4">
                <div className="text-sm text-white/70 mb-2">Claim</div>
                <div className="text-2xl font-bold text-white mb-4">
                  {nextClaimDate}
                </div>
                
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#F9D523] to-[#B29819] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${claimProgress}%` }}
                    ></div>
                  </div>
                </div>
                
                <DashboardButton 
                  variant="primary"
                  className="w-full"
                  onClick={() => console.log('Claim clicked')}
                >
                  CLAIM {claimAmount.toLocaleString()} $
                </DashboardButton>
              </div>
            </DashboardCard>
          </div>
        </div>

        {/* Charts Row - STRUKTURA JAKO V HLAVNÍM PORTFOLIO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* ✅ CLAIM HISTORY CHART - NOVÁ IMPLEMENTACE */}
          <div>
            <PortfolioUniversalChart 
              data={gcCardsData.claims.M} // Default data
              timeframes={{
                M: gcCardsData.claims.M,
                Y: gcCardsData.claims.Y
              }}
              title="Celkové výplaty"
              height={280}
              currentValue={`${totalClaimed.toLocaleString()} $`}
              trend={{ value: 22.3, isPositive: true }}
              showFilters={true}
              primaryColor="#10B981" // Zelená pro claims
              onTimeframeChange={(tf) => setTimeframe(tf)}
            />
          </div>

          {/* Claim History Table */}
          <DashboardCard title="Historie claimů">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 text-sm font-medium text-white/70">Projekt</th>
                    <th className="text-left py-3 text-sm font-medium text-white/70">Datum</th>
                    <th className="text-right py-3 text-sm font-medium text-white/70">Claim $</th>
                  </tr>
                </thead>
                <tbody>
                  {claimHistory.map((record) => (
                    <tr key={record.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 text-sm text-white">{record.project}</td>
                      <td className="py-3 text-sm text-white/70">{record.date}</td>
                      <td className="py-3 text-sm text-white text-right">{record.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination - ÚKOL 4: Opravené pořadí stránek */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <button className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 transition-colors">
                &lt;
              </button>
              <button className="w-8 h-8 rounded bg-[#F9D523] text-black font-medium">1</button>
              <button className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 transition-colors">2</button>
              <button className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 transition-colors">3</button>
              <button className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 transition-colors">
                &gt;
              </button>
            </div>
          </DashboardCard>
        </div>

        {/* My Cards Row */}
        <div className="grid grid-cols-1 gap-6">
          {/* My Cards - ÚKOL 5: Změna nadpisu */}
          <DashboardCard title="Moje karty">
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
                    <tr key={card.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#B29819] to-[#F9D523] flex items-center justify-center">
                            <span className="text-black font-bold text-xs">C</span>
                          </div>
                          <span className="text-sm text-white">{card.name}</span>
                        </div>
                      </td>
                      <td className="py-3 text-sm text-white/70">{card.purchaseDate}</td>
                      <td className="py-3 text-sm text-white text-right">{card.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}