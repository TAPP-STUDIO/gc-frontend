'use client'

import { useWallet } from '@/contexts/WalletContext'
import { WalletConnectButton } from '@/components/wallet/WalletConnectButton'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/logo/logo'

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useWallet()
  const router = useRouter()

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Background pattern */}
      <div 
        className="fixed inset-0 opacity-10"
        style={{ 
          backgroundImage: "url('/backgrounds/dashboard/content.svg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-block">
              <Logo />
            </div>
            <h1 className="text-2xl font-bold text-white mt-4 mb-2">
              Přihlášení do portfolia
            </h1>
            <p className="text-gray-400 text-sm">
              Připojte svou peněženku pro přístup k dashboardu
            </p>
          </div>

          {/* Login Card */}
          <div 
            className="p-8 rounded-2xl border border-white/10 shadow-2xl"
            style={{
              background: 'linear-gradient(180deg, rgba(21, 21, 21, 0.4) 0%, rgba(21, 21, 21, 0.6) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            {/* Loading state */}
            {isLoading && (
              <div className="text-center mb-6">
                <div className="inline-flex items-center px-4 py-2 bg-yellow-500/20 text-yellow-200 rounded-lg">
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-yellow-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Připojování...
                </div>
              </div>
            )}

            {/* Connect Button */}
            <div className="text-center mb-6">
              <WalletConnectButton size="lg" className="w-full justify-center" />
            </div>

            {/* Instructions */}
            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-[#F9D523]/20 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-[#F9D523] text-xs font-bold">1</span>
                </div>
                <p>Klikněte na &quot;Connect Wallet&quot; a vyberte svou peněženku</p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-[#F9D523]/20 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-[#F9D523] text-xs font-bold">2</span>
                </div>
                <p>Podepište autentifikační zprávu ve své peněžence</p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-[#F9D523]/20 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-[#F9D523] text-xs font-bold">3</span>
                </div>
                <p>Budete přesměrováni do svého portfolia</p>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-white/10"></div>
              <span className="px-4 text-xs text-gray-500 uppercase tracking-wide">nebo</span>
              <div className="flex-1 border-t border-white/10"></div>
            </div>

            {/* Back to home */}
            <div className="text-center">
              <Link 
                href="/" 
                className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Zpět na hlavní stránku
              </Link>
            </div>
          </div>

          {/* Support info */}
          <div className="text-center mt-8 text-xs text-gray-500">
            <p>Potřebujete pomoc? Kontaktujte našu <Link href="/support" className="text-[#F9D523] hover:underline">zákaznickou podporu</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}
