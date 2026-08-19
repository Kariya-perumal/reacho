import { useState, useEffect } from 'react';
import { ExternalLink, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Attendance Management System",
    client: "WEB APPLICATION",
    category: "Web Application / Attendance Management",
    desc: "A modern web-based attendance management system designed to simplify attendance tracking and management.",
    liveUrl: "https://attendance-system-cyan-five.vercel.app/",
    tags: ["Web App", "Attendance Tracking", "Management"],
    gradient: "from-blue-600/20 via-cyan-500/15 to-purple-600/20"
  },
  {
    id: 2,
    title: "Coffee Spot — POS & Billing System",
    client: "POS & BUSINESS MANAGEMENT",
    category: "POS / Billing / Business Management",
    desc: "A complete café POS and billing system featuring quick billing, menu/catalog management, customer ledger, expenses and labour tracking, financial summaries, sales analytics, bill management, UPI payment support, and backup/restore functionality.",
    liveUrl: "https://coffee-spot-pos-app.vercel.app/",
    tags: ["Café POS", "Billing System", "Sales Analytics", "UPI Payments"],
    gradient: "from-amber-600/20 via-orange-500/15 to-purple-600/20"
  }
];

export default function Portfolio() {
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openProject = (id: number) => setSelected(id);
  const closeProject = () => setSelected(null);

  const current = projects.find(p => p.id === selected);

  return (
    <section id="portfolio" className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex justify-between items-baseline mb-12">
        <div>
          <div className="text-[#22D3EE] tracking-[4px] text-xs mb-2 font-semibold">SELECTED WORK</div>
          <div className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-2px] md:tracking-[-3.4px]">Portfolio</div>
        </div>
        <div className="text-sm text-white/60 hidden md:block">FEATURED CLIENT PROJECTS</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div 
            key={project.id}
            onClick={() => openProject(project.id)}
            className="tilt-card group relative glass rounded-3xl p-7 sm:p-10 border border-white/10 hover:border-[#22D3EE]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden min-h-[380px]"
          >
            {/* Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-40 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none`} />

            {/* Content Top */}
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-4">
                <span className="uppercase text-xs tracking-[3px] text-[#22D3EE] font-semibold">
                  {project.category}
                </span>
                <span className="p-2 rounded-full bg-white/5 border border-white/10 text-white/70 group-hover:text-[#22D3EE] group-hover:border-[#22D3EE]/40 transition-all">
                  <ArrowUpRight size={18} />
                </span>
              </div>

              <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3 group-hover:text-[#22D3EE] transition-colors leading-tight">
                {project.title}
              </h3>

              <p className="text-white/70 text-sm sm:text-base font-normal leading-relaxed mb-6 line-clamp-3">
                {project.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-white/80 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <a 
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-6 py-3 rounded-full bg-white text-[#050508] font-semibold tracking-wider text-xs sm:text-sm inline-flex items-center gap-2 hover:bg-[#22D3EE] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] active:scale-[0.98] transition-all"
              >
                <span>LIVE DEMO</span>
                <ExternalLink size={15} />
              </a>

              <span className="text-xs tracking-wider text-white/50 group-hover:text-white/90 transition-colors hidden sm:inline">
                VIEW DETAILS →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected !== null && current && (
        <div className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4" onClick={closeProject}>
          <div className="modal max-w-3xl w-full glass-dark rounded-3xl p-6 sm:p-10 md:p-12 relative border border-white/15 shadow-2xl" onClick={e => e.stopPropagation()}>
            <button onClick={closeProject} className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white text-xs sm:text-sm transition-colors">
              ✕ CLOSE
            </button>
            
            <div className="uppercase tracking-[4px] text-xs font-semibold text-[#22D3EE] mb-3 sm:mb-4">{current.category}</div>
            <div className="text-2xl sm:text-4xl md:text-5xl leading-tight font-bold tracking-tight mb-3 text-white">{current.title}</div>
            <div className="text-sm sm:text-base font-medium text-white/50 mb-6 uppercase tracking-wider">{current.client}</div>
            
            <div className="text-base sm:text-lg text-white/80 leading-relaxed mb-8">{current.desc}</div>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {current.tags.map((tag, idx) => (
                <span key={idx} className="px-3.5 py-1.5 text-xs rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/30 text-[#22D3EE] font-medium flex items-center gap-1.5">
                  <CheckCircle2 size={13} />
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 border-t border-white/10">
              <a 
                href={current.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full bg-white text-[#050508] font-semibold tracking-wider text-xs sm:text-sm inline-flex items-center justify-center gap-2 hover:bg-[#22D3EE] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all w-full sm:w-auto"
              >
                <span>VIEW LIVE DEMO</span>
                <ExternalLink size={16} />
              </a>
              
              <button onClick={closeProject} className="px-8 py-3.5 rounded-full border border-white/30 hover:bg-white/10 text-white font-medium text-xs sm:text-sm w-full sm:w-auto transition-colors">
                CLOSE PREVIEW
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
