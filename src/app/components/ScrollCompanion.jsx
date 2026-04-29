'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion'

const CREATURES = ['🐢', '🐢', '🐢', '🐢', '🐢', '🐌']
const PET_REACTIONS = ['🍃', '💚', '✨', '💕']

export default function ScrollCompanion() {
  const [creature, setCreature] = useState('🐢')
  const [petting, setPetting] = useState(false)
  const [reaction, setReaction] = useState('🍃')
  const [direction, setDirection] = useState(1) // 1 = facing right, -1 = facing left
  const lastScrollRef = useRef(0)

  // Map page scroll progress (0 → 1) to horizontal position (1% → 99% of viewport width)
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    mass: 0.5,
  })
  const xPercent = useTransform(smoothProgress, [0, 1], ['2%', '98%'])

  // Detect scroll direction to flip the creature
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY
      if (current > lastScrollRef.current + 2) {
        setDirection(1) // scrolling down → walking right
      } else if (current < lastScrollRef.current - 2) {
        setDirection(-1) // scrolling up → walking left
      }
      lastScrollRef.current = current
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Periodically swap creature (~every 25s, 25% chance)
  useEffect(() => {
    const i = setInterval(() => {
      if (Math.random() < 0.25) {
        setCreature(CREATURES[Math.floor(Math.random() * CREATURES.length)])
      }
    }, 25000)
    return () => clearInterval(i)
  }, [])

  const handleClick = (e) => {
    e.stopPropagation()
    if (petting) return
    setReaction(PET_REACTIONS[Math.floor(Math.random() * PET_REACTIONS.length)])
    setPetting(true)
    setTimeout(() => setPetting(false), 1700)
  }

  return (
    <div
      className="fixed inset-x-0 bottom-7 z-30 pointer-events-none h-10"
      aria-hidden="true">

      {/* The line — like a margin rule the turtle walks on */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-zinc-900/10 dark:bg-zinc-100/10" />

      {/* Subtle dashed center stripe */}
      <div
        className="absolute inset-x-[10%] bottom-0 h-px"
        style={{
          background: 'repeating-linear-gradient(to right, rgba(13,13,14,0.16) 0 4px, transparent 4px 10px)',
          transform: 'translateY(-0.5px)',
        }}
      />

      {/* The turtle — walks horizontally based on scroll progress */}
      <motion.div
        className="absolute bottom-0 -mb-[10px]"
        style={{ left: xPercent, x: '-50%' }}
      >
        <span
          className="cursor-pointer select-none pointer-events-auto"
          onClick={handleClick}
          title="give it a pet"
          style={{
            display: 'inline-block',
            transform: `scaleX(${direction})`,
            transition: 'transform 0.4s ease',
          }}
        >
          <span
            className="walker-bob inline-block text-[22px] leading-none"
            style={{ animationPlayState: petting ? 'paused' : 'running' }}
          >
            {creature}
          </span>
        </span>

        {/* Pet reaction balloon */}
        <AnimatePresence>
          {petting && (
            <motion.span
              key={`r-${reaction}-${Date.now()}`}
              initial={{ opacity: 0, y: 4, scale: 0.4 }}
              animate={{ opacity: 1, y: -22, scale: 1 }}
              exit={{ opacity: 0, y: -32, scale: 0.85 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full
                text-[16px] pointer-events-none select-none whitespace-nowrap"
            >
              {reaction}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
