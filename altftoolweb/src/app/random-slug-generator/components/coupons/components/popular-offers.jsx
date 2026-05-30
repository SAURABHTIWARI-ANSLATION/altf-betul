'use client';

import React, { useState } from 'react';
import { useCouponModal } from './coupon-modal-context';

const POPULAR_OFFERS = [
  {
    id: 1,
    brand: 'Dell',
    logo: 'https://logo.clearbit.com/dell.com',
    logoBg: 'bg-[#ffffff]',
    category: 'Electronics',
    discount: 'Up To 45% OFF',
    discountColor: 'text-[#2b6cb0]',
    title: 'Up To 45% OFF',
    description: 'Back To School Sale - Up To 40% OFF + Extra 5% OFF | No Cost EMI',

    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=600',
    badgeText: 'BACK TO SCHOOL OFFERS',
    badgeBg: 'bg-[#2b104c]' // Dark purple
  },
  {
    id: 2,
    brand: 'Savaari',
    logo: 'https://logo.clearbit.com/savaari.com',
    logoBg: 'bg-[#ffffff]',
    logoText: 'SAVAARI',
    category: 'Travel',
    discount: 'App Offer',
    discountColor: 'text-[#2b6cb0]',
    title: 'App Offer',
    description: 'App Exclusive Offer : Avail Up To Rs 500 OFF On First App Booking',

    image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&q=80&w=600',
    badgeText: null
  },
  {
    id: 3,
    brand: 'JioHotstar',
    logo: 'https://logo.clearbit.com/hotstar.com',
    logoBg: 'bg-[#ffffff]',
    logoText: 'JioHotstar',
    category: 'Entertainment',
    discount: 'IPL SPECIAL',
    discountColor: 'text-[#2b6cb0]',

    description: 'JioHotstar Super Annual Plan – Flat 3% OFF',
    code: 'IPLHOT3',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=600',
    badgeText: null
  },
  {
    id: 4,
    brand: 'HP',
    logo: 'https://logo.clearbit.com/hp.com',
    logoBg: 'bg-[#ffffff]',
    logoText: 'hp',
    logoCircleBg: 'bg-[#0091ff]',
    logoCircleText: 'Up to ₹12000.00 OFF',
    category: 'Electronics',
    discount: 'Omnibook Offer',
    discountColor: 'text-[#2b6cb0]',
    title: 'Omnibook Offer',
    description: 'HP Premium & Omnibook Offer: AI Pack Worth ₹96,000 at Just ₹999',

    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=600',
    badgeText: null
  }
];

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

export default function PopularOffers() {
  const { openModal } = useCouponModal();

  const handleCopy = (offer) => {
    openModal(offer);
  };

  return (
    <section className="w-full bg-[#F8FAFC] px-4 sm:px-6 lg:px-10 py-10 selection:bg-[#2b6cb0] selection:text-white">

      {/* Section Header */}
      <div className="text-center mb-8 max-w-[1400px] mx-auto">
        <div className="inline-flex items-center gap-1.5 bg-[#ffffff] text-[#1a1a1a] border border-[#E2E8F0] text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm mb-3">
          <span className="text-[#e75a3e]">🔥</span>
          Limited Time Offers
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#1e1e1e] tracking-tight leading-tight">
          Popular Offers <span className="text-[#e75a3e]">of the Day</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B] mt-2 max-w-md mx-auto font-medium leading-relaxed">
          Handpicked and verified deals from top brands. Updated daily so you never miss a saving.
        </p>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[1400px] mx-auto">
        {POPULAR_OFFERS.map((offer) => {
          return (
            <div
              key={offer.id}
              onClick={() => handleCopy(offer)}
              className="bg-[#ffffff] rounded-[1.25rem] shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md hover:border-[#e75a3e]/35 hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full cursor-pointer"
            >
              {/* Card Banner Image / Colored Background */}
              <div className="h-32 w-full relative overflow-hidden shrink-0">
                {offer.badgeBg ? (
                  <div className="w-full h-full bg-gradient-to-br from-[#2b104c] to-[#120524] p-4 flex flex-col justify-between text-white relative overflow-hidden">
                    {/* Abstract radial waves */}
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#ffffff]/5 rounded-full blur-md group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute right-6 bottom-2 w-12 h-12 bg-[#ffffff]/5 rounded-full blur-md group-hover:scale-95 transition-transform duration-500" />
                    <div className="relative z-10">
                      <span className="text-[10px] font-bold tracking-wider opacity-90 block">{offer.badgeText}</span>
                      <h4 className="text-base font-black leading-snug mt-1.5">Do more.<br />Save more.</h4>
                    </div>
                  </div>
                ) : (
                  <img
                    src={offer.image}
                    alt={offer.brand}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}

                {/* Brand Logo Circular Overlay */}
                <div className="absolute -bottom-6 left-4 z-10">
                  <div className="bg-[#ffffff] w-14 h-14 rounded-full border border-neutral-200 shadow-sm flex items-center justify-center overflow-hidden p-0.5 group-hover:scale-110 transition-transform duration-300">
                    {renderBrandLogo(offer.brand) ? (
                      renderBrandLogo(offer.brand)
                    ) : (
                      <>
                        <img
                          src={offer.logo}
                          alt={offer.brand}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="hidden w-full h-full items-center justify-center font-bold text-[10px] text-neutral-700 bg-neutral-100 rounded-full">
                          {offer.brand.substring(0, 3).toUpperCase()}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Bottom / Content Area */}
              <div className="p-4 pt-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className={`text-base font-black ${offer.discountColor} mb-2 leading-tight`}>
                    {offer.title}
                  </h3>
                  <p className="text-xs text-[#475569] font-semibold leading-relaxed mb-4">
                    {offer.description}
                  </p>

                  <p className="text-[8px] text-[#a89a8a] mt-1.5 font-medium">
                    🕐 Limited Time Offer
                  </p>
                </div>

                {/* Bottom Action Area */}
                <div className="h-0 opacity-0 overflow-hidden mt-0 group-hover:h-9 group-hover:opacity-100 group-hover:mt-4 transition-all duration-300 ease-in-out shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(offer);
                    }}
                    className="w-full py-2 px-3 rounded-lg text-[10px] font-black bg-[#1e1e1e] hover:bg-[#e75a3e] text-white transition-all duration-300 shadow-sm active:scale-95 uppercase tracking-wider text-center cursor-pointer"
                  >
                    Redeem Now
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}

