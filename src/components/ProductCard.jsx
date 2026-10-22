import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatPrice, imgUrl } from '../data/products'
import { IconChevron } from './Icons'

export default function ProductCard({ product, delay = 0, plain = false }) {
  const [index, setIndex] = useState(0)
  const [hover, setHover] = useState(false)
  const img = product.images[index] || product.images[0]

  useEffect(() => {
    if (!hover || product.images.length < 2) return
    const t = setInterval(() => setIndex((i) => (i + 1) % product.images.length), 1400)
    return () => clearInterval(t)
  }, [hover, product.images.length])

  function prev(e) {
    e.preventDefault()
    e.stopPropagation()
    setIndex((i) => (i - 1 + product.images.length) % product.images.length)
  }
  function next(e) {
    e.preventDefault()
    e.stopPropagation()
    setIndex((i) => (i + 1) % product.images.length)
  }

  return (
    <article className={`product-card ${plain ? 'is-plain' : ''}`} style={{ animationDelay: `${delay}ms` }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <Link to={`/products/${product.handle}`} className="card-media">
        {product.onSale ? <span className="card-badge">Sale</span> : null}
        {product.soldOut ? <span className="card-badge">Sold out</span> : null}
        <img src={imgUrl(img, 900)} alt={product.title} />
        {product.images.length > 1 ? (
          <>
            <button className="card-nav prev" onClick={prev} aria-label="Previous slide">
              <IconChevron style={{ transform: 'rotate(180deg)' }} />
            </button>
            <button className="card-nav next" onClick={next} aria-label="Next slide">
              <IconChevron />
            </button>
            <div className="card-dots">
              {product.images.map((_, i) => (
                <i key={i} className={i === index ? 'on' : ''} />
              ))}
            </div>
          </>
        ) : null}
        <span className="card-action">Shop now</span>
      </Link>
      <div>
        <h3 className="card-title">
          <Link to={`/products/${product.handle}`}>{product.title}</Link>
        </h3>
        <div className="card-price">
          {product.onSale ? (
            <>
              {formatPrice(product.price)} <s>{formatPrice(product.compareAt)}</s>
            </>
          ) : (
            formatPrice(product.price)
          )}
        </div>
        {!plain && product.optionName === 'Color' ? (
          <div className="swatches">
            {product.optionValues.map((c) => (
              <span key={c} className={`swatch ${c}`} title={c} />
            ))}
          </div>
        ) : null}
      </div>
    </article>
  )
}
