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
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-6 z-[9980] w-10 h-10 rounded-full flex items-center justify-center
            border border-zinc-900/15 bg-white/80 backdrop-blur-md text-zinc-700
            hover:border-zinc-900/40 hover:text-zinc-900
            dark:border-zinc-100/15 dark:bg-zinc-900/80 dark:text-zinc-300
            dark:hover:border-zinc-100/40 dark:hover:text-zinc-100
            transition-colors duration-200"
          aria-label="Back to top"
        >
          <ChevronUpIcon className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
