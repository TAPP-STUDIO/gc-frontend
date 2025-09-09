'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { PrivyProvider, usePrivy, useWallets } from '@privy-io/react-auth'
import { WagmiProvider } from '@privy-io/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { privyConfig, privyAppId, supportedChains } from '@/config/privy'
import { createConfig, http } from 'wagmi'
import { walletAuthService, WalletUser } from '@/services/walletAuth.service'
import toast from 'react-hot-toast'

// Create wagmi config for Privy
const wagmiConfig = createConfig({
  chains: supportedChains,
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

interface WalletContextType {
  // Wallet state
  isConnected: boolean
  walletAddress: string | null
  chainId: number | null
  
  // User state
  user: WalletUser | null
  isAuthenticated: boolean
  isLoading: boolean
  
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
  const { ready, authenticated, login, logout: privyLogout, user: privyUser } = usePrivy()
  const { wallets } = useWallets()
  
  const [user, setUser] = useState<WalletUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

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
      
      if (storedUser && isAuth && authenticated) {
        setUser(storedUser)
        setIsAuthenticated(true)
      }
    }
    
    checkAuth()
  }, [ready, authenticated])

  // Handle Privy authentication changes
  useEffect(() => {
    if (!authenticated && isAuthenticated) {
      // Privy was disconnected, clear our auth
      handleDisconnect()
    }
  }, [authenticated, isAuthenticated])

  const connectWallet = async () => {
    if (isLoading) return
    
    // If not connected to Privy, open login modal
    if (!authenticated) {
      login()
      return
    }
    
    // If connected to Privy but not authenticated with our backend
    if (!isAuthenticated && walletAddress && primaryWallet) {
      setIsLoading(true)
      try {
        console.log('🔗 Starting wallet authentication...')
        console.log('👛 Available wallets:', wallets.map(w => ({ 
          address: w.address, 
          clientType: w.walletClientType,
          isPrimary: w === primaryWallet 
        })))
        console.log('🎯 Using wallet:', { 
          address: primaryWallet.address, 
          clientType: primaryWallet.walletClientType 
        })
        
        // Create sign message function for Privy wallet
        const signMessageFunction = async (message: string): Promise<string> => {
          try {
            console.log('📝 Signing message with wallet:', primaryWallet.address)
            console.log('📄 Message to sign:', message)
            const signature = await primaryWallet.sign(message)
            console.log('✅ Signature created:', signature.substring(0, 20) + '...')
            return signature
          } catch (error) {
            console.error('❌ Privy wallet signing failed:', error)
            throw new Error('Failed to sign message with wallet')
          }
        }
        
        const result = await walletAuthService.loginWithWallet(walletAddress, signMessageFunction)
        
        setUser(result.user)
        setIsAuthenticated(true)
        
        if (result.isNewUser) {
          toast.success('Welcome to Gavlik Capital! Your account has been created.')
        } else {
          toast.success('Welcome back!')
        }
        
        console.log('✅ Wallet authentication successful')
      } catch (error: any) {
        console.error('❌ Wallet authentication failed:', error)
        toast.error(error.message || 'Failed to authenticate wallet')
      } finally {
        setIsLoading(false)
      }
    }
  }

  const disconnectWallet = async () => {
    await handleDisconnect()
    await privyLogout()
  }
  
  const handleDisconnect = async () => {
    try {
      await walletAuthService.logout()
      setUser(null)
      setIsAuthenticated(false)
      console.log('✅ Wallet disconnected')
    } catch (error) {
      console.error('❌ Logout error:', error)
    }
  }

  const updateProfile = async (updates: Partial<WalletUser>) => {
    if (!user) throw new Error('No user logged in')
    
    try {
      const updatedUser = await walletAuthService.updateProfile(updates)
      setUser(updatedUser)
      toast.success('Profile updated successfully')
    } catch (error: any) {
      console.error('❌ Profile update failed:', error)
      toast.error(error.message || 'Failed to update profile')
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
