import { useEffect, useRef } from 'react'
import './Project3.css'

export default function Project3() {
  const coverRef = useRef(null)
  const frameRef = useRef(0)
  useEffect(() => () => cancelAnimationFrame(frameRef.current), [])

  const handlePointerMove = (event) => {
    const cover = coverRef.current
    const rect = cover.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => {
      cover.style.setProperty('--pointer-x', `${x}px`)
      cover.style.setProperty('--pointer-y', `${y}px`)
    })
  }

  return (
    <article className="architecture-project">
      {/* COVER */}
      <section
        ref={coverRef}
        onPointerMove={handlePointerMove}
        style={{
          width: '100vw',
          background: '#0b0b0b',
          position: 'relative',
          overflow: 'hidden',
          marginLeft: 'calc(50% - 50vw)',
        }}
      >
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* GRID */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* MOUSE GLOW */}
        <div
          style={{
            position: 'absolute',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(0,180,255,0.12), transparent 70%)',
            left: -250,
            top: -250,
            transform: 'translate3d(var(--pointer-x, 0px), var(--pointer-y, 0px), 0)',
            pointerEvents: 'none',
            transition: 'transform 0.12s linear',
          }}
        />

        {/* CENTER WIREFRAME */}
        <div
          style={{
            position: 'absolute',
            width: 340,
            height: 220,
            border: '1px solid rgba(255,255,255,0.16)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-8deg)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 24,
              border: '1px solid rgba(0,180,255,0.45)',
            }}
          />

          <div
            style={{
              position: 'absolute',
              left: -45,
              top: -45,
              width: '100%',
              height: '100%',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          />
        </div>

        {/* FLOOR PLAN SHAPE */}
        <div
          style={{
            position: 'absolute',
            left: '12%',
            top: '22%',
            width: 180,
            height: 120,
            border: '1px solid rgba(0,180,255,0.28)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 55,
              top: 0,
              width: 1,
              height: 120,
              background: 'rgba(0,180,255,0.22)',
            }}
          />

          <div
            style={{
              position: 'absolute',
              left: 55,
              top: 55,
              width: 125,
              height: 1,
              background: 'rgba(0,180,255,0.22)',
            }}
          />
        </div>

        {/* RIGHT PLAN */}
        <div
          style={{
            position: 'absolute',
            right: '12%',
            bottom: '18%',
            width: 220,
            height: 130,
            border: '1px solid rgba(255,255,255,0.12)',
            transform: 'rotate(4deg)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              right: 35,
              top: 0,
              width: 1,
              height: 130,
              background: 'rgba(255,255,255,0.1)',
            }}
          />

          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 70,
              width: 220,
              height: 1,
              background: 'rgba(255,255,255,0.1)',
            }}
          />
        </div>

        {/* CIRCLES */}
        <div
          style={{
            position: 'absolute',
            left: '28%',
            bottom: '18%',
            width: 90,
            height: 90,
            borderRadius: '50%',
            border: '1px solid rgba(0,180,255,0.28)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            right: '28%',
            top: '18%',
            width: 60,
            height: 60,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.16)',
          }}
        />

        {/* DIAGONAL LINES */}
        <div
          style={{
            position: 'absolute',
            width: 260,
            height: 1,
            background: 'rgba(0,180,255,0.18)',
            left: '8%',
            bottom: '24%',
            transform: 'rotate(-25deg)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            width: 300,
            height: 1,
            background: 'rgba(255,255,255,0.1)',
            right: '6%',
            top: '30%',
            transform: 'rotate(18deg)',
          }}
        />

        {/* DOTS */}
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: 'rgba(0,180,255,0.35)',
              left: `${8 + i * 5}%`,
              top: `${18 + (i % 5) * 12}%`,
            }}
          />
        ))}

        {/* CROSSHAIR */}
        <div
          style={{
            position: 'absolute',
            left: -12,
            top: 0,
            transform: 'translate3d(var(--pointer-x, 0px), var(--pointer-y, 0px), 0)',
            width: 24,
            height: 1,
            background: 'rgba(255,255,255,0.35)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: 0,
            top: -12,
            transform: 'translate3d(var(--pointer-x, 0px), var(--pointer-y, 0px), 0)',
            width: 1,
            height: 24,
            background: 'rgba(255,255,255,0.35)',
            pointerEvents: 'none',
          }}
        />
        </div>
        <div aria-hidden="true" style={{ height: '50vh' }} />
      <section className="architecture-container architecture-intro" style={{ position: 'relative', width: '80%' }}>
        <h2>Overview</h2>
        <p>A selection of architectural visualization projects, exploring the transition from detailed 2D plans to immersive 3D spatial representations.</p>
      </section>
      </section>

      <section className="architecture-container architecture-documentation case-band case-light">
        <h2>Spatial Visualization 01</h2>
        <p>Small waiting area designed with a focus on comfort, lighting, and spatial balance.</p>
        <figure><img loading="lazy" decoding="async" src="/images/plan1.jpg" alt="2D plan of the waiting area" /><figcaption>2D plan</figcaption></figure>
      </section>
      <section className="architecture-container architecture-experience" aria-label="Waiting area renders">
        <div className="architecture-gallery">
          {[1, 2, 3, 4].map(number => <img key={number} loading="lazy" decoding="async" src={`/images/render${number}.jpg`} alt={`Waiting area render ${number}`} />)}
        </div>
      </section>

      <section className="architecture-container architecture-documentation case-band case-light">
        <h2>Spatial Visualization 02</h2>
        <p>Interior visualization of a residential flat, presenting selected spatial perspectives and atmosphere.</p>
        <figure><img loading="lazy" decoding="async" src="/images/plan2.jpg" alt="2D plan of the residential flat" /><figcaption>2D plan</figcaption></figure>
      </section>
      <section className="architecture-container architecture-experience" aria-label="Residential flat renders">
        <div className="architecture-gallery">
          {[1, 2, 8, 12].map((viewpoint, index) => <figure key={viewpoint}>
            <img loading="lazy" decoding="async" src={`/images/project2-render${index + 1}.jpg`} alt={`Residential flat, viewpoint ${viewpoint}`} />
            <figcaption>Viewpoint {viewpoint}</figcaption>
          </figure>)}
        </div>
      </section>
    </article>
  )
}
