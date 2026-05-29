import { useState, useEffect, useRef, useMemo } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Story", href: "#story" },
  { label: "Features", href: "#features" },
  { label: "AI Stylist", href: "#ai" },
  { label: "Membership", href: "#membership" },
];

const FEATURES = [
  { num: "01", icon: (<svg viewBox="0 0 24 24" width="24" height="24" fill="var(--gold)"><polygon points="12,2 15,8 22,9 17,14 18,21 12,18 6,21 7,14 2,9 9,8"/></svg>), title: "Smart Wardrobe", desc: "Digitise your entire closet in seconds. Our AI organises, categorises, and remembers every piece you own." },
  { num: "02", icon: (<svg viewBox="0 0 24 24" width="24" height="24" fill="var(--gold)"><rect x="4" y="4" width="16" height="16" transform="rotate(45 12 12)"/></svg>), title: "Daily Outfits", desc: "Wake up to a curated look tailored to your schedule, weather, and mood. No more decision fatigue." },
  { num: "03", icon: (<svg viewBox="0 0 24 24" width="24" height="24" fill="var(--gold)"><polygon points="12,2 20,7 20,17 12,22 4,17 4,7"/></svg>), title: "Trend Radar", desc: "Stay ahead with real-time fashion intelligence sourced from global runways and editorial houses." },
  { num: "05", icon: (<svg viewBox="0 0 24 24" width="24" height="24" fill="var(--gold)"><polygon points="12,2 22,12 12,22 2,12"/></svg>), title: "Luxury Edit", desc: "Discover curated pieces from 200+ premium brands, personalised entirely to your aesthetic DNA." }
];

const OUTFITS = [
  { image: "/images/margaux_coat.png", brand: "The Row", name: "Margaux Coat", price: "₹82,000", color: "#e0d8cc" },
  { image: "/images/robe_linen.png", brand: "Jacquemus", name: "La Robe Linen", price: "₹45,000", color: "#d8d0c4" },
  { image: "/images/strappy_heels.png", brand: "Bottega Veneta", name: "Strappy Heels", price: "₹68,000", color: "#ccc4b8" },
  { image: "/images/puzzle_bag.png", brand: "Loewe", name: "Puzzle Bag", price: "₹1,20,000", color: "#d4ccc0" },
  { image: "/images/classy_dress_mockup.png", brand: "Aimé Leon Dore", name: "Silk Slip Dress", price: "₹38,000", color: "#dcd4c8" },
  { image: "/images/luxury_fashion_brand.png", brand: "Toteme", name: "Cashmere Scarf", price: "₹22,000", color: "#e4dcd0" },
];

const GALLERY_ITEMS = [
  { minH: 460, emoji: "🧥", colors: [["#e8ddd0","#d8cdc0"],["#c8bfb0","#dfd8cc"]], tag: "SS 2025 Collection", span: true },
  { minH: 220, emoji: "👠", bg: "linear-gradient(135deg,#e0d8cc,#ccc3b5)", tag: "Accessories Edit" },
  { minH: 220, emoji: "👜", bg: "linear-gradient(135deg,#d8d0c5,#e8e0d5)", tag: "Luxury Capsule" },
  { minH: 220, emoji: "🌿", bg: "linear-gradient(135deg,#c8c0b5,#ddd5c8)", tag: "Sustainable Luxury" },
  { minH: 220, emoji: "✨", bg: "linear-gradient(135deg,#e0d8cd,#d0c8bd)", tag: "Evening Looks" },
];

const TESTIMONIALS = [
  { initial: "S", name: "Sofia Marchetti", handle: "Creative Director, Milan", quote: "MAISON completely changed how I approach getting dressed. It's like having a best friend who happens to be a fashion editor." },
  { initial: "L", name: "Léa Fontaine", handle: "Art Director, Paris", quote: "The AI stylist is genuinely uncanny. It suggested a combination I never would have thought of, and now it's my signature look." },
  { initial: "A", name: "Amara Osei", handle: "Architect, London", quote: "I've rediscovered pieces I forgot I owned. My wardrobe feels completely new without buying a single thing. Remarkable." },
];

const PLANS = [
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

const CHIPS = ["Business Dinner","Beach Weekend","Gallery Opening","Date Night","Minimalist","Parisian Chic"];

const STACK_CARDS = [
  { img: "/images/fashion_hero_1.png", brand: "MAISON", tag: "SS 2025 · Paris" },
  { img: "/images/fashion_hero_5.png", brand: "HERMÈS", tag: "Cruise · Monaco" },
  { img: "/images/fashion_hero_2.png", brand: "BURBERRY", tag: "FW 2025 · London" },
  { img: "/images/fashion_hero_4.png", brand: "VALENTINO", tag: "RTW 2025 · Rome" },
  { img: "/images/fashion_hero_3.png", brand: "CHANEL", tag: "Haute Couture · Milan" },
];

// ─── GLOBAL CSS ───────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@200;300;400;500&family=Playfair+Display:ital,wght@0,400;1,400&display=swap');

:root {
  --white:#ffffff;--warm-white:#f8f8f6;--cream:#f4efe8;--beige:#ede8df;--sand:#d9d0c0;
  --gold:#c9a96e;--gold-light:#e8d5b0;--silver:#b8b8b8;
  --text-dark:#1a1815;--text-mid:#4a4540;--text-light:#8a8480;
  --glass:rgba(255,255,255,0.55);--glass-border:rgba(255,255,255,0.7);
  --glass-shadow:rgba(180,160,130,0.15);
  --ff-display:'Cormorant Garamond',Georgia,serif;
  --ff-body:'DM Sans',sans-serif;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
.maison-wrapper{font-family:var(--ff-body);background:var(--warm-white);color:var(--text-dark);overflow-x:hidden;cursor:none;width:100%;position:relative;}
.maison-wrapper::before{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");pointer-events:none;z-index:9000;opacity:0.5;}

/* cursor */
.cursor{width:10px;height:10px;background:var(--gold);border-radius:50%;position:fixed;top:0;left:0;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:width .3s,height .3s,background .3s,opacity .3s;opacity:0;}
.cursor-ring{width:38px;height:38px;border:1px solid var(--gold);border-radius:50%;position:fixed;top:0;left:0;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:width .3s,height .3s,opacity .3s;opacity:0;}
.cursor.hover{width:18px;height:18px;}
.cursor-ring.hover{width:60px;height:60px;opacity:0.3;}

/* nav */
.m-nav{position:sticky;top:0;left:0;right:0;z-index:1000;padding:24px 52px;display:flex;align-items:center;justify-content:space-between;background:rgba(201, 169, 110, 0.92);backdrop-filter:blur(20px) saturate(180%);-webkit-backdrop-filter:blur(20px) saturate(180%);border-bottom:1px solid rgba(255,255,255,0.2);transition:padding .4s ease;}
.m-nav.scrolled{padding:16px 52px;}
.nav-logo{font-family:var(--ff-display);font-size:22px;font-weight:400;letter-spacing:.25em;color:var(--white);text-decoration:none;}
.nav-links{display:flex;gap:40px;list-style:none;}
.nav-links a{font-size:12px;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,0.9);text-decoration:none;transition:color .3s;}
.nav-links a:hover{color:var(--text-dark);}
.nav-cta{font-size:12px;letter-spacing:.12em;text-transform:uppercase;padding:10px 24px;background:var(--text-dark);color:white;border:none;border-radius:40px;cursor:none;text-decoration:none;transition:background .3s,transform .2s;font-family:var(--ff-body);}
.nav-cta:hover{background:var(--white);color:var(--text-dark);transform:scale(1.03);}

/* ── HERO — Valora-style asymmetric layout ─────────────────────── */
#hero{
  height:100vh;min-height:700px;
  background:linear-gradient(160deg,#141210 0%,#1e1a14 50%,#161310 100%);
  position:relative;overflow:hidden;
  display:flex;align-items:stretch;
}

/* subtle noise texture */
#hero::before{
  content:'';
  position:absolute;inset:0;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
  pointer-events:none;z-index:0;
}

/* left panel */
.hero-left{
  flex:0 0 48%;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:100px 60px 80px 72px;
  position:relative;z-index:10;
  animation:fadeUp 1.1s cubic-bezier(.16,1,.3,1) .2s both;
}
@keyframes fadeUp{from{opacity:0;transform:translateY(36px)}to{opacity:1;transform:translateY(0)}}

.hero-eyebrow{
  display:inline-flex;align-items:center;gap:10px;
  font-size:10px;letter-spacing:.3em;text-transform:uppercase;
  color:var(--gold);font-weight:400;margin-bottom:32px;
}
.hero-eyebrow-dot{width:5px;height:5px;border-radius:50%;background:var(--gold);display:inline-block;}

h1.hero-title{
  font-family:var(--ff-display);
  font-size:clamp(50px,5.5vw,90px);
  font-weight:300;line-height:1.05;
  color:#f4efe8;
  letter-spacing:-.02em;
  margin:0 0 28px;
  text-align:left;
}
h1.hero-title em{font-style:italic;color:var(--gold-light);}

.hero-subtitle{
  font-size:14px;color:rgba(220,210,195,0.65);
  font-weight:300;letter-spacing:.03em;line-height:1.85;
  max-width:360px;margin-bottom:44px;text-align:left;
}

.hero-ctas{display:flex;gap:14px;align-items:center;flex-wrap:wrap;margin-bottom:60px;}

.btn-primary{
  padding:14px 34px;
  background:var(--gold);color:white;border:none;
  border-radius:50px;font-family:var(--ff-body);
  font-size:11px;letter-spacing:.14em;text-transform:uppercase;
  cursor:none;text-decoration:none;
  transition:all .35s cubic-bezier(.16,1,.3,1);
  position:relative;overflow:hidden;
  box-shadow:0 8px 32px rgba(201,169,110,0.35);
}
.btn-primary::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.18),transparent);opacity:0;transition:opacity .3s;}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 16px 48px rgba(201,169,110,0.5);}
.btn-primary:hover::after{opacity:1;}

