'use client';

import React from 'react';
import Image from 'next/image';
import { useScrollAnimation, useStaggeredAnimation } from '@/hook';

export const Team = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation({ threshold: 0.2 });
  const { elementRef: founderRef, isVisible: founderVisible } = useScrollAnimation({ threshold: 0.3 });
  const { elementRef: teamRef, visibleItems } = useStaggeredAnimation(3, 150);
  const teamMembers = [
    {
      name: 'Jakub Gavlík',
      role: 'FOUNDER',
      description: 'I\'ve spent more than ten years navigating the world of investment and enterprise. My many successes in that time have given me the experience and contacts necessary to take Gavlik Capital far from good to profit. Today, I believe in a future of secure cryptocurrency trading and investing. I created and operate the proprietary algorithms used and maintain all communication with brokers and investment firms. We\'ve all come together to create something extraordinary great and new.',
      quote: 'The two most important ingredients of success: simplicity and hard work.',
      image: '/team/gavlik.png'
    },
    {
      name: 'Ahmed Younes',
      role: 'Creative Promoter',
      image: '/team/younes.png'
    },
    {
      name: 'Patrik Biegun',
      role: 'Media production and Marketing',
      image: '/team/biegun.png'
    },
    {
      name: 'Jakub Cáb',
      role: 'Discord and social media',
      image: '/team/cab.png'
    },
    {
      name: 'Radomír Trumpeš',
      role: 'Technical Advisor',
      image: '/team/trumpes.png'
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-black relative overflow-visible">
      {/* SVG Background */}
      <div className="absolute inset-0 z-0 overflow-visible">
        <div className="absolute inset-0 transform scale-100 origin-center">
          <Image
            src="/backgrounds/5VIP + tym.svg"
            alt="Team Background"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10 overflow-visible">
        {/* Header */}
        <div 
          ref={titleRef}
          className={`text-center mb-16 lg:mb-20 animate-slide-up ${titleVisible ? 'visible' : ''}`}
        >
          <div className="space-y-4">
            <div className="text-[#F9D523] text-lg md:text-xl font-semibold mb-4 uppercase tracking-wider">
              OUR TEAM
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-white">
              Meet the team
            </h2>
          </div>
        </div>

        {/* Founder Section */}
        <div 
          ref={founderRef}
          className="max-w-7xl mx-auto mb-16 lg:mb-24"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Founder Image */}
            <div className={`flex justify-center lg:justify-start animate-scale ${founderVisible ? 'visible' : ''}`}>
              <div className="relative w-80 h-96 lg:w-96 lg:h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F9D523]/20 to-transparent rounded-3xl"></div>
                <Image
                  src={teamMembers[0].image}
                  alt={teamMembers[0].name}
                  fill
                  className="object-cover rounded-3xl shadow-2xl"
                />
              </div>
            </div>

            {/* Founder Info */}
            <div className={`space-y-6 animate-slide-left ${founderVisible ? 'visible animate-stagger-1' : ''}`}>
              <div className="inline-flex items-center bg-[#F9D523]/20 backdrop-blur-sm px-4 py-2 rounded-full border border-[#F9D523]/30">
                <span className="text-[#F9D523] font-semibold text-sm uppercase tracking-wider">
                  {teamMembers[0].role}
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl font-medium text-white">
                {teamMembers[0].name}
              </h3>

              <p className="text-white/80 text-lg leading-relaxed">
                {teamMembers[0].description}
              </p>

              <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#F9D523] rounded-full mt-3 flex-shrink-0"></div>
                  <blockquote className="text-white/90 text-lg italic font-medium">
                    {teamMembers[0].quote}
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Team Members */}
        <div 
          ref={teamRef}
          className="max-w-6xl mx-auto animate-container overflow-visible"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 px-4 py-8">
            {teamMembers.slice(1).map((member, index) => (
              <div
                key={index}
                className={`group bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 group-hover:bg-white/10 group-hover:border-[#F9D523]/50 transition-all duration-300 shadow-xl group-hover:shadow-2xl group-hover:scale-[1.02] animate-scale overflow-visible mx-2 my-4 ${
                  visibleItems.has(index) ? 'visible' : ''
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Member Image */}
                <div className="relative w-24 h-24 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F9D523]/20 to-transparent rounded-full"></div>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-full shadow-lg"
                  />
                  {/* Golden Badge */}
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-r from-[#B29819] to-[#F9D523] rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="w-4 h-4 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>

                {/* Member Info */}
                <div className="text-left space-y-2">
                  <h4 className="text-xl font-medium text-white group-hover:text-[#F9D523] transition-colors duration-300">
                    {member.name}
                  </h4>
                  <p className="text-white/70 text-sm">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>


        </div>
      </div>
    </section>
  );
};
