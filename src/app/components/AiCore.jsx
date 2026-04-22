'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const S = 420
const R = 112  // earth radius
const CX = S / 2
const CY = S / 2

// ── Continent outlines [lon, lat] ──────────────────────────────────────────
const LANDMASSES = [
  { color: '#3a7828', shadow: '#2a5818', points: [
    [-168,72],[-140,70],[-130,58],[-124,50],[-124,40],[-120,34],
    [-117,32],[-110,24],[-105,20],[-90,16],[-83,10],[-77,8],
    [-77,12],[-84,22],[-80,25],[-80,32],[-74,36],[-74,40],
    [-70,42],[-66,44],[-65,50],[-60,47],[-66,60],[-80,62],
    [-96,72],[-112,74],[-128,72],[-140,68],[-155,60],
    [-165,60],[-168,68],[-168,72],
  ]},
  { color: '#2d7a1e', shadow: '#1e5a12', points: [
    [-78,10],[-72,12],[-62,12],[-50,0],[-44,4],[-36,5],
    [-35,8],[-38,12],[-72,12],[-78,10],[-80,0],[-78,-5],
    [-74,-12],[-70,-18],[-68,-22],[-64,-22],[-57,-20],
    [-54,-26],[-52,-32],[-50,-28],[-52,-34],[-54,-38],
    [-58,-40],[-62,-44],[-66,-52],[-68,-55],[-62,-53],
    [-66,-55],[-65,-50],[-60,-44],[-56,-40],[-52,-34],
    [-50,-28],[-54,-26],[-58,-20],[-64,-22],[-68,-22],
    [-70,-18],[-74,-12],[-78,-5],[-80,0],[-78,10],
  ]},
  { color: '#4a8022', shadow: '#336018', points: [
    [-10,36],[-8,38],[-8,44],[-2,44],[0,44],[4,44],
    [4,48],[8,48],[10,48],[14,48],[14,54],[10,58],
    [6,58],[4,56],[0,54],[-4,54],[-6,52],[-8,50],
    [-8,44],[-4,44],[0,44],[4,44],[4,40],[2,38],
    [0,36],[-4,36],[-10,36],
  ]},
  { color: '#7a5c14', shadow: '#5a4410', points: [
    [-18,15],[-14,10],[-10,8],[-4,5],[0,5],[4,5],
    [8,4],[10,2],[12,4],[14,8],[16,12],[20,10],
    [24,8],[28,4],[32,0],[36,-4],[40,-10],[36,-18],
    [34,-22],[32,-26],[30,-30],[28,-34],[24,-34],
    [20,-34],[18,-30],[14,-18],[12,-6],[8,4],[4,5],
    [0,5],[-4,5],[-10,8],[-14,10],[-18,15],
  ]},
  { color: '#528a28', shadow: '#3a6218', points: [
    [26,42],[30,46],[36,48],[40,44],[44,44],[50,46],
    [55,52],[60,58],[65,58],[70,58],[75,55],[80,55],
    [85,55],[90,55],[95,55],[100,52],[105,55],[110,52],
    [115,50],[120,50],[126,50],[130,48],[136,46],[140,46],
    [142,46],[134,44],[130,42],[128,38],[126,36],[124,32],
    [122,30],[120,26],[118,22],[114,20],[110,18],[106,12],
    [103,2],[100,2],[100,6],[98,8],[90,14],[88,22],
    [88,28],[85,26],[80,28],[76,28],[72,24],[68,22],
    [60,22],[52,18],[48,12],[44,12],[40,14],[36,14],
    [36,20],[38,28],[42,36],[38,40],[34,42],[26,42],
  ]},
  { color: '#8B6914', shadow: '#6b5010', points: [
    [114,-22],[116,-20],[120,-18],[124,-18],[128,-18],
    [132,-16],[136,-14],[140,-14],[144,-16],[148,-20],
    [150,-24],[152,-30],[152,-34],[150,-38],[148,-38],
    [144,-38],[140,-36],[136,-34],[132,-34],[128,-28],
    [124,-26],[120,-26],[116,-24],[114,-22],
  ]},
  { color: '#b0cce0', shadow: '#90aac0', points: [
    [-24,82],[-15,82],[-14,78],[-20,75],[-25,70],
    [-28,65],[-36,62],[-44,66],[-52,70],[-52,74],
    [-46,78],[-36,80],[-24,82],
  ]},
  { color: '#cce0f0', shadow: '#aac4d8', points: [
    [-180,-74],[180,-74],[180,-90],[-180,-90],[-180,-74],
  ]},
]

