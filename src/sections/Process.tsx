import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Layers, CheckCircle2, ShieldCheck } from 'lucide-react';

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "Deep-dive workshops to understand your vision, audience, and goals.",
    tag: "RESEARCH & STRATEGY",
    image: "/process/01-discovery.webp",
    metrics: "STAGE 01 / 05 • DISCOVERY",
    details: ["Audience & Market Research", "Goals & Competitive Positioning", "Creative Strategy & Vision Setup"]
  },
  {
    num: "02",
    title: "Planning",
    desc: "Strategic roadmaps, technical architecture, and creative direction.",
    tag: "ARCHITECTURE & ROADMAP",
    image: "/process/02-planning.webp",
    metrics: "STAGE 02 / 05 • PLANNING",
    details: ["System Architecture Mapping", "Project Milestones & Timeline", "Creative Direction Blueprint"]
  },
  {
    num: "03",
    title: "Design",
    desc: "Immersive visual systems and pixel-perfect interface prototypes.",
    tag: "INTERFACE & DESIGN SYSTEM",
    image: "/process/03-design.webp",
    metrics: "STAGE 03 / 05 • DESIGN",
    details: ["Design System & Tokens", "High-Fidelity Wireframes", "Interactive Motion Prototypes"]
  },
  {
    num: "04",
    title: "Development",
    desc: "Robust engineering with smooth animations and flawless performance.",
    tag: "ENGINEERING & CODE",
    image: "/process/04-development.webp",
    metrics: "STAGE 04 / 05 • DEVELOPMENT",
    details: ["Clean React/Vite Engineering", "Framer Motion & 60FPS FX", "Performance & SEO Optimization"]
  },
  {
    num: "05",
    title: "Launch",
    desc: "Meticulous QA, deployment, and launch-day support.",
    tag: "DEPLOYMENT & QA",
    image: "/process/05-launch.webp",
    metrics: "STAGE 05 / 05 • LAUNCH",
    details: ["Cross-Device QA Audit", "Production Cloud Deployment", "Post-Launch Monitoring & Support"]
  }
];

