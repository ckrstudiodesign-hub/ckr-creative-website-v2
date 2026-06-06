import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type SectionShellProps = {
  eyebrow?: string
  heading?: string
  description?: string
  /** Tailwind background color class (e.g. "bg-brand-black") for inverted sections */
  background?: string
  /** Tailwind text color class to pair with the background */
  textColor?: string
  frameless?: boolean
  children?: ReactNode
}

const sectionBackgrounds: Record<string, string> = {
  ABOUT: '/images/about.jpeg',
  SERVICES: '/images/2fdsjkfa.png',
  PORTFOLIO: '/images/Abhimanyu%20in%20Chakravyuh.jpeg',
  TESTIMONIALS: '/images/download%20(24).jpeg',
}

// Sections that should render a looping video instead of a static image.
// The image entry above still acts as a poster/fallback if the video can't play.
const sectionBackgroundVideos: Record<string, string> = {
  TESTIMONIALS: '/videos/testimonials-background.mp4',
}

/**
 * Shared section frame used by ported Framer page sections.
 * Provides consistent padding, eyebrow + heading + description block, and
 * a fade-up entry animation on scroll-into-view.
 */
export default function SectionShell({
  eyebrow,
  heading,
  description,
  background = 'bg-brand-white',
  textColor = 'text-brand-black',
  frameless = false,
  children,
}: SectionShellProps) {
  const isWarm = background.includes('orange')
  const accent = isWarm ? 'rgba(255, 122, 26, 0.82)' : 'rgba(255, 255, 255, 0.24)'
  const eyebrowKey = eyebrow?.toUpperCase() ?? ''
  const backgroundImage = sectionBackgrounds[eyebrowKey]
  const backgroundVideo = sectionBackgroundVideos[eyebrowKey]

  if (frameless) {
    return (
      <section className={`w-full ${background} ${textColor} px-4 py-8 md:px-8 md:py-12 lg:px-10 xl:px-[56px]`}>
        <div className="w-full max-w-[1300px] mx-auto flex flex-col gap-5 md:gap-7">
          {(eyebrow || heading || description) && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex max-w-[820px] flex-col gap-3 md:gap-4"
            >
              {eyebrow && (
                <span className="dm-p18-semi opacity-70">({eyebrow.toUpperCase()})</span>
              )}
              {heading && <h2 className="zalando-h2-lh69">{heading}</h2>}
              {description && <p className="dm-p18-semi opacity-70">{description}</p>}
            </motion.div>
          )}
          {children}
        </div>
      </section>
    )
  }

  return (
    <section className={`futuristic-section w-full ${background} ${textColor} px-4 py-6 md:px-8 md:py-8 lg:px-10 xl:px-[56px]`}>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.99 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-120px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="futuristic-section-card relative w-full max-w-[1300px] mx-auto overflow-hidden rounded-[28px] md:rounded-40 bg-brand-black px-5 py-6 text-brand-white md:px-10 md:py-8 xl:px-14 xl:py-9"
      >
        {backgroundVideo ? (
          <video
            aria-hidden
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={backgroundImage}
            className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-70"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        ) : (
          backgroundImage && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-50"
              style={{
                backgroundImage: `url("${backgroundImage}")`,
              }}
            />
          )
        )}
        <div
          aria-hidden
          className="pointer-events-none absolute rounded-full bg-white/20 blur-[180px]"
          style={{ top: 48, right: '48%', bottom: '46%', left: -360 }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute rounded-full blur-[170px]"
          style={{ top: 60, right: -420, bottom: '38%', left: '58%', backgroundColor: accent }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: backgroundVideo
              ? 'linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(15,8,4,0.55) 45%, rgba(0,0,0,0.78) 100%)'
              : 'linear-gradient(135deg, rgba(255,122,26,0.42) 0%, rgba(36,16,6,0.26) 38%, rgba(36,16,6,0.88) 100%)',
          }}
        />

        <div className="relative z-10 w-full flex flex-col gap-5 md:gap-7">
          {(eyebrow || heading || description) && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.08 }}
              className="flex max-w-[920px] flex-col gap-3 md:gap-4"
            >
              {eyebrow && (
                <span className="dm-p18-semi text-brand-white/70">({eyebrow.toUpperCase()})</span>
              )}
              {heading && <h2 className="zalando-h2-lh69 text-brand-white">{heading}</h2>}
              {description && <p className="dm-p18-semi text-brand-white/70">{description}</p>}
            </motion.div>
          )}
          {children}
        </div>
      </motion.div>
    </section>
  )
}
