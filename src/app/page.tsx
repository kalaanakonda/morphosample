import { VideoHero } from '@/components/video-hero';
import { Navbar } from '@/components/navbar';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background selection:bg-accent selection:text-accent-foreground">
      <Navbar />
      <VideoHero />
    </main>
  );
}
