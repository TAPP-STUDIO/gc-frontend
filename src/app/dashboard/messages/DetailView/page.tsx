"use client";

import React from 'react';
import { Container, Stack, PageHeader } from '@/components/layout';

// Ukázková data pro detail oznámení
const notificationDetail = {
  id: "1",
  title: "GC Cards - významný nárůst ceny",
  date: "14. 8. 2025",
  category: "Cenové změny",
  priority: "high" as "high" | "medium" | "low",
  content: `Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Proin At Magna Iaculis, Aliquet Metus A, Interdum Felis. In In Condimentum Justo, Vel Viverra Diam. Nulla Rutrum Ut Nisl Ut Vehicula Diam. Sed Hendrerit Nunc Tempor Massa Sodales Tempor.

Nulla Id Metus Nibh. Proin Sagittis Dignissim Mauris. In Imperdiet Ante Lacinia Eget. Aenean Suscipit Luctus Dolor Ut Consectetur. Vivamus Neque Elit, Maximus Sed Vehicula Nec, Tempor Non Nibh. Nam At Mi Blandit, Pretium Eros Nec, Hendrerit Mauris.

**Klíčové body:**
• Cena GC Cards vzrostla o 15% během posledních 24 hodin
• Očekáváme další nárůst v následujících dnech
• Doporučujeme sledovat situaci na trhu

**Doporučené akce:**
1. Zkontrolujte své portfolio
2. Zvažte další investice
3. Sledujte tržní trendy`,
  relatedData: {
    priceChange: "+15%",
    currentPrice: "$2,450",
    volume: "$1.2M"
  }
};

export default function NotificationDetail() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Vysoká';
      case 'medium': return 'Střední';
      case 'low': return 'Nízká';
      default: return 'Neznámá';
    }
  };

  const handleMarkAsRead = () => {
    console.log('Označit jako přečtené');
    // Zde by byla logika pro označení jako přečtené
  };

  const handleArchive = () => {
    console.log('Archivovat oznámení');
    // Zde by byla logika pro archivaci
  };

  return (
    <Container fluid className="py-4 sm:py-6">
      <Stack spacing="lg">
        {/* Jednotný page header s navigací zpět */}
        <PageHeader 
          title="Detail oznámení"
          backTo="/dashboard/messages"
          backLabel="Oznámení"
        />

        {/* Detail oznámení */}
        <div className="bg-[#151515] rounded-lg border border-[#333333] overflow-hidden">
          {/* Header sekce */}
          <div className="p-6 border-b border-[#333333]">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`w-2 h-2 rounded-full ${getPriorityColor(notificationDetail.priority)}`}></span>
                  <span className="text-[#666666] text-sm font-medium">
                    {getPriorityLabel(notificationDetail.priority)} priorita
                  </span>
                  <span className="text-[#666666] text-sm">•</span>
                  <span className="text-[#666666] text-sm">{notificationDetail.category}</span>
                </div>
                
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {notificationDetail.title}
                </h1>
                
                <div className="flex items-center text-[#666666] text-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                  </svg>
                  {notificationDetail.date}
                </div>
              </div>
              
              {/* Akce */}
              <div className="flex gap-2">
                <button
                  onClick={handleMarkAsRead}
                  className="px-4 py-2 bg-[#F9D523] text-[#151515] rounded-lg font-medium hover:bg-[#e3c320] transition-colors text-sm"
                >
                  Označit jako přečtené
                </button>
                <button
                  onClick={handleArchive}
                  className="px-4 py-2 bg-transparent border border-[#333333] text-[#666666] rounded-lg hover:border-[#F9D523] hover:text-[#F9D523] transition-colors text-sm"
                >
                  Archivovat
                </button>
              </div>
            </div>
          </div>

          {/* Obsah */}
          <div className="p-6">
            {/* Související data */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
              <div className="text-center">
                <div className="text-[#F9D523] text-xl font-bold">{notificationDetail.relatedData.priceChange}</div>
                <div className="text-[#666666] text-sm">Změna ceny</div>
              </div>
              <div className="text-center">
                <div className="text-white text-xl font-bold">{notificationDetail.relatedData.currentPrice}</div>
                <div className="text-[#666666] text-sm">Aktuální cena</div>
              </div>
              <div className="text-center">
                <div className="text-white text-xl font-bold">{notificationDetail.relatedData.volume}</div>
                <div className="text-[#666666] text-sm">Objem obchodů</div>
              </div>
            </div>

            {/* Hlavní obsah */}
            <div className="prose prose-invert max-w-none">
              <div className="text-[#e5e5e5] leading-relaxed whitespace-pre-line">
                {notificationDetail.content}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-[#1a1a1a] border-t border-[#333333]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-[#666666] text-sm">
                ID oznámení: #{notificationDetail.id}
              </div>
              
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-transparent border border-[#333333] text-[#666666] rounded-lg hover:border-[#F9D523] hover:text-[#F9D523] transition-colors text-sm">
                  Sdílet
                </button>
                <button className="px-4 py-2 bg-transparent border border-[#333333] text-[#666666] rounded-lg hover:border-[#F9D523] hover:text-[#F9D523] transition-colors text-sm">
                  Exportovat PDF
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Související oznámení */}
        <div className="bg-[#151515] rounded-lg p-6 border border-[#333333]">
          <h3 className="text-lg font-semibold text-white mb-4">Související oznámení</h3>
          <div className="text-center py-8">
            <div className="text-[#666666] mb-2">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto mb-3 opacity-50">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            <p className="text-[#666666] text-sm">
              Momentálně nejsou k dispozici žádná související oznámení.
            </p>
          </div>
        </div>
      </Stack>
    </Container>
  );
}