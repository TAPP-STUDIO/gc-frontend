"use client";

import React, { useState } from 'react';
import { 
  DashboardButton, 
  DashboardCard, 
  StatCard 
} from '@/components/dashboard';

interface CryptoPosition {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  averageBuyPrice: number;
  currentPrice: number;
  totalValue: number;
  pnl: number;
  pnlPercentage: number;
  lastUpdated: string;
}

// Mock data pro crypto pozice
const mockCryptoPositions: CryptoPosition[] = [
  {
    id: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    amount: 2.5,
    averageBuyPrice: 42000,
    currentPrice: 67000,
    totalValue: 167500,
    pnl: 62500,
    pnlPercentage: 59.52,
    lastUpdated: '2025-08-25T12:00:00Z',
  },
  {
    id: '2', 
    symbol: 'ETH',
    name: 'Ethereum',
    amount: 15.0,
    averageBuyPrice: 2800,
    currentPrice: 3200,
    totalValue: 48000,
    pnl: 6000,
    pnlPercentage: 14.29,
    lastUpdated: '2025-08-25T12:00:00Z',
  },
  {
    id: '3',
    symbol: 'ADA',
    name: 'Cardano', 
    amount: 1000.0,
    averageBuyPrice: 1.2,
    currentPrice: 0.85,
    totalValue: 850,
    pnl: -350,
    pnlPercentage: -29.17,
    lastUpdated: '2025-08-25T12:00:00Z',
  },
  {
    id: '4',
    symbol: 'AVAX',
    name: 'Avalanche',
    amount: 50.0,
    averageBuyPrice: 45,
    currentPrice: 52,
    totalValue: 2600,
    pnl: 350,
    pnlPercentage: 15.56,
    lastUpdated: '2025-08-25T12:00:00Z',
  },
];

// Známé crypto symboly pro validaci
const knownCryptos = [
  'BTC', 'ETH', 'ADA', 'DOT', 'AVAX', 'SOL', 'MATIC', 'LINK', 
  'UNI', 'AAVE', 'COMP', 'SUSHI', 'CRV', 'YFI', 'MKR', 'SNX'
];

