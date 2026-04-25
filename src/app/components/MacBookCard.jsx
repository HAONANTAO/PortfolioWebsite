'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import TerminalCard from './TerminalCard'

export default function MacBookCard() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setOpen(true), 700)
      return () => clearTimeout(t)
    }
  }, [inView])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="w-full flex flex-col items-center py-4 select-none"
      style={{ perspective: '1300px' }}
    >
      {/* MacBook body */}
      <div
        className="w-full max-w-[500px] relative"
        style={{
          transformStyle: 'preserve-3d',
          transform: open ? 'rotateX(2deg) rotateY(-1deg)' : 'rotateX(9deg) rotateY(-5deg)',
          transition: 'transform 0.9s ease',
        }}
      >
        {/* ── LID ── */}
        <div
          onClick={() => setOpen(v => !v)}
          className="cursor-pointer relative"
          style={{
            transformOrigin: 'bottom center',
            transformStyle: 'preserve-3d',
            transform: open ? 'rotateX(-112deg)' : 'rotateX(0deg)',
            transition: 'transform 0.95s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          {/* Screen — front face */}
          <div
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              background: '#080810',
              border: '2px solid rgba(255,255,255,0.07)',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
              borderRadius: '14px 14px 3px 3px',
              height: '370px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Camera notch */}
            <div
              className="absolute top-0 inset-x-0 h-5 flex items-center justify-center z-10"
              style={{ background: 'rgba(0,0,0,0.6)' }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#1a1a1a', boxShadow: 'inset 0 0 4px rgba(0,0,0,0.9), 0 0 3px rgba(0,0,0,0.5)' }}
              />
            </div>

            {/* Screen content */}
            <div className="absolute inset-0 top-5 overflow-hidden">
              <AnimatePresence mode="wait">
                {open ? (
                  <motion.div
                    key="terminal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.45 }}
                    className="h-full overflow-hidden"
                  >
                    <TerminalCard />
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    className="h-full flex flex-col items-center justify-center gap-5"
                  >
                    <motion.div
                      animate={{ opacity: [0.25, 0.55, 0.25] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="font-mono text-cyan-400/40 text-5xl"
                      style={{ filter: 'drop-shadow(0 0 22px rgba(6,182,212,0.45))' }}
                    >
                      {'</>'}
                    </motion.div>
                    <p className="text-[9px] font-mono text-[#2a2a3a] tracking-[0.5em] uppercase">
                      initializing
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Scanline texture */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.035) 3px, rgba(0,0,0,0.035) 4px)',
              }}
            />

            {/* Inner edge glow when open */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-700"
              style={{
                opacity: open ? 1 : 0,
                boxShadow: 'inset 0 0 40px rgba(6,182,212,0.04)',
              }}
            />
          </div>

          {/* Lid back — dark silver */}
          <div
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(145deg, #26262e 0%, #1c1c22 60%, #222228 100%)',
              border: '2px solid rgba(255,255,255,0.055)',
              borderRadius: '14px 14px 3px 3px',
              transform: 'rotateX(180deg)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          />
        </div>

        {/* ── BASE / KEYBOARD ── */}
        <div
          style={{
            background: 'linear-gradient(180deg, #1c1c24 0%, #13131a 100%)',
            border: '2px solid rgba(255,255,255,0.05)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '0 0 10px 10px',
            height: '22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
          }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: '20px', height: '6px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.04)',
                borderRadius: '2px',
              }}
            />
          ))}
        </div>

        {/* Drop shadow */}
        <div
          style={{
            position: 'absolute',
            bottom: '-22px', left: '8%', right: '8%',
            height: '22px',
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, transparent 70%)',
            filter: 'blur(10px)',
          }}
        />
      </div>

      {/* Hint text */}
      <motion.p
        animate={{ opacity: open ? 0 : 0.28 }}
        transition={{ duration: 0.5 }}
        className="mt-10 text-[9px] font-mono text-cyan-500/40 tracking-[0.4em] uppercase"
      >
        click to toggle
      </motion.p>
    </motion.div>
  )
}
