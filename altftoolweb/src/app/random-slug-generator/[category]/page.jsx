"use client"

import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import ViralPage from '../components/viral-page/pages'
import CouponsPage from '../components/coupons/page'
import DealsPage from '../components/deals/page'
import SoftLandingPage from '../components/softlanding-page/pages'
import SubscriptionPage from '../components/subscription/page'
import QuizPage from '../components/quizs/pages'
import SpinsWinsPage from '../components/spins-wins/spins-wins'
import RewardPage from '../components/rewards/page'
import { CATEGORIES } from '../categories'

const COMPONENT_MAP = {
  viral: ViralPage,
  coupons: CouponsPage,
  deals: DealsPage,
  softlanding: SoftLandingPage,
  subscription: SubscriptionPage,
  quiz: QuizPage,
  spin: SpinsWinsPage,
  reward: RewardPage,
}

export default function RandomSlugCategoryPage() {
  const params = useParams()
  const categoryKey = params.category
  const category = useMemo(
    () => CATEGORIES.find((item) => item.key === categoryKey),
    [categoryKey]
  )
  const CategoryComponent = category ? COMPONENT_MAP[category.key] : null

  if (!category || !CategoryComponent) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Category not found</h2>
        <p>Please select a valid category from the navbar.</p>
      </div>
    )
  }

  // Sirf category component render karo - koi extra div nahi
  return <CategoryComponent item={category.item} />
}