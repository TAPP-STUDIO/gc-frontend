'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation, useStaggeredAnimation } from '@/hook';

export const FAQ = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation({ threshold: 0.2 });
  const { elementRef: leftRef, visibleItems: leftVisible } = useStaggeredAnimation(3, 150);
  const { elementRef: rightRef, visibleItems: rightVisible } = useStaggeredAnimation(3, 150);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { t } = useTranslation('faq');

  const faqData = (t('questions', { returnObjects: true }) as any[]).map((q, index) => ({
    id: index + 1,
    question: q.question,
    answer: q.answer
  }));

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-black relative overflow-visible">
      {/* SVG Background - načítá od začátku */}
      <div className="absolute inset-0 z-0 overflow-visible">
        <div className="absolute inset-0 transform scale-100 origin-top-center">
          <Image
            src="/backgrounds/7FAQ.svg"
            alt="FAQ Background"
            fill
            className="object-contain"
            priority={false}
          />
        </div>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div 
          ref={titleRef}
          className={`text-center mb-16 lg:mb-20 animate-slide-up ${titleVisible ? 'visible' : ''}`}
        >
          <div className="text-[#F9D523] text-lg md:text-xl font-semibold mb-4 uppercase tracking-wider">
            {t('title')}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white">
            {t('heading')}
          </h2>
        </div>

        {/* FAQ Accordion - Two Columns */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column */}
            <div 
              ref={leftRef}
              className="space-y-4 animate-container"
            >
              {faqData.slice(0, 3).map((faq, index) => (
                <div
                  key={faq.id}
                  className={`bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-[#F9D523]/50 hover:shadow-lg animate-slide-left ${leftVisible.has(index) ? 'visible' : ''}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-6 lg:px-8 lg:py-7 text-left flex items-center justify-between group focus:outline-none"
                  >
                    <span className="text-white text-lg md:text-xl font-semibold group-hover:text-[#F9D523] transition-colors duration-300 pr-4">
                      {faq.question}
                    </span>
                    <div className="flex-shrink-0">
                      <svg
                        className={`w-6 h-6 text-white transform transition-transform duration-300 ${
                          openFaq === faq.id ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openFaq === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-6 lg:px-8 lg:pb-7">
                      <div className="pt-2 border-t border-white/20">
                        <p className="text-white/80 text-base md:text-lg leading-relaxed mt-4">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div 
              ref={rightRef}
              className="space-y-4 animate-container"
            >
              {faqData.slice(3, 6).map((faq, index) => (
                <div
                  key={faq.id}
                  className={`bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-[#F9D523]/50 hover:shadow-lg animate-slide-right ${rightVisible.has(index) ? 'visible' : ''}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-6 lg:px-8 lg:py-7 text-left flex items-center justify-between group focus:outline-none"
                  >
                    <span className="text-white text-lg md:text-xl font-semibold group-hover:text-[#F9D523] transition-colors duration-300 pr-4">
                      {faq.question}
                    </span>
                    <div className="flex-shrink-0">
                      <svg
                        className={`w-6 h-6 text-white transform transition-transform duration-300 ${
                          openFaq === faq.id ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openFaq === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-6 lg:px-8 lg:pb-7">
                      <div className="pt-2 border-t border-white/20">
                        <p className="text-white/80 text-base md:text-lg leading-relaxed mt-4">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 lg:mt-20">
          <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a href="https://discord.gg/tcvTy6y5" target="_blank" rel="noopener noreferrer" className="unified-button unified-button-lg">
              <span>{t('cta.buttons.discord')}</span>
            </a>
            <button className="unified-button unified-button-lg">
              <span>{t('cta.buttons.support')}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};