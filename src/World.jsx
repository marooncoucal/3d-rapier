import { extend, useFrame, useThree } from "@react-three/fiber";
import { Grid, KeyboardControls, useFBX, useGLTF } from "@react-three/drei";
import { Physics, quat, RigidBody } from "@react-three/rapier";
import { Suspense, useEffect, useRef, useState } from "react";
import Ecctrl from "ecctrl";
import * as THREE from "three";
import { Arch1 } from "./componenets/testCube";
import { DeerModelTest1 } from "./componenets/deerTest";
import { KotikiModel } from "./componenets/kotikiModel";

// where animations - import with animations - click to turn on
// animation mixer

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
  { name: "rightward", keys: ["ArrowRight", "KeyD"] },
  { name: "jump", keys: ["Space"] },
  { name: "run", keys: ["Shift"] },
  // Optional animation key map
  { name: "action1", keys: ["1"] },
  { name: "action2", keys: ["2"] },
  { name: "action3", keys: ["3"] },
  { name: "action4", keys: ["KeyF"] },
  // 1) cursor smhw appears - onClick squares
  // 2) press E - keys < >
  { name: "InteractionEnable", keys: ["KeyE"] },
  { name: "toggleLeft", keys: ["KeyJ"] },
  { name: "toggleRight", keys: ["KeyL"] },
];


function Box({ color = "white", ...props }) {
  return (
    <mesh receiveShadow castShadow {...props}>
      <boxGeometry />
      <meshStandardMaterial
        color={color}
        opacity={props.onClickEvent ? 1 : 0.8}
        transparent
      />
    </mesh>
  );
}

export default function World({ setInteractionMode }) {
  const slopes = useGLTF("./slopes.glb");
  const shape = useGLTF("./shape.glb");
  const ladder = useGLTF("./ladder.glb");

  // const [interactionMode, setLocalInteractionMode] = useState(false);
  // useEffect(() => {
  //   const handleKey = (e) => {
  //     if (e.code === 'KeyE') {
  //       setLocalInteractionMode((prev) => !prev);
  //       setInteractionMode?.((prev) => !prev);
  //     }
  //   };
  //   window.addEventListener('keydown', handleKey);
  //   return () => window.removeEventListener('keydown', handleKey);
  // }, [setInteractionMode]);
  // useEffect(() => {
  //   if (interactionMode) document.exitPointerLock?.();
  // }, [interactionMode]);

  const [hover, setHover] = useState(false);
  const bumpCube = useRef();
  const bumpImpulse = () => {
    bumpCube.current.applyImpulse({ x: 0, y: 5, z: 0 });
  };
  // https://rapier.rs/javascript3d/classes/RigidBody.html#applyImpulse
  // const [scaleTest, setScaleTest] = useState(false) // works

  return (
    <>
      <Suspense>
        <Grid args={[300, 300]} sectionColor={"lightgray"} cellColor={"gray"} position={[0, -0.99, 0]} userData={{ camExcludeCollision: true }}
        />
        <Physics gravity={[0, -9.81, 0]}>
          <KeyboardControls map={keyboardMap}>
            <Ecctrl
              camCollision={false}
              camInitDis={-0.01}
              camMinDis={-0.01}
              camFollowMult={1000}
              camLerpMult={1000}
              maxVelLimit={5}
              turnVelMultiplier={1}
              turnSpeed={100}
              mode="CameraBasedMovement"
            ></Ecctrl>
          </KeyboardControls>
          {/* floor */}
          <RigidBody type="fixed">
            <mesh receiveShadow position={[0, -3.5, 0]}>
              <boxGeometry args={[300, 5, 300]} />
              <meshStandardMaterial color="lightblue" />
            </mesh>
          </RigidBody>
          {/* lights */}
          <directionalLight
            castShadow
            shadow-normalBias={0.06}
            position={[-30, 20, 10]}
            intensity={4}
            shadow-mapSize={[1024, 1024]}
            shadow-camera-near={1}
            shadow-camera-far={50}
            name="followLight"
          >
            <orthographicCamera
              attach="shadow-camera"
              args={[-10, 10, 10, -10]}
            />
          </directionalLight>
          <ambientLight intensity={0.5} />

          <KotikiModel setInteractionMode={setInteractionMode} position={[0, 0, 4]}/>


          {/* interaction blue cube */}
          {/* <RigidBody
            colliders="cuboid"
            position={[-3, -3, 9]}
            type="dynamic"
            ref={bumpCube}
            restitution={0.8}
          >
            <Box
              type="dynamic"
              onPointerEnter={() => setHover(true)}
              onPointerLeave={() => setHover(false)}
              color={hover ? "green" : "blue"}
              onClick={() => {
                if (!interactionMode) return;
                console.log(bumpCube.current);
                bumpImpulse() && console.log("clicked");
              }}
            />
          </RigidBody> */}

          {/* riggied pink floor boards */}
          {/* <RigidBody position={[-10, -0.9, 20]}>
            <RigidBody type="fixed" position={[0, -0.9, 5]}>
              <mesh receiveShadow>
                <boxGeometry args={[4, 0.2, 0.2]} />
                <meshStandardMaterial color={"lightpink"} />
              </mesh>
            </RigidBody>
            <RigidBody type="fixed" position={[0, -0.9, 6]}>
              <mesh receiveShadow>
                <boxGeometry args={[4, 0.2, 0.2]} />
                <meshStandardMaterial color={"lightpink"} />
              </mesh>
            </RigidBody>
            <RigidBody type="fixed" position={[0, -0.9, 7]}>
              <mesh receiveShadow>
                <boxGeometry args={[4, 0.2, 0.2]} />
                <meshStandardMaterial color={"lightpink"} />
              </mesh>
            </RigidBody>
            <RigidBody type="fixed" position={[0, -0.9, 8]}>
              <mesh receiveShadow>
                <boxGeometry args={[4, 0.2, 0.2]} />
                <meshStandardMaterial color={"lightpink"} />
              </mesh>
            </RigidBody>
            <RigidBody type="fixed" position={[0, -0.9, 11]}>
              <mesh receiveShadow>
                <boxGeometry args={[4, 0.2, 4]} />
                <meshStandardMaterial color={"lightpink"} />
              </mesh>
            </RigidBody>
          </RigidBody> */}
          {/* slopes */}
          {/* <RigidBody position={[-10, -1, 10]}
            type="fixed"
            colliders="trimesh"
            rotation={[0, Math.PI, 0]}
          >
            <primitive object={slopes.scene} />
          </RigidBody> */}

          {/* our red mesh */}
          {/* <RigidBody type="dynamic" colliders="trimesh" position={[-4, 0, 15]}>
            <primitive object={shape.scene} />
          </RigidBody> */}
          {/* ladder */}
          {/* <RigidBody position={[-4, 0, 15]}>
            <primitive object={ladder.scene}></primitive>
          </RigidBody> */}
          {/* <Arch1 /> */}
          {/* deer */}
          {/* <RigidBody
            colliders="cuboid"
            type="dynamic"
            position={[-10, 5, 10]}
            scale={0.1}
            rotation={[0, Math.PI / 3, 0]}
          >
            <DeerModelTest1 />
          </RigidBody> */}

        </Physics>
      </Suspense>
    </>
  );
}
