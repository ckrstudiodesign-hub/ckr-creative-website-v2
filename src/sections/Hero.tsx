import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
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
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  } as const

  return (
    <section className="flex w-full justify-center bg-brand-white px-4 pb-4 pt-3 md:px-8 md:pb-6 lg:px-10 xl:px-[56px]">
      <div className="w-full max-w-[1300px] flex flex-col items-center gap-4 relative">
        {/* Mobile-only floating videos showcase — replaces the static content card on small screens */}
        <div className="md:hidden relative w-full overflow-hidden rounded-[28px] bg-brand-black px-4 pt-5 pb-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
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
        <div className="md:hidden w-full flex flex-col items-center gap-4 -mt-1 px-1">
          <h1 className="max-w-[13ch] text-center font-zalando text-[clamp(1.9rem,8.5vw,2.9rem)] font-semibold leading-[1.05] text-brand-black">
            Future-Ready <span className="text-brand-orange">Creative</span> Experiences
          </h1>
          <p className="text-[15px] font-medium text-brand-black/80 text-center max-w-[32ch] leading-snug">
            Future-Ready Digital, Branding, Web &amp; AI Experiences from Dubai.
          </p>
          <motion.a
            href="#contact"
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center rounded-full bg-brand-orange text-white px-9 py-4 text-base font-bold uppercase tracking-wider shadow-[0_18px_40px_rgba(255,122,26,0.45)]"
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
          className="relative hidden w-full flex-col items-start rounded-[28px] bg-brand-black px-6 pb-5 pt-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] md:flex md:min-h-[64vh] md:rounded-40 md:px-9 md:pb-6 md:pt-6 lg:min-h-[68vh] lg:pr-[34rem] xl:min-h-[70vh] xl:px-10 xl:pr-[43rem]"
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
          <div className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 gap-4 pointer-events-none lg:flex xl:right-8 xl:gap-6" style={{ perspective: "1000px" }}>
            <motion.video
              src="/videos/camera.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="h-56 w-40 rounded-3xl border border-white/10 object-cover shadow-[0_20px_40px_rgba(0,0,0,0.5)] xl:h-60 xl:w-48"
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
              className="mt-10 h-72 w-48 rounded-3xl border border-white/10 object-cover shadow-[0_20px_40px_rgba(0,0,0,0.6)] xl:mt-12 xl:h-80 xl:w-56"
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
              className="-ml-8 mt-32 h-52 w-36 rounded-3xl border border-white/10 object-cover shadow-[0_20px_40px_rgba(0,0,0,0.4)] xl:-ml-10 xl:mt-40 xl:h-56 xl:w-40"
              initial={{ y: 20, opacity: 0, rotateY: -10, rotateZ: -5 }}
              animate={{ y: [0, -12, 0], opacity: 1, rotateY: -10, rotateZ: -5 }}
              transition={{ y: { duration: 7, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 1, delay: 0.6 } }}
            />
          </div>

          {/* Top row — eyebrow */}
          <motion.div
            variants={fadeUp}
            className="relative w-full flex flex-row gap-3 items-start pl-1"
            style={{ zIndex: 2 }}
          >
            <span className="text-xs md:text-sm font-semibold text-brand-white/80 uppercase tracking-widest inline-flex items-center gap-2">
              <span className="agency-globe" aria-hidden>
                <img src="/images/earth.png" alt="" />
              </span>
              Founded in Dubai &middot; Operates Globally
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="relative z-20 mt-5 w-full max-w-[780px] font-zalando text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.05] text-brand-white drop-shadow-lg md:mt-7"
            style={{ zIndex: 20 }}
          >
            <span className="block w-full">Future-Ready</span>
            <span className="block w-full">
              <RotatingText items={rotateWords} className="text-brand-orange" />
            </span>
            <span className="block w-full">Experiences</span>
          </motion.h1>

          {/* Bottom row — subheading on the left, CTAs centered across the panel */}
          <motion.div
            variants={fadeUp}
            className="relative w-full mt-4 md:mt-5 flex flex-col lg:flex-row gap-4 lg:gap-8 justify-between items-start lg:items-end z-20"
            style={{ zIndex: 20 }}
          >
            <p className="text-[15px] md:text-base font-medium text-brand-white/90 max-w-lg leading-snug drop-shadow-md">
              A high-performance creative agency building futuristic brands, AI systems, and cinematic web design for modern businesses pushing the boundaries.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="relative z-20 mt-4 flex w-full flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-start"
            style={{ zIndex: 20 }}
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-orange px-7 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-[0_20px_50px_rgba(255,122,26,0.45)] ring-1 ring-white/20 sm:w-auto md:text-base"
            >
              Start Project
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </motion.a>
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
              <Link
                to="/work"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-[0_18px_45px_rgba(0,0,0,0.35)] backdrop-blur-md transition-colors hover:bg-white/20 sm:w-auto md:text-base"
              >
                Our Work
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Social row — Instagram · Calendly · WhatsApp */}
          <motion.div
            variants={fadeUp}
            className="relative w-full mt-4 flex flex-row gap-4 justify-start items-center z-20"
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
              <InstagramIcon className="h-12 w-12" />
            </motion.a>
            <motion.a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book a 30-min call on Calendly"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-5 h-14 text-brand-white hover:bg-white/20 transition-colors shadow-[0_14px_40px_rgba(0,0,0,0.35)]"
            >
              <CalendlyIcon className="h-6 w-6" />
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
              <WhatsAppIcon className="h-12 w-12" />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scrolling text strip — big bold infinite marquee. Extra top spacing on mobile so it sits below the CTA, not right against it. */}
        <div className="w-full overflow-hidden pb-1 pt-3 md:pt-4">
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
                    className="flex items-center font-clash font-bold uppercase tracking-tight text-brand-black leading-none text-[clamp(1.5rem,4vw,3rem)]"
                  >
                    <span className="px-6">{item}</span>
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
