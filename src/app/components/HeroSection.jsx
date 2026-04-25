'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import AiCore from './AiCore'
import MagneticWrapper from './MagneticWrapper'

// Badges sit just outside AiCore (container=460, center=230, r=210)
const orbitBadges = [
  { label: 'LangChain',    angle: 10  },
  { label: 'OpenAI API',   angle: 60  },
  { label: 'TypeScript',   angle: 115 },
  { label: 'React',        angle: 165 },
  { label: 'Node.js',      angle: 215 },
  { label: 'AWS',          angle: 268 },
  { label: 'Next.js',      angle: 320 },
]
const BADGE_R  = 210
const BADGE_CX = 230
const BADGE_CY = 230

const HeroSection = () => {
  return (
    <section className="lg:py-16 relative overflow-visible">
      {/* Ambient blobs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-cyan-500/6 blur-[120px] animate-float pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-violet-500/6 blur-[100px] animate-float pointer-events-none" style={{ animationDelay: '3s' }} />

      <div className="grid grid-cols-1 sm:grid-cols-12 relative z-10 gap-8 items-center">

        {/* ── Left ── */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="col-span-7 text-center place-self-center sm:text-left">

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/5 text-[11px] font-mono text-cyan-400/80">
            <span className="relative flex h-2 w-2">
              <span className="ping-slow absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,1)]" />
            </span>
            SYS_STATUS: OPEN_TO_OPPORTUNITIES
          </motion.div>

          <h1 className="mb-3 text-4xl font-extrabold sm:text-5xl lg:text-7xl lg:leading-tight">
            <span className="gradient-text-animated">Hello, I'm</span>
            <br />
            <span className="text-white">Aaron TAO</span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-white/90 mb-5 leading-snug max-w-lg">
            I build{' '}
            <span className="text-cyan-400">AI-powered products</span>
            {' '}— from{' '}
            <span className="text-violet-400">LLM pipelines</span>
            {' '}to the{' '}
            <span className="text-emerald-400">App Store</span>.
          </p>

          <p className="text-[#ADB7BE] text-sm sm:text-base mb-2 max-w-lg leading-relaxed">
            Melbourne-trained full-stack engineer. Shipped a{' '}
            <span className="text-emerald-400 font-medium">finance app to the App Store solo</span>,
            built a{' '}
            <span className="text-violet-400 font-medium">production RAG SaaS</span>,
            and obsessed with closing the gap between LLM demos and real-world products.
          </p>

          <div className="flex items-center gap-3 mb-7 mt-5">
            <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-cyan-500/70 to-transparent" />
            <span className="text-[10px] font-mono text-cyan-500/50 tracking-[0.2em] uppercase">
              AI · Full Stack · Mobile · Cloud
            </span>
            <div className="h-px w-8 bg-violet-500/40" />
          </div>

          <div className="flex flex-wrap gap-3">
            <MagneticWrapper>
              <a href="/PDFs/Resume0913.pdf">
                <button className="group relative px-6 py-3 text-white rounded-full font-medium overflow-hidden
                  bg-gradient-to-r from-cyan-500 to-violet-600
                  hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] active:scale-95 transition-all duration-300">
                  <span className="relative z-10">Download Resume ↗</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </a>
            </MagneticWrapper>
            <MagneticWrapper>
              <a href="#projects">
                <button className="px-6 py-3 text-cyan-400 rounded-full font-medium
                  border border-cyan-500/40 bg-transparent
                  hover:border-cyan-400 hover:bg-cyan-500/8
                  hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]
                  active:scale-95 transition-all duration-300">
                  Explore Projects →
                </button>
              </a>
            </MagneticWrapper>
          </div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="flex items-center gap-4 mt-6"
          >
            <span className="text-[10px] font-mono text-[#444] tracking-widest">FIND ME</span>
            <div className="h-px w-6 bg-[#222]" />
            {[
              { href: 'https://github.com/HAONANTAO', src: '/images/icons/github-icon.svg', label: 'GitHub' },
              { href: 'https://www.linkedin.com/in/haonan-tao-4a9855270/', src: '/images/icons/linkedin-icon.svg', label: 'LinkedIn' },
            ].map(({ href, src, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 flex items-center justify-center rounded-full
                  border border-[#1e1e1e] bg-[#0a0a10]
                  hover:border-cyan-500/40 hover:shadow-[0_0_14px_rgba(6,182,212,0.3)]
                  transition-all duration-200"
                aria-label={label}
              >
                <Image src={src} alt={label} width={18} height={18} className="opacity-60 hover:opacity-100 transition-opacity" />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-2 mt-8">
            {['Python', 'OpenAI', 'LangChain', 'React', 'Next.js', 'AWS'].map(t => (
              <span key={t} className="text-[10px] font-mono text-[#555] border border-[#1e1e1e] rounded px-1.5 py-0.5 hover:text-cyan-500/80 hover:border-cyan-500/30 transition-colors cursor-default">
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right ── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="col-span-5 mt-4 place-self-center lg:mt-0">

          {/* Container: small on mobile, full on desktop */}
          <div className="relative w-[300px] h-[300px] lg:w-[460px] lg:h-[460px]">

            {/* Floating tech badges — desktop only */}
            {orbitBadges.map(({ label, angle }) => {
              const rad = (angle * Math.PI) / 180
              const x   = BADGE_CX + BADGE_R * Math.cos(rad)
              const y   = BADGE_CY + BADGE_R * Math.sin(rad)
              return (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + angle / 800, duration: 0.35 }}
                  className="hidden lg:block absolute z-10 -translate-x-1/2 -translate-y-1/2
                    px-2 py-0.5 text-[9px] font-mono rounded-full
                    border border-cyan-500/25 bg-[#060608]/90 text-cyan-400/70
                    hover:border-cyan-400 hover:text-cyan-300
                    hover:shadow-[0_0_12px_rgba(6,182,212,0.5)]
                    transition-all duration-200 cursor-default select-none whitespace-nowrap"
                  style={{ left: x, top: y }}>
                  {label}
                </motion.div>
              )
            })}

            {/* AiCore centered */}
            <div className="absolute inset-0 flex items-center justify-center">
              <AiCore />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default HeroSection
