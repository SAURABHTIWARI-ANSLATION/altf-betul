import Hero from './components/hero';
import PopularOffers from './components/popular-offers';
import TopCoupons from './components/top-coupons';
import PopularStores from './components/popular-stores';
import ActivityTicker from './components/activity-ticker';
import Newsletter from './components/newsletter';
import { CouponModalProvider } from './components/coupon-modal-context';

export default function page() {
  return (
    <CouponModalProvider>
      <div className="hero-section">
        <ActivityTicker />
        <Hero />
        <PopularOffers />
        <PopularStores />
        <TopCoupons />
        <Newsletter />
      </div>
    </CouponModalProvider>
  );
}