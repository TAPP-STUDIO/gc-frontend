import axios, { AxiosInstance, AxiosError } from 'axios';
import { ApiResponse } from './api.service';
import { authService } from './auth.service';
import { apiConfig } from '@/config/cognito';

// TypeScript interfaces matching backend types
export interface NFTBalance {
  address: string;
  totalNFTs: number;
  gcCards: number;
  ethCards: number;
  btcCards: number;
  isPremium: boolean;
  premiumTier: string;
}

export interface DistributionInfo {
  distributionId: number;
  totalAmount: string;
  totalNFTs: number;
  perNFTAmount: string;
  description?: string;
  timestamp?: number;
}

export interface NFTMintResult {
  success: boolean;
  tokenId?: number;
  txHash?: string;
  recipient?: string;
  cardType?: number;
  uri?: string;
  error?: string;
}

export interface DistributionResult {
  success: boolean;
  distributionId?: number;
  amount?: string;
  txHash?: string;
  description?: string;
  error?: string;
}

export interface ContractAddresses {
  gcCards: string;
  distributor: string;
  usdt: string;
}

// New interfaces for collection management
export interface NFTCollection {
  _id: string;
  collectionName: string;
  symbol: string;
  contractType: 'GC_CARD' | 'BTC_BOT' | 'ALGO_TRADER' | 'VC_NFT';
  contractAddress: string;
  totalValueUSD: number;
  cardCount: number;
  pricePerCard: number;
  totalMinted: number;
  maxSupply: number;
  floorPrice: number;
  volume24h: number;
  isActive: boolean;
  status: 'active' | 'presale' | 'paused' | 'ended';
  mintPrice: number;
  publicSaleDate: string;
  description: string;
  features: string[];
  royalties: number;
  allowManualPriceUpdates: boolean;
  lastManualUpdate?: string;
  lastManualUpdateBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NFTCollectionHistory {
  _id: string;
  collectionId: string;
  collectionName: string;
  contractType: string;
  totalValueUSD: number;
  pricePerCard: number;
  cardCount: number;
  timestamp: string;
  reason: string;
  changeType: 'manual_update' | 'automatic_sync' | 'admin_correction' | 'initial_value';
  updatedBy?: string;
  valueChange?: number;
  percentageChange?: number;
  createdAt: string;
}

export interface UpdateCollectionValueRequest {
  totalValueUSD: number;
  reason?: string;
}

export interface CollectionHistoryResponse {
  collection: {
    id: string;
    name: string;
    symbol: string;
    currentValue: number;
    currentPricePerCard: number;
  };
  history: NFTCollectionHistory[];
  analytics: any;
  period: {
    days: number;
    from: string;
    to: string;
  };
}

export interface NFTHealthCheck {
  success: boolean;
  details?: {
    blockNumber: number;
    walletBalance: string;
    walletAddress: string;
    totalNFTs: string;
    contracts: ContractAddresses;
  };
  error?: string;
}

export interface NFTStats {
  totalNFTs: number;
  currentDistribution: DistributionInfo;
  contracts: ContractAddresses;
  lastUpdated: string;
}

export interface MintNFTRequest {
  to: string;
  uri: string;
  cardType: number; // 0 = GC, 1 = ETH, 2 = BTC
}

export interface BatchMintRequest {
  recipients: MintNFTRequest[];
}

export interface DistributeDividendsRequest {
  amount: string;
  description?: string;
}

export interface NFTProject {
  id: string;
  name: string;
  symbol: string;
  cardType: number;
  contractAddress: string;
  totalMinted: number;
  maxSupply: number;
  floorPrice: number;
  volume24h: number;
  holders: number;
  royalties: number;
  status: 'active' | 'presale' | 'paused';
  lastMint: string;
  revenue: number;
  description: string;
  features: string[];
  mintPrice: number;
  publicSaleDate: string;
  // New fields from MongoDB collections
  totalValueUSD?: number;
  pricePerCard?: number;
  cardCount?: number;
  lastManualUpdate?: string;
  lastManualUpdateBy?: string;
}

export interface NFTProjectsResponse {
  projects: NFTProject[];
  overview: {
    totalNFTs: number;
    totalProjects: number;
    activeProjects: number;
    totalRevenue: number;
    totalValueUSD?: number; // New field
    currentDistribution: DistributionInfo;
    contracts: ContractAddresses;
    lastUpdated: string;
  };
}

class NFTService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: `${apiConfig.baseURL}/admin/nft`,
      timeout: apiConfig.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const tokens = authService.getStoredTokens();
        console.log('🔑 NFT Service - Getting tokens:', tokens ? 'Found tokens' : 'No tokens found');
        if (tokens?.idToken) {
          console.log('🔑 NFT Service - Adding auth headers');
          config.headers['Authorization'] = `Bearer ${tokens.idToken}`;
          config.headers['x-id-token'] = tokens.idToken;
        } else {
          console.log('❌ NFT Service - No idToken available');
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle token refresh
    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as typeof error.config & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Try to refresh token
            const newTokens = await authService.refreshToken();
            if (newTokens) {
              // Retry original request with new token
              originalRequest.headers['Authorization'] = `Bearer ${newTokens.idToken}`;
              originalRequest.headers['x-id-token'] = newTokens.idToken;
              return this.api(originalRequest);
            }
          } catch {
            // Refresh failed, redirect to login
            authService.signOut();
            if (typeof window !== 'undefined') {
              window.location.href = '/admin/login';
            }
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    data?: any
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.api({
        method,
        url: endpoint,
        data
      });
      
      return response.data;
    } catch (error) {
      console.error('NFT Service request error:', error);
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

  /**
   * Delete history record
   */
  async deleteHistoryRecord(
    collectionId: string,
    historyId: string
  ): Promise<ApiResponse<{ message: string }>> {
    return this.request('DELETE', `/collections/${collectionId}/history/${historyId}`);
  }

  /**
   * Update history record
   */
  async updateHistoryRecord(
    collectionId: string,
    historyId: string,
    data: Partial<{
      totalValueUSD: number;
      reason: string;
      changeType: 'manual_update' | 'automatic_sync' | 'admin_correction' | 'initial_value';
    }>
  ): Promise<ApiResponse<{
    historyRecord: {
      id: string;
      totalValueUSD: number;
      pricePerCard: number;
      reason: string;
      changeType: string;
      timestamp: string;
      updatedBy: string;
      updatedAt: string;
    };
  }>> {
    return this.request('PUT', `/collections/${collectionId}/history/${historyId}`, data);
  }

  /**
   * Update project/collection details
   */
  async updateProject(
    projectId: string,
    data: Partial<{
      collectionName: string;
      symbol: string;
      totalValueUSD: number;
      cardCount: number;
      floorPrice: number;
      volume24h: number;
      mintPrice: number;
      royalties: number;
      description: string;
      features: string[];
      status: 'active' | 'presale' | 'paused';
      reason: string;
    }>
  ): Promise<ApiResponse<{
    project: {
      id: string;
      name: string;
      symbol: string;
      totalValueUSD: number;
      pricePerCard: number;
      cardCount: number;
      lastUpdate: string;
      updatedBy: string;
    };
    updatedFields: string[];
  }>> {
    return this.request('PUT', `/projects/${projectId}`, data);
  }

  /**
   * Get NFT projects overview with individual stats
   */
  async getProjects(): Promise<ApiResponse<NFTProjectsResponse>> {
    // Add cache buster to ensure fresh data
    const cacheBuster = `?t=${Date.now()}&refresh=true`;
    return this.request('GET', `/projects${cacheBuster}`);
  }

  /**
   * Health check - test NFT service connectivity
   */
  async healthCheck(): Promise<ApiResponse<NFTHealthCheck>> {
    const cacheBuster = `?t=${Date.now()}`;
    return this.request('GET', `/health${cacheBuster}`);
  }

  /**
   * Get NFT statistics for dashboard
   */
  async getStats(): Promise<ApiResponse<NFTStats>> {
    return this.request('GET', '/stats');
  }

  /**
   * Get NFT balance for specific address
   */
  async getBalance(address: string): Promise<ApiResponse<NFTBalance>> {
    return this.request('GET', `/balance/${address}`);
  }

  /**
   * Get current distribution information
   */
  async getDistribution(): Promise<ApiResponse<DistributionInfo>> {
    return this.request('GET', '/distribution');
  }

  /**
   * Mint single NFT
   */
  async mintNFT(data: MintNFTRequest): Promise<ApiResponse<NFTMintResult>> {
    return this.request('POST', '/mint', data);
  }

  /**
   * Batch mint NFTs (max 10 at once)
   */
  async batchMint(data: BatchMintRequest): Promise<ApiResponse<{
    summary: {
      total: number;
      successful: number;
      failed: number;
    };
    results: Array<{
      recipient: string;
      cardType: number;
      success: boolean;
      tokenId?: number;
      txHash?: string;
      error?: string;
    }>;
  }>> {
    return this.request('POST', '/batch-mint', data);
  }

  /**
   * Distribute dividends to NFT holders
   */
  async distributeDividends(data: DistributeDividendsRequest): Promise<ApiResponse<DistributionResult>> {
    return this.request('POST', '/distribute', data);
  }

  /**
   * Get contract addresses
   */
  async getContracts(): Promise<ApiResponse<ContractAddresses>> {
    return this.request('GET', '/contracts');
  }

  // ===== COLLECTION MANAGEMENT METHODS =====

  /**
   * Get all NFT collections
   */
  async getCollections(): Promise<ApiResponse<NFTCollection[]>> {
    return this.request('GET', '/collections');
  }

  /**
   * Get single collection details
   */
  async getCollection(id: string): Promise<ApiResponse<{
    collection: NFTCollection;
    recentHistory: NFTCollectionHistory[];
  }>> {
    return this.request('GET', `/collections/${id}`);
  }

  /**
   * Update collection total value
   */
  async updateCollectionValue(
    id: string, 
    data: UpdateCollectionValueRequest
  ): Promise<ApiResponse<{
    collection: {
      id: string;
      name: string;
      symbol: string;
      previousValue: number;
      newValue: number;
      newPricePerCard: number;
      lastUpdate: string;
      updatedBy: string;
    };
  }>> {
    return this.request('PUT', `/collections/${id}/value`, data);
  }

  /**
   * Get collection price history and analytics
   */
  async getCollectionHistory(
    id: string, 
    days: number = 30, 
    changeType?: string
  ): Promise<ApiResponse<CollectionHistoryResponse>> {
    const params = new URLSearchParams();
    params.append('days', days.toString());
    if (changeType) params.append('changeType', changeType);
    
    return this.request('GET', `/collections/${id}/history?${params.toString()}`);
  }

  /**
   * Helper method to format card type
   */
  static getCardTypeName(cardType: number): string {
    switch (cardType) {
      case 0: return 'GC Card';
      case 1: return 'ETH Card';
      case 2: return 'BTC Card';
      default: return 'Unknown';
    }
  }

  /**
   * Helper method to get card type color
   */
  static getCardTypeColor(cardType: number): string {
    switch (cardType) {
      case 0: return 'from-yellow-500 to-yellow-600'; // GC
      case 1: return 'from-blue-500 to-blue-600';     // ETH
      case 2: return 'from-orange-500 to-orange-600'; // BTC
      default: return 'from-gray-500 to-gray-600';
    }
  }
}

export const nftService = new NFTService();
