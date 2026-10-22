import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products } from '../data/products'
import { site } from '../data/site'
import ProductCard from '../components/ProductCard'
import CollectionCircles from '../components/CollectionCircles'
import Reveal from '../components/Reveal'

const sorts = {
  featured: () => 0,
  az: (a, b) => a.title.localeCompare(b.title),
  za: (a, b) => b.title.localeCompare(a.title),
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
}

const titles = {
  all: 'All Products',
  hoodie: 'Hoodies',
  cap: 'Caps',
  longsleeve: 'Long Sleeves',
}

export default function Catalog() {
  const [params] = useSearchParams()
  const cat = params.get('cat') || 'all'
  const [availability, setAvailability] = useState({ in: false, out: false })
  const [min, setMin] = useState('')
  const [max, setMax] = useState('')
  const [sort, setSort] = useState('featured')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const list = useMemo(() => {
    let next = products.filter((p) => (cat === 'all' ? true : p.category === cat))
    if (availability.in !== availability.out) {
      next = next.filter((p) => (availability.in ? p.available : p.soldOut))
    }
    if (min !== '') next = next.filter((p) => p.price >= Number(min))
    if (max !== '') next = next.filter((p) => p.price <= Number(max))
    next = [...next].sort(sorts[sort] || sorts.featured)
    return next
  }, [availability, min, max, sort, cat])

  return (
    <div className="page">
      <div className="wrap page-hero">
        <span className="kicker">Shop</span>
        <h1>{titles[cat] || 'Shop'}</h1>
        <p>
          {list.length} pièces live. Caps handmade, hoodies cropped en solde {site.saleFrom} → {site.saleTo} dh,
          livraison gratuite 24h–48h. Cash on delivery.
        </p>
        <CollectionCircles active={cat} />
      </div>
      <div className="wrap" style={{ paddingBottom: 40 }}>
        {cat === 'longsleeve' && list.length === 0 ? null : (
          <div className="catalog-toolbar glass">
            <div className="filter-group">
              <button className="filter-btn" onClick={() => setFiltersOpen((v) => !v)}>
                Filtres
              </button>
              <span style={{ color: 'var(--muted)', fontSize: 12, letterSpacing: '.12em', textTransform: 'uppercase' }}>
                {list.length} items
              </span>
            </div>
            <div className="toolbar-right">
              <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort">
                <option value="featured">Featured</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
                <option value="price-asc">Prix ↑</option>
                <option value="price-desc">Prix ↓</option>
              </select>
            </div>
          </div>
        )}
        {filtersOpen ? (
          <div className="filter-panel glass" style={{ padding: 16, marginBottom: 16 }}>
            <div>
              <label className="field">
                <span>Disponibilité</span>
                <div className="chips">
                  <button className={`chip ${availability.in ? 'is-on' : ''}`} onClick={() => setAvailability((a) => ({ ...a, in: !a.in }))}>
                    In stock
                  </button>
                  <button className={`chip ${availability.out ? 'is-on' : ''}`} onClick={() => setAvailability((a) => ({ ...a, out: !a.out }))}>
                    Sold out
                  </button>
                </div>
              </label>
            </div>
            <div>
              <span className="option-label">Prix (dh)</span>
              <div className="price-inputs">
                <input type="number" placeholder="Min" value={min} onChange={(e) => setMin(e.target.value)} />
                <input type="number" placeholder="Max" value={max} onChange={(e) => setMax(e.target.value)} />
              </div>
            </div>
          </div>
        ) : null}
        {cat === 'longsleeve' && list.length === 0 ? (
          <div className="coming-soon glass">
            <img src={site.hero} alt="Longsleeve drop" />
            <div>
              <span className="kicker">Drop</span>
              <h2>Long Sleeves</h2>
              <p>Coming soon. Caps et hoodies restent live. Livraison gratuite dès le lancement.</p>
            </div>
          </div>
        ) : (
          <div className="product-grid">
            {list.map((p, i) => (
              <ProductCard key={p.handle} product={p} delay={i * 40} />
            ))}
          </div>
        )}
      </div>

      <section className="wrap perks" style={{ paddingBottom: 72 }}>
        {site.perks.map((p) => (
          <Reveal key={p.title} className="perk glass">
            <div className="perk-ico">{p.n}</div>
            <b>{p.title}</b>
            <span>{p.text}</span>
          </Reveal>
        ))}
      </section>
    </div>
  )
}
