'use client';

import React, { useState } from 'react';
import { 
  DashboardButton, 
  DashboardCard, 
  StatCard,
} from '@/components/dashboard';

export default function UsersAdminPage() {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Mock user data
  const users = [
    {
      id: '1',
      address: '0x1234...5678',
      ensName: 'alice.eth',
      joinDate: '2024-01-15',
      lastActive: '2 min ago',
      nftsOwned: 15,
      totalValue: 12500,
      status: 'active',
      tier: 'premium',
      kycStatus: 'verified',
      email: 'alice@example.com',
      country: 'CZ',
      referrals: 3,
      totalSpent: 8750,
    },
    {
      id: '2',
      address: '0x8765...4321',
      ensName: null,
      joinDate: '2024-02-03',
      lastActive: '1 hour ago',
      nftsOwned: 7,
      totalValue: 5600,
      status: 'active',
      tier: 'basic',
      kycStatus: 'pending',
      email: 'bob@example.com',
      country: 'SK',
      referrals: 1,
      totalSpent: 2100,
    },
    {
      id: '3',
      address: '0x9999...1111',
      ensName: 'crypto.eth',
      joinDate: '2023-12-08',
      lastActive: '3 days ago',
      nftsOwned: 42,
      totalValue: 89400,
      status: 'vip',
      tier: 'vip',
      kycStatus: 'verified',
      email: 'crypto@example.com',
      country: 'US',
      referrals: 15,
      totalSpent: 45600,
    },
    {
      id: '4',
      address: '0x7777...3333',
      ensName: null,
      joinDate: '2024-03-22',
      lastActive: '5 min ago',
      nftsOwned: 3,
      totalValue: 1200,
      status: 'inactive',
      tier: 'basic',
      kycStatus: 'rejected',
      email: 'david@example.com',
      country: 'DE',
      referrals: 0,
      totalSpent: 600,
    },
    {
      id: '5',
      address: '0x5555...9999',
      ensName: 'whale.eth',
      joinDate: '2023-11-12',
      lastActive: '1 min ago',
      nftsOwned: 156,
      totalValue: 234000,
      status: 'vip',
      tier: 'whale',
      kycStatus: 'verified',
      email: 'whale@example.com',
      country: 'UK',
      referrals: 47,
      totalSpent: 187500,
    },
  ];

  // User stats
  const userStats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active' || u.status === 'vip').length,
    newUsers30d: users.filter(u => new Date(u.joinDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length,
    verifiedUsers: users.filter(u => u.kycStatus === 'verified').length,
  };

  const handleUserAction = (action: string, userId: string | string[]) => {
    console.log(`Admin action: ${action} for user(s): ${userId}`);
    // TODO: Implement actual actions
  };

  const handleBulkAction = (action: string) => {
    if (selectedUsers.length === 0) {
      alert('Prosím vyberte nějaké uživatele');
      return;
    }
    handleUserAction(action, selectedUsers);
  };

  const filteredUsers = users.filter(user => {
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    const matchesSearch = searchQuery === '' || 
      user.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.ensName && user.ensName.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'vip': return 'bg-purple-500/20 text-purple-500 border-purple-500/30';
      case 'inactive': return 'bg-red-500/20 text-red-500 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'whale': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'vip': return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      case 'premium': return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      case 'basic': return 'bg-gradient-to-r from-gray-500 to-gray-600';
      default: return 'bg-gray-500';
    }
  };

  const getKYCStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-500';
      case 'pending': return 'text-yellow-500';
      case 'rejected': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('cs-CZ');
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Admin Page Header - UNIFIED STYLE */}
      <DashboardCard variant="highlighted" className="mb-6 border-red-500/20 bg-gradient-to-br from-red-500/5 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Správa Uživatelů</h1>
              <p className="text-white/60 text-sm">Kompletní správa uživatelských účtů a KYC</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <DashboardButton variant="outline" className="border-red-500 text-red-400">
              Export Users
            </DashboardButton>
            <DashboardButton variant="primary" className="bg-red-500 border-red-500">
              Add User
            </DashboardButton>
          </div>
        </div>
      </DashboardCard>

      {/* User Stats - UNIFIED STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Celkem Uživatelů"
          value={userStats.totalUsers.toString()}
        />
        
        <StatCard
          title="Aktivní Uživatelé"
          value={userStats.activeUsers.toString()}
          trend={{
            value: 12,
            isPositive: true
          }}
        />
        
        <StatCard
          title="Noví (30 dní)"
          value={userStats.newUsers30d.toString()}
          trend={{
            value: 8,
            isPositive: true
          }}
        />
        
        <StatCard
          title="Ověření Uživatelé"
          value={userStats.verifiedUsers.toString()}
        />
      </div>

      {/* Filters and Search - UNIFIED STYLE */}
      <DashboardCard variant="default" className="mb-6">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Hledat podle adresy, emailu, ENS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 pl-10 text-white placeholder-white/50 focus:border-red-400 focus:outline-none backdrop-blur-md"
              />
              <svg className="absolute left-3 top-2.5 w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white focus:border-red-400 focus:outline-none backdrop-blur-md"
            >
              <option value="all">Všichni uživatelé</option>
              <option value="active">Aktivní</option>
              <option value="vip">VIP</option>
              <option value="inactive">Neaktivní</option>
            </select>

            {/* Bulk Actions */}
            {selectedUsers.length > 0 && (
              <div className="flex gap-2">
                <DashboardButton
                  variant="outline"
                  onClick={() => handleBulkAction('verify')}
                  className="border-green-500 text-green-400 hover:bg-green-500/20"
                >
                  Ověřit ({selectedUsers.length})
                </DashboardButton>
                <DashboardButton
                  variant="outline"
                  onClick={() => handleBulkAction('suspend')}
                  className="border-red-500 text-red-400 hover:bg-red-500/20"
                >
                  Pozastavit ({selectedUsers.length})
                </DashboardButton>
              </div>
            )}
          </div>
        </div>
      </DashboardCard>

      {/* Users Table - UNIFIED STYLE */}
      <DashboardCard variant="default" padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead 
              className="border-b border-white/10"
              style={{ background: 'rgba(255, 255, 255, 0.02)' }}
            >
              <tr>
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers(filteredUsers.map(u => u.id));
                      } else {
                        setSelectedUsers([]);
                      }
                    }}
                    className="rounded border-white/30 bg-white/5 text-red-500 focus:ring-red-400 focus:ring-offset-0"
                  />
                </th>
                <th className="text-left p-4 text-white/60 text-sm font-medium">Uživatel</th>
                <th className="text-left p-4 text-white/60 text-sm font-medium">Tier</th>
                <th className="text-left p-4 text-white/60 text-sm font-medium">NFTs</th>
                <th className="text-left p-4 text-white/60 text-sm font-medium">Hodnota</th>
                <th className="text-left p-4 text-white/60 text-sm font-medium">Status</th>
                <th className="text-left p-4 text-white/60 text-sm font-medium">KYC</th>
                <th className="text-left p-4 text-white/60 text-sm font-medium">Aktivita</th>
                <th className="text-left p-4 text-white/60 text-sm font-medium">Akce</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers([...selectedUsers, user.id]);
                        } else {
                          setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                        }
                      }}
                      className="rounded border-white/30 bg-white/5 text-red-500 focus:ring-red-400 focus:ring-offset-0"
                    />
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-white text-sm">
                          {user.ensName || `${user.address.slice(0, 6)}...${user.address.slice(-4)}`}
                        </p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTierColor(user.tier)} text-white`}>
                          {user.tier.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-white/60 mt-1">{user.email}</p>
                      <p className="text-xs text-white/40">
                        {user.ensName ? user.address : `Joined: ${formatDate(user.joinDate)}`}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-white">{user.tier}</span>
                      <span className="text-xs text-white/60">{user.referrals} referrals</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-white">{user.nftsOwned}</span>
                      <span className="text-xs text-white/60">NFTs owned</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-white">${user.totalValue.toLocaleString()}</span>
                      <span className="text-xs text-white/60">Portfolio value</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <svg className={`w-4 h-4 ${getKYCStatusColor(user.kycStatus)}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {user.kycStatus === 'verified' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />}
                        {user.kycStatus === 'pending' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />}
                        {user.kycStatus === 'rejected' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />}
                      </svg>
                      <span className={`text-xs ${getKYCStatusColor(user.kycStatus)}`}>
                        {user.kycStatus}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-xs text-white/60">{user.lastActive}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <DashboardButton
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUserAction('view', user.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        View
                      </DashboardButton>
                      <DashboardButton
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUserAction('edit', user.id)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        Edit
                      </DashboardButton>
                      <DashboardButton
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUserAction('suspend', user.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Suspend
                      </DashboardButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination - UNIFIED STYLE */}
        <div 
          className="px-6 py-3 border-t border-white/10"
          style={{ background: 'rgba(255, 255, 255, 0.02)' }}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/60">
              Zobrazeno {filteredUsers.length} z {users.length} uživatelů
            </p>
            <div className="flex space-x-2">
              <DashboardButton variant="outline" size="sm">
                Předchozí
              </DashboardButton>
              <DashboardButton variant="primary" size="sm" className="bg-red-500 border-red-500">
                1
              </DashboardButton>
              <DashboardButton variant="outline" size="sm">
                Další
              </DashboardButton>
            </div>
          </div>
        </div>
      </DashboardCard>

      {/* Quick Actions - UNIFIED STYLE */}
      <DashboardCard variant="default" className="mt-6">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white">Rychlé Akce</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardButton 
            variant="outline"
            onClick={() => handleUserAction('export', 'all')}
            className="p-4 border-blue-500/30 text-blue-400 hover:bg-blue-500/10 h-auto flex-col"
          >
            <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm font-medium">Export Uživatelů</span>
          </DashboardButton>
          
          <DashboardButton 
            variant="outline"
            onClick={() => handleUserAction('kyc-review', 'pending')}
            className="p-4 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 h-auto flex-col"
          >
            <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <span className="text-sm font-medium">KYC Review</span>
          </DashboardButton>
          
          <DashboardButton 
            variant="outline"
            onClick={() => handleUserAction('send-notification', 'all')}
            className="p-4 border-purple-500/30 text-purple-400 hover:bg-purple-500/10 h-auto flex-col"
          >
            <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h7l2-2H4v2zM4 15h7l2-2H4v2zM4 11h7l2-2H4v2z" />
            </svg>
            <span className="text-sm font-medium">Send Notification</span>
          </DashboardButton>
          
          <DashboardButton 
            variant="outline"
            onClick={() => handleUserAction('analytics', 'all')}
            className="p-4 border-green-500/30 text-green-400 hover:bg-green-500/10 h-auto flex-col"
          >
            <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="text-sm font-medium">User Analytics</span>
          </DashboardButton>
        </div>
      </DashboardCard>
    </div>
  );
}
