"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function AdminTopBar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock admin notifications
  const notifications = [
    { id: 1, type: 'warning', message: 'Vysoká síťová aktivita na GC Cards kontraktu', time: '2 min' },
    { id: 2, type: 'info', message: 'Nová dividenda vyplacena: 1,247 ETH', time: '15 min' },
    { id: 3, type: 'success', message: 'Smart kontrakt audit úspěšně dokončen', time: '1h' },
  ];

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
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
              <span>User Dashboard</span>
            </Link>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-1.5 sm:p-2 text-white hover:text-[#F9D523] transition-colors rounded-lg hover:bg-white/5"
                aria-label="Admin Notifications"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>

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
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </button>

            {/* Admin Settings */}
            <button className="p-1.5 sm:p-2 text-white hover:text-[#F9D523] transition-colors rounded-lg hover:bg-white/5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
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
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>

                <div className="text-left hidden sm:block">
                  <span className="text-sm font-medium select-none text-white block">Super Admin</span>
                  <span className="text-xs text-red-400 select-none">admin@gavlik.capital</span>
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
                    <div className="px-4 py-3 border-b border-[#333333]/50">
                      <div className="text-white font-medium">Super Admin</div>
                      <div className="text-[#666666] text-sm">admin@gavlik.capital</div>
                      <div className="text-red-400 text-xs mt-1">Plný přístup ke všem systémům</div>
                    </div>

                    <button className="w-full text-left px-4 py-2 text-[#666666] hover:text-[#F9D523] hover:bg-[#1a1a1a]/50 transition-colors">
                      Admin Nastavení
                    </button>

                    <button className="w-full text-left px-4 py-2 text-[#666666] hover:text-[#F9D523] hover:bg-[#1a1a1a]/50 transition-colors">
                      Security Logs
                    </button>

                    <button className="w-full text-left px-4 py-2 text-[#666666] hover:text-[#F9D523] hover:bg-[#1a1a1a]/50 transition-colors">
                      System Backup
                    </button>

                    <div className="border-t border-[#333333]/50 mt-2 pt-2">
                      <button className="w-full text-left px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors">
                        Odhlásit se z Admin
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