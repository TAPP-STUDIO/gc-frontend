"use client";

import ChartCard from '../../../components/cards/ChartCard';
//import ClaimHistoryTable from '../../../components/tables/ClaimHistoryTable';

// Ukázková data pro graf vývoje kolekce
const developmentChartData = [
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

// Ukázková data pro graf celkových claimů
const totalClaimChartData = [
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

/* Historie claimů
const claimHistory = [
    { project: 'GC Cards', date: '1. 1. 2025', amount: 2000 },
    { project: 'GC Cards', date: '1. 1. 2025', amount: 2000 },
    { project: 'GC Cards', date: '1. 1. 2025', amount: 2000 },
    { project: 'GC Cards', date: '1. 1. 2025', amount: 2000 },
    { project: 'GC Cards', date: '1. 1. 2025', amount: 2000 },
    { project: 'GC Cards', date: '1. 1. 2025', amount: 2000 }
];
*/
export default function GCCards() {
    // Funkce pro zpracování požadavku na claim
    const handleClaim = () => {
        alert('Claim požadavek odeslán!');
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-white mb-8">
                GC Cards
            </h1>

            {/* První řada - Vývoj kolekce a hodnoty */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                <div className="lg:col-span-3">
                    <div className="bg-[#151515] p-5 rounded-lg">
                        <h2 className="text-xl font-semibold text-white mb-4">
                            Vývoj kolekce
                        </h2>
                        <ChartCard
                            data={developmentChartData}
                            currentValue={224.00}
                            currentMonth="Jul"
                        />
                    </div>
                </div>

                <div className="flex flex-col space-y-4">
                    <div className="bg-[#151515] p-5 rounded-lg">
                        <h2 className="text-xl font-semibold text-white mb-2">
                            Hodnota kolekce
                        </h2>
                        <div className="text-4xl font-bold text-white">10 000 $</div>
                    </div>

                    <div className="bg-[#151515] p-5 rounded-lg">
                        <h2 className="text-xl font-semibold text-white mb-2">
                            Celkem claimnuto
                        </h2>
                        <div className="text-4xl font-bold text-white">3 500 $</div>
                    </div>

                    <div className="bg-[#151515] p-5 rounded-lg">
                        <div className="flex flex-col">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-xl font-semibold text-white">Další claim</h2>
                                <button
                                    onClick={handleClaim}
                                    className="bg-[#F9D523] text-[#151515] font-bold py-2 px-4 rounded"
                                >
                                    CLAIM<br />2000 $
                                </button>
                            </div>
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
            </div>

            {/* Druhá řada - Celkem claim a historie claimů */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#151515] p-5 rounded-lg">
                    <h2 className="text-xl font-semibold text-white mb-4">
                        Celkem claim
                    </h2>
                    <ChartCard
                        data={totalClaimChartData}
                        currentValue={224.00}
                        currentMonth="Jul"
                    />
                </div>

                <div className="bg-[#151515] p-5 rounded-lg">
                    <h2 className="text-xl font-semibold text-white mb-4">
                        Historie claimů
                    </h2>
                   

                    {/* Paginace */}
                    <div className="flex justify-center mt-4 space-x-2">
                        <button className="w-8 h-8 rounded-full bg-[#151515] border border-gray-700 flex items-center justify-center text-gray-400">
                            &lt;
                        </button>
                        <button className="w-8 h-8 rounded-full bg-[#151515] border border-gray-700 flex items-center justify-center text-white">
                            1
                        </button>
                        <button className="w-8 h-8 rounded-full bg-[#151515] border border-gray-700 flex items-center justify-center text-gray-400">
                            2
                        </button>
                        <button className="w-8 h-8 rounded-full bg-[#151515] border border-gray-700 flex items-center justify-center text-gray-400">
                            3
                        </button>
                        <button className="w-8 h-8 rounded-full bg-[#151515] border border-gray-700 flex items-center justify-center text-gray-400">
                            &gt;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}