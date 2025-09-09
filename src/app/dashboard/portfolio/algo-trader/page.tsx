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

interface AlgorithmRecord {
  id: string;
  name: string;
  purchaseDate: string;
  value: string;
}

export default function AlgoTraderPage() {
  const router = useRouter();
  const [timeframe, setTimeframe] = useState('M');
  const [claimProgress, setClaimProgress] = useState(73); // Percentage for claim progress
  
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
    { id: '1', project: 'Algo Trader', date: '1.1.2026', amount: '2 400 $' },
    { id: '2', project: 'Algo Trader', date: '15.12.2025', amount: '2 200 $' },
    { id: '3', project: 'Algo Trader', date: '1.12.2025', amount: '2 350 $' },
    { id: '4', project: 'Algo Trader', date: '15.11.2025', amount: '2 100 $' },
    { id: '5', project: 'Algo Trader', date: '1.11.2025', amount: '2 050 $' },
    { id: '6', project: 'Algo Trader', date: '15.10.2025', amount: '1 950 $' },
  ]);

  const [myAlgorithms] = useState<AlgorithmRecord[]>([
    { id: '1', name: 'Mean Reversion Strategy', purchaseDate: '1.1.2025', value: '4 500' },
    { id: '2', name: 'Momentum Trading Algo', purchaseDate: '20.12.2024', value: '3 200' },
    { id: '3', name: 'Arbitrage Algorithm', purchaseDate: '5.11.2024', value: '2 800' },
    { id: '4', name: 'ML Sentiment Analysis', purchaseDate: '22.10.2024', value: '4 200' },
  ]);

  // ✅ NOVÁ DATA STRUKTURA PRO ČASOVÉ RÁMCE
  const algoTraderData = {
    portfolio: {
      M: [ // Měsíční data
        { name: 'Jan', value: 8500 },
        { name: 'Feb', value: 9200 },
        { name: 'Mar', value: 9800 },
        { name: 'Apr', value: 10200 },
        { name: 'May', value: 10800 },
        { name: 'Jun', value: 11200 },
        { name: 'Jul', value: 11600 },
        { name: 'Aug', value: 11900 },
        { name: 'Sep', value: 12100 },
        { name: 'Oct', value: 12300 },
        { name: 'Nov', value: 12400 },
        { name: 'Dec', value: 12500 }
      ],
      Y: [ // Roční data
        { name: '2021', value: 4000 },
        { name: '2022', value: 7200 },
        { name: '2023', value: 9800 },
        { name: '2024', value: 12500 }
      ]
    },
    claims: {
      M: [ // Měsíční claims
        { name: 'Jan', value: 1200 },
        { name: 'Feb', value: 1600 },
        { name: 'Mar', value: 2100 },
        { name: 'Apr', value: 2600 },
        { name: 'May', value: 3100 },
        { name: 'Jun', value: 3600 },
        { name: 'Jul', value: 4100 },
        { name: 'Aug', value: 4600 },
        { name: 'Sep', value: 5000 },
        { name: 'Oct', value: 5300 },
        { name: 'Nov', value: 5600 },
        { name: 'Dec', value: 5800 }
      ],
      Y: [ // Roční claims
        { name: '2021', value: 600 },
        { name: '2022', value: 2200 },
        { name: '2023', value: 3800 },
        { name: '2024', value: 5800 }
      ]
    }
  };

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

        {/* Top Stats - STEJNÁ STRUKTURA JAKO V HLAVNÍM PORTFOLIO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* ✅ PORTFOLIO GRAF - NOVÁ IMPLEMENTACE */}
          <div className="lg:col-span-1">
            <PortfolioUniversalChart 
              data={algoTraderData.portfolio.M} // Default data
              timeframes={{
                M: algoTraderData.portfolio.M,
                Y: algoTraderData.portfolio.Y
              }}
              title="Algo Trader Portfolio"
              height={280}
              currentValue={`${portfolioValue.toLocaleString()} $`}
              trend={{ value: 12.1, isPositive: true }}
              showFilters={true}
              primaryColor="#8B5CF6" // ✅ AI fialová pro Algo Trader
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
                
                {/* Progress Bar - AI themed */}
                <div className="mb-4">
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] h-2 rounded-full transition-all duration-500"
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
              data={algoTraderData.claims.M} // Default data
              timeframes={{
                M: algoTraderData.claims.M,
                Y: algoTraderData.claims.Y
              }}
              title="Celkové výplaty"
              height={280}
              currentValue={`${totalClaimed.toLocaleString()} $`}
              trend={{ value: 26.8, isPositive: true }}
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
              <button className="w-8 h-8 rounded bg-[#8B5CF6] text-white font-medium">1</button>
              <button className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 transition-colors">2</button>
              <button className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 transition-colors">3</button>
              <button className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 transition-colors">
                &gt;
              </button>
            </div>
          </DashboardCard>
        </div>

        {/* My Algorithms Row */}
        <div className="grid grid-cols-1 gap-6">
          {/* My Algorithms - ÚKOL 5: Změna nadpisu */}
          <DashboardCard title="Moje karty">
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
                    <tr key={algorithm.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] flex items-center justify-center">
                            <span className="text-white font-bold text-xs">AI</span>
                          </div>
                          <span className="text-sm text-white">{algorithm.name}</span>
                        </div>
                      </td>
                      <td className="py-3 text-sm text-white/70">{algorithm.purchaseDate}</td>
                      <td className="py-3 text-sm text-white text-right">{algorithm.value}</td>
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