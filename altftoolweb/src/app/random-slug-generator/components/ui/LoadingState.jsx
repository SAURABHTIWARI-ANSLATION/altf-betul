import React from 'react'

export default function LoadingState({ message = 'Finding your destination...' }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'color-mix(in srgb, var(--background) 88%, transparent)', backdropFilter: 'blur(16px)', zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: '72px', height: '72px', marginBottom: '1.5rem' }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '4px solid var(--anslation-ds-primary-soft)' }} />
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '4px solid transparent', borderTopColor: 'var(--primary)', animation: 'spin 0.8s linear infinite' }} />
        <div style={{ position: 'absolute', inset: '10px', borderRadius: '50%', background: 'var(--card)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--anslation-ds-shadow-sm)', fontSize: '1.25rem' }}>
          🎲
        </div>
      </div>
      <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.375rem' }}>{message}</h2>
      <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>Securing your destination…</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
