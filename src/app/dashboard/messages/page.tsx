'use client';

import React, { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { DashboardButton } from '@/components/dashboard';
import { NotificationDetailModal, NotificationList } from '@/components/notifications/NotificationModal';
import { useNotifications } from '@/hook/useApi';
import { 
  Bell, 
  CheckCircle2, 
  Filter,
  Search,
  Settings
} from 'lucide-react';

// Mock data - replace with real API calls
const mockNotifications = [
  {
    id: '1',
    title: 'Dividenda byla vyplacena',
    message: 'Byla vám vyplacena dividenda ve výši $125.50 z projektu GC Cards ETH. Částka byla připsána na váš účet.',
    type: 'dividend' as const,
    read: false,
    createdAt: '2025-09-08T10:30:00Z',
    actionUrl: '/dashboard/portfolio/gc-cards',
    metadata: {
      amount: 125.50,
      currency: 'USD',
      projectId: 'gc-cards-eth'
    }
  },
  {
    id: '2',
    title: 'Nová zpráva od týmu',
    message: 'Tým GC vás informuje o nadcházejících změnách v portfoliu a nových investičních příležitostech.',
    type: 'info' as const,
    read: false,
    createdAt: '2025-09-08T09:15:00Z',
    actionUrl: '/dashboard/messages/2'
  },
  {
    id: '3',
    title: 'Transakce úspěšně dokončena',
    message: 'Váš nákup NFT "BTC Bot #1234" byl úspěšně dokončen za $1,850.',
    type: 'success' as const,
    read: true,
    createdAt: '2025-09-07T16:45:00Z',
    metadata: {
      amount: 1850,
      currency: 'USD',
      transactionHash: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb3'
    }
  },
  {
    id: '4',
    title: 'Upozornění: Nízký zůstatek',
    message: 'Váš zůstatek na účtu je nižší než $100. Doporučujeme dobití účtu pro pokračování v tradingu.',
    type: 'warning' as const,
    read: true,
    createdAt: '2025-09-07T14:20:00Z',
    actionUrl: '/dashboard/profile/settings'
  },
  {
    id: '5',
    title: 'Systémová údržba',
    message: 'Dne 10.9.2025 od 02:00 do 04:00 bude probíhat plánovaná údržba systému. Během této doby může být omezena funkcionalita.',
    type: 'system' as const,
    read: true,
    createdAt: '2025-09-06T12:00:00Z'
  }
];

type FilterType = 'all' | 'unread' | 'dividend' | 'transaction' | 'system';

export default function MessagesPage() {
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // In real app, use: const { notifications, loading, error, markAllAsRead } = useNotifications();
  const notifications = mockNotifications;
  const loading = false;
  const error = null;
  
  // Mock user data
  const userProfile = {
    name: "Jan Novák",
    email: "jan.novak@email.cz",
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb3",
    kycVerified: true,
  };

  const handleNotificationClick = (notification: any) => {
    setSelectedNotification(notification);
    setIsDetailModalOpen(true);
  };

  const handleMarkAllAsRead = async () => {
    // markAllAsRead(); // Real implementation
    console.log('Mark all as read');
  };

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    // Apply filter
    if (filter === 'unread' && notification.read) return false;
    if (filter !== 'all' && filter !== 'unread' && notification.type !== filter) return false;
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        notification.title.toLowerCase().includes(query) ||
        notification.message.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const filterOptions = [
    { value: 'all', label: 'Všechna', count: notifications.length },
    { value: 'unread', label: 'Nepřečtená', count: unreadCount },
    { value: 'dividend', label: 'Dividendy', count: notifications.filter(n => n.type === 'dividend').length },
    { value: 'transaction', label: 'Transakce', count: notifications.filter(n => n.type === 'transaction').length },
    { value: 'system', label: 'Systém', count: notifications.filter(n => n.type === 'system').length },
  ];

  if (loading) {
    return (
      <div className="min-h-screen">
        <TopBar 
          title="Oznámení" 
          userProfile={userProfile}
          notificationCount={unreadCount}
        />
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="glass-card p-6 animate-pulse">
                <div className="flex space-x-4">
                  <div className="w-8 h-8 bg-white/10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-white/10 rounded w-3/4" />
                    <div className="h-3 bg-white/10 rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <TopBar 
          title="Oznámení" 
          userProfile={userProfile}
          notificationCount={unreadCount}
        />
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="glass-card p-8 text-center">
            <Bell className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Chyba při načítání</h3>
            <p className="text-white/70 mb-4">Nepodařilo se načíst oznámení.</p>
            <DashboardButton 
              onClick={() => window.location.reload()}
              variant="primary"
            >
              Zkusit znovu
            </DashboardButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* TopBar */}
      <TopBar 
        title="Oznámení" 
        userProfile={userProfile}
        notificationCount={unreadCount}
      />
      
      <div className="p-4 sm:p-6 lg:p-8">
        
        {/* Header Actions */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
              <input
                type="text"
                placeholder="Hledat oznámení..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-glass pl-10 w-full"
              />
            </div>
            
            {/* Actions */}
            <div className="flex items-center space-x-3">
              {unreadCount > 0 && (
                <DashboardButton
                  onClick={handleMarkAllAsRead}
                  variant="secondary"
                  size="sm"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Označit vše jako přečtené
                </DashboardButton>
              )}
              
              <DashboardButton
                variant="ghost"
                size="sm"
              >
                <Settings className="w-4 h-4" />
              </DashboardButton>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <Filter className="w-4 h-4 text-white/60 flex-shrink-0" />
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value as FilterType)}
                className={`
                  px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex-shrink-0
                  ${filter === option.value
                    ? 'bg-[#F9D523] text-black'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                  }
                `}
              >
                {option.label}
                {option.count > 0 && (
                  <span className={`ml-1.5 px-1.5 py-0.5 rounded text-xs ${
                    filter === option.value 
                      ? 'bg-black/20 text-black/70' 
                      : 'bg-white/20 text-white/50'
                  }`}>
                    {option.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Results Summary */}
        {(searchQuery || filter !== 'all') && (
          <div className="mb-4">
            <p className="text-white/60 text-sm">
              {filteredNotifications.length === 0 
                ? 'Žádná oznámení nenalezena'
                : `Zobrazeno ${filteredNotifications.length} oznámení`
              }
              {searchQuery && ` pro "${searchQuery}"`}
            </p>
          </div>
        )}

        {/* Notifications List */}
        <NotificationList
          notifications={filteredNotifications}
          onNotificationClick={handleNotificationClick}
          loading={loading}
        />

        {/* Empty State */}
        {filteredNotifications.length === 0 && !loading && (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              {searchQuery ? 'Žádná oznámení nenalezena' : 'Žádná oznámení'}
            </h3>
            <p className="text-white/60">
              {searchQuery 
                ? 'Zkuste změnit hledaný termín nebo filtr'
                : 'Zatím nemáte žádná oznámení'
              }
            </p>
          </div>
        )}
      </div>

      {/* Notification Detail Modal */}
      <NotificationDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        notification={selectedNotification}
      />
    </div>
  );
}
