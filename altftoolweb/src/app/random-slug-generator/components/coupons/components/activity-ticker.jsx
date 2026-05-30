'use client';

import React, { useState, useEffect, useRef } from 'react';

const ACTIVITY_FEED = [
  { name: 'Priya S.', city: 'Mumbai', brand: 'Amazon', saving: '₹480', time: '2m ago' },
  { name: 'Rahul K.', city: 'Delhi', brand: 'Flipkart', saving: '₹500', time: '4m ago' },
  { name: 'Ananya M.', city: 'Bangalore', brand: 'Myntra', saving: '₹820', time: '6m ago' },
  { name: 'Vikram R.', city: 'Pune', brand: 'Udemy', saving: '₹2,100', time: '8m ago' },
  { name: 'Sneha P.', city: 'Chennai', brand: 'Mamaearth', saving: '₹210', time: '11m ago' },
  { name: 'Arjun T.', city: 'Hyderabad', brand: 'Croma', saving: '₹950', time: '13m ago' },
  { name: 'Divya N.', city: 'Kolkata', brand: 'AJIO', saving: '₹1,340', time: '15m ago' },
  { name: 'Karan L.', city: 'Ahmedabad', brand: 'Nike', saving: '₹600', time: '18m ago' },
  { name: 'Meera V.', city: 'Jaipur', brand: 'Boat', saving: '₹380', time: '20m ago' },
  { name: 'Siddharth B.', city: 'Surat', brand: 'Samsung', saving: '₹1,500', time: '22m ago' },
];

export default function ActivityTicker() {
  const [liveUsers] = useState(() => Math.floor(2800 + Math.random() * 600));
  const trackRef = useRef(null);

  const doubled = [...ACTIVITY_FEED, ...ACTIVITY_FEED];

  return (
    <div className="w-full bg-[#0F172A] border-b border-[#1E293B] py-2 overflow-hidden relative z-30">
      <div className="flex items-center gap-0 w-full">
        {/* Left pill — live users */}
        <div className="shrink-0 flex items-center gap-2 bg-[#e75a3e] text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 z-10 relative">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          {liveUsers.toLocaleString()} Live
        </div>

        {/* Scrolling track */}
        <div className="overflow-hidden flex-1">
          <div
            ref={trackRef}
            className="flex gap-0 altftool-marquee-track"
            style={{ width: 'max-content' }}
          >
            {doubled.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-5 border-r border-[#1E293B] text-[10px] font-semibold text-slate-300 whitespace-nowrap"
              >
                <span className="text-[#e75a3e] font-black">🎉</span>
                <span className="text-white font-bold">{item.name}</span>
                <span className="text-slate-400">from {item.city} just saved</span>
                <span className="text-emerald-400 font-black">{item.saving}</span>
                <span className="text-slate-400">on {item.brand}</span>
                <span className="text-slate-600 text-[9px]">· {item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
