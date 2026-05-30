'use client';

import React, { useState, useEffect } from 'react';
import { useCouponModal } from './coupon-modal-context';
import { STORES } from './popular-stores';

const TRENDING_DEALS = [
  {
    brand: 'Amazon',
    logo: 'https://cdn.grabon.in/gograbon/images/merchant/1773381281318/amazon-logo.jpg',
    logoBg: 'bg-[#ff9900]',
    titleColor: 'text-[#ff9900]',
    offerType: 'Electronics Special',
    title: 'App Exclusive Offer : Avail Up To Rs 500 OFF On First App Booking and gadgets.',
    code: 'SAVE20',
    discount: '20% OFF',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600'
  },
  {
    brand: 'Flipkart',
    logo: 'https://cdn.grabon.in/gograbon/images/merchant/1773826357590/flipkart-logo.jpg',
    logoBg: 'bg-[#2874f0]',
    titleColor: 'text-[#2874f0]',
    offerType: 'Grand Sale Offer',
    title: 'Big Billion Days : Flat Rs 500 Off On minimum purchase of Rs 2999 across all categories.',
    code: 'FKBD500',
    discount: '₹500 OFF',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=600'
  },
  {
    brand: 'Myntra',
    logo: 'https://cdn.grabon.in/gograbon/images/merchant/1774444164712/myntra-logo.jpg',
    logoBg: 'bg-[#e61c5d]',
    titleColor: 'text-[#e61c5d]',
    offerType: 'Fashion Exclusive',
    title: 'Style Upgrade : Up To 60% OFF On clothing, footwear and accessories.',
    code: 'MYNTRA60',
    discount: '60% OFF',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600'
  }
];

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { openModal } = useCouponModal();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [liveUsers, setLiveUsers] = useState(3241);

  const filteredStores = searchQuery.length > 0
    ? STORES.filter(store => store.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : [];

  // Simulate live user fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUsers(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let isActive = true;
    const timer = setInterval(() => {
      if (isActive && !isHovered) {
        setCurrentIndex((prev) => (prev + 1) % TRENDING_DEALS.length);
      }
    }, 4000);
    return () => {
      isActive = false;
      clearInterval(timer);
    };
  }, [isHovered]);

  const handleGrab = (deal) => {
    openModal(deal);
  };

  return (
    <div className="bg-[#F8FAFC] text-[#0F172A] font-sans antialiased selection:bg-[#e75a3e] selection:text-white relative w-full overflow-x-hidden">

      {/* Header bar */}
      <header className="border-b border-[#E2E8F0] bg-[#F8FAFC]/90 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-6 lg:px-10 py-3 w-full">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="bg-[#1e1e1e] p-2 rounded-lg shadow-md text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-12h9c.621 0 1.125.504 1.125 1.125V18c0 .621-.504 1.125-1.125 1.125h-9A1.125 1.125 0 0 1 6.375 18V7.125C6.375 6.504 6.879 6 7.5 6zM3 16.125V7.875C3 7.379 3.43 7 3.96 7h.08a1 1 0 0 1 1 1v8.25a1 1 0 0 1-1 1h-.08c-.53 0-.96-.379-.96-.875z" />
              </svg>
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-[#1e1e1e]">CouponHub</span>
              <p className="text-[9px] uppercase font-bold text-[#64748B] tracking-wider">Save Smarter</p>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:max-w-sm z-50">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#807663]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search brands, deals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              className="w-full bg-[#E2E8F0] text-[#0F172A] placeholder-[#807663] rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#e75a3e]/30 focus:bg-[#dfd7c2] transition-all duration-200 text-xs font-medium border border-transparent focus:border-[#e75a3e]/50"
            />

            {/* Search Results Dropdown */}
            {isSearchFocused && searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#ffffff] rounded-xl shadow-2xl border border-[#E2E8F0] overflow-hidden animate-in fade-in slide-in-from-top-2">
                {filteredStores.length > 0 ? (
                  <div className="py-2">
                    {filteredStores.map(store => (
                      <div
                        key={store.name}
                        onClick={() => {
                          openModal({
                            brand: store.name,
                            logo: store.logo,
                            logoBg: store.bg,
                            code: store.code || `${store.name.replace(/\s+/g, '').toUpperCase()}_CODE`,
                            discount: `${store.coupons} Coupons`
                          });
                          setSearchQuery('');
                        }}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#F8FAFC] cursor-pointer transition-colors"
                      >
                        <div className={`w-8 h-8 rounded-lg ${store.bg} flex items-center justify-center overflow-hidden flex-shrink-0`}>
                          <img src={store.logo} alt={store.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-[#1e1e1e]">{store.name}</span>
                          <span className="text-[10px] font-semibold text-[#807663]">{store.coupons} Active Coupons</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-6 text-center text-sm font-semibold text-[#807663]">
                    No stores found for "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Verified Daily badge */}
          <div className="hidden md:flex items-center gap-1.5 text-[11px] font-semibold text-[#15803D] bg-[#DCFCE7] py-1 px-2.5 rounded-full border border-[#BBF7D0]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Verified Daily
          </div>
        </div>
      </header>

      {/* Hero Section Container */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-8 md:py-14 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Left Side Info */}
        <div className="lg:col-span-6 space-y-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#ffffff] text-[#1a1a1a] border border-[#E2E8F0] text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
            <span className="text-[#e75a3e]">⚡</span>
            100% Verified Coupons
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1] text-[#1e1e1e]">
            Save big on every <br className="hidden sm:inline" />
            <span className="text-[#e75a3e] relative inline-block">
              order you ever make.
              <span className="absolute bottom-0 left-0 w-full h-[4px] bg-[#e75a3e]/10 rounded-full" />
            </span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-lg font-medium">
            Handpicked coupons from your favorite brands – Amazon, Myntra, Swiggy, MakeMyTrip and 100+ more. Tap any deal to unlock the code.
          </p>

          {/* Icon Stats */}
          <div className="pt-2 flex flex-wrap gap-x-5 gap-y-3 text-[11px] sm:text-xs font-bold text-[#334155]">
            <div className="flex items-center gap-1.5 bg-[#ffffff] border border-[#E2E8F0] rounded-full px-3 py-1.5 shadow-sm">
              <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>
              <span className="text-emerald-600 font-black">{liveUsers.toLocaleString()}</span> online now
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm">⚡</span> 16+ Live Deals
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm">🏷️</span> 11+ Categories
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm">🛡️</span> Free Forever
            </div>
          </div>
        </div>

        {/* Right Side Trending Card */}
        <div className="lg:col-span-6 relative">
          {/* Slider Viewport */}
          <div
            className="w-full overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Sliding Track */}
            <div
              className="flex gap-3 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(calc(-${currentIndex} * (80% + 12px)))` }}
            >
              {TRENDING_DEALS.map((deal, idx) => {
                const isActive = currentIndex === idx;
                return (
                  <div
                    key={deal.brand}
                    onClick={() => isActive && handleGrab(deal)}
                    className={`w-[80%] shrink-0 bg-[#ffffff] rounded-2xl flex flex-col border border-neutral-200 shadow-sm select-none transition-all duration-300 relative overflow-hidden ${isActive
                      ? 'cursor-pointer hover:shadow-md hover:scale-[1.01] active:scale-[0.99] opacity-100 scale-100'
                      : 'opacity-40 scale-95 pointer-events-none'
                      }`}
                  >
                    {/* Trending Now Badge — inside card */}
                    {isActive && (
                      <div className="absolute top-3 left-4 z-20 bg-[#e75a3e] text-white text-[8px] uppercase font-black tracking-widest px-2.5 py-1 rounded-md shadow-sm">
                        Trending Now
                      </div>
                    )}

                    {/* Brand Banner Image */}
                    <div className="h-36 sm:h-40 w-full relative overflow-hidden shrink-0">
                      <img
                        src={deal.image}
                        alt={deal.brand}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                    </div>

                    {/* Overlapping Brand Logo Badge */}
                    <div className={`${deal.logoBg} overflow-hidden bg-[#ffffff] text-white font-extrabold text-xl w-12 h-12 rounded-full border-[3px] border-white absolute left-4 top-[120px] sm:top-[132px] shadow-sm flex items-center justify-center z-10 shrink-0`}>
                      {deal.logo.startsWith('http') ? (
                        <img src={deal.logo} alt={deal.brand} className="w-full h-full object-contain p-1" />
                      ) : (
                        deal.logo
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-4 pt-8 flex-grow flex flex-col justify-between">
                      <div>
                        <h4 className={`text-base font-black ${deal.titleColor} mb-1`}>
                          {deal.offerType}
                        </h4>
                        <p className="text-xs font-semibold text-[#475569] leading-relaxed line-clamp-2">
                          {deal.title}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-dashed border-neutral-200">

                        <div className="text-xs font-black text-[#e75a3e] flex items-center gap-1">
                          Grab <span className="text-[9px] font-bold">➔</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Progress Indicators (Dots) */}
            <div className="flex justify-center gap-1.5 mt-5">
              {TRENDING_DEALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${currentIndex === idx ? 'w-5 bg-[#e75a3e]' : 'w-1.5 bg-[#d4c9b8] hover:bg-[#b8a998]'
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
