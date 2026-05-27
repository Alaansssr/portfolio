import { Suspense, lazy, useEffect, useState } from 'react'
import Hero from './components/Hero'
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
  const [projectReady, setProjectReady] = useState(false)

  const activeProject = projects[index]
  const ActiveProjectDetails = projectComponents[activeProject.Component]

  useEffect(() => {
    const timer = setTimeout(() => {
      setProjectReady(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main style={{ width: '100%', minHeight: '100vh' }}>
      <Hero
        index={index}
        setIndex={setIndex}
        projectReady={projectReady}
      />

      {projectReady && (
        <section
          style={{
            minHeight: '100vh',
            padding: '1px 10%',
            background: 'white',
            color: 'black',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <Suspense
            fallback={
              <div style={{ padding: '80px 0', color: '#777' }}>
                Loading project...
              </div>
            }
          >
            <ActiveProjectDetails />
          </Suspense>
        </section>
      )}
    </main>
  )
}