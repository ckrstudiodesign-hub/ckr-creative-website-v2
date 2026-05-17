import { motion } from 'framer-motion'
import SectionShell from '../components/SectionShell'

const points = [
  'SEO-first website architecture',
  'GEO & AEO optimized content systems',
  'AI-search-friendly website structure',
  'Fast-loading responsive experiences',
  'Cinematic UI/UX systems',
  'Conversion-focused interfaces',
  'Structured semantic design',
  'Future-ready digital technology',
]

export default function FeatureSection() {
  return (
    <SectionShell
      eyebrow="What Sets Us Apart"
      heading="Optimized For Search, Performance & Digital Growth"
      background="bg-brand-orange"
      textColor="text-brand-white"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 mt-6">
        {points.map((p, i) => (
          <motion.div
            key={p}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
            className="flex flex-col gap-3 border-t border-brand-white/20 pt-5"
          >
            <span className="dm-p14-semi text-brand-white/80">{String(i + 1).padStart(2, '0')}</span>
            <span className="zalando-h4-20">{p}</span>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  )
}
