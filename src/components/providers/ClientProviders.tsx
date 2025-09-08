'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/components/ui/toast';
import { ErrorBoundary } from '@/components/ui/error-boundary';

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
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
