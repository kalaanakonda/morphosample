
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
  "https://play-lh.googleusercontent.com/x3Sles_n9G2I2xnvm4pE6JVMWPCq3Hbbkyq2uLZ-k2XxTrlUXej1FrCAHxMVQHwzXg=w240-h480-rw",
  "https://upload.wikimedia.org/wikipedia/commons/2/21/Polygon_Icon.svg",
  "https://pbs.twimg.com/profile_images/1672323719176318987/Qv7h4j1s_400x400.jpg",
  "https://assets.coingecko.com/coins/images/7310/large/cro_token_logo.png"
];

// 33 Symmetric points with a wider spread
const CIRCLES = [
  // Center Column (5)
  { x: 500, y: 50, delay: 0 }, { x: 500, y: 175, delay: 100 }, { x: 500, y: 300, delay: 200 }, { x: 500, y: 425, delay: 300 }, { x: 500, y: 550, delay: 400 },
  
  // Column 1 (10) - Spread outward
  { x: 380, y: 80, delay: 150 }, { x: 620, y: 80, delay: 150 },
  { x: 380, y: 205, delay: 250 }, { x: 620, y: 205, delay: 250 },
  { x: 380, y: 330, delay: 350 }, { x: 620, y: 330, delay: 350 },
  { x: 380, y: 455, delay: 450 }, { x: 620, y: 455, delay: 450 },
  { x: 380, y: 580, delay: 550 }, { x: 620, y: 580, delay: 550 },
  
  // Column 2 (8)
  { x: 260, y: 130, delay: 300 }, { x: 740, y: 130, delay: 300 },
  { x: 260, y: 255, delay: 400 }, { x: 740, y: 255, delay: 400 },
  { x: 260, y: 380, delay: 500 }, { x: 740, y: 380, delay: 500 },
  { x: 260, y: 505, delay: 600 }, { x: 740, y: 505, delay: 600 },
  
  // Column 3 (6)
  { x: 140, y: 180, delay: 450 }, { x: 860, y: 180, delay: 450 },
  { x: 140, y: 305, delay: 550 }, { x: 860, y: 305, delay: 550 },
  { x: 140, y: 430, delay: 650 }, { x: 860, y: 430, delay: 650 },
  
  // Column 4 (4)
  { x: 20, y: 240, delay: 600 }, { x: 980, y: 240, delay: 600 },
  { x: 20, y: 365, delay: 700 }, { x: 980, y: 365, delay: 700 }
].map((circle, i) => ({
  ...circle,
  logoUrl: LOGOS[i % LOGOS.length]
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
          setTimeout(() => setShowNetwork(true), 1200);
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
          "relative z-10 text-center max-w-3xl flex flex-col items-center transition-all duration-1000 ease-out pointer-events-none",
          hasScrolled ? "-translate-y-48 opacity-0 scale-95" : "translate-y-0 opacity-100 scale-100"
        )}>
          <h1 className="text-4xl md:text-5xl font-bold text-black tracking-tight leading-[1.1] mb-6">
            Connect to the universal <br className="hidden md:block" /> lending network.
          </h1>
          <p className="text-[14px] md:text-[15px] text-black/60 max-w-md mb-8 leading-relaxed font-normal">
            Access global liquidity at the best possible terms powered by open infrastructure that serves, not extracts.
          </p>
          
          <div className="flex gap-4 pointer-events-auto">
            <button className="bg-black text-white px-7 py-2.5 rounded-full font-semibold hover:bg-black/80 transition-all text-[12px] shadow-sm">
              Launch App
            </button>
            <button className="bg-white/90 backdrop-blur-md text-black border border-black/[0.05] px-7 py-2.5 rounded-full font-semibold hover:bg-white transition-all text-[12px] shadow-sm">
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
            <defs>
              {CIRCLES.map((circle, index) => (
                <clipPath key={`clip-${index}`} id={`clip-${index}`}>
                  <circle cx={circle.x} cy={circle.y} r="20" />
                </clipPath>
              ))}
            </defs>
            <g>
              {CIRCLES.map((circle, index) => (
                <g 
                  key={index}
                  className={cn(
                    "transition-all duration-700 ease-out hover:scale-110 cursor-pointer pointer-events-auto origin-center transform-gpu",
                    showNetwork ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  )}
                  style={{ 
                    transitionDelay: showNetwork ? `${circle.delay}ms` : '0ms',
                    transformOrigin: `${circle.x}px ${circle.y}px`
                  }}
                >
                  {/* Outer circle container */}
                  <circle 
                    cx={circle.x} 
                    cy={circle.y} 
                    r="22" 
                    fill="white"
                    className="shadow-sm"
                  />
                  {/* Logo Image */}
                  <image 
                    href={circle.logoUrl}
                    x={circle.x - 16}
                    y={circle.y - 16}
                    height="32"
                    width="32"
                    className="rounded-full"
                    preserveAspectRatio="xMidYMid slice"
                  />
                  {/* Decorative faint ring */}
                  <circle 
                    cx={circle.x} 
                    cy={circle.y} 
                    r="22" 
                    fill="none"
                    stroke="black"
                    strokeOpacity="0.05"
                    strokeWidth="1"
                  />
                </g>
              ))}
            </g>
          </svg>
        </div>

        {/* Subtle Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10"></div>
      </section>
    </div>
  );
}
