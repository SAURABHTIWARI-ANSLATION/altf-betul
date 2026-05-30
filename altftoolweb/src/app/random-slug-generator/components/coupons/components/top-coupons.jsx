'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useCouponModal } from './coupon-modal-context';
import amazonLogo from '../assets/amazon.jpg';
import flipkartLogo from '../assets/flipkart.jpg';
import myntraLogo from '../assets/myntra.jpg';
import mamaearthLogo from '../assets/mamaearth.jpg';
import wowSkinLogo from '../assets/wow-skin.webp';
import udemyLogo from '../assets/udemy.jpg';
import ajioLogo from '../assets/ajio.jpg';
import cromaLogo from '../assets/croma.jpg';

const CATEGORIES = [
  { id: 'all', name: 'All', icon: '🏷️' },
  { id: 'beauty', name: 'Beauty', icon: '✨' },
  { id: 'education', name: 'Education', icon: '🎓' },
  { id: 'electronics', name: 'Electronics', icon: '💻' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
  { id: 'fashion', name: 'Fashion', icon: '👕' },
  { id: 'food', name: 'Food', icon: '🍴' },
  { id: 'grocery', name: 'Grocery', icon: '🛒' },
  { id: 'health', name: 'Health', icon: '❤️' },
  { id: 'home', name: 'Home', icon: '🏠' }
];

const SORT_OPTIONS = [
  { id: 'popular', name: 'Most Popular' },
  { id: 'discount', name: 'Highest Discount' },
  { id: 'expiry', name: 'Expiring Soon' },
];

// expiryDate: 'YYYY-MM-DD' format
const INITIAL_COUPONS = [
  {
    id: 'c1', brand: 'AMAZON',
    logo: amazonLogo,
    logoBg: 'bg-[#ff9900]', accentColor: '#ff9900', domain: 'amazon.in', category: 'Electronics',
    discount: '20% OFF', title: 'Flat 20% Off on Electronics',
    description: 'Get 20% off on all electronics including phones, laptops & accessories.',
    code: 'AMZN20', expires: 'Expires 31 Dec 2026', expiryDate: '2026-12-31',
    usagePercent: 82, usersToday: '1.2k', rating: '4.9', discountValue: 20
  },
  {
    id: 'c2', brand: 'FLIPKART',
    logo: flipkartLogo,
    logoBg: 'bg-[#2874f0]', accentColor: '#2874f0', domain: 'flipkart.com', category: 'Electronics',
    discount: '₹500 OFF', title: 'Big Billion Days - Flat ₹500 Off',
    description: 'Flat ₹500 off on minimum purchase of ₹2999. Valid on all categories.',
    code: 'FKBD500', expires: 'Expires 15 Mar 2026', expiryDate: '2026-03-15',
    usagePercent: 74, usersToday: '950', rating: '4.8', discountValue: 500
  },
  {
    id: 'c3', brand: 'MYNTRA',
    logo: myntraLogo,
    logoBg: 'bg-[#e61c5d]', accentColor: '#e61c5d', domain: 'myntra.com', category: 'Fashion',
    discount: '60% OFF', title: 'Up to 60% Off on Fashion',
    description: 'Massive sale on top fashion brands. Buy 2 get 1 free on selected items.',
    code: 'MYNTRA60', expires: 'Expires 28 Feb 2026', expiryDate: '2026-02-28',
    usagePercent: 91, usersToday: '2.3k', rating: '4.9', discountValue: 60
  },
  {
    id: 'c4', brand: 'MAMAEARTH',
    logo: mamaearthLogo,
    logoBg: 'bg-[#8cc63f]', accentColor: '#8cc63f', domain: 'mamaearth.in', category: 'Beauty',
    discount: '15% OFF', title: 'Flat 15% Off On Baby Products',
    description: 'Save 15% on toxin-free hair care, skin care & baby care products.',
    code: 'MAMA15', expires: 'Expires 10 Jun 2026', expiryDate: '2026-06-10',
    usagePercent: 58, usersToday: '410', rating: '4.6', discountValue: 15
  },
  {
    id: 'c5', brand: 'WOW SKIN',
    logo: wowSkinLogo,
    logoBg: 'bg-[#503d2e]', accentColor: '#503d2e', domain: 'buywow.in', category: 'Beauty',
    discount: '20% OFF', title: 'Flat 20% Off On All Orders',
    description: 'Get 20% discount on all wellness, skin & hair care combos.',
    code: 'WOW20', expires: 'Expires 15 Jul 2026', expiryDate: '2026-07-15',
    usagePercent: 52, usersToday: '380', rating: '4.5', discountValue: 20
  },
  {
    id: 'c6', brand: 'UDEMY',
    logo: udemyLogo,
    logoBg: 'bg-[#a435f0]', accentColor: '#a435f0', domain: 'udemy.com', category: 'Education',
    discount: '90% OFF', title: 'Top Courses From ₹389 Only',
    description: 'Master web development, design, and business skills with top online courses.',
    code: 'UDEMYNEW', expires: 'Expires 31 Aug 2026', expiryDate: '2026-08-31',
    usagePercent: 67, usersToday: '720', rating: '4.7', discountValue: 90
  },
  {
    id: 'c7', brand: 'AJIO',
    logo: ajioLogo,
    logoBg: 'bg-[#0f2e59]', accentColor: '#0f2e59', domain: 'ajio.com', category: 'Fashion',
    discount: '50-90% OFF', title: 'Big Bold Sale: 50-90% OFF',
    description: 'Massive discounts on top fashion apparel and accessories for men and women.',
    code: 'AJIOBIG', expires: 'Expires 30 Jun 2026', expiryDate: '2026-06-30',
    usagePercent: 88, usersToday: '1.8k', rating: '4.8', discountValue: 90
  },
  {
    id: 'c8', brand: 'CROMA',
    logo: cromaLogo,
    logoBg: 'bg-[#00b9f5]', accentColor: '#00b9f5', domain: 'croma.com', category: 'Electronics',
    discount: '10% OFF', title: 'Flat 10% Off On Bank Cards',
    description: 'Instant 10% discount on credit and debit cards for all electronics.',
    code: 'CROMABANK', expires: 'Expires 10 May 2026', expiryDate: '2026-05-10',
    usagePercent: 79, usersToday: '1.1k', rating: '4.9', discountValue: 10
  }
  ,
  // Additional coupons to ensure minimum 5 per category
  // Electronics (need 2 more)
  {
    id: 'c9', brand: 'SAMSUNG', logo: require('../assets/samsung.jpg'), logoBg: 'bg-[#1428a0]', accentColor: '#1428a0', domain: 'samsung.com', category: 'Electronics',
    discount: '15% OFF', title: 'Extra 15% Off on Samsung TVs', description: 'Save on smart TVs and appliances.', code: 'SMS15', expires: 'Expires 31 Dec 2026', expiryDate: '2026-12-31', usagePercent: 65, usersToday: '540', rating: '4.7', discountValue: 15
  },
  {
    id: 'c10', brand: 'ONEPLUS', logo: require('../assets/oneplus.jpg'), logoBg: 'bg-[#000000]', accentColor: '#000000', domain: 'oneplus.com', category: 'Electronics',
    discount: '₹3000 OFF', title: 'Up to ₹3000 Off on OnePlus Phones', description: 'Limited time cashback and bank offers.', code: 'ONEP3000', expires: 'Expires 30 Sep 2026', expiryDate: '2026-09-30', usagePercent: 55, usersToday: '420', rating: '4.6', discountValue: 3000
  },

  // Fashion (need 3 more)
  {
    id: 'c11', brand: 'PUMA', logo: require('../assets/puma.jpg'), logoBg: 'bg-[#ff3b3b]', accentColor: '#ff3b3b', domain: 'puma.com', category: 'Fashion',
    discount: '40% OFF', title: '40% Off on Athleisure', description: 'Sportwear and shoes sale.', code: 'PUMA40', expires: 'Expires 15 Nov 2026', expiryDate: '2026-11-15', usagePercent: 48, usersToday: '310', rating: '4.5', discountValue: 40
  },
  {
    id: 'c12', brand: 'ADIDAS', logo: require('../assets/adidas.jpg'), logoBg: 'bg-[#111827]', accentColor: '#111827', domain: 'adidas.com', category: 'Fashion',
    discount: '30% OFF', title: '30% Off Select Styles', description: 'Top brands and seasonal picks.', code: 'ADD30', expires: 'Expires 01 Oct 2026', expiryDate: '2026-10-01', usagePercent: 53, usersToday: '360', rating: '4.6', discountValue: 30
  },
  {
    id: 'c13', brand: 'URBANIC', logo: require('../assets/urbanic.jpg'), logoBg: 'bg-[#1f2937]', accentColor: '#1f2937', domain: 'urbanic.com', category: 'Fashion',
    discount: '50% OFF', title: 'Mid-Season Fashion Sale', description: 'Trendsetting styles at half price.', code: 'URBN50', expires: 'Expires 20 Dec 2026', expiryDate: '2026-12-20', usagePercent: 60, usersToday: '480', rating: '4.7', discountValue: 50
  },

  // Beauty (need 3 more)
  {
    id: 'c14', brand: 'NYKAA', logo: require('../assets/nykaa.jpg'), logoBg: 'bg-[#ff3366]', accentColor: '#ff3366', domain: 'nykaa.com', category: 'Beauty',
    discount: '25% OFF', title: 'Beauty Festival: 25% Off', description: 'Skincare and cosmetics deals.', code: 'NYK25', expires: 'Expires 05 Sep 2026', expiryDate: '2026-09-05', usagePercent: 44, usersToday: '290', rating: '4.5', discountValue: 25
  },
  {
    id: 'c15', brand: 'NETMEDS', logo: require('../assets/netmeds.jpg'), logoBg: 'bg-[#0ea5a4]', accentColor: '#0ea5a4', domain: 'netmeds.com', category: 'Beauty',
    discount: '10% OFF', title: 'Personal Care Essentials Discount', description: 'Discounts on vitamins and care products.', code: 'NET10', expires: 'Expires 12 Aug 2026', expiryDate: '2026-08-12', usagePercent: 36, usersToday: '210', rating: '4.4', discountValue: 10
  },
  {
    id: 'c16', brand: 'PHARMEASY', logo: require('../assets/pharmeasy.jpg'), logoBg: 'bg-[#34d399]', accentColor: '#34d399', domain: 'pharmeasy.in', category: 'Beauty',
    discount: '20% OFF', title: 'Health & Beauty Essentials Sale', description: 'Save on health and skin care.', code: 'PHARM20', expires: 'Expires 01 Jul 2026', expiryDate: '2026-07-01', usagePercent: 30, usersToday: '180', rating: '4.3', discountValue: 20
  },

  // Education (need 4 more)
  {
    id: 'c17', brand: 'COURSE HUB', logo: require('../assets/udemy.jpg'), logoBg: 'bg-[#7c3aed]', accentColor: '#7c3aed', domain: 'courses.example', category: 'Education',
    discount: '85% OFF', title: 'Top Courses From ₹199', description: 'Professional certifications and upskilling.', code: 'EDU85', expires: 'Expires 31 Dec 2026', expiryDate: '2026-12-31', usagePercent: 40, usersToday: '240', rating: '4.6', discountValue: 85
  },
  {
    id: 'c18', brand: 'SKILLBOOST', logo: require('../assets/namecheap.png'), logoBg: 'bg-[#0ea5a4]', accentColor: '#0ea5a4', domain: 'skillboost.example', category: 'Education',
    discount: '70% OFF', title: 'Skill Courses Discount', description: 'Bootcamps and certifications.', code: 'SKILL70', expires: 'Expires 30 Nov 2026', expiryDate: '2026-11-30', usagePercent: 28, usersToday: '140', rating: '4.4', discountValue: 70
  },
  {
    id: 'c19', brand: 'LEARNFAST', logo: require('../assets/godaddy.jpg'), logoBg: 'bg-[#dc2626]', accentColor: '#dc2626', domain: 'learnfast.example', category: 'Education',
    discount: '60% OFF', title: 'Quick Courses Offer', description: 'Short courses for practical skills.', code: 'LF60', expires: 'Expires 15 Oct 2026', expiryDate: '2026-10-15', usagePercent: 22, usersToday: '110', rating: '4.2', discountValue: 60
  },
  {
    id: 'c20', brand: 'PRO ACADEMY', logo: require('../assets/makemytrip.jpg'), logoBg: 'bg-[#0ea5a4]', accentColor: '#0ea5a4', domain: 'proacademy.example', category: 'Education',
    discount: '50% OFF', title: 'Pro Academy Courses Sale', description: 'Career-oriented programs.', code: 'PRO50', expires: 'Expires 20 Sep 2026', expiryDate: '2026-09-20', usagePercent: 18, usersToday: '95', rating: '4.1', discountValue: 50
  },

  // Entertainment (need 5)
  {
    id: 'c21', brand: 'HOTFLIX', logo: require('../assets/airindia.jpg'), logoBg: 'bg-[#f97316]', accentColor: '#f97316', domain: 'hotflix.example', category: 'Entertainment',
    discount: '30% OFF', title: 'Streaming Subscription Offer', description: 'Annual plan discounts.', code: 'HOT30', expires: 'Expires 31 Aug 2026', expiryDate: '2026-08-31', usagePercent: 26, usersToday: '130', rating: '4.2', discountValue: 30
  },
  {
    id: 'c22', brand: 'MOVIETIME', logo: require('../assets/makemytrip.jpg'), logoBg: 'bg-[#ef4444]', accentColor: '#ef4444', domain: 'movietime.example', category: 'Entertainment',
    discount: '20% OFF', title: 'Movie Tickets Discount', description: 'Book tickets with partner offers.', code: 'MOV20', expires: 'Expires 10 Jul 2026', expiryDate: '2026-07-10', usagePercent: 20, usersToday: '100', rating: '4.0', discountValue: 20
  },
  {
    id: 'c23', brand: 'GAMENIGHT', logo: require('../assets/boat.jpg'), logoBg: 'bg-[#111827]', accentColor: '#111827', domain: 'gamenight.example', category: 'Entertainment',
    discount: '15% OFF', title: 'Gaming Accessories Sale', description: 'Headsets and controllers discounted.', code: 'GAME15', expires: 'Expires 01 Sep 2026', expiryDate: '2026-09-01', usagePercent: 15, usersToday: '80', rating: '4.1', discountValue: 15
  },
  {
    id: 'c24', brand: 'CONCERTS', logo: require('../assets/hp-shopping.jpg'), logoBg: 'bg-[#6b7280]', accentColor: '#6b7280', domain: 'concerts.example', category: 'Entertainment',
    discount: '10% OFF', title: 'Live Events Offers', description: 'Discounts on event tickets.', code: 'LIVE10', expires: 'Expires 05 Nov 2026', expiryDate: '2026-11-05', usagePercent: 12, usersToday: '60', rating: '4.0', discountValue: 10
  },
  {
    id: 'c25', brand: 'MUSICPLUS', logo: require('../assets/noise.jpg'), logoBg: 'bg-[#0f172a]', accentColor: '#0f172a', domain: 'musicplus.example', category: 'Entertainment',
    discount: '25% OFF', title: 'Premium Music Plan Discount', description: 'Save on yearly subscriptions.', code: 'MUSIC25', expires: 'Expires 31 Dec 2026', expiryDate: '2026-12-31', usagePercent: 30, usersToday: '150', rating: '4.3', discountValue: 25
  },

  // Food (need 5)
  {
    id: 'c26', brand: 'JIOMART', logo: require('../assets/jiomart.png'), logoBg: 'bg-[#0ea5a4]', accentColor: '#0ea5a4', domain: 'jiomart.com', category: 'Food',
    discount: '10% OFF', title: 'Grocery & Food Essentials', description: 'Save on daily essentials.', code: 'JIO10', expires: 'Expires 30 Sep 2026', expiryDate: '2026-09-30', usagePercent: 33, usersToday: '200', rating: '4.4', discountValue: 10
  },
  {
    id: 'c27', brand: 'FOODIFY', logo: require('../assets/uber.jpg'), logoBg: 'bg-[#111827]', accentColor: '#111827', domain: 'foodify.example', category: 'Food',
    discount: '25% OFF', title: 'Food Delivery Offers', description: 'Discounts on first orders.', code: 'FOOD25', expires: 'Expires 15 Aug 2026', expiryDate: '2026-08-15', usagePercent: 22, usersToday: '120', rating: '4.1', discountValue: 25
  },
  {
    id: 'c28', brand: 'MEALBOX', logo: require('../assets/makemytrip.jpg'), logoBg: 'bg-[#ef4444]', accentColor: '#ef4444', domain: 'mealbox.example', category: 'Food',
    discount: '20% OFF', title: 'Meal Subscription Discount', description: 'Weekly meal plans at lower prices.', code: 'MEAL20', expires: 'Expires 01 Jul 2026', expiryDate: '2026-07-01', usagePercent: 18, usersToday: '90', rating: '4.0', discountValue: 20
  },
  {
    id: 'c29', brand: 'SNACKS', logo: require('../assets/puma.jpg'), logoBg: 'bg-[#f59e0b]', accentColor: '#f59e0b', domain: 'snacks.example', category: 'Food',
    discount: '15% OFF', title: 'Snacks & Beverages Sale', description: 'Discounts across brands.', code: 'SNACK15', expires: 'Expires 20 Oct 2026', expiryDate: '2026-10-20', usagePercent: 14, usersToday: '70', rating: '4.0', discountValue: 15
  },
  {
    id: 'c30', brand: 'DRINKS', logo: require('../assets/boat.jpg'), logoBg: 'bg-[#0ea5a4]', accentColor: '#0ea5a4', domain: 'drinks.example', category: 'Food',
    discount: 'Buy1Get1', title: 'Beverage Buy 1 Get 1', description: 'Limited time freebie offers.', code: 'B1G1DRINK', expires: 'Expires 31 Jul 2026', expiryDate: '2026-07-31', usagePercent: 10, usersToday: '50', rating: '3.9', discountValue: 0
  },

  // Grocery (need 5)
  {
    id: 'c31', brand: 'GROCERYPLUS', logo: require('../assets/jiomart.png'), logoBg: 'bg-[#15803d]', accentColor: '#15803d', domain: 'groceryplus.example', category: 'Grocery',
    discount: '12% OFF', title: 'Everyday Grocery Deals', description: 'Save more on bulk purchases.', code: 'GROC12', expires: 'Expires 30 Sep 2026', expiryDate: '2026-09-30', usagePercent: 21, usersToday: '110', rating: '4.2', discountValue: 12
  },
  {
    id: 'c32', brand: 'FRESHMARKET', logo: require('../assets/jiomart.png'), logoBg: 'bg-[#16a34a]', accentColor: '#16a34a', domain: 'freshmarket.example', category: 'Grocery',
    discount: '₹100 OFF', title: 'Bulk Buy Savings', description: 'Discounts on orders above ₹1000.', code: 'FRESH100', expires: 'Expires 31 Dec 2026', expiryDate: '2026-12-31', usagePercent: 19, usersToday: '90', rating: '4.1', discountValue: 100
  },
  {
    id: 'c33', brand: 'BAZAAR', logo: require('../assets/tatacliq.jpg'), logoBg: 'bg-[#0f172a]', accentColor: '#0f172a', domain: 'bazaar.example', category: 'Grocery',
    discount: '20% OFF', title: 'Grocery Weekend Sale', description: 'Special prices on essentials.', code: 'BAZ20', expires: 'Expires 10 Aug 2026', expiryDate: '2026-08-10', usagePercent: 15, usersToday: '70', rating: '4.0', discountValue: 20
  },
  {
    id: 'c34', brand: 'FRESHDEAL', logo: require('../assets/pharmeasy.jpg'), logoBg: 'bg-[#059669]', accentColor: '#059669', domain: 'freshdeal.example', category: 'Grocery',
    discount: '15% OFF', title: 'Weekly Grocery Deals', description: 'Discounts across categories.', code: 'FRESH15', expires: 'Expires 05 Nov 2026', expiryDate: '2026-11-05', usagePercent: 12, usersToday: '60', rating: '4.0', discountValue: 15
  },

  // Health (need 5)
  {
    id: 'c35', brand: 'MUSCLEBLAZE', logo: require('../assets/muscleblaze.jpg'), logoBg: 'bg-[#b91c1c]', accentColor: '#b91c1c', domain: 'muscleblaze.com', category: 'Health',
    discount: '20% OFF', title: 'Protein & Supplements Sale', description: 'Fitness supplements discounts.', code: 'MB20', expires: 'Expires 30 Sep 2026', expiryDate: '2026-09-30', usagePercent: 24, usersToday: '120', rating: '4.3', discountValue: 20
  },
  {
    id: 'c36', brand: 'HEALTHSTORE', logo: require('../assets/netmeds.jpg'), logoBg: 'bg-[#059669]', accentColor: '#059669', domain: 'healthstore.example', category: 'Health',
    discount: '15% OFF', title: 'Health Essentials Discount', description: 'Vitamins and wellness deals.', code: 'HLTH15', expires: 'Expires 31 Dec 2026', expiryDate: '2026-12-31', usagePercent: 18, usersToday: '85', rating: '4.1', discountValue: 15
  },
  {
    id: 'c37', brand: 'WELLNESS', logo: require('../assets/nykaa.jpg'), logoBg: 'bg-[#ef4444]', accentColor: '#ef4444', domain: 'wellness.example', category: 'Health',
    discount: '10% OFF', title: 'Wellness Products Sale', description: 'Skincare and supplements.', code: 'WELL10', expires: 'Expires 20 Oct 2026', expiryDate: '2026-10-20', usagePercent: 12, usersToday: '60', rating: '4.0', discountValue: 10
  },
  {
    id: 'c38', brand: 'PHARMA', logo: require('../assets/pharmeasy.jpg'), logoBg: 'bg-[#059669]', accentColor: '#059669', domain: 'pharma.example', category: 'Health',
    discount: '₹150 OFF', title: 'Medicine & Care Discounts', description: 'Savings on prescriptions and health kits.', code: 'PHARMA150', expires: 'Expires 01 Dec 2026', expiryDate: '2026-12-01', usagePercent: 9, usersToday: '40', rating: '3.9', discountValue: 150
  },

  // Home (need 5)
  {
    id: 'c39', brand: 'HOMEPLUS', logo: require('../assets/hp-shopping.jpg'), logoBg: 'bg-[#0f172a]', accentColor: '#0f172a', domain: 'homeplus.example', category: 'Home',
    discount: '20% OFF', title: 'Home Appliances Sale', description: 'Kitchen and living discounts.', code: 'HOME20', expires: 'Expires 31 Aug 2026', expiryDate: '2026-08-31', usagePercent: 20, usersToday: '110', rating: '4.2', discountValue: 20
  },
  {
    id: 'c40', brand: 'DECOR', logo: require('../assets/dell.jpg'), logoBg: 'bg-[#0ea5a4]', accentColor: '#0ea5a4', domain: 'decor.example', category: 'Home',
    discount: '30% OFF', title: 'Home Decor Discounts', description: 'Furniture and decor offers.', code: 'DECOR30', expires: 'Expires 15 Nov 2026', expiryDate: '2026-11-15', usagePercent: 14, usersToday: '70', rating: '4.0', discountValue: 30
  },
  {
    id: 'c41', brand: 'KITCHENPRO', logo: require('../assets/croma.jpg'), logoBg: 'bg-[#00b9f5]', accentColor: '#00b9f5', domain: 'kitchenpro.example', category: 'Home',
    discount: '15% OFF', title: 'Kitchen Appliances Offer', description: 'Cookware and small appliances.', code: 'KITCH15', expires: 'Expires 01 Oct 2026', expiryDate: '2026-10-01', usagePercent: 12, usersToday: '60', rating: '4.0', discountValue: 15
  },
  {
    id: 'c42', brand: 'BEDROOM', logo: require('../assets/hp-shopping.jpg'), logoBg: 'bg-[#6b7280]', accentColor: '#6b7280', domain: 'bedroom.example', category: 'Home',
    discount: 'Buy1Get1', title: 'Beds & Linens Offers', description: 'Select items with freebie deals.', code: 'B1G1BED', expires: 'Expires 31 Dec 2026', expiryDate: '2026-12-31', usagePercent: 8, usersToday: '35', rating: '3.8', discountValue: 0
  }
];

// Helper: days until expiry
function daysUntil(dateStr) {
  const now = new Date();
  const exp = new Date(dateStr);
  const diff = Math.ceil((exp - now) / (1000 * 60 * 60 * 24));
  return diff;
}

// Helper: get validity status
function getValidity(dateStr) {
  const days = daysUntil(dateStr);
  if (days < 0) return { label: 'Expired', cls: 'bg-red-50 text-red-500 border-red-100', dot: 'bg-red-400' };
  if (days <= 7) return { label: `Expires in ${days}d`, cls: 'bg-orange-50 text-orange-500 border-orange-100', dot: 'bg-orange-400' };
  return { label: 'Active', cls: 'bg-emerald-50 text-emerald-600 border-emerald-100', dot: 'bg-emerald-400' };
}

// Countdown timer hook
function useCountdown(targetDate) {
  const calculateTime = useCallback(() => {
    const now = new Date();
    const exp = new Date(targetDate + 'T23:59:59');
    const diff = exp - now;
    if (diff <= 0) return null;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  }, [targetDate]);

  const [time, setTime] = useState(calculateTime);

  useEffect(() => {
    const days = daysUntil(targetDate);
    if (days > 7) return; // Only run countdown for expiring soon
    const interval = setInterval(() => setTime(calculateTime()), 1000);
    return () => clearInterval(interval);
  }, [targetDate, calculateTime]);

  return time;
}

// Card sub-component with its own countdown
function CouponCard({ coupon, rank, isBookmarked, onToggleBookmark, onGrab }) {
  const validity = getValidity(coupon.expiryDate);
  const days = daysUntil(coupon.expiryDate);
  const countdown = useCountdown(coupon.expiryDate);
  const isExpiringSoon = days >= 0 && days <= 7;
  const isExpired = days < 0;
  const isTop3 = rank <= 3;
  // Normalize logo to a string URL when possible to avoid runtime errors
  const logoSrc = typeof coupon.logo === 'string'
    ? coupon.logo
    : coupon.logo && (coupon.logo.src || coupon.logo.default || String(coupon.logo)) || '';

  return (
    <div
      onClick={() => !isExpired && onGrab(coupon)}
      className={`bg-[#ffffff] rounded-2xl border flex flex-col items-center text-center p-6 transition-all duration-300 shadow-sm relative group
        ${isExpired ? 'opacity-60 cursor-not-allowed border-[#E2E8F0]' : 'cursor-pointer hover:shadow-md hover:border-[#e75a3e]/30 hover:-translate-y-1 border-[#E2E8F0]'}
      `}
    >
      {/* Most Popular badge */}
      {isTop3 && !isExpired && (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10">
          <div className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border whitespace-nowrap
            ${rank === 1 ? 'bg-amber-400 text-white border-amber-300' : rank === 2 ? 'bg-slate-300 text-slate-700 border-slate-200' : 'bg-orange-300 text-white border-orange-200'}
          `}>
            {rank === 1 ? '🥇 Most Popular' : rank === 2 ? '🥈 Top Deal' : '🥉 Hot Deal'}
          </div>
        </div>
      )}

      {/* Bookmark button */}
      <button
        onClick={(e) => { e.stopPropagation(); onToggleBookmark(coupon.id); }}
        className={`absolute top-3 right-3 p-1.5 rounded-lg transition-all duration-200 z-10
          ${isBookmarked ? 'text-[#e75a3e] bg-[#e75a3e]/10' : 'text-neutral-300 hover:text-[#e75a3e] hover:bg-[#e75a3e]/5'}
        `}
        title={isBookmarked ? 'Remove bookmark' : 'Save coupon'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={isBookmarked ? 0 : 2} className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
        </svg>
      </button>

      {/* Validity status chip */}
      <div className={`absolute top-3 left-3 flex items-center gap-1 text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${validity.cls}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${validity.dot} ${isExpiringSoon && !isExpired ? 'animate-pulse' : ''}`} />
        {validity.label}
      </div>

      {/* Logo */}
      <div className="w-20 h-20 rounded-2xl bg-[#F8FAFC] border border-neutral-100 shadow-sm flex items-center justify-center overflow-hidden p-2 group-hover:shadow-md transition-all duration-300 group-hover:scale-105 mb-4 shrink-0 mt-4">
        {logoSrc ? (
          <>
            <img src={logoSrc} alt={coupon.brand} className="w-full h-full object-contain"
              onError={(e) => {
                if (!e.target.dataset.fallback && coupon.domain) {
                  e.target.dataset.fallback = 'true';
                  e.target.src = `https://logo.clearbit.com/${coupon.domain}`;
                } else {
                  e.target.style.display = 'none';
                  if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                }
              }} />
            <div className={`hidden w-full h-full rounded-lg ${coupon.logoBg} items-center justify-center`}>
              <span className="text-white font-extrabold text-2xl">{coupon.brand.charAt(0)}</span>
            </div>
          </>
        ) : (
          <div className={`w-full h-full rounded-lg ${coupon.logoBg} flex items-center justify-center`}>
            <span className="text-white font-extrabold text-2xl">{coupon.brand.charAt(0)}</span>
          </div>
        )}
      </div>

      {/* Brand & verify */}
      <div className="flex items-center gap-1.5 mb-2">
        <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">{coupon.brand}</span>
        <svg className="w-3 h-3 text-[#3b82f6]" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      </div>

      {/* Discount */}
      <h3 className="text-2xl font-black mb-1.5 leading-tight" style={{ color: coupon.accentColor }}>
        {coupon.discount}
      </h3>
      <p className="text-xs font-semibold text-[#475569] line-clamp-2 w-full px-2 leading-relaxed">
        {coupon.title}
      </p>

      {/* Live countdown — only for expiring soon */}
      {isExpiringSoon && countdown && (
        <div className="mt-3 w-full bg-orange-50 border border-orange-100 rounded-xl px-3 py-2">
          <p className="text-[8px] font-black uppercase tracking-widest text-orange-400 mb-1.5">⏳ Ends in</p>
          <div className="flex items-center justify-center gap-2 text-center">
            {[['d', countdown.days], ['h', countdown.hours], ['m', countdown.minutes], ['s', countdown.seconds]].map(([unit, val]) => (
              <div key={unit} className="flex flex-col items-center">
                <span className="text-sm font-black text-orange-600 leading-none w-7 bg-orange-100 rounded-md py-0.5 tabular-nums">
                  {String(val).padStart(2, '0')}
                </span>
                <span className="text-[7px] text-orange-400 font-bold mt-0.5 uppercase">{unit}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="w-full mt-auto pt-4">
        <div className="w-full border-t border-dashed border-[#E2E8F0] pt-4">
          {isExpired ? (
            <div className="w-full bg-neutral-100 rounded-xl py-3 text-xs font-black text-neutral-400 text-center">
              Expired
            </div>
          ) : (
            <button className="w-full bg-[#F8FAFC] border border-[#E2E8F0] group-hover:bg-[#e75a3e] group-hover:border-[#e75a3e] group-hover:text-white transition-colors duration-300 rounded-xl py-3 flex items-center justify-center gap-2 text-xs font-black text-[#1a1a1a]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
              </svg>
              Unlock with Email
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TopCoupons() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmarked, setShowBookmarked] = useState(false);
  const { openModal } = useCouponModal();

  // Load bookmarks from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('coupon_bookmarks');
      if (saved) setBookmarks(JSON.parse(saved));
    } catch (e) { }
  }, []);

  const toggleBookmark = useCallback((id) => {
    setBookmarks(prev => {
      const next = prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id];
      try { localStorage.setItem('coupon_bookmarks', JSON.stringify(next)); } catch (e) { }
      return next;
    });
  }, []);

  const filteredCoupons = useMemo(() => {
    let list = showBookmarked
      ? INITIAL_COUPONS.filter(c => bookmarks.includes(c.id))
      : activeCategory === 'all'
        ? INITIAL_COUPONS
        : INITIAL_COUPONS.filter(c => c.category.toLowerCase() === activeCategory.toLowerCase());

    if (sortBy === 'popular') list = [...list].sort((a, b) => b.usagePercent - a.usagePercent);
    if (sortBy === 'discount') list = [...list].sort((a, b) => b.discountValue - a.discountValue);
    if (sortBy === 'expiry') list = [...list].sort((a, b) => daysUntil(a.expiryDate) - daysUntil(b.expiryDate));
    return list;
  }, [activeCategory, sortBy, bookmarks, showBookmarked]);

  const handleGrab = (coupon) => openModal(coupon);

  return (
    <section className="w-full bg-[#F8FAFC] px-4 sm:px-6 lg:px-10 py-12 selection:bg-[#e75a3e] selection:text-white border-t border-[#E2E8F0]">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 bg-[#ffffff] text-[#1a1a1a] border border-[#E2E8F0] text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm mb-3">
            <span className="text-[#e75a3e]">🏷️</span>
            Verified &amp; Updated Daily
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1e1e1e] tracking-tight leading-tight">
            Today&apos;s Top <span className="text-[#e75a3e]">Coupons &amp; Offers</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-2 max-w-md mx-auto font-medium leading-relaxed">
            Grab the best deals handpicked by our team. All codes are tested and verified before listing.
          </p>
        </div>

        {/* Controls row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar items-center flex-1">
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id && !showBookmarked;
              return (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); setShowBookmarked(false); }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border cursor-pointer
                    ${isSelected ? 'bg-[#ffffff] text-[#1a1a1a] border-[#e75a3e] shadow-sm' : 'bg-[#ffffff]/60 hover:bg-[#ffffff] text-[#475569] border-[#E2E8F0] hover:text-[#1e1e1e]'}
                  `}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Bookmarks toggle */}
            <button
              onClick={() => setShowBookmarked(v => !v)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer
                ${showBookmarked ? 'bg-[#e75a3e] text-white border-[#e75a3e]' : 'bg-[#ffffff] text-[#475569] border-[#E2E8F0] hover:border-[#e75a3e] hover:text-[#e75a3e]'}
              `}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={showBookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
              </svg>
              Saved {bookmarks.length > 0 && `(${bookmarks.length})`}
            </button>

            {/* Sort dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#ffffff] border border-[#E2E8F0] text-[#475569] rounded-full text-xs font-semibold px-3.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#e75a3e]/20 focus:border-[#e75a3e] transition-all cursor-pointer"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.id} value={opt.id}>{opt.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid */}
        {filteredCoupons.length === 0 ? (
          <div className="text-center py-16 text-[#64748B]">
            <div className="text-4xl mb-3">🔖</div>
            <p className="font-bold text-sm">No saved coupons yet.</p>
            <p className="text-xs mt-1">Click the bookmark icon on any coupon to save it here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-3">
            {filteredCoupons.map((coupon, idx) => (
              <CouponCard
                key={coupon.id}
                coupon={coupon}
                rank={idx + 1}
                isBookmarked={bookmarks.includes(coupon.id)}
                onToggleBookmark={toggleBookmark}
                onGrab={handleGrab}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
