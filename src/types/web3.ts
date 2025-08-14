// Web3 Type Definitions

// Request parameters type
export interface EthereumRequestParams {
  method: string;
  params?: unknown[];
}

// Extend Window interface for Ethereum provider
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      isCoinbaseWallet?: boolean;
      isConnected?: () => boolean;
      request: (args: EthereumRequestParams) => Promise<unknown>;
      on?: (event: string, callback: (...args: unknown[]) => void) => void;
      removeListener?: (event: string, callback: (...args: unknown[]) => void) => void;
      selectedAddress?: string;
      chainId?: string;
    };
    web3?: unknown;
  }
}

// Ethereum Provider Interface
export interface EthereumProvider {
  isMetaMask?: boolean;
  isCoinbaseWallet?: boolean;
  isConnected?: () => boolean;
  request(args: EthereumRequestParams): Promise<unknown>;
  on?: (event: string, callback: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, callback: (...args: unknown[]) => void) => void;
  selectedAddress?: string;
  chainId?: string;
}

// Wallet Connection Types
export interface WalletConnection {
  address: string;
  chainId: number;
  balance?: string;
  provider?: EthereumProvider;
}

// Supported Networks
export enum SupportedChainIds {
  ETHEREUM_MAINNET = 1,
  ETHEREUM_GOERLI = 5,
  POLYGON = 137,
  BSC = 56,
  ARBITRUM = 42161,
  OPTIMISM = 10,
}

// Chain Configuration
export interface ChainConfig {
  chainId: number;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
}

// Wallet Error Types
export interface WalletError extends Error {
  code?: number;
  data?: unknown;
}