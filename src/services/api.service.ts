import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { apiConfig } from '@/config/cognito';
import { authService } from './auth.service';

export interface ApiResponse<T = any> {
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
  user: AdminUser;
  tokens: {
    idToken: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
  message?: string; // added
  session?: string; // added
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
        const tokens = authService.getStoredTokens();
        if (tokens?.idToken) {
          config.headers['Authorization'] = `Bearer ${tokens.idToken}`;
          config.headers['x-id-token'] = tokens.idToken;
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
        const originalRequest = error.config as any;

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
          } catch (refreshError) {
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
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Login failed',
      };
    }
  }

  async verifyAdminStatus(idToken: string): Promise<ApiResponse<{ isAdmin: boolean; user?: AdminUser }>> {
    try {
      const response = await this.api.post<ApiResponse>('/auth/admin/verify-status', {
        idToken,
      });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Verification failed',
      };
    }
  }

  async forgotPassword(email: string): Promise<ApiResponse> {
    try {
      const response = await this.api.post<ApiResponse>('/auth/admin/forgot-password', {
        email,
      });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Request failed',
      };
    }
  }

  async resetPassword(email: string, code: string, newPassword: string): Promise<ApiResponse> {
    try {
      const response = await this.api.post<ApiResponse>('/auth/admin/reset-password', {
        email,
        code,
        newPassword,
      });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Reset failed',
      };
    }
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<ApiResponse> {
    try {
      const response = await this.api.post<ApiResponse>('/auth/admin/change-password', {
        oldPassword,
        newPassword,
      });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Change failed',
      };
    }
  }

  // Admin dashboard endpoints
  async getDashboard(): Promise<ApiResponse> {
    try {
      const response = await this.api.get<ApiResponse>('/admin/dashboard');
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Failed to load dashboard',
      };
    }
  }

  async getUsers(params?: any): Promise<ApiResponse> {
    try {
      const response = await this.api.get<ApiResponse>('/admin/users', { params });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Failed to load users',
      };
    }
  }

  async getUser(userId: string): Promise<ApiResponse> {
    try {
      const response = await this.api.get<ApiResponse>(`/admin/users/${userId}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Failed to load user',
      };
    }
  }

  async updateUser(userId: string, data: any): Promise<ApiResponse> {
    try {
      const response = await this.api.put<ApiResponse>(`/admin/users/${userId}`, data);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Failed to update user',
      };
    }
  }

  async deleteUser(userId: string): Promise<ApiResponse> {
    try {
      const response = await this.api.delete<ApiResponse>(`/admin/users/${userId}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Failed to delete user',
      };
    }
  }

  async distributeDividends(data: any): Promise<ApiResponse> {
    try {
      const response = await this.api.post<ApiResponse>('/admin/dividends/distribute', data);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Failed to distribute dividends',
      };
    }
  }

  async getAnalytics(params?: any): Promise<ApiResponse> {
    try {
      const response = await this.api.get<ApiResponse>('/admin/analytics', { params });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Failed to load analytics',
      };
    }
  }
}

export const apiService = new ApiService();
