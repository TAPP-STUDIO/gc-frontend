'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { VerifiedBadge } from '../ui/premium-button';
import { useScrollAnimation } from '@/hook';

// Pure 3D Card GIF Component s Safari optimalizací
const Card3DGIF = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  
  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };
  
  return (
    <div 
      ref={elementRef}
      className={`relative w-80 h-[500px] lg:w-96 lg:h-[600px] animate-scale ${isVisible ? 'visible' : ''}`}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-gray-800 rounded-3xl flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#F9D523] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {!imageError ? (
        <>
          {/* Primární GIF */}
          <Image
            src="/cards/card-rotation.gif"
            alt="3D NFT Card Rotation"
            fill
            className={`object-cover rounded-3xl shadow-2xl transition-opacity duration-500 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            priority
            unoptimized
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{
              imageRendering: 'auto',
            }}
          />
          
          {/* Fallback pro Safari - skrytý fallback obrázek */}
          <Image
            src="/cards/strat.png"
            alt="NFT Card Fallback"
            fill
            className="object-cover rounded-3xl shadow-2xl opacity-0 pointer-events-none"
            priority={false}
          />
        </>
      ) : (
        /* Fallback pokud GIF nejde */
        <Image
          src="/cards/strat.png"
          alt="NFT Card"
          fill
          className="object-cover rounded-3xl shadow-2xl"
          priority
        />
      )}
    </div>
  );
};

export const Hero = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation({ threshold: 0.1 });
  const { elementRef: statsRef, isVisible: statsVisible } = useScrollAnimation({ threshold: 0.3 });
  const stats = [
    { value: '3 153 750 $', label: 'Celková hodnota portfolia' },
    { value: '162 $', label: 'Průměrný zisk na kartu' }
  ];

  return (
    <section className="min-h-screen bg-black pt-20 lg:pt-24 relative overflow-visible">
      {/* SVG Background - 85% size */}
      <div className="absolute inset-0 z-0 overflow-visible">
        <div className="absolute inset-0 transform scale-85 origin-top-center">
          <Image
            src="/backgrounds/1Hero.svg"
            alt="Hero Background"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 h-full flex items-center relative z-20 overflow-visible">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full py-12 lg:py-20">
          
          {/* Left Side - Content */}
          <div className="space-y-8 lg:space-y-12">
            {/* Main Heading */}
            <div 
              ref={titleRef}
              className={`space-y-4 animate-slide-left ${titleVisible ? 'visible' : ''}`}
            >
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium text-white leading-tight">
                Připojte se k doživotnímu
                <br />
                <span className="text-white">členství</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 font-medium">
                s Gavlik Capital NFT kartami
              </p>
            </div>

            {/* Premium Verified Badge */}
            <div className={`flex items-start animate-fade-in ${titleVisible ? 'visible animate-stagger-1' : ''}`}>
              <VerifiedBadge size="md">
                Ověřeno
              </VerifiedBadge>
            </div>

            {/* Statistics */}
            <div 
              ref={statsRef}
              className={`grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 animate-slide-up py-6 px-2 ${statsVisible ? 'visible' : ''}`}
            >
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className={`space-y-2 animate-slide-up py-4 px-2 hover:scale-105 transition-transform duration-300 ${statsVisible ? `visible animate-stagger-${index + 2}` : ''}`}
                >
                  <div className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#F9D523]">
                    {stat.value}
                  </div>
                  <div className="text-white/70 text-lg font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Pure GIF */}
          <div className="flex justify-center lg:justify-end">
            <Card3DGIF />
          </div>
        </div>
      </div>
    </section>
  );
};