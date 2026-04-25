'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

// Two Q&A cycles that rotate — shows breadth of AI knowledge
const CYCLES = [
  {
    q: "RAG vs fine-tuning — when do you use each?",
    lines: [
      ["Depends on the use case:",           'plain'  ],
      ["",                                   'blank'  ],
      ["  RAG  → dynamic / cited knowledge", 'code'   ],
      ["  Fine-tune → style & format adapt", 'code'   ],
      ["",                                   'blank'  ],
      ["  I default to RAG because:",        'plain'  ],
      ["  ❯ No retraining on data updates",  'sub'    ],
      ["  ❯ Source citations built-in",      'sub'    ],
      ["  ❯ Lower infra cost at scale",      'sub'    ],
      ["",                                   'blank'  ],
      ["  Fine-tune only for tone/format ✓", 'result' ],
    ],
  },
  {
    q: "How do you reduce LLM hallucinations?",
    lines: [
      ["Multi-layer mitigation stack:",      'plain'  ],
      ["",                                   'blank'  ],
      ["  ❯ Grounding: RAG + cited sources", 'code'   ],
      ["  ❯ Temperature → 0 for factual",    'code'   ],
      ["  ❯ Output schema: Zod validation",  'code'   ],
      ["  ❯ Self-check: LLM-as-judge pass",  'code'   ],
      ["",                                   'blank'  ],
      ["  Confidence score threshold: 0.82", 'plain'  ],
      ["  Hallucination rate: < 3 %  ✓",    'result' ],
    ],
  },
  {
    q: "How does an AI Agent loop work?",
    lines: [
      ["ReAct: Reason → Act → Observe:",     'plain'  ],
      ["",                                   'blank'  ],
      ["  ❯ Planner  : LLM picks next tool", 'code'   ],
      ["  ❯ Tools    : search, code, APIs",  'code'   ],
      ["  ❯ Memory   : short + long-term",   'code'   ],
      ["  ❯ Guard    : max steps + timeout", 'code'   ],
      ["",                                   'blank'  ],
      ["  Loop exits when goal satisfied",   'plain'  ],
      ["  ❯ or human-in-the-loop review",    'sub'    ],
      ["",                                   'blank'  ],
      ["  Stack: LangGraph + MCP  ✓",        'result' ],
    ],
  },
]

