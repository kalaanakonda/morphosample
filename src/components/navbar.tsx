
'use client';

import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 md:px-10 bg-white/40 backdrop-blur-md border-b border-black/[0.03] transition-all duration-700 ease-out",
      isScrolled ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
    )}>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-sm font-bold tracking-tighter text-black uppercase">
            Morpho
          </span>
        </div>
        
        <div className="hidden lg:flex items-center gap-5">
          <a href="#" className="flex items-center gap-1 text-[11px] font-medium text-black/50 hover:text-black transition-colors">
            Products <ChevronDown className="w-3 h-3 opacity-50" />
          </a>
          <a href="#" className="flex items-center gap-1 text-[11px] font-medium text-black/50 hover:text-black transition-colors">
            Solutions <ChevronDown className="w-3 h-3 opacity-50" />
          </a>
          <a href="#" className="flex items-center gap-1 text-[11px] font-medium text-black/50 hover:text-black transition-colors">
            Resources <ChevronDown className="w-3 h-3 opacity-50" />
          </a>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <button className="hidden sm:block text-[11px] font-medium text-black/50 hover:text-black transition-colors px-3 py-1.5">
          Talk to us
        </button>
        <button className="bg-black hover:bg-black/80 text-white px-4 py-1.5 rounded-full text-[11px] font-semibold transition-all shadow-sm">
          Launch App
        </button>
      </div>
    </nav>
  );
}
