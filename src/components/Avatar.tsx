'use client'

import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Avatar() {
  const group = useRef<THREE.Group>(null)
  
  // High-quality sample Ready Player Me avatar
  const { nodes, materials, animations } = useGLTF('https://models.readyplayer.me/6485843554d33f28740d1822.glb?morphTargets=ARKit,Oculus%20Visemes') as any
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    // Play idle animation if available
    if (actions && actions['Armature|mixamo.com|Layer0']) {
      actions['Armature|mixamo.com|Layer0'].play()
    }
  }, [actions])

  useFrame((state) => {
    if (group.current) {
      // Basic cursor tracking for the head (mental model: looking towards mouse)
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

useGLTF.preload('https://models.readyplayer.me/6485843554d33f28740d1822.glb?morphTargets=ARKit,Oculus%20Visemes')
