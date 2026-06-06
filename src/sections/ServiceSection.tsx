import { motion, type PanInfo } from 'framer-motion'
import { useState, type ReactNode } from 'react'

/* -------------------------------------------------------------------- */
/*  Services - AK-style cards.                                          */
/*  Per-service icon + bold title + short description + colored tags    */
/*  + draggable image slider with dot indicators. Light cream surface.  */
/* -------------------------------------------------------------------- */

/* ─── Per-service line icons (stroke = currentColor → white on chip) ─── */
const serviceIcons: Record<string, ReactNode> = {
  // Brand Identity — creative spark / sparkles
  brand: (
    <g>
      <path d="M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3Z" />
      <path d="M18.5 14l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8 .8-2Z" />
    </g>
  ),
  // Web & Mobile Design — browser window + device
  web: (
    <g>
      <rect x="2.5" y="4" width="19" height="13" rx="2" />
      <path d="M2.5 8h19M9 21h6M12 17v4" />
    </g>
  ),
  // SEO & Search Optimization — magnifier
  seo: (
    <g>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4.3-4.3" />
    </g>
  ),
  // AI Automation & Smart Systems — CPU / chip
  ai: (
    <g>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M9.5 2v3M14.5 2v3M9.5 19v3M14.5 19v3M2 9.5h3M2 14.5h3M19 9.5h3M19 14.5h3" />
    </g>
  ),
  // Social Media & Content — chat bubble
  social: (
    <g>
      <path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.4L3 21l2.1-5.7A8.4 8.4 0 1 1 21 11.5Z" />
    </g>
  ),
  // Cybersecurity & Protection — shield + check
  security: (
    <g>
      <path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3Z" />
      <path d="M9.3 12l1.8 1.8L15 10" />
    </g>
  ),
}

function ServiceIcon({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {serviceIcons[name]}
    </svg>
  )
}

type Tag = { label: string; color: string }
type Service = {
  title: string
  description: string
  icon: string
  tags: Tag[]
  images: string[]
}

const services: Service[] = [
  {
    title: 'Brand Identity',
    description: 'Elevate your identity: sharp positioning, cohesive visuals, real impact.',
    icon: 'brand',
    tags: [
      { label: 'Art Direction', color: '#ef4444' },
      { label: 'Brand Strategy', color: '#ef4444' },
      { label: 'Logo design', color: '#ef4444' },
      { label: 'Color systems', color: '#ef4444' },
    ],
    images: [
      '/project%20image/Aurora%20Finance.png',
      '/project%20image/Helix%20Atelier.png',
      '/project%20image/%C3%89levare.png',
    ],
  },
  {
    title: 'Web & Mobile Design',
    description: 'Refresh or rebrand your UI; lift retention with clear flows and micro-interactions.',
    icon: 'web',
    tags: [
      { label: 'Clean & Modern UI', color: '#ef4444' },
      { label: 'UX Strategy', color: '#ef4444' },
      { label: 'Rebranding', color: '#ef4444' },
      { label: 'Design system', color: '#ef4444' },
    ],
    images: [
      '/project%20image/Nova%20Studio.png',
      '/project%20image/Monolith%20OS.png',
      '/project%20image/AxisOne.png',
    ],
  },
  {
    title: 'SEO & Search Optimization',
    description: 'Technical SEO, GEO, AEO, and schema architecture that earns rankings and AI citations.',
    icon: 'seo',
    tags: [
      { label: 'Technical SEO', color: '#22c55e' },
      { label: 'GEO', color: '#22c55e' },
      { label: 'AEO', color: '#22c55e' },
      { label: 'Schema', color: '#22c55e' },
    ],
    images: [
      '/project%20image/Monolith%20OS.png',
      '/project%20image/NovaGrid%20System.png',
      '/project%20image/AetherX.png',
    ],
  },
  {
    title: 'AI Automation & Smart Systems',
    description: 'Workflow automation, lead pipelines, RAG, and AI-augmented operations.',
    icon: 'ai',
    tags: [
      { label: 'Workflows', color: '#3b82f6' },
      { label: 'RAG', color: '#3b82f6' },
      { label: 'Chatbots', color: '#3b82f6' },
      { label: 'LLMO', color: '#3b82f6' },
    ],
    images: [
      '/project%20image/Pulse.png',
      '/project%20image/Neurovia.png',
      '/project%20image/omniflux.png',
    ],
  },
  {
    title: 'Social Media & Content',
    description: 'Reels, campaigns, storytelling systems, and short-form engines built for growth.',
    icon: 'social',
    tags: [
      { label: 'Reels', color: '#ec4899' },
      { label: 'Campaigns', color: '#ec4899' },
      { label: 'Strategy', color: '#ec4899' },
      { label: 'Production', color: '#ec4899' },
    ],
    images: [
      '/project%20image/Helix%20Atelier.png',
      '/project%20image/Kairo.png',
      '/project%20image/Velor%C3%A9%20Dynamics.png',
    ],
  },
  {
    title: 'Cybersecurity & Protection',
    description: 'Hardening, pentests, infrastructure audits, and digital-business protection layers.',
    icon: 'security',
    tags: [
      { label: 'Pentests', color: '#a855f7' },
      { label: 'Audits', color: '#a855f7' },
      { label: 'Hardening', color: '#a855f7' },
      { label: 'Monitoring', color: '#a855f7' },
    ],
    images: [
      '/project%20image/SentinelCore.png',
      '/project%20image/Vertex%20Robotics.png',
      '/project%20image/Blackstone.png',
    ],
  },
]

/* â”€â”€â”€ Single service card â”€â”€â”€ */
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [slide, setSlide] = useState(0)

  const onDragEnd = (_: never, info: PanInfo) => {
    const threshold = 50
    if (info.offset.x < -threshold && slide < service.images.length - 1) {
      setSlide((s) => s + 1)
    } else if (info.offset.x > threshold && slide > 0) {
      setSlide((s) => s - 1)
    }
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group relative flex h-full flex-col gap-4 rounded-[24px] border border-brand-off-gray/70 bg-white p-4 shadow-[0_2px_8px_rgba(36,16,6,0.04)] transition-shadow hover:shadow-[0_16px_50px_-20px_rgba(36,16,6,0.18)] md:p-5"
    >
      {/* Header: per-service icon */}
      <div className="flex items-center justify-between">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-black text-white">
          <ServiceIcon name={service.icon} />
        </div>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-brand-black/30 group-hover:text-brand-orange transition-colors duration-300">
          <path d="M5 15L15 5M15 5H7M15 5V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Title + description */}
      <div className="flex min-h-[78px] flex-col gap-1.5">
        <h3 className="font-zalando text-[19px] md:text-[21px] font-semibold text-brand-black leading-tight">
          {service.title}
        </h3>
        <p className="dm-p14-semi text-brand-black/60 leading-relaxed max-w-[420px]">
          {service.description}
        </p>
      </div>

      {/* Tag chips */}
      <ul className="flex flex-wrap gap-2">
        {service.tags.map((t, i) => (
          <li
            key={i}
            className="inline-flex items-center gap-1.5 rounded-full border border-brand-off-gray/80 bg-brand-light-white px-3 py-1 text-[11px] font-medium text-brand-black/75"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: t.color }} />
            {t.label}
          </li>
        ))}
      </ul>

      {/* Image slider — full-bleed to card edges */}
      <div className="relative mt-1 -mx-4 md:-mx-5 aspect-[16/10] overflow-hidden bg-brand-black cursor-grab active:cursor-grabbing select-none">
        <motion.div
          className="flex h-full w-full"
          animate={{ x: `-${slide * 100}%` }}
          transition={{ type: 'spring', stiffness: 280, damping: 32 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={onDragEnd}
        >
          {service.images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${service.title} preview ${i + 1}`}
              className="h-full w-full shrink-0 object-cover pointer-events-none"
              draggable={false}
            />
          ))}
        </motion.div>

        {/* Slide counter */}
        <div className="absolute top-3 right-3 rounded-full bg-black/55 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-semibold text-white">
          {slide + 1}/{service.images.length}
        </div>

        {/* Arrow controls */}
        <button
          type="button"
          aria-label="Previous"
          onClick={() => setSlide((s) => Math.max(0, s - 1))}
          disabled={slide === 0}
          className="absolute left-2 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-brand-black shadow-md transition-opacity disabled:opacity-0 hover:bg-white"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => setSlide((s) => Math.min(service.images.length - 1, s + 1))}
          disabled={slide === service.images.length - 1}
          className="absolute right-2 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-brand-black shadow-md transition-opacity disabled:opacity-0 hover:bg-white"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-1.5">
        {service.images.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setSlide(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === slide ? 'w-6 bg-brand-black' : 'w-1.5 bg-brand-black/25 hover:bg-brand-black/45'
            }`}
          />
        ))}
      </div>
    </motion.article>
  )
}

/* â”€â”€â”€ Section â”€â”€â”€ */
export default function ServiceSection() {
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
              Services
            </span>
            <h2 className="font-zalando text-[32px] leading-[1.02] md:text-[42px] lg:text-[52px] font-semibold text-brand-black max-w-[820px]">
              What We Do.
            </h2>
          </div>
          <p className="max-w-[320px] dm-p14-semi text-brand-black/65 leading-relaxed">
            We combine strategy, speed, and skill to deliver exceptional design -
            every time.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 md:gap-4 xl:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
