import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IconChevron } from './Icons'

export default function Slideshow({ slides, className = '' }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5600)
    return () => clearInterval(t)
  }, [slides.length])

  return (
    <div className={`slideshow glass ${className}`}>
      {slides.map((slide, i) => (
        <article className={`slide ${i === index ? 'is-on' : ''}`} key={slide.title + slide.image}>
          <img src={slide.image} alt={slide.title} />
          <div className="slide-shade" />
          <div className="slide-copy glass">
            <span className="kicker">{slide.kicker}</span>
            <h1>{slide.title}</h1>
            <p>{slide.text}</p>
            <Link className="btn" to={slide.to}>
              {slide.cta}
            </Link>
          </div>
        </article>
      ))}
      <div className="slide-arrows">
        <button aria-label="Previous" onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}>
          <IconChevron style={{ transform: 'rotate(180deg)' }} />
        </button>
        <button aria-label="Next" onClick={() => setIndex((i) => (i + 1) % slides.length)}>
          <IconChevron />
        </button>
      </div>
      <div className="slide-nav">
        {slides.map((_, i) => (
          <button key={i} className={`dot ${i === index ? 'is-on' : ''}`} onClick={() => setIndex(i)} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </div>
  )
}
