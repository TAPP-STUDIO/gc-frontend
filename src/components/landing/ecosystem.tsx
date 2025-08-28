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
      color: 'from-[#F9D523] to-[#e3c320]',
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
      color: 'from-emerald-400 to-teal-500',
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
      color: 'from-pink-400 to-rose-500',
      button: {
        type: 'date',
        text: '05 / 2023',
        href: '#'
      }
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900/10 via-transparent to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl"></div>
      
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

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {ecosystemItems.map((item, index) => (
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

              {/* Simple Card Image Container */}
              <div className="relative w-full max-w-sm mx-auto mb-8">
                <div className={`
                  relative aspect-[2/3] rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer
                  ${hoveredCard === item.id ? 'scale-110 shadow-2xl' : 'hover:scale-105'}
                `}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  
                  {/* Subtle hover overlay */}
                  <div className={`
                    absolute inset-0 transition-opacity duration-500
                    ${hoveredCard === item.id 
                      ? `bg-gradient-to-br ${item.color} opacity-10` 
                      : 'opacity-0'
                    }
                  `}></div>
                </div>
              </div>

              {/* Button */}
              <div className="flex justify-center">
                {item.button.type === 'link' ? (
                  <button className="bg-gradient-to-r from-[#B29819] to-[#F9D523] hover:from-[#A08616] hover:to-[#e3c320] text-black font-bold px-10 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl backdrop-blur-sm border border-white/10">
                    {item.button.text}
                  </button>
                ) : (
                  <div className="px-10 py-4 rounded-2xl border-2 border-white/30 text-white font-bold transition-all duration-300 hover:border-white/50 bg-white/10 backdrop-blur-md hover:bg-white/20 shadow-xl">
                    {item.button.text}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 lg:mt-24">
          <p className="text-white/60 text-lg mb-8">
            Join the ecosystem and start building your crypto portfolio today
          </p>
          <button className="bg-gradient-to-r from-[#B29819] to-[#F9D523] hover:from-[#A08616] hover:to-[#e3c320] text-black font-bold px-10 py-5 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl backdrop-blur-sm border border-white/10">
            Explore All Projects
          </button>
        </div>
      </div>
    </section>
  );
};
