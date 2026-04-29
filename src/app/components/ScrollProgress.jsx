'use client'
import { useEffect, useState } from 'react'

const clamp = (n, min, max) => Math.min(Math.max(n, min), max)

export default function ScrollProgress({ selector }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const compute = () => {
      const el = selector ? document.querySelector(selector) : null

      if (el) {
        // Article-scoped: 0% when article top reaches viewport top,
        // 100% when article bottom reaches viewport bottom.
        const rect = el.getBoundingClientRect()
        const articleTop = rect.top + window.scrollY
        const articleEnd = articleTop + el.offsetHeight
        const start = articleTop
        const end = Math.max(articleEnd - window.innerHeight, start + 1)
        return clamp(((window.scrollY - start) / (end - start)) * 100, 0, 100)
      }

      // Sitewide fallback
      const total = document.documentElement.scrollHeight - window.innerHeight
      return total > 0 ? clamp((window.scrollY / total) * 100, 0, 100) : 0
    }

    const onScroll = () => setProgress(compute())
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [selector])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent">
      <div
        className="h-full"
        style={{ width: `${progress}%`, transition: 'width 0.05s linear', background: 'var(--ink)' }}
      />
    </div>
  )
}
