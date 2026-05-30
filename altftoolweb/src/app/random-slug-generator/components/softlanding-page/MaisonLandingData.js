import React from "react";
export const NAV_LINKS = [
  { label: "Story", href: "#story" },
  { label: "Features", href: "#features" },
  { label: "AI Stylist", href: "#ai" },
  { label: "Membership", href: "#membership" },
];

export const FEATURES = [
  { num: "01", icon: (<svg viewBox="0 0 24 24" width="24" height="24" fill="var(--gold)"><polygon points="12,2 15,8 22,9 17,14 18,21 12,18 6,21 7,14 2,9 9,8"/></svg>), title: "Smart Wardrobe", desc: "Digitise your entire closet in seconds. Our AI organises, categorises, and remembers every piece you own." },
  { num: "02", icon: (<svg viewBox="0 0 24 24" width="24" height="24" fill="var(--gold)"><rect x="4" y="4" width="16" height="16" transform="rotate(45 12 12)"/></svg>), title: "Daily Outfits", desc: "Wake up to a curated look tailored to your schedule, weather, and mood. No more decision fatigue." },
  { num: "03", icon: (<svg viewBox="0 0 24 24" width="24" height="24" fill="var(--gold)"><polygon points="12,2 20,7 20,17 12,22 4,17 4,7"/></svg>), title: "Trend Radar", desc: "Stay ahead with real-time fashion intelligence sourced from global runways and editorial houses." },
  { num: "05", icon: (<svg viewBox="0 0 24 24" width="24" height="24" fill="var(--gold)"><polygon points="12,2 22,12 12,22 2,12"/></svg>), title: "Luxury Edit", desc: "Discover curated pieces from 200+ premium brands, personalised entirely to your aesthetic DNA." }
];

export const OUTFITS = [
  { image: "/images/margaux_coat.png", brand: "The Row", name: "Margaux Coat", price: "₹82,000", color: "#e0d8cc" },
  { image: "/images/robe_linen.png", brand: "Jacquemus", name: "La Robe Linen", price: "₹45,000", color: "#d8d0c4" },
  { image: "/images/strappy_heels.png", brand: "Bottega Veneta", name: "Strappy Heels", price: "₹68,000", color: "#ccc4b8" },
  { image: "/images/puzzle_bag.png", brand: "Loewe", name: "Puzzle Bag", price: "₹1,20,000", color: "#d4ccc0" },
  { image: "/images/classy_dress_mockup.png", brand: "Aimé Leon Dore", name: "Silk Slip Dress", price: "₹38,000", color: "#dcd4c8" },
  { image: "/images/luxury_fashion_brand.png", brand: "Toteme", name: "Cashmere Scarf", price: "₹22,000", color: "#e4dcd0" },
];

export const GALLERY_ITEMS = [
  { minH: 460, emoji: "🧥", colors: [["#e8ddd0","#d8cdc0"],["#c8bfb0","#dfd8cc"]], tag: "SS 2025 Collection", span: true },
  { minH: 220, emoji: "👠", bg: "linear-gradient(135deg,#e0d8cc,#ccc3b5)", tag: "Accessories Edit" },
  { minH: 220, emoji: "👜", bg: "linear-gradient(135deg,#d8d0c5,#e8e0d5)", tag: "Luxury Capsule" },
  { minH: 220, emoji: "🌿", bg: "linear-gradient(135deg,#c8c0b5,#ddd5c8)", tag: "Sustainable Luxury" },
  { minH: 220, emoji: "✨", bg: "linear-gradient(135deg,#e0d8cd,#d0c8bd)", tag: "Evening Looks" },
];

export const TESTIMONIALS = [
  { initial: "S", name: "Sofia Marchetti", handle: "Creative Director, Milan", quote: "MAISON completely changed how I approach getting dressed. It's like having a best friend who happens to be a fashion editor." },
  { initial: "L", name: "Léa Fontaine", handle: "Art Director, Paris", quote: "The AI stylist is genuinely uncanny. It suggested a combination I never would have thought of, and now it's my signature look." },
  { initial: "A", name: "Amara Osei", handle: "Architect, London", quote: "I've rediscovered pieces I forgot I owned. My wardrobe feels completely new without buying a single thing. Remarkable." },
];

export const PLANS = [
  {
    tier: "Essential", price: "Free", period: "/ forever", featured: false,
    features: ["Smart wardrobe up to 50 items","Daily outfit suggestions","Basic AI styling (5/mo)","Weather-based looks","Community style feed"],
    btnLabel: "Get Started", gold: false,
  },
  {
    tier: "Atelier", price: "₹599", period: "/ mo", featured: true, badge: "Most Popular",
    features: ["Unlimited wardrobe items","Unlimited AI styling sessions","Priority trend intelligence","Occasion-specific curation","Shopping recommendations","Early access to new features"],
    btnLabel: "Begin Atelier", gold: true,
  },
  {
    tier: "Maison Privé", price: "₹1,499", period: "/ mo", featured: false,
    features: ["Everything in Atelier","Human stylist consultations","Runway analysis reports","Personal shopping concierge","Brand partnership access","Bi-annual wardrobe audit","VIP customer support"],
    btnLabel: "Join Privé", gold: false,
  },
];

export const CHIPS = ["Business Dinner","Beach Weekend","Gallery Opening","Date Night","Minimalist","Parisian Chic"];

export const STACK_CARDS = [
  { img: "/images/fashion_hero_1.png", brand: "MAISON", tag: "SS 2025 · Paris" },
  { img: "/images/fashion_hero_5.png", brand: "HERMÈS", tag: "Cruise · Monaco" },
  { img: "/images/fashion_hero_2.png", brand: "BURBERRY", tag: "FW 2025 · London" },
  { img: "/images/fashion_hero_4.png", brand: "VALENTINO", tag: "RTW 2025 · Rome" },
  { img: "/images/fashion_hero_3.png", brand: "CHANEL", tag: "Haute Couture · Milan" },
];