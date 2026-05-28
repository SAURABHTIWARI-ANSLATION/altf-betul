"use client"
import React, { useState } from 'react'
import { copyToClipboard } from '../../utils'

const STEPS = [
  { id: 1, label: 'Visit this page', icon: '👁️', auto: true },
  { id: 2, label: 'Share with a friend', icon: '👆', auto: false },
  { id: 3, label: 'Follow us', icon: '📲', auto: false },
]

export default function RewardPage({ item }) {
  const [completed, setCompleted] = useState([1]) // step 1 auto-done
  const [copied, setCopied] = useState(false)

  const allDone = completed.length === STEPS.length
  const progress = Math.round((completed.length / STEPS.length) * 100)

  function completeStep(id) {
    if (!completed.includes(id)) setCompleted(c => [...c, id])
  }

  async function handleCopy() {
    await copyToClipboard(item?.rewardCode || 'REWARD500')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto' }}>
      <h2 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.625rem)', fontWeight: 750, color: 'var(--foreground)', marginBottom: '0.5rem', textAlign: 'center' }}>
        {allDone ? '🔓 Reward Unlocked! 🎉' : '🎁 Your Exclusive Reward'}
      </h2>
      <p style={{ color: 'var(--muted-foreground)', textAlign: 'center', marginBottom: '1.5rem', fontSize: '0.9375rem' }}>
        {allDone ? 'Congratulations! Here is your reward.' : 'Complete all steps to unlock your reward.'}
      </p>

      {/* Reward Preview */}
      <div className="rp-reward-locked-preview" style={{ marginBottom: '1.5rem' }}>
        <div style={{ height: '120px', background: 'linear-gradient(135deg, var(--anslation-ds-primary-soft), var(--muted))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
          🎁
        </div>
        {!allDone && (
          <div className="rp-reward-blur-overlay">
            <span className="rp-reward-lock-icon">🔒</span>
          </div>
        )}
      </div>

      {/* Steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '1.25rem' }}>
        {STEPS.map(step => {
          const done = completed.includes(step.id)
          return (
            <button key={step.id} className={`rp-reward-step-card${done ? ' completed' : ''}`}
              onClick={() => !done && completeStep(step.id)}
              style={{ cursor: done ? 'default' : 'pointer' }}>
              <div className={`rp-reward-step-num${done ? ' done' : ''}`}>
                {done ? '✓' : step.id}
              </div>
              <span style={{ fontWeight: 600, color: done ? 'var(--anslation-ds-success)' : 'var(--foreground)', fontSize: '0.9375rem' }}>
                {step.icon} {step.label}
              </span>
              {!done && <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>Tap →</span>}
            </button>
          )
        })}
      </div>

      {/* Progress */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', color: 'var(--muted-foreground)', fontWeight: 600, marginBottom: '0.5rem' }}>
          <span>{completed.length}/{STEPS.length} Complete</span><span>{progress}%</span>
        </div>
        <div className="rp-reward-progress-track">
          <div className="rp-reward-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {allDone ? (
        <>
          <div className="rp-spin-code-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1rem', animation: 'rp-bounceIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both' }}>
            <span>{item?.rewardCode || 'REWARD500'}</span>
            <button onClick={handleCopy} className="btn btn-primary" style={{ minHeight: '36px', fontSize: '0.8125rem' }}>{copied ? '✓ Copied' : 'Copy'}</button>
          </div>
          <a href={item?.url || '#'} target="_blank" rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ width: '100%', minHeight: '52px', fontSize: '1rem', fontWeight: 700, justifyContent: 'center', borderRadius: 'var(--anslation-ds-radius-lg)' }}>
            Redeem Now →
          </a>
          <p style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.8125rem', color: 'var(--muted-foreground)' }}>Expires in 48 hours</p>
        </>
      ) : (
        <button className="btn btn-primary"
          onClick={() => { const next = STEPS.find(s => !completed.includes(s.id)); if (next) completeStep(next.id) }}
          style={{ width: '100%', minHeight: '52px', fontSize: '1rem', fontWeight: 700, justifyContent: 'center', borderRadius: 'var(--anslation-ds-radius-lg)' }}>
          Complete Next Step →
        </button>
      )}
    </div>
  )
}
