import { motion } from 'framer-motion'

/**
 * Why Choose Us — "A Future-Focused Creative Agency Built For Growth"
 * Custom layout (text on the left, floating videos on the right) so we don't
 * have to push children below the heading the way SectionShell would.
 */
export default function WhyChooseUsSection() {
  return (
    <section className="w-full bg-brand-off-white text-brand-black px-5 py-20 md:px-10 md:py-[100px] xl:px-[72px]">
      <div className="relative w-full max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left — copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col gap-8 max-w-[820px]"
        >
          <span className="dm-p18-semi opacity-70">(WHY CHOOSE US)</span>
          <h2 className="zalando-h2-lh69">A Future-Focused Creative Agency Built For Growth</h2>
          <div className="flex flex-col gap-6 dm-p18-semi text-brand-light-black">
            <p>
              CKR Creatives combines branding, web design, SEO, AI automation, digital marketing, and
              creative technology into one complete digital ecosystem.
            </p>
            <p>
              We build websites and brand systems that are not only visually premium but also optimized
              for Google search, AI search engines, voice search, GEO targeting, Answer Engine
              Optimization (AEO), and long-term digital growth.
            </p>
            <p>
              Every experience is designed to improve visibility, engagement, trust, and conversion
              performance.
            </p>
          </div>
        </motion.div>

        {/* Right — floating videos */}
        <div
          className="relative w-full h-[360px] sm:h-[440px] lg:h-[560px] flex items-center justify-center"
          style={{ perspective: '1200px' }}
        >
          <motion.div
            className="absolute top-4 left-2 sm:left-8 lg:left-4 xl:left-10 w-[44%] sm:w-[42%] lg:w-[48%]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          >
            <video
              src="/videos/why-choose-us.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="why-video-float-one aspect-[3/4] w-full object-cover rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-black/5"
            />
          </motion.div>
          <motion.div
            className="absolute bottom-4 right-2 sm:right-8 lg:right-4 xl:right-10 w-[44%] sm:w-[42%] lg:w-[48%]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
          >
            <video
              src="/videos/why-choose-us-1.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="why-video-float-two aspect-[3/4] w-full object-cover rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.4)] border border-black/5"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
