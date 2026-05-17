import { useState } from 'react'
import Hero from './components/Hero'
import { projects } from './data/projects'

import Project1 from './projects/Project1'
import Project2 from './projects/Project2'
import Project3 from './projects/Project3'

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

      {/* HERO */}
      <Hero index={index} setIndex={setIndex} />

      {/* DETAILS SECTION (WHITE) */}
      <section
        style={{
          minHeight: '100vh',
          padding: '1px 10%',
          background: 'white',   // ✅ FIXED HERE
          color: 'black',        // ✅ FIXED HERE
          fontFamily: 'system-ui, sans-serif',
        }}
      >

        {/* PROJECT CONTENT */}
        <ActiveProjectDetails />

      </section>

    </main>
  )
}