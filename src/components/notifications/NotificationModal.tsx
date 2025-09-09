'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/modal';
import { Badge } from '@/components/ui/badge';
import { useNotifications } from '@/hook/useApi';
import { DashboardButton } from '@/components/dashboard';
import { 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  TrendingUp, 
  DollarSign,
  Clock,
  User,
  ExternalLink
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'transaction' | 'dividend' | 'system';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
  metadata?: {
    amount?: number;
    currency?: string;
    transactionHash?: string;
    fromUser?: string;
    toUser?: string;
    projectId?: string;
  };
}

interface NotificationDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  notification: Notification | null;
}

export function NotificationDetailModal({ isOpen, onClose, notification }: NotificationDetailModalProps) {
  const { markAsRead } = useNotifications();

  useEffect(() => {
    if (notification && !notification.read) {
      markAsRead(notification.id);
    }
  }, [notification, markAsRead]);

  if (!notification) return null;

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="w-6 h-6 text-red-500" />;
      case 'transaction':
        return <DollarSign className="w-6 h-6 text-blue-500" />;
      case 'dividend':
        return <TrendingUp className="w-6 h-6 text-green-500" />;
      case 'system':
        return <Bell className="w-6 h-6 text-purple-500" />;
      default:
        return <Info className="w-6 h-6 text-blue-500" />;
    }
  };

  const getTypeLabel = () => {
    switch (notification.type) {
      case 'success': return 'Úspěch';
      case 'warning': return 'Upozornění';
      case 'error': return 'Chyba';
      case 'transaction': return 'Transakce';
      case 'dividend': return 'Dividenda';
      case 'system': return 'Systém';
      default: return 'Informace';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('cs-CZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleActionClick = () => {
    if (notification.actionUrl) {
      if (notification.actionUrl.startsWith('http')) {
        window.open(notification.actionUrl, '_blank');
      } else {
        window.location.href = notification.actionUrl;
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Detail oznámení"
      size="md"
    >
      <div className="p-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 mt-1">
            {getIcon()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline" className="text-xs">
                {getTypeLabel()}
              </Badge>
              <div className="flex items-center text-xs text-white/60">
                <Clock className="w-3 h-3 mr-1" />
                {formatDate(notification.createdAt)}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-white leading-tight">
              {notification.title}
            </h3>
          </div>
        </div>

        {/* Message */}
        <div className="backdrop-blur-lg border border-white/10 rounded-2xl p-6 bg-[#001718]/80 shadow-xl">
          <p className="text-white/80 leading-relaxed whitespace-pre-wrap">
            {notification.message}
          </p>
        </div>

        {/* Metadata */}
        {notification.metadata && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-white/70 uppercase tracking-wider">
              Detaily
            </h4>
            
            <div className="grid grid-cols-1 gap-3">
              {notification.metadata.amount && (
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white/60">Částka</span>
                  <span className="text-white font-medium">
                    {notification.metadata.amount} {notification.metadata.currency || 'USD'}
                  </span>
                </div>
              )}
              
              {notification.metadata.transactionHash && (
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white/60">Transaction Hash</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-mono text-xs">
                      {`${notification.metadata.transactionHash.slice(0, 6)}...${notification.metadata.transactionHash.slice(-4)}`}
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(notification.metadata!.transactionHash!);
                      }}
                      className="text-[#F9D523] hover:text-[#FBE05A] transition-colors"
                      title="Kopírovat"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              
              {notification.metadata.fromUser && (
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white/60">Od</span>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-white/40" />
                    <span className="text-white">{notification.metadata.fromUser}</span>
                  </div>
                </div>
              )}
              
              {notification.metadata.toUser && (
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-white/60">Komu</span>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-white/40" />
                    <span className="text-white">{notification.metadata.toUser}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-6 py-2 text-white/70 hover:text-white transition-colors"
          >
            Zavřít
          </button>
          
          {notification.actionUrl && (
            <DashboardButton
              onClick={handleActionClick}
              variant="primary"
              className="px-6 py-2"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Přejít
            </DashboardButton>
          )}
        </div>
      </div>
    </Modal>
  );
}

interface NotificationListProps {
  notifications: Notification[];
  onNotificationClick: (notification: Notification) => void;
  loading?: boolean;
}

export function NotificationList({ 
  notifications, 
  onNotificationClick, 
  loading = false 
}: NotificationListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="backdrop-blur-lg border border-white/10 rounded-2xl p-6 bg-[#001718]/80 shadow-xl animate-pulse">
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-white/10 rounded-xl" />
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-white/10 rounded-lg w-3/4" />
                <div className="h-3 bg-white/10 rounded-lg w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="text-center py-12">
        <Bell className="w-12 h-12 text-white/30 mx-auto mb-4" />
        <p className="text-white/60">Žádné oznámení</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          onClick={() => onNotificationClick(notification)}
          className={`
            backdrop-blur-lg border border-white/10 rounded-2xl p-6 cursor-pointer
            bg-[#001718]/80 shadow-xl
            transition-all duration-300 hover:bg-[#001718] hover:border-[#F9D523]/50 hover:shadow-[0_0_30px_rgba(249,213,35,0.15)]
            ${!notification.read ? 'border-l-4 border-l-[#F9D523] bg-[#1A3A3A]/40' : ''}
            group
          `}
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 mt-1 w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              {getIcon(notification.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h4 className={`text-base font-semibold ${!notification.read ? 'text-white' : 'text-white/90'}`}>
                  {notification.title}
                </h4>
                <span className="text-xs text-white/50 ml-4 flex-shrink-0">
                  {formatRelativeTime(notification.createdAt)}
                </span>
              </div>
              <p className="text-sm text-white/70 line-clamp-2 leading-relaxed mb-3">
                {notification.message}
              </p>
              {!notification.read && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#F9D523] rounded-full" />
                  <span className="text-xs text-[#F9D523] font-medium">Nepřečtené</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Helper functions
function getIcon(type: string) {
  switch (type) {
    case 'success':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'warning':
      return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    case 'error':
      return <AlertTriangle className="w-5 h-5 text-red-500" />;
    case 'transaction':
      return <DollarSign className="w-5 h-5 text-blue-500" />;
    case 'dividend':
      return <TrendingUp className="w-5 h-5 text-green-500" />;
    case 'system':
      return <Bell className="w-5 h-5 text-purple-500" />;
    default:
      return <Info className="w-5 h-5 text-blue-500" />;
  }
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Právě teď';
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  
  return date.toLocaleDateString('cs-CZ', { 
    day: '2-digit', 
    month: '2-digit' 
  });
}
