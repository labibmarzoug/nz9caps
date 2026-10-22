import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { formatPrice, searchProducts } from '../data/products'
import { site } from '../data/site'
import { useStore } from '../context/StoreContext'
import { IconClose } from './Icons'

export default function Drawers() {
  const store = useStore()
  return (
    <>
      {store.cartOpen ? <CartDrawer /> : null}
      {store.searchOpen ? <SearchDrawer /> : null}
      {store.menuOpen ? <MenuDrawer /> : null}
      {store.codOpen ? <CodModal /> : null}
      {store.toast ? <div className="toast">{store.toast}</div> : null}
    </>
  )
}

function CartDrawer() {
  const { cart, subtotal, setCartOpen, removeFromCart, setQty } = useStore()
  return (
    <>
      <div className="overlay" onClick={() => setCartOpen(false)} />
      <aside className="drawer" aria-label="Cart">
        <div className="drawer-head">
          <h2>Your cart</h2>
          <button className="icon-btn" onClick={() => setCartOpen(false)} aria-label="Close">
            <IconClose />
          </button>
        </div>
        {cart.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>
              Have an account? <Link to="/account" onClick={() => setCartOpen(false)}>Log in</Link> to check out faster.
            </p>
            <Link className="btn full" to="/collections/all" onClick={() => setCartOpen(false)} style={{ marginTop: 16 }}>
              Continue shopping
            </Link>
          </div>
        ) : (
          <>
            <div>
              {cart.map((item) => (
                <div className="cart-line" key={item.key}>
                  <img src={item.image} alt="" />
                  <div>
                    <Link to={`/products/${item.handle}`} onClick={() => setCartOpen(false)}>
                      {item.title}
                    </Link>
                    {item.option ? <div style={{ color: '#666', fontSize: 12 }}>{item.option}</div> : null}
                    <div className="qty">
                      <button onClick={() => setQty(item.key, item.qty - 1)}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => setQty(item.key, item.qty + 1)}>+</button>
                    </div>
                  </div>
                  <div>
                    <div>{formatPrice(item.price * item.qty)}</div>
                    <button onClick={() => removeFromCart(item.key)} style={{ marginTop: 8, textDecoration: 'underline' }}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="drawer-foot">
              <p style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </p>
              <Link className="btn full" to="/checkout" onClick={() => setCartOpen(false)} style={{ marginTop: 12 }}>
                Order Now - Cash on Delivery
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  )
}

function SearchDrawer() {
  const { setSearchOpen } = useStore()
  const [q, setQ] = useState('')
  const hits = searchProducts(q).slice(0, 8)
  return (
    <>
      <div className="overlay" onClick={() => setSearchOpen(false)} />
      <aside className="drawer" aria-label="Search">
        <div className="drawer-head">
          <h2>Search</h2>
          <button className="icon-btn" onClick={() => setSearchOpen(false)} aria-label="Close">
            <IconClose />
          </button>
        </div>
        <input
          className="search-input"
          autoFocus
          placeholder="Search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <h4>Products</h4>
        {hits.map((p) => (
          <Link className="search-hit" key={p.handle} to={`/products/${p.handle}`} onClick={() => setSearchOpen(false)}>
            <img src={p.images[0]} alt="" />
            <div>
              <div>{p.title}</div>
              <div>
                {p.onSale ? (
                  <>
                    <s>{formatPrice(p.compareAt)}</s> {formatPrice(p.price)}
                  </>
                ) : (
                  formatPrice(p.price)
                )}
              </div>
            </div>
          </Link>
        ))}
      </aside>
    </>
  )
}

function MenuDrawer() {
  const { setMenuOpen } = useStore()
  return (
    <>
      <div className="overlay" onClick={() => setMenuOpen(false)} />
      <aside className="drawer" style={{ right: 'auto', left: 0 }} aria-label="Menu">
        <div className="drawer-head">
          <h2>{site.name}</h2>
          <button className="icon-btn" onClick={() => setMenuOpen(false)} aria-label="Close">
            <IconClose />
          </button>
        </div>
        <Link className="nav-link" to="/" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '12px 0' }}>
          Home
        </Link>
        <Link className="nav-link" to="/collections/all" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '12px 0' }}>
          Shop
        </Link>
        <Link className="nav-link" to="/pages/about" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '12px 0' }}>
          About
        </Link>
        <Link className="nav-link" to="/pages/contact" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '12px 0' }}>
          Contact
        </Link>
      </aside>
    </>
  )
}

function CodModal() {
  const { codItem, setCodOpen, setToast } = useStore()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', city: '', address: '', phone: '' })
  if (!codItem) return null
  const { product, variant } = codItem

  function submit(e) {
    e.preventDefault()
    const order = {
      id: `NZ9-${Date.now()}`,
      createdAt: new Date().toISOString(),
      payment: 'Cash on Delivery',
      customer: form,
      items: [
        {
          title: product.title,
          option: variant.option,
          price: variant.price,
          qty: 1,
        },
      ],
    }
    const prev = JSON.parse(localStorage.getItem('nz9-orders') || '[]')
    localStorage.setItem('nz9-orders', JSON.stringify([order, ...prev]))
    setCodOpen(false)
    setToast('Commande enregistrée. Paiement à la livraison.')
    navigate('/pages/contact')
  }

  function set(key) {
    return (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
  }

  return (
    <div className="modal">
      <div className="overlay" onClick={() => setCodOpen(false)} />
      <form className="modal-card" onSubmit={submit} style={{ position: 'relative' }}>
        <div className="drawer-head">
          <h2>Order Now - Cash on Delivery</h2>
          <button type="button" className="icon-btn" onClick={() => setCodOpen(false)} aria-label="Close">
            <IconClose />
          </button>
        </div>
        <p>
          {product.title} {variant.option && variant.option !== 'Default Title' ? `— ${variant.option}` : null}
          <br />
          <strong>{formatPrice(variant.price)}</strong>
        </p>
        <label className="field">
          <span>الاسم الكامل / Nom Complet *</span>
          <input required value={form.name} onChange={set('name')} />
        </label>
        <label className="field">
          <span>المدينة / Ville *</span>
          <input required value={form.city} onChange={set('city')} />
        </label>
        <label className="field">
          <span>العنوان / Adresse *</span>
          <input required value={form.address} onChange={set('address')} />
        </label>
        <label className="field">
          <span>رقم الهاتف / Numéro *</span>
          <input required value={form.phone} onChange={set('phone')} />
        </label>
        <button className="btn full" type="submit">
          Confirmer la commande
        </button>
      </form>
    </div>
  )
}
