'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
//import { useWallet } from '@/contexts/WalletContext';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DashboardCard,
  ValueCard,
  DashboardButton,
  ChartCard
} from '@/components/dashboard';
import { ProjectsChart } from '@/components/charts';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowLeft,
  RefreshCw,
  Download,
  Plus,
  //Edit,
  MoreVertical,
  Bitcoin
} from 'lucide-react';

// Dummy data pro kryptoměny
const DUMMY_CRYPTO_HOLDINGS = {
  'gc-project': [
    {
      id: 'btc-gc',
      symbol: 'BTC',
      name: 'Bitcoin',
      amount: 2.5,
      avgBuyPrice: 32000,
      currentPrice: 35000,
      value: 87500,
      valueCZK: 2012500,
      change24h: 3.45,
      change7d: 8.23,
      profitLoss: 7500,
      profitLossPercent: 9.38,
      transactions: 5
    },
    {
      id: 'eth-gc',
      symbol: 'ETH',
      name: 'Ethereum',
      amount: 15,
      avgBuyPrice: 1800,
      currentPrice: 2000,
      value: 30000,
      valueCZK: 690000,
      change24h: -1.23,
      change7d: 5.67,
      profitLoss: 3000,
      profitLossPercent: 11.11,
      transactions: 8
    },
    {
      id: 'ada-gc',
      symbol: 'ADA',
      name: 'Cardano',
      amount: 10000,
      avgBuyPrice: 0.35,
      currentPrice: 0.40,
      value: 4000,
      valueCZK: 92000,
      change24h: 2.15,
      change7d: -3.45,
      profitLoss: 500,
      profitLossPercent: 14.29,
      transactions: 3
    },
    {
      id: 'avax-gc',
      symbol: 'AVAX',
      name: 'Avalanche',
      amount: 150,
      avgBuyPrice: 28,
      currentPrice: 25.6,
      value: 3840,
      valueCZK: 88320,
      change24h: -4.56,
      change7d: -8.90,
      profitLoss: -360,
      profitLossPercent: -8.57,
      transactions: 2
    },
    {
      id: 'sol-gc',
      symbol: 'SOL',
      name: 'Solana',
      amount: 25,
      avgBuyPrice: 18,
      currentPrice: 20.02,
      value: 500.50,
      valueCZK: 11511.50,
      change24h: 5.89,
      change7d: 12.34,
      profitLoss: 50.50,
      profitLossPercent: 11.22,
      transactions: 4
    }
  ],
  'btc-bot': [
    {
      id: 'btc-bot',
      symbol: 'BTC',
      name: 'Bitcoin',
      amount: 1,
      avgBuyPrice: 33000,
      currentPrice: 35000,
      value: 35000,
      valueCZK: 805000,
      change24h: 3.45,
      change7d: 8.23,
      profitLoss: 2000,
      profitLossPercent: 6.06,
      transactions: 12
    },
    {
      id: 'usdt-bot',
      symbol: 'USDT',
      name: 'Tether',
      amount: 5000,
      avgBuyPrice: 1,
      currentPrice: 1,
      value: 5000,
      valueCZK: 115000,
      change24h: 0,
      change7d: 0,
      profitLoss: 0,
      profitLossPercent: 0,
      transactions: 20
    },
    {
      id: 'usdc-bot',
      symbol: 'USDC',
      name: 'USD Coin',
      amount: 5320.75,
      avgBuyPrice: 1,
      currentPrice: 1,
      value: 5320.75,
      valueCZK: 122376.25,
      change24h: 0,
      change7d: 0,
      profitLoss: 0,
      profitLossPercent: 0,
      transactions: 15
    }
  ],
  'algo-trader': [
    {
      id: 'eth-algo',
      symbol: 'ETH',
      name: 'Ethereum',
      amount: 10,
      avgBuyPrice: 1900,
      currentPrice: 2000,
      value: 20000,
      valueCZK: 460000,
      change24h: -1.23,
      change7d: 5.67,
      profitLoss: 1000,
      profitLossPercent: 5.26,
      transactions: 6
    },
    {
      id: 'bnb-algo',
      symbol: 'BNB',
      name: 'Binance Coin',
      amount: 50,
      avgBuyPrice: 280,
      currentPrice: 300,
      value: 15000,
      valueCZK: 345000,
      change24h: 2.34,
      change7d: 4.56,
      profitLoss: 1000,
      profitLossPercent: 7.14,
      transactions: 4
    },
    {
      id: 'matic-algo',
      symbol: 'MATIC',
      name: 'Polygon',
      amount: 20000,
      avgBuyPrice: 0.85,
      currentPrice: 0.90,
      value: 18000,
      valueCZK: 414000,
      change24h: 4.12,
      change7d: 8.90,
      profitLoss: 1000,
      profitLossPercent: 5.88,
      transactions: 7
    },
    {
      id: 'link-algo',
      symbol: 'LINK',
      name: 'Chainlink',
      amount: 1000,
      avgBuyPrice: 14.50,
      currentPrice: 15.50,
      value: 15500,
      valueCZK: 356500,
      change24h: 3.67,
      change7d: 6.78,
      profitLoss: 1000,
      profitLossPercent: 6.90,
      transactions: 5
    }
  ]
};

