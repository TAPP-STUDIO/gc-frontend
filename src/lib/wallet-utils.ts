import { SupportedChainIds, ChainConfig, WalletConnection } from '@/types/web3';

// Chain Configurations
export const CHAIN_CONFIGS: Record<number, ChainConfig> = {
  [SupportedChainIds.ETHEREUM_MAINNET]: {
    chainId: 1,
    chainName: 'Ethereum Mainnet',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://mainnet.infura.io/v3/'],
    blockExplorerUrls: ['https://etherscan.io'],
  },
  [SupportedChainIds.POLYGON]: {
    chainId: 137,
    chainName: 'Polygon',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://polygon-rpc.com/'],
    blockExplorerUrls: ['https://polygonscan.com'],
  },
  [SupportedChainIds.BSC]: {
    chainId: 56,
    chainName: 'Binance Smart Chain',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: ['https://bscscan.com'],
  },
};

// Wallet Detection
export const detectWalletProvider = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  if (window.ethereum) {
    if (window.ethereum.isMetaMask) {
      return 'MetaMask';
    }
    if (window.ethereum.isCoinbaseWallet) {
      return 'Coinbase Wallet';
    }
    return 'Unknown';
  }

  return null;
};

// Check if wallet is installed
export const isWalletInstalled = (walletName: string): boolean => {
  if (typeof window === 'undefined') return false;

  switch (walletName) {
    case 'MetaMask':
      return !!(window.ethereum && window.ethereum.isMetaMask);
    case 'Coinbase Wallet':
      return !!(window.ethereum && window.ethereum.isCoinbaseWallet);
    default:
      return !!window.ethereum;
  }
};

// Format wallet address
export const formatAddress = (address: string, chars = 4): string => {
  if (!address) return '';
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
};

// Format balance
export const formatBalance = (balance: string, decimals = 18): string => {
  try {
    const balanceInEth = parseInt(balance, 16) / Math.pow(10, decimals);
    return balanceInEth.toFixed(4);
  } catch {
    return '0.0000';
  }
};

// Get chain name
export const getChainName = (chainId: number): string => {
  const config = CHAIN_CONFIGS[chainId];
  return config ? config.chainName : `Unknown Network (${chainId})`;
};

// Get native currency symbol
export const getNativeCurrencySymbol = (chainId: number): string => {
  const config = CHAIN_CONFIGS[chainId];
  return config ? config.nativeCurrency.symbol : 'ETH';
};

// Switch or add network
export const switchToNetwork = async (chainId: number): Promise<void> => {
  if (!window.ethereum) {
    throw new Error('No wallet provider found');
  }

  const chainIdHex = `0x${chainId.toString(16)}`;

  try {
    // Try to switch to the network
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainIdHex }],
    });
  } catch (switchError: unknown) {
    // If network doesn't exist, add it
    const error = switchError as { code?: number };
    if (error.code === 4902) {
      const config = CHAIN_CONFIGS[chainId];
      if (!config) {
        throw new Error(`Unsupported network: ${chainId}`);
      }

      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: chainIdHex,
            chainName: config.chainName,
            nativeCurrency: config.nativeCurrency,
            rpcUrls: config.rpcUrls,
            blockExplorerUrls: config.blockExplorerUrls,
          },
        ],
      });
    } else {
      throw switchError;
    }
  }
};

// Connect to MetaMask
export const connectMetaMask = async (): Promise<WalletConnection> => {
  if (!window.ethereum || !window.ethereum.isMetaMask) {
    throw new Error('MetaMask není nainstalován. Nainstalujte si ho z metamask.io');
  }

  try {
    // Request account access
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    }) as string[];

    if (accounts.length === 0) {
      throw new Error('Žádný účet nebyl vybrán');
    }

    // Get chain ID
    const chainId = await window.ethereum.request({ method: 'eth_chainId' }) as string;
    const chainIdNumber = parseInt(chainId, 16);

    // Get balance
    const balance = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [accounts[0], 'latest'],
    }) as string;

    const formattedBalance = formatBalance(balance);
    const currencySymbol = getNativeCurrencySymbol(chainIdNumber);

    return {
      address: accounts[0],
      chainId: chainIdNumber,
      balance: `${formattedBalance} ${currencySymbol}`,
      provider: window.ethereum,
    };
  } catch (connectionError: unknown) {
    const error = connectionError as Error;
    console.error('MetaMask connection error:', error);
    throw new Error(error.message || 'Připojení se nezdařilo');
  }
};

// Connect to Coinbase Wallet
export const connectCoinbaseWallet = async (): Promise<WalletConnection> => {
  if (!window.ethereum || !window.ethereum.isCoinbaseWallet) {
    throw new Error('Coinbase Wallet není nainstalován');
  }

  try {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    }) as string[];

    if (accounts.length === 0) {
      throw new Error('Žádný účet nebyl vybrán');
    }

    const chainId = await window.ethereum.request({ method: 'eth_chainId' }) as string;
    const chainIdNumber = parseInt(chainId, 16);

    const balance = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [accounts[0], 'latest'],
    }) as string;

    const formattedBalance = formatBalance(balance);
    const currencySymbol = getNativeCurrencySymbol(chainIdNumber);

    return {
      address: accounts[0],
      chainId: chainIdNumber,
      balance: `${formattedBalance} ${currencySymbol}`,
      provider: window.ethereum,
    };
  } catch (connectionError: unknown) {
    const error = connectionError as Error;
    console.error('Coinbase Wallet connection error:', error);
    throw new Error(error.message || 'Připojení se nezdařilo');
  }
};

// Check existing connection
export const checkExistingConnection = async (): Promise<WalletConnection | null> => {
  if (!window.ethereum) {
    return null;
  }

  try {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' }) as string[];
    if (accounts.length === 0) {
      return null;
    }

    const chainId = await window.ethereum.request({ method: 'eth_chainId' }) as string;
    const chainIdNumber = parseInt(chainId, 16);

    const balance = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [accounts[0], 'latest'],
    }) as string;

    const formattedBalance = formatBalance(balance);
    const currencySymbol = getNativeCurrencySymbol(chainIdNumber);

    return {
      address: accounts[0],
      chainId: chainIdNumber,
      balance: `${formattedBalance} ${currencySymbol}`,
      provider: window.ethereum,
    };
  } catch (error) {
    console.error('Error checking existing connection:', error);
    return null;
  }
};

// Listen to account changes - OPRAVENÉ TYPOVÁNÍ
export const listenToAccountChanges = (callback: (accounts: string[]) => void) => {
  if (window.ethereum?.on) {
    window.ethereum.on('accountsChanged', (...args: unknown[]) => {
      // Type guard to ensure first argument is string[]
      const accounts = args[0] as string[];
      callback(accounts);
    });
  }
};

// Listen to network changes - OPRAVENÉ TYPOVÁNÍ
export const listenToNetworkChanges = (callback: (chainId: string) => void) => {
  if (window.ethereum?.on) {
    window.ethereum.on('chainChanged', (...args: unknown[]) => {
      // Type guard to ensure first argument is string
      const chainId = args[0] as string;
      callback(chainId);
    });
  }
};

// Clean up listeners
export const cleanupListeners = () => {
  if (window.ethereum?.removeListener) {
    window.ethereum.removeListener('accountsChanged', () => {});
    window.ethereum.removeListener('chainChanged', () => {});
  }
};

// Wallet installation URLs
export const WALLET_URLS = {
  MetaMask: 'https://metamask.io',
  'Coinbase Wallet': 'https://www.coinbase.com/wallet',
  WalletConnect: 'https://walletconnect.com/explorer',
} as const;