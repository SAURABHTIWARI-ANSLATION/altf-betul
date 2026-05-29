export const CATEGORIES = [
  {
    key: 'viral',
    label: 'Viral',
    icon: '🔥',
    description: 'Full viral content page with trending sections.',
    item: {},
  },
  {
    key: 'coupons',
    label: 'Coupons',
    icon: '🏷️',
    description: 'Claim a coupon with full offer details.',
    item: {
      title: '50% Off Sitewide',
      code: 'SAVE50',
      url: 'https://example.com/coupon/save50',
      expires: '2026-06-30',
      usedCount: 2847,
    },
  },
  {
    key: 'deals',
    label: 'Deals',
    icon: '🛍️',
    description: 'Access a major discount deal landing page.',
    item: {
      title: 'Flash Sale Electronics',
      originalPrice: '₹4,999',
      salePrice: '₹1,999',
      discount: '60%',
      url: 'https://example.com/deal/electronics',
      store: 'TechZone',
      rating: 4.8,
    },
  },
  {
    key: 'softlanding',
    label: 'Discover',
    icon: '💡',
    description: 'Landing page that captures interest and signups.',
    item: {
      title: 'Get Your Free Style Guide',
      benefit1: 'Curated outfit ideas',
      benefit2: 'Expert styling tips',
      benefit3: 'Weekly lookbooks',
      joinCount: '12,000+',
    },
  },
  {
    key: 'subscription',
    label: 'Subscription',
    icon: '⭐',
    description: 'Subscription page with pricing and trial offers.',
    item: {
      url: 'https://example.com/subscribe/pro',
    },
  },
  {
    key: 'quiz',
    label: 'Quiz',
    icon: '🧠',
    description: 'Interactive quiz page with personalized results.',
    item: {
      title: 'What Type of Shopper Are You?',
      url: 'https://example.com/quiz/shopper',
    },
  },
  {
    key: 'spin',
    label: 'Spin & Win',
    icon: '🎰',
    description: 'Spin wheel experience with prize reveal.',
    item: {
      url: 'https://example.com/spin/daily',
      prizesWonToday: 1247,
    },
  },
  {
    key: 'reward',
    label: 'Rewards',
    icon: '🎁',
    description: 'Reward unlock flow with exclusive codes.',
    item: {
      rewardCode: 'REWARD500',
      url: 'https://example.com/reward/cashback',
    },
  },
]