// Data pro graf
const CHART_DATA = {
  '7d': [
    { name: 'Po', value: 118500 },
    { name: 'Út', value: 119800 },
    { name: 'St', value: 121200 },
    { name: 'Čt', value: 120500 },
    { name: 'Pá', value: 123400 },
    { name: 'So', value: 124800 },
    { name: 'Ne', value: 125840 }
  ],
  '30d': [
    { name: 'Týden 1', value: 110000 },
    { name: 'Týden 2', value: 115000 },
    { name: 'Týden 3', value: 118000 },
    { name: 'Týden 4', value: 125840 }
  ],
  '90d': [
    { name: 'Měsíc 1', value: 95000 },
    { name: 'Měsíc 2', value: 108000 },
    { name: 'Měsíc 3', value: 125840 }
  ]
};

// Typ pro kryptoměnu
interface CryptoHolding {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  avgBuyPrice: number;
  currentPrice: number;
  value: number;
  valueCZK: number;
  change24h: number;
  change7d: number;
  profitLoss: number;
  profitLossPercent: number;
  transactions: number;
}

// Komponenta pro kartu kryptoměny
const CryptoCard: React.FC<{
  crypto: CryptoHolding;
  onClick: () => void;
  onEdit?: () => void;
}> = ({ crypto, onClick, onEdit }) => {
  const isProfitable = crypto.profitLoss >= 0;
  const is24hPositive = crypto.change24h >= 0;
  
  return (
    <DashboardCard 
      className="cursor-pointer hover:shadow-lg hover:shadow-white/10 transition-all duration-300"
      onClick={onClick}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
              <Bitcoin className="w-6 h-6 text-[#F9D523]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                {crypto.symbol}
              </h3>
              <p className="text-sm text-white/60">
                {crypto.name}
              </p>
            </div>
          </div>
          
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <MoreVertical className="w-4 h-4 text-white/60" />
            </button>
          )}
        </div>

        {/* Holdings */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-white/60 mb-1">Množství</p>
            <p className="text-lg font-semibold text-white">
              {crypto.amount.toLocaleString('cs-CZ')}
            </p>
          </div>
          <div>
            <p className="text-xs text-white/60 mb-1">Hodnota</p>
            <p className="text-lg font-semibold text-white">
              ${crypto.value.toLocaleString('cs-CZ', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Price info */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-white/60 mb-1">Průměrná cena</p>
            <p className="text-sm text-white/80">
              ${crypto.avgBuyPrice.toLocaleString('cs-CZ')}
            </p>
          </div>
          <div>
            <p className="text-xs text-white/60 mb-1">Aktuální cena</p>
            <p className="text-sm text-white/80">
              ${crypto.currentPrice.toLocaleString('cs-CZ')}
            </p>
          </div>
        </div>

        {/* Profit/Loss */}
        <div className={`p-3 rounded-lg mb-4 ${
          isProfitable ? 'bg-green-500/10' : 'bg-red-500/10'
        }`}>
          <div className="flex justify-between items-center">
            <span className="text-xs text-white/60">P&L</span>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold ${
                isProfitable ? 'text-green-400' : 'text-red-400'
              }`}>
                {isProfitable ? '+' : ''}${Math.abs(crypto.profitLoss).toLocaleString('cs-CZ')}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded ${
                isProfitable ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {isProfitable ? '+' : ''}{crypto.profitLossPercent.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        {/* 24h Change */}
        <div className="flex justify-between items-center">
          <span className="text-xs text-white/60">24h změna</span>
          <div className={`flex items-center gap-1 ${
            is24hPositive ? 'text-green-400' : 'text-red-400'
          }`}>
            {is24hPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span className="text-sm font-medium">
              {is24hPositive ? '+' : ''}{crypto.change24h.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};

export default function ProjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  //const { user, walletAddress } = useWallet();
  const { isInAdminGroup } = useAuth();
  const projectId = params?.projectId as string;
  
  console.log('=== PROJECT DETAIL PAGE LOADED ===');
  console.log('Project ID from params:', projectId);
  console.log('All params:', params);
  
  const [holdings, setHoldings] = useState<CryptoHolding[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [projectName, setProjectName] = useState('');

  useEffect(() => {
    console.log('=== PROJECT DATA LOADING ===');
    console.log('Loading data for project:', projectId);
    
    // Načtení dat podle projectId
    if (projectId === 'gc-project') {
      console.log('Loading GC Project data');
      setProjectName('GC Project');
      setHoldings(DUMMY_CRYPTO_HOLDINGS['gc-project']);
    } else if (projectId === 'btc-bot') {
      setProjectName('BTC Bot');
      setHoldings(DUMMY_CRYPTO_HOLDINGS['btc-bot']);
    } else if (projectId === 'algo-trader') {
      setProjectName('Algo Trader');
      setHoldings(DUMMY_CRYPTO_HOLDINGS['algo-trader']);
    }
  }, [projectId]);

  // Výpočty
  const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);
  const totalValueCZK = holdings.reduce((sum, h) => sum + h.valueCZK, 0);
  const totalProfitLoss = holdings.reduce((sum, h) => sum + h.profitLoss, 0);
  const avgChange24h = holdings.length > 0 
    ? holdings.reduce((sum, h) => sum + h.change24h, 0) / holdings.length 
    : 0;

  // Handler pro refresh
  const handleRefreshPrices = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsRefreshing(true);
    // TODO: Volání na backend pro aktualizaci cen
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  // Handler pro export
  const handleExportData = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // TODO: Export dat projektu
    console.log('Export project data');
  };

  // Handler pro přidání kryptoměny
  const handleAddCrypto = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // TODO: Modal pro přidání kryptoměny
    console.log('Add crypto to project');
  };

  // Navigace na detail kryptoměny
  const handleCryptoClick = (cryptoId: string) => {
    router.push(`/admin/portfolio/${projectId}/${cryptoId}`);
  };

  // Navigace zpět
  const handleBack = () => {
    router.push('/admin/portfolio');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
        {/* Navigace zpět */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Zpět na přehled projektů</span>
        </button>

        {/* Header s akcemi */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {projectName}
            </h1>
            <p className="text-white/60">
              Správa kryptoměn v projektu
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
            
            {isInAdminGroup && (
              <DashboardButton
                variant="primary"
                onClick={handleAddCrypto}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Přidat kryptoměnu
              </DashboardButton>
            )}
          </div>
        </div>

        {/* Statistiky */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <ValueCard 
            label="Celková hodnota" 
            value={`$${totalValue.toLocaleString('cs-CZ', { minimumFractionDigits: 2 })}`}
            variant="default"
          >
            <p className="text-xs text-white/70 mt-2">
              {totalValueCZK.toLocaleString('cs-CZ')} CZK
            </p>
          </ValueCard>

          <ValueCard 
            label="Počet kryptoměn" 
            value={holdings.length}
            variant="default"
          >
            <p className="text-xs text-white/70 mt-2">
              Různých měn
            </p>
          </ValueCard>

          <ValueCard 
            label="Celkový P&L" 
            value={`${totalProfitLoss >= 0 ? '+' : ''}$${Math.abs(totalProfitLoss).toLocaleString('cs-CZ')}`}
            variant="default"
          >
            <div className={`text-xs mt-2 ${
              totalProfitLoss >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {totalProfitLoss >= 0 ? 'Zisk' : 'Ztráta'}
            </div>
          </ValueCard>

          <ValueCard 
            label="24h změna" 
            value={`${avgChange24h >= 0 ? '+' : ''}${avgChange24h.toFixed(2)}%`}
            variant="default"
          >
            <div className={`flex items-center gap-1 mt-2 ${
              avgChange24h >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {avgChange24h >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="text-xs">Průměr</span>
            </div>
          </ValueCard>
        </div>

        {/* Graf */}
        <div className="mb-8">
          <ChartCard 
            title="Vývoj hodnoty portfolia"
            value={`$${totalValue.toLocaleString('cs-CZ', { minimumFractionDigits: 2 })}`}
            controls={
              <div className="flex gap-1">
                {['7d', '30d', '90d'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedTimeframe(period)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                      selectedTimeframe === period 
                        ? 'bg-white/20 text-white border border-white/30' 
                        : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            }
          >
            <ProjectsChart 
              data={CHART_DATA[selectedTimeframe as keyof typeof CHART_DATA]}
              height={300}
              showProjects={false}
              showStocks={false}
              projectsKey="value"
              stocksKey=""
              showGrid={true}
              showTooltip={true}
              animate={true}
              className="w-full"
            />
          </ChartCard>
        </div>

        {/* Grid kryptoměn */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {holdings.map((crypto) => (
            <CryptoCard
              key={crypto.id}
              crypto={crypto}
              onClick={() => handleCryptoClick(crypto.id)}
              onEdit={isInAdminGroup ? () => console.log('Edit crypto', crypto.id) : undefined}
            />
          ))}
        </div>

        {/* Tabulka kryptoměn */}
        <DashboardCard className="p-0">
          <div className="p-6 border-b border-white/10">
            <h3 className="text-lg font-semibold text-white">
              Přehled kryptoměn
            </h3>
          </div>
          <div className="overflow-x-auto p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-xs font-medium text-white/60 uppercase tracking-wider">Symbol</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-white/60 uppercase tracking-wider">Název</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-white/60 uppercase tracking-wider">Množství</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-white/60 uppercase tracking-wider">Aktuální cena</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-white/60 uppercase tracking-wider">Hodnota</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-white/60 uppercase tracking-wider">P&L</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-white/60 uppercase tracking-wider">Transakcí</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((crypto) => (
                  <tr key={crypto.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-medium text-white">{crypto.symbol}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-white/70">{crypto.name}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-white">{crypto.amount.toLocaleString('cs-CZ')}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-white">${crypto.currentPrice.toLocaleString('cs-CZ')}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[#F9D523] font-semibold">
                        ${crypto.value.toLocaleString('cs-CZ', { minimumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${
                        crypto.profitLossPercent >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {crypto.profitLossPercent >= 0 ? '+' : ''}{crypto.profitLossPercent.toFixed(2)}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-white/60">{crypto.transactions}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>
    </div>
  );
}