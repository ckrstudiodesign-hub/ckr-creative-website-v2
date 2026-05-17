import { Link } from 'react-router-dom'

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
    <footer className="w-full bg-brand-white px-5 py-10 md:px-10 md:py-14 xl:px-[72px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <div className="relative w-full max-w-[1920px] mx-auto overflow-hidden rounded-[28px] md:rounded-40 bg-brand-black px-5 py-10 text-brand-white md:px-11 md:py-14 xl:px-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-60"
          style={{
            backgroundImage: 'url(/images/footer.jpeg)',
          }}
        />
        {/* Base dark wash — guarantees text contrast over any part of the photo */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-brand-black/55"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute rounded-full bg-white/20 blur-[170px]"
          style={{ top: 48, right: '50%', bottom: '42%', left: -340 }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute rounded-full bg-brand-orange/55 blur-[170px]"
          style={{ top: 40, right: -420, bottom: '38%', left: '58%' }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,122,26,0.30) 0%, rgba(36,16,6,0.40) 42%, rgba(0,0,0,0.92) 100%)',
          }}
        />

        <div className="relative z-10 flex flex-col gap-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-5 flex flex-col gap-4">
              <span className="zalando-h3-44">CKR Creatives</span>
              <span className="dm-p18-semi text-brand-white/70">Dubai, United Arab Emirates</span>
              <p className="dm-p16-medium text-brand-white/70 max-w-[420px] mt-3">
                Future-focused creative agency specializing in:
              </p>
              <ul className="flex flex-wrap gap-x-4 gap-y-2 mt-1">
                {offerings.map((o) => (
                  <li
                    key={o}
                    className="rounded-full border border-white/14 bg-white/[0.06] px-3 py-1 dm-p14-medium text-brand-white/72 backdrop-blur-xl"
                  >
                    {o}
                  </li>
                ))}
              </ul>
              <a
                href="mailto:ckrstudiodesign@gmail.com"
                className="zalando-h5-18 text-brand-white hover:underline mt-4"
              >
                ckrstudiodesign@gmail.com
              </a>
            </div>

            <div className="md:col-span-3 flex flex-col gap-6">
              <span className="dm-p14-semi uppercase tracking-wider text-brand-white/60">Navigation</span>
              <ul className="flex flex-col gap-4">
                {nav.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="dm-p18-semi text-brand-white hover:text-brand-white/70"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-4 flex flex-col gap-6">
              <span className="dm-p14-semi uppercase tracking-wider text-brand-white/60">Social Platforms</span>
              <ul className="flex flex-col gap-4">
                {social.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dm-p18-semi text-brand-white hover:text-brand-white/70 inline-flex items-center gap-2"
                    >
                      {item.label}
                      <span aria-hidden>-&gt;</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-row flex-wrap gap-6 justify-between items-start border-t border-white/14 pt-9">
            <span className="dm-p14-medium text-brand-white/60">
              (c) {new Date().getFullYear()} CKR Creatives. All Rights Reserved
            </span>
            <div className="flex flex-row gap-10">
              <Link to="/terms-of-use" className="dm-p14-medium text-brand-white/60 hover:text-brand-white">
                Terms of Use
              </Link>
              <Link to="/privacy-policy" className="dm-p14-medium text-brand-white/60 hover:text-brand-white">
                Privacy Policy
              </Link>
            </div>
          </div>

          <div className="w-full h-[157px] flex items-end justify-center">
            <div className="flex flex-row items-end gap-2">
              <span className="clash-h1-88 text-brand-white leading-none">CKR</span>
              <span className="clash-h4-20 text-brand-white/70 pb-3">CREATIVES</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
