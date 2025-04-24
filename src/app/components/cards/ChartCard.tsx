"use client";

import React, { useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    ReferenceLine
} from 'recharts';

type ChartCardProps = {
    data: {
        name: string;
        value: number;
    }[];
    currentValue: number;
    currentMonth?: string;
    //yearlyLabels?: boolean;
    minValue?: number;
    maxValue?: number;
};

const ChartCard: React.FC<ChartCardProps> = ({
                                                 data,
                                                 currentValue,
                                                 currentMonth = 'Jul',
                                                 //yearlyLabels = true,
                                                 minValue = 0,
                                                 maxValue = 1100
                                             }) => {
    const [timeframe, setTimeframe] = useState('monthly');

    // Nalezení indexu aktuálního měsíce
    const currentMonthIndex = data.findIndex(item => item.name === currentMonth);

    return (
        <div className="bg-[#151515] p-5 rounded-lg text-white">
            <div className="flex justify-end mb-4">
                <div className="relative">
                    <select
                        className="bg-transparent border border-[#333] text-white rounded-full py-1 px-6 appearance-none cursor-pointer"
                        value={timeframe}
                        onChange={(e) => setTimeframe(e.target.value)}
                    >
                        <option value="monthly">monthly</option>
                        <option value="yearly">yearly</option>
                        <option value="weekly">weekly</option>
                    </select>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg fill="none" stroke="white" strokeWidth="1.5" width="12" height="12" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                        </svg>
                    </div>
                </div>
            </div>

            <div className="h-[200px] relative">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="1 10" vertical={false} stroke="#333" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#ffffff', fontSize: 12 }}
                        />
                        <YAxis
                            domain={[minValue, maxValue]}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#ffffff', fontSize: 12 }}
                            tickFormatter={(value) => `$${value}`}
                        />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#F9D523"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 8, fill: '#F9D523', stroke: '#000' }}
                        />
                        {currentMonthIndex !== -1 && (
                            <ReferenceLine x={data[currentMonthIndex].name} stroke="#F9D523" strokeDasharray="3 3" />
                        )}
                    </LineChart>
                </ResponsiveContainer>

                {/* Aktuální hodnota */}
                <div
                    className="absolute bg-[#F9D523] text-[#151515] px-3 py-1 rounded font-bold"
                    style={{
                        left: '50%',
                        top: '30%',
                        transform: 'translateX(-50%)'
                    }}
                >
                    ${currentValue.toFixed(2)}
                </div>
            </div>
        </div>
    );
};

export default ChartCard;