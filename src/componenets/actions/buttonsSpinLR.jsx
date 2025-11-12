import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";
import { useEffect, useState } from "react";

export function ButtonsSpinLR({spinRef, setInteractionMode}){

  const [interactionMode, setLocalInteractionMode] = useState(false);
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === "KeyE") {
        setLocalInteractionMode((prev) => !prev);
        setInteractionMode?.((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [setInteractionMode]);
  useEffect(() => {
    if (interactionMode) document.exitPointerLock?.();
  }, [interactionMode]);

  const rotateStepLeft = () => {
    if (spinRef.current) {
      const curRot = spinRef.current.rotation();
      const currentQuat = new THREE.Quaternion(curRot.x, curRot.y, curRot.z, curRot.w);
      const incrementQuat = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        -Math.PI / 12 // 30
      );
      currentQuat.multiply(incrementQuat);
      spinRef.current.setNextKinematicRotation({ x: currentQuat.x, y: currentQuat.y, z: currentQuat.z, w: currentQuat.w });
    }
  }
  const rotateStepRight = () => {
    if (spinRef.current) {
      const curRot = spinRef.current.rotation();
      const currentQuat = new THREE.Quaternion(curRot.x, curRot.y, curRot.z, curRot.w);
      const incrementQuat = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        Math.PI / 12 // 30
      );
      currentQuat.multiply(incrementQuat);
      spinRef.current.setNextKinematicRotation({ x: currentQuat.x, y: currentQuat.y, z: currentQuat.z, w: currentQuat.w});
    }
  }
  return(
    <>
      {/* button left green */}
      <RigidBody 
        type="fixed" 
        position={[0.3, 0, 1]}
        onClick ={(e) => {
          if (!interactionMode) return;
          e.stopPropagation(); // stop other listeners (like Ecctrl) from handling this click and requesting pointer lock
          console.log('Clicked green button');
          rotateStepLeft();
        }}
      >
        <mesh>
          <boxGeometry args={[0.2, 0.2, 0.02]} />
          <meshStandardMaterial color={'green'} />
        </mesh>
      </RigidBody>
      {/* button right red*/}
      <RigidBody 
        type="fixed"
        position={[-0.3, 0, 1]}
        onClick ={(e) => {
          if (!interactionMode) return;
          e.stopPropagation(); // stop other listeners (like Ecctrl) from handling this click and requesting pointer lock
          console.log('Clicked red button');
          rotateStepRight();
        }}
      >
        <mesh>
          <boxGeometry args={[0.2, 0.2, 0.02]} />
          <meshStandardMaterial color={'red'} />
        </mesh>
      </RigidBody>
    </>
  )
}