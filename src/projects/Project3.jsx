import { useEffect, useState } from 'react'

export default function Project3() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const move = (e) => {
      setMouse({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', move)

    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      {/* COVER */}
      <section
        style={{
          width: '100vw',
          height: '50vh',
          background: '#0b0b0b',
          position: 'relative',
          overflow: 'hidden',
          marginLeft: 'calc(50% - 50vw)',
        }}
      >
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
            left: mouse.x - 250,
            top: mouse.y - 250,
            pointerEvents: 'none',
            transition: 'all 0.12s linear',
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
            left: mouse.x - 12,
            top: mouse.y,
            width: 24,
            height: 1,
            background: 'rgba(255,255,255,0.35)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: mouse.x,
            top: mouse.y - 12,
            width: 1,
            height: 24,
            background: 'rgba(255,255,255,0.35)',
            pointerEvents: 'none',
          }}
        />
      </section>

      {/* OVERVIEW */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '120px auto',
          padding: '0 24px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(28px, 4vw, 48px)',
            marginBottom: '24px',
            color: '#111',
            fontWeight: 600,
          }}
        >
          Overview
        </h2>

        <p
          style={{
            fontSize: '18px',
            lineHeight: 1.8,
            color: '#555',
            maxWidth: '760px',
          }}
        >
          A selection of architectural visualization projects,
          exploring the transition from detailed 2D plans to
          immersive 3D spatial representations.
        </p>
        {/* PROJECT 1 */}
<div
  style={{
    maxWidth: '1100px',
    margin: '140px auto',
    padding: '0 24px',
    fontFamily: 'system-ui, sans-serif',
  }}
>
  <div
    style={{
      marginBottom: '50px',
    }}
  >
    <h2
      style={{
        fontSize: 'clamp(28px, 4vw, 48px)',
        marginBottom: '16px',
        color: '#111',
        fontWeight: 600,
      }}
    >
      Spatial Visualization 01
    </h2>

    <p
      style={{
        fontSize: '17px',
        lineHeight: 1.8,
        color: '#666',
        maxWidth: '700px',
      }}
    >
        Small waiting area designed with a focus on comfort,
  lighting, and spatial balance.
    </p>
  </div>

  {/* 2D PLAN */}
  <img
    src="/images/plan1.jpg"
    alt="2D Plan"
    style={{
      width: '100%',
      borderRadius: '18px',
      marginBottom: '40px',
      objectFit: 'cover',
    }}
  />

{/* 3D RENDERS */}
<div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
  }}
>
  <img
    src="/images/render1.jpg"
    alt=""
    style={{
      width: '100%',
      borderRadius: '18px',
      display: 'block',
    }}
  />

  <img
    src="/images/render2.jpg"
    alt=""
    style={{
      width: '100%',
      borderRadius: '18px',
      display: 'block',
    }}
  />

  <img
    src="/images/render3.jpg"
    alt=""
    style={{
      width: '100%',
      borderRadius: '18px',
      display: 'block',
    }}
  />

  <img
    src="/images/render4.jpg"
    alt=""
    style={{
      width: '83%',
      borderRadius: '18px',
      display: 'block',
    }}
  />
</div>
{/* PROJECT 2 */}
<div
  style={{
    maxWidth: '1100px',
    margin: '180px auto',
    padding: '0 24px',
    fontFamily: 'system-ui, sans-serif',
  }}
>
  <div
    style={{
      marginBottom: '50px',
    }}
  >
    <h2
      style={{
        fontSize: 'clamp(28px, 4vw, 48px)',
        marginBottom: '16px',
        color: '#111',
        fontWeight: 600,
      }}
    >
      Spatial Visualization 02
    </h2>

    <p
      style={{
        fontSize: '17px',
        lineHeight: 1.8,
        color: '#666',
        maxWidth: '700px',
      }}
    >
      Interior visualization of a residential flat,
  presenting selected spatial perspectives and atmosphere.
    </p>
  </div>

  {/* 2D PLAN */}
  <img
    src="/images/plan2.jpg"
    alt="2D Plan"
    style={{
      width: '100%',
      borderRadius: '18px',
      marginBottom: '40px',
      objectFit: 'cover',
    }}
  />

  {/* 3D RENDERS */}
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '24px',
    }}
  >
    {/* IMAGE 1 */}
    <div>
      <img
        src="/images/project2-render1.jpg"
        alt=""
        style={{
          width: '100%',
          borderRadius: '18px',
          display: 'block',
          marginBottom: '12px',
        }}
      />

      <p
        style={{
          fontSize: '15px',
          color: '#666',
          margin: 0,
        }}
      >
        Viewpoint 1
      </p>
    </div>

    {/* IMAGE 2 */}
    <div>
      <img
        src="/images/project2-render2.jpg"
        alt=""
        style={{
          width: '100%',
          borderRadius: '18px',
          display: 'block',
          marginBottom: '12px',
        }}
      />

      <p
        style={{
          fontSize: '15px',
          color: '#666',
          margin: 0,
        }}
      >
        Viewpoint 2
      </p>
    </div>

    {/* IMAGE 3 */}
    <div>
      <img
        src="/images/project2-render3.jpg"
        alt=""
        style={{
          width: '100%',
          borderRadius: '18px',
          display: 'block',
          marginBottom: '12px',
        }}
      />

      <p
        style={{
          fontSize: '15px',
          color: '#666',
          margin: 0,
        }}
      >
        Viewpoint 8
      </p>
    </div>

    {/* IMAGE 4 */}
    <div>
      <img
        src="/images/project2-render4.jpg"
        alt=""
        style={{
          width: '100%',
          borderRadius: '18px',
          display: 'block',
          marginBottom: '12px',
        }}
      />

      <p
        style={{
          fontSize: '15px',
          color: '#666',
          margin: 0,
        }}
      >
        Viewpoint 12
      </p>
    </div>
  </div>
</div>
</div>
      </div>
    </>
  )
}