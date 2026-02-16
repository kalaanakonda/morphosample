'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import Lottie from 'lottie-react';

const VIDEO_1_URL = "https://raw.githubusercontent.com/kalaanakonda/Video-morpho/main/aa11_3.webm";
const VIDEO_2_URL = "https://raw.githubusercontent.com/kalaanakonda/Video-morpho/main/aa22_3.webm";
const LOTTIE_URL = "https://raw.githubusercontent.com/kalaanakonda/Video-morpho/main/Frame-2147223772-Soft.json";

export function VideoHero() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showSection, setShowSection] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [animationData, setAnimationData] = useState<any>(null);
  const [activeJolt, setActiveJolt] = useState<{ index: number; time: number } | null>(null);
  
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsMounted(true);
    fetch(LOTTIE_URL)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => setAnimationData(data))
      .catch(err => console.error("Error loading Lottie animation:", err));
  }, []);

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

  const handleCellHover = (index: number) => {
    setActiveJolt({ index, time: Date.now() });
  };

  const parallaxX = (mousePos.x - 0.5) * 60; // Increased intensity
  const parallaxY = (mousePos.y - 0.5) * 60; // Increased intensity
  const videoScale = 1.15 + (Math.abs(mousePos.x - 0.5) + Math.abs(mousePos.y - 0.5)) * 0.08;
  const videoRotationX = (mousePos.y - 0.5) * 5; // Increased tilt
  const videoRotationY = (mousePos.x - 0.5) * -5; // Increased tilt

  return (
    <div className="relative h-[200vh] bg-background">
      <section className="sticky top-0 w-full h-screen flex flex-col items-center justify-start pt-32 px-6 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 pointer-events-none transition-transform duration-500 ease-out grayscale"
          style={{ 
            transform: `translate(${parallaxX}px, ${parallaxY}px) scale(${videoScale}) rotateX(${videoRotationX}deg) rotateY(${videoRotationY}deg)`,
            perspective: '1500px'
          }}
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

        {/* Network Stats - Individual Reveal */}
        <div className={cn(
          "absolute bottom-12 left-12 z-30 flex flex-col gap-6 transition-all duration-1000 delay-100 ease-out pointer-events-none",
          isMounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10",
          hasScrolled && "opacity-0 -translate-x-10"
        )}>
          <div>
            <p className="text-[10px] font-bold text-primary/15 mb-1 tracking-tight">Deposits</p>
            <p className="text-xl font-medium text-primary/05 tracking-tighter">$9,112,320,603</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-primary/15 mb-1 tracking-tight">Loans</p>
            <p className="text-xl font-medium text-primary/05 tracking-tighter">$3,291,165,751</p>
          </div>
        </div>

        {/* Scroll Hint - Individual Reveal */}
        <div className={cn(
          "absolute bottom-12 right-12 z-30 flex items-center gap-4 transition-all duration-1000 delay-100 ease-out pointer-events-none",
          isMounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10",
          hasScrolled && "opacity-0 translate-x-10"
        )}>
          <span className="text-[10px] font-bold text-primary/15 tracking-tight">Scroll to explore</span>
          <div className="flex flex-col items-center">
            <div className="w-px h-8 bg-primary/05" />
            <ChevronDown className="w-3 h-3 text-primary/15 -mt-1" />
          </div>
        </div>

        <div className="relative z-10 text-center max-w-4xl flex flex-col items-center mt-12">
          {/* Viewport-Wide Grid Background */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 w-screen -top-32 grid pointer-events-none z-[-1] overflow-hidden transition-opacity duration-1000"
            style={{ 
              gridTemplateColumns: 'repeat(40, minmax(0, 1fr))',
              maskImage: 'radial-gradient(circle at center, black 0%, transparent 80%), linear-gradient(to bottom, transparent 0%, black 15%, black 65%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 80%), linear-gradient(to bottom, transparent 0%, black 15%, black 65%, transparent 100%)',
              opacity: isMounted ? 1 : 0
            }}
          >
            {Array.from({ length: 480 }).map((_, i) => {
              const col = i % 40;
              const row = Math.floor(i / 40);
              const joltCol = activeJolt ? activeJolt.index % 40 : -100;
              const joltRow = activeJolt ? Math.floor(activeJolt.index / 40) : -100;
              
              const distance = Math.sqrt(Math.pow(col - joltCol, 2) + Math.pow(row - joltRow, 2));
              const maxRadius = 15; // Increased radius for a more "alive" expansive feel
              const isJolting = activeJolt && distance < maxRadius;
              const isDirectlyUnder = distance === 0;

              return (
                <div 
                  key={`${i}-${activeJolt?.time}`}
                  onMouseEnter={() => handleCellHover(i)}
                  className={cn(
                    "border-[0.5px] border-primary/[0.008] aspect-square transition-all duration-75 pointer-events-auto",
                    "hover:bg-primary/[0.012] hover:shadow-[inset_0_0_8px_rgba(21,24,26,0.015)]",
                    isJolting && !isDirectlyUnder && "animate-jolt"
                  )}
                  style={isJolting && !isDirectlyUnder ? { 
                    animationDelay: `${distance * 38}ms`,
                    // Fades outwards more smoothly
                    opacity: Math.max(0.01, 0.35 * (1 - (distance / maxRadius))) 
                  } : {}}
                />
              );
            })}
          </div>

          <div className="flex flex-col items-center w-full">
            {/* Heading - Line by Line Reveal */}
            <h1 className="text-3xl md:text-5xl font-bold text-primary tracking-tighter leading-[1.1] mb-6 flex flex-col items-center">
              <div className="overflow-hidden">
                <span className={cn(
                  "block transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] delay-[300ms]",
                  isMounted ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
                  hasScrolled && "-translate-y-full opacity-0"
                )}>
                  Connect to the universal
                </span>
              </div>
              <div className="overflow-hidden">
                <span className={cn(
                  "block transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] delay-[450ms]",
                  isMounted ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
                  hasScrolled && "-translate-y-full opacity-0"
                )}>
                  lending network.
                </span>
              </div>
            </h1>
            
            {/* Description - Individual Reveal */}
            <p className={cn(
              "text-sm md:text-base text-primary/60 max-w-lg mb-10 leading-relaxed font-medium transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] delay-700",
              isMounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
              hasScrolled && "-translate-y-48 opacity-0"
            )}>
              Access global liquidity at the best possible terms powered by open infrastructure.
            </p>

            {/* CTA Section - Individual Reveal */}
            <div className={cn(
              "flex gap-3 pointer-events-auto transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] delay-900",
              isMounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
              hasScrolled && "-translate-y-32 opacity-0"
            )}>
              <button className="bg-[#2973FF] text-white px-8 py-3 rounded-none font-bold hover:opacity-90 transition-all text-xs shadow-md animate-shine">
                Launch app
              </button>
              <button className="bg-white/90 backdrop-blur-md text-primary border border-primary/[0.05] px-8 py-3 rounded-none font-bold hover:bg-white transition-all text-xs shadow-sm">
                Talk to us
              </button>
            </div>
          </div>
        </div>

        <div className={cn(
          "absolute inset-x-0 top-[12%] z-30 flex flex-col items-center pointer-events-none transition-all duration-1000 ease-out px-6",
          showSection ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <div className="flex flex-col items-center w-full max-w-3xl">
            <div className="w-full max-w-lg overflow-visible mb-0 min-h-[18vh] flex items-center justify-center">
              {showSection && animationData && (
                <Lottie 
                  animationData={animationData} 
                  loop={false} 
                  className="w-full h-full"
                />
              )}
            </div>

            <div className="flex flex-col items-center text-center mt-24">
              <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight leading-[1.1] mb-3">
                Powered by Morpho
              </h2>
              <p className="text-xs md:text-sm text-primary/50 max-w-[400px] leading-relaxed font-semibold">
                Enterprises that connect with Morpho to power lending or borrowing at scale
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10"></div>
      </section>
    </div>
  );
}