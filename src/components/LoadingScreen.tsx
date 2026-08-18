import { Canvas } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

function NeuralLogo() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.6;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Core */}
      <mesh>
        <sphereGeometry args={[0.8]} />
        <meshBasicMaterial color="#22D3EE" />
      </mesh>
      
      {/* Orbiting Rings */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[i * 1.2, i * 0.8, 0]}>
          <torusGeometry args={[2.2 + i * 0.6, 0.03, 16, 64]} />
          <meshBasicMaterial color={i === 1 ? "#7C3AED" : "#2563EB"} transparent opacity={0.8} />
        </mesh>
      ))}
      
      {/* Connection Lines */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} rotation={[0, (i * Math.PI) / 4, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 4.4, 3]} />
          <meshBasicMaterial color="#22D3EE" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p: number) => {
        if (p >= 100) return 100;
        return p + Math.random() * 13 + 7;
      });
    }, 90);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#050508] flex flex-col items-center justify-center z-[100]">
      <div className="relative w-72 h-72 mb-8">
        <Canvas camera={{ position: [0, 0, 9], fov: 45 }}>
          <ambientLight intensity={0.8} />
          <NeuralLogo />
        </Canvas>
      </div>
      
      <div className="text-center flex flex-col items-center">
        <img src="/logo-symbol.png" alt="REACH O Symbol" className="w-16 h-16 object-contain mb-4 animate-pulse" />
        <div className="text-5xl md:text-6xl font-semibold tracking-[-3px] text-white mb-2">
          RE<span className="text-[#22D3EE]">Λ</span>CH&nbsp;O
        </div>
        <div className="text-[#22D3EE] text-xs md:text-sm tracking-[4px] font-medium uppercase">
          REACH FURTHER. EXPERIENCE BETTER.
        </div>
      </div>

      <div className="mt-12 w-72">
        <div className="h-px bg-white/10 mb-3">
          <div 
            className="h-px bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#22D3EE] transition-all duration-200" 
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <div className="text-[10px] text-white/40 tracking-[3px] text-center font-mono">ASSEMBLING THE FUTURE • {Math.floor(Math.min(progress, 100))}%</div>
      </div>
    </div>
  );
}
