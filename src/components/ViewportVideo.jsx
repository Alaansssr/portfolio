import { useEffect, useRef } from 'react'

// Attach the source only near the viewport; decode/play only while visible.
export default function ViewportVideo({ src, autoPlay, ...props }) {
  const ref = useRef(null)

  useEffect(() => {
    const video = ref.current
    let visible = false
    const syncPlayback = () => {
      if (visible && !document.hidden && autoPlay) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    }
    const loadObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video.src = src
        video.load()
        syncPlayback()
        loadObserver.disconnect()
      }
    }, { rootMargin: '250px' })
    const playObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      syncPlayback()
    })
    loadObserver.observe(video)
    playObserver.observe(video)
    document.addEventListener('visibilitychange', syncPlayback)
    return () => {
      loadObserver.disconnect()
      playObserver.disconnect()
      document.removeEventListener('visibilitychange', syncPlayback)
      video.pause()
      video.removeAttribute('src')
      video.load()
    }
  }, [src, autoPlay])

  return <video {...props} ref={ref} preload="none" />
}
