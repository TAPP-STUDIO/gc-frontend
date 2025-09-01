'use client';

import Link from 'next/link';

export default function DevLinksPage() {
  const links = [
    { title: 'Main Page', href: '/', color: 'bg-blue-500' },
    { title: 'Buttons Demo', href: '/buttons-demo', color: 'bg-gradient-to-r from-yellow-400 to-teal-500' },
    { title: 'Dashboard', href: '/dashboard', color: 'bg-green-500' },
    { title: 'Admin Login', href: '/auth/admin-login', color: 'bg-red-500' },
    { title: 'Admin Dashboard', href: '/admin', color: 'bg-red-600' },
    { title: 'Admin Users', href: '/admin/users', color: 'bg-purple-500' },
    { title: 'Admin Analytics', href: '/admin/analytics', color: 'bg-indigo-500' },
    { title: 'Portfolio', href: '/dashboard/portfolio', color: 'bg-yellow-500' },
    { title: 'Projects', href: '/dashboard/projects', color: 'bg-pink-500' },
    { title: 'Messages', href: '/dashboard/messages', color: 'bg-cyan-500' },
    { title: 'Marketplace', href: '/dashboard/marketplace', color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">Development Links</h1>
        <p className="text-gray-400 mb-8">Quick access to all pages in the GC Website</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${link.color} hover:opacity-80 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg text-center`}
            >
              {link.title}
            </Link>
          ))}
        </div>

        <div className="mt-12 p-6 bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-4">Testing Credentials</h2>
          <div className="space-y-2 text-gray-300">
            <p><strong>Admin Email:</strong> admin@gavlikcapital.com</p>
            <p><strong>Test Password:</strong> TestPassword123!</p>
            <p className="text-yellow-400 mt-2">⚠️ Remember to change these in production!</p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-4">Project Status</h2>
          <div className="space-y-2 text-gray-300">
            <p>✅ Frontend UI/UX: 95%</p>
            <p>✅ TypeScript Definitions: 95%</p>
            <p>✅ Landing Page Buttons: 100%</p>
            <p>🟨 Authentication: 20%</p>
            <p>🟨 Backend API: 50%</p>
            <p>🟨 Smart Contracts: 65-95%</p>
            <p>🟨 Landing Page Content: 30%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