.btn-ghost{
  padding:14px 34px;
  background:rgba(255,255,255,0.06);color:rgba(220,210,195,0.85);
  border:1px solid rgba(201,169,110,0.35);
  border-radius:50px;font-family:var(--ff-body);
  font-size:11px;letter-spacing:.14em;text-transform:uppercase;
  cursor:none;text-decoration:none;
  transition:all .35s cubic-bezier(.16,1,.3,1);
  backdrop-filter:blur(10px);
}
.btn-ghost:hover{border-color:var(--gold-light);color:var(--gold-light);transform:translateY(-2px);background:rgba(201,169,110,0.1);}

/* thumbnail strip at bottom of left panel */
.hero-thumbs{
  display:flex;align-items:center;gap:10px;
}
.hero-thumb{
  width:52px;height:52px;border-radius:50%;
  overflow:hidden;border:2px solid rgba(201,169,110,0.35);
  transition:transform .3s,border-color .3s;
  cursor:none;
}
.hero-thumb:hover{transform:scale(1.08);border-color:var(--gold);}
.hero-thumb img{width:100%;height:100%;object-fit:cover;}
.hero-thumb-more{
  font-size:11px;color:rgba(201,169,110,0.7);
  letter-spacing:.08em;margin-left:6px;
  white-space:nowrap;
}

/* right panel — tall image card */
.hero-right{
  flex:1;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:40px 52px 40px 24px;
  position:relative;z-index:10;
  animation:slideIn 1.2s cubic-bezier(.16,1,.3,1) .4s both;
}
@keyframes slideIn{from{opacity:0;transform:translateX(60px)}to{opacity:1;transform:translateX(0)}}

.hero-main-card{
  position:relative;
  width:100%;height:calc(100vh - 80px);
  max-height:820px;
  border-radius:32px;
  overflow:hidden;
  box-shadow:0 40px 100px rgba(0,0,0,0.55),0 0 0 1px rgba(201,169,110,0.15);
}
.hero-main-card img{
  width:100%;height:100%;object-fit:cover;
  animation:kenBurns 14s ease-in-out infinite alternate;
}
@keyframes kenBurns{0%{transform:scale(1.04) translate(0,0)}100%{transform:scale(1.1) translate(-1.5%,-1%)}}

/* card overlay gradient */
.hero-main-card::after{
  content:'';
  position:absolute;inset:0;
  background:linear-gradient(to top,rgba(15,12,8,0.65) 0%,rgba(15,12,8,0.1) 45%,transparent 70%);
  z-index:1;
}

