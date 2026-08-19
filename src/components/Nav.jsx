import { useState } from 'react'
import cartIcon from '../assets/cart-icon.png'
import { useCart } from '../context/useCart.js'
import './Nav.css'

const LINKS = [
  { label: 'Shop', href: '#shop', active: true },
  { label: 'New Arrivals', href: '#' },
  { label: 'Collections', href: '#' },
  { label: 'About', href: '#' },
]

function Nav() {
  const [open, setOpen] = useState(false)
  const { itemCount, openCart } = useCart()

  return (
    <header className="nav">
      <div className="nav-bar">
        <a className="nav-logo" href="#" aria-label="Moto Tron home">
          Moto Tron
        </a>

        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={link.active ? 'active' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <label className="nav-search">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
              <path d="M20 20l-4.3-4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input type="search" placeholder="Search..." aria-label="Search" />
          </label>
          <button
            type="button"
            className="icon-btn cart"
            aria-label={`Cart, ${itemCount} item${itemCount === 1 ? '' : 's'}`}
            onClick={openCart}
          >
            <img src={cartIcon} alt="" />
            <span className="badge">{itemCount}</span>
          </button>
          <button
            type="button"
            className={`nav-toggle ${open ? 'is-open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <nav
        className={`nav-mobile ${open ? 'is-open' : ''}`}
        aria-label="Mobile"
      >
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={link.active ? 'active' : undefined}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

export default Nav
