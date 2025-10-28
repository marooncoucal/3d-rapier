import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";

export function Arch1() {
  return (
    <RigidBody>
      {/* arc */}
      <RigidBody type="fixed" position={[-5, 2, -5]}>
        <mesh>
          <boxGeometry args={[0.2, 6, 3]} />
          <meshStandardMaterial />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" position={[-10, 2, -5]}>
        <mesh>
          <boxGeometry args={[0.2, 6, 3]} />
          <meshStandardMaterial />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" position={[-7.5, 5, -5]}>
        <mesh>
          <boxGeometry args={[5.2, 0.2, 3]} />
          <meshStandardMaterial />
        </mesh>
      </RigidBody>
    </RigidBody>
  );
}