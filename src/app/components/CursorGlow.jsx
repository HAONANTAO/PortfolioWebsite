'use client'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorGlow() {
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [mounted, setMounted] = useState(false)

  const mx = useMotionValue(-300)
  const my = useMotionValue(-300)

  const dotX  = useSpring(mx, { stiffness: 900, damping: 45 })
  const dotY  = useSpring(my, { stiffness: 900, damping: 45 })
  const ringX = useSpring(mx, { stiffness: 500, damping: 32 })
  const ringY = useSpring(my, { stiffness: 500, damping: 32 })
  const glowX = useSpring(mx, { stiffness: 120, damping: 22 })
  const glowY = useSpring(my, { stiffness: 120, damping: 22 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setMounted(true)

    const onMove  = (e) => { mx.set(e.clientX); my.set(e.clientY) }
    const onDown  = () => setClicking(true)
    const onUp    = () => setClicking(false)
    const onEnter = () => setHovering(true)
    const onLeave = () => setHovering(false)

    const bindTargets = () => {
      document.querySelectorAll('a, button, [role="button"], label').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)
    bindTargets()

    const obs = new MutationObserver(bindTargets)
    obs.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
      obs.disconnect()
    }
  }, [])

  if (!mounted) return null

  return (
    <>
      {/* Ambient glow — slowest, largest */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9985]"
        style={{
          x: glowX, y: glowY,
          translateX: '-50%', translateY: '-50%',
          width: 360, height: 360, borderRadius: '50%',
          background: hovering
            ? 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 65%)'
            : 'radial-gradient(circle, rgba(6,182,212,0.055) 0%, rgba(139,92,246,0.02) 45%, transparent 70%)',
        }}
      />

      {/* Outer ring — medium lag */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          animate={{
            width:  clicking ? 16 : hovering ? 46 : 28,
            height: clicking ? 16 : hovering ? 46 : 28,
            borderColor: hovering ? 'rgba(139,92,246,0.85)' : 'rgba(6,182,212,0.65)',
            opacity: hovering ? 1 : 0.55,
          }}
          transition={{ duration: 0.14, ease: 'easeOut' }}
          style={{ borderRadius: '50%', border: '1.5px solid rgba(6,182,212,0.65)' }}
        />
      </motion.div>

      {/* Center dot — fastest, most precise */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          animate={{
            width:  clicking ? 3 : hovering ? 7 : 4,
            height: clicking ? 3 : hovering ? 7 : 4,
            backgroundColor: hovering ? 'rgba(139,92,246,1)' : 'rgba(6,182,212,1)',
            boxShadow: hovering
              ? '0 0 12px rgba(139,92,246,0.9)'
              : '0 0 8px rgba(6,182,212,0.9)',
          }}
          transition={{ duration: 0.1 }}
          style={{ borderRadius: '50%' }}
        />
      </motion.div>
    </>
  )
}
