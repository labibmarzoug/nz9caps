import { useState } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../data/site'
import { useStore } from '../context/StoreContext'

export default function Footer() {
  const { setToast } = useStore()
  const [email, setEmail] = useState('')

  function subscribe(e) {
    e.preventDefault()
    setEmail('')
    setToast('Inscription confirmée.')
  }

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <h3>{site.name}</h3>
            <p>{site.handmadeBlurb}</p>
          </div>
          <div>
            <h3>Shop</h3>
            <Link to="/collections/all">Tout le drop</Link>
            <Link to="/collections/all?cat=cap">Caps</Link>
            <Link to="/collections/all?cat=longsleeve">Longsleeve</Link>
            <Link to="/collections/all?cat=hoodie">Hoodies</Link>
            <Link to="/checkout">Cash on delivery</Link>
          </div>
          <div>
            <h3>Studio</h3>
            <Link to="/pages/about">About us</Link>
            <Link to="/pages/contact">Contact</Link>
            <Link to="/policies/privacy-policy">Privacy policy</Link>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <form className="newsletter" onSubmit={subscribe}>
            <h3>Newsletter</h3>
            <p>Drops, restocks, long sleeve coming soon.</p>
            <div className="newsletter-row">
              <input
                required
                type="email"
                placeholder="Email address"
                aria-label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn" type="submit">
                Sign up
              </button>
            </div>
          </form>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.name} · {site.address}
          </span>
          <span>Cash on delivery · 24h–48h Maroc</span>
        </div>
      </div>
    </footer>
  )
}
