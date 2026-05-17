import Hero from '../sections/Hero'
import AboutSection from '../sections/AboutSection'
import ServiceSection from '../sections/ServiceSection'
import FeatureSection from '../sections/FeatureSection'
import ProcessSection from '../sections/ProcessSection'
import WorkSection from '../sections/WorkSection'
import WhyChooseUsSection from '../sections/WhyChooseUsSection'
import TestimonialSection from '../sections/TestimonialSection'
import FaqSection from '../sections/FaqSection'
import FinalCtaSection from '../sections/FinalCtaSection'
import { SEO } from '../components/SEO'
import { SITE_ORIGIN, buildBreadcrumbs } from '../components/seo-utils'

const SERVICES = [
  {
    name: 'Brand Identity & Visual Systems',
    description:
      'Logo systems, type foundries, color architecture, motion identity, and tone of voice for premium brands.',
  },
  {
    name: 'Web Design & Development',
    description:
      'Cinematic websites, SEO-optimized landing pages, and custom builds in Framer, Next.js, and headless CMS stacks.',
  },
  {
    name: 'AI Automation & Smart Systems',
    description:
      'Workflow automation, lead-gen pipelines, chatbots, and AI-augmented content systems for modern operations.',
  },
  {
    name: 'SEO, GEO & AEO Optimization',
    description:
      'Technical SEO, schema architecture, GEO targeting, and Answer Engine Optimization that earns AI search citations.',
  },
  {
    name: 'LLMO & RAG Engineering',
    description:
      'Large Language Model Optimization and Retrieval-Augmented Generation systems — embeddings, retrieval, and grounded answer generation.',
  },
  {
    name: 'Social Media & Content Marketing',
    description:
      'Reels, campaigns, storytelling systems, and short-form content engines built for visibility and growth.',
  },
  {
    name: 'Cybersecurity & Digital Protection',
    description:
      'Site hardening, penetration testing, infrastructure audits, and protection layers for digital businesses.',
  },
]

const HOMEPAGE_FAQS = [
  {
    q: 'What does CKR Creatives do?',
    a: 'CKR Creatives is a Dubai-based creative digital agency offering branding, web design, SEO/AEO/GEO/LLMO optimization, AI automation, RAG engineering, social media marketing, and cybersecurity services for modern businesses worldwide.',
  },
  {
    q: 'Where is CKR Creatives located?',
    a: 'CKR Creatives is headquartered in Dubai, United Arab Emirates, and serves clients across the GCC, Europe, North America, and worldwide.',
  },
  {
    q: 'What is the difference between SEO, AEO, GEO, and LLMO?',
    a: 'SEO optimizes for traditional search engines like Google and Bing. AEO (Answer Engine Optimization) structures content so AI engines like ChatGPT, Perplexity, and Gemini cite it. GEO is both geographic targeting (city/region SEO) and Generative Engine Optimization. LLMO (Large Language Model Optimization) makes a site discoverable and quotable by LLMs through llms.txt, structured entity data, and clean fact-dense copy.',
  },
  {
    q: 'Do you build RAG (Retrieval-Augmented Generation) systems?',
    a: 'Yes. CKR Creatives designs and ships RAG pipelines — embedding storage, semantic retrieval, prompt orchestration, and grounded answer generation — as part of the AI Automation discipline.',
  },
  {
    q: 'How do I start a project with CKR Creatives?',
    a: 'Email ckrstudiodesign@gmail.com or book a 30-minute intro call at calendly.com/ckrstudiodesign/30min. Every engagement begins with a strategy phase before any visuals are produced.',
  },
]

/**
 * Home page — section order matches the CKR Creatives content brief:
 * Hero -> About -> Services -> Features -> Process -> Portfolio -> Why Choose Us ->
 * Testimonials -> FAQ -> Final CTA.
 *
 * The SEO block emits a comprehensive schema bundle covering SEO, AEO, GEO, LLMO,
 * and RAG discovery surfaces.
 */