// ── City lights [lon, lat, radius, brightness] ────────────────────────────
const CITIES = [
  // North America
  [-74,40,2.4,1.0], [-87,41,2.0,0.9], [-118,34,2.2,0.9], [-70,42,1.5,0.8],
  [-77,38,1.5,0.8], [-122,37,1.5,0.7], [-80,25,1.4,0.7], [-79,43,1.4,0.7],
  // Europe
  [-0.1,51,2.4,1.0], [2,48,2.0,1.0], [13,52,1.8,0.9], [4,52,1.5,0.8],
  [12,42,1.4,0.8], [37,55,2.0,0.9], [30,59,1.5,0.7], [24,60,1.1,0.6],
  [10,59,1.1,0.6], [18,59,1.1,0.6], [2,41,1.4,0.7],
  // East Asia
  [139,35,3.0,1.0], [126,37,2.4,0.9], [121,31,2.4,0.9], [116,40,2.0,0.9],
  [113,22,2.0,0.9], [135,34,1.8,0.8], [121,25,1.5,0.8], [103,1,1.5,0.8],
  // South/SE Asia
  [72,19,1.8,0.8], [77,28,1.8,0.8], [88,22,1.4,0.7], [67,25,1.2,0.6],
  [106,-6,1.6,0.7], [100,13,1.4,0.7], [121,14,1.2,0.6],
  // Middle East & Africa
  [55,25,1.6,0.8], [31,30,1.6,0.7], [44,33,1.3,0.6], [28,-26,1.4,0.7],
  [18,-34,1.1,0.6], [3,6,1.1,0.6],
  // South America
  [-46,-23,2.2,0.9], [-43,-22,1.8,0.8], [-58,-34,1.7,0.8],
  [-74,4,1.1,0.6], [-77,-12,1.1,0.6],
  // Oceania
  [151,-33,1.4,0.7], [144,-37,1.2,0.6],
]

function project(lon, lat, scroll) {
  const nLon = (lon + 180) / 360
  const s = ((nLon - scroll) % 1 + 1) % 1
  if (s < 0.005 || s > 0.995) return null
  const xf = s - 0.5
  const x = CX + xf * R * 2.05
  const y = CY - (lat / 90) * R * 0.93
  if ((x - CX) ** 2 + (y - CY) ** 2 > R * R * 0.97) return null
  const shadow = Math.max(0, Math.min(1, (x - (CX - R * 0.25)) / (R * 1.25)))
  return { x, y, shadow }
}

