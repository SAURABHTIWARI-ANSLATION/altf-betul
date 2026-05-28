"use client"

import React, { useState } from 'react'
import Coupons from './components/coupons/page'
import Quizes from './components/quizs/pages'
import SoftLanding from './components/softlanding-page/pages'
import SpinsWins from './components/spins-wins/spins-wins'
import ViralPages from './components/viral-page/pages'

export default function page() {
  const [view, setView] = useState('landing')
  const [prefix, setPrefix] = useState('')
  const [slug, setSlug] = useState('')
  const [selected, setSelected] = useState('')

  function generateSlug() {
    const rand = Math.random().toString(36).slice(2, 10)
    setSlug(`${prefix ? prefix + '-' : ''}${rand}`)
  }

  function copySlug() {
    if (!slug) return
    navigator.clipboard?.writeText(slug)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      {view === 'landing' ? (
        <section className="max-w-3xl text-center bg-white rounded-lg shadow p-10">
          <h1 className="text-3xl font-bold mb-4">Random Slug Generator</h1>
          <p className="text-gray-600 mb-6">
            Quickly create readable, random slugs for testing routes, demo data,
            or sample content. Click the button to try the generator.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setView('normal')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try Generator
            </button>
            <button
              onClick={() => setView('normal')}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              View Demo
            </button>
          </div>
        </section>
      ) : (
        <section className="w-full max-w-5xl bg-white rounded-lg shadow p-6">
          <div className="flex items-start justify-between gap-6">
            <aside className="w-64 border-r pr-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Components</h3>
                <button onClick={() => setView('landing')} className="text-sm text-blue-600">Back</button>
              </div>
              <ul className="space-y-2">
                {[
                  { id: 'coupons', label: 'Coupons' },
                  { id: 'quizes', label: 'Quizes' },
                  { id: 'softlanding', label: 'Soft Landing' },
                  { id: 'spins', label: 'Spins & Wins' },
                  { id: 'viral', label: 'Viral Page' },
                ].map((c) => (
                  <li key={c.id}>
                    <button
                      onClick={() => setSelected(c.id)}
                      className={`w-full text-left px-2 py-1 rounded hover:bg-gray-100 ${selected===c.id? 'bg-gray-100':''}`}
                    >
                      {c.label}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            <div className="flex-1">
              <div className="mb-4">
                <label className="block text-sm text-gray-700 mb-2">Prefix (optional)</label>
                <input
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value.replace(/\s+/g, '-').toLowerCase())}
                  placeholder="e.g. product, post, demo"
                  className="w-full mb-2 px-3 py-2 border rounded"
                />
                <div className="flex gap-2 mb-4">
                  <button onClick={generateSlug} className="px-4 py-2 bg-green-600 text-white rounded">Generate</button>
                  <button onClick={() => { setSlug(''); setPrefix('') }} className="px-4 py-2 border rounded">Reset</button>
                  <button onClick={copySlug} className="px-4 py-2 border rounded">Copy</button>
                </div>
                <div className="bg-gray-100 p-3 rounded">
                  <p className="text-sm text-gray-600">Generated slug</p>
                  <pre className="font-mono mt-2 text-lg">{slug || '— not generated yet —'}</pre>
                </div>
              </div>

              <div className="mt-4">
                {selected === 'coupons' && <Coupons />}
                {selected === 'quizes' && <Quizes />}
                {selected === 'softlanding' && <SoftLanding />}
                {selected === 'spins' && <SpinsWins />}
                {selected === 'viral' && <ViralPages />}
                {!selected && (
                  <div className="text-gray-600">Select a component from the left to preview it here.</div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
