import Link from 'next/link'
import './random-pages.css'
import { CATEGORIES } from './categories'

export default function RandomSlugHomePage() {
  return (
    <> 
      <section className="rp-hero">
        <span className="rp-hero-badge">
          <span className="rp-hero-badge-dot" /> Landing Hub
        </span>
        <h1 className="rp-hero-title">Random Pages Landing</h1>
        <p className="rp-hero-sub">
          Choose a category from the navbar and the selected page opens full in the main area.
        </p>
        <Link href="/random-slug-generator/viral" className="btn btn-primary rp-hero-cta">
          Open Viral Page
        </Link>
      </section>

      <section>
        <div className="rp-section-head">
          <h2 className="rp-section-title">Pick a category</h2>
        </div>
        <div className="rp-cat-grid">
          {CATEGORIES.map((item) => (
            <Link
              key={item.key}
              href={`/random-slug-generator/${item.key}`}
              className="rp-cat-card"
              style={{ textAlign: 'left' }}
            >
              <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>{item.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{item.label}</div>
              <div style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>{item.description}</div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
