import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

function NeuralNetwork({ mousePos }: { mousePos: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null!);
  const nodesRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.11 + mousePos.x * 0.4;
      groupRef.current.rotation.x = mousePos.y * 0.3 + Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
    if (nodesRef.current) {
      nodesRef.current.children.forEach((node, i) => {
        node.position.y = Math.sin(state.clock.elapsedTime * 1.2 + i) * 0.2;
      });
    }
  });

  const nodes = Array.from({ length: 26 }, (_, i) => ({
    pos: [
      (Math.random() - 0.5) * 7.5,
      (Math.random() - 0.5) * 7.5,
      (Math.random() - 0.5) * 7.5
    ] as [number, number, number],
    size: Math.random() * 0.15 + 0.09
  }));

  return (
    <group ref={groupRef}>
      <group ref={nodesRef}>
        {nodes.map((node, i) => (
          <mesh key={i} position={node.pos}>
            <sphereGeometry args={[node.size]} />
            <meshBasicMaterial color={i % 3 === 0 ? "#22D3EE" : "#7C3AED"} />
          </mesh>
        ))}
      </group>
      
      {/* Connecting Lines */}
      {nodes.slice(0, 14).map((_, i) => {
        const a = nodes[i].pos;
        const b = nodes[(i + 7) % nodes.length].pos;
        const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2] as [number, number, number];
        const dist = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
        
        return (
          <mesh key={`line-${i}`} position={mid} lookAt={b}>
            <cylinderGeometry args={[0.012, 0.012, dist, 3]} />
            <meshBasicMaterial color="#2563EB" transparent opacity={0.45} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 1.6,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 1.6,
    });
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative h-[100dvh] flex items-center justify-center pt-20" onMouseMove={handleMouseMove}>
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 1.5, 15], fov: 48 }}>
          <ambientLight intensity={0.7} />
          <NeuralNetwork mousePos={mousePos} />
        </Canvas>
      </div>

      <div className="relative z-20 max-w-5xl px-6 text-center">
        <div className="inline-block px-4 py-1 rounded-full bg-white/5 text-xs tracking-[4px] mb-6 border border-white/10">EST 2018 • MADURAI, INDIA</div>
        
        <h1 className="hero-headline text-5xl sm:text-7xl md:text-[120px] font-semibold tracking-[-2px] sm:tracking-[-4px] md:tracking-[-6.8px] leading-[0.95] sm:leading-[0.9] md:leading-[0.86] mb-6">
          REACH<br />BEYOND<br /><span className="gradient-text">LIMITS</span>
        </h1>
        
        <p className="max-w-[620px] mx-auto text-lg sm:text-xl md:text-2xl text-white/70 tracking-[-0.2px] mb-8 sm:mb-11">
          We build brands, websites, digital experiences, and powerful marketing solutions that help businesses grow.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => scrollTo('services')}
            className="magnetic-btn group px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-white text-[#050508] font-medium tracking-[1.5px] text-xs sm:text-sm flex items-center justify-center gap-3 hover:bg-[#22D3EE] active:scale-[0.985] transition-all w-full sm:w-auto"
          >
            EXPLORE SERVICES
          </button>
          <button 
            onClick={() => scrollTo('contact')}
            className="magnetic-btn px-8 sm:px-10 py-3.5 sm:py-4 rounded-full border border-white/40 hover:bg-white/5 font-medium tracking-[1.5px] text-xs sm:text-sm flex items-center justify-center gap-3 active:scale-[0.985] transition-all w-full sm:w-auto"
          >
            START YOUR PROJECT
          </button>
        </div>
      </div>

      <motion.div 
        animate={{ y: [0, 14, 0] }} 
        transition={{ duration: 2.1, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[10px] tracking-[4px] text-white/40 z-20"
      >
        SCROLL TO BEGIN
      </motion.div>
    </section>
  );
}
