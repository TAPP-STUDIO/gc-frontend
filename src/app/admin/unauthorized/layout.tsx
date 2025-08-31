'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function UnauthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Pokud uživatel není přihlášen, přesměruj na login
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/admin-login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#F9D523] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-lg">Načítání...</p>
        </div>
      </div>
    );
  }

  // Zobraz stránku pouze přihlášeným uživatelům (ale ne nutně adminům)
  return <>{children}</>;
}
