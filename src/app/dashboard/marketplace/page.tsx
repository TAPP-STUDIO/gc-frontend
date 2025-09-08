'use client';

import React, { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { DashboardButton, DashboardCard, StatCard } from '@/components/dashboard';
import { CreateListingModal, MakeOfferModal } from '@/components/marketplace/CreateListingModal';
import { useMarketplace, useMarketplaceStats } from '@/hook/useMarketplace';
import { useToast } from '@/components/ui/toast';
import { 
  Plus, 
  Filter, 
  Grid, 
  List, 
  Search,
  TrendingUp,
  Eye,
  ShoppingCart,
  Gavel
} from 'lucide-react';

// Mock data pro NFT marketplace
const mockMarketplaceNFTs = [
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
    image: '/images/nft-placeholder.jpg',
    status: 'active'
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
    image: '/images/nft-placeholder.jpg',
    status: 'active'
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
    image: '/images/nft-placeholder.jpg',
    status: 'active'
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
    image: '/images/nft-placeholder.jpg',
    status: 'active'
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
    image: '/images/nft-placeholder.jpg',
    status: 'active'
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

// Mock user NFTs for listing
const mockUserNFTs = [
  {
    id: 'user-1',
    tokenId: 7777,
    type: 'GC Cards',
    subtype: 'ETH',
    premium: true,
    owned: true
  },
  {
    id: 'user-2',
    tokenId: 8888,
    type: 'BTC Bot',
    subtype: null,
    premium: false,
    owned: true
  }
];

export default function MarketplacePage() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('price_desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNFT, setSelectedNFT] = useState<any>(null);
  
  // Modals
  const [isCreateListingOpen, setIsCreateListingOpen] = useState(false);
  const [isMakeOfferOpen, setIsMakeOfferOpen] = useState(false);
  
  // Hooks
  const { success, error } = useToast();
  // In real app: const { listings, loading, buyNFT, buying } = useMarketplace();
  const listings = mockMarketplaceNFTs;
  const loading = false;
  
  const nftTypes = ['all', 'GC Cards', 'BTC Bot', 'Algo Trader'];

  // Mock user data
  const userProfile = {
    name: "Jan Novák",
    email: "jan.novak@email.cz",
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb3",
    kycVerified: true,
  };

  // Filter a sort logika
  const filteredNFTs = listings
    .filter(nft => {
      if (selectedType !== 'all' && nft.type !== selectedType) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          nft.type.toLowerCase().includes(query) ||
          nft.description.toLowerCase().includes(query) ||
          (nft.subtype && nft.subtype.toLowerCase().includes(query))
        );
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price_asc': return a.price - b.price;
        case 'price_desc': return b.price - a.price;
        case 'date_desc': return new Date(b.listing_date).getTime() - new Date(a.listing_date).getTime();
        case 'date_asc': return new Date(a.listing_date).getTime() - new Date(b.listing_date).getTime();
        default: return 0;
      }
    });

  const handleBuyNFT = async (nft: any) => {
    try {
      // await buyNFT(nft.id, nft.price);
      success('NFT zakoupeno', `Úspěšně jste zakoupili ${nft.type} #${nft.tokenId}`);
      console.log('Buy NFT:', nft.id);
    } catch (err) {
      error('Chyba při nákupu', 'Nepodařilo se zakoupit NFT');
    }
  };

  const handleMakeOffer = (nft: any) => {
    setSelectedNFT(nft);
    setIsMakeOfferOpen(true);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('cs-CZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
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
            title="Průměrná cena"
            value={`$${Math.round(marketStats.totalVolume / marketStats.totalSales).toLocaleString()}`}
          />
        </div>

        {/* Controls */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            
            {/* Left side - Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              
              {/* Search */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Hledat NFT..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-glass pl-10 w-full"
                />
              </div>
              
              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="input-glass min-w-[140px]"
              >
                {nftTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'Všechny typy' : type}
                  </option>
                ))}
              </select>
              
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-glass min-w-[140px]"
              >
                <option value="price_desc">Cena (nejvyšší)</option>
                <option value="price_asc">Cena (nejnižší)</option>
                <option value="date_desc">Nejnovější</option>
                <option value="date_asc">Nejstarší</option>
              </select>
            </div>
            
            {/* Right side - Actions */}
            <div className="flex items-center space-x-3">
              
              {/* View Mode */}
              <div className="flex bg-white/10 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid' ? 'bg-[#F9D523] text-black' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list' ? 'bg-[#F9D523] text-black' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              
              {/* Create Listing */}
              <DashboardButton
                onClick={() => setIsCreateListingOpen(true)}
                variant="primary"
              >
                <Plus className="w-4 h-4 mr-2" />
                Vytvořit nabídku
              </DashboardButton>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <p className="text-white/70">
              {filteredNFTs.length === 0 
                ? 'Žádné NFT nenalezeny'
                : `Zobrazeno ${filteredNFTs.length} NFT`
              }
              {searchQuery && ` pro "${searchQuery}"`}
            </p>
            
            {/* Floor Prices */}
            <div className="hidden lg:flex items-center space-x-6 text-sm">
              <span className="text-white/60">Floor prices:</span>
              {Object.entries(marketStats.floorPrices).map(([type, price]) => (
                <div key={type} className="flex items-center space-x-1">
                  <span className="text-white/60">{type}:</span>
                  <span className="text-[#F9D523] font-medium">${price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* NFT Grid/List */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="glass-card p-4 animate-pulse">
                <div className="aspect-square bg-white/10 rounded-lg mb-4" />
                <div className="space-y-2">
                  <div className="h-4 bg-white/10 rounded w-3/4" />
                  <div className="h-3 bg-white/10 rounded w-1/2" />
                  <div className="h-6 bg-white/10 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredNFTs.length === 0 ? (
          <div className="text-center py-16">
            <div className="glass-card p-8 max-w-md mx-auto">
              <ShoppingCart className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                {searchQuery ? 'Žádné NFT nenalezeny' : 'Žádné NFT k dispozici'}
              </h3>
              <p className="text-white/60">
                {searchQuery 
                  ? 'Zkuste změnit hledaný termín nebo filtry'
                  : 'Momentálně nejsou k dispozici žádné NFT pro prodej'
                }
              </p>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredNFTs.map((nft) => (
              <div key={nft.id} className="glass-card overflow-hidden hover:border-[#F9D523]/30 transition-all group">
                
                {/* NFT Image */}
                <div className="aspect-square bg-gradient-to-br from-[#F9D523]/20 to-transparent p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#F9D523] mb-2">
                      #{nft.tokenId}
                    </div>
                    <div className="text-white font-medium">{nft.type}</div>
                    {nft.subtype && (
                      <div className="text-white/60 text-sm">{nft.subtype}</div>
                    )}
                  </div>
                </div>
                
                {/* NFT Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">
                      {nft.type} #{nft.tokenId}
                    </h3>
                    {nft.premium && (
                      <span className="badge-gold text-xs">Premium</span>
                    )}
                  </div>
                  
                  <p className="text-white/60 text-sm mb-3 line-clamp-2">
                    {nft.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-[#F9D523] font-bold text-lg">
                        ${nft.price.toLocaleString()}
                      </div>
                      <div className="text-white/50 text-xs">
                        {formatAddress(nft.seller)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white/50 text-xs">
                        Listed {formatDate(nft.listing_date)}
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex space-x-2">
                    <DashboardButton
                      onClick={() => handleBuyNFT(nft)}
                      variant="primary"
                      size="sm"
                      className="flex-1"
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Koupit
                    </DashboardButton>
                    <DashboardButton
                      onClick={() => handleMakeOffer(nft)}
                      variant="secondary"
                      size="sm"
                      className="flex-1"
                    >
                      <Gavel className="w-4 h-4 mr-1" />
                      Nabídka
                    </DashboardButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          
          /* List View */
          <div className="space-y-4">
            {filteredNFTs.map((nft) => (
              <div key={nft.id} className="glass-card p-6 hover:border-[#F9D523]/30 transition-all">
                <div className="flex items-center space-x-6">
                  
                  {/* NFT Thumbnail */}
                  <div className="w-20 h-20 bg-gradient-to-br from-[#F9D523]/20 to-transparent rounded-lg flex items-center justify-center flex-shrink-0">
                    <div className="text-center">
                      <div className="text-lg font-bold text-[#F9D523]">#{nft.tokenId}</div>
                    </div>
                  </div>
                  
                  {/* NFT Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-white text-lg">
                        {nft.type} #{nft.tokenId}
                      </h3>
                      {nft.subtype && (
                        <span className="badge-glass text-xs">{nft.subtype}</span>
                      )}
                      {nft.premium && (
                        <span className="badge-gold text-xs">Premium</span>
                      )}
                    </div>
                    <p className="text-white/60 text-sm mb-2">
                      {nft.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-white/50">
                      <span>Seller: {formatAddress(nft.seller)}</span>
                      <span>Listed: {formatDate(nft.listing_date)}</span>
                    </div>
                  </div>
                  
                  {/* Price & Actions */}
                  <div className="text-right flex-shrink-0">
                    <div className="text-[#F9D523] font-bold text-xl mb-3">
                      ${nft.price.toLocaleString()}
                    </div>
                    <div className="flex space-x-2">
                      <DashboardButton
                        onClick={() => handleBuyNFT(nft)}
                        variant="primary"
                        size="sm"
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Koupit
                      </DashboardButton>
                      <DashboardButton
                        onClick={() => handleMakeOffer(nft)}
                        variant="secondary"
                        size="sm"
                      >
                        <Gavel className="w-4 h-4 mr-1" />
                        Nabídka
                      </DashboardButton>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recent Trades */}
        {recentTrades.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
              Nedávné obchody
            </h2>
            <div className="glass-card overflow-hidden">
              <div className="data-table">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left py-3 px-4">NFT</th>
                      <th className="text-left py-3 px-4">Typ</th>
                      <th className="text-left py-3 px-4">Cena</th>
                      <th className="text-left py-3 px-4">Datum</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTrades.map((trade) => (
                      <tr key={trade.id} className="border-t border-white/10">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="text-white font-medium">
                              {trade.type}
                            </div>
                            {trade.subtype && (
                              <span className="badge-glass text-xs">{trade.subtype}</span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-white/60">{trade.type}</td>
                        <td className="py-3 px-4 text-[#F9D523] font-semibold">
                          ${trade.price.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-white/60">
                          {formatDate(trade.date)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateListingModal
        isOpen={isCreateListingOpen}
        onClose={() => setIsCreateListingOpen(false)}
        userNFTs={mockUserNFTs}
      />
      
      <MakeOfferModal
        isOpen={isMakeOfferOpen}
        onClose={() => setIsMakeOfferOpen(false)}
        listing={selectedNFT}
      />
    </div>
  );
}
