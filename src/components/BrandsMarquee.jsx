import './BrandsMarquee.css'

const BRANDS = [
  'Royal Enfield',
  'Rynox',
  'Alpinestars',
  'Studds',
  'Steelbird',
  'Vega',
  'TVS Racing',
  'Bajaj',
]

// Duplicated once so the track can loop seamlessly: the animation just
// slides the whole thing left by exactly one copy's width, then resets.
const TRACK = [...BRANDS, ...BRANDS]

function BrandsMarquee() {
  return (
    <section className="brands" aria-label="Brands we carry">
      <span className="brands-eyebrow">Gear from the brands that ride hardest</span>
      <p className="sr-only">{BRANDS.join(', ')}</p>
      <div className="brands-track-viewport">
        <ul className="brands-track" aria-hidden="true">
          {TRACK.map((brand, index) => (
            <li className="brands-item" key={`${brand}-${index}`}>
              {brand}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default BrandsMarquee
