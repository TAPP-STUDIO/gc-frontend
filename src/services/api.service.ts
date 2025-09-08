import axios, { AxiosInstance, AxiosError } from 'axios';
import { apiConfig } from '@/config/cognito';
import { authService } from './auth.service';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar?: string;
  adminPermissions: {
    canViewAnalytics: boolean;
    canManageUsers: boolean;
    canManageNFTs: boolean;
    canDistributeRewards: boolean;
    canManageContracts: boolean;
    canViewFinancials: boolean;
    canExportData: boolean;
    canManageAdmins: boolean;
  };
  isInAdminGroup?: boolean;
}

export interface LoginResponse {
  user?: AdminUser;
  tokens?: {
    idToken: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
  // NEW_PASSWORD_REQUIRED challenge fields
  challengeName?: string;
  challengeParam?: {
    userAttributes: Record<string, unknown>;
    requiredAttributes: string[];
  };
  message?: string;
  session?: string;
  email?: string;
}

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: apiConfig.baseURL,
      timeout: apiConfig.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        console.log('🚀 API DEBUG: Request interceptor triggered for:', config.url);
        const tokens = authService.getStoredTokens();
        
        console.log('🚀 API DEBUG: Retrieved tokens for request:', {
          hasTokens: !!tokens,
          hasIdToken: !!tokens?.idToken,
          url: config.url,
          method: config.method
        });
        
