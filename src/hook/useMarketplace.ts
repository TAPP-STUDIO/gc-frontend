'use client';

import { useState, useCallback } from 'react';
import { useApi, useMutation } from './useApi';
import { marketplaceService } from '@/services/marketplace.service';

export interface NFTListing {
  id: string;
  tokenId: number;
  type: 'GC Cards' | 'BTC Bot' | 'Algo Trader';
  subtype?: string;
  price: number;
  seller: string;
  description: string;
  premium: boolean;
  listing_date: string;
  status: 'active' | 'sold' | 'cancelled';
  image?: string;
  attributes?: Record<string, any>;
}

export interface MarketplaceFilters {
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'date_asc' | 'date_desc';
  onlyPremium?: boolean;
}

export function useMarketplace(filters?: MarketplaceFilters) {
  const { data, loading, error, refresh } = useApi<NFTListing[]>(
    `/api/marketplace?${new URLSearchParams(filters as any).toString()}`,
    [filters]
  );

  const buyNFT = useMutation<{ transactionHash: string }, { listingId: string; price: number }>();
  const makeOffer = useMutation<{ offerId: string }, { listingId: string; price: number; message?: string }>();
  const createListing = useMutation<{ listingId: string }, Omit<NFTListing, 'id' | 'listing_date' | 'status'>>();
  const cancelListing = useMutation<void, { listingId: string }>();

  return {
    listings: data || [],
    loading,
    error,
    refresh,
    
    // Actions
    buyNFT: async (listingId: string, price: number) => {
      return buyNFT.mutate(marketplaceService.buyNFT, { listingId, price });
    },
    
    makeOffer: async (listingId: string, price: number, message?: string) => {
      return makeOffer.mutate(marketplaceService.makeOffer, { listingId, price, message });
    },
    
    createListing: async (listingData: Omit<NFTListing, 'id' | 'listing_date' | 'status'>) => {
      return createListing.mutate(marketplaceService.createListing, listingData);
    },
    
    cancelListing: async (listingId: string) => {
      return cancelListing.mutate(marketplaceService.cancelListing, { listingId });
    },

    // Loading states
    buying: buyNFT.loading,
    makingOffer: makeOffer.loading,
    creating: createListing.loading,
    cancelling: cancelListing.loading,
    
    // Errors
    buyError: buyNFT.error,
    offerError: makeOffer.error,
    createError: createListing.error,
    cancelError: cancelListing.error
  };
}

export function useMyListings() {
  const { data, loading, error, refresh } = useApi<NFTListing[]>('/api/marketplace/my-listings');
  
  return {
    myListings: data || [],
    loading,
    error,
    refresh
  };
}

export function useMyOffers() {
  const { data, loading, error, refresh } = useApi('/api/marketplace/my-offers');
  
  const acceptOffer = useMutation();
  const rejectOffer = useMutation();
  const cancelOffer = useMutation();
  
  return {
    myOffers: data || [],
    loading,
    error,
    refresh,
    
    acceptOffer: acceptOffer.mutate,
    rejectOffer: rejectOffer.mutate,
    cancelOffer: cancelOffer.mutate,
    
    accepting: acceptOffer.loading,
    rejecting: rejectOffer.loading,
    cancelling: cancelOffer.loading
  };
}

export function useMarketplaceStats() {
  const { data, loading, error } = useApi('/api/marketplace/stats');
  
  return {
    stats: data,
    loading,
    error
  };
}
