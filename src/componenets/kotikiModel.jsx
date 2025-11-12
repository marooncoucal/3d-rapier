import * as THREE from "three";
import { Html } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CuboidCollider, quat, RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { ButtonsSpinLR } from "./actions/buttonsSpinLR";

export function KotikiModel({
  position = [0, 0, 0],
  setInteractionMode,
  reference,
}) {
  const kotiki2 = useGLTF("/kotitki.glb");
  const spin = useRef();
  const [areaEnterFlag, setAreaEnterFlag] = useState(false)
  return (
    <RigidBody position={position} type='fixed'>
        <RigidBody type='fixed' position={[0,0,0]}>
            <CuboidCollider 
                sensor
                args={[3, 3, 3]}
                onIntersectionEnter={() => {
                    console.log('player entered sensor area Kotiki');
                    setAreaEnterFlag(true);
                }}
                onIntersectionExit={() => {
                    console.log("player left sensor area Kotiki");
                    setAreaEnterFlag(false);
                }}
            />
        </RigidBody>
        <RigidBody
            type="kinematicPosition"
            // ref={reference}
            // ref={spinner} // continuous rotation
            ref={spin}
            scale={0.1}
            position={[0,0,4]}
        >
            <primitive object={kotiki2.scene} />
        </RigidBody>
        { areaEnterFlag &&
            <>
                <ButtonsSpinLR spinRef={spin} setInteractionMode={setInteractionMode}/>
                <Html fullscreen>
                    <div
                        style={{
                        position: "fixed",
                        width: "max-content",
                        bottom: "20px",
                        left: 0,
                        right: 0,
                        transform: "translateX(-50%)",
                        backgroundColor: "rgba(0,0,0,0.7)",
                        color: "white",
                        padding: "10px 20px",
                        zIndex: 1000,
                        fontSize: "16px",
                        pointerEvents: "none",
                        userSelect: "none",
                        }}
                    >
                        press E to interact
                    </div>
                </Html>
            </>
        }
    </RigidBody>
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
