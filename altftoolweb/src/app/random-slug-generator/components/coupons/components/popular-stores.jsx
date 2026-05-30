'use client';


import React, { useState, useEffect } from 'react';
import { useCouponModal } from './coupon-modal-context';
import amazonLogo from '../assets/amazon.jpg';
import myntraLogo from '../assets/myntra.jpg';
import airIndiaLogo from '../assets/airindia.jpg';
import dellLogo from '../assets/dell.jpg';
import ajioLogo from '../assets/ajio.jpg';
import uberLogo from '../assets/uber.jpg';
import makeMyTripLogo from '../assets/makemytrip.jpg';
import udemyLogo from '../assets/udemy.jpg';
import samsungLogo from '../assets/samsung.jpg';
import nykaaLogo from '../assets/nykaa.jpg';
import hpShoppingLogo from '../assets/hp-shopping.jpg';
import adidasLogo from '../assets/adidas.jpg';
import nikeLogo from '../assets/nike.jpg';
import onePlusLogo from '../assets/oneplus.jpg';
import flipkartLogo from '../assets/flipkart.jpg';
import godaddyLogo from '../assets/godaddy.jpg';
import namecheapLogo from '../assets/namecheap.png';
import mamaearthLogo from '../assets/mamaearth.jpg';
import wowSkinLogo from '../assets/wow-skin.webp';
import pumaLogo from '../assets/puma.jpg';
import boatLogo from '../assets/boat.jpg';
import noiseLogo from '../assets/noise.jpg';
import urbanicLogo from '../assets/urbanic.jpg';
import tataCliqLogo from '../assets/tatacliq.jpg';
import jiomartLogo from '../assets/jiomart.png';
import pharmeasyLogo from '../assets/pharmeasy.jpg';
import netmedsLogo from '../assets/netmeds.jpg';
import oneMgLogo from '../assets/1mg.png';
import cromaLogo from '../assets/croma.jpg';
import asusLogo from '../assets/asus.jpg';
import lenovoLogo from '../assets/lenovo.jpg';
import lenskartLogo from '../assets/lenskart.png';
import muscleBlazeLogo from '../assets/muscleblaze.jpg';
import fastrackLogo from '../assets/fastrack.jpg';

const getLogoSrc = (logo) => typeof logo === 'object' && logo !== null && 'src' in logo ? logo.src : logo;

