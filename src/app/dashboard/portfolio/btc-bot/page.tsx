'use client';

import React, { useState, useEffect } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { DashboardCard, DashboardButton, StatCard } from '@/components/dashboard';
import { PortfolioChart, VolumeChart } from '@/components/charts';
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
  const [timeframe, setTimeframe] = useState('monthly');
  const [claimProgress, setClaimProgress] = useState(45); // Percentage for claim progress
  
  // Mock data - nahraďte skutečnými daty z API
  const [userProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john@example.com',
    kycVerified: true
  });

  const [portfolioValue] = useState(10000);
  const [totalClaimed] = useState(3500);
  const [nextClaimDate] = useState('1. 1. 2026');
  const [claimAmount] = useState(2000);

  const [claimHistory] = useState<ClaimRecord[]>([
    { id: '1', project: 'BTC BOT', date: '1.1.2026', amount: '2 000 $' },
    { id: '2', project: 'BTC BOT', date: '1.1.2025', amount: '2 000 $' },
    { id: '3', project: 'BTC BOT', date: '1.1.2025', amount: '2 000 $' },
    { id: '4', project: 'BTC BOT', date: '1.1.2025', amount: '2 000 $' },
    { id: '5', project: 'BTC BOT', date: '1.1.2025', amount: '2 000 $' },
    { id: '6', project: 'BTC BOT', date: '1.1.2025', amount: '2 000 $' },
  ]);

  const [myBots] = useState<BotRecord[]>([
    { id: '1', name: 'BTC Trading Bot #1', purchaseDate: '1.1.2025', value: '5 000' },
    { id: '2', name: 'BTC DCA Bot #2', purchaseDate: '15.12.2024', value: '3 000' },
    { id: '3', name: 'BTC Grid Bot #3', purchaseDate: '10.11.2024', value: '2 000' },
  ]);

  // Mock chart data
  const portfolioChartData = [
    { name: 'Jan', value: 8500 },
    { name: 'Feb', value: 8800 },
    { name: 'Mar', value: 9200 },
    { name: 'Apr', value: 9100 },
    { name: 'May', value: 9500 },
    { name: 'Jun', value: 9800 },
    { name: 'Jul', value: 9600 },
    { name: 'Aug', value: 9900 },
    { name: 'Sep', value: 10200 },
    { name: 'Oct', value: 10100 },
    { name: 'Nov', value: 10300 },
    { name: 'Dec', value: 10000 },
  ];

  const claimChartData = [
    { name: 'Jan', value: 1800 },
    { name: 'Feb', value: 2100 },
    { name: 'Mar', value: 2200 },
    { name: 'Apr', value: 2300 },
    { name: 'May', value: 2400 },
    { name: 'Jun', value: 2600 },
    { name: 'Jul', value: 2500 },
    { name: 'Aug', value: 2700 },
    { name: 'Sep', value: 2800 },
    { name: 'Oct', value: 2900 },
    { name: 'Nov', value: 3200 },
    { name: 'Dec', value: 3500 },
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

        {/* Top Stats - STEJNÁ STRUKTURA JAKO V HLAVNÍM PORTFOLIO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Portfolio Chart - PŘÍMO V DIVU BEZ DASHBOARDCARD */}
          <div className="lg:col-span-1">
            {/* Nadpis a controls mimo graf */}
            <div className="mb-4">
              <h2 className="text-xl font-bold text-white mb-2">Hodnota portfolia</h2>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/70">Hodnota portfolia</span>
                <select 
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-sm text-white"
                >
                  <option value="monthly">monthly</option>
                  <option value="yearly">yearly</option>
                </select>
              </div>
              <div className="text-2xl font-bold text-white mb-4">
                {portfolioValue.toLocaleString()} $
              </div>
            </div>
            
            {/* Graf přímo v divu - jako v hlavním portfolio */}
            <div className="h-64">
              <PortfolioChart 
                data={portfolioChartData}
                height={256}
                showGrid={true}
                currentValue={portfolioValue}
              />
            </div>
          </div>

          {/* Claim Stats */}
          <div className="space-y-6">
            {/* Total Claimed */}
            <DashboardCard title="Celkem claimnuto" className="text-center">
              <div className="py-4">
                <div className="text-3xl font-bold text-white">
                  {totalClaimed.toLocaleString()} $
                </div>
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
          
          {/* Claim History Chart - GRAF PŘÍMO V DIVU */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Celkem claimnuto</h2>
            <div className="mb-4">
              <select 
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-sm text-white"
              >
                <option value="monthly">monthly</option>
                <option value="yearly">yearly</option>
              </select>
            </div>
            
            <div className="h-64">
              <PortfolioChart 
                data={claimChartData}
                height={256}
                showGrid={true}
                currentValue={totalClaimed}
                dataKey="value"
              />
            </div>
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
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#B29819] to-[#F9D523] flex items-center justify-center">
                            <span className="text-black font-bold text-xs">B</span>
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