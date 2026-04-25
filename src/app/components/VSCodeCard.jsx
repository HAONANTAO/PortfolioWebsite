'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const FILES = [
  { name: 'rag-chain.ts',  active: true  },
  { name: 'embeddings.ts', active: false },
  { name: 'retriever.ts',  active: false },
  { name: 'route.ts',      active: false },
]

// [text, color]  — VS Code dark+ palette adapted to portfolio theme
const LINES = [
  [['import',  '#569cd6'], [' { ChatOpenAI } ',         '#d4d4d4'], ['from', '#569cd6'], [" 'langchain/chat_models'",   '#ce9178']],
  [['import',  '#569cd6'], [' { PineconeStore } ',      '#d4d4d4'], ['from', '#569cd6'], [" '@langchain/pinecone'",     '#ce9178']],
  [['import',  '#569cd6'], [' { createRetrievalChain }','#d4d4d4'], ['from', '#569cd6'], [" 'langchain/chains'",        '#ce9178']],
  null,
  [['// RAG pipeline — DocuMind',                        '#6a9955']],
  [['export async function', '#569cd6'], [' buildChain', '#dcdcaa'], ['(store: ', '#d4d4d4'], ['PineconeStore', '#4ec9b0'], [') {', '#d4d4d4']],
  [['  const ', '#569cd6'], ['llm ', '#d4d4d4'], ['= new ', '#569cd6'], ['ChatOpenAI', '#4ec9b0'], ['({', '#d4d4d4']],
  [["    modelName: '", '#d4d4d4'], ['gpt-4o-mini', '#ce9178'], ["',", '#d4d4d4']],
  [['    temperature: ', '#d4d4d4'], ['0', '#b5cea8'], [',  streaming: ', '#d4d4d4'], ['true', '#569cd6']],
  [['  })', '#d4d4d4']],
  null,
  [['  const ', '#569cd6'], ['retriever ', '#d4d4d4'], ['= store.', '#d4d4d4'], ['asRetriever', '#dcdcaa'], ['({ k: ', '#d4d4d4'], ['4', '#b5cea8'], [' })', '#d4d4d4']],
  [['  return ', '#569cd6'], ['createRetrievalChain', '#dcdcaa'], ['({ llm, retriever })', '#d4d4d4']],
  [['}', '#d4d4d4']],
  null,
  [['// Stream response with SSE', '#6a9955']],
  [['export async function', '#569cd6'], [' streamAnswer', '#dcdcaa'], ['(chain: ', '#d4d4d4'], ['Chain', '#4ec9b0'], [', q: ', '#d4d4d4'], ['string', '#569cd6'], [') {', '#d4d4d4']],
  [['  const ', '#569cd6'], ['stream ', '#d4d4d4'], ['= await chain.', '#d4d4d4'], ['stream', '#dcdcaa'], ['({ question: q })', '#d4d4d4']],
  [['  for await (const ', '#569cd6'], ['chunk ', '#d4d4d4'], ['of stream) {', '#d4d4d4']],
  [['    process.stdout.', '#d4d4d4'], ['write', '#dcdcaa'], ['(chunk.', '#d4d4d4'], ['answer ', '#9cdcfe'], ['?? ', '#569cd6'], ["''", '#ce9178'], [')', '#d4d4d4']],
  [['  }', '#d4d4d4']],
  [['}', '#d4d4d4']],
]

