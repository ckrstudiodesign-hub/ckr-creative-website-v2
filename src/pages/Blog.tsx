import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SEO } from '../components/SEO'
import { SITE_ORIGIN, buildBreadcrumbs } from '../components/seo-utils'
import { PageHero } from '../components/PageHero'

type Article = {
  slug: string
  title: string
  excerpt: string
  category: 'Branding' | 'Web' | 'AI' | 'SEO' | 'Studio'
  date: string // ISO 8601
  readMins: number
  cover: string
  author: string
}

const articles: Article[] = [
  {
    slug: 'aeo-the-new-seo',
    title: 'AEO is the new SEO — designing for Answer Engines.',
    excerpt:
      'How structured data, semantic headings, and Q&A formatting decide whether ChatGPT, Perplexity, and Gemini cite your brand by name.',
    category: 'SEO',
    date: '2025-09-18',
    readMins: 7,
    cover: '/images/fsahkf.png',
    author: 'CKR Studio',
  },
  {
    slug: 'geo-targeting-dubai',
    title: 'GEO targeting for Dubai brands — beyond Google My Business.',
    excerpt:
      'A 2025 playbook for ranking in the GCC across Maps, Apple, and AI search — schema, hreflang, and structured regional content.',
    category: 'SEO',
    date: '2025-09-04',
    readMins: 9,
    cover: '/images/2fdsjkfa.png',
    author: 'CKR Studio',
  },
  {
    slug: 'ai-automation-for-agencies',
    title: 'AI automation for small studios — what actually pays back.',
    excerpt:
      'Honest report from running CKR — which AI workflows save real hours, which are pure theater, and how we measure ROI per pipeline.',
    category: 'AI',
    date: '2025-08-22',
    readMins: 11,
    cover: '/images/dasufiua.png',
    author: 'CKR Studio',
  },
  {
    slug: 'cinematic-web-design',
    title: 'Cinematic web design — building scroll experiences that convert.',
    excerpt:
      'Scroll-driven motion, parallax, and choreography aren&rsquo;t decoration. They&rsquo;re narrative tools. Here&rsquo;s the framework we use.',
    category: 'Web',
    date: '2025-08-05',
    readMins: 8,
    cover: '/images/11123.png',
    author: 'CKR Studio',
  },
  {
    slug: 'brand-systems-vs-logos',
    title: 'Stop selling logos. Sell brand systems.',
    excerpt:
      'Why a logo without a system is dead on arrival, and how to package identity work that compounds in value over years.',
    category: 'Branding',
    date: '2025-07-19',
    readMins: 6,
    cover: '/images/download-24.jpeg',
    author: 'CKR Studio',
  },
  {
    slug: 'studio-stack-2025',
    title: 'Our 2025 studio stack — tools, AI, and the boring infrastructure.',
    excerpt:
      'A complete tour of every tool CKR runs — design, dev, motion, AI, ops, automation, and the integrations between them.',
    category: 'Studio',
    date: '2025-06-30',
    readMins: 12,
    cover: '/images/Abhimanyu in Chakravyuh.jpeg',
    author: 'CKR Studio',
  },
]

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

