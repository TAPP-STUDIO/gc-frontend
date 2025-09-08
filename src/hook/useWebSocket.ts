'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useToast } from '@/components/ui/toast';

export interface WebSocketMessage {
  type: string;
  data: any;
  timestamp: number;
  id?: string;
}

export interface WebSocketConfig {
  url: string;
  protocols?: string[];
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  heartbeatInterval?: number;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (error: Event) => void;
  onMessage?: (message: WebSocketMessage) => void;
}

export interface UseWebSocketReturn {
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  sendMessage: (type: string, data: any) => void;
  disconnect: () => void;
  reconnect: () => void;
  lastMessage: WebSocketMessage | null;
}

export function useWebSocket(config: WebSocketConfig): UseWebSocketReturn {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const { error: showError } = useToast();

  const {
    url,
    protocols,
    reconnectInterval = 3000,
    maxReconnectAttempts = 5,
    heartbeatInterval = 30000,
    onOpen,
    onClose,
    onError,
    onMessage
  } = config;

  const cleanup = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current);
      heartbeatIntervalRef.current = null;
    }
  }, []);

  const startHeartbeat = useCallback(() => {
    if (heartbeatInterval > 0) {
      heartbeatIntervalRef.current = setInterval(() => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({ type: 'ping', timestamp: Date.now() }));
        }
      }, heartbeatInterval);
    }
  }, [heartbeatInterval]);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      wsRef.current = new WebSocket(url, protocols);

      wsRef.current.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        setIsConnecting(false);
        setError(null);
        reconnectAttemptsRef.current = 0;
        startHeartbeat();
        onOpen?.();
      };

      wsRef.current.onclose = (event) => {
        console.log('WebSocket disconnected', event);
        setIsConnected(false);
        setIsConnecting(false);
        cleanup();
        onClose?.();

        // Auto-reconnect if not closed intentionally
        if (!event.wasClean && reconnectAttemptsRef.current < maxReconnectAttempts) {
          reconnectAttemptsRef.current++;
          console.log(`Reconnecting... Attempt ${reconnectAttemptsRef.current}/${maxReconnectAttempts}`);
          
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, reconnectInterval);
        } else if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
          setError('Nepodařilo se znovu připojit k serveru');
          showError('Spojení ztraceno', 'Nepodařilo se obnovit spojení se serverem');
        }
      };

      wsRef.current.onerror = (event) => {
        console.error('WebSocket error:', event);
        setError('Chyba WebSocket spojení');
        setIsConnecting(false);
        onError?.(event);
      };

      wsRef.current.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          
          // Handle pong response
          if (message.type === 'pong') {
            return;
          }
          
          setLastMessage(message);
          onMessage?.(message);
        } catch (err) {
          console.error('Failed to parse WebSocket message:', err);
        }
      };

    } catch (err) {
      console.error('Failed to create WebSocket connection:', err);
      setError('Nepodařilo se vytvořit WebSocket spojení');
      setIsConnecting(false);
    }
  }, [url, protocols, maxReconnectAttempts, reconnectInterval, onOpen, onClose, onError, onMessage, startHeartbeat, cleanup, showError]);

  const disconnect = useCallback(() => {
    cleanup();
    if (wsRef.current) {
      wsRef.current.close(1000, 'Disconnected by user');
      wsRef.current = null;
    }
    setIsConnected(false);
    setIsConnecting(false);
  }, [cleanup]);

  const sendMessage = useCallback((type: string, data: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const message: WebSocketMessage = {
        type,
        data,
        timestamp: Date.now(),
        id: Math.random().toString(36).substr(2, 9)
      };
      wsRef.current.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket is not connected. Cannot send message.');
    }
  }, []);

  const reconnect = useCallback(() => {
    disconnect();
    reconnectAttemptsRef.current = 0;
    setTimeout(connect, 100);
  }, [disconnect, connect]);

  useEffect(() => {
    connect();
    return () => {
      cleanup();
      disconnect();
    };
  }, [connect, disconnect, cleanup]);

  return {
    isConnected,
    isConnecting,
    error,
    sendMessage,
    disconnect,
    reconnect,
    lastMessage
  };
}

// Real-time hooks for specific features
export function useMarketplaceUpdates() {
  const [marketData, setMarketData] = useState<any[]>([]);
  const [priceUpdates, setPriceUpdates] = useState<Record<string, number>>({});
  
  const handleMessage = useCallback((message: WebSocketMessage) => {
    switch (message.type) {
      case 'market_update':
        setMarketData(prev => {
          const updated = [...prev];
          const index = updated.findIndex(item => item.id === message.data.id);
          if (index >= 0) {
            updated[index] = { ...updated[index], ...message.data };
          } else {
            updated.push(message.data);
          }
          return updated;
        });
        break;
        
      case 'price_update':
        setPriceUpdates(prev => ({
          ...prev,
          [message.data.tokenId]: message.data.price
        }));
        break;
        
      case 'nft_sold':
        setMarketData(prev => prev.filter(item => item.id !== message.data.id));
        break;
    }
  }, []);

  const ws = useWebSocket({
    url: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001',
    onMessage: handleMessage,
    onOpen: () => {
      console.log('Connected to marketplace updates');
    }
  });

  useEffect(() => {
    if (ws.isConnected) {
      ws.sendMessage('subscribe', { channel: 'marketplace' });
    }
  }, [ws.isConnected, ws.sendMessage]);

  return {
    ...ws,
    marketData,
    priceUpdates
  };
}

