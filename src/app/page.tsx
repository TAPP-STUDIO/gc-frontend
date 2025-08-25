'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  connectMetaMask, 
  connectCoinbaseWallet,
  checkExistingConnection,
  formatAddress,
  getChainName,
  isWalletInstalled,
  listenToAccountChanges,
  listenToNetworkChanges,
  cleanupListeners,
  WALLET_URLS
} from '@/lib/wallet-utils';
import { WalletConnection } from '@/types/web3';

interface WalletOption {
  name: string;
  logo: React.ReactNode;
  description: string;
  action: () => Promise<void>;
  installed: boolean;
}

// MetaMask Logo Component
const MetaMaskLogo = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path d="M30.04 6.4L18.24 15.2L20.48 9.6L30.04 6.4Z" fill="#E17726"/>
    <path d="M1.96 6.4L11.44 9.64L9.52 15.2L1.96 6.4Z" fill="#E27625"/>
    <path d="M25.6 23.16L22.88 27.16L29.24 28.92L31.08 23.28L25.6 23.16Z" fill="#E27625"/>
    <path d="M0.96 23.28L2.8 28.92L9.12 27.16L6.4 23.16L0.96 23.28Z" fill="#E27625"/>
    <path d="M8.8 13.88L7.08 16.68L13.36 16.96L13.12 10.12L8.8 13.88Z" fill="#E27625"/>
    <path d="M23.2 13.88L18.8 9.96L18.64 16.96L24.92 16.68L23.2 13.88Z" fill="#E27625"/>
    <path d="M9.12 27.16L12.52 25.52L9.6 23.32L9.12 27.16Z" fill="#D5BFB2"/>
    <path d="M19.48 25.52L22.88 27.16L22.4 23.32L19.48 25.52Z" fill="#D5BFB2"/>
    <path d="M22.88 27.16L19.48 25.52L19.76 28.04L19.72 28.84L22.88 27.16Z" fill="#233447"/>
    <path d="M9.12 27.16L12.28 28.84L12.24 28.04L12.52 25.52L9.12 27.16Z" fill="#233447"/>
    <path d="M12.36 21.16L9.52 20.32L11.52 19.4L12.36 21.16Z" fill="#CC6228"/>
    <path d="M19.64 21.16L20.48 19.4L22.52 20.32L19.64 21.16Z" fill="#CC6228"/>
    <path d="M9.12 27.16L9.64 23.16L6.4 23.28L9.12 27.16Z" fill="#E27625"/>
    <path d="M22.36 23.16L22.88 27.16L25.6 23.28L22.36 23.16Z" fill="#E27625"/>
    <path d="M24.92 16.68L18.64 16.96L19.68 21.16L20.52 19.4L22.56 20.32L24.92 16.68Z" fill="#E27625"/>
    <path d="M9.52 20.32L11.56 19.4L12.4 21.16L13.36 16.96L7.08 16.68L9.52 20.32Z" fill="#E27625"/>
  </svg>
);

// Coinbase Wallet Logo Component
const CoinbaseLogo = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="16" fill="#0052FF"/>
    <path d="M16 4C22.627 4 28 9.373 28 16C28 22.627 22.627 28 16 28C9.373 28 4 22.627 4 16C4 9.373 9.373 4 16 4ZM16 11.2C13.348 11.2 11.2 13.348 11.2 16C11.2 18.652 13.348 20.8 16 20.8C18.652 20.8 20.8 18.652 20.8 16C20.8 13.348 18.652 11.2 16 11.2Z" fill="white"/>
  </svg>
);

// WalletConnect Logo Component
const WalletConnectLogo = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="16" fill="#3B99FC"/>
    <path d="M9.6 12.8C13.067 9.333 18.933 9.333 22.4 12.8L22.933 13.333C23.067 13.467 23.067 13.667 22.933 13.8L21.6 15.133C21.533 15.2 21.4 15.2 21.333 15.133L20.533 14.333C18.267 12.067 14.533 12.067 12.267 14.333L11.4 15.2C11.333 15.267 11.2 15.267 11.133 15.2L9.8 13.867C9.667 13.733 9.667 13.533 9.8 13.4L9.6 12.8ZM25.467 15.8L26.667 17C26.8 17.133 26.8 17.333 26.667 17.467L20.8 23.333C20.667 23.467 20.467 23.467 20.333 23.333L16.133 19.133C16.067 19.067 15.933 19.067 15.867 19.133L11.667 23.333C11.533 23.467 11.333 23.467 11.2 23.333L5.333 17.467C5.2 17.333 5.2 17.133 5.333 17L6.533 15.8C6.667 15.667 6.867 15.667 7 15.8L11.2 20C11.267 20.067 11.4 20.067 11.467 20L15.667 15.8C15.8 15.667 16 15.667 16.133 15.8L20.333 20C20.4 20.067 20.533 20.067 20.6 20L24.8 15.8C24.933 15.667 25.133 15.667 25.267 15.8H25.467Z" fill="white"/>
  </svg>
);

