import ViewportVideo from '../components/ViewportVideo'
import { useEffect, useRef, useState } from 'react'
import './Project2.css'
import { projects } from '../data/projects'

const project = projects.find(item => item.Component === 'Project2')

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

function JourneySymbol({ stage }) {
  return <svg viewBox="0 0 160 90" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
    {stage === 'arrive' && <>
      <path d="M65 28V13h30v15M65 62v15h30V62" />
      <rect x="54" y="27" width="52" height="36" rx="15" fill="white" />
      <circle cx="71" cy="39" r="3" /><circle cx="89" cy="39" r="3" />
      <circle cx="71" cy="51" r="3" /><circle cx="89" cy="51" r="3" />
    </>}
    {stage === 'explore' && <>
      <path d="M33 25h94v40H33z" stroke="#ddd" strokeDasharray="4 5" />
      {[['#e63946',33,25],['#1d55d7',127,25],['#1db954',33,65],['#f1c40f',127,65]].map(([color,cx,cy]) => <circle key={color} cx={cx} cy={cy} r="9" fill={color} stroke="white" />)}
      <path d="M50 45h45m-6-6 6 6-6 6" />
      <circle cx="113" cy="45" r="9" fill="#f1c40f" stroke="#171717" />
    </>}
    {stage === 'gather' && <>
      {[48,80,112].map(cx => <g key={cx}><circle cx={cx} cy="30" r="9" /><path d={`M${cx-12} 64V54a12 12 0 0 1 24 0v10`} /><circle cx={cx+12} cy="59" r="4" fill="#f1c40f" stroke="#171717" /></g>)}
    </>}
    {stage === 'play' && <>
      <rect x="31" y="12" width="98" height="55" rx="5" /><path d="M68 78h24M80 67v11" />
      <path d="M44 28h72M44 40h72M44 52h72" stroke="#ddd" />
      <rect x="91" y="23" width="16" height="10" rx="3" fill="#f1c40f" />
      <rect x="68" y="35" width="16" height="10" rx="3" fill="#1d55d7" />
      <rect x="53" y="47" width="16" height="10" rx="3" fill="#e63946" />
    </>}
  </svg>
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
          <p>{project.tagline}</p>
        </div>
        <p className="ar-opening-summary">{project.description}</p>
        <p className="ar-disciplines">Experience Design · Interaction Design · UX Research · Prototyping · Spatial Interaction</p>
        <div className="ar-intro">
          <h3>The starting question</h3>
          <div>
            <p className="ar-lead">Can a museum become a social experience?</p>
            <p>Visitors can explore the same exhibits without ever sharing what caught their attention. The Arena asks how those individual discoveries could become a reason to talk, compare ideas, and play together.</p>
            <p>Developed as an academic concept for the Mercedes-Benz Museum, the experience begins with exploration and culminates in a team game in the restaurant. A proposed color-changing bracelet carries each visitor’s interests into the game, then becomes their controller.</p>
          </div>
        </div>
        <dl className="ar-meta">
          <div><dt>Designed by</dt><dd>Alaa Suliman</dd></div>
          <div><dt>Context</dt><dd>Design & Interaction, M.A.<br />Rhine-Waal University of Applied Sciences</dd></div>
          <div><dt>Focus</dt><dd>Experience design<br />Physical & digital interaction</dd></div>
          <div><dt>Year / outcome</dt><dd>Summer semester 2025<br />Concept & interaction prototype</dd></div>
        </dl>
        <div className="ar-summary">
          <div><strong>Explore</strong><span>Follow your curiosity through the exhibits.</span></div>
          <div><strong>Gather</strong><span>Meet others who noticed the same things.</span></div>
          <div><strong>Play</strong><span>Turn what you discovered into a team experience.</span></div>
        </div>
      </section>

      <figure className="ar-overview">
        <ArenaImage name="arena-overview" alt="The four Arena interest groups: design, vintage cars, mechanical innovation, and racing heritage" sizes="100vw" />
      </figure>

      <section className="ar-container ar-section" aria-label="Why this idea">
        <SectionHeading number="01" label="Why this idea?" title="Give visitors a reason to participate.">
          The selected visitor reviews ask for more opportunities to do something, beyond reading and looking. I explored how a shared activity could extend that participation beyond the exhibits.
        </SectionHeading>
        <div className="ar-two ar-research">
          <div><h4>Listening to visitors</h4><p>The reviews below repeatedly ask for more interactive experiences: hands-on exhibits, opportunities to explore cars, and more activity beyond reading and looking. These comments helped frame an opportunity for greater participation.</p></div>
          <div><h4>Making room for a shared activity</h4><p>My response was to focus on the restaurant as a social extension of the visit. Visitors could pause, share what interested them, and take part in something together. The team game is my design response to that opportunity.</p></div>
        </div>
        <div className="ar-evolution">
          <h4>How the concept developed</h4>
          <ol>
            <li><span>Explore</span><p>Start with visitors’ curiosity about cars. Early app ideas supported learning, but feedback raised a new question: what would give people a reason to take part together?</p></li>
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
          <figure><ArenaImage name="screens" alt="Concept visualization of restaurant visitors playing together with colored bracelets and a shared screen" sizes="(max-width: 800px) 80vw, 350px" /><figcaption><h4>Restaurant screens</h4><p>A shared display presents questions, answer options, and the race. Each team’s car uses its bracelet color, turning individual votes into progress everyone can follow.</p></figcaption></figure>
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
          Visitors explore at their own pace. What catches their attention along the way shapes the team they join at the end of the visit.
        </SectionHeading>
        <div className="ar-journey-diagram">
          <div className="ar-journey-caption"><span className="ar-kicker">Proposed visitor journey</span><span>Follow one visitor from entrance to race</span></div>
          <ol className="ar-journey-flow" aria-label="Visitor journey from check-in to the team game">
            <li>
              <span className="ar-kicker">01 / Museum entrance</span>
              <JourneySymbol stage="arrive" />
              <h4>Receive your bracelet</h4>
              <p>Pick up a transparent bracelet at check-in, then choose your own route through the museum.</p>
              <div className="ar-journey-result"><span>Starting point</span>No team color yet</div>
            </li>
            <li>
              <span className="ar-kicker">02 / Exhibition spaces</span>
              <JourneySymbol stage="explore" />
              <h4>Explore → find your color</h4>
              <p>The proposed beacon system uses time spent in each themed zone to assign an interest color.</p>
              <div className="ar-journey-result"><span>Example</span>Most time in racing → yellow</div>
            </li>
            <li>
              <span className="ar-kicker">03 / Restaurant</span>
              <JourneySymbol stage="gather" />
              <h4>Same color, same team</h4>
              <p>Meet the other visitors wearing your color. Your individual museum routes become a shared team identity.</p>
              <div className="ar-journey-result"><span>Example continues</span>Yellow bracelet → yellow team</div>
            </li>
            <li>
              <span className="ar-kicker">04 / Shared game</span>
              <JourneySymbol stage="play" />
              <h4>Discuss. Vote. Race.</h4>
              <p>Use the bracelet’s A–D buttons to vote. The team’s majority answer determines its response on the shared screen.</p>
              <div className="ar-journey-result"><span>Outcome</span>Individual votes → a team decision</div>
            </li>
          </ol>
          <p className="ar-journey-rule"><strong>When does the game start?</strong> At least four players and two different team colors are needed. Team sizes depend on who is present.</p>
        </div>
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
          <div><p className="ar-kicker">Reflection</p><h4>Designing beyond the exhibit.</h4><p>This project taught me to treat the whole visit as a design opportunity. The restaurant offered a place for individual discoveries to become discussion, decisions, and play. The concept proposes a new role for that everyday pause: a moment when visitors contribute to the experience themselves.</p></div>
        </div>
        <footer className="ar-end"><span>The Arena / Alaa Suliman / 2025</span><span>Academic concept for the Mercedes-Benz Museum</span></footer>
      </section>
    </article>
  )
}
