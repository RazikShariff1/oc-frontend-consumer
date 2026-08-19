import { InstagramIcon, FacebookIcon, XIcon, YoutubeIcon } from './icons.jsx'

const LINK_COLUMNS = [
  {
    title: 'Shop',
    links: ['Helmets', 'Jackets', 'Gloves', 'Boots'],
  },
  {
    title: 'Company',
    links: ['About', 'Collections', 'New Arrivals', 'Careers'],
  },
  {
    title: 'Help',
    links: ['Shipping', 'Returns', 'Size Guide', 'Contact'],
  },
]

const SOCIALS = [
  { label: 'Instagram', Icon: InstagramIcon },
  { label: 'Facebook', Icon: FacebookIcon },
  { label: 'X', Icon: XIcon },
  { label: 'YouTube', Icon: YoutubeIcon },
]

function Footer() {
  return (
    <footer className="bg-ink px-6 py-14 text-white/70 md:px-10 md:py-16">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-12 md:flex-row md:justify-between">
        <div className="max-w-xs">
          <span className="font-display text-2xl font-bold uppercase tracking-wide text-white">
            Moto Tron
          </span>
          <p className="mt-3 text-sm leading-relaxed">
            Gear engineered for those who demand more — built for every terrain, every ride.
          </p>
          <div className="mt-5 flex gap-3">
            {SOCIALS.map(({ label, Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:gap-16">
          {LINK_COLUMNS.map(({ title, links }) => (
            <div key={title}>
              <h3 className="text-xs font-bold uppercase tracking-[1px] text-white">{title}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm transition-colors hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-xs">
          <h3 className="text-xs font-bold uppercase tracking-[1px] text-white">Stay in the loop</h3>
          <p className="mt-4 text-sm">Get new drops and rider stories in your inbox.</p>
          <form
            className="mt-4 flex overflow-hidden rounded-full border border-white/20"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="Email address"
              aria-label="Email address"
              className="w-full min-w-0 bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-ink"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-[1400px] border-t border-white/10 pt-6 text-xs">
        © {new Date().getFullYear()} Moto Tron. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
