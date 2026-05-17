import { useEffect, useRef, useState } from 'react'

export default function ProjectArena() {
  const containerStyle = {
    maxWidth: 1100,
    margin: '0 auto',
    padding: '0 20px',
  }

  const reviewsSectionRef = useRef(null)
  const [reviewProgress, setReviewProgress] = useState(0)

  const reviewImages = [
    '/images/review1.jpg',
    '/images/review2.jpg',
    '/images/review3.jpg',
    '/images/review4.jpg',
    '/images/review5.jpg',
    '/images/review6.jpg',
    '/images/review7.jpg',
    '/images/review8.jpg',
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (!reviewsSectionRef.current) return

      const rect = reviewsSectionRef.current.getBoundingClientRect()
      const totalScroll = rect.height - window.innerHeight
      const progress = Math.min(Math.max(-rect.top / totalScroll, 0), 1)

      setReviewProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div>
      <style>
        {`
          @keyframes moveLines {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }
        `}
      </style>

      {/* PREMIUM ARENA HEADER */}
      <div
        style={{
          width: '100vw',
          marginLeft: 'calc(-10vw)',
          marginRight: 'calc(-10vw)',
          marginBottom: 80,
          height: 300,
          background: '#0a0a0a',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: '200%',
            height: '300%',
            background: `
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 30px,
                rgba(255,255,255,0.12) 40px,
                transparent 44px
              )
            `,
            animation: 'moveLines 6s linear infinite',
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.9), rgba(0,0,0,0.25), rgba(0,0,0,0.9))',
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 50,
            color: 'white',
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 4,
          }}
        >
          The ARENA
        </div>
      </div>

      {/* OVERVIEW */}
      <div style={containerStyle}>
        <h2 style={{ fontSize: 32, marginBottom: 20 }}>Project Overview</h2>

        <p style={{ maxWidth: 1200, lineHeight: 1.7, marginBottom: 80 }}>
          This project explores an interactive experience designed specifically
          for the Mercedes-Benz Museum restaurant space. It transforms a
          typically passive environment into a social, game based experience
          that encourages visitors to connect, compete, and reflect. At the
          heart of the concept is a team-based trivia game where visitors are
          grouped by color-coded bracelets, linked to specific car themes in the
          museum (vintage, racing, design, and innovation). The goal is to engage
          visitors in a playful, meaningful way after their museum visit — using
          the restaurant as a stage for continued discovery, teamwork, and
          dialogue.
          <br />
          <br />
          The experience begins as soon as the visitor enters the museum, where
          they receive a smart bracelet designed to track their movement and
          interactions throughout the space. Based on the time spent in different
          sections, the bracelet identifies each visitor’s main area of
          interest—such as racing, vintage cars, design, or innovation—and
          assigns a corresponding color. The journey culminates in the museum
          restaurant, where the collected data is used to place visitors into
          color-coded teams for a collaborative trivia game, transforming their
          individual museum paths into a shared social experience.
        </p>
      </div>

      {/* FULL WIDTH OVERVIEW IMAGE */}
      <div
        style={{
          width: '100vw',
          marginLeft: 'calc(-10vw)',
          marginRight: 'calc(-10vw)',
          marginTop: 20,
          marginBottom: 120,
          overflow: 'hidden',
        }}
      >
        <img
          src="/images/arena-overview.jpg"
          alt="Arena overview"
          style={{
            width: '100%',
            height: '33vh',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>

      {/* WHY THIS IDEA */}
      <div style={{ ...containerStyle, marginBottom: 60 }}>
        <h2 style={{ fontSize: 32, marginBottom: 20 }}>Why This Idea?</h2>

        <p style={{ maxWidth: 900, lineHeight: 1.7, marginBottom: 50 }}>
          Visitor reviews of the Mercedes-Benz Museum revealed two key gaps: a
          lack of interaction between visitors, despite shared interests, and a
          restaurant space that feels disconnected from the overall experience.
          <br />
          <br />
          This raised an important question: how can this physical space become
          a meaningful extension of the museum?
          <br />
          <br />
          Arena addresses this by transforming the restaurant into an interactive
          social environment, where visitors connect, engage, and reflect
          together through a shared game experience.
        </p>
      </div>

      {/* SCROLLING REVIEW STACK */}
      <div
        ref={reviewsSectionRef}
        style={{
          height: `${reviewImages.length * 70}vh`,
          position: 'relative',
          marginBottom: 140,
        }}
      >
        <div
          style={{
            position: 'sticky',
            top: 80,
            height: '75vh',
            ...containerStyle,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 900,
              height: '60vh',
            }}
          >
            {reviewImages.map((src, index) => {
              const start = index / reviewImages.length
              const end = (index + 1) / reviewImages.length

              const localProgress = Math.min(
                Math.max((reviewProgress - start) / (end - start), 0),
                1
              )

              const isVisible = reviewProgress >= start

              return (
                <img
                  key={src}
                  src={src}
                  alt={`Visitor review ${index + 1}`}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    borderRadius: 24,
                    background: 'white',
                    boxShadow: '0 30px 80px rgba(0,0,0,0.18)',
                    zIndex: index + 1,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? `translateY(${(1 - localProgress) * 50}px) scale(${
                          0.95 + localProgress * 0.05
                        })`
                      : 'translateY(90px) scale(0.95)',
                    transition: 'opacity 0.25s ease, transform 0.25s ease',
                  }}
                />
              )
            })}
          </div>
        </div>
      </div>
      {/* TECHNOLOGIES & TOOLS */}
