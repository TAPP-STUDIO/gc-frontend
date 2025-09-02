"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User, Settings, Shield, Bell, AlertTriangle, Home } from "lucide-react";

export default function AdminTopBar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, logout, isInAdminGroup } = useAuth();

  // Mock admin notifications
  const notifications = [
    { id: 1, type: 'warning', message: 'Vysoká síťová aktivita na GC Cards kontraktu', time: '2 min' },
    { id: 2, type: 'info', message: 'Nová dividenda vyplacena: 1,247 ETH', time: '15 min' },
    { id: 3, type: 'success', message: 'Smart kontrakt audit úspěšně dokončen', time: '1h' },
  ];

  // Get user display name
  const displayName = user?.firstName && user?.lastName 
    ? `${user.firstName} ${user.lastName}`
    : user?.email || 'Admin';

  return (
    <div className="bg-[#151515] border-b border-red-500/30">
      <div className="w-full">
        <div className="flex justify-between items-center px-4 sm:px-6 py-3">
          
          {/* Left section - System Status */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-[#666666] hidden sm:block">
                Blockchain: Online
              </span>
            </div>
            
            <div className="h-4 w-px bg-[#333333] hidden sm:block"></div>
            
            {/* Quick Stats */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-[#F9D523]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-white">Portfolio: $1.2M</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.196-2.196M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.196-2.196M7 20v-2c0-.656.126-1.283.356-1.857M7 20v-2a3 3 0 015.196-2.196M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm text-white">Uživatelé: 1,247</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="text-sm text-white">NFTs: 8,934</span>
              </div>
            </div>
          </div>

          {/* Right section - Admin Tools */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Back to User Dashboard */}
            <Link
              href="/dashboard"
              className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-[#333333] hover:bg-[#444444] text-white text-sm rounded-lg transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>User Dashboard</span>
            </Link>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-1.5 sm:p-2 text-white hover:text-[#F9D523] transition-colors rounded-lg hover:bg-white/5"
                aria-label="Admin Notifications"
              >
                <Bell className="w-5 h-5" />

                {/* Notification badge */}
                {notifications.length > 0 && (
                  <div className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium min-w-[16px]">
                    {notifications.length > 9 ? "9+" : notifications.length}
                  </div>
                )}
              </button>

              {/* Notifications dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-full mt-1 w-80 bg-[#151515]/95 backdrop-blur-md rounded-lg shadow-xl z-50 border border-[#333333]/50">
                  <div className="p-4">
                    <h3 className="text-white font-medium mb-3">Admin Notifikace</h3>
                    <div className="space-y-3">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-[#1a1a1a]/50">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification.type === 'warning' ? 'bg-yellow-500' :
                            notification.type === 'info' ? 'bg-blue-500' : 'bg-green-500'
                          }`}></div>
                          <div className="flex-1">
                            <p className="text-sm text-white">{notification.message}</p>
                            <p className="text-xs text-[#666666] mt-1">{notification.time} ago</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full text-center text-[#F9D523] text-sm mt-3 hover:text-[#e3c320] transition-colors">
                      Zobrazit všechny notifikace
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Emergency Actions */}
            <button
              className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 text-sm rounded-lg transition-colors border border-red-500/30"
              title="Emergency Actions"
            >
              <AlertTriangle className="w-4 h-4" />
            </button>

            {/* Admin Settings */}
            <button className="p-1.5 sm:p-2 text-white hover:text-[#F9D523] transition-colors rounded-lg hover:bg-white/5">
              <Settings className="w-5 h-5" />
            </button>

            {/* Admin Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 p-1.5 sm:p-2 text-white hover:text-[#F9D523] transition-colors rounded-lg hover:bg-white/5"
                aria-haspopup="true"
                aria-expanded={showProfileMenu}
              >
                {/* Admin Avatar */}
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={displayName} className="w-full h-full rounded-full" />
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>

                <div className="text-left hidden sm:block">
                  <span className="text-sm font-medium select-none text-white block">
                    {displayName}
                  </span>
                  <span className="text-xs text-red-400 select-none flex items-center space-x-1">
                    {isInAdminGroup && <Shield className="w-3 h-3" />}
                    <span>{user?.role === 'superadmin' ? 'Super Admin' : 'Admin'}</span>
                  </span>
                </div>

                {/* Dropdown arrow */}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  className={`transition-transform ${showProfileMenu ? "rotate-180" : ""} text-white hidden sm:block`}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {/* Profile dropdown menu */}
              {showProfileMenu && (
                <div className="absolute right-0 top-full mt-1 w-56 bg-[#151515]/95 backdrop-blur-md rounded-lg shadow-xl z-50 border border-[#333333]/50">
                  <div className="py-2">

                    <Link
                      href="/admin/profile"
                      className="w-full text-left px-4 py-2 text-[#666666] hover:text-[#F9D523] hover:bg-[#1a1a1a]/50 transition-colors flex items-center space-x-2"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Můj profil</span>
                    </Link>

                    <Link
                      href="/admin/settings"
                      className="w-full text-left px-4 py-2 text-[#666666] hover:text-[#F9D523] hover:bg-[#1a1a1a]/50 transition-colors flex items-center space-x-2"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Admin nastavení</span>
                    </Link>

                    <Link
                      href="/admin/security"
                      className="w-full text-left px-4 py-2 text-[#666666] hover:text-[#F9D523] hover:bg-[#1a1a1a]/50 transition-colors flex items-center space-x-2"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <Shield className="w-4 h-4" />
                      <span>Security Logs</span>
                    </Link>

                    <div className="border-t border-[#333333]/50 mt-2 pt-2">
                      <button 
                        onClick={() => {
                          setShowProfileMenu(false);
                          logout();
                        }}
                        className="w-full text-left px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Odhlásit se</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