export default function Home() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<WalletConnection | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const router = useRouter();

  // Check existing connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      const connection = await checkExistingConnection();
      if (connection) {
        setConnectedWallet(connection);
      }
    };

    checkConnection();

    // Setup listeners for account and network changes
    listenToAccountChanges((accounts) => {
      if (accounts.length === 0) {
        setConnectedWallet(null);
      } else {
        // Refresh connection info
        checkConnection();
      }
    });

    listenToNetworkChanges(() => {
      // Refresh connection info when network changes
      checkConnection();
    });

    // Cleanup listeners on unmount
    return () => {
      cleanupListeners();
    };
  }, []);

  // Wallet connection handlers
  const handleMetaMaskConnect = async () => {
    try {
      const connection = await connectMetaMask();
      setConnectedWallet(connection);
      setTimeout(() => router.push('/dashboard'), 2000);
    } catch (connectionError: unknown) {
      const error = connectionError as Error;
      throw new Error(error.message);
    }
  };

  const handleCoinbaseConnect = async () => {
    try {
      const connection = await connectCoinbaseWallet();
      setConnectedWallet(connection);
      setTimeout(() => router.push('/dashboard'), 2000);
    } catch (connectionError: unknown) {
      const error = connectionError as Error;
      throw new Error(error.message);
    }
  };

  const handleWalletConnectConnect = async () => {
    // WalletConnect would require additional setup
    throw new Error('WalletConnect integration vyžaduje dodatečnou instalaci balíčků');
  };

  // Wallet options configuration
  const walletOptions: WalletOption[] = [
    {
      name: 'MetaMask',
      logo: <MetaMaskLogo size={32} />,
      description: 'Nejpopulárnější browser wallet',
      action: handleMetaMaskConnect,
      installed: isWalletInstalled('MetaMask'),
    },
    {
      name: 'Coinbase Wallet',
      logo: <CoinbaseLogo size={32} />,
      description: 'Oficiální Coinbase wallet',
      action: handleCoinbaseConnect,
      installed: isWalletInstalled('Coinbase Wallet'),
    },
    {
      name: 'WalletConnect',
      logo: <WalletConnectLogo size={32} />,
      description: 'Připojte libovolnou mobile wallet',
      action: handleWalletConnectConnect,
      installed: true, // WalletConnect doesn't require installation
    },
  ];

  // Generic wallet connection handler
  const handleWalletConnect = async (wallet: WalletOption) => {
    if (!wallet.installed && wallet.name !== 'WalletConnect') {
      window.open(WALLET_URLS[wallet.name as keyof typeof WALLET_URLS], '_blank');
      return;
    }

    setIsConnecting(true);
    setError(null);
    setSelectedWallet(wallet.name);

    try {
      await wallet.action();
    } catch (connectionError: unknown) {
      const error = connectionError as Error;
      console.error(`${wallet.name} connection error:`, error);
      setError(error.message || 'Připojení se nezdařilo');
    } finally {
      setIsConnecting(false);
      setSelectedWallet(null);
    }
  };

  const disconnect = () => {
    setConnectedWallet(null);
    setError(null);
  };

  // Connected State UI
  if (connectedWallet) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] animated-bg flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto px-6">
          <div className="bg-[#151515] rounded-2xl p-8 border border-[#333333] shadow-2xl">
            {/* Success Icon */}
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <polyline points="20,6 9,17 4,12"></polyline>
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-4">
              Wallet úspěšně připojen!
            </h1>
            
            {/* Connection Details */}
            <div className="space-y-3 mb-6 bg-[#1a1a1a] rounded-lg p-4">
              <div className="flex justify-between text-sm">
                <span className="text-[#666666]">Adresa:</span>
                <span className="text-[#F9D523] font-mono">{formatAddress(connectedWallet.address)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#666666]">Síť:</span>
                <span className="text-white">{getChainName(connectedWallet.chainId)}</span>
              </div>
              {connectedWallet.balance && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#666666]">Zůstatek:</span>
                  <span className="text-white">{connectedWallet.balance}</span>
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => router.push('/dashboard')}
                className="w-full bg-[#F9D523] hover:bg-[#e3c320] text-[#151515] font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Přejít na Dashboard
              </button>
              
              <button
                onClick={disconnect}
                className="w-full bg-transparent border border-[#333333] text-[#666666] hover:border-[#F9D523] hover:text-[#F9D523] py-2 px-4 rounded-lg transition-all duration-300"
              >
                Odpojit wallet
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Landing Page UI
  return (
    <div className="min-h-screen bg-[#0a0a0a] animated-bg flex items-center justify-center">
      <div className="text-center max-w-lg mx-auto px-6">
        <div className="bg-[#151515] rounded-2xl p-8 border border-[#333333] shadow-2xl">
          {/* Logo */}
          <div className="mb-8">
            <Image
              src="/logos/logo.svg"
              alt="Gavlik Capital Logo"
              width={120}
              height={72}
              className="mx-auto"
              priority
            />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Gavlik Capital Portfolio
          </h1>
          
          <p className="text-[#666666] mb-8 text-lg">
            Připojte svou crypto walletku pro přístup k dashboardu
          </p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-400">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="15" y1="9" x2="9" y2="15"/>
                  <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Wallet Options - S ORIGINÁLNÍMI LOGY */}
          <div className="space-y-3 mb-6">
            {walletOptions.map((wallet) => (
              <button
                key={wallet.name}
                onClick={() => handleWalletConnect(wallet)}
                disabled={isConnecting}
                className={`w-full relative bg-[#1a1a1a] hover:bg-[#222222] disabled:bg-[#0f0f0f] border border-[#333333] hover:border-[#F9D523] disabled:border-[#222222] text-white disabled:text-[#666666] p-4 rounded-xl transition-all duration-300 flex items-center space-x-4 ${
                  selectedWallet === wallet.name ? 'border-[#F9D523] bg-[#F9D523]/10' : ''
                }`}
              >
                {/* Wallet Logo - originální místo emoji */}
                <div className="flex-shrink-0">{wallet.logo}</div>
                
                {/* Wallet Info */}
                <div className="flex-1 text-left">
                  <div className="font-medium flex items-center space-x-2">
                    <span>{wallet.name}</span>
                    {wallet.installed ? (
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                        Nainstalováno
                      </span>
                    ) : wallet.name !== 'WalletConnect' ? (
                      <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full">
                        Nainstalovat
                      </span>
                    ) : null}
                  </div>
                  <div className="text-sm text-[#666666]">{wallet.description}</div>
                </div>
                
                {/* Loading Spinner */}
                {isConnecting && selectedWallet === wallet.name ? (
                  <div className="animate-spin w-5 h-5 border-2 border-[#F9D523] border-t-transparent rounded-full"></div>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#666666]">
                    <polyline points="9,18 15,12 9,6"></polyline>
                  </svg>
                )}
              </button>
            ))}
          </div>

          {/* Connection Status */}
          {isConnecting && (
            <div className="flex items-center justify-center space-x-2 text-[#666666] mb-6">
              <div className="animate-spin w-4 h-4 border-2 border-[#F9D523] border-t-transparent rounded-full"></div>
              <span>Připojování k {selectedWallet}...</span>
            </div>
          )}

          {/* Help Section */}
          <div className="text-center mb-6">
            <details className="text-left">
              <summary className="text-[#666666] text-sm cursor-pointer hover:text-[#F9D523] transition-colors">
                💡 Nemáte crypto wallet?
              </summary>
              <div className="mt-4 p-4 bg-[#1a1a1a] rounded-lg">
                <p className="text-[#666666] text-xs mb-3">
                  Doporučujeme začít s MetaMask - je zdarma a jednoduchý na použití:
                </p>
                <ol className="text-[#666666] text-xs space-y-1 list-decimal list-inside">
                  <li>Navštivte <a href="https://metamask.io" target="_blank" rel="noopener noreferrer" className="text-[#F9D523] hover:underline">metamask.io</a></li>
                  <li>Stáhněte a nainstalujte rozšíření</li>
                  <li>Vytvořte si novou peněženku</li>
                  <li>Vraťte se sem a připojte se</li>
                </ol>
              </div>
            </details>
          </div>

          {/* Development Fallback */}
          <div className="pt-6 border-t border-[#333333]">
            <p className="text-[#666666] text-sm mb-4">Development Mode:</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/dashboard"
                className="flex-1 bg-transparent border border-[#F9D523] text-[#F9D523] hover:bg-[#F9D523] hover:text-[#151515] font-medium py-2 px-4 rounded-lg transition-all duration-300 text-center"
              >
                User Dashboard
              </Link>
              <Link
                href="/admin"
                className="flex-1 bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 text-center"
              >
                🔑 Admin Panel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}