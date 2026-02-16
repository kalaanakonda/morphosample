"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

const VIDEO_1_URL = "https://github.com/kalaanakonda/Video-morpho/raw/refs/heads/main/aa11.webm";
const VIDEO_2_URL = "https://github.com/kalaanakonda/Video-morpho/raw/refs/heads/main/aa22.webm";

export function VideoHero() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [video2Ended, setVideo2Ended] = useState(false);
  
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleTrigger = (e: WheelEvent | TouchEvent) => {
      if (!hasScrolled) {
        setHasScrolled(true);
        if (video2Ref.current) {
          video2Ref.current.play().catch(console.error);
        }
      }
    };

    window.addEventListener('wheel', handleTrigger, { once: true });
    window.addEventListener('touchstart', handleTrigger, { once: true });

    return () => {
      window.removeEventListener('wheel', handleTrigger);
      window.removeEventListener('touchstart', handleTrigger);
    };
  }, [hasScrolled]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const restartExperience = () => {
    setHasScrolled(false);
    setVideo2Ended(false);
    if (video2Ref.current) {
      video2Ref.current.pause();
      video2Ref.current.currentTime = 0;
    }
    if (video1Ref.current) {
      video1Ref.current.play().catch(console.error);
    }
    // Re-attach listeners
    const handleTrigger = (e: WheelEvent | TouchEvent) => {
      setHasScrolled(true);
      if (video2Ref.current) {
        video2Ref.current.play().catch(console.error);
      }
    };
    window.addEventListener('wheel', handleTrigger, { once: true });
    window.addEventListener('touchstart', handleTrigger, { once: true });
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-background">
      {/* Video 1: Loop */}
      <div className={cn(
        "absolute inset-0 transition-opacity duration-1000",
        hasScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
      )}>
        <video
          ref={video1Ref}
          src={VIDEO_1_URL}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center p-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-4 font-headline uppercase animate-in fade-in slide-in-from-bottom-4 duration-1000">
            The Future <br /><span className="text-accent italic">Awaits</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl font-light animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            A revolutionary visual journey. Simply scroll to begin the experience.
          </p>
          
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
            <span className="text-xs font-bold text-white/50 tracking-[0.3em] uppercase">Scroll to Discover</span>
            <div className="w-px h-16 bg-gradient-to-b from-accent to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Video 2: Play once on trigger */}
      <div className={cn(
        "absolute inset-0 transition-opacity duration-1000",
        hasScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        <video
          ref={video2Ref}
          src={VIDEO_2_URL}
          muted={isMuted}
          playsInline
          onEnded={() => setVideo2Ended(true)}
          className="w-full h-full object-cover"
        />
        
        {/* Discrete Controls */}
        <div className="absolute bottom-10 right-10 flex gap-3">
          <button
            onClick={toggleMute}
            className="p-3 bg-black/40 hover:bg-black/60 backdrop-blur-lg border border-white/10 rounded-full text-white transition-all"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          {video2Ended && (
            <button
              onClick={restartExperience}
              className="flex items-center gap-2 px-5 bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-full transition-all shadow-lg"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Replay</span>
            </button>
          )}
        </div>

        {/* Cinematic overlay for Video 2 if needed */}
        {hasScrolled && !video2Ended && (
          <div className="absolute top-10 left-1/2 -translate-x-1/2 pointer-events-none">
             <div className="px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
                <span className="text-[10px] font-bold tracking-widest text-white/60 uppercase">Now playing: Transformation</span>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
