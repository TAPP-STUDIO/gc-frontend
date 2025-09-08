"use client";

import React from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Activity, TrendingUp, Users, DollarSign, Package, Settings } from "lucide-react";

export default function DemoPage() {
  const userProfile = {
    name: "Demo Uživatel",
    email: "demo@gavlikcapital.com",
    address: "0x123...abc",
    kycVerified: true,
  };

  return (
    <div className="min-h-screen">
      {/* Transparentní TopBar */}
      <TopBar 
        title="Demo Dashboard"
        userProfile={userProfile}
        notificationCount={5}
      />

      <div className="p-6 lg:p-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Stat Card 1 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 
                        hover:bg-white/10 hover:border-[#F9D523]/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-[#F9D523]" />
              <span className="text-green-400 text-sm">+12.5%</span>
            </div>
            <p className="text-white/60 text-sm mb-1">Total Value</p>
            <p className="text-2xl font-bold text-white">$45,231</p>
          </div>

          {/* Stat Card 2 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 
                        hover:bg-white/10 hover:border-[#F9D523]/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-[#F9D523]" />
              <span className="text-green-400 text-sm">+8.2%</span>
            </div>
            <p className="text-white/60 text-sm mb-1">Monthly Profit</p>
            <p className="text-2xl font-bold text-white">$3,721</p>
          </div>

          {/* Stat Card 3 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 
                        hover:bg-white/10 hover:border-[#F9D523]/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <Package className="w-8 h-8 text-[#F9D523]" />
            </div>
            <p className="text-white/60 text-sm mb-1">Active Projects</p>
            <p className="text-2xl font-bold text-white">12</p>
          </div>

          {/* Stat Card 4 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 
                        hover:bg-white/10 hover:border-[#F9D523]/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-[#F9D523]" />
            </div>
            <p className="text-white/60 text-sm mb-1">Referrals</p>
            <p className="text-2xl font-bold text-white">28</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Large Card */}
          <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#F9D523]" />
              Portfolio Performance
            </h2>
            
            <div className="h-64 flex items-center justify-center text-white/40">
              {/* Chart would go here */}
              <p>Chart Placeholder</p>
            </div>

            {/* Chart Controls */}
            <div className="flex justify-center gap-2 mt-6">
              {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map((period) => (
                <button
                  key={period}
                  className="px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-lg
                           text-white/70 hover:bg-white/10 hover:border-[#F9D523]/30 
                           hover:text-[#F9D523] transition-all duration-300"
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#F9D523]" />
                Quick Actions
              </h3>
              
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg
                                 text-white hover:bg-white/10 hover:border-[#F9D523]/30 
                                 hover:text-[#F9D523] transition-all duration-300 text-left">
                  Claim Rewards
                </button>
                <button className="w-full px-4 py-3 bg-gradient-to-r from-[#B29819] to-[#F9D523] 
                                 text-black font-bold rounded-lg hover:from-[#F9D523] hover:to-[#E6C547] 
                                 transform hover:scale-105 transition-all duration-300">
                  Invest Now
                </button>
                <button className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg
                                 text-white hover:bg-white/10 hover:border-[#F9D523]/30 
                                 hover:text-[#F9D523] transition-all duration-300 text-left">
                  View Reports
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
              
              <div className="space-y-3">
                {[
                  { type: "deposit", amount: "+$1,000", time: "2 hours ago" },
                  { type: "claim", amount: "+$150", time: "5 hours ago" },
                  { type: "referral", amount: "+2 users", time: "1 day ago" },
                ].map((activity, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-white text-sm capitalize">{activity.type}</p>
                      <p className="text-white/40 text-xs">{activity.time}</p>
                    </div>
                    <span className="text-green-400 font-medium">{activity.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-6">Test Glassmorphism & Hover Effects</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="dashboard-button px-6 py-3">
                Dashboard Button
              </button>
              
              <button className="unified-button unified-button-md">
                Unified Button
              </button>
              
              <button className="px-6 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 
                             rounded-lg text-white hover:bg-gradient-to-r hover:from-[#B29819] 
                             hover:to-[#F9D523] hover:text-black hover:border-[#F9D523] 
                             transition-all duration-500 hover:scale-105">
                Custom Hover
              </button>
            </div>
            
            <p className="text-white/60 text-sm mt-6">
              Všechna tlačítka by měla mít zlatý hover efekt při najetí myší. 
              Pozadí používá content.svg a sidebar má glassmorphism efekt.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}