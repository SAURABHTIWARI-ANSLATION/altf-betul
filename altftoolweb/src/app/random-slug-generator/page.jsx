"use client"
import React, { useState } from 'react'
import './random-pages.css'
import { randomPagesConfig, CATEGORY_META } from './config'
import { getRandomItem, getWeightedRandomCategory, safeRedirect } from './utils'
import LoadingState from './components/ui/LoadingState'
import EmptyState from './components/ui/EmptyState'
import CouponsPage from './components/coupons/page'
import ViralPage from './components/viral-page/pages'
import DealsPage from './components/deals/page'
import SoftLandingPage from './components/softlanding-page/pages'
import SubscriptionPage from './components/subscription/page'
import QuizPage from './components/quizs/pages'
import SpinsWinsPage from './components/spins-wins/spins-wins'
import RewardPage from './components/rewards/page'

const CATEGORY_KEYS = Object.keys(randomPagesConfig)

const COMPONENT_MAP = {
  coupons:                    CouponsPage,
  viralPages:                 ViralPage,
  deals:                      DealsPage,
  softEngagementLandingPages: SoftLandingPage,
  subscriptionOffers:         SubscriptionPage,
  quizPages:                  QuizPage,
  spinAndWin:                 SpinsWinsPage,
  rewardUnlockPages:          RewardPage,
}

