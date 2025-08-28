'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export const InfoSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const benefits = [
    'Lifetime access to the Gavlik Capital portfolio, news and analysis.',
    'Quarterly portfolio rewards.',
    'Free mint of the next NFT projects.',
    'Fee bonus.'
  ];

  const toggleVideo = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative min-h-screen py-20 lg:py-32 overflow-hidden bg-black">
      {/* SVG Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/backgrounds/info.svg"
          alt="Info Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[80vh]">
          
          {/* Left Side - Content */}
          <div className="space-y-8 lg:space-y-12">
            {/* Main Heading */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Gavlik Capital{' '}
                <span className="text-white/80">cards</span>
              </h2>
            </div>

            {/* Benefits List */}
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 mt-1">
                    {/* Custom checkmark */}
                    <div className="w-6 h-6 rounded-full bg-[#F9D523]/20 border-2 border-[#F9D523] flex items-center justify-center group-hover:bg-[#F9D523]/30 transition-all duration-300">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#F9D523"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20,6 9,17 4,12"></polyline>
                      </svg>
                    </div>
                  </div>
                  <p className="text-white/90 text-lg md:text-xl leading-relaxed font-medium">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>

            {/* OpenSea Button */}
            <div className="pt-4">
              <button className="bg-gradient-to-r from-[#B29819] to-[#F9D523] hover:from-[#A08616] hover:to-[#e3c320] text-black font-bold px-10 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl backdrop-blur-sm border border-white/10 text-lg">
                OpenSea
              </button>
            </div>
          </div>

          {/* Right Side - Video Player */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              {/* Video Container */}
              <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
                {/* Video Background/Poster */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  {/* Gavlik Capital Logo */}
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 mx-auto">
                      {/* Golden G Logo - simplified version */}
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-[#F9D523] to-[#d4b01c] flex items-center justify-center shadow-lg">
                        <span className="text-black text-4xl font-bold">G</span>
                      </div>
                    </div>
                    <div className="text-[#F9D523] text-xl md:text-2xl font-bold">
                      GavlikCapital
                    </div>
                  </div>

                  {/* Play Button Overlay */}
                  <button
                    onClick={toggleVideo}
                    className="absolute inset-0 bg-black/30 hover:bg-black/40 transition-colors duration-300 flex items-center justify-center group"
                  >
                    <div className="w-16 h-16 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-lg">
                      {isVideoPlaying ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-black">
                          <rect x="6" y="4" width="4" height="16" fill="currentColor"/>
                          <rect x="14" y="4" width="4" height="16" fill="currentColor"/>
                        </svg>
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-black ml-1">
                          <polygon points="5,3 19,12 5,21" fill="currentColor"/>
                        </svg>
                      )}
                    </div>
                  </button>
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="w-full bg-white/20 rounded-full h-1">
                      <div className="bg-[#F9D523] h-1 rounded-full w-full"></div>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-white text-xs">0:55</span>
                      <span className="text-white/60 text-xs">0:55</span>
                    </div>
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={toggleVideo}
                        className="text-white hover:text-[#F9D523] transition-colors"
                      >
                        {isVideoPlaying ? (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="6" y="4" width="4" height="16"/>
                            <rect x="14" y="4" width="4" height="16"/>
                          </svg>
                        ) : (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="5,3 19,12 5,21"/>
                          </svg>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={toggleMute}
                        className="text-white hover:text-[#F9D523] transition-colors"
                      >
                        {isMuted ? (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/>
                            <line x1="23" y1="9" x2="17" y2="15"/>
                            <line x1="17" y1="9" x2="23" y2="15"/>
                          </svg>
                        ) : (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                          </svg>
                        )}
                      </button>

                      <button className="text-white hover:text-[#F9D523] transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="15,3 21,3 21,9"/>
                          <polyline points="9,21 3,21 3,15"/>
                          <line x1="21" y1="3" x2="14" y2="10"/>
                          <line x1="3" y1="21" x2="10" y2="14"/>
                        </svg>
                      </button>

                      <button className="text-white hover:text-[#F9D523] transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="1"/>
                          <circle cx="19" cy="12" r="1"/>
                          <circle cx="5" cy="12" r="1"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
