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

interface BotRecord {
  id: string;
  name: string;
  purchaseDate: string;
  value: string;
}

export default function BTCBotPage() {
  const router = useRouter();
  const [timeframe, setTimeframe] = useState('M');
  const [claimProgress, setClaimProgress] = useState(62); // Percentage for claim progress
  
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
    { id: '1', project: 'BTC BOT', date: '1.1.2026', amount: '1 800 $' },
    { id: '2', project: 'BTC BOT', date: '1.12.2025', amount: '1 750 $' },
    { id: '3', project: 'BTC BOT', date: '1.11.2025', amount: '1 900 $' },
    { id: '4', project: 'BTC BOT', date: '1.10.2025', amount: '2 100 $' },
    { id: '5', project: 'BTC BOT', date: '1.9.2025', amount: '1 850 $' },
    { id: '6', project: 'BTC BOT', date: '1.8.2025', amount: '1 950 $' },
  ]);

  const [myBots] = useState<BotRecord[]>([
    { id: '1', name: 'BTC Trading Bot #1', purchaseDate: '1.1.2025', value: '5 000' },
    { id: '2', name: 'BTC DCA Bot #2', purchaseDate: '15.12.2024', value: '3 000' },
    { id: '3', name: 'BTC Grid Bot #3', purchaseDate: '10.11.2024', value: '2 000' },
  ]);

  // ✅ NOVÁ DATA STRUKTURA PRO ČASOVÉ RÁMCE
  const btcBotData = {
    portfolio: {
      M: [ // Měsíční data
        { name: 'Jan', value: 7000 },
        { name: 'Feb', value: 7200 },
        { name: 'Mar', value: 7100 },
        { name: 'Apr', value: 7400 },
        { name: 'May', value: 7800 },
        { name: 'Jun', value: 8000 },
        { name: 'Jul', value: 7900 },
        { name: 'Aug', value: 8200 },
        { name: 'Sep', value: 8400 },
        { name: 'Oct', value: 8300 },
        { name: 'Nov', value: 8600 },
        { name: 'Dec', value: 8750 }
      ],
      Y: [ // Roční data
        { name: '2021', value: 3000 },
        { name: '2022', value: 4500 },
        { name: '2023', value: 6200 },
        { name: '2024', value: 8750 }
      ]
    },
    claims: {
      M: [ // Měsíční claims
        { name: 'Jan', value: 800 },
        { name: 'Feb', value: 1200 },
        { name: 'Mar', value: 1500 },
        { name: 'Apr', value: 1800 },
        { name: 'May', value: 2100 },
        { name: 'Jun', value: 2400 },
        { name: 'Jul', value: 2700 },
        { name: 'Aug', value: 3000 },
        { name: 'Sep', value: 3300 },
        { name: 'Oct', value: 3600 },
        { name: 'Nov', value: 3900 },
        { name: 'Dec', value: 4200 }
      ],
      Y: [ // Roční claims
        { name: '2021', value: 400 },
        { name: '2022', value: 1200 },
        { name: '2023', value: 2800 },
        { name: '2024', value: 4200 }
      ]
    }
  };

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

        {/* Top Stats - STEJNÁ STRUKTURA JAKO V HLAVNÍM PORTFOLIO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* ✅ PORTFOLIO GRAF - NOVÁ IMPLEMENTACE */}
          <div className="lg:col-span-1">
            <PortfolioUniversalChart 
              data={btcBotData.portfolio.M} // Default data
              timeframes={{
                M: btcBotData.portfolio.M,
                Y: btcBotData.portfolio.Y
              }}
              title="BTC Bot Portfolio"
              height={280}
              currentValue={`${portfolioValue.toLocaleString()} $`}
              trend={{ value: 8.7, isPositive: true }}
              showFilters={true}
              primaryColor="#F7931A" // ✅ Bitcoin oranžová
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
                
                {/* Progress Bar - Bitcoin themed */}
                <div className="mb-4">
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#F7931A] to-[#D17310] h-2 rounded-full transition-all duration-500"
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
              data={btcBotData.claims.M} // Default data
              timeframes={{
                M: btcBotData.claims.M,
                Y: btcBotData.claims.Y
              }}
              title="Celkové výplaty"
              height={280}
              currentValue={`${totalClaimed.toLocaleString()} $`}
              trend={{ value: 18.5, isPositive: true }}
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
              <button className="w-8 h-8 rounded bg-[#F7931A] text-white font-medium">1</button>
              <button className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 transition-colors">2</button>
              <button className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 transition-colors">3</button>
              <button className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 transition-colors">
                &gt;
              </button>
            </div>
          </DashboardCard>
        </div>

        {/* My Bots Row */}
        <div className="grid grid-cols-1 gap-6">
          {/* My Bots - ÚKOL 5: Změna nadpisu */}
          <DashboardCard title="Moje karty">
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
                    <tr key={bot.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F7931A] to-[#D17310] flex items-center justify-center">
                            <span className="text-white font-bold text-xs">₿</span>
                          </div>
                          <span className="text-sm text-white">{bot.name}</span>
                        </div>
                      </td>
                      <td className="py-3 text-sm text-white/70">{bot.purchaseDate}</td>
                      <td className="py-3 text-sm text-white text-right">{bot.value}</td>
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