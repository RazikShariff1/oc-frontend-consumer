import { CATEGORIES } from '../data/categories.js'
import PlaceholderArt from './PlaceholderArt.jsx'

function Categories() {
  return (
    <section id="categories" className="bg-surface px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1400px]">
        <span className="text-[12.5px] font-bold uppercase tracking-[1.2px] text-body-dim">
          Gear up
        </span>
        <h2 className="mt-2 font-display text-[28px] font-bold uppercase tracking-tight text-ink md:text-[34px]">
          Shop by category
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map(({ slug, name, icon: Icon, accent }) => (
            <a
              key={slug}
              href="#shop"
              className="group flex flex-col items-center gap-3 rounded-2xl border border-border p-4 transition-colors hover:border-border-strong"
            >
              <PlaceholderArt
                accent={accent}
                Icon={Icon}
                className="aspect-square w-full rounded-xl transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <span className="text-sm font-semibold text-ink">{name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories
