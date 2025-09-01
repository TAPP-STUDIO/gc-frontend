"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BarChart3, RefreshCw, TrendingUp } from 'lucide-react';

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
    <div className="py-4 sm:py-6">
      <div className="space-y-6">
        {/* Admin Page Header */}
        <div className="mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#F9D523]" />
            Crypto Portfolio Management
          </h1>
          <p className="text-[#666666] mt-2">
            Správa crypto portfolia - zadávání pozic, sledování výkonu a real-time ceny
          </p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-[#151515] border-[#333333] p-4">
            <div className="text-[#666666] text-sm mb-1">Celková hodnota</div>
            <div className="text-white text-2xl font-bold">
              ${portfolioStats.totalValue.toLocaleString()}
            </div>
          </Card>
          
          <Card className="bg-[#151515] border-[#333333] p-4">
            <div className="text-[#666666] text-sm mb-1">Celkový P&L</div>
            <div className={`text-2xl font-bold ${portfolioStats.totalPnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              ${Math.abs(portfolioStats.totalPnL).toLocaleString()}
              <span className="text-sm ml-2">
                ({portfolioStats.totalPnL >= 0 ? '+' : '-'}{Math.abs(portfolioPnLPercentage).toFixed(2)}%)
              </span>
            </div>
          </Card>

          <Card className="bg-[#151515] border-[#333333] p-4">
            <div className="text-[#666666] text-sm mb-1">Pozice</div>
            <div className="text-white text-2xl font-bold">{positions.length}</div>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-2">
            <Button
              variant="primary"
              onClick={() => setIsFormVisible(true)}
            >
              + Přidat pozici
            </Button>
            <Button
              variant="outline"
              onClick={refreshPrices}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Aktualizovat ceny</span>
            </Button>
          </div>
          
          <div className="text-[#666666] text-sm flex items-center">
            Poslední aktualizace: {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Add/Edit Form */}
        {isFormVisible && (
          <Card className="bg-[#151515] border-[#333333] p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              {editingPosition ? 'Upravit pozici' : 'Přidat novou pozici'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#666666] text-sm mb-2">
                    Symbol (např. BTC, ETH) *
                  </label>
                  <input
                    type="text"
                    value={formData.symbol}
                    onChange={(e) => setFormData(prev => ({ ...prev, symbol: e.target.value.toUpperCase() }))}
                    className="w-full bg-[#1a1a1a] border border-[#333333] rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#F9D523]"
                    placeholder="BTC"
                    disabled={editingPosition !== null} // Nelze měnit symbol při editaci
                  />
                  {formErrors.symbol && (
                    <div className="text-red-500 text-sm mt-1">{formErrors.symbol}</div>
                  )}
                </div>

                <div>
                  <label className="block text-[#666666] text-sm mb-2">Název *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-[#1a1a1a] border border-[#333333] rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#F9D523]"
                    placeholder="Bitcoin"
                  />
                  {formErrors.name && (
                    <div className="text-red-500 text-sm mt-1">{formErrors.name}</div>
                  )}
                </div>

                <div>
                  <label className="block text-[#666666] text-sm mb-2">Množství *</label>
                  <input
                    type="number"
                    step="0.00000001"
                    value={formData.amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                    className="w-full bg-[#1a1a1a] border border-[#333333] rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#F9D523]"
                    placeholder="2.5"
                  />
                  {formErrors.amount && (
                    <div className="text-red-500 text-sm mt-1">{formErrors.amount}</div>
                  )}
                </div>

                <div>
                  <label className="block text-[#666666] text-sm mb-2">Průměrná nákupní cena ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.averageBuyPrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, averageBuyPrice: e.target.value }))}
                    className="w-full bg-[#1a1a1a] border border-[#333333] rounded-md px-3 py-2 text-white focus:outline-none focus:border-[#F9D523]"
                    placeholder="42000"
                  />
                  {formErrors.averageBuyPrice && (
                    <div className="text-red-500 text-sm mt-1">{formErrors.averageBuyPrice}</div>
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" variant="primary">
                  {editingPosition ? 'Uložit změny' : 'Přidat pozici'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Zrušit
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Positions List */}
        <Card className="bg-[#151515] border-[#333333] overflow-hidden">
          <div className="p-4 border-b border-[#333333]">
            <h3 className="text-lg font-semibold text-white">Crypto pozice</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#1a1a1a]">
                <tr>
                  <th className="text-left text-[#666666] text-sm px-4 py-3">Asset</th>
                  <th className="text-right text-[#666666] text-sm px-4 py-3">Množství</th>
                  <th className="text-right text-[#666666] text-sm px-4 py-3">Nákupní cena</th>
                  <th className="text-right text-[#666666] text-sm px-4 py-3">Aktuální cena</th>
                  <th className="text-right text-[#666666] text-sm px-4 py-3">Hodnota</th>
                  <th className="text-right text-[#666666] text-sm px-4 py-3">P&L</th>
                  <th className="text-right text-[#666666] text-sm px-4 py-3">Akce</th>
                </tr>
              </thead>
              <tbody>
                {positions.map((position) => (
                  <tr key={position.id} className="border-b border-[#2a2a2a] hover:bg-[#1a1a1a]">
                    <td className="px-4 py-4">
                      <div>
                        <div className="text-white font-medium">{position.symbol}</div>
                        <div className="text-[#666666] text-sm">{position.name}</div>
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
                      <div className={position.pnl >= 0 ? 'text-green-500' : 'text-red-500'}>
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
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(position)}
                        >
                          Upravit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(position.id)}
                        >
                          Smazat
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {positions.length === 0 && (
            <div className="p-8 text-center">
              <div className="text-[#666666] mb-4">Žádné crypto pozice</div>
              <Button variant="primary" onClick={() => setIsFormVisible(true)}>
                Přidat první pozici
              </Button>
            </div>
          )}
        </Card>

        {/* Footer Note */}
        <div className="bg-[#1a1a1a] border border-[#333333] rounded-lg p-4">
          <div className="text-[#666666] text-sm">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span><strong>Admin Info:</strong> Ceny se aktualizují automaticky přes CoinGecko API.</span>
            </div>
            <div className="mt-1">
              Tato stránka slouží pro zadávání a správu crypto pozic uživatelů.
              Změny se projeví na uživatelském dashboardu v real-time.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}