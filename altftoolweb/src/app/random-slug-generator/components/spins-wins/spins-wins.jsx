"use client"
import React, { useState, useRef } from 'react'
import { copyToClipboard } from '../../utils'

const PRIZES = ['10% OFF', 'FREE SHIP', '₹200 OFF', '₹500 OFF', 'BOGO', 'MYSTERY', '15% OFF', 'JACKPOT']
const SEGMENT_COUNT = PRIZES.length

function SpinWheel({ rotation, onSpin, spinning }) {
  const cx = 140, cy = 140, r = 130
  const angle = (2 * Math.PI) / SEGMENT_COUNT

  return (
    <div className="rp-spin-wheel-wrap">
      {/* Pointer */}
      <div className="rp-spin-pointer" />

      <svg
        viewBox="0 0 280 280"
        width="100%" height="100%"
        className="rp-spin-wheel-svg"
        style={{ transform: `rotate(${rotation}deg)`, transition: spinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none' }}
      >
        {PRIZES.map((prize, i) => {
          const start = i * angle - Math.PI / 2
          const end = start + angle
          const x1 = cx + r * Math.cos(start), y1 = cy + r * Math.sin(start)
          const x2 = cx + r * Math.cos(end),   y2 = cy + r * Math.sin(end)
          const mx = cx + (r * 0.65) * Math.cos(start + angle / 2)
          const my = cy + (r * 0.65) * Math.sin(start + angle / 2)
          const textAngle = ((start + end) / 2) * (180 / Math.PI)
          return (
            <g key={i}>
              <path
                d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z`}
                fill={i % 2 === 0 ? 'var(--anslation-ds-primary-soft)' : 'var(--card)'}
                stroke="var(--border)"
                strokeWidth="1"
              />
              <text
                x={mx} y={my}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="9"
                fontWeight="700"
                fill="var(--foreground)"
                transform={`rotate(${textAngle}, ${mx}, ${my})`}
              >
                {prize}
              </text>
            </g>
          )
        })}
        {/* Center dot */}
        <circle cx={cx} cy={cy} r="14" fill="var(--primary)" />
        <circle cx={cx} cy={cy} r="8" fill="var(--card)" />
      </svg>
    </div>
  )
}

export default function SpinsWinsPage({ item }) {
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [prize, setPrize] = useState(null)
  const [copied, setCopied] = useState(false)
  const baseRef = useRef(0)

  function handleSpin() {
    if (spinning || prize) return
    setSpinning(true)
    const extra = 1440 + Math.floor(Math.random() * 360)
    const winIndex = Math.floor(Math.random() * SEGMENT_COUNT)
    const segAngle = 360 / SEGMENT_COUNT
    const target = baseRef.current + extra + (SEGMENT_COUNT - winIndex) * segAngle
    baseRef.current = target
    setRotation(target)
    setTimeout(() => {
      setSpinning(false)
      setPrize(PRIZES[winIndex])
    }, 4100)
  }

  async function handleCopy() {
    const code = prize?.replace(/\s+/g, '') + '2026'
    await copyToClipboard(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
      <h2 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: 750, color: 'var(--foreground)', marginBottom: '0.375rem' }}>🎰 Spin to Win!</h2>
      <p style={{ color: 'var(--muted-foreground)', marginBottom: '1.5rem', fontSize: '0.9375rem' }}>One free spin · Your prize awaits</p>

      <SpinWheel rotation={rotation} onSpin={handleSpin} spinning={spinning} />

      {!prize && (
        <>
          <button
            onClick={handleSpin}
            disabled={spinning}
            className="btn btn-primary rp-spin-cta-btn"
          >
            {spinning ? '🌀 Spinning...' : '🌀 Spin the Wheel'}
          </button>
          <p style={{ marginTop: '1rem', fontSize: '0.8125rem', color: 'var(--muted-foreground)' }}>
            ⚡ {item?.prizesWonToday?.toLocaleString() || '1,247'} prizes won today · 🔒 Verified
          </p>
        </>
      )}

      {prize && (
        <div className="rp-spin-result-card" style={{ animation: 'rp-bounceIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both', marginTop: '1.5rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎉</div>
          <p style={{ fontWeight: 700, color: 'var(--muted-foreground)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>YOU WON!</p>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--foreground)', marginBottom: '1rem' }}>{prize}</h3>
          <div className="rp-spin-code-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1rem' }}>
            <span>{prize.replace(/\s+/g, '')}2026</span>
            <button onClick={handleCopy} className="btn btn-primary" style={{ minHeight: '36px', fontSize: '0.8125rem' }}>{copied ? '✓ Copied' : 'Copy'}</button>
          </div>
          <a href={item?.url || '#'} target="_blank" rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ width: '100%', minHeight: '52px', fontSize: '1rem', fontWeight: 700, justifyContent: 'center', borderRadius: 'var(--anslation-ds-radius-lg)' }}>
            Claim Now →
          </a>
          <span className="rp-spin-expiry-badge" style={{ display: 'inline-block', marginTop: '0.75rem' }}>⏱ Valid for 24h</span>
        </div>
      )}
    </div>
  )
}
