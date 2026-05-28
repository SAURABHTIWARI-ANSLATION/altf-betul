/**
 * Random Pages Config
 * Replace URLs with real ones. Set active: false to exclude from pool.
 * weight = probability share (higher = picked more often)
 */
export const randomPagesConfig = {
  coupons: {
    weight: 20,
    items: [
      { id: 'c1', title: '50% Off Sitewide', code: 'SAVE50', url: 'https://example.com/coupon/save50', expires: '2026-06-30', usedCount: 2847, active: true },
      { id: 'c2', title: 'Free Shipping', code: 'FREESHIP', url: 'https://example.com/coupon/freeship', expires: '2026-07-15', usedCount: 1204, active: true },
      { id: 'c3', title: 'Buy 1 Get 1 Free', code: 'BOGO2026', url: 'https://example.com/coupon/bogo', expires: '2026-06-20', usedCount: 985, active: true },
    ],
  },
  deals: {
    weight: 20,
    items: [
      { id: 'd1', title: 'Flash Sale Electronics', originalPrice: '₹4,999', salePrice: '₹1,999', discount: '60%', url: 'https://example.com/deal/electronics', store: 'TechZone', rating: 4.8, active: true },
      { id: 'd2', title: 'Weekend Travel Deal', originalPrice: '₹12,000', salePrice: '₹6,499', discount: '46%', url: 'https://example.com/deal/travel', store: 'TripMate', rating: 4.6, active: true },
    ],
  },
  viralPages: {
    weight: 20,
    items: [
      { id: 'v1', title: '10 Things You Didn\'t Know', url: 'https://example.com/viral/unknown-facts', views: '84K', likes: '12K', readTime: '3 min', active: true },
      { id: 'v2', title: 'This Trick Will Shock You', url: 'https://example.com/viral/trick', views: '210K', likes: '31K', readTime: '2 min', active: true },
    ],
  },
  softEngagementLandingPages: {
    weight: 10,
    items: [
      { id: 'l1', title: 'Get Your Free Style Guide', url: 'https://example.com/landing/style', benefit1: 'Curated outfit ideas', benefit2: 'Expert styling tips', benefit3: 'Weekly lookbooks', joinCount: '12,000+', active: true },
      { id: 'l2', title: 'Join the Health Revolution', url: 'https://example.com/landing/health', benefit1: 'Daily wellness tips', benefit2: 'Nutrition guides', benefit3: 'Expert Q&A access', joinCount: '8,500+', active: true },
    ],
  },
  subscriptionOffers: {
    weight: 10,
    items: [
      { id: 's1', title: 'Pro Plan - 7 Day Free Trial', url: 'https://example.com/subscribe/pro', active: true },
      { id: 's2', title: 'Yearly Plan - 40% Off', url: 'https://example.com/subscribe/yearly', active: true },
    ],
  },
  quizPages: {
    weight: 10,
    items: [
      { id: 'q1', title: 'What Type of Shopper Are You?', url: 'https://example.com/quiz/shopper', totalQuestions: 10, active: true },
      { id: 'q2', title: 'Test Your Finance IQ', url: 'https://example.com/quiz/finance', totalQuestions: 8, active: true },
    ],
  },
  spinAndWin: {
    weight: 5,
    items: [
      { id: 'sp1', title: 'Daily Lucky Spin', url: 'https://example.com/spin/daily', prizesWonToday: 1247, active: true },
      { id: 'sp2', title: 'Mega Jackpot Spin', url: 'https://example.com/spin/jackpot', prizesWonToday: 342, active: true },
    ],
  },
  rewardUnlockPages: {
    weight: 5,
    items: [
      { id: 'r1', title: 'Unlock ₹500 Cashback', url: 'https://example.com/reward/cashback', rewardCode: 'REWARD500', active: true },
      { id: 'r2', title: 'Mystery Box Unlock', url: 'https://example.com/reward/mystery', rewardCode: 'MYSTERY2026', active: true },
    ],
  },
};

export const CATEGORY_META = {
  coupons:                    { label: 'Coupons',      icon: '🏷️', color: '#2563eb' },
  deals:                      { label: 'Deals',        icon: '🛍️', color: '#059669' },
  viralPages:                 { label: 'Viral',        icon: '🔥', color: '#dc2626' },
  softEngagementLandingPages: { label: 'Discover',     icon: '💡', color: '#7c3aed' },
  subscriptionOffers:         { label: 'Subscribe',    icon: '⭐', color: '#d97706' },
  quizPages:                  { label: 'Quiz',         icon: '🤔', color: '#0891b2' },
  spinAndWin:                 { label: 'Spin & Win',   icon: '🎰', color: '#db2777' },
  rewardUnlockPages:          { label: 'Rewards',      icon: '🎁', color: '#ea580c' },
};
