import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react'
import { projects } from '../data/projects'
import './Hero.css'

const HeroScene = lazy(() => import('./HeroScene'))

export default function Hero({ index, setIndex }) {
  const [compact, setCompact] = useState(() => window.matchMedia('(max-width: 900px)').matches)
  useEffect(() => {
    const query = window.matchMedia('(max-width: 900px)')
    const update = () => setCompact(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
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

  return (
    <section
      ref={heroRef}
      className="portfolio-hero"
      style={{
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: backgroundColors[displayIndex],
        transition: 'background 1s ease',
      }}
    >
      <div className="hero-stage">
      {!sceneReady && (
        <div className="hero-placeholder" aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <img src="/images/hero-models-v2.webp" alt="" fetchPriority="high" width="1920" height="1080"
            style={{ position: 'absolute', height: '100%', width: 'auto', maxWidth: 'none', left: '50%', transform: 'translateX(-50%)' }} />
        </div>
      )}
      <div style={{ height: '100%', opacity: sceneReady ? 1 : 0 }}>
        <Suspense fallback={null}>
          <HeroScene compact={compact} index={index} setIndex={setIndex} visible={visible} onReady={handleSceneReady} />
        </Suspense>
      </div>
      </div>

      <div
        className="hero-intro"
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
          Alaa{' '}
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
          Interaction designer exploring new ways for people to connect through
          digital, physical and spatial experiences.
        </p>

        <div className="hero-contact" style={{ marginTop: '32px' }}>
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
        className="hero-project"
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
        <nav className="hero-mobile-nav" aria-label="Choose a project">
          <button type="button" aria-label="Previous project" onClick={() => setIndex((index + projects.length - 1) % projects.length)}>←</button>
          <span aria-live="polite">{activeProject.title}</span>
          <button type="button" aria-label="Next project" onClick={() => setIndex((index + 1) % projects.length)}>→</button>
        </nav>
        <div
          className="hero-desktop-title"
          style={{
            fontSize: 'clamp(24px, 3vw, 42px)',
            fontWeight: 600,
            color: '#222',
            marginBottom: '14px',
          }}
        >
          {activeProject.title}
        </div>

        <p
          style={{
            margin: 0,
            color: '#666',
            fontSize: '14px',
          }}
        >
          Scroll to explore <span aria-hidden="true">↓</span>
        </p>
      </div>
    </section>
  )
}
