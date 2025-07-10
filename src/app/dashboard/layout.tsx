'use client';

import React from 'react';
import Sidebar from '@/components/sidebar/sidebar';
import { TopBar } from '@/components/layout';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 overflow-auto animated-bg">
        {/* TopBar bez props */}
        <TopBar />

        <div className="min-h-full">
          {children}
        </div>
      </div>
    </div>
  );
}