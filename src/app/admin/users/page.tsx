'use client';

import React, { useState } from 'react';
import { Container, Stack, PageHeader } from '@/components/layout';
import { EnhancedValueCard } from '@/components/cards';

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
    <Container fluid className="py-4 sm:py-6">
      <Stack spacing="lg">
        <PageHeader 
          title="Správa Uživatelů"
          showBackButton={true}
        />

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <EnhancedValueCard
            title="Celkem Uživatelů"
            value={userStats.totalUsers}
            formatter={(v) => v.toLocaleString()}
            className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20"
          />
          
          <EnhancedValueCard
            title="Aktivní Uživatelé"
            value={userStats.activeUsers}
            formatter={(v) => v.toLocaleString()}
            trend={{
              value: 12,
              direction: 'up',
              period: 'týden'
            }}
            className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20"
          />
          
          <EnhancedValueCard
            title="Noví (30 dní)"
            value={userStats.newUsers30d}
            formatter={(v) => v.toLocaleString()}
            trend={{
              value: 8,
              direction: 'up',
              period: 'měsíc'
            }}
            className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20"
          />
          
          <EnhancedValueCard
            title="Ověření Uživatelé"
            value={userStats.verifiedUsers}
            formatter={(v) => v.toLocaleString()}
            className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border-yellow-500/20"
          />
        </div>

        {/* Filters and Search */}
        <div className="bg-[#151515] rounded-xl border border-[#333333] p-6">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Hledat podle adresy, emailu, ENS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#333333] rounded-lg px-4 py-2 pl-10 text-white placeholder-[#666666] focus:border-[#F9D523] focus:outline-none"
                />
                <svg className="absolute left-3 top-2.5 w-4 h-4 text-[#666666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-[#1a1a1a] border border-[#333333] rounded-lg px-3 py-2 text-white focus:border-[#F9D523] focus:outline-none"
              >
                <option value="all">Všichni uživatelé</option>
                <option value="active">Aktivní</option>
                <option value="vip">VIP</option>
                <option value="inactive">Neaktivní</option>
              </select>

              {/* Bulk Actions */}
              {selectedUsers.length > 0 && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleBulkAction('verify')}
                    className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-3 py-2 rounded-lg text-sm font-medium transition-colors border border-green-500/30"
                  >
                    Ověřit ({selectedUsers.length})
                  </button>
                  <button
                    onClick={() => handleBulkAction('suspend')}
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-2 rounded-lg text-sm font-medium transition-colors border border-red-500/30"
                  >
                    Pozastavit ({selectedUsers.length})
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-[#151515] rounded-xl border border-[#333333] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#1a1a1a] border-b border-[#333333]">
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
                      className="rounded border-[#333333] bg-[#1a1a1a] text-[#F9D523] focus:ring-[#F9D523]"
                    />
                  </th>
                  <th className="text-left p-4 text-[#666666] text-sm font-medium">Uživatel</th>
                  <th className="text-left p-4 text-[#666666] text-sm font-medium">Tier</th>
                  <th className="text-left p-4 text-[#666666] text-sm font-medium">NFTs</th>
                  <th className="text-left p-4 text-[#666666] text-sm font-medium">Hodnota</th>
                  <th className="text-left p-4 text-[#666666] text-sm font-medium">Status</th>
                  <th className="text-left p-4 text-[#666666] text-sm font-medium">KYC</th>
                  <th className="text-left p-4 text-[#666666] text-sm font-medium">Aktivita</th>
                  <th className="text-left p-4 text-[#666666] text-sm font-medium">Akce</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#333333]">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-[#1a1a1a]/50 transition-colors">
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
                        className="rounded border-[#333333] bg-[#1a1a1a] text-[#F9D523] focus:ring-[#F9D523]"
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
                        <p className="text-xs text-[#666666] mt-1">{user.email}</p>
                        <p className="text-xs text-[#666666]">
                          {user.ensName ? user.address : `Joined: ${formatDate(user.joinDate)}`}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-white">{user.tier}</span>
                        <span className="text-xs text-[#666666]">{user.referrals} referrals</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">{user.nftsOwned}</span>
                        <span className="text-xs text-[#666666]">NFTs owned</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">${user.totalValue.toLocaleString()}</span>
                        <span className="text-xs text-[#666666]">Portfolio value</span>
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
                      <span className="text-xs text-[#666666]">{user.lastActive}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleUserAction('view', user.id)}
                          className="text-[#F9D523] hover:text-[#e3c320] text-xs transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleUserAction('edit', user.id)}
                          className="text-blue-400 hover:text-blue-300 text-xs transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleUserAction('suspend', user.id)}
                          className="text-red-400 hover:text-red-300 text-xs transition-colors"
                        >
                          Suspend
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="bg-[#1a1a1a] px-6 py-3 border-t border-[#333333]">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#666666]">
                Zobrazeno {filteredUsers.length} z {users.length} uživatelů
              </p>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-[#333333] hover:bg-[#444444] text-white text-sm rounded transition-colors">
                  Předchozí
                </button>
                <button className="px-3 py-1 bg-[#F9D523] hover:bg-[#e3c320] text-[#151515] text-sm rounded transition-colors">
                  1
                </button>
                <button className="px-3 py-1 bg-[#333333] hover:bg-[#444444] text-white text-sm rounded transition-colors">
                  Další
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#151515] rounded-xl border border-[#333333] p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Rychlé Akce</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button 
              onClick={() => handleUserAction('export', 'all')}
              className="p-4 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg border border-blue-500/30 transition-colors"
            >
              <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm font-medium">Export Uživatelů</p>
            </button>
            
            <button 
              onClick={() => handleUserAction('kyc-review', 'pending')}
              className="p-4 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg border border-yellow-500/30 transition-colors"
            >
              <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <p className="text-sm font-medium">KYC Review</p>
            </button>
            
            <button 
              onClick={() => handleUserAction('send-notification', 'all')}
              className="p-4 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg border border-purple-500/30 transition-colors"
            >
              <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h7l2-2H4v2zM4 15h7l2-2H4v2zM4 11h7l2-2H4v2z" />
              </svg>
              <p className="text-sm font-medium">Send Notification</p>
            </button>
            
            <button 
              onClick={() => handleUserAction('analytics', 'all')}
              className="p-4 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg border border-green-500/30 transition-colors"
            >
              <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-sm font-medium">User Analytics</p>
            </button>
          </div>
        </div>
      </Stack>
    </Container>
  );
}
