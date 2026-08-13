import { useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

const stats = [
  { label: "YEARS EXPERIENCE", value: 7, suffix: "" },
  { label: "PROJECTS DELIVERED", value: 184, suffix: "" },
  { label: "HAPPY CLIENTS", value: 97, suffix: "" },
  { label: "SUCCESS RATE", value: 99, suffix: "%" },
];

function AnimatedCounter({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1600;
    const steps = 48;
    const increment = end / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [end]);

  return <span>{count}{suffix}</span>;
}

const reasons = [
  { num: "01", title: "Strategic Depth", desc: "We don't just design — we architect success through deep research and insight." },
  { num: "02", title: "Technical Excellence", desc: "World-class engineering paired with breathtaking creative execution." },
  { num: "03", title: "End-to-End Partnership", desc: "From initial vision to launch and beyond — we're with you at every step." },
];

export default function WhyChooseUs() {
  const [hasAnimated, setHasAnimated] = useState(false);

  return (
    <section id="why-us" className="bg-[#030305] py-20 border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-[#22D3EE] tracking-[4px] text-xs mb-3">THE DIFFERENCE</div>
          <div className="text-7xl font-semibold tracking-[-3.4px]">Why Reach O</div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 mb-20">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-[#050508] py-9 text-center">
              <div className="text-[56px] font-semibold tabular-nums tracking-tighter">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs tracking-[2.5px] text-white/50 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Reasons */}
        <div className="grid md:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <div key={i} className="glass p-9 rounded-3xl group">
              <div className="font-mono text-7xl tracking-[-3px] mb-6 text-white/10 group-hover:text-[#22D3EE]/70 transition-colors">{r.num}</div>
              <div className="text-3xl tracking-[-1.1px] font-semibold mb-4">{r.title}</div>
              <p className="text-white/70 text-[15px] leading-snug">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
