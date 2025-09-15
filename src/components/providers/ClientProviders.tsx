'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { WalletProvider } from '@/contexts/WalletContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ToastProvider } from '@/components/ui/toast';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { HttpsWarning } from '@/components/HttpsWarning';
import '@/i18n'; // Initialize i18n

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary>
      <HttpsWarning>
        <LanguageProvider>
          <WalletProvider>
            <AuthProvider>
              <ToastProvider>
                {children}
              </ToastProvider>
            </AuthProvider>
          </WalletProvider>
        </LanguageProvider>
      </HttpsWarning>
    </ErrorBoundary>
  );
}
