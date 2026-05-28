"use client"
import React, { useState, useEffect } from 'react'
import { getCountdown, copyToClipboard } from '../../utils'

export default function CouponsPage({ item }) {
  const [copied, setCopied] = useState(false)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 })

  useEffect(() => {
    if (!item?.expires) return
    setCountdown(getCountdown(item.expires))
    const id = setInterval(() => setCountdown(getCountdown(item.expires)), 1000)
    return () => clearInterval(id)
  }, [item?.expires])

  async function handleCopy() {
    await copyToClipboard(item.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!item) return null

  return (
    <div className="rp-coupon-card">
      {/* Perforation */}
      <div className="rp-coupon-perf rp-coupon-perf--top" />
      <div className="rp-coupon-perf rp-coupon-perf--bottom" />

      <div style={{ padding: '1.75rem 1.5rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
          <span className="badge chip" style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            🏷️ Coupon
          </span>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted-foreground)' }}>
            {item.usedCount?.toLocaleString()} used
          </span>
        </div>

        {/* Title */}
        <h2 style={{ fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', fontWeight: 750, color: 'var(--foreground)', lineHeight: 1.15, marginBottom: '0.5rem' }}>
          {item.title}
        </h2>

        {/* Code Box */}
        <div className="rp-coupon-code-box" style={{ margin: '1.25rem 0' }}>
          <span>{item.code}</span>
          <button
            onClick={handleCopy}
            className="btn btn-primary"
            style={{ minHeight: '36px', padding: '0.375rem 0.875rem', fontSize: '0.8125rem', borderRadius: 'var(--anslation-ds-radius-sm)' }}
          >
            {copied ? '✓ Copied!' : 'Copy'}
          </button>
        </div>

        {/* Countdown */}
        {item.expires && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--muted-foreground)', fontWeight: 500 }}>⏰ Expires in:</span>
            <div style={{ display: 'flex', gap: '0.375rem' }}>
              {[['d', countdown.days], ['h', countdown.hours], ['m', countdown.mins], ['s', countdown.secs]].map(([unit, val]) => (
                <div key={unit} className="rp-countdown-unit">
                  <span>{String(val).padStart(2, '0')}</span>
                  <span style={{ fontSize: '0.6rem', opacity: 0.6 }}>{unit}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          style={{ width: '100%', minHeight: '52px', fontSize: '1rem', fontWeight: 700, borderRadius: 'var(--anslation-ds-radius-lg)', justifyContent: 'center' }}
        >
          🛍️ Claim Coupon
        </a>
      </div>
    </div>
  )
}
