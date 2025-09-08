"use client";

import React from "react";
import { TopBar } from "@/components/layout/TopBar";
import { User, Shield, Activity, Calendar, Award, TrendingUp } from "lucide-react";

export default function ProfilePage() {
  // Mock data - nahradit skutečnými daty
  const userProfile = {
    name: "Jan Novák",
    email: "jan.novak@email.cz",
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb3",
    kycVerified: true,
    joinDate: "2024-01-15",
    tier: "Gold",
    totalInvested: "$15,000",
    totalReturns: "$3,500",
    roi: "+23.33%",
    activeProjects: 4,
    completedProjects: 7,
    referrals: 12,
  };

  return (
    <div className="min-h-screen">
      {/* Transparentní TopBar */}
      <TopBar 
        title="Můj profil"
        userProfile={userProfile}
        notificationCount={3}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#B29819] to-[#F9D523] 
                            flex items-center justify-center text-4xl font-bold text-black">
                {userProfile.name.split(' ').map(n => n[0]).join('')}
              </div>
              {userProfile.kycVerified && (
                <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-2 border-4 border-[#151515]">
                  <Shield className="w-5 h-5 text-white" />
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">{userProfile.name}</h1>
                <span className="px-3 py-1 bg-gradient-to-r from-[#B29819] to-[#F9D523] 
                               text-black font-bold rounded-full text-sm">
                  {userProfile.tier}
                </span>
              </div>
              <p className="text-white/60 mb-1">{userProfile.email}</p>
              <p className="text-white/40 text-sm mb-4">
                {userProfile.address}
              </p>
              <p className="text-white/50 text-sm">
                Člen od {new Date(userProfile.joinDate).toLocaleDateString('cs-CZ', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <a
                href="/dashboard/profile/settings"
                className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 
                         rounded-lg text-white hover:bg-white/20 hover:border-[#F9D523]/50 
                         transition-all duration-300 text-center"
              >
                Upravit profil
              </a>
              <button className="px-6 py-3 bg-gradient-to-r from-[#B29819] to-[#F9D523] 
                             text-black font-bold rounded-lg 
                             hover:from-[#F9D523] hover:to-[#E6C547] 
                             transform hover:scale-105 transition-all duration-300">
                Pozvat přátele
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Invested */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-[#F9D523]" />
              <span className="text-green-400 text-sm font-medium">+12.5%</span>
            </div>
            <p className="text-white/60 text-sm mb-1">Celkem investováno</p>
            <p className="text-2xl font-bold text-white">{userProfile.totalInvested}</p>
          </div>

          {/* Total Returns */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Award className="w-8 h-8 text-[#F9D523]" />
              <span className="text-green-400 text-sm font-medium">{userProfile.roi}</span>
            </div>
            <p className="text-white/60 text-sm mb-1">Celkové výnosy</p>
            <p className="text-2xl font-bold text-white">{userProfile.totalReturns}</p>
          </div>

          {/* Active Projects */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-[#F9D523]" />
            </div>
            <p className="text-white/60 text-sm mb-1">Aktivní projekty</p>
            <p className="text-2xl font-bold text-white">{userProfile.activeProjects}</p>
          </div>

          {/* Referrals */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <User className="w-8 h-8 text-[#F9D523]" />
            </div>
            <p className="text-white/60 text-sm mb-1">Doporučení</p>
            <p className="text-2xl font-bold text-white">{userProfile.referrals}</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#F9D523]" />
            Nedávná aktivita
          </h2>
          
          <div className="space-y-4">
            {[
              { date: "2024-03-15", action: "Investice do GC Cards", amount: "+$5,000", status: "completed" },
              { date: "2024-03-14", action: "Výběr dividend", amount: "+$250", status: "completed" },
              { date: "2024-03-12", action: "KYC ověření dokončeno", amount: "", status: "success" },
              { date: "2024-03-10", action: "Nové doporučení", amount: "+2 uživatelé", status: "info" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === "completed" ? "bg-green-400" :
                    activity.status === "success" ? "bg-blue-400" :
                    "bg-yellow-400"
                  }`} />
                  <div>
                    <p className="text-white font-medium">{activity.action}</p>
                    <p className="text-white/40 text-sm">
                      {new Date(activity.date).toLocaleDateString('cs-CZ')}
                    </p>
                  </div>
                </div>
                {activity.amount && (
                  <span className={`font-bold ${
                    activity.amount.startsWith('+') ? 'text-green-400' : 'text-white'
                  }`}>
                    {activity.amount}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}