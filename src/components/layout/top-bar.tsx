"use client";

import React, { useState } from "react";

interface TopBarProps {
  notificationCount?: number;
  userProfile?: {
    name?: string;
    avatar?: string;
    email?: string;
  };
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
  className?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  notificationCount = 0,
  userProfile = { name: "Profil" },
  onNotificationClick,
  onProfileClick,
  className = "",
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div className={`bg-transparent ${className}`}>
      {/* Full width wrapper bez marginů/paddingů */}
      <div className="w-full">
        <div className="flex justify-end items-center space-x-4 sm:space-x-6 px-4 sm:px-6 py-3 sm:py-4">
          {/* Notifications */}
          <button
            onClick={onNotificationClick}
            className="relative p-2 sm:p-3 text-white hover:text-[#F9D523] transition-colors rounded-lg hover:bg-white/5"
            aria-label="Notifications"
          >
            <svg
              width="24"
              height="24"
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
            {notificationCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-[#EF4444] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium min-w-[20px]">
                {notificationCount > 9 ? "9+" : notificationCount}
              </div>
            )}
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 text-white hover:text-[#F9D523] transition-colors rounded-lg hover:bg-white/5"
              aria-haspopup="true"
              aria-expanded={showProfileMenu}
            >
              {/* Profile icon */}
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
                className="text-white sm:w-6 sm:h-6"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>

              <span className="text-sm font-medium select-none hidden sm:block">
                {userProfile.name}
              </span>

              {/* Dropdown arrow */}
              <svg
                width="12"
                height="12"
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
              <div className="absolute right-0 top-full mt-2 w-48 bg-[#151515]/95 backdrop-blur-md rounded-lg shadow-xl z-50 border border-[#333333]/50">
                <div className="py-2">
                  <div className="px-4 py-2">
                    <div className="text-white font-medium">{userProfile.name}</div>
                    {userProfile.email && (
                      <div className="text-[#666666] text-sm">{userProfile.email}</div>
                    )}
                  </div>

                  <button
                    onClick={onProfileClick}
                    className="w-full text-left px-4 py-2 text-[#666666] hover:text-[#F9D523] hover:bg-[#1a1a1a]/50 transition-colors"
                  >
                    Nastavení profilu
                  </button>

                  <button
                    className="w-full text-left px-4 py-2 text-[#666666] hover:text-[#F9D523] hover:bg-[#1a1a1a]/50 transition-colors"
                  >
                    Odhlásit se
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