export default function Process() {
  const [activeIdx, setActiveIdx] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight * 0.45;
      let closestIdx = 0;
      let minDistance = Infinity;

      stepRefs.current.forEach((ref, idx) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });

      setActiveIdx(closestIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const progressPercent = ((activeIdx + 1) / steps.length) * 100;
  const activeStep = steps[activeIdx];

  return (
    <section id="process" className="bg-[#030305] py-24 border-y border-white/10 relative overflow-hidden">
      {/* Ambient background glow & fine grid pattern */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#2563EB]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7C3AED]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-2 text-[#22D3EE] tracking-[4px] text-xs font-semibold uppercase mb-3">
            <Sparkles className="w-4 h-4" />
            HOW WE WORK
          </div>
          <div className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-2px] md:tracking-[-3.4px] text-white">
            Our Process
          </div>
          <p className="text-white/60 mt-4 max-w-xl text-base md:text-lg">
            An interactive journey engineered to transform ambitious ideas into high-impact digital realities.
          </p>
        </div>

        {/* Main 2-Column Desktop Grid / Stacked Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Timeline & Text Steps (lg:col-span-6) */}
          <div className="lg:col-span-6 relative pl-6 md:pl-12">
            
            {/* Timeline Progress Bar Track */}
            <div className="absolute left-3 md:left-5 top-4 bottom-8 w-[2px] bg-white/10 rounded-full" />
            
            {/* Glowing Active Progress Fill */}
            <motion.div
              className="absolute left-3 md:left-5 top-4 w-[2px] bg-gradient-to-b from-[#2563EB] via-[#7C3AED] to-[#22D3EE] rounded-full shadow-[0_0_12px_#22D3EE]"
              initial={false}
              animate={{ height: `${progressPercent}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />

            {/* Steps List */}
            <div className="space-y-12 md:space-y-16">
              {steps.map((step, idx) => {
                const isActive = idx === activeIdx;

                return (
                  <div
                    key={step.num}
                    ref={(el) => (stepRefs.current[idx] = el)}
                    onClick={() => setActiveIdx(idx)}
                    className="relative cursor-pointer group"
                    role="button"
                    tabIndex={0}
                    aria-selected={isActive}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveIdx(idx); }}
                  >
                    <div className="flex items-start gap-6 md:gap-8">
                      {/* Step Number Badge */}
                      <div className="relative shrink-0 -left-[27px] md:-left-[35px]">
                        <motion.div
                          animate={{
                            scale: isActive ? 1.1 : 1,
                            borderColor: isActive ? "rgba(34, 211, 238, 0.8)" : "rgba(255, 255, 255, 0.15)",
                            backgroundColor: isActive ? "rgba(5, 5, 8, 0.95)" : "rgba(3, 3, 5, 0.8)"
                          }}
                          className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl border flex items-center justify-center font-mono text-base md:text-lg font-semibold transition-all duration-300 backdrop-blur-md ${
                            isActive
                              ? "text-[#22D3EE] shadow-[0_0_24px_rgba(34,211,238,0.35)]"
                              : "text-white/40 group-hover:text-white/80 group-hover:border-white/40"
                          }`}
                        >
                          {step.num}
                        </motion.div>
                      </div>

                      {/* Step Content */}
                      <div className="-ml-3 md:-ml-4 flex-1 pt-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[11px] font-mono tracking-widest text-[#22D3EE] uppercase opacity-80">
                            [{step.tag}]
                          </span>
                          {isActive && (
                            <motion.span
                              layoutId="activeDot"
                              className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] shadow-[0_0_8px_#22D3EE]"
                            />
                          )}
                        </div>

                        <h3 className={`text-2xl md:text-4xl font-semibold tracking-[-1.5px] transition-colors duration-300 ${
                          isActive ? "text-white" : "text-white/50 group-hover:text-white/80"
                        }`}>
                          {step.title}
                        </h3>

                        <p className={`mt-3 text-sm md:text-base leading-relaxed max-w-lg transition-colors duration-300 ${
                          isActive ? "text-white/80" : "text-white/40 group-hover:text-white/60"
                        }`}>
                          {step.desc}
                        </p>

                        {/* Additional detail points for active step */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.ul
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-4 space-y-2 overflow-hidden"
                            >
                              {step.details.map((detail, dIdx) => (
                                <li key={dIdx} className="flex items-center gap-2 text-xs md:text-sm text-[#22D3EE]/90">
                                  <CheckCircle2 className="w-4 h-4 shrink-0 text-[#22D3EE]" />
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>

                        {/* Mobile view inline image fallback */}
                        <div className="block lg:hidden mt-6 rounded-2xl overflow-hidden border border-white/10 bg-[#050508]/80">
                          <img
                            src={step.image}
                            alt={`${step.title} visual`}
                            className="w-full h-48 md:h-64 object-cover"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Active Process Visual Card (Desktop lg:col-span-6) */}
          <div className="hidden lg:block lg:col-span-6 lg:sticky lg:top-28">
            <div className="relative rounded-3xl bg-[#050508]/80 border border-white/15 p-4 md:p-6 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden group">
              
              {/* Corner Sci-Fi Micro Decorators */}
              <div className="absolute top-4 left-4 text-[10px] font-mono text-white/30 tracking-wider">
                {activeStep.metrics}
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
                <span className="text-[10px] font-mono text-[#22D3EE] tracking-widest uppercase">
                  ACTIVE STAGE
                </span>
              </div>

              {/* Main Visual Image Card with Crossfade */}
              <div className="relative mt-8 aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeStep.num}
                    src={activeStep.image}
                    alt={`${activeStep.title} process visual`}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-80" />

                {/* Overlay Micro Details */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div>
                    <div className="text-xs font-mono text-[#22D3EE] font-semibold tracking-wider">
                      STAGE {activeStep.num} — {activeStep.title.toUpperCase()}
                    </div>
                    <div className="text-sm font-medium text-white/90 mt-1">
                      {activeStep.tag}
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#22D3EE] text-black flex items-center justify-center shadow-[0_0_15px_#22D3EE]">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Futuristic Floating Badges & Metadata */}
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50 font-mono">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#22D3EE]" />
                  <span>PHASE: {activeStep.num} OF 05</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#A855F7]" />
                  <span>REACH O WORKFLOW</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

