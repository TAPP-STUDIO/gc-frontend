"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
    // UNIFIED GLASSMORPHISM STYLE pro TopBar
    <div 
      className="border-b border-white/10 relative"
      style={{
        background: 'rgba(21, 21, 21, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div className="w-full">
        <div className="flex justify-between items-center px-4 sm:px-6 py-4">
          
          {/* Left section - System Status */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
              <span className="text-sm text-white/70 hidden sm:block">
                Blockchain: Online
              </span>
            </div>
            
            <div className="h-4 w-px bg-white/20 hidden sm:block"></div>
            
            {/* Quick Stats - UNIFIED STYLE */}
            <div className="hidden lg:flex items-center space-x-6">
              <div 
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-all duration-300 hover:bg-white/5"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(249, 213, 35, 0.2)'
                }}
              >
                <svg className="w-4 h-4 text-[#F9D523]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-white font-medium">$1.2M</span>
              </div>
              
              <div 
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-all duration-300 hover:bg-white/5"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(59, 130, 246, 0.2)'
                }}
              >
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.196-2.196M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.196-2.196M7 20v-2c0-.656.126-1.283.356-1.857M7 20v-2a3 3 0 015.196-2.196M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm text-white font-medium">1,247</span>
              </div>
              
              <div 
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-all duration-300 hover:bg-white/5"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(34, 197, 94, 0.2)'
                }}
              >
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="text-sm text-white font-medium">8,934</span>
              </div>
            </div>
          </div>

          {/* Right section - Admin Tools */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Back to User Dashboard - UNIFIED BUTTON STYLE */}
            <Link
              href="/dashboard"
              className="hidden md:flex items-center space-x-2 px-3 py-1.5 text-white text-sm rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #B29819 0%, #F9D523 50%, #E6C547 100%)';
                e.currentTarget.style.color = '#151515';
                e.currentTarget.style.borderColor = '#F9D523';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              <Home className="w-4 h-4" />
              <span>User Dashboard</span>
            </Link>

            {/* Notifications - UNIFIED STYLE */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-white hover:text-red-400 transition-all duration-300 rounded-lg hover:bg-white/10"
                aria-label="Admin Notifications"
              >
                <Bell className="w-5 h-5" />

                {/* Notification badge */}
                {notifications.length > 0 && (
                  <div className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold min-w-[20px] shadow-lg">
                    {notifications.length > 9 ? "9+" : notifications.length}
                  </div>
                )}
              </button>

              {/* Notifications dropdown - UNIFIED GLASSMORPHISM */}
              {showNotifications && (
                <div 
                  className="absolute right-0 top-full mt-2 w-80 rounded-xl shadow-2xl z-50 border border-white/20"
                  style={{
                    background: 'rgba(21, 21, 21, 0.9)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                  }}
                >
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-3 flex items-center">
                      <Bell className="w-4 h-4 mr-2 text-red-400" />
                      Admin Notifikace
                    </h3>
                    <div className="space-y-3">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className="flex items-start space-x-3 p-3 rounded-lg transition-all duration-300 hover:bg-white/5"
                          style={{
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.05)'
                          }}
                        >
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification.type === 'warning' ? 'bg-yellow-400' :
                            notification.type === 'info' ? 'bg-blue-400' : 'bg-green-400'
                          }`}></div>
                          <div className="flex-1">
                            <p className="text-sm text-white">{notification.message}</p>
                            <p className="text-xs text-white/50 mt-1">{notification.time} ago</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button 
                      className="w-full text-center text-red-400 text-sm mt-3 hover:text-red-300 transition-colors py-2 rounded-lg hover:bg-white/5"
                      onClick={() => setShowNotifications(false)}
                    >
                      Zobrazit všechny notifikace
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Emergency Actions - UNIFIED STYLE */}
            <button
              className="px-3 py-1.5 text-red-400 hover:text-red-300 text-sm rounded-lg transition-all duration-300 hover:scale-105"
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                backdropFilter: 'blur(10px)',
              }}
              title="Emergency Actions"
            >
              <AlertTriangle className="w-4 h-4" />
            </button>

            {/* Admin Settings */}
            <button className="p-2 text-white hover:text-red-400 transition-all duration-300 rounded-lg hover:bg-white/10">
              <Settings className="w-5 h-5" />
            </button>

            {/* Admin Profile - UNIFIED STYLE */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 p-2 text-white hover:text-red-400 transition-all duration-300 rounded-lg hover:bg-white/10"
                aria-haspopup="true"
                aria-expanded={showProfileMenu}
              >
                {/* Admin Avatar */}
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                  {user?.avatar ? (
                    <Image src={user.avatar} alt={displayName} width={32} height={32} className="w-full h-full rounded-full" />
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

              {/* Profile dropdown menu - UNIFIED GLASSMORPHISM */}
              {showProfileMenu && (
                <div 
                  className="absolute right-0 top-full mt-2 w-56 rounded-xl shadow-2xl z-50 border border-white/20"
                  style={{
                    background: 'rgba(21, 21, 21, 0.9)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                  }}
                >
                  <div className="py-2">

                    <Link
                      href="/admin/profile"
                      className="w-full text-left px-4 py-3 text-white/70 hover:text-red-400 hover:bg-white/5 transition-all duration-300 flex items-center space-x-2"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Můj profil</span>
                    </Link>

                    <Link
                      href="/admin/settings"
                      className="w-full text-left px-4 py-3 text-white/70 hover:text-red-400 hover:bg-white/5 transition-all duration-300 flex items-center space-x-2"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Admin nastavení</span>
                    </Link>

                    <Link
                      href="/admin/security"
                      className="w-full text-left px-4 py-3 text-white/70 hover:text-red-400 hover:bg-white/5 transition-all duration-300 flex items-center space-x-2"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <Shield className="w-4 h-4" />
                      <span>Security Logs</span>
                    </Link>

                    <div className="border-t border-white/10 mt-2 pt-2">
                      <button 
                        onClick={() => {
                          setShowProfileMenu(false);
                          logout();
                        }}
                        className="w-full text-left px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300 flex items-center space-x-2"
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
