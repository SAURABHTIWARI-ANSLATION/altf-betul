"use client"
import React from 'react'

export default function ViralPage({ item }) {
  if (!item) return null
  return (
    <div style={{ background: 'var(--card)', borderRadius: 'var(--anslation-ds-radius-xl)', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--anslation-ds-shadow-md)' }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: '200px', background: 'linear-gradient(135deg, var(--anslation-ds-primary-soft) 0%, var(--muted) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '4rem' }}>🔥</span>
        <div className="rp-viral-overlay" />
        <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', display: 'flex', gap: '0.5rem' }}>
          <span className="rp-viral-badge">🔥 TRENDING</span>
          <span className="badge chip">⏱ {item.readTime} read</span>
        </div>
      </div>

      <div style={{ padding: '1.5rem' }}>
        <h2 style={{ fontSize: 'clamp(1.125rem, 3vw, 1.5rem)', fontWeight: 750, color: 'var(--foreground)', lineHeight: 1.2, marginBottom: '0.75rem' }}>
          {item.title}
        </h2>

        {/* Stats bar */}
        <div className="rp-viral-stats-bar">
          <span>👁 {item.views} views</span>
          <span>❤️ {item.likes} likes</span>
        </div>

        <p style={{ fontSize: '0.9375rem', color: 'var(--muted-foreground)', lineHeight: 1.65, margin: '1rem 0' }}>
          Discover something amazing that everyone is talking about. This piece has been shared thousands of times.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a href={item.url} target="_blank" rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ flex: 1, minWidth: '120px', minHeight: '48px', justifyContent: 'center', fontWeight: 700 }}>
            Read Full Story →
          </a>
          <button className="btn btn-secondary" style={{ minHeight: '48px', padding: '0 1rem' }}>
            🔗 Share
          </button>
        </div>
      </div>
    </div>
  )
}
