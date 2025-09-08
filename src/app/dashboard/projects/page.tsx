"use client";

import React, { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { 
  DashboardButton, 
  DashboardCard, 
  StatCard, 
  ValueCard,
  ChartCard,
  InfoCard
} from '@/components/dashboard';
import { ProjectsChart } from '@/components/charts';

// Kombinovaná data pro graf - různé časové rámce
const chartDatasets = {
  D: [ // Denní data (posledních 7 dní)
    { name: 'Po', projects: 480, stocks: 265 },
    { name: 'Út', projects: 485, stocks: 268 },
    { name: 'St', projects: 478, stocks: 263 },
    { name: 'Čt', projects: 492, stocks: 271 },
    { name: 'Pá', projects: 488, stocks: 269 },
    { name: 'So', projects: 495, stocks: 274 },
    { name: 'Ne', projects: 498, stocks: 276 }
  ],
  W: [ // Týdenní data (posledních 8 týdnů)
    { name: 'T1', projects: 420, stocks: 240 },
    { name: 'T2', projects: 435, stocks: 248 },
    { name: 'T3', projects: 445, stocks: 252 },
    { name: 'T4', projects: 458, stocks: 258 },
    { name: 'T5', projects: 468, stocks: 262 },
    { name: 'T6', projects: 478, stocks: 266 },
    { name: 'T7', projects: 485, stocks: 270 },
    { name: 'T8', projects: 498, stocks: 276 }
  ],
  M: [ // Měsíční data (posledních 12 měsíců)
    { name: 'Jan', projects: 180, stocks: 120 },
    { name: 'Feb', projects: 190, stocks: 135 },
    { name: 'Mar', projects: 200, stocks: 145 },
    { name: 'Apr', projects: 210, stocks: 150 },
    { name: 'May', projects: 250, stocks: 170 },
    { name: 'Jun', projects: 280, stocks: 185 },
    { name: 'Jul', projects: 300, stocks: 195 },
    { name: 'Aug', projects: 340, stocks: 210 },
    { name: 'Sep', projects: 380, stocks: 225 },
    { name: 'Oct', projects: 420, stocks: 240 },
    { name: 'Nov', projects: 450, stocks: 250 },
    { name: 'Dec', projects: 480, stocks: 265 }
  ],
  Y: [ // Roční data (posledních 5 let)
    { name: '2020', projects: 120, stocks: 85 },
    { name: '2021', projects: 180, stocks: 125 },
    { name: '2022', projects: 280, stocks: 165 },
    { name: '2023', projects: 380, stocks: 215 },
    { name: '2024', projects: 480, stocks: 265 }
  ]
};

const projects = [
  {
    id: 'gc-cards',
    title: 'GC Cards',
    description: 'Investiční karty s garantovaným výnosem a možností tradingu na sekundárním trhu.',
    value: '45 000 $',
    trend: { value: 15.2, isPositive: true },
    status: 'active',
    portfolioUrl: '/dashboard/portfolio/gc-cards'
  },
  {
    id: 'btc-bot',
    title: 'BTC Bot',
    description: 'Automatizovaný trading bot pro Bitcoin s pokročilými algoritmy a risk managementem.',
    value: '32 000 $',
    trend: { value: 8.7, isPositive: true },
    status: 'active',
    portfolioUrl: '/dashboard/portfolio/btc-bot'
  },
  {
    id: 'algo-trader',
    title: 'Algo Trader',
    description: 'Algoritmické obchodování s využitím AI a machine learning pro maximalizaci zisku.',
    value: '23 000 $',
    trend: { value: 12.1, isPositive: true },
    status: 'active',
    portfolioUrl: '/dashboard/portfolio/algo-trader'
  }
];

export default function ProjectsPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('M');
  const [showProjects, setShowProjects] = useState(true);
  const [showStocks, setShowStocks] = useState(false);

  // Mock user data
  const userProfile = {
    name: "Jan Novák",
    email: "jan.novak@email.cz",
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb3",
    kycVerified: true,
  };

  const handlePortfolioClick = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      window.location.href = project.portfolioUrl;
    }
  };

  const handleBuyClick = (projectId: string) => {
    console.log(`Buy clicked for: ${projectId}`);
  };

  // Funkce pro získání dat podle vybraného časového rámce
  const getCurrentChartData = () => {
    return chartDatasets[selectedTimeframe as keyof typeof chartDatasets] || chartDatasets.M;
  };

  // Funkce pro získání popisu časového rámce
  const getTimeframeLabel = () => {
    const labels = {
      D: 'tento týden',
      W: 'posledních 8 týdnů', 
      M: 'posledních 12 měsíců',
      Y: 'posledních 5 let'
    };
    return labels[selectedTimeframe as keyof typeof labels] || labels.M;
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
              title={`Celková hodnota projektů (${getTimeframeLabel()})`}
              value="100 000 $"
              controls={
                <div className="flex flex-col gap-3">
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
                  
                  {/* Legenda s barvami - portfolio styl */}
                  <div className="flex items-center space-x-4 text-sm">
                    {showProjects && (
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-[#F9D523] rounded-full" />
                        <span className="text-white/70">Projekty</span>
                      </div>
                    )}
                    {showStocks && (
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-[#10B981] rounded-full" />
                        <span className="text-white/70">Akcie</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Přepínače pro grafy - CUSTOM TOGGLE SWITCHE */}
                  <div className="flex flex-col gap-3">
                    {/* Projekty toggle */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/70 font-medium">Projekty</span>
                      <button
                        onClick={() => setShowProjects(!showProjects)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-all duration-300 ${
                          showProjects 
                            ? 'bg-[#F9D523] shadow-[0_0_12px_rgba(249,213,35,0.4)]' 
                            : 'bg-white/20 border border-white/30'
                        }`}
                      >
                        <span
                          className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-300 ${
                            showProjects ? 'translate-x-5' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    
                    {/* Akcie toggle */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/70 font-medium">Hodnota s akciemi</span>
                      <button
                        onClick={() => setShowStocks(!showStocks)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-all duration-300 ${
                          showStocks 
                            ? 'bg-[#10B981] shadow-[0_0_12px_rgba(16,185,129,0.4)]' 
                            : 'bg-white/20 border border-white/30'
                        }`}
                      >
                        <span
                          className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-300 ${
                            showStocks ? 'translate-x-5' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              }
            >
              {/* Portfolio styl graf s area gradienty + funkční časové rámce */}
              <ProjectsChart 
                data={getCurrentChartData()}
                height={320}
                showProjects={showProjects}
                showStocks={showStocks}
                projectsKey="projects"
                stocksKey="stocks"
                showGrid={true}
                showTooltip={true}
                animate={true}
                className="w-full"
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
              title="Celkem vyplaceno"
              icon={
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            >
              <div className="space-y-2">
                <p className="text-3xl font-bold text-white">85 000 $</p>
                <p className="text-xs text-[#4ADE80] font-medium">Celkově vyplaceno investorům</p>
              </div>
            </InfoCard>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {projects.map((project) => (
            <DashboardCard 
              key={project.id} 
              className="p-6 group cursor-pointer transition-all duration-300 hover:border-[#F9D523]/50 hover:shadow-[0_0_30px_rgba(249,213,35,0.15)] hover:scale-[1.02]"
            >
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
                    className="flex-1 group-hover:scale-105 transition-transform"
                    onClick={() => handlePortfolioClick(project.id)}
                  >
                    Portfolio
                  </DashboardButton>
                  <DashboardButton 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 group-hover:scale-105 transition-transform"
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
