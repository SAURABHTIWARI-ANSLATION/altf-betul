"use client"
import React, { useState } from 'react'

export default function SoftLandingPage({ item }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  if (!item) return null

  return (
    <div style={{ background: 'var(--background)', minHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '440px', width: '100%', textAlign: 'center' }}>
        {/* Icon */}
        <div className="rp-soft-icon-wrap">🎁</div>

        <h2 style={{ fontSize: 'clamp(1.375rem, 4vw, 1.875rem)', fontWeight: 750, color: 'var(--foreground)', lineHeight: 1.2, marginBottom: '0.625rem' }}>
          {item.title}
        </h2>
        <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9375rem', marginBottom: '1.5rem', lineHeight: 1.65 }}>
          Join thousands of people who are already benefiting.
        </p>

        {/* Benefits */}
        <ul style={{ textAlign: 'left', marginBottom: '1.75rem', listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          {[item.benefit1, item.benefit2, item.benefit3].filter(Boolean).map((b, i) => (
            <li key={i} className="rp-soft-benefit-item">{b}</li>
          ))}
        </ul>

        {!submitted ? (
          <>
            <input
              className="input rp-soft-email-input"
              type="email"
              placeholder="📧 Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ width: '100%', padding: '0.875rem 1rem', fontSize: '1rem', marginBottom: '0.75rem', textAlign: 'left' }}
            />
            <button
              className="btn btn-primary"
              onClick={() => email && setSubmitted(true)}
              style={{ width: '100%', minHeight: '52px', fontSize: '1rem', fontWeight: 700, justifyContent: 'center', borderRadius: 'var(--anslation-ds-radius-lg)' }}
            >
              Get Free Access →
            </button>
          </>
        ) : (
          <div style={{ padding: '1.25rem', background: 'color-mix(in srgb, var(--anslation-ds-success) 10%, var(--card))', border: '1px solid var(--anslation-ds-success)', borderRadius: 'var(--anslation-ds-radius-lg)', color: 'var(--anslation-ds-success)', fontWeight: 700, fontSize: '1.0625rem' }}>
            ✅ You're in! Check your inbox.
          </div>
        )}

        <p className="rp-soft-trust-text">🔒 No spam. Unsubscribe anytime.</p>

        <div className="rp-soft-social-count" style={{ margin: '1rem auto 0', width: 'fit-content' }}>
          👥 {item.joinCount} people joined
        </div>
      </div>
    </div>
  )
}
