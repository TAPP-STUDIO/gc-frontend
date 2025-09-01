'use client';

import React, { useState, useRef, useEffect } from 'react';


export const InfoSection = () => {
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
    <section className="relative min-h-screen py-20 lg:py-32 overflow-hidden bg-black">
      {/* Background - vše inline bez globals.css */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: "url('/backgrounds/info.png')",
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

          {/* Right Side - Video Player - VĚTŠÍ VELIKOST */}
          <div className="flex justify-center lg:justify-end">
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