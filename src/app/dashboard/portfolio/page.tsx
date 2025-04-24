"use client";

import ChartCard from '../../components/cards/ChartCard';
import PortfolioCounterCard from '../../components/cards/PortfolioCounterCard';


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
    { project: 'GC Cards', date: '1. 1. 2025', amount: 2000 },
    { project: 'GC Cards', date: '1. 1. 2025', amount: 2000 },
    { project: 'GC Cards', date: '1. 1. 2025', amount: 2000 },
    { project: 'GC Cards', date: '1. 1. 2025', amount: 2000 },
    { project: 'GC Cards', date: '1. 1. 2025', amount: 2000 },
    { project: 'GC Cards', date: '1. 1. 2025', amount: 2000 }
];

// Počty karet v portfoliu
const portfolioCounters = [
    { title: 'Počet karet', count: 35, href: '/dashboard/portfolio' },
    { title: 'GC cards', count: 7, href: '/dashboard/portfolio/gc-cards' },
    { title: 'BTC Bot', count: 2, href: '/dashboard/portfolio/btc-bot' },
    { title: 'Algo Trader', count: 13, href: '/dashboard/portfolio/algo-trader' },
    { title: 'VC NFT', count: 0, href: '/dashboard/portfolio/vc-nft' }
];

export default function PortfolioDashboard() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-white mb-8">
                Portfolio
            </h1>

            {/* Počítadlo karet v portfoliu */}
            <PortfolioCounterCard items={portfolioCounters} />

            {/* První řada karet - Graf vývoje a hodnoty */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                <div className="lg:col-span-3">
                    <div className="bg-[#151515] p-5 rounded-lg">
                        <h2 className="text-xl font-semibold text-white mb-4">
                            Vývoj portfolia
                        </h2>
                        <ChartCard
                            data={portfolioChartData}
                            currentValue={9800}
                            currentMonth="Jul"
                            minValue={4000}
                            maxValue={18000}
                        />
                    </div>
                </div>

                <div className="flex flex-col space-y-4">
                    <div className="bg-[#151515] p-5 rounded-lg">
                        <h2 className="text-xl font-semibold text-white mb-2">
                            Hodnota portfolia
                        </h2>
                        <div className="text-4xl font-bold text-[#F9D523]">10 000 $</div>
                    </div>

                    <div className="bg-[#151515] p-5 rounded-lg">
                        <h2 className="text-xl font-semibold text-white mb-2">
                            Celkem claimnuto
                        </h2>
                        <div className="text-4xl font-bold text-[#F9D523]">3 500 $</div>
                    </div>

                    <div className="bg-[#151515] p-5 rounded-lg">
                        <h2 className="text-xl font-semibold text-white mb-2">
                            Další claim
                        </h2>
                        <div className="text-xl text-white mb-2">1. 1. 2026</div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                                className="bg-[#F9D523] h-2 rounded-full"
                                style={{ width: '75%' }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Druhá řada karet - Historie claimů */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#151515] p-5 rounded-lg">
                    <h2 className="text-xl font-semibold text-white mb-4">
                        Celkem claim
                    </h2>
                    <ChartCard
                        data={claimChartData}
                        currentValue={224.00}
                        currentMonth="Jul"
                    />
                </div>

                <div className="bg-[#151515] p-5 rounded-lg">
                    <h2 className="text-xl font-semibold text-white mb-4">
                        Historie claimů
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="text-left text-gray-400">
                                <th className="pb-3">Projekt</th>
                                <th className="pb-3">Datum</th>
                                <th className="pb-3 text-right">Claim $</th>
                            </tr>
                            </thead>
                            <tbody>
                            {claimHistory.map((claim, index) => (
                                <tr key={index} className="border-t border-gray-800">
                                    <td className="py-3 text-white">{claim.project}</td>
                                    <td className="py-3 text-white">{claim.date}</td>
                                    <td className="py-3 text-white text-right">{claim.amount} $</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}