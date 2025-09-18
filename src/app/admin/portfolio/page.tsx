'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
//import { useWallet } from '@/contexts/WalletContext';
//import { useAuth } from '@/contexts/AuthContext';
import { 
  DashboardCard,
  ValueCard,
  DashboardButton
} from '@/components/dashboard';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity,
  RefreshCw,
  Download
} from 'lucide-react';

// Dummy data pro projekty
const DUMMY_PROJECTS = [
  {
    id: 'gc-project',
    name: 'GC Project',
    description: 'Hlavní crypto portfolio projektu GC',
    totalValue: 125840.50,
    totalValueCZK: 2893320,
    change24h: 5.32,
    cryptoCount: 5,
    lastUpdated: new Date().toISOString(),
    holdings: [
      { symbol: 'BTC', amount: 2.5, value: 87500 },
      { symbol: 'ETH', amount: 15, value: 30000 },
      { symbol: 'ADA', amount: 10000, value: 4000 },
      { symbol: 'AVAX', amount: 150, value: 3840 },
      { symbol: 'SOL', amount: 25, value: 500.50 }
    ]
  },
  {
    id: 'btc-bot',
    name: 'BTC Bot',
    description: 'Automatizovaný obchodní bot pro Bitcoin',
    totalValue: 45320.75,
    totalValueCZK: 1042376,
    change24h: -2.18,
    cryptoCount: 3,
    lastUpdated: new Date().toISOString(),
    holdings: [
      { symbol: 'BTC', amount: 1, value: 35000 },
      { symbol: 'USDT', amount: 5000, value: 5000 },
      { symbol: 'USDC', amount: 5320.75, value: 5320.75 }
    ]
  },
  {
    id: 'algo-trader',
    name: 'Algo Trader',
    description: 'Algoritmické obchodování s různými kryptoměnami',
    totalValue: 68500.00,
    totalValueCZK: 1575500,
    change24h: 3.45,
    cryptoCount: 4,
    lastUpdated: new Date().toISOString(),
    holdings: [
      { symbol: 'ETH', amount: 10, value: 20000 },
      { symbol: 'BNB', amount: 50, value: 15000 },
      { symbol: 'MATIC', amount: 20000, value: 18000 },
      { symbol: 'LINK', amount: 1000, value: 15500 }
    ]
  }
];

// Typ pro projekt
interface Project {
  id: string;
  name: string;
  description: string;
  totalValue: number;
  totalValueCZK: number;
  change24h: number;
  cryptoCount: number;
  lastUpdated: string;
  holdings: Array<{
    symbol: string;
    amount: number;
    value: number;
  }>;
}