export default function RandomPagesHub() {
  const [view, setView]             = useState('hub')       // 'hub' | 'preview' | 'generator'
  const [activeCat, setActiveCat]   = useState(null)
  const [activeItem, setActiveItem] = useState(null)
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState(null)
  // slug generator
  const [prefix, setPrefix] = useState('')
  const [slug, setSlug]     = useState('')
  const [copied, setCopied] = useState(false)

  function openPreview(catKey) {
    const { error: err, item } = getRandomItem(catKey, randomPagesConfig)
    if (err || !item) { setError(err || 'No items found.'); return }
    setActiveCat(catKey)
    setActiveItem(item)
    setError(null)
    setView('preview')
  }

  function handleRedirect(catKey) {
    if (catKey === 'deals') {
      window.location.href = '/random-slug-generator/deals'
      return
    }

    setLoading(true)
    setError(null)
    setTimeout(() => {
      const { error: err, item } = getRandomItem(catKey, randomPagesConfig)
      if (err || !item) { setError(err || 'No items.'); setLoading(false); return }
      const errMsg = safeRedirect(item.url, true)
      if (errMsg) { setError(errMsg); setLoading(false); return }
      setLoading(false)
    }, 1500)
  }

  function handleSurprise() {
    const cat = getWeightedRandomCategory(randomPagesConfig)
    handleRedirect(cat)
  }

  function generateSlug() {
    const rand = Math.random().toString(36).slice(2, 10)
    setSlug(`${prefix ? prefix + '-' : ''}${rand}`)
  }

  async function copySlug() {
    if (!slug) return
    await navigator.clipboard?.writeText(slug)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const PreviewComponent = activeCat ? COMPONENT_MAP[activeCat] : null

  return (
    <div className="rp-root">
      {loading && <LoadingState />}

      {/* ── Top Nav ── */}
      <nav className="rp-nav">
        <div className="rp-nav-inner">
          <span className="rp-nav-brand">🎲 Random Pages</span>
          <div className="rp-nav-pills">
            {[['hub','Hub'],['preview','Preview'],['generator','Slug Engine']].map(([v,l]) => (
              <button key={v} onClick={() => setView(v)}
                className={`rp-nav-pill${view === v ? ' active' : ''}`}>
                {l}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="rp-page-body">

        {/* ══════════ HUB VIEW ══════════ */}
        {view === 'hub' && (
          <div>
            {/* Hero */}
            <section className="rp-hero">
              <span className="rp-hero-badge">
                <span className="rp-hero-badge-dot" /> Next-Gen Redirect Engine
              </span>
              <h1 className="rp-hero-title">
                Discover <span className="rp-hero-accent">Random Rewards</span>
              </h1>
              <p className="rp-hero-sub">
                Click any category to securely land on a random offer, quiz, deal, or viral page. No repetition, full surprise.
              </p>
              <button onClick={handleSurprise} className="btn btn-primary rp-hero-cta">
                🎲 Surprise Me!
              </button>
            </section>

            {/* Error */}
            {error && <EmptyState message={error} onReset={() => setError(null)} />}

            {/* Category Grid */}
            {!error && (
              <section style={{ marginBottom: '4rem' }}>
                <div className="rp-section-head">
                  <h2 className="rp-section-title">
                    Explore Categories
                    <span className="rp-count-badge">{CATEGORY_KEYS.length}</span>
                  </h2>
                </div>

                <div className="rp-cat-grid">
                  {CATEGORY_KEYS.map(key => {
                    const meta = CATEGORY_META[key]
                    return (
                      <div key={key} className="rp-cat-card">
                        <div className="rp-cat-icon">{meta.icon}</div>
                        <div className="rp-cat-label">{meta.label}</div>
                        <div className="rp-cat-actions">
                          <button onClick={() => openPreview(key)} className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center', minHeight: '40px', fontSize: '0.8125rem' }}>
                            Preview
                          </button>
                          <button onClick={() => handleRedirect(key)} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', minHeight: '40px', fontSize: '0.8125rem' }}>
                            Go →
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            )}

            {/* CTA Banner */}
            <section className="rp-cta-banner">
              <div className="rp-cta-banner-glow" />
              <h2 className="rp-cta-title">Feeling Adventurous?</h2>
              <p className="rp-cta-sub">
                Let our weighted algorithm select a destination from across all categories. You never know what you might find.
              </p>
              <button onClick={handleSurprise} className="rp-cta-btn">
                Take Me Somewhere ⚡
              </button>
            </section>
          </div>
        )}

        {/* ══════════ PREVIEW VIEW ══════════ */}
        {view === 'preview' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <button onClick={() => setView('hub')} className="btn btn-secondary" style={{ minHeight: '40px' }}>← Back</button>
              {CATEGORY_KEYS.map(k => (
                <button key={k} onClick={() => openPreview(k)}
                  className={`btn ${activeCat === k ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ minHeight: '40px', fontSize: '0.8125rem' }}>
                  {CATEGORY_META[k].icon} {CATEGORY_META[k].label}
                </button>
              ))}
            </div>

            <div className="rp-preview-wrap">
              {PreviewComponent && activeItem
                ? <PreviewComponent item={activeItem} />
                : <EmptyState message="Select a category above to preview it." />}
            </div>
          </div>
        )}

        {/* ══════════ SLUG GENERATOR VIEW ══════════ */}
        {view === 'generator' && (
          <div style={{ maxWidth: '560px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 750, color: 'var(--foreground)', marginBottom: '0.5rem' }}>Slug Engine</h1>
              <p style={{ color: 'var(--muted-foreground)' }}>Generate random slugs for routes, demo data, or testing.</p>
            </div>
            <div className="section-wrapper">
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Prefix (optional)
              </label>
              <input className="input" value={prefix}
                onChange={e => setPrefix(e.target.value.replace(/\s+/g, '-').toLowerCase())}
                placeholder="e.g. product, post, demo"
                style={{ width: '100%', padding: '0.875rem 1rem', marginBottom: '1rem', fontSize: '1rem' }}
              />
              <div style={{ display: 'flex', gap: '0.625rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                <button onClick={generateSlug} className="btn btn-primary" style={{ minHeight: '44px', flex: 1 }}>Generate</button>
                <button onClick={() => { setSlug(''); setPrefix('') }} className="btn btn-secondary" style={{ minHeight: '44px' }}>Reset</button>
                <button onClick={copySlug} disabled={!slug} className="btn btn-secondary" style={{ minHeight: '44px' }}>
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>
              <div style={{ background: 'var(--muted)', borderRadius: 'var(--anslation-ds-radius)', padding: '1rem 1.25rem', borderLeft: '3px solid var(--primary)' }}>
                <p style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>Output</p>
                <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '1.0625rem', fontWeight: 700, color: slug ? 'var(--foreground)' : 'var(--muted-foreground)', margin: 0, wordBreak: 'break-all' }}>
                  {slug || '— not generated yet —'}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
