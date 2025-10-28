import * as THREE from "three";
import { useFBX, useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber";
import { quat, RigidBody } from "@react-three/rapier"
import { useRef } from "react";

export function KotikiModel({position = [0,0,0]}) {
    // const kotiki = useFBX("/kotiki_res2k.fbx");
    const kotiki2 = useGLTF("/kotitki.glb");
    const spinner = useRef();

    // 5:41 https://youtu.be/OpYtwrtpePY?si=UPK2dpHICZ4at2YO
    // quaternion euler
    useFrame((_state, delta) => {
    const curRotation = quat(spinner.current.rotation()); // quat - convert rapier value to three.js
    const incrementRotation = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),delta*1);
    curRotation.multiply(incrementRotation);
    spinner.current.setNextKinematicRotation(curRotation);
    })

    return (
        <RigidBody
            type="kinematicPosition"
            ref={spinner}
            scale={0.1}
            position={position}
        >
            <primitive object={kotiki2.scene} />
        </RigidBody>
    )
}