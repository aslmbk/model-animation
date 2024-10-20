import { useAnimations, useGLTF, useMatcapTexture } from "@react-three/drei";
import * as THREE from "three";
import { GLTF } from "three/examples/jsm/Addons.js";
import { useEffect, useRef } from "react";

const textureNames = [
  "3A2412_A78B5F_705434_836C47",
  "293534_B2BFC5_738289_8A9AA7",
  "15100F_241D1B_292424_2C2C27",
  "161B1F_C7E0EC_90A5B3_7B8C9B",
  "191514_6D5145_4E3324_3B564D",
  "1B1B1B_999999_575757_747474",
  "1A2461_3D70DB_2C3C8F_2C6CAC",
  "253C3C_528181_406C6C_385F5F",
  "2E763A_78A0B7_B3D1CF_14F209",
  "C5A292_635247_F2D7D6_846A5B",
  "C7B9A1_F8F1E4_EEE4D2_E4D8C4",
  "C7C7D7_4C4E5A_818393_6C6C74",
  "C8C8C8_3F3F3F_787878_5C5C5C",
  "D07E3F_FBBD1F_8D2840_24120C",
  "D54C2B_5F1105_F39382_F08375",
  "E6BF3C_5A4719_977726_FCFC82",
  "F75F0B_461604_9A3004_FB9D2F",
  "FBB43F_FBE993_FB552E_FCDD65",
];

const animationNames = [
  "walking",
  "flair",
  "dancing",
  "dancing2",
  "dynamic_pose",
];

type GLTFResult = GLTF & {
  nodes: {
    Alpha_Joints: THREE.SkinnedMesh;
    Alpha_Surface: THREE.SkinnedMesh;
    mixamorigHips: THREE.Bone;
  };
  materials: {
    Alpha_Joints_MAT: THREE.MeshStandardMaterial;
    Alpha_Body_MAT: THREE.MeshStandardMaterial;
  };
};

export const Model: React.FC = () => {
  const group = useRef<THREE.Group>(null);

  const { nodes, materials } = useGLTF(
    "./models/ybot.glb"
  ) as unknown as GLTFResult;

  const { animations: dancingAnimations } = useGLTF(
    "./models/animations/dancing.glb"
  ) as unknown as GLTFResult;
  const { animations: dancing2Animations } = useGLTF(
    "./models/animations/dancing2.glb"
  ) as unknown as GLTFResult;
  const { animations: dynamicPoseAnimations } = useGLTF(
    "./models/animations/dynamic_pose.glb"
  ) as unknown as GLTFResult;
  const { animations: flairAnimations } = useGLTF(
    "./models/animations/flair.glb"
  ) as unknown as GLTFResult;
  const { animations: walkingAnimations } = useGLTF(
    "./models/animations/walking.glb"
  ) as unknown as GLTFResult;

  const [matcapBody] = useMatcapTexture(textureNames[1], 512);
  const [matcapJoints] = useMatcapTexture(textureNames[0], 512);

  const { actions } = useAnimations(
    [
      ...dancingAnimations,
      ...dancing2Animations,
      ...dynamicPoseAnimations,
      ...flairAnimations,
      ...walkingAnimations,
    ],
    group
  );

  useEffect(() => {
    actions[animationNames[0]]?.reset().fadeIn(0.5).play();
    return () => void actions[animationNames[0]]?.fadeOut(0.5);
  }, [actions]);

  return (
    <group ref={group} rotation={[Math.PI / 2, 0, 0]} scale={0.02}>
      <primitive object={nodes.mixamorigHips} />
      {/* Joints */}
      <skinnedMesh
        castShadow
        geometry={nodes.Alpha_Joints.geometry}
        material={materials.Alpha_Joints_MAT}
        skeleton={nodes.Alpha_Joints.skeleton}
      >
        <meshMatcapMaterial attach="material" matcap={matcapJoints} />
      </skinnedMesh>
      {/* Body */}
      <skinnedMesh
        castShadow
        geometry={nodes.Alpha_Surface.geometry}
        material={materials.Alpha_Body_MAT}
        skeleton={nodes.Alpha_Surface.skeleton}
      >
        <meshMatcapMaterial attach="material" matcap={matcapBody} />
      </skinnedMesh>
    </group>
  );
};
useGLTF.preload("./models/ybot.glb");
