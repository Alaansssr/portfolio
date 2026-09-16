import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react'
import { projects } from '../data/projects'

const HeroScene = lazy(() => import('./HeroScene'))

export default function Hero({ index, setIndex, onOpenProject }) {
  const [sceneReady, setSceneReady] = useState(false)
  const handleSceneReady = useCallback(() => setSceneReady(true), [])
  const heroRef = useRef(null)
  const [visible, setVisible] = useState(true)
  const [displayIndex, setDisplayIndex] = useState(index)
  const activeProject = projects[displayIndex]

  useEffect(() => {
    const timer = setTimeout(() => setDisplayIndex(index), 300)
    return () => clearTimeout(timer)
  }, [index])

  useEffect(() => {
    let intersects = true
    const updateVisibility = () => setVisible(intersects && !document.hidden)
    const observer = new IntersectionObserver(([entry]) => {
      intersects = entry.isIntersecting
      updateVisibility()
    })
    observer.observe(heroRef.current)
    document.addEventListener('visibilitychange', updateVisibility)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', updateVisibility)
    }
  }, [])

  const backgroundColors = [
    'radial-gradient(circle at 60% 45%, rgba(255,120,0,0.10), #fff 55%)',
    'radial-gradient(circle at 60% 45%, rgba(0,150,255,0.10), #fff 55%)',
    'radial-gradient(circle at 60% 45%, rgba(120,255,180,0.10), #fff 55%)',
  ]

  const handleOpenProject = () => {
    if (onOpenProject) {
      onOpenProject(true)
    }

    setTimeout(() => {
      const projectSection = document.getElementById('project-content')
      if (projectSection) {
        projectSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  return (
    <section
      ref={heroRef}
      style={{
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: backgroundColors[displayIndex],
        transition: 'background 1s ease',
      }}
    >
      {!sceneReady && (
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <img src="/images/hero-models-v2.webp" alt="" fetchPriority="high" width="1920" height="1080"
            style={{ position: 'absolute', height: '100%', width: 'auto', maxWidth: 'none', left: '50%', transform: 'translateX(-50%)' }} />
        </div>
      )}
      <div style={{ height: '100%', opacity: sceneReady ? 1 : 0 }}>
        <Suspense fallback={null}>
          <HeroScene index={index} setIndex={setIndex} visible={visible} onReady={handleSceneReady} />
        </Suspense>
      </div>

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
            maxWidth: '330px',
          }}
        >
          Interactive and digital designer focused on visual storytelling,
          immersive web experiences, and creative digital interaction.
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
          opacity: displayIndex === index ? 1 : 0,
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

        <button
          onClick={handleOpenProject}
          style={{
            padding: '12px 22px',
            borderRadius: '999px',
            border: '1px solid #222',
            background: '#111',
            color: '#fff',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Open Project
        </button>
      </div>
    </section>
  )
}