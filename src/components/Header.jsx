import { NavLink } from 'react-router-dom'
import { site } from '../data/site'
import { useStore } from '../context/StoreContext'
import { useCountdown } from '../hooks/useCountdown'
import { IconAccount, IconCart, IconMenu, IconSearch } from './Icons'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/collections/all', label: 'Shop' },
  { to: '/pages/about', label: 'About' },
  { to: '/pages/contact', label: 'Contact' },
]

function AnnounceBits({ t }) {
  return (
    <div className="announce-inner">
      <span>Livraison gratuite · 24h–48h Maroc</span>
      <i aria-hidden="true">✦</i>
      <span className="announce-sale">
        Solde hoodies <s>{site.saleFrom} dh</s> {site.saleTo} dh
      </span>
      <i aria-hidden="true">✦</i>
      <span className="chrono" aria-label="Fin du solde">
        <b>{t.pad(t.d)}</b>j <b>{t.pad(t.h)}</b>h <b>{t.pad(t.m)}</b>m <b>{t.pad(t.s)}</b>s
      </span>
    </div>
  )
}

export default function Header() {
  const { count, setCartOpen, setSearchOpen, setMenuOpen } = useStore()
  const t = useCountdown(site.saleEnd)

  return (
    <div className="topbar">
      <div className="announce" role="status">
        <div className="announce-track">
          <AnnounceBits t={t} />
          <AnnounceBits t={t} />
        </div>
      </div>

      <header className="header glass">
        <NavLink to="/" className="header-logo" aria-label={site.name} end>
          <img src={site.logo} alt={site.name} />
        </NavLink>

        <nav className="header-nav" aria-label="Primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              to={l.to}
              end={l.end}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <button className="icon-btn menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Menu">
            <IconMenu />
          </button>
          <button className="icon-btn" onClick={() => setSearchOpen(true)} aria-label="Search">
            <IconSearch />
          </button>
          <NavLink className="icon-btn" to="/account" aria-label="Account">
            <IconAccount />
          </NavLink>
          <button className="icon-btn" onClick={() => setCartOpen(true)} aria-label="Cart">
            <IconCart />
            {count > 0 ? <span className="cart-count">{count}</span> : null}
          </button>
        </div>
      </header>
    </div>
  )
}
