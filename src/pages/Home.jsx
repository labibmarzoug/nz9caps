import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { site } from '../data/site'
import ProductCard from '../components/ProductCard'
import CollectionCircles from '../components/CollectionCircles'
import Reveal from '../components/Reveal'
import { useCountdown } from '../hooks/useCountdown'

function CollectionSection({ title, category, to }) {
  const items = products.filter((p) => p.category === category).slice(0, 4)

  return (
    <section className="collection-section" id={category}>
      <div className="collection-head">
        <h2 className="collection-title">{title}</h2>
        <Link className="view-all" to={to}>
          View All →
        </Link>
      </div>
      {items.length ? (
        <div className="product-grid">
          {items.map((p, i) => (
            <ProductCard key={p.handle} product={p} delay={i * 60} />
          ))}
        </div>
      ) : (
        <div className="coming-panel glass">
          <img src={site.hero} alt="" />
          <span>Coming soon</span>
        </div>
      )}
    </section>
  )
}

export default function Home() {
  const t = useCountdown(site.saleEnd)

  return (
    <div className="page">
      <section className="home-hero" aria-label="Hero">
        <div className="hero-banner">
          <img src={site.hero} alt={site.name} />
          <div className="slide-shade" />
          <div className="slide-copy">
            <span className="kicker">{site.tagline}</span>
            <h1>More than just clothes.</h1>
            <p>Hoodies en solde {site.saleFrom} → {site.saleTo} dh. Livraison gratuite 24h–48h.</p>
            <Link className="btn" to="/collections/all">
              Shop now
            </Link>
          </div>
        </div>
      </section>

      <section className="wrap perks">
        {site.perks.map((p) => (
          <Reveal key={p.title} className="perk glass">
            <div className="perk-ico">{p.n}</div>
            <b>{p.title}</b>
            <span>{p.text}</span>
          </Reveal>
        ))}
      </section>

      <section className="wrap collections-intro" id="collections">
        <Reveal className="section-head">
          <div>
            <span className="kicker">Collections</span>
            <h2>Shop the drop.</h2>
          </div>
        </Reveal>
        <CollectionCircles />
      </section>

      <div className="wrap">
        <CollectionSection title="Hoodies" category="hoodie" to="/collections/all?cat=hoodie" />
        <CollectionSection title="Caps" category="cap" to="/collections/all?cat=cap" />
        <CollectionSection title="Long Sleeves" category="longsleeve" to="/collections/all?cat=longsleeve" />
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i}>Handmade · 340 GSM · Livraison gratuite · Solde hoodies {site.saleTo} dh · Cash on delivery · Ifrane</span>
          ))}
        </div>
      </div>

      <section className="wrap coming-soon-band">
        <Reveal>
          <h2>Coming soon</h2>
          <p>Long sleeve drop. Same vision. Hoodies encore en solde jusqu’à la fin du chrono.</p>
          <div className="count-orbs" aria-label="Fin du solde">
            <div className="glass"><b>{t.pad(t.d)}</b><span>Days</span></div>
            <div className="glass"><b>{t.pad(t.h)}</b><span>Hours</span></div>
            <div className="glass"><b>{t.pad(t.m)}</b><span>Minutes</span></div>
            <div className="glass"><b>{t.pad(t.s)}</b><span>Seconds</span></div>
          </div>
        </Reveal>
        <div className="coming-panel glass">
          <img src={site.hero} alt="" />
          <span>Coming soon</span>
        </div>
      </section>
    </div>
  )
}
