
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

const VIDEO_1_URL = "https://github.com/kalaanakonda/Video-morpho/raw/refs/heads/main/aa11.webm";
const VIDEO_2_URL = "https://github.com/kalaanakonda/Video-morpho/raw/refs/heads/main/aa22.webm";

export function VideoHero() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showNetwork, setShowNetwork] = useState(false);
  
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
          // Reveal the network visualization to match video 2 timing
          setTimeout(() => setShowNetwork(true), 1500);
        }
      } else {
        if (hasScrolled) {
          setHasScrolled(false);
          setShowNetwork(false);
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
        {/* Background Videos - Full Screen */}
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
          {/* Very subtle overlay to ensure text readability without blurring video */}
          <div className="absolute inset-0 bg-black/[0.01] pointer-events-none"></div>
        </div>

        {/* Content Section */}
        <div className={cn(
          "relative z-10 text-center max-w-3xl flex flex-col items-center transition-all duration-1000 ease-out",
          hasScrolled ? "-translate-y-48 opacity-0 scale-95" : "translate-y-0 opacity-100 scale-100"
        )}>
          <h1 className="text-4xl md:text-6xl font-bold text-black tracking-tight leading-[1.1] mb-6">
            Connect to the universal <br className="hidden md:block" /> lending network.
          </h1>
          <p className="text-[14px] md:text-[15px] text-black/60 max-w-md mb-8 leading-relaxed font-normal">
            Access global liquidity at the best possible terms powered by open infrastructure that serves, not extracts.
          </p>
          
          <div className="flex gap-4">
            <button className="bg-black text-white px-7 py-2.5 rounded-full font-semibold hover:bg-black/80 transition-all text-[12px] shadow-sm">
              Launch App
            </button>
            <button className="bg-white/90 backdrop-blur-md text-black border border-black/[0.05] px-7 py-2.5 rounded-full font-semibold hover:bg-white transition-all text-[12px] shadow-sm">
              Talk to us
            </button>
          </div>
        </div>

        {/* Network Visualization (Curly lines + Red circle logos) */}
        <div className={cn(
          "absolute inset-0 z-20 flex items-end justify-center pointer-events-none transition-all duration-1500 ease-in-out pb-10",
          showNetwork ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        )}>
          <svg className="w-full h-[60vh] max-w-5xl overflow-visible" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMax meet">
            {/* Fanning Curly Lines */}
            <g className="stroke-black/[0.05] fill-none stroke-[1]">
              <path d="M500 600 C 450 450, 150 400, 100 200" className={cn("transition-all duration-1000 delay-100", showNetwork ? "stroke-dashoffset-0" : "stroke-dashoffset-1000")} style={{ strokeDasharray: 1000 }} />
              <path d="M500 600 C 480 400, 300 350, 250 150" className={cn("transition-all duration-1000 delay-200", showNetwork ? "stroke-dashoffset-0" : "stroke-dashoffset-1000")} style={{ strokeDasharray: 1000 }} />
              <path d="M500 600 L 500 100" className={cn("transition-all duration-1000 delay-300", showNetwork ? "stroke-dashoffset-0" : "stroke-dashoffset-1000")} style={{ strokeDasharray: 1000 }} />
              <path d="M500 600 C 520 400, 700 350, 750 150" className={cn("transition-all duration-1000 delay-200", showNetwork ? "stroke-dashoffset-0" : "stroke-dashoffset-1000")} style={{ strokeDasharray: 1000 }} />
              <path d="M500 600 C 550 450, 850 400, 900 200" className={cn("transition-all duration-1000 delay-100", showNetwork ? "stroke-dashoffset-0" : "stroke-dashoffset-1000")} style={{ strokeDasharray: 1000 }} />
            </g>

            {/* Red Circles (Acting as Logos) */}
            <g className="fill-red-500 drop-shadow-sm transition-all duration-1000 ease-out">
              {/* Line 1 Circles */}
              <circle cx="100" cy="200" r="10" className={cn("transition-opacity delay-700", showNetwork ? "opacity-60" : "opacity-0")} />
              <circle cx="210" cy="380" r="8" className={cn("transition-opacity delay-500", showNetwork ? "opacity-40" : "opacity-0")} />
              <circle cx="340" cy="500" r="12" className={cn("transition-opacity delay-300", showNetwork ? "opacity-30" : "opacity-0")} />

              {/* Line 2 Circles */}
              <circle cx="250" cy="150" r="10" className={cn("transition-opacity delay-800", showNetwork ? "opacity-60" : "opacity-0")} />
              <circle cx="330" cy="320" r="9" className={cn("transition-opacity delay-600", showNetwork ? "opacity-50" : "opacity-0")} />
              <circle cx="410" cy="480" r="7" className={cn("transition-opacity delay-400", showNetwork ? "opacity-30" : "opacity-0")} />

              {/* Center Line Circles */}
              <circle cx="500" cy="100" r="12" className={cn("transition-opacity delay-900", showNetwork ? "opacity-70" : "opacity-0")} />
              <circle cx="500" cy="250" r="10" className={cn("transition-opacity delay-700", showNetwork ? "opacity-50" : "opacity-0")} />
              <circle cx="500" cy="450" r="8" className={cn("transition-opacity delay-500", showNetwork ? "opacity-40" : "opacity-0")} />

              {/* Line 4 Circles */}
              <circle cx="750" cy="150" r="10" className={cn("transition-opacity delay-800", showNetwork ? "opacity-60" : "opacity-0")} />
              <circle cx="670" cy="320" r="9" className={cn("transition-opacity delay-600", showNetwork ? "opacity-50" : "opacity-0")} />
              <circle cx="590" cy="480" r="7" className={cn("transition-opacity delay-400", showNetwork ? "opacity-30" : "opacity-0")} />

              {/* Line 5 Circles */}
              <circle cx="900" cy="200" r="10" className={cn("transition-opacity delay-700", showNetwork ? "opacity-60" : "opacity-0")} />
              <circle cx="790" cy="380" r="8" className={cn("transition-opacity delay-500", showNetwork ? "opacity-40" : "opacity-0")} />
              <circle cx="660" cy="500" r="12" className={cn("transition-opacity delay-300", showNetwork ? "opacity-30" : "opacity-0")} />
            </g>
          </svg>
        </div>

        {/* Mute toggle */}
        <button
          onClick={toggleMute}
          className="absolute bottom-10 right-10 p-2 bg-black/5 hover:bg-black/10 backdrop-blur-md border border-black/10 rounded-full text-black/60 hover:text-black transition-all z-30"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>

        {/* Subtle Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10"></div>
      </section>
    </div>
  );
}
