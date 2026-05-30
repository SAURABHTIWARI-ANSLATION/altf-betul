export function getDealImage(item) {
  return item.image || 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=700&q=80'
}

export function getDealCashback(item) {
  return item.cashback || `Flat ${Math.max(3, Math.round(Number.parseFloat(item.discount) / 5) || 8)}% Cashback`
}

export function getBestPrice(item) {
  return item.bestPrice || item.salePrice
}
