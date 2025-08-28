'use client';

import React from 'react';
import Image from 'next/image';

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
      {/* SVG Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/backgrounds/hero.svg"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
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

            {/* Verified Badge */}
            <div className="flex items-start">
              <span className="bg-gradient-to-r from-[#F9D523] to-[#e3c320] text-black px-6 py-2 rounded-md font-bold text-sm uppercase tracking-wider">
                Verified
              </span>
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

            {/* CTA Buttons - Hidden on mobile, visible on desktop */}
            <div className="hidden lg:flex items-center gap-6 pt-4">
              <button className="bg-[#F9D523] hover:bg-[#e3c320] text-black font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105">
                Get Started
              </button>
              <button className="border-2 border-white/30 hover:border-[#F9D523] text-white hover:text-[#F9D523] font-bold px-8 py-4 rounded-full transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Side - Pure GIF */}
          <div className="flex justify-center lg:justify-end">
            <Card3DGIF />
          </div>
        </div>
      </div>

      {/* Mobile CTA Buttons */}
      <div className="lg:hidden px-4 pb-8 relative z-20">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <button className="w-full sm:w-auto bg-[#F9D523] hover:bg-[#e3c320] text-black font-bold px-8 py-4 rounded-full transition-all duration-300">
            Get Started
          </button>
          <button className="w-full sm:w-auto border-2 border-white/30 hover:border-[#F9D523] text-white hover:text-[#F9D523] font-bold px-8 py-4 rounded-full transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};
