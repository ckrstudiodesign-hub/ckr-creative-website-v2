import { motion } from 'framer-motion'

/**
 * Why Choose Us — "A Future-Focused Creative Agency Built For Growth"
 * Custom layout (text on the left, floating videos on the right) so we don't
 * have to push children below the heading the way SectionShell would.
 */
export default function WhyChooseUsSection() {
  return (
    <section className="w-full bg-brand-off-white px-4 py-8 text-brand-black md:px-8 md:py-12 lg:px-10 xl:px-[56px]">
      <div className="relative mx-auto grid w-full max-w-[1300px] grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-8">
        {/* Left — copy */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex max-w-[820px] flex-col gap-4 md:gap-5"
        >
          <span className="dm-p18-semi opacity-70">(WHY CHOOSE US)</span>
          <h2 className="zalando-h2-lh69">A Future-Focused Creative Agency Built For Growth</h2>
          <div className="flex flex-col gap-4 dm-p18-semi text-brand-light-black">
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
          className="relative flex h-[300px] w-full items-center justify-center sm:h-[350px] lg:h-[390px]"
          style={{ perspective: '1200px' }}
        >
          <motion.div
            className="absolute top-4 left-2 sm:left-8 lg:left-4 xl:left-10 w-[44%] sm:w-[42%] lg:w-[48%]"
            initial={{ opacity: 0, y: 18 }}
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
            initial={{ opacity: 0, y: 18 }}
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
