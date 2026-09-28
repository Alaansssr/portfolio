import { Suspense, lazy, useState } from 'react'
import Hero from './components/Hero'
import './editorial.css'
import { projects } from './data/projects'

const Project1 = lazy(() => import('./projects/Project1'))
const Project2 = lazy(() => import('./projects/Project2'))
const Project3 = lazy(() => import('./projects/Project3'))

const projectComponents = {
  Project1,
  Project2,
  Project3,
}

export default function App() {
  const [index, setIndex] = useState(0)

  const activeProject = projects[index]
  const ActiveProjectDetails = projectComponents[activeProject.Component]

  return (
    <main style={{ width: '100%', minHeight: '100vh' }}>
      <Hero
        index={index}
        setIndex={setIndex}
      />

      <section
        id="project-content"
        style={{
          minHeight: '100vh',
          padding: '1px 10%',
          background: 'var(--case-bg)',
          color: 'var(--case-ink)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <Suspense
          fallback={
            <div style={{ padding: '80px 0', color: 'var(--case-muted)' }}>
              Loading project...
            </div>
          }
        >
          <ActiveProjectDetails />
          <nav className="case-return" aria-label="Case study navigation">
            <a href="#projects" onClick={event => {
              event.preventDefault()
              const target = document.getElementById('projects')
              target?.focus({ preventScroll: true })
              target?.scrollIntoView({ behavior: 'instant', block: 'start' })
              if (target && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                target.animate([{ opacity: .65 }, { opacity: 1 }], { duration: 220, easing: 'ease-out' })
              }
            }}>
              <span>Back to projects</span><span aria-hidden="true">↑</span>
            </a>
          </nav>
        </Suspense>
      </section>
    </main>
  )
}
