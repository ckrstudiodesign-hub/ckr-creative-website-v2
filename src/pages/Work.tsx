import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { SEO } from '../components/SEO'
import { SITE_ORIGIN, buildBreadcrumbs } from '../components/seo-utils'
import { PageHero } from '../components/PageHero'

type FilterTag = 'All' | 'Branding' | 'Web' | 'AI' | 'Motion' | 'Commerce'

type CaseStudy = {
  slug: string
  title: string
  client: string
  year: string
  category: string
  scope: string[]
  excerpt: string
  cover: string
  tags: Exclude<FilterTag, 'All'>[]
}

const cases: CaseStudy[] = [
  {
    slug: 'novagrid-systems',
    title: 'AI Infrastructure Platform',
    client: 'NovaGrid Systems',
    year: '2025',
    category: 'AI · Infrastructure',
    scope: ['AI workflows', 'Platform design', 'Brand system'],
    excerpt:
      'A next-generation AI infrastructure brand and product experience — identity, dashboards, and a launch site engineered for scale.',
    cover: '/project image/NovaGrid System.png',
    tags: ['AI', 'Web', 'Branding'],
  },
  {
    slug: 'velore-dynamics',
    title: 'Luxury Mobility Identity',
    client: 'Veloré Dynamics',
    year: '2025',
    category: 'Luxury · Mobility',
    scope: ['Brand identity', 'Editorial site', 'Motion grammar'],
    excerpt:
      'An editorial identity and cinematic site for a luxury mobility marque — bespoke wordmark, motion language, GCC-ready storytelling.',
    cover: '/project image/Veloré Dynamics.png',
    tags: ['Branding', 'Motion', 'Web'],
  },
  {
    slug: 'aetherx-aerospace',
    title: 'Space Technology Brand',
    client: 'AetherX Aerospace',
    year: '2025',
    category: 'Aerospace · Web',
    scope: ['Brand system', 'Investor narrative', 'Launch site'],
    excerpt:
      'A future-facing aerospace identity and launch experience — investor narrative, mission storytelling, and a press-ready digital home.',
    cover: '/project image/AetherX.png',
    tags: ['Branding', 'Web'],
  },
  {
    slug: 'blackstone-quantum',
    title: 'Fintech Platform Identity',
    client: 'Blackstone Quantum',
    year: '2024',
    category: 'Fintech · Product',
    scope: ['Product design', 'Brand identity', 'Marketing site'],
    excerpt:
      'A serious-yet-modern fintech identity for a quant-driven platform — UI system, marketing site, and conversion-tuned funnels.',
    cover: '/project image/Blackstone.png',
    tags: ['Branding', 'Web'],
  },
  {
    slug: 'neurovia-health',
    title: 'AI Healthcare Experience',
    client: 'Neurovia Health',
    year: '2024',
    category: 'AI · Healthcare',
    scope: ['Product UI', 'Brand system', 'SEO architecture'],
    excerpt:
      'A clinical-grade AI healthcare brand — accessible product UI, trust-first content, and an SEO architecture built for visibility.',
    cover: '/project image/Neurovia.png',
    tags: ['AI', 'Web', 'Branding'],
  },
  {
    slug: 'sentinelcore-labs',
    title: 'Cybersecurity Brand Reset',
    client: 'SentinelCore Labs',
    year: '2024',
    category: 'Cybersecurity · Web',
    scope: ['Brand identity', 'Product site', 'Content system'],
    excerpt:
      'A confident cybersecurity identity and site reset — clear messaging, technical depth, and a content engine tuned for enterprise buyers.',
    cover: '/project image/SentinelCore.png',
    tags: ['Branding', 'Web'],
  },
  {
    slug: 'elevare-collection',
    title: 'Luxury Hospitality Identity',
    client: 'Élevare Collection',
    year: '2024',
    category: 'Hospitality · Branding',
    scope: ['Brand identity', 'Editorial site', 'Booking flow'],
    excerpt:
      'A refined hospitality identity and editorial booking experience — quiet luxury, considered typography, and a global guest journey.',
    cover: '/project image/Élevare.png',
    tags: ['Branding', 'Web'],
  },
  {
    slug: 'kairo-robotics',
    title: 'Autonomous Robotics Launch',
    client: 'Kairo Robotics',
    year: '2024',
    category: 'Robotics · Launch',
    scope: ['Brand system', 'Launch site', 'Investor deck'],
    excerpt:
      'A precision identity and cinematic launch experience for an autonomous robotics platform — built for press, investors, and partners.',
    cover: '/project image/Kairo.png',
    tags: ['Branding', 'Motion', 'AI'],
  },
  {
    slug: 'axisone-developments',
    title: 'Proptech Platform Brand',
    client: 'AxisOne Developments',
    year: '2023',
    category: 'Proptech · Web',
    scope: ['Brand identity', 'Marketing site', 'CRM integration'],
    excerpt:
      'A modern proptech identity and marketing site — pipeline-ready lead capture, CRM integration, and a sales-aligned content system.',
    cover: '/project image/AxisOne.png',
    tags: ['Branding', 'Web'],
  },
  {
    slug: 'omniflux-commerce',
    title: 'AI Commerce Experience',
    client: 'OmniFlux Commerce',
    year: '2023',
    category: 'AI · Commerce',
    scope: ['Storefront design', 'AI personalization', 'Brand system'],
    excerpt:
      'An AI-native commerce platform — personalized storefronts, brand-grade UI, and a content engine tuned for organic growth.',
    cover: '/project image/omniflux.png',
    tags: ['Commerce', 'AI', 'Web'],
  },
  {
    slug: 'aurora-finance',
    title: 'Future-First Finance Brand',
    client: 'Aurora Finance',
    year: '2022',
    category: 'Brand · Web · SEO',
    scope: ['Identity', 'Website', 'SEO architecture'],
    excerpt:
      'A complete digital ecosystem for a Dubai-based wealth platform — identity system, cinematic site, AI-driven SEO architecture.',
    cover: '/project image/Aurora Finance.png',
    tags: ['Branding', 'Web', 'AI'],
  },
  {
    slug: 'nova-studio',
    title: 'Cinematic Studio Identity',
    client: 'Nova Studio',
    year: '2022',
    category: 'Identity · Motion',
    scope: ['Brand identity', 'Motion language', 'Editorial site'],
    excerpt:
      'Re-imagined identity for a production studio. Editorial wordmark, motion grammar, and a portfolio site that performs in search.',
    cover: '/project image/Nova Studio.png',
    tags: ['Branding', 'Motion', 'Web'],
  },
  {
    slug: 'monolith-os',
    title: 'AI Product Design System',
    client: 'Monolith OS',
    year: '2022',
    category: 'Product · AI',
    scope: ['Product design', 'AI workflows', 'Design system'],
    excerpt:
      'A unified design system and AI workflow layer for an enterprise SaaS — from foundations to launch-ready interfaces.',
    cover: '/project image/Monolith OS.png',
    tags: ['AI', 'Web'],
  },
  {
    slug: 'pulse-app',
    title: 'Mobile Brand Reset',
    client: 'Pulse',
    year: '2021',
    category: 'Mobile · Branding',
    scope: ['Mobile UI', 'Brand refresh', 'Marketing site'],
    excerpt:
      'A health-tech rebrand and mobile redesign that doubled retention and tripled organic search visibility.',
    cover: '/project image/Pulse.png',
    tags: ['Branding', 'Web'],
  },
  {
    slug: 'helix-commerce',
    title: 'Luxury Commerce Experience',
    client: 'Helix Atelier',
    year: '2021',
    category: 'E-commerce · Branding',
    scope: ['Shopify Plus', 'Brand system', 'Editorial campaigns'],
    excerpt:
      'A premium DTC reset — bespoke editorial site, conversion-tuned commerce, and a global SEO push for the GCC region.',
    cover: '/project image/Helix Atelier.png',
    tags: ['Commerce', 'Branding', 'Web'],
  },
  {
    slug: 'vertex-launch',
    title: 'Series A Launch Site',
    client: 'Vertex Robotics',
    year: '2020',
    category: 'Web · Launch',
    scope: ['Web design', 'Copywriting', 'Investor deck'],
    excerpt:
      'A cinematic launch experience and investor narrative for a robotics platform raising their Series A.',
    cover: '/project image/Vertex Robotics.png',
    tags: ['Web', 'Branding', 'Motion'],
  },
]

