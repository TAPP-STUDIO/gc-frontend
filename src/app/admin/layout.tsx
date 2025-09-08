'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopBar from '@/components/admin/AdminTopBar';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Load sidebar state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('admin-sidebar-collapsed');
    if (savedState !== null) {
      setIsSidebarCollapsed(JSON.parse(savedState));
    }
  }, []);

  const handleToggleSidebar = () => {
    const newState = !isSidebarCollapsed;
    setIsSidebarCollapsed(newState);
    localStorage.setItem('admin-sidebar-collapsed', JSON.stringify(newState));
  };

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen relative admin-layout">
        {/* Background SVG */}
        <div 
          className="fixed inset-0 z-0"
          style={{ 
            backgroundImage: "url('/backgrounds/content.svg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
          }}
        />
        
        {/* Mobile-first responsive layout */}
        <div className="flex h-screen overflow-hidden relative z-10">
          {/* Admin Sidebar */}
          <AdminSidebar 
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={handleToggleSidebar}
          />

          {/* Main content area */}
          <div className="flex-1 flex flex-col min-w-0 admin-content">
            {/* Content area with proper scrolling */}
            <main className="flex-1 overflow-auto">
              <div className="min-h-full w-full">
                {/* Admin TopBar */}
                <AdminTopBar />
                
                {/* Content with consistent padding */}
                <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-6">
                  <div className="max-w-full mx-auto">
                    {children}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
