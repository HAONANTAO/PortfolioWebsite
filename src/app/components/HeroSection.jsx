'use client'
import React from 'react'
import Image from 'next/image'
import { TypeAnimation } from 'react-type-animation'
import { motion } from 'framer-motion'

const orbitBadges = [
  { label: 'LangChain',     angle: 15,  r: 215 },
  { label: 'OpenAI API',    angle: 65,  r: 200 },
  { label: 'TypeScript',    angle: 120, r: 210 },
  { label: 'React',         angle: 170, r: 205 },
  { label: 'Node.js',       angle: 220, r: 212 },
  { label: 'AWS',           angle: 270, r: 200 },
  { label: 'Next.js',       angle: 325, r: 208 },
]

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

          {/* System status pill */}
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

          {/* Main heading */}
          <h1 className="mb-4 text-4xl font-extrabold sm:text-5xl lg:text-7xl lg:leading-tight">
            <span className="gradient-text-animated">Hello, I'm</span>
            <br />
            <span className="text-white">
              <TypeAnimation
                sequence={[
                  'Aaron TAO',            1500,
                  'AI Engineer',          1200,
                  'Full Stack Developer', 1200,
                ]}
                wrapper="span"
                speed={55}
                repeat={Infinity}
              />
              <span className="inline-block w-0.5 h-[0.9em] bg-cyan-400 ml-1 animate-pulse align-middle" />
            </span>
          </h1>

          {/* Sub tagline */}
          <p className="text-[#ADB7BE] text-base mb-2 sm:text-lg max-w-lg">
            Building intelligent, production-grade applications that leverage
            <span className="text-cyan-400"> LLMs</span>,
            <span className="text-violet-400"> generative AI</span>, and
            <span className="text-emerald-400"> modern full-stack architecture</span>.
          </p>

          {/* Decorative divider */}
          <div className="flex items-center gap-3 mb-7 mt-5">
            <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-cyan-500/70 to-transparent" />
            <span className="text-[10px] font-mono text-cyan-500/50 tracking-[0.2em] uppercase">
              AI × Full Stack × Cloud
            </span>
            <div className="h-px w-8 bg-violet-500/40" />
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a href="/PDFs/Resume0913.pdf">
              <button className="group relative px-6 py-3 text-white rounded-full font-medium overflow-hidden
                bg-gradient-to-r from-cyan-500 to-violet-600
                hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] hover:scale-105 active:scale-95 transition-all duration-300">
                <span className="relative z-10">Download Resume</span>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10"> ↗</span>
              </button>
            </a>
            <a href="#projects">
              <button className="px-6 py-3 text-cyan-400 rounded-full font-medium
                border border-cyan-500/40 bg-transparent
                hover:border-cyan-400 hover:bg-cyan-500/8
                hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]
                hover:scale-105 active:scale-95 transition-all duration-300">
                Explore Projects →
              </button>
            </a>
          </div>

          {/* Mini tech stack row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-2 mt-8">
            {['Python', 'OpenAI', 'LangChain', 'React', 'Next.js', 'AWS'].map(t => (
              <span key={t} className="text-[10px] font-mono text-[#666] border border-[#222] rounded px-1.5 py-0.5 hover:text-cyan-500/80 hover:border-cyan-500/30 transition-colors cursor-default">
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

          <div className="relative" style={{ width: 340, height: 340 }}>
            {/* Outer orbit */}
            <div
              className="absolute rounded-full border border-dashed border-cyan-500/12"
              style={{ inset: '-42px' }}
            />
            {/* Rotating dot on orbit */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
              className="absolute rounded-full"
              style={{ inset: '-42px' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
                w-3 h-3 rounded-full bg-cyan-400
                shadow-[0_0_12px_2px_rgba(6,182,212,0.9)]" />
            </motion.div>
            {/* Counter-rotating dot (violet) */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="absolute rounded-full"
              style={{ inset: '-42px' }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2
                w-2 h-2 rounded-full bg-violet-400
                shadow-[0_0_10px_2px_rgba(139,92,246,0.8)]" />
            </motion.div>

            {/* Floating tech badges */}
            {orbitBadges.map(({ label, angle, r }) => {
              const rad = (angle * Math.PI) / 180
              const cx = 170 + r * Math.cos(rad)
              const cy = 170 + r * Math.sin(rad)
              return (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + angle / 700, duration: 0.4 }}
                  className="absolute -translate-x-1/2 -translate-y-1/2
                    px-2 py-0.5 text-[9px] font-mono rounded-full
                    border border-cyan-500/25 bg-[#060608]/90 text-cyan-400/70
                    hover:border-cyan-400 hover:text-cyan-300
                    hover:shadow-[0_0_12px_rgba(6,182,212,0.5)]
                    transition-all duration-200 cursor-default select-none whitespace-nowrap"
                  style={{ left: cx, top: cy }}>
                  {label}
                </motion.div>
              )
            })}

            {/* Avatar */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[280px] h-[280px] rounded-full overflow-hidden
                border border-cyan-500/20
                shadow-[0_0_60px_rgba(6,182,212,0.15),inset_0_0_40px_rgba(6,182,212,0.04)]
                scan-overlay">
                <Image
                  src="/images/image1.jpg"
                  alt="Aaron TAO"
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  width={300}
                  height={300}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
