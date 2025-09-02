"use client";

import React, { useState } from 'react';
import { Container, Stack, PageHeader } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Mock data pro NFT marketplace
const marketplaceNFTs = [
  {
    id: '1',
    tokenId: 1234,
    type: 'GC Cards',
    subtype: 'ETH',
    rarity: 'Rare',
    price: 2500,
    seller: '0x1234...5678',
    image: '/images/nfts/gc-cards-eth.jpg',
    description: 'Premium ETH type GC Card with exclusive benefits',
    premium: true,
    listing_date: '2025-08-20T10:30:00Z',
  },
  {
    id: '2', 
    tokenId: 5678,
    type: 'BTC Bot',
    subtype: null,
    rarity: 'Common',
    price: 1800,
    seller: '0x9876...5432',
    image: '/images/nfts/btc-bot.jpg',
    description: 'Automated Bitcoin trading bot NFT',
    premium: false,
    listing_date: '2025-08-19T14:15:00Z',
  },
  {
    id: '3',
    tokenId: 9999,
    type: 'GC Cards',
    subtype: 'BTC',
    rarity: 'Legendary',
    price: 5000,
    seller: '0x5555...1111',
    image: '/images/nfts/gc-cards-btc.jpg',
    description: 'Ultra rare BTC type GC Card - VIP access',
    premium: true,
    listing_date: '2025-08-18T09:45:00Z',
  },
  {
    id: '4',
    tokenId: 3333,
    type: 'Algo Trader',
    subtype: null,
    rarity: 'Rare',
    price: 3200,
    seller: '0x7777...8888',
    image: '/images/nfts/algo-trader.jpg',
    description: 'AI-powered algorithmic trading system',
    premium: false,
    listing_date: '2025-08-17T16:20:00Z',
  },
  {
    id: '5',
    tokenId: 7777,
    type: 'VC NFT',
    subtype: null,
    rarity: 'Epic',
    price: 4200,
    seller: '0x2222...9999',
    image: '/images/nfts/vc-nft.jpg',
    description: 'Venture Capital NFT with investment privileges',
    premium: true,
    listing_date: '2025-08-16T11:30:00Z',
  },
  {
    id: '6',
    tokenId: 1111,
    type: 'GC Cards',
    subtype: 'GC',
    rarity: 'Common',
    price: 800,
    seller: '0x3333...4444',
    image: '/images/nfts/gc-cards-gc.jpg',
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
  { id: '4', type: 'VC NFT', price: 4000, date: '2025-08-19' },
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
    'VC NFT': 3500,
  },
  activeListings: 28,
};

interface NFTCard {
  id: string;
  tokenId: number;
  type: string;
  subtype?: string | null;
  rarity: string;
  price: number;
  seller: string;
  image: string;
  description: string;
  premium: boolean;
  listing_date: string;
}

