import { useEffect, useRef, useState } from 'react'
import ViewportVideo from '../components/ViewportVideo'
import './Project1.css'
import { projects } from '../data/projects'

const project = projects.find(item => item.Component === 'Project1')

const assetRoot = '/images/vibrofest/'
const aspects = [
  { label: 'Interface Design', heading: 'A visual language that moves.', summary: 'Reactive type and a walking wordmark turn movement into identity.' },
  { label: 'Haptic System', heading: 'Feel the way.', summary: 'The controller sends left and right vibration cues through ProtoPie.', video: 'haptic-system' },
  { label: 'Game Logic', heading: 'One campus. Two different views.', summary: 'The controller sees the obstacles. The agent follows haptic cues. Position tracking is manual in this prototype.', video: 'game-logic' },
  { label: 'Game Testing', heading: 'Learning through play.', summary: 'Tabletop and campus tests explored how players interpret cues and move together.', video: 'testing' },
]

function SectionHeading({ number, children }) {
  return <h3 className="vp-section-title"><span>{number}</span>{children}</h3>
}

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

export default function Project1() {
  const showcaseRef = useRef(null)
  const [selectedAspect, setSelectedAspect] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const rect = showcaseRef.current.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - showcaseRef.current.querySelector('.vp-showcase-stage').offsetHeight)))
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
  }, [])

  return (
    <article className="vibro-project" aria-label="VIBROFEST project details">
      <section className="vp-container vp-overview" id="vp-overview" aria-label="Question">
        <p className="vp-opening-summary">{project.description}</p>
        
        <div className="vp-intro-grid">
          <SectionHeading number="01">The question</SectionHeading>
          
          <div><p className="vp-lead">Can two strangers learn to trust each other when one sees the route and the other feels the way?</p>
            <p className="vp-question-context">Designed for Freshers’ Week at Rhine-Waal University of Applied Sciences, VIBROFEST brings new students together through shared play.</p>
            
          </div>
        </div>

      </section>

      <div className="vp-cover">
        <Video name="project1" autoPlay caption="VIBROFEST — visual identity and interface exploration." />
      </div>

      <section className="vp-container vp-section" id="vp-how" aria-label="How it works">
        <SectionHeading number="02">How it works</SectionHeading>

        <div className="vp-how-grid">
          <div>
            <div className="vp-role"><span className="vp-kicker">Player 01 / Controller</span><h4>See the route. Send the direction.</h4><p>Views the game map on a tablet and sends haptic signals to guide the second player along the route. Reaching the goal depends on their coordination.</p></div>
            <div className="vp-role"><span className="vp-kicker">Player 02 / Agent</span><h4>Feel the direction. Make the move.</h4><p>Receives the signals through two devices attached to their legs. With no map to look at, this player feels the directional cues and moves accordingly, working with the controller to win the game.</p></div>

          </div>
          <Video name="project1-process" caption="Concept visualization: the campus becomes a “floor is lava” game environment." />
        </div>

      </section>

      <section className="vp-container vp-section case-band case-light" id="vp-process" aria-label="Development">
        <SectionHeading number="03">Development</SectionHeading>
        
        <div className="vp-mapping-grid">
          <Video name="project1-mapping" caption="Mapping the campus: capturing the environment and its boundaries." />
          <Video name="project1-second" caption="Translating the space into a game map with obstacles and controls." />
          <div className="vp-mapping-stills">
            <figure className="vp-media"><img loading="lazy" decoding="async" src="/images/map1.jpg" alt="ProtoPie workspace with color-coded interface controls" /><figcaption>ProtoPie interaction setup.</figcaption></figure>
            <figure className="vp-media"><img loading="lazy" decoding="async" src="/images/map2.jpg" alt="Campus grid with building footprints marked as blocked areas" /><figcaption>Fixed boundaries and blocked areas define where play can happen.</figcaption></figure>
          </div>
        </div>

      </section>

      <section className="vp-showcase" id="vp-showcase" ref={showcaseRef} aria-label="Visual & interaction system">
        <div className="vp-showcase-stage">
        <div className="vp-showcase-heading">
          <SectionHeading number="04">Visual &amp; interaction</SectionHeading>
          <p className="vp-showcase-label" aria-live="polite">04-0{selectedAspect + 1} / {aspects[selectedAspect].label}</p>
        </div>
          {aspects.map((aspect, index) => <section className="vp-showcase-slide" data-active={selectedAspect === index} data-revealed={selectedAspect >= index} data-past={selectedAspect > index} style={{ zIndex: index + 1 }} inert={selectedAspect !== index} key={aspect.label} aria-label={aspect.label}>
            <div className="vp-showcase-media">
              {aspect.video ? <ViewportVideo src={`/videos/${aspect.video}.mp4`} poster={`${assetRoot}${aspect.video}-poster.webp`} autoPlay={selectedAspect === index} loop muted playsInline aria-label={aspect.label} />
                : <img src={`${assetRoot}design-language-1200.webp`} loading="lazy" decoding="async" alt="VIBROFEST design board with its logo, textures and typography" />}
            </div>
            <div className="vp-showcase-caption"><p>{aspect.summary}</p></div>
          </section>)}
        </div>
      </section>

      <section className="vp-container vp-section vp-final" id="vp-experience" aria-label="Experience & reflection">
        <SectionHeading number="05">Experience & reflection</SectionHeading>

        <div className="vp-final-grid">
          <Video name="work1" autoPlay caption="Controller and agent: two roles sharing one challenge." />
          <Video name="work3" caption="A shared game played in the campus environment." />
          <Video name="work2" className="vp-final-wide" caption="The campus as a social playing field." />
        </div>
        <p className="vp-source-note">Concept visualizations, including AI-generated imagery.</p>
        <div className="vp-reflection">

          <div>
            <p>Haptic cues showed potential as a shared language. Feedback variety, connection range and latency still limited the prototype.</p>
            <p className="vp-reflection-takeaway">Designing for movement became an exploration of communication and trust.</p>
          </div>
        </div>
        <div className="vp-end"><span>VIBROFEST / Connecting strangers through touch</span><span>Alaa Suliman · 2026</span></div>
      </section>
    </article>
  )
}
