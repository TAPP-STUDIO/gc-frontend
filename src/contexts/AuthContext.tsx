'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authService, CognitoUserData } from '@/services/auth.service';
import { apiService, AdminUser } from '@/services/api.service';

interface AuthContextType {
  user: AdminUser | null;
  cognitoUser: CognitoUserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInAdminGroup: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refreshSession: () => Promise<boolean>;
  checkAdminAccess: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [cognitoUser, setCognitoUser] = useState<CognitoUserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInAdminGroup, setIsInAdminGroup] = useState(false);
  const router = useRouter();

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);

      // Check for stored tokens
      const tokens = authService.getStoredTokens();
      const userData = authService.getStoredUserData();

      if (!tokens || !userData) {
        setIsLoading(false);
        return;
      }

      // Check if token is expired
      if (authService.isTokenExpired()) {
        // Try to refresh
        const newTokens = await authService.refreshToken();
        if (!newTokens) {
          authService.signOut();
          setIsLoading(false);
          return;
        }
      }

      // Verify admin status with backend
      const response = await apiService.verifyAdminStatus(tokens.idToken);
      
      if (response.success && response.data?.isAdmin && response.data.user) {
        setUser(response.data.user);
        setCognitoUser(userData);
        setIsInAdminGroup(true);
      } else {
        // Not an admin or verification failed
        authService.signOut();
      }
    } catch (error) {
      console.error('Auth status check failed:', error);
      authService.signOut();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);

      // First authenticate with Cognito
      const { tokens } = await authService.signIn(email, password);

      // Decode user data from token
      const userData = authService.decodeIdToken(tokens.idToken);
      if (!userData) {
        throw new Error('Failed to decode user token');
      }

      // Check if user is in admin group
      if (!authService.isUserInAdminGroup(userData)) {
        authService.signOut();
        return {
          success: false,
          error: 'Access denied. You must be a member of gc_super_admins group.',
        };
      }

      // Then verify with backend
      const response = await apiService.adminLogin(email, password);

      if (response.success && response.data) {
        setUser(response.data.user);
        setCognitoUser(userData);
        setIsInAdminGroup(true);
        
        // Redirect to admin dashboard
        router.push('/admin');
        
        return { success: true };
      } else {
        authService.signOut();
        return {
          success: false,
          error: response.error || 'Login failed',
        };
      }
    } catch (error: unknown) {
      console.error('Login error:', error);
      authService.signOut();

      if (typeof error === 'object' && error !== null) {
        const err = error as { code?: string; message?: string };
        // Handle specific Cognito errors
        if (err.code === 'NotAuthorizedException') {
          return { success: false, error: 'Invalid email or password' };
        }
        if (err.code === 'UserNotFoundException') {
          return { success: false, error: 'User not found' };
        }
        if (err.code === 'UserNotConfirmedException') {
          return { success: false, error: 'Please confirm your email address' };
        }
        if (err.message === 'New password required') {
          return { success: false, error: 'Please contact admin to set a new password' };
        }
        return {
          success: false,
          error: err.message || 'An unexpected error occurred',
        };
      }
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = useCallback(() => {
    authService.signOut();
    setUser(null);
    setCognitoUser(null);
    setIsInAdminGroup(false);
    router.push('/admin/login');
  }, [router]);

  const refreshSession = async (): Promise<boolean> => {
    try {
      const newTokens = await authService.refreshToken();
      if (newTokens) {
        // Verify the new tokens with backend
        const response = await apiService.verifyAdminStatus(newTokens.idToken);
        if (response.success && response.data?.isAdmin) {
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Session refresh failed:', error);
      return false;
    }
  };

  const checkAdminAccess = async (): Promise<boolean> => {
    const tokens = authService.getStoredTokens();
    if (!tokens) return false;

    const response = await apiService.verifyAdminStatus(tokens.idToken);
    return response.success && response.data?.isAdmin === true;
  };

  const value: AuthContextType = {
    user,
    cognitoUser,
    isAuthenticated: !!user && isInAdminGroup,
    isLoading,
    isInAdminGroup,
    login,
    logout,
    refreshSession,
    checkAdminAccess,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
