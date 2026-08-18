import { useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const services = [
  { title: "Digital Marketing", icon: "M", desc: "Data-driven campaigns that convert" },
  { title: "Social Media Marketing", icon: "S", desc: "Engagement that builds communities" },
  { title: "Logo Design", icon: "L", desc: "Timeless marks with meaning" },
  { title: "Brand Identity", icon: "B", desc: "Complete visual ecosystems" },
  { title: "Web Design", icon: "W", desc: "Stunning digital interfaces" },
  { title: "UI/UX Design", icon: "U", desc: "Intuitive user experiences" },
  { title: "Video Editing", icon: "V", desc: "Cinematic storytelling" },
  { title: "Photo Editing", icon: "P", desc: "Visual perfection" },
  { title: "Full Stack Development", icon: "F", desc: "Scalable digital platforms" },
  { title: "SEO", icon: "O", desc: "Visibility that lasts" },
  { title: "AI Automation", icon: "A", desc: "Intelligent systems & workflows" },
  { title: "Content Strategy", icon: "C", desc: "Stories that resonate" },
];

function ServiceIcon({ letter }: { letter: string }) {
  const meshRef = useRef<THREE.Group>(null!);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 1.6;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });

  return (
    <group ref={meshRef}>
      <mesh>
        <octahedronGeometry args={[0.9]} />
        <meshBasicMaterial color="#22D3EE" wireframe />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.42]} />
        <meshBasicMaterial color="#7C3AED" />
      </mesh>
    </group>
  );
}

import { useRef } from 'react';

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" className="max-w-7xl mx-auto px-6 pt-20 pb-24">
      <div className="flex justify-between items-end mb-14">
        <div>
          <div className="text-[#22D3EE] tracking-[4px] text-xs mb-3">WHAT WE OFFER</div>
          <div className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-2px] md:tracking-[-3.4px]">Services</div>
        </div>
        <div className="text-right text-white/60 max-w-[250px] hidden md:block text-[15px]">Premium digital solutions for visionary brands.</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="tilt-card group relative glass p-8 rounded-3xl flex flex-col justify-between min-h-[272px] border border-white/10 hover:border-white/30 transition-all overflow-hidden"
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
              const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
              e.currentTarget.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            }}
          >
            <div className="relative z-10">
              <div className="w-14 h-14 mb-9 rounded-2xl bg-white/5 flex items-center justify-center">
                <div className="w-[62px] h-[62px]">
                  <Canvas camera={{ position: [0,0,4.4] }}>
                    <ServiceIcon letter={service.icon} />
                  </Canvas>
                </div>
              </div>
              <div className="font-semibold text-3xl tracking-[-1.4px] mb-3">{service.title}</div>
              <div className="text-white/60 pr-4 text-[15px]">{service.desc}</div>
            </div>
            
            <div className="mt-auto pt-6 flex justify-between items-center text-xs tracking-[3px] text-[#22D3EE] group-hover:text-white/90 transition-colors">
              LEARN MORE <span className="text-lg leading-none">→</span>
            </div>
            
            {hovered === index && (
              <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/10 to-transparent pointer-events-none" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
