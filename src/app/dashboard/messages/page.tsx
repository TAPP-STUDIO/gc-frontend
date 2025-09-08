"use client";

import React from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { DashboardButton, DashboardCard } from '@/components/dashboard';

// Ukázková data pro oznámení
const notifications = [
  {
    id: 1,
    title: "GC Cards - významný nárůst ceny",
    date: "14. 8. 2025",
    content: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Proin At Magna Iaculis, Aliquet Metus A, Interdum Felis. In In Condimentum Justo, Vel Viverra Diam. Nulla Rutrum Ut Nisl Ut Vehicula Diam. Sed Hendrerit Nunc Tempor Massa Sodales Tempor. Nulla Id Metus Nibh. Proin Sagittis Dignissim Mauris. In Imperdiet Ante Lacinia Eget. Aenean Suscipit Luctus Dolor Ut Consectetur. Vivamus Neque Elit, Maximus Sed Vehicula Nec, Tempor Non Nibh.",
    type: "important",
    read: false
  },
  {
    id: 2,
    title: "BTC Bot - úspěšné obchody",
    date: "12. 8. 2025",
    content: "Váš BTC Bot vygeneroval v posledních 24 hodinách výnosné obchody v celkové hodnotě 1 250 $. Pokračuje v automatizovaném obchodování podle vaší strategie.",
    type: "success",
    read: true
  },
  {
    id: 3,
    title: "Nová funkce: Algo Trader dashboard",
    date: "10. 8. 2025",
    content: "Spustili jsme nový rozdílený dashboard pro Algo Trader, který vám umožní lépe sledovat výkonnost vaších obchodních algoritmů.",
    type: "info",
    read: true
  }
];

export default function OznameniPage() {
  // Mock user data
  const userProfile = {
    name: "Jan Novák",
    email: "jan.novak@email.cz",
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb3",
    kycVerified: true,
  };

  const handleReadMore = (id: number) => {
    console.log('Zobrazit celou zprávu:', id);
    // Zde by bylo přesměrování na detail zprávy
  };

  const handleMarkAsRead = (id: number) => {
    console.log('Označit jako přečtené:', id);
    // Zde by byla logika pro označení jako přečtené
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'important':
        return (
          <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'success':
        return (
          <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'info':
      default:
        return (
          <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen">
      {/* TopBar */}
      <TopBar 
        title="Oznámení"
        userProfile={userProfile}
        notificationCount={unreadCount}
      />
      
      <div className="p-4 sm:p-6 lg:p-8">
        
        {/* Statistiky oznámení */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <DashboardCard className="p-6 text-center">
            <div className="text-3xl font-bold text-[#F9D523] mb-2">
              {notifications.length}
            </div>
            <div className="text-white/70 text-sm">
              Celkem oznámení
            </div>
          </DashboardCard>
          
          <DashboardCard className="p-6 text-center">
            <div className="text-3xl font-bold text-red-400 mb-2">
              {unreadCount}
            </div>
            <div className="text-white/70 text-sm">
              Nepřečtených
            </div>
          </DashboardCard>
          
          <DashboardCard className="p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {notifications.filter(n => n.read).length}
            </div>
            <div className="text-white/70 text-sm">
              Přečtených
            </div>
          </DashboardCard>
        </div>

        {/* Seznam oznámení */}
        <div className="space-y-4">
          {notifications.map((notification) => (
            <DashboardCard key={notification.id} className={`p-6 ${
              !notification.read ? 'border-[#F9D523]' : ''
            }`}>
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">
                      {notification.title}
                      {!notification.read && (
                        <span className="ml-2 inline-flex px-2 py-1 rounded-full text-xs font-medium bg-[#F9D523]/20 text-[#F9D523] border border-[#F9D523]/30">
                          NOVÉ
                        </span>
                      )}
                    </h3>
                    <span className="text-white/50 text-sm whitespace-nowrap">
                      {notification.date}
                    </span>
                  </div>
                  
                  <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-3">
                    {notification.content}
                  </p>
                  
                  <div className="flex gap-2">
                    <DashboardButton
                      variant="primary"
                      size="sm"
                      onClick={() => handleReadMore(notification.id)}
                    >
                      Číst více
                    </DashboardButton>
                    {!notification.read && (
                      <DashboardButton
                        variant="outline"
                        size="sm"
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        Označit jako přečtené
                      </DashboardButton>
                    )}
                  </div>
                </div>
              </div>
            </DashboardCard>
          ))}
        </div>

        {/* Prázdné místo pro budoucí oznámení */}
        {notifications.length === 0 && (
          <DashboardCard className="p-8 text-center">
            <div className="text-white/30 mb-4">
              <svg 
                width="48" 
                height="48" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1" 
                className="mx-auto mb-4 opacity-50"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white/50 mb-2">
              Žádná oznámení
            </h3>
            <p className="text-white/30 text-sm">
              Momentálně nemáte žádná nezpracovaná oznámení.
            </p>
          </DashboardCard>
        )}
      </div>
    </div>
  );
}