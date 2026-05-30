import '../random-pages.css'
import '../components/deals/styles/deals.css'
import DealsPage from '../components/deals/page'

export const metadata = {
  title: 'Deals | Random Slug Generator',
  description: 'Preview deals from the random slug generator.',
}

export default function RandomSlugDealsPage() {
  return (
    <main className="rp-root">
      <div className="rp-page-body">
        <DealsPage />
      </div>
    </main>
  )
}
  