'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { DashboardButton } from '@/components/dashboard';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log to external service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Call onError callback if provided
    this.props.onError?.(error, errorInfo);
    
    // Send to analytics/error tracking service
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.toString(),
        fatal: false
      });
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="glass-card p-8 max-w-md w-full text-center">
            <div className="mb-6">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">
                Něco se pokazilo
              </h2>
              <p className="text-white/70">
                Nastala neočekávaná chyba. Omlouváme se za problémy.
              </p>
            </div>

            <div className="space-y-3">
              <DashboardButton
                onClick={() => window.location.reload()}
                variant="primary"
                className="w-full"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Obnovit stránku
              </DashboardButton>
              
              <DashboardButton
                onClick={() => window.location.href = '/dashboard'}
                variant="secondary"
                className="w-full"
              >
                <Home className="w-4 h-4 mr-2" />
                Zpět na dashboard
              </DashboardButton>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-white/60 hover:text-white">
                  <Bug className="w-4 h-4 inline mr-2" />
                  Error Details (dev only)
                </summary>
                <div className="mt-2 p-3 bg-red-900/20 border border-red-500/20 rounded text-xs font-mono text-red-300 overflow-auto">
                  <div className="whitespace-pre-wrap">
                    {this.state.error.toString()}
                  </div>
                  {this.state.errorInfo && (
                    <div className="mt-2 pt-2 border-t border-red-500/20">
                      {this.state.errorInfo.componentStack}
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Specialized Error Boundaries for different sections

export function DashboardErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="p-6 text-center">
          <div className="glass-card p-6">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Chyba v dashboardu
            </h3>
            <p className="text-white/70 mb-4">
              Nepodařilo se načíst část dashboardu.
            </p>
            <DashboardButton
              onClick={() => window.location.reload()}
              variant="primary"
              size="sm"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Zkusit znovu
            </DashboardButton>
          </div>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}

export function MarketplaceErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="p-6 text-center">
          <div className="glass-card p-6">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Chyba marketplace
            </h3>
            <p className="text-white/70 mb-4">
              Nepodařilo se načíst marketplace data.
            </p>
            <DashboardButton
              onClick={() => window.location.reload()}
              variant="primary"
              size="sm"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Zkusit znovu
            </DashboardButton>
          </div>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}

// Hook for manual error reporting
export function useErrorHandler() {
  return (error: Error, context?: string) => {
    console.error(`Error in ${context || 'component'}:`, error);
    
    // Send to error tracking service
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: `${context || 'Unknown'}: ${error.toString()}`,
        fatal: false
      });
    }
  };
}

// Error fallback components
export function ErrorFallback({ 
  error, 
  resetError, 
  message = "Něco se pokazilo" 
}: { 
  error?: Error; 
  resetError?: () => void; 
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
      <h3 className="text-lg font-semibold text-white mb-2">{message}</h3>
      <p className="text-white/70 mb-6 max-w-md">
        {error?.message || "Nastala neočekávaná chyba. Zkuste to prosím znovu."}
      </p>
      
      {resetError && (
        <DashboardButton onClick={resetError} variant="primary">
          <RefreshCw className="w-4 h-4 mr-2" />
          Zkusit znovu
        </DashboardButton>
      )}
    </div>
  );
}

// Simple inline error display
export function InlineError({ 
  error, 
  retry 
}: { 
  error: string | Error; 
  retry?: () => void; 
}) {
  const errorMessage = typeof error === 'string' ? error : error.message;
  
  return (
    <div className="flex items-center justify-between p-3 bg-red-900/20 border border-red-500/20 rounded">
      <div className="flex items-center space-x-2">
        <AlertTriangle className="w-4 h-4 text-red-400" />
        <span className="text-red-200 text-sm">{errorMessage}</span>
      </div>
      {retry && (
        <button
          onClick={retry}
          className="text-red-300 hover:text-red-200 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