export const STORES = [

  { name: 'Amazon', logo: amazonLogo, domain: 'amazon.in', coupons: 18, color: 'text-[#ff9900]', bg: 'bg-[#ff9900]' },
  { name: 'Myntra', logo: myntraLogo, domain: 'myntra.com', coupons: 12, color: 'text-[#e61c5d]', bg: 'bg-[#e61c5d]' },
  { name: 'Air India', logo: airIndiaLogo, domain: 'airindia.com', coupons: 5, color: 'text-[#cb202d]', bg: 'bg-[#cb202d]' },
  { name: 'Dell', logo: dellLogo, domain: 'dell.com', coupons: 9, color: 'text-[#006bb4]', bg: 'bg-[#006bb4]' },
  { name: 'AJIO', logo: ajioLogo, domain: 'ajio.com', coupons: 14, color: 'text-[#0f2e59]', bg: 'bg-[#0f2e59]' },
  { name: 'UBER', logo: uberLogo, domain: 'uber.com', coupons: 7, color: 'text-[#000000]', bg: 'bg-[#000000]' },
  { name: 'MakeMyTrip', logo: makeMyTripLogo, domain: 'makemytrip.com', coupons: 11, color: 'text-[#00529b]', bg: 'bg-[#00529b]' },
  { name: 'Udemy', logo: udemyLogo, domain: 'udemy.com', coupons: 8, color: 'text-[#a435f0]', bg: 'bg-[#a435f0]' },
  { name: 'Samsung', logo: samsungLogo, domain: 'samsung.com', coupons: 15, color: 'text-[#1428a0]', bg: 'bg-[#1428a0]' },
  { name: 'Nykaa', logo: nykaaLogo, domain: 'nykaa.com', coupons: 13, color: 'text-[#fc2779]', bg: 'bg-[#fc2779]' },
  { name: 'HP Shopping', logo: hpShoppingLogo, domain: 'hp.com', coupons: 10, color: 'text-[#0091ff]', bg: 'bg-[#0091ff]' },
  { name: 'Adidas', logo: adidasLogo, domain: 'adidas.co.in', coupons: 9, color: 'text-black', bg: 'bg-black' },
  { name: 'Nike', logo: nikeLogo, domain: 'nike.com', coupons: 16, color: 'text-neutral-800', bg: 'bg-neutral-800' },
  { name: 'OnePlus', logo: onePlusLogo, domain: 'oneplus.in', coupons: 8, color: 'text-[#f50f30]', bg: 'bg-[#f50f30]' },
  { name: 'Flipkart', logo: flipkartLogo, domain: 'flipkart.com', coupons: 25, color: 'text-[#2874f0]', bg: 'bg-[#2874f0]' },
  { name: 'Godaddy', logo: godaddyLogo, domain: 'godaddy.com', coupons: 9, color: 'text-[#00a63f]', bg: 'bg-[#00a63f]' },
  { name: 'Namecheap', logo: namecheapLogo, domain: 'namecheap.com', coupons: 5, color: 'text-[#de3721]', bg: 'bg-[#de3721]' },
  { name: 'Mamaearth', logo: mamaearthLogo, domain: 'mamaearth.in', coupons: 11, color: 'text-[#8cc63f]', bg: 'bg-[#8cc63f]' },
  { name: 'Wow Skin', logo: wowSkinLogo, domain: 'buywow.in', coupons: 8, color: 'text-[#503d2e]', bg: 'bg-[#503d2e]' },
  { name: 'Puma', logo: pumaLogo, domain: 'in.puma.com', coupons: 14, color: 'text-neutral-900', bg: 'bg-neutral-900' },
  { name: 'Boat', logo: boatLogo, domain: 'boat-lifestyle.com', coupons: 15, color: 'text-red-600', bg: 'bg-red-600' },
  { name: 'Noise', logo: noiseLogo, domain: 'gonoise.com', coupons: 10, color: 'text-teal-600', bg: 'bg-teal-600' },
  { name: 'Urbanic', logo: urbanicLogo, domain: 'urbanic.com', coupons: 8, color: 'text-[#ff6f61]', bg: 'bg-[#ff6f61]' },
  { name: 'Tata Cliq', logo: tataCliqLogo, domain: 'tatacliq.com', coupons: 12, color: 'text-[#cb202d]', bg: 'bg-[#cb202d]' },
  { name: 'JioMart', logo: jiomartLogo, domain: 'jiomart.com', coupons: 13, color: 'text-[#002f6c]', bg: 'bg-[#002f6c]' },
  { name: 'Pharmeasy', logo: pharmeasyLogo, domain: 'pharmeasy.in', coupons: 9, color: 'text-[#107c6f]', bg: 'bg-[#107c6f]' },
  { name: 'Netmeds', logo: netmedsLogo, domain: 'netmeds.com', coupons: 7, color: 'text-[#00a896]', bg: 'bg-[#00a896]' },
  { name: '1mg', logo: oneMgLogo, domain: '1mg.com', coupons: 11, color: 'text-[#ff6f61]', bg: 'bg-[#ff6f61]' },
  { name: 'Croma', logo: cromaLogo, domain: 'croma.com', coupons: 16, color: 'text-[#00b9f5]', bg: 'bg-[#00b9f5]' },
  { name: 'ASUS', logo: asusLogo, domain: 'asus.com', coupons: 6, color: 'text-[#001a9c]', bg: 'bg-[#001a9c]' },
  { name: 'Lenovo', logo: lenovoLogo, domain: 'lenovo.com', coupons: 9, color: 'text-red-700', bg: 'bg-red-700' },
  { name: 'Lenskart', logo: lenskartLogo, domain: 'lenskart.com', coupons: 13, color: 'text-[#000046]', bg: 'bg-[#000046]' },
  { name: 'MuscleBlaze', logo: muscleBlazeLogo, domain: 'muscleblaze.com', coupons: 9, color: 'text-[#e92b2d]', bg: 'bg-[#e92b2d]', code: 'MUSCLEBLZ' },
  { name: 'Fastrack', logo: fastrackLogo, domain: 'fastrack.in', coupons: 11, color: 'text-black', bg: 'bg-black', code: 'FAST10' },

];

