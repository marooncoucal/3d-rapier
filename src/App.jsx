import { Canvas } from "@react-three/fiber"
import World from "./World"
import { Bvh } from "@react-three/drei"
import { EcctrlJoystick } from "ecctrl"
import { useEffect, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"

function App() {
  // trying keyE interaction mode
  const [interactionMode, setInteractionMode] = useState(false);
  return (
    <>
    <ErrorBoundary fallback={
        <div style={{
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          height:"100vh",
          width:"100vw"
        }}>
          Smth wrong error boundary
        </div>
      }>
      <EcctrlJoystickControls />
      <Canvas
        shadows
        camera={{
        fov: 65,
        near: 0.1,
        far: 1000,
      }}
      onPointerDown={(e) => {
        if (e.pointerType === 'mouse' && !interactionMode) {
          e.target.requestPointerLock()
        }
      }}>
        <Bvh firstHitOnly>
            <World setInteractionMode={setInteractionMode}/>
        </Bvh>
      </Canvas>
      </ErrorBoundary>
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