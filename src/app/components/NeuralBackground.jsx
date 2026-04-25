'use client'
import { useEffect, useRef } from 'react'

export default function NeuralBackground() {
  const canvasRef = useRef(null)
  const mouseRef  = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMouseMove)

    const NUM = 70
    const CONNECT_DIST = 130
    const MOUSE_RADIUS = 180
    const MAX_SPEED    = 1.4
    const particles = Array.from({ length: NUM }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.6,
      pulse: 0,
      pulseDecay: 0.015 + Math.random() * 0.01,
    }))

    const fireInterval = setInterval(() => {
      const p = particles[Math.floor(Math.random() * particles.length)]
      p.pulse = 1
    }, 600)

    let animId
    let lastFrame = 0
    const FPS_CAP = 30
    const MS_PER_FRAME = 1000 / FPS_CAP

    const draw = (now = 0) => {
      animId = requestAnimationFrame(draw)
      if (now - lastFrame < MS_PER_FRAME) return
      lastFrame = now
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const { x: mx, y: my } = mouseRef.current

      // Move, attract toward cursor, clamp speed
      particles.forEach(p => {
        const dx   = mx - p.x
        const dy   = my - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < MOUSE_RADIUS && dist > 0) {
          const strength = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * 0.018
          p.vx += (dx / dist) * strength
          p.vy += (dy / dist) * strength
          // Nearby particles glow
          if (dist < 90) p.pulse = Math.max(p.pulse, (90 - dist) / 90 * 0.7)
        }

        // Speed cap
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > MAX_SPEED) { p.vx = (p.vx / speed) * MAX_SPEED; p.vy = (p.vy / speed) * MAX_SPEED }

        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        if (p.pulse > 0) p.pulse = Math.max(0, p.pulse - p.pulseDecay)
      })

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECT_DIST) {
            const baseFade = 1 - dist / CONNECT_DIST
            const boost = Math.max(particles[i].pulse, particles[j].pulse)
            const alpha = baseFade * (0.12 + boost * 0.35)
            const r = Math.floor(6  + boost * 20)
            const g = Math.floor(182 - boost * 40)
            const b = Math.floor(212 - boost * 50)
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`
            ctx.lineWidth = 0.6 + boost * 0.8
            ctx.stroke()
          }
        }
      }

      // Nodes
      particles.forEach(p => {
        const glow = p.pulse
        const radius = p.r + glow * 3
        // Outer glow ring when activated
        if (glow > 0.1) {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 5)
          grad.addColorStop(0, `rgba(6,182,212,${glow * 0.3})`)
          grad.addColorStop(1, 'transparent')
          ctx.beginPath()
          ctx.arc(p.x, p.y, radius * 5, 0, Math.PI * 2)
          ctx.fillStyle = grad
          ctx.fill()
        }
        // Core dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = glow > 0.1
          ? `rgba(6,182,212,${0.5 + glow * 0.5})`
          : `rgba(6,182,212,0.35)`
        ctx.fill()
      })

    }
    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      clearInterval(fireInterval)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.35 }}
    />
  )
}
