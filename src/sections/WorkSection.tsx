import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

/* -------------------------------------------------------------------- */
/*  Work — Compact CoverFlow Layout                                      */
/* -------------------------------------------------------------------- */

type Project = {
  slug: string
  title: string
  summary: string
  categories: string[]
  year: string
  img: string
  href: string
}

// We duplicate the 4 projects so the carousel has 8 items, 
// creating a perfectly smooth infinite loop without empty spaces.
const baseWork: Project[] = [
  {
    slug: 'golden-legacy',
    title: 'Golden Legacy Corporate Services',
    summary: 'Building a premium digital gateway for UAE entrepreneurs.',
    categories: ['Web Design', 'Branding', 'UI/UX'],
    year: '2026',
    img: '/project%20image/golden%20legacy%20corporrate%20services.png',
    href: 'https://www.goldenlegacy.ae/',
  },
  {
    slug: 'golden-legacy-real-estate',
    title: 'Golden Legacy Real Estate',
    summary: 'A high-end digital experience designed for Dubai property and investment.',
    categories: ['Real Estate', 'Lead Gen', 'UI/UX'],
    year: '2026',
    img: '/project%20image/golden%20legacy%20real%20estate.png',
    href: 'https://www.goldenlegacyrealestate.ae/',
  },
  {
    slug: 'upyard-rooftop-lounge',
    title: 'Upyard Rooftop Lounge',
    summary: 'A cinematic digital experience built around Dubai nightlife, dining and unforgettable experiences.',
    categories: ['Hospitality', 'Web Design'],
    year: '2025',
    img: '/project%20image/upyard.png',
    href: 'https://www.upyardvibes.ae/',
  },
  {
    slug: 'best-madeena-gifts',
    title: 'Best Madeena Gifts',
    summary: 'A polished digital storefront designed to turn gifting into a memorable online experience.',
    categories: ['E-Commerce', 'UI/UX'],
    year: '2025',
    img: '/project%20image/bestmadeena.png',
    href: 'https://www.bestmadeenagifts.com/',
  },
]

const work = [...baseWork, ...baseWork].map((p, i) => ({ ...p, uniqueId: `${p.slug}-${i}` }))

const CAROUSEL_VARIANTS = {
  center: { x: '0%', scale: 1, zIndex: 10, opacity: 1 },
  left: { x: '-60%', scale: 0.82, zIndex: 5, opacity: 0.7 },
  right: { x: '60%', scale: 0.82, zIndex: 5, opacity: 0.7 },
  hiddenLeft: { x: '-100%', scale: 0.65, zIndex: 1, opacity: 0 },
  hiddenRight: { x: '100%', scale: 0.65, zIndex: 1, opacity: 0 },
}

const getVariant = (i: number, active: number, total: number) => {
  let diff = i - active
  // Normalize for infinite loop wrapping
  if (diff > Math.floor(total / 2)) diff -= total
  if (diff < -Math.floor(total / 2)) diff += total

  if (diff === 0) return 'center'
  if (diff === 1) return 'right'
  if (diff === -1) return 'left'
  if (diff > 1) return 'hiddenRight'
  return 'hiddenLeft'
}

export default function WorkSection() {
  const [active, setActive] = useState(0)

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((cur) => (cur + 1) % work.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="w-full bg-brand-light-white px-4 py-10 md:px-8 lg:px-10 xl:px-[56px]">
      <div className="w-full max-w-[1300px] mx-auto bg-[#FFF3E8] rounded-[28px] md:rounded-[40px] py-10 md:py-14 overflow-hidden relative shadow-[0_4px_30px_rgba(255,122,26,0.04)]">
        
        {/* Header */}
        <div className="relative mb-8 md:mb-10 text-brand-black z-20 px-4 md:px-10 flex flex-col items-center">
          <div className="text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-zalando text-[34px] md:text-[40px] lg:text-[44px] font-semibold mb-2"
            >
              Our Work
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xs md:text-sm font-medium opacity-70 tracking-wide"
            >
              A Selection of Signature Projects
            </motion.p>
          </div>

          {/* Top Right "View all projects" */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="hidden md:flex absolute top-1 right-6 lg:right-10 flex-col items-end gap-2.5"
          >
            <span className="text-[9px] uppercase tracking-[0.2em] text-brand-black/40 font-bold">
              More work in the archive
            </span>
            <Link
              to="/work"
              className="group inline-flex items-center gap-2 rounded-full bg-white border border-brand-off-gray/40 px-5 py-2 text-brand-black text-[11px] font-bold uppercase tracking-wider shadow-[0_2px_10px_rgba(36,16,6,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(255,122,26,0.15)] hover:border-brand-orange/30"
            >
              View all projects
              <span className="transition-transform duration-300 group-hover:translate-x-1 text-brand-orange" aria-hidden>→</span>
            </Link>
          </motion.div>
        </div>

        {/* Carousel */}
        <div className="relative h-[360px] sm:h-[400px] md:h-[420px] flex items-center justify-center w-full max-w-[1000px] mx-auto perspective-1000">
          {work.map((p, i) => (
            <motion.div
              key={p.uniqueId}
              className="absolute w-[280px] sm:w-[340px] md:w-[460px] h-[340px] sm:h-[380px] md:h-[400px] cursor-pointer"
              animate={getVariant(i, active, work.length)}
              variants={CAROUSEL_VARIANTS}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setActive(i)}
            >
              <div className="w-full h-full bg-white rounded-[24px] md:rounded-[28px] overflow-hidden flex flex-col shadow-[0_10px_30px_-10px_rgba(36,16,6,0.12)] transition-shadow hover:shadow-[0_15px_40px_-10px_rgba(255,122,26,0.2)]">
                <div className="flex-1 relative overflow-hidden bg-brand-light-white transition-all duration-500">
                  <img src={p.img} alt={p.title} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                
                <div className="bg-white flex flex-col px-5 md:px-7 py-4 md:py-5 shrink-0 transition-all duration-500">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-zalando text-base md:text-xl font-bold text-brand-black truncate">
                      {p.title}
                    </span>
                    <div className={`hidden md:flex shrink-0 items-center justify-center w-8 h-8 rounded-full transition-colors duration-300 ${active === i ? 'bg-[#FFF3E8] text-brand-orange' : 'bg-brand-black/5 text-brand-black/30'}`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Expanded Content for Active Card */}
                  <AnimatePresence initial={false}>
                    {active === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col items-start gap-2.5 pt-3 pb-1">
                          <span className="text-[9px] uppercase tracking-[0.2em] text-brand-black/40 font-bold">
                            {String((i % baseWork.length) + 1).padStart(2, '0')} / {String(baseWork.length).padStart(2, '0')} · {p.year}
                          </span>
                          <p className="text-[12px] md:text-[13px] font-medium text-brand-black/70 leading-relaxed line-clamp-2">
                            {p.summary}
                          </p>
                          <Link
                            to={p.href}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-brand-orange text-white px-4 py-2 text-[10px] font-bold uppercase tracking-wider hover:bg-brand-orange/90 transition-colors shadow-sm"
                          >
                            Visit live website
                            <span aria-hidden>↗</span>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Indicators */}
        <div className="mt-8 flex items-center justify-center gap-2 md:gap-2.5 relative z-20">
          {baseWork.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                (active % baseWork.length) === i ? 'w-6 bg-brand-orange' : 'w-1.5 bg-brand-black/15 hover:bg-brand-black/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
