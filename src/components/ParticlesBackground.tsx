import { useRef, useMemo} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleField() {
  const meshRef = useRef<THREE.Points>(null);

  const count = 200;

  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }

    return [positions, velocities];
  }, []);

  const colors = useMemo(() => {
    const colors = new Float32Array(count * 3);
    const colorPalette = [
      new THREE.Color('#00f5ff'),
      new THREE.Color('#7c3aed'),
      new THREE.Color('#f472b6'),
      new THREE.Color('#3b82f6'),
    ];

    for (let i = 0; i < count; i++) {
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return colors;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const positionArray = meshRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      positionArray[i * 3] += velocities[i * 3];
      positionArray[i * 3 + 1] += velocities[i * 3 + 1];
      positionArray[i * 3 + 2] += velocities[i * 3 + 2];

      // Boundary check
      if (Math.abs(positionArray[i * 3]) > 10) velocities[i * 3] *= -1;
      if (Math.abs(positionArray[i * 3 + 1]) > 10) velocities[i * 3 + 1] *= -1;
      if (Math.abs(positionArray[i * 3 + 2]) > 5) velocities[i * 3 + 2] *= -1;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  const positionAttribute = useMemo(() => {
    return new THREE.BufferAttribute(positions, 3);
  }, [positions]);

  const colorAttribute = useMemo(() => {
    return new THREE.BufferAttribute(colors, 3);
  }, [colors]);

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <primitive object={positionAttribute} attach="attributes-position" />
        <primitive object={colorAttribute} attach="attributes-color" />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function ConnectionLines() {
  const lineRef = useRef<THREE.LineSegments>(null);
  const particleCount = 50;

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  const linePositions = useMemo(() => {
    const lines: number[] = [];
    const maxDistance = 2;

    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance) {
          lines.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }

    return new Float32Array(lines);
  }, [positions]);

  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  if (linePositions.length === 0) return null;

  const lineAttribute = useMemo(() => {
    return new THREE.BufferAttribute(linePositions, 3);
  }, [linePositions]);

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <primitive object={lineAttribute} attach="attributes-position" />
      </bufferGeometry>
      <lineBasicMaterial color="#00f5ff" transparent opacity={0.15} />
    </lineSegments>
  );
}

export default function ParticlesBackground() {
  return (
    <div className="particles-container">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <ParticleField />
        <ConnectionLines />
      </Canvas>
    </div>
  );
}
