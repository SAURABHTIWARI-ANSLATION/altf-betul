"use client"
import React, { useState, useEffect } from 'react'

function useTimer() {
  const [secs, setSecs] = useState(5400) // 1h 30m demo
  useEffect(() => {
    const id = setInterval(() => setSecs(s => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(id)
  }, [])
  const h = String(Math.floor(secs / 3600)).padStart(2, '0')
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0')
  const s = String(secs % 60).padStart(2, '0')
  return `${h}:${m}:${s}`
}

export default function DealsPage({ item }) {
  const timer = useTimer()
  if (!item) return null
  return (
    <div className="card" style={{ borderRadius: 'var(--anslation-ds-radius-xl)', overflow: 'hidden', boxShadow: 'var(--anslation-ds-shadow-md)' }}>
      <div style={{ padding: '1.5rem' }}>
        {/* Store + rating */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--foreground)' }}>{item.store}</span>
          <span className="rp-deal-savings-badge" style={{ background: 'var(--anslation-ds-success)', color: '#fff' }}>★ {item.rating}</span>
        </div>

        {/* Product block */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
          <div className="rp-deal-product-image" style={{ width: '90px', height: '90px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
            🛒
          </div>
          <div>
            <h3 style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--foreground)', marginBottom: '0.375rem', lineHeight: 1.2 }}>{item.title}</h3>
            <div className="rp-deal-original-price">{item.originalPrice}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
              <span className="rp-deal-sale-price">{item.salePrice}</span>
              <span className="rp-deal-savings-badge">{item.discount} OFF</span>
            </div>
          </div>
        </div>

        {/* Trust pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          {['📦 Free Delivery', '✅ Verified', '🔒 Secure'].map(t => (
            <span key={t} className="rp-deal-trust-pill">{t}</span>
          ))}
        </div>

        {/* Timer */}
        <div className="rp-deal-timer-box">
          ⏳ Deal ends in: <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800 }}>{timer}</span>
        </div>

        {/* CTA */}
        <a href={item.url} target="_blank" rel="noopener noreferrer"
          className="btn btn-primary"
          style={{ width: '100%', minHeight: '52px', fontSize: '1rem', fontWeight: 700, justifyContent: 'center', marginTop: '1rem', borderRadius: 'var(--anslation-ds-radius-lg)' }}>
          Get This Deal →
        </a>
        <button className="btn btn-secondary" style={{ width: '100%', minHeight: '44px', marginTop: '0.5rem', justifyContent: 'center' }}>
          🔖 Save Deal
        </button>
      </div>
    </div>
  )
}
