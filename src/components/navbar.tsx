import React from 'react';
import { Play } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-8 md:px-12 pointer-events-none">
      <div className="flex items-center gap-2 pointer-events-auto cursor-pointer">
        <div className="bg-accent p-2 rounded-lg">
          <Play className="w-5 h-5 text-accent-foreground fill-current" />
        </div>
        <span className="text-xl font-bold tracking-tighter text-white uppercase font-headline">
          ScrollPlay
        </span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 pointer-events-auto">
        <a href="#" className="text-sm font-medium text-white/70 hover:text-accent transition-colors">Showcase</a>
        <a href="#" className="text-sm font-medium text-white/70 hover:text-accent transition-colors">Technology</a>
        <a href="#" className="text-sm font-medium text-white/70 hover:text-accent transition-colors">About</a>
        <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-5 py-2 rounded-full text-sm font-semibold transition-all border border-white/10">
          Get Started
        </button>
      </div>
    </nav>
  );
}
