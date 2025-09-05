'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useScrollAnimation, useStaggeredAnimation } from '@/hook';


export const InfoSection = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation({ threshold: 0.2 });
  const { elementRef: benefitsRef, visibleItems } = useStaggeredAnimation(4, 100);
  const { elementRef: videoContainerRef, isVisible: videoVisible } = useScrollAnimation({ threshold: 0.3 });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const benefits = [
    'Lifetime access to the Gavlik Capital portfolio, news and analysis.',
    'Quarterly portfolio rewards.',
    'Free mint of the next NFT projects.',
    'Fee bonus.'
  ];

  // Video event handlers
  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const handleVideoClick = () => {
    toggleVideo();
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!isFullscreen) {
        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      // Nastavit preview na 1 sekundu
      videoRef.current.currentTime = 1;
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * duration;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      
      // Nastavit preview na 1 sekundu po načtení
      const handleCanPlay = () => {
        video.currentTime = 1;
      };
      video.addEventListener('canplay', handleCanPlay);
      
      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, []);

  return (
    <section className="relative min-h-screen py-20 lg:py-32 bg-black overflow-visible">
      {/* Background - vše inline bez globals.css */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: "url('/backgrounds/2Card.svg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '100%',
          minWidth: '100vw',
          minHeight: '100vh'
        }}
      ></div>

      {/* CSS pro ultra wide fix - přidáno inline */}
      <style jsx>{`
        @media (min-width: 2560px) {
          .ultra-wide-bg {
            background-size: cover !important;
            background-position: center center !important;
            background-repeat: no-repeat !important;
          }
        }
      `}</style>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-20 overflow-visible">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[80vh]">
          
          {/* Left Side - Content */}
          <div className="space-y-8 lg:space-y-12">
            {/* Main Heading */}
            <div 
              ref={titleRef}
              className={`space-y-4 animate-slide-left ${titleVisible ? 'visible' : ''}`}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium text-white leading-tight">
                Gavlik Capital{' '}
                <span className="text-white/80">cards</span>
              </h2>
            </div>

            {/* Benefits List */}
            <div 
              ref={benefitsRef}
              className="space-y-6 animate-container py-4"
            >
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className={`flex items-start gap-4 group animate-slide-up py-2 px-1 ${
                    visibleItems.has(index) ? 'visible' : ''
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0 mt-1">
                    {/* White check ikonka s borderorem jako VIP */}
                    <div className="w-6 h-6 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-white/50 transition-all duration-300">
                      <svg
                        className="w-4 h-4 text-white flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
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
            <div className={`pt-4 animate-fade-in ${titleVisible ? 'visible animate-stagger-4' : ''}`}>
              <button className="unified-button unified-button-lg">
                <span>OpenSea</span>
              </button>
            </div>
          </div>

          {/* Right Side - Video Player - VĚTŠÍ VELIKOST */}
          <div 
            ref={videoContainerRef}
            className={`flex justify-center lg:justify-end animate-scale ${videoVisible ? 'visible' : ''}`}
          >
            <div className="relative w-full max-w-2xl">
              {/* Video Container */}
              <div 
                ref={containerRef}
                className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 group"
              >
                {/* Skutečné video - KLIKATELNÉ */}
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover cursor-pointer"
                  muted={isMuted}
                  onEnded={() => setIsVideoPlaying(false)}
                  onClick={handleVideoClick}
                  poster="/backgrounds/info.png"
                  preload="metadata"
                >
                  <source src="/videos/intro.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Play Button Overlay - zobrazí se pouze když video nehraje */}
                {!isVideoPlaying && (
                  <button
                    onClick={toggleVideo}
                    className="absolute inset-0 bg-black/30 hover:bg-black/40 transition-colors duration-300 flex items-center justify-center group z-10 pointer-events-auto"
                  >
                    <div className="w-16 h-16 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-lg">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-black ml-1">
                        <polygon points="5,3 19,12 5,21" fill="currentColor"/>
                      </svg>
                    </div>
                  </button>
                )}

                {/* Video Controls - zobrazí se při hover nebo když video hraje */}
                <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${isVideoPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} pointer-events-auto z-20`}>
                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div 
                      className="w-full bg-white/20 rounded-full h-1 cursor-pointer"
                      onClick={handleProgressClick}
                    >
                      <div 
                        className="bg-[#F9D523] h-1 rounded-full transition-all duration-100"
                        style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-white text-xs">{formatTime(currentTime)}</span>
                      <span className="text-white/60 text-xs">{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleVideo();
                        }}
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
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMute();
                        }}
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

                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFullscreen();
                        }}
                        className="text-white hover:text-[#F9D523] transition-colors"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="15,3 21,3 21,9"/>
                          <polyline points="9,21 3,21 3,15"/>
                          <line x1="21" y1="3" x2="14" y2="10"/>
                          <line x1="3" y1="21" x2="10" y2="14"/>
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