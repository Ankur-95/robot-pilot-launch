import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useIsMobile } from '@/hooks/use-mobile';
import * as THREE from 'three';

function RobotPlaceholder() {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.3 + pointer.x * 0.3;
    groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.05 + pointer.y * 0.1;
  });

  return (
    <group ref={groupRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 1.5, 0.8]} />
        <meshStandardMaterial
          color={hovered ? '#22d3ee' : '#64748b'}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[0.8, 0.6, 0.7]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.2, 1.3, 0.36]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={2} />
      </mesh>
      <mesh position={[0.2, 1.3, 0.36]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={2} />
      </mesh>
      {/* Arms */}
      <mesh position={[-0.9, 0.2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1.2, 8]} />
        <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.9, 0.2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1.2, 8]} />
        <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.3, -1.2, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 1, 8]} />
        <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.3, -1.2, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 1, 8]} />
        <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Antenna */}
      <mesh position={[0, 1.7, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.95, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={3} />
      </mesh>
    </group>
  );
}

const RobotModel = () => {
  const isMobile = useIsMobile();

  return (
    <div
      className="w-full h-[300px] md:h-[450px] relative"
      role="img"
      aria-label="3D Robot Model — interactive, rotates on hover"
    >
      <Canvas
        camera={{ position: [0, 0.5, 4], fov: 45 }}
        dpr={isMobile ? 1 : 1.5}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-3, 2, 3]} intensity={0.5} color="#22d3ee" />
        <RobotPlaceholder />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={!isMobile}
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
};

export default RobotModel;
