import React from 'react'

export default function EmptyState({ message, onReset }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem', textAlign: 'center', background: 'var(--muted)', borderRadius: 'var(--anslation-ds-radius-xl)', border: '2px dashed var(--border)', margin: '1.5rem 0' }}>
      <div style={{ width: '64px', height: '64px', background: 'var(--card)', borderRadius: 'var(--anslation-ds-radius-lg)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', marginBottom: '1.25rem', boxShadow: 'var(--anslation-ds-shadow-sm)' }}>
        🚫
      </div>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.5rem' }}>Nothing found</h3>
      <p style={{ color: 'var(--muted-foreground)', marginBottom: '1.5rem', maxWidth: '360px', lineHeight: 1.65, fontSize: '0.9375rem' }}>
        {message || 'No active links available for this category right now. Try another one.'}
      </p>
      {onReset && (
        <button onClick={onReset} className="btn btn-secondary"
          style={{ minHeight: '44px', padding: '0 1.5rem', fontWeight: 600 }}>
          ← Go Back
        </button>
      )}
    </div>
  )
}
