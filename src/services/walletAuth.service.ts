import axios from 'axios'
import Cookies from 'js-cookie'

export interface WalletUser {
  id: string
  walletAddress: string
  username?: string
  firstName?: string
  lastName?: string
  avatar?: string
  bio?: string
  role: 'user'
  isActive: boolean
  nonce?: string
  settings: {
    notifications: {
      email: boolean
      push: boolean
      dividends: boolean
      trades: boolean
      news: boolean
    }
    privacy: {
      showProfile: boolean
      showHoldings: boolean
      showActivity: boolean
    }
    preferences: {
      currency: string
      language: string
      timezone: string
      theme: 'light' | 'dark' | 'auto'
    }
  }
  portfolioValue: number
  totalInvested: number
  totalRewards: number
  totalClaimed: number
  nftHoldings: any[]
  createdAt: string
  updatedAt: string
}

export interface WalletAuthTokens {
  accessToken: string
  refreshToken?: string
  expiresIn: number
}

class WalletAuthService {
  private readonly WALLET_TOKEN_KEY = 'gc_wallet_tokens'
  private readonly WALLET_USER_KEY = 'gc_wallet_user'
  private readonly API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1'

  // Create axios instance for wallet auth (separate from admin auth)
  private api = axios.create({
    baseURL: this.API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  constructor() {
    // Add wallet auth token to requests
    this.api.interceptors.request.use(
      (config) => {
        const tokens = this.getStoredTokens()
        if (tokens?.accessToken) {
          config.headers['Authorization'] = `Bearer ${tokens.accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )
  }

  /**
   * Get wallet info from Privy (to be called from context)
   */
  getWalletInfo(): { address: string; chainId: number } | null {
    // This will be called from WalletContext where we have access to Privy wallets
    // For now, return null and handle in context
    return null
  }

  /**
   * Sign authentication message using Privy wallet
   */
  async signAuthMessage(walletAddress: string, nonce: string, signMessageFunction: (message: string) => Promise<string>): Promise<{ signature: string; message: string }> {
    try {
      const message = `Welcome to Gavlik Capital!

Please sign this message to authenticate your wallet.

Wallet: ${walletAddress}
Nonce: ${nonce}
Timestamp: ${new Date().toISOString()}`
      
      const signature = await signMessageFunction(message)

      console.log('✅ Message signed successfully')
      return { signature, message }
    } catch (error) {
      console.error('❌ Message signing failed:', error)
      throw error
    }
  }

  /**
   * Login with wallet using Privy (to be called from context with wallet info)
   */
  async loginWithWallet(walletAddress?: string, signMessageFunction?: (message: string) => Promise<string>): Promise<{ user: WalletUser; tokens: WalletAuthTokens; isNewUser: boolean }> {
    try {
      console.log('🔐 Starting wallet authentication...')
      
      if (!walletAddress) {
        throw new Error('Wallet address is required')
      }
      
      if (!signMessageFunction) {
        throw new Error('Sign message function is required')
      }
      
      console.log('✅ Wallet info:', walletAddress)

      // Step 1: Request nonce from backend
      const nonceResponse = await this.api.post('/auth/wallet/nonce', {
        walletAddress: walletAddress
      })
      
      const { nonce, isNewUser } = nonceResponse.data.data
      console.log('✅ Nonce received:', { nonce, isNewUser })

      // Step 2: Sign authentication message
      const { signature, message } = await this.signAuthMessage(walletAddress, nonce, signMessageFunction)

      // Step 3: Verify signature and complete authentication  
      const authResponse = await this.api.post('/auth/wallet/verify', {
        walletAddress: walletAddress,
        signature,
        message, // Use the SAME message that was signed
        nonce
      })

      const { user, tokens } = authResponse.data.data
      console.log('✅ Wallet authentication successful')

      // Step 4: Store tokens and user data
      this.storeTokens(tokens)
      this.storeUserData(user)

      return { user, tokens, isNewUser }
    } catch (error) {
      console.error('❌ Wallet authentication failed:', error)
      throw error
    }
  }

  /**
   * Logout wallet user
   */
  async logout(): Promise<void> {
    try {
      // Clear stored data (Privy logout is handled in context)
      this.clearTokens()
      this.clearUserData()
      
      console.log('✅ Wallet logged out successfully')
    } catch (error) {
      console.error('❌ Wallet logout failed:', error)
      throw error
    }
  }

  /**
   * Get current wallet user
   */
  getCurrentUser(): WalletUser | null {
    const userStr = localStorage.getItem(this.WALLET_USER_KEY)
    if (!userStr) return null
    
    try {
      return JSON.parse(userStr) as WalletUser
    } catch {
      return null
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const tokens = this.getStoredTokens()
    const user = this.getCurrentUser()
    
    return !!(tokens?.accessToken && user?.walletAddress)
  }

  /**
   * Get access token for API calls
   */
  getAccessToken(): string | null {
    const tokens = this.getStoredTokens()
    return tokens?.accessToken || null
  }

  /**
   * Update user profile
   */
  async updateProfile(updates: Partial<WalletUser>): Promise<WalletUser> {
    try {
      const response = await this.api.put('/auth/wallet/profile', updates)
      const updatedUser = response.data.data.user
      
      // Update stored user data
      this.storeUserData(updatedUser)
      
      return updatedUser
    } catch (error) {
      console.error('❌ Profile update failed:', error)
      throw error
    }
  }

  /**
   * Store tokens
   */
  private storeTokens(tokens: WalletAuthTokens): void {
    console.log('🔐 WALLET DEBUG: Storing tokens:', {
      hasAccessToken: !!tokens.accessToken,
      hasRefreshToken: !!tokens.refreshToken,
      expiresIn: tokens.expiresIn
    })
    
    // Store in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.WALLET_TOKEN_KEY, JSON.stringify(tokens))
    }
    
    // Also store in cookies as backup
    try {
      Cookies.set(this.WALLET_TOKEN_KEY, JSON.stringify(tokens), {
        expires: 7,
        secure: false, // Allow HTTP in development
        sameSite: 'lax',
        path: '/'
      })
    } catch (error) {
      console.error('🔐 WALLET DEBUG: Cookie storage failed:', error)
    }
  }

  /**
   * Get stored tokens
   */
  private getStoredTokens(): WalletAuthTokens | null {
    // Try localStorage first
    if (typeof window !== 'undefined') {
      const localTokensStr = localStorage.getItem(this.WALLET_TOKEN_KEY)
      if (localTokensStr) {
        try {
          return JSON.parse(localTokensStr) as WalletAuthTokens
        } catch (error) {
          console.error('🔐 WALLET DEBUG: Failed to parse localStorage tokens:', error)
          localStorage.removeItem(this.WALLET_TOKEN_KEY)
        }
      }
    }
    
    // Fallback to cookies
    const tokensStr = Cookies.get(this.WALLET_TOKEN_KEY)
    if (!tokensStr) return null
    
    try {
      const tokens = JSON.parse(tokensStr) as WalletAuthTokens
      // Also store in localStorage for next time
      if (typeof window !== 'undefined') {
        localStorage.setItem(this.WALLET_TOKEN_KEY, tokensStr)
      }
      return tokens
    } catch (error) {
      console.error('🔐 WALLET DEBUG: Failed to parse cookie tokens:', error)
      return null
    }
  }

  /**
   * Clear stored tokens
   */
  private clearTokens(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.WALLET_TOKEN_KEY)
    }
    Cookies.remove(this.WALLET_TOKEN_KEY, { path: '/' })
  }

  /**
   * Store user data
   */
  private storeUserData(userData: WalletUser): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.WALLET_USER_KEY, JSON.stringify(userData))
    }
  }

  /**
   * Clear stored user data
   */
  private clearUserData(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.WALLET_USER_KEY)
    }
  }
}

export const walletAuthService = new WalletAuthService()
