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
    <section className="relative w-full h-[90vh] flex flex-col items-center justify-start pt-24 md:pt-32 px-6 bg-[#F9F9F9] overflow-hidden">
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

        {/* Overlay for readability if needed, though videos seem light/clean */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] pointer-events-none"></div>
      </div>

      {/* Brand & Headline Content */}
      <div className="relative z-10 text-center max-w-2xl flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-black tracking-tight leading-[1.1] mb-4">
          Connect to the universal <br className="hidden md:block" /> lending network.
        </h1>
        <p className="text-sm md:text-base text-black/70 max-w-xl mb-8 leading-relaxed font-normal">
          Access global liquidity at the best possible terms powered by open infrastructure that serves, not extracts.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="bg-black text-white px-7 py-2.5 rounded-full font-semibold hover:bg-black/80 transition-all text-xs md:text-sm">
            Launch App
          </button>
          <button className="bg-white/80 backdrop-blur-sm text-black border border-black/5 px-7 py-2.5 rounded-full font-semibold hover:bg-white transition-all text-xs md:text-sm shadow-sm">
            Talk to us
          </button>
        </div>
      </div>

      {/* Mute toggle */}
      <button
        onClick={toggleMute}
        className="absolute bottom-10 right-10 p-2.5 bg-black/5 hover:bg-black/10 backdrop-blur-md border border-black/10 rounded-full text-black/60 hover:text-black transition-all z-20"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>

      {/* Subtle Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F9F9F9] to-transparent pointer-events-none z-10"></div>
    </section>
  );
}
