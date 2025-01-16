import { useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei'
import { Button } from '@/components/ui/button'
import { Play, Pause } from 'lucide-react'

// Use the correct type for the ref
// import { OrbitControls as OrbitControlsType } from '@react-three/drei'

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}

export default function ProductViewer({ productUrl = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb' }) {
  const [autoRotate, setAutoRotate] = useState(true)
  
  // Update the ref to use the correct type for OrbitControls
  const controlsRef = useRef<null>(null)

  return (
    <div className="w-full h-[600px] bg-gray-100 rounded-lg overflow-hidden relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Model url={productUrl} />
        <OrbitControls
          ref={controlsRef}
          autoRotate={autoRotate}
          autoRotateSpeed={1}
          enableZoom={true}
          enablePan={false}
        />
        <Environment preset="studio" />
        <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={5} blur={2.5} far={4} />
      </Canvas>
      <div className="absolute bottom-4 left-4">
        <Button
          onClick={() => setAutoRotate(!autoRotate)}
          variant="secondary"
          size="icon"
          className="rounded-full"
        >
          {autoRotate ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
