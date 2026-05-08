'use client'

import React, { useRef, useEffect, ReactNode } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FallbackAvatar() {
  const headRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (headRef.current) {
      const target = new THREE.Vector3(state.mouse.x * 2, state.mouse.y * 2 + 1, 5)
      headRef.current.lookAt(target)
    }
  })

  return (
    <group position={[0, -1, 0]}>
      {/* Stylized Figure */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <capsuleGeometry args={[0.4, 1.2, 4, 16]} />
        <meshStandardMaterial color="#007AFF" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh ref={headRef} position={[0, 1.6, 0]} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#007AFF" roughness={0.3} metalness={0.8} />
        {/* Simple Eyes to show direction */}
        <mesh position={[0.1, 0.1, 0.25]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="white" />
        </mesh>
        <mesh position={[-0.1, 0.1, 0.25]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="white" />
        </mesh>
      </mesh>
      {/* Base */}
      <mesh position={[0, -0.6, 0]} receiveShadow>
        <cylinderGeometry args={[0.6, 0.6, 0.1, 32]} />
        <meshStandardMaterial color="#E8E8ED" />
      </mesh>
    </group>
  )
}

function AvatarModel() {
  const group = useRef<THREE.Group>(null)
  
  // Using unknown as intermediate for type conversion
  const { nodes, materials, animations } = useGLTF('https://models.readyplayer.me/6485843554d33f28740d1822.glb?morphTargets=ARKit,Oculus%20Visemes') as any
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    if (actions && actions['Armature|mixamo.com|Layer0']) {
      actions['Armature|mixamo.com|Layer0'].play()
    }
  }, [actions])

  useFrame((state) => {
    if (group.current) {
      const target = new THREE.Vector3(state.mouse.x * 2, state.mouse.y * 2 + 1, 2)
      group.current.getObjectByName('Head')?.lookAt(target)
    }
  })

  return (
    <group ref={group} dispose={null} position={[0, -2, 0]} scale={2}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        name="Wolf3D_Avatar"
        geometry={nodes.Wolf3D_Avatar.geometry}
        material={materials.Wolf3D_Avatar}
        skeleton={nodes.Wolf3D_Avatar.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Avatar.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Avatar.morphTargetInfluences}
      />
    </group>
  )
}

class AvatarErrorBoundary extends React.Component<{ children: ReactNode, fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode, fallback: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.error("Avatar loading error:", error)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

export default function Avatar() {
  return (
    <AvatarErrorBoundary fallback={<FallbackAvatar />}>
      <AvatarModel />
    </AvatarErrorBoundary>
  )
}

try {
  useGLTF.preload('https://models.readyplayer.me/6485843554d33f28740d1822.glb?morphTargets=ARKit,Oculus%20Visemes')
} catch {
  // Ignore preload errors
}
