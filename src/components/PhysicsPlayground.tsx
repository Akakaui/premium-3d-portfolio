'use client'

import { RigidBody, CuboidCollider, RapierRigidBody } from '@react-three/rapier'
import { useRef } from 'react'
import { Text, Float } from '@react-three/drei'
import projects from '@/data/projects.json'

interface ProjectBlockProps {
  position: [number, number, number]
  title: string
  color?: string
}

function ProjectBlock({ position, title, color = "#007AFF" }: ProjectBlockProps) {
  const rigidBodyRef = useRef<RapierRigidBody>(null)

  const handlePointerDown = () => {
    if (rigidBodyRef.current) {
      rigidBodyRef.current.applyImpulse({ x: 0, y: 5, z: 0 }, true)
      rigidBodyRef.current.applyTorqueImpulse({ 
        x: Math.random() * 2, 
        y: Math.random() * 2, 
        z: Math.random() * 2 
      }, true)
    }
  }

  return (
    <RigidBody 
      ref={rigidBodyRef} 
      position={position} 
      colliders="cuboid" 
      restitution={0.5} 
      friction={1}
    >
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh 
          castShadow 
          onPointerDown={(e) => {
            e.stopPropagation()
            handlePointerDown()
          }}
        >
          <boxGeometry args={[1, 0.6, 1]} />
          <meshStandardMaterial color={color} />
          <Text
            position={[0, 0, 0.51]}
            fontSize={0.1}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {title}
          </Text>
        </mesh>
      </Float>
    </RigidBody>
  )
}

export default function PhysicsPlayground() {
  const floorPosition: [number, number, number] = [0, -2, 0]

  return (
    <group>
      {/* Invisible Floor for Physics */}
      <RigidBody type="fixed" position={floorPosition}>
        <CuboidCollider args={[10, 0.1, 10]} />
      </RigidBody>

      {/* Project Blocks */}
      {projects.map((project, index) => (
        <ProjectBlock 
          key={project.id}
          position={[index * 1.5 - 1.5, 2 + index, 0]}
          title={project.title}
          color={index === 0 ? "#007AFF" : "#F5F5F7"}
        />
      ))}

      {/* Constraints to keep things in view */}
      <RigidBody type="fixed" position={[-5, 0, 0]}>
        <CuboidCollider args={[0.1, 10, 10]} />
      </RigidBody>
      <RigidBody type="fixed" position={[5, 0, 0]}>
        <CuboidCollider args={[0.1, 10, 10]} />
      </RigidBody>
      <RigidBody type="fixed" position={[0, 0, -5]}>
        <CuboidCollider args={[10, 10, 0.1]} />
      </RigidBody>
      <RigidBody type="fixed" position={[0, 0, 5]}>
        <CuboidCollider args={[10, 10, 0.1]} />
      </RigidBody>
    </group>
  )
}
