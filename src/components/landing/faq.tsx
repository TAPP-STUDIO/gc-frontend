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
      question: 'Co mi vlastnictví GC NFT KARTY dává?',
      answer: 'Vlastnictví GC NFT KARTY vám poskytuje doživotní přístup k investičnímu portfoliu Gavlik Capital, čtvrtletní rozdělování zisků, bezplatný mint přístup k novým NFT projektům, prioritní podporu a exkluzivní možnosti členství ve VIP klubu. Získáte také hlasovací práva na určitá rozhodnutí portfolia a přístup do naší soukromé Discord komunity.'
    },
    {
      id: 2,
      question: 'Co jsou odměny a kdy se vyplácejí?',
      answer: 'Odměny jsou čtvrtletní rozdělování zisků z našeho diverzifikovaného investičního portfolia. Vyplácejí se automaticky na vaši adresu peněženky každé čtvrtletí (březen, červen, září, prosinec). Výše závisí na výkonu portfolia a vaší NFT úrovni. Platby se provádějí v USDT nebo ETH na základě vašich preferencí.'
    },
    {
      id: 3,
      question: 'Co určuje hodnotu mé GC NFT KARTY?',
      answer: 'Hodnota je určena několika faktory: výkonem portfolia, historií čtvrtletních odměn, vzácnostní úrovní vaší karty, poptávkou na sekundárních trzích, odemčenými funkcemi a celkovým růstem ekosystému. Omezená nabídka a rostoucí užitečnost pokračují v dlouhodobém zhodnocování hodnoty.'
    },
    {
      id: 4,
      question: 'Kolik GC NFT KARET je aktuálně v oběhu?',
      answer: 'V současné době je v celkovém oběhu 10 000 GC NFT KARET s následujícím rozdělením: 9 900 standardních GC karet, 70 ETH speciálních edic a 30 BTC prémiových karet. Tato nabídka je trvale omezena - žádné další karty nebudou nikdy mintovány, což zajišťuje vzácnost a zachování hodnoty.'
    },
    {
      id: 5,
      question: 'Jak se generují zisky?',
      answer: 'Zisky se generují prostřednictvím naší diverzifikované investiční strategie zahrnující obchodování s kryptoměnami, DeFi protokoly, investice do nemovitostí a tradiční cenné papíry. Náš zkušený tým aktivně spravuje portfolio a zisky se rozdělují poměrně držitelům NFT po odečtení provozních nákladů a fondů pro rozvoj platformy.'
    },
    {
      id: 6,
      question: 'Co je VIP klub a jak se stanu členem?',
      answer: 'VIP klub je exkluzivní úroveň pro držitele speciálních edic (ETH a BTC karty) nebo držitele více standardních karet (5+ karet). VIP členové získají: přímý přístup k zakladateli, exkluzivní investiční poznatky, přednostní přístup k novým projektům, fyzické zlaté/stříbrné karty, pozvánky na živé události a vyšší multiplikátory odměn.'
    }
  ];

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
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white">
            Najděte své odpovědi
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
            Stále máte otázky? Připojte se k naší komunitě nebo kontaktujte náš tým podpory.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a href="https://discord.gg/tcvTy6y5" target="_blank" rel="noopener noreferrer" className="unified-button unified-button-lg">
              <span>Připojit se k Discordu</span>
            </a>
            <button className="unified-button unified-button-lg">
              <span>Kontaktovat podporu</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};