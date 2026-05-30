"use client"
import React, { useEffect, useState } from 'react'
import { CASHKARO_STYLE_DEALS, COUPON_CODES, DEAL_SECTIONS, FEATURED_STORES } from './constants'
import { useTimer } from './hooks/useTimer'
import { dealClasses } from './styles'
import { getBestPrice, getDealCashback, getDealImage } from './utils'

function EmailDealPopup({ open, selectedDeal, email, onEmailChange, onClose, onSubmit }) {
  if (!open) return null

  return (
    <div className="rp-deal-popup-backdrop" role="presentation" onClick={onClose}>
      <div
        className="rp-deal-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rp-deal-popup-title"
        onClick={event => event.stopPropagation()}
      >
        <button type="button" className="rp-deal-popup-close" aria-label="Close popup" onClick={onClose}>x</button>
        <span className="rp-deal-popup-label">Unlock deal</span>
        <h2 id="rp-deal-popup-title">Enter your email to continue</h2>
        <p>{selectedDeal ? `${selectedDeal} ke best offer ke liye email add karein.` : 'Best deal unlock karne ke liye email add karein.'}</p>
        <form className="rp-deal-popup-form" onSubmit={onSubmit}>
          <input
            type="email"
            value={email}
            onChange={event => onEmailChange(event.target.value)}
            placeholder="you@example.com"
            required
            autoFocus
          />
          <button type="submit" className="btn btn-primary">Continue</button>
        </form>
      </div>
    </div>
  )
}

function DealPreviewCard({ item, timer, onRequestEmail }) {
  const bestPrice = getBestPrice(item)
  const cashback = getDealCashback(item)
  const image = getDealImage(item)

  return (
    <article className="rp-cashkaro-deal-card">
      <div className="rp-cashkaro-card-media">
        <img src={image} alt={`${item.store} deal`} loading="lazy" />
      </div>

      <div className="rp-cashkaro-card-body">
        <div className="rp-cashkaro-store-row">
          <span className="rp-cashkaro-store-name">{item.store}</span>
          <span className="rp-deal-savings-badge">{item.discount} OFF</span>
        </div>

        <h3 className="rp-cashkaro-deal-title">{item.title}</h3>

        <div className="rp-cashkaro-price-row">
          <span className="rp-deal-sale-price">{item.salePrice}</span>
          <span className="rp-deal-original-price">{item.originalPrice}</span>
        </div>

        <div className="rp-cashkaro-cashback-box">
          <span>{cashback}</span>
          <strong>Best price {bestPrice}</strong>
        </div>

        <div className="rp-deal-timer-box">
          Ends in <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800 }}>{timer || '01:30:00'}</span>
        </div>

        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary rp-cashkaro-grab-btn"
          onClick={event => onRequestEmail(event, item.title, item.url)}
        >
          Grab Deal
        </a>
      </div>
    </article>
  )
}

