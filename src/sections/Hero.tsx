import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Pulse from '../components/Pulse'
import RotatingText from '../components/RotatingText'

const INSTAGRAM_URL = 'https://www.instagram.com/ckrcreatives/'
const CALENDLY_URL = 'https://calendly.com/ckrstudiodesign/30min'
const WHATSAPP_URL = 'https://wa.me/971521046611'

function InstagramIcon({ className = '' }: { className?: string }) {
  return (
    <img
      src="/images/instagram_logo.png"
      alt=""
      aria-hidden
      className={`object-contain ${className}`}
      loading="lazy"
      decoding="async"
    />
  )
}

function CalendlyIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 9.5h17" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="14.5" r="2" fill="currentColor" />
    </svg>
  )
}

function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <img
      src="/images/whatsapp%20logo.png"
      alt=""
      aria-hidden
      className={`object-contain ${className}`}
      loading="lazy"
      decoding="async"
    />
  )
}

const rotateWords = [
  'Dubai Creative Agency',
  'Branding',
  'Web Design',
  'AI Automation',
  'SEO',
  'Digital Marketing',
  'CyberSecurity',
  'SEO AEO GEO LLMO',
]

const marqueeItems = [
  'Dubai Creative Agency',
  'Branding',
  'Web Design',
  'AI Automation',
  'Digital Marketing',
  'CyberSecurity',
  'SEO AEO GEO LLMO',
]

/**
 * Hero — content per the CKR Creatives brief.
 * Visual frame inherits the original Framer HeroSection (HfJlxHQXN): black
 * rounded panel, glow lights, layered z-index. Copy replaced with the
 * Dubai-agency, future-ready positioning from the brand brief.
 */
