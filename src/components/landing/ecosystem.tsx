'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export const Ecosystem = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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
    <section className="py-20 lg:py-32 bg-black relative overflow-hidden">
      {/* Hero-style SVG Background - větší o 1/3 (100% místo 75%) */}
      <div className="absolute inset-0 z-0 overflow-visible">
        <div className="absolute inset-0 transform scale-100 origin-center">
          <Image
            src="/backgrounds/hero.svg"
            alt="Ecosystem Background"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Dark overlay jako v hero */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ecosystem
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Safeguard your digital assets with state-of-the-art security measures. Track your investments in real-time to make informed decisions.
          </p>
        </div>

        {/* Cards Grid - jen simple scale hover */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {ecosystemItems.map((item) => (
            <div
              key={item.id}
              className="group relative text-center"
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Project Title */}
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  {item.name}
                </h3>
              </div>

              {/* Simple Card Container - jen scale hover */}
              <div className="relative w-full max-w-sm mx-auto mb-8">
                <div className={`
                  relative aspect-[2/3] rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer
                  ${hoveredCard === item.id ? 'scale-105' : 'scale-100'}
                `}
                
                >
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
                  <button className="bg-gradient-to-r from-[#B29819] to-[#F9D523] hover:from-[#A08616] hover:to-[#e3c320] text-black font-bold px-10 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl">
                    {item.button.text}
                  </button>
                ) : (
                  <div className="px-10 py-4 rounded-2xl border-2 border-white/30 text-white font-bold transition-all duration-300 hover:border-white/50 shadow-xl">
                    {item.button.text}
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