function MovingDealCards({ deals }) {
  const movingDeals = [...deals, ...deals]

  return (
    <section className={dealClasses.movingSection} aria-label="Moving deal cards">
      <div className="rp-cashkaro-section-head">
        <h2>Live Moving Deals</h2>
        <a href="#top-deals">View All</a>
      </div>
      <div className={dealClasses.movingViewport}>
        <div className={dealClasses.movingTrack}>
          {movingDeals.map((deal, index) => (
            <article className={dealClasses.movingCard} key={`${deal.id || deal.store}-${index}`}>
              <div className={dealClasses.movingMedia}>
                <img src={getDealImage(deal)} alt={`${deal.store} offer`} loading="lazy" />
              </div>
              <div className={dealClasses.movingBody}>
                <span>{deal.store}</span>
                <strong>{deal.title}</strong>
                <small>{getDealCashback(deal)}</small>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function FlashDealsShowcase({ deals, timer, onRequestEmail }) {
  const [startIndex, setStartIndex] = useState(0)
  const visibleCount = 3

  if (!deals.length) return null

  const visibleDeals = Array.from({ length: Math.min(visibleCount, deals.length) }, (_, index) => {
    return deals[(startIndex + index) % deals.length]
  })
  const moveNext = () => {
    setStartIndex(current => (current + 1) % deals.length)
  }

  return (
    <section id="top-deals" className="rp-flash-deals-showcase">
      <div className="rp-flash-deals-stage">
        <div className="rp-flash-deals-head">
          <h2>Flash Deals</h2>
          <div className="rp-flash-deals-timer">
            <span aria-hidden="true">o</span>
            Ends in {timer || '01:30:00'}
          </div>
        </div>

        <div className="rp-flash-deals-strip">
          {visibleDeals.map(deal => (
            <article className="rp-flash-deal-card" key={`flash-${deal.id}`}>
              <div className="rp-flash-deal-brand">
                <strong>{deal.store}</strong>
                <span>{getDealCashback(deal)}</span>
              </div>
              <div className="rp-flash-deal-product">
                <img src={getDealImage(deal)} alt={`${deal.store} flash deal`} loading="lazy" />
                <span>{deal.discount}<small>off</small></span>
              </div>
              <div className="rp-flash-deal-copy">
                <h3>{deal.title}</h3>
                <p>{getDealCashback(deal)}</p>
                <div>
                  <strong>{deal.salePrice}</strong>
                  <del>{deal.originalPrice}</del>
                </div>
              </div>
              <a
                href={deal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary rp-flash-deal-btn"
                onClick={event => onRequestEmail(event, deal.title, deal.url)}
              >
                Grab Deal
              </a>
            </article>
          ))}
        </div>
        <button type="button" className="rp-flash-deals-next" aria-label="View more flash deals" onClick={moveNext}>
          <span aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}

function WideDealRow({ section, onRequestEmail }) {
  return (
    <section className="rp-cashkaro-wide-section">
      <div className="rp-cashkaro-section-head">
        <div>
          <span className="rp-cashkaro-section-label">{section.label}</span>
          <h2>{section.title}</h2>
        </div>
        <a href="#top-deals">View All</a>
      </div>
      <div className="rp-cashkaro-horizontal-strip">
        {section.deals.map(deal => (
          <article className="rp-cashkaro-wide-card" key={`${section.title}-${deal.store}-${deal.title}`}>
            <div className="rp-cashkaro-wide-media">
              <img src={deal.image} alt={`${deal.store} offer`} loading="lazy" />
            </div>
            <div className="rp-cashkaro-wide-body">
              <strong>{deal.title}</strong>
              <span>{deal.store}</span>
              <a
                href="#top-deals"
                className="btn btn-primary rp-cashkaro-mini-btn"
                onClick={event => onRequestEmail(event, deal.title, '#top-deals')}
              >
                {deal.offer}
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function CouponCodesTable({ onRequestEmail }) {
  return (
    <section className="rp-cashkaro-coupons">
      <div className="rp-cashkaro-section-head">
        <h2>Today's Top Coupon Codes</h2>
        <a href="#top-deals">View All</a>
      </div>
      <div className="rp-cashkaro-coupon-list">
        {COUPON_CODES.map(coupon => (
          <article className="rp-cashkaro-coupon-row" key={coupon.store}>
            <div>
              <strong>{coupon.store}</strong>
              <span>{coupon.type}</span>
            </div>
            <div>
              <strong>{coupon.offer}</strong>
              <span>{coupon.cashback} {coupon.type}</span>
            </div>
            <small>Expires: {coupon.expires}</small>
            <a
              href={`/random-slug-generator/deals/coupons?store=${encodeURIComponent(coupon.store)}`}
              className="btn btn-secondary rp-cashkaro-code-btn"
              onClick={event => onRequestEmail(event, `${coupon.store} coupon`, `/random-slug-generator/deals/coupons?store=${encodeURIComponent(coupon.store)}`)}
            >
              Show Code
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}

export default function DealsPage({ item }) {
  const timer = useTimer()
  const [popupOpen, setPopupOpen] = useState(false)
  const [selectedDeal, setSelectedDeal] = useState('')
  const [email, setEmail] = useState('')
  const [pendingUrl, setPendingUrl] = useState('')
  const [storesReady, setStoresReady] = useState(false)
  const deals = CASHKARO_STYLE_DEALS.filter(deal => deal.active)

  useEffect(() => {
    setStoresReady(true)
  }, [])

  const openEmailPopup = (event, dealName = '', targetUrl = '') => {
    event?.preventDefault()
    setSelectedDeal(dealName)
    setPendingUrl(targetUrl)
    setPopupOpen(true)
  }

  const closeEmailPopup = () => {
    setPopupOpen(false)
    setPendingUrl('')
  }

  const submitEmail = event => {
    event.preventDefault()
    setPopupOpen(false)
    setEmail('')

    if (!pendingUrl) return

    if (pendingUrl.startsWith('http')) {
      window.open(pendingUrl, '_blank', 'noopener,noreferrer')
      setPendingUrl('')
      return
    }

    window.location.href = pendingUrl
    setPendingUrl('')
  }

  if (item) {
    return (
      <>
        <DealPreviewCard item={item} timer={timer} onRequestEmail={openEmailPopup} />
        <EmailDealPopup
          open={popupOpen}
          selectedDeal={selectedDeal}
          email={email}
          onEmailChange={setEmail}
          onClose={closeEmailPopup}
          onSubmit={submitEmail}
        />
      </>
    )
  }

  return (
    <div className="rp-cashkaro-page">
      <section className="rp-cashkaro-hero">
        <img
          className="rp-cashkaro-hero-image"
          src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1800&q=82"
          alt="Shopping bags and online deals"
        />
        <div>
          <span className="rp-hero-badge">
            <span className="rp-hero-badge-dot" /> Cashback & Coupon Deals
          </span>
          <h1 className="rp-cashkaro-title">India's best cashback and deals hub</h1>
          <p className="rp-cashkaro-sub">
            Search stores, compare offers, grab live deals, and stack extra cashback on every order.
          </p>
          <div className="rp-cashkaro-search">
            <input placeholder="Search for stores, coupons, products" />
            <button className="btn btn-primary" onClick={event => openEmailPopup(event, 'Search deals', '#top-deals')}>Search</button>
          </div>
        </div>
        <div className="rp-cashkaro-hero-card">
          <span>Today's Highlight</span>
          <strong>Upto 90% Off</strong>
          <small>plus extra cashback on selected stores</small>
        </div>
      </section>

      <MovingDealCards deals={deals} />

      <section className="rp-cashkaro-quick-grid">
        {[
          ['1500+', 'Partner stores'],
          ['5M+', 'Happy shoppers'],
          ['Rs.50Cr+', 'Rewards tracked'],
          ['24x7', 'Deals refreshed'],
        ].map(([value, label]) => (
          <div className="rp-cashkaro-stat" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section>
        <div className="rp-cashkaro-section-head">
          <h2>Top Cashback Stores</h2>
          <a href="#top-deals">View All</a>
        </div>
        <div className="rp-cashkaro-store-grid">
          {(storesReady ? FEATURED_STORES : []).map(store => (
            <article
              className="rp-cashkaro-store-card"
              key={store.name}
              role="button"
              tabIndex={0}
              onClick={event => openEmailPopup(event, store.name, '#top-deals')}
              onKeyDown={event => {
                if (event.key === 'Enter' || event.key === ' ') openEmailPopup(event, store.name, '#top-deals')
              }}
            >
              <img src={store.image} alt={`${store.name} sale`} loading="lazy" />
              <strong className="rp-store-card-logo">{store.name}</strong>
              <div className="rp-store-card-copy">
                <small>{store.offer}</small>
                <span>{store.name} Deals</span>
              </div>
              <div className="rp-store-card-cashback">
                <b>CK</b>
                <span>{store.cashback}</span>
              </div>
              <button type="button" className="rp-store-card-btn">Grab Deal</button>
            </article>
          ))}
        </div>
      </section>

      <FlashDealsShowcase deals={deals} timer={timer} onRequestEmail={openEmailPopup} />

      {DEAL_SECTIONS.map(section => (
        <WideDealRow key={section.title} section={section} onRequestEmail={openEmailPopup} />
      ))}

      <CouponCodesTable onRequestEmail={openEmailPopup} />

      <section className="rp-cashkaro-bottom-grid">
        <div>
          <span className="rp-cashkaro-section-label">Popular Sales Online</span>
          <h2>Shop smarter across fashion, travel, electronics, wellness, and learning.</h2>
        </div>
        <div className="rp-cashkaro-popular-tags">
          {FEATURED_STORES.slice(0, 8).map(store => (
            <a
              href="#top-deals"
              className="rp-cashkaro-popular-tile"
              key={store.name}
              onClick={event => openEmailPopup(event, store.name, '#top-deals')}
            >
              <img src={store.image} alt={`${store.name} sale`} loading="lazy" />
              <span>{store.name}</span>
              <small>{store.offer}</small>
            </a>
          ))}
        </div>
      </section>

      <section className="rp-cashkaro-referral-banner">
        <div className="rp-cashkaro-referral-visual">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=82"
            alt="Friends celebrating together"
            loading="lazy"
          />
        </div>
        <div className="rp-cashkaro-referral-copy">
          <span>Invite friends to CashKaro &</span>
          <h2>Get <strong>10%</strong> of their Cashback</h2>
          <p>every time they Shop</p>
          <small>#ReferKaroEarnKaro</small>
          <button type="button" className="rp-cashkaro-referral-btn" onClick={event => openEmailPopup(event, 'Invite friends', '#top-deals')}>
            Invite Your Friends Now
          </button>
        </div>
      </section>

      <EmailDealPopup
        open={popupOpen}
        selectedDeal={selectedDeal}
        email={email}
        onEmailChange={setEmail}
        onClose={closeEmailPopup}
        onSubmit={submitEmail}
      />
    </div>
  )
}
