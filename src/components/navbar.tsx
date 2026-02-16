
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
      "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-10 bg-white/40 backdrop-blur-md border-b border-black/[0.03] transition-all duration-700 ease-out",
      isScrolled ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
    )}>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-base font-bold tracking-tighter text-black">
            Morpho
          </span>
        </div>
        
        <div className="hidden lg:flex items-center gap-6">
          <a href="#" className="flex items-center gap-1 text-xs font-medium text-black/50 hover:text-black transition-colors">
            Products <ChevronDown className="w-3 h-3 opacity-50" />
          </a>
          <a href="#" className="flex items-center gap-1 text-xs font-medium text-black/50 hover:text-black transition-colors">
            Solutions <ChevronDown className="w-3 h-3 opacity-50" />
          </a>
          <a href="#" className="flex items-center gap-1 text-xs font-medium text-black/50 hover:text-black transition-colors">
            Resources <ChevronDown className="w-3 h-3 opacity-50" />
          </a>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="hidden sm:block text-xs font-medium text-black/50 hover:text-black transition-colors px-3 py-1.5">
          Talk to us
        </button>
        <button className="bg-black hover:bg-black/80 text-white px-5 py-2 rounded-full text-xs font-semibold transition-all shadow-sm">
          Launch app
        </button>
      </div>
    </nav>
  );
}
