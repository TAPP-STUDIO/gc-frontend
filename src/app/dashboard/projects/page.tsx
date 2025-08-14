"use client";

import React from 'react';
import { Container, Stack, PageHeader } from '@/components/layout';
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
        {/* Jednotný page header s navigací zpět */}
        <PageHeader 
          title="Projekty"
          backTo="/dashboard/portfolio"
          backLabel="Portfolio"
        />

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
                  value: 8.2,
                  direction: 'up',
                  period: 'měsíc'
                }}
                className="h-full"
              />
            </div>
          </div>
        </div>

        {/* Grid s project kartami - OPRAVENÝ INTERFACE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          <ProjectCard
            title="GC Cards"
            description="Investiční karty s garantovaným výnosem a možností tradingu na sekundárním trhu."
            color="pink"
            onPortfolioClick={() => handlePortfolioClick('GC Cards')}
            onBuyClick={() => handleBuyClick('GC Cards')}
          />
          
          <ProjectCard
            title="BTC Bot"
            description="Automatizovaný trading bot pro Bitcoin s pokročilými algoritmy a risk managementem."
            color="blue"
            onPortfolioClick={() => handlePortfolioClick('BTC Bot')}
            onBuyClick={() => handleBuyClick('BTC Bot')}
          />
          
          <ProjectCard
            title="Algo Trader"
            description="Algoritmické obchodování s využitím AI a machine learning pro maximalizaci zisku."
            color="green"
            onPortfolioClick={() => handlePortfolioClick('Algo Trader')}
            onBuyClick={() => handleBuyClick('Algo Trader')}
          />
          
          <ProjectCard
            title="VC NFT"
            description="Exkluzivní NFT kolekce s utility funkcemi a přístupem k speciálním investičním příležitostem."
            color="yellow"
            onPortfolioClick={() => handlePortfolioClick('VC NFT')}
            onBuyClick={() => handleBuyClick('VC NFT')}
          />
        </div>
      </Stack>
    </Container>
  );
}