/* floating tag at top of card */
.hero-card-tag{
  position:absolute;top:24px;left:24px;z-index:3;
  background:rgba(255,255,255,0.12);
  backdrop-filter:blur(16px);
  -webkit-backdrop-filter:blur(16px);
  border:1px solid rgba(255,255,255,0.2);
  border-radius:50px;
  padding:7px 16px;
  font-size:10px;letter-spacing:.15em;text-transform:uppercase;
  color:rgba(255,255,255,0.9);
  display:flex;align-items:center;gap:7px;
}
.hero-card-tag-dot{width:6px;height:6px;border-radius:50%;background:#7ecf7e;animation:blink 2s infinite;}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}

/* floating glass info card at bottom */
.hero-card-info{
  position:absolute;bottom:24px;left:24px;right:24px;z-index:3;
  background:rgba(255,255,255,0.1);
  backdrop-filter:blur(24px);
  -webkit-backdrop-filter:blur(24px);
  border:1px solid rgba(255,255,255,0.18);
  border-radius:20px;
  padding:18px 22px;
  display:flex;align-items:center;justify-content:space-between;
}
.hero-card-info-brand{
  font-family:var(--ff-display);
  font-size:18px;font-weight:300;
  color:white;letter-spacing:.05em;
}
.hero-card-info-sub{
  font-size:11px;color:rgba(255,255,255,0.55);
  letter-spacing:.1em;margin-top:3px;
}
.hero-card-info-badge{
  font-size:10px;letter-spacing:.1em;text-transform:uppercase;
  background:var(--gold);color:white;
  padding:6px 14px;border-radius:50px;
}

/* scroll hint */
.scroll-hint{
  position:absolute;bottom:36px;left:72px;
  display:flex;flex-direction:column;align-items:center;gap:8px;
  z-index:20;animation:fadeUp 1s 1.6s both;
}
.scroll-hint span{font-size:9px;letter-spacing:.25em;text-transform:uppercase;color:rgba(201,169,110,0.5);}
.scroll-line{width:1px;height:44px;background:linear-gradient(to bottom,var(--gold),transparent);animation:scrollPulse 2s ease-in-out infinite;}
@keyframes scrollPulse{0%,100%{opacity:.3;transform:scaleY(1)}50%{opacity:.7;transform:scaleY(1.1)}}

/* particles */
.particles{position:absolute;inset:0;z-index:2;pointer-events:none;}
.particle{position:absolute;border-radius:50%;background:var(--gold);opacity:0;animation:particleFloat linear infinite;}
@keyframes particleFloat{0%{opacity:0;transform:translateY(0) scale(0)}10%{opacity:0.5}90%{opacity:0.2}100%{opacity:0;transform:translateY(-120px) scale(0.5)}}

/* ── 3D Card Stack ──────────────────────────────────────────────── */
.hero-stack-scene{
  width:100%;height:100%;
  display:flex;align-items:center;justify-content:center;
  position:relative;
}
.hcard{
  position:absolute;
  width:268px;height:476px;
  border-radius:26px;
  overflow:hidden;
  transition:transform .95s cubic-bezier(.4,0,.2,1),opacity .95s cubic-bezier(.4,0,.2,1),box-shadow .95s ease;
  cursor:none;
  will-change:transform,opacity;
}
.hcard img{width:100%;height:100%;object-fit:cover;}
.hcard-overlay{
  position:absolute;inset:0;
  background:linear-gradient(to top,rgba(10,8,5,.78) 0%,rgba(10,8,5,.12) 50%,transparent 80%);
  z-index:1;
}
.hcard-label{position:absolute;bottom:0;left:0;right:0;padding:22px 20px;z-index:2;}
.hcard-brand{
  font-family:var(--ff-display);
  font-size:21px;font-weight:300;
  color:#fff;letter-spacing:.1em;margin-bottom:5px;
}
.hcard-tag{
  font-size:10px;letter-spacing:.18em;text-transform:uppercase;
  color:rgba(201,169,110,.85);
}
.hcard-top-tag{
  position:absolute;top:18px;left:18px;z-index:2;
  background:rgba(255,255,255,.12);backdrop-filter:blur(14px);
  -webkit-backdrop-filter:blur(14px);
  border:1px solid rgba(255,255,255,.18);border-radius:50px;
  padding:5px 13px;font-size:9px;letter-spacing:.15em;
  text-transform:uppercase;color:rgba(255,255,255,.88);
  display:flex;align-items:center;gap:6px;
}
.hcard-live{width:5px;height:5px;border-radius:50%;background:#7ecf7e;animation:blink 2s infinite;}
/* Card position states */
.hcard[data-pos="front"]{
  transform:perspective(1400px) rotateY(0deg) translateX(0) translateZ(0);
  opacity:1;z-index:4;
  box-shadow:0 40px 100px rgba(0,0,0,.6),0 0 0 1px rgba(201,169,110,.22);
}
.hcard[data-pos="left-near"]{
  transform:perspective(1400px) rotateY(-68deg) translateX(-215px) translateZ(-55px) scale(.88);
  opacity:.52;z-index:3;
  box-shadow:0 20px 60px rgba(0,0,0,.35);
}
.hcard[data-pos="left-far"]{
  transform:perspective(1400px) rotateY(-80deg) translateX(-285px) translateZ(-105px) scale(.74);
  opacity:.22;z-index:2;
}
.hcard[data-pos="bottom"]{
  transform:perspective(1400px) rotateY(0deg) translateX(0) translateY(140%) translateZ(-280px);
  opacity:0;z-index:1;
}
.hcard[data-pos="hidden"]{
  transform:perspective(1400px) rotateY(-85deg) translateX(-320px) translateZ(-160px) scale(.6);
  opacity:0;z-index:0;
}

/* responsive stack */
@media(max-width:900px){
  .hcard{width:200px;height:355px;}
  .hcard[data-pos="left-near"]{transform:perspective(1000px) rotateY(-68deg) translateX(-150px) translateZ(-40px) scale(.88);}
  .hcard[data-pos="left-far"]{transform:perspective(1000px) rotateY(-80deg) translateX(-200px) translateZ(-75px) scale(.74);}
}

/* section base */
section{position:relative;}
.section-inner{max-width:1200px;margin:0 auto;padding:120px 52px;}
.section-eyebrow{font-size:10px;letter-spacing:.35em;text-transform:uppercase;color:var(--gold);font-weight:400;margin-bottom:20px;}
.section-title{font-family:var(--ff-display);font-size:clamp(36px,5vw,72px);font-weight:300;line-height:1.1;color:var(--text-dark);letter-spacing:-.01em;}
.section-title em{font-style:italic;color:var(--text-mid);}
.section-body{font-size:15px;color:var(--text-light);line-height:1.9;font-weight:300;max-width:480px;margin-top:24px;}

/* reveal */
.reveal{opacity:0;transform:translateY(30px);transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1);}
.reveal.visible{opacity:1;transform:translateY(0);}
.reveal-delay-1{transition-delay:.1s;}
.reveal-delay-2{transition-delay:.2s;}
.reveal-delay-3{transition-delay:.3s;}
.reveal-delay-4{transition-delay:.4s;}
.reveal-delay-5{transition-delay:.5s;}

/* story */
#story{background:var(--white);}
.story-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;}
.story-visual{position:relative;aspect-ratio:4/5;border-radius:28px;overflow:hidden;}
.story-visual-bg{position:absolute;inset:0;background:linear-gradient(145deg,#ede8e0 0%,#d8cfc0 50%,#e8e0d4 100%);}
.story-visual-card{position:absolute;bottom:24px;left:24px;right:24px;background:rgba(255,255,255,.7);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.9);border-radius:20px;padding:20px 24px;}
.story-stat{font-family:var(--ff-display);font-size:42px;font-weight:300;color:var(--text-dark);}
.story-stat-label{font-size:12px;color:var(--text-light);letter-spacing:.1em;margin-top:4px;}
.fabric-lines{position:absolute;inset:0;overflow:hidden;opacity:.15;}
.fabric-line{position:absolute;left:0;right:0;height:1px;background:var(--sand);animation:fabricWave linear infinite;}
@keyframes fabricWave{0%{transform:skewX(0deg) translateY(0)}50%{transform:skewX(3deg) translateY(2px)}100%{transform:skewX(0deg) translateY(0)}}
.story-deco{position:absolute;top:-20px;right:-10px;font-family:var(--ff-display);font-size:200px;font-weight:300;color:var(--beige);line-height:1;pointer-events:none;user-select:none;opacity:.5;}
.story-divider{width:40px;height:1px;background:var(--gold);margin:32px 0;}
.story-quote{font-family:var(--ff-display);font-size:22px;font-style:italic;color:var(--text-mid);line-height:1.6;font-weight:300;border-left:2px solid var(--gold-light);padding-left:20px;margin-top:32px;}

/* features */
#features{background:var(--warm-white);}
.features-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:60px;}
.feature-card{background:var(--glass);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid var(--glass-border);border-radius:24px;padding:40px 32px;transition:transform .4s cubic-bezier(.16,1,.3,1),box-shadow .4s;position:relative;overflow:hidden;}
.feature-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.5) 0%,transparent 60%);pointer-events:none;}
.feature-card:hover{transform:translateY(-8px);box-shadow:0 30px 60px rgba(150,130,100,.12);}
.feature-card.large{grid-column:span 2;display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center;}
.feature-icon{width:48px;height:48px;border-radius:14px;background:linear-gradient(135deg,var(--beige),var(--sand));display:flex;align-items:center;justify-content:center;margin-bottom:24px;font-size:22px;}
.feature-num{font-family:var(--ff-display);font-size:11px;color:var(--gold);letter-spacing:.2em;margin-bottom:16px;}
.feature-title{font-family:var(--ff-display);font-size:26px;font-weight:400;color:var(--text-dark);line-height:1.2;margin-bottom:14px;}
.feature-desc{font-size:14px;color:var(--text-light);line-height:1.8;font-weight:300;}
.feature-visual{aspect-ratio:1;border-radius:16px;background:linear-gradient(135deg,var(--beige) 0%,var(--sand) 100%);position:relative;overflow:hidden;}
.ai-dots{position:absolute;inset:0;display:grid;grid-template-columns:repeat(8,1fr);gap:12px;padding:20px;}
.ai-dot{width:6px;height:6px;border-radius:50%;background:var(--gold);animation:pulseDot ease-in-out infinite;}
@keyframes pulseDot{0%,100%{opacity:.2;transform:scale(.8)}50%{opacity:.8;transform:scale(1.2)}}

