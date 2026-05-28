"use client"
import React, { useState } from 'react'

const PLANS = [
  { id: 'free', label: 'Free', monthly: '$0', yearly: '$0', features: ['5 projects', 'Basic analytics', 'Email support'], cta: 'Get Started' },
  { id: 'pro', label: 'PRO', monthly: '$9.99', yearly: '$5.99', features: ['Unlimited projects', 'Advanced analytics', 'Priority support', 'API access', 'Custom domain'], cta: 'Start Free Trial', recommended: true },
  { id: 'max', label: 'MAX', monthly: '$19.99', yearly: '$11.99', features: ['Everything in PRO', 'Team collaboration', 'White-label', 'SLA guarantee'], cta: 'Go MAX' },
]

export default function SubscriptionPage({ item }) {
  const [billing, setBilling] = useState('monthly')

  return (
    <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
      <h2 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.625rem)', fontWeight: 750, color: 'var(--foreground)', marginBottom: '0.5rem' }}>Upgrade Your Experience</h2>
      <p style={{ color: 'var(--muted-foreground)', marginBottom: '1.5rem', fontSize: '0.9375rem' }}>Flexible plans for every stage of your journey.</p>

      {/* Toggle */}
      <div className="rp-sub-billing-toggle" style={{ display: 'inline-flex', marginBottom: '2rem' }}>
        {['monthly', 'yearly'].map(b => (
          <button key={b} className={`rp-sub-billing-option${billing === b ? ' active' : ''}`} onClick={() => setBilling(b)}>
            {b === 'yearly' ? 'Yearly −40%' : 'Monthly'}
          </button>
        ))}
      </div>

      {/* Plans grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(160px, 100%), 1fr))', gap: '0.875rem', textAlign: 'left', alignItems: 'start' }}>
        {PLANS.map(plan => (
          <div key={plan.id} className={`rp-sub-pricing-card${plan.recommended ? ' recommended' : ''}`}>
            {plan.recommended && <span className="rp-sub-recommended-badge">⭐ Best Value</span>}

            <div style={{ fontWeight: 700, color: 'var(--foreground)', fontSize: '1rem', marginBottom: '0.25rem' }}>{plan.label}</div>
            <div className="rp-sub-price-amount">{billing === 'yearly' ? plan.yearly : plan.monthly}</div>
            <div className="rp-sub-price-period">/ month</div>

            <div style={{ margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              {plan.features.map(f => (
                <div key={f} className="rp-sub-feature-row">
                  <div className="rp-sub-feature-check">✓</div>
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <a href={item?.url || '#'} target="_blank" rel="noopener noreferrer"
              className={`btn ${plan.recommended ? 'btn-primary' : 'btn-secondary'}`}
              style={{ width: '100%', justifyContent: 'center', minHeight: '44px', fontWeight: 700 }}>
              {plan.cta}
            </a>
          </div>
        ))}
      </div>

      <p style={{ marginTop: '1.25rem', fontSize: '0.8125rem', color: 'var(--muted-foreground)' }}>
        Cancel anytime · No credit card required for trial
      </p>
    </div>
  )
}
