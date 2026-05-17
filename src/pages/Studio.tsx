import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SEO } from '../components/SEO'
import { SITE_ORIGIN, buildBreadcrumbs } from '../components/seo-utils'
import { PageHero } from '../components/PageHero'

const capabilities = [
  {
    n: '01',
    title: 'Brand Identity & Visual Systems',
    body: 'Logo systems, type foundries, color architecture, motion identities, and tone of voice for premium brands and ambitious founders.',
  },
  {
    n: '02',
    title: 'Web Design & Development',
    body: 'Cinematic websites, SEO-optimized landing pages, custom builds in Framer, Next.js, and headless CMS stacks.',
  },
  {
    n: '03',
    title: 'AI Automation & Smart Systems',
    body: 'Workflow automations, lead-gen pipelines, chatbots, and AI-augmented content systems for modern operations.',
  },
  {
    n: '04',
    title: 'SEO, GEO & AEO Optimization',
    body: 'Technical SEO, schema architecture, GEO targeting, and Answer Engine Optimization that gets you cited by AI search.',
  },
  {
    n: '05',
    title: 'Social Media & Content Marketing',
    body: 'Reels, campaigns, storytelling systems, and short-form content engines built for visibility and growth.',
  },
  {
    n: '06',
    title: 'Cybersecurity & Digital Protection',
    body: 'Site hardening, penetration testing, infrastructure audits, and protection layers for modern digital businesses.',
  },
]

const principles = [
  {
    title: 'Strategy before pixels.',
    body: 'Every project starts with the question — what does this brand need to win? Visuals follow.',
  },
  {
    title: 'Cinematic over corporate.',
    body: 'Editorial typography, motion-driven interactions, and atmospheric direction. No SaaS aesthetic.',
  },
  {
    title: 'Built for AI search.',
    body: 'Every site we ship is structured for Google, Perplexity, ChatGPT, and the engines that come next.',
  },
  {
    title: 'Future-ready by default.',
    body: 'Performance budgets, modern stacks, accessibility, and infrastructure that grows with the business.',
  },
]

