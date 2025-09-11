import axios from 'axios';
import { ApiResponse } from './api.service';

export interface NFTListing {
  id: string;
  tokenId: number;
  type: string;
  subtype?: string;
  price: number;
  seller: string;
  description: string;
  premium: boolean;
  listing_date: string;
  status: 'active' | 'sold' | 'cancelled';
  image?: string;
  attributes?: Record<string, unknown>;
}

export interface MarketplaceOffer {
  id: string;
  listingId: string;
  price: number;
  message?: string;
  offerer: string;
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled';
  createdAt: string;
}

export interface MarketplaceStats {
  totalVolume: number;
  totalListings: number;
  floorPrice: number;
  avgPrice: number;
}

export interface RecentTrade {
  id: string;
  tokenId: number;
  price: number;
  buyer: string;
  seller: string;
  timestamp: string;
}

export interface CreateListingData {
  tokenId: number;
  type: string;
  subtype?: string;
  price: number;
  description: string;
  premium?: boolean;
  attributes?: Record<string, unknown>;
}

export interface MakeOfferData {
  listingId: string;
  price: number;
  message?: string;
}

export interface BuyNFTData {
  listingId: string;
  price: number;
}

class MarketplaceService {
  private baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

  private async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    data?: unknown
  ): Promise<ApiResponse<T>> {
    try {
      const response = await axios({
        method,
        url: `${this.baseURL}${endpoint}`,
        data,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          error: error.response?.data?.error || error.message
        };
      }
      return {
        success: false,
        error: 'An unexpected error occurred'
      };
    }
  }

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  // Get all marketplace listings
  async getListings(filters?: Record<string, string | number | boolean>): Promise<ApiResponse<NFTListing[]>> {
    const queryParams = filters ? `?${new URLSearchParams(filters as Record<string, string>).toString()}` : '';
    return this.request('GET', `/marketplace/listings${queryParams}`);
  }

  // Get single listing
  async getListing(id: string): Promise<ApiResponse<NFTListing>> {
    return this.request('GET', `/marketplace/listings/${id}`);
  }

  // Create new listing
  async createListing(data: CreateListingData): Promise<ApiResponse<{ listingId: string }>> {
    return this.request('POST', '/marketplace/listings', data);
  }

  // Update listing
  async updateListing(id: string, data: Partial<CreateListingData>): Promise<ApiResponse<NFTListing>> {
    return this.request('PUT', `/marketplace/listings/${id}`, data);
  }

  // Cancel listing
  async cancelListing(data: { listingId: string }): Promise<ApiResponse<void>> {
    return this.request('DELETE', `/marketplace/listings/${data.listingId}`);
  }

  // Buy NFT
  async buyNFT(data: BuyNFTData): Promise<ApiResponse<{ transactionHash: string }>> {
    return this.request('POST', `/marketplace/buy`, data);
  }

  // Make offer
  async makeOffer(data: MakeOfferData): Promise<ApiResponse<{ offerId: string }>> {
    return this.request('POST', `/marketplace/offers`, data);
  }

  // Accept offer
  async acceptOffer(offerId: string): Promise<ApiResponse<{ transactionHash: string }>> {
    return this.request('POST', `/marketplace/offers/${offerId}/accept`);
  }

  // Reject offer
  async rejectOffer(offerId: string): Promise<ApiResponse<void>> {
    return this.request('POST', `/marketplace/offers/${offerId}/reject`);
  }

  // Cancel offer
  async cancelOffer(offerId: string): Promise<ApiResponse<void>> {
    return this.request('DELETE', `/marketplace/offers/${offerId}`);
  }

  // Get user's listings
  async getMyListings(): Promise<ApiResponse<NFTListing[]>> {
    return this.request('GET', '/marketplace/my-listings');
  }

  // Get user's offers
  async getMyOffers(): Promise<ApiResponse<MarketplaceOffer[]>> {
    return this.request('GET', '/marketplace/my-offers');
  }

  // Get marketplace statistics
  async getStats(): Promise<ApiResponse<MarketplaceStats>> {
    return this.request('GET', '/marketplace/stats');
  }

  // Get recent trades
  async getRecentTrades(): Promise<ApiResponse<RecentTrade[]>> {
    return this.request('GET', '/marketplace/recent-trades');
  }

  // Search listings
  async searchListings(query: string): Promise<ApiResponse<NFTListing[]>> {
    return this.request('GET', `/marketplace/search?q=${encodeURIComponent(query)}`);
  }

  // Get user's portfolio NFTs (for listing)
  async getPortfolioNFTs(): Promise<ApiResponse<NFTListing[]>> {
    return this.request('GET', '/user/nfts');
  }

  // Get floor prices
  async getFloorPrices(): Promise<ApiResponse<Record<string, number>>> {
    return this.request('GET', '/marketplace/floor-prices');
  }
}

export const marketplaceService = new MarketplaceService();
