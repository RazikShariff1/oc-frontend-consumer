import { useEffect, useRef, useState } from 'react'
import mountains from '../assets/mountains.png'
import rider from '../assets/biker3.png'
import bikeLeft from '../assets/bike.png'
import bikeRight from '../assets/bike2.png'
import './Hero.css'

const STICKY_TOP_OFFSET = 86 // must match .hero-pin's `top` in Hero.css (height of the sticky nav)
const SHRINK_RUNWAY_PX = 800 // fixed scroll distance the shrink plays out over, independent of stage height
const MAX_RADIUS = 20
const NEIGHBOR_REVEAL_START = 0.75 // fraction of shrink progress at which neighbours start fading in
const DOCKED_THRESHOLD = 0.98 // progress past which the nav arrows become usable
const SLIDE_MS = 550 // must match the transition duration on .hero-slot.is-animating in Hero.css

// Placeholder copy/CTAs are shared across slides for now — swap in real
// per-slide content when it's available.
const SLIDES = [
  {
    id: 'terrain',
    bg: mountains,
    riderImg: rider,
    heading: 'Rule every terrain.',
    copy: 'Engineered for those who demand more. MOTO TRON gear delivers unmatched performance, precision, and durability across every terrain.',
  },
  {
    id: 'grip',
    bg: bikeRight,
    riderImg: null,
    heading: 'Rule every terrain.',
    copy: 'Engineered for those who demand more. MOTO TRON gear delivers unmatched performance, precision, and durability across every terrain.',
  },
  {
    id: 'dust',
    bg: bikeLeft,
    riderImg: null,
    heading: 'Rule every terrain.',
    copy: 'Engineered for those who demand more. MOTO TRON gear delivers unmatched performance, precision, and durability across every terrain.',
  },
]

// The hero docks down to 80% of the viewport width, at a 16:9 ratio.
function getPrimaryTargetSize() {
  const width = window.innerWidth * 0.8
  return { width, height: (width * 9) / 16 }
}

