'use client';

import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
  animate?: boolean;
}

export function Skeleton({ 
  className = '', 
  width = '100%', 
  height = '1rem', 
  rounded = false,
  animate = true 
}: SkeletonProps) {
  return (
    <div
      className={`
        bg-white/10 
        ${animate ? 'animate-pulse' : ''}
        ${rounded ? 'rounded-full' : 'rounded'}
        ${className}
      `}
      style={{ width, height }}
    />
  );
}

// Card Skeleton
export function CardSkeleton({ count = 1 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass-card p-6 space-y-4">
          <div className="flex items-center space-x-4">
            <Skeleton width="3rem" height="3rem" rounded />
            <div className="space-y-2 flex-1">
              <Skeleton height="1rem" width="60%" />
              <Skeleton height="0.75rem" width="40%" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton height="0.875rem" width="100%" />
            <Skeleton height="0.875rem" width="80%" />
            <Skeleton height="0.875rem" width="90%" />
          </div>
          <div className="flex justify-between">
            <Skeleton height="2rem" width="4rem" />
            <Skeleton height="2rem" width="4rem" />
          </div>
        </div>
      ))}
    </>
  );
}

// Table Skeleton
export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="glass-card overflow-hidden">
      <div className="space-y-0">
        {/* Header */}
        <div className="flex space-x-4 p-4 border-b border-white/10">
          {Array.from({ length: cols }).map((_, i) => (
            <Skeleton key={i} height="1rem" width="6rem" />
          ))}
        </div>
        
        {/* Rows */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex space-x-4 p-4 border-b border-white/5">
            {Array.from({ length: cols }).map((_, colIndex) => (
              <Skeleton key={colIndex} height="0.875rem" width="4rem" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Stats Skeleton
export function StatsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass-card p-6 text-center space-y-2">
          <Skeleton height="2rem" width="4rem" className="mx-auto" />
          <Skeleton height="1rem" width="6rem" className="mx-auto" />
        </div>
      ))}
    </>
  );
}

// NFT Grid Skeleton
export function NFTGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass-card overflow-hidden">
          <Skeleton height="12rem" width="100%" />
          <div className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <Skeleton height="1rem" width="60%" />
              <Skeleton height="1.25rem" width="3rem" />
            </div>
            <Skeleton height="2.5rem" width="100%" />
            <div className="flex justify-between">
              <div className="space-y-1">
                <Skeleton height="1.25rem" width="4rem" />
                <Skeleton height="0.75rem" width="5rem" />
              </div>
              <Skeleton height="0.75rem" width="4rem" />
            </div>
            <div className="flex space-x-2">
              <Skeleton height="2rem" className="flex-1" />
              <Skeleton height="2rem" className="flex-1" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

// Notification Skeleton
export function NotificationSkeleton({ count = 5 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass-card p-4">
          <div className="flex space-x-3">
            <Skeleton width="2rem" height="2rem" rounded />
            <div className="flex-1 space-y-2">
              <div className="flex justify-between">
                <Skeleton height="1rem" width="70%" />
                <Skeleton height="0.75rem" width="2rem" />
              </div>
              <Skeleton height="0.875rem" width="100%" />
              <Skeleton height="0.875rem" width="80%" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

// Chart Skeleton
export function ChartSkeleton() {
  return (
    <div className="glass-card p-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton height="1.5rem" width="8rem" />
          <Skeleton height="2rem" width="6rem" />
        </div>
        <div className="relative h-64">
          <Skeleton height="100%" width="100%" />
          {/* Overlay some lines to simulate chart */}
          <div className="absolute inset-0 flex items-end justify-between px-4 pb-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton 
                key={i} 
                width="0.5rem" 
                height={`${Math.random() * 60 + 20}%`}
                animate={false}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-between text-xs">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} height="0.75rem" width="2rem" />
          ))}
        </div>
      </div>
    </div>
  );
}

// Dashboard Overview Skeleton
export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsSkeleton count={4} />
      </div>
      
      {/* Chart and Overview */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ChartSkeleton />
        </div>
        <div className="space-y-4">
          <CardSkeleton count={2} />
        </div>
      </div>
      
      {/* Table */}
      <TableSkeleton rows={6} cols={5} />
    </div>
  );
}

// Page Loading Spinner
export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="glass-card p-8 text-center">
        <div className="w-12 h-12 border-4 border-[#F9D523] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white">Načítání...</p>
      </div>
    </div>
  );
}

// Button Loading State
export function ButtonSpinner({ size = 'sm' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className={`border-2 border-white border-t-transparent rounded-full animate-spin ${sizeClasses[size]}`} />
  );
}

// Shimmer Effect (alternative to pulse)
export function ShimmerSkeleton({ 
  className = '', 
  width = '100%', 
  height = '1rem' 
}: Omit<SkeletonProps, 'animate'>) {
  return (
    <div
      className={`relative overflow-hidden bg-white/5 rounded ${className}`}
      style={{ width, height }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent shimmer" />
    </div>
  );
}

// Loading Bar (for page transitions)
export function LoadingBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-1 bg-[#F9D523] animate-pulse" style={{
        background: 'linear-gradient(90deg, transparent, #F9D523, transparent)',
        animation: 'loading-bar 2s ease-in-out infinite'
      }} />
    </div>
  );
}
