'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const LOADER_SESSION_KEY = 'aaron_loader_shown_v1'
const SHOW_MS = 650 // total visible time before exit fade starts

export default function LoadingScreen({ onComplete }) {
  // Skip on subsequent navigations within the same session.
  const [shouldShow] = useState(() => {
    if (typeof window === 'undefined') return true
    return !sessionStorage.getItem(LOADER_SESSION_KEY)
  })
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (!shouldShow) {
      onComplete()
      return
    }
    sessionStorage.setItem(LOADER_SESSION_KEY, '1')

    const t = setTimeout(() => {
      setExiting(true)
      onComplete()
    }, SHOW_MS)
    return () => clearTimeout(t)
  }, [shouldShow])

  if (!shouldShow) return null

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed inset-0 z-[99999] flex items-center justify-center"
          style={{ background: 'var(--bg)' }}
        >
          <div className="flex flex-col items-center gap-3 relative">

            {/* Two tiny sparkles flanking the wave */}
            {[
              { emoji: '✨', x: -56, y: -10, delay: 0.15, size: 14 },
              { emoji: '✨', x:  58, y:   6, delay: 0.25, size: 12 },
            ].map((s, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0, x: s.x, y: s.y }}
                animate={{ opacity: [0, 1, 0.7, 1], scale: [0, 1.2, 1, 1.15] }}
                transition={{
                  duration: 1.2,
                  delay: s.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute pointer-events-none select-none"
                style={{ fontSize: s.size, top: '40%', left: '50%' }}
              >
                {s.emoji}
              </motion.span>
            ))}

            {/* Waving hand */}
            <motion.div
              initial={{ scale: 0.4, opacity: 0, y: 6 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: 'backOut' }}
              className="text-5xl select-none relative leading-none"
            >
              <motion.span
                animate={{ rotate: [0, 18, -10, 18, -6, 14, 0] }}
                transition={{
                  duration: 0.9,
                  ease: 'easeInOut',
                  delay: 0.05,
                  repeat: Infinity,
                  repeatDelay: 0.2,
                }}
                style={{ display: 'inline-block', transformOrigin: '70% 70%' }}
              >
                👋
              </motion.span>
            </motion.div>

            {/* Speech bubble greeting */}
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.22, delay: 0.18, ease: 'backOut' }}
              className="relative"
            >
              <div className="px-3.5 py-2 rounded-2xl rounded-bl-sm
                bg-white border border-zinc-900/10 shadow-[0_2px_10px_rgba(0,0,0,0.04)]
                dark:bg-zinc-100/[0.05] dark:border-zinc-100/10">
                <span className="text-zinc-500 dark:text-zinc-400 text-sm">Hi, I'm </span>
                <span className="text-zinc-900 dark:text-zinc-100 text-base font-semibold tracking-tight">Aaron</span>
              </div>
              <div className="absolute -bottom-[5px] left-3 w-2.5 h-2.5 rotate-45
                bg-white border-r border-b border-zinc-900/10
                dark:bg-zinc-100/[0.05] dark:border-zinc-100/10" />
            </motion.div>

            {/* Turtle peeking up — ties to ScrollCompanion + 404 mascot */}
            <motion.span
              initial={{ opacity: 0, y: 14, scale: 0.7 }}
              animate={{
                opacity: 1,
                y: [14, 0, -2, 0],
                scale: [0.7, 1, 1, 1],
              }}
              transition={{
                duration: 0.5,
                delay: 0.32,
                ease: 'easeOut',
                times: [0, 0.55, 0.8, 1],
              }}
              className="text-2xl select-none leading-none"
              style={{ display: 'inline-block' }}
            >
              🐢
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
