import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Mesh } from 'three';

function Sculpture() {
  const mesh = useRef<Mesh>(null);
  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta * 0.08;
    mesh.current.rotation.y += delta * 0.12;
    mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.08;
  });

  return (
    <group>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.65, 1]} />
        <meshStandardMaterial color="#a8f0dc" metalness={0.78} roughness={0.24} wireframe />
      </mesh>
      <mesh rotation={[0.3, 0.15, 0]}>
        <icosahedronGeometry args={[1.16, 1]} />
        <meshBasicMaterial color="#79d9c0" wireframe transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5.5], fov: 40 }} gl={{ alpha: true, antialias: false }}>
      <ambientLight intensity={1.15} />
      <pointLight position={[3, 3, 4]} color="#c9fff2" intensity={18} />
      <pointLight position={[-4, -2, 0]} color="#517bff" intensity={8} />
      <Sculpture />
    </Canvas>
  );
}
