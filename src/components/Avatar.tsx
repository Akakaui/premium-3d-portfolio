'use client'

import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * A local, stable 3D Avatar built with Three.js primitives.
 * This avoids external network dependencies and prevents
 * net::ERR_NAME_NOT_RESOLVED errors in the browser console.
 */
export default function Avatar() {
  const headRef = useRef<THREE.Mesh>(null)
  const bodyRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const { mouse, clock } = state

    // Smooth head movement following the mouse
    if (headRef.current) {
      const target = new THREE.Vector3(mouse.x * 2, mouse.y * 2 + 1, 5)
      headRef.current.lookAt(target)
    }

    // Subtle breathing/floating animation for the body
    if (bodyRef.current) {
      bodyRef.current.position.y = -1 + Math.sin(clock.getElapsedTime() * 0.5) * 0.05
    }
  })

  return (
    <group ref={bodyRef} position={[0, -1, 0]}>
      {/* Stylized Figure Body */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <capsuleGeometry args={[0.4, 1.2, 4, 16]} />
        <meshStandardMaterial color="#007AFF" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Head with Interactive LookAt */}
      <mesh ref={headRef} position={[0, 1.6, 0]} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#007AFF" roughness={0.3} metalness={0.8} />

        {/* Eyes to provide visual feedback on direction */}
        <mesh position={[0.1, 0.1, 0.25]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="white" />
        </mesh>
        <mesh position={[-0.1, 0.1, 0.25]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="white" />
        </mesh>
      </mesh>

      {/* Stylized Base/Pedestal */}
      <mesh position={[0, -0.6, 0]} receiveShadow>
        <cylinderGeometry args={[0.6, 0.6, 0.1, 32]} />
        <meshStandardMaterial color="#E8E8ED" />
      </mesh>
    </group>
  )
}