export default function AIChatDemo() {
  const [cycleIdx, setCycleIdx] = useState(0)
  const [phase,    setPhase]    = useState(0)   // 0 idle 1 user 2 thinking 3 typing 4 done
  const [chars,    setChars]    = useState(0)
  const [blink,    setBlink]    = useState(true)
  const timers  = useRef([])
  const ticker  = useRef(null)
  const ref     = useRef(null)
  const inView  = useInView(ref, { once: false, margin: '-80px' })

  const stop = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    clearInterval(ticker.current)
  }, [])

  const later = useCallback((fn, ms) => {
    const id = setTimeout(fn, ms)
    timers.current.push(id)
  }, [])

  const runCycle = useCallback((idx) => {
    stop()
    const cycle = CYCLES[idx % CYCLES.length]
    const flat  = cycle.lines.map(([t]) => t).join('\n')

    setPhase(0); setChars(0)

    later(() => setPhase(1), 500)
    later(() => setPhase(2), 1600)
    later(() => {
      setPhase(3)
      let c = 0
      ticker.current = setInterval(() => {
        c += 2
        const clamped = Math.min(c, flat.length)
        setChars(clamped)
        if (clamped >= flat.length) {
          clearInterval(ticker.current)
          setPhase(4)
          // Switch to next cycle
          later(() => {
            setCycleIdx(i => {
              const next = (i + 1) % CYCLES.length
              runCycle(next)
              return next
            })
          }, 5000)
        }
      }, 28)
    }, 2700)
  }, [stop, later])

  useEffect(() => {
    if (inView) runCycle(0)
    else stop()
    return stop
  }, [inView])  // eslint-disable-line

  useEffect(() => {
    const t = setInterval(() => setBlink(v => !v), 530)
    return () => clearInterval(t)
  }, [])

  const cycle = CYCLES[cycleIdx % CYCLES.length]
  const flat  = cycle.lines.map(([t]) => t).join('\n')

  const lines = (() => {
    let rem = chars
    return cycle.lines.map(([text, style]) => {
      const shown = text.slice(0, Math.max(0, rem))
      rem = Math.max(0, rem - text.length - 1)
      return { text, shown, style }
    })
  })()

  let activeIdx = -1
  lines.forEach(({ text, shown }, i) => {
    if (text.length > 0 && shown.length > 0 && shown.length < text.length) activeIdx = i
  })

  const styleClass = (s) =>
    s === 'code'   ? 'text-emerald-400/90' :
    s === 'sub'    ? 'text-sky-400/80'     :
    s === 'result' ? 'text-cyan-400 font-semibold' :
                     'text-[#7788aa]'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full rounded-2xl overflow-hidden border border-[#181828]
        shadow-[0_0_60px_rgba(6,182,212,0.09)] bg-[#080810]"
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0b0b16] border-b border-[#161624]">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-[11px]
              font-extrabold text-white tracking-wide
              bg-gradient-to-br from-cyan-500 to-violet-600
              shadow-[0_0_16px_rgba(6,182,212,0.5)]">
              AI
            </div>
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full
                bg-emerald-400 border-2 border-[#0b0b16]
                shadow-[0_0_8px_rgba(52,211,153,0.8)]"
            />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-white leading-none">Aaron's AI Assistant</p>
            <p className="text-[9px] font-mono text-emerald-400/70 mt-0.5">
              ● Online · Knowledge base loaded
            </p>
          </div>
        </div>

        {/* Cycle indicator dots */}
        <div className="flex items-center gap-2">
          {CYCLES.map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300
              ${cycleIdx % CYCLES.length === i ? 'bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]' : 'bg-[#333]'}`} />
          ))}
          <span className="text-[8px] font-mono text-[#333] ml-1">
            {cycleIdx % CYCLES.length + 1}/{CYCLES.length}
          </span>
        </div>
      </div>

      {/* ── Topic badge ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={cycleIdx}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.2 }}
          className="px-4 pt-3 pb-0"
        >
          <span className="text-[9px] font-mono text-violet-400/50 tracking-[0.25em] uppercase">
            {['// LLM_STRATEGY', '// RELIABILITY_PATTERNS', '// AGENT_ARCHITECTURE'][cycleIdx % CYCLES.length]}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* ── Messages ── */}
      <div className="px-4 pt-3 pb-4 space-y-4" style={{ minHeight: 310 }}>

        {/* User bubble */}
        <AnimatePresence mode="wait">
          {phase >= 1 && (
            <motion.div
              key={`user-${cycleIdx}`}
              initial={{ opacity: 0, x: 22, y: 6 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.28 }}
              className="flex justify-end"
            >
              <div className="max-w-[80%] px-3.5 py-2.5 rounded-2xl rounded-tr-sm
                font-mono text-[12px] leading-relaxed text-cyan-50/90
                bg-gradient-to-br from-cyan-500/20 to-violet-500/12
                border border-cyan-500/24">
                {cycle.q}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Thinking dots */}
        <AnimatePresence>
          {phase === 2 && (
            <motion.div
              key="thinking"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              className="flex items-center gap-2.5"
            >
              <div className="w-7 h-7 shrink-0 rounded-full flex items-center justify-center text-[11px]
                bg-gradient-to-br from-cyan-500/22 to-violet-600/22 border border-cyan-500/18">
                🤖
              </div>
              <div className="flex gap-1.5 px-3.5 py-2.5 rounded-2xl rounded-tl-sm
                bg-[#0e0e1e] border border-[#1c1c2c]">
                {[0, 1, 2].map(i => (
                  <motion.div key={i}
                    animate={{ y: [0, -5, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.72, repeat: Infinity, delay: i * 0.18 }}
                    className="w-1.5 h-1.5 rounded-full bg-cyan-400/70"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI response */}
        <AnimatePresence>
          {phase >= 3 && chars > 0 && (
            <motion.div
              key={`ai-${cycleIdx}`}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-start gap-2.5"
            >
              <div className="w-7 h-7 mt-1 shrink-0 rounded-full flex items-center justify-center text-[11px]
                bg-gradient-to-br from-cyan-500/22 to-violet-600/22 border border-cyan-500/18">
                🤖
              </div>
              <div className="flex-1 px-3.5 py-3 rounded-2xl rounded-tl-sm
                bg-[#0d0d1e] border border-[#181828]
                shadow-[inset_0_0_24px_rgba(6,182,212,0.025)]">
                {lines.map(({ text, shown, style }, i) => {
                  if (style === 'blank') return <div key={i} className="h-1.5" />
                  if (!shown) return null
                  return (
                    <div key={i} className={`font-mono text-[11.5px] leading-[1.75] ${styleClass(style)}`}>
                      {shown}
                      {i === activeIdx && (
                        <span className="inline-block w-[5px] h-[12px] ml-px align-middle bg-cyan-400/85"
                          style={{ opacity: blink ? 1 : 0, transition: 'opacity 0.08s' }} />
                      )}
                    </div>
                  )
                })}
                {phase === 4 && (
                  <span className="inline-block w-[5px] h-[12px] align-middle bg-cyan-400/55 ml-px"
                    style={{ opacity: blink ? 1 : 0, transition: 'opacity 0.08s' }} />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Input bar ── */}
      <div className="px-4 py-3 border-t border-[#111120] flex items-center gap-3">
        <div className="flex-1 px-3.5 py-2 rounded-xl bg-[#0a0a16] border border-[#1a1a2c]
          text-[10px] font-mono text-[#22223a] select-none">
          Ask about AI architecture...
        </div>
        <motion.button
          whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
          className="shrink-0 px-3.5 py-2 rounded-xl bg-cyan-500/8 border border-cyan-500/22
            text-[10px] font-mono text-cyan-400/65 hover:bg-cyan-500/15 transition-colors">
          Send ↗
        </motion.button>
      </div>
    </motion.div>
  )
}
