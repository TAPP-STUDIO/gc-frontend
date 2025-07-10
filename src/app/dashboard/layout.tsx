'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/sidebar/sidebar';
import { TopBar } from '@/components/layout';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Load sidebar state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebar-collapsed');
    if (savedState !== null) {
      setIsSidebarCollapsed(JSON.parse(savedState));
    }
  }, []);

  const handleToggleSidebar = () => {
    const newState = !isSidebarCollapsed;
    setIsSidebarCollapsed(newState);
    localStorage.setItem('sidebar-collapsed', JSON.stringify(newState));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] dashboard-layout">
      {/* Mobile-first responsive layout */}
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar 
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={handleToggleSidebar}
        />

        {/* Main content area */}
        <div className="flex-1 flex flex-col min-w-0 dashboard-content">
          {/* Content area with proper scrolling */}
          <main className="flex-1 overflow-auto animated-bg">
            <div className="min-h-full w-full">
              {/* TopBar - v normálním flow */}
              <TopBar />
              
              {/* Responsive padding */}
              <div className="p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8">
                {/* Content wrapper for max-width on large screens */}
                <div className="max-w-full mx-auto">
                  {children}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}