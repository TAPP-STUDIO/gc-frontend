'use client';

import '@/styles/dashboard.css';
import Sidebar from '@/components/sidebar/sidebar';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ALL HOOKS MUST BE CALLED FIRST, BEFORE ANY CONDITIONAL RETURNS
  const { isAuthenticated, isLoading } = useWallet();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Wait for wallet context to initialize
  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true);
    }
  }, [isLoading]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isInitialized, isAuthenticated, router]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Helper functions
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent body scroll when menu is open
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  // Show loading screen while checking authentication
  if (!isInitialized || (isInitialized && !isAuthenticated)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {/* Background SVG */}
        <div 
          className="fixed inset-0 z-0"
          style={{ 
            backgroundImage: "url('/backgrounds/dashboard/content.svg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
          }}
        />
        
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-white font-medium">Načítání dashboardu...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Background SVG */}
      <div 
        className="fixed inset-0 z-0"
        style={{ 
          backgroundImage: "url('/backgrounds/dashboard/content.svg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Main Layout */}
      <div className="flex h-screen relative z-10">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-[200px] lg:w-[240px] relative z-20">
          <Sidebar />
        </aside>
        
        {/* Mobile Menu Button */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <button 
            onClick={toggleMobileMenu}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={closeMobileMenu}
          />
        )}
        
        {/* Mobile Sidebar */}
        <aside className={`lg:hidden fixed top-0 left-0 h-full min-h-screen w-[280px] z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div onClick={(e) => {
            // Close menu when clicking on links
            if (e.target instanceof HTMLAnchorElement) {
              closeMobileMenu();
            }
          }}>
            <Sidebar />
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto relative">
          <div className="w-full pt-16 lg:pt-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
