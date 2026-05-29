"use client"

import './random-pages.css'
import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CATEGORIES } from './categories'

export default function RandomSlugLayout({ children }) {
  const pathname = usePathname()
  
  const getActiveKey = () => {
    if (pathname === '/random-slug-generator' || pathname === '/random-slug-generator/') {
      return 'home'
    }
    const segments = pathname.split('/').filter(Boolean)
    if (segments[0] === 'random-slug-generator' && segments[1]) {
      return segments[1]
    }
    return 'home'
  }
  
  const activeKey = getActiveKey()
  const isCategoryPage = activeKey !== 'home' && CATEGORIES.some(cat => cat.key === activeKey)

  useEffect(() => {
    const hideHeader = () => {
      const header = document.querySelector('header')
      if (header) header.style.display = 'none'
    }
    hideHeader()
    const observer = new MutationObserver(hideHeader)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => {
      observer.disconnect()
      const header = document.querySelector('header')
      if (header) header.style.display = ''
    }
  }, [])

  return (
    <div className="rp-root">
      <nav className="rp-nav">
        <div className="rp-nav-inner">
          <span className="rp-nav-brand">AltFTool Landing</span>
          <div className="rp-nav-pills">
            <Link href="/random-slug-generator" className={`rp-nav-pill${activeKey === 'home' ? ' active' : ''}`}>
              Home
            </Link>
            {CATEGORIES.map((item) => (
              <Link
                key={item.key}
                href={`/random-slug-generator/${item.key}`}
                className={`rp-nav-pill${activeKey === item.key ? ' active' : ''}`}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main className={isCategoryPage ? 'rp-page-body-full' : 'rp-page-body'}>
        {children}
      </main>
    </div>
  )
}