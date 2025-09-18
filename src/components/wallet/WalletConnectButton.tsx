'use client'

import { useWallet } from '@/contexts/WalletContext'
import { Wallet, LogOut, Loader2, Check, AlertCircle } from 'lucide-react'

interface WalletConnectButtonProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline' | 'ghost'
  showFullAddress?: boolean
}

export function WalletConnectButton({ 
  className = '',
  size = 'md',
  variant = 'default',
  showFullAddress = false
}: WalletConnectButtonProps) {
  const { 
    isConnected,
    user, 
    isAuthenticated, 
    isLoading,
    loadingState, 
    connectWallet, 
    disconnectWallet,
    walletAddress 
  } = useWallet()

  const formatAddress = (address: string) => {
    if (showFullAddress) return address
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const baseClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }

  const variantClasses = {
    default: 'bg-red-600 hover:bg-red-700 text-white',
    outline: 'border border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-950',
    ghost: 'text-red-600 hover:bg-red-50 dark:hover:bg-red-950'
  }

  const buttonClasses = `
    inline-flex items-center justify-center rounded-lg font-medium transition-colors
    focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${baseClasses[size]} ${variantClasses[variant]} ${className}
  `.trim()

  // Loading state messages based on current step
  const getLoadingMessage = () => {
    switch (loadingState) {
      case 'connecting-wallet':
        return 'Připojování peněženky...'
      case 'signing-message':
        return 'Čekání na podpis...'
      case 'authenticating':
        return 'Přihlašování...'
      case 'redirecting':
        return 'Přesměrování...'
      default:
        return 'Načítání...'
    }
  }

  // Loading state icons
  const getLoadingIcon = () => {
    switch (loadingState) {
      case 'connecting-wallet':
        return <Wallet className="w-4 h-4 mr-2" />
      case 'signing-message':
        return <AlertCircle className="w-4 h-4 mr-2 text-yellow-500" />
      case 'authenticating':
        return <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      case 'redirecting':
        return <Check className="w-4 h-4 mr-2 text-green-500" />
      default:
        return <Loader2 className="w-4 h-4 mr-2 animate-spin" />
    }
  }

  // Show loading state
  if (isLoading && loadingState !== 'idle') {
    return (
      <button className={buttonClasses} disabled>
        {getLoadingIcon()}
        {getLoadingMessage()}
      </button>
    )
  }

  // If not connected at all, show connect button
  if (!isConnected && !isAuthenticated) {
    return (
      <button
        onClick={connectWallet}
        className={buttonClasses}
        disabled={isLoading}
      >
        <Wallet className="w-4 h-4 mr-2" />
        Connect Wallet
      </button>
    )
  }

  // If fully authenticated, show user info and disconnect button
  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium">
            {user?.username || user?.firstName || formatAddress(walletAddress || '')}
          </span>
        </div>
        
        <button
          onClick={disconnectWallet}
          className={`
            inline-flex items-center justify-center p-2 rounded-lg
            border border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800
            transition-colors ${className}
          `.trim()}
          title="Odpojit peněženku"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    )
  }

  // Fallback - show loading
  return (
    <button className={buttonClasses} disabled>
      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      Načítání...
    </button>
  )
}

// Simplified version for navigation bars
export function WalletConnectNav() {
  return (
    <WalletConnectButton 
      variant="outline" 
      size="sm"
      className="min-w-fit"
    />
  )
}

// Compact version showing only address
export function WalletAddressDisplay({ className }: { className?: string }) {
  const { walletAddress, isAuthenticated } = useWallet()
  
  if (!isAuthenticated || !walletAddress) {
    return null
  }

  return (
    <div className={`flex items-center gap-2 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono ${className}`}>
      <div className="w-2 h-2 bg-green-500 rounded-full" />
      {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
    </div>
  )
}
