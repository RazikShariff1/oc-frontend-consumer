import { PRODUCTS } from '../data/products.js'
import { CATEGORIES } from '../data/categories.js'
import { useCart } from '../context/useCart.js'
import PlaceholderArt from './PlaceholderArt.jsx'

const CATEGORY_BY_SLUG = Object.fromEntries(CATEGORIES.map((c) => [c.slug, c]))

function currency(amount) {
  return `$${amount.toFixed(0)}`
}

function ProductGrid() {
  const { addItem } = useCart()

  return (
    <section id="shop" className="bg-surface-raised px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1400px]">
        <span className="text-[12.5px] font-bold uppercase tracking-[1.2px] text-body-dim">
          New this season
        </span>
        <h2 className="mt-2 font-display text-[28px] font-bold uppercase tracking-tight text-ink md:text-[34px]">
          Featured gear
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {PRODUCTS.map((product) => {
            const category = CATEGORY_BY_SLUG[product.category]
            return (
              <div
                key={product.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface"
              >
                <PlaceholderArt
                  accent={category.accent}
                  Icon={category.icon}
                  className="aspect-square w-full"
                />
                <div className="flex flex-1 flex-col gap-3 p-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.8px] text-body-dim">
                      {category.name}
                    </span>
                    <h3 className="mt-1 text-[15px] font-semibold leading-snug text-ink">
                      {product.name}
                    </h3>
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-2">
                    <span className="font-display text-lg font-bold text-ink">
                      {currency(product.price)}
                    </span>
                    <button
                      type="button"
                      onClick={() => addItem(product)}
                      className="rounded-full bg-ink px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-ink-dim"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProductGrid
