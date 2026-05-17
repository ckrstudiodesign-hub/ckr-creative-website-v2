import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type PageHeroProps = {
  eyebrow: string
  heading: string
  description: string
  /** Public-folder image path, e.g. "/images/fsahkf.png" */
  bgImage: string
  /** Optional decorative content to render after the description (e.g., CTA buttons) */
  actions?: ReactNode
}

/**
 * Reusable hero banner for sub-pages (Studio, Work, Blog).
 * Mirrors the dark rounded panel visual language used on the home Hero, with
 * a per-page background image, atmospheric blurs, and the brand-orange gradient
 * overlay.
 */
export function PageHero({ eyebrow, heading, description, bgImage, actions }: PageHeroProps) {
  return (
    <section className="w-full bg-brand-white px-5 pt-6 pb-10 md:px-10 md:py-10 xl:px-[72px]">
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[1920px] mx-auto overflow-hidden rounded-[28px] md:rounded-40 bg-brand-black px-5 py-14 text-brand-white md:px-11 md:py-20 xl:px-14 xl:py-24 min-h-[60vh] flex flex-col justify-end"
      >
        {/* Background image */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-55"
          style={{ backgroundImage: `url("${bgImage}")` }}
        />
        {/* Atmospheric glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute rounded-full bg-white/20 blur-[180px]"
          style={{ top: 80, right: '48%', bottom: '42%', left: -360 }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute rounded-full bg-brand-orange/55 blur-[170px]"
          style={{ top: 60, right: -420, bottom: '38%', left: '58%' }}
        />
        {/* Vignette / brand wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,122,26,0.38) 0%, rgba(36,16,6,0.32) 42%, rgba(36,16,6,0.92) 100%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-6 max-w-[920px]">
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-brand-orange" />
            <span className="dm-p14-semi uppercase tracking-[0.25em] text-brand-orange">
              {eyebrow}
            </span>
          </div>
          <h1 className="font-zalando font-semibold text-balance text-[clamp(2.5rem,6vw,5rem)] leading-[0.96] tracking-tight">
            {heading}
          </h1>
          <p className="dm-p18-semi text-brand-white/75 max-w-[640px]">{description}</p>
          {actions && <div className="flex flex-wrap gap-4 mt-4">{actions}</div>}
        </div>
      </motion.div>
    </section>
  )
}
