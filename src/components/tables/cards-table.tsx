import React from 'react';
import Image from 'next/image';

interface CardItem {
  id: string;
  name: string;
  purchaseDate: string;
  price: number;
  icon?: string;
}

interface CardsTableProps {
  title: string;
  data: CardItem[];
  className?: string;
}

export const CardsTable: React.FC<CardsTableProps> = ({
  title,
  data,
  className = ""
}) => {
  return (
    <div className={`bg-[#151515] rounded-lg p-6 ${className}`}>
      <h3 className="text-xl font-semibold text-white mb-6">{title}</h3>
      
      {/* Table */}
      <div className="overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-3 gap-6 pb-4 border-b border-[#333333]">
          <div className="text-[#666666] font-medium">Název</div>
          <div className="text-[#666666] font-medium">Nákup</div>
          <div className="text-[#666666] font-medium text-right">Cena $</div>
        </div>
        
        {/* Rows */}
        <div className="space-y-0">
          {data.map((item) => (
            <div 
              key={item.id}
              className="grid grid-cols-3 gap-6 py-4 border-b border-[#2a2a2a] last:border-b-0 hover:bg-[#1a1a1a] transition-colors"
            >
              {/* Name column with icon */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#2a2a2a] rounded-lg border border-[#444444] flex items-center justify-center">
                  {item.icon ? (
                    <Image 
                      src={item.icon} 
                      alt={item.name} 
                      width={24} 
                      height={24}
                      className="object-contain"
                    />
                  ) : (
                    <div className="w-6 h-6 bg-[#F9D523] rounded flex items-center justify-center">
                      <span className="text-[#151515] font-bold text-xs">C</span>
                    </div>
                  )}
                </div>
                <span className="text-white font-medium">{item.name}</span>
              </div>
              
              {/* Purchase date */}
              <div className="text-white flex items-center">{item.purchaseDate}</div>
              
              {/* Price */}
              <div className="text-white text-right font-medium flex items-center justify-end">
                {item.price.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};