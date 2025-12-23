'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useRef, useState, type ComponentProps } from 'react';
import * as random from 'maath/random/dist/maath-random.cjs';
import * as THREE from 'three';

type StarsProps = ComponentProps<typeof Points>;

function Stars(props: StarsProps) {
  const ref = useRef<THREE.Points | null>(null);
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000 * 3), { radius: 1.5 }));

  useFrame((state, delta) => {
    if (ref.current) {
      // Rotazione automatica di base
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;

      // Reazione al movimento del mouse (Parallax)
      const { x, y } = state.pointer;
      ref.current.rotation.x += y * delta * 0.2;
      ref.current.rotation.y += x * delta * 0.2;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#00ffff"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </group>
  );
}

function SceneContent() {
    return (
        <>
            <Stars />
            <ambientLight intensity={0.5} />
        </>
    )
}

export default function Scene() {
  return (
    <div className="absolute inset-0 -z-10 bg-slate-950">
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
        <SceneContent />
      </Canvas>
    </div>
  );
}
