import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SEO } from '../components/SEO'
import { SITE_ORIGIN, buildBreadcrumbs } from '../components/seo-utils'
import { cases, type CaseStudy } from './Work'

/* ─────────────────────────────────────────────────────────────────────
   WorkDetail — renders a real case study page for /work/:slug, so no
   project link ever lands on "coming soon". Pulls metadata from the
   exported `cases` array in Work.tsx so the cover, scope, excerpt
   stay in sync with the archive grid; everything else (process,
   deliverables, related projects) is rendered inline.
   ───────────────────────────────────────────────────────────────────── */

const PROCESS_STEPS = [
  {
    title: 'Discovery',
    body: 'Stakeholder interviews, audit of existing assets, competitive landscape, and a clear written brief signed off before any pixels move.',
  },
  {
    title: 'Strategy',
    body: 'Positioning, narrative, audience, channels — translated into a short, opinionated playbook that drives every design and engineering decision downstream.',
  },
  {
    title: 'Design',
    body: 'Identity, system, and editorial direction. We design in Figma, prototype in Framer, and pressure-test against the strategy before handoff.',
  },
  {
    title: 'Build',
    body: 'TypeScript + React, headless CMS, edge-deployed. Performance, accessibility, and SEO budgets locked in from day one.',
  },
  {
    title: 'Launch',
    body: 'Migration, redirects, analytics, monitoring, and a launch comms kit. Then we stay on for 30 days of stabilization.',
  },
  {
    title: 'Grow',
    body: 'Optional retainer for SEO, AI automation, social production, and ongoing optimization. We treat brands as products, not projects.',
  },
]

const DELIVERABLES_BY_TAG: Record<string, string[]> = {
  Branding: ['Brand strategy doc', 'Visual identity system', 'Logo + wordmark suite', 'Brand guidelines PDF', 'Asset library'],
  Web: ['Design system in Figma', 'Production React build', 'Headless CMS', 'Analytics + SEO', 'Edge hosting'],
  AI: ['AI workflow map', 'Prompt + model selection', 'Eval harness', 'Production integration', 'Cost monitoring'],
  Motion: ['Motion grammar', 'Hero film', 'Brand reel', 'UI micro-interactions', 'Social cutdowns'],
  Commerce: ['Storefront design', 'Checkout optimization', 'Catalog architecture', 'Email + CRM flows', 'Reporting'],
}

function findCase(slug: string | undefined): CaseStudy | undefined {
  return cases.find((c) => c.slug === slug)
}

