import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { quat, RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { ButtonsSpinLR } from "./actions/buttonsSpinLR";

export function KotikiModel({
  position = [0, 0, 0],
  setInteractionMode,
  reference,
}) {
  const kotiki2 = useGLTF("/kotitki.glb");
  const spin = useRef();
  return (
    <>
      <RigidBody
        type="kinematicPosition"
        // ref={spinner} // continuous rotation
        ref={spin}
        // ref={reference}
        scale={0.1}
        position={position}
      >
        <primitive object={kotiki2.scene} />
      </RigidBody>
      <ButtonsSpinLR spinRef={spin} setInteractionMode={setInteractionMode}/>
    </>
  );
}

// const spinner = useRef();
// 5:41 https://youtu.be/OpYtwrtpePY?si=UPK2dpHICZ4at2YO
// useFrame((_state, delta) => {
//     const curRotation = quat(spinner.current.rotation());
//     const incrementRotation = new THREE.Quaternion().setFromAxisAngle(
//         new THREE.Vector3(0,1,0),
//         delta*1 // elapsed time * speed
//     );
//     curRotation.multiply(incrementRotation);
//     spinner.current.setNextKinematicRotation(curRotation);
// })

// const [spinLeft, setSpinLeft] = useState(false);
// useFrame((_, delta) => {
//   if (spinLeft && spinCube.current) {
//     const curRot = spinCube.current.rotation();
//     const currentQuat = new THREE.Quaternion(curRot.x, curRot.y, curRot.z, curRot.w);
//     const incrementQuat = new THREE.Quaternion().setFromAxisAngle(
//       new THREE.Vector3(0, 1, 0),
//       -delta * 1
//     );
//     currentQuat.multiply(incrementQuat);
//     spinCube.current.setNextKinematicRotation({
//       x: currentQuat.x,
//       y: currentQuat.y,
//       z: currentQuat.z,
//       w: currentQuat.w,
//     });
//   }
// });