/* AI section */
#ai{background:linear-gradient(160deg,var(--cream) 0%,var(--warm-white) 100%);}
.ai-layout{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;}
.ai-chat{background:var(--glass);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid var(--glass-border);border-radius:28px;padding:32px;box-shadow:0 20px 60px rgba(150,130,100,.1);}
.ai-chat-header{display:flex;align-items:center;gap:12px;margin-bottom:28px;padding-bottom:20px;border-bottom:1px solid rgba(200,185,160,.2);}
.ai-avatar{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--sand));display:flex;align-items:center;justify-content:center;font-size:14px;color:white;}
.ai-name{font-size:14px;font-weight:500;color:var(--text-dark);}
.ai-status{font-size:11px;color:var(--gold);letter-spacing:.05em;}
.ai-status-dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:#7cb87c;margin-right:5px;animation:blink 2s ease-in-out infinite;}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
.chat-bubble{padding:14px 18px;border-radius:18px;margin-bottom:12px;font-size:13px;line-height:1.6;animation:bubblePop .4s cubic-bezier(.16,1,.3,1) both;}
@keyframes bubblePop{from{opacity:0;transform:scale(.9) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}
.chat-user{background:var(--text-dark);color:white;border-radius:18px 18px 4px 18px;margin-left:20%;}
.chat-ai{background:rgba(255,255,255,.85);color:var(--text-dark);border-radius:18px 18px 18px 4px;margin-right:20%;border:1px solid rgba(200,185,160,.3);}
.chat-typing{display:flex;gap:4px;padding:14px 18px;background:rgba(255,255,255,.85);border-radius:18px 18px 18px 4px;width:fit-content;margin-right:20%;border:1px solid rgba(200,185,160,.3);}
.typing-dot{width:6px;height:6px;border-radius:50%;background:var(--gold);animation:tBounce 1.4s ease-in-out infinite;}
.typing-dot:nth-child(2){animation-delay:.2s;}
.typing-dot:nth-child(3){animation-delay:.4s;}
@keyframes tBounce{0%,100%{transform:translateY(0);opacity:.4}50%{transform:translateY(-5px);opacity:1}}
.outfit-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px;}
.outfit-chip{padding:6px 14px;background:linear-gradient(135deg,rgba(201,169,110,.12),rgba(217,208,192,.2));border:1px solid rgba(201,169,110,.3);border-radius:20px;font-size:12px;color:var(--text-mid);letter-spacing:.04em;cursor:none;transition:all .3s;}
.outfit-chip:hover{background:var(--gold);color:white;border-color:var(--gold);}

/* carousel */
#carousel-section{background:var(--white);overflow:hidden;}
.carousel-wrapper{overflow:hidden;margin-top:60px;position:relative;}
.carousel-track{display:flex;gap:24px;animation:carouselScroll 30s linear infinite;width:max-content;}
.carousel-track:hover{animation-play-state:paused;}
@keyframes carouselScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.outfit-card{flex-shrink:0;width:280px;background:var(--glass);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid var(--glass-border);border-radius:24px;overflow:hidden;transition:transform .4s cubic-bezier(.16,1,.3,1);cursor:none;}
.outfit-card:hover{transform:scale(1.03);}
.outfit-img{width:100%;height:320px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;font-size:60px;}
.outfit-meta{padding:20px 22px;}
.outfit-brand{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:6px;}
.outfit-name{font-family:var(--ff-display);font-size:20px;font-weight:400;color:var(--text-dark);margin-bottom:8px;}
.outfit-price{font-size:14px;color:var(--text-mid);font-weight:300;}
.outfit-save{width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.8);border:1px solid rgba(200,185,160,.3);display:flex;align-items:center;justify-content:center;font-size:14px;float:right;margin-top:-8px;cursor:none;transition:all .3s;}
.outfit-save:hover{background:var(--gold);}

/* ux */
#ux{background:var(--warm-white);}
.ux-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;margin-top:60px;}
.ux-stat-card{background:var(--glass);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid var(--glass-border);border-radius:24px;padding:36px 32px;transition:transform .4s;}
.ux-stat-card:hover{transform:translateY(-6px);}
.ux-stat-card.wide{grid-column:span 2;display:flex;gap:48px;align-items:center;}
.ux-num{font-family:var(--ff-display);font-size:56px;font-weight:300;color:var(--text-dark);line-height:1;}
.ux-unit{font-family:var(--ff-display);font-size:28px;color:var(--gold);}
.ux-label{font-size:13px;color:var(--text-light);letter-spacing:.05em;margin-top:8px;line-height:1.5;}
.ux-divider{width:1px;background:rgba(200,185,160,.2);align-self:stretch;}
.ux-visual{background:linear-gradient(135deg,var(--beige),var(--sand));border-radius:20px;overflow:hidden;position:relative;aspect-ratio:16/9;grid-column:span 3;}
.ux-visual-inner{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;}

/* gallery */
#gallery{background:var(--cream);}
.gallery-grid{display:grid;grid-template-columns:2fr 1fr 1fr;grid-template-rows:auto auto;gap:20px;margin-top:60px;}
.gallery-item{border-radius:20px;overflow:hidden;position:relative;background:linear-gradient(135deg,var(--beige),var(--sand));cursor:none;}
.gallery-item:first-child{grid-row:span 2;}
.gallery-item-inner{width:100%;height:100%;min-height:200px;position:relative;}
.gallery-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(30,25,20,.3) 0%,transparent 60%);display:flex;align-items:flex-end;padding:20px;opacity:0;transition:opacity .4s;}
.gallery-item:hover .gallery-overlay{opacity:1;}
.gallery-tag{font-size:10px;letter-spacing:.2em;text-transform:uppercase;background:rgba(255,255,255,.85);color:var(--text-dark);padding:6px 12px;border-radius:20px;}
.gallery-play{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:50px;height:50px;border-radius:50%;background:rgba(255,255,255,.7);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;font-size:18px;transition:all .3s;}
.gallery-item:hover .gallery-play{background:var(--gold);color:white;transform:translate(-50%,-50%) scale(1.1);}
.swatch-grid{position:absolute;bottom:0;left:0;right:0;top:0;display:flex;flex-direction:column;}
.swatch-row{flex:1;display:flex;}
.swatch-cell{flex:1;}

