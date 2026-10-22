import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { formatPrice, getProduct, imgUrl, relatedProducts } from '../data/products'
import ProductCard from '../components/ProductCard'
import { useStore } from '../context/StoreContext'
import { IconCart, IconChevron } from '../components/Icons'

export default function Product() {
  const { handle } = useParams()
  const product = getProduct(handle)
  const related = useMemo(() => relatedProducts(handle), [handle])
  const { addToCart, openCod } = useStore()
  const [variantId, setVariantId] = useState('')
  const [open, setOpen] = useState('description')
  const [shot, setShot] = useState(0)

  useEffect(() => {
    if (!product) return
    const first = product.variants.find((v) => v.available) || product.variants[0]
    setVariantId(first.id)
    setOpen('description')
    setShot(0)
  }, [product])

  useEffect(() => {
    if (!product || product.images.length < 2) return
    const t = setInterval(() => setShot((i) => (i + 1) % product.images.length), 4200)
    return () => clearInterval(t)
  }, [product])

  if (!product) {
    return (
      <div className="page wrap page-hero">
        <h1>Introuvable</h1>
        <Link className="btn" to="/collections/all" style={{ marginTop: 16 }}>
          Retour shop
        </Link>
      </div>
    )
  }

  const active = product.variants.find((v) => v.id === variantId) || product.variants[0]
  const current = product.images[shot] || product.images[0]

  return (
    <div className="page">
      <div className="wrap product-page">
        <div>
          <div className="product-stage glass">
            <img src={imgUrl(active.image || current, 1400)} alt={product.title} />
            {product.images.length > 1 ? (
              <div className="slide-arrows">
                <button aria-label="Previous" onClick={() => setShot((i) => (i - 1 + product.images.length) % product.images.length)}>
                  <IconChevron style={{ transform: 'rotate(180deg)' }} />
                </button>
                <button aria-label="Next" onClick={() => setShot((i) => (i + 1) % product.images.length)}>
                  <IconChevron />
                </button>
              </div>
            ) : null}
          </div>
          {product.images.length > 1 ? (
            <div className="thumbs">
              {product.images.map((src, i) => (
                <button key={src + i} className={i === shot ? 'is-on' : ''} onClick={() => setShot(i)}>
                  <img src={imgUrl(src, 300)} alt="" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="product-info glass">
          <span className="kicker">
            {product.category === 'hoodie' ? 'Hoodie cropped · solde' : product.category === 'longsleeve' ? 'Longsleeve' : 'Cap handmade'}
          </span>
          <h1>{product.title}</h1>
          <div className="product-price">
            <strong>{formatPrice(active.price)}</strong>
            {active.compareAt ? <s>{formatPrice(active.compareAt)}</s> : null}
          </div>

          {product.optionName ? (
            <>
              <div className="option-label">{product.optionName}</div>
              <div className="size-row">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    className={`size-btn ${active.id === v.id ? 'is-active' : ''}`}
                    disabled={!v.available}
                    onClick={() => setVariantId(v.id)}
                  >
                    {v.option}
                  </button>
                ))}
              </div>
            </>
          ) : null}

          <div className="offer-box glass">
            <h3>Choose your offer</h3>
            <div className="offer-row">
              <strong>Buy 1</strong>
              <span>{formatPrice(active.price)}</span>
            </div>
            <div className="offer-product">
              <img src={imgUrl(active.image || product.images[0], 200)} alt="" />
              <div>
                <div>{product.title}</div>
                {product.optionName ? (
                  <select className="mini-select" value={active.id} onChange={(e) => setVariantId(e.target.value)}>
                    {product.variants.map((v) => (
                      <option key={v.id} value={v.id} disabled={!v.available}>
                        {v.option}
                      </option>
                    ))}
                  </select>
                ) : null}
              </div>
            </div>
          </div>

          <button className="btn full" disabled={product.soldOut || !active.available} onClick={() => addToCart(product, active)}>
            Add to cart
          </button>
          <button
            className="btn-line full"
            style={{ marginTop: 10 }}
            disabled={product.soldOut || !active.available}
            onClick={() => openCod(product, active)}
          >
            <IconCart style={{ width: 18, height: 18 }} />
            Order Now — Cash on Delivery
          </button>
          {product.soldOut ? <p style={{ textAlign: 'center' }}>Sold out</p> : null}

          <div className="accordion">
            <Acc title="Description" name="description" open={open} setOpen={setOpen}>
              {product.bodyHtml ? <div dangerouslySetInnerHTML={{ __html: product.bodyHtml }} /> : <p>Pièce Studiocapnza9, custom handmade.</p>}
            </Acc>
            <Acc title="Care" name="care" open={open} setOpen={setOpen}>
              <p>{product.care}</p>
            </Acc>
            <Acc title="Design" name="design" open={open} setOpen={setOpen}>
              <p>{product.design}</p>
            </Acc>
          </div>
        </div>

        <section className="product-related">
          <div className="section-head">
            <h2>You may also like</h2>
          </div>
          <div className="product-grid">
            {related.map((p, i) => (
              <ProductCard key={p.handle} product={p} delay={i * 40} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function Acc({ title, name, open, setOpen, children }) {
  const isOpen = open === name
  return (
    <div className="acc-item">
      <button onClick={() => setOpen(isOpen ? '' : name)}>
        {title}
        <span>{isOpen ? '–' : '+'}</span>
      </button>
      {isOpen ? <div className="acc-body">{children}</div> : null}
    </div>
  )
}
