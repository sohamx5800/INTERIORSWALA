
import React, { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  Float, 
  Sparkles,
  AdaptiveDpr,
  AdaptiveEvents,
  Preload,
  BakeShadows
} from '@react-three/drei';
import * as THREE from 'three';

const Mesh = 'mesh' as any;
const BoxGeometry = 'boxGeometry' as any;
const CylinderGeometry = 'cylinderGeometry' as any;
const AmbientLight = 'ambientLight' as any;
const Group = 'group' as any;
const PointLight = 'pointLight' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;
const PlaneGeometry = 'planeGeometry' as any;

const InteriorScene = () => {
  const groupRef = useRef<any>(null!);
  const tvRef = useRef<any>(null!);
  const { mouse } = useThree();

  // High-end Obsidian Black Material
  const obsidianMaterial = useMemo(() => ({
    color: "#020202",
    metalness: 0.9,
    roughness: 0.2,
  }), []);

  const accentMaterial = useMemo(() => ({
    color: "#1FAE9B",
    metalness: 1,
    roughness: 0.1,
  }), []);

  useFrame((state) => {
    const scrollY = window.scrollY;
    const totalHeight = (document.body.scrollHeight - window.innerHeight) || 1;
    const scrollFactor = scrollY / totalHeight;
    
    if (groupRef.current) {
      // Precise smooth rotation following mouse and scroll
      const targetY = (mouse.x * 0.12) + (scrollFactor * Math.PI * 0.35);
      const targetX = (mouse.y * 0.06);
      
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
      
      // Grounding offset that stays stable
      groupRef.current.position.y = -3.5 - (scrollFactor * 2);
    }

    if (tvRef.current) {
      // Screen catches "light" on movement
      tvRef.current.rotation.z = mouse.x * 0.01;
    }
  });

  return (
    <Group ref={groupRef} scale={1.4}>
      {/* --- REFINED FLOOR --- */}
      <Mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <PlaneGeometry args={[40, 40]} />
        <MeshStandardMaterial 
          color="#000000" 
          transparent 
          opacity={0.6} 
          metalness={0.2} 
          roughness={0.8}
        />
      </Mesh>

      {/* --- ARCHITECTURAL SOFA (CENTERPIECE) --- */}
      <Group position={[0, 0, 0]}>
        <Mesh position={[0, 0.4, 0]}>
          <BoxGeometry args={[8, 0.8, 3.2]} />
          <MeshStandardMaterial {...obsidianMaterial} />
        </Mesh>
        <Mesh position={[0, 1.5, -1.3]}>
          <BoxGeometry args={[8, 1.7, 0.6]} />
          <MeshStandardMaterial {...obsidianMaterial} />
        </Mesh>
        {[-3.7, 3.7].map((x) => (
          <Mesh key={x} position={[x, 0.9, 0]}>
            <BoxGeometry args={[0.6, 1.3, 3.2]} />
            <MeshStandardMaterial {...obsidianMaterial} />
          </Mesh>
        ))}
        {[-2, 2].map((x) => (
          <Mesh key={x} position={[x, 0.6, 0.1]}>
            <BoxGeometry args={[3.4, 0.3, 2.6]} />
            <MeshStandardMaterial color="#0A0A0A" metalness={0.5} roughness={0.6} />
          </Mesh>
        ))}
        <Mesh position={[0, 0.02, 0]}>
           <BoxGeometry args={[8.1, 0.04, 3.3]} />
           <MeshStandardMaterial {...accentMaterial} />
        </Mesh>
      </Group>

      {/* --- TV UNIT (BROUGHT CLOSER) --- */}
      <Group position={[0, 5, -5]} ref={tvRef}>
        <Mesh>
          <BoxGeometry args={[11, 6.2, 0.4]} />
          <MeshStandardMaterial color="#000000" metalness={0.4} roughness={0.9} />
        </Mesh>
        <Mesh position={[0, 0, 0.21]}>
          <BoxGeometry args={[10.6, 5.8, 0.02]} />
          <MeshStandardMaterial 
            color="#010101" 
            metalness={1} 
            roughness={0.02} 
            envMapIntensity={3} 
          />
        </Mesh>
        <PointLight position={[0, 0, 1.5]} intensity={0.5} color="#ffffff" distance={8} />
      </Group>

      {/* --- DESK SET (BROUGHT CLOSER) --- */}
      <Group position={[-5.5, 0, 1.5]}>
        <Mesh position={[0, 1.3, 0]}>
          <BoxGeometry args={[3.5, 0.08, 2]} />
          <MeshStandardMaterial {...obsidianMaterial} metalness={1} roughness={0.1} />
        </Mesh>
        {[-1.6, 1.6].map((x) => (
          <Mesh key={x} position={[x, 0.65, 0]}>
            <CylinderGeometry args={[0.02, 0.02, 1.3]} />
            <MeshStandardMaterial color="#333333" metalness={1} />
          </Mesh>
        ))}
        <Group position={[0.2, 0, 1.2]}>
           <Mesh position={[0, 0.5, 0]}>
              <CylinderGeometry args={[0.6, 0.6, 0.1, 32]} />
              <MeshStandardMaterial {...obsidianMaterial} />
           </Mesh>
           <Mesh position={[0, 0.25, 0]}>
              <CylinderGeometry args={[0.03, 0.03, 0.5]} />
              <MeshStandardMaterial {...accentMaterial} />
           </Mesh>
        </Group>
      </Group>

      {/* --- LUXE LAMP (BROUGHT CLOSER) --- */}
      <Group position={[5.5, 0, 1.5]}>
        <Mesh position={[0, 0, 0]}>
           <CylinderGeometry args={[1, 1, 0.06, 32]} />
           <MeshStandardMaterial {...obsidianMaterial} metalness={1} />
        </Mesh>
        <Mesh position={[0, 2.5, 0]}>
          <CylinderGeometry args={[0.04, 0.04, 5, 8]} />
          <MeshStandardMaterial color="#222222" metalness={1} />
        </Mesh>
        <Mesh position={[0, 5, 0]}>
          <CylinderGeometry args={[0.8, 1.2, 1.6, 16]} />
          <MeshStandardMaterial color="#000000" roughness={1} />
        </Mesh>
        <PointLight position={[0, 5, 0]} intensity={10} color="#ffffff" distance={10} />
      </Group>
    </Group>
  );
};

const Scene3D: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-100">
      <Canvas 
        shadows={false}
        gl={{ 
          antialias: true, 
          alpha: true, 
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 22]} fov={30} />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <BakeShadows />
        
        <AmbientLight intensity={2} />
        <PointLight position={[20, 20, 20]} intensity={4} color="#ffffff" />
        <PointLight position={[-20, 15, 5]} intensity={1.5} color="#1FAE9B" />
        
        <Suspense fallback={null}>
          <Float speed={1} rotationIntensity={0.02} floatIntensity={0.01}>
            <InteriorScene />
          </Float>
          <Sparkles 
            count={15}
            scale={35} 
            size={1.2} 
            speed={0.2} 
            color="#ffffff" 
            opacity={0.2} 
          />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
