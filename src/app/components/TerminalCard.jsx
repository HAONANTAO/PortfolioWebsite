'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const commits = [
  { hash: 'a3f1c2e', type: 'feat',  color: 'text-emerald-400', label: 'DocuMind',          desc: 'RAG-powered document SaaS',        time: '2 days ago'   },
  { hash: 'b7d209a', type: 'ship',  color: 'text-cyan-400',    label: 'Wage Dashboard',    desc: 'management analytics platform',    time: '1 week ago'   },
  { hash: 'c91ef34', type: 'feat',  color: 'text-violet-400',  label: 'Mock AI ChatBot',   desc: 'GPT-3.5 powered chat interface',   time: '3 weeks ago'  },
  { hash: 'd44ba12', type: 'ship',  color: 'text-sky-400',     label: 'Money Recorder',    desc: 'iOS finance app · App Store live', time: '1 month ago'  },
  { hash: 'e03c871', type: 'feat',  color: 'text-amber-400',   label: 'All Storage',       desc: 'cloud file management platform',   time: '2 months ago' },
  { hash: 'f8a2d56', type: 'feat',  color: 'text-cyan-400',    label: 'Evently',           desc: 'event platform · Stripe + Clerk',  time: '3 months ago' },
  { hash: 'g12c390', type: 'fix',   color: 'text-pink-400',    label: 'Issue Tracker',     desc: 'Next.js project management app',   time: '4 months ago' },
  { hash: 'h77f021', type: 'feat',  color: 'text-emerald-400', label: 'Mock Threads',      desc: 'social platform · MongoDB + SSR',  time: '5 months ago' },
]

const statusLine = [
  { t: 'On branch ', c: 'text-[#666]' },
  { t: 'main', c: 'text-cyan-400' },
  { t: '  ·  ', c: 'text-[#444]' },
  { t: '✓ ', c: 'text-emerald-400' },
  { t: 'nothing to commit', c: 'text-[#666]' },
  { t: '  ·  ', c: 'text-[#444]' },
  { t: 'currently building: ', c: 'text-[#666]' },
  { t: 'AI Agents', c: 'text-violet-400' },
]

export default function TerminalCard() {
  const [visible, setVisible] = useState(0)
  const [cursor, setCursor] = useState(true)

  useEffect(() => {
    if (visible < commits.length) {
      const t = setTimeout(() => setVisible(v => v + 1), 120)
      return () => clearTimeout(t)
    }
  }, [visible])

  useEffect(() => {
    const t = setInterval(() => setCursor(v => !v), 530)
    return () => clearInterval(t)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl overflow-hidden border border-[#1a1a2e] shadow-[0_0_50px_rgba(6,182,212,0.07)] w-full">

      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0d0d18] border-b border-[#1a1a2e]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-amber-500/70" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
        </div>
        <span className="text-[11px] font-mono text-[#555]">git log --oneline</span>
        <span className="text-[9px] font-mono text-cyan-500/40 bg-cyan-500/8 px-2 py-0.5 rounded">
          {commits.length} commits
        </span>
      </div>

      {/* Command line */}
      <div className="px-4 py-2.5 bg-[#080810] border-b border-[#111] flex items-center gap-2">
        <span className="text-cyan-500 text-xs font-mono">❯</span>
        <span className="text-[#ADB7BE] text-xs font-mono">git log --all --pretty=format:</span>
        <span className={`inline-block w-[6px] h-[12px] bg-cyan-400 ${cursor ? 'opacity-100' : 'opacity-0'} transition-opacity`} />
      </div>

      {/* Commits */}
      <div className="bg-[#080810] px-4 py-3 space-y-0.5 min-h-[320px]">
        {commits.slice(0, visible).map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-white/[0.03] transition-colors group cursor-default">

            {/* Hash */}
            <span className="text-[#444] text-[10px] font-mono w-14 shrink-0 group-hover:text-[#666] transition-colors">
              {c.hash}
            </span>

            {/* Type badge */}
            <span className={`text-[9px] font-mono w-8 shrink-0 ${c.color} opacity-80`}>
              {c.type}
            </span>

            {/* Graph dot */}
            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${c.color} opacity-60 group-hover:opacity-100 group-hover:shadow-[0_0_6px_currentColor] transition-all`} />

            {/* Label + desc */}
            <div className="flex items-baseline gap-2 min-w-0">
              <span className={`text-xs font-mono font-semibold shrink-0 ${c.color}`}>
                {c.label}
              </span>
              <span className="text-[#555] text-[11px] truncate group-hover:text-[#777] transition-colors">
                {c.desc}
              </span>
            </div>

            {/* Time */}
            <span className="text-[#333] text-[10px] font-mono ml-auto shrink-0 group-hover:text-[#555] transition-colors">
              {c.time}
            </span>
          </motion.div>
        ))}

        {/* Loading indicator while typing */}
        {visible < commits.length && (
          <div className="flex items-center gap-2 px-2 py-1.5">
            <div className="flex gap-1">
              {[0,1,2].map(i => (
                <div key={i} className="w-1 h-1 rounded-full bg-cyan-500/40 animate-pulse" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-[#0d0d18] border-t border-[#1a1a2e]">
        <div className="flex items-center gap-1 text-[10px] font-mono flex-wrap">
          {statusLine.map((s, i) => (
            <span key={i} className={s.c}>{s.t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
