import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

/* -------------------------------------------------------------------- */
/*  Work — Thomas Monavon style.                                         */
/*  Each project occupies a tall section with a numbered index, big hero */
/*  image, minimal typography (S — summary, C — categories), and a       */
/*  "Visit project" CTA. Clean, editorial, lots of whitespace.           */
/* -------------------------------------------------------------------- */

type Project = {
  slug: string
  title: string
  summary: string
  categories: string[]
  year: string
  img: string
  href?: string
}

const work: Project[] = [
  {
    slug: 'golden-legacy',
    title: 'Golden Legacy Corporate Services',
    summary: 'Fully integrated corporate services platform for Dubai — business formation, banking and visa flows with live, working lead-capture forms, plus full-scale social media on Instagram, Facebook, TikTok, YouTube & LinkedIn.',
    categories: ['Web Design', 'Forms Integration', 'Social Media'],
    year: '2026',
    img: '/project%20image/Golden%20Legacy.png',
    href: 'https://www.goldenlegacy.ae/',
  },
  {
    slug: 'novagrid-systems',
    title: 'NovaGrid Systems',
    summary: 'A modular AI infrastructure brand built for engineering teams shipping models at planet scale.',
    categories: ['Brand Identity', 'Web Design', 'AI Systems'],
    year: '2025',
    img: '/project%20image/NovaGrid%20System.png',
  },
  {
    slug: 'velore-dynamics',
    title: 'Veloré Dynamics',
    summary: 'Cinematic identity and digital experience for an electric luxury mobility studio.',
    categories: ['Branding', 'Web Design', 'Motion'],
    year: '2025',
    img: '/project%20image/Velor%C3%A9%20Dynamics.png',
  },
  {
    slug: 'aetherx-aerospace',
    title: 'AetherX Aerospace',
    summary: 'A precision-engineered identity system for a private aerospace company.',
    categories: ['Brand System', 'Design Direction'],
    year: '2025',
    img: '/project%20image/AetherX.png',
  },
  {
    slug: 'blackstone-quantum',
    title: 'Blackstone Quantum',
    summary: 'Quiet-luxury fintech platform — measured typography, restrained color, real signal.',
    categories: ['Fintech', 'Web Design', 'SEO'],
    year: '2024',
    img: '/project%20image/Blackstone.png',
  },
  {
    slug: 'neurovia-health',
    title: 'Neurovia Health',
    summary: 'AI healthcare brand crafted around clarity, trust, and editorial calm.',
    categories: ['Health', 'Brand', 'Web'],
    year: '2024',
    img: '/project%20image/Neurovia.png',
  },
  {
    slug: 'sentinelcore-labs',
    title: 'SentinelCore Labs',
    summary: 'Dark, technical visual system for a security research lab — built to feel inevitable.',
    categories: ['Cybersecurity', 'Brand', 'Web'],
    year: '2024',
    img: '/project%20image/SentinelCore.png',
  },
]

