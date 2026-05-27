import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Suspense, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
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
        child.material.transparent = true
        child.material.opacity = opacity
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
        opacity={isActive ? 1 : 0.2}
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
        opacity={isActive ? 1 : 0.2}
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
        opacity={isActive ? 1 : 0.2}
        isActive={isActive}
      />
    )
  }

  return null
}

function Strip({ index, setIndex, loadedModels }) {
  const ref = useRef()
  const spacing = 6

  useFrame(() => {
    if (!ref.current) return

    const targetX = -index * spacing
    ref.current.position.x +=
      (targetX - ref.current.position.x) * 0.08
  })

  return (
    <group ref={ref}>
      {projects.map((p, i) => {
        const isActive = i === index
        const shouldLoadModel = loadedModels.includes(i)

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
            {shouldLoadModel ? (
              <Suspense fallback={<LoadingModel />}>
                <ModelByType p={p} isActive={isActive} />
              </Suspense>
            ) : null}
          </group>
        )
      })}
    </group>
  )
}

function Camera() {
  const { camera } = useThree()

  useFrame(() => {
    camera.position.lerp(new THREE.Vector3(0, 0, 6), 0.05)
    camera.lookAt(0, 0, 0)
  })

  return null
}

export default function Hero({ index, setIndex }) {
  const [displayIndex, setDisplayIndex] = useState(index)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [loadedModels, setLoadedModels] = useState([index])

  const activeProject = projects[displayIndex]

  const backgroundColors = [
    'radial-gradient(circle at 60% 45%, rgba(255,120,0,0.10), #fff 55%)',
    'radial-gradient(circle at 60% 45%, rgba(0,150,255,0.10), #fff 55%)',
    'radial-gradient(circle at 60% 45%, rgba(120,255,180,0.10), #fff 55%)',
  ]

  useEffect(() => {
    setLoadedModels((prev) => {
      if (prev.includes(index)) return prev
      return [...prev, index]
    })
  }, [index])

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setLoadedModels((prev) => {
        if (prev.includes(1)) return prev
        return [...prev, 1]
      })
    }, 3000)

    const timer2 = setTimeout(() => {
      setLoadedModels((prev) => {
        if (prev.includes(2)) return prev
        return [...prev, 2]
      })
    }, 3000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  useEffect(() => {
    if (displayIndex === index) return

    setIsTransitioning(true)

    const timer = setTimeout(() => {
      setDisplayIndex(index)
      setIsTransitioning(false)
    }, 600)

    return () => clearTimeout(timer)
  }, [index, displayIndex])

  return (
    <section
      style={{
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: backgroundColors[displayIndex],
        transition: 'background 1s ease',
      }}
    >
      <Canvas dpr={1}>
        <ambientLight intensity={1.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />

        <Strip
          index={index}
          setIndex={setIndex}
          loadedModels={loadedModels}
        />

        <Camera />
      </Canvas>

      <div
        style={{
          position: 'absolute',
          top: '64px',
          left: '64px',
          zIndex: 30,
          maxWidth: '420px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#777',
            marginBottom: '18px',
          }}
        >
          Portfolio
        </div>

        <h1
          style={{
            fontSize: 'clamp(36px, 5vw, 72px)',
            lineHeight: 1,
            margin: 0,
            fontWeight: 600,
            color: '#111',
          }}
        >
          Alaa
          <br />
          Suliman
        </h1>

        <p
          style={{
            fontSize: '18px',
            lineHeight: 1.7,
            color: '#555',
            marginTop: '24px',
            marginBottom: '14px',
            maxWidth: '300px',
          }}
        >
          UX/UI Designer with a focus on UX research, user testing,
          3D, and interactive digital experiences.
        </p>

        <div style={{ marginTop: '32px' }}>
          <a
            href="mailto:3la2suliman12345@gmail.com"
            style={{
              padding: '12px 20px',
              borderRadius: '999px',
              border: '1px solid #ccc',
              background: '#fff',
              color: '#111',
              fontSize: '14px',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Contact
          </a>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: '60%',
          top: '72%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          textAlign: 'center',
          fontFamily: 'system-ui, sans-serif',
          pointerEvents: 'none',
          opacity: isTransitioning ? 0 : 1,
          transition: 'opacity 0.25s ease',
        }}
      >
        <div
          style={{
            fontSize: 'clamp(24px, 3vw, 42px)',
            fontWeight: 600,
            color: '#222',
            marginBottom: '14px',
          }}
        >
          {activeProject.title}
        </div>

        <div
          style={{
            width: 0,
            height: 0,
            margin: '0 auto',
            borderLeft: '13px solid transparent',
            borderRight: '13px solid transparent',
            borderTop: '13px solid #333',
          }}
        />
      </div>
    </section>
  )
}