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
    <section className="relative w-full h-screen flex flex-col items-center justify-start pt-32 md:pt-40 px-6 bg-[#F9F9F9] overflow-hidden">
      {/* Brand & Headline Content */}
      <div className="relative z-20 text-center max-w-3xl flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black tracking-tight leading-[1.1] mb-6">
          Connect to the universal <br className="hidden md:block" /> lending network.
        </h1>
        <p className="text-base md:text-lg text-black/60 max-w-2xl mb-10 leading-relaxed font-normal">
          Access global liquidity at the best possible terms powered by open infrastructure that serves, not extracts.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <button className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-black/80 transition-all text-sm">
            Launch App
          </button>
          <button className="bg-white text-black border border-black/10 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-all text-sm shadow-sm">
            Talk to us
          </button>
        </div>
      </div>

      {/* Sphere Container */}
      <div className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] rounded-full overflow-hidden bg-white shadow-[0_0_80px_rgba(0,0,0,0.05)] border border-black/5 p-1 group">
        <div className="w-full h-full rounded-full overflow-hidden relative">
          {/* Video 1: Loop */}
          <video
            ref={video1Ref}
            src={VIDEO_1_URL}
            autoPlay
            loop
            muted
            playsInline
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-700",
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
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-700",
              hasScrolled ? "opacity-100" : "opacity-0"
            )}
          />

          {/* Mute toggle inside sphere */}
          <button
            onClick={toggleMute}
            className={cn(
              "absolute bottom-6 right-1/2 translate-x-1/2 p-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white/80 hover:text-white transition-all z-30 opacity-0 group-hover:opacity-100",
              hasScrolled && "opacity-100"
            )}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Decorative gradient for depth */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-1/2 bg-gradient-to-t from-white to-transparent opacity-40 pointer-events-none -z-10"></div>
    </section>
  );
}
