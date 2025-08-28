'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export const Roadmap = () => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const roadmapSteps = [
    {
      id: 1,
      number: '01',
      title: 'NFT Design',
      description: 'The project was conceived and designed by Ahmed Younes, who as executive producer at Dubai TV has created a number of captivating programmes, election campaigns, and advertisements for television stations in Egypt, Dubai, the UAE, and Europe. His most recent project was EXPO 2020.',
      side: 'left'
    },
    {
      id: 2,
      number: '02',
      title: 'Smart contract',
      description: 'The software developers behind the many successes of Apartmania Holding a.s. have engineered a unique smart contract exclusively for Gavlik Capital NFT.',
      side: 'right'
    },
    {
      id: 3,
      number: '03',
      title: 'OpenSea Launch',
      description: 'Gavlik Capital NFT will debut in June 2022 on OpenSea, the world\'s largest NFT marketplace.',
      side: 'left'
    },
    {
      id: 4,
      number: '04',
      title: 'Reward Stability',
      description: 'Each owner of a GC NFT CARD will earn a regular quarterly profit share in the form of a reward paid to their MetaMask wallet. The goal for 2023 is stabilization of the regular rewards and continued growth of the portfolio.',
      side: 'right'
    },
    {
      id: 5,
      number: '05',
      title: 'BTC BOT NFT',
      description: 'Gavlik Capital will soon be launching a new project in its ecosystem. The BTC BOT will generate regular monthly rewards and put a portion of the profits in bitcoin.',
      side: 'left'
    },
    {
      id: 6,
      number: '06',
      title: 'Physical Merch and Lives Events',
      description: 'The video animation in the MetaMask wallet is only the beginning. We are also preparing physical silver and gold cards that will serve as tickets to Gavlik Capital live events. More info coming soon..',
      side: 'right'
    },
    {
      id: 7,
      number: '07',
      title: 'Gaming / Metaverse NFT',
      description: 'The specialists in the Gavlik Capital ecosystem have yet another exciting project in the pipeline, this time focusing on gaming and the metaverse.',
      side: 'left'
    }
  ];

  return (
    <section className="relative min-h-screen py-20 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/backgrounds/image1.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-black/60"></div>
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

        {/* Timeline */}
        <div className="relative max-w-7xl mx-auto">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#F9D523] via-[#F9D523] to-transparent hidden lg:block"></div>

          {/* Timeline Steps */}
          <div className="space-y-16 lg:space-y-20">
            {roadmapSteps.map((step, index) => (
              <div
                key={step.id}
                className={`relative flex items-center ${
                  step.side === 'left' 
                    ? 'lg:flex-row lg:justify-start' 
                    : 'lg:flex-row-reverse lg:justify-start'
                } flex-col`}
                onMouseEnter={() => setHoveredStep(step.id)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                {/* Content Box */}
                <div className={`
                  w-full lg:w-5/12 mb-8 lg:mb-0 transition-all duration-500 transform hover:scale-105
                  ${step.side === 'left' ? 'lg:pr-16' : 'lg:pl-16'}
                  ${hoveredStep === step.id ? (step.side === 'left' ? 'lg:translate-x-2' : 'lg:-translate-x-2') : ''}
                `}>
                  <div className="bg-teal-900/30 backdrop-blur-sm border border-teal-700/30 rounded-2xl p-6 lg:p-8 hover:bg-teal-900/40 hover:border-teal-600/50 transition-all duration-300">
                    {/* Mobile Step Number */}
                    <div className="flex items-center gap-4 mb-4 lg:hidden">
                      <div className="w-12 h-12 bg-[#F9D523] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-black font-bold text-sm">{step.number}</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white">
                        {step.title}
                      </h3>
                    </div>

                    {/* Desktop Title */}
                    <h3 className="hidden lg:block text-xl md:text-2xl font-bold text-white mb-4">
                      {step.title}
                    </h3>

                    <p className="text-white/80 leading-relaxed text-sm md:text-base">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Central Step Circle - Desktop Only */}
                <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-[#F9D523] rounded-full items-center justify-center z-10 border-4 border-black transition-all duration-300 hover:scale-110">
                  <span className="text-black font-bold text-lg">{step.number}</span>
                </div>

                {/* Empty space for opposite side */}
                <div className="hidden lg:block w-5/12"></div>
              </div>
            ))}
          </div>

          {/* Timeline End Dot */}
          <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 bottom-0 w-4 h-4 bg-[#F9D523] rounded-full border-2 border-black mt-8"></div>
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
