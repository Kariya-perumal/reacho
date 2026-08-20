import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ReachO3DLogoProps {
  scale?: number;
  rotationSpeed?: number;
  showRings?: boolean;
}

export default function ReachO3DLogo({ scale = 1, rotationSpeed = 0.6, showRings = true }: ReachO3DLogoProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load('/logo-3d-badge.png', (loadedTex) => {
      loadedTex.colorSpace = THREE.SRGBColorSpace;
      loadedTex.minFilter = THREE.LinearFilter;
      loadedTex.magFilter = THREE.LinearFilter;
      setTexture(loadedTex);
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Y-axis 360-degree rotation preserving animation speed & direction
      groupRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed;
      // Gentle 3D perspective pitch oscillation for dynamic 3D depth
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.12;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.08;
    }
  });

  const frontMaterial = useMemo(() => {
    if (!texture) {
      return new THREE.MeshStandardMaterial({ color: '#050508' });
    }
    return new THREE.MeshPhysicalMaterial({
      map: texture,
      transparent: true,
      roughness: 0.15,
      metalness: 0.1,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
      side: THREE.FrontSide,
    });
  }, [texture]);

  const backMaterial = useMemo(() => {
    if (!texture) {
      return new THREE.MeshStandardMaterial({ color: '#050508' });
    }
    return new THREE.MeshPhysicalMaterial({
      map: texture,
      transparent: true,
      roughness: 0.15,
      metalness: 0.1,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
      side: THREE.FrontSide,
    });
  }, [texture]);

  const rimMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#080d1a',
      metalness: 0.85,
      roughness: 0.2,
      emissive: new THREE.Color('#2563EB'),
      emissiveIntensity: 0.2,
      side: THREE.DoubleSide,
    });
  }, []);

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {/* 3D Extruded Logo Medallion */}
      <group>
        {/* Front Logo Face */}
        <mesh position={[0, 0, 0.09]} material={frontMaterial}>
          <circleGeometry args={[2.2, 64]} />
        </mesh>

        {/* Back Logo Face */}
        <mesh position={[0, 0, -0.09]} rotation={[0, Math.PI, 0]} material={backMaterial}>
          <circleGeometry args={[2.2, 64]} />
        </mesh>

        {/* 3D Edge Rim Thickness */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} material={rimMaterial}>
          <cylinderGeometry args={[2.202, 2.202, 0.18, 64, 1, true]} />
        </mesh>
      </group>

      {/* Orbiting Ambient Glow Rings */}
      {showRings && (
        <>
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[2.7, 0.025, 16, 64]} />
            <meshStandardMaterial
              color="#22D3EE"
              emissive="#22D3EE"
              emissiveIntensity={0.6}
              transparent
              opacity={0.7}
            />
          </mesh>

          <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
            <torusGeometry args={[3.2, 0.02, 16, 64]} />
            <meshStandardMaterial
              color="#7C3AED"
              emissive="#7C3AED"
              emissiveIntensity={0.6}
              transparent
              opacity={0.6}
            />
          </mesh>
        </>
      )}
    </group>
  );
}
