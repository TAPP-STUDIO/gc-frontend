'use client';

import React from 'react';
import Image from 'next/image';
import { VerifiedBadge, PremiumCTA, GlassCTA } from '../ui/premium-button';

// Pure 3D Card GIF Component
const Card3DGIF = () => {
  return (
    <div className="relative w-80 h-[500px] lg:w-96 lg:h-[600px]">
      <Image
        src="/cards/card-rotation.gif"
        alt="3D NFT Card Rotation"
        fill
        className="object-cover rounded-3xl shadow-2xl"
        priority
        unoptimized={true}
      />
    </div>
  );
};

export const Hero = () => {
  const stats = [
    { value: '3 153 750 $', label: 'Portfolio' },
    { value: '162 $', label: 'Profit per card' }
  ];

  return (
    <section className="min-h-screen bg-black pt-20 lg:pt-24 relative overflow-hidden">
      {/* SVG Background - 75% size */}
      <div className="absolute inset-0 z-0 overflow-visible">
        <div className="absolute inset-0 transform scale-75 origin-center">
          <Image
            src="/backgrounds/hero.svg"
            alt="Hero Background"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      <div className="container mx-auto px-4 lg:px-8 h-full flex items-center relative z-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full py-12 lg:py-20">
          
          {/* Left Side - Content */}
          <div className="space-y-8 lg:space-y-12">
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                Join the lifetime
                <br />
                <span className="text-white">membership</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 font-medium">
                with Gavlik Capital NFT Cards
              </p>
            </div>

            {/* Premium Verified Badge */}
            <div className="flex items-start">
              <VerifiedBadge size="md">
                Verified
              </VerifiedBadge>
            </div>

            {/* CTA Buttons Row */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
              <PremiumCTA 
                size="lg"
                onClick={() => window.open('/dashboard', '_blank')}
              >
                Get Your Card
              </PremiumCTA>
              
              <GlassCTA 
                size="lg"
                href="#ecosystem"
              >
                Learn More
              </GlassCTA>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-white/60">Live Trading</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-white/60">24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-white/60">Secured Wallet</span>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F9D523]">
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