export default function MarketplacePage() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('price_desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const nftTypes = ['all', 'GC Cards', 'BTC Bot', 'Algo Trader', 'VC NFT'];
  const rarityTypes = ['all', 'Common', 'Rare', 'Epic', 'Legendary'];

  // Filter a sort logika
  const filteredNFTs = marketplaceNFTs
    .filter(nft => selectedType === 'all' || nft.type === selectedType)
    .filter(nft => selectedRarity === 'all' || nft.rarity === selectedRarity)
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
    // Zde bude později buy modal nebo přesměrování na buy flow
    alert(`Zakoupení NFT #${nft.tokenId} za $${nft.price.toLocaleString()}`);
  };

  const handleMakeOffer = (nft: NFTCard) => {
    console.log('Make offer on:', nft.id);
    // Zde bude později offer modal
    alert(`Vytvoření nabídky na NFT #${nft.tokenId}`);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Container fluid className="py-4 sm:py-6">
      <Stack spacing="lg">
        {/* Page Header */}
        <PageHeader 
          title="NFT Marketplace"
          backTo="/dashboard/portfolio"
          backLabel="Portfolio"
        />

        {/* Market Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#151515] rounded-lg p-4 border border-[#333333]">
            <div className="text-[#666666] text-sm mb-1">Celkový objem</div>
            <div className="text-white text-xl font-bold">${marketStats.totalVolume.toLocaleString()}</div>
          </div>
          <div className="bg-[#151515] rounded-lg p-4 border border-[#333333]">
            <div className="text-[#666666] text-sm mb-1">Prodeje</div>
            <div className="text-white text-xl font-bold">{marketStats.totalSales}</div>
          </div>
          <div className="bg-[#151515] rounded-lg p-4 border border-[#333333]">
            <div className="text-[#666666] text-sm mb-1">Aktivní nabídky</div>
            <div className="text-white text-xl font-bold">{marketStats.activeListings}</div>
          </div>
          <div className="bg-[#151515] rounded-lg p-4 border border-[#333333]">
            <div className="text-[#666666] text-sm mb-1">Floor GC Cards</div>
            <div className="text-[#F9D523] text-xl font-bold">${marketStats.floorPrices['GC Cards']}</div>
          </div>
        </div>

        {/* Filters a Controls */}
        <div className="bg-[#151515] rounded-lg p-4 border border-[#333333]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Type Filter */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-[#666666] text-sm whitespace-nowrap">Typ:</span>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="bg-[#1a1a1a] border border-[#333333] rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F9D523]"
                >
                  {nftTypes.map(type => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'Všechny typy' : type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rarity Filter */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-[#666666] text-sm whitespace-nowrap">Vzácnost:</span>
                <select
                  value={selectedRarity}
                  onChange={(e) => setSelectedRarity(e.target.value)}
                  className="bg-[#1a1a1a] border border-[#333333] rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F9D523]"
                >
                  {rarityTypes.map(rarity => (
                    <option key={rarity} value={rarity}>
                      {rarity === 'all' ? 'Všechny' : rarity}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-[#666666] text-sm whitespace-nowrap">Řazení:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#1a1a1a] border border-[#333333] rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F9D523]"
                >
                  <option value="price_desc">Cena: nejvyšší</option>
                  <option value="price_asc">Cena: nejnižší</option>
                  <option value="date_desc">Datum: nejnovější</option>
                  <option value="date_asc">Datum: nejstarší</option>
                </select>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                Seznam
              </Button>
            </div>
          </div>
        </div>

        {/* NFT Grid/List */}
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
          : "space-y-4"
        }>
          {filteredNFTs.map((nft) => (
            <div 
              key={nft.id} 
              className={`bg-[#151515] rounded-lg border border-[#333333] overflow-hidden hover:border-[#F9D523] transition-colors group ${
                viewMode === 'list' ? 'flex items-center' : 'flex flex-col'
              }`}
            >
              {/* NFT Image */}
              <div className={`relative ${viewMode === 'list' ? 'w-20 h-20 flex-shrink-0' : 'aspect-square'}`}>
                <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center">
                  <div className="text-[#F9D523] text-4xl font-bold">
                    {nft.type.charAt(0)}
                  </div>
                </div>
                
                {/* Premium badge */}
                {nft.premium && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-[#F9D523] text-black text-xs border border-[#F9D523]">
                      PREMIUM
                    </Badge>
                  </div>
                )}

                {/* Rarity badge */}
                <div className="absolute top-2 right-2">
                  <Badge className={`${getRarityColor(nft.rarity)} text-white text-xs`}>
                    {nft.rarity}
                  </Badge>
                </div>
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
                        <p className="text-[#666666] text-sm mb-3 line-clamp-2">
                          {nft.description}
                        </p>
                      )}
                      <div className="text-[#666666] text-xs">
                        Prodává: {formatAddress(nft.seller)}
                      </div>
                    </div>

                    {viewMode === 'list' && (
                      <div className="text-[#666666] text-sm max-w-xs">
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
                      <div className="text-[#666666] text-xs">
                        {new Date(nft.listing_date).toLocaleDateString()}
                      </div>
                    </div>

                    <div className={`flex gap-2 ${viewMode === 'list' ? 'flex-col' : ''}`}>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleBuyNFT(nft)}
                        className={viewMode === 'list' ? 'min-w-[80px]' : 'flex-1'}
                      >
                        Koupit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMakeOffer(nft)}
                        className={viewMode === 'list' ? 'min-w-[80px]' : 'flex-1'}
                      >
                        Nabídka
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Trades */}
        <div className="bg-[#151515] rounded-lg p-6 border border-[#333333]">
          <h3 className="text-lg font-semibold text-white mb-4">Nedávné prodeje</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#333333]">
                  <th className="text-left text-[#666666] text-sm py-2">NFT</th>
                  <th className="text-left text-[#666666] text-sm py-2">Cena</th>
                  <th className="text-left text-[#666666] text-sm py-2">Datum</th>
                </tr>
              </thead>
              <tbody>
                {recentTrades.map((trade) => (
                  <tr key={trade.id} className="border-b border-[#2a2a2a]">
                    <td className="py-3 text-white">
                      {trade.type}
                      {trade.subtype && <span className="text-[#F9D523]"> ({trade.subtype})</span>}
                    </td>
                    <td className="py-3 text-[#F9D523] font-bold">
                      ${trade.price.toLocaleString()}
                    </td>
                    <td className="py-3 text-[#666666]">
                      {new Date(trade.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </Stack>
    </Container>
  );
}