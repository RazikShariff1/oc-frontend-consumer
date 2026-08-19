// Small hand-drawn line icon set, matching the stroke style already used for
// the search/hamburger icons in Nav.jsx (stroke="currentColor", round caps).
// Kept local rather than pulling in an icon library since this is a handful
// of one-off glyphs, not a general-purpose icon system.

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export function HelmetIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 15a8 8 0 0 1 16 0v2a1 1 0 0 1-1 1h-2.5" />
      <path d="M4 15v3a1 1 0 0 0 1 1h6" />
      <path d="M11 19c3-.2 5-1.2 6.2-2.6" />
      <path d="M4 15c0-1.4.9-2.2 2-2.2" />
    </svg>
  )
}

export function JacketIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M9 3 5 5.5 3 9l2.2 1.6L6 20h5" />
      <path d="M15 3l4 2.5L21 9l-2.2 1.6L18 20h-5" />
      <path d="M9 3c1 1.2 2 1.8 3 1.8S14 4.2 15 3" />
      <path d="M12 4.8V20" />
    </svg>
  )
}

export function GloveIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M8 21v-7.5a3 3 0 0 1 6 0V21" />
      <path d="M8 13.5V5a1.6 1.6 0 0 1 3.2 0v5" />
      <path d="M11.2 10V4a1.6 1.6 0 0 1 3.2 0v6" />
      <path d="M14.4 10V5.2a1.6 1.6 0 0 1 3.2 0V13" />
      <path d="M6 15.5c-1.4.4-2 1.4-2 2.8V21" />
    </svg>
  )
}

export function BootIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M9 3v8.2c0 1-.4 1.9-1.1 2.6L4.6 17c-.9.7-1.6 1.7-1.6 2.9V20a1 1 0 0 0 1 1h15a1 1 0 0 0 1-1c0-2.8-2.3-5-5-5h-1.6c-1 0-1.9-.5-2.4-1.4L10.5 12" />
      <path d="M9 3h4.5v6.5" />
      <path d="M4 20v-2.4" />
    </svg>
  )
}

export function ShieldIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5 5 6v5.5c0 4.6 3 7.7 7 9 4-1.3 7-4.4 7-9V6l-7-2.5Z" />
      <path d="M9.2 12.2 11 14l4-4.2" />
    </svg>
  )
}

export function BagIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6 8h12l1 12.2a1 1 0 0 1-1 1.1H6a1 1 0 0 1-1-1.1L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  )
}

export function InstagramIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function FacebookIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M14 21v-7.6h2.6l.4-3H14V8.3c0-.9.3-1.5 1.6-1.5H17V4.2C16.7 4.1 15.8 4 14.7 4c-2.3 0-3.9 1.4-3.9 4v2.4H8.3v3H10.8V21Z" />
    </svg>
  )
}

export function XIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 4l16 16" />
      <path d="M20 4 4 20" />
    </svg>
  )
}

export function YoutubeIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="6" width="18" height="12" rx="4" />
      <path d="m10.5 9.7 4.5 2.3-4.5 2.3Z" fill="currentColor" stroke="none" />
    </svg>
  )
}
