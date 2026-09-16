import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'
import { Suspense, useEffect, useRef } from 'react'
import { MeshBVH, acceleratedRaycast } from 'three-mesh-bvh'
import { projects } from '../data/projects'

const modelPaths = ['/models/project1-v2.glb', '/models/project2-v2.glb', '/models/project3-v2.glb']
const configureLoader = (loader) => loader.setMeshoptDecoder(MeshoptDecoder)

function SceneReady({ onReady }) {
  const { gl, scene, camera, invalidate } = useThree()
  useEffect(() => {
    let cancelled = false
    let frame = 0
    // Upload textures and compile shaders behind the matching static render.
    gl.compileAsync(scene, camera).then(() => {
      if (cancelled) return
      invalidate()
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => {
          if (!cancelled) onReady()
        })
      })
    })
    return () => { cancelled = true; cancelAnimationFrame(frame) }
  }, [gl, scene, camera, invalidate, onReady])
  return null
}

function ProjectModel({
  scene,
  scale = 0.1,
  opacity = 1,
  position = [0, 0, 0],
  rotationOffset = [0, 0, 0],
  isActive = false,
}) {

  useEffect(() => {
    scene.traverse((child) => {
      if (!child.isMesh) return
      if (!child.geometry.boundsTree) child.geometry.boundsTree = new MeshBVH(child.geometry)
      child.raycast = acceleratedRaycast
    })
  }, [scene])

  const modelRef = useRef()
  const isDragging = useRef(false)
  const animationStart = useRef(null)
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

    if (animationStart.current === null) animationStart.current = clock.getElapsedTime()
    const t = clock.getElapsedTime() - animationStart.current
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

function ModelByType({ p, isActive, scene }) {
  if (p.type === 'box') {
    return (
      <ProjectModel
        scene={scene}
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
        scene={scene}
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
        scene={scene}
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

function Strip({ index, setIndex, onReady }) {
  const models = useLoader(GLTFLoader, modelPaths, configureLoader)
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
              if (e.delta > 4) return
              setIndex(i)
            }}
            onPointerOver={() => {
              document.body.style.cursor = 'pointer'
            }}
            onPointerOut={() => {
              document.body.style.cursor = 'default'
            }}
          >
            <ModelByType p={p} isActive={isActive} scene={models[i].scene} />
          </group>
        )
      })}
      <SceneReady onReady={onReady} />
    </group>
  )
}

export default function HeroScene({ index, setIndex, visible, onReady }) {
  return (
    <Canvas dpr={1} camera={{ position: [0, 0, 6] }} frameloop={visible ? 'always' : 'never'} raycaster={{ firstHitOnly: true }}>
      <ambientLight intensity={1.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <Suspense fallback={null}>
        <Strip index={index} setIndex={setIndex} onReady={onReady} />
      </Suspense>
    </Canvas>
  )
}
