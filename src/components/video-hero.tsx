
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
  "https://play-lh.googleusercontent.com/jrC7NQ6QGyEXLhzT5IkDNoCpB9Unj8Men9NibldAW1mKHPH6vaouBLOk6mNkFjAt7vlG"
];

// 2 rows of larger logos, positioned higher above the central text
const RAW_POINTS = [
  // Row 0
  { x: 280, y: 120, row: 0 }, { x: 360, y: 120, row: 0 }, { x: 440, y: 120, row: 0 }, { x: 520, y: 120, row: 0 }, { x: 600, y: 120, row: 0 }, { x: 680, y: 120, row: 0 }, { x: 760, y: 120, row: 0 },
  // Row 1
  { x: 320, y: 200, row: 1 }, { x: 400, y: 200, row: 1 }, { x: 480, y: 200, row: 1 }, { x: 560, y: 200, row: 1 }, { x: 640, y: 200, row: 1 }, { x: 720, y: 200, row: 1 }
];

const CIRCLES = RAW_POINTS.map((point, i) => {
  const xDir = point.x < 500 ? -1 : 1;
  const spreadFactor = Math.abs(500 - point.x) / 250;
  
  return {
    ...point,
    logoUrl: LOGOS[i % LOGOS.length],
    revealDelay: i * 40, // Reduced delay for a simpler, faster reveal
    exitDelay: (RAW_POINTS.length - i) * 30,
    scatterSpeedY: 0.6 + Math.random() * 0.3,
    scatterSpeedX: xDir * (0.4 + spreadFactor),
  };
});

export function VideoHero() {
  const [scrollY, setScrollY] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showNetwork, setShowNetwork] = useState(false);
  const [showText, setShowText] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollY(currentScroll);

      const revealThreshold = 80; 
      if (currentScroll > revealThreshold) {
        if (!hasScrolled) {
          setHasScrolled(true);
          if (video2Ref.current) {
            video2Ref.current.currentTime = 0;
            video2Ref.current.play().catch(() => {});
          }
          // Logos and text reveal together with a slight offset for a "simple" upward motion
          setTimeout(() => setShowNetwork(true), 200);
          setTimeout(() => setShowText(true), 400);
        }
      } else {
        if (hasScrolled) {
          setHasScrolled(false);
          setShowNetwork(false);
          setShowText(false);
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

  const scatterStart = 400;
  const isScattering = scrollY > scatterStart;
  const scatterProgress = Math.max(0, scrollY - scatterStart);
  
  // Parallax calculation
  const parallaxX = (mousePos.x - 0.5) * 15;
  const parallaxY = (mousePos.y - 0.5) * 15;

  return (
    <div className="relative h-[250vh] bg-[#F9F9F9]">
      <section className="sticky top-0 w-full h-screen flex flex-col items-center justify-start pt-32 px-6 overflow-hidden">
        {/* Parallax Video Container */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none transition-transform duration-300 ease-out"
          style={{ transform: `translate(${parallaxX}px, ${parallaxY}px) scale(1.05)` }}
        >
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
          "relative z-10 text-center max-w-4xl flex flex-col items-center transition-all duration-1000 ease-in-out pointer-events-none",
          hasScrolled ? "-translate-y-64 opacity-0 scale-90" : "translate-y-0 opacity-100 scale-100"
        )}>
          <h1 className="text-3xl md:text-6xl font-bold text-black tracking-tighter leading-[1.01] mb-8">
            Connect to the universal <br className="hidden md:block" /> lending network.
          </h1>
          <p className="text-base md:text-lg text-black/60 max-w-lg mb-12 leading-relaxed font-medium">
            Access global liquidity at the best possible terms powered by open infrastructure.
          </p>
          
          <div className="flex gap-5 pointer-events-auto">
            <button className="bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-black/90 transition-all text-xs uppercase tracking-widest shadow-xl">
              Launch App
            </button>
            <button className="bg-white/90 backdrop-blur-md text-black border border-black/[0.05] px-10 py-4 rounded-full font-bold hover:bg-white transition-all text-xs uppercase tracking-widest shadow-md">
              Talk to us
            </button>
          </div>
        </div>

        {/* Powered by Morpho Section */}
        <div className={cn(
          "absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none transition-all duration-1000 cubic-bezier(0.23, 1, 0.32, 1) px-6 text-center",
          showText ? "opacity-100 translate-y-12" : "opacity-0 translate-y-32"
        )}>
          <h2 className="text-3xl md:text-5xl font-bold text-black tracking-tight leading-[1.1] mb-5">
            Powered by Morpho
          </h2>
          <p className="text-sm md:text-base text-black/40 max-w-lg leading-relaxed font-medium">
            Enterprises that connect with Morpho to power any lending or borrowing use case at scale
          </p>
        </div>

        {/* Network Circles */}
        <div className={cn(
          "absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-all duration-1000",
          showNetwork ? "opacity-100" : "opacity-0 translate-y-12"
        )}>
          <svg 
            className="w-full h-[80vh] max-w-6xl overflow-visible" 
            viewBox="0 0 1000 650" 
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {CIRCLES.map((_, i) => (
                <clipPath key={`clip-${i}`} id={`clip-${i}`}>
                  <circle cx={CIRCLES[i].x} cy={CIRCLES[i].y} r="20" />
                </clipPath>
              ))}
            </defs>
            <g>
              {CIRCLES.map((circle, index) => {
                const offY = isScattering ? scatterProgress * circle.scatterSpeedY : 0;
                const offX = isScattering ? scatterProgress * circle.scatterSpeedX : 0;
                const opacity = isScattering ? Math.max(0, 1 - scatterProgress / 400) : 1;
                
                return (
                  <g 
                    key={index}
                    className="transition-all duration-[1200ms] cubic-bezier(0.23, 1, 0.32, 1) transform-gpu"
                    style={{ 
                      opacity: showNetwork ? opacity : 0,
                      transitionDelay: isScattering 
                        ? `${circle.exitDelay}ms` 
                        : (showNetwork ? `${circle.revealDelay}ms` : '0ms'),
                      transform: `translate(${offX}px, -${offY}px)`,
                    }}
                  >
                    <circle 
                      cx={circle.x} 
                      cy={circle.y} 
                      r="20" 
                      fill="white"
                      className="drop-shadow-md"
                    />
                    <image 
                      href={circle.logoUrl}
                      x={circle.x - 14}
                      y={circle.y - 14}
                      height="28"
                      width="28"
                      clipPath={`url(#clip-${index})`}
                      className="rounded-full"
                    />
                    <circle 
                      cx={circle.x} 
                      cy={circle.y} 
                      r="20" 
                      fill="none"
                      stroke="black"
                      strokeOpacity="0.05"
                      strokeWidth="1"
                    />
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#F9F9F9] via-[#F9F9F9]/80 to-transparent pointer-events-none z-10"></div>
      </section>
    </div>
  );
}
