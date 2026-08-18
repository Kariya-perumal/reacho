const steps = [
  { num: "01", title: "Discovery", desc: "Deep-dive workshops to understand your vision, audience, and goals." },
  { num: "02", title: "Planning", desc: "Strategic roadmaps, technical architecture, and creative direction." },
  { num: "03", title: "Design", desc: "Immersive visual systems and pixel-perfect interface prototypes." },
  { num: "04", title: "Development", desc: "Robust engineering with smooth animations and flawless performance." },
  { num: "05", title: "Launch", desc: "Meticulous QA, deployment, and launch-day support." },
  { num: "06", title: "Support", desc: "Ongoing optimization, iteration, and partnership." },
];

export default function Process() {
  return (
    <section id="process" className="bg-[#030305] py-20 border-y border-white/10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-[#22D3EE] tracking-[4px] text-xs mb-3">HOW WE WORK</div>
          <div className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-2px] md:tracking-[-3.2px]">Our Process</div>
        </div>

        <div className="relative pl-8 md:pl-14">
          {/* Glowing vertical line */}
          <div className="absolute left-9 md:left-[67px] top-4 bottom-4 w-px bg-gradient-to-b from-[#2563EB] via-[#7C3AED] to-[#22D3EE]" />

          {steps.map((step, idx) => (
            <div key={idx} className="flex gap-8 md:gap-12 mb-12 last:mb-0 group">
              <div className="relative z-10 shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-[#050508] border border-white/20 flex items-center justify-center font-mono text-xl text-[#22D3EE] tracking-[-1px] group-hover:border-[#22D3EE] transition-all">
                  {step.num}
                </div>
              </div>
              <div className="pt-2">
                <div className="font-semibold text-4xl tracking-[-1.5px] mb-3">{step.title}</div>
                <div className="text-white/60 max-w-md text-[15px] pr-4">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
