import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

/* ------------------------------------------------------------------ */
/*  "What Sets Us Apart" — Ultra-minimal animated list                */
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
    <section className="bg-brand-light-white text-brand-black overflow-hidden relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="py-24 md:py-32 relative z-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="dm-p14-semi uppercase tracking-[0.2em] text-brand-orange mb-4 block"
            >
              What Sets Us Apart
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-balance font-zalando text-4xl font-semibold md:text-5xl lg:text-6xl text-brand-black leading-tight"
            >
              Optimized For Search, Performance & Digital Growth
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-8 flex flex-wrap items-center gap-2.5"
          >
            <span className="dm-p14-semi uppercase tracking-[0.2em] text-brand-black/55">
              Tuned for
            </span>
            {['Google', 'Bing', 'ChatGPT', 'Perplexity', 'Gemini', 'Claude', 'Copilot'].map(
              (engine) => (
                <span
                  key={engine}
                  className="rounded-full border border-brand-off-gray/80 bg-white/70 px-4 py-1.5 text-xs uppercase tracking-[0.14em] text-brand-black/75"
                >
                  {engine}
                </span>
              ),
            )}
          </motion.div>

          <div className="mt-20 max-w-5xl flex flex-col">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 1, 0.5, 1] }}
                className="group flex items-center gap-6 border-b border-brand-off-gray/40 py-6 md:py-8 cursor-default"
              >
                <span className="dm-p14-semi text-brand-black/30 min-w-[50px] transition-colors group-hover:text-brand-orange">
                  {String(i + 1).padStart(2, '0')} / 08
                </span>
                
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl md:text-3xl font-zalando text-brand-black/80 transition-colors duration-300 group-hover:text-brand-black">
                    {pillar.title}
                  </h3>
                  {/* Keep only the tagline for the first item based on the user's snippet, hide for the rest to minimize words */}
                  {i === 0 && (
                    <div className="flex flex-col gap-3 mt-1">
                      <p className="dm-p14-semi text-brand-black/60">{pillar.tagline}</p>
                      <div className="flex flex-wrap gap-2">
                        {pillar.signals.map(s => (
                          <span key={s} className="rounded-full bg-white border border-brand-off-gray/60 px-3 py-1 text-[10px] uppercase tracking-wider text-brand-black/60">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="ml-auto text-brand-black/10 transition-colors duration-500 group-hover:text-brand-orange shrink-0">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 52 52"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-8 md:size-12"
                  >
                    {pillar.glyph}
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-16 max-w-3xl dm-p14-semi text-brand-black/65"
          >
            Every CKR Creatives build ships with semantic HTML, Schema.org markup,
            <code className="mx-1 rounded bg-white border border-brand-off-gray/70 px-1.5 py-0.5 text-[12px] text-brand-black/80">
              llms.txt
            </code>
            guidance, edge-cached performance, and motion systems that read as well to
            humans as they do to search and generative-AI engines.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
