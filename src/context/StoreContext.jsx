import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getProduct } from '../data/products'

const StoreContext = createContext(null)
const CART_KEY = 'nz9-cart'

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(loadCart)
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [codOpen, setCodOpen] = useState(false)
  const [codItem, setCodItem] = useState(null)
  const [toast, setToast] = useState('')

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 2600)
    return () => clearTimeout(t)
  }, [toast])

  const count = cart.reduce((n, i) => n + i.qty, 0)
  const subtotal = cart.reduce((n, i) => n + i.price * i.qty, 0)

  const value = useMemo(() => {
    function addToCart(product, variant, qty = 1) {
      if (product.soldOut || !variant?.available) {
        setToast('Produit en rupture de stock')
        return
      }
      setCart((prev) => {
        const key = `${product.handle}:${variant.id}`
        const existing = prev.find((i) => i.key === key)
        if (existing) {
          return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i))
        }
        return [
          ...prev,
          {
            key,
            handle: product.handle,
            title: product.title,
            image: variant.image || product.images[0],
            variantId: variant.id,
            option: variant.option === 'Default Title' ? null : variant.option,
            price: variant.price,
            qty,
          },
        ]
      })
      setCartOpen(true)
    }

    function removeFromCart(key) {
      setCart((prev) => prev.filter((i) => i.key !== key))
    }

    function setQty(key, qty) {
      if (qty < 1) return removeFromCart(key)
      setCart((prev) => prev.map((i) => (i.key === key ? { ...i, qty } : i)))
    }

    function clearCart() {
      setCart([])
    }

    function openCod(product, variant) {
      setCodItem({ product, variant })
      setCodOpen(true)
    }

    function closeAll() {
      setCartOpen(false)
      setSearchOpen(false)
      setMenuOpen(false)
      setCodOpen(false)
    }

    return {
      cart,
      count,
      subtotal,
      cartOpen,
      setCartOpen,
      searchOpen,
      setSearchOpen,
      menuOpen,
      setMenuOpen,
      codOpen,
      setCodOpen,
      codItem,
      toast,
      setToast,
      addToCart,
      removeFromCart,
      setQty,
      clearCart,
      openCod,
      closeAll,
      getProduct,
    }
  }, [cart, cartOpen, searchOpen, menuOpen, codOpen, codItem, toast, count, subtotal])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
