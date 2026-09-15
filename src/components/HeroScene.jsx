import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Suspense, useEffect, useRef } from 'react'
import { projects } from '../data/projects'

function LoadingModel() {
  const ref = useRef()

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.getElapsedTime() * 0.8
  })

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="#ddd" wireframe />
      </mesh>
    </group>
  )
}

function ProjectModel({
  path,
  scale = 0.1,
  opacity = 1,
  position = [0, 0, 0],
  rotationOffset = [0, 0, 0],
  isActive = false,
}) {
  const { scene } = useGLTF(path)

  const modelRef = useRef()
  const isDragging = useRef(false)
  const lastPointer = useRef({ x: 0, y: 0 })

  const rotation = useRef({
    x: 0.4,
    y: -0.45,
    z: 0,
  })

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        const materials = Array.isArray(child.material) ? child.material : [child.material]
        materials.forEach((material) => {
          material.transparent = opacity < 1
          material.opacity = opacity
        })
      }
    })
  }, [scene, opacity])

  useFrame(({ clock }) => {
    if (!modelRef.current) return

    const t = clock.getElapsedTime()
    const idleShake = isActive ? Math.sin(t * 0.8) * 0.15 : 0

    modelRef.current.rotation.x = rotation.current.x + rotationOffset[0]
    modelRef.current.rotation.y =
      rotation.current.y + rotationOffset[1] + idleShake
    modelRef.current.rotation.z = rotation.current.z + rotationOffset[2]
  })

  const handlePointerDown = (e) => {
    e.stopPropagation()
    isDragging.current = true

    lastPointer.current = {
      x: e.clientX,
      y: e.clientY,
    }

    e.target.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e) => {
    if (!isDragging.current) return

    const deltaX = e.clientX - lastPointer.current.x
    const deltaY = e.clientY - lastPointer.current.y

    lastPointer.current = {
      x: e.clientX,
      y: e.clientY,
    }

    rotation.current.y += deltaX * 0.005
    rotation.current.x += deltaY * 0.005
    rotation.current.z += (deltaX + deltaY) * 0.001
  }

  const handlePointerUp = (e) => {
    e.stopPropagation()
    isDragging.current = false
    e.target.releasePointerCapture(e.pointerId)
  }

  return (
    <group
      ref={modelRef}
      scale={scale}
      position={position}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <primitive object={scene} />
    </group>
  )
}

function ModelByType({ p, isActive }) {
  if (p.type === 'box') {
    return (
      <ProjectModel
        path="/models/project1.glb"
        scale={0.1}
        position={[0, 0, 0]}
        rotationOffset={[0, 0, 0]}
        opacity={isActive ? 1 : 0.25}
        isActive={isActive}
      />
    )
  }

  if (p.type === 'sphere') {
    return (
      <ProjectModel
        path="/models/project2.glb"
        scale={1}
        position={[0, 0.4, 0]}
        rotationOffset={[-0.1, 0, 0]}
        opacity={isActive ? 1 : 0.25}
        isActive={isActive}
      />
    )
  }

  if (p.type === 'cone') {
    return (
      <ProjectModel
        path="/models/project3.glb"
        scale={1}
        position={[0, 0.4, 0]}
        rotationOffset={[-0.1, 1, 0]}
        opacity={isActive ? 1 : 0.25}
        isActive={isActive}
      />
    )
  }

  return null
}

function Strip({ index, setIndex }) {
  const ref = useRef()
  const spacing = 6

  useFrame((_, delta) => {
    if (!ref.current) return

    const targetX = -index * spacing
    ref.current.position.x +=
      (targetX - ref.current.position.x) * (1 - Math.exp(-5 * delta))
  })

  return (
    <group ref={ref}>
      {projects.map((p, i) => {
        const isActive = i === index

        return (
          <group
            key={i}
            position={[i * spacing + 1.8, 0, 0]}
            scale={isActive ? 1.6 : 0.9}
            onClick={(e) => {
              e.stopPropagation()
              setIndex(i)
            }}
            onPointerOver={() => {
              document.body.style.cursor = 'pointer'
            }}
            onPointerOut={() => {
              document.body.style.cursor = 'default'
            }}
          >
            <Suspense fallback={<LoadingModel />}>
              <ModelByType p={p} isActive={isActive} />
            </Suspense>
          </group>
        )
      })}
    </group>
  )
}

export default function HeroScene({ index, setIndex, visible }) {
  return (
    <Canvas dpr={1} camera={{ position: [0, 0, 6] }} frameloop={visible ? 'always' : 'never'}>
      <ambientLight intensity={1.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <Strip index={index} setIndex={setIndex} />
    </Canvas>
  )
}
