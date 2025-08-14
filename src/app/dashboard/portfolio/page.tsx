"use client";

import React from 'react';
import { Container, Stack, PageHeader } from '@/components/layout';
import { LineChart } from '@/components/charts';
import { ValueDisplay, ClaimSection, EnhancedValueCard } from '@/components/cards';
import { ClaimHistoryTable } from '@/components/tables';

// Ukázková data pro graf portfolia
const portfolioChartData = [
  { name: 'Jan', value: 5000 },
  { name: 'Feb', value: 5800 },
  { name: 'Mar', value: 6200 },
  { name: 'Apr', value: 5900 },
  { name: 'May', value: 7200 },
  { name: 'Jun', value: 8500 },
  { name: 'Jul', value: 9800 },
  { name: 'Aug', value: 10500 },
  { name: 'Sep', value: 12000 },
  { name: 'Oct', value: 13500 },
  { name: 'Nov', value: 15000 },
  { name: 'Dec', value: 16000 }
];

// Ukázková data pro graf claimů
const claimChartData = [
  { name: 'Jan', value: 120 },
  { name: 'Feb', value: 180 },
  { name: 'Mar', value: 220 },
  { name: 'Apr', value: 270 },
  { name: 'May', value: 350 },
  { name: 'Jun', value: 420 },
  { name: 'Jul', value: 510 },
  { name: 'Aug', value: 580 },
  { name: 'Sep', value: 640 },
  { name: 'Oct', value: 720 },
  { name: 'Nov', value: 780 },
  { name: 'Dec', value: 850 }
];

// Historie claimů
const claimHistory = [
  { id: '1', project: 'GC Cards', date: '1.1.2025', amount: 2000 },
  { id: '2', project: 'BTC BOT', date: '1.1.2025', amount: 2000 },
  { id: '3', project: 'GC Cards', date: '1.1.2025', amount: 2000 },
  { id: '4', project: 'GC Cards', date: '1.1.2025', amount: 2000 },
  { id: '5', project: 'Algo Trader', date: '1.1.2025', amount: 2000 },
  { id: '6', project: 'GC Cards', date: '1.1.2025', amount: 2000 },
];

// Počty karet v portfoliu
const portfolioItems = [
  { title: 'Počet karet', count: 35 },
  { title: 'GC cards', count: 7 },
  { title: 'BTC Bot', count: 2 },
  { title: 'Algo Trader', count: 13 },
  { title: 'VC NFT', count: 0 }
];

export default function PortfolioDashboard() {
  const handleClaim = () => {
    console.log('Claim button clicked');
  };

  const handleTimeframeChange = (timeframe: string) => {
    console.log('Timeframe changed:', timeframe);
  };

  return (
    <Container fluid className="py-4 sm:py-6">
      <Stack spacing="lg">
        {/* Jednotný page header - na homepage nemusí mít tlačítko zpět */}
        <PageHeader 
          title="Moje portfolio"
          showBackButton={false}
        />

        {/* Portfolio counters */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {portfolioItems.map((item, index) => (
            <ValueDisplay
              key={index}
              title={item.title}
              value={item.count}
              formatter={(v) => String(v)}
              showButton={true}
              onShowClick={() => console.log(`Zobrazit: ${item.title}`)}
              className="min-h-0"
            />
          ))}
        </div>

        {/* Graf a hodnoty portfolia - stejná výška */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch portfolio-main-grid">
          {/* Graf portfolia */}
          <div className="lg:col-span-8 h-full">
            <LineChart
              title="16 000 $"
              data={portfolioChartData}
              currentValue={1224.00}
              currentMonth="Dec"
              minValue={0}
              maxValue={18000}
              timeframe="monthly"
              onTimeframeChange={handleTimeframeChange}
              className="h-full min-h-[500px]"
            />
          </div>

          {/* Hodnoty na pravé straně */}
          <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-6 h-full portfolio-cards-stack">
            <div className="portfolio-card">
              <EnhancedValueCard
                title="Hodnota portfolia"
                value={16000}
                trend={{
                  value: 12.5,
                  direction: 'up',
                  period: 'měsíc'
                }}
                className="h-full"
              />
            </div>

            <div className="portfolio-card">
              <EnhancedValueCard
                title="Hodnota portfolio + akcie"
                value={18500}
                trend={{
                  value: 8.2,
                  direction: 'up',
                  period: 'měsíc'
                }}
                className="h-full"
              />
            </div>
          </div>
        </div>

        {/* Claim sekce a graf claimů */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
          {/* Claim sekce - OPRAVENÝ INTERFACE */}
          <div className="lg:col-span-4">
            <ClaimSection
              title="Další claim"
              date="15. 8. 2025"
              amount={850}
              progress={85}
              onClaim={handleClaim}
              className="h-full"
            />
          </div>

          {/* Graf claimů */}
          <div className="lg:col-span-8 h-full">
            <LineChart
              title="850 $"
              data={claimChartData}
              currentValue={850}
              currentMonth="Dec"
              minValue={0}
              maxValue={1000}
              timeframe="monthly"
              onTimeframeChange={handleTimeframeChange}
              className="h-full min-h-[400px]"
            />
          </div>
        </div>

        {/* Historie claimů */}
        <ClaimHistoryTable
          title="Historie claimů"
          data={claimHistory}
          pageSize={6}
        />
      </Stack>
    </Container>
  );
}