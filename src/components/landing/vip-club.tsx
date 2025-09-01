'use client';

import React from 'react';

export const VipClub = () => {
  const vipFeatures = [
    'Private chat with the founder',
    'Information',
    'Business trips with the founder',
    'And more'
  ];

  return (
    <section className="py-20 lg:py-32 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/10 via-transparent to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F9D523]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#B29819]/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Text */}
            <div className="space-y-8">
              <div className="text-[#F9D523] text-lg md:text-xl font-semibold uppercase tracking-wider">
                VIP CLUB
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Catch them all and
                <br />
                be a part of <span className="text-[#F9D523]">VIP CLUB</span>
              </h2>
            </div>

            {/* Right Side - Features List */}
            <div className="space-y-6">
              {vipFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 group"
                >
                  {/* Golden Check Icon */}
                  <div className="w-6 h-6 bg-gradient-to-r from-[#B29819] to-[#F9D523] rounded-sm flex items-center justify-center shadow-lg flex-shrink-0">
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
                  <p className="text-white text-lg md:text-xl font-medium group-hover:text-[#F9D523] transition-colors duration-300">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
