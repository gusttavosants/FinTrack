import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Box, Torus } from "@react-three/drei";
import * as THREE from "three";

const AnimatedSphere = ({ position, scale, color, speed = 1 }: { 
  position: [number, number, number]; 
  scale: number; 
  color: string;
  speed?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

const AnimatedTorus = ({ position, scale, color }: { 
  position: [number, number, number]; 
  scale: number; 
  color: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <Torus ref={meshRef} args={[1, 0.4, 32, 64]} position={position} scale={scale}>
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.9}
        />
      </Torus>
    </Float>
  );
};

const AnimatedBox = ({ position, scale, color }: { 
  position: [number, number, number]; 
  scale: number; 
  color: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.4} floatIntensity={0.6}>
      <Box ref={meshRef} args={[1, 1, 1]} position={position} scale={scale}>
        <meshStandardMaterial
          color={color}
          roughness={0.4}
          metalness={0.7}
        />
      </Box>
    </Float>
  );
};

const Particles = () => {
  const count = 50;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#f59e0b"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#f59e0b" />
      <pointLight position={[5, -5, 5]} intensity={0.3} color="#3b82f6" />
      
      <AnimatedSphere position={[-2, 1, 0]} scale={0.8} color="#f59e0b" speed={0.8} />
      <AnimatedSphere position={[2.5, -0.5, -1]} scale={0.5} color="#3b82f6" speed={1.2} />
      <AnimatedTorus position={[0, -1.5, 0.5]} scale={0.4} color="#10b981" />
      <AnimatedBox position={[2, 1.5, -0.5]} scale={0.35} color="#8b5cf6" />
      
      <Particles />
    </>
  );
};

const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default FloatingShapes;
