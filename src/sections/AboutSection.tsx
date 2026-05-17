import { motion } from 'framer-motion'
import RotatingText from '../components/RotatingText'

const focusAreas = [
  'Branding',
  'Web Development',
  'AI Automation',
  'SEO Strategy',
  'Social Media',
  'Digital Experiences',
]

const stats = [
  { value: 'Dubai', label: 'Creative base' },
  { value: '360°', label: 'Brand ecosystem' },
  { value: 'AI', label: 'Future-ready systems' },
]

const rotateWords = [
  'Digital Brands',
  'Web Experiences',
  'AI Systems',
  'Search Growth',
  'Visual Worlds',
]

export default function AboutSection() {
  return (
    <section className="w-full bg-brand-white px-5 py-20 md:px-10 md:py-28 xl:px-[72px]">
      <div className="mx-auto grid w-full max-w-[1920px] grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <div className="flex max-w-[920px] flex-col gap-7">
            <span className="dm-p18-semi text-brand-light-black">(ABOUT)</span>
            <h2 className="font-zalando text-[clamp(2.35rem,5vw,5.7rem)] font-semibold leading-[1.03] text-brand-black">
              Dubai Creative Agency Building The Future Of{' '}
              <RotatingText items={rotateWords} interval={2.2} className="text-brand-orange" />
            </h2>

            <div className="grid gap-5 dm-p18-semi text-brand-light-black md:grid-cols-[1fr_0.9fr]">
              <p>
                CKR Creatives is a modern creative agency in Dubai focused on helping businesses
                build powerful digital identities through branding, web development, AI automation,
                SEO strategy, social media marketing, and immersive digital experiences.
              </p>
              <p>
                We create high-performance websites, cinematic visual systems, and scalable
                marketing ecosystems designed to improve visibility, engagement, and long-term
                business growth.
              </p>
            </div>

            <p className="dm-p18-semi max-w-[760px] text-brand-light-black">
              From startups and corporate companies to luxury brands and modern businesses, CKR
              Creatives delivers future-focused digital solutions that combine creativity,
              strategy, and technology.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-2">
              {focusAreas.map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  className="rounded-full border border-brand-black/10 bg-brand-off-white px-4 py-2 dm-p14-semi text-brand-black/75"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 28, rotate: 1.5 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto aspect-[9/16] w-full max-w-[420px] overflow-hidden rounded-[32px] bg-brand-black shadow-[0_34px_90px_rgba(36,16,6,0.18)] lg:col-span-5"
        >
          <motion.video
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
            src="/videos/about.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            initial={{ scale: 1.08 }}
            animate={{ scale: [1.08, 1.18, 1.08], x: [0, -12, 0], y: [0, 8, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.36) 48%, rgba(0,0,0,0.86) 100%)',
            }}
          />
          <motion.div
            aria-hidden
            className="absolute -right-24 top-10 h-64 w-64 rounded-full bg-brand-orange/35 blur-[100px]"
            animate={{ x: [0, -26, 0], y: [0, 18, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="absolute inset-x-5 bottom-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
                className="rounded-2xl border border-white/16 bg-white/[0.10] p-4 text-brand-white backdrop-blur-xl"
              >
                <div className="font-zalando text-2xl font-semibold leading-none">{stat.value}</div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-white/65">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