export default function Hero() {
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  } as const

  return (
    <section className="w-full flex justify-center bg-brand-white px-5 md:px-10 xl:px-[72px] pt-6 pb-[44px]">
      <div className="w-full max-w-[1920px] flex flex-col items-center gap-7 relative">
        {/* Mobile-only floating videos showcase — replaces the static content card on small screens */}
        <div className="md:hidden relative w-full overflow-hidden rounded-[28px] bg-brand-black px-4 pt-6 pb-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-50"
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(15,10,5,0.95) 0%, rgba(15,10,5,0.55) 50%, rgba(15,10,5,0.9) 100%)',
            }}
          />
          {/* H1 kept in DOM for SEO and accessibility, visually hidden */}
          <h1 className="sr-only">Future-Ready Digital, Branding, Web Design, AI Automation, SEO Experiences</h1>
          <div className="relative z-10 flex flex-row items-end justify-center gap-3 sm:gap-4 py-4" style={{ perspective: '1000px' }}>
            <motion.video
              src="/videos/camera.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-[28%] aspect-[3/4] object-cover rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-white/10"
              initial={{ y: 20, opacity: 0, rotateY: -10, rotateZ: -2 }}
              animate={{ y: [0, -8, 0], opacity: 1, rotateY: -10, rotateZ: -2 }}
              transition={{ y: { duration: 5, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 1, delay: 0.2 } }}
            />
            <motion.video
              src="/videos/catme.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-[34%] aspect-[3/4] object-cover rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-white/10 -mb-4"
              initial={{ y: 20, opacity: 0, rotateY: 0, rotateZ: 2 }}
              animate={{ y: [0, 12, 0], opacity: 1, rotateY: 0, rotateZ: 2 }}
              transition={{ y: { duration: 6, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 1, delay: 0.4 } }}
            />
            <motion.video
              src="/videos/tape.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-[28%] aspect-[3/4] object-cover rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-white/10"
              initial={{ y: 20, opacity: 0, rotateY: 10, rotateZ: -4 }}
              animate={{ y: [0, -10, 0], opacity: 1, rotateY: 10, rotateZ: -4 }}
              transition={{ y: { duration: 7, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 1, delay: 0.6 } }}
            />
          </div>
        </div>

        {/* Mobile-only CTA + tagline, sits just below the floating-video card */}
        <div className="md:hidden w-full flex flex-col items-center gap-5 -mt-2 px-1">
          <p className="text-base font-medium text-brand-black/80 text-center max-w-[28ch] leading-snug">
            Future-Ready Digital, Branding, Web &amp; AI Experiences from Dubai.
          </p>
          <motion.a
            href="#contact"
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center rounded-full bg-brand-orange text-white px-10 py-5 text-base font-bold uppercase tracking-wider shadow-[0_18px_40px_rgba(255,122,26,0.45)]"
          >
            Start Project
          </motion.a>

          {/* Mobile social row — Instagram · Calendly · WhatsApp */}
          <div className="flex flex-row gap-5 items-center mt-2">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CKR Creatives on Instagram"
              className="inline-flex items-center justify-center text-brand-black active:scale-95 transition-transform drop-shadow-[0_6px_18px_rgba(0,0,0,0.2)]"
            >
              <InstagramIcon className="h-12 w-12" />
            </a>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book a 30-min call on Calendly"
              className="inline-flex items-center gap-2.5 h-14 rounded-full bg-brand-black px-5 text-brand-white active:scale-95 transition-transform shadow-[0_12px_30px_rgba(0,0,0,0.22)]"
            >
              <CalendlyIcon className="h-6 w-6" />
              <span className="text-xs font-bold uppercase tracking-wider">Book 30-min Call</span>
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="inline-flex items-center justify-center text-brand-black active:scale-95 transition-transform drop-shadow-[0_6px_18px_rgba(0,0,0,0.2)]"
            >
              <WhatsAppIcon className="h-16 w-16" />
            </a>
          </div>
        </div>

        {/* Black rounded content panel — desktop / tablet only */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          className="relative w-full rounded-[28px] md:rounded-40 bg-brand-black px-5 md:px-11 pt-8 md:pt-11 pb-8 md:pb-[42px] hidden md:flex flex-col items-start shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          {/* Background container with overflow hidden for border radius */}
          <div className="absolute inset-0 overflow-hidden rounded-[28px] md:rounded-40">
            {/* Background video — z=0 */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="pointer-events-none absolute inset-0 w-full h-full object-cover"
              style={{ zIndex: 0 }}
            >
              <source src="/videos/hero-video.mp4" type="video/mp4" />
            </video>
            {/* Overlay for perfect text visibility — z=1 */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-black/40"
              style={{ zIndex: 1 }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(15,10,5,0.95) 0%, rgba(15,10,5,0.4) 50%, rgba(15,10,5,0.8) 100%)',
                zIndex: 1,
              }}
            />
          </div>

          {/* Floating Video Cards on the Right */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex gap-6 z-10 pointer-events-none" style={{ perspective: "1000px" }}>
            <motion.video
              src="/videos/camera.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-48 xl:w-56 h-64 xl:h-72 object-cover rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-white/10"
              initial={{ y: 20, opacity: 0, rotateY: -15, rotateZ: -2 }}
              animate={{ y: [0, -10, 0], opacity: 1, rotateY: -15, rotateZ: -2 }}
              transition={{ y: { duration: 5, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 1, delay: 0.2 } }}
            />
            <motion.video
              src="/videos/catme.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-56 xl:w-64 h-80 xl:h-96 object-cover rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-white/10 mt-12"
              initial={{ y: 20, opacity: 0, rotateY: -20, rotateZ: 3 }}
              animate={{ y: [0, 15, 0], opacity: 1, rotateY: -20, rotateZ: 3 }}
              transition={{ y: { duration: 6, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 1, delay: 0.4 } }}
            />
            <motion.video
              src="/videos/tape.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-40 xl:w-48 h-56 xl:h-64 object-cover rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-white/10 -ml-10 mt-40"
              initial={{ y: 20, opacity: 0, rotateY: -10, rotateZ: -5 }}
              animate={{ y: [0, -12, 0], opacity: 1, rotateY: -10, rotateZ: -5 }}
              transition={{ y: { duration: 7, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 1, delay: 0.6 } }}
            />
          </div>

          {/* Top row — eyebrow + availability indicator */}
          <motion.div
            variants={fadeUp}
            className="relative w-full flex flex-col md:flex-row gap-4 md:gap-5 justify-between items-start pl-1"
            style={{ zIndex: 2 }}
          >
            <span className="text-xs md:text-sm font-semibold text-brand-white/80 uppercase tracking-widest inline-flex items-center gap-2">
              <span className="agency-globe" aria-hidden>
                <img src="/images/earth.png" alt="" />
              </span>
              Founded in Dubai &middot; Operates Globally
            </span>
            <div className="flex items-center gap-2 text-brand-white bg-white/10 px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-sm">
              <Pulse color="rgb(34, 197, 94)" />
              <span className="text-xs md:text-sm font-medium">Available for new projects</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="relative w-full max-w-[800px] mt-16 md:mt-24 font-zalando text-[32px] sm:text-4xl md:text-5xl xl:text-6xl leading-[1.1] md:leading-[1.1] text-brand-white drop-shadow-lg z-20"
            style={{ zIndex: 20 }}
          >
            <span className="block w-full">Future-Ready</span>
            <span className="block w-full whitespace-nowrap">
              <RotatingText items={rotateWords} className="text-brand-orange" />
            </span>
            <span className="block w-full">Experiences</span>
          </motion.h1>

          {/* Bottom row — subheading on the left, CTAs centered across the panel */}
          <motion.div
            variants={fadeUp}
            className="relative w-full mt-8 md:mt-12 flex flex-col lg:flex-row gap-6 lg:gap-10 justify-between items-start lg:items-end z-20"
            style={{ zIndex: 20 }}
          >
            <p className="text-base md:text-lg font-medium text-brand-white/90 max-w-lg leading-relaxed drop-shadow-md">
              A high-performance creative agency building futuristic brands, AI systems, and cinematic web design for modern businesses pushing the boundaries.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="relative w-full mt-10 flex flex-col sm:flex-row gap-5 justify-center items-center z-20"
            style={{ zIndex: 20 }}
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-brand-orange text-white px-12 py-5 text-base font-bold uppercase tracking-[0.12em] shadow-[0_20px_50px_rgba(255,122,26,0.45)] ring-1 ring-white/20"
            >
              Start Project
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </motion.a>
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
              <Link
                to="/work"
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white/10 border border-white/30 backdrop-blur-md px-12 py-5 text-base font-bold text-white uppercase tracking-[0.12em] hover:bg-white/20 transition-colors shadow-[0_18px_45px_rgba(0,0,0,0.35)]"
              >
                Our Work
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Social row — Instagram · Calendly · WhatsApp */}
          <motion.div
            variants={fadeUp}
            className="relative w-full mt-8 flex flex-row gap-4 justify-center items-center z-20"
            style={{ zIndex: 20 }}
          >
            <motion.a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CKR Creatives on Instagram"
              whileHover={{ scale: 1.12, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center text-brand-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.55)]"
            >
              <InstagramIcon className="h-14 w-14" />
            </motion.a>
            <motion.a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book a 30-min call on Calendly"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-6 h-16 text-brand-white hover:bg-white/20 transition-colors shadow-[0_14px_40px_rgba(0,0,0,0.35)]"
            >
              <CalendlyIcon className="h-7 w-7" />
              <span className="text-sm font-bold uppercase tracking-[0.12em]">Book 30-min Call</span>
            </motion.a>
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              whileHover={{ scale: 1.12, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center text-brand-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.55)]"
            >
              <WhatsAppIcon className="h-14 w-14" />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scrolling text strip — big bold infinite marquee. Extra top spacing on mobile so it sits below the CTA, not right against it. */}
        <div className="w-full overflow-hidden pt-20 md:pt-12 pb-4">
          <motion.div
            className="flex w-max"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
          >
            {Array.from({ length: 2 }).map((_, copy) => (
              <ul key={copy} className="flex items-center shrink-0">
                {marqueeItems.map((item, i) => (
                  <li
                    key={`${copy}-${i}`}
                    className="flex items-center font-clash font-bold uppercase tracking-tight text-brand-black leading-none text-[clamp(2.5rem,7vw,5.5rem)]"
                  >
                    <span className="px-8">{item}</span>
                    <span aria-hidden className="text-brand-orange">•</span>
                  </li>
                ))}
              </ul>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
