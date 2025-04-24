"use client";

import ChartCard from '../../../components/cards/ChartCard';
import ValueCard from '../../../components/cards/ValueCard';
import ClaimCard from '../../../components/cards/ClaimCard';

// Ukázková data pro graf
const chartData = [
    { name: 'Jan', value: 100 },
    { name: 'Feb', value: 120 },
    { name: 'Mar', value: 150 },
    { name: 'Apr', value: 180 },
    { name: 'May', value: 200 },
    { name: 'Jun', value: 230 },
    { name: 'Jul', value: 224 },
    { name: 'Aug', value: 245 },
    { name: 'Sep', value: 270 },
    { name: 'Oct', value: 300 },
    { name: 'Nov', value: 330 },
    { name: 'Dec', value: 360 }
];

export default function GCCards() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-white mb-8">
                GC Cards
            </h1>

            {/* Vývoj portfolia karta */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                    <ChartCard
                        data={chartData}
                        currentValue={224.00}
                        currentMonth="Jul"
                    />
                </div>

                {/* Hodnota portfolia */}
                <div className="grid grid-cols-1 gap-6">
                    <ValueCard
                        title="Hodnota Portfolia"
                        value={240399}
                        valueColor="text-[#F9D523]"
                    />

                    <ValueCard
                        title="Mé Zhodnocení"
                        value={200}
                        formatter={(v) => `${v} %`}
                        valueColor="text-[#F9D523]"
                    />
                </div>
            </div>

            {/* Claim sekce */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                    {/* Mé karty */}
                    <div className="bg-[#151515] p-5 rounded-lg text-white">
                        <h2 className="text-xl font-semibold mb-4">Mé karty</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-full">
                                <thead>
                                <tr className="text-left text-gray-400">
                                    <th className="pb-3">Karta</th>
                                    <th className="pb-3">Pořizovací cena</th>
                                    <th className="pb-3">Nákup</th>
                                    <th className="pb-3">Hodnota</th>
                                    <th className="pb-3">Aktuální cena</th>
                                    <th className="pb-3">Produkt</th>
                                </tr>
                                </thead>
                                <tbody>
                                {[...Array(6)].map((_, index) => (
                                    <tr key={index} className="border-t border-gray-800">
                                        <td className="py-3">Karta 1</td>
                                        <td className="py-3">Karta 1</td>
                                        <td className="py-3">Karta 1</td>
                                        <td className="py-3">Karta 1</td>
                                        <td className="py-3">Karta 1</td>
                                        <td className="py-3">Produkt</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <ClaimCard
                    title="Další Claim"
                    nextClaimDate="1. 1. 2025"
                    claimAmount={240}
                    progressPercent={60}
                />
            </div>
        </div>
    );
}