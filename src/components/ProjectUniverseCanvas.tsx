import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import type { MutableRefObject } from 'react';
import type { Group, Points } from 'three';

function Universe({ pointerRef }: { pointerRef: MutableRefObject<{ x: number; y: number }> }) {
  const sculpture = useRef<Group>(null);
  const orbit = useRef<Group>(null);
  const particles = useRef<Points>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(90);
    for (let index = 0; index < 30; index += 1) {
      const angle = index * 2.399;
      const radius = 1.8 + ((index * 17) % 13) / 10;
      values[index * 3] = Math.cos(angle) * radius;
      values[index * 3 + 1] = Math.sin(angle * 1.3) * 1.45;
      values[index * 3 + 2] = Math.sin(angle) * radius * 0.55;
    }
    return values;
  }, []);

  useFrame((state, delta) => {
    if (sculpture.current) {
      sculpture.current.rotation.x += delta * 0.07;
      sculpture.current.rotation.y += delta * 0.11;
      sculpture.current.rotation.x += (pointerRef.current.y * 0.12 - sculpture.current.rotation.x) * delta * 0.25;
      sculpture.current.rotation.y += (pointerRef.current.x * 0.16 - sculpture.current.rotation.y) * delta * 0.25;
      sculpture.current.position.y = Math.sin(state.clock.elapsedTime * 0.42) * 0.07;
    }
    if (orbit.current) orbit.current.rotation.y += delta * 0.035;
    if (particles.current) particles.current.rotation.y -= delta * 0.012;
  });

  return (
    <group>
      <group ref={sculpture}>
        <mesh>
          <icosahedronGeometry args={[1.12, 1]} />
          <meshPhysicalMaterial color="#007BA7" emissive="#003747" emissiveIntensity={0.24} metalness={0.48} roughness={0.2} clearcoat={0.8} clearcoatRoughness={0.15} transparent opacity={0.72} wireframe />
        </mesh>
        <mesh rotation={[0.35, 0.2, 0.1]}>
          <icosahedronGeometry args={[0.78, 1]} />
          <meshBasicMaterial color="#FF2D95" wireframe transparent opacity={0.34} />
        </mesh>
      </group>
      <group ref={orbit}>
        <mesh rotation={[1.04, 0.2, -0.25]}>
          <torusGeometry args={[1.85, 0.006, 6, 100]} />
          <meshBasicMaterial color="#007BA7" transparent opacity={0.48} />
        </mesh>
        <mesh rotation={[0.62, -0.6, 0.8]}>
          <torusGeometry args={[2.18, 0.004, 6, 100]} />
          <meshBasicMaterial color="#FF2D95" transparent opacity={0.3} />
        </mesh>
      </group>
      <points ref={particles}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#FF2D95" size={0.028} transparent opacity={0.76} sizeAttenuation />
      </points>
      <ambientLight intensity={1.15} />
      <pointLight position={[3, 2.5, 4]} color="#007BA7" intensity={15} />
      <pointLight position={[-3, -2, 1]} color="#FF2D95" intensity={8} />
    </group>
  );
}

export default function ProjectUniverseCanvas({ pointerRef }: { pointerRef: MutableRefObject<{ x: number; y: number }> }) {
  return (
    <Canvas
      dpr={[1, 1.25]}
      camera={{ position: [0, 0, 5.8], fov: 42 }}
      gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
      fallback={<div className="universe-fallback" aria-hidden="true" />}
      aria-hidden="true"
    >
      <Universe pointerRef={pointerRef} />
    </Canvas>
  );
}