function reduceMotionPreferred() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  // While non-null, we're mid-slide: { direction, fromIndex, toIndex, outerIndex, phase }
  // phase 'start' = elements placed at their pre-move offsets (no transition);
  // phase 'end' = same elements animated to their post-move offsets.
  const [transition, setTransition] = useState(null)
  const transitionRef = useRef(null)

  const stageRef = useRef(null)
  const pinRef = useRef(null)
  const primaryRef = useRef(null)
  const heroRef = useRef(null)
  const bgLayerRef = useRef(null)
  const wordmarkLayerRef = useRef(null)
  const riderLayerRef = useRef(null)

  const primary = SLIDES[activeIndex]
  const leftSlide = SLIDES[(activeIndex - 1 + SLIDES.length) % SLIDES.length]
  const rightSlide = SLIDES[(activeIndex + 1) % SLIDES.length]

  const goTo = (direction) => {
    if (transitionRef.current) return // a slide is already in flight — ignore

    const toIndex = (activeIndex + direction + SLIDES.length) % SLIDES.length

    if (reduceMotionPreferred()) {
      setActiveIndex(toIndex)
      return
    }

    const outerIndex = (activeIndex - direction + SLIDES.length) % SLIDES.length
    const next = { direction, fromIndex: activeIndex, toIndex, outerIndex, phase: 'start' }
    transitionRef.current = next
    setTransition(next)

    // Double rAF: let the browser paint the "start" offsets (no transition)
    // before flipping to "end" — otherwise the two style writes can collapse
    // into one and nothing animates.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (transitionRef.current !== next) return
        const ended = { ...next, phase: 'end' }
        transitionRef.current = ended
        setTransition(ended)
      })
    })
  }

  const commitTransition = () => {
    const current = transitionRef.current
    if (!current || current.phase !== 'end') return
    setActiveIndex(current.toIndex)
    transitionRef.current = null
    setTransition(null)
  }

  // Drives the hero's width/height/radius from "full bleed" down to its
  // docked size as the stage scrolls through — a zoom-out, not a slider.
  useEffect(() => {
    const stage = stageRef.current
    const pin = pinRef.current
    const primaryEl = primaryRef.current
    if (!stage || !pin || !primaryEl) return
    const reduceMotion = reduceMotionPreferred()

    // Browsers restore the previous scroll position on refresh by default,
    // which would drop the pinned hero straight into a partially-docked
    // state. Force every load to start at the top instead.
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)

    let naturalWidth = primaryEl.getBoundingClientRect().width
    let naturalHeight = primaryEl.getBoundingClientRect().height
    let frame = null

    const measure = () => {
      naturalWidth = stage.clientWidth

      // On desktop, the slides are all position:absolute (by design, to
      // recreate the layered layout), so .hero-pin has no in-flow content to
      // size an "auto" height from — measuring it would collapse to ~0.
      // Use the same formula the desktop layout used to size it explicitly.
      const isDesktop = window.matchMedia('(min-width: 960px)').matches
      if (isDesktop) {
        naturalHeight = Math.min(Math.max(560, window.innerWidth * 0.46), 760)
      } else {
        pin.style.setProperty('--primary-w', '100%')
        pin.style.setProperty('--primary-h', 'auto')
        naturalHeight = primaryEl.getBoundingClientRect().height
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

      // Side slides match the docked hero's own size exactly, sitting just
      // outside its left/right edges — only fully revealed once the
      // zoom-out finishes, so they read as "what's next" rather than
      // clutter mid-shrink.
      const neighborOpacity = Math.min(
        Math.max((progress - NEIGHBOR_REVEAL_START) / (1 - NEIGHBOR_REVEAL_START), 0),
        1,
      )
      pin.style.setProperty('--neighbor-opacity', `${neighborOpacity}`)
      // The nav arrows (and the slide interaction generally) only make sense
      // once the dock has essentially finished.
      pin.classList.toggle('is-docked', progress >= DOCKED_THRESHOLD)
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

  // Fallback commit in case a transitionend event gets dropped (e.g. the tab
  // was backgrounded mid-animation) — keeps the carousel from getting stuck.
  useEffect(() => {
    if (!transition || transition.phase !== 'end') return undefined
    const timer = setTimeout(commitTransition, SLIDE_MS + 150)
    return () => clearTimeout(timer)
  }, [transition])

  useEffect(() => {
    const hero = heroRef.current
    if (!hero || reduceMotionPreferred()) return undefined

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
  }, [activeIndex])

  // The image row: 3 slots at rest (left peek / center / right peek), or 4
  // while a slide is in flight — see the module comment above `goTo` for the
  // choreography (an "outer" slide simultaneously exits one side and
  // re-enters, off-screen, on the other, since a 3-item loop only ever has
  // one candidate for "what's coming next").
  let slots
  if (!transition) {
    slots = [
      { key: 'left', m: -1, slide: leftSlide, isActive: false },
      { key: 'center', m: 0, slide: primary, isActive: true },
      { key: 'right', m: 1, slide: rightSlide, isActive: false },
    ]
  } else {
    const { direction: d, fromIndex, toIndex, outerIndex, phase } = transition
    const m =
      phase === 'start'
        ? { A: -d, B: 0, C: d, D: 2 * d }
        : { A: -2 * d, B: -d, C: 0, D: d }
    slots = [
      { key: 'A', m: m.A, slide: SLIDES[outerIndex], isActive: false },
      { key: 'B', m: m.B, slide: SLIDES[fromIndex], isActive: false },
      { key: 'C', m: m.C, slide: SLIDES[toIndex], isActive: false },
      { key: 'D', m: m.D, slide: SLIDES[outerIndex], isActive: false },
    ]
  }
  const isAnimating = transition?.phase === 'end'

  return (
    <section className="hero-stage" ref={stageRef}>
      <div className="hero-pin" ref={pinRef}>
        <div className="hero-track" ref={primaryRef}>
          {slots.map((slot) => (
            <div
              key={slot.key}
              className={`hero-slot${slot.isActive ? ' hero-slot-active' : ''}${isAnimating ? ' is-animating' : ''}`}
              style={{ '--slot-m': slot.m }}
              onTransitionEnd={slot.key === 'C' ? commitTransition : undefined}
            >
              {slot.isActive ? (
                <div className="hero-bg-layer" ref={bgLayerRef}>
                  <img className="hero-bg" src={slot.slide.bg} alt="" aria-hidden="true" />
                </div>
              ) : (
                <img className="hero-bg" src={slot.slide.bg} alt="" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          className="hero-nav hero-nav-left"
          onClick={() => goTo(-1)}
          aria-label="Show previous slide"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M15 5 8 12l7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          className="hero-nav hero-nav-right"
          onClick={() => goTo(1)}
          aria-label="Show next slide"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="m9 5 7 7-7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={`hero-content-overlay${transition ? ' is-hidden' : ''}`} ref={heroRef} key={primary.id}>
          <div className="hero-wordmark-layer" ref={wordmarkLayerRef}>
            <span className="hero-wordmark" aria-hidden="true">
              Moto Tron
            </span>
          </div>

          {primary.riderImg && (
            <div className="hero-rider-layer" ref={riderLayerRef}>
              <img
                className="hero-rider"
                src={primary.riderImg}
                alt="Rider tearing through mud on a MOTO TRON-equipped bike"
              />
            </div>
          )}

          <div className="hero-content">
            <span className="hero-rule" aria-hidden="true" />
            <h1 className="hero-heading">{primary.heading}</h1>
            <p className="hero-copy">{primary.copy}</p>
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
    </section>
  )
}

export default Hero
