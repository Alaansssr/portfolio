import ViewportVideo from '../components/ViewportVideo'
import { useEffect, useRef, useState } from 'react'
import './Project2.css'

// Keep scroll updates inside the review stack, rather than rerendering the case study.
function MuseumReviews() {
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
      const totalScroll = Math.max(1, rect.height - window.innerHeight)
      const progress = Math.min(Math.max(-rect.top / totalScroll, 0), 1)

      setReviewProgress(progress)
    }

    let frame = 0
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(() => {
        frame = 0
        handleScroll()
      })
    }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    schedule()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return (
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
                <img loading="lazy" decoding="async"
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
  )
}

const imageSizes = {
  "arena-overview": {
    "width": 1904,
    "height": 362
  },
  "bracelet": {
    "width": 1024,
    "height": 1024
  },
  "beacon": {
    "width": 680,
    "height": 800
  },
  "screens": {
    "width": 1544,
    "height": 994
  },
  "journey1": {
    "width": 1986,
    "height": 1130
  },
  "journey2": {
    "width": 1986,
    "height": 1126
  },
  "prototype1": {
    "width": 1990,
    "height": 998
  },
  "prototype2": {
    "width": 1990,
    "height": 998
  }
}

function ArenaImage({ name, alt, sizes = '(max-width: 800px) 80vw, 520px' }) {
  return <img loading="lazy" decoding="async"
    src={`/images/arena/${name}-1600.webp`}
    srcSet={`/images/arena/${name}-640.webp 640w, /images/arena/${name}-1600.webp ${Math.min(1600, imageSizes[name].width)}w`}
    sizes={sizes} width={imageSizes[name].width} height={imageSizes[name].height} alt={alt} />
}

function SectionHeading({ number, label, title, children }) {
  return <header className="ar-heading">
    <p className="ar-kicker">{number} / {label}</p>
    <h3>{title}</h3>
    <p>{children}</p>
  </header>
}

