import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const nav = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/#services' },
  { label: 'Projects', to: '/work' },
  { label: 'About', to: '/#about' },
  { label: 'Contact', to: '/#contact' },
]

const social = [
  { label: 'Instagram', href: 'https://www.instagram.com/ckrcreatives/' },
  { label: 'Book a 30-min call', href: 'https://calendly.com/ckrstudiodesign/30min' },
  { label: 'WhatsApp', href: 'https://wa.me/971521046611' },
]

const offerings = [
  'Branding & Visual Identity',
  'Website Design & Development',
  'SEO & GEO Optimization',
  'AI Automation Systems',
  'Social Media Marketing',
  'Cybersecurity Solutions',
]

/**
 * Footer - Dubai positioning, expanded service list, post-rebrand from Agencux.
 * Includes Organization JSON-LD for entity recognition.
 */
export default function Footer() {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CKR Creatives',
    url: 'https://ckrcreatives.com/',
    email: 'ckrstudiodesign@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dubai',
      addressCountry: 'AE',
    },
    sameAs: social.map((s) => s.href),
    description:
      'Dubai-based creative digital agency specializing in branding, web design, SEO, AI automation, social media marketing, and cybersecurity.',
  }

  return (
    <footer className="w-full bg-brand-white px-4 py-6 md:px-8 md:py-8 lg:px-10 xl:px-[56px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <div className="relative mx-auto w-full max-w-[1300px] overflow-hidden rounded-[28px] bg-brand-black px-5 py-7 text-brand-white md:rounded-40 md:px-10 md:py-8 xl:px-14">
        {/* Clean solid surface — thin top sheen only, no decorative background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }}
        />

        <div className="relative z-10 flex flex-col gap-7">
          {/* Top — brand · explore · connect */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.5fr_0.7fr_1fr]">
            {/* Brand */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <img src="/images/logo.png" alt="CKR Creatives" className="h-11 w-11 shrink-0 object-contain" />
                <div className="flex flex-col leading-tight">
                  <span className="zalando-h4-20 text-brand-white">CKR Creatives</span>
                  <span className="dm-p14-medium text-brand-white/55">Dubai, United Arab Emirates</span>
                </div>
              </div>
              <p className="dm-p14-semi max-w-[380px] text-brand-white/70">
                Future-ready creative studio — branding, web, AI automation, SEO &amp; digital
                protection for modern brands.
              </p>
              <a
                href="mailto:ckrstudiodesign@gmail.com"
                className="group inline-flex w-fit items-center gap-2 zalando-h5-18 text-brand-white transition-colors hover:text-brand-orange"
              >
                ckrstudiodesign@gmail.com
                <span aria-hidden className="text-brand-orange transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <ul className="flex flex-wrap gap-2 pt-1">
                {offerings.map((o) => (
                  <li
                    key={o}
                    className="rounded-full border border-white/12 bg-white/[0.05] px-3 py-1 dm-p14-medium text-brand-white/65 backdrop-blur-xl"
                  >
                    {o}
                  </li>
                ))}
              </ul>
            </div>

            {/* Explore */}
            <div className="flex flex-col gap-3.5">
              <span className="dm-p14-semi uppercase tracking-[0.18em] text-brand-white/40">Explore</span>
              <ul className="flex flex-col gap-2.5">
                {nav.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="group inline-flex items-center gap-2 dm-p16-medium text-brand-white/80 transition-colors hover:text-brand-white"
                    >
                      <span aria-hidden className="h-px w-0 bg-brand-orange transition-all duration-300 group-hover:w-4" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div className="flex flex-col gap-3.5">
              <span className="dm-p14-semi uppercase tracking-[0.18em] text-brand-white/40">Connect</span>
              <div className="flex flex-col gap-2.5">
                {social.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-between gap-3 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2.5 text-brand-white/85 backdrop-blur-xl transition-all hover:border-brand-orange/50 hover:bg-white/10"
                  >
                    <span className="dm-p14-semi">{item.label}</span>
                    <span aria-hidden className="text-brand-orange transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Creative animated gradient wordmark */}
          <div className="relative -mb-1 overflow-hidden border-t border-white/12 pt-5">
            <motion.span
              className="block select-none whitespace-nowrap bg-gradient-to-r from-white via-brand-orange to-white/25 bg-clip-text font-clash text-[clamp(2.5rem,12vw,9rem)] font-bold uppercase leading-[0.82] tracking-tight text-transparent"
              style={{ backgroundSize: '200% auto' }}
              animate={{ backgroundPosition: ['0% 50%', '200% 50%'] }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            >
              CKR Creatives
            </motion.span>
          </div>

          {/* Legal bar + back to top */}
          <div className="flex flex-col gap-4 border-t border-white/12 pt-4 md:flex-row md:items-center md:justify-between">
            <span className="dm-p14-medium text-brand-white/55">
              © {new Date().getFullYear()} CKR Creatives. All rights reserved.
            </span>
            <div className="flex flex-wrap items-center gap-5 md:gap-7">
              <Link to="/terms-of-use" className="dm-p14-medium text-brand-white/55 transition-colors hover:text-brand-white">
                Terms of Use
              </Link>
              <Link to="/privacy-policy" className="dm-p14-medium text-brand-white/55 transition-colors hover:text-brand-white">
                Privacy Policy
              </Link>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 dm-p14-medium text-brand-white/70 transition-all hover:border-brand-orange/50 hover:text-brand-white"
              >
                Back to top
                <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5">↑</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
