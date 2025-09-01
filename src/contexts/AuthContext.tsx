'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authService, CognitoUserData } from '@/services/auth.service';
import { apiService, AdminUser } from '@/services/api.service';

interface LoginResult {
  success: boolean;
  error?: string;
  requiresNewPassword?: boolean;
  email?: string;
  challengeName?: string;
  userAttributes?: any;
  requiredAttributes?: string[];
}

interface AuthContextType {
  user: AdminUser | null;
  cognitoUser: CognitoUserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInAdminGroup: boolean;
  login: (email: string, password: string) => Promise<LoginResult>;
  completeNewPassword: (email: string, password: string, newPassword: string) => Promise<LoginResult>;
  logout: () => void;
  refreshSession: () => Promise<boolean>;
  checkAdminAccess: () => Promise<boolean>;
  error?: string;
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

  const login = async (email: string, password: string): Promise<LoginResult> => {
    try {
      setIsLoading(true);

      // Call backend API which handles Cognito authentication
      const response = await apiService.adminLogin(email, password);
      
      console.log('API Response:', response); // Debug log

      // Check if it's a NEW_PASSWORD_REQUIRED challenge
      // Check both response.data and direct response for challenge
      if (!response.success && 
          (response.data?.challengeName === 'NEW_PASSWORD_REQUIRED' || 
           response.error?.includes('NEW_PASSWORD_REQUIRED') ||
           (response as any).challengeName === 'NEW_PASSWORD_REQUIRED')) {
        
        console.log('NEW_PASSWORD_REQUIRED detected in AuthContext'); // Debug
        
        return {
          success: false,
          requiresNewPassword: true,
          email: email,
          challengeName: 'NEW_PASSWORD_REQUIRED',
          userAttributes: response.data?.challengeParam?.userAttributes,
          requiredAttributes: response.data?.challengeParam?.requiredAttributes,
          error: 'NEW_PASSWORD_REQUIRED',
        };
      }

      if (!response.success) {
        return {
          success: false,
          error: response.error || 'Login failed',
        };
      }

      if (response.success && response.data) {
        // Store tokens from backend response
        if (response.data.tokens) {
          authService.storeTokens(response.data.tokens);
          const userData = authService.decodeIdToken(response.data.tokens.idToken);
          if (userData) {
            authService.storeUserData(userData);
            setCognitoUser(userData);
          }
        }
        
        if (response.data.user) {
          setUser(response.data.user);
          setIsInAdminGroup(true);
        }
        
        // Redirect to admin dashboard
        router.push('/admin');
        
        return { success: true };
      } else {
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

  const completeNewPassword = async (email: string, password: string, newPassword: string): Promise<LoginResult> => {
    try {
      setIsLoading(true);

      // Call backend API to complete new password challenge
      const response = await apiService.completeNewPassword(email, password, newPassword);

      if (!response.success) {
        return {
          success: false,
          error: response.error || 'Failed to set new password',
        };
      }

      if (response.success && response.data) {
        // Store tokens from backend response
        if (response.data.tokens) {
          authService.storeTokens(response.data.tokens);
          const userData = authService.decodeIdToken(response.data.tokens.idToken);
          if (userData) {
            authService.storeUserData(userData);
            setCognitoUser(userData);
          }
        }
        
        if (response.data.user) {
          setUser(response.data.user);
          setIsInAdminGroup(true);
        }
        
        // Redirect to admin dashboard
        router.push('/admin');
        
        return { success: true };
      } else {
        return {
          success: false,
          error: response.error || 'Failed to set new password',
        };
      }
    } catch (error: unknown) {
      console.error('Complete new password error:', error);
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
    router.push('/auth/admin-login');
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
    completeNewPassword,
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
