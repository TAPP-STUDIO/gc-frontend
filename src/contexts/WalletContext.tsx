'use client'

import { createContext, useContext, useEffect, useState, ReactNode, useRef } from 'react'
import { PrivyProvider, usePrivy, useWallets } from '@privy-io/react-auth'
import { WagmiProvider } from '@privy-io/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { privyConfig, privyAppId, supportedChains } from '@/config/privy'
import type { Chain } from 'viem'
import { createConfig, http } from 'wagmi'
import { walletAuthService, WalletUser } from '@/services/walletAuth.service'
import { walletAuthLogger } from '@/services/logger.service'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

// Create wagmi config for Privy
const wagmiConfig = createConfig({
  chains: supportedChains as readonly [Chain, ...Chain[]],
  transports: {
    [supportedChains[0].id]: http(),
    [supportedChains[1].id]: http(),
    [supportedChains[2].id]: http(),
    [supportedChains[3].id]: http(),
    [supportedChains[4].id]: http(),
  },
})

// Create query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

// Loading states for better UX
export type LoadingState = 
  | 'idle' 
  | 'connecting-wallet' 
  | 'signing-message' 
  | 'authenticating' 
  | 'redirecting'
  | 'error'

interface WalletContextType {
  // Wallet state
  isConnected: boolean
  walletAddress: string | null
  chainId: number | null
  
  // User state
  user: WalletUser | null
  isAuthenticated: boolean
  isLoading: boolean
  loadingState: LoadingState
  
  // Actions
  connectWallet: () => Promise<void>
  disconnectWallet: () => Promise<void>
  updateProfile: (updates: Partial<WalletUser>) => Promise<void>
  
  // Privy specific
  login: () => void
  logout: () => Promise<void>
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

// Inner component that uses Privy hooks
function WalletProviderInner({ children }: { children: ReactNode }) {
  const { ready, authenticated, login, logout: privyLogout } = usePrivy()
  const { wallets } = useWallets()
  const router = useRouter()
  
  const [user, setUser] = useState<WalletUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingState, setLoadingState] = useState<LoadingState>('idle')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  // Use refs to track authentication state
  const isAuthenticatingRef = useRef(false)
  const isIntentionalDisconnectRef = useRef(false)
  const lastWalletAddressRef = useRef<string | null>(null)

  // Get primary wallet info
  const primaryWallet = wallets.find(w => w.walletClientType !== 'privy') || wallets[0]
  const walletAddress = primaryWallet?.address || null
  const chainId = primaryWallet?.chainId ? parseInt(primaryWallet.chainId) : null

  // Check for existing auth on mount
  useEffect(() => {
    if (!ready) return
    
    const checkAuth = () => {
      const storedUser = walletAuthService.getCurrentUser()
      const isAuth = walletAuthService.isAuthenticated()
      
      if (storedUser && isAuth && authenticated && walletAddress === storedUser.walletAddress) {
        setUser(storedUser)
        setIsAuthenticated(true)
        walletAuthLogger.info('Existing session restored', { 
          walletAddress: storedUser.walletAddress 
        })
      }
    }
    
    checkAuth()
  }, [ready, authenticated, walletAddress])

