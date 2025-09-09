'use client';

import React from 'react';
import Image from 'next/image';
import { useScrollAnimation, useStaggeredAnimation } from '@/hook';

export const VipClub = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation({ threshold: 0.1 });
  const { elementRef: featuresRef, visibleItems } = useStaggeredAnimation(4, 150);
  const vipFeatures = [
    'Private chat with the founder',
    'Information',
    'Business trips with the founder',
    'And more'
  ];

  return (
    <section className="py-16 lg:py-24 bg-black relative overflow-visible">
      {/* SVG Background - načítá od začátku */}
      <div className="absolute inset-0 z-0 overflow-visible">
        <div className="absolute inset-0 transform scale-100 origin-top-center">
          <Image
            src="/backgrounds/5VIP.svg"
            alt="VIP Club Background"
            fill
            className="object-contain"
            priority={false}
          />
        </div>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10 overflow-visible">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full py-12 lg:py-20">
          {/* Left Side - Text */}
          <div 
            ref={titleRef}
            className={`space-y-8 lg:space-y-12 animate-slide-left ${titleVisible ? 'visible' : ''}`}
          >
            <div className="space-y-4">
              <div className="text-white text-lg md:text-xl font-semibold uppercase tracking-wider">
                VIP CLUB
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-white leading-tight">
                Catch them all and
                <br />
                be a part of <span className="text-[#F9D523]">VIP CLUB</span>
              </h2>
            </div>
          </div>

          {/* Right Side - Features List */}
          <div 
            ref={featuresRef}
            className="space-y-3 lg:space-y-4 animate-container py-2">
          >
            {vipFeatures.map((feature, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 group animate-slide-right py-1 ${
                  visibleItems.has(index) ? 'visible' : ''
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Stejný styl jako v Cards sekci - border kolem check ikonky */}
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-white/50 transition-all duration-300">
                    <svg
                      className="w-4 h-4 text-white flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <p className="text-white/90 text-lg md:text-xl leading-snug font-medium group-hover:text-[#F9D523] transition-colors duration-300">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
