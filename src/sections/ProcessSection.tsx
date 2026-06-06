import { motion } from 'framer-motion'

/* -------------------------------------------------------------------- */
/*  Process — simple clean grid. No scroll-pin, no carousel.            */
/* -------------------------------------------------------------------- */

const steps = [
  {
    n: '01',
    title: 'Discovery',
    tag: 'Research',
    body: 'Researching your business, industry, audience, competitors, and digital positioning strategy.',
  },
  {
    n: '02',
    title: 'Strategy',
    tag: 'Roadmap',
    body: 'Developing scalable branding, SEO, AI, and content systems designed for long-term growth.',
  },
  {
    n: '03',
    title: 'Design',
    tag: 'Craft',
    body: 'Creating modern interfaces, immersive branding systems, and premium digital experiences.',
  },
  {
    n: '04',
    title: 'Development',
    tag: 'Build',
    body: 'Building fast, optimized, responsive, and search-engine-friendly websites using modern technologies.',
  },
  {
    n: '05',
    title: 'Launch & Optimization',
    tag: 'Lift-off',
    body: 'Performance optimization, SEO enhancement, analytics integration, and continuous growth improvements.',
  },
]

export default function ProcessSection() {
  return (
    <section className="w-full bg-brand-light-white px-4 py-8 text-brand-black md:px-8 md:py-12 lg:px-10 xl:px-[56px]">
      <div className="w-full max-w-[1300px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 flex flex-col items-start gap-5 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="flex flex-col gap-4">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-off-gray/80 bg-white px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-brand-black/75">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-orange" />
              Process
            </span>
            <h2 className="font-zalando text-[30px] leading-[1.04] md:text-[38px] lg:text-[46px] font-semibold text-brand-black max-w-[820px]">
              Our Creative & Growth Process
            </h2>
          </div>
          <p className="max-w-[360px] dm-p14-semi text-brand-black/65 leading-relaxed">
            Five focused phases, one connected journey — from first conversation
            to long-term growth.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group relative flex h-full flex-col gap-4 rounded-[22px] border border-brand-off-gray/70 bg-white p-5 shadow-[0_2px_8px_rgba(36,16,6,0.03)] transition-shadow hover:shadow-[0_18px_40px_-20px_rgba(36,16,6,0.15)] lg:p-5 xl:p-6"
            >
              {/* Number */}
              <div className="flex items-center justify-between">
                <span className="font-zalando text-[30px] leading-none font-semibold text-brand-orange">
                  {s.n}
                </span>
                <span className="rounded-full border border-brand-off-gray/80 bg-brand-light-white px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-brand-black/70">
                  {s.tag}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-zalando text-[18px] lg:text-[20px] leading-[1.1] font-semibold text-brand-black">
                {s.title}
              </h3>

              {/* Body */}
              <p className="dm-p14-semi text-brand-black/65 leading-relaxed">
                {s.body}
              </p>

              {/* Bottom divider with arrow on hover */}
              <div className="mt-auto flex items-center justify-between border-t border-brand-off-gray/60 pt-3.5">
                <span className="text-[11px] uppercase tracking-[0.18em] text-brand-black/45">
                  Phase {s.n}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-brand-black/30 transition-all duration-300 group-hover:text-brand-orange group-hover:translate-x-1"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
