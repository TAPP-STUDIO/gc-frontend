"use client";

import React from "react";
import { TopBar } from "@/components/layout/TopBar";
import { ProfileSettings } from "@/components/profile/ProfileSettings";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProfileSettingsPage() {
  // Mock data - nahradit skutečnými daty
  const userProfile = {
    name: "Jan Novák",
    email: "jan.novak@email.cz",
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb3",
    kycVerified: false, // Zatím neověřeno
  };

  return (
    <div className="min-h-screen">
      {/* Transparentní TopBar */}
      <TopBar 
        title="Nastavení profilu"
        userProfile={userProfile}
        notificationCount={3}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back button */}
        <Link 
          href="/dashboard/profile"
          className="inline-flex items-center gap-2 text-white/60 hover:text-[#F9D523] 
                   transition-colors duration-200 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Zpět na profil</span>
        </Link>

        {/* Profile Settings Component */}
        <ProfileSettings />
      </div>
    </div>
  );
}