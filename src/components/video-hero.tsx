
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

const VIDEO_1_URL = "https://github.com/kalaanakonda/Video-morpho/raw/refs/heads/main/aa11.webm";
const VIDEO_2_URL = "https://github.com/kalaanakonda/Video-morpho/raw/refs/heads/main/aa22.webm";

const LOGOS = [
  "AAVE", "COMPOUND", "CURVE", "MAKER", "UNISWAP", "LIDO"
];

export function VideoHero() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showLogos, setShowLogos] = useState(false);
  
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 100; // Trigger after small initial scroll

      if (scrollY > threshold) {
        if (!hasScrolled) {
          setHasScrolled(true);
          if (video2Ref.current) {
            video2Ref.current.currentTime = 0;
            video2Ref.current.play().catch(() => {});
          }
          // Delay logo reveal to match video 2 animation
          setTimeout(() => setShowLogos(true), 2000);
        }
      } else {
        if (hasScrolled) {
          setHasScrolled(false);
          setShowLogos(false);
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
    <div className="relative h-[200vh] bg-background">
      <section className="sticky top-0 w-full h-screen flex flex-col items-center justify-start pt-32 px-6 overflow-hidden">
        {/* Background Videos */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
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
          <div className="absolute inset-0 bg-black/[0.02] pointer-events-none"></div>
        </div>

        {/* Brand & Headline Content */}
        <div className={cn(
          "relative z-10 text-center max-w-3xl flex flex-col items-center transition-all duration-1000 ease-out",
          hasScrolled ? "-translate-y-32 opacity-0" : "translate-y-0 opacity-100"
        )}>
          <h1 className="text-4xl md:text-6xl font-bold text-black tracking-tight leading-[1.1] mb-6">
            Connect to the universal <br className="hidden md:block" /> lending network.
          </h1>
          <p className="text-[13px] md:text-[14px] text-black/60 max-w-md mb-10 leading-relaxed font-normal">
            Access global liquidity at the best possible terms powered by open infrastructure that serves, not extracts.
          </p>
          
          <div className="flex gap-4">
            <button className="bg-black text-white px-7 py-2.5 rounded-full font-semibold hover:bg-black/80 transition-all text-[12px] shadow-lg">
              Launch App
            </button>
            <button className="bg-white/80 backdrop-blur-sm text-black border border-black/5 px-7 py-2.5 rounded-full font-semibold hover:bg-white transition-all text-[12px] shadow-sm">
              Talk to us
            </button>
          </div>
        </div>

        {/* Logos reveal section */}
        <div className={cn(
          "absolute bottom-24 left-0 right-0 z-20 flex flex-col items-center transition-all duration-1000 delay-500",
          showLogos ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 mb-8 font-bold">Trusted by leading protocols</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 px-6">
            {LOGOS.map((logo) => (
              <span key={logo} className="text-xs font-black text-black/30 tracking-widest">{logo}</span>
            ))}
          </div>
        </div>

        {/* Mute toggle */}
        <button
          onClick={toggleMute}
          className="absolute bottom-10 right-10 p-2 bg-black/5 hover:bg-black/10 backdrop-blur-md border border-black/10 rounded-full text-black/60 hover:text-black transition-all z-30"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>

        {/* Subtle Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10"></div>
      </section>
    </div>
  );
}
