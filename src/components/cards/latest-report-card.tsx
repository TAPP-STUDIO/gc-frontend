import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

interface LatestReportCardProps {
  title: string;
  date: string;
  content: string;
  onReadMore?: () => void;
  className?: string;
}

export const LatestReportCard: React.FC<LatestReportCardProps> = ({
  title,
  date,
  content,
  onReadMore,
  className
}) => {
  return (
    <Card className={className}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Levá strana - obsah */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {title}
            </h2>
            <p className="text-[#666666] text-sm">
              {date}
            </p>
          </div>
          
          <div className="text-white text-base leading-relaxed">
            <p>{content}</p>
          </div>
          
          {onReadMore && (
            <Button
              onClick={onReadMore}
              variant="outline"
              className="mt-4 border-[#F9D523] text-[#F9D523] hover:bg-[#F9D523] hover:text-[#151515] px-6 py-2 rounded-full transition-all duration-200"
            >
              Celá zpráva
            </Button>
          )}
        </div>
        
        {/* Pravá strana - graf */}
        <div className="lg:col-span-1 flex justify-center">
          <div className="w-full max-w-sm relative">
            <div 
              className="w-full h-48 rounded-lg border border-[#333333] flex items-center justify-center"
              style={{
                backgroundImage: 'linear-gradient(45deg, #1a1a1a 25%, transparent 25%), linear-gradient(-45deg, #1a1a1a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1a1a1a 75%), linear-gradient(-45deg, transparent 75%, #1a1a1a 75%)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                backgroundColor: '#151515'
              }}
            >
              <div className="text-[#666666] text-sm opacity-50">
                Trading View Chart
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};