export function useNotificationUpdates() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { success, warning } = useToast();

  const handleMessage = useCallback((message: WebSocketMessage) => {
    switch (message.type) {
      case 'new_notification':
        setNotifications(prev => [message.data, ...prev]);
        setUnreadCount(prev => prev + 1);
        
        // Show toast for important notifications
        if (message.data.priority === 'high') {
          warning(message.data.title, message.data.message);
        } else {
          success(message.data.title, message.data.message);
        }
        break;
        
      case 'notification_read':
        setNotifications(prev => prev.map(notif => 
          notif.id === message.data.id 
            ? { ...notif, read: true }
            : notif
        ));
        setUnreadCount(prev => Math.max(0, prev - 1));
        break;
        
      case 'notifications_sync':
        setNotifications(message.data.notifications);
        setUnreadCount(message.data.unreadCount);
        break;
    }
  }, [success, warning]);

  const ws = useWebSocket({
    url: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001',
    onMessage: handleMessage
  });

  useEffect(() => {
    if (ws.isConnected) {
      ws.sendMessage('subscribe', { channel: 'notifications' });
    }
  }, [ws.isConnected, ws.sendMessage]);

  const markAsRead = useCallback((notificationId: string) => {
    ws.sendMessage('mark_read', { notificationId });
  }, [ws.sendMessage]);

  const markAllAsRead = useCallback(() => {
    ws.sendMessage('mark_all_read', {});
  }, [ws.sendMessage]);

  return {
    ...ws,
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead
  };
}

export function useTradingUpdates() {
  const [trades, setTrades] = useState<any[]>([]);
  const [orderBook, setOrderBook] = useState<{ bids: any[], asks: any[] }>({ bids: [], asks: [] });
  
  const handleMessage = useCallback((message: WebSocketMessage) => {
    switch (message.type) {
      case 'new_trade':
        setTrades(prev => [message.data, ...prev.slice(0, 99)]); // Keep last 100 trades
        break;
        
      case 'orderbook_update':
        setOrderBook(message.data);
        break;
        
      case 'order_filled':
      case 'order_cancelled':
        // Handle order updates
        break;
    }
  }, []);

  const ws = useWebSocket({
    url: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001',
    onMessage: handleMessage
  });

  useEffect(() => {
    if (ws.isConnected) {
      ws.sendMessage('subscribe', { channel: 'trading' });
    }
  }, [ws.isConnected, ws.sendMessage]);

  return {
    ...ws,
    trades,
    orderBook
  };
}

// WebSocket context for global state management
export interface WebSocketContextType {
  isConnected: boolean;
  sendMessage: (type: string, data: any) => void;
  subscribe: (channel: string) => void;
  unsubscribe: (channel: string) => void;
}

export const WebSocketContext = React.createContext<WebSocketContextType | null>(null);

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const [subscribedChannels, setSubscribedChannels] = useState<Set<string>>(new Set());

  const handleMessage = useCallback((message: WebSocketMessage) => {
    // Global message handling - dispatch to specific handlers
    window.dispatchEvent(new CustomEvent('websocket-message', { detail: message }));
  }, []);

  const ws = useWebSocket({
    url: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001',
    onMessage: handleMessage,
    onOpen: () => {
      console.log('Global WebSocket connected');
      // Re-subscribe to channels on reconnect
      subscribedChannels.forEach(channel => {
        ws.sendMessage('subscribe', { channel });
      });
    }
  });

  const subscribe = useCallback((channel: string) => {
    if (ws.isConnected) {
      ws.sendMessage('subscribe', { channel });
      setSubscribedChannels(prev => new Set([...prev, channel]));
    }
  }, [ws.isConnected, ws.sendMessage]);

  const unsubscribe = useCallback((channel: string) => {
    if (ws.isConnected) {
      ws.sendMessage('unsubscribe', { channel });
      setSubscribedChannels(prev => {
        const newSet = new Set(prev);
        newSet.delete(channel);
        return newSet;
      });
    }
  }, [ws.isConnected, ws.sendMessage]);

  const contextValue: WebSocketContextType = {
    isConnected: ws.isConnected,
    sendMessage: ws.sendMessage,
    subscribe,
    unsubscribe
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocketContext() {
  const context = React.useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocketContext must be used within a WebSocketProvider');
  }
  return context;
}
