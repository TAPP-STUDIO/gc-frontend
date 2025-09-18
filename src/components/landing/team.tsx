'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation, useStaggeredAnimation } from '@/hook';

interface TeamMember {
  name: string;
  role: string;
  description?: string;
  quote?: string;
}

export const Team = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation({ threshold: 0.2 });
  const { elementRef: founderRef, isVisible: founderVisible } = useScrollAnimation({ threshold: 0.3 });
  const { elementRef: teamRef, visibleItems } = useStaggeredAnimation(4, 150);
  const { t } = useTranslation('team');
  
  const founder = t('founder', { returnObjects: true }) as TeamMember;
  const teamMembers = t('members', { returnObjects: true }) as TeamMember[];
  
  const founderData = {
    ...founder,
    image: '/team/gavlik.png'
  };
  
  const teamMembersWithImages = teamMembers.map((member, index) => ({
    ...member,
    image: index === 0 ? '/team/younes.png' : 
           index === 1 ? '/team/biegun.png' : '/team/cab.png'
  }));

  return (
    <section className="py-20 lg:py-32 bg-black relative overflow-visible">
      {/* SVG Background - načítá od začátku */}
      <div className="absolute inset-0 z-0 overflow-visible">
        <div className="absolute inset-0 transform scale-100 origin-top-center">
          <Image
            src="/backgrounds/6Tym.svg"
            alt="Team Background"
            fill
            className="object-contain"
            priority={false}
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
              {t('title')}
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-white">
              {t('heading')}
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
              <div className="relative w-80 h-96 lg:w-96 lg:h-[480px]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F9D523]/20 to-transparent rounded-3xl"></div>
                <Image
                  src={founderData.image}
                  alt={founderData.name}
                  fill
                  className="object-cover rounded-3xl shadow-2xl border-2 border-white/20"
                />
              </div>
            </div>

            {/* Founder Info */}
            <div className={`space-y-6 animate-slide-left ${founderVisible ? 'visible animate-stagger-1' : ''}`}>
              <div className="inline-flex items-center bg-[#F9D523]/20 backdrop-blur-sm px-4 py-2 rounded-full border border-[#F9D523]/30">
                <span className="text-[#F9D523] font-semibold text-sm uppercase tracking-wider">
                  {founderData.role}
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl font-medium text-white">
                {founderData.name}
              </h3>

              <p className="text-white/80 text-lg leading-relaxed">
                {founderData.description}
              </p>

              <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#F9D523] rounded-full mt-3 flex-shrink-0"></div>
                  <blockquote className="text-white/90 text-lg italic font-medium">
                    {founderData.quote}
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Team Members */}
        <div 
          ref={teamRef}
          className="w-full mx-auto animate-container overflow-visible"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 px-4 py-8">
            {teamMembersWithImages.map((member, index) => (
              <div
                key={index}
                className={`group backdrop-blur-sm border border-white/20 rounded-2xl p-6 group-hover:border-[#F9D523]/50 transition-all duration-300 shadow-xl group-hover:shadow-2xl group-hover:scale-[1.02] animate-scale overflow-visible ${
                  visibleItems.has(index) ? 'visible' : ''
                }`}
                style={{ 
                  transitionDelay: `${index * 150}ms`,
                  backgroundColor: '#001718'
                }}
              >
                {/* Member Image */}
                <div className="relative w-32 h-32 mb-6">
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