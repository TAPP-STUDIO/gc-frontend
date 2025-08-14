"use client";

import React from 'react';
import { Container, Stack, PageHeader } from '@/components/layout';
import { LatestReportCard } from '@/components/cards';

// Ukázková data pro jediné oznámení
const singleNotification = {
  title: "GC Cards - významný nárůst ceny",
  date: "14. 8. 2025",
  content: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Proin At Magna Iaculis, Aliquet Metus A, Interdum Felis. In In Condimentum Justo, Vel Viverra Diam. Nulla Rutrum Ut Nisl Ut Vehicula Diam. Sed Hendrerit Nunc Tempor Massa Sodales Tempor. Nulla Id Metus Nibh. Proin Sagittis Dignissim Mauris. In Imperdiet Ante Lacinia Eget. Aenean Suscipit Luctus Dolor Ut Consectetur. Vivamus Neque Elit, Maximus Sed Vehicula Nec, Tempor Non Nibh. Nam At Mi Blandit, Pretium Eros Nec, Hendrerit Mauris."
};

export default function OznameniPage() {
  const handleReadMore = () => {
    console.log('Zobrazit celou zprávu');
    // Zde by bylo přesměrování na detail zprávy
    window.location.href = '/dashboard/messages/1';
  };

  return (
    <Container fluid className="py-4 sm:py-6">
      <Stack spacing="lg">
        {/* Jednotný page header s navigací zpět */}
        <PageHeader 
          title="Oznámení"
          backTo="/dashboard/portfolio"
          backLabel="Dashboard"
        />

        {/* Jediné oznámení */}
        <LatestReportCard
          title={singleNotification.title}
          date={singleNotification.date}
          content={singleNotification.content}
          onReadMore={handleReadMore}
          className="mb-6"
        />

        {/* Prázdné místo pro budoucí oznámení */}
        <div className="bg-[#151515] rounded-lg p-8 text-center border border-[#333333]">
          <div className="text-[#666666] mb-4">
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
          <h3 className="text-lg font-medium text-[#666666] mb-2">
            Žádná další oznámení
          </h3>
          <p className="text-[#666666] text-sm">
            Momentálně nemáte žádná další nezpracovaná oznámení.
          </p>
        </div>
      </Stack>
    </Container>
  );
}