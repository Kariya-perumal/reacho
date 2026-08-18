import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Float, MeshDistortMaterial } from '@react-three/drei';

function CyberCore3D({ mousePos }: { mousePos: { x: number; y: number } }) {
  const mainGroupRef = useRef<THREE.Group>(null!);
  const knotRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const ring3Ref = useRef<THREE.Mesh>(null!);
  const particlesRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (mainGroupRef.current) {
      mainGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        mainGroupRef.current.rotation.y,
        time * 0.15 + mousePos.x * 0.5,
        0.05
      );
      mainGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        mainGroupRef.current.rotation.x,
        mousePos.y * 0.35 + Math.sin(time * 0.3) * 0.1,
        0.05
      );
    }

    if (knotRef.current) {
      knotRef.current.rotation.x = time * 0.3;
      knotRef.current.rotation.y = time * 0.25;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.2;
      ring1Ref.current.rotation.z = time * 0.15;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = time * -0.25;
      ring2Ref.current.rotation.x = time * 0.1;
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = time * -0.3;
      ring3Ref.current.rotation.x = time * -0.2;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.04;
    }
  });

  const particleCoords = Array.from({ length: 48 }, (_, i) => ({
    pos: [
      (Math.random() - 0.5) * 14,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 12
    ] as [number, number, number],
    scale: Math.random() * 0.11 + 0.05,
    color: i % 3 === 0 ? "#22D3EE" : i % 3 === 1 ? "#7C3AED" : "#2563EB"
  }));

  return (
    <group ref={mainGroupRef}>
      {/* Central 3D Distorted Core Mesh */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.7}>
        <mesh ref={knotRef} scale={1.6}>
          <torusKnotGeometry args={[1.2, 0.36, 128, 32]} />
          <MeshDistortMaterial
            color="#22D3EE"
            roughness={0.15}
            metalness={0.85}
            distort={0.35}
            speed={2.2}
          />
        </mesh>

        {/* Outer Glowing Wireframe Overlay */}
        <mesh scale={1.95}>
          <icosahedronGeometry args={[1.4, 2]} />
          <meshBasicMaterial color="#7C3AED" wireframe transparent opacity={0.35} />
        </mesh>
      </Float>

      {/* Orbiting 3D Ring 1 */}
      <mesh ref={ring1Ref} scale={3.0}>
        <torusGeometry args={[1.4, 0.015, 16, 100]} />
        <meshStandardMaterial color="#22D3EE" emissive="#22D3EE" emissiveIntensity={0.7} roughness={0.1} />
      </mesh>

      {/* Orbiting 3D Ring 2 */}
      <mesh ref={ring2Ref} scale={3.8}>
        <torusGeometry args={[1.3, 0.012, 16, 100]} />
        <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={0.8} roughness={0.1} />
      </mesh>

      {/* Orbiting 3D Ring 3 */}
      <mesh ref={ring3Ref} scale={4.6}>
        <torusGeometry args={[1.2, 0.01, 16, 100]} />
        <meshStandardMaterial color="#2563EB" emissive="#2563EB" emissiveIntensity={0.6} roughness={0.1} />
      </mesh>

      {/* 3D Floating Particle Sphere Cloud */}
      <group ref={particlesRef}>
        {particleCoords.map((p, i) => (
          <mesh key={i} position={p.pos} scale={p.scale}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color={p.color} emissive={p.color} emissiveIntensity={0.9} />
          </mesh>
        ))}
      </group>
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

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePos({
        x: ((touch.clientX - rect.left) / rect.width - 0.5) * 1.6,
        y: ((touch.clientY - rect.top) / rect.height - 0.5) * 1.6,
      });
    }
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section 
      className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden bg-[#050508]" 
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 14], fov: 48 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 10]} intensity={1.5} color="#22D3EE" />
          <pointLight position={[-10, -10, -10]} intensity={2.0} color="#7C3AED" />
          <pointLight position={[0, 5, 5]} intensity={1.2} color="#2563EB" />
          <CyberCore3D mousePos={mousePos} />
        </Canvas>
      </div>

      <div className="relative z-20 max-w-5xl px-6 text-center">
        <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 text-xs tracking-[4px] mb-6 border border-white/10 backdrop-blur-md">
          EST 2018 • MADURAI, INDIA
        </div>
        
        <h1 className="hero-headline text-5xl sm:text-7xl md:text-[120px] font-semibold tracking-[-2px] sm:tracking-[-4px] md:tracking-[-6.8px] leading-[0.95] sm:leading-[0.9] md:leading-[0.86] mb-6">
          REACH<br />BEYOND<br /><span className="gradient-text">LIMITS</span>
        </h1>
        
        <p className="max-w-[620px] mx-auto text-lg sm:text-xl md:text-2xl text-white/80 tracking-[-0.2px] mb-8 sm:mb-11">
          We build brands, websites, digital experiences, and powerful marketing solutions that help businesses grow.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => scrollTo('services')}
            className="magnetic-btn group px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-white text-[#050508] font-medium tracking-[1.5px] text-xs sm:text-sm flex items-center justify-center gap-3 hover:bg-[#22D3EE] active:scale-[0.985] transition-all w-full sm:w-auto shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            EXPLORE SERVICES
          </button>
          <button 
            onClick={() => scrollTo('contact')}
            className="magnetic-btn px-8 sm:px-10 py-3.5 sm:py-4 rounded-full border border-white/40 hover:bg-white/10 font-medium tracking-[1.5px] text-xs sm:text-sm flex items-center justify-center gap-3 active:scale-[0.985] transition-all w-full sm:w-auto backdrop-blur-md"
          >
            START YOUR PROJECT
          </button>
        </div>
      </div>

      <motion.div 
        animate={{ y: [0, 14, 0] }} 
        transition={{ duration: 2.1, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] tracking-[4px] text-white/50 z-20 pointer-events-none"
      >
        SCROLL TO BEGIN
      </motion.div>
    </section>
  );
}