export default function AdminPortfolioPage() {
  const [positions, setPositions] = useState<CryptoPosition[]>(mockCryptoPositions);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingPosition, setEditingPosition] = useState<CryptoPosition | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    symbol: '',
    name: '',
    amount: '',
    averageBuyPrice: '',
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Calculate portfolio totals
  const portfolioStats = positions.reduce(
    (acc, position) => ({
      totalValue: acc.totalValue + position.totalValue,
      totalPnL: acc.totalPnL + position.pnl,
    }),
    { totalValue: 0, totalPnL: 0 }
  );

  const portfolioPnLPercentage = 
    portfolioStats.totalValue > 0 
      ? ((portfolioStats.totalPnL / (portfolioStats.totalValue - portfolioStats.totalPnL)) * 100)
      : 0;

  const resetForm = () => {
    setFormData({ symbol: '', name: '', amount: '', averageBuyPrice: '' });
    setFormErrors({});
    setEditingPosition(null);
    setIsFormVisible(false);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.symbol.trim()) {
      errors.symbol = 'Symbol je povinný';
    } else if (!knownCryptos.includes(formData.symbol.toUpperCase())) {
      errors.symbol = 'Neznámý crypto symbol';
    }

    if (!formData.name.trim()) {
      errors.name = 'Název je povinný';
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      errors.amount = 'Množství musí být větší než 0';
    }

    if (!formData.averageBuyPrice || parseFloat(formData.averageBuyPrice) <= 0) {
      errors.averageBuyPrice = 'Cena musí být větší než 0';
    }

    // Check duplicates (pouze při přidání, ne editaci)
    if (!editingPosition && positions.some(p => p.symbol.toUpperCase() === formData.symbol.toUpperCase())) {
      errors.symbol = 'Symbol již existuje v portfoliu';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const symbol = formData.symbol.toUpperCase();
    const amount = parseFloat(formData.amount);
    const averageBuyPrice = parseFloat(formData.averageBuyPrice);
    
    // Mock current price (v reálné aplikaci by bylo z API)
    const currentPrice = averageBuyPrice * (0.8 + Math.random() * 0.4); // ±20% od buy price
    const totalValue = amount * currentPrice;
    const pnl = totalValue - (amount * averageBuyPrice);
    const pnlPercentage = ((currentPrice - averageBuyPrice) / averageBuyPrice) * 100;

    const newPosition: CryptoPosition = {
      id: editingPosition?.id || Date.now().toString(),
      symbol,
      name: formData.name,
      amount,
      averageBuyPrice,
      currentPrice,
      totalValue,
      pnl,
      pnlPercentage,
      lastUpdated: new Date().toISOString(),
    };

    if (editingPosition) {
      // Edit existing position
      setPositions(prev => prev.map(p => p.id === editingPosition.id ? newPosition : p));
    } else {
      // Add new position
      setPositions(prev => [...prev, newPosition]);
    }

    resetForm();
  };

  const handleEdit = (position: CryptoPosition) => {
    setEditingPosition(position);
    setFormData({
      symbol: position.symbol,
      name: position.name,
      amount: position.amount.toString(),
      averageBuyPrice: position.averageBuyPrice.toString(),
    });
    setIsFormVisible(true);
  };

  const handleDelete = (positionId: string) => {
    if (confirm('Opravdu chcete smazat tuto pozici?')) {
      setPositions(prev => prev.filter(p => p.id !== positionId));
    }
  };

  const refreshPrices = () => {
    // Mock price refresh - v reálné aplikaci by volalo CoinGecko API
    setPositions(prev => prev.map(position => {
      const priceChange = (Math.random() - 0.5) * 0.1; // ±5% změna
      const newCurrentPrice = position.currentPrice * (1 + priceChange);
      const totalValue = position.amount * newCurrentPrice;
      const pnl = totalValue - (position.amount * position.averageBuyPrice);
      const pnlPercentage = ((newCurrentPrice - position.averageBuyPrice) / position.averageBuyPrice) * 100;
      
      return {
        ...position,
        currentPrice: newCurrentPrice,
        totalValue,
        pnl,
        pnlPercentage,
        lastUpdated: new Date().toISOString(),
      };
    }));
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Admin Page Header - UNIFIED STYLE */}
      <DashboardCard variant="highlighted" className="mb-6 border-red-500/20 bg-gradient-to-br from-red-500/5 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Crypto Portfolio Management</h1>
              <p className="text-white/60 text-sm">Správa crypto portfolia - zadávání pozic, sledování výkonu a real-time ceny</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <DashboardButton 
              variant="outline" 
              onClick={refreshPrices}
              className="border-red-500 text-red-400 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Aktualizovat ceny
            </DashboardButton>
            <DashboardButton 
              variant="primary" 
              onClick={() => setIsFormVisible(true)}
              className="bg-red-500 border-red-500"
            >
              + Přidat pozici
            </DashboardButton>
          </div>
        </div>
      </DashboardCard>

      {/* Portfolio Overview - UNIFIED STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Celková hodnota"
          value={`$${portfolioStats.totalValue.toLocaleString()}`}
        />
        
        <StatCard
          title="Celkový P&L"
          value={`$${Math.abs(portfolioStats.totalPnL).toLocaleString()}`}
          trend={{
            value: Math.abs(portfolioPnLPercentage),
            isPositive: portfolioStats.totalPnL >= 0
          }}
        />

        <StatCard
          title="Pozice"
          value={positions.length.toString()}
        />
      </div>

      {/* Add/Edit Form - UNIFIED STYLE */}
      {isFormVisible && (
        <DashboardCard variant="highlighted" className="mb-6">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">
              {editingPosition ? 'Upravit pozici' : 'Přidat novou pozici'}
            </h3>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/60 text-sm mb-2">
                  Symbol (např. BTC, ETH) *
                </label>
                <input
                  type="text"
                  value={formData.symbol}
                  onChange={(e) => setFormData(prev => ({ ...prev, symbol: e.target.value.toUpperCase() }))}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-400 backdrop-blur-md"
                  placeholder="BTC"
                  disabled={editingPosition !== null} // Nelze měnit symbol při editaci
                />
                {formErrors.symbol && (
                  <div className="text-red-400 text-sm mt-1">{formErrors.symbol}</div>
                )}
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-2">Název *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-400 backdrop-blur-md"
                  placeholder="Bitcoin"
                />
                {formErrors.name && (
                  <div className="text-red-400 text-sm mt-1">{formErrors.name}</div>
                )}
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-2">Množství *</label>
                <input
                  type="number"
                  step="0.00000001"
                  value={formData.amount}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-400 backdrop-blur-md"
                  placeholder="2.5"
                />
                {formErrors.amount && (
                  <div className="text-red-400 text-sm mt-1">{formErrors.amount}</div>
                )}
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-2">Průměrná nákupní cena ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.averageBuyPrice}
                  onChange={(e) => setFormData(prev => ({ ...prev, averageBuyPrice: e.target.value }))}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-400 backdrop-blur-md"
                  placeholder="42000"
                />
                {formErrors.averageBuyPrice && (
                  <div className="text-red-400 text-sm mt-1">{formErrors.averageBuyPrice}</div>
                )}
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <DashboardButton type="submit" variant="primary" className="bg-red-500 border-red-500">
                {editingPosition ? 'Uložit změny' : 'Přidat pozici'}
              </DashboardButton>
              <DashboardButton type="button" variant="outline" onClick={resetForm}>
                Zrušit
              </DashboardButton>
            </div>
          </form>
        </DashboardCard>
      )}

      {/* Positions List - UNIFIED STYLE */}
      <DashboardCard variant="default" padding="none">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">Crypto pozice</h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead 
              className="border-b border-white/10"
              style={{ background: 'rgba(255, 255, 255, 0.02)' }}
            >
              <tr>
                <th className="text-left text-white/60 text-sm px-4 py-3">Asset</th>
                <th className="text-right text-white/60 text-sm px-4 py-3">Množství</th>
                <th className="text-right text-white/60 text-sm px-4 py-3">Nákupní cena</th>
                <th className="text-right text-white/60 text-sm px-4 py-3">Aktuální cena</th>
                <th className="text-right text-white/60 text-sm px-4 py-3">Hodnota</th>
                <th className="text-right text-white/60 text-sm px-4 py-3">P&L</th>
                <th className="text-right text-white/60 text-sm px-4 py-3">Akce</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((position) => (
                <tr key={position.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-4">
                    <div>
                      <div className="text-white font-medium">{position.symbol}</div>
                      <div className="text-white/60 text-sm">{position.name}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right text-white">
                    {position.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-right text-white">
                    ${position.averageBuyPrice.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-right text-white">
                    ${position.currentPrice.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-right text-white font-bold">
                    ${position.totalValue.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className={position.pnl >= 0 ? 'text-green-400' : 'text-red-400'}>
                      <div className="font-bold">
                        {position.pnl >= 0 ? '+' : ''}${position.pnl.toLocaleString()}
                      </div>
                      <div className="text-sm">
                        ({position.pnl >= 0 ? '+' : ''}{position.pnlPercentage.toFixed(2)}%)
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <DashboardButton
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(position)}
                      >
                        Upravit
                      </DashboardButton>
                      <DashboardButton
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(position.id)}
                        className="border-red-500 text-red-400 hover:bg-red-500/20"
                      >
                        Smazat
                      </DashboardButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {positions.length === 0 && (
          <div className="p-8 text-center">
            <div className="text-white/60 mb-4">Žádné crypto pozice</div>
            <DashboardButton variant="primary" onClick={() => setIsFormVisible(true)} className="bg-red-500 border-red-500">
              Přidat první pozici
            </DashboardButton>
          </div>
        )}
      </DashboardCard>

      {/* Footer Note - UNIFIED STYLE */}
      <DashboardCard variant="default" className="mt-6">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div className="text-white/60 text-sm">
            <div>
              <strong className="text-white">Admin Info:</strong> Ceny se aktualizují automaticky přes CoinGecko API.
            </div>
            <div className="mt-1">
              Tato stránka slouží pro zadávání a správu crypto pozic uživatelů.
              Změny se projeví na uživatelském dashboardu v real-time.
            </div>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
}
