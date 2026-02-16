
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

const VIDEO_1_URL = "https://github.com/kalaanakonda/Video-morpho/raw/refs/heads/main/aa11.webm";
const VIDEO_2_URL = "https://github.com/kalaanakonda/Video-morpho/raw/refs/heads/main/aa22.webm";

// 33 Symmetric points for a clean network visualization
const CIRCLES = [
  // Center Column (5)
  { x: 500, y: 100, delay: 0 }, { x: 500, y: 200, delay: 100 }, { x: 500, y: 300, delay: 200 }, { x: 500, y: 400, delay: 300 }, { x: 500, y: 500, delay: 400 },
  // Column 1 (10)
  { x: 420, y: 120, delay: 150 }, { x: 580, y: 120, delay: 150 },
  { x: 420, y: 220, delay: 250 }, { x: 580, y: 220, delay: 250 },
  { x: 420, y: 320, delay: 350 }, { x: 580, y: 320, delay: 350 },
  { x: 420, y: 420, delay: 450 }, { x: 580, y: 420, delay: 450 },
  { x: 420, y: 520, delay: 550 }, { x: 580, y: 520, delay: 550 },
  // Column 2 (8)
  { x: 340, y: 160, delay: 300 }, { x: 660, y: 160, delay: 300 },
  { x: 340, y: 260, delay: 400 }, { x: 660, y: 260, delay: 400 },
  { x: 340, y: 360, delay: 500 }, { x: 660, y: 360, delay: 500 },
  { x: 340, y: 460, delay: 600 }, { x: 660, y: 460, delay: 600 },
  // Column 3 (6)
  { x: 260, y: 210, delay: 450 }, { x: 740, y: 210, delay: 450 },
  { x: 260, y: 310, delay: 550 }, { x: 740, y: 310, delay: 550 },
  { x: 260, y: 410, delay: 650 }, { x: 740, y: 410, delay: 650 },
  // Column 4 (4)
  { x: 180, y: 270, delay: 600 }, { x: 820, y: 270, delay: 600 },
  { x: 180, y: 370, delay: 700 }, { x: 820, y: 370, delay: 700 }
];

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
          <div className="absolute inset-0 bg-black/[0.01] pointer-events-none"></div>
        </div>

        {/* Content Section - Slides up on scroll */}
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

        {/* Network Visualization (33 Symmetric Red Circles) - Moved Higher Up */}
        <div className={cn(
          "absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-all duration-1500 ease-in-out",
          showNetwork ? "opacity-100 translate-y-[-10%]" : "opacity-0 translate-y-20"
        )}>
          <svg className="w-full h-[70vh] max-w-5xl overflow-visible" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
            <g className="fill-red-500 transition-all duration-1000 ease-out">
              {CIRCLES.map((circle, index) => (
                <circle 
                  key={index}
                  cx={circle.x} 
                  cy={circle.y} 
                  r="9" 
                  className={cn(
                    "transition-all duration-700 ease-out",
                    showNetwork ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  )}
                  style={{ 
                    transitionDelay: `${circle.delay + 300}ms`,
                    filter: 'drop-shadow(0 0 4px rgba(239, 68, 68, 0.3))'
                  }} 
                />
              ))}
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
