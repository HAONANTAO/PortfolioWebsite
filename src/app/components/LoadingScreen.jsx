'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FUN_LINES = [
  'Brewing fresh coffee ☕',
  'Polishing pixels ✨',
  'Loading portfolio...',
  'Almost there!',
]

const SESSION_KEY = 'aaron_loader_shown_v1'

export default function LoadingScreen({ onComplete }) {
  // Skip on subsequent navigations within the same session
  const [shouldShow, setShouldShow] = useState(() => {
    if (typeof window === 'undefined') return true
    return !sessionStorage.getItem(SESSION_KEY)
  })
  const [exiting, setExiting] = useState(false)
  const [lineIdx, setLineIdx] = useState(0)

  useEffect(() => {
    if (!shouldShow) {
      // Fire complete immediately so the main page fades in
      onComplete()
      return
    }
    sessionStorage.setItem(SESSION_KEY, '1')

    // Trigger exit + onComplete *simultaneously* so they crossfade
    const t1 = setTimeout(() => {
      setExiting(true)
      onComplete()
    }, 1000)

    return () => clearTimeout(t1)
  }, [shouldShow])

  useEffect(() => {
    if (!shouldShow) return
    const i = setInterval(() => setLineIdx(v => (v + 1) % FUN_LINES.length), 600)
    return () => clearInterval(i)
  }, [shouldShow])

  if (!shouldShow) return null

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed inset-0 z-[99999] flex items-center justify-center"
          style={{ background: 'var(--bg)' }}
        >
          <div className="flex flex-col items-center gap-5 relative">

            {/* Floating sparkles */}
            {[
              { emoji: '✨', x: -78, y: -32, delay: 0.4, size: 18 },
              { emoji: '⭐', x:  82, y: -12, delay: 0.6, size: 14 },
              { emoji: '✨', x: -62, y:  48, delay: 0.8, size: 12 },
              { emoji: '💫', x:  76, y:  38, delay: 1.0, size: 16 },
            ].map((s, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0, x: s.x, y: s.y }}
                animate={{
                  opacity: [0, 1, 0.6, 1],
                  scale:   [0, 1.2, 1, 1.2],
                  rotate:  [0, 12, -8, 6],
                }}
                transition={{
                  duration: 1.6,
                  delay: s.delay,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut',
                }}
                className="absolute pointer-events-none select-none"
                style={{ fontSize: s.size, top: '50%', left: '50%' }}
              >
                {s.emoji}
              </motion.span>
            ))}

            {/* Waving hand */}
            <motion.div
              initial={{ scale: 0.4, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'backOut' }}
              className="text-6xl select-none relative"
            >
              <motion.span
                animate={{ rotate: [0, 18, -10, 18, -6, 14, 0] }}
                transition={{
                  duration: 1.2,
                  ease: 'easeInOut',
                  delay: 0.2,
                  repeat: Infinity,
                  repeatDelay: 0.4,
                }}
                style={{ display: 'inline-block', transformOrigin: '70% 70%' }}
              >
                👋
              </motion.span>
            </motion.div>

            {/* Speech bubble greeting */}
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.4, ease: 'backOut' }}
              className="relative"
            >
              <div className="px-4 py-2.5 rounded-2xl rounded-bl-sm
                bg-white border border-zinc-900/10 shadow-[0_2px_10px_rgba(0,0,0,0.04)]
                dark:bg-zinc-100/[0.05] dark:border-zinc-100/10">
                <span className="text-zinc-500 dark:text-zinc-400 text-sm">Hi, I'm </span>
                <span className="text-zinc-900 dark:text-zinc-100 text-lg font-semibold tracking-tight">Aaron</span>
              </div>
              <div className="absolute -bottom-[5px] left-3 w-2.5 h-2.5 rotate-45
                bg-white border-r border-b border-zinc-900/10
                dark:bg-zinc-100/[0.05] dark:border-zinc-100/10" />
            </motion.div>

            {/* Cycling line */}
            <div className="h-5 mt-1 relative w-64 flex justify-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={lineIdx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }}
                  className="text-xs text-zinc-500 dark:text-zinc-400 absolute"
                >
                  {FUN_LINES[lineIdx]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Soft progress bar */}
            <div className="w-32 h-[3px] rounded-full bg-zinc-900/[0.08] dark:bg-zinc-100/[0.10] overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                className="h-full w-1/2 bg-zinc-900/40 dark:bg-zinc-100/40 rounded-full"
              />
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
