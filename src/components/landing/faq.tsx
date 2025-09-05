'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useScrollAnimation, useStaggeredAnimation } from '@/hook';

export const FAQ = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation({ threshold: 0.2 });
  const { elementRef: leftRef, visibleItems: leftVisible } = useStaggeredAnimation(3, 150);
  const { elementRef: rightRef, visibleItems: rightVisible } = useStaggeredAnimation(3, 150);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqData = [
    {
      id: 1,
      question: 'What does GC NFT CARD ownership give me?',
      answer: 'GC NFT CARD ownership provides you with lifetime access to Gavlik Capital\'s investment portfolio, quarterly profit distributions, free mint access to new NFT projects, priority support, and exclusive VIP club membership opportunities. You also gain voting rights on certain portfolio decisions and access to our private Discord community.'
    },
    {
      id: 2,
      question: 'What are rewards and when are they paid?',
      answer: 'Rewards are quarterly profit distributions from our diversified investment portfolio. They are paid automatically to your wallet address every quarter (March, June, September, December). The amount depends on portfolio performance and your NFT tier. Payments are made in USDT or ETH based on your preference.'
    },
    {
      id: 3,
      question: 'What determines the value of my GC NFT CARD?',
      answer: 'The value is determined by multiple factors: portfolio performance, quarterly reward history, rarity tier of your card, market demand on secondary markets like OpenSea, utility features unlocked, and overall ecosystem growth. Limited supply and increasing utility continue to drive long-term value appreciation.'
    },
    {
      id: 4,
      question: 'How many GC NFT CARDs are currently in circulation?',
      answer: 'There are currently 10,000 GC NFT CARDs in total circulation with the following distribution: 9,900 standard GC Cards, 70 ETH special edition cards, and 30 BTC premium cards. This supply is permanently capped - no additional cards will ever be minted, ensuring scarcity and value preservation.'
    },
    {
      id: 5,
      question: 'How are profits sold?',
      answer: 'Profits are generated through our diversified investment strategy including cryptocurrency trading, DeFi protocols, real estate investments, and traditional securities. Our experienced team manages the portfolio actively, and profits are distributed proportionally to NFT holders after operational costs and platform development funds are allocated.'
    },
    {
      id: 6,
      question: 'What is the VIP Club and how do I become a member?',
      answer: 'The VIP Club is an exclusive tier for holders of special edition cards (ETH and BTC cards) or holders of multiple standard cards (5+ cards). VIP members get: direct access to the founder, exclusive investment insights, early access to new projects, physical gold/silver cards, invitations to live events, and higher reward multipliers.'
    }
  ];

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section className="py-20 lg:py-32 bg-black relative overflow-visible">
      {/* SVG Background */}
      <div className="absolute inset-0 z-0 overflow-visible">
        <div className="absolute inset-0 transform scale-100 origin-center">
          <Image
            src="/backgrounds/6FAQ.svg"
            alt="FAQ Background"
            fill
            className="object-contain"
            priority
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
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Find Your answers
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
            Still have questions? Join our community or contact our support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button className="bg-gradient-to-r from-[#B29819] to-[#F9D523] hover:from-[#A08616] hover:to-[#e3c320] text-white hover:text-black font-bold px-10 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl backdrop-blur-sm border border-white/10">
              Join Discord
            </button>
            <button className="bg-white/10 backdrop-blur-md border-2 border-white/30 hover:border-[#F9D523] hover:bg-white/20 text-white hover:text-[#F9D523] font-bold px-10 py-4 rounded-2xl transition-all duration-300 shadow-xl">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