        if (tokens?.idToken) {
          console.log('🚀 API DEBUG: Adding tokens to headers');
          config.headers['Authorization'] = `Bearer ${tokens.idToken}`;
          config.headers['x-id-token'] = tokens.idToken;
        } else {
          console.log('🚀 API DEBUG: No tokens available for request');
        }
        
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle token refresh
    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as typeof error.config & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Try to refresh token
            const newTokens = await authService.refreshToken();
            if (newTokens) {
              // Retry original request with new token
              originalRequest.headers['Authorization'] = `Bearer ${newTokens.idToken}`;
              originalRequest.headers['x-id-token'] = newTokens.idToken;
              return this.api(originalRequest);
            }
          } catch {
            // Refresh failed, redirect to login
            authService.signOut();
            if (typeof window !== 'undefined') {
              window.location.href = '/admin/login';
            }
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async adminLogin(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
    try {
      const response = await this.api.post<ApiResponse<LoginResponse>>('/auth/admin/login', {
        email,
        password,
      });
      
      console.log('Raw API response:', response.data); // Debug
      
      // If it's a NEW_PASSWORD_REQUIRED challenge, handle it specially
      const responseData = response.data as LoginResponse & { challengeName?: string };
      if (response.data && !response.data.success && 
          responseData.challengeName === 'NEW_PASSWORD_REQUIRED') {
        return {
          success: false,
          data: responseData,
          error: 'NEW_PASSWORD_REQUIRED'
        };
      }
      
      return response.data;
    } catch (error) {
      console.error('API login error:', error); // Debug
      // Make sure we return a string error message
      if (axios.isAxiosError(error)) {
        const errorMessage = typeof error.response?.data?.error === 'string' 
          ? error.response.data.error 
          : error.message || 'Login failed';
        return {
          success: false,
          error: errorMessage,
          data: error.response?.data, // Include challenge data if present
        };
      }
      return {
        success: false,
        error: 'Login failed',
      };
    }
  }

  async completeNewPassword(email: string, password: string, newPassword: string, session?: string): Promise<ApiResponse<LoginResponse>> {
    try {
      const requestData = {
        email,
        password,
        newPassword,
        session,
        userAttributes: {
          given_name: email.split('@')[0],
          family_name: 'Admin'
          // Email is already provided, don't send it again
        }
      };
      
      console.log('Sending to backend:', requestData);
      
      const response = await this.api.post<ApiResponse<LoginResponse>>('/auth/admin/complete-new-password', requestData);
      return response.data;
    } catch (error) {
      console.error('Complete new password API error:', error);
      if (axios.isAxiosError(error)) {
        console.error('Error response data:', error.response?.data);
        console.error('Error response status:', error.response?.status);
        console.error('Error response headers:', error.response?.headers);
        // Make sure we return a string error message
        const errorMessage = typeof error.response?.data?.error === 'string' 
          ? error.response.data.error 
          : error.message || 'Failed to set new password';
        return {
          success: false,
          error: errorMessage,
        };
      }
      return {
        success: false,
        error: 'Failed to set new password',
      };
    }
  }

  async verifyAdminStatus(idToken: string): Promise<ApiResponse<{ isAdmin: boolean; user?: AdminUser }>> {
    try {
      const response = await this.api.post<ApiResponse<{ isAdmin: boolean; user?: AdminUser }>>('/auth/admin/verify-status', {
        idToken,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          error: error.response?.data?.error || error.message || 'Verification failed',
        };
      }
      return {
        success: false,
        error: 'Verification failed',
      };
    }
  }

  async forgotPassword(email: string): Promise<ApiResponse> {
    try {
      const response = await this.api.post<ApiResponse<unknown>>('/auth/admin/forgot-password', {
        email,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          error: error.response?.data?.error || error.message || 'Request failed',
        };
      }
      return {
        success: false,
        error: 'Request failed',
      };
    }
  }

  async resetPassword(email: string, code: string, newPassword: string): Promise<ApiResponse> {
    try {
      const response = await this.api.post<ApiResponse<unknown>>('/auth/admin/reset-password', {
        email,
        code,
        newPassword,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          error: error.response?.data?.error || error.message || 'Reset failed',
        };
      }
      return {
        success: false,
        error: 'Reset failed',
      };
    }
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<ApiResponse> {
    try {
      const response = await this.api.post<ApiResponse<unknown>>('/auth/admin/change-password', {
        oldPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          error: error.response?.data?.error || error.message || 'Change failed',
        };
      }
      return {
        success: false,
        error: 'Change failed',
      };
    }
  }

  // Admin dashboard endpoints
  async getDashboard(): Promise<ApiResponse> {
    try {
      const response = await this.api.get<ApiResponse<unknown>>('/admin/dashboard');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          error: error.response?.data?.error || error.message || 'Failed to load dashboard',
        };
      }
      return {
        success: false,
        error: 'Failed to load dashboard',
      };
    }
  }

  async getUsers(params?: Record<string, unknown>): Promise<ApiResponse> {
    try {
      const response = await this.api.get<ApiResponse<unknown>>('/admin/users', { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          error: error.response?.data?.error || error.message || 'Failed to load users',
        };
      }
      return {
        success: false,
        error: 'Failed to load users',
      };
    }
  }

  async getUser(userId: string): Promise<ApiResponse> {
    try {
      const response = await this.api.get<ApiResponse<unknown>>(`/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          error: error.response?.data?.error || error.message || 'Failed to load user',
        };
      }
      return {
        success: false,
        error: 'Failed to load user',
      };
    }
  }

  async updateUser(userId: string, data: Record<string, unknown>): Promise<ApiResponse> {
    try {
      const response = await this.api.put<ApiResponse<unknown>>(`/admin/users/${userId}`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          error: error.response?.data?.error || error.message || 'Failed to update user',
        };
      }
      return {
        success: false,
        error: 'Failed to update user',
      };
    }
  }

  async deleteUser(userId: string): Promise<ApiResponse> {
    try {
      const response = await this.api.delete<ApiResponse<unknown>>(`/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          error: error.response?.data?.error || error.message || 'Failed to delete user',
        };
      }
      return {
        success: false,
        error: 'Failed to delete user',
      };
    }
  }

  async distributeDividends(data: Record<string, unknown>): Promise<ApiResponse> {
    try {
      const response = await this.api.post<ApiResponse<unknown>>('/admin/dividends/distribute', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          error: error.response?.data?.error || error.message || 'Failed to distribute dividends',
        };
      }
      return {
        success: false,
        error: 'Failed to distribute dividends',
      };
    }
  }

  async getAnalytics(params?: Record<string, unknown>): Promise<ApiResponse> {
    try {
      const response = await this.api.get<ApiResponse<unknown>>('/admin/analytics', { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          error: error.response?.data?.error || error.message || 'Failed to load analytics',
        };
      }
      return {
        success: false,
        error: 'Failed to load analytics',
      };
    }
  }
}

export const apiService = new ApiService();
