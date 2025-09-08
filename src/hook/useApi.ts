'use client';

import { useState, useEffect, useCallback } from 'react';
import { apiService, ApiResponse } from '@/services/api.service';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

// Generic API hook
export function useApi<T>(
  endpoint: string,
  dependencies: any[] = [],
  immediate: boolean = true
): UseApiState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [fetchData, immediate, ...dependencies]);

  return {
    data,
    loading,
    error,
    refresh: fetchData
  };
}

// Mutation hook for POST/PUT/DELETE operations
export function useMutation<TData, TVariables = void>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TData | null>(null);

  const mutate = useCallback(async (
    fn: (variables: TVariables) => Promise<ApiResponse<TData>>,
    variables: TVariables
  ) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fn(variables);
      if (response.success && response.data) {
        setData(response.data);
        return response.data;
      } else {
        throw new Error(response.error || 'Mutation failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    mutate,
    loading,
    error,
    data,
    reset: () => {
      setData(null);
      setError(null);
      setLoading(false);
    }
  };
}

// Portfolio hooks
export function usePortfolio() {
  const { data, loading, error, refresh } = useApi('/api/portfolio');
  
  return {
    portfolio: data,
    loading,
    error,
    refresh
  };
}

// Notifications hooks
export function useNotifications() {
  const { data, loading, error, refresh } = useApi('/api/notifications');
  
  return {
    notifications: data,
    loading,
    error,
    refresh,
    markAsRead: async (id: string) => {
      try {
        await fetch(`/api/notifications/${id}/read`, { method: 'POST' });
        refresh();
      } catch (err) {
        console.error('Failed to mark notification as read:', err);
      }
    },
    markAllAsRead: async () => {
      try {
        await fetch('/api/notifications/read-all', { method: 'POST' });
        refresh();
      } catch (err) {
        console.error('Failed to mark all notifications as read:', err);
      }
    }
  };
}

// Projects hooks
export function useProjects() {
  const { data, loading, error, refresh } = useApi('/api/projects');
  
  return {
    projects: data,
    loading,
    error,
    refresh
  };
}

// User profile hooks
export function useUserProfile() {
  const { data, loading, error, refresh } = useApi('/api/user/profile');
  
  const updateProfile = useMutation();
  
  return {
    profile: data,
    loading,
    error,
    refresh,
    updateProfile: updateProfile.mutate,
    updating: updateProfile.loading,
    updateError: updateProfile.error
  };
}
