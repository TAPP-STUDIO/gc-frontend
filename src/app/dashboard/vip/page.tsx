'use client';

import React from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { DashboardCard } from '@/components/dashboard';

// Mock data pro VIP členy
const vipMembers = [
  {
    id: 1,
    name: 'Pavel Novák',
    email: 'pavel.novak@email.cz',
    address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb3',
    joinDate: '2024-01-15',
    status: 'active',
    level: 'VIP',
    cardsOwned: 5,
    totalInvestment: 12500
  },
  {
    id: 2,
    name: 'Anna Svobodová',
    email: 'anna.svobodova@email.cz',
    address: '0x8f7E3b2C9d1A6548FbD2E7C8A4B6E5D3F9A2C1B4',
    joinDate: '2024-02-03',
    status: 'active',
    level: 'VIP',
    cardsOwned: 12,
    totalInvestment: 28000
  },
  {
    id: 3,
    name: 'Martin Dvořák',
    email: 'martin.dvorak@email.cz',
    address: '0x5D2F8E4A7B1C9E6D8F2A5C7B4E9D6F8A1C3B7E9D',
    joinDate: '2024-03-12',
    status: 'active',
    level: 'VIP',
    cardsOwned: 8,
    totalInvestment: 45000
  },
  {
    id: 4,
    name: 'Tereza Krásná',
    email: 'tereza.krasna@email.cz',
    address: '0x9A3B6E2D8F1C5A7E4B9D2F6A8C1E5B7D9F3A6C8E',
    joinDate: '2024-04-08',
    status: 'active',
    level: 'VIP',
    cardsOwned: 3,
    totalInvestment: 8500
  },
  {
    id: 5,
    name: 'Tomáš Veselý',
    email: 'tomas.vesely@email.cz',
    address: '0x6C8A2E5D1F9B7A4E8C2D5F7A9B1E4D6F8A2C5E7D',
    joinDate: '2024-05-20',
    status: 'active',
    level: 'VIP',
    cardsOwned: 15,
    totalInvestment: 55000
  },
  {
    id: 6,
    name: 'Lucie Černá',
    email: 'lucie.cerna@email.cz',
    address: '0x1E4B7D9F2A5C8E6D1F4A7C9E2B5D8F1A4C7E9B2D',
    joinDate: '2024-06-15',
    status: 'active',
    level: 'VIP',
    cardsOwned: 6,
    totalInvestment: 16000
  }
];

const vipStats = {
  totalMembers: vipMembers.length,
  totalInvestment: vipMembers.reduce((sum, member) => sum + member.totalInvestment, 0),
  averageInvestment: Math.round(vipMembers.reduce((sum, member) => sum + member.totalInvestment, 0) / vipMembers.length),
  activeMembers: vipMembers.filter(member => member.status === 'active').length
};


const formatAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export default function VipPage() {
  // Mock user data
  const userProfile = {
    name: "Admin User",
    email: "admin@gavlikcapital.com",
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb3",
    kycVerified: true,
  };

  return (
    <div className="min-h-screen">
      {/* TopBar */}
      <TopBar 
        title="VIP Club"
        userProfile={userProfile}
        notificationCount={3}
      />
      
      <div className="p-4 sm:p-6 lg:p-8">
        
        {/* VIP Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard className="text-center p-6">
            <div className="text-3xl font-bold text-[#F9D523] mb-2">
              {vipStats.totalMembers}
            </div>
            <div className="text-white/70 text-sm">
              Celkem členů
            </div>
          </DashboardCard>
          
          <DashboardCard className="text-center p-6">
            <div className="text-3xl font-bold text-[#F9D523] mb-2">
              {vipStats.activeMembers}
            </div>
            <div className="text-white/70 text-sm">
              Aktivní členové
            </div>
          </DashboardCard>
          
          <DashboardCard className="text-center p-6">
            <div className="text-3xl font-bold text-[#F9D523] mb-2">
              ${vipStats.totalInvestment.toLocaleString()}
            </div>
            <div className="text-white/70 text-sm">
              Celková investice
            </div>
          </DashboardCard>
          
          <DashboardCard className="text-center p-6">
            <div className="text-3xl font-bold text-[#F9D523] mb-2">
              ${vipStats.averageInvestment.toLocaleString()}
            </div>
            <div className="text-white/70 text-sm">
              Průměrná investice
            </div>
          </DashboardCard>
        </div>

        {/* VIP Members List */}
        <DashboardCard className="overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white mb-2">VIP Členové</h2>
            <p className="text-white/70">Seznam všech VIP členů s přehledem jejich portfolia</p>
          </div>
          
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full min-w-[800px]">
              <thead className="border-b border-white/10">
                <tr className="bg-white/5">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/70">Člen</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/70">Úroveň</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/70">Karty</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/70">Investice</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/70">Datum vstupu</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-white/70">Status</th>
                </tr>
              </thead>
              <tbody>
                {vipMembers.map((member) => (
                  <tr 
                    key={member.id} 
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div>
                        <div className="text-white font-medium mb-1">{member.name}</div>
                        <div className="text-white/50 text-sm">{member.email}</div>
                        <div className="text-white/40 text-xs font-mono">
                          {formatAddress(member.address)}
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium border text-[#F9D523] bg-[#F9D523]/10 border-[#F9D523]/30">
                        {member.level}
                      </span>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="text-white font-semibold">
                        {member.cardsOwned}
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="text-[#F9D523] font-bold">
                        ${member.totalInvestment.toLocaleString()}
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="text-white/70">
                        {new Date(member.joinDate).toLocaleDateString('cs-CZ')}
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        member.status === 'active' 
                          ? 'text-green-400 bg-green-400/10 border border-green-400/30' 
                          : 'text-red-400 bg-red-400/10 border border-red-400/30'
                      }`}>
                        {member.status === 'active' ? 'Aktivní' : 'Neaktivní'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-6 border-t border-white/10 bg-white/[0.02]">
            <div className="flex items-center justify-between">
              <p className="text-white/70 text-sm">
                Zobrazeno {vipMembers.length} z {vipStats.totalMembers} členů
              </p>
              <div className="flex gap-2">
                <button className="unified-button unified-button-sm">
                  <span>Export CSV</span>
                </button>
                <button className="unified-button unified-button-sm">
                  <span>Přidat člena</span>
                </button>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