<div style={{ ...containerStyle, marginBottom: 120 }}>
  <h2 style={{ fontSize: 32, marginBottom: 40 }}>
    Technologies & Tools
  </h2>

  <div
    style={{
      display: 'flex',
      gap: 30,
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    }}
  >
    {[
      {
        src: '/images/bracelet.jpg',
        label: 'Smart Bracelet',
      },
      {
        src: '/images/beacon.jpg',
        label: 'Bluetooth Beacons',
      },
      {
        src: '/images/screens.jpg',
        label: 'Restaurant Screens',
      },
    ].map((item, i) => (
      <div
        key={i}
        style={{
          flex: '1 1 300px',
          maxWidth: 350,
        }}
      >
        <div
          style={{
            width: '100%',
            height: 400,
            borderRadius: 20,
            overflow: 'hidden',
            marginBottom: 12,
          }}
        >
          <img
            src={item.src}
            alt={item.label}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.3s ease',
            }}
          />
        </div>

        <div
          style={{
            fontSize: 15,
            fontWeight: 500,
            color: '#333',
          }}
        >
          {item.label}
        </div>
      </div>
    ))}
  </div>
  {/* USER JOURNEY */}
<div style={{ ...containerStyle, marginTop: 80, marginBottom: 200 }}>
  <h2 style={{ fontSize: 32, marginBottom: 30 }}>
    User Journey
  </h2>

  <div
    style={{
      display: 'flex',
      gap: 30,
      flexWrap: 'wrap',
    }}
  >
    <div style={{ flex: '1 1 400px' }}>
      <img
        src="/images/journey1.jpg"
        alt="User journey beginning"
        style={{
          width: '100%',
          borderRadius: 20,
          objectFit: 'cover',
        }}
      />
      <div style={{ fontSize: 14, marginTop: 8, color: '#555' }}>
        Museum Entry & Exploration
      </div>
    </div>

    <div style={{ flex: '1 1 400px' }}>
      <img
        src="/images/journey2.jpg"
        alt="User journey interaction"
        style={{
          width: '100%',
          borderRadius: 20,
          objectFit: 'cover',
        }}
      />
      <div style={{ fontSize: 14, marginTop: 8, color: '#555' }}>
        Social Interaction & Game Experience
      </div>
    </div>
  </div>
</div>
{/* PROTOTYPE */}
<div style={{ ...containerStyle, marginTop: 80, marginBottom: 140 }}>
  <h2 style={{ fontSize: 32, marginBottom: 20 }}>
    Prototype
  </h2>

  <p style={{ maxWidth: 800, marginBottom: 40, lineHeight: 1.6 }}>
    The prototype demonstrates how visitors interact with Arena during the
    game experience.
  </p>

  {/* 🔥 SAME WIDTH WRAPPER */}
  <div style={{ maxWidth: 900, margin: '0 auto' }}>
    
    {/* VIDEO */}
    <video
      src="/videos/arena-prototype.mp4"
      autoPlay
      loop
      muted
      playsInline
      controls
      style={{
        width: '100%',
        borderRadius: 20,
        display: 'block',
        marginBottom: 40,
      }}
    />

    {/* IMAGES */}
    <div
      style={{
        display: 'flex',
        gap: 20,
        flexWrap: 'wrap',
      }}
    >
      <img
        src="/images/prototype1.jpg"
        style={{
          flex: '1 1 400px',
          width: '100%',
          borderRadius: 20,
          objectFit: 'cover',
        }}
      />

      <img
        src="/images/prototype2.jpg"
        style={{
          flex: '1 1 400px',
          width: '100%',
          borderRadius: 20,
          objectFit: 'cover',
        }}
      />
    </div>

  </div>
</div>
</div>
    </div>
  )
}