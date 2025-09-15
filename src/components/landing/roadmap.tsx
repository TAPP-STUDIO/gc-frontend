'use client';

import React from 'react';
import Image from 'next/image';
import { useScrollAnimation, useStaggeredAnimation } from '@/hook';

export const Roadmap = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation({ threshold: 0.2 });
  const { elementRef: leftRef, visibleItems: leftVisible } = useStaggeredAnimation(4, 200);
  const { elementRef: rightRef, visibleItems: rightVisible } = useStaggeredAnimation(3, 200);
  const roadmapSteps = [
    {
      id: 1,
      number: '01',
      title: 'Design NFT',
      description: 'Projekt byl koncipován a navržen Ahmedem Younesem, který jako výkonný producent Dubai TV vytvořil řadu poutavých pořadů, volebních kampaní a reklam pro televizní stanice v Egyptě, Dubaji, SAE a Evropě. Jeho nejnovějším projektem bylo EXPO 2020.',
    },
    {
      id: 2,
      number: '02',
      title: 'Chytrý kontrakt',
      description: 'Vývojáři softwaru, kteří stojí za mnoha úspěchy společnosti Apartmania Holding a.s., vytvořili unikátní chytrý kontrakt výhradně pro Gavlik Capital NFT.',
    },
    {
      id: 3,
      number: '03',
      title: 'Vlastní Marketplace',
      description: 'Gavlik Capital NFT debutoval v červnu 2022 na našem vlastním marketplace, který poskytuje bezpečné a uživatelsky přívětivé prostředí pro obchodování s našimi NFT.',
    },
    {
      id: 4,
      number: '04',
      title: 'Stabilita odměn',
      description: 'Každý vlastník GC NFT KARTY bude vydělávat pravidelný čtvrtletní podíl na zisku ve formě odměny vyplacené do jejich MetaMask peněženky. Cílem pro rok 2023 je stabilizace pravidelných odměn a další růst portfolia.',
    },
    {
      id: 5,
      number: '05',
      title: 'BTC BOT NFT',
      description: 'Gavlik Capital brzy spustí nový projekt ve svém ekosystému. BTC BOT bude generovat pravidelné měsíční odměny a část zisků bude ukládat v bitcoinu.',
    },
    {
      id: 6,
      number: '06',
      title: 'Fyzické zboží a živé události',
      description: 'Video animace v MetaMask peněžence je jen začátek. Připravujeme také fyzické stříbrné a zlaté karty, které budou sloužit jako vstupenky na živé události Gavlik Capital. Více informací již brzy.',
    },
    {
      id: 7,
      number: '07',
      title: 'Gaming / Metaverse NFT',
      description: 'Specialisté v ekosystému Gavlik Capital mají v přípravě další vzrušující projekt, tentokrát zaměřený na gaming a metaverse.',
    }
  ];

  return (
    <section id="roadmap" className="relative min-h-screen py-16 lg:py-24 overflow-hidden">
      {/* Background Image - lehčí overlays pro viditelnost */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/backgrounds/4Roadmapa.svg"
          alt="Roadmap Background"
          fill
          className="object-cover"
          priority={false}
        />
        {/* Lehčí overlay pro lepší viditelnost pozadí */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header - Left Aligned jak Hero */}
        <div 
          ref={titleRef}
          className={`mb-12 lg:mb-16 animate-slide-up ${titleVisible ? 'visible' : ''}`}
        >
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium text-white leading-tight max-w-4xl">
              Zabezpečte, sledujte a
              <br />
              <span className="text-white">rozšiřujte vaše krypto</span>
            </h2>
          </div>
        </div>

        {/* Timeline - Two Columns Layout */}
        <div className="relative max-w-6xl mx-auto overflow-visible">
          {/* Timeline Steps - Two Columns */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 relative overflow-visible">
            {/* Vertical divider line between columns */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#F9D523] via-[#F9D523]/50 to-transparent"></div>
            
            {/* Left Column - body 1, 3, 5, 7 */}
            <div 
              ref={leftRef}
              className="space-y-6 animate-container overflow-visible"
            >
              {roadmapSteps.filter((_, index) => index === 0 || index === 2 || index === 4 || index === 6).map((step, stepIndex) => (
                <div 
                  key={step.id} 
                  className={`relative animate-slide-left py-6 px-3 ${
                    leftVisible.has(stepIndex) ? 'visible' : ''
                  }`}
                  style={{ transitionDelay: `${stepIndex * 200}ms` }}
                >
                  {/* Mobile Layout */}
                  <div className="lg:hidden">
                    <div className="flex flex-col items-center gap-4 mb-4">
                      {/* Content Card with Number Inside */}
                      <div className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/10 hover:border-[#F9D523]/50 transition-all duration-300 shadow-xl">
                        {/* Number in top corner */}
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-[#B29819] to-[#F9D523] hover:from-[#A08616] hover:to-[#e3c320] rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-110 shadow-2xl border border-white/10">
                            <span className="text-black font-bold text-sm">{step.number}</span>
                          </div>
                          <h3 className="text-xl font-medium text-white flex-1">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden lg:flex items-center justify-center">
                    {/* Content Card with number inside */}
                    <div className="w-full transition-all duration-300 group overflow-visible">
                      <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 group-hover:bg-white/10 group-hover:border-[#F9D523]/50 transition-all duration-300 shadow-xl group-hover:scale-[1.02] group-hover:shadow-[0_0_25px_rgba(249,213,35,0.3)]">
                        {/* Number and Title in header */}
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-14 h-14 bg-gradient-to-r from-[#B29819] to-[#F9D523] group-hover:from-[#A08616] group-hover:to-[#e3c320] rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 shadow-2xl border border-white/10">
                            <span className="text-black font-bold text-lg">{step.number}</span>
                          </div>
                          <h3 className="text-xl font-medium text-white flex-1">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-white/70 leading-relaxed text-sm">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column - body 2, 4, 6 */}
            <div 
              ref={rightRef}
              className="space-y-6 animate-container overflow-visible"
            >
              {/* Body 2, 4, 6 se speciálním textem nad bodem 2 */}
              {roadmapSteps.filter((_, index) => index === 1 || index === 3 || index === 5).map((step, stepIndex) => {
                const isItem02 = step.number === '02';
                return (
                  <React.Fragment key={step.id}>
                    {isItem02 && (
                      <div className="mb-8 lg:mb-12">
                        <p className="text-white/80 text-lg md:text-xl leading-relaxed font-medium max-w-md">
                          Zažijte budoucnost digitálních financí s naší výkonnou, uživatelsky přívětivou aplikací navrženou tak, aby vaše investice byly v bezpečí a maximalizovaly vaše zisky.
                        </p>
                      </div>
                    )}
                <div
                  className={`relative animate-slide-right py-6 px-3 ${
                    rightVisible.has(stepIndex) ? 'visible' : ''
                  }`}
                  style={{ transitionDelay: `${stepIndex * 200}ms` }}
                >
                  {/* Mobile Layout */}
                  <div className="lg:hidden">
                    <div className="flex flex-col items-center gap-4 mb-4">
                      {/* Content Card with Number Inside */}
                      <div className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/10 hover:border-[#F9D523]/50 transition-all duration-300 shadow-xl">
                        {/* Number in top corner */}
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-[#B29819] to-[#F9D523] hover:from-[#A08616] hover:to-[#e3c320] rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-110 shadow-2xl border border-white/10">
                            <span className="text-black font-bold text-sm">{step.number}</span>
                          </div>
                          <h3 className="text-xl font-medium text-white flex-1">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden lg:flex items-center justify-center">
                    {/* Content Card with number inside */}
                    <div className="w-full transition-all duration-300 group overflow-visible">
                      <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 group-hover:bg-white/10 group-hover:border-[#F9D523]/50 transition-all duration-300 shadow-xl group-hover:scale-[1.02] group-hover:shadow-[0_0_25px_rgba(249,213,35,0.3)]">
                        {/* Number and Title in header */}
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-14 h-14 bg-gradient-to-r from-[#B29819] to-[#F9D523] group-hover:from-[#A08616] group-hover:to-[#e3c320] rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 shadow-2xl border border-white/10">
                            <span className="text-black font-bold text-lg">{step.number}</span>
                          </div>
                          <h3 className="text-xl font-medium text-white flex-1">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-white/70 leading-relaxed text-sm">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                  </React.Fragment>
                );              
              })}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 lg:mt-24">
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Zažijte budoucnost digitálních financí s naším komplexním ekosystémem navrženým k zabezpečení, sledování a růstu vašich krypto investic.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button className="bg-gradient-to-r from-[#B29819] to-[#F9D523] text-white hover:text-black font-medium px-10 py-4 rounded-2xl transition-all duration-500 transform hover:scale-110 hover:shadow-[0_0_30px_rgba(249,213,35,0.4)] hover:bg-gradient-to-r hover:from-white hover:to-[#F9D523] shadow-2xl backdrop-blur-sm border border-white/10 group">
              <span className="group-hover:text-black transition-colors duration-300">Připojte se k našemu ekosystému</span>
            </button>
            <button className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-medium px-10 py-4 rounded-2xl transition-all duration-500 transform hover:scale-110 hover:border-[#F9D523] hover:bg-gradient-to-r hover:from-[#B29819] hover:to-[#F9D523] hover:text-black shadow-xl group">
              <span className="group-hover:text-black transition-colors duration-300">Zobrazit Whitepaper</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};