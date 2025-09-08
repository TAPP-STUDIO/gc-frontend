'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopBar from '@/components/admin/AdminTopBar';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import '@/styles/unified-dashboard.css'; // Import unified styles

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
      {/* UNIFIED LAYOUT STRUCTURE - stejný jako user dashboard */}
      <div className="min-h-screen relative">
        {/* Background SVG - unified */}
        <div 
          className="fixed inset-0 z-0"
          style={{ 
            backgroundImage: "url('/backgrounds/dashboard/content.svg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
          }}
        />
        
        {/* Main Layout - unified struktura */}
        <div className="flex h-screen relative z-10">
          {/* Admin Sidebar s glassmorphism */}
          <AdminSidebar 
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={handleToggleSidebar}
          />

          {/* Main Content - unified struktura */}
          <main className="flex-1 overflow-y-auto relative">
            <div className="w-full">
              {/* Admin TopBar */}
              <AdminTopBar />
              
              {/* Content */}
              {children}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
