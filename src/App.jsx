import { Canvas } from "@react-three/fiber"
import World from "./World"
import { Bvh } from "@react-three/drei"
import { EcctrlJoystick } from "ecctrl"
import { useEffect, useState } from "react"

function App() {
  return (
    <>
    <EcctrlJoystickControls />
      <Canvas
        shadows
        camera={{
        fov: 65,
        near: 0.1,
        far: 1000,
      }}
      onPointerDown={(e) => {
        if (e.pointerType === 'mouse') {
          e.target.requestPointerLock()
        }
      }}>
        <Bvh firstHitOnly>
            <World/>
        </Bvh>
      </Canvas>
    </>
  )
}

const EcctrlJoystickControls = () => {
  const [isTouchScreen, setIsTouchScreen] = useState(false)
  useEffect(() => {
    // Check if using a touch control device, show/hide joystick
    if (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0)) {
      setIsTouchScreen(true)
    } else {
      setIsTouchScreen(false)
    }
  }, [])
  return (
    <>
      {isTouchScreen && <EcctrlJoystick buttonNumber={1} />}
    </>
  )
}

export default App
