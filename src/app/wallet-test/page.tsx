'use client'

import { useWallet } from '@/contexts/WalletContext'
import { WalletConnectButton } from '@/components/wallet/WalletConnectButton'
import { useState } from 'react'

export default function WalletTestPage() {
  const { user, isAuthenticated, isLoading, walletAddress, chainId } = useWallet()
  const [profileForm, setProfileForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    bio: ''
  })

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    // This would call updateProfile from useWallet
    console.log('Update profile:', profileForm)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Wallet Connect Test
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Test WalletConnect v2 integration with Gavlik Capital authentication
            </p>
            
            <div className="flex justify-center">
              <WalletConnectButton size="lg" />
            </div>
          </div>

          {/* Wallet Status */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Wallet Status
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Address:</span>
                  <span className="font-mono text-sm">
                    {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Not connected'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-medium">Chain ID:</span>
                  <span>{chainId || 'Unknown'}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-medium">Authenticated:</span>
                  <span className={isAuthenticated ? 'text-green-600' : 'text-red-600'}>
                    {isAuthenticated ? 'Yes' : 'No'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-medium">Loading:</span>
                  <span className={isLoading ? 'text-yellow-600' : 'text-gray-600'}>
                    {isLoading ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* User Profile */}
          {isAuthenticated && user && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                User Profile
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* User Info Display */}
                <div className="space-y-3">
                  <h3 className="font-medium text-gray-900 dark:text-white">Current Info</h3>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>ID:</span>
                      <span>{user.id}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Username:</span>
                      <span>{user.username || 'Not set'}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>First Name:</span>
                      <span>{user.firstName || 'Not set'}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Last Name:</span>
                      <span>{user.lastName || 'Not set'}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Role:</span>
                      <span className="capitalize">{user.role}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Portfolio Value:</span>
                      <span>${user.portfolioValue.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Total Invested:</span>
                      <span>${user.totalInvested.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>NFT Holdings:</span>
                      <span>{user.nftHoldings.length} items</span>
                    </div>
                  </div>
                </div>
                
                {/* Profile Update Form */}
                <div className="space-y-3">
                  <h3 className="font-medium text-gray-900 dark:text-white">Update Profile</h3>
                  
                  <form onSubmit={handleProfileUpdate} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Username"
                      value={profileForm.username}
                      onChange={(e) => setProfileForm({...profileForm, username: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                    
                    <input
                      type="text"
                      placeholder="First Name"
                      value={profileForm.firstName}
                      onChange={(e) => setProfileForm({...profileForm, firstName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                    
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={profileForm.lastName}
                      onChange={(e) => setProfileForm({...profileForm, lastName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                    
                    <textarea
                      placeholder="Bio"
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                    
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      Update Profile
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
              Testing Instructions
            </h2>
            
            <ol className="list-decimal list-inside space-y-2 text-blue-800 dark:text-blue-200">
              <li>Click &quot;Connect Wallet&quot; to open Web3Modal</li>
              <li>Connect your preferred wallet (MetaMask, WalletConnect, etc.)</li>
              <li>Click &quot;Sign In&quot; to authenticate with signature</li>
              <li>Sign the authentication message in your wallet</li>
              <li>Your profile should appear below with portfolio data</li>
              <li>Test profile updates using the form</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
