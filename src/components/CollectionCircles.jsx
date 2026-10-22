import { Link } from 'react-router-dom'
import { imgUrl, products } from '../data/products'
import { site } from '../data/site'

const hoodie = products.find((p) => p.category === 'hoodie')
const cap = products.find((p) => p.category === 'cap')

export const COLLECTION_FILTERS = [
  { id: 'hoodie', label: 'Hoodies', to: '/collections/all?cat=hoodie', image: hoodie?.images[0] },
  { id: 'cap', label: 'Caps', to: '/collections/all?cat=cap', image: cap?.images[0] },
  { id: 'longsleeve', label: 'Long Sleeves', to: '/collections/all?cat=longsleeve', image: site.hero },
  { id: 'all', label: 'All Products', to: '/collections/all', image: null },
]

export default function CollectionCircles({ active = '' }) {
  return (
    <nav className="cat-circles" aria-label="Collections">
      {COLLECTION_FILTERS.map((c) => (
        <Link
          key={c.id}
          to={c.to}
          className={`cat-orb ${active === c.id ? 'is-on' : ''}`}
          aria-current={active === c.id ? 'page' : undefined}
        >
          {c.image ? <img src={imgUrl(c.image, 600)} alt="" /> : <span className="cat-orb-mark">✦</span>}
          <span className="cat-orb-copy">
            {c.label}
            <i aria-hidden="true">→</i>
          </span>
        </Link>
      ))}
    </nav>
  )
}
