'use client';

import React, {  } from 'react';
import Image from 'next/image';

export const Roadmap = () => {
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
          src="/backgrounds/image1.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        {/* Lehčí overlay pro lepší viditelnost pozadí */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header - Left Aligned */}
        <div className="mb-16 lg:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-xl">
            Secure, Track, and
            <br />
            <span className="text-white">Grow Your Crypto</span>
          </h2>
        </div>

        {/* Timeline - Two Columns Layout */}
        <div className="relative max-w-6xl mx-auto">
          {/* Timeline Steps - Two Columns */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 relative">
            {/* Vertical divider line between columns */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#F9D523] via-[#F9D523]/50 to-transparent"></div>
            {/* Left Column */}
            <div className="space-y-6">
              {roadmapSteps.slice(0, 4).map((step) => (
                <div key={step.id} className="relative">
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
                          <h3 className="text-xl font-bold text-white flex-1">
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
                    <div className="w-full transition-all duration-500 transform hover:scale-105">
                      <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/10 hover:border-[#F9D523]/50 transition-all duration-300 shadow-xl">
                        {/* Number and Title in header */}
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-14 h-14 bg-gradient-to-r from-[#B29819] to-[#F9D523] hover:from-[#A08616] hover:to-[#e3c320] rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-110 shadow-2xl border border-white/10">
                            <span className="text-black font-bold text-lg">{step.number}</span>
                          </div>
                          <h3 className="text-xl font-bold text-white flex-1">
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
            <div className="space-y-6">
              {roadmapSteps.slice(4, 7).map((step) => (
                <div key={step.id} className="relative">
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
                          <h3 className="text-xl font-bold text-white flex-1">
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
                    <div className="w-full transition-all duration-500 transform hover:scale-105">
                      <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/10 hover:border-[#F9D523]/50 transition-all duration-300 shadow-xl">
                        {/* Number and Title in header */}
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-14 h-14 bg-gradient-to-r from-[#B29819] to-[#F9D523] hover:from-[#A08616] hover:to-[#e3c320] rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-110 shadow-2xl border border-white/10">
                            <span className="text-black font-bold text-lg">{step.number}</span>
                          </div>
                          <h3 className="text-xl font-bold text-white flex-1">
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
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 lg:mt-24">
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Experience the future of digital finance with our comprehensive ecosystem designed to secure, track, and grow your crypto investments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button className="bg-gradient-to-r from-[#B29819] to-[#F9D523] hover:from-[#A08616] hover:to-[#e3c320] text-black font-bold px-10 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl backdrop-blur-sm border border-white/10">
              Join Our Ecosystem
            </button>
            <button className="bg-white/10 backdrop-blur-md border-2 border-white/30 hover:border-[#F9D523] hover:bg-white/20 text-white hover:text-[#F9D523] font-bold px-10 py-4 rounded-2xl transition-all duration-300 shadow-xl">
              View Whitepaper
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};