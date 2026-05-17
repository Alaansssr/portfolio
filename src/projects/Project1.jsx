import { useEffect, useRef, useState } from 'react'

export default function Project1() {
  const containerStyle = {
    maxWidth: 1100,
    margin: '0 auto',
    padding: '0 20px',
  }

  // Control the four small images here
  const indicatorWrapperStyle = {
    display: 'flex',
    gap: 20,
    flexWrap: 'wrap',
    marginTop: 20,
    marginBottom: 0,
  }

  const indicatorImageStyle = {
    flex: '0 0 160px', // width
    height: 55, // height
    margin: '0 0 20px 0',
    borderRadius: 20,
  }

  const [selectedAspect, setSelectedAspect] = useState(0)
  const [displayAspect, setDisplayAspect] = useState(0)

  const stickySectionRef = useRef(null)

  const aspects = [
    {
      src: '/images/final1.jpg',
      title: 'Interface Design',
    },
    {
      src: '/images/final2.jpg',
      title: 'Haptic System',
    },
    {
      src: '/images/final3.jpg',
      title: 'Game Logic',
    },
    {
      src: '/images/final4.jpg',
      title: 'Game Testing',
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (!stickySectionRef.current) return

      const rect = stickySectionRef.current.getBoundingClientRect()
      const totalScroll = rect.height - window.innerHeight

      const progress = Math.min(Math.max(-rect.top / totalScroll, 0), 1)

      const newIndex = Math.min(
        aspects.length - 1,
        Math.floor(progress * aspects.length)
      )

      setSelectedAspect(newIndex)
      setDisplayAspect(newIndex)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div>
      {/* FULL WIDTH VIDEO */}
      <div
        style={{
          width: '100vw',
          marginLeft: 'calc(-10vw)',
          marginRight: 'calc(-10vw)',
          marginBottom: 60,
        }}
      >
        <video
          src="/videos/project1.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '70vh',
            objectFit: 'cover',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* OVERVIEW */}
      <div style={containerStyle}>
        <h2 style={{ fontSize: 32, marginBottom: 20 }}>Project Overview</h2>

        <p style={{ maxWidth: 1400, lineHeight: 1.7, marginBottom: 80 }}>
          The aim of this project was to gamify social connection through
          asymmetric gameplay by building a haptic game system, facilitating the
          integration of new students through social interaction games to break
          the ice during freshers week.
        </p>
      </div>

      {/* HOW SECTION */}
      <div style={{ ...containerStyle, marginBottom: 100 }}>
        <div style={{ display: 'flex', gap: '60px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 300 }}>
            <h3 style={{ fontSize: 24, marginBottom: 20 }}>How</h3>

            <p>
              <strong>Goal:</strong> Improving social connectedness
            </p>
            <p>
              <strong>Method:</strong> Cooperative interdependence
            </p>
            <p>
              <strong>Location:</strong> Rhein-Waal Hochschule
            </p>

            <p style={{ marginTop: 10 }}>
              <strong>Team:</strong> 2 players
            </p>

            <p>
              <strong>Controller:</strong> Eyes & brain
            </p>
            <p>
              <strong>Agent:</strong> Moves via vibration feedback
            </p>
          </div>

          <div style={{ flex: 1, minWidth: 300 }}>
            <video
              src="/videos/project1-process.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                borderRadius: 10,
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>
      </div>

      {/* MAPPING */}
      <div style={{ ...containerStyle, marginBottom: 100 }}>
        <h3 style={{ fontSize: 20, marginBottom: 40 }}>
          The process began with mapping the campus, followed by designing the
          game interface, then developing a vibration-based system using
          ProtoPie.
        </h3>

        <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
          <video
            src="/videos/project1-mapping.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{
              flex: 1,
              minWidth: 260,
              height: 440,
              borderRadius: 10,
              objectFit: 'cover',
              pointerEvents: 'none',
            }}
          />

          <video
            src="/videos/project1-second.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{
              flex: 1,
              minWidth: 260,
              height: 440,
              borderRadius: 10,
              objectFit: 'cover',
              pointerEvents: 'none',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <img
              src="/images/map1.jpg"
              alt="Campus map 1"
              style={{
                height: 210,
                borderRadius: 10,
                objectFit: 'cover',
              }}
            />

            <img
              src="/images/map2.jpg"
              alt="Campus map 2"
              style={{
                height: 210,
                borderRadius: 10,
                objectFit: 'cover',
              }}
            />
          </div>
        </div>
      </div>

      {/* SCROLL PINNED IMAGE SECTION */}
      <div
        ref={stickySectionRef}
        style={{
          height: '400vh',
          position: 'relative',
          marginTop: 140,
        }}
      >
        <div
          style={{
            position: 'sticky',
            top: 20,
            height: 'calc(100vh - 40px)',
            background: 'white',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={containerStyle}>
            {/* IMAGE INDICATORS */}
            <div style={indicatorWrapperStyle}>
              {aspects.map((item, i) => (
                <div
                  key={i}
                  style={{
                    ...indicatorImageStyle,
                    overflow: 'hidden',
                    opacity: selectedAspect === i ? 1 : 0.35,
                    transform:
                      selectedAspect === i ? 'scale(1)' : 'scale(0.96)',
                    transition: 'opacity 0.35s ease, transform 0.35s ease',
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* DETAILS - SCROLLING MEDIA STRIP */}
          <div
            style={{
              marginTop: 20,
              height: '70vh',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'flex',
                width: `${aspects.length * 100}%`,
                height: '100%',
                transform: `translateX(-${
                  displayAspect * (100 / aspects.length)
                }%)`,
                transition: 'transform 1s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <img
                src="/images/design-language.jpg"
                alt="Design Language"
                style={{
                  width: `${100 / aspects.length}%`,
                  height: '70vh',
                  objectFit: 'contain',
                  flexShrink: 0,
                  display: 'block',
                }}
              />

              <video
                src="/videos/haptic-system.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                style={{
                  width: `${100 / aspects.length}%`,
                  height: '70vh',
                  objectFit: 'contain',
                  flexShrink: 0,
                  display: 'block',
                  pointerEvents: 'none',
                }}
              />

              <video
                src="/videos/game-logic.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                style={{
                  width: `${100 / aspects.length}%`,
                  height: '70vh',
                  objectFit: 'contain',
                  flexShrink: 0,
                  display: 'block',
                  pointerEvents: 'none',
                }}
              />

              <video
                src="/videos/testing.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                style={{
                  width: `${100 / aspects.length}%`,
                  height: '70vh',
                  objectFit: 'contain',
                  flexShrink: 0,
                  display: 'block',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* FINAL VIDEOS SECTION */}
      <div
        style={{
          ...containerStyle,
          marginTop: 140,
          marginBottom: 120,
        }}
      >
        <h3 style={{ fontSize: 20, marginBottom: 30 }}>These videos illustrate how students engage with each other through the system,
  demonstrating the dynamic between the Controller and Agent and how interaction
  unfolds in real gameplay situations</h3>

        <div
          style={{
            display: 'flex',
            gap: '30px',
            flexWrap: 'wrap',
          }}
        >
          <video
            src="/videos/work1.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{
              flex: 1,
              minWidth: 280,
              height: 300,
              objectFit: 'cover',
              borderRadius: 10,
              display: 'block',
              pointerEvents: 'none',
            }}
          />

          <video
            src="/videos/work3.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{
              flex: 1,
              minWidth: 280,
              height: 300,
              objectFit: 'cover',
              borderRadius: 10,
              display: 'block',
              pointerEvents: 'none',
            }}
          />

          <video
            src="/videos/work2.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{
              flex: 1,
              minWidth: 800,
              height: 500,
              objectFit: 'cover',
              borderRadius: 10,
              display: 'block',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>
    </div>
  )
}