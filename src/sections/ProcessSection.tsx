import { motion } from 'framer-motion'
import SectionShell from '../components/SectionShell'

const steps = [
  {
    n: '01',
    title: 'Discovery',
    body:
      'Researching your business, industry, audience, competitors, and digital positioning strategy.',
  },
  {
    n: '02',
    title: 'Strategy',
    body:
      'Developing scalable branding, SEO, AI, and content systems designed for long-term growth.',
  },
  {
    n: '03',
    title: 'Design',
    body:
      'Creating modern interfaces, immersive branding systems, and premium digital experiences.',
  },
  {
    n: '04',
    title: 'Development',
    body:
      'Building fast, optimized, responsive, and search-engine-friendly websites using modern technologies.',
  },
  {
    n: '05',
    title: 'Launch & Optimization',
    body:
      'Performance optimization, SEO enhancement, analytics integration, and continuous growth improvements.',
  },
]

export default function ProcessSection() {
  return (
    <SectionShell eyebrow="Process" heading="Our Creative & Growth Process">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-5 xl:gap-6">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="rounded-[20px] bg-brand-off-white p-6 lg:p-7 flex flex-col gap-5 min-h-[260px] lg:min-h-[280px]"
          >
            <span className="dm-p14-semi text-brand-light-black">{s.n}</span>
            <h3 className="font-zalando text-[28px] leading-[1.08] lg:text-[32px] lg:leading-[1.06] font-semibold text-brand-black">
              {s.title}
            </h3>
            <p className="dm-p16-medium text-brand-light-black mt-auto max-w-[360px]">{s.body}</p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  )
}
