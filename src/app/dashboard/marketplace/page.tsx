"use client";

import React, { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { DashboardButton, DashboardCard, StatCard } from '@/components/dashboard';

// Mock data pro NFT marketplace
const marketplaceNFTs = [
  {
    id: '1',
    tokenId: 1234,
    type: 'GC Cards',
    subtype: 'ETH',
    price: 2500,
    seller: '0x1234...5678',
    description: 'Premium ETH type GC Card with exclusive benefits',
    premium: true,
    listing_date: '2025-08-20T10:30:00Z',
  },
  {
    id: '2', 
    tokenId: 5678,
    type: 'BTC Bot',
    subtype: null,
    price: 1800,
    seller: '0x9876...5432',
    description: 'Automated Bitcoin trading bot NFT',
    premium: false,
    listing_date: '2025-08-19T14:15:00Z',
  },
  {
    id: '3',
    tokenId: 9999,
    type: 'GC Cards',
    subtype: 'BTC',
    price: 5000,
    seller: '0x5555...1111',
    description: 'Ultra rare BTC type GC Card - VIP access',
    premium: true,
    listing_date: '2025-08-18T09:45:00Z',
  },
  {
    id: '4',
    tokenId: 3333,
    type: 'Algo Trader',
    subtype: null,
    price: 3200,
    seller: '0x7777...8888',
    description: 'AI-powered algorithmic trading system',
    premium: false,
    listing_date: '2025-08-17T16:20:00Z',
  },
  {
    id: '6',
    tokenId: 1111,
    type: 'GC Cards',
    subtype: 'GC',
    price: 800,
    seller: '0x3333...4444',
    description: 'Standard GC type card for portfolio diversification',
    premium: false,
    listing_date: '2025-08-15T13:10:00Z',
  }
];

// Recent trades mock data
const recentTrades = [
  { id: '1', type: 'GC Cards', subtype: 'ETH', price: 2300, date: '2025-08-20' },
  { id: '2', type: 'BTC Bot', price: 1750, date: '2025-08-20' },
  { id: '3', type: 'Algo Trader', price: 3100, date: '2025-08-19' },
  { id: '5', type: 'GC Cards', subtype: 'BTC', price: 4800, date: '2025-08-18' },
];

// Market stats mock data
const marketStats = {
  totalVolume: 125000,
  totalSales: 342,
  floorPrices: {
    'GC Cards': 650,
    'BTC Bot': 1200,
    'Algo Trader': 2800,
  },
  activeListings: 28,
};

interface NFTCard {
  id: string;
  tokenId: number;
  type: string;
  subtype?: string | null;
  price: number;
  seller: string;
  description: string;
  premium: boolean;
  listing_date: string;
}

export default function MarketplacePage() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('price_desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const nftTypes = ['all', 'GC Cards', 'BTC Bot', 'Algo Trader'];

  // Mock user data
  const userProfile = {
    name: "Jan Novák",
    email: "jan.novak@email.cz",
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb3",
    kycVerified: true,
  };

  // Filter a sort logika
  const filteredNFTs = marketplaceNFTs
    .filter(nft => selectedType === 'all' || nft.type === selectedType)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price_asc': return a.price - b.price;
        case 'price_desc': return b.price - a.price;
        case 'date_desc': return new Date(b.listing_date).getTime() - new Date(a.listing_date).getTime();
        case 'date_asc': return new Date(a.listing_date).getTime() - new Date(b.listing_date).getTime();
        default: return 0;
      }
    });

  const handleBuyNFT = (nft: NFTCard) => {
    console.log('Buy NFT:', nft.id);
    alert(`Zakoupení NFT #${nft.tokenId} za ${nft.price.toLocaleString()}`);
  };

  const handleMakeOffer = (nft: NFTCard) => {
    console.log('Make offer on:', nft.id);
    alert(`Vytvoření nabídky na NFT #${nft.tokenId}`);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="min-h-screen">
      {/* TopBar */}
      <TopBar 
        title="NFT Marketplace"
        userProfile={userProfile}
        notificationCount={3}
      />
      
      <div className="p-4 sm:p-6 lg:p-8">
        
        {/* Market Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Celkový objem"
            value={`${marketStats.totalVolume.toLocaleString()}`}
          />
          <StatCard
            title="Prodeje"
            value={marketStats.totalSales}
          />
          <StatCard
            title="Aktivní nabídky"
            value={marketStats.activeListings}
          />
          <StatCard
            title="Floor GC Cards"
            value={`${marketStats.floorPrices['GC Cards']}`}
            badge="FLOOR"
          />
        </div>

        {/* Filters a Controls */}
        <DashboardCard className="p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Type Filter */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-white/70 text-sm whitespace-nowrap">Typ:</span>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F9D523] backdrop-blur-md"
                >
                  {nftTypes.map(type => (
                    <option key={type} value={type} className="bg-[#151515] text-white">
                      {type === 'all' ? 'Všechny typy' : type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-white/70 text-sm whitespace-nowrap">Řazení:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F9D523] backdrop-blur-md"
                >
                  <option value="price_desc" className="bg-[#151515] text-white">Cena: nejvyšší</option>
                  <option value="price_asc" className="bg-[#151515] text-white">Cena: nejnižší</option>
                  <option value="date_desc" className="bg-[#151515] text-white">Datum: nejnovější</option>
                  <option value="date_asc" className="bg-[#151515] text-white">Datum: nejstarší</option>
                </select>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <DashboardButton
                variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                Grid
              </DashboardButton>
              <DashboardButton
                variant={viewMode === 'list' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                Seznam
              </DashboardButton>
            </div>
          </div>
        </DashboardCard>

        {/* NFT Grid/List */}
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 mb-8" 
          : "space-y-4 mb-8"
        }>
          {filteredNFTs.map((nft) => (
            <DashboardCard key={nft.id} className={`overflow-hidden ${
              viewMode === 'list' ? 'flex items-center p-6' : 'flex flex-col'
            }`}>
              {/* NFT Image */}
              <div className={`relative ${
                viewMode === 'list' ? 'w-20 h-20 flex-shrink-0 mr-6' : 'aspect-square'
              }`}>
                <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center rounded-xl">
                  <div className="text-[#F9D523] text-4xl font-bold">
                    {nft.type.charAt(0)}
                  </div>
                </div>
                
                {/* Premium badge */}
                {nft.premium && (
                  <div className="absolute top-2 left-2">
                    <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-[#F9D523]/20 text-[#F9D523] border border-[#F9D523]/30">
                      PREMIUM
                    </span>
                  </div>
                )}
              </div>

              {/* NFT Details */}
              <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : 'flex flex-col flex-1'}`}>
                <div className={`${viewMode === 'list' ? 'flex items-center justify-between w-full' : 'mb-4'}`}>
                  <div className={viewMode === 'list' ? 'flex items-center gap-6' : ''}>
                    <div>
                      <h3 className="text-white font-semibold mb-1">
                        {nft.type} #{nft.tokenId}
                        {nft.subtype && <span className="text-[#F9D523]"> ({nft.subtype})</span>}
                      </h3>
                      {viewMode === 'grid' && (
                        <p className="text-white/70 text-sm mb-3 line-clamp-2">
                          {nft.description}
                        </p>
                      )}
                      <div className="text-white/50 text-xs">
                        Prodává: {formatAddress(nft.seller)}
                      </div>
                    </div>

                    {viewMode === 'list' && (
                      <div className="text-white/70 text-sm max-w-xs">
                        {nft.description}
                      </div>
                    )}
                  </div>

                  {/* Price a Actions */}
                  <div className={`${viewMode === 'list' ? 'flex items-center gap-4' : 'mt-auto'}`}>
                    <div className={`${viewMode === 'list' ? 'text-right' : 'mb-4'}`}>
                      <div className="text-[#F9D523] font-bold text-xl">
                        ${nft.price.toLocaleString()}
                      </div>
                      <div className="text-white/50 text-xs">
                        {new Date(nft.listing_date).toLocaleDateString()}
                      </div>
                    </div>

                    <div className={`flex gap-2 ${viewMode === 'list' ? 'flex-col' : ''}`}>
                      <DashboardButton
                        variant="primary"
                        size="sm"
                        onClick={() => handleBuyNFT(nft)}
                        className={viewMode === 'list' ? 'min-w-[80px]' : 'flex-1'}
                      >
                        Koupit
                      </DashboardButton>
                      <DashboardButton
                        variant="outline"
                        size="sm"
                        onClick={() => handleMakeOffer(nft)}
                        className={viewMode === 'list' ? 'min-w-[80px]' : 'flex-1'}
                      >
                        Nabídka
                      </DashboardButton>
                    </div>
                  </div>
                </div>
              </div>
            </DashboardCard>
          ))}
        </div>

        {/* Recent Trades */}
        <DashboardCard className="overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h3 className="text-lg font-semibold text-white">Nedávné prodeje</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/50 text-sm py-4 px-6">NFT</th>
                  <th className="text-left text-white/50 text-sm py-4 px-6">Cena</th>
                  <th className="text-left text-white/50 text-sm py-4 px-6">Datum</th>
                </tr>
              </thead>
              <tbody>
                {recentTrades.map((trade) => (
                  <tr key={trade.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 text-white">
                      {trade.type}
                      {trade.subtype && <span className="text-[#F9D523]"> ({trade.subtype})</span>}
                    </td>
                    <td className="py-4 px-6 text-[#F9D523] font-bold">
                      ${trade.price.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-white/70">
                      {new Date(trade.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}