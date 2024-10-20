import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Suspense } from "react";
import { Model } from "./components/Model";

export const App: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 3, 7] }} dpr={[1, 2]} shadows>
      <color attach="background" args={["#213547"]} />
      <ambientLight intensity={0.5} />
      <OrbitControls />
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshPhongMaterial color={"white"} side={THREE.DoubleSide} />
      </mesh>
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        castShadow
      />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
    </Canvas>
  );
};
