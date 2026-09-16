# Portfolio startup optimization

The interface and carousel remain the same. A 37 KB transparent render of the initial camera view appears while the interactive scene loads. It is a static preview, not interactive 3D; it is removed after models and shaders are ready. There is no loading text or rotating wireframe placeholder.

## Changes

- Versioned models total 4,571,220 bytes, down from 14,664,600 bytes.
- Triangle counts: 47,048 / 48,284 / 243,403, down from 205,838 / 211,242 / 772,537.
- Textures are limited to 1024px, reducing texture upload and GPU memory costs.
- HTML preloads start all model downloads before the 3D module finishes loading.
- Meshopt compression is decoded by the Three.js loader.
- Per-mesh BVH indexes accelerate pointer hit-testing. No global Three.js prototypes are modified.
- The canvas still pauses offscreen or in a hidden tab.
- Vercel immutable cache headers apply only to the explicitly versioned models and preview. Bump filenames and update both index.html and HeroScene.jsx whenever those files change. Keep prior asset URLs available for visitors with an earlier cached JavaScript bundle.

## Local benchmark

Production builds in headless Chrome, 1440 × 900, simulated 10 Mbps download, 80 ms latency, 4× CPU slowdown, empty cache. One controlled run per version; this is not a field-performance guarantee.

| Measurement | Published version | Updated version |
| --- | ---: | ---: |
| Page settled (network idle) | 13.18 s | 4.85 s |
| Model download start | 0.75 s | 0.10 s |
| All model downloads finished | 12.57 s | 4.15 s |
| Preview download finished | — | 0.33 s |
| Median pointer-event handling | 114.9 ms | 0.2 ms |
| 95th percentile pointer handling | 118.8 ms | 0.9 ms |
| Median idle frame interval | 16.7 ms | 16.7 ms |

Pointer timings use 60 synthetic mouse-move events over the active model. Frame intervals use 120 requestAnimationFrame samples after startup. Both versions sustained approximately 60 fps while idle on this machine; the principal smoothness improvement is in pointer handling. Preview download completion is not a first-paint measurement, and network idle is not an exact interactivity measurement.

Model simplification was compared against the previous models using fixed-view screenshots. Original inputs remain in asset-originals.local (excluded from Git). The earlier optimized GLBs remain at their original public URLs for backward compatibility.