const FILTER_TAGS: FilterTag[] = ['All', 'Branding', 'Web', 'AI', 'Motion', 'Commerce']

export default function Work() {
  const canonical = `${SITE_ORIGIN}/work`
  const ogImage = `${SITE_ORIGIN}/images/fsahkf.png`

  const [activeTag, setActiveTag] = useState<FilterTag>('All')
  const visibleCases = useMemo(
    () => (activeTag === 'All' ? cases : cases.filter((c) => c.tags.includes(activeTag))),
    [activeTag],
  )

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Selected Work — CKR Creatives Portfolio',
    url: canonical,
    description:
      'Selected case studies from CKR Creatives — premium branding, cinematic websites, AI systems, and SEO-optimized digital experiences shipped for modern businesses.',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: cases.length,
      itemListElement: cases.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_ORIGIN}/work/${c.slug}`,
        name: c.title,
        item: {
          '@type': 'CreativeWork',
          name: c.title,
          headline: c.title,
          alternativeHeadline: `${c.client} — ${c.category}`,
          description: c.excerpt,
          dateCreated: c.year,
          creator: { '@type': 'Organization', name: 'CKR Creatives' },
          about: c.scope,
          image: `${SITE_ORIGIN}${c.cover}`,
        },
      })),
    },
  }

  const breadcrumbs = buildBreadcrumbs(SITE_ORIGIN, [
    ['Home', '/'],
    ['Work', '/work'],
  ])

  return (
    <>
      <SEO
        title="Selected Work — CKR Creatives Portfolio | Branding, Web, AI"
        description="Selected case studies from CKR Creatives — premium branding, cinematic websites, AI automation, and SEO-optimized projects for modern businesses in Dubai and worldwide."
        canonical={canonical}
        ogImage={ogImage}
        keywords="CKR Creatives portfolio, Dubai branding projects, web design portfolio Dubai, AI agency case studies, modern brand projects, premium web design work"
        jsonLd={[collectionSchema, breadcrumbs]}
      />

      <PageHero
        eyebrow="Selected Work"
        heading="Brand, web, AI &amp; motion projects built to last."
        description="A growing catalog of premium brand systems, cinematic websites, and AI-powered digital ecosystems we&rsquo;ve shipped for ambitious founders, luxury brands, and modern operators."
        bgImage="/images/fsahkf.png"
        actions={
          <>
            <Link
              to="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-brand-white px-6 py-4 dm-p14-semi text-brand-orange uppercase tracking-[0.5px]"
            >
              Start Your Project
            </Link>
            <Link
              to="/studio"
              className="inline-flex items-center justify-center rounded-full border border-brand-white/30 px-6 py-4 dm-p14-semi text-brand-white uppercase tracking-[0.5px]"
            >
              Inside The Studio
            </Link>
          </>
        }
      />

      {/* Filter strip */}
      <section className="w-full bg-brand-white px-5 pt-10 pb-4 md:px-10 xl:px-[72px]">
        <div className="mx-auto w-full max-w-[1920px] flex flex-wrap items-center gap-3 dm-p14-semi text-brand-light-black">
          <span className="opacity-50 mr-2">Filter —</span>
          {FILTER_TAGS.map((tag) => {
            const isActive = activeTag === tag
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                aria-pressed={isActive}
                className={`rounded-full border px-4 py-2 transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-brand-black text-brand-white border-brand-black'
                    : 'border-brand-off-gray hover:border-brand-black hover:text-brand-black'
                }`}
              >
                {tag}
              </button>
            )
          })}
          <span className="ml-auto opacity-50 hidden md:inline">
            {visibleCases.length} {visibleCases.length === 1 ? 'project' : 'projects'}
          </span>
        </div>
      </section>

      {/* Case study grid */}
      <section className="w-full bg-brand-white px-5 py-12 md:px-10 md:py-16 xl:px-[72px]">
        <div className="mx-auto w-full max-w-[1920px]">
          {visibleCases.length === 0 ? (
            <p className="dm-p18-semi text-brand-light-black text-center py-16">
              No projects match this filter yet — try another category.
            </p>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16">
            {visibleCases.map((c, i) => (
              <motion.article
                key={c.slug}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.55, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group"
              >
                <Link to={`/work/${c.slug}`} className="block">
                  <div
                    className="relative aspect-[4/3] rounded-[24px] bg-brand-white overflow-hidden transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                  >
                    <div 
                      className="absolute inset-4 bg-contain bg-no-repeat bg-center mix-blend-multiply"
                      style={{ backgroundImage: `url("${encodeURI(c.cover)}")` }}
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)',
                      }}
                    />
                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                      <span className="dm-p14-semi text-brand-white uppercase tracking-[0.18em]">
                        {c.category}
                      </span>
                      <span className="dm-p14-semi text-brand-white/80">{c.year}</span>
                    </div>
                  </div>
                  <header className="mt-5 flex items-baseline justify-between gap-4">
                    <h2 className="zalando-h3-44 leading-tight">{c.title}</h2>
                    <span className="dm-p14-semi text-brand-light-black shrink-0">{c.client}</span>
                  </header>
                  <p className="mt-3 dm-p18-semi text-brand-light-black max-w-[60ch]">
                    {c.excerpt}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {c.scope.map((s) => (
                      <li
                        key={s}
                        className="rounded-full border border-brand-off-gray px-3 py-1 dm-p14-medium text-brand-light-black"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </Link>
              </motion.article>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="w-full bg-brand-black text-brand-white px-5 py-20 md:px-10 md:py-28 xl:px-[72px] relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: 'url("/images/2fdsjkfa.png")' }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,122,26,0.35) 0%, rgba(36,16,6,0.55) 50%, rgba(0,0,0,0.92) 100%)',
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-[1920px] flex flex-col gap-8 items-start">
          <span className="dm-p14-semi uppercase tracking-[0.25em] text-brand-orange">
            (Next Project)
          </span>
          <h2 className="font-zalando font-semibold text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.98] max-w-[1000px]">
            Yours could be the next one in this collection.
          </h2>
          <p className="dm-p18-semi text-brand-white/75 max-w-[640px]">
            Branding, web design, AI systems, SEO — book a 30-minute intro and we&apos;ll map the
            shortest path from idea to live brand.
          </p>
          <div className="flex flex-wrap gap-4 mt-2">
            <Link
              to="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-brand-white px-8 py-4 dm-p14-semi text-brand-orange uppercase tracking-[0.5px]"
            >
              Start A Project
            </Link>
            <Link
              to="/studio"
              className="inline-flex items-center justify-center rounded-full border border-brand-white/30 px-8 py-4 dm-p14-semi text-brand-white uppercase tracking-[0.5px]"
            >
              About The Studio
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
