'use client'
import { motion } from 'framer-motion'

const SECTIONS = [
  {
    roman: 'i.',
    label: 'Now',
    icon: '⚗️',
    title: 'Going deep on LangChain + RAG',
    body: 'Studying retrieval pipelines end-to-end — chunking strategies, hybrid search, re-ranking. Less demo-magic, more "why does this actually work in production".',
    active: true,
  },
  {
    roman: 'ii.',
    label: 'Reading',
    icon: '📖',
    title: "Karpathy's second-brain stack",
    body: 'Claude Code + Obsidian — the agent-on-your-notes workflow Andrej Karpathy calls a "second brain". Also tinkering with GPT-Image-2 for visual experiments.',
    quote: '"Memory is finite. Externalizing knowledge is how thought scales."',
  },
  {
    roman: 'iii.',
    label: 'Building',
    icon: '🛠️',
    title: 'DocuMind',
    body: 'Production RAG SaaS — streaming responses, vector search, source-grounded citations. The product I keep iterating on.',
    href: 'https://github.com/HAONANTAO/DocuMind',
    cta: 'See the repo',
  },
]

// Date in roman-style format
const formatRomanDate = () => {
  const now = new Date()
  const month = now.toLocaleDateString('en-US', { month: 'long' })
  const year = now.getFullYear()
  // Convert year to roman numerals (simple)
  const toRoman = (n) => {
    const map = [['M',1000],['CM',900],['D',500],['CD',400],['C',100],['XC',90],['L',50],['XL',40],['X',10],['IX',9],['V',5],['IV',4],['I',1]]
    let r = ''
    for (const [s,v] of map) { while (n >= v) { r += s; n -= v } }
    return r
  }
  return `${month} · ${toRoman(year)}`
}

export default function CurrentlyCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative w-full rounded-2xl overflow-hidden border border-zinc-900/[0.08]
        shadow-[0_12px_40px_-16px_rgba(0,0,0,0.12)]"
      style={{
        // Cream paper with very subtle noise texture
        background: `
          radial-gradient(ellipse at top right, rgba(232,130,92,0.025), transparent 50%),
          radial-gradient(ellipse at bottom left, rgba(13,13,14,0.018), transparent 50%),
          #fdfaf3
        `,
      }}
    >
      {/* Subtle paper grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px',
        }}
      />

      {/* Top decorative ornament */}
      <div className="relative pt-8 pb-2 flex items-center justify-center gap-3">
        <span className="h-px w-12" style={{ background: 'rgba(13,13,14,0.20)' }} />
        <span className="text-zinc-500 text-sm leading-none">✦</span>
        <span className="h-px w-12" style={{ background: 'rgba(13,13,14,0.20)' }} />
      </div>

      {/* Header */}
      <div className="relative px-8 pb-6 text-center">
        <p className="serif-italic text-xs text-zinc-500 mb-2 tracking-wider">
          Field Notes
        </p>
        <h3 className="serif-italic text-[32px] leading-tight font-normal text-zinc-900 mb-2">
          What's on my desk.
        </h3>
        <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 tabular-nums">
          {formatRomanDate()}
        </p>
      </div>

      {/* Sections */}
      <div className="relative px-8">
        {SECTIONS.map((s, i) => (
          <motion.article
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
            className="relative"
          >
            {/* Section divider ornament (between sections only) */}
            {i > 0 && (
              <div className="flex items-center justify-center gap-3 py-6">
                <span className="h-px w-8" style={{ background: 'rgba(13,13,14,0.10)' }} />
                <span className="text-zinc-300 text-xs leading-none select-none">✦</span>
                <span className="h-px w-8" style={{ background: 'rgba(13,13,14,0.10)' }} />
              </div>
            )}

            <div className={i === 0 ? 'pt-2 pb-2' : 'pb-2'}>

              {/* Roman numeral + label */}
              <div className="flex items-baseline gap-2.5 mb-2.5">
                <span
                  className="serif-italic text-base text-zinc-400 leading-none w-7 shrink-0"
                  style={{ color: s.active ? 'var(--accent)' : undefined }}>
                  {s.roman}
                </span>
                <span
                  className="serif-italic text-base text-zinc-500 leading-none"
                  style={{ color: s.active ? 'var(--accent)' : undefined }}>
                  {s.label}
                </span>
                {s.active && (
                  <span className="relative flex h-1 w-1 ml-1 self-center">
                    <span className="ping-slow absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ background: 'var(--accent)' }} />
                    <span className="relative inline-flex h-1 w-1 rounded-full"
                      style={{ background: 'var(--accent)' }} />
                  </span>
                )}
                <span className="ml-auto text-base opacity-70 select-none leading-none">
                  {s.icon}
                </span>
              </div>

              {/* Title */}
              <h4 className="serif text-[20px] font-normal text-zinc-900 leading-snug mb-2 pl-[2.4rem]">
                {s.title}
              </h4>

              {/* Body */}
              <p className="serif-italic text-[14px] text-zinc-600 leading-[1.75] pl-[2.4rem]">
                {s.body}
              </p>

              {/* Pull quote (if any) */}
              {s.quote && (
                <div className="mt-3 ml-[2.4rem] -translate-x-[2.4rem] pl-[2.4rem]">
                  <blockquote
                    className="serif-italic text-[14px] text-zinc-700 leading-relaxed
                      border-l-2 pl-3.5"
                    style={{ borderColor: 'var(--accent)' }}>
                    {s.quote}
                  </blockquote>
                  {s.attribution && (
                    <p className="text-[11px] text-zinc-400 pl-3.5 mt-1.5 tracking-wide">
                      {s.attribution}
                    </p>
                  )}
                </div>
              )}

              {/* CTA */}
              {s.href && (
                <a
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="serif-italic inline-flex items-center gap-1 mt-3 ml-[2.4rem] text-[13px] text-zinc-700
                    hover:text-[color:var(--accent)] transition-colors group/cta border-b border-zinc-300
                    hover:border-[color:var(--accent)] pb-0.5"
                >
                  — {s.cta}
                  <span className="transition-transform group-hover/cta:translate-x-0.5">→</span>
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>

      {/* Bottom ornament */}
      <div className="relative pt-8 pb-2 flex items-center justify-center gap-3">
        <span className="h-px w-12" style={{ background: 'rgba(13,13,14,0.20)' }} />
        <span className="text-zinc-500 text-sm leading-none">✦</span>
        <span className="h-px w-12" style={{ background: 'rgba(13,13,14,0.20)' }} />
      </div>

      {/* Footer — handwritten signature with stamp-like date */}
      <div className="relative px-8 pb-7 pt-2 flex items-end justify-between">
        <p className="serif-italic text-[12px] text-zinc-400 leading-relaxed">
          Always under<br />construction.
        </p>
        <div className="flex flex-col items-end relative">
          <span className="signature text-[28px] text-zinc-800 leading-none">
            Aaron
          </span>
          {/* Stamp-like date */}
          <div
            className="mt-2 px-2 py-0.5 text-[8px] uppercase tracking-[0.2em] tabular-nums
              border rotate-[-3deg] select-none"
            style={{
              borderColor: 'var(--accent)',
              color: 'var(--accent)',
            }}
          >
            {new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
          </div>
        </div>
      </div>

      {/* Page number bottom-right corner */}
      <div className="absolute bottom-2 right-3 serif-italic text-[10px] text-zinc-300 select-none">
        — i —
      </div>
    </motion.div>
  )
}