export default function VSCodeCard() {
  const [visible, setVisible] = useState(0)
  const [blink,   setBlink]   = useState(true)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  // Type lines one by one when in view
  useEffect(() => {
    if (!inView) return
    let cancelled = false
    const tick = (n) => {
      if (cancelled || n >= LINES.length) return
      setTimeout(() => {
        setVisible(n + 1)
        tick(n + 1)
      }, n === 0 ? 400 : 75)
    }
    tick(visible)
    return () => { cancelled = true }
  }, [inView])

  useEffect(() => {
    const t = setInterval(() => setBlink(v => !v), 530)
    return () => clearInterval(t)
  }, [])

  const isDone = visible >= LINES.length

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full rounded-xl overflow-hidden border border-[#1a1a2e]
        shadow-[0_0_60px_rgba(6,182,212,0.07)]"
    >
      {/* ── Title bar ── */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0c0c14] border-b border-[#181828]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[10px] font-mono text-[#444]">DocuMind — Visual Studio Code</span>
        <div className="flex gap-0.5">
          {['—', '⊡', '✕'].map(s => (
            <span key={s} className="text-[#333] text-[10px] w-5 h-4 flex items-center justify-center
              hover:bg-[#1e1e28] rounded-sm transition-colors cursor-default select-none">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* ── Tab bar ── */}
      <div className="flex bg-[#090910] border-b border-[#181828] text-[10px] font-mono">
        <div className="flex items-center gap-2 px-4 py-1.5 bg-[#0d0d18]
          border-r border-[#181828] border-t-[1.5px] border-t-cyan-500/80">
          <span className="text-cyan-400/90">rag-chain.ts</span>
          <span className="text-[#333] cursor-default">×</span>
        </div>
        {['page.tsx', 'layout.ts'].map(f => (
          <div key={f} className="flex items-center gap-2 px-4 py-1.5 border-r border-[#111]">
            <span className="text-[#444]">{f}</span>
          </div>
        ))}
      </div>

      {/* ── Editor body ── */}
      <div className="flex bg-[#0d0d18]" style={{ minHeight: '340px' }}>

        {/* Sidebar */}
        <div className="w-[148px] shrink-0 bg-[#09090f] border-r border-[#161624] py-2 hidden sm:block">
          <p className="text-[8px] font-mono text-[#383848] tracking-[0.25em] px-3 mb-2 uppercase">
            Explorer
          </p>

          <div className="text-[10px] font-mono space-y-0.5 px-1.5">
            {/* Root */}
            <div className="flex items-center gap-1 px-1.5 py-0.5 text-[#555]">
              <span className="text-[8px]">▾</span>
              <span className="text-[8px] tracking-widest text-[#383848] uppercase">DocuMind</span>
            </div>
            {/* src folder */}
            <div className="flex items-center gap-1 pl-4 py-0.5 text-[#555]">
              <span className="text-[8px]">▾</span>
              <span>src</span>
            </div>
            {/* Files */}
            {FILES.map(f => (
              <div key={f.name}
                className={`flex items-center gap-1.5 pl-7 py-[3px] rounded-sm transition-colors
                  ${f.active ? 'bg-cyan-500/10 text-cyan-400/90' : 'text-[#555] hover:text-[#777]'}`}>
                <span className="text-[9px] opacity-60">
                  {f.name.endsWith('.ts') ? '🟦' : '⚛️'}
                </span>
                <span>{f.name}</span>
              </div>
            ))}
            {/* api folder */}
            <div className="flex items-center gap-1 pl-4 py-0.5 text-[#444] mt-1">
              <span className="text-[8px]">▾</span>
              <span>api</span>
            </div>
            <div className="flex items-center gap-1.5 pl-7 py-[3px] text-[#444]">
              <span className="text-[9px] opacity-60">🟦</span>
              <span>route.ts</span>
            </div>
          </div>
        </div>

        {/* Code pane */}
        <div className="flex-1 overflow-hidden py-2 font-mono text-[11.5px] leading-[1.65]">
          {LINES.slice(0, visible).map((tokens, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.12 }}
              className="flex items-center group hover:bg-white/[0.02] pr-4"
            >
              {/* Line number */}
              <span className="w-10 shrink-0 text-right text-[10px] text-[#363648]
                pr-4 select-none group-hover:text-[#555]">
                {i + 1}
              </span>

              {/* Tokens */}
              {tokens === null ? (
                <span className="opacity-0">{'.'}</span>
              ) : (
                <span>
                  {tokens.map(([text, color], j) => (
                    <span key={j} style={{ color }}>{text}</span>
                  ))}
                  {/* Blinking caret on the current line being typed */}
                  {i === visible - 1 && !isDone && (
                    <span
                      className="inline-block w-[5px] h-[13px] ml-px align-middle"
                      style={{
                        background: 'rgba(6,182,212,0.9)',
                        opacity: blink ? 1 : 0,
                        transition: 'opacity 0.08s',
                      }}
                    />
                  )}
                </span>
              )}
            </motion.div>
          ))}

          {/* Idle caret at end after done */}
          {isDone && (
            <div className="flex items-center pl-10">
              <span
                className="inline-block w-[5px] h-[13px] align-middle"
                style={{
                  background: 'rgba(6,182,212,0.7)',
                  opacity: blink ? 1 : 0,
                  transition: 'opacity 0.08s',
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* ── Status bar ── */}
      <div className="flex items-center justify-between px-4 py-1
        bg-cyan-950/30 border-t border-cyan-500/10">
        <div className="flex items-center gap-4 text-[9px] font-mono text-cyan-500/50">
          <span>⎇ main</span>
          <span className="text-emerald-400/60">✓ 0 errors</span>
          <span className="text-[#333]">△ 0 warnings</span>
        </div>
        <div className="flex items-center gap-4 text-[9px] font-mono text-cyan-500/40">
          <span>Ln {Math.max(1, visible)}, Col 1</span>
          <span>TypeScript</span>
          <span>UTF-8</span>
        </div>
      </div>
    </motion.div>
  )
}