  // Auto-authenticate when Privy connects a wallet
  useEffect(() => {
    const autoAuthenticate = async () => {
      // Skip if:
      // - Not ready or not authenticated with Privy
      // - Already authenticated with our backend
      // - No wallet address available
      // - Already processing authentication
      // - User intentionally disconnected
      // - Same wallet already attempted (prevent duplicates)
      if (!ready || 
          !authenticated || 
          isAuthenticated || 
          !walletAddress || 
          !primaryWallet || 
          isAuthenticatingRef.current ||
          isIntentionalDisconnectRef.current ||
          lastWalletAddressRef.current === walletAddress) {
        return
      }

      // Mark this wallet as being processed
      isAuthenticatingRef.current = true
      lastWalletAddressRef.current = walletAddress
      setIsLoading(true)
      setLoadingState('connecting-wallet')

      try {
        walletAuthLogger.info('Starting automatic authentication', { 
          walletAddress,
          walletType: primaryWallet.walletClientType 
        })

        // Small delay to ensure wallet is fully ready and prevent race conditions
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Double-check we still should authenticate
        if (!authenticated || isIntentionalDisconnectRef.current) {
          walletAuthLogger.info('Authentication cancelled - wallet disconnected')
          return
        }
        
        setLoadingState('signing-message')
        
        // Create sign message function for Privy wallet
        const signMessageFunction = async (message: string): Promise<string> => {
          try {
            walletAuthLogger.info('Requesting signature', { walletAddress })
            const signature = await primaryWallet.sign(message)
            walletAuthLogger.info('Signature obtained successfully')
            return signature
          } catch (error) {
            walletAuthLogger.error('Signature rejected by user', error)
            throw new Error('Podpis byl odmítnut. Pro přihlášení je vyžadován souhlas.')
          }
        }
        
        setLoadingState('authenticating')
        
        const result = await walletAuthService.loginWithWallet(
          walletAddress, 
          signMessageFunction
        )
        
        setUser(result.user)
        setIsAuthenticated(true)
        
        walletAuthLogger.info('Authentication successful', {
          walletAddress,
          isNewUser: result.isNewUser,
          userId: result.user.id
        })
        
        // Show success message
        if (result.isNewUser) {
          toast.success('Vítejte v Gavlik Capital! Váš účet byl vytvořen.')
        } else {
          toast.success('Vítejte zpět!')
        }
        
        // Redirect to dashboard
        setLoadingState('redirecting')
        setTimeout(() => {
          router.push('/dashboard')
        }, 500)
        
      } catch (error: unknown) {
        setLoadingState('error')
        
        const errorMessage = error instanceof Error ? error.message : 'Přihlášení selhalo'
        
        walletAuthLogger.error('Authentication failed', {
          walletAddress,
          error: errorMessage,
          errorDetails: error
        })
        
        // Show error to user
        toast.error(errorMessage)
        
        // Mark as intentional disconnect to prevent re-auth attempts
        isIntentionalDisconnectRef.current = true
        
        // Disconnect Privy wallet on any error
        await privyLogout()
        
        // Reset states
        setUser(null)
        setIsAuthenticated(false)
        
        // Reset the intentional disconnect flag after a delay
        setTimeout(() => {
          isIntentionalDisconnectRef.current = false
        }, 2000)
        
      } finally {
        setIsLoading(false)
        setLoadingState('idle')
        isAuthenticatingRef.current = false
      }
    }

    autoAuthenticate()
  }, [ready, authenticated, isAuthenticated, walletAddress, primaryWallet, router, privyLogout])

  // Handle Privy disconnection
  useEffect(() => {
    if (!authenticated && isAuthenticated) {
      // Privy was disconnected, clear our auth
      handleDisconnect()
    }
  }, [authenticated, isAuthenticated])

  const connectWallet = async () => {
    if (isLoading) return
    
    walletAuthLogger.info('Manual wallet connection initiated')
    
    // Reset flags to allow connection
    isIntentionalDisconnectRef.current = false
    lastWalletAddressRef.current = null
    
    // Open Privy login modal
    login()
  }

  const disconnectWallet = async () => {
    walletAuthLogger.info('Wallet disconnection initiated', { walletAddress })
    
    // Mark as intentional disconnect
    isIntentionalDisconnectRef.current = true
    
    // Disconnect from our backend first
    await handleDisconnect()
    
    // Then disconnect from Privy
    await privyLogout()
    
    // Reset wallet tracking after a delay
    setTimeout(() => {
      lastWalletAddressRef.current = null
      isIntentionalDisconnectRef.current = false
    }, 2000)
  }
  
  const handleDisconnect = async () => {
    try {
      await walletAuthService.logout()
      setUser(null)
      setIsAuthenticated(false)
      walletAuthLogger.info('Wallet disconnected successfully')
    } catch (error) {
      walletAuthLogger.error('Logout error', error)
    }
  }

  const updateProfile = async (updates: Partial<WalletUser>) => {
    if (!user) throw new Error('No user logged in')
    
    try {
      walletAuthLogger.info('Updating user profile', { userId: user.id, updates })
      const updatedUser = await walletAuthService.updateProfile(updates)
      setUser(updatedUser)
      toast.success('Profil byl úspěšně aktualizován')
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Aktualizace profilu selhala'
      walletAuthLogger.error('Profile update failed', { userId: user.id, error: errorMessage })
      toast.error(errorMessage)
      throw error
    }
  }

  const value: WalletContextType = {
    // Wallet state
    isConnected: authenticated && !!walletAddress,
    walletAddress,
    chainId,
    
    // User state
    user,
    isAuthenticated,
    isLoading,
    loadingState,
    
    // Actions
    connectWallet,
    disconnectWallet,
    updateProfile,
    
    // Privy specific
    login,
    logout: disconnectWallet,
  }

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  )
}

// Main provider component
export function WalletProvider({ children }: { children: ReactNode }) {
  return (
    <PrivyProvider
      appId={privyAppId}
      config={privyConfig}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <WalletProviderInner>
            {children}
          </WalletProviderInner>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  )
}

// Hook to use wallet context
export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}

// Hook for wallet address only (doesn't require full auth)
export function useWalletAddress() {
  const { walletAddress, isConnected } = useWallet()
  return { address: walletAddress, isConnected }
}

// Hook for authenticated user only
export function useWalletUser() {
  const { user, isAuthenticated, isLoading } = useWallet()
  return { user, isAuthenticated, isLoading }
}
