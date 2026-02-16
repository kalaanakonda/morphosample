"use client";

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const VIDEO_1_URL = "https://github.com/kalaanakonda/Video-morpho/raw/refs/heads/main/aa11.webm";
const VIDEO_2_URL = "https://github.com/kalaanakonda/Video-morpho/raw/refs/heads/main/aa22.webm";

const LOGOS = [
  "https://cryptologos.cc/logos/thumbs/bitget-token-new.png?v=040",
  "https://cryptologos.cc/logos/thumbs/chainlink.png?v=040",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/960px-Binance_Logo.svg.png",
  "https://cryptologos.cc/logos/thumbs/pendle.png?v=040",
  "https://avatars.githubusercontent.com/u/32179889?s=200&v=4",
  "https://cdn.worldvectorlogo.com/logos/farcaster.svg",
  "https://pbs.twimg.com/profile_images/1643941027898613760/gyhYEOCE_400x400.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/2/21/Polygon_Icon.svg",
  "https://pbs.twimg.com/profile_images/1672323719176318987/Qv7h4j1s_400x400.jpg",
  "https://assets.coingecko.com/coins/images/7310/large/cro_token_logo.png"
];

// Symmetric layout for 10 items: 3-4-3 grid
const RAW_POINTS = [
  // Row 1 (3 items)
  { x: 350, y: 150, row: 0 }, { x: 500, y: 150, row: 0 }, { x: 650, y: 150, row: 0 },
  // Row 2 (4 items)
  { x: 275, y: 300, row: 1 }, { x: 425, y: 300, row: 1 }, { x: 575, y: 300, row: 1 }, { x: 725, y: 300, row: 1 },
  // Row 3 (3 items)
  { x: 350, y: 450, row: 2 }, { x: 500, y: 450, row: 2 }, { x: 650, y: 450, row: 2 }
];

const CIRCLES = RAW_POINTS.map((point, i) => ({
  ...point,
  logoUrl: LOGOS[i],
  revealDelay: point.row * 200, // Stagger by row for line-by-line effect
  idleDelay: (point.row * 0.5) + (i * 0.1) // Stagger for the standing wave
}));

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
          // Reveal the network visualization line by line
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
        {/* Background Videos */}
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

        {/* Network Visualization */}
        <div className={cn(
          "absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-all duration-1000 ease-in-out",
          showNetwork ? "opacity-100 translate-y-[-10%]" : "opacity-0 translate-y-20"
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
                    "transition-all duration-700 pointer-events-auto origin-center transform-gpu",
                    showNetwork 
                      ? "opacity-100 scale-100" 
                      : "opacity-0 scale-0"
                  )}
                  style={{ 
                    transitionDelay: showNetwork ? `${circle.revealDelay}ms` : '0ms',
                    transformOrigin: `${circle.x}px ${circle.y}px`,
                  }}
                >
                  <g 
                    className={cn(
                      "transition-transform duration-300 cursor-pointer",
                      showNetwork && "animate-idle-wave"
                    )}
                    style={{
                      animationDelay: `${circle.idleDelay}s`
                    }}
                  >
                    <g className="hover:scale-110 transition-transform duration-200">
                      {/* Outer circle container */}
                      <circle 
                        cx={circle.x} 
                        cy={circle.y} 
                        r="32" 
                        fill="white"
                        className="drop-shadow-sm"
                      />
                      {/* Logo Image */}
                      <image 
                        href={circle.logoUrl}
                        x={circle.x - 22}
                        y={circle.y - 22}
                        height="44"
                        width="44"
                        className="rounded-full"
                      />
                      {/* Subtle boundary ring */}
                      <circle 
                        cx={circle.x} 
                        cy={circle.y} 
                        r="32" 
                        fill="none"
                        stroke="black"
                        strokeOpacity="0.04"
                        strokeWidth="1"
                      />
                    </g>
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