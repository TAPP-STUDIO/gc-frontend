'use client';

import React from 'react';
import { ToastProvider } from '@/components/ui/toast';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { AuthProvider } from '@/contexts/AuthContext';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

// Theme Provider pro případné future theme switching
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    // Set default theme
    document.documentElement.classList.add('dark');
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.classList.remove('dark', 'light');
      document.documentElement.classList.add(savedTheme);
    }
  }, []);

  return <>{children}</>;
}

// Web3 Provider for wallet connections
export function Web3Provider({ children }: { children: React.ReactNode }) {
  // Placeholder for Web3 context implementation
  return <>{children}</>;
}

// Combined Providers component
export function AppProviders({ children }: ProvidersProps) {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <Web3Provider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </Web3Provider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
