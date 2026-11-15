import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group, Points } from 'three';

function Sculpture() {
  const group = useRef<Group>(null);
  const points = useRef<Points>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const count = 2400;
  const positions = new Float32Array(count * 3);
  const random = (seed: number) => { const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453; return value - Math.floor(value); };
  for (let index = 0; index < count; index += 1) {
    const y = 1 - (index / (count - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const angle = Math.PI * (3 - Math.sqrt(5)) * index;
    const lobe = 1 + 0.23 * Math.sin(angle * 2.7 + y * 4.2) * Math.cos(angle * 1.4 - y * 6.5);
    const ripple = lobe + 0.07 * Math.sin(angle * 7 + y * 12);
    positions[index * 3] = Math.cos(angle) * radius * ripple;
    positions[index * 3 + 1] = y * ripple;
    positions[index * 3 + 2] = Math.sin(angle) * radius * ripple;
  }
  const particleSizes = new Float32Array(count);
  for (let index = 0; index < count; index += 1) particleSizes[index] = 0.4 + random(index) * 1.4;
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.12;
    group.current.rotation.x += (pointer.current.y * 0.18 - group.current.rotation.x) * 0.035;
    group.current.rotation.z += (-pointer.current.x * 0.12 - group.current.rotation.z) * 0.035;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.08;
    if (points.current) points.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.12;
  });

  return (
    <group ref={group} onPointerMove={(event) => { pointer.current = { x: event.pointer.x, y: event.pointer.y }; }}>
      <points ref={points}>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /><bufferAttribute attach="attributes-aSize" args={[particleSizes, 1]} /></bufferGeometry>
        <pointsMaterial color="#007BA7" size={0.029} transparent opacity={0.82} sizeAttenuation depthWrite={false} />
      </points>
      <mesh>
        <icosahedronGeometry args={[1.63, 3]} />
        <meshStandardMaterial color="#007BA7" metalness={0.72} roughness={0.3} wireframe transparent opacity={0.58} />
      </mesh>
      <mesh><icosahedronGeometry args={[0.31, 2]} /><meshBasicMaterial color="#FF2D95" /></mesh>
      <pointLight position={[0, 0, 0]} color="#FF2D95" intensity={3.5} distance={3.8} />
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas dpr={[1, 1.25]} camera={{ position: [0, 0, 5.5], fov: 40 }} gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}>
      <ambientLight intensity={1.15} />
      <pointLight position={[3, 3, 4]} color="#007BA7" intensity={18} />
      <pointLight position={[-4, -2, 0]} color="#FF2D95" intensity={8} />
      <Sculpture />
    </Canvas>
  );
}
