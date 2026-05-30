'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const CouponModalContext = createContext();

export function useCouponModal() {
  return useContext(CouponModalContext);
}

// --- Confetti burst component ---
function ConfettiBurst() {
  const colors = ['#e75a3e', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#facc15'];
  const pieces = Array.from({ length: 38 });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((_, i) => {
        const angle = (i / pieces.length) * 360;
        const radius = 60 + Math.random() * 80;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius - 60;
        const color = colors[i % colors.length];
        const size = 4 + Math.random() * 6;
        const delay = Math.random() * 0.3;
        const rotation = Math.random() * 360;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              width: size,
              height: size,
              backgroundColor: color,
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rotation}deg)`,
              animation: `confetti-pop 0.9s ease-out ${delay}s both`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes confetti-pop {
          0% { transform: translate(-50%, -50%) translate(0, 0) scale(0) rotate(0deg); opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translate(-50%, -50%) translate(var(--tx, 0), var(--ty, 0)) scale(1) rotate(var(--r, 180deg)); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// Brand logo fallback renderer
const renderBrandLogo = (brand) => {
  if (brand === 'Dell') {
    return (
      <div className="w-full h-full rounded-full border-2 border-[#006bb4] flex flex-col items-center justify-center p-0.5 select-none bg-[#ffffff]">
        <span className="text-[10px] font-black text-[#006bb4] tracking-tight leading-none text-center">DELL</span>
        <span className="text-[5.5px] font-bold text-neutral-500 tracking-tighter leading-none text-center mt-0.5">Technologies</span>
      </div>
    );
  }
  if (brand === 'HP') {
    return (
      <div className="bg-[#0091ff] w-full h-full rounded-full flex items-center justify-center select-none">
        <span className="text-white text-xl font-black italic tracking-tighter leading-none pr-0.5">hp</span>
      </div>
    );
  }
  if (brand === 'Savaari') {
    return (
      <div className="bg-[#159ecb] w-full h-full rounded-full flex items-center justify-center text-center select-none">
        <span className="text-white text-[9px] font-black italic tracking-wider uppercase">SAVAARI</span>
      </div>
    );
  }
  if (brand === 'JioHotstar') {
    return (
      <div className="bg-[#030b21] w-full h-full rounded-full flex flex-col items-center justify-center text-center select-none">
        <span className="text-[#ffd83b] text-[8px] leading-none mb-0.5">★</span>
        <span className="text-white text-[10px] font-black tracking-tight leading-none">Jio</span>
        <span className="text-[7.5px] font-medium text-neutral-300 leading-none">Hotstar</span>
      </div>
    );
  }
  return null;
};

export function CouponModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [couponData, setCouponData] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [codeRevealed, setCodeRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [rating, setRating] = useState(null); // 'up' | 'down' | null
  const [shareSuccess, setShareSuccess] = useState(false);

  const openModal = (data) => {
    setCouponData(data);
    setFormData({ name: '', email: '' });
    setCodeRevealed(false);
    setCopied(false);
    setShowConfetti(false);
    setRating(null);
    setShareSuccess(false);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCouponData(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setCodeRevealed(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1200);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(couponData.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleShare = async () => {
    const shareData = {
      title: `${couponData.brand} Coupon`,
      text: `Use code ${couponData.code} to get ${couponData.discount || 'a great deal'} on ${couponData.brand}!`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      }
    } catch (e) { /* user cancelled */ }
  };

  return (
    <CouponModalContext.Provider value={{ openModal }}>
      {children}

      {isOpen && couponData && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          {/* Modal */}
          <div className="bg-[#ffffff] w-full max-w-md rounded-[2rem] border border-[#E2E8F0] shadow-2xl overflow-hidden relative">

            {/* Confetti */}
            {showConfetti && <ConfettiBurst />}

            {/* Top accent stripe */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#e75a3e] via-[#f59e0b] to-[#e75a3e] bg-[length:200%_100%] animate-pulse" />

            <div className="p-6">
              {/* Close */}
              <button
                onClick={closeModal}
                className="absolute top-5 right-5 text-neutral-400 hover:text-[#1a1a1a] p-1.5 rounded-full hover:bg-neutral-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Brand header */}
              <div className="flex items-center gap-3 pb-4 border-b border-dashed border-[#E2E8F0]">
                <div className="bg-[#F8FAFC] border border-neutral-200 w-12 h-12 rounded-xl flex items-center justify-center shadow-sm overflow-hidden p-1.5 shrink-0">
                  {(() => {
                    // normalize logo to a string if it's an imported module or object
                    const logoSrc = couponData && (typeof couponData.logo === 'string'
                      ? couponData.logo
                      : couponData.logo && (couponData.logo.src || couponData.logo.default || String(couponData.logo)) || '');

                    if (renderBrandLogo(couponData.brand)) return renderBrandLogo(couponData.brand);

                    if (logoSrc) {
                      return (
                        <>
                          <img src={logoSrc} alt={couponData.brand} className="w-full h-full object-contain"
                            onError={(e) => { e.target.style.display = 'none'; if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex'; }} />
                          <div className="hidden w-full h-full items-center justify-center bg-neutral-100 text-neutral-700 text-xs font-bold rounded-lg">
                            {couponData.brand?.charAt(0) || 'C'}
                          </div>
                        </>
                      );
                    }

                    return (
                      <div className={`w-full h-full flex items-center justify-center rounded-lg text-white font-extrabold text-sm ${couponData.logoBg || 'bg-[#e75a3e]'}`}>
                        {couponData.brand?.charAt(0) || 'C'}
                      </div>
                    );
                  })()}
                </div>
                <div>
                  <span className="text-[10px] font-black text-neutral-400 block tracking-wider leading-none uppercase">{couponData.brand}</span>
                  <span className="text-base font-black text-[#e75a3e] leading-tight block mt-0.5">{couponData.discount || 'Special Offer'}</span>
                </div>
                {/* Verified chip */}
                <div className="ml-auto flex items-center gap-1 bg-emerald-50 text-emerald-600 border border-emerald-100 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
                  <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified
                </div>
              </div>

              {!codeRevealed ? (
                <>
                  {/* Gift message */}
                  <div className="text-center my-5">
                    <div className="bg-[#e75a3e]/8 text-[#e75a3e] w-12 h-12 rounded-2xl flex items-center justify-center mx-auto text-xl mb-3 border border-[#e75a3e]/10">
                      🎁
                    </div>
                    <h3 className="text-lg font-black text-[#1a1a1a]">One step away!</h3>
                    <p className="text-xs font-semibold text-[#64748B] mt-1">Enter your details to unlock this exclusive coupon code.</p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <label className="text-[9px] font-black uppercase tracking-wider text-[#64748B] block mb-1.5">Your Name</label>
                      <input
                        type="text" required placeholder="e.g. Priya Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] placeholder-slate-300 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#e75a3e]/20 focus:border-[#e75a3e] transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-black uppercase tracking-wider text-[#64748B] block mb-1.5">Email Address</label>
                      <input
                        type="email" required placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] placeholder-slate-300 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#e75a3e]/20 focus:border-[#e75a3e] transition-all"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#e75a3e] hover:bg-[#d64e32] text-white text-xs font-black py-3 rounded-xl shadow-lg shadow-[#e75a3e]/20 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M18 1.5a.75.75 0 01.75.75V6h2.25a.75.75 0 010 1.5H18.75v2.25a.75.75 0 01-1.5 0V7.5h-2.25a.75.75 0 010-1.5h2.25V2.25A.75.75 0 0118 1.5zM10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5z" clipRule="evenodd" />
                      </svg>
                      Reveal My Coupon Code
                    </button>
                    <p className="text-[9px] font-bold text-slate-300 text-center">🔒 We respect your privacy. No spam — just great deals.</p>
                  </form>
                </>
              ) : (
                <div className="space-y-4 pt-4">
                  {/* Coupon code reveal */}
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-dashed border-emerald-200 rounded-2xl p-5 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-400" />
                    <span className="text-[9px] font-black text-emerald-600 block uppercase tracking-widest mb-2">🎉 Your Coupon Code</span>
                    <div className="font-mono text-2xl font-black text-[#1a1a1a] tracking-[0.2em] select-all mb-3 py-1">
                      {couponData.code}
                    </div>
                    <button
                      onClick={handleCopy}
                      className={`w-full py-2.5 rounded-xl text-xs font-black transition-all duration-300 flex items-center justify-center gap-2 ${copied
                          ? 'bg-emerald-500 text-white scale-95'
                          : 'bg-[#1a1a1a] hover:bg-[#e75a3e] text-white'
                        }`}
                    >
                      {copied ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                          </svg>
                          Copied to Clipboard!
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 01-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217C7.99 4.18 8.967 3.086 10.226 3.07c.47-.014.94-.024 1.413-.024.423 0 .845.008 1.265.024A29.697 29.697 0 0115 3c.894 0 1.777.04 2.663.118z" clipRule="evenodd" />
                            <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.642a3 3 0 003 3h3a3 3 0 003-3v-4.5a3 3 0 00-3-3z" />
                          </svg>
                          Copy Code
                        </>
                      )}
                    </button>
                  </div>

                  {/* Did it work? */}
                  {!rating ? (
                    <div className="bg-[#F8FAFC] rounded-xl p-3 text-center border border-[#E2E8F0]">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-2">Did this code work for you?</p>
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => setRating('up')}
                          className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-100 text-xs font-bold px-4 py-2 rounded-lg transition-all"
                        >
                          👍 Yes, it worked!
                        </button>
                        <button
                          onClick={() => setRating('down')}
                          className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-500 border border-red-100 text-xs font-bold px-4 py-2 rounded-lg transition-all"
                        >
                          👎 Didn't work
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className={`rounded-xl p-3 text-center border text-xs font-bold ${rating === 'up' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-orange-50 border-orange-100 text-orange-500'}`}>
                      {rating === 'up' ? '🎉 Awesome! Glad it worked!' : '😔 Sorry about that. We\'ll verify this code again soon.'}
                    </div>
                  )}

                  {/* Action row: Share + Close */}
                  <div className="flex gap-2">
                    <button
                      onClick={handleShare}
                      className="flex-1 border border-[#E2E8F0] hover:border-[#e75a3e] hover:text-[#e75a3e] text-slate-500 text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z" clipRule="evenodd" />
                      </svg>
                      {shareSuccess ? 'Link Copied!' : 'Share Deal'}
                    </button>
                    <button
                      onClick={closeModal}
                      className="flex-1 bg-[#0F172A] hover:bg-[#e75a3e] text-white text-xs font-black py-2.5 rounded-xl transition-all"
                    >
                      Go to Store →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </CouponModalContext.Provider>
  );
}
