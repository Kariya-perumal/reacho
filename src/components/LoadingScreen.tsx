import { Canvas } from '@react-three/fiber';
import { useState, useEffect } from 'react';
import ReachO3DLogo from './ReachO3DLogo';

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
      {/* 3D Rotating REACH O Logo */}
      <div className="relative w-72 h-72 mb-8">
        <Canvas camera={{ position: [0, 0, 9], fov: 45 }}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
          <directionalLight position={[-5, -5, -2]} intensity={0.8} color="#22D3EE" />
          <pointLight position={[0, 0, 4]} intensity={1.0} color="#7C3AED" />
          <ReachO3DLogo scale={1} rotationSpeed={0.6} showRings={true} />
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

