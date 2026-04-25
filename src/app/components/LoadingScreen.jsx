'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BOOT_LINES = [
  { text: 'Initializing system ...', color: 'text-[#444]',     delay: 0    },
  { text: 'Loading neural modules', color: 'text-[#444]',     delay: 280  },
  { text: 'AI core online ✓',       color: 'text-emerald-400',delay: 580  },
  { text: 'Mounting /portfolio',    color: 'text-[#444]',     delay: 860  },
  { text: 'Welcome — Aaron TAO',    color: 'text-cyan-400',   delay: 1180 },
]

export default function LoadingScreen({ onComplete }) {
  const [lines, setLines]   = useState([])
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const ids = []
    BOOT_LINES.forEach(({ text, color, delay }) => {
      ids.push(setTimeout(() => setLines(p => [...p, { text, color }]), delay))
    })
    ids.push(setTimeout(() => setExiting(true), 1900))
    ids.push(setTimeout(() => onComplete(),     2350))
    return () => ids.forEach(clearTimeout)
  }, [])

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="fixed inset-0 z-[99999] bg-[#040408] flex items-center justify-center"
        >
          {/* Subtle grid */}
          <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

          <div className="relative w-full max-w-xs px-6 font-mono">
            {/* Header */}
            <div className="flex items-center gap-2 mb-8">
              <span className="text-[9px] tracking-[0.4em] uppercase text-cyan-500/50">
                SYS_BOOT
              </span>
              <div className="flex-1 h-px bg-cyan-500/10" />
              <span className="text-[9px] text-[#333]">v2.4.1</span>
            </div>

            {/* Boot lines */}
            <div className="space-y-2 min-h-[140px]">
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.22 }}
                  className={`flex items-center gap-3 text-xs ${line.color}`}
                >
                  <span className="text-cyan-500/30 text-[10px]">❯</span>
                  {line.text}
                  {i === lines.length - 1 && (
                    <span className="inline-block w-1.5 h-3 bg-cyan-400 animate-pulse ml-0.5" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-8 h-px bg-[#111] rounded overflow-hidden">
              <motion.div
                animate={{ width: `${(lines.length / BOOT_LINES.length) * 100}%` }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-cyan-500 to-violet-500"
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[9px] text-[#333]">LOADING</span>
              <span className="text-[9px] text-cyan-500/40">
                {Math.round((lines.length / BOOT_LINES.length) * 100)}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