export default function Studio() {
  const canonical = `${SITE_ORIGIN}/studio`
  const ogImage = `${SITE_ORIGIN}/images/2fdsjkfa.png`

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About CKR Creatives — Dubai Creative Agency',
    url: canonical,
    description:
      'CKR Creatives is a Dubai-based creative agency designing future-ready brands, cinematic websites, AI systems, and SEO-optimized digital experiences for modern businesses worldwide.',
    mainEntity: {
      '@type': 'Organization',
      name: 'CKR Creatives',
      url: SITE_ORIGIN,
      email: 'ckrstudiodesign@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dubai',
        addressCountry: 'AE',
      },
      foundingLocation: 'Dubai, United Arab Emirates',
      areaServed: ['AE', 'GCC', 'Worldwide'],
      knowsAbout: [
        'Brand Identity',
        'Web Design',
        'Web Development',
        'SEO Optimization',
        'AI Automation',
        'Social Media Marketing',
        'Cybersecurity',
        'Answer Engine Optimization',
        'GEO Targeting',
      ],
      makesOffer: capabilities.map((c) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: c.title },
      })),
    },
  }

  const breadcrumbs = buildBreadcrumbs(SITE_ORIGIN, [
    ['Home', '/'],
    ['Studio', '/studio'],
  ])

  return (
    <>
      <SEO
        title="Studio — CKR Creatives | Dubai Creative Agency for Branding, Web & AI"
        description="Inside CKR Creatives — a Dubai-based creative agency building future-ready brands, cinematic websites, AI automation systems, and SEO-optimized digital experiences for modern businesses."
        canonical={canonical}
        ogImage={ogImage}
        keywords="Dubai Creative Agency, Creative Studio Dubai, Luxury Branding Studio, AI Agency Dubai, Future-Ready Digital Agency, Web Design Studio UAE"
        jsonLd={[aboutSchema, breadcrumbs]}
      />

      <PageHero
        eyebrow="The Studio"
        heading="The Dubai studio behind future-ready brands."
        description="CKR Creatives is a Dubai-based agency designing premium brand systems, cinematic websites, AI automations, and SEO ecosystems for modern businesses and ambitious founders worldwide."
        bgImage="/images/2fdsjkfa.png"
        actions={
          <>
            <Link
              to="/work"
              className="inline-flex items-center justify-center rounded-full bg-brand-white px-6 py-4 dm-p14-semi text-brand-orange uppercase tracking-[0.5px]"
            >
              See Selected Work
            </Link>
            <Link
              to="/#contact"
              className="inline-flex items-center justify-center rounded-full border border-brand-white/30 px-6 py-4 dm-p14-semi text-brand-white uppercase tracking-[0.5px]"
            >
              Start A Project
            </Link>
          </>
        }
      />

      {/* Story block */}
      <section className="w-full bg-brand-white px-5 py-16 md:px-10 md:py-24 xl:px-[72px]">
        <div className="mx-auto w-full max-w-[1920px] grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-4"
          >
            <span className="dm-p14-semi uppercase tracking-[0.25em] text-brand-orange">
              (Our Story)
            </span>
            <h2 className="font-zalando font-semibold text-[clamp(2rem,4vw,3.25rem)] leading-[1.02] mt-6">
              We design brand ecosystems, not deliverables.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="lg:col-span-7 lg:col-start-6 flex flex-col gap-6 dm-p18-semi text-brand-light-black"
          >
            <p>
              CKR Creatives was founded on a simple belief: modern brands deserve more than a logo
              and a landing page. They deserve a complete digital ecosystem — strategy, identity,
              web, content, automation — designed to grow together.
            </p>
            <p>
              Based in Dubai and working with clients across the GCC, Europe, and North America, we
              build for founders and teams who want their brand to feel premium, move fast, and
              compound visibility through technical SEO, AI search optimization, and structured
              storytelling.
            </p>
            <p>
              Every engagement starts with a strategy phase, follows through to high-fidelity design
              and engineering, and concludes with measurable launch optimization. It&apos;s how
              luxury brands, modern startups, and ambitious operators ship work that actually moves
              the needle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="w-full bg-brand-off-white px-5 py-16 md:px-10 md:py-24 xl:px-[72px]">
        <div className="mx-auto w-full max-w-[1920px]">
          <div className="flex flex-col gap-6 max-w-[820px] mb-12">
            <span className="dm-p14-semi uppercase tracking-[0.25em] text-brand-orange">
              (Capabilities)
            </span>
            <h2 className="font-zalando font-semibold text-[clamp(2rem,4vw,3.5rem)] leading-[1.02]">
              Six disciplines, one studio.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((c, i) => (
              <motion.article
                key={c.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="rounded-[24px] bg-brand-white border border-brand-off-gray p-8 flex flex-col gap-4 min-h-[260px] transition-colors hover:bg-brand-black hover:text-brand-white"
              >
                <span className="dm-p14-semi opacity-50">{c.n}</span>
                <h3 className="zalando-h3-44 leading-tight">{c.title}</h3>
                <p className="dm-p16-medium opacity-70 mt-auto">{c.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="w-full bg-brand-white px-5 py-16 md:px-10 md:py-24 xl:px-[72px]">
        <div className="mx-auto w-full max-w-[1920px]">
          <div className="flex flex-col gap-6 max-w-[820px] mb-12">
            <span className="dm-p14-semi uppercase tracking-[0.25em] text-brand-orange">
              (How We Work)
            </span>
            <h2 className="font-zalando font-semibold text-[clamp(2rem,4vw,3.5rem)] leading-[1.02]">
              Four principles, no exceptions.
            </h2>
          </div>
          <ol className="flex flex-col">
            {principles.map((p, i) => (
              <motion.li
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="grid grid-cols-12 gap-6 items-baseline border-t border-brand-off-gray py-8"
              >
                <span className="col-span-2 md:col-span-1 dm-p18-semi text-brand-light-black">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="col-span-10 md:col-span-4 zalando-h3-44 leading-tight">
                  {p.title}
                </h3>
                <p className="col-span-12 md:col-span-7 dm-p18-semi text-brand-light-black">
                  {p.body}
                </p>
              </motion.li>
            ))}
            <li aria-hidden className="border-t border-brand-off-gray" />
          </ol>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="w-full bg-brand-black text-brand-white px-5 py-20 md:px-10 md:py-28 xl:px-[72px] relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url("/images/dasufiua.png")' }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,122,26,0.32) 0%, rgba(36,16,6,0.5) 50%, rgba(0,0,0,0.9) 100%)',
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-[1920px] flex flex-col gap-8 items-start">
          <span className="dm-p14-semi uppercase tracking-[0.25em] text-brand-orange">
            (Get In Touch)
          </span>
          <h2 className="font-zalando font-semibold text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.98] max-w-[900px]">
            Have a project in mind? Let&apos;s build something that lasts.
          </h2>
          <div className="flex flex-wrap gap-4 mt-4">
            <Link
              to="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-brand-white px-8 py-4 dm-p14-semi text-brand-orange uppercase tracking-[0.5px]"
            >
              Start Your Project
            </Link>
            <a
              href="mailto:ckrstudiodesign@gmail.com"
              className="inline-flex items-center justify-center rounded-full border border-brand-white/30 px-8 py-4 dm-p14-semi text-brand-white uppercase tracking-[0.5px]"
            >
              ckrstudiodesign@gmail.com
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
