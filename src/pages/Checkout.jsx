import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { formatPrice, imgUrl } from '../data/products'
import { useStore } from '../context/StoreContext'

export default function Checkout() {
  const { cart, subtotal, clearCart, setToast } = useStore()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', city: '', address: '', phone: '' })

  function submit(e) {
    e.preventDefault()
    const order = {
      id: `NZ9-${Date.now()}`,
      createdAt: new Date().toISOString(),
      payment: 'Cash on Delivery',
      customer: form,
      items: cart,
      total: subtotal,
    }
    const prev = JSON.parse(localStorage.getItem('nz9-orders') || '[]')
    localStorage.setItem('nz9-orders', JSON.stringify([order, ...prev]))
    clearCart()
    setToast('Commande enregistrée. Paiement à la livraison.')
    navigate('/')
  }

  if (cart.length === 0) {
    return (
      <div className="page wrap page-hero">
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>
        <Link className="btn" to="/collections/all" style={{ marginTop: 16 }}>
          Continue shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="wrap page-hero">
        <span className="kicker">Checkout</span>
        <h1>Cash on Delivery.</h1>
      </div>
      <div className="wrap contact-layout">
        <div className="info-card glass">
          {cart.map((item) => (
            <div key={item.key} className="cart-line">
              <img src={imgUrl(item.image, 200)} alt="" />
              <div>
                {item.title}
                {item.option ? <div>{item.option}</div> : null}
                <div>x{item.qty}</div>
              </div>
              <div>{formatPrice(item.price * item.qty)}</div>
            </div>
          ))}
          <p style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
            <span>Total</span>
            <strong>{formatPrice(subtotal)}</strong>
          </p>
        </div>
        <form className="form-card glass" onSubmit={submit}>
          <label className="field">
            <span>الاسم الكامل / Nom Complet *</span>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </label>
          <label className="field">
            <span>المدينة / Ville *</span>
            <input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          </label>
          <label className="field">
            <span>العنوان / Adresse *</span>
            <input required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </label>
          <label className="field">
            <span>رقم الهاتف / Numéro *</span>
            <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </label>
          <p style={{ color: 'var(--muted)', marginBottom: 14 }}>Livraison gratuite 24h–48h. Paiement à la livraison.</p>
          <button className="btn full" type="submit">
            Confirmer la commande
          </button>
        </form>
      </div>
    </div>
  )
}
