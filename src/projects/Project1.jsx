import { useEffect, useRef, useState } from 'react'
import ViewportVideo from '../components/ViewportVideo'
import './Project1.css'
import { projects } from '../data/projects'

const project = projects.find(item => item.Component === 'Project1')

const assetRoot = '/images/vibrofest/'
const aspects = [
  {
    image: '/images/final1.jpg',
    label: 'Interface Design',
    heading: 'A visual language that moves.',
    summary: 'The identity connects the game’s two central ideas: physical movement and social connection.',
    points: [
      ['Connecting forms', 'Dynamic blobs and vibration noise, crafted using p5, give connection a visible form.'],
      ['A walking wordmark', 'The minimal logo mimics walking, connecting the name to play on feet.'],
      ['Texture & type', 'Playful textures, Rethink Sans and custom reactive typography shape the visual identity.'],
    ],
  },
  {
    image: '/images/final2.jpg',
    label: 'Haptic System',
    heading: 'Directions become something you feel.',
    summary: 'The controller sends signals through ProtoPie. The agent interprets left/right vibration cues and moves through the physical space.',
    points: [
      ['Input', 'On-screen navigation controls give the controller a way to guide the agent.'],
      ['Output', 'In the documented setup, the agent places a phone in a sock to feel vibration signals while moving.'],
      ['The design question', 'How can different signals feel distinct enough to interpret while moving?'],
    ],
    video: 'haptic-system',
  },
  {
    image: '/images/final3.jpg',
    label: 'Game Logic',
    heading: 'One campus. Two different views.',
    summary: 'A “floor is lava” game turns the campus into a shared arena. The controller sees the obstacles; the agent experiences the route through haptic cues.',
    points: [
      ['Rewards', 'The design includes collecting coins, solving puzzles, covering distance and a time counter.'],
      ['Obstacles', 'Blocked areas and hidden mines shape the route. Harder levels introduce a chase and a darkened “torch view.”'],
      ['Prototype boundary', 'Position tracking is currently manual: the operator drags the agent’s position on the map.'],
    ],
    video: 'game-logic',
  },
  {
    image: '/images/final4.jpg',
    label: 'Game Testing',
    heading: 'Learning the language through play.',
    summary: 'Tabletop and campus tests explored how people interpret signals and work together. The presentation records observations rather than measured performance results.',
    points: [
      ['What worked', 'The team reported clear direction cues, quick adaptation and signs of social bonding after play.'],
      ['What was difficult', 'Coin feedback was unclear, the vibration vocabulary was limited, and range and latency caused problems.'],
      ['What needs development', 'More distinct patterns and more reliable positioning are priorities for the next prototype.'],
    ],
    video: 'testing',
  },
]

