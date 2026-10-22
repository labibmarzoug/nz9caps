import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { site } from '../data/site'
import Reveal from '../components/Reveal'
import ProductCard from '../components/ProductCard'

export default function About() {
  const studio = products.filter((p) => p.featured).slice(0, 4)

  return (
    <div className="page">
      <div className="wrap page-hero">
        <span className="kicker">{site.about.kicker}</span>
        <h1>{site.about.title}</h1>
        <p>{site.about.lead}</p>
      </div>

      <section className="section wrap">
        <Reveal className="about-grid">
          <div className="about-photo glass">
            <img src={site.hero} alt="Atelier Studiocapnza9" />
          </div>
          <div className="glass about-copy">
            <span className="kicker">Manifesto</span>
            <h2>Streetwear sculpté comme un bijou.</h2>
            {site.about.story.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <div className="btn-row" style={{ marginTop: 22, maxWidth: 420 }}>
              <Link className="btn" to="/collections/all">
                Enter shop
              </Link>
              <Link className="btn-line" to="/pages/contact">
                Contact
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section wrap">
        <Reveal className="section-head">
          <div>
            <span className="kicker">Valeurs</span>
            <h2>Quatre règles d’atelier.</h2>
          </div>
        </Reveal>
        <div className="value-grid">
          {site.values.map((v, i) => (
            <Reveal key={v.n} delay={i * 80}>
              <article className="value-card glass">
                <b>{v.n}</b>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <Reveal className="section-head">
          <div>
            <span className="kicker">Process</span>
            <h2>Du blank au drop.</h2>
          </div>
        </Reveal>
        <div className="process-grid">
          {site.process.map((step, i) => (
            <Reveal key={step.n} delay={i * 70}>
              <article className="process-card glass">
                <b>{step.n}</b>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <div className="stats">
          {site.stats.map((s) => (
            <div className="stat glass" key={s.label}>
              <b>{s.value}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <Reveal className="section-head">
          <div>
            <span className="kicker">Studio edit</span>
            <h2>Pièces du drop.</h2>
          </div>
          <Link className="view-all" to="/collections/all">
            View All →
          </Link>
        </Reveal>
        <div className="product-grid">
          {studio.map((p, i) => (
            <ProductCard key={p.handle} product={p} delay={i * 50} />
          ))}
        </div>
      </section>

      <section className="section wrap" style={{ paddingBottom: 80 }}>
        <Reveal className="glass about-copy">
          <span className="kicker">Atelier</span>
          <h2>{site.address}</h2>
          <p>
            {site.hours} · {site.email}
            <br />
            Livraison gratuite 24h–48h au Maroc · Paiement à la livraison.
          </p>
        </Reveal>
      </section>
    </div>
  )
}
