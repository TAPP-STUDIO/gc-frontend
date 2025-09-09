'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { WalletProvider } from '@/contexts/WalletContext';
import { ToastProvider } from '@/components/ui/toast';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { HttpsWarning } from '@/components/HttpsWarning';

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary>
      <HttpsWarning>
        <WalletProvider>
          <AuthProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </AuthProvider>
        </WalletProvider>
      </HttpsWarning>
    </ErrorBoundary>
  );
}
