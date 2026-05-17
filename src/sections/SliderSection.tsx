import { motion } from 'framer-motion'

const items = ['DESIGN', 'BRAND', 'WEB', 'MOTION', '3D', 'STRATEGY']

/**
 * SliderSection — Framer node 'SliderSection' (i64PS1vOQ component).
 * Infinite horizontal marquee — recreated with Framer Motion since the
 * exact Framer slider duration/easing isn't exposed via the XML.
 */
export default function SliderSection() {
  return (
    <section className="w-full bg-brand-orange text-brand-white py-12 overflow-hidden">
      <motion.div
        className="flex flex-row whitespace-nowrap gap-16"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
      >
        {[...items, ...items, ...items, ...items].map((it, i) => (
          <span key={i} className="clash-h1-88 inline-flex items-center gap-16">
            {it}
            <span className="w-3 h-3 rounded-full bg-brand-white" />
          </span>
        ))}
      </motion.div>
    </section>
  )
}
