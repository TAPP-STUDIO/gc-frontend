'use client';

import '@/styles/dashboard.css';
import Sidebar from '@/components/sidebar/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative">
      {/* Background SVG */}
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
      
      {/* Main Layout */}
      <div className="flex h-screen relative z-10">
        {/* Sidebar with glassmorphism */}
        <aside className="hidden lg:block w-[200px] lg:w-[240px] relative z-20">
          <Sidebar />
        </aside>
        
        {/* Mobile Sidebar - placeholder for future implementation */}
        <div className="lg:hidden fixed top-4 left-4 z-30">
          <button className="unified-button unified-button-sm">
            <span>☰</span>
          </button>
        </div>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto relative">
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
