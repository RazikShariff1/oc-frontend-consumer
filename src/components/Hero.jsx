import { useEffect, useRef } from 'react'
import mountains from '../assets/mountains.png'
import rider from '../assets/biker3.png'
import bikeLeft from '../assets/bike.png'
import bikeRight from '../assets/bike2.png'
import './Hero.css'

const STICKY_TOP_OFFSET = 86 // must match .hero-pin's `top` in Hero.css (height of the sticky nav)
const SHRINK_RUNWAY_PX = 800 // fixed scroll distance the shrink plays out over, independent of stage height
const MAX_RADIUS = 20
const NEIGHBOR_GAP = 24 // px gap between the docked hero and the peeking neighbours
const NEIGHBOR_REVEAL_START = 0.75 // fraction of shrink progress at which neighbours start fading in

// The hero docks down to 80% of the viewport width, at a 16:9 ratio.
function getPrimaryTargetSize() {
  const width = window.innerWidth * 0.8
  return { width, height: (width * 9) / 16 }
}

function Hero() {
  const stageRef = useRef(null)
  const pinRef = useRef(null)
  const primaryRef = useRef(null)
  const heroRef = useRef(null)
  const bgLayerRef = useRef(null)
  const wordmarkLayerRef = useRef(null)
  const riderLayerRef = useRef(null)

  // Drives the hero's width/height/radius from "full bleed" down to its
  // docked size as the stage scrolls through — a zoom-out, not a slider.
  useEffect(() => {
    const stage = stageRef.current
    const pin = pinRef.current
    const primary = primaryRef.current
    if (!stage || !pin || !primary) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Browsers restore the previous scroll position on refresh by default,
    // which would drop the pinned hero straight into a partially-docked
    // state. Force every load to start at the top instead.
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)

    let naturalWidth = primary.getBoundingClientRect().width
    let naturalHeight = primary.getBoundingClientRect().height
    let frame = null

    const measure = () => {
      naturalWidth = stage.clientWidth

      // On desktop, .hero's children are all position:absolute (by design,
      // to recreate the layered layout), so it has no in-flow content to
      // size an "auto" height from — measuring it would collapse to ~0.
      // Use the same formula the desktop layout used to size .hero explicitly.
      const isDesktop = window.matchMedia('(min-width: 960px)').matches
      if (isDesktop) {
        naturalHeight = Math.min(Math.max(560, window.innerWidth * 0.46), 760)
      } else {
        pin.style.setProperty('--primary-w', '100%')
        pin.style.setProperty('--primary-h', 'auto')
        naturalHeight = primary.getBoundingClientRect().height
      }

      update()
    }

    const update = () => {
      if (reduceMotion) {
        pin.style.setProperty('--primary-w', '100%')
        pin.style.setProperty('--primary-h', `${naturalHeight}px`)
        pin.style.setProperty('--primary-radius', '0px')
        pin.style.setProperty('--neighbor-opacity', '0')
        return
      }

      const stageRect = stage.getBoundingClientRect()
      const progress = Math.min(Math.max((STICKY_TOP_OFFSET - stageRect.top) / SHRINK_RUNWAY_PX, 0), 1)

      const { width: targetWidth, height: targetHeight } = getPrimaryTargetSize()

      const width = naturalWidth - progress * (naturalWidth - targetWidth)
      const height = naturalHeight - progress * (naturalHeight - targetHeight)

      pin.style.setProperty('--primary-w', `${width}px`)
      pin.style.setProperty('--primary-h', `${height}px`)
      pin.style.setProperty('--primary-radius', `${progress * MAX_RADIUS}px`)

      // Neighbours match the docked hero's own size exactly, sitting just
      // outside its left/right edges — only fully revealed once the
      // zoom-out finishes, so they read as "what's next" rather than clutter
      // mid-shrink.
      const neighborOpacity = Math.min(
        Math.max((progress - NEIGHBOR_REVEAL_START) / (1 - NEIGHBOR_REVEAL_START), 0),
        1,
      )
      pin.style.setProperty('--neighbor-opacity', `${neighborOpacity}`)
      pin.style.setProperty('--neighbor-left-x', `${-(width * 1.5 + NEIGHBOR_GAP)}px`)
      pin.style.setProperty('--neighbor-right-x', `${width * 0.5 + NEIGHBOR_GAP}px`)
    }

    const handleScroll = () => {
      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    const handleResize = () => {
      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const hero = heroRef.current
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = null

    const applyParallax = (x, y) => {
      if (bgLayerRef.current) {
        bgLayerRef.current.style.transform = `translate3d(${x * -10}px, ${y * -6}px, 0)`
      }
      if (wordmarkLayerRef.current) {
        wordmarkLayerRef.current.style.transform = `translate3d(${x * -18}px, ${y * -10}px, 0)`
      }
      if (riderLayerRef.current) {
        riderLayerRef.current.style.transform = `translate3d(${x * 22}px, ${y * 12}px, 0)`
      }
    }

    const handleMove = (event) => {
      const rect = hero.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5

      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => applyParallax(x, y))
    }

    const handleLeave = () => {
      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => applyParallax(0, 0))
    }

    hero.addEventListener('mousemove', handleMove)
    hero.addEventListener('mouseleave', handleLeave)

    return () => {
      hero.removeEventListener('mousemove', handleMove)
      hero.removeEventListener('mouseleave', handleLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section className="hero-stage" ref={stageRef}>
      <div className="hero-pin" ref={pinRef}>
        <div className="hero-neighbor hero-neighbor-left" aria-hidden="true">
          <img src={bikeLeft} alt="" />
        </div>
        <div className="hero-neighbor hero-neighbor-right" aria-hidden="true">
          <img src={bikeRight} alt="" />
        </div>
        <div className="hero-frame" ref={primaryRef}>
          <div className="hero" ref={heroRef}>
            <div className="hero-bg-layer" ref={bgLayerRef}>
              <img className="hero-bg" src={mountains} alt="" aria-hidden="true" />
            </div>

            <div className="hero-wordmark-layer" ref={wordmarkLayerRef}>
              <span className="hero-wordmark" aria-hidden="true">
                Moto Tron
              </span>
            </div>

            <div className="hero-rider-layer" ref={riderLayerRef}>
              <img
                className="hero-rider"
                src={rider}
                alt="Rider tearing through mud on a MOTO TRON-equipped bike"
              />
            </div>

            <div className="hero-content">
              <span className="hero-rule" aria-hidden="true" />
              <h1 className="hero-heading">Rule every terrain.</h1>
              <p className="hero-copy">
                Engineered for those who demand more. MOTO TRON gear delivers unmatched
                performance, precision, and durability across every terrain.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#shop">
                  Shop Now
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M5 12h14m0 0-5-5m5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a className="btn btn-secondary" href="#collections">
                  Explore Collection
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
