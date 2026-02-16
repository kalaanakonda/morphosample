import { VideoHero } from '@/components/video-hero';
import { Navbar } from '@/components/navbar';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background selection:bg-accent selection:text-accent-foreground">
      <Navbar />
      <VideoHero />
      
      {/* Scrollable content section for added depth if user manages to scroll past hero height, 
          though the app logic mainly focuses on the switch. */}
      <section className="relative z-10 py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 font-headline tracking-tight uppercase">
              Designed for <br /><span className="text-accent">Precision</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              ScrollPlay offers a unique interaction model where every gesture matters. 
              Our technology synchronizes motion with visual storytelling to create 
              immersive digital environments that respond to user presence.
            </p>
            <div className="flex gap-4">
              <button className="bg-primary hover:bg-primary/80 text-white px-8 py-3 rounded-full font-bold transition-all border border-white/5">
                Learn More
              </button>
              <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-full font-bold transition-all shadow-lg">
                View Gallery
              </button>
            </div>
          </div>
          
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-secondary group">
             <img 
               src="https://picsum.photos/seed/tech/800/450" 
               alt="Technology backdrop" 
               className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
               data-ai-hint="dark technology"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-accent/20 backdrop-blur-md flex items-center justify-center border border-accent/30 group-hover:scale-110 transition-transform cursor-pointer">
                   <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                      <div className="w-0 h-0 border-t-4 border-t-transparent border-l-8 border-l-accent-foreground border-b-4 border-b-transparent ml-1"></div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-white/5 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} ScrollPlay Interactive. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
