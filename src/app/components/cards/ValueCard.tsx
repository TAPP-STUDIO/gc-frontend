import React from 'react';

type ValueCardProps = {
    title: string;
    value: number;
    formatter?: (value: number) => string;
    labelColor?: string;
    valueColor?: string;
};

const ValueCard: React.FC<ValueCardProps> = ({
                                                 title,
                                                 value,
                                                 formatter = (v) => `${v.toLocaleString()} $`,
                                                 labelColor = 'text-white',
                                                 valueColor = 'text-white'
                                             }) => {
    return (
        <div className="bg-[#151515] p-5 rounded-lg">
            <h2 className={`text-lg font-medium mb-2 ${labelColor}`}>{title}</h2>
            <div className={`text-4xl font-bold ${valueColor}`}>
                {formatter(value)}
            </div>
        </div>
    );
};

export default ValueCard;