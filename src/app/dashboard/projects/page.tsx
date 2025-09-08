"use client";

import React, { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { 
  DashboardButton, 
  DashboardCard, 
  StatCard, 
  ValueCard,
  ChartCard,
  InfoCard,
  DashboardChart
} from '@/components/dashboard';

// Ukázková data pro graf projektů
const projectsChartData = [
  { name: 'Jan', value: 180 },
  { name: 'Feb', value: 190 },
  { name: 'Mar', value: 200 },
  { name: 'Apr', value: 210 },
  { name: 'May', value: 250 },
  { name: 'Jun', value: 280 },
  { name: 'Jul', value: 300 },
  { name: 'Aug', value: 340 },
  { name: 'Sep', value: 380 },
  { name: 'Oct', value: 420 },
  { name: 'Nov', value: 450 },
  { name: 'Dec', value: 480 }
];

const projects = [
  {
    id: 'gc-cards',
    title: 'GC Cards',
    description: 'Investiční karty s garantovaným výnosem a možností tradingu na sekundárním trhu.',
    value: '45 000 $',
    trend: { value: 15.2, isPositive: true },
    status: 'active'
  },
  {
    id: 'btc-bot',
    title: 'BTC Bot',
    description: 'Automatizovaný trading bot pro Bitcoin s pokročilými algoritmy a risk managementem.',
    value: '32 000 $',
    trend: { value: 8.7, isPositive: true },
    status: 'active'
  },
  {
    id: 'algo-trader',
    title: 'Algo Trader',
    description: 'Algoritmické obchodování s využitím AI a machine learning pro maximalizaci zisku.',
    value: '23 000 $',
    trend: { value: 12.1, isPositive: true },
    status: 'active'
  }
];

export default function ProjectsPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('M');

  // Mock user data
  const userProfile = {
    name: "Jan Novák",
    email: "jan.novak@email.cz",
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb3",
    kycVerified: true,
  };

  const handlePortfolioClick = (projectId: string) => {
    console.log(`Portfolio clicked for: ${projectId}`);
  };

  const handleBuyClick = (projectId: string) => {
    console.log(`Buy clicked for: ${projectId}`);
  };

  return (
    <div className="min-h-screen">
      {/* TopBar */}
      <TopBar 
        title="Projekty"
        userProfile={userProfile}
        notificationCount={3}
      />
      
      <div className="p-4 sm:p-6 lg:p-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6 mb-8">
          {/* Portfolio Chart - 2 columns */}
          <div className="xl:col-span-2">
            <ChartCard 
              title="Celková hodnota projektů"
              value="100 000 $"
              controls={
                <>
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
                </>
              }
            >
              <DashboardChart 
                data={projectsChartData}
                height={320}
                lineColor="#FFFFFF"
              />
            </ChartCard>
          </div>

          {/* Right Stats */}
          <div className="space-y-4">
            <StatCard
              title="Hodnota portfolia"
              value="100 000 $"
              trend={{ value: 12.5, isPositive: true }}
            />
            
            <StatCard
              title="Portfolio + akcie"
              value="130 000 $"
              trend={{ value: 8.2, isPositive: true }}
            />
            
            <InfoCard 
              title="Aktivních projektů"
              icon={
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            >
              <div className="space-y-2">
                <p className="text-3xl font-bold text-white">
                  {projects.filter(p => p.status === 'active').length}
                </p>
                <p className="text-xs text-[#4ADE80] font-medium">Všechny projekty běží</p>
              </div>
            </InfoCard>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {projects.map((project) => (
            <DashboardCard key={project.id} className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-400/10 text-green-400 border border-green-400/30">
                        AKTIVNÍ
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#F9D523]">{project.value}</div>
                    <div className={`text-sm flex items-center gap-1 ${
                      project.trend.isPositive ? 'text-[#4ADE80]' : 'text-[#EF4444]'
                    }`}>
                      <svg 
                        className={`w-3 h-3 ${!project.trend.isPositive && 'rotate-180'}`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                      </svg>
                      {project.trend.value}%
                    </div>
                  </div>
                </div>
                
                <p className="text-white/70 text-sm line-clamp-3 mb-4">
                  {project.description}
                </p>
                
                <div className="flex gap-2">
                  <DashboardButton 
                    variant="primary" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handlePortfolioClick(project.id)}
                  >
                    Portfolio
                  </DashboardButton>
                  <DashboardButton 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleBuyClick(project.id)}
                  >
                    Koupit
                  </DashboardButton>
                </div>
              </div>
            </DashboardCard>
          ))}
        </div>
      </div>
    </div>
  );
}
