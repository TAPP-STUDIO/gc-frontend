'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { DashboardButton } from '@/components/dashboard';
import { useToast } from '@/components/ui/toast';
import { 
  DollarSign, 
  ExternalLink, 
  Share2,
  BarChart3,
  Clock,
  Trophy,
  Zap
} from 'lucide-react';

export interface PortfolioItem {
  id: string;
  tokenId: number;
  type: 'GC Cards' | 'BTC Bot' | 'Algo Trader';
  subtype?: string;
  purchasePrice: number;
  currentValue: number;
  purchaseDate: string;
  lastClaim?: string;
  nextClaim?: string;
  totalClaimed: number;
  monthlyReturn: number;
  roi: number;
  rarity?: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  active: boolean;
  metadata?: {
    description?: string;
    image?: string;
    attributes?: Array<{ trait_type: string; value: string | number }>;
  };
  performance?: {
    dailyReturn: number;
    weeklyReturn: number;
    monthlyReturn: number;
    totalReturn: number;
    claimHistory: Array<{
      date: string;
      amount: number;
      txHash: string;
    }>;
  };
}

interface PortfolioDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: PortfolioItem | null;
}

export function PortfolioDetailModal({ isOpen, onClose, item }: PortfolioDetailModalProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const { success, error } = useToast();

  if (!item) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('cs-CZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const profitLoss = item.currentValue - item.purchasePrice;
  const profitLossPercent = ((profitLoss / item.purchasePrice) * 100);

  const handleClaim = async () => {
    try {
      // Implement claim logic
      success('Claim successful', `Claimed ${item.monthlyReturn} USD`);
    } catch {
      error('Claim failed', 'Please try again later');
    }
  };

  const handleSell = () => {
    // Open sell modal or redirect to marketplace
    success('Redirecting to marketplace', 'Opening sell form...');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    success('Link copied', 'Portfolio item link copied to clipboard');
  };

  const getRarityColor = (rarity?: string) => {
    switch (rarity) {
      case 'Common': return 'text-gray-400';
      case 'Rare': return 'text-blue-400';
      case 'Epic': return 'text-purple-400';
      case 'Legendary': return 'text-yellow-400';
      default: return 'text-white';
    }
  };

  const tabs = [
    {
      key: 'overview',
      label: 'Přehled',
      content: (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card p-4">
              <div className="text-sm text-white/60 mb-1">Současná hodnota</div>
              <div className="text-lg font-bold text-white">{formatCurrency(item.currentValue)}</div>
              <div className={`text-xs ${profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {profitLoss >= 0 ? '+' : ''}{formatCurrency(profitLoss)} ({profitLossPercent.toFixed(2)}%)
              </div>
            </div>
            
            <div className="glass-card p-4">
              <div className="text-sm text-white/60 mb-1">Celkem získáno</div>
              <div className="text-lg font-bold text-[#F9D523]">{formatCurrency(item.totalClaimed)}</div>
              <div className="text-xs text-white/60">z dividend</div>
            </div>
            
            <div className="glass-card p-4">
              <div className="text-sm text-white/60 mb-1">ROI</div>
              <div className={`text-lg font-bold ${item.roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {item.roi.toFixed(2)}%
              </div>
              <div className="text-xs text-white/60">od nákupu</div>
            </div>
            
            <div className="glass-card p-4">
              <div className="text-sm text-white/60 mb-1">Měsíční výnos</div>
              <div className="text-lg font-bold text-[#F9D523]">{formatCurrency(item.monthlyReturn)}</div>
              <div className="text-xs text-white/60">průměr</div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Základní informace</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/60">Token ID</span>
                  <span className="text-white font-mono">#{item.tokenId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Typ</span>
                  <span className="text-white">{item.type}</span>
                </div>
                {item.subtype && (
                  <div className="flex justify-between">
                    <span className="text-white/60">Podtyp</span>
                    <span className="text-white">{item.subtype}</span>
                  </div>
                )}
                {item.rarity && (
                  <div className="flex justify-between">
                    <span className="text-white/60">Vzácnost</span>
                    <span className={`font-medium ${getRarityColor(item.rarity)}`}>
                      {item.rarity}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/60">Datum nákupu</span>
                  <span className="text-white">{formatDate(item.purchaseDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Nákupní cena</span>
                  <span className="text-white">{formatCurrency(item.purchasePrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Status</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    item.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {item.active ? 'Aktivní' : 'Neaktivní'}
                  </span>
                </div>
                {item.nextClaim && (
                  <div className="flex justify-between">
                    <span className="text-white/60">Další claim</span>
                    <span className="text-white">{formatDate(item.nextClaim)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          {item.metadata?.description && (
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Popis</h3>
              <p className="text-white/80 leading-relaxed">{item.metadata.description}</p>
            </div>
          )}

          {/* Attributes */}
          {item.metadata?.attributes && item.metadata.attributes.length > 0 && (
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Vlastnosti</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {item.metadata.attributes.map((attr, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-xs text-white/60 uppercase tracking-wider">
                      {attr.trait_type}
                    </div>
                    <div className="text-sm font-medium text-white mt-1">
                      {attr.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      key: 'performance',
      label: 'Výkonnost',
      content: (
        <div className="space-y-6">
          {/* Performance Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold text-green-400">
                {item.performance?.dailyReturn?.toFixed(2) || '0.00'}%
              </div>
              <div className="text-sm text-white/60">24h</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">
                {item.performance?.weeklyReturn?.toFixed(2) || '0.00'}%
              </div>
              <div className="text-sm text-white/60">7 dní</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">
                {item.performance?.monthlyReturn?.toFixed(2) || '0.00'}%
              </div>
              <div className="text-sm text-white/60">30 dní</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold text-[#F9D523]">
                {item.performance?.totalReturn?.toFixed(2) || item.roi.toFixed(2)}%
              </div>
              <div className="text-sm text-white/60">Celkem</div>
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Vývoj hodnoty</h3>
            <div className="h-64 bg-white/5 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-white/30 mx-auto mb-2" />
                <p className="text-white/60">Graf bude implementován</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'claims',
      label: 'Claims historie',
      content: (
        <div className="space-y-6">
          {/* Next Claim */}
          {item.nextClaim && item.active && (
            <div className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Další claim</h3>
                  <p className="text-white/60">
                    Dostupný {formatDate(item.nextClaim)} • ~{formatCurrency(item.monthlyReturn)}
                  </p>
                </div>
                <DashboardButton
                  onClick={handleClaim}
                  variant="primary"
                  disabled={new Date(item.nextClaim) > new Date()}
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Claim
                </DashboardButton>
              </div>
            </div>
          )}

          {/* Claims History */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Historie claims</h3>
            {item.performance?.claimHistory && item.performance.claimHistory.length > 0 ? (
              <div className="space-y-3">
                {item.performance.claimHistory.map((claim, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <div>
                        <div className="text-white font-medium">{formatCurrency(claim.amount)}</div>
                        <div className="text-xs text-white/60">{formatDate(claim.date)}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => window.open(`https://etherscan.io/tx/${claim.txHash}`, '_blank')}
                      className="text-[#F9D523] hover:text-[#FBE05A] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-white/30 mx-auto mb-4" />
                <p className="text-white/60">Zatím žádné claims</p>
              </div>
            )}
          </div>
        </div>
      )
    }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${item.type} #${item.tokenId}`}
      size="xl"
    >
      <div className="flex flex-col h-full max-h-[80vh]">
        {/* Header with Image */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-start space-x-6">
            {/* NFT Image Placeholder */}
            <div className="w-24 h-24 bg-gradient-to-br from-[#F9D523]/20 to-[#F9D523]/5 rounded-lg flex items-center justify-center flex-shrink-0">
              {item.type === 'GC Cards' && <Trophy className="w-12 h-12 text-[#F9D523]" />}
              {item.type === 'BTC Bot' && <Zap className="w-12 h-12 text-[#F9D523]" />}
              {item.type === 'Algo Trader' && <BarChart3 className="w-12 h-12 text-[#F9D523]" />}
            </div>
            
            {/* Basic Info */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">
                {item.type} #{item.tokenId}
                {item.subtype && <span className="text-[#F9D523] ml-2">({item.subtype})</span>}
              </h2>
              <div className="flex items-center space-x-4 text-sm text-white/60">
                <span>Zakoupeno {formatDate(item.purchaseDate)}</span>
                <span>•</span>
                <span className={item.active ? 'text-green-400' : 'text-red-400'}>
                  {item.active ? 'Aktivní' : 'Neaktivní'}
                </span>
                {item.rarity && (
                  <>
                    <span>•</span>
                    <span className={getRarityColor(item.rarity)}>{item.rarity}</span>
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <DashboardButton
                onClick={handleShare}
                variant="ghost"
                size="sm"
              >
                <Share2 className="w-4 h-4" />
              </DashboardButton>
              
              <DashboardButton
                onClick={handleSell}
                variant="secondary"
                size="sm"
              >
                Prodat
              </DashboardButton>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-white/10">
          <div className="flex space-x-0">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === tab.key
                    ? 'text-[#F9D523] border-[#F9D523] bg-[#F9D523]/5'
                    : 'text-white/60 border-transparent hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {tabs.find(tab => tab.key === activeTab)?.content}
        </div>
      </div>
    </Modal>
  );
}

interface PortfolioItemCardProps {
  item: PortfolioItem;
  onClick: () => void;
}

export function PortfolioItemCard({ item, onClick }: PortfolioItemCardProps) {
  const profitLoss = item.currentValue - item.purchasePrice;
  const profitLossPercent = ((profitLoss / item.purchasePrice) * 100);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div
      onClick={onClick}
      className="glass-card p-6 cursor-pointer transition-all hover:bg-white/10 hover:border-[#F9D523]/30"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {item.type} #{item.tokenId}
          </h3>
          {item.subtype && (
            <p className="text-sm text-[#F9D523]">{item.subtype}</p>
          )}
        </div>
        <div className={`px-2 py-1 rounded text-xs ${
          item.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {item.active ? 'Aktivní' : 'Neaktivní'}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-sm text-white/60 mb-1">Současná hodnota</div>
          <div className="text-lg font-bold text-white">{formatCurrency(item.currentValue)}</div>
        </div>
        <div>
          <div className="text-sm text-white/60 mb-1">Zisk/Ztráta</div>
          <div className={`text-lg font-bold ${profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {profitLoss >= 0 ? '+' : ''}{profitLossPercent.toFixed(2)}%
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="text-white/60">
          ROI: <span className={`font-medium ${item.roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {item.roi.toFixed(2)}%
          </span>
        </div>
        <div className="text-white/60">
          Měsíční: <span className="text-[#F9D523] font-medium">
            {formatCurrency(item.monthlyReturn)}
          </span>
        </div>
      </div>
    </div>
  );
}
