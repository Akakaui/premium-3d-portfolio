'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera, ContactShadows, Grid } from '@react-three/drei'
import { Suspense } from 'react'
import { Physics } from '@react-three/rapier'
import { useBlueprint } from '@/hooks/useBlueprint'
import PhysicsPlayground from './PhysicsPlayground'

export default function Scene() {
  const { isBlueprint } = useBlueprint()

  return (
    <div className="fixed inset-0 pointer-events-none">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
        <Suspense fallback={null}>
          <ambientLight intensity={isBlueprint ? 0.2 : 0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          <Physics gravity={[0, -9.81, 0]} debug={isBlueprint}>
            <PhysicsPlayground />
          </Physics>

          {/* Blueprint Grid */}
          {isBlueprint && (
            <Grid 
              infiniteGrid 
              fadeDistance={50} 
              fadeStrength={5} 
              cellSize={0.5} 
              sectionSize={2.5} 
              sectionColor="#007AFF" 
              cellColor="#D2D2D7" 
            />
          )}

          {!isBlueprint && (
            <ContactShadows 
              position={[0, -2, 0]} 
              opacity={0.4} 
              scale={15} 
              blur={2.5} 
              far={4.5} 
            />
          )}
          
          <Environment preset={isBlueprint ? "night" : "city"} />
        </Suspense>
        <OrbitControls 
          enablePan={false} 
          enableZoom={false} 
          minPolarAngle={Math.PI / 2.5} 
          maxPolarAngle={Math.PI / 2} 
        />
      </Canvas>
    </div>
  )
}