export default function AiCore() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width  = S
    canvas.height = S

    // Stars
    const stars = Array.from({ length: 240 }, () => ({
      x: Math.random() * S, y: Math.random() * S,
      r: Math.random() * 1.2 + 0.2,
      base: 0.3 + Math.random() * 0.7,
      sp: 0.4 + Math.random() * 2.0,
      ph: Math.random() * Math.PI * 2,
    }))

    // Milky Way band
    const mw = Array.from({ length: 350 }, (_, i) => {
      const t  = i / 350
      const a  = t * Math.PI * 2
      const sp = (Math.random() - 0.5) * 80
      const core = Math.exp(-((t - 0.5) ** 2) / 0.06) * 0.18
      return {
        x: S * 0.5 + Math.cos(a * 1.2 + 0.4) * S * 0.46 + Math.cos(a * 2.4) * sp,
        y: S * 0.5 + Math.sin(a * 1.2 + 0.4) * S * 0.32 + Math.sin(a * 2.4) * sp,
        r: Math.random() * 1.8 + 0.3,
        a: Math.random() * (0.06 + core) + 0.02,
      }
    })

    // Clouds
    const clouds = Array.from({ length: 28 }, () => ({
      lon: Math.random() * 360 - 180,
      lat: (Math.random() - 0.3) * 110,
      w: 10 + Math.random() * 22,
      h: 5 + Math.random() * 9,
      alpha: 0.22 + Math.random() * 0.28,
    }))

    let earthOff = 0, cloudOff = 0, last = 0, animId

    const frame = (now) => {
      const dt   = Math.min((now - last) / 1000, 0.05)
      last       = now
      earthOff   = (earthOff + dt * 0.018) % 1
      cloudOff   = (cloudOff + dt * 0.026) % 1
      const t    = now / 1000

      ctx.clearRect(0, 0, S, S)

      // ── Space bg ──────────────────────────────
      const bg = ctx.createRadialGradient(CX, CY - 50, 0, CX, CY, S * 0.75)
      bg.addColorStop(0, '#0e0b20')
      bg.addColorStop(0.5,'#08070f')
      bg.addColorStop(1, '#040408')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, S, S)

      // Milky Way
      mw.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(170,150,255,${p.a})`
        ctx.fill()
      })

      // Stars
      stars.forEach(s => {
        const tw = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * s.sp + s.ph))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(210,225,255,${s.base * tw})`
        ctx.fill()
      })

      // ── Earth ─────────────────────────────────
      ctx.save()
      ctx.beginPath()
      ctx.arc(CX, CY, R, 0, Math.PI * 2)
      ctx.clip()

      // Ocean
      const oc = ctx.createRadialGradient(CX - R * 0.25, CY - R * 0.25, 0, CX, CY, R * 1.1)
      oc.addColorStop(0,   '#1e6090')
      oc.addColorStop(0.4, '#155280')
      oc.addColorStop(0.8, '#0d3d6a')
      oc.addColorStop(1,   '#091e3a')
      ctx.fillStyle = oc
      ctx.fillRect(CX - R, CY - R, R * 2, R * 2)

      // Continents
      LANDMASSES.forEach(({ color, shadow, points }) => {
        const proj = points.map(([lon, lat]) => project(lon, lat, earthOff)).filter(Boolean)
        if (proj.length < 3) return
        ctx.beginPath()
        proj.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y))
        ctx.closePath()
        const avgShadow = proj.reduce((s, p) => s + p.shadow, 0) / proj.length
        ctx.fillStyle = avgShadow > 0.5 ? shadow : color
        ctx.globalAlpha = 0.9
        ctx.fill()
        ctx.globalAlpha = 1
      })

      // Clouds
      clouds.forEach(c => {
        const p = project(c.lon, c.lat, cloudOff)
        if (!p) return
        ctx.save()
        ctx.globalAlpha = c.alpha * (1 - p.shadow * 0.6)
        const cg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, c.w)
        cg.addColorStop(0,   'rgba(255,255,255,0.9)')
        cg.addColorStop(0.4, 'rgba(240,248,255,0.5)')
        cg.addColorStop(1,   'rgba(220,235,255,0)')
        ctx.fillStyle = cg
        ctx.beginPath()
        ctx.ellipse(p.x, p.y, c.w, c.h, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // Day/night terminator
      const term = ctx.createLinearGradient(CX - R, CY, CX + R, CY)
      term.addColorStop(0,    'rgba(0,0,0,0)')
      term.addColorStop(0.38, 'rgba(0,0,0,0)')
      term.addColorStop(0.54, 'rgba(0,0,20,0.55)')
      term.addColorStop(1,    'rgba(0,0,30,0.88)')
      ctx.fillStyle = term
      ctx.fillRect(CX - R, CY - R, R * 2, R * 2)

      // City lights on night side
      CITIES.forEach(([lon, lat, cr, bright]) => {
        const p = project(lon, lat, earthOff)
        if (!p || p.shadow < 0.45) return
        const intensity = (p.shadow - 0.45) / 0.55 * bright
        // Outer glow
        const lg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, cr * 3.5)
        lg.addColorStop(0,   `rgba(255,210,100,${intensity * 0.8})`)
        lg.addColorStop(0.4, `rgba(255,180,60,${intensity * 0.3})`)
        lg.addColorStop(1,   'rgba(255,140,0,0)')
        ctx.fillStyle = lg
        ctx.beginPath()
        ctx.arc(p.x, p.y, cr * 3.5, 0, Math.PI * 2)
        ctx.fill()
        // Core dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, cr * 0.6, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,230,150,${intensity * 0.9})`
        ctx.fill()
      })

      // Sunlight specular on ocean (left side)
      const spec = ctx.createRadialGradient(
        CX - R * 0.32, CY - R * 0.3, 0,
        CX - R * 0.05, CY - R * 0.05, R * 0.6
      )
      spec.addColorStop(0,   'rgba(255,255,240,0.12)')
      spec.addColorStop(0.5, 'rgba(200,230,255,0.04)')
      spec.addColorStop(1,   'rgba(0,0,0,0)')
      ctx.fillStyle = spec
      ctx.fillRect(CX - R, CY - R, R * 2, R * 2)

      ctx.restore()

      // Atmosphere halo (outside clip)
      const atm = ctx.createRadialGradient(CX, CY, R * 0.9, CX, CY, R * 1.22)
      atm.addColorStop(0,    'rgba(80,160,255,0)')
      atm.addColorStop(0.35, 'rgba(60,150,255,0.22)')
      atm.addColorStop(0.7,  'rgba(40,100,200,0.08)')
      atm.addColorStop(1,    'rgba(20,60,180,0)')
      ctx.fillStyle = atm
      ctx.beginPath()
      ctx.arc(CX, CY, R * 1.22, 0, Math.PI * 2)
      ctx.fill()

      // Outer glow
      const og = ctx.createRadialGradient(CX, CY, R * 1.1, CX, CY, R * 1.5)
      og.addColorStop(0,   'rgba(6,182,212,0.10)')
      og.addColorStop(0.5, 'rgba(6,182,212,0.03)')
      og.addColorStop(1,   'rgba(6,182,212,0)')
      ctx.fillStyle = og
      ctx.beginPath()
      ctx.arc(CX, CY, R * 1.5, 0, Math.PI * 2)
      ctx.fill()

      animId = requestAnimationFrame(frame)
    }

    animId = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div className="relative flex items-center justify-center w-[300px] h-[300px] lg:w-[380px] lg:h-[380px]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Orbital ring 1 */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[90%] h-[90%] rounded-full pointer-events-none"
        style={{ border: '1px solid rgba(6,182,212,0.2)', transform: 'rotateX(68deg)' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-2.5 h-2.5 rounded-full bg-cyan-400
          shadow-[0_0_10px_3px_rgba(6,182,212,0.9)]" />
      </motion.div>

      {/* Orbital ring 2 */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[80%] h-[80%] rounded-full pointer-events-none"
        style={{ border: '1px solid rgba(139,92,246,0.18)', transform: 'rotateX(55deg) rotateY(28deg)' }}>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2
          w-2 h-2 rounded-full bg-violet-400
          shadow-[0_0_8px_3px_rgba(139,92,246,0.9)]" />
      </motion.div>

      <div className="absolute w-[97%] h-[97%] rounded-full pointer-events-none"
        style={{ border: '1px dashed rgba(6,182,212,0.07)' }} />
    </div>
  )
}
