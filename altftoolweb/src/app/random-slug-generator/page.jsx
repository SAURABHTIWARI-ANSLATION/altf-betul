"use client"

import React, { useState } from 'react'
import { randomPagesConfig } from './config'
import { getRandomUrl, isValidUrl } from './utils'
import RandomCard from './components/ui/RandomCard'
import LoadingState from './components/ui/LoadingState'
import EmptyState from './components/ui/EmptyState'

// Keep original imports to keep existing functionality available
import Coupons from './components/coupons/page'
import Quizes from './components/quizs/pages'
import SoftLanding from './components/softlanding-page/pages'
import SpinsWins from './components/spins-wins/spins-wins'
import ViralPages from './components/viral-page/pages'
import Deals from './components/deals/page'

const SVGIcons = {
  coupons: <svg className="w-7 h-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>,
  deals: <svg className="w-7 h-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>,
  viralPages: <svg className="w-7 h-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  softEngagement: <svg className="w-7 h-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
  subscription: <svg className="w-7 h-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
  quiz: <svg className="w-7 h-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  spin: <svg className="w-7 h-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l2-1v-2.5M18 18l-2-1v-2.5" /></svg>,
  rewards: <svg className="w-7 h-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
}

export default function RandomPagesModule() {
  const [view, setView] = useState('inventory') 
  const [loadingCategory, setLoadingCategory] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  
  // Original Generator State
  const [prefix, setPrefix] = useState('')
  const [slug, setSlug] = useState('')
  const [selected, setSelected] = useState('')

  const categories = [
    { id: 'coupons', title: 'Coupons', desc: 'Find amazing discounts and exclusive offers.', iconSvg: SVGIcons.coupons },
    { id: 'deals', title: 'Today\'s Deals', desc: 'Handpicked deals curated just for you.', iconSvg: SVGIcons.deals },
    { id: 'viralPages', title: 'Viral Pages', desc: 'Trending content you absolutely must see.', iconSvg: SVGIcons.viralPages },
    { id: 'softEngagementLandingPages', title: 'Soft Engagement', desc: 'Discover interesting tips and fresh tricks.', iconSvg: SVGIcons.softEngagement },
    { id: 'subscriptionOffers', title: 'Subscriptions', desc: 'Premium plans at an unbeatable discount.', iconSvg: SVGIcons.subscription },
    { id: 'quizPages', title: 'Fun Quizzes', desc: 'Test yourself and have fun with our quizzes.', iconSvg: SVGIcons.quiz },
    { id: 'spinAndWin', title: 'Spin & Win', desc: 'Try your luck and spin the wheel for big prizes.', iconSvg: SVGIcons.spin },
    { id: 'rewardUnlockPages', title: 'Rewards', desc: 'Unlock mystery rewards and exclusive items.', iconSvg: SVGIcons.rewards }
  ];

  const handleRedirect = (categoryId) => {
    setLoadingCategory(categoryId);
    setErrorMsg(null);
    
    // Simulate delay for premium UX feel
    setTimeout(() => {
      const { error, url } = getRandomUrl(categoryId, randomPagesConfig);
      
      if (error || !url) {
        setErrorMsg(error || 'No valid URL found for this category.');
        setLoadingCategory(null);
        return;
      }

      if (!isValidUrl(url)) {
        setErrorMsg('The destination URL is invalid or broken.');
        setLoadingCategory(null);
        return;
      }

      window.location.href = url;
    }, 1800);
  };

  // Legacy Generator Functions
  function generateSlug() {
    const rand = Math.random().toString(36).slice(2, 10)
    setSlug(`${prefix ? prefix + '-' : ''}${rand}`)
  }

  function copySlug() {
    if (!slug) return
    navigator.clipboard?.writeText(slug)
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-gray-900 relative selection:bg-indigo-100 selection:text-indigo-900 overflow-hidden font-sans">
      
      {/* Premium Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-200/40 blur-[120px] mix-blend-multiply animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-200/40 blur-[120px] mix-blend-multiply animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[40%] h-[40%] rounded-full bg-blue-200/40 blur-[120px] mix-blend-multiply animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      {/* Floating Navigation Header */}
      <header className="sticky top-6 z-40 mx-auto max-w-fit px-4 sm:px-6">
        <div className="bg-white/70 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-full p-1.5 flex items-center gap-1 transition-all">
          <button 
            onClick={() => setView('inventory')} 
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${view === 'inventory' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'}`}
          >
            Inventory Hub
          </button>
          <button 
            onClick={() => setView('generator')} 
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${view === 'generator' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'}`}
          >
            Slug Engine
          </button>
          <button 
            onClick={() => setView('components')} 
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${view === 'components' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'}`}
          >
            Module Config
          </button>
        </div>
      </header>

      {/* Global Loading State */}
      {loadingCategory && <LoadingState />}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
        
        {/* VIEW: INVENTORY (Random Pages Module) */}
        {view === 'inventory' && (
          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            {/* Ultra Premium Hero Section */}
            <section className="text-center py-20 px-4 sm:px-6 lg:px-8 relative">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                Next-Gen Redirection Engine
              </div>
              <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 drop-shadow-sm">
                Discover <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-gradient-x">Random Rewards</span>
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500 font-medium leading-relaxed">
                Click on any sector below to securely route to random offers, exclusive deals, and viral experiences.
              </p>
            </section>

            {/* Error Fallback */}
            {errorMsg && (
              <EmptyState message={errorMsg} onReset={() => setErrorMsg(null)} />
            )}

            {/* Inventory Grid */}
            {!errorMsg && (
              <section className="relative">
                <div className="flex items-center justify-between mb-10 px-2">
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
                    Available Categories
                    <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-bold tracking-wider">{categories.length}</span>
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                  {categories.map((cat) => (
                    <RandomCard
                      key={cat.id}
                      category={cat.id}
                      title={cat.title}
                      description={cat.desc}
                      iconSvg={cat.iconSvg}
                      onRedirect={handleRedirect}
                      isLoading={loadingCategory === cat.id}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Premium CTA Banner Section */}
            <section className="mt-24 relative overflow-hidden bg-gray-900 rounded-[3rem] p-12 sm:p-16 text-center text-white shadow-2xl border border-gray-800">
               {/* Decorative glow elements */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[600px] bg-gradient-to-r from-indigo-500/30 to-purple-500/30 blur-[100px] rounded-full pointer-events-none"></div>
               
               <div className="relative z-10">
                 <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight text-white drop-shadow-md">Feeling Adventurous?</h2>
                 <p className="text-gray-300 text-lg sm:text-xl mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
                   Let our algorithmic engine select a completely randomized destination from across our entire network.
                 </p>
                 <button 
                   onClick={() => {
                     const cats = categories.map(c => c.id);
                     const randomCat = cats[Math.floor(Math.random() * cats.length)];
                     handleRedirect(randomCat);
                   }}
                   disabled={loadingCategory !== null}
                   className="group relative inline-flex items-center justify-center bg-white text-gray-900 font-bold py-4 px-10 rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                 >
                   <span className="relative z-10 flex items-center gap-2 text-lg">
                     Surprise Me
                     <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                     </svg>
                   </span>
                 </button>
               </div>
            </section>
          </div>
        )}

        {/* VIEW: GENERATOR (Legacy) */}
        {view === 'generator' && (
          <section className="max-w-3xl mx-auto mt-12 bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 p-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Slug Engine</h1>
              <p className="text-gray-500 font-medium text-lg">
                Generate cryptographically secure, readable slugs for testing environments.
              </p>
            </div>
            
            <div className="bg-gray-50/50 backdrop-blur-sm p-8 rounded-[2rem] border border-gray-100">
              <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Configuration Prefix</label>
              <input
                value={prefix}
                onChange={(e) => setPrefix(e.target.value.replace(/\s+/g, '-').toLowerCase())}
                placeholder="e.g. core-module, alpha-test"
                className="w-full mb-6 px-5 py-4 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium text-gray-700 shadow-sm"
              />
              
              <div className="flex flex-wrap gap-4 mb-8">
                <button onClick={generateSlug} className="flex-1 min-w-[140px] px-6 py-3.5 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">Generate Output</button>
                <button onClick={() => { setSlug(''); setPrefix('') }} className="px-6 py-3.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-sm">Reset</button>
                <button onClick={copySlug} className="px-6 py-3.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-sm flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  Copy
                </button>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">System Output</p>
                <pre className="font-mono text-xl text-gray-900 font-medium break-all">{slug || '— Awaiting generation —'}</pre>
              </div>
            </div>
          </section>
        )}

        {/* VIEW: COMPONENTS (Legacy Admin View) */}
        {view === 'components' && (
          <section className="w-full mt-12 bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 p-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col md:flex-row gap-10">
              <aside className="w-full md:w-72 md:border-r border-gray-100 md:pr-8 flex-shrink-0">
                <h3 className="text-xl font-bold text-gray-900 mb-6 tracking-tight">Active Modules</h3>
                <ul className="space-y-2">
                  {[
                    { id: 'coupons', label: 'Coupons Framework' },
                    { id: 'deals', label: 'Deals Engine' },
                    { id: 'quizes', label: 'Quiz Controller' },
                    { id: 'softlanding', label: 'Soft Landing Pages' },
                    { id: 'spins', label: 'Spins & Wins' },
                    { id: 'viral', label: 'Viral Accelerators' },
                  ].map((c) => (
                    <li key={c.id}>
                      <button
                        onClick={() => setSelected(c.id)}
                        className={`w-full text-left px-5 py-3.5 rounded-xl font-semibold transition-all duration-300 ${selected === c.id ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                      >
                        {c.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </aside>

              <div className="flex-1 min-w-0">
                <div className="bg-gray-50/50 backdrop-blur-sm rounded-[2rem] border border-gray-100 p-8 min-h-[500px] shadow-inner relative">
                  {selected === 'coupons' && <div className="animate-in fade-in duration-500"><Coupons /></div>}
                  {selected === 'deals' && <div className="animate-in fade-in duration-500"><Deals /></div>}
                  {selected === 'quizes' && <div className="animate-in fade-in duration-500"><Quizes /></div>}
                  {selected === 'softlanding' && <div className="animate-in fade-in duration-500"><SoftLanding /></div>}
                  {selected === 'spins' && <div className="animate-in fade-in duration-500"><SpinsWins /></div>}
                  {selected === 'viral' && <div className="animate-in fade-in duration-500"><ViralPages /></div>}
                  {!selected && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                      <div className="w-20 h-20 mb-6 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
                        <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                      </div>
                      <p className="font-medium text-lg text-gray-500">Select a module interface from the sidebar.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

      </div>
    </main>
  )
}
