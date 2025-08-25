// CoinGecko API service pro real-time crypto ceny
// Dokumentace: https://www.coingecko.com/en/api/documentation

interface CoinGeckoPriceResponse {
  [key: string]: {
    [currency: string]: number;
  };
}

interface CoinGeckoCoinsListResponse {
  id: string;
  symbol: string;
  name: string;
}

interface PriceData {
  symbol: string;
  price: number;
  currency: string;
  timestamp: number;
}

interface CachedPrice {
  price: number;
  timestamp: number;
}

class CoinGeckoAPI {
  private baseURL = 'https://api.coingecko.com/api/v3';
  private cache = new Map<string, CachedPrice>();
  private cacheTimeout = 60000; // 1 minuta cache

  // Symbol mapping pro CoinGecko IDs
  private symbolToIdMap: { [symbol: string]: string } = {
    'BTC': 'bitcoin',
    'ETH': 'ethereum',
    'ADA': 'cardano',
    'DOT': 'polkadot',
    'AVAX': 'avalanche-2',
    'SOL': 'solana',
    'MATIC': 'matic-network',
    'LINK': 'chainlink',
    'UNI': 'uniswap',
    'AAVE': 'aave',
    'COMP': 'compound-governance-token',
    'SUSHI': 'sushi',
    'CRV': 'curve-dao-token',
    'YFI': 'yearn-finance',
    'MKR': 'maker',
    'SNX': 'havven',
  };

  /**
   * Získá aktuální ceny pro zadané symboly
   */
  async getPrices(symbols: string[], currency: string = 'usd'): Promise<PriceData[]> {
    try {
      const validSymbols = symbols.filter(symbol => this.symbolToIdMap[symbol.toLowerCase()]);
      
      if (validSymbols.length === 0) {
        throw new Error('Žádné validní crypto symboly');
      }

      // Check cache first
      const cachedPrices: PriceData[] = [];
      const uncachedSymbols: string[] = [];

      validSymbols.forEach(symbol => {
        const cacheKey = `${symbol.toLowerCase()}_${currency}`;
        const cached = this.cache.get(cacheKey);
        
        if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
          cachedPrices.push({
            symbol: symbol.toUpperCase(),
            price: cached.price,
            currency: currency.toUpperCase(),
            timestamp: cached.timestamp,
          });
        } else {
          uncachedSymbols.push(symbol);
        }
      });

      // Fetch uncached prices
      let fetchedPrices: PriceData[] = [];
      if (uncachedSymbols.length > 0) {
        const coinIds = uncachedSymbols
          .map(symbol => this.symbolToIdMap[symbol.toLowerCase()])
          .filter(Boolean);

        const response = await fetch(
          `${this.baseURL}/simple/price?ids=${coinIds.join(',')}&vs_currencies=${currency}&precision=2`,
          {
            headers: {
              'Accept': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`CoinGecko API error: ${response.status} ${response.statusText}`);
        }

        const data: CoinGeckoPriceResponse = await response.json();
        const timestamp = Date.now();

        fetchedPrices = Object.entries(data).map(([coinId, prices]) => {
          const symbol = this.getSymbolFromCoinId(coinId);
          const price = prices[currency.toLowerCase()];
          
          // Cache the price
          const cacheKey = `${symbol.toLowerCase()}_${currency}`;
          this.cache.set(cacheKey, { price, timestamp });

          return {
            symbol: symbol.toUpperCase(),
            price,
            currency: currency.toUpperCase(),
            timestamp,
          };
        });
      }

      return [...cachedPrices, ...fetchedPrices];
    } catch (error) {
      console.error('Error fetching prices from CoinGecko:', error);
      throw error;
    }
  }

  /**
   * Získá cenu pro jeden symbol
   */
  async getPrice(symbol: string, currency: string = 'usd'): Promise<PriceData | null> {
    try {
      const prices = await this.getPrices([symbol], currency);
      return prices.length > 0 ? prices[0] : null;
    } catch (error) {
      console.error(`Error fetching price for ${symbol}:`, error);
      return null;
    }
  }

  /**
   * Získá seznam všech dostupných coinů
   */
  async getCoinsList(): Promise<CoinGeckoCoinsListResponse[]> {
    try {
      const response = await fetch(`${this.baseURL}/coins/list`);
      
      if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching coins list:', error);
      throw error;
    }
  }

  /**
   * Ověří, zda je symbol validní
   */
  isValidSymbol(symbol: string): boolean {
    return !!this.symbolToIdMap[symbol.toLowerCase()];
  }

  /**
   * Získá podporované symboly
   */
  getSupportedSymbols(): string[] {
    return Object.keys(this.symbolToIdMap).map(s => s.toUpperCase());
  }

  /**
   * Vymaže cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Získá statistiky cache
   */
  getCacheStats(): { size: number; entries: string[] } {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.keys()),
    };
  }

  /**
   * Najde symbol podle coin ID
   */
  private getSymbolFromCoinId(coinId: string): string {
    const entry = Object.entries(this.symbolToIdMap).find(([, id]) => id === coinId);
    return entry ? entry[0] : coinId;
  }

  /**
   * Rate limiting helper
   */
  private async rateLimitedRequest(url: string, options?: RequestInit): Promise<Response> {
    // CoinGecko má limit 50 requestů za minutu pro free tier
    // Implementujeme simple delay
    await new Promise(resolve => setTimeout(resolve, 1200)); // 1.2s delay
    return fetch(url, options);
  }
}

// Export singleton instance
export const coinGeckoAPI = new CoinGeckoAPI();

// Helper functions pro komponenty
export async function fetchCryptoPrices(symbols: string[]): Promise<PriceData[]> {
  try {
    return await coinGeckoAPI.getPrices(symbols);
  } catch (error) {
    console.error('Failed to fetch crypto prices:', error);
    // Return mock data as fallback
    return symbols.map(symbol => ({
      symbol: symbol.toUpperCase(),
      price: Math.random() * 50000, // Mock price
      currency: 'USD',
      timestamp: Date.now(),
    }));
  }
}

export async function fetchCryptoPrice(symbol: string): Promise<number> {
  try {
    const priceData = await coinGeckoAPI.getPrice(symbol);
    return priceData?.price || 0;
  } catch (error) {
    console.error(`Failed to fetch price for ${symbol}:`, error);
    return 0;
  }
}

export function validateCryptoSymbol(symbol: string): boolean {
  return coinGeckoAPI.isValidSymbol(symbol);
}

export function getSupportedCryptoSymbols(): string[] {
  return coinGeckoAPI.getSupportedSymbols();
}

// Portfolio calculation helpers
export function calculatePortfolioValue(
  positions: Array<{ amount: number; currentPrice: number }>
): number {
  return positions.reduce((total, pos) => total + (pos.amount * pos.currentPrice), 0);
}

export function calculatePnL(
  amount: number,
  averageBuyPrice: number,
  currentPrice: number
): { pnl: number; pnlPercentage: number } {
  const totalCost = amount * averageBuyPrice;
  const currentValue = amount * currentPrice;
  const pnl = currentValue - totalCost;
  const pnlPercentage = totalCost > 0 ? (pnl / totalCost) * 100 : 0;

  return { pnl, pnlPercentage };
}

export default coinGeckoAPI;