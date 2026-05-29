"use client"
import React, { useEffect, useMemo, useState } from 'react'

function getRemaining(target) {
  const end = target ? new Date(target).getTime() : Date.now() + 5400 * 1000
  const diff = Math.max(0, end - Date.now())
  return {
    hours: String(Math.floor(diff / 3600000)).padStart(2, '0'),
    minutes: String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'),
    seconds: String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'),
  }
}

export default function CountdownTimer({ target }) {
  const fallbackTarget = useMemo(() => Date.now() + 5400 * 1000, [])
  const [remaining, setRemaining] = useState(() => getRemaining(target || fallbackTarget))

  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining(target || fallbackTarget)), 1000)
    return () => clearInterval(id)
  }, [target, fallbackTarget])

  return (
    <div className="rp-deal-timer-box" aria-label="Deal countdown">
      Deal ends in: <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800 }}>
        {remaining.hours}:{remaining.minutes}:{remaining.seconds}
      </span>
    </div>
  )
}
