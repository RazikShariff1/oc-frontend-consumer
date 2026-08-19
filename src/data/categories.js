import { HelmetIcon, JacketIcon, GloveIcon, BootIcon, ShieldIcon, BagIcon } from '../components/icons.jsx'

// `accent` keys into the gradient pairs defined in PlaceholderArt.jsx, so
// category tiles and the products that belong to them share a palette.
export const CATEGORIES = [
  { slug: 'helmets', name: 'Helmets', icon: HelmetIcon, accent: 'ember' },
  { slug: 'jackets', name: 'Jackets', icon: JacketIcon, accent: 'slate' },
  { slug: 'gloves', name: 'Gloves', icon: GloveIcon, accent: 'moss' },
  { slug: 'boots', name: 'Boots', icon: BootIcon, accent: 'clay' },
  { slug: 'protection', name: 'Protection', icon: ShieldIcon, accent: 'indigo' },
  { slug: 'accessories', name: 'Accessories', icon: BagIcon, accent: 'amber' },
]
