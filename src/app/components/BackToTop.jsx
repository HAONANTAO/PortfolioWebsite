'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUpIcon } from '@heroicons/react/24/outline'

export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 16, scale: 0.85 }}
          animate={{ opacity: 1, y: 0,  scale: 1 }}
          exit={{   opacity: 0, y: 16, scale: 0.85 }}
          transition={{ duration: 0.25 }}
          whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(6,182,212,0.45)' }}
          whileTap={{ scale: 0.92 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-6 z-[9980] w-10 h-10 rounded-full flex items-center justify-center
            border border-cyan-500/30 bg-[#060608]/80 backdrop-blur-md text-cyan-400
            hover:border-cyan-400 transition-colors duration-200"
          aria-label="Back to top"
        >
          <ChevronUpIcon className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
