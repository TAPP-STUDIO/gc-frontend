'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useScrollAnimation, useStaggeredAnimation } from '@/hook';

export const InfoSection = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation({ threshold: 0.2 });
  const { elementRef: benefitsRef, visibleItems } = useStaggeredAnimation(4, 100);
  const { elementRef: videoContainerRef, isVisible: videoVisible } = useScrollAnimation({ threshold: 0.3 });
  
  // Video states
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragTime, setDragTime] = useState(0);
  
  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressBarContainerRef = useRef<HTMLDivElement>(null);
  
  const benefits = [
    'Lifetime access to the Gavlik Capital portfolio, news and analysis.',
    'Quarterly portfolio rewards.',
    'Free mint of the next NFT projects.',
    'Fee bonus.'
  ];

  // Improved time formatting
  const formatTime = useCallback((time: number): string => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  // Handle video play/pause
  const toggleVideo = useCallback(async () => {
    if (!videoRef.current) return;
    
    try {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        setIsLoading(true);
        await videoRef.current.play();
        setIsLoading(false);
      }
      setIsVideoPlaying(!isVideoPlaying);
    } catch (error) {
      console.error('Error playing video:', error);
      setIsLoading(false);
    }
  }, [isVideoPlaying]);

  // Handle mute/unmute
  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    const newMutedState = !isMuted;
    videoRef.current.muted = newMutedState;
    setIsMuted(newMutedState);
  }, [isMuted]);

  // Handle volume change
  const handleVolumeChange = useCallback((newVolume: number) => {
    if (!videoRef.current) return;
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    videoRef.current.volume = clampedVolume;
    setVolume(clampedVolume);
    setIsMuted(clampedVolume === 0);
  }, []);

  // Improved fullscreen handling
  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;
    
    try {
      if (!isFullscreen) {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  }, [isFullscreen]);

  // Calculate time from mouse position
  const getTimeFromPosition = useCallback((clientX: number): number => {
    if (!progressBarContainerRef.current || !duration) return 0;
    
    const rect = progressBarContainerRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return pos * duration;
  }, [duration]);

  // Handle progress bar click
  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || isDragging) return;
    
    const newTime = getTimeFromPosition(e.clientX);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }, [getTimeFromPosition, isDragging]);

  // Handle drag start
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    
    setIsDragging(true);
    const newTime = getTimeFromPosition(e.clientX);
    setDragTime(newTime);
    
    // Prevent text selection
    e.preventDefault();
  }, [getTimeFromPosition]);

  // Handle drag move
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const newTime = getTimeFromPosition(e.clientX);
    setDragTime(newTime);
  }, [isDragging, getTimeFromPosition]);

  // Handle drag end
  const handleMouseUp = useCallback(() => {
    if (!isDragging || !videoRef.current) return;
    
    videoRef.current.currentTime = dragTime;
    setCurrentTime(dragTime);
    setIsDragging(false);
    setDragTime(0);
  }, [isDragging, dragTime]);

  // Video event handlers
  const handleTimeUpdate = useCallback(() => {
    if (!videoRef.current || isDragging) return;
    setCurrentTime(videoRef.current.currentTime);
  }, [isDragging]);

  const handleLoadedMetadata = useCallback(() => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  }, []);

  const handleCanPlay = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleWaiting = useCallback(() => {
    setIsLoading(true);
  }, []);

  const handleProgress = useCallback(() => {
    if (!videoRef.current) return;
    const bufferedEnd = videoRef.current.buffered.length > 0 
      ? videoRef.current.buffered.end(0) 
      : 0;
    setBuffered(bufferedEnd);
  }, []);

  const handleEnded = useCallback(() => {
    setIsVideoPlaying(false);
  }, []);

  const handleFullscreenChange = useCallback(() => {
    setIsFullscreen(!!document.fullscreenElement);
  }, []);

  // Keyboard controls
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!videoRef.current || e.target !== containerRef.current) return;
    
    switch (e.code) {
      case 'Space':
        e.preventDefault();
        toggleVideo();
        break;
      case 'KeyM':
        e.preventDefault();
        toggleMute();
        break;
      case 'KeyF':
        e.preventDefault();
        toggleFullscreen();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
        break;
      case 'ArrowRight':
        e.preventDefault();
        videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 10);
        break;
      case 'ArrowUp':
        e.preventDefault();
        handleVolumeChange(volume + 0.1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        handleVolumeChange(volume - 0.1);
        break;
    }
  }, [toggleVideo, toggleMute, toggleFullscreen, duration, volume, handleVolumeChange]);

  // Effects
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Add event listeners
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('progress', handleProgress);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('ended', handleEnded);
    };
  }, [handleTimeUpdate, handleLoadedMetadata, handleCanPlay, handleWaiting, handleProgress, handleEnded]);

  // Mouse drag effect
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Keyboard controls effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [handleKeyDown, handleFullscreenChange]);

  // Render loading spinner
  const LoadingSpinner = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-30">
      <div className="w-8 h-8 border-2 border-white/30 border-t-[#F9D523] rounded-full animate-spin"></div>
    </div>
  );

  return (
    <section id="cards" className="relative min-h-screen py-16 lg:py-24 bg-black overflow-visible">
      {/* Background */}
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
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      <div className="container mx-auto px-4 lg:px-8 relative z-20 overflow-visible">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[80vh]">
          
          {/* Left Side - Content */}
          <div className="space-y-8 lg:space-y-12">
            <div 
              ref={titleRef}
              className={`space-y-4 animate-slide-left ${titleVisible ? 'visible' : ''}`}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium text-white leading-tight">
                Gavlik Capital{' '}
                <span className="text-white/80">cards</span>
              </h2>
            </div>

            <div 
              ref={benefitsRef}
              className="space-y-4 animate-container py-2"
            >
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className={`flex items-start gap-4 group animate-slide-up py-1 px-1 ${
                    visibleItems.has(index) ? 'visible' : ''
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0 mt-1">
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
                  <p className="text-white/90 text-lg md:text-xl leading-snug font-medium">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>

            <div className={`pt-4 animate-fade-in ${titleVisible ? 'visible animate-stagger-4' : ''}`}>
              <button className="unified-button unified-button-lg">
                <span>OpenSea</span>
              </button>
            </div>
          </div>

          {/* Right Side - Enhanced Video Player */}
          <div 
            ref={videoContainerRef}
            className={`flex justify-center lg:justify-end animate-scale ${videoVisible ? 'visible' : ''}`}
          >
            <div className="relative w-full max-w-2xl">
              <div 
                ref={containerRef}
                className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 group focus:outline-none focus:ring-2 focus:ring-[#F9D523] focus:ring-opacity-50"
                tabIndex={0}
                role="application"
                aria-label="Video player"
              >
                {/* Video element */}
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  muted={isMuted}
                  poster="/backgrounds/info.png"
                  preload="metadata"
                  playsInline
                  onClick={toggleVideo}
                  onDoubleClick={toggleFullscreen}
                >
                  <source src="https://admin.gavlikcapital.com/front/dist/video/nft_video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Loading spinner */}
                {isLoading && <LoadingSpinner />}

                {/* Play button overlay */}
                {!isVideoPlaying && !isLoading && (
                  <button
                    onClick={toggleVideo}
                    className="absolute inset-0 bg-black/30 hover:bg-black/40 transition-colors duration-300 flex items-center justify-center group z-10"
                    aria-label="Play video"
                  >
                    <div className="w-16 h-16 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-lg">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-black ml-1">
                        <polygon points="5,3 19,12 5,21" fill="currentColor"/>
                      </svg>
                    </div>
                  </button>
                )}

                {/* Enhanced video controls */}
                <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 transition-all duration-300 ${
                  isVideoPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                } z-20`}>
                  
                  {/* Progress bar section */}
                  <div className="mb-3">
                    <div 
                      ref={progressBarContainerRef}
                      className="relative w-full bg-white/20 rounded-full h-2 cursor-pointer group/progress hover:h-3 transition-all duration-200"
                      onClick={handleProgressClick}
                      onMouseDown={handleMouseDown}
                      role="slider"
                      aria-label="Video progress"
                      aria-valuemin={0}
                      aria-valuemax={duration}
                      aria-valuenow={isDragging ? dragTime : currentTime}
                    >
                      {/* Buffered indicator */}
                      <div 
                        className="absolute top-0 left-0 h-full bg-white/30 rounded-full pointer-events-none"
                        style={{ width: `${duration > 0 ? (buffered / duration) * 100 : 0}%` }}
                      />
                      
                      {/* Progress indicator */}
                      <div 
                        ref={progressBarRef}
                        className="relative h-full bg-[#F9D523] rounded-full transition-all duration-100 pointer-events-none"
                        style={{ width: `${duration > 0 ? ((isDragging ? dragTime : currentTime) / duration) * 100 : 0}%` }}
                      >
                        {/* Progress handle */}
                        <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#F9D523] rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity duration-200 shadow-lg" />
                      </div>
                    </div>
                    
                    {/* Time display */}
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-white text-xs font-medium">
                        {formatTime(isDragging ? dragTime : currentTime)}
                      </span>
                      <span className="text-white/60 text-xs">
                        {formatTime(duration)}
                      </span>
                    </div>
                  </div>

                  {/* Control buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Play/Pause button */}
                      <button
                        onClick={toggleVideo}
                        className="text-white hover:text-[#F9D523] transition-colors p-1"
                        aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
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

                      {/* Volume controls */}
                      <div className="flex items-center gap-2 group/volume">
                        <button
                          onClick={toggleMute}
                          className="text-white hover:text-[#F9D523] transition-colors p-1"
                          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                        >
                          {isMuted ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/>
                              <line x1="23" y1="9" x2="17" y2="15"/>
                              <line x1="17" y1="9" x2="23" y2="15"/>
                            </svg>
                          ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/>
                              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                            </svg>
                          )}
                        </button>
                        
                        {/* Volume slider */}
                        <div className="w-0 group-hover/volume:w-16 overflow-hidden transition-all duration-200">
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={isMuted ? 0 : volume}
                            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                            className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer volume-slider"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right controls */}
                    <div className="flex items-center gap-3">
                      {/* Fullscreen button */}
                      <button 
                        onClick={toggleFullscreen}
                        className="text-white hover:text-[#F9D523] transition-colors p-1"
                        aria-label="Toggle fullscreen"
                      >
                        {isFullscreen ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="4,14 10,14 10,20"/>
                            <polyline points="20,10 14,10 14,4"/>
                            <line x1="14" y1="10" x2="21" y2="3"/>
                            <line x1="3" y1="21" x2="10" y2="14"/>
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="15,3 21,3 21,9"/>
                            <polyline points="9,21 3,21 3,15"/>
                            <line x1="21" y1="3" x2="14" y2="10"/>
                            <line x1="3" y1="21" x2="10" y2="14"/>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Keyboard shortcuts hint */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/70 rounded px-2 py-1 text-xs text-white/80 pointer-events-none z-30">
                  Space: Play/Pause • M: Mute • F: Fullscreen
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom styles for volume slider */}
      <style jsx>{`
        .volume-slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          background: #F9D523;
          border-radius: 50%;
          cursor: pointer;
        }
        .volume-slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          background: #F9D523;
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </section>
  );
};