// Komponenta pro kartu projektu
const ProjectCard: React.FC<{
  project: Project;
  onClick: () => void;
}> = ({ project, onClick }) => {
  const isPositive = project.change24h >= 0;
  
  return (
    <div 
      onClick={onClick}
      className="cursor-pointer"
    >
      <DashboardCard 
        className="hover:shadow-lg hover:shadow-white/10 transition-all duration-300"
        padding="none"
      >
        <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">
              {project.name}
            </h3>
            <p className="text-sm text-white/60">
              {project.description}
            </p>
          </div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
            isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">
              {isPositive ? '+' : ''}{project.change24h.toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Value */}
        <div className="mb-4">
          <div className="text-2xl font-bold text-white">
            ${project.totalValue.toLocaleString('cs-CZ', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-sm text-white/60">
            {project.totalValueCZK.toLocaleString('cs-CZ')} CZK
          </div>
        </div>

        {/* Holdings Preview */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.holdings.slice(0, 4).map((holding) => (
            <div 
              key={holding.symbol}
              className="px-2 py-1 bg-white/5 rounded-lg text-xs text-white/70"
            >
              {holding.symbol}
            </div>
          ))}
          {project.holdings.length > 4 && (
            <div className="px-2 py-1 bg-white/5 rounded-lg text-xs text-white/70">
              +{project.holdings.length - 4}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-sm text-white/60">
            <Activity className="w-4 h-4" />
            <span>{project.cryptoCount} kryptoměn</span>
          </div>
          <span className="text-sm text-[#F9D523] font-medium">
            Detail →
          </span>
        </div>
        </div>
      </DashboardCard>
    </div>
  );
};

export default function PortfolioDashboard() {
  const router = useRouter();
  //const { user, walletAddress } = useWallet();
  //const { isInAdminGroup } = useAuth();
  const [projects, setProjects] = useState<Project[]>(DUMMY_PROJECTS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Výpočet celkových hodnot
  const totalPortfolioValue = projects.reduce((sum, p) => sum + p.totalValue, 0);
  const totalPortfolioValueCZK = projects.reduce((sum, p) => sum + p.totalValueCZK, 0);
  const totalCryptoCount = projects.reduce((sum, p) => sum + p.cryptoCount, 0);
  
  // Průměrná změna
  const avgChange = projects.length > 0 
    ? projects.reduce((sum, p) => sum + p.change24h, 0) / projects.length 
    : 0;

  // Handler pro refresh cen
  const handleRefreshPrices = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsRefreshing(true);
    // TODO: Zde bude volání na backend pro aktualizaci cen z CoinGecko
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdate(new Date());
      // Simulace změny cen
      setProjects(prev => prev.map(p => ({
        ...p,
        change24h: (Math.random() - 0.5) * 10,
        lastUpdated: new Date().toISOString()
      })));
    }, 2000);
  };

  // Handler pro export dat
  const handleExportData = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // TODO: Implementace exportu do CSV
    console.log('Export portfolio data');
  };

  // Navigace na detail projektu
  const handleProjectClick = (projectId: string) => {
    console.log('=== NAVIGATION DEBUG ===');
    console.log('Attempting to navigate to project:', projectId);
    console.log('Target URL:', `/admin/portfolio/${projectId}`);
    console.log('Router object:', router);
    
    try {
      router.push(`/admin/portfolio/${projectId}`);
      console.log('Navigation initiated successfully');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
        {/* Header s akcemi */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Správa crypto portfolia
            </h1>
            <p className="text-white/60">
              Přehled všech projektů a jejich kryptoměn
            </p>
          </div>
          
          <div className="flex gap-3">
            <DashboardButton
              variant="secondary"
              onClick={handleRefreshPrices}
              disabled={isRefreshing}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Aktualizovat ceny
            </DashboardButton>
            
            <DashboardButton
              variant="secondary"
              onClick={handleExportData}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </DashboardButton>
          </div>
        </div>

        {/* Souhrnné statistiky */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <ValueCard 
            label="Celková hodnota" 
            value={`$${totalPortfolioValue.toLocaleString('cs-CZ', { minimumFractionDigits: 2 })}`}
            variant="default"
          >
            <p className="text-xs text-white/70 mt-2">
              {totalPortfolioValueCZK.toLocaleString('cs-CZ')} CZK
            </p>
          </ValueCard>

          <ValueCard 
            label="Počet projektů" 
            value={projects.length}
            variant="default"
          >
            <p className="text-xs text-white/70 mt-2">
              Aktivní projekty
            </p>
          </ValueCard>

          <ValueCard 
            label="Celkem kryptoměn" 
            value={totalCryptoCount}
            variant="default"
          >
            <p className="text-xs text-white/70 mt-2">
              Různých měn
            </p>
          </ValueCard>

          <ValueCard 
            label="24h změna" 
            value={`${avgChange >= 0 ? '+' : ''}${avgChange.toFixed(2)}%`}
            variant="default"
          >
            <div className={`flex items-center gap-1 mt-2 ${
              avgChange >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {avgChange >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="text-xs">Průměr</span>
            </div>
          </ValueCard>
        </div>

        {/* Seznam projektů */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => handleProjectClick(project.id)}
            />
          ))}
        </div>

        {/* Poslední aktualizace */}
        <div className="mt-8 text-center text-sm text-white/40">
          Poslední aktualizace: {lastUpdate.toLocaleString('cs-CZ')}
      </div>
    </div>
  );
}