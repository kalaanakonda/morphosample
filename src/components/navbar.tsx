import React from 'react';
import { ChevronDown } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 bg-white/50 backdrop-blur-sm border-b border-black/5">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-xl font-bold tracking-tight text-black">
            Morpho
          </span>
        </div>
        
        <div className="hidden lg:flex items-center gap-6">
          <a href="#" className="flex items-center gap-1 text-sm font-medium text-black/60 hover:text-black transition-colors">
            Products <ChevronDown className="w-3 h-3" />
          </a>
          <a href="#" className="flex items-center gap-1 text-sm font-medium text-black/60 hover:text-black transition-colors">
            Solutions <ChevronDown className="w-3 h-3" />
          </a>
          <a href="#" className="flex items-center gap-1 text-sm font-medium text-black/60 hover:text-black transition-colors">
            Resources <ChevronDown className="w-3 h-3" />
          </a>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="hidden sm:block text-sm font-medium text-black/60 hover:text-black transition-colors px-4 py-2">
          Talk to us
        </button>
        <button className="bg-black hover:bg-black/80 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-sm">
          Launch App
        </button>
      </div>
    </nav>
  );
}