export default function WorkSection() {
  const [active, setActive] = useState(0)
  const total = work.length

  return (
    <section className="w-full bg-brand-light-white text-brand-black">
      {/* Section header */}
      <div className="px-4 pb-6 pt-8 md:px-8 md:pb-8 md:pt-12 lg:px-10 xl:px-[56px]">
        <div className="w-full max-w-[1300px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start gap-5 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="flex flex-col gap-4">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-off-gray/80 bg-white px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-brand-black/75">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-orange" />
                Selected Work
              </span>
              <h2 className="font-zalando text-[32px] leading-[1.02] md:text-[42px] lg:text-[54px] font-semibold text-brand-black max-w-[1100px]">
                Selected Projects.
              </h2>
            </div>
            <p className="max-w-[360px] dm-p14-semi text-brand-black/65 leading-relaxed">
              A small slice of recent work — branding, websites, and digital
              experiences built for modern brands.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Interactive list (left) + live preview (right on desktop, inline on mobile) */}
      <div className="px-4 md:px-8 lg:px-10 xl:px-[56px]">
        <div className="w-full max-w-[1300px] mx-auto grid grid-cols-1 items-start gap-4 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          {/* Left — project index list */}
          <ul className="flex flex-col border-t border-brand-off-gray/70">
            {work.map((p, i) => {
              const n = String(i + 1).padStart(2, '0')
              const isActive = active === i
              return (
                <li key={p.slug} className="border-b border-brand-off-gray/70">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-expanded={isActive}
                    className="group flex w-full items-center gap-4 py-4 text-left md:py-5"
                  >
                    <span className="font-zalando text-[13px] font-semibold tabular-nums text-brand-black/35 w-7 shrink-0">
                      {n}
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span
                        className={`font-zalando text-[22px] md:text-[26px] lg:text-[30px] leading-[1.05] font-semibold transition-colors duration-300 ${
                          isActive ? 'text-brand-orange' : 'text-brand-black group-hover:text-brand-orange'
                        }`}
                      >
                        {p.title}
                      </span>
                      <span className="dm-p14-medium text-brand-black/55 truncate">
                        {p.categories.join(' · ')}
                      </span>
                    </span>
                    <span className="hidden shrink-0 text-[11px] uppercase tracking-[0.22em] text-brand-black/45 sm:block">
                      {p.year}
                    </span>
                    <span
                      className={`shrink-0 text-brand-black/30 transition-all duration-300 ${
                        isActive ? 'text-brand-orange translate-x-0' : 'group-hover:text-brand-orange'
                      }`}
                      aria-hidden
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M4 14L14 4M14 4H6M14 4V12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>

                  {/* Mobile inline preview — tap a project to reveal */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key="m-preview"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden lg:hidden"
                      >
                        {p.href ? (
                        <a href={p.href} target="_blank" rel="noopener noreferrer" className="group/preview relative mb-4 block aspect-[16/11] overflow-hidden rounded-[18px] bg-brand-black">
                          <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url("${p.img}")` }}
                          />
                          <div
                            aria-hidden
                            className="absolute inset-0"
                            style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 100%)' }}
                          />
                          <span className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-brand-white">
                            <span className="dm-p14-semi">{p.summary.length > 60 ? `${p.summary.slice(0, 57)}…` : p.summary}</span>
                          </span>
                          <span className="absolute right-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-black backdrop-blur-md">
                            Visit live ↗
                          </span>
                        </a>
                        ) : (
                        <Link to={`/work/${p.slug}`} className="group/preview relative mb-4 block aspect-[16/11] overflow-hidden rounded-[18px] bg-brand-black">
                          <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url("${p.img}")` }}
                          />
                          <div
                            aria-hidden
                            className="absolute inset-0"
                            style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 100%)' }}
                          />
                          <span className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-brand-white">
                            <span className="dm-p14-semi">{p.summary.length > 60 ? `${p.summary.slice(0, 57)}…` : p.summary}</span>
                          </span>
                          <span className="absolute right-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-black backdrop-blur-md">
                            Visit →
                          </span>
                        </Link>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>

          {/* Right — sticky live preview (desktop / laptop) */}
          <div className="hidden lg:block lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={work[active].slug}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {work[active].href ? (
                <a
                  href={work[active].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/preview relative block aspect-[4/3] overflow-hidden rounded-[24px] bg-brand-black"
                >
                  <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url("${work[active].img}")` }}
                    initial={{ scale: 1.04 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.72) 100%)' }}
                  />
                  <div className="absolute inset-x-6 bottom-6 flex flex-col gap-2 text-brand-white">
                    <span className="text-[11px] uppercase tracking-[0.22em] text-brand-white/70">
                      {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')} · {work[active].year}
                    </span>
                    <h3 className="font-zalando text-[28px] xl:text-[34px] font-semibold leading-[1.04]">
                      {work[active].title}
                    </h3>
                    <p className="dm-p14-semi text-brand-white/80 max-w-[460px]">
                      {work[active].summary}
                    </p>
                    <span className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-black transition-transform duration-300 group-hover/preview:translate-x-1">
                      Visit live site ↗
                    </span>
                  </div>
                </a>
                ) : (
                <Link
                  to={`/work/${work[active].slug}`}
                  className="group/preview relative block aspect-[4/3] overflow-hidden rounded-[24px] bg-brand-black"
                >
                  <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url("${work[active].img}")` }}
                    initial={{ scale: 1.04 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.72) 100%)' }}
                  />
                  <div className="absolute inset-x-6 bottom-6 flex flex-col gap-2 text-brand-white">
                    <span className="text-[11px] uppercase tracking-[0.22em] text-brand-white/70">
                      {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')} · {work[active].year}
                    </span>
                    <h3 className="font-zalando text-[28px] xl:text-[34px] font-semibold leading-[1.04]">
                      {work[active].title}
                    </h3>
                    <p className="dm-p14-semi text-brand-white/80 max-w-[460px]">
                      {work[active].summary}
                    </p>
                    <span className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-black transition-transform duration-300 group-hover/preview:translate-x-1">
                      Visit project →
                    </span>
                  </div>
                </Link>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Footer "see all" line */}
      <div className="px-4 pb-10 pt-6 md:px-8 md:pb-12 md:pt-8 lg:px-10 xl:px-[56px]">
        <div className="w-full max-w-[1300px] mx-auto flex flex-col items-center gap-5 border-t border-brand-off-gray/70 pt-6">
          <span className="text-[11px] uppercase tracking-[0.22em] text-brand-black/55">
            More work in the archive
          </span>
          <Link
            to="/work"
            className="group inline-flex items-center gap-3 rounded-full bg-brand-black px-7 py-3.5 text-white text-[13px] font-semibold tracking-wide shadow-[0_10px_30px_-10px_rgba(36,16,6,0.5)] transition-shadow hover:shadow-[0_14px_40px_-10px_rgba(36,16,6,0.7)]"
          >
            View all projects
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

