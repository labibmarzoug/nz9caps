import { useState } from 'react'
import { site } from '../data/site'
import { useStore } from '../context/StoreContext'
import Reveal from '../components/Reveal'

export default function Contact() {
  const { setToast } = useStore()
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [open, setOpen] = useState(0)

  function submit(e) {
    e.preventDefault()
    setForm({ name: '', email: '', phone: '', message: '' })
    setToast('Message envoyé. Réponse sous 24h.')
  }

  return (
    <div className="page">
      <div className="wrap page-hero">
        <span className="kicker">Contact</span>
        <h1>Parle au studio.</h1>
        <p>Commandes, tailles, custom sur-mesure. Livraison gratuite. Cash on delivery partout au Maroc.</p>
      </div>

      <section className="wrap perks" style={{ paddingTop: 0 }}>
        <Reveal className="perk glass">
          <b>Email</b>
          <span>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </span>
        </Reveal>
        <Reveal className="perk glass" delay={60}>
          <b>Atelier</b>
          <span>{site.address}</span>
        </Reveal>
        <Reveal className="perk glass" delay={120}>
          <b>Horaires</b>
          <span>{site.hours}</span>
        </Reveal>
        <Reveal className="perk glass" delay={180}>
          <b>Livraison</b>
          <span>Gratuite 24h–48h · COD</span>
        </Reveal>
      </section>

      <div className="wrap contact-layout">
        <aside className="info-card glass">
          <span className="kicker">Studio</span>
          <h2>{site.name}</h2>
          <p>{site.handmadeBlurb}</p>
          <p>
            <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
          </p>
        </aside>
        <form className="form-card glass" onSubmit={submit}>
          <label className="field">
            <span>Name</span>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </label>
          <label className="field">
            <span>Email</span>
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </label>
          <label className="field">
            <span>Phone</span>
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </label>
          <label className="field">
            <span>Message</span>
            <textarea rows="5" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </label>
          <button className="btn full" type="submit">
            Send
          </button>
        </form>
      </div>

      <section className="section wrap" style={{ paddingBottom: 80 }}>
        <Reveal className="section-head">
          <div>
            <span className="kicker">FAQ</span>
            <h2>Questions fréquentes.</h2>
          </div>
        </Reveal>
        <div className="accordion glass" style={{ padding: '8px 22px', borderRadius: 24 }}>
          {site.faq.map((item, i) => (
            <div className="acc-item" key={item.q}>
              <button type="button" onClick={() => setOpen(open === i ? -1 : i)}>
                {item.q}
                <span>{open === i ? '–' : '+'}</span>
              </button>
              {open === i ? <div className="acc-body">{item.a}</div> : null}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