export default function PopularStores() {
  const { openModal } = useCouponModal();

  const handleOpen = (store) => {
    // Map store fields to modal expected shape
    openModal({
      brand: store.name,
      logo: getLogoSrc(store.logo),
      logoBg: store.bg,
      code: store.code || `${store.name.replace(/\s+/g, '').toUpperCase()}_CODE`,
      discount: `${store.coupons} Coupons`
    });
  };
  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState('next');
  const [animating, setAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = Math.ceil(STORES.length / 10);

  useEffect(() => {
    if (isPaused) return;

    let isActive = true;
    const interval = setInterval(() => {
      if (!isActive) return;
      setAnimating(true);
      setDirection('next');
      setTimeout(() => {
        if (!isActive) return;
        setSlideIndex((prev) => (prev + 1) % totalSlides);
        setAnimating(false);
      }, 250);
    }, 4000); // Slide every 4 seconds

    return () => {
      isActive = false;
      clearInterval(interval);
    };
  }, [isPaused, totalSlides]);

  const triggerSlide = (nextIndex, dir) => {
    if (animating) return;
    setAnimating(true);
    setDirection(dir);
    setTimeout(() => {
      setSlideIndex(nextIndex);
      setAnimating(false);
    }, 250);
  };

  const handleNext = () => {
    const nextIdx = (slideIndex + 1) % totalSlides;
    triggerSlide(nextIdx, 'next');
  };

  const handlePrev = () => {
    const prevIdx = (slideIndex - 1 + totalSlides) % totalSlides;
    triggerSlide(prevIdx, 'prev');
  };

  // Get current deck of 10 stores
  const currentStores = STORES.slice(slideIndex * 10, (slideIndex * 10) + 10);

  return (
    <section
      className="w-full bg-[#F8FAFC] px-4 sm:px-6 lg:px-10 py-10 selection:bg-[#e75a3e] selection:text-white border-t border-[#E2E8F0]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >

      {/* Section Header */}
      <div className="text-center mb-8 max-w-[1400px] mx-auto">
        <div className="inline-flex items-center gap-1.5 bg-[#1e1e1e] text-white text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm mb-3">
          <span className="text-[#e75a3e]">🛍️</span>
          Top Partnerships
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#1e1e1e] tracking-tight leading-tight">
          Popular <span className="text-[#e75a3e]">Stores</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B] mt-2 max-w-md mx-auto font-medium leading-relaxed">
          Find latest promo codes & exclusive discounts from over 50+ leading brands.
        </p>
      </div>

      {/* Main Container with navigation arrows on left and right */}
      <div className="max-w-[1400px] mx-auto relative flex items-center gap-2">

        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          className="absolute -left-2 sm:-left-6 z-20 p-2.5 rounded-full bg-[#ffffff] text-[#1e1e1e] border border-neutral-200 hover:bg-[#e75a3e] hover:text-white transition-all shadow-md active:scale-90"
          aria-label="Previous Stores"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Store Grid Area */}
        <div className="w-full overflow-hidden px-2 sm:px-6">
          <div
            className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 py-2 transition-all duration-300 ${animating
              ? direction === 'next'
                ? 'opacity-0 translate-x-[-20px] scale-95'
                : 'opacity-0 translate-x-[20px] scale-95'
              : 'opacity-100 translate-x-0 scale-100'
              }`}
          >
            {currentStores.map((store, index) => {
              const logoSrc = getLogoSrc(store.logo);
              return (
                <div
                  key={`${slideIndex}-${index}`}
                  onClick={() => handleOpen(store)}
                  className="group relative bg-[#ffffff] rounded-2xl border border-neutral-100 shadow-md hover:shadow-xl hover:border-[#e75a3e]/30 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col items-center justify-between p-5 min-h-[140px] sm:min-h-[160px] transform hover:-translate-y-1 animate-in fade-in zoom-in-95 duration-300"
                >
                  {/* Store Inner Logo area */}
                  <div className="w-full flex-grow flex items-center justify-center relative">
                    {/* Default view */}
                    <div className="transition-all duration-300 group-hover:opacity-0 flex flex-col items-center justify-center w-full h-full p-2">
                      {logoSrc ? (
                        <img
                          src={logoSrc}
                          alt={store.name}
                          className="max-h-20 max-w-[95%] w-auto object-contain drop-shadow-sm"
                          onError={(e) => {
                            // Fallback: try Clearbit if domain exists, else hide
                            if (store.domain && !e.target.dataset.fallback) {
                              e.target.dataset.fallback = 'true';
                              e.target.src = `https://logo.clearbit.com/${store.domain}`;
                            } else {
                              e.target.style.display = 'none';
                              if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                            }
                          }}
                        />
                      ) : store.domain ? (
                        <>
                          <img
                            src={`https://logo.clearbit.com/${store.domain}`}
                            alt={store.name}
                            className="max-h-20 max-w-[95%] w-auto object-contain drop-shadow-sm"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="hidden flex-col items-center justify-center w-full h-full">
                            <span className={`text-xl sm:text-2xl font-black tracking-tight ${store.color} text-center leading-none`}>
                              {store.name.substring(0, 4).toUpperCase()}
                            </span>
                            <span className="text-[8px] text-neutral-400 font-extrabold tracking-widest uppercase mt-1">STORE</span>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center w-full h-full">
                          <span className={`text-xl sm:text-2xl font-black tracking-tight ${store.color} text-center leading-none`}>
                            {store.name.substring(0, 4).toUpperCase()}
                          </span>
                          <span className="text-[8px] text-neutral-400 font-extrabold tracking-widest uppercase mt-1">STORE</span>
                        </div>
                      )}
                    </div>

                    {/* Hover overlay: Redeem Now & Coupons */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 bg-[#ffffff]/95 backdrop-blur-sm rounded-t-2xl z-10">
                      <span className={`text-white text-xs font-black tracking-wider uppercase px-3 py-1 rounded-full ${store.bg} shadow-md mb-2`}>
                        {store.coupons} Coupons
                      </span>
                      <button className="py-1.5 px-3 rounded-lg text-[10px] font-black bg-[#1e1e1e] hover:bg-[#e75a3e] text-white transition-all duration-300 shadow-sm uppercase tracking-wider text-center cursor-pointer">
                        Redeem Now
                      </button>
                    </div>
                  </div>

                  {/* Bottom Brand Name bar (Now persists even on card hover) */}
                  <div className="w-full text-center border-t border-neutral-50/80 pt-2 shrink-0 group-hover:border-[#e75a3e]/10 transition-colors">
                    <span className="text-xs font-bold text-neutral-700 block truncate group-hover:text-[#e75a3e]">
                      {store.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          className="absolute -right-2 sm:-right-6 z-20 p-2.5 rounded-full bg-[#ffffff] text-[#1e1e1e] border border-neutral-200 hover:bg-[#e75a3e] hover:text-white transition-all shadow-md active:scale-90"
          aria-label="Next Stores"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

      </div>

      {/* Slide Indicators / Page Dots */}
      <div className="flex justify-center gap-2 mt-8 max-w-[1400px] mx-auto">
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => triggerSlide(idx, idx > slideIndex ? 'next' : 'prev')}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${slideIndex === idx ? 'w-5 bg-[#e75a3e]' : 'w-1.5 bg-[#d4c9b8] hover:bg-[#b8a998]'
              }`}
            aria-label={`Go to slide page ${idx + 1}`}
          />
        ))}
      </div>

    </section>
  );
}
