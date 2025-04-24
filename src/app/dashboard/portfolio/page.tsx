"use client";

import ChartCard from '../../components/cards/ChartCard';
import ValueCard from '../../components/cards/ValueCard';
import ClaimCard from '../../components/cards/ClaimCard';

// Ukázková data pro graf
const chartData = [
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

// Ukázková data pro portfolio projekty
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

export default function PortfolioDashboard() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-white mb-6">
                Portfolio
            </h1>

            <h2 className="text-2xl font-semibold text-white mb-4">
                Přehled portfolia
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Graf hodnoty portfolia */}
                <div className="lg:col-span-2">
                    <ChartCard
                        data={portfolioChartData}
                        currentValue={9800}
                        currentMonth="Jul"
                        minValue={4000}
                        maxValue={18000}
                    />
                </div>

                {/* Celková hodnota portfolia */}
                <ValueCard
                    title="Celková hodnota portfolia"
                    value={47850}
                    valueColor="text-[#F9D523]"
                />
            </div>

            <h2 className="text-2xl font-semibold text-white mb-4">
                Claim přehled
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Claim graf */}
                <div className="lg:col-span-2">
                    <ChartCard
                        data={chartData}
                        currentValue={510}
                        currentMonth="Jul"
                    />
                </div>

                {/* Claim karta */}
                <ClaimCard
                    title="Další claim"
                    nextClaimDate="15. 8. 2023"
                    claimAmount={1500}
                    progressPercent={75}
                    onClaim={() => alert('Claim požadavek odeslán!')}
                />
            </div>

            <h2 className="text-2xl font-semibold text-white mb-4">
                Statistiky
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <ValueCard
                    title="Celkem claimnuto"
                    value={28750}
                    valueColor="text-[#F9D523]"
                />

                <ValueCard
                    title="Aktuální zisk"
                    value={3240}
                    valueColor="text-[#F9D523]"
                />

                <ValueCard
                    title="Zhodnocení"
                    value={182}
                    formatter={(v) => `${v} %`}
                    valueColor="text-[#F9D523]"
                />

                <ValueCard
                    title="Aktivní projekty"
                    value={8}
                    formatter={(v) => `${v}`}
                    valueColor="text-[#F9D523]"
                />
            </div>
        </div>
    );
}