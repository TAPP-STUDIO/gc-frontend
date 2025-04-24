import React from 'react';
import Link from 'next/link';

type PortfolioItem = {
    title: string;
    count: number;
    href: string;
};

type PortfolioCounterCardProps = {
    items: PortfolioItem[];
};

const PortfolioCounterCard: React.FC<PortfolioCounterCardProps> = ({ items }) => {
    return (
        <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {items.map((item, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                        <h3 className="text-sm font-medium text-white mb-2">{item.title}</h3>
                        <p className="text-6xl font-bold text-white mb-4">{item.count}</p>
                        <Link
                            href={item.href}
                            className="inline-flex items-center text-[#F9D523] border border-[#F9D523] rounded-full px-4 py-1 hover:bg-[#F9D523] hover:text-[#151515] transition-colors"
                        >
                            zobrazit
                            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PortfolioCounterCard;