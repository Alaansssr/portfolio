import { useEffect, useRef, useState } from 'react'

export default function PortfolioHeader({ page }) {
  const headerRef = useRef(null)
  const [light, setLight] = useState(false)

  useEffect(() => {
    if (page !== 'projects') return
    let frame = 0
    const update = () => {
      frame = 0
      const sampleY = (headerRef.current?.offsetHeight ?? 70) / 2
      setLight([...document.querySelectorAll('.case-light')].some(section => {
        const rect = section.getBoundingClientRect()
        return rect.top <= sampleY && rect.bottom > sampleY
      }))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const observer = new ResizeObserver(schedule)
    observer.observe(document.body)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    schedule()
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [page])

  return (
    <header ref={headerRef} className={`hero-header${light ? ' hero-header-light' : ''}`}>
      <span>Portfolio</span>
      <nav className="hero-actions" aria-label="Main navigation">
        <a href="#projects" aria-current={page === 'projects' ? 'page' : undefined}>Home</a>
        <a href="#about" aria-current={page === 'about' ? 'page' : undefined}>About</a>
        <a href="mailto:3la2suliman12345@gmail.com">Contact</a>
      </nav>
    </header>
  )
}
