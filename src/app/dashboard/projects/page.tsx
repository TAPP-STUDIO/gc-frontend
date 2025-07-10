"use client";

import React from 'react';
import { Container, Stack } from '@/components/layout';
import { LineChart } from '@/components/charts';
import { EnhancedValueCard } from '@/components/cards';
import { ProjectCard } from '@/components/cards/project-card';

// Ukázková data pro graf projektů (jedna linka zatím)
const projectsChartData = [
  { name: 'Jan', value: 180 },
  { name: 'Feb', value: 190 },
  { name: 'Mar', value: 200 },
  { name: 'Apr', value: 210 },
  { name: 'May', value: 250 },
  { name: 'Jun', value: 280 },
  { name: 'Jul', value: 300 },
  { name: 'Aug', value: 340 },
  { name: 'Sep', value: 380 },
  { name: 'Oct', value: 420 },
  { name: 'Nov', value: 450 },
  { name: 'Dec', value: 480 }
];

export default function ProjectsPage() {
  const handleTimeframeChange = (timeframe: string) => {
    console.log('Timeframe changed:', timeframe);
  };

  const handlePortfolioClick = (projectName: string) => {
    console.log(`Portfolio clicked for: ${projectName}`);
  };

  const handleBuyClick = (projectName: string) => {
    console.log(`Buy clicked for: ${projectName}`);
  };

  return (
    <Container fluid className="py-4 sm:py-6">
      <Stack spacing="lg">
        {/* Hlavní nadpis */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Projekty
        </h1>

        {/* Graf a hodnoty - stejná výška */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
          {/* Graf projektů */}
          <div className="lg:col-span-8 h-full">
            <LineChart
              title="100 000 $"
              data={projectsChartData}
              currentValue={224.00}
              currentMonth="Jul"
              minValue={0}
              maxValue={1100}
              timeframe="monthly"
              onTimeframeChange={handleTimeframeChange}
              className="h-full min-h-[500px]"
            />
          </div>

          {/* Hodnoty na pravé straně */}
          <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-6 h-full">
            <div className="flex-1">
              <EnhancedValueCard
                title="Hodnota portfolia"
                value={100000}
                trend={{
                  value: 12.5,
                  direction: 'up',
                  period: 'měsíc'
                }}
                className="h-full"
              />
            </div>

            <div className="flex-1">
              <EnhancedValueCard
                title="Hodnota portfolio + akcie"
                value={130000}
                trend={{
                  value: 15.2,
                  direction: 'up',
                  period: 'měsíc'
                }}
                className="h-full"
              />
            </div>

            <div className="flex-1">
              <EnhancedValueCard
                title="Celkem vyplaceno"
                value={3500}
                trend={{
                  value: 8.7,
                  direction: 'up',
                  period: 'měsíc'
                }}
                className="h-full"
              />
            </div>
          </div>
        </div>

        {/* Sekce s projekty */}
        <div className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Portfolio
          </h2>
          
          {/* Projektové karty */}
          <div className="space-y-6">
            <ProjectCard
              title="GC Cards"
              description="GC CARDS PŘEDSTAVUJÍ KLÍČOVÉ NFT V NAŠEM PORTFOLIU, KTERÉ SVÝM DRŽITELŮM OTEVÍRAJÍ EXKLUZIVNÍ PŘÍSTUP DO SOUKROMÉ KOMUNITY"
              color="pink"
              onPortfolioClick={() => handlePortfolioClick('GC Cards')}
              onBuyClick={() => handleBuyClick('GC Cards')}
            />
          </div>
        </div>
      </Stack>
    </Container>
  );
}