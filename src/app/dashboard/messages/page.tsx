"use client";

import React from 'react';
import { Container, Stack } from '@/components/layout';
import { LatestReportCard } from '@/components/cards';
import { ReportsHistoryList } from '@/components/lists';

// Ukázková data pro nejnovější report
const latestReport = {
  title: "Nadpis zprávy",
  date: "1. 1. 2025",
  content: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Proin At Magna Iaculis, Aliquet Metus A, Interdum Felis. In In Condimentum Justo, Vel Viverra Diam. Nulla Rutrum Ut Nisl Ut Vehicula Diam. Sed Hendrerit Nunc Tempor Massa Sodales Tempor. Nulla Id Metus Nibh. Proin Sagittis Dignissim Mauris. In Imperdiet Ante Lacinia Eget. Aenean Suscipit Luctus Dolor Ut Consectetur. Vivamus Neque Elit, Maximus Sed Vehicula Nec, Tempor Non Nibh. Nam At Mi Blandit, Pretium Eros Nec, Hendrerit Mauris."
};

// Ukázková data pro historii reportů
const reportsHistory = [
  {
    id: "1",
    title: "GC Cards - nárůst ceny",
    date: "1. 1. 2025",
    category: "Cenové změny"
  },
  {
    id: "2", 
    title: "GC Cards - nárůst ceny",
    date: "1. 1. 2025",
    category: "Cenové změny"
  },
  {
    id: "3",
    title: "GC Cards - nárůst ceny", 
    date: "1. 1. 2025",
    category: "Cenové změny"
  },
  {
    id: "4",
    title: "GC Cards - nárůst ceny",
    date: "1. 1. 2025", 
    category: "Cenové změny"
  },
  {
    id: "5",
    title: "GC Cards - nárůst ceny",
    date: "1. 1. 2025",
    category: "Cenové změny"
  },
  {
    id: "6",
    title: "GC Cards - nárůst ceny",
    date: "1. 1. 2025",
    category: "Cenové změny"
  }
];

export default function OznameniPage() {
  const handleReadMore = () => {
    console.log('Zobrazit celou zprávu');
    // Zde by bylo přesměrování na detail zprávy
  };

  const handleViewReport = (reportId: string) => {
    console.log(`Zobrazit report: ${reportId}`);
    // Zde by bylo přesměrování na detail reportu
  };

  return (
    <Container fluid className="py-4 sm:py-6">
      <Stack spacing="lg">
        {/* Navigační breadcrumb s šipkou zpět */}
        <div className="flex items-center space-x-2 mb-4">
          <button 
            onClick={() => window.history.back()}
            className="text-white hover:text-[#F9D523] transition-colors"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Oznámení
          </h1>
        </div>

        {/* Nejnovější report */}
        <LatestReportCard
          title={latestReport.title}
          date={latestReport.date}
          content={latestReport.content}
          onReadMore={handleReadMore}
          className="mb-6"
        />

        {/* Historie reportů */}
        <div className="bg-[#151515] rounded-lg p-6">
          <ReportsHistoryList
            reports={reportsHistory}
            onViewReport={handleViewReport}
            pageSize={4}
          />
        </div>
      </Stack>
    </Container>
  );
}