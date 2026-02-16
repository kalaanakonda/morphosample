'use client';

import React, { useEffect, useRef, useState, memo, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import Lottie from 'lottie-react';

const VIDEO_1_URL = "https://raw.githubusercontent.com/kalaanakonda/Video-morpho/main/aa11_3.webm";
const VIDEO_2_URL = "https://raw.githubusercontent.com/kalaanakonda/Video-morpho/main/aa22_3.webm";
const LOTTIE_URL = "https://raw.githubusercontent.com/kalaanakonda/Video-morpho/main/Frame-2147223772-Soft.json";

const GRID_COLS = 40;
const GRID_ROWS = 12;
const RIPPLE_DURATION = 600; // Snappy interaction loop

const GridCell = memo(({ x, y, activeJolt }: { x: number, y: number, activeJolt: { index: number, time: number } | null }) => {
  const [joltKey, setJoltKey] = useState(0);
  const [intensity, setIntensity] = useState(0);
  const maxRadius = 6; // Tightened radius

  useEffect(() => {
    if (!activeJolt) return;

    const joltCol = activeJolt.index % GRID_COLS;
    const joltRow = Math.floor(activeJolt.index / GRID_COLS);
    const distance = Math.sqrt(Math.pow(x - joltCol, 2) + Math.pow(y - joltRow, 2));

    if (distance < maxRadius) {
      const delay = distance * 25; // Faster propagation
      const timer = setTimeout(() => {
        setJoltKey(activeJolt.time);
        setIntensity(Math.max(0, 0.4 * (1 - (distance / maxRadius))));
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [activeJolt, x, y]);

  return (
    <div className="border-[0.5px] border-primary/[0.008] aspect-square pointer-events-auto relative overflow-hidden">
      <div 
        key={joltKey}
        className={cn(
          "absolute inset-0 pointer-events-none",
          joltKey > 0 && "animate-jolt"
        )}
        style={{ opacity: intensity }}
      />
    </div>
  );
});
GridCell.displayName = 'GridCell';

export function VideoHero() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showSection, setShowSection] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [animationData, setAnimationData] = useState<any>(null);
  const [activeJolt, setActiveJolt] = useState<{ index: number; time: number } | null>(null);
  const isRippleActive = useRef(false);
  
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    fetch(LOTTIE_URL)
      .then(res => res.json())
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

  const handleCellHover = useCallback((index: number) => {
    if (isRippleActive.current) return;

    isRippleActive.current = true;
    setActiveJolt({ index, time: Date.now() });

    // Lock interaction until the ripple duration completes
    setTimeout(() => {
      isRippleActive.current = false;
    }, RIPPLE_DURATION);
  }, []);

  const parallaxX = (mousePos.x - 0.5) * 40;
  const parallaxY = (mousePos.y - 0.5) * 40;
  const videoScale = 1.1 + (Math.abs(mousePos.x - 0.5) + Math.abs(mousePos.y - 0.5)) * 0.05;

  return (
    <div className="relative h-[200vh] bg-background">
      <section className="sticky top-0 w-full h-screen flex flex-col items-center justify-start pt-32 px-6 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 pointer-events-none transition-transform duration-500 ease-out grayscale"
          style={{ 
            transform: `translate(${parallaxX}px, ${parallaxY}px) scale(${videoScale})`,
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
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-700",
              hasScrolled ? "opacity-0" : "opacity-100"
            )}
          />
          
          <video
            ref={video2Ref}
            src={VIDEO_2_URL}
            muted
            playsInline
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-700",
              hasScrolled ? "opacity-100" : "opacity-0"
            )}
          />
        </div>

        {/* Network Stats */}
        <div className={cn(
          "absolute bottom-12 left-12 z-30 flex flex-col gap-6 transition-opacity duration-700 pointer-events-none",
          hasScrolled ? "opacity-0" : "opacity-100"
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

        {/* Scroll Hint */}
        <div className={cn(
          "absolute bottom-12 right-12 z-30 flex items-center gap-4 transition-opacity duration-700 pointer-events-none",
          hasScrolled ? "opacity-0" : "opacity-100"
        )}>
          <span className="text-[10px] font-bold text-primary/15 tracking-tight">Scroll to explore</span>
          <div className="flex flex-col items-center">
            <div className="w-px h-8 bg-primary/05" />
            <ChevronDown className="w-3 h-3 text-primary/15 -mt-1" />
          </div>
        </div>

        <div className="relative z-10 text-center max-w-4xl flex flex-col items-center mt-12">
          {/* Grid Background */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 w-screen -top-32 grid pointer-events-none z-[-1] overflow-hidden"
            style={{ 
              gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))`,
              maskImage: 'radial-gradient(circle at center, black 0%, transparent 80%), linear-gradient(to bottom, transparent 0%, black 15%, black 65%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 80%), linear-gradient(to bottom, transparent 0%, black 15%, black 65%, transparent 100%)',
            }}
          >
            {Array.from({ length: GRID_COLS * GRID_ROWS }).map((_, i) => (
              <GridCell 
                key={i}
                x={i % GRID_COLS}
                y={Math.floor(i / GRID_COLS)}
                activeJolt={activeJolt}
              />
            ))}
            {/* Hover Detection Layer */}
            <div 
              className="absolute inset-0 z-20 pointer-events-auto grid"
              style={{ gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))` }}
            >
              {Array.from({ length: GRID_COLS * GRID_ROWS }).map((_, i) => (
                <div 
                  key={`hover-${i}`} 
                  onMouseEnter={() => handleCellHover(i)}
                  className="w-full h-full"
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center w-full">
            <h1 className={cn(
              "text-3xl md:text-5xl font-bold text-primary tracking-tighter leading-[1.1] mb-6 transition-all duration-700",
              hasScrolled && "opacity-0 -translate-y-10"
            )}>
              Connect to the universal lending network.
            </h1>
            
            <p className={cn(
              "text-sm md:text-base text-primary/60 max-w-lg mb-10 leading-relaxed font-medium transition-all duration-700",
              hasScrolled && "opacity-0 -translate-y-10"
            )}>
              Access global liquidity at the best possible terms powered by open infrastructure.
            </p>

            <div className={cn(
              "flex gap-3 pointer-events-auto transition-all duration-700",
              hasScrolled && "opacity-0 -translate-y-10"
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