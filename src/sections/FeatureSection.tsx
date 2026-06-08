import { useRef, type ReactNode } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import SectionShell from '../components/SectionShell'

/* ------------------------------------------------------------------ */
/*  "What Sets Us Apart" — clean, Apple-style glassmorphism on cream.  */
/*  Matches the About section's light palette: cream surface, deep     */
/*  brown type, orange accent. Adds subtle 3D tilt + frosted cards.    */
/*  Ships JSON-LD + semantic markup for SEO / AEO / GEO / LLM.        */
/* ------------------------------------------------------------------ */

type Pillar = {
  title: string
  tagline: string
  signals: string[]
  glyph: ReactNode
}

const Glyph = {
  Search: (
    <g>
      <circle cx="22" cy="22" r="13" />
      <path d="M31 31 L44 44" />
    </g>
  ),
  Globe: (
    <g>
      <circle cx="26" cy="26" r="17" />
      <ellipse cx="26" cy="26" rx="17" ry="7" />
      <path d="M9 26 H43 M26 9 V43" />
    </g>
  ),
  Llm: (
    <g>
      <rect x="10" y="14" width="32" height="24" rx="6" />
      <path d="M16 22 H36 M16 28 H30" />
      <circle cx="26" cy="10" r="2.5" />
      <path d="M26 12.5 V14" />
    </g>
  ),
  Bolt: (
    <g>
      <path d="M28 6 L12 30 H24 L20 46 L38 22 H26 Z" />
    </g>
  ),
  Frame: (
    <g>
      <rect x="8" y="10" width="36" height="28" rx="4" />
      <path d="M8 18 H44" />
      <circle cx="14" cy="14" r="1.2" fill="currentColor" />
      <circle cx="19" cy="14" r="1.2" fill="currentColor" />
      <path d="M14 26 H38 M14 32 H28" />
    </g>
  ),
  Funnel: (
    <g>
      <path d="M8 10 H44 L30 28 V42 L22 38 V28 Z" />
    </g>
  ),
  Schema: (
    <g>
      <circle cx="26" cy="10" r="3.5" />
      <circle cx="10" cy="38" r="3.5" />
      <circle cx="26" cy="38" r="3.5" />
      <circle cx="42" cy="38" r="3.5" />
      <path d="M26 13.5 L10 34.5 M26 13.5 V34.5 M26 13.5 L42 34.5" />
    </g>
  ),
  Future: (
    <g>
      <polygon points="26,6 44,16 44,36 26,46 8,36 8,16" />
      <circle cx="26" cy="26" r="3" />
    </g>
  ),
}

const pillars: Pillar[] = [
  {
    title: 'SEO-first website architecture',
    tagline: 'Crawl-perfect IA, indexable from day one.',
    signals: ['SEO', 'Core Web Vitals', 'Sitemap'],
    glyph: Glyph.Search,
  },
  {
    title: 'GEO & AEO optimized content systems',
    tagline: 'Generative & Answer-Engine ready content.',
    signals: ['GEO', 'AEO', 'Answers'],
    glyph: Glyph.Globe,
  },
  {
    title: 'AI-search-friendly website structure',
    tagline: 'Built for ChatGPT, Perplexity, Gemini & Copilot.',
    signals: ['LLM', 'llms.txt', 'Citations'],
    glyph: Glyph.Llm,
  },
  {
    title: 'Fast-loading responsive experiences',
    tagline: 'Sub-second, fluid on every screen.',
    signals: ['INP', 'LCP', 'Edge CDN'],
    glyph: Glyph.Bolt,
  },
  {
    title: 'Cinematic UI/UX systems',
    tagline: 'Motion-led storytelling that converts.',
    signals: ['Motion', '3D', 'Story'],
    glyph: Glyph.Frame,
  },
  {
    title: 'Conversion-focused interfaces',
    tagline: 'Funnels engineered for measurable lift.',
    signals: ['CRO', 'A/B', 'Analytics'],
    glyph: Glyph.Funnel,
  },
  {
    title: 'Structured semantic design',
    tagline: 'Schema.org + accessible semantic HTML.',
    signals: ['Schema', 'A11y', 'Semantic'],
    glyph: Glyph.Schema,
  },
  {
    title: 'Future-ready digital technology',
    tagline: 'Composable, AI-augmented, evergreen.',
    signals: ['Edge', 'AI', 'Composable'],
    glyph: Glyph.Future,
  },
]

/* -------- Soft ambient backdrop: cream + floating glass orbs -------- */

function AmbientBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Hairline grid — barely visible, just for texture */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,122,26,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,122,26,0.06) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
        }}
      />
      {/* Soft warm glow blobs (the glassy halo) */}
      <motion.div
        className="absolute -top-32 -right-24 h-[480px] w-[480px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(255,122,26,0.22) 0%, rgba(255,122,26,0) 70%)',
          filter: 'blur(20px)',
        }}
        animate={{ y: [0, 24, 0], x: [0, -16, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-40 -left-24 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(255,180,120,0.28) 0%, rgba(255,180,120,0) 70%)',
          filter: 'blur(24px)',
        }}
        animate={{ y: [0, -20, 0], x: [0, 18, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

/* -------- Single pillar card: glassy, subtle 3D tilt ---------------- */

function PillarCard({ pillar, index }: { pillar: Pillar; index: number }) {
  const ref = useRef<HTMLElement | null>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 })
  const glowX = useTransform(mx, [-0.5, 0.5], [0, 100])
  const glowY = useTransform(my, [-0.5, 0.5], [0, 100])
  const glowBg = useTransform(
    [glowX, glowY] as unknown as MotionValue<number>[],
    (latest: number[]) =>
      `radial-gradient(360px circle at ${latest[0]}% ${latest[1]}%, rgba(255,122,26,0.14), transparent 60%)`,
  )

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 1200 }}
      className="group relative flex flex-col gap-4 rounded-[22px] border border-brand-off-gray/70 bg-white/60 p-5 backdrop-blur-xl will-change-transform"
      itemScope
      itemType="https://schema.org/Service"
    >
      {/* Inner top highlight — the Apple-glass sheen */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-4 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent)',
        }}
      />
      {/* Cursor-follow soft glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[22px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glowBg }}
      />

      {/* Header: index + glass glyph chip */}
      <div className="relative z-10 flex items-start justify-between" style={{ transform: 'translateZ(30px)' }}>
        <span className="dm-p14-semi text-brand-black/55">
          {String(index + 1).padStart(2, '0')} / 09
        </span>
        <div
          className="grid h-12 w-12 place-items-center rounded-2xl border border-brand-off-gray/80 bg-white/80 shadow-[0_8px_24px_-12px_rgba(255,122,26,0.45)]"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 52 52"
            fill="none"
            stroke="#ff7a1a"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {pillar.glyph}
          </svg>
        </div>
      </div>

      {/* Title + tagline */}
      <div className="relative z-10 flex flex-col gap-2" style={{ transform: 'translateZ(20px)' }}>
        <h3 className="zalando-h4-20 text-brand-black" itemProp="name">
          {pillar.title}
        </h3>
        <p className="dm-p14-semi text-brand-black/60" itemProp="description">
          {pillar.tagline}
        </p>
      </div>

      {/* Signal chips — Apple-style pills */}
      <ul className="relative z-10 mt-auto flex flex-wrap gap-2" style={{ transform: 'translateZ(15px)' }}>
        {pillar.signals.map((s) => (
          <li
            key={s}
            className="rounded-full border border-brand-off-gray/80 bg-white/70 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-brand-black/70"
          >
            {s}
          </li>
        ))}
      </ul>
    </motion.article>
  )
}

/* -------- Section ---------------------------------------------------- */

export default function FeatureSection() {
  // JSON-LD for SEO / AEO / GEO / LLM crawlers
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'What Sets CKR Creatives Apart',
    description:
      'SEO, GEO, AEO and LLM-ready website engineering: optimized architecture, AI-search-friendly structure, cinematic UI, and conversion-focused interfaces.',
    itemListElement: pillars.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.title,
      description: p.tagline,
    })),
  }

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <SectionShell
        eyebrow="What Sets Us Apart"
        heading="Optimized For Search, Performance & Digital Growth"
        background="bg-brand-light-white"
        textColor="text-brand-black"
        frameless
      >
        <div className="relative">
          <AmbientBackdrop />

          {/* "Tuned for" engine pills — matches the About section's chip row */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="relative z-10 mb-6 flex flex-wrap items-center gap-2.5"
          >
            <span className="dm-p14-semi uppercase tracking-[0.2em] text-brand-black/55">
              Tuned for
            </span>
            {['Google', 'Bing', 'ChatGPT', 'Perplexity', 'Gemini', 'Claude', 'Copilot'].map(
              (engine, i) => (
                <motion.span
                  key={engine}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.04 * i, duration: 0.4 }}
                  className="rounded-full border border-brand-off-gray/80 bg-white/70 px-4 py-1.5 text-xs uppercase tracking-[0.14em] text-brand-black/75 backdrop-blur-md"
                >
                  {engine}
                </motion.span>
              ),
            )}
          </motion.div>

          {/* Mobile: horizontal snap-scroll carousel; sm+: glassy pillar grid */}
          <div
            className="relative z-10 sm:hidden -mx-4 px-4 overflow-x-auto snap-x snap-mandatory flex gap-3 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ perspective: 1400 }}
          >
            {pillars.map((p, i) => (
              <div key={p.title} className="snap-center shrink-0 w-[78vw] max-w-[320px]">
                <PillarCard pillar={p} index={i} />
              </div>
            ))}
          </div>
          <div
            className="relative z-10 hidden sm:grid grid-cols-2 gap-4 lg:grid-cols-4"
            style={{ perspective: 1400 }}
          >
            {pillars.map((p, i) => (
              <PillarCard key={p.title} pillar={p} index={i} />
            ))}
          </div>
          {/* Mobile scroll hint */}
          <p className="sm:hidden mt-1 text-[11px] uppercase tracking-[0.22em] text-brand-black/50">
            ← Swipe to explore →
          </p>

          {/* Closing line — same warm-brown body voice as About */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 mt-6 max-w-[820px] dm-p14-semi text-brand-black/65"
          >
            Every CKR Creatives build ships with semantic HTML, Schema.org markup,
            <code className="mx-1 rounded bg-white/70 border border-brand-off-gray/70 px-1.5 py-0.5 text-[12px] text-brand-black/80">
              llms.txt
            </code>
            guidance, edge-cached performance, and motion systems that read as well to
            humans as they do to search and generative-AI engines.
          </motion.p>
        </div>
      </SectionShell>
    </div>
  )
}
