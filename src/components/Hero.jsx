import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react'
import { projects } from '../data/projects'
import './Hero.css'
import PortfolioHeader from './PortfolioHeader'

const HeroScene = lazy(() => import('./HeroScene'))

export default function Hero({ index, setIndex }) {
  const heroRef = useRef(null)
  const [scrolled, setScrolled] = useState(() => window.scrollY > 24)
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setScrolled(window.scrollY > 24)
      const hero = heroRef.current
      if (!hero) return
      const bounds = hero.getBoundingClientRect()
      const distance = Math.max(1, Math.min(bounds.height * .55, window.innerHeight * .65))
      const progress = Math.min(1, Math.max(0, -bounds.top / distance))
      hero.style.setProperty('--hero-intro-opacity', String(1 - progress))
      hero.style.setProperty('--hero-intro-scale', String(1 - progress * .2))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    update()
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])
  const [compact, setCompact] = useState(() => window.matchMedia('(max-width: 900px)').matches)
  useEffect(() => {
    const query = window.matchMedia('(max-width: 900px)')
    const update = () => setCompact(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  const [sceneReady, setSceneReady] = useState(false)
  const handleSceneReady = useCallback(() => setSceneReady(true), [])
  const [visible, setVisible] = useState(true)
  const [displayIndex, setDisplayIndex] = useState(index)
  const activeProject = projects[displayIndex]

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
      if (event.target instanceof Element && event.target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="slider"]')) return

      const bounds = heroRef.current?.getBoundingClientRect()
      if (!bounds || bounds.top > window.innerHeight / 2 || bounds.bottom <= window.innerHeight / 2) return

      event.preventDefault()
      const direction = event.key === 'ArrowRight' ? 1 : -1
      setIndex((current) => (current + direction + projects.length) % projects.length)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setIndex])

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

  return (
    <section
      id="projects"
      tabIndex={-1}
      aria-label="Project selection"
      ref={heroRef}
      className="portfolio-hero"
      style={{
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(circle at 60% 45%, rgba(245,245,242,0.10), #080808 32%)',
      }}
    >
      <PortfolioHeader page="projects" />

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
          top: '103px',
          left: '64px',
          zIndex: 30,
          maxWidth: '420px',
        }}
      >
        <h1
          className="hero-name"
          onPointerMove={event => {
            const bounds = event.currentTarget.getBoundingClientRect()
            event.currentTarget.style.setProperty('--name-pointer-x', `${event.clientX - bounds.left}px`)
            event.currentTarget.style.setProperty('--name-pointer-y', `${event.clientY - bounds.top}px`)
          }}
          style={{
            fontSize: 'clamp(36px, 5vw, 72px)',
            lineHeight: 1,
            margin: 0,
            fontWeight: 600,
            color: '#f5f5f2',
          }}
        >
          Alaa{' '}
          <br />
          Suliman
          <span className="hero-name-photo" aria-hidden="true">Alaa{' '}<br />Suliman</span>
        </h1>

        <p
          style={{
            fontSize: '18px',
            fontWeight: 400,
            lineHeight: 1.7,
            color: '#c8c8c3',
            marginTop: '24px',
            marginBottom: '14px',
            maxWidth: '330px',
          }}
        >
          Designer working across visual, digital, and spatial design.
        </p>

      </div>



      <div className="hero-location">
        <span>Located in<br /><span className="hero-location-country">Germany</span></span>
        <span className="hero-location-globe" aria-hidden="true">
          <svg className="hero-earth-icon" viewBox="0 0 64 64" fill="none">
            <title>Earth centered on Europe, with Germany marked in yellow</title>
            <circle cx="32" cy="32" r="27" fill="#303e48" stroke="#f5f5f2" strokeWidth="1.2" />
            <g fill="#c8d2bc" stroke="#c8d2bc" strokeWidth=".65" strokeLinejoin="round">
              <path d="M27 6l-3 5-4 2-2 5 4 2 4-2 3 2 3-2 2-5 5-3-3-4z" />
              <path d="M30 19l-4 2-2 4-5 2 1 3 6-1 3 3 6-1 4 3 6-1 2-4 6 1 4 4 1-7-4-6-7-5-8-2-4 3-1 5z" />
              <path d="M26 31l-6 3-3 7 3 5 6 1 3 8 4 1 5-8 2-8-5-6z" />
              <path d="M40 35l5 1 2 4-3 4-3-3zM40 49l-2 6 2 1 2-5z" />
              <path d="M7 24l4-6 4 1-1 5-4 3zM12 36l3 2 2 7-3-2z" />
              <path d="M20 22l1-3 2 1-1 3zM35 27l2 2-1 3-2-3z" />
            </g>
            <g stroke="#f5f5f2" strokeWidth=".65" opacity=".22">
              <ellipse cx="32" cy="32" rx="13" ry="27" />
              <path d="M5 32h54M9 18h46M9 46h46" />
            </g>
            <circle className="hero-earth-location-halo" cx="29" cy="24" r="5" fill="#ffb21c" opacity=".25" />
            <circle cx="29" cy="24" r="2.4" fill="#ffb21c" stroke="#fff" strokeWidth=".9" />
          </svg>
        </span>
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
            color: '#f5f5f2',
            marginBottom: '14px',
          }}
        >
          {activeProject.title}
        </div>

        <p
          style={{
            margin: 0,
            color: '#c8c8c3',
            fontSize: '14px',
            fontWeight: 400,
          }}
        >
          <span aria-hidden={scrolled} style={{ opacity: scrolled ? 0 : 1, transition: 'opacity .25s ease' }}>Scroll to explore <span className="hero-scroll-arrow" aria-hidden="true">↓</span></span>
        </p>
      </div>

    </section>
  )
}
