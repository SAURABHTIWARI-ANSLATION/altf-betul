'use client';

import React, { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <section className="w-full bg-[#f7fafc] px-4 sm:px-6 lg:px-10 py-14 relative overflow-hidden">
      {/* Background decorative blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#e75a3e]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-[#7c3aed]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* Icon */}
        <div className="w-14 h-14 bg-[#e75a3e]/15 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-[#e75a3e]/20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-[#e75a3e]">
            <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
            <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
          </svg>
        </div>

        {/* Heading */}
        <div className="inline-flex items-center gap-1.5 bg-[#e75a3e]/10 text-[#e75a3e] border border-[#e75a3e]/20 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4">
          🔥 Weekly Deals Newsletter
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-[#e75a3e] tracking-tight leading-tight mb-3">
          Never Miss a <span className="text-[#e75a3e]">Deal Again</span>
        </h2>
        <p className="text-sm text-slate-400 font-medium leading-relaxed mb-8 max-w-md mx-auto">
          Get the hottest coupons, exclusive promo codes, and flash sales delivered straight to your inbox every week. 100% free.
        </p>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-5 mb-7 text-[10px] font-bold text-slate-500">
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> No spam, ever</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Unsubscribe anytime</span>
          <span className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> 15k+ subscribers</span>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-[#1E293B] border border-[#334155] text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#e75a3e]/40 focus:border-[#e75a3e] transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#e75a3e] hover:bg-[#d64e32] text-white text-xs font-black py-3 px-6 rounded-xl transition-all duration-300 active:scale-95 shadow-lg shadow-[#e75a3e]/20 flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Subscribing...
                </>
              ) : (
                <>Get Free Deals <span>→</span></>
              )}
            </button>
          </form>
        ) : (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 max-w-md mx-auto">
            <div className="text-3xl mb-2">🎉</div>
            <h3 className="text-white font-black text-lg mb-1">You're in!</h3>
            <p className="text-emerald-400 text-sm font-semibold">Check your inbox for a welcome gift — a bonus coupon just for you.</p>
          </div>
        )}

        <p className="text-[10px] text-slate-600 mt-4 font-medium">
          By subscribing you agree to receive deal emails. We never share your data.
        </p>
        <p className="text-[8px] text-slate-600 mt-4 font-medium">
          *Note - Currently this is a static page and for demo purpose only.
        </p>
      </div>
    </section>
  );
}
