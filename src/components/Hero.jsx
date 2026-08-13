import { useEffect, useRef } from 'react'
import mountains from '../assets/mountains.png'
import rider from '../assets/bike.png'
import './Hero.css'

function Hero() {
  const heroRef = useRef(null)
  const bgLayerRef = useRef(null)
  const wordmarkLayerRef = useRef(null)
  const riderLayerRef = useRef(null)

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
    <section className="hero" ref={heroRef}>
      <div className="hero-bg-layer" ref={bgLayerRef}>
        <img className="hero-bg" src={mountains} alt="" aria-hidden="true" />
      </div>

      <div className="hero-wordmark-layer" ref={wordmarkLayerRef}>
        <span className="hero-wordmark" aria-hidden="true">
          Orca
        </span>
      </div>

      <div className="hero-rider-layer" ref={riderLayerRef}>
        <img className="hero-rider" src={rider} alt="Rider tearing through mud on an ORCA-equipped bike" />
      </div>

      <div className="hero-content">
        <span className="hero-rule" aria-hidden="true" />
        <h1 className="hero-heading">Rule every terrain.</h1>
        <p className="hero-copy">
          Engineered for those who demand more. ORCA gear delivers unmatched
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
    </section>
  )
}

export default Hero