export default function WorkDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = findCase(slug)

  // If someone hits a non-existent slug, send them back to the archive
  // rather than rendering a hollow "coming soon" page.
  if (!project) return <Navigate to="/work" replace />

  const canonical = `${SITE_ORIGIN}/work/${project.slug}`
  const breadcrumbs = buildBreadcrumbs(SITE_ORIGIN, [
    ['Home', '/'],
    ['Work', '/work'],
    [project.client, `/work/${project.slug}`],
  ])

  const related = cases.filter((c) => c.slug !== project.slug).slice(0, 3)
  const deliverables = Array.from(
    new Set(project.tags.flatMap((t) => DELIVERABLES_BY_TAG[t] ?? [])),
  )

  return (
    <>
      <SEO
        title={`${project.title} — ${project.client} | CKR Creatives Case Study`}
        description={project.excerpt}
        canonical={canonical}
        ogImage={`${SITE_ORIGIN}${project.cover}`}
        keywords={`${project.client}, ${project.category}, CKR Creatives case study, Dubai branding`}
        jsonLd={[breadcrumbs]}
      />

      {/* Cinematic hero with the project cover */}
      <section className="relative w-full bg-brand-black text-brand-white overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-55"
          style={{ backgroundImage: `url("${project.cover}")` }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.92) 100%)',
          }}
        />
        <div className="relative z-10 px-5 pt-28 pb-16 md:px-10 md:pt-36 md:pb-20 xl:px-[72px]">
          <div className="mx-auto w-full max-w-[1180px] flex flex-col gap-6">
            <Link to="/work" className="dm-p14-semi uppercase tracking-[0.25em] text-brand-white/65 hover:text-brand-orange transition-colors">
              ← Back to Work
            </Link>
            <div className="flex flex-wrap items-center gap-3 dm-p14-semi uppercase tracking-[0.22em] text-brand-white/70">
              <span>{project.category}</span>
              <span className="opacity-50">·</span>
              <span>{project.year}</span>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-zalando text-[clamp(2.2rem,5vw,4.4rem)] font-semibold leading-[1.02] max-w-[18ch]"
            >
              {project.title}
            </motion.h1>
            <p className="dm-p18-semi text-brand-white/80 max-w-[60ch]">{project.excerpt}</p>
            <div className="flex flex-wrap gap-3 mt-2">
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-brand-white px-7 py-4 dm-p14-semi text-brand-orange uppercase tracking-[0.5px]"
                >
                  Visit Live Site ↗
                </a>
              ) : null}
              <Link
                to="/#contact"
                className="inline-flex items-center justify-center rounded-full border border-brand-white/30 px-7 py-4 dm-p14-semi text-brand-white uppercase tracking-[0.5px]"
              >
                Start a similar project
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Project facts strip */}
      <section className="w-full bg-brand-white border-b border-brand-off-gray/70 px-5 py-8 md:px-10 md:py-10 xl:px-[72px]">
        <div className="mx-auto w-full max-w-[1180px] grid grid-cols-2 md:grid-cols-4 gap-6">
          <Fact label="Client" value={project.client} />
          <Fact label="Year" value={project.year} />
          <Fact label="Category" value={project.category} />
          <Fact label="Status" value={project.href ? 'Live' : 'Case Study'} />
        </div>
      </section>

      {/* Big editorial cover */}
      <section className="w-full bg-brand-white px-5 py-12 md:px-10 md:py-16 xl:px-[72px]">
        <div className="mx-auto w-full max-w-[1180px]">
          <div
            className="aspect-[16/10] w-full rounded-[28px] bg-brand-black bg-cover bg-center overflow-hidden"
            style={{ backgroundImage: `url("${project.cover}")` }}
          />
        </div>
      </section>

      {/* Two-column: brief / scope */}
      <section className="w-full bg-brand-white px-5 py-12 md:px-10 md:py-16 xl:px-[72px]">
        <div className="mx-auto w-full max-w-[1180px] grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">
          <div>
            <span className="dm-p14-semi uppercase tracking-[0.25em] text-brand-orange">The Brief</span>
            <h2 className="zalando-h2-lh69 mt-3 text-brand-black">
              About the project.
            </h2>
            <p className="dm-p18-semi mt-5 text-brand-light-black">
              {project.story?.overview ?? project.excerpt}
            </p>
            {!project.story && (
              <p className="dm-p18-semi mt-4 text-brand-light-black">
                We approach every project with a clear narrative, a defined system, and engineering
                that holds up under real traffic. That means tight collaboration with the client team,
                measurable outcomes, and assets that keep working long after launch.
              </p>
            )}
          </div>
          <aside className="rounded-2xl border border-brand-off-gray/70 bg-brand-light-white p-6">
            <span className="dm-p14-semi uppercase tracking-[0.22em] text-brand-light-black">Scope</span>
            <ul className="mt-3 flex flex-col gap-2">
              {project.scope.map((s) => (
                <li key={s} className="dm-p14-semi text-brand-black flex items-start gap-2">
                  <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* Rich story (challenges / solutions / results) when present */}
      {project.story && (
        <section className="w-full bg-brand-white px-5 py-4 md:px-10 md:py-8 xl:px-[72px]">
          <div className="mx-auto w-full max-w-[1180px] grid grid-cols-1 md:grid-cols-3 gap-6">
            <StoryCard
              eyebrow="Challenges"
              title="What they were facing"
              items={project.story.challenges}
              accent="rgba(255,122,26,0.10)"
            />
            <StoryCard
              eyebrow="How we helped"
              title="What CKR Creatives delivered"
              items={project.story.solutions}
              accent="rgba(36,16,6,0.06)"
            />
            <StoryCard
              eyebrow="Results"
              title="What shipped"
              items={project.story.results}
              accent="rgba(20,160,90,0.10)"
            />
          </div>

          {project.story.quote && (
            <div className="mx-auto w-full max-w-[1180px] mt-10">
              <figure className="relative rounded-2xl bg-brand-light-white border border-brand-off-gray/70 p-8 md:p-10">
                <svg
                  aria-hidden
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="#ff7a1a"
                  className="absolute -top-4 left-6"
                >
                  <path d="M7.17 6A5.17 5.17 0 0 0 2 11.17V18h6.17V11.17H5.34A1.83 1.83 0 0 1 7.17 9.34V6zm9 0a5.17 5.17 0 0 0-5.17 5.17V18h6.17V11.17h-2.83a1.83 1.83 0 0 1 1.83-1.83V6z" />
                </svg>
                <blockquote className="zalando-h4-28 leading-snug text-brand-black">
                  “{project.story.quote.text}”
                </blockquote>
                <figcaption className="mt-5 dm-p14-semi uppercase tracking-[0.22em] text-brand-light-black">
                  — {project.story.quote.attribution}
                </figcaption>
              </figure>
            </div>
          )}
        </section>
      )}

      {/* Process */}
      <section className="w-full bg-brand-light-white px-5 py-12 md:px-10 md:py-16 xl:px-[72px]">
        <div className="mx-auto w-full max-w-[1180px]">
          <span className="dm-p14-semi uppercase tracking-[0.25em] text-brand-orange">Process</span>
          <h2 className="zalando-h2-lh69 mt-3 text-brand-black">How we shipped this project.</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROCESS_STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl bg-brand-white border border-brand-off-gray/60 p-6"
              >
                <span className="font-zalando text-[14px] font-semibold tabular-nums text-brand-orange">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="zalando-h4-28 mt-2 text-brand-black">{s.title}</h3>
                <p className="dm-p14-semi text-brand-light-black mt-2">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      {deliverables.length > 0 && (
        <section className="w-full bg-brand-white px-5 py-12 md:px-10 md:py-16 xl:px-[72px]">
          <div className="mx-auto w-full max-w-[1180px]">
            <span className="dm-p14-semi uppercase tracking-[0.25em] text-brand-orange">Deliverables</span>
            <h2 className="zalando-h2-lh69 mt-3 text-brand-black">What ships at the end.</h2>
            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {deliverables.map((d) => (
                <li
                  key={d}
                  className="rounded-xl border border-brand-off-gray/70 px-4 py-3 dm-p14-semi text-brand-black flex items-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff7a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Related projects */}
      <section className="w-full bg-brand-light-white px-5 py-12 md:px-10 md:py-16 xl:px-[72px]">
        <div className="mx-auto w-full max-w-[1180px]">
          <span className="dm-p14-semi uppercase tracking-[0.25em] text-brand-orange">More work</span>
          <h2 className="zalando-h2-lh69 mt-3 text-brand-black">Other projects you might like.</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={r.href ? r.href : `/work/${r.slug}`}
                {...(r.href ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group block rounded-2xl overflow-hidden bg-brand-white border border-brand-off-gray/60"
              >
                <div
                  className="aspect-[4/3] bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.02]"
                  style={{ backgroundImage: `url("${r.cover}")` }}
                />
                <div className="p-5">
                  <p className="dm-p14-semi uppercase tracking-[0.18em] text-brand-light-black">
                    {r.category}
                  </p>
                  <h3 className="zalando-h4-28 mt-1 text-brand-black">{r.title}</h3>
                  <p className="dm-p14-semi mt-2 text-brand-light-black line-clamp-2">{r.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="w-full bg-brand-black text-brand-white px-5 py-14 md:px-10 md:py-20 xl:px-[72px] relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url("/images/2fdsjkfa.png")' }}
        />
        <div className="relative z-10 mx-auto w-full max-w-[1180px] flex flex-col gap-6 items-start">
          <span className="dm-p14-semi uppercase tracking-[0.25em] text-brand-orange">(Next)</span>
          <h2 className="font-zalando font-semibold text-[clamp(2rem,4vw,3.6rem)] leading-[1] max-w-[1000px]">
            Want a result like this one? Let&apos;s talk.
          </h2>
          <div className="flex flex-wrap gap-4 mt-2">
            <Link
              to="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-brand-white px-8 py-4 dm-p14-semi text-brand-orange uppercase tracking-[0.5px]"
            >
              Start a Project
            </Link>
            <Link
              to="/work"
              className="inline-flex items-center justify-center rounded-full border border-brand-white/30 px-8 py-4 dm-p14-semi text-brand-white uppercase tracking-[0.5px]"
            >
              View More Work
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

function StoryCard({
  eyebrow,
  title,
  items,
  accent,
}: {
  eyebrow: string
  title: string
  items: string[]
  accent: string
}) {
  return (
    <div
      className="rounded-2xl border border-brand-off-gray/70 p-6"
      style={{ background: `linear-gradient(180deg, ${accent} 0%, #fff 60%)` }}
    >
      <span className="dm-p14-semi uppercase tracking-[0.22em] text-brand-orange">{eyebrow}</span>
      <h3 className="zalando-h4-28 mt-2 text-brand-black">{title}</h3>
      <ul className="mt-4 flex flex-col gap-3">
        {items.map((i) => (
          <li key={i} className="dm-p14-semi text-brand-light-black flex items-start gap-2">
            <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="dm-p14-semi uppercase tracking-[0.22em] text-brand-light-black/70">{label}</span>
      <span className="dm-p18-semi text-brand-black">{value}</span>
    </div>
  )
}
