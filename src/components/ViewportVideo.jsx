import { useEffect, useRef } from 'react'

// Load near the viewport and play only while visible, without playback controls.
export default function ViewportVideo({ src, autoPlay = true, style, ...props }) {
  const ref = useRef(null)

  useEffect(() => {
    const video = ref.current
    let visible = false
    let loaded = false
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncPlayback = () => {
      if (loaded && visible && !document.hidden && autoPlay && !reducedMotion.matches) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    }
    const loadObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video.src = src
        video.load()
        loaded = true
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
    reducedMotion.addEventListener('change', syncPlayback)
    document.addEventListener('visibilitychange', syncPlayback)
    return () => {
      loadObserver.disconnect()
      playObserver.disconnect()
      reducedMotion.removeEventListener('change', syncPlayback)
      document.removeEventListener('visibilitychange', syncPlayback)
      video.pause()
      video.removeAttribute('src')
      video.load()
    }
  }, [src, autoPlay])

  return (
    <video {...props} ref={ref} preload="none" controls={false} muted loop playsInline
      disablePictureInPicture disableRemotePlayback tabIndex={-1}
      style={{ ...style, pointerEvents: 'none' }} />
  )
}
