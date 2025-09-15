'use client';

import React, {  } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation, useStaggeredAnimation } from '@/hook';

export const Ecosystem = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation({ threshold: 0.2 });
  const { elementRef: cardsRef, visibleItems } = useStaggeredAnimation(3, 200);
  const { t } = useTranslation('ecosystem');
 

  const ecosystemItems = [
    {
      id: 1,
      name: t('products.gcCards'),
      image: '/cards/strat.png',
      button: {
        type: 'link',
        text: t('button'),
        href: '/dashboard/marketplace'
      }
    },
    {
      id: 2,
      name: t('products.btcBot'),
      image: '/cards/btc.png',
      button: {
        type: 'link',
        text: t('button'),
        href: '/dashboard/marketplace'
      }
    },
    {
      id: 3,
      name: t('products.algoTrader'),
      image: '/cards/algo.png',
      button: {
        type: 'date',
        text: '05 / 2023',
        href: '#'
      }
    }
  ];

  return (
    <section id="ecosystem" className="py-16 lg:py-24 bg-black relative overflow-visible">
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
              {t('heading')}
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed font-medium">
              {t('description')}
            </p>
          </div>
        </div>

        {/* Cards Grid - ještě více kompaktní */}
        <div 
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto animate-container overflow-visible"
        >
          {ecosystemItems.map((item, index) => (
            <div
              key={item.id}
              className={`relative text-center animate-scale overflow-visible py-3 px-3 ${
                visibleItems.has(index) ? 'visible' : ''
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Project Title */}
              <div className="mb-3">
                <h3 className="text-lg md:text-xl font-medium text-white">
                  {item.name}
                </h3>
              </div>

              {/* Ještě menší Card Container */}
              <div className="relative w-full max-w-68 mx-auto mb-4">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden transition-all duration-300 cursor-pointer hover:scale-[1.02] group">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Button */}
              <div className="flex justify-center">
                {item.button.type === 'link' ? (
                  <a href={item.button.href} className="unified-button unified-button-md">
                    <span>{item.button.text}</span>
                  </a>
                ) : (
                  <div className="unified-button unified-button-md cursor-default">
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