function Video({ name, caption, autoPlay = true, className = '' }) {
  return (
    <figure className={`vp-media ${className}`}>
      <ViewportVideo
        src={`/videos/${name}.mp4`}
        poster={`${assetRoot}${name}-poster.webp`}
        autoPlay={autoPlay}
        loop
        muted playsInline
        aria-label={caption}
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

function Photo({ name, alt, caption }) {
  return (
    <figure className="vp-media vp-photo">
      <img src={`${assetRoot}${name}-1200.webp`}
        srcSet={`${assetRoot}${name}-640.webp 640w, ${assetRoot}${name}-1200.webp 1200w`}
        sizes="(max-width: 700px) 80vw, 40vw" loading="lazy" decoding="async" alt={alt} />
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

export default function Project1() {
  const [selectedAspect, setSelectedAspect] = useState(0)
  const [compact, setCompact] = useState(() => window.matchMedia('(max-width: 800px), (max-height: 650px)').matches)

  useEffect(() => {
    const query = window.matchMedia('(max-width: 800px), (max-height: 650px)')
    const update = () => setCompact(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  const stickySectionRef = useRef(null)
  const activeAspect = aspects[selectedAspect]

  useEffect(() => {
    if (compact) return
    let frame = 0
    const update = () => {
      frame = 0
      if (!stickySectionRef.current) return
      const rect = stickySectionRef.current.getBoundingClientRect()
      const progress = Math.min(Math.max(-rect.top / Math.max(1, rect.height - window.innerHeight), 0), 1)
      setSelectedAspect(Math.min(aspects.length - 1, Math.floor(progress * aspects.length)))
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    schedule()
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [compact])

  const selectAspect = (index) => {
    if (compact) {
      document.getElementById(`vp-chapter-${index}`)?.scrollIntoView({ behavior: 'instant', block: 'start' })
      return
    }
    const section = stickySectionRef.current
    const scrollRange = section.offsetHeight - window.innerHeight
    window.scrollTo({
      top: window.scrollY + section.getBoundingClientRect().top + scrollRange * ((index + 0.12) / aspects.length),
      behavior: 'instant',
    })
    setSelectedAspect(index)
  }

  return (
    <article className="vibro-project" aria-labelledby="vp-title">
      <section className="vp-container vp-overview">
        <p className="vp-kicker">University project · 2026</p>
        <div className="vp-title-row">
          <h2 id="vp-title">VIBROFEST</h2>
          <p>{project.tagline}</p>
        </div>
        <p className="vp-opening-summary">{project.description}</p>
        <p className="vp-disciplines">Interaction Design · Haptics · Physical Computing · Game Design · Prototyping</p>
        <div className="vp-intro-grid">
          <h3>The starting question</h3>
          <div><p className="vp-lead">Can two strangers learn to trust each other when one sees the route and the other feels the way?</p>
            <p>VIBROFEST connects two different perspectives: one player reads a map on a screen and sends vibration cues, while the other interprets those cues and moves through physical space. The project explores how this shared responsibility can encourage communication, cooperation, and trust.</p>
            <p>Designed with new university students in mind, the project brings this question into Freshers’ Week — a moment when strangers are looking for ways to connect.</p>
          </div>
        </div>
        <dl className="vp-meta">
          <div><dt>Designed by</dt><dd>Alaa Suliman</dd></div>
          <div><dt>Context</dt><dd>Rhein-Waal Hochschule<br />Design &amp; Interaction Project 2</dd></div>
          <div><dt>Designed for</dt><dd>University students<br />Freshers’ Week</dd></div>
          <div><dt>Project presentation</dt><dd>27 January 2026<br />Winter semester 2025</dd></div>
        </dl>
        <div className="vp-summary-line"><span><strong>2 players</strong> Different roles</span><span><strong>1 shared goal</strong> Cooperative play</span><span><strong>Haptic feedback</strong> A physical language</span></div>
      </section>

      <div className="vp-cover">
        <Video name="project1" autoPlay caption="VIBROFEST — visual identity and interface exploration." />
      </div>

      <section className="vp-container vp-section" aria-labelledby="vp-how">
        <div className="vp-heading"><span className="vp-kicker">01 / The concept</span><h3 id="vp-how">How it works</h3><p>One player sees the route. The other feels the way. The current prototype explores the question through two different roles: the controller uses a screen to send cues, while the moving player follows vibrations.</p></div>
        <div className="vp-how-grid">
          <div>
            <div className="vp-role"><span className="vp-kicker">Player 01 / Controller</span><h4>The eyes &amp; brain.</h4><p>Sees the map and obstacles, then sends navigation cues. The controller can guide the agent but cannot move for them.</p></div>
            <div className="vp-role"><span className="vp-kicker">Player 02 / Agent</span><h4>The feet &amp; movement.</h4><p>Interprets vibration signals and moves in physical space, without the controller’s view of the obstacles.</p></div>
            <p className="vp-callout">Different information creates a shared responsibility: neither player can win alone.</p>
          </div>
          <Video name="project1-process" caption="Concept visualization: the campus becomes a “floor is lava” game environment." />
        </div>
        <ol className="vp-flow" aria-label="How the interaction flows"><li>Controller reads the map</li><li>Sends a vibration cue</li><li>Agent interprets &amp; moves</li><li>Both respond together</li></ol>
      </section>

      <section className="vp-container vp-section" aria-labelledby="vp-process">
        <div className="vp-heading"><span className="vp-kicker">02 / Development</span><h3 id="vp-process">From vibration to shared play.</h3><p>The process began by researching how vibration could communicate meaning. Exploring real-life applications led to a cooperative game designed to bring people together, followed by campus mapping, interface design and prototyping in ProtoPie.</p></div>
        <div className="vp-journey">
          <h4>How the idea evolved</h4>
          <ol><li><span>Research</span>Understanding how vibration can work as a language</li><li><span>Explore</span>Finding a meaningful application for haptic communication in real-life events</li><li><span>Apply</span>Creating a cooperative game that helps people connect through shared play</li></ol>
        </div>
        <div className="vp-mapping-grid">
          <Video name="project1-mapping" caption="Mapping the campus: capturing the environment and its boundaries." />
          <Video name="project1-second" caption="Translating the space into a game map with obstacles and controls." />
          <div className="vp-mapping-stills">
            <figure className="vp-media"><img loading="lazy" decoding="async" src="/images/map1.jpg" alt="ProtoPie workspace with color-coded interface controls" /><figcaption>ProtoPie interaction setup.</figcaption></figure>
            <figure className="vp-media"><img loading="lazy" decoding="async" src="/images/map2.jpg" alt="Campus grid with building footprints marked as blocked areas" /><figcaption>Fixed boundaries and blocked areas define where play can happen.</figcaption></figure>
          </div>
        </div>
        <p className="vp-process-note"><strong>Mapping is part of the game logic.</strong> Existing structures stay blocked while playable areas provide space for spawning obstacles and rewards.</p>
      </section>

      <section className={`vp-aspects ${compact ? 'vp-compact' : ''}`} ref={stickySectionRef} aria-label="Design language, haptics, game mechanics and testing">
        <div className="vp-aspects-sticky">
          <div className="vp-aspect-top"><p className="vp-kicker">03 / Inside the project</p><span className="vp-scroll-hint">Scroll to explore · or choose a chapter</span></div>
          <nav className="vp-aspect-nav" aria-label="Project chapters">
            {aspects.map((item, index) => (
              <button key={item.label} type="button" aria-current={!compact && selectedAspect === index ? 'step' : undefined}
                onClick={() => selectAspect(index)} aria-controls={compact ? `vp-chapter-${index}` : 'vp-active-explanation'}>
                <img src={item.image} loading="lazy" decoding="async" alt="" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
          {!compact ? <div className="vp-aspect-body">
            <div className="vp-media-window">
              <div className="vp-media-strip" style={{ transform: `translateX(-${selectedAspect * 25}%)` }}>
                <div className="vp-media-slide" inert={selectedAspect !== 0}><img src={`${assetRoot}design-language-1200.webp`} loading="lazy" decoding="async" alt="Design board showing connecting blobs, the walking wordmark, textures and typography" /></div>
                {aspects.slice(1).map((aspect, index) => (
                  <div className="vp-media-slide" key={aspect.video} inert={selectedAspect !== index + 1}>
                    <ViewportVideo src={`/videos/${aspect.video}.mp4`} poster={`${assetRoot}${aspect.video}-poster.webp`}
                      autoPlay={selectedAspect === index + 1} loop muted playsInline aria-label={aspect.label} />
                  </div>
                ))}
              </div>
            </div>
            <div className="vp-aspect-copy" id="vp-active-explanation">
              <p className="vp-kicker">0{selectedAspect + 1} / {activeAspect.label}</p>
              <h3>{activeAspect.heading}</h3><p>{activeAspect.summary}</p>
              <dl>{activeAspect.points.map(([title, copy]) => <div key={title}><dt>{title}</dt><dd>{copy}</dd></div>)}</dl>
            </div>
          </div> : <div className="vp-mobile-chapters">
            {aspects.map((aspect, index) => <section className="vp-mobile-chapter" id={`vp-chapter-${index}`} key={aspect.label}>
              <div className="vp-aspect-copy"><p className="vp-kicker">0{index + 1} / {aspect.label}</p><h3>{aspect.heading}</h3><p>{aspect.summary}</p></div>
              {aspect.video ? <Video name={aspect.video} caption={aspect.label} /> : <figure className="vp-media"><img src={`${assetRoot}design-language-1200.webp`} loading="lazy" decoding="async" alt="VIBROFEST design board with its logo, textures and typography" /></figure>}
              <dl className="vp-mobile-notes">{aspect.points.map(([title, copy]) => <div key={title}><dt>{title}</dt><dd>{copy}</dd></div>)}</dl>
            </section>)}
          </div>}
        </div>
      </section>

      <section className="vp-container vp-section vp-testing" aria-labelledby="vp-testing-title">
        <div className="vp-heading"><span className="vp-kicker">Testing / A closer look</span><h3 id="vp-testing-title">From paper prototypes to shared play.</h3><p>Original project photographs show early tabletop sessions exploring navigation, vibration cues and cooperation.</p></div>
        <div className="vp-photo-grid">
          <Photo name="prototype-session" alt="A participant testing an input device beside a paper game map and vibration chart" caption="Exploring the relationship between input, vibration signals and a paper game map." />
          <Photo name="cooperative-test" alt="Two participants working together on the paper game map" caption="Two participants interpreting the route together in a tabletop prototype session." />
        </div>
        <details className="vp-future vp-paper"><summary>See the paper prototype <span aria-hidden="true">+</span></summary><div><Photo name="paper-prototype" alt="Paper game paths, colored pieces and a vibration chart used in the prototype tests" caption="A paper game map and vibration chart from the original testing sessions." /></div></details>
        <div className="vp-findings">
          <div><h4>What the team observed</h4><ul><li>Haptic direction cues were reported as clearer to decode than spoken instructions.</li><li>Participants became familiar with the cues quickly.</li><li>The team noted social bonding that continued after the test.</li></ul></div>
          <div><h4>Where the prototype fell short</h4><ul><li>Coin-related vibration feedback was difficult to interpret.</li><li>A small range of vibration patterns limited the feedback vocabulary.</li><li>Limited connection range and occasional latency affected play.</li></ul></div>
        </div>
        <p className="vp-source-note">Qualitative observations from the project presentation. Participant counts and quantitative measurements were not documented.</p>
        <details className="vp-future"><summary>What comes next <span aria-hidden="true">+</span></summary><div><p>The presentation proposes moving from manual position tracking to UWB anchors, and from ProtoPie signals to Unity + Firebase for automated collision detection. These are future development directions, alongside a proposed Freshers’ Week launch.</p><p><strong>Current prototype:</strong> manual tracking and ProtoPie signals.<br /><strong>Next ambition:</strong> more reliable tracking, clearer feedback and automatic game-state updates.</p></div></details>
      </section>

      <section className="vp-container vp-section vp-final" aria-labelledby="vp-final-title">
        <div className="vp-heading"><span className="vp-kicker">04 / The experience</span><h3 id="vp-final-title">Play together. Find your way together.</h3><p>These visualizations show the intended dynamic between controller and agent: the route is digital, but the challenge is shared in physical space.</p></div>
        <div className="vp-final-grid">
          <Video name="work1" autoPlay caption="Controller and agent: two roles sharing one challenge." />
          <Video name="work3" caption="A shared game played in the campus environment." />
          <Video name="work2" className="vp-final-wide" caption="The campus as a social playing field." />
        </div>
        <p className="vp-source-note">Concept visualizations, including AI-generated imagery; prototype testing is documented in the section above.</p>
        <div className="vp-end"><span>VIBROFEST / Connecting strangers through touch</span><span>Alaa Suliman · 2026</span></div>
      </section>
    </article>
  )
}
