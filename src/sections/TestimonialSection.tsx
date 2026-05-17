import { motion } from 'framer-motion'
import SectionShell from '../components/SectionShell'

const testimonials = [
  {
    quote:
      'CKR Creatives transformed our online presence into a premium and highly optimized digital experience.',
    name: 'Client Testimonial',
    role: 'Modern Business',
  },
  {
    quote:
      'Our new website feels futuristic, loads incredibly fast, and ranks better on search engines.',
    name: 'Client Testimonial',
    role: 'Growing Brand',
  },
  {
    quote:
      'The combination of branding, SEO, and modern design helped elevate our business significantly.',
    name: 'Client Testimonial',
    role: 'Luxury Brand',
  },
]

export default function TestimonialSection() {
  return (
    <SectionShell eyebrow="Testimonials" heading="Trusted By Modern Businesses & Growing Brands">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.quote}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-[24px] bg-brand-off-white p-8 flex flex-col gap-6 min-h-[280px]"
          >
            <span className="clash-h1-88 text-brand-black/10 leading-none -mb-4">&ldquo;</span>
            <blockquote className="dm-p18-semi leading-relaxed text-brand-black">
              {t.quote}
            </blockquote>
            <figcaption className="flex flex-col gap-0.5 mt-auto">
              <span className="dm-p14-semi">{t.name}</span>
              <span className="dm-p14-medium text-brand-light-black">{t.role}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </SectionShell>
  )
}
