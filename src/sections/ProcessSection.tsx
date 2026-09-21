import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

import { Compass, Target, PenTool, Terminal, Rocket } from 'lucide-react'

/* -------------------------------------------------------------------- */
/*  Process — hover reveal cards with massive ultra-thin icons          */
/*  (mobile: accordion). Premium, spacious layout.                      */
/* -------------------------------------------------------------------- */

const steps = [
  {
    n: '01',
    title: 'Discovery',
    tag: 'Research',
    body: 'Researching your business, industry, audience, competitors, and digital positioning strategy.',
    icon: Compass,
  },
  {
    n: '02',
    title: 'Strategy',
    tag: 'Roadmap',
    body: 'Developing scalable branding, SEO, AI, and content systems designed for long-term growth.',
    icon: Target,
  },
  {
    n: '03',
    title: 'Design',
    tag: 'Craft',
    body: 'Creating modern interfaces, immersive branding systems, and premium digital experiences.',
    icon: PenTool,
  },
  {
    n: '04',
    title: 'Development',
    tag: 'Build',
    body: 'Building fast, optimized, responsive, and search-engine-friendly websites using modern technologies.',
    icon: Terminal,
  },
  {
    n: '05',
    title: 'Launch & Optimization',
    tag: 'Lift-off',
    body: 'Performance optimization, SEO enhancement, analytics integration, and continuous growth improvements.',
    icon: Rocket,
  },
]

export default function ProcessSection() {
  // Mobile: only one phase open at a time (defaults to step 1).
  const [openIdx, setOpenIdx] = useState(0)

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
            <h2 className="font-zalando text-[28px] leading-[1.04] md:text-[38px] lg:text-[46px] font-semibold text-brand-black max-w-[820px]">
              Our Creative & Growth Process
            </h2>
          </div>
          <p className="max-w-[360px] dm-p14-semi text-brand-black/65 leading-relaxed">
            Five focused phases, one connected journey — from first conversation
            to long-term growth.
          </p>
        </motion.div>

        {/* MOBILE — accordion */}
        <div className="sm:hidden flex flex-col gap-2.5">
          {steps.map((s, i) => {
            const isOpen = openIdx === i
            return (
              <div
                key={s.n}
                className={`rounded-2xl border bg-white overflow-hidden transition-colors ${
                  isOpen ? 'border-brand-orange/70 shadow-[0_6px_20px_-12px_rgba(255,122,26,0.45)]' : 'border-brand-off-gray/70'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
                >
                  <span className="font-zalando text-[22px] leading-none font-semibold text-brand-orange w-9 shrink-0">
                    {s.n}
                  </span>
                  <span className="flex flex-1 flex-col">
                    <span className="font-zalando text-[15px] leading-tight font-semibold text-brand-black">
                      {s.title}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-brand-black/50 mt-0.5">
                      {s.tag} · Phase {s.n}
                    </span>
                  </span>
                  <motion.svg
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    className="text-brand-black/50"
                  >
                    <path d="M4 7l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-4 text-[13px] text-brand-black/70 leading-relaxed">
                        {s.body}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* DESKTOP / TABLET — hover reveal cards */}
        <div className="hidden sm:grid grid-cols-2 gap-4 lg:grid-cols-5">
          {steps.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex h-[340px] flex-col overflow-hidden rounded-[24px] border border-brand-off-gray/70 bg-white p-6 shadow-sm transition-all duration-500 hover:border-brand-orange/40 hover:shadow-[0_18px_40px_-20px_rgba(255,122,26,0.15)] hover:-translate-y-2"
            >
              {/* Top: Number & Tag */}
              <div className="flex items-center justify-between transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2 relative z-10">
                <span className="font-zalando text-[42px] leading-none font-bold text-brand-black/10 transition-colors duration-500 group-hover:text-brand-orange/20">
                  {s.n}
                </span>
                <span className="rounded-full border border-brand-off-gray/60 bg-brand-light-white px-3 py-1.5 text-[10px] uppercase tracking-widest text-brand-black/50 transition-colors duration-500 group-hover:border-brand-orange/30 group-hover:text-brand-orange">
                  {s.tag}
                </span>
              </div>

              {/* Center Huge Icon Background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                {/* Soft gradient blob */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] rounded-full bg-brand-orange/0 blur-[40px] transition-all duration-700 group-hover:bg-brand-orange/15 group-hover:scale-125" />
                
                {/* Massive minimal icon */}
                <div className="transform transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-95 group-hover:-translate-y-4 text-brand-black/5 group-hover:text-brand-orange/20">
                  <s.icon className="w-40 h-40" strokeWidth={0.5} />
                </div>
              </div>

              {/* Bottom: Title & Body (Reveals on Hover) */}
              <div className="mt-auto relative z-10 pb-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:pb-12">
                <h3 className="font-zalando text-[24px] font-semibold text-brand-black transition-colors duration-300 group-hover:text-brand-orange drop-shadow-sm">
                  {s.title}
                </h3>
                
                <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grid-rows-[1fr] group-hover:opacity-100">
                  <div className="overflow-hidden">
                    <p className="pt-3 dm-p14-semi text-brand-black/60 leading-relaxed text-[13px] drop-shadow-sm">
                      {s.body}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer Indicator (slides in from bottom) */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between border-t border-brand-off-gray/60 pt-4 opacity-0 translate-y-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-hover:translate-y-0 relative z-10">
                <span className="text-[11px] uppercase tracking-[0.18em] text-brand-black/45">
                  Phase {s.n}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-brand-orange transition-transform duration-300 group-hover:translate-x-1"
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
