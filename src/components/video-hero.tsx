
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const VIDEO_1_URL = "https://github.com/kalaanakonda/Video-morpho/raw/refs/heads/main/aa11.webm";
const VIDEO_2_URL = "https://github.com/kalaanakonda/Video-morpho/raw/refs/heads/main/aa22.webm";

// The specific 10 logos provided
const LOGOS = [
  "https://cryptologos.cc/logos/thumbs/bitget-token-new.png?v=040",
  "https://cryptologos.cc/logos/thumbs/chainlink.png?v=040",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/960px-Binance_Logo.svg.png",
  "https://cryptologos.cc/logos/thumbs/pendle.png?v=040",
  "https://avatars.githubusercontent.com/u/32179889?s=200&v=4",
  "https://cdn.worldvectorlogo.com/logos/farcaster.svg",
  "https://pbs.twimg.com/profile_images/1643941027898613760/gyhYEOCE_400x400.jpg", // Updated Safe Logo
  "https://upload.wikimedia.org/wikipedia/commons/2/21/Polygon_Icon.svg",
  "https://pbs.twimg.com/profile_images/1672323719176318987/Qv7h4j1s_400x400.jpg",
  "https://assets.coingecko.com/coins/images/7310/large/cro_token_logo.png"
];

// 33 Symmetric points
const CENTER_X = 500;
const CENTER_Y = 325;

const RAW_POINTS = [
  // Center Column (5)
  { x: 500, y: 50 }, { x: 500, y: 175 }, { x: 500, y: 300 }, { x: 500, y: 425 }, { x: 500, y: 550 },
  
  // Column 1 (10)
  { x: 380, y: 80 }, { x: 620, y: 80 },
  { x: 380, y: 205 }, { x: 620, y: 205 },
  { x: 380, y: 330 }, { x: 620, y: 330 },
  { x: 380, y: 455 }, { x: 620, y: 455 },
  { x: 380, y: 580 }, { x: 620, y: 580 },
  
  // Column 2 (8)
  { x: 260, y: 130 }, { x: 740, y: 130 },
  { x: 260, y: 255 }, { x: 740, y: 255 },
  { x: 260, y: 380 }, { x: 740, y: 380 },
  { x: 260, y: 505 }, { x: 740, y: 505 },
  
  // Column 3 (6)
  { x: 140, y: 180 }, { x: 860, y: 180 },
  { x: 140, y: 305 }, { x: 860, y: 305 },
  { x: 140, y: 430 }, { x: 860, y: 430 },
  
  // Column 4 (4)
  { x: 20, y: 240 }, { x: 980, y: 240 },
  { x: 20, y: 365 }, { x: 980, y: 365 }
];

const CIRCLES = RAW_POINTS.map((point, i) => {
  // Calculate distance from center for wave animation delay
  const dist = Math.sqrt(Math.pow(point.x - CENTER_X, 2) + Math.pow(point.y - CENTER_Y, 2));
  return {
    ...point,
    logoUrl: LOGOS[i % LOGOS.length],
    delay: dist * 1.5 // Multiplier controls the "speed" of the wave
  };
});

export function VideoHero() {
  const [hasScrolled, setHasScrolled] = useState(false);
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
          // Reveal the network visualization slightly after the transformation video starts
          setTimeout(() => setShowNetwork(true), 800);
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

  return (
    <div className="relative h-[200vh] bg-[#F9F9F9]">
      <section className="sticky top-0 w-full h-screen flex flex-col items-center justify-start pt-32 px-6 overflow-hidden">
        {/* Background Videos - Entirely behind the UI */}
        <div className="absolute inset-0 z-0 pointer-events-none">
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
            muted
            playsInline
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
              hasScrolled ? "opacity-100" : "opacity-0"
            )}
          />
        </div>

        {/* Hero Content */}
        <div className={cn(
          "relative z-10 text-center max-w-2xl flex flex-col items-center transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) pointer-events-none",
          hasScrolled ? "-translate-y-64 opacity-0 scale-90" : "translate-y-0 opacity-100 scale-100"
        )}>
          <h1 className="text-4xl md:text-5xl font-bold text-black tracking-tight leading-[1.05] mb-6">
            Connect to the universal <br className="hidden md:block" /> lending network.
          </h1>
          <p className="text-[14px] md:text-[15px] text-black/50 max-w-sm mb-8 leading-relaxed font-medium">
            Access global liquidity at the best possible terms powered by open infrastructure that serves, not extracts.
          </p>
          
          <div className="flex gap-4 pointer-events-auto">
            <button className="bg-black text-white px-7 py-2.5 rounded-full font-semibold hover:bg-black/80 transition-all text-[12px]">
              Launch App
            </button>
            <button className="bg-white/90 backdrop-blur-md text-black border border-black/[0.05] px-7 py-2.5 rounded-full font-semibold hover:bg-white transition-all text-[12px]">
              Talk to us
            </button>
          </div>
        </div>

        {/* Network Visualization - Elevated position */}
        <div className={cn(
          "absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-all duration-1000 ease-in-out",
          showNetwork ? "opacity-100 translate-y-[-15%]" : "opacity-0 translate-y-20"
        )}>
          <svg 
            className="w-full h-[75vh] max-w-6xl overflow-visible" 
            viewBox="0 0 1000 650" 
            preserveAspectRatio="xMidYMid meet"
          >
            <g>
              {CIRCLES.map((circle, index) => (
                <g 
                  key={index}
                  className={cn(
                    "transition-all duration-1000 pointer-events-auto origin-center transform-gpu",
                    showNetwork 
                      ? "opacity-100 scale-100 animate-in fade-in zoom-in" 
                      : "opacity-0 scale-0"
                  )}
                  style={{ 
                    transitionDelay: showNetwork ? `${circle.delay}ms` : '0ms',
                    transformOrigin: `${circle.x}px ${circle.y}px`,
                    // Custom cubic-bezier for a "bouncy" wave reveal
                    transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                >
                  <g className="hover:scale-110 transition-transform duration-300 cursor-pointer">
                    {/* Outer circle container */}
                    <circle 
                      cx={circle.x} 
                      cy={circle.y} 
                      r="26" 
                      fill="white"
                      className="drop-shadow-sm"
                    />
                    {/* Logo Image */}
                    <image 
                      href={circle.logoUrl}
                      x={circle.x - 18}
                      y={circle.y - 18}
                      height="36"
                      width="36"
                      className="rounded-full"
                    />
                    {/* Subtle boundary ring */}
                    <circle 
                      cx={circle.x} 
                      cy={circle.y} 
                      r="26" 
                      fill="none"
                      stroke="black"
                      strokeOpacity="0.04"
                      strokeWidth="1"
                    />
                  </g>
                </g>
              ))}
            </g>
          </svg>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#F9F9F9] via-[#F9F9F9]/80 to-transparent pointer-events-none z-10"></div>
      </section>
    </div>
  );
}
