"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

const VIDEO_1_URL = "https://github.com/kalaanakonda/Video-morpho/raw/refs/heads/main/aa11.webm";
const VIDEO_2_URL = "https://github.com/kalaanakonda/Video-morpho/raw/refs/heads/main/aa22.webm";

export function VideoHero() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 50;

      if (scrollY > threshold) {
        if (!hasScrolled) {
          setHasScrolled(true);
          if (video2Ref.current) {
            video2Ref.current.currentTime = 0;
            video2Ref.current.play().catch(() => {});
          }
        }
      } else {
        if (hasScrolled) {
          setHasScrolled(false);
          if (video1Ref.current) {
            video1Ref.current.play().catch(() => {});
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <section className="relative w-full h-[90vh] flex flex-col items-center justify-start pt-20 md:pt-24 px-6 bg-[#F9F9F9] overflow-hidden">
      {/* Background Videos */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Video 1: Loop */}
        <video
          ref={video1Ref}
          src={VIDEO_1_URL}
          autoPlay
          loop
          muted
          playsInline
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
            hasScrolled ? "opacity-0" : "opacity-100"
          )}
        />
        
        {/* Video 2: Scroll Triggered */}
        <video
          ref={video2Ref}
          src={VIDEO_2_URL}
          muted={isMuted}
          playsInline
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
            hasScrolled ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Removed the blur overlay entirely for clarity */}
        <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>
      </div>

      {/* Brand & Headline Content */}
      <div className="relative z-10 text-center max-w-2xl flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl lg:text-[32px] font-bold text-black tracking-tight leading-[1.1] mb-3">
          Connect to the universal <br className="hidden md:block" /> lending network.
        </h1>
        <p className="text-[13px] md:text-sm text-black/60 max-w-lg mb-6 leading-relaxed font-normal">
          Access global liquidity at the best possible terms powered by open infrastructure that serves, not extracts.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-black/80 transition-all text-[12px]">
            Launch App
          </button>
          <button className="bg-white/90 backdrop-blur-sm text-black border border-black/5 px-6 py-2 rounded-full font-semibold hover:bg-white transition-all text-[12px] shadow-sm">
            Talk to us
          </button>
        </div>
      </div>

      {/* Mute toggle */}
      <button
        onClick={toggleMute}
        className="absolute bottom-8 right-8 p-2 bg-black/5 hover:bg-black/10 backdrop-blur-md border border-black/10 rounded-full text-black/60 hover:text-black transition-all z-20"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
      </button>

      {/* Subtle Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F9F9F9] to-transparent pointer-events-none z-10"></div>
    </section>
  );
}
