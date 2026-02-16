
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
  "https://assets.coingecko.com/coins/images/7310/large/cro_token_logo.png",
  "https://cryptologos.cc/logos/lido-dao-ldo-logo.png",
  "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/coinbase-logo-icon.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-IVIyim1hmDBpx97RslB9FvyUNKHk_liy2A&s",
  "https://play-lh.googleusercontent.com/94WeEFfCBINrvpKxGB4YkR6-yau-aCx4PZVivlDDFbdPOajiwJ-E7ew3gC9WfsYiHmfvwFRfQATzPOBKzJGQIA=w240-h480-rw",
  "https://play-lh.googleusercontent.com/jrC7NQ6QGyEXLhzT5IkDNoCpB9Unj8Men9NibldAW1mKHPH6vaouBLOk6mNkFjAt7vlG",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2ai9aTxuvIhVwDAFnPv0fETRIN2llX-9QgQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH6IP0y4AqjwJt64nQi8oIE34XkyEBGmI8Xg&s",
  "https://cdn.morpho.org/v2/assets/images/steakhouse.svg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDvbfIPn8QRKmiczb0RgL2FAOeMt29sbLV-w&s"
];

// Moving points even higher up (lower Y values) to ensure no overlap with central text
const RAW_POINTS = [
  // Row 0
  { x: 380, y: 10, row: 0 }, { x: 460, y: 10, row: 0 }, { x: 540, y: 10, row: 0 }, { x: 620, y: 10, row: 0 },
  // Row 1
  { x: 340, y: 65, row: 1 }, { x: 420, y: 65, row: 1 }, { x: 500, y: 65, row: 1 }, { x: 580, y: 65, row: 1 }, { x: 660, y: 65, row: 1 },
  // Row 2
  { x: 340, y: 120, row: 2 }, { x: 420, y: 120, row: 2 }, { x: 500, y: 120, row: 2 }, { x: 580, y: 120, row: 2 }, { x: 660, y: 120, row: 2 },
  // Row 3
  { x: 380, y: 175, row: 3 }, { x: 460, y: 175, row: 3 }, { x: 540, y: 175, row: 3 }, { x: 620, y: 175, row: 3 }
];

const CIRCLES = RAW_POINTS.map((point, i) => {
  // Random horizontal variance for asymmetrical scatter
  const xDir = (i % 2 === 0 ? 1 : -1) * (0.2 + (i % 5) * 0.1);
  return {
    ...point,
    logoUrl: LOGOS[i % LOGOS.length],
    revealDelay: point.row * 60,
    scatterSpeedY: 1.5 + (i % 4) * 0.5,
    scatterSpeedX: xDir,
  };
});

export function VideoHero() {
  const [scrollY, setScrollY] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showNetwork, setShowNetwork] = useState(false);
  
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollY(currentScroll);

      const revealThreshold = 50; 
      if (currentScroll > revealThreshold) {
        if (!hasScrolled) {
          setHasScrolled(true);
          if (video2Ref.current) {
            video2Ref.current.currentTime = 0;
            video2Ref.current.play().catch(() => {});
          }
          setTimeout(() => setShowNetwork(true), 400);
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

  // Scatter starts once the "Powered by Morpho" is revealed
  const scatterStart = 350;
  const scatterProgress = Math.max(0, scrollY - scatterStart);
  const scatterOpacity = Math.max(0, 1 - scatterProgress / 500);

  return (
    <div className="relative h-[250vh] bg-[#F9F9F9]">
      <section className="sticky top-0 w-full h-screen flex flex-col items-center justify-start pt-32 px-6 overflow-hidden">
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

        {/* Hero Content - Prominent Sizes */}
        <div className={cn(
          "relative z-10 text-center max-w-3xl flex flex-col items-center transition-all duration-700 ease-out pointer-events-none",
          hasScrolled ? "-translate-y-48 opacity-0 scale-95" : "translate-y-0 opacity-100 scale-100"
        )}>
          <h1 className="text-3xl md:text-6xl font-bold text-black tracking-tight leading-[1.02] mb-6">
            Connect to the universal <br className="hidden md:block" /> lending network.
          </h1>
          <p className="text-sm md:text-base text-black/50 max-w-md mb-10 leading-relaxed font-medium">
            Access global liquidity at the best possible terms powered by open infrastructure.
          </p>
          
          <div className="flex gap-4 pointer-events-auto">
            <button className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-black/90 transition-all text-xs uppercase tracking-widest shadow-lg">
              Launch App
            </button>
            <button className="bg-white/90 backdrop-blur-sm text-black border border-black/[0.05] px-8 py-3 rounded-full font-bold hover:bg-white transition-all text-xs uppercase tracking-widest shadow-sm">
              Talk to us
            </button>
          </div>
        </div>

        {/* Powered by Morpho Section */}
        <div className={cn(
          "absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none transition-all duration-1000 ease-out px-6 text-center",
          hasScrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <h2 className="text-3xl md:text-5xl font-bold text-black tracking-tight leading-[1.1] mb-4">
            Powered by Morpho
          </h2>
          <p className="text-xs md:text-sm text-black/40 max-w-md leading-relaxed font-medium">
            Enterprises that connect with Morpho to power any lending or borrowing use case at scale
          </p>
        </div>

        {/* Network Circles - Positioned significantly higher and scattering out */}
        <div className={cn(
          "absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-all duration-1000 ease-out",
          showNetwork ? "opacity-100" : "opacity-0 translate-y-8"
        )}>
          <svg 
            className="w-full h-[70vh] max-w-5xl overflow-visible" 
            viewBox="0 0 1000 650" 
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {CIRCLES.map((_, i) => (
                <clipPath key={`clip-${i}`} id={`clip-${i}`}>
                  <circle cx={CIRCLES[i].x} cy={CIRCLES[i].y} r="16" />
                </clipPath>
              ))}
            </defs>
            <g 
              style={{ 
                opacity: scatterOpacity,
                transition: 'opacity 0.1s linear'
              }}
            >
              {CIRCLES.map((circle, index) => {
                const offY = scatterProgress * circle.scatterSpeedY;
                const offX = scatterProgress * circle.scatterSpeedX;
                
                return (
                  <g 
                    key={index}
                    className={cn(
                      "transition-all duration-700 transform-gpu",
                      showNetwork 
                        ? "opacity-100 scale-100" 
                        : "opacity-0 scale-90 translate-y-2"
                    )}
                    style={{ 
                      transitionDelay: showNetwork ? `${circle.revealDelay}ms` : '0ms',
                      transform: `translate(${offX}px, -${offY}px)`,
                      transformOrigin: `${circle.x}px ${circle.y}px`,
                    }}
                  >
                    <circle 
                      cx={circle.x} 
                      cy={circle.y} 
                      r="16" 
                      fill="white"
                      className="drop-shadow-sm"
                    />
                    <image 
                      href={circle.logoUrl}
                      x={circle.x - 12}
                      y={circle.y - 12}
                      height="24"
                      width="24"
                      clipPath={`url(#clip-${index})`}
                      className="rounded-full"
                    />
                    <circle 
                      cx={circle.x} 
                      cy={circle.y} 
                      r="16" 
                      fill="none"
                      stroke="black"
                      strokeOpacity="0.04"
                      strokeWidth="1"
                    />
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F9F9F9] to-transparent pointer-events-none z-10"></div>
      </section>
    </div>
  );
}
