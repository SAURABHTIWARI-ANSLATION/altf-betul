import '../../random-pages.css'
import { COUPON_CODES, FEATURED_STORES } from '../../components/deals/constants'

export const metadata = {
  title: 'Coupon Codes | Random Slug Generator',
  description: 'Apply coupon codes and cashback rewards.',
}

const CARD_IMAGES = [
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=82',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=82',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=82',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=82',
]

const COUPON_EXTRAS = {
  Amazon: {
    code: 'AMZ80',
    badge: 'Prime Picks',
    perk: 'Extra rewards on cards',
    action: 'Reveal Amazon Code',
    note: 'Gadgets',
  },
  Flipkart: {
    code: 'FK90',
    badge: 'Big Sale',
    perk: 'Bank offer stackable',
    action: 'Reveal Flipkart Code',
    note: 'Mobiles',
  },
  Myntra: {
    code: 'MYN80',
    badge: 'Fashion Drop',
    perk: 'Style deals refreshed',
    action: 'Unlock Myntra Deal',
    note: 'Jeans',
  },
  Ajio: {
    code: 'AJIO90',
    badge: 'Trend Saver',
    perk: 'Member cashback boost',
    action: 'Unlock Ajio Deal',
    note: 'T-shirts',
  },
  Croma: {
    code: 'CROMA70',
    badge: 'Tech Bonus',
    perk: 'Rewards on gadgets',
    action: 'Reveal Croma Code',
    note: 'Appliances',
  },
}

function CouponHeroCard({ coupon, index }) {
  const store = FEATURED_STORES.find(item => item.name.toLowerCase() === coupon.store.toLowerCase())
  const reward = index % 2 === 0 ? 'Flat Rs.1,500 Rewards' : 'Flat Rs.1,400 Rewards'
  const extra = COUPON_EXTRAS[coupon.store] || {
    code: `${coupon.store.slice(0, 4).toUpperCase()}20`,
    badge: 'Hot Offer',
    perk: 'Verified at checkout',
    action: 'Apply Coupon',
    note: 'Limited-period partner offer',
  }
  const variant = `rp-coupon-visual-card--v${(index % 4) + 1}`

  return (
    <article className={`rp-coupon-visual-card ${variant}`}>
      <img src={CARD_IMAGES[index % CARD_IMAGES.length]} alt={`${coupon.store} coupon`} />
      <div className="rp-coupon-visual-overlay" />
      <div className="rp-coupon-brand-chip">
        <strong>{coupon.store}</strong>
        <span>{coupon.type}</span>
      </div>
      <div className="rp-coupon-hot-badge">Sale Live Now</div>
      <div className="rp-coupon-visual-content">
        <p>{extra.note}</p>
        <h2>{coupon.offer}</h2>
        <div className="rp-coupon-reward-row">
          <strong>CK</strong>
          <span>{coupon.cashback} {coupon.type}</span>
        </div>
        <div className="rp-coupon-card-meta">
          <span>{extra.perk}</span>
          <code>{extra.code}</code>
        </div>
      </div>
      <a href={store ? '#coupon-stores' : '/random-slug-generator/deals'} className="rp-coupon-apply-btn">
        {extra.action}
      </a>
    </article>
  )
}

export default async function CouponCodesPage({ searchParams }) {
  const params = await searchParams
  const selectedStore = params?.store
  const orderedCoupons = selectedStore
    ? [...COUPON_CODES].sort((a, b) => (a.store === selectedStore ? -1 : b.store === selectedStore ? 1 : 0))
    : COUPON_CODES

  return (
    <main className="rp-root">
      <div className="rp-page-body">
        <section className="rp-coupon-page-head">
          <img
            src="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1800&q=82"
            alt="People shopping online with coupon rewards"
          />
          <div className="rp-coupon-page-head-content">
            <a href="/random-slug-generator/deals">Back to Deals</a>
            <span className="rp-cashkaro-section-label">Coupon Rewards</span>
            <h1>Unlock cashback, rewards, and live coupon offers.</h1>
            <p>Compare bank offers, apply verified codes, and stack extra rewards before checkout.</p>
            <div className="rp-coupon-banner-actions">
              <a href="#coupon-cards">Explore Offers</a>
              <a href="#coupon-stores">Store Codes</a>
            </div>
          </div>
          <div className="rp-coupon-banner-card">
            <span>Today only</span>
            <strong>Extra rewards live</strong>
            <small>Apply codes before checkout</small>
          </div>
        </section>

        <section className="rp-coupon-feature-grid">
          {[
            ['90%', 'Top discount ceiling'],
            ['5 min', 'Average code apply time'],
            ['100%', 'Verified coupon list'],
            ['Rs.1,500', 'Reward cards live'],
          ].map(([value, label]) => (
            <article key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </section>

        <section id="coupon-cards" className="rp-coupon-visual-grid">
          {orderedCoupons.map((coupon, index) => (
            <CouponHeroCard key={coupon.store} coupon={coupon} index={index} />
          ))}
        </section>

        <section id="coupon-stores" className="rp-coupon-store-strip">
          {orderedCoupons.map(coupon => (
            <article key={coupon.store}>
              <strong>{coupon.store}</strong>
              <span>{coupon.offer}</span>
              <small>{(COUPON_EXTRAS[coupon.store] || {}).code || 'Code visible at checkout'}</small>
            </article>
          ))}
        </section>

        <section className="rp-coupon-page-footer">
          <div>
            <span className="rp-cashkaro-section-label">Smart Checkout</span>
            <h2>Stack coupon codes with rewards before the offer clock runs out.</h2>
          </div>
          <div className="rp-coupon-footer-steps">
            {['Pick store', 'Reveal code', 'Apply at checkout'].map((step, index) => (
              <span key={step}><strong>{index + 1}</strong>{step}</span>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