export default function Home() {
  const canonical = `${SITE_ORIGIN}/`
  const ogImage = `${SITE_ORIGIN}/images/hero%20back.png`

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_ORIGIN}/#website`,
    url: SITE_ORIGIN,
    name: 'CKR Creatives',
    description:
      'Dubai-based creative digital agency for branding, cinematic web design, SEO, AEO, GEO, LLMO, AI automation, and RAG systems.',
    inLanguage: 'en',
    publisher: { '@id': `${SITE_ORIGIN}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_ORIGIN}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService', 'LocalBusiness'],
    '@id': `${SITE_ORIGIN}/#organization`,
    name: 'CKR Creatives',
    alternateName: ['CKR', 'CKR Studio', 'CKR Creatives Dubai'],
    url: SITE_ORIGIN,
    logo: `${SITE_ORIGIN}/images/logo.png`,
    image: ogImage,
    email: 'ckrstudiodesign@gmail.com',
    telephone: '+971521046611',
    priceRange: '$$$',
    description:
      'Dubai-based creative digital agency designing future-ready brands, cinematic websites, AI automation systems, and SEO-optimized digital experiences for modern businesses worldwide.',
    slogan: 'Future-ready creative for modern brands.',
    foundingLocation: 'Dubai, United Arab Emirates',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dubai',
      addressRegion: 'Dubai',
      addressCountry: 'AE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.2048,
      longitude: 55.2708,
    },
    areaServed: [
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'AdministrativeArea', name: 'GCC' },
      { '@type': 'Continent', name: 'Europe' },
      { '@type': 'Continent', name: 'North America' },
      { '@type': 'Place', name: 'Worldwide' },
    ],
    knowsAbout: [
      'Brand Identity',
      'Visual Systems',
      'Web Design',
      'Web Development',
      'Search Engine Optimization',
      'Answer Engine Optimization',
      'Generative Engine Optimization',
      'Large Language Model Optimization',
      'Retrieval-Augmented Generation',
      'AI Automation',
      'Social Media Marketing',
      'Cybersecurity',
    ],
    makesOffer: SERVICES.map((s) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: s.name,
        description: s.description,
        provider: { '@id': `${SITE_ORIGIN}/#organization` },
        areaServed: ['AE', 'GCC', 'Worldwide'],
      },
    })),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'ckrstudiodesign@gmail.com',
        telephone: '+971521046611',
        availableLanguage: ['en', 'ar'],
        areaServed: ['AE', 'GCC', 'Worldwide'],
      },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Sunday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    sameAs: [
      'https://www.instagram.com/ckrcreatives/',
      'https://calendly.com/ckrstudiodesign/30min',
      'https://wa.me/971521046611',
    ],
  }

  const serviceCatalog = {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'CKR Creatives — Services',
    itemListElement: SERVICES.map((s, i) => ({
      '@type': 'Offer',
      position: i + 1,
      itemOffered: {
        '@type': 'Service',
        name: s.name,
        description: s.description,
        provider: { '@id': `${SITE_ORIGIN}/#organization` },
      },
    })),
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOMEPAGE_FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const breadcrumbs = buildBreadcrumbs(SITE_ORIGIN, [['Home', '/']])

  return (
    <>
      <SEO
        title="CKR Creatives — Dubai Creative Agency | Branding, Web, SEO, AEO, GEO, LLMO, RAG & AI"
        description="CKR Creatives is a Dubai-based creative agency designing future-ready brands, cinematic websites, AI automation, RAG systems, and SEO/AEO/GEO/LLMO-optimized digital experiences for modern businesses worldwide."
        canonical={canonical}
        ogImage={ogImage}
        keywords="Dubai Creative Agency, Branding Agency Dubai, Web Design Dubai, SEO Agency Dubai, AEO Optimization, GEO Targeting, LLMO Optimization, RAG Engineering, AI Automation Agency, Answer Engine Optimization, Generative Engine Optimization, Large Language Model Optimization, Retrieval Augmented Generation, AI Search Optimization"
        jsonLd={[websiteSchema, localBusinessSchema, serviceCatalog, faqSchema, breadcrumbs]}
      />
      <Hero />
      <div id="about"><AboutSection /></div>
      <div id="services"><ServiceSection /></div>
      <FeatureSection />
      <ProcessSection />
      <WorkSection />
      <WhyChooseUsSection />
      <TestimonialSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  )
}
