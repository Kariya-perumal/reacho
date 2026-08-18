import { useEffect, useState } from 'react';

const testimonials = [
  { quote: "Reach O completely transformed our digital presence. The level of craft and strategic thinking is unmatched.", name: "Elena Voss", role: "CEO, Aether Labs" },
  { quote: "Working with them felt like having an elite internal team. The results speak for themselves.", name: "Marcus Chen", role: "Founder, Vesper Finance" },
  { quote: "Their ability to translate complex ideas into beautiful, intuitive experiences is truly world-class.", name: "Priya Sharma", role: "Creative Director, Lumina" },
  { quote: "They elevated our brand beyond anything we imagined. The entire experience was seamless.", name: "David Laurent", role: "Head of Product, Nexus" },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-6 py-24">
      <div className="text-center mb-12">
        <div className="text-[#22D3EE] tracking-[4px] text-xs mb-3">TRUSTED BY VISIONARIES</div>
        <div className="text-4xl sm:text-6xl font-semibold tracking-[-1.5px] sm:tracking-[-2.6px]">What Our Clients Say</div>
      </div>

      <div className="relative min-h-[260px] sm:h-[230px] md:h-[210px] overflow-hidden">
        {testimonials.map((t, i) => (
          <div 
            key={i} 
            className={`glass p-6 sm:p-10 md:p-14 rounded-3xl absolute inset-0 transition-all duration-700 flex flex-col justify-center ${i === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}
          >
            <div className="text-base sm:text-[22px] md:text-3xl tracking-[-0.5px] leading-snug sm:leading-tight font-light max-w-[46ch] mb-6 sm:mb-10">"{t.quote}"</div>
            <div>
              <div className="font-medium text-sm sm:text-base">{t.name}</div>
              <div className="text-xs sm:text-sm text-white/60">{t.role}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-9">
        {testimonials.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} className={`h-px transition-all ${i === index ? 'bg-white w-8' : 'bg-white/30 w-4'}`} />
        ))}
      </div>
    </section>
  );
}
