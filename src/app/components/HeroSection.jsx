'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import AiCore from './AiCore'

// AI concepts orbiting the globe — paper-style tags
const FLOATING_TAGS = [
  { label: 'RAG',        top: '8%',   left: '-6%',  delay: 0.5 },
  { label: 'AI Agents',  top: '24%',  left: '92%',  delay: 0.7 },
  { label: 'LLMs',       top: '70%',  left: '-2%',  delay: 0.9 },
  { label: 'Embeddings', top: '85%',  left: '78%',  delay: 1.1 },
]

const HeroSection = () => {
  return (
    <section className="py-20 lg:py-28 relative">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

        {/* ── Left: typography ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="lg:col-span-7 max-w-2xl">

          {/* Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-8 text-xs"
            style={{ color: 'var(--ink-3)' }}>
            <span className="relative flex h-1.5 w-1.5">
              <span className="ping-slow absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Available for full-time roles
          </motion.div>

          {/* Name */}
          <h1 className="font-semibold tracking-tight leading-[1.05] mb-8">
            <span className="block text-base sm:text-lg font-medium mb-3" style={{ color: 'var(--ink-3)' }}>
              Hi, I'm
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl" style={{ color: 'var(--ink)' }}>
              Aaron Tao.
            </span>
            <span className="serif-italic block text-4xl sm:text-5xl lg:text-6xl mt-3 font-normal" style={{ color: 'var(--ink-2)' }}>
              I build AI products that ship.
            </span>
          </h1>

          {/* Lede */}
          <p className="text-base sm:text-lg leading-relaxed max-w-xl mb-3" style={{ color: 'var(--ink-2)' }}>
            Full-stack engineer based in Melbourne. Solo-shipped a finance app to the App Store,
            built a production RAG SaaS with streaming responses and vector search.
          </p>
          <p className="text-base sm:text-lg leading-relaxed max-w-xl mb-8" style={{ color: 'var(--ink-2)' }}>
            Obsessed with closing the gap between LLM demos and real-world products.
          </p>

          {/* Currently building strip */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-3 mb-10 px-3.5 py-2 rounded-md
              border border-zinc-900/10 bg-white/60 w-fit max-w-full">
            <span className="text-[10px] uppercase tracking-widest text-zinc-400 shrink-0">Now</span>
            <span className="h-3 w-px bg-zinc-900/15" />
            <span className="text-sm text-zinc-700">
              ⚗️ Going deep on <span className="font-medium" style={{ color: 'var(--accent)' }}>LangChain + RAG</span>
            </span>
          </motion.div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <a
              href="/PDFs/resume0428.docx"
              className="cta-resume px-5 py-2.5 text-sm font-medium text-white rounded-md transition-colors"
              style={{ background: 'var(--ink)' }}>
              Download résumé
            </a>
            <a
              href="#projects"
              className="cta-secondary px-5 py-2.5 text-sm font-medium rounded-md border transition-colors"
              style={{ borderColor: 'var(--line)', color: 'var(--ink-2)' }}>
              View projects →
            </a>
          </div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-5"
          >
            {[
              { href: 'https://github.com/HAONANTAO', src: '/images/icons/github-icon.svg', label: 'GitHub' },
              { href: 'https://www.linkedin.com/in/haonan-tao-4a9855270/', src: '/images/icons/linkedin-icon.svg', label: 'LinkedIn' },
            ].map(({ href, src, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="opacity-60 hover:opacity-100 transition-opacity">
                <Image src={src} alt={label} width={18} height={18} />
              </a>
            ))}
            <a
              href="mailto:taoaaron5@gmail.com"
              className="text-xs hover:underline transition-colors"
              style={{ color: 'var(--ink-3)' }}>
              taoaaron5@gmail.com
            </a>
          </motion.div>

        </motion.div>

        {/* ── Right: globe with floating tags ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <div className="relative">
            {/* Soft ambient glow behind globe */}
            <div className="absolute inset-0 -m-8 rounded-full pointer-events-none
              bg-gradient-radial from-cyan-200/30 via-blue-100/10 to-transparent blur-2xl"
              style={{ background: 'radial-gradient(circle, rgba(125,211,252,0.18) 0%, rgba(186,230,253,0.06) 35%, transparent 70%)' }} />

            <AiCore />

            {/* Floating tags around the globe */}
            <div className="hidden lg:block absolute inset-0 pointer-events-none">
              {FLOATING_TAGS.map(({ label, top, left, delay }) => (
                <motion.span
                  key={label}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay, ease: 'easeOut' }}
                  className="absolute -translate-x-1/2 -translate-y-1/2
                    px-2 py-0.5 text-[10px] tracking-wide
                    rounded-full bg-white/85 border border-zinc-900/10
                    text-zinc-700 shadow-[0_2px_6px_rgba(0,0,0,0.04)]
                    pointer-events-auto select-none cursor-default
                    backdrop-blur-sm"
                  style={{ top, left }}
                >
                  <motion.span
                    animate={{ y: [0, -3, 0] }}
                    transition={{
                      duration: 3 + delay,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay,
                    }}
                    className="inline-block"
                  >
                    {label}
                  </motion.span>
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default HeroSection
