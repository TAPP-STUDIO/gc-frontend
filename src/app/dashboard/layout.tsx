'use client';

import '@/styles/dashboard.css';
import Sidebar from '@/components/sidebar/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-container">
      {/* Background with pattern */}
      <div className="dashboard-background" />
      
      {/* Main Layout */}
      <div className="flex h-screen relative z-10">
        {/* Sidebar */}
        <aside className="dashboard-sidebar w-[200px] lg:w-[240px]">
          <Sidebar />
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto dashboard-scrollbar">
          <div className="dashboard-content">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
