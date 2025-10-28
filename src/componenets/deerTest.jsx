import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function DeerModelTest1(props) {
  const { nodes, materials } = useGLTF('/deer_motion_VladaDD21.gltf')
  return (
    <group {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, -Math.PI / 2]}>
        <group rotation={[0, 0, Math.PI / 2]}>
          <group position={[0, -6.071, 4.808]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.tail.geometry}
              material={materials['Mat.1']}
              position={[1, -8.778, -4.246]}
              rotation={[0, 0, -Math.PI / 2]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.backmidleg.geometry}
              material={materials.Mat}
              position={[1.973, -9.364, 4.849]}
              rotation={[0, 0, -Math.PI / 2]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.backleg.geometry}
              material={materials['Mat.1']}
              position={[1.392, -7.946, 1.192]}
              rotation={[0, 0, -Math.PI / 2]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.hip.geometry}
              material={materials.Mat}
              position={[1, -7.235, -2.507]}
              rotation={[0, 0, -Math.PI / 2]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.body.geometry}
              material={materials['Mat.1']}
              position={[1, -1.429, -1.624]}
              rotation={[0, 0, -Math.PI / 2]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.frontleg.geometry}
              material={materials.Mat}
              position={[2.152, 0.554, 12.706]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.frontmidleg.geometry}
              material={materials['Mat.1']}
              position={[1.434, -0.119, 4.612]}
              rotation={[0, 0, -Math.PI / 2]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.shoulder.geometry}
              material={materials.Mat}
              position={[1.13, 0.112, -4.257]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.neck_fluff.geometry}
              material={materials['Mat.1']}
              position={[1.056, 4.278, -2.88]}
              rotation={[0, 0, -Math.PI / 2]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.head.geometry}
              material={materials.Mat}
              position={[-0.111, 6.691, -5.039]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
          </group>
        </group>
        <group position={[-0.62, 0, -1.899]} rotation={[-Math.PI / 2, -Math.PI / 2, 0]}>
          <group position={[0, -1.899, -0.62]} rotation={[Math.PI / 2, 0, -Math.PI / 2]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.horn_left2.geometry}
              material={materials['Mat.2']}
              position={[3.963, 4.026, -2.891]}
              rotation={[-1.85, -0.688, -0.728]}
              scale={0.6}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.horn_left1.geometry}
              material={materials['Mat.2']}
              position={[2.004, 2.403, -2.588]}
              rotation={[-2.555, -0.815, -0.455]}
              scale={0.5}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.horn_left.geometry}
              material={materials['Mat.2']}
              position={[-0.62, 0.835, -1.978]}
              rotation={[-0.861, -1.57, 0]}
            />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/deer_motion_VladaDD21.gltf')