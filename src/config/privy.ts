import { type PrivyClientConfig } from '@privy-io/react-auth'
import { mainnet, polygon, arbitrum, optimism, base } from 'viem/chains'

// Privy App ID from https://dashboard.privy.io
export const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID!

if (!privyAppId) {
  throw new Error('NEXT_PUBLIC_PRIVY_APP_ID is not set')
}

// Privy configuration for production and development
export const privyConfig: PrivyClientConfig = {
  appearance: {
    theme: 'dark',
    showWalletLoginFirst: true,
    loginMethods: ['wallet', 'email', 'sms'],
  },
  supportedChains: [mainnet],
  defaultChain: mainnet,
  // Disable embedded wallets in development to avoid HTTPS requirement
  embeddedWallets: {
    createOnLogin: process.env.NODE_ENV === 'production' ? 'users-without-wallets' : 'off',
  },
  // Legal pages required for embedded wallets
  legal: {
    termsAndConditionsUrl: process.env.NODE_ENV === 'production' 
      ? 'https://gavlikcapital.com/terms' 
      : '#',
    privacyPolicyUrl: process.env.NODE_ENV === 'production'
      ? 'https://gavlikcapital.com/privacy'
      : '#',
  },
}

// Export chains for wagmi usage
export const supportedChains = [mainnet, polygon, arbitrum, optimism, base]
export const defaultChain = mainnet
