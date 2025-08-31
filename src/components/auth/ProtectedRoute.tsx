'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = true }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, isInAdminGroup } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/auth/admin-login');
      } else if (requireAdmin && !isInAdminGroup) {
        router.push('/admin/unauthorized');
      }
    }
  }, [isAuthenticated, isLoading, isInAdminGroup, requireAdmin, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#F9D523] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-lg">Ověřování přístupu...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || (requireAdmin && !isInAdminGroup)) {
    return null;
  }

  return <>{children}</>;
}
