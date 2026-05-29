import Link from 'next/link'
import './random-pages.css'
<<<<<<< HEAD
import { randomPagesConfig, CATEGORY_META } from './config'
import { getRandomItem, getWeightedRandomCategory, safeRedirect } from './utils'
import LoadingState from './components/ui/LoadingState'
import EmptyState from './components/ui/EmptyState'
import CouponsPage from './components/coupons/page'
import ViralPage from './components/viral-page/pages'
import DealsPage from './components/deals/page'
import SoftLandingPage from './components/softlanding-page/pages'
import SubscriptionPage from './components/subscription/page'
import QuizPage from './components/quizs/pages'
import SpinsWinsPage from './components/spins-wins/spins-wins'
import RewardPage from './components/rewards/page'

const CATEGORY_KEYS = Object.keys(randomPagesConfig)

const COMPONENT_MAP = {
  coupons:                    CouponsPage,
  viralPages:                 ViralPage,
  deals:                      DealsPage,
  softEngagementLandingPages: SoftLandingPage,
  subscriptionOffers:         SubscriptionPage,
  quizPages:                  QuizPage,
  spinAndWin:                 SpinsWinsPage,
  rewardUnlockPages:          RewardPage,
}

export default function RandomPagesHub() {
  const [view, setView]             = useState('hub')       // 'hub' | 'preview' | 'generator'
  const [activeCat, setActiveCat]   = useState(null)
  const [activeItem, setActiveItem] = useState(null)
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState(null)
  // slug generator
  const [prefix, setPrefix] = useState('')
  const [slug, setSlug]     = useState('')
  const [copied, setCopied] = useState(false)

  function openPreview(catKey) {
    const { error: err, item } = getRandomItem(catKey, randomPagesConfig)
    if (err || !item) { setError(err || 'No items found.'); return }
    setActiveCat(catKey)
    setActiveItem(item)
    setError(null)
    setView('preview')
  }

  function handleRedirect(catKey) {
    if (catKey === 'deals') {
      window.location.href = '/random-slug-generator/deals'
      return
    }

    setLoading(true)
    setError(null)
    setTimeout(() => {
      const { error: err, item } = getRandomItem(catKey, randomPagesConfig)
      if (err || !item) { setError(err || 'No items.'); setLoading(false); return }
      const errMsg = safeRedirect(item.url, true)
      if (errMsg) { setError(errMsg); setLoading(false); return }
      setLoading(false)
    }, 1500)
  }

  function handleSurprise() {
    const cat = getWeightedRandomCategory(randomPagesConfig)
    handleRedirect(cat)
  }

  function generateSlug() {
    const rand = Math.random().toString(36).slice(2, 10)
    setSlug(`${prefix ? prefix + '-' : ''}${rand}`)
  }

  async function copySlug() {
    if (!slug) return
    await navigator.clipboard?.writeText(slug)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const PreviewComponent = activeCat ? COMPONENT_MAP[activeCat] : null
=======
import { CATEGORIES } from './categories'
>>>>>>> 5bf13dbe15b9382466a655860fb8afbb1fc770d2

export default function RandomSlugHomePage() {
  return (
    <>
      <section className="rp-hero">
        <span className="rp-hero-badge">
          <span className="rp-hero-badge-dot" /> Landing Hub
        </span>
        <h1 className="rp-hero-title">Random Pages Landing</h1>
        <p className="rp-hero-sub">
          Choose a category from the navbar and the selected page opens full in the main area.
        </p>
        <Link href="/random-slug-generator/viral" className="btn btn-primary rp-hero-cta">
          Open Viral Page
        </Link>
      </section>

      <section>
        <div className="rp-section-head">
          <h2 className="rp-section-title">Pick a category</h2>
        </div>
        <div className="rp-cat-grid">
          {CATEGORIES.map((item) => (
            <Link
              key={item.key}
              href={`/random-slug-generator/${item.key}`}
              className="rp-cat-card"
              style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>{item.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{item.label}</div>
              <div style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>{item.description}</div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}


