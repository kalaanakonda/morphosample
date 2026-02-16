
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
  "https://play-lh.googleusercontent.com/94WeEFfCBINrvpKxGB4YjR6-yau-aCx4PZVivlDDFbdPOajiwJ-E7ew3gC9WfsYiHmfvwFRfQATzPOBKzJGQIA=w240-h480-rw",
  "https://play-lh.googleusercontent.com/jrC7NQ6QGyEXLhzT5IkDNoCpB9Unj8Men9NibldAW1mKHPH6vaouBLOk6mNkFjAt7vlG"
];

const RAW_POINTS = [
  { x: 300, y: 120 }, { x: 380, y: 120 }, { x: 460, y: 120 }, { x: 540, y: 120 }, { x: 620, y: 120 }, { x: 700, y: 120 },
  { x: 340, y: 200 }, { x: 420, y: 200 }, { x: 500, y: 200 }, { x: 580, y: 200 }, { x: 660, y: 200 }
];

const CIRCLES = RAW_POINTS.map((point, i) => ({
  ...point,
  logoUrl: LOGOS[i % LOGOS.length],
}));

export function VideoHero() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showSection, setShowSection] = useState(false);
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
      const revealThreshold = 40; 

      if (currentScroll > revealThreshold) {
        if (!hasScrolled) {
          setHasScrolled(true);
          if (video2Ref.current) {
            video2Ref.current.currentTime = 0;
            video2Ref.current.play().catch(() => {});
          }
          setTimeout(() => setShowSection(true), 100);
        }
      } else {
        if (hasScrolled) {
          setHasScrolled(false);
          setShowSection(false);
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

  const parallaxX = (mousePos.x - 0.5) * 120;
  const parallaxY = (mousePos.y - 0.5) * 120;

  return (
    <div className="relative h-[200vh] bg-[#F9F9F9]">
      <section className="sticky top-0 w-full h-screen flex flex-col items-center justify-start pt-32 px-6 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 pointer-events-none transition-transform duration-700 ease-out"
          style={{ transform: `translate(${parallaxX}px, ${parallaxY}px) scale(1.2)` }}
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

        {/* Network Stats - Bottom Left */}
        <div className={cn(
          "absolute bottom-12 left-8 md:left-12 z-30 flex flex-col gap-6 transition-all duration-700 ease-out pointer-events-none",
          hasScrolled ? "opacity-0 -translate-x-10" : "opacity-100 translate-x-0"
        )}>
          <div>
            <p className="text-[10px] font-bold text-black/40 mb-1 uppercase tracking-widest">Deposits</p>
            <p className="text-xl md:text-2xl font-bold text-black tracking-tighter">$9,112,320,603</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-black/40 mb-1 uppercase tracking-widest">Loans</p>
            <p className="text-xl md:text-2xl font-bold text-black tracking-tighter">$3,291,165,751</p>
          </div>
        </div>

        {/* Scroll to Explore - Bottom Right */}
        <div className={cn(
          "absolute bottom-12 right-8 md:right-12 z-30 flex items-center gap-4 transition-all duration-700 ease-out pointer-events-none",
          hasScrolled ? "opacity-0 translate-x-10" : "opacity-100 translate-x-0"
        )}>
          <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest">Scroll to explore</span>
          <div className="w-px h-8 bg-black/10" />
        </div>

        <div className={cn(
          "relative z-10 text-center max-w-4xl flex flex-col items-center transition-all duration-1000 ease-in-out pointer-events-none mt-12",
          hasScrolled ? "-translate-y-64 opacity-0 scale-90" : "translate-y-0 opacity-100 scale-100"
        )}>
          <h1 className="text-3xl md:text-5xl font-bold text-black tracking-tighter leading-[1.1] mb-6">
            Connect to the universal <br className="hidden md:block" /> lending network.
          </h1>
          <p className="text-sm md:text-base text-black/60 max-w-lg mb-10 leading-relaxed font-medium">
            Access global liquidity at the best possible terms powered by open infrastructure.
          </p>
          
          <div className="flex gap-3 pointer-events-auto">
            <button className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-black/90 transition-all text-xs shadow-md">
              Launch app
            </button>
            <button className="bg-white/90 backdrop-blur-md text-black border border-black/[0.05] px-8 py-3 rounded-full font-bold hover:bg-white transition-all text-xs shadow-sm">
              Talk to us
            </button>
          </div>
        </div>

        <div className={cn(
          "absolute inset-x-0 top-[4%] z-30 flex flex-col items-center pointer-events-none transition-all duration-1000 ease-out px-6",
          showSection ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <div className="flex flex-col items-center w-full max-w-3xl">
            <div className="w-full h-[22vh] overflow-visible mb-0">
              <svg 
                className="w-full h-full overflow-visible" 
                viewBox="0 0 1000 300" 
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  {CIRCLES.map((_, i) => (
                    <clipPath key={`clip-${i}`} id={`clip-${i}`}>
                      <circle cx={CIRCLES[i].x} cy={CIRCLES[i].y} r="22" />
                    </clipPath>
                  ))}
                </defs>
                <g>
                  {CIRCLES.map((circle, index) => (
                    <g 
                      key={index}
                      className="transition-all duration-700 ease-out"
                    >
                      <circle 
                        cx={circle.x} 
                        cy={circle.y} 
                        r="22" 
                        fill="white"
                        className="drop-shadow-sm"
                      />
                      <image 
                        href={circle.logoUrl}
                        x={circle.x - 14}
                        y={circle.y - 14}
                        height="28"
                        width="28"
                        clipPath={`url(#clip-${index})`}
                      />
                      <circle 
                        cx={circle.x} 
                        cy={circle.y} 
                        r="22" 
                        fill="none"
                        stroke="black"
                        strokeOpacity="0.04"
                        strokeWidth="1"
                      />
                    </g>
                  ))}
                </g>
              </svg>
            </div>

            <div className="flex flex-col items-center text-center mt-[-35px]">
              <h2 className="text-xl md:text-2xl font-bold text-black tracking-tight leading-[1.1] mb-3">
                Powered by Morpho
              </h2>
              <p className="text-xs md:text-sm text-black/50 max-w-[400px] leading-relaxed font-semibold">
                Enterprises that connect with Morpho to power lending or borrowing at scale
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F9F9F9] to-transparent pointer-events-none z-10"></div>
      </section>
    </div>
  );
}
