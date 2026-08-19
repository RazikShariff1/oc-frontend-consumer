import { useMemo, useReducer } from 'react'
import { CartContext } from './cart-context.js'

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find((item) => item.id === action.product.id)
      const items = existing
        ? state.items.map((item) =>
            item.id === action.product.id ? { ...item, qty: item.qty + 1 } : item,
          )
        : [...state.items, { ...action.product, qty: 1 }]
      return { ...state, items, isOpen: true }
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter((item) => item.id !== action.id) }
    case 'SET_QTY':
      return {
        ...state,
        items: action.qty <= 0
          ? state.items.filter((item) => item.id !== action.id)
          : state.items.map((item) => (item.id === action.id ? { ...item, qty: action.qty } : item)),
      }
    case 'OPEN':
      return { ...state, isOpen: true }
    case 'CLOSE':
      return { ...state, isOpen: false }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [], isOpen: false })

  const value = useMemo(() => {
    const itemCount = state.items.reduce((sum, item) => sum + item.qty, 0)
    const subtotal = state.items.reduce((sum, item) => sum + item.qty * item.price, 0)

    return {
      items: state.items,
      isOpen: state.isOpen,
      itemCount,
      subtotal,
      addItem: (product) => dispatch({ type: 'ADD', product }),
      removeItem: (id) => dispatch({ type: 'REMOVE', id }),
      setQty: (id, qty) => dispatch({ type: 'SET_QTY', id, qty }),
      openCart: () => dispatch({ type: 'OPEN' }),
      closeCart: () => dispatch({ type: 'CLOSE' }),
    }
  }, [state])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
