'use client'
import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glowRef = useRef(null)

  useEffect(() => {
    const move = (e) => {
      if (!glowRef.current) return
      glowRef.current.style.left = e.clientX + 'px'
      glowRef.current.style.top = e.clientY + 'px'
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none z-50"
      style={{
        width: '380px',
        height: '380px',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        background:
          'radial-gradient(circle, rgba(6,182,212,0.055) 0%, rgba(139,92,246,0.025) 40%, transparent 70%)',
        transition: 'left 0.08s ease-out, top 0.08s ease-out',
      }}
    />
  )
}
