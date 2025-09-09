'use client';

import React, {  } from 'react';
import Image from 'next/image';
import { useScrollAnimation, useStaggeredAnimation } from '@/hook';

export const Ecosystem = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation({ threshold: 0.2 });
  const { elementRef: cardsRef, visibleItems } = useStaggeredAnimation(3, 200);
 

  const ecosystemItems = [
    {
      id: 1,
      name: 'GC Cards',
      image: '/cards/strat.png',
      button: {
        type: 'link',
        text: 'OpenSea',
        href: 'https://opensea.io'
      }
    },
    {
      id: 2,
      name: 'BTC BOT',
      image: '/cards/btc.png',
      button: {
        type: 'link',
        text: 'OpenSea',
        href: 'https://opensea.io'
      }
    },
    {
      id: 3,
      name: 'ALGO Trader',
      image: '/cards/algo.png',
      button: {
        type: 'date',
        text: '05 / 2023',
        href: '#'
      }
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-black relative overflow-visible">
      {/* SVG Background - načítá od začátku */}
      <div className="absolute inset-0 z-0 overflow-visible">
        <div className="absolute inset-0 transform scale-100 origin-top-center">
          <Image
            src="/backgrounds/3Ecosystem.svg"
            alt="Ecosystem Background"
            fill
            className="object-contain"
            priority={false}
          />
        </div>
      </div>

      {/* Dark overlay jako v hero */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10 overflow-visible">
        {/* Header - stejné styling jako v Hero */}
        <div 
          ref={titleRef}
          className={`text-center mb-12 lg:mb-16 animate-slide-up overflow-visible ${titleVisible ? 'visible' : ''}`}
        >
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-white mb-6">
              Ecosystem
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed font-medium">
              Safeguard your digital assets with state-of-the-art security measures. Track your investments in real-time to make informed decisions.
            </p>
          </div>
        </div>

        {/* Cards Grid - jen simple scale hover */}
        <div 
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto animate-container overflow-visible"
        >
          {ecosystemItems.map((item, index) => (
            <div
              key={item.id}
              className={`relative text-center animate-scale overflow-visible py-4 px-4 ${
                visibleItems.has(index) ? 'visible' : ''
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Project Title */}
              <div className="mb-4">
                <h3 className="text-xl md:text-2xl font-medium text-white">
                  {item.name}
                </h3>
              </div>

              {/* Clean Card Container - žádné efekty okolo */}
              <div className="relative w-full max-w-sm mx-auto mb-4">
                <div className="relative aspect-[2/3] rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer hover:scale-[1.02] group">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Button */}
              <div className="flex justify-center">
                {item.button.type === 'link' ? (
                  <button className="unified-button unified-button-lg">
                    <span>{item.button.text}</span>
                  </button>
                ) : (
                  <div className="unified-button unified-button-lg cursor-default">
                    <span>{item.button.text}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};