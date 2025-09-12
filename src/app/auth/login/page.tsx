'use client'

import { useWallet } from '@/contexts/WalletContext'
import { WalletConnectButton } from '@/components/wallet/WalletConnectButton'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/logo/logo'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const { isAuthenticated, isLoading, loadingState } = useWallet()
  const router = useRouter()

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && loadingState === 'idle') {
      router.push('/dashboard')
    }
  }, [isAuthenticated, loadingState, router])

  // Get step status based on loading state
  const getStepStatus = (step: number) => {
    if (loadingState === 'idle') return 'pending'
    if (loadingState === 'error') return 'error'
    
    const states = ['connecting-wallet', 'signing-message', 'authenticating', 'redirecting']
    const currentIndex = states.indexOf(loadingState)
    
    if (currentIndex === -1) return 'pending'
    if (step - 1 < currentIndex) return 'completed'
    if (step - 1 === currentIndex) return 'active'
    return 'pending'
  }

  const StepIndicator = ({ step, text }: { step: number; text: string }) => {
    const status = getStepStatus(step)
    
    return (
      <div className="flex items-start space-x-3">
        <div className={`
          flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5
          transition-all duration-300
          ${status === 'completed' ? 'bg-green-500/20' : 
            status === 'active' ? 'bg-yellow-500/20 animate-pulse' : 
            status === 'error' ? 'bg-red-500/20' :
            'bg-[#F9D523]/20'}
        `}>
          {status === 'completed' ? (
            <CheckCircle className="w-4 h-4 text-green-400" />
          ) : status === 'active' ? (
            <Loader2 className="w-4 h-4 text-yellow-400 animate-spin" />
          ) : status === 'error' ? (
            <AlertCircle className="w-4 h-4 text-red-400" />
          ) : (
            <span className="text-[#F9D523] text-xs font-bold">{step}</span>
          )}
        </div>
        <p className={`
          transition-opacity duration-300
          ${status === 'active' ? 'text-white' : 
            status === 'completed' ? 'text-green-400' :
            status === 'error' ? 'text-red-400' :
            'text-gray-400'}
        `}>
          {text}
        </p>
      </div>
    )
  }

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
            {/* Loading state indicator */}
            {isLoading && loadingState !== 'idle' && (
              <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-center">
                  <Loader2 className="w-5 h-5 mr-3 text-yellow-400 animate-spin" />
                  <div className="flex-1">
                    <p className="text-yellow-200 text-sm font-medium">
                      {loadingState === 'connecting-wallet' && 'Připojování k peněžence...'}
                      {loadingState === 'signing-message' && 'Čekání na podpis zprávy...'}
                      {loadingState === 'authenticating' && 'Ověřování identity...'}
                      {loadingState === 'redirecting' && 'Přesměrování na dashboard...'}
                    </p>
                    {loadingState === 'signing-message' && (
                      <p className="text-yellow-100/70 text-xs mt-1">
                        Zkontrolujte svou peněženku a podepište zprávu
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Error state */}
            {loadingState === 'error' && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 mr-3 text-red-400" />
                  <div className="flex-1">
                    <p className="text-red-200 text-sm font-medium">
                      Přihlášení se nezdařilo
                    </p>
                    <p className="text-red-100/70 text-xs mt-1">
                      Zkuste to prosím znovu nebo kontaktujte podporu
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Connect Button */}
            <div className="text-center mb-6">
              <WalletConnectButton size="lg" className="w-full justify-center" />
            </div>

            {/* Instructions with dynamic status */}
            <div className="space-y-4 text-sm">
              <StepIndicator 
                step={1} 
                text="Klikněte na 'Connect Wallet' a vyberte svou peněženku" 
              />
              <StepIndicator 
                step={2} 
                text="Podepište autentifikační zprávu ve své peněžence" 
              />
              <StepIndicator 
                step={3} 
                text="Ověření identity a vytvoření/načtení účtu" 
              />
              <StepIndicator 
                step={4} 
                text="Přesměrování do vašeho portfolia" 
              />
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
            <p>
              Potřebujete pomoc? Kontaktujte našu{' '}
              <Link href="/support" className="text-[#F9D523] hover:underline">
                zákaznickou podporu
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
