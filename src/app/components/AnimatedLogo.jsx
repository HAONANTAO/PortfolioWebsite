'use client'
import { motion } from 'framer-motion'

export default function AnimatedLogo() {
  return (
    <motion.div
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      className="relative flex items-center justify-center group cursor-pointer"
      style={{ width: 52, height: 44 }}
    >
      {/* Spinning conic gradient border */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-xl"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0deg, rgba(6,182,212,0.95) 55deg, rgba(139,92,246,0.65) 110deg, transparent 170deg)',
        }}
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: '0 0 22px rgba(6,182,212,0.35), 0 0 44px rgba(139,92,246,0.12)' }}
      />

      {/* Inner dark background */}
      <div className="absolute inset-[1.5px] rounded-[10px] bg-[#060608]" />

      {/* TAO text */}
      <span
        className="relative z-10 font-extrabold font-mono gradient-text-animated tracking-widest select-none"
        style={{ fontSize: 11, letterSpacing: '0.18em' }}
      >
        TAO
      </span>

      {/* Corner brackets on hover */}
      <div className="absolute inset-[-4px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <span className="absolute top-0 left-0 w-3 h-3 border-t-[1.5px] border-l-[1.5px] border-cyan-400 rounded-tl-sm" />
        <span className="absolute top-0 right-0 w-3 h-3 border-t-[1.5px] border-r-[1.5px] border-cyan-400 rounded-tr-sm" />
        <span className="absolute bottom-0 left-0 w-3 h-3 border-b-[1.5px] border-l-[1.5px] border-cyan-400 rounded-bl-sm" />
        <span className="absolute bottom-0 right-0 w-3 h-3 border-b-[1.5px] border-r-[1.5px] border-cyan-400 rounded-br-sm" />
      </div>
    </motion.div>
  )
}
