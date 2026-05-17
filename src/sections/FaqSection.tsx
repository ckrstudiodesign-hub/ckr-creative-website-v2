import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'What services does CKR Creatives provide?',
    a: 'CKR Creatives provides branding, web design, SEO optimization, AI automation, social media marketing, and cybersecurity services for modern businesses.',
  },
  {
    q: 'Is CKR Creatives based in Dubai?',
    a: 'Yes, CKR Creatives is a Dubai-based creative digital agency working with businesses locally and internationally.',
  },
  {
    q: 'Does CKR Creatives build SEO-friendly websites?',
    a: 'Yes, all websites are optimized for SEO, GEO, AEO, mobile performance, and AI search visibility.',
  },
  {
    q: 'Can CKR Creatives help with AI automation?',
    a: 'Yes, we build AI-powered workflows, chatbot systems, lead automation, and intelligent business solutions.',
  },
  {
    q: 'Do you work with international clients?',
    a: 'Yes, CKR Creatives works with startups, brands, and businesses globally.',
  },
]

/**
 * FAQ — Includes hidden FAQPage JSON-LD for AEO/SEO snippet eligibility.
 */
export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0)

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <section className="w-full bg-brand-white text-brand-black px-5 py-20 md:px-10 md:py-[100px] xl:px-[72px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="w-full max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-start">
        {/* Left — heading + accordion */}
        <div className="flex flex-col gap-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col gap-6 max-w-[820px]"
          >
            <span className="dm-p18-semi opacity-70">(FAQ)</span>
            <h2 className="zalando-h2-lh69">Frequently Asked Questions</h2>
          </motion.div>

          <div className="flex flex-col divide-y divide-brand-off-gray border-t border-brand-off-gray max-w-[900px]">
            {faqs.map((f, i) => {
              const isOpen = open === i
              return (
                <div key={f.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full text-left py-8 flex flex-row justify-between items-center gap-8 cursor-pointer"
                  >
                    <span className="zalando-h3-44">{f.q}</span>
                    <span
                      className={`zalando-h3-44 transition-transform duration-300 ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <p className="dm-p18-semi text-brand-light-black pb-8 pr-16">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right — two floating FAQ videos stacked vertically, both fully visible. Sticky on desktop. */}
        <div className="relative w-full flex items-start justify-center">
          <div
            className="w-full max-w-[520px] flex flex-col items-center gap-8"
            style={{ perspective: '1400px' }}
          >
            <motion.video
              src="/videos/faq.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full aspect-[16/10] object-cover rounded-[28px] shadow-[0_30px_70px_rgba(0,0,0,0.28)] border border-black/5"
              initial={{ opacity: 0, y: 30, rotateZ: -2 }}
              whileInView={{ opacity: 1, y: 0, rotateZ: -2 }}
              viewport={{ once: true, margin: '-120px' }}
              animate={{ y: [0, -10, 0], rotateZ: -2 }}
              transition={{
                y: { duration: 6.5, repeat: Infinity, ease: 'easeInOut' },
                opacity: { duration: 0.8, delay: 0.15 },
              }}
            />
            <motion.video
              src="/videos/faq1.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full aspect-[16/10] object-cover rounded-[28px] shadow-[0_30px_70px_rgba(0,0,0,0.32)] border border-black/5"
              initial={{ opacity: 0, y: 30, rotateZ: 2 }}
              whileInView={{ opacity: 1, y: 0, rotateZ: 2 }}
              viewport={{ once: true, margin: '-120px' }}
              animate={{ y: [0, 12, 0], rotateZ: 2 }}
              transition={{
                y: { duration: 7.5, repeat: Infinity, ease: 'easeInOut' },
                opacity: { duration: 0.8, delay: 0.3 },
              }}
            />
            <motion.video
              src="/videos/faq2.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full aspect-[16/10] object-cover rounded-[28px] shadow-[0_30px_70px_rgba(0,0,0,0.3)] border border-black/5"
              initial={{ opacity: 0, y: 30, rotateZ: -1.5 }}
              whileInView={{ opacity: 1, y: 0, rotateZ: -1.5 }}
              viewport={{ once: true, margin: '-120px' }}
              animate={{ y: [0, -8, 0], rotateZ: -1.5 }}
              transition={{
                y: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
                opacity: { duration: 0.8, delay: 0.45 },
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
