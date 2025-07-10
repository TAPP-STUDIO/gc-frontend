"use client";

import React from 'react';
import { Container, Grid, Stack } from '@/components/layout';
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
    <Container fluid className="py-6">
      <Stack spacing="xl">
        {/* Hlavní nadpis */}
        <h1 className="text-3xl font-bold text-white">
          Moje portfolio
        </h1>

        {/* Portfolio counters */}
        <Grid cols={5} gap="md">
        {portfolioItems.map((item, index) => (
            <ValueDisplay
            key={index}
            title={item.title}
            value={item.count}
            formatter={(v) => String(v)}
            showButton={true}              
            onShowClick={() => console.log(`Zobrazit: ${item.title}`)}
            className=""                     
            />
        ))}
        </Grid>

        {/* Graf a hodnoty portfolia */}
        <Grid cols={4} gap="lg">
          {/* Graf vývoje portfolia */}
          <div className="col-span-3">
            <LineChart
              title="Vývoj portfolia"
              data={portfolioChartData}
              currentValue={9800}
              currentMonth="Jul"
              minValue={4000}
              maxValue={18000}
              timeframe="monthly"
              onTimeframeChange={handleTimeframeChange}
            />
          </div>

          {/* Hodnoty na pravé straně */}
          <Stack spacing="md">
            <EnhancedValueCard
              title="Hodnota portfolia"
              value={10000}
              trend={{
                value: 12.5,
                direction: 'up',
                period: 'měsíc'
              }}
            />

            <EnhancedValueCard
              title="Celkem claimnuto"
              value={3500}
              trend={{
                value: 8.2,
                direction: 'up',
                period: 'měsíc'
              }}
            />

            <ClaimSection
              title="Další claim"
              date="1. 1. 2026"
              amount={2500}
              progress={75}
              onClaim={handleClaim}
              className="min-h-[140px]"
            />
          </Stack>
        </Grid>

        {/* Grafy claimů a historie */}
        <Grid cols={2} gap="lg">
          {/* Graf celkových claimů */}
          <LineChart
            title="Celkem claim"
            data={claimChartData}
            currentValue={224}
            currentMonth="Jul"
            minValue={0}
            maxValue={1000}
            timeframe="monthly"
            onTimeframeChange={handleTimeframeChange}
          />

          {/* Historie claimů */}
          <ClaimHistoryTable
            title="Historie claimů"
            data={claimHistory}
            pageSize={6}
          />
        </Grid>
      </Stack>
    </Container>
  );
}