/* testimonials */
#testimonials{background:var(--white);}
.testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:60px;}
.testi-card{background:var(--glass);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid var(--glass-border);border-radius:24px;padding:36px 32px;transition:transform .4s;}
.testi-card:hover{transform:translateY(-6px);}
.testi-stars{color:var(--gold);font-size:14px;letter-spacing:2px;margin-bottom:20px;}
.testi-quote{font-family:var(--ff-display);font-size:18px;font-style:italic;color:var(--text-dark);line-height:1.7;font-weight:300;margin-bottom:24px;}
.testi-author{display:flex;align-items:center;gap:12px;}
.testi-avatar{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--beige),var(--sand));border:2px solid rgba(200,185,160,.4);display:flex;align-items:center;justify-content:center;font-family:var(--ff-display);font-size:16px;color:var(--text-mid);font-style:italic;}
.testi-name{font-size:13px;font-weight:500;color:var(--text-dark);}
.testi-handle{font-size:11px;color:var(--text-light);margin-top:2px;}

/* membership */
#membership{background:linear-gradient(160deg,var(--text-dark) 0%,#2a2318 100%);}
.membership-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:60px;}
.mem-card{border-radius:24px;padding:40px 32px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.04);transition:all .4s;position:relative;overflow:hidden;}
.mem-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(201,169,110,.4),transparent);}
.mem-card.featured{background:rgba(201,169,110,.08);border-color:rgba(201,169,110,.25);}
.mem-card:hover{transform:translateY(-6px);border-color:rgba(201,169,110,.3);}
.mem-tier{font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin-bottom:24px;}
.mem-price{font-family:var(--ff-display);font-size:52px;font-weight:300;color:white;line-height:1;}
.mem-period{font-size:14px;color:rgba(255,255,255,.4);margin-left:4px;}
.mem-divider{height:1px;background:rgba(255,255,255,.06);margin:28px 0;}
.mem-features{list-style:none;display:flex;flex-direction:column;gap:12px;}
.mem-features li{font-size:13px;color:rgba(255,255,255,.6);display:flex;gap:10px;align-items:flex-start;}
.mem-features li::before{content:'—';color:var(--gold);flex-shrink:0;}
.mem-btn{display:block;width:100%;margin-top:32px;padding:14px;border-radius:50px;text-align:center;font-family:var(--ff-body);font-size:12px;letter-spacing:.14em;text-transform:uppercase;cursor:none;text-decoration:none;transition:all .35s;border:1px solid rgba(255,255,255,.2);color:rgba(255,255,255,.7);background:transparent;}
.mem-btn.gold{background:var(--gold);color:white;border-color:var(--gold);}
.mem-btn:hover{background:white;color:var(--text-dark);border-color:white;}
.mem-badge{position:absolute;top:20px;right:20px;font-size:10px;letter-spacing:.1em;text-transform:uppercase;background:var(--gold);color:white;padding:4px 10px;border-radius:20px;}

/* CTA */
#cta{background:var(--cream);text-align:center;}
#cta .section-inner{padding:160px 52px;}
.cta-title{font-family:var(--ff-display);font-size:clamp(42px,7vw,90px);font-weight:300;line-height:1;color:var(--text-dark);margin-bottom:32px;letter-spacing:-.02em;}
.cta-title em{font-style:italic;color:var(--gold);}
.cta-sub{font-size:16px;color:var(--text-light);font-weight:300;margin-bottom:48px;line-height:1.8;}
.cta-buttons{display:flex;gap:16px;justify-content:center;flex-wrap:wrap;}
.store-badge{display:inline-flex;align-items:center;gap:10px;padding:12px 24px;border-radius:14px;background:var(--text-dark);color:white;text-decoration:none;cursor:none;transition:all .35s;border:1px solid transparent;}
.store-badge:hover{background:transparent;color:var(--text-dark);border-color:var(--text-dark);transform:translateY(-2px);}
.store-badge-icon{font-size:22px;}
.store-badge-text{display:flex;flex-direction:column;}
.store-badge-sub{font-size:10px;opacity:.7;letter-spacing:.05em;}
.store-badge-name{font-size:16px;font-weight:500;margin-top:1px;}

/* footer */
footer{background:var(--text-dark);padding:60px 52px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px;}
.footer-logo{font-family:var(--ff-display);font-size:20px;letter-spacing:.2em;color:white;}
.footer-links{display:flex;gap:32px;list-style:none;flex-wrap:wrap;}
.footer-links a{font-size:12px;letter-spacing:.1em;color:rgba(255,255,255,.4);text-decoration:none;text-transform:uppercase;transition:color .3s;}
.footer-links a:hover{color:var(--gold);}
.footer-copy{font-size:12px;color:rgba(255,255,255,.3);}

