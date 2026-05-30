import { useState, useEffect, useRef, useMemo } from "react";

import "./MaisonLanding.css";
import { NAV_LINKS, FEATURES, OUTFITS, GALLERY_ITEMS, TESTIMONIALS, PLANS, CHIPS, STACK_CARDS } from "./MaisonLandingData";
// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useCursor() {
    const cursorRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        const wrapper = document.querySelector(".maison-wrapper");
        if (!wrapper) return;

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
            wrapper.querySelectorAll("a,button,.outfit-chip,.outfit-card,.gallery-item").forEach((el) => {
                el.addEventListener("mouseenter", hoverOn);
                el.addEventListener("mouseleave", hoverOff);
            });
        };
        attachHover();
        const mo = new MutationObserver(attachHover);
        mo.observe(wrapper, { childList: true, subtree: true });

        const showCursor = () => {
            if (cursorRef.current) cursorRef.current.style.opacity = "1";
            if (ringRef.current) ringRef.current.style.opacity = "0.6";
        };
        const hideCursor = () => {
            if (cursorRef.current) cursorRef.current.style.opacity = "0";
            if (ringRef.current) ringRef.current.style.opacity = "0";
        };

        wrapper.addEventListener("mouseenter", showCursor);
        wrapper.addEventListener("mouseleave", hideCursor);

        return () => {
            document.removeEventListener("mousemove", move);
            cancelAnimationFrame(raf);
            mo.disconnect();
            wrapper.removeEventListener("mouseenter", showCursor);
            wrapper.removeEventListener("mouseleave", hideCursor);
        };
    }, []);

    return { cursorRef, ringRef };
}

function useReveal() {
    useEffect(() => {
        const wrapper = document.querySelector(".maison-wrapper");
        if (!wrapper) return;
        const els = wrapper.querySelectorAll(".reveal");
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
        const wrapper = document.querySelector(".maison-wrapper");
        if (!wrapper) return;
        const onScroll = () => {
            const y = window.scrollY;
            const hc = wrapper.querySelector(".hero-content");
            const ph = wrapper.querySelector(".hero-phone");
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

            {/* ── Cursor ── */}
            <div className="cursor" ref={cursorRef} />
            <div className="cursor-ring" ref={ringRef} />


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
                    <div className="section-eyebrow reveal" style={{ textAlign: 'center' }}>Editorial Picks</div>
                    <h2 className="section-title reveal reveal-delay-1" style={{ textAlign: 'center' }}>
                        Curated <em>For Today.</em>
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
                                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-46-19.1-73.4-19.1-34.9 0-73.3 22.8-91.1 57.5-35.6 69.8-9.1 172.9 25.1 222.9 16.7 24.3 36.7 51.6 62.7 50.7 25.4-1 35.1-16.5 65.8-16.5 30.5 0 39.4 16.5 65.8 15.9 26.9-.5 44.5-24.8 61-48.8 19.1-27.7 26.9-54.6 27.3-56-.8-.3-52.6-20.1-53.1-80.7zM294.9 83.6c15.6-18.8 26.1-45.8 23.3-72.6-22.9.9-50.7 15.2-67.1 34.4-14.3 16.7-26.8 44.1-23.4 70.3 25.6 2 51.7-13.3 67.2-32.1z" />
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
        </div>
    );
}