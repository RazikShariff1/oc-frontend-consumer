import { useCart } from '../context/useCart.js'

function currency(amount) {
  return `$${amount.toFixed(0)}`
}

function CartDrawer() {
  const { items, isOpen, closeCart, setQty, removeItem, subtotal } = useCart()

  return (
    <div
      className={`fixed inset-0 z-[60] ${isOpen ? '' : 'pointer-events-none'}`}
      aria-hidden={!isOpen}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closeCart}
      />

      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-surface shadow-xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="font-display text-lg font-bold uppercase tracking-tight text-ink">
            Your Cart
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-subtle"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5">
              <path
                d="M5 5l14 14M19 5 5 19"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <p className="text-sm text-body-dim">Your cart is empty.</p>
          ) : (
            <ul className="flex flex-col gap-5">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold leading-snug text-ink">{item.name}</p>
                    <p className="mt-1 text-sm text-body-dim">{currency(item.price)}</p>

                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex items-center rounded-full border border-border">
                        <button
                          type="button"
                          onClick={() => setQty(item.id, item.qty - 1)}
                          aria-label={`Decrease quantity of ${item.name}`}
                          className="flex h-7 w-7 items-center justify-center text-ink"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-xs font-semibold text-ink">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(item.id, item.qty + 1)}
                          aria-label={`Increase quantity of ${item.name}`}
                          className="flex h-7 w-7 items-center justify-center text-ink"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-xs font-semibold uppercase tracking-wide text-body-dim underline-offset-2 hover:text-ink hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-ink">
                    {currency(item.price * item.qty)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-border px-6 py-5">
          <div className="flex items-center justify-between text-sm font-semibold text-ink">
            <span>Subtotal</span>
            <span>{currency(subtotal)}</span>
          </div>
          <button
            type="button"
            disabled={items.length === 0}
            className="mt-4 w-full rounded-full bg-ink py-3 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-ink-dim disabled:cursor-not-allowed disabled:opacity-40"
          >
            Checkout
          </button>
        </div>
      </aside>
    </div>
  )
}

export default CartDrawer
