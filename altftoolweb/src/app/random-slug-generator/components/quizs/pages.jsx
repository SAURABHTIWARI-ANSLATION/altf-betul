"use client"
import React, { useState } from 'react'

const QUESTIONS = [
  { q: 'What type of shopper are you?', options: ['🛍️ Deals Hunter', '💎 Premium Quality', '⚡ Impulse Buyer', '📋 Research First'] },
  { q: 'How often do you shop online?', options: ['📅 Daily', '🗓️ Weekly', '📆 Monthly', '🎯 Only for deals'] },
  { q: 'What matters most to you?', options: ['💰 Price', '🚀 Speed', '⭐ Reviews', '🎨 Brand'] },
]

const RESULTS = ['The Smart Saver', 'The Trend Setter', 'The Quality Hunter', 'The Deal Master']

export default function QuizPage({ item }) {
  const [step, setStep] = useState(0)   // 0 = intro, 1..N = questions, N+1 = result
  const [answers, setAnswers] = useState([])
  const total = QUESTIONS.length

  function pick(opt) {
    const next = [...answers, opt]
    setAnswers(next)
    setStep(s => s + 1)
  }

  const isResult = step > total
  const isIntro = step === 0
  const currentQ = !isIntro && !isResult ? QUESTIONS[step - 1] : null
  const progress = isResult ? 100 : isIntro ? 0 : Math.round(((step - 1) / total) * 100)
  const resultType = RESULTS[answers.length % RESULTS.length]

  return (
    <div style={{ maxWidth: '540px', margin: '0 auto' }}>
      {/* Progress */}
      {!isIntro && (
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', color: 'var(--muted-foreground)', marginBottom: '0.5rem', fontWeight: 600 }}>
            <span>Question {Math.min(step, total)} of {total}</span>
            <span>{progress}%</span>
          </div>
          <div className="rp-quiz-progress-track">
            <div className="rp-quiz-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {isIntro && (
        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🤔</div>
          <h2 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.625rem)', fontWeight: 750, color: 'var(--foreground)', marginBottom: '0.625rem' }}>
            {item?.title || 'Fun Quiz'}
          </h2>
          <p style={{ color: 'var(--muted-foreground)', marginBottom: '1.5rem', lineHeight: 1.65 }}>
            {total} quick questions to discover your profile.
          </p>
          <button className="btn btn-primary" onClick={() => setStep(1)}
            style={{ minHeight: '52px', padding: '0 2rem', fontSize: '1rem', fontWeight: 700, borderRadius: 'var(--anslation-ds-radius-lg)' }}>
            Start Quiz →
          </button>
        </div>
      )}

      {currentQ && (
        <div style={{ animation: 'rp-slideInRight 300ms ease both' }}>
          <h3 style={{ fontSize: 'clamp(1.0625rem, 3vw, 1.375rem)', fontWeight: 700, color: 'var(--foreground)', marginBottom: '1.25rem', lineHeight: 1.3 }}>
            {currentQ.q}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {currentQ.options.map((opt) => (
              <button key={opt} className="rp-quiz-option-card" onClick={() => pick(opt)}>
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {isResult && (
        <div style={{ textAlign: 'center', animation: 'rp-bounceIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🎉</div>
          <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', fontWeight: 600, marginBottom: '0.25rem' }}>You are...</p>
          <h2 style={{ fontSize: 'clamp(1.375rem, 4vw, 2rem)', fontWeight: 750, color: 'var(--primary)', marginBottom: '0.5rem' }}>{resultType}</h2>

          {/* Score ring placeholder */}
          <div style={{ width: '80px', height: '80px', margin: '1rem auto', borderRadius: '50%', border: '4px solid var(--anslation-ds-primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--anslation-ds-shadow-md)' }}>
            <span style={{ fontWeight: 800, fontSize: '1.125rem', color: 'var(--primary)' }}>82%</span>
          </div>

          <a href={item?.url || '#'} target="_blank" rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ width: '100%', minHeight: '52px', fontSize: '1rem', fontWeight: 700, justifyContent: 'center', marginTop: '0.75rem', borderRadius: 'var(--anslation-ds-radius-lg)' }}>
            See My Personalized Deals →
          </a>
          <button className="btn btn-secondary" onClick={() => { setStep(0); setAnswers([]) }}
            style={{ width: '100%', minHeight: '44px', marginTop: '0.5rem', justifyContent: 'center' }}>
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  )
}
