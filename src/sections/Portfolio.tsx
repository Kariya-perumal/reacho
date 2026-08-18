import { useState } from 'react';

const projects = [
  { id: 1, title: "Aether", client: "AETHER LABS", category: "Brand & Digital", desc: "Complete brand overhaul and immersive digital experience for a climate tech pioneer." },
  { id: 2, title: "Vesper", client: "VESPER FINANCE", category: "Web & Product", desc: "Next-generation fintech platform with elegant UI and powerful trading tools." },
  { id: 3, title: "Nexus", client: "NEXUS COLLECTIVE", category: "Identity & Web", desc: "Modern creative collective brand system and membership portal." },
  { id: 4, title: "Lumina", client: "LUMINA AI", category: "3D & Motion", desc: "Stunning 3D product showcase and interactive AI interface." },
];

export default function Portfolio() {
  const [selected, setSelected] = useState<number | null>(null);

  const openProject = (id: number) => setSelected(id);
  const closeProject = () => setSelected(null);

  const current = projects.find(p => p.id === selected);

  return (
    <section id="portfolio" className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex justify-between items-baseline mb-12">
        <div>
          <div className="text-[#22D3EE] tracking-[4px] text-xs mb-2">SELECTED WORK</div>
          <div className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-2px] md:tracking-[-3.4px]">Portfolio</div>
        </div>
        <div className="text-sm text-white/60 hidden md:block">VIEW ALL PROJECTS →</div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((project, idx) => (
          <div 
            key={idx}
            onClick={() => openProject(project.id)}
            className="tilt-card group relative aspect-[16/10] glass rounded-3xl overflow-hidden cursor-pointer border border-white/10 hover:border-[#22D3EE]/40 transition-all flex items-end"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black/90" />
            
            <div className="relative p-6 sm:p-9 z-10 w-full">
              <div className="uppercase text-xs tracking-[3px] text-[#22D3EE] mb-3">{project.category}</div>
              <div className="text-white text-3xl sm:text-5xl md:text-6xl tracking-[-1.5px] md:tracking-[-2.5px] font-semibold mb-1.5">{project.title}</div>
              <div className="text-white/60 text-sm sm:text-lg">{project.client}</div>
            </div>
            
            <div className="absolute top-5 right-5 sm:top-9 sm:right-9 px-4 sm:px-5 py-1 text-[10px] sm:text-xs tracking-widest rounded-full border border-white/20 group-hover:bg-white group-hover:text-black transition-all">VIEW CASE</div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected !== null && current && (
        <div className="fixed inset-0 z-[90] bg-black/95 flex items-center justify-center p-4" onClick={closeProject}>
          <div className="modal max-w-4xl w-full glass-dark rounded-3xl p-6 sm:p-10 md:p-14 relative" onClick={e => e.stopPropagation()}>
            <button onClick={closeProject} className="absolute top-6 right-6 text-white/60 hover:text-white text-xs sm:text-base">CLOSE</button>
            
            <div className="uppercase tracking-[4px] text-xs text-[#22D3EE] mb-3 sm:mb-4">{current.category}</div>
            <div className="text-3xl sm:text-5xl md:text-[76px] leading-tight tracking-[-1.5px] md:tracking-[-4.2px] font-semibold mb-3 sm:mb-4">{current.title}</div>
            <div className="text-lg sm:text-2xl text-white/60 mb-6 sm:mb-9">{current.client}</div>
            
            <div className="text-base sm:text-xl max-w-2xl text-white/80 leading-snug sm:leading-tight mb-8 sm:mb-12">{current.desc}</div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="px-9 py-3.5 rounded-full bg-white text-black font-medium tracking-wider text-sm w-full sm:w-auto">VISIT LIVE SITE</button>
              <button onClick={closeProject} className="px-9 py-3.5 rounded-full border border-white/30 hover:bg-white/5 text-sm w-full sm:w-auto">CLOSE PREVIEW</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
