import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import Hero from './sections/Hero';
import Services from './sections/Services';
import WhyChooseUs from './sections/WhyChooseUs';
import Portfolio from './sections/Portfolio';
import Process from './sections/Process';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ParticleBackground from './components/ParticleBackground';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Initialize Lenis smooth scroll safely with cleanup
  useEffect(() => {
    if (!isLoading) {
      let animId: number;
      let lenisInstance: any;

      const initLenis = async () => {
        try {
          const Lenis = (await import('lenis')).default;
          lenisInstance = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
          });

          function raf(time: number) {
            lenisInstance?.raf(time);
            animId = requestAnimationFrame(raf);
          }
          animId = requestAnimationFrame(raf);
        } catch (e) {
          console.warn('Lenis smooth scroll fallback:', e);
        }
      };

      initLenis();

      return () => {
        if (animId) cancelAnimationFrame(animId);
        if (lenisInstance) lenisInstance.destroy();
      };
    }
  }, [isLoading]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-[#050508] text-white overflow-x-hidden">
      <CustomCursor />
      <ParticleBackground />
      
      <Navbar />
      
      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <Portfolio />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      
      <Footer />
      <Toaster position="top-center" richColors closeButton />
    </div>
  );
}

export default App;
