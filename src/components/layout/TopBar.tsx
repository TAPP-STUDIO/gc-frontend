"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, User, Settings, ChevronDown } from "lucide-react";

interface TopBarProps {
  title?: string;
  notificationCount?: number;
  userProfile?: {
    name?: string;
    avatar?: string;
    email?: string;
    address?: string;
    kycVerified?: boolean;
  };
  onNotificationClick?: () => void;
  className?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  title = "Dashboard",
  notificationCount = 0,
  userProfile = { name: "User" },
  onNotificationClick,
  className = "",
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const router = useRouter();

  const handleNotificationClick = () => {
    if (onNotificationClick) {
      onNotificationClick();
    } else {
      router.push('/dashboard/messages');
    }
  };

  // Zobrazit jméno nebo zkrácenou adresu
  const displayName = userProfile.name || 
    (userProfile.address ? `${userProfile.address.slice(0, 6)}...${userProfile.address.slice(-4)}` : "User");

  return (
    <div className={`w-full bg-transparent ${className}`}>
      <div className="flex justify-between items-center px-6 py-4">
        {/* Left side - Page title */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
        </div>

        {/* Right side - Notifications and Profile */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button
            onClick={handleNotificationClick}
            className="relative flex items-center justify-center h-10 w-10 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 
                     hover:bg-white/10 hover:border-[#F9D523]/30 transition-all duration-300 group"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-white/70 group-hover:text-[#F9D523] transition-colors" />
            
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#F9D523] text-black text-xs font-bold 
                             rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                {notificationCount > 9 ? "9+" : notificationCount}
              </span>
            )}
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 h-10 px-3 rounded-lg bg-white/5 backdrop-blur-sm 
                       border border-white/10 hover:bg-white/10 hover:border-[#F9D523]/30 
                       transition-all duration-300 group"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#B29819] to-[#F9D523] 
                            flex items-center justify-center flex-shrink-0">
                {userProfile.avatar ? (
                  <img src={userProfile.avatar} alt={displayName} className="w-full h-full rounded-full" />
                ) : (
                  <User className="w-4 h-4 text-black" />
                )}
              </div>
              
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-white">{displayName}</p>
                {userProfile.kycVerified && (
                  <p className="text-xs text-green-400">✓ Ověřeno</p>
                )}
              </div>
              
              <ChevronDown className={`w-4 h-4 text-white/70 transition-transform duration-200 
                                    ${showProfileMenu ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 rounded-lg bg-[#1a1a1a]/95 backdrop-blur-xl 
                            border border-white/10 shadow-xl overflow-hidden z-50">
                <div className="p-4 border-b border-white/10">
                  <p className="text-white font-medium">{displayName}</p>
                  {userProfile.email && (
                    <p className="text-white/50 text-sm mt-1">{userProfile.email}</p>
                  )}
                </div>

                <div className="p-2">
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 
                             hover:bg-white/5 hover:text-[#F9D523] transition-all duration-200"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>Můj profil</span>
                  </Link>
                  
                  <Link
                    href="/dashboard/profile/settings"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 
                             hover:bg-white/5 hover:text-[#F9D523] transition-all duration-200"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Nastavení & KYC</span>
                  </Link>

                  <hr className="my-2 border-white/10" />

                  <button
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 
                             hover:bg-red-500/10 transition-all duration-200 w-full text-left"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Odhlásit se</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;