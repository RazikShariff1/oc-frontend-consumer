// Shared "no photography yet" tile: a gradient field with the category icon
// watermarked over it. Used by both Categories and ProductGrid so the
// placeholder treatment reads as one deliberate style, not two.

const GRADIENTS = {
  ember: 'from-orange-400 to-red-600',
  slate: 'from-slate-500 to-slate-800',
  moss: 'from-emerald-500 to-teal-700',
  clay: 'from-amber-600 to-orange-800',
  indigo: 'from-indigo-500 to-violet-700',
  amber: 'from-yellow-400 to-amber-600',
}

function PlaceholderArt({ accent, Icon, className = '' }) {
  const gradient = GRADIENTS[accent] ?? GRADIENTS.slate

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-linear-to-br ${gradient} ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
      <Icon className="relative h-[42%] w-[42%] text-white/85" strokeWidth={1.2} />
    </div>
  )
}

export default PlaceholderArt