export default function ProjectArena() {
  return (
    <article className="arena-project" aria-label="The Arena project">
      <div className="ar-banner">
        <div className="ar-lines" aria-hidden="true" />
        <div className="ar-banner-shade" aria-hidden="true" />
        <span>The ARENA</span>
      </div>

      <section className="ar-container ar-section" aria-labelledby="arena-title">
        <p className="ar-kicker">Project overview</p>
        <div className="ar-title-row">
          <h2 id="arena-title">The Arena.</h2>
          <p>Different journeys. One shared race.<br /><span>A social game for the museum restaurant.</span></p>
        </div>
        <dl className="ar-meta">
          <div><dt>Designed by</dt><dd>Alaa Suliman</dd></div>
          <div><dt>Context</dt><dd>Design & Interaction, M.A.<br />Rhine-Waal University of Applied Sciences</dd></div>
          <div><dt>Focus</dt><dd>Experience design<br />Physical & digital interaction</dd></div>
          <div><dt>Year / outcome</dt><dd>Summer semester 2025<br />Concept & interaction prototype</dd></div>
        </dl>
        <div className="ar-intro">
          <h3>A museum visit that<br />ends in connection.</h3>
          <div>
            <p className="ar-lead">What if the things that catch your attention could connect you with the people around you?</p>
            <p>The Arena is a concept for the Mercedes-Benz Museum restaurant. It turns visitors’ individual interests into a shared, race-themed trivia experience — a chance to talk, collaborate, and revisit what they discovered in the museum.</p>
            <p>A proposed Bluetooth bracelet follows each visitor’s journey through four exhibit themes. Time spent in each area determines a color, which becomes their team identity in the restaurant. The same bracelet then becomes their controller for the game.</p>
          </div>
        </div>
        <div className="ar-summary">
          <div><strong>Explore</strong><span>Follow your curiosity through the exhibits.</span></div>
          <div><strong>Connect</strong><span>Recognize people with a shared interest.</span></div>
          <div><strong>Play</strong><span>Turn what you discovered into a team experience.</span></div>
        </div>
      </section>

      <figure className="ar-overview">
        <ArenaImage name="arena-overview" alt="The four Arena interest groups: design, vintage cars, mechanical innovation, and racing heritage" sizes="100vw" />
      </figure>

      <section className="ar-container ar-section" aria-label="Why this idea">
        <SectionHeading number="01" label="Why this idea?" title="From looking at cars to connecting with people.">
          My interest in the automotive world was the starting point. The design question became how to make the museum visit more participatory — and give visitors a reason to engage with one another.
        </SectionHeading>
        <div className="ar-two ar-research">
          <div><h4>Listening to visitors</h4><p>The reviews below repeatedly ask for more interactive experiences: hands-on exhibits, opportunities to explore cars, and more activity beyond reading and looking. These comments helped frame an opportunity for greater participation.</p></div>
          <div><h4>Finding a place for connection</h4><p>My response was to focus on the restaurant as a social extension of the visit. Visitors could pause, share what interested them, and take part in something together. The team game is my design response to that opportunity.</p></div>
        </div>
        <div className="ar-evolution">
          <h4>How the concept developed</h4>
          <ol>
            <li><span>Explore</span><p>Connect visitors through their interest in cars. Early app ideas focused on learning, but feedback called for a stronger social experience.</p></li>
            <li><span>Bring it on-site</span><p>Use the bracelet to make shared interests visible. Place the interaction within the museum journey, where visitors are already together.</p></li>
            <li><span>Give people a shared goal</span><p>Make the bracelet the controller and the restaurant the arena. A team game creates a reason to talk and participate without a phone.</p></li>
          </ol>
        </div>
        <p className="ar-note">Selected museum reviews that informed the exploration. Scroll to move through the original reviews.</p>
      </section>

      <MuseumReviews />

      <section className="ar-container ar-section" aria-label="Technologies and tools">
        <SectionHeading number="02" label="Technologies & tools" title="One bracelet. Two roles.">
          During the visit, the bracelet expresses an interest. During the game, it becomes an input device. The proposed system links that personal object to the museum space and a shared screen.
        </SectionHeading>
        <div className="ar-three ar-tools">
          <figure><ArenaImage name="bracelet" alt="Transparent bracelet concept with illuminated color and four A–D buttons" sizes="(max-width: 800px) 80vw, 350px" /><figcaption><h4>Smart bracelet</h4><p>A color indicator gives visitors a visible team identity. Four tactile buttons — A, B, C, and D — let them vote for answers while keeping their attention on the people and game around them.</p></figcaption></figure>
          <figure><ArenaImage name="beacon" alt="Illustration of a Bluetooth beacon in a museum" sizes="(max-width: 800px) 80vw, 350px" /><figcaption><h4>Bluetooth beacons</h4><p>Beacons placed around the exhibits would detect proximity and time spent in each zone. The concept uses dwell time as a signal of interest to determine the bracelet’s color.</p></figcaption></figure>
          <figure><ArenaImage name="screens" alt="Concept visualization of restaurant visitors playing together with colored bracelets and a shared screen" sizes="(max-width: 800px) 80vw, 350px" /><figcaption><h4>Restaurant screens</h4><p>A shared display presents questions, answer options, and the race. Each team’s car uses its bracelet color, connecting individual votes to progress everyone can follow.</p></figcaption></figure>
        </div>
        <div className="ar-palette" aria-label="Interest and team colors">
          <div><i style={{ background: '#e63946' }} /><span>Red<strong>Design</strong></span></div>
          <div><i style={{ background: '#1d55d7' }} /><span>Blue<strong>Mechanical innovation</strong></span></div>
          <div><i style={{ background: '#f1c40f' }} /><span>Yellow<strong>Racing heritage</strong></span></div>
          <div><i style={{ background: '#1db954' }} /><span>Green<strong>Vintage cars</strong></span></div>
        </div>
        <p className="ar-note">The bracelet, beacon network, and restaurant installation describe the proposed system. The prototype below presents the game interaction.</p>
      </section>

      <section className="ar-container ar-section" aria-label="User journey">
        <SectionHeading number="03" label="User journey" title="Your museum journey becomes your team identity.">
          Visitors explore at their own pace. The experience connects that individual route to a shared activity at the end of the visit.
        </SectionHeading>
        <div className="ar-two ar-journey-images">
          <figure><ArenaImage name="journey1" alt="Storyboard showing arrival and exploration of the museum exhibits" /><figcaption>Museum entry & exploration.</figcaption></figure>
          <figure><ArenaImage name="journey2" alt="Storyboard connecting the museum visit to a shared game in the restaurant" /><figcaption>Social interaction & game experience.</figcaption></figure>
        </div>
        <ol className="ar-steps">
          <li><span>01 / Arrive</span><h4>Receive a bracelet</h4><p>A transparent bracelet is introduced at check-in. It accompanies the visitor throughout the museum.</p></li>
          <li><span>02 / Explore</span><h4>Discover your color</h4><p>Time spent in the four themed zones determines a color. The visible signal offers a starting point for conversation.</p></li>
          <li><span>03 / Gather</span><h4>Meet your team</h4><p>In the restaurant, visitors with the same color form a team. Team sizes depend on who is present.</p></li>
          <li><span>04 / Play</span><h4>Join the race</h4><p>The game begins with at least four players and two colors. Visitors discuss, vote, and watch their team progress.</p></li>
        </ol>
      </section>

      <section className="ar-container ar-section" aria-label="Prototype">
        <SectionHeading number="04" label="Prototype" title="A reason to talk. A race to share.">
          The prototype shows how trivia, team decisions, and race feedback come together. Each visitor submits an answer with the bracelet; the team’s majority vote becomes its answer, giving players a reason to discuss before choosing.
        </SectionHeading>
        <figure className="ar-video">
          <ViewportVideo src="/videos/arena-prototype.mp4" poster="/images/arena/prototype-poster.webp" autoPlay loop muted playsInline aria-label="Arena game interaction prototype" />
          <figcaption>Game interaction prototype — from the question to the team’s response and shared race feedback.</figcaption>
        </figure>
        <div className="ar-two ar-prototype-images">
          <figure><ArenaImage name="prototype1" alt="Arena design system showing Helvetica Neue, black and white, and the four team colors" /><figcaption>A restrained black-and-white interface, with color reserved for team identity.</figcaption></figure>
          <figure><ArenaImage name="prototype2" alt="Interaction goals: starting conversations through shared colors and creating a social game atmosphere" /><figcaption>The intended social experience: shared interests become a starting point for conversation.</figcaption></figure>
        </div>
        <div className="ar-rounds">
          <h4>Three phases, different ways to contribute</h4>
          <div className="ar-three">
            <div><span className="ar-kicker">01 / Trivia</span><h4>Think together</h4><p>Questions draw on Mercedes-Benz history, models, design, and technology. Players choose A–D; the most popular answer represents the team.</p></div>
            <div><span className="ar-kicker">02 / Pit stop</span><h4>Solve the puzzle</h4><p>Visual challenges add a different kind of contribution. A correct solution earns a +2 boost for the team’s race.</p></div>
            <div><span className="ar-kicker">03 / Tactical vote</span><h4>Change the race</h4><p>Teams vote to slow down another team, adding a tactical choice and another opportunity to make a decision together.</p></div>
          </div>
        </div>
        <div className="ar-two ar-reflection">
          <div><p className="ar-kicker">The finish line</p><h4>A shared moment of celebration.</h4><p>The concept ends with an on-screen celebration in the winning team’s color. A proposed restaurant reward extends the moment: the winner’s bracelet cycles through all four colors until staff redeem the reward.</p></div>
          <div><p className="ar-kicker">Reflection</p><h4>Designing the connection between space and interaction.</h4><p>This project taught me to consider the whole visit, beyond the exhibits. The bracelet became the thread connecting personal exploration to a shared game — showing how an everyday pause in a restaurant could become part of the museum experience.</p></div>
        </div>
        <footer className="ar-end"><span>The Arena / Alaa Suliman / 2025</span><span>Academic concept for the Mercedes-Benz Museum</span></footer>
      </section>
    </article>
  )
}
