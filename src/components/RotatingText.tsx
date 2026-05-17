import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type RotatingTextProps = {
  items: string[]
  /** Seconds between word swaps */
  interval?: number
  className?: string
}

/**
 * Auto-rotating word swap (Hero motion text).
 * Cycles through the provided list with a vertical-slide + fade transition.
 */
export default function RotatingText({ items, interval = 2.4, className = '' }: RotatingTextProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length)
    }, interval * 1000)
    return () => window.clearInterval(id)
  }, [interval, items.length])

  return (
    <span className={`relative inline-block align-bottom overflow-hidden ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={items[index]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {items[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
