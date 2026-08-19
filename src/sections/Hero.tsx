import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, ShieldCheck } from 'lucide-react';

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#050508]">
      {/* Ambient Glowing Aurora Background Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[500px] bg-gradient-to-tr from-[#2563EB]/25 via-[#7C3AED]/25 to-[#22D3EE]/25 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      
      {/* Cyber Grid Lines Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '36px 36px',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)'
        }}
      />

      <div className="relative z-20 max-w-5xl px-6 text-center">
        {/* Status Pill Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-md mb-8 text-xs font-medium tracking-wider text-white/90 shadow-[0_0_20px_rgba(34,211,238,0.15)]"
        >
          <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-ping" />
          <span className="text-[#22D3EE] font-semibold">EST 2018</span>
          <span className="text-white/30">•</span>
          <span>MADURAI, INDIA</span>
        </motion.div>

        {/* Hero Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="hero-headline text-5xl sm:text-7xl md:text-8xl lg:text-[104px] font-bold tracking-[-2.5px] sm:tracking-[-4px] md:tracking-[-6px] leading-[0.96] sm:leading-[0.92] mb-6 text-white"
        >
          REACH BEYOND<br />
          <span className="gradient-text">LIMITS</span>
        </motion.h1>

        {/* Subtitle Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-[640px] mx-auto text-base sm:text-xl md:text-2xl text-white/75 font-normal tracking-[-0.2px] leading-relaxed mb-10"
        >
          We build high-converting brands, modern web applications, digital experiences, and powerful marketing solutions that help businesses scale.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <button 
            onClick={() => scrollTo('services')}
            className="group px-8 sm:px-10 py-4 rounded-full bg-white text-[#050508] font-semibold tracking-wider text-xs sm:text-sm flex items-center justify-center gap-3 hover:bg-[#22D3EE] hover:shadow-[0_0_35px_rgba(34,211,238,0.4)] active:scale-[0.98] transition-all w-full sm:w-auto"
          >
            EXPLORE SERVICES
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => scrollTo('contact')}
            className="px-8 sm:px-10 py-4 rounded-full border border-white/30 hover:border-white/60 hover:bg-white/10 text-white font-semibold tracking-wider text-xs sm:text-sm flex items-center justify-center gap-3 backdrop-blur-md active:scale-[0.98] transition-all w-full sm:w-auto"
          >
            START YOUR PROJECT
          </button>
        </motion.div>

        {/* Feature Highlight Pills */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-white/60 font-medium"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5">
            <Zap size={14} className="text-[#22D3EE]" />
            <span>Fast Turnaround</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5">
            <Sparkles size={14} className="text-[#7C3AED]" />
            <span>Custom Web & Mobile</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5">
            <ShieldCheck size={14} className="text-[#2563EB]" />
            <span>100% Guaranteed Quality</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }} 
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[4px] text-white/40 z-20 pointer-events-none"
      >
        SCROLL TO BEGIN
      </motion.div>
    </section>
  );
}