export default function Blog() {
  const canonical = `${SITE_ORIGIN}/blog`
  const ogImage = `${SITE_ORIGIN}/images/download-24.jpeg`

  const [featured, ...rest] = articles

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Field Notes — CKR Creatives Journal',
    url: canonical,
    description:
      'Field Notes — the CKR Creatives journal on branding, web design, AI systems, and SEO optimization for modern businesses.',
    publisher: {
      '@type': 'Organization',
      name: 'CKR Creatives',
      url: SITE_ORIGIN,
    },
    blogPost: articles.map((a) => ({
      '@type': 'BlogPosting',
      headline: a.title,
      description: a.excerpt,
      url: `${SITE_ORIGIN}/blog/${a.slug}`,
      datePublished: a.date,
      dateModified: a.date,
      image: `${SITE_ORIGIN}${a.cover}`,
      keywords: a.category,
      wordCount: a.readMins * 200, // approximate
      author: { '@type': 'Organization', name: a.author },
      publisher: {
        '@type': 'Organization',
        name: 'CKR Creatives',
        url: SITE_ORIGIN,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${SITE_ORIGIN}/blog/${a.slug}`,
      },
    })),
  }

  const breadcrumbs = buildBreadcrumbs(SITE_ORIGIN, [
    ['Home', '/'],
    ['Blog', '/blog'],
  ])

  return (
    <>
      <SEO
        title="Field Notes — CKR Creatives Journal | Branding, Web, AI & SEO Insights"
        description="The CKR Creatives journal — practical writing on branding, web design, AI automation, and SEO optimization for ambitious modern businesses. Updated regularly from our Dubai studio."
        canonical={canonical}
        ogImage={ogImage}
        keywords="CKR Creatives blog, branding insights, web design articles, AI automation guide, SEO best practices, AEO optimization, GEO targeting, Dubai design blog"
        jsonLd={[blogSchema, breadcrumbs]}
      />

      <PageHero
        eyebrow="Field Notes"
        heading="Writing on branding, web, AI &amp; SEO."
        description="Practical articles from the CKR Creatives studio — what we&rsquo;re shipping, the systems we&rsquo;re tuning, and what we&rsquo;re learning about brand, web, AI, and search."
        bgImage="/images/download-24.jpeg"
        actions={
          <Link
            to="/#contact"
            className="inline-flex items-center justify-center rounded-full bg-brand-white px-6 py-4 dm-p14-semi text-brand-orange uppercase tracking-[0.5px]"
          >
            Work With Us
          </Link>
        }
      />

      {/* Featured */}
      <section className="w-full bg-brand-white px-5 pt-10 md:px-10 xl:px-[72px]">
        <div className="mx-auto w-full max-w-[1920px]">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            <Link
              to={`/blog/${featured.slug}`}
              className="block lg:col-span-7 aspect-[16/10] rounded-[28px] overflow-hidden relative"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                style={{ backgroundImage: `url("${encodeURI(featured.cover)}")` }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background: 'linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.55) 100%)',
                }}
              />
              <div className="absolute bottom-5 left-5 flex items-center gap-3">
                <span className="rounded-full bg-brand-orange px-3 py-1 dm-p14-semi text-brand-white uppercase tracking-[0.18em]">
                  Featured
                </span>
                <span className="dm-p14-semi text-brand-white">{featured.category}</span>
              </div>
            </Link>
            <div className="lg:col-span-5 flex flex-col gap-5 justify-center">
              <span className="dm-p14-semi uppercase tracking-[0.25em] text-brand-orange">
                ({featured.category} · Featured)
              </span>
              <h2 className="font-zalando font-semibold text-[clamp(2rem,4vw,3.5rem)] leading-[1.02]">
                <Link to={`/blog/${featured.slug}`} className="hover:opacity-80 transition-opacity">
                  {featured.title}
                </Link>
              </h2>
              <p className="dm-p18-semi text-brand-light-black max-w-[55ch]">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-4 dm-p14-semi text-brand-light-black mt-2">
                <span>{featured.author}</span>
                <span aria-hidden>·</span>
                <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                <span aria-hidden>·</span>
                <span>{featured.readMins} min read</span>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {/* Article grid */}
      <section className="w-full bg-brand-white px-5 py-16 md:px-10 md:py-24 xl:px-[72px]">
        <div className="mx-auto w-full max-w-[1920px]">
          <div className="flex flex-col gap-6 max-w-[820px] mb-12">
            <span className="dm-p14-semi uppercase tracking-[0.25em] text-brand-orange">
              (Latest)
            </span>
            <h2 className="font-zalando font-semibold text-[clamp(2rem,4vw,3.5rem)] leading-[1.02]">
              Recent writing from the studio.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
            {rest.map((a, i) => (
              <motion.article
                key={a.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
                className="group flex flex-col gap-5"
              >
                <Link
                  to={`/blog/${a.slug}`}
                  className="block aspect-[5/4] rounded-[20px] overflow-hidden relative"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    style={{ backgroundImage: `url("${encodeURI(a.cover)}")` }}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.5) 100%)',
                    }}
                  />
                  <span className="absolute bottom-4 left-4 rounded-full bg-brand-white/90 px-3 py-1 dm-p14-semi text-brand-black uppercase tracking-[0.18em]">
                    {a.category}
                  </span>
                </Link>
                <header className="flex flex-col gap-2">
                  <h3 className="zalando-h4-20 leading-snug">
                    <Link
                      to={`/blog/${a.slug}`}
                      className="hover:opacity-70 transition-opacity"
                    >
                      {a.title}
                    </Link>
                  </h3>
                  <p className="dm-p16-medium text-brand-light-black line-clamp-3">{a.excerpt}</p>
                  <div className="flex items-center gap-3 dm-p14-medium text-brand-light-black mt-2">
                    <time dateTime={a.date}>{formatDate(a.date)}</time>
                    <span aria-hidden>·</span>
                    <span>{a.readMins} min read</span>
                  </div>
                </header>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / closing CTA */}
      <section className="w-full bg-brand-black text-brand-white px-5 py-20 md:px-10 md:py-28 xl:px-[72px] relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: 'url("/images/dasufiua.png")' }}
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
            (Stay In Touch)
          </span>
          <h2 className="font-zalando font-semibold text-[clamp(2.5rem,5vw,4rem)] leading-[0.98] max-w-[920px]">
            Want this in your inbox? We publish field notes monthly.
          </h2>
          <p className="dm-p18-semi text-brand-white/75 max-w-[640px]">
            Short pieces on branding, design, AI, and SEO — distilled into something you can apply
            on Monday. No spam, ever.
          </p>
          <a
            href="mailto:ckrstudiodesign@gmail.com?subject=Subscribe%20to%20Field%20Notes"
            className="inline-flex items-center justify-center rounded-full bg-brand-white px-8 py-4 dm-p14-semi text-brand-orange uppercase tracking-[0.5px]"
          >
            Subscribe by Email
          </a>
        </div>
      </section>
    </>
  )
}
