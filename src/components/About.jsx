import PortfolioHeader from './PortfolioHeader'
import './Hero.css'

export default function About() {
  return (
    <main className="about-page">
      <PortfolioHeader page="about" />
      <article className="about-content" aria-labelledby="about-title">
        <h1 id="about-title">About</h1>
        <p>I’m a spatial and interaction designer based in Germany. My work explores the relationship between people, space, technology, and experience, with a particular interest in immersive environments, interactive systems, and new forms of digital-physical interaction.</p>
        <p>My background in architecture shapes the way I think about space, movement, scale, and human behavior, while my current practice expands into interaction design, creative technology, and experience design.</p>
        <p>I’m especially interested in how emerging technologies, including AI, can influence the way we design, navigate, and interact with physical and digital environments. I see technology not just as a tool, but as a material that can shape behavior, atmosphere, and experience.</p>
        <p>My practice sits between spatial design, interaction, and experimentation, with a focus on creating experiences that feel intuitive, engaging, and meaningful.</p>
        <section className="about-details" aria-labelledby="about-skills">
          <h2 id="about-skills">Skills</h2>
          <dl>
            <div><dt>Design</dt><dd>Spatial Design, Interaction Design, UX/UI, 3D Visualization</dd></div>
            <div><dt>Creative Technology</dt><dd>AI, Interactive Experiences, Immersive Design</dd></div>
            <div><dt>Development</dt><dd>Creative Coding, Interactive Web</dd></div>
          </dl>
        </section>
        <section className="about-details" aria-labelledby="about-experience">
          <h2 id="about-experience">Experience</h2>
          <dl>
            <div><dt>Designer / Architect</dt><dd>Architecture, Spatial Design &amp; Visualization</dd></div>
          </dl>
        </section>
        <section className="about-details" aria-labelledby="about-education">
          <h2 id="about-education">Education</h2>
          <dl>
            <div><dt>MA Design and Interaction</dt><dd>Rhine-Waal University of Applied Sciences</dd></div>
            <div><dt>Architecture</dt><dd>Tishrin University</dd></div>
          </dl>
        </section>
      </article>
    </main>
  )
}