/* responsive */
@media(max-width:900px){
  .m-nav{padding:20px 24px;}
  .nav-links{display:none;}
  .section-inner{padding:80px 24px;}
  .story-grid,.ai-layout{grid-template-columns:1fr;}
  .features-grid{grid-template-columns:1fr;}
  .feature-card.large{grid-column:span 1;grid-template-columns:1fr;}
  .ux-grid{grid-template-columns:1fr 1fr;}
  .ux-stat-card.wide{grid-column:span 2;flex-direction:column;}
  .testi-grid{grid-template-columns:1fr;}
  .membership-cards{grid-template-columns:1fr;}
  .gallery-grid{grid-template-columns:1fr 1fr;}
  .gallery-item:first-child{grid-column:span 2;grid-row:span 1;}
  .hero-phone{display:none;}
  footer{flex-direction:column;align-items:flex-start;}
  .story-deco{display:none;}
}
@media(max-width:600px){
  .ux-grid{grid-template-columns:1fr;}
  .ux-stat-card.wide{grid-column:span 1;}
  .gallery-grid{grid-template-columns:1fr;}
  .gallery-item:first-child{grid-column:span 1;}
}
`;

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    const move = (e) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener("mousemove", move);
    let raf;
    const tick = () => {
      if (cursorRef.current) {
        cursorRef.current.style.left = mx + "px";
        cursorRef.current.style.top = my + "px";
      }
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = rx + "px";
        ringRef.current.style.top = ry + "px";
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    const hoverOn = () => {
      cursorRef.current?.classList.add("hover");
      ringRef.current?.classList.add("hover");
    };
    const hoverOff = () => {
      cursorRef.current?.classList.remove("hover");
      ringRef.current?.classList.remove("hover");
    };

    const attachHover = () => {
      document.querySelectorAll("a,button,.outfit-chip,.outfit-card,.gallery-item").forEach((el) => {
        el.addEventListener("mouseenter", hoverOn);
        el.addEventListener("mouseleave", hoverOff);
      });
    };
    attachHover();
    const mo = new MutationObserver(attachHover);
    mo.observe(document.body, { childList: true, subtree: true });

    // Handle show/hide on wrapper hover to prevent leakage onto the parent page
    const wrapper = document.querySelector(".maison-wrapper");
    const showCursor = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "0.6";
    };
    const hideCursor = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    if (wrapper) {
      wrapper.addEventListener("mouseenter", showCursor);
      wrapper.addEventListener("mouseleave", hideCursor);
    }

    return () => {
      document.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      mo.disconnect();
      if (wrapper) {
        wrapper.removeEventListener("mouseenter", showCursor);
        wrapper.removeEventListener("mouseleave", hideCursor);
      }
    };
  }, []);

  return { cursorRef, ringRef };
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
      }),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  });
}

function useScrollEffects() {
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const hc = document.querySelector(".hero-content");
      const ph = document.querySelector(".hero-phone");
      if (hc) hc.style.transform = `translateY(${y * 0.3}px)`;
      if (ph) ph.style.transform = `translateY(calc(-50% + ${y * 0.15}px)) rotate(-2deg)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function Particles() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const items = useMemo(() => {
    if (!mounted) return [];
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      dur: 8 + Math.random() * 12,
      delay: Math.random() * -12,
    }));
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="particles">
      {items.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size, height: p.size,
            left: `${p.left}%`, top: `${p.top}%`,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function FabricLines() {
  return (
    <div className="fabric-lines">
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={i}
          className="fabric-line"
          style={{
            top: `${i * 5}%`,
            animationDuration: `${3 + i * 0.2}s`,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
}

function AiDots() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const dots = useMemo(() => {
    if (!mounted) return [];
    return Array.from({ length: 64 }, (_, i) => ({
      id: i,
      dur: 1.5 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="ai-dots">
      {dots.map((d) => (
        <div
          key={d.id}
          className="ai-dot"
          style={{ animationDuration: `${d.dur}s`, animationDelay: `${d.delay}s` }}
        />
      ))}
    </div>
  );
}

function Carousel() {
  const doubled = [...OUTFITS, ...OUTFITS];
  return (
    <div className="carousel-wrapper reveal" style={{ padding: "40px 0 80px" }}>
      <div className="carousel-track">
        {doubled.map((o, i) => (
          <div key={i} className="outfit-card">
            <div className="outfit-img" style={{ background: o.color, padding: 0 }}>
              <img
                src={o.image}
                alt={`${o.brand} ${o.name}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
              />
            </div>
            <div className="outfit-meta">
              <div className="outfit-brand">{o.brand}</div>
              <div className="outfit-name">{o.name}</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div className="outfit-price">{o.price}</div>
                <div className="outfit-save">♡</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroCardStack() {
  const total = STACK_CARDS.length;
  const [frontIdx, setFrontIdx] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setFrontIdx(prev => (prev + 1) % total);
    }, 3600);
    return () => clearInterval(iv);
  }, [total]);

  const getPos = (idx) => {
    const diff = ((idx - frontIdx) % total + total) % total;
    if (diff === 0) return "front";
    if (diff === 1) return "left-near";
    if (diff === 2) return "left-far";
    if (diff === total - 1) return "bottom"; // next incoming card
    return "hidden";
  };

  return (
    <div className="hero-stack-scene">
      {STACK_CARDS.map((card, idx) => (
        <div key={idx} className="hcard" data-pos={getPos(idx)}>
          <img src={card.img} alt={card.brand} />
          <div className="hcard-overlay" />
          <div className="hcard-top-tag">
            <span className="hcard-live" />
            Live
          </div>
          <div className="hcard-label">
            <div className="hcard-brand">{card.brand}</div>
            <div className="hcard-tag">{card.tag}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function MaisonLanding() {
  const [scrolled, setScrolled] = useState(false);
  const { cursorRef, ringRef } = useCursor();
  useReveal();
  useScrollEffects();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="maison-wrapper">
      <style>{GLOBAL_CSS}</style>

      {/* ── Cursor ── */}
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />

      {/* ── NAV ── */}
      <nav className={`m-nav${scrolled ? " scrolled" : ""}`}>
        <a href="#" className="nav-logo">MAISON</a>
        <ul className="nav-links">
          {NAV_LINKS.map((l) => (
            <li key={l.label}><a href={l.href}>{l.label}</a></li>
          ))}
        </ul>
        <a href="#cta" className="nav-cta">Get the App</a>
      </nav>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section id="hero">
        <Particles />

        {/* ══ LEFT PANEL ══ */}
        <div className="hero-left">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            Luxury Fashion · AI Curated
          </div>

          <h1 className="hero-title">
            Wear<br />
            Confidence<br />
            <em>Softly.</em>
          </h1>

          <p className="hero-subtitle">
            A new era of personal style. MAISON blends artificial
            intelligence with editorial taste to dress you in your
            most authentic self.
          </p>

          <div className="hero-ctas">
            <a href="#cta" className="btn-primary">Explore Collection</a>
            <a href="#story" className="btn-ghost">Discover More</a>
          </div>

          {/* Thumbnail strip */}
          <div className="hero-thumbs">
            <div className="hero-thumb">
              <img src="/images/fashion_hero_3.png" alt="Look 1" />
            </div>
            <div className="hero-thumb">
              <img src="/images/fashion_hero_2.png" alt="Look 2" />
            </div>
            <div className="hero-thumb">
              <img src="/images/featured1.png" alt="Look 3" />
            </div>
            <div className="hero-thumb">
              <img src="/images/featured2.png" alt="Look 4" />
            </div>
            <span className="hero-thumb-more">+240 looks</span>
          </div>
        </div>

        {/* ══ RIGHT PANEL — 3D card stack ══ */}
        <div className="hero-right">
          <HeroCardStack />
        </div>

        {/* Scroll hint */}
        <div className="scroll-hint">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>

      </section>

      {/* ══════════════════════════════════════
          BRAND STORY
      ══════════════════════════════════════ */}
      <section id="story">
        <div className="section-inner">
          <div className="story-grid">
            <div className="story-visual reveal" style={{ position: "relative" }}>
              <div className="story-visual-bg" />
              <FabricLines />
              <img
                src="/images/fashion_feeling.png"
                alt="Fashion is a Feeling"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.95
                }}
              />
              <div className="story-visual-card reveal reveal-delay-2">
                <div className="story-stat">
                  2.4M<span style={{ fontSize: 24, color: "var(--gold)" }}>+</span>
                </div>
                <div className="story-stat-label">Styled looks created monthly</div>
              </div>
              <div className="story-deco">M</div>
            </div>

            <div>
              <div className="section-eyebrow reveal">Our Story</div>
              <h2 className="section-title reveal reveal-delay-1">
                Fashion is<br />a <em>feeling.</em>
              </h2>
              <div className="story-divider reveal reveal-delay-2" />
              <p className="section-body reveal reveal-delay-2">
                MAISON was born from a simple belief: getting dressed should feel like an act of
                self-expression, not stress. We built the world's first emotionally intelligent
                fashion companion — one that learns your taste, your mood, your life.
              </p>
              <p className="section-body reveal reveal-delay-3" style={{ marginTop: 16 }}>
                From the runways of Paris to the streets of Tokyo, MAISON curates a wardrobe that
                is entirely, beautifully, unmistakably <em>you.</em>
              </p>
              <blockquote className="story-quote reveal reveal-delay-4">
                "Style is a way to say who you are without having to speak."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURES
      ══════════════════════════════════════ */}
      <section id="features">
        <div className="section-inner">
          <div className="section-eyebrow reveal">Core Features</div>
          <h2 className="section-title reveal reveal-delay-1">
            Everything you<br />need to <em>shine.</em>
          </h2>

          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div key={f.num} className={`feature-card reveal reveal-delay-${i + 1}`}>
                <div className="feature-num">{f.num}</div>
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}

            {/* Large AI card */}
            <div className="feature-card large reveal reveal-delay-4">
              <div>
                <div className="feature-num">04</div>
                <div className="feature-title">AI Personal<br />Stylist</div>
                <p className="feature-desc" style={{ maxWidth: "none" }}>
                  Your own private fashion editor, available 24/7. Ask anything about style, colour
                  theory, occasion dressing, or body confidence — and receive editorial-grade
                  guidance instantly.
                </p>
                <div style={{ marginTop: 24 }}>
                  <span style={{ fontSize: 12, color: "var(--gold)", letterSpacing: "0.1em" }}>
                    Powered by MAISON Intelligence →
                  </span>
                </div>
              </div>
              <div className="feature-visual">
                <img
                  src="/images/luxury_fashion_brand.png"
                  alt="Maison Luxury Fashion Brand"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          AI STYLING ASSISTANT
      ══════════════════════════════════════ */}
      <section id="ai">
        <div className="section-inner">
          <div className="ai-layout">
            <div>
              <div className="section-eyebrow reveal">AI Stylist</div>
              <h2 className="section-title reveal reveal-delay-1">
                Meet your<br /><em>personal</em><br />fashion mind.
              </h2>
              <p className="section-body reveal reveal-delay-2">
                Describe a vibe, an event, a feeling — and MAISON Intelligence crafts the perfect
                look. It's like having a Vogue editor on speed dial, always.
              </p>
              <div className="outfit-chips reveal reveal-delay-3">
                {CHIPS.map((c) => (
                  <span key={c} className="outfit-chip">{c}</span>
                ))}
              </div>
            </div>

            <div className="ai-chat reveal reveal-delay-2">
              <div className="ai-chat-header">
                <div className="ai-avatar">M</div>
                <div>
                  <div className="ai-name">MAISON Intelligence</div>
                  <div className="ai-status">
                    <span className="ai-status-dot" />Active
                  </div>
                </div>
              </div>
              <div className="chat-bubble chat-user" style={{ animationDelay: "0.2s" }}>
                I have a gallery opening tonight. Very art world.
              </div>
              <div className="chat-bubble chat-ai" style={{ animationDelay: "0.6s" }}>
                Perfect. For an art world setting, I'd suggest something that reads as effortlessly
                considered — think wide-leg tailoring, a sculptural bag, and one unexpected element.
                Your cream Bottega blazer with wide-leg black trousers would be ideal.
              </div>
              <div className="chat-bubble chat-user" style={{ animationDelay: "1s" }}>
                What about shoes?
              </div>
              <div className="chat-typing" style={{ animationDelay: "1.2s" }}>
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          OUTFIT CAROUSEL
      ══════════════════════════════════════ */}
      <section id="carousel-section">
        <div className="section-inner" style={{ paddingBottom: 0 }}>
          <div className="section-eyebrow reveal">Editorial Picks</div>
          <h2 className="section-title reveal reveal-delay-1">
            Curated<br /><em>for today.</em>
          </h2>
        </div>
        <Carousel />
      </section>

      {/* ══════════════════════════════════════
          UX SHOWCASE
      ══════════════════════════════════════ */}
      <section id="ux">
        <div className="section-inner">
          <div className="section-eyebrow reveal">By The Numbers</div>
          <h2 className="section-title reveal reveal-delay-1">
            Loved by<br /><em>millions.</em>
          </h2>
          <div className="ux-grid">
            <div className="ux-stat-card wide reveal reveal-delay-1">
              <div>
                <div className="ux-num">4.9<span className="ux-unit">★</span></div>
                <div className="ux-label">App Store Rating<br />from 180,000+ reviews</div>
              </div>
              <div className="ux-divider" />
              <div>
                <div className="ux-num">2.4<span className="ux-unit">M</span></div>
                <div className="ux-label">Active users<br />across 60 countries</div>
              </div>
              <div className="ux-divider" />
              <div>
                <div className="ux-num">87<span className="ux-unit">%</span></div>
                <div className="ux-label">Fewer "nothing to wear"<br />moments reported</div>
              </div>
            </div>
            <div className="ux-stat-card reveal reveal-delay-2">
              <div className="ux-num">3<span className="ux-unit">×</span></div>
              <div className="ux-label">More outfits worn from existing wardrobe</div>
            </div>
            <div
              className="ux-stat-card reveal reveal-delay-3"
              style={{ background: "linear-gradient(135deg,rgba(201,169,110,0.1),rgba(217,208,192,0.15))" }}
            >
              <div className="ux-num" style={{ color: "var(--gold)" }}>∞</div>
              <div className="ux-label">Styling possibilities from your closet</div>
            </div>
            <div className="ux-visual reveal reveal-delay-4" style={{ position: "relative", backgroundColor: "var(--sand)" }}>
              {/* Fallback luxury image so it NEVER looks empty/flat */}
              <img
                src="/images/luxury_showroom.png"
                alt="Style DNA Background"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.9,
                  zIndex: 1
                }}
              />
              {/* Luxury fashion campaign video loop */}
              <video
                src="https://assets.mixkit.co/videos/preview/mixkit-fashion-model-showing-off-a-luxury-beige-coat-40156-large.mp4"
                poster="/images/luxury_showroom.png"
                autoPlay
                loop
                muted
                playsInline
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  zIndex: 2
                }}
              />
              {/* Semi-transparent dark overlay for high text contrast */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(26, 24, 21, 0.45)",
                  zIndex: 3
                }}
              />
              <div className="ux-visual-inner" style={{ zIndex: 4 }}>
                <div style={{ textAlign: "center", padding: 40 }}>
                  <div style={{ fontFamily: "var(--ff-display)", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 300, color: "var(--cream)", marginBottom: 12, textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}>
                    Discover Your Style DNA
                  </div>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.9)", maxWidth: 380, margin: "0 auto", lineHeight: 1.8, textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>
                    Take our 2-minute style quiz and unlock a wardrobe experience tailored entirely to you
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          VIDEO GALLERY
      ══════════════════════════════════════ */}
      <section id="gallery">
        <div className="section-inner">
          <div className="section-eyebrow reveal">Visual Stories</div>
          <h2 className="section-title reveal reveal-delay-1">
            Fashion<br /><em>in motion.</em>
          </h2>
          <div className="gallery-grid">
            {/* Large first item */}
            <div className="gallery-item reveal reveal-delay-1">
              <div className="gallery-item-inner" style={{ minHeight: 460, position: "relative" }}>
                {/* Fallback poster image to ensure it NEVER looks blank */}
                <img
                  src="/images/margaux_coat.png"
                  alt="SS 2025 Collection"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
                <video
                  src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054ba208d1c7d2e3073f087f8e36d3a&profile_id=139&oauth2_token_id=57447761"
                  poster="/images/margaux_coat.png"
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: 2
                  }}
                />
                <div className="gallery-play" style={{ zIndex: 3 }}>▶</div>
                <div className="gallery-overlay" style={{ zIndex: 3 }}>
                  <span className="gallery-tag">SS 2025 Collection</span>
                </div>
              </div>
            </div>

            {[
              { video: "https://player.vimeo.com/external/435674703.sd.mp4?s=7fdfb152d515a6b0c2e3533ecda5e3867ff7df69&profile_id=139&oauth2_token_id=57447761", image: "/images/strappy_heels.png", tag: "Accessories Edit" },
              { video: "https://player.vimeo.com/external/540092171.sd.mp4?s=34a5d84879207e997f7bc197beeddb698b671a53&profile_id=139&oauth2_token_id=57447761", image: "/images/puzzle_bag.png", tag: "Luxury Capsule" },
              { video: "https://player.vimeo.com/external/355325854.sd.mp4?s=8496bc4081efbc9581a95098ffb99c08479e0a2c&profile_id=139&oauth2_token_id=57447761", image: "/images/luxury_fashion_brand.png", tag: "Sustainable Luxury" },
              { video: "https://player.vimeo.com/external/409221305.sd.mp4?s=8d06bdfc28d6fa7c617eb04ec224f8d6896225b6&profile_id=139&oauth2_token_id=57447761", image: "/images/classy_dress_mockup.png", tag: "Evening Looks" },
            ].map((g, i) => (
              <div key={g.tag} className={`gallery-item reveal reveal-delay-${(i % 2) + 2}`}>
                <div className="gallery-item-inner" style={{ minHeight: 220, position: "relative" }}>
                  {/* Fallback poster image to ensure it NEVER looks blank */}
                  <img
                    src={g.image}
                    alt={g.tag}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                  />
                  <video
                    src={g.video}
                    poster={g.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      zIndex: 2
                    }}
                  />
                  <div className="gallery-play" style={{ zIndex: 3 }}>▶</div>
                  <div className="gallery-overlay" style={{ zIndex: 3 }}>
                    <span className="gallery-tag">{g.tag}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════ */}
      <section id="testimonials">
        <div className="section-inner">
          <div className="section-eyebrow reveal">What They Say</div>
          <h2 className="section-title reveal reveal-delay-1">
            Dressed with<br /><em>confidence.</em>
          </h2>
          <div className="testi-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className={`testi-card reveal reveal-delay-${i + 1}`}>
                <div className="testi-stars">★★★★★</div>
                <p className="testi-quote">"{t.quote}"</p>
                <div className="testi-author">
                  <div className="testi-avatar">{t.initial}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-handle">{t.handle}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MEMBERSHIP
      ══════════════════════════════════════ */}
      <section id="membership">
        <div className="section-inner">
          <div className="section-eyebrow reveal">Membership</div>
          <h2 className="section-title reveal reveal-delay-1" style={{ color: "white" }}>
            Choose your<br /><em>experience.</em>
          </h2>
          <p className="section-body reveal reveal-delay-2" style={{ color: "rgba(255,255,255,0.5)" }}>
            Every tier of MAISON is crafted to deliver luxury. Choose the depth of your fashion journey.
          </p>
          <div className="membership-cards">
            {PLANS.map((p, i) => (
              <div key={p.tier} className={`mem-card reveal reveal-delay-${i + 1}${p.featured ? " featured" : ""}`}>
                {p.badge && <div className="mem-badge">{p.badge}</div>}
                <div className="mem-tier">{p.tier}</div>
                <div className="mem-price">
                  {p.price}<span className="mem-period">{p.period}</span>
                </div>
                <div className="mem-divider" />
                <ul className="mem-features">
                  {p.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <a href="#" className={`mem-btn${p.gold ? " gold" : ""}`}>{p.btnLabel}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════ */}
      <section id="cta">
        <div className="section-inner">
          <div className="reveal">
            <div className="section-eyebrow" style={{ textAlign: "center", justifyContent: "center", display: "flex" }}>
              Begin Your Story
            </div>
          </div>
          <h2 className="cta-title reveal reveal-delay-1">
            Your wardrobe,<br /><em>elevated.</em>
          </h2>
          <p className="cta-sub reveal reveal-delay-2">
            Join 2.4 million people who dress with intention, confidence, and quiet luxury.<br />
            Download MAISON — free, always.
          </p>
          <div className="cta-buttons reveal reveal-delay-3">
            <a href="#" className="store-badge">
              <div className="store-badge-icon">
                <svg width="24" height="24" viewBox="0 0 384 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M318.7 268c-6.5-7.8-10.6-13.5-12.2-18.2-2.5-7-2.5-13.7-2.5-20 0-6.8.2-13.9 2.9-21.5 2.8-7.8 7.4-13.4 12.3-20.9-8.3-6-16.4-6.2-24.5-5.9-7.5.3-15.2.7-23.1 5.1-6.8 3.9-12.3 7.5-15.4 12.2-5.8 8.6-11.8 14.9-16.9 20.2-6.9 6.9-11 10.6-15.7 14.9-6.1 5.7-12.1 10-18.9 12.8-5.6 2.3-12.5 3.8-17.4 5.2-.8.2-2 .5-2 .5-5.9 1.2-11 1.8-16.4 1.6-31.8-.4-54.1-17.7-68.1-35-8.7-9.9-16.1-22.5-18-36-.8-5.1-.5-10.2-.5-15.5-.2-12 1.2-25 6-36.9 3.3-8.5 7.4-16.5 11.5-22 2.5-3.5 5.6-7.6 5.3-9.6-.3-2-4-4.1-6.9-4.8-5.2-1.2-5.6-1.2-10.8-1.2-15.1.5-28.6 7.7-42 15.9-12.2 7-13.9 7.6-20.9 8.6-6.7.9-20.9 1.7-30.7-7.8-9.8-9.4-12.2-23.5-13-31.4-4.6-4.7-13-25.3-9.5-33.4 1.8-4.1 6.6-5.4 11.1-7.5 6.5-3 13-5.7 19.5-7 6.1-1.2 12.8-2.2 19-4.9 4.6-2 9-5.1 12.7-9.7-.2-2.1 0-5.9-.8-8.9-6.9-25.2-.3-55.2 12.5-78.1 2.9-5.5 6.7-9.6 10.5-13.5 5.5-5.6 10.6-10.3 19.4-12.6 9.1-2.4 29.5-4.4 37.7 2.3 9.3 6.9 11.8 27.9 11.6 31.2-.4 5.7-.6 14.2-2.4 21.5-2.2 9.2-7.1 22-12.9 36.9-5.5 14-11.8 27.8-16.3 38-2.7 6.2-5.6 14.6-6.3 22.5-1.1 11.9-2.7 27-2.6 31.3.5 5.9.7 11.6.7 17.2 0 12.9-.5 31.9-2.2 48.2-7.2-2.5-13.1-2.8-19.3-3.2z"/>
                </svg>
              </div>
              <div className="store-badge-text">
                <span className="store-badge-sub">Download on the</span>
                <span className="store-badge-name">App Store</span>
              </div>
            </a>
            <a href="#" className="store-badge">
              <div className="store-badge-icon">▶</div>
              <div className="store-badge-text">
                <span className="store-badge-sub">Get it on</span>
                <span className="store-badge-name">Google Play</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <footer>
        <div className="footer-logo">MAISON</div>
        <ul className="footer-links">
          {["Privacy", "Terms", "Press", "Careers", "Contact"].map((l) => (
            <li key={l}><a href="#">{l}</a></li>
          ))}
        </ul>
        <div className="footer-copy">© 2025 MAISON. All rights reserved.</div>
      </footer>
    </div>
  );
}
