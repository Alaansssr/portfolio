import { Suspense, lazy, useEffect, useState } from 'react'
import Hero from './components/Hero'
import About from './components/About'
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
  const [page, setPage] = useState(() => window.location.hash === '#about' ? 'about' : 'projects')

  useEffect(() => {
    const updatePage = () => setPage(window.location.hash === '#about' ? 'about' : 'projects')
    window.addEventListener('hashchange', updatePage)
    return () => window.removeEventListener('hashchange', updatePage)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [page])

  const activeProject = projects[index]
  const ActiveProjectDetails = projectComponents[activeProject.Component]

  if (page === 'about') return <About />

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
        </Suspense>
      </section>
    </main>
  )
}
