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
      title: 'NFT Design',
      description: 'The project was conceived and designed by Ahmed Younes, who as executive producer at Dubai TV has created a number of captivating programmes, election campaigns, and advertisements for television stations in Egypt, Dubai, the UAE, and Europe. His most recent project was EXPO 2020.',
    },
    {
      id: 2,
      number: '02',
      title: 'Smart contract',
      description: 'The software developers behind the many successes of Apartmania Holding a.s. have engineered a unique smart contract exclusively for Gavlik Capital NFT.',
    },
    {
      id: 3,
      number: '03',
      title: 'OpenSea Launch',
      description: 'Gavlik Capital NFT will debut in June 2022 on OpenSea, the world\'s largest NFT marketplace.',
    },
    {
      id: 4,
      number: '04',
      title: 'Reward Stability',
      description: 'Each owner of a GC NFT CARD will earn a regular quarterly profit share in the form of a reward paid to their MetaMask wallet. The goal for 2023 is stabilization of the regular rewards and continued growth of the portfolio.',
    },
    {
      id: 5,
      number: '05',
      title: 'BTC BOT NFT',
      description: 'Gavlik Capital will soon be launching a new project in its ecosystem. The BTC BOT will generate regular monthly rewards and put a portion of the profits in bitcoin.',
    },
    {
      id: 6,
      number: '06',
      title: 'Physical Merch and Lives Events',
      description: 'The video animation in the MetaMask wallet is only the beginning. We are also preparing physical silver and gold cards that will serve as tickets to Gavlik Capital live events. More info coming soon..',
    },
    {
      id: 7,
      number: '07',
      title: 'Gaming / Metaverse NFT',
      description: 'The specialists in the Gavlik Capital ecosystem have yet another exciting project in the pipeline, this time focusing on gaming and the metaverse.',
    }
  ];

  return (
    <section className="relative min-h-screen py-20 lg:py-32 overflow-hidden">
      {/* Background Image - lehčí overlays pro viditelnost */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/backgrounds/4Roadmapa.svg"
          alt="Roadmap Background"
          fill
          className="object-cover"
          priority
        />
        {/* Lehčí overlay pro lepší viditelnost pozadí */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header - Left Aligned jak Hero */}
        <div 
          ref={titleRef}
          className={`mb-16 lg:mb-24 animate-slide-up ${titleVisible ? 'visible' : ''}`}
        >
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium text-white leading-tight max-w-4xl">
              Secure, Track, and
              <br />
              <span className="text-white">Grow Your Crypto</span>
            </h2>
          </div>
        </div>

        {/* Timeline - Two Columns Layout */}
        <div className="relative max-w-6xl mx-auto overflow-visible">
          {/* Timeline Steps - Two Columns */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 relative overflow-visible">
            {/* Vertical divider line between columns */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#F9D523] via-[#F9D523]/50 to-transparent"></div>
            
            {/* Left Column */}
            <div 
              ref={leftRef}
              className="space-y-6 animate-container overflow-visible"
            >
              {roadmapSteps.slice(0, 4).map((step, stepIndex) => (
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

            {/* Right Column */}
            <div 
              ref={rightRef}
              className="space-y-6 animate-container overflow-visible"
            >
              {/* Speciální text pro položku 05 */}
              {roadmapSteps.slice(4, 7).map((step, stepIndex) => {
                // Pokud je to položka 05 (index 0 v slice), přidáme text nad ni
                const isItem05 = step.number === '05';
                return (
                  <React.Fragment key={step.id}>
                    {isItem05 && (
                      <div className="mb-8 lg:mb-12">
                        <p className="text-white/80 text-lg md:text-xl leading-relaxed font-medium max-w-md">
                          Experience the future of digital finance with our powerful, user-friendly app designed to keep your investments safe and maximize your gains.
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
            Experience the future of digital finance with our comprehensive ecosystem designed to secure, track, and grow your crypto investments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button className="bg-gradient-to-r from-[#B29819] to-[#F9D523] text-white hover:text-black font-bold px-10 py-4 rounded-2xl transition-all duration-500 transform hover:scale-110 hover:shadow-[0_0_30px_rgba(249,213,35,0.4)] hover:bg-gradient-to-r hover:from-white hover:to-[#F9D523] shadow-2xl backdrop-blur-sm border border-white/10 group">
              <span className="group-hover:text-black transition-colors duration-300">Join Our Ecosystem</span>
            </button>
            <button className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-bold px-10 py-4 rounded-2xl transition-all duration-500 transform hover:scale-110 hover:border-[#F9D523] hover:bg-gradient-to-r hover:from-[#B29819] hover:to-[#F9D523] hover:text-black shadow-xl group">
              <span className="group-hover:text-black transition-colors duration-300">View Whitepaper</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
