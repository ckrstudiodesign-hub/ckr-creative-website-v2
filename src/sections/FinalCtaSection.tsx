import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import Pulse from '../components/Pulse'
import RotatingText from '../components/RotatingText'

const WEB3FORMS_ACCESS_KEY = '1e5585e5-f8f8-4d9b-9b0f-b7e1b27cd459'
const MESSAGE_LIMIT = 1000

const contactRotateWords = [
  'Dubai Creative Agency',
  'Branding',
  'Web Design',
  'AI Automation',
  'SEO',
  'Digital Marketing',
  'CyberSecurity',
  'SEO AEO GEO LLMO',
]

const projectPrompts = [
  'Branding',
  'Web Design',
  'SEO Growth',
  'AI Automation',
  'Digital Marketing',
]

type SubmitState =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'success' }
  | { kind: 'error'; message: string }

const trustBadges = [
  { label: 'Response < 24h', detail: 'One business day, every time' },
  { label: '100% Custom', detail: 'No templates, ever' },
  { label: 'Dubai · Global', detail: 'Local roots, worldwide reach' },
]

export default function FinalCtaSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [projectType, setProjectType] = useState('')
  const [status, setStatus] = useState<SubmitState>({ kind: 'idle' })

  // Mouse-following gradient orb — adds a subtle "alive" feel to the panel
  const panelRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.3)
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 })
  const orbX = useTransform(springX, (v) => `${v * 100}%`)
  const orbY = useTransform(springY, (v) => `${v * 100}%`)

  useEffect(() => {
    const el = panelRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      mouseX.set((e.clientX - rect.left) / rect.width)
      mouseY.set((e.clientY - rect.top) / rect.height)
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus({ kind: 'sending' })

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New inquiry from ${name || 'CKR Creatives site'}`,
          from_name: name,
          email,
          project_type: projectType,
          message,
          botcheck: '',
        }),
      })

      const data = await res.json()
      if (data?.success) {
        setStatus({ kind: 'success' })
        setName('')
        setEmail('')
        setMessage('')
        setProjectType('')
      } else {
        setStatus({ kind: 'error', message: data?.message ?? 'Something went wrong. Please try again.' })
      }
    } catch (err) {
      setStatus({
        kind: 'error',
        message: err instanceof Error ? err.message : 'Network error. Please try again.',
      })
    }
  }

  const isSending = status.kind === 'sending'
  const isSuccess = status.kind === 'success'
  const filledFields = [name, email, projectType, message].filter(Boolean).length
  const progress = Math.round((filledFields / 4) * 100)

  return (
    <section id="contact" className="w-full bg-brand-white px-5 py-10 text-brand-white md:px-10 md:py-14 xl:px-[72px]">
      <motion.div
        ref={panelRef}
        initial={{ opacity: 0, y: 34, scale: 0.985 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-120px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative w-full max-w-[1920px] mx-auto overflow-hidden rounded-[28px] md:rounded-40 bg-brand-black px-5 py-12 md:px-11 md:py-16 xl:px-14 xl:py-20"
      >
        {/* Background image */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-55"
          style={{ backgroundImage: 'url("/images/contact%20back.jpeg")' }}
        />

        {/* Animated dotted grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          }}
        />

        {/* Mouse-following warm orb (desktop pointer devices) */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute hidden lg:block rounded-full bg-white/20 blur-[140px]"
          style={{
            width: 520,
            height: 520,
            left: orbX,
            top: orbY,
            x: '-50%',
            y: '-50%',
          }}
        />

        {/* Static glow orbs */}
        <div
          aria-hidden
          className="pointer-events-none absolute rounded-full bg-white/20 blur-[180px]"
          style={{ top: 80, right: '48%', bottom: '42%', left: -360 }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute rounded-full bg-white/18 blur-[170px]"
          style={{ top: 50, right: -420, bottom: '34%', left: '58%' }}
        />

        {/* Color overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.28) 42%, rgba(0,0,0,0.72) 100%)',
          }}
        />

        <div className="relative z-10 flex w-full flex-col items-start gap-16 lg:flex-row lg:gap-14 xl:gap-20">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.08 }}
            className="flex-1 flex flex-col gap-7 max-w-[640px]"
          >
            {/* Live availability pill */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-2"
            >
              <Pulse color="rgb(74, 222, 128)" />
              <span className="dm-p14-semi text-brand-white/90 uppercase tracking-[0.18em] text-[11px]">
                Available · taking 2 projects this month
              </span>
            </motion.div>

            <span className="dm-p18-semi text-brand-white/70">(Contact)</span>

            <h2 className="font-zalando text-[clamp(2.35rem,4.3vw,4.8rem)] font-semibold leading-[1.08] text-brand-white">
              <span className="block">Ready To Build A</span>
              <span className="block">Future-Ready</span>
              <span className="block whitespace-nowrap">
                <RotatingText
                  items={contactRotateWords}
                  interval={2.2}
                  className="text-brand-orange"
                />
              </span>
            </h2>

            <p className="dm-p18-semi text-brand-white/75 max-w-[560px]">
              Partner with CKR Creatives for branding, web design, SEO optimization, AI automation,
              and high-performance digital experiences designed for modern businesses.
            </p>

            {/* Trust badges row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
              {trustBadges.map((b, i) => (
                <motion.div
                  key={b.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                  className="rounded-2xl border border-white/14 bg-white/[0.06] backdrop-blur-md p-4 hover:bg-white/[0.10] hover:border-white/30 transition-colors"
                >
                  <div className="dm-p14-semi text-brand-white">{b.label}</div>
                  <div className="text-xs text-brand-white/65 mt-1 leading-snug">{b.detail}</div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-row items-center gap-3 mt-2">
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-brand-white/80" aria-hidden>
                <path d="M12 21s-7-6.5-7-12a7 7 0 1 1 14 0c0 5.5-7 12-7 12Z" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              <span className="dm-p14-semi text-brand-white/85">Dubai, United Arab Emirates</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-3">
              <motion.a
                href="https://www.instagram.com/ckrcreatives/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CKR Creatives on Instagram"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-3 rounded-full bg-brand-white text-brand-orange px-7 py-3.5 dm-p14-semi uppercase tracking-[0.5px] shadow-[0_18px_40px_rgba(255,255,255,0.18)] [&>span]:hidden"
              >
                <img src="/images/instagram_logo.png" alt="" aria-hidden className="h-8 w-8 object-contain" loading="lazy" />
                Instagram
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">â†’</span>
              </motion.a>
              <motion.a
                href="https://wa.me/971521046611"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-3 rounded-full border border-white/24 bg-white/[0.10] px-7 py-3.5 dm-p14-semi uppercase tracking-[0.5px] text-brand-white shadow-[0_18px_40px_rgba(0,0,0,0.22)] backdrop-blur-md transition-colors hover:bg-white/[0.16] [&>span]:hidden"
              >
                <img src="/images/whatsapp%20logo.png" alt="" aria-hidden className="h-8 w-8 object-contain" loading="lazy" />
                WhatsApp
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">â†’</span>
              </motion.a>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <motion.a
                href="https://calendly.com/ckrstudiodesign/30min"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Book a 30-min call on Calendly"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-3 rounded-full border border-white/24 bg-white/[0.10] px-7 py-3.5 dm-p14-semi uppercase tracking-[0.5px] text-brand-white shadow-[0_18px_40px_rgba(0,0,0,0.22)] backdrop-blur-md transition-colors hover:bg-white/[0.16]"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
                  <rect x="3.5" y="5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M3.5 9.5h17" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="12" cy="14.5" r="2" fill="currentColor" />
                </svg>
                Book a 30-min call
              </motion.a>
              <motion.a
                href="mailto:ckrstudiodesign@gmail.com?subject=Project%20inquiry%20from%20CKR%20Creatives%20website"
                aria-label="Email CKR Creatives"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-3 rounded-full border border-white/24 bg-white/[0.10] px-7 py-3.5 dm-p14-semi uppercase tracking-[0.5px] text-brand-white shadow-[0_18px_40px_rgba(0,0,0,0.22)] backdrop-blur-md transition-colors hover:bg-white/[0.16]"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
                  <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
                  <path d="m5 8 7 5 7-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Email
              </motion.a>
            </div>

            {/* Action row */}
            <div className="hidden">
              <motion.a
                href="https://calendly.com/ckrstudiodesign/30min"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-3 rounded-full bg-brand-white text-brand-orange px-7 py-3.5 dm-p14-semi uppercase tracking-[0.5px] shadow-[0_18px_40px_rgba(255,255,255,0.18)]"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
                  <rect x="3.5" y="5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M3.5 9.5h17" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="12" cy="14.5" r="2" fill="currentColor" />
                </svg>
                Book a 30-min call
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </motion.a>
              <motion.a
                href="https://www.instagram.com/ckrcreatives/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CKR Creatives on Instagram"
                whileHover={{ scale: 1.12, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center drop-shadow-[0_6px_18px_rgba(0,0,0,0.4)]"
              >
                <img src="/images/instagram_logo.png" alt="" aria-hidden className="h-12 w-12 object-contain" loading="lazy" />
              </motion.a>
              <motion.a
                href="https://wa.me/971521046611"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                whileHover={{ scale: 1.12, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center drop-shadow-[0_6px_18px_rgba(0,0,0,0.4)]"
              >
                <img src="/images/whatsapp%20logo.png" alt="" aria-hidden className="h-12 w-12 object-contain" loading="lazy" />
              </motion.a>
            </div>

          </motion.div>

          {/* Right column — form */}
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.18 }}
            onSubmit={handleSubmit}
            className="relative flex-[1.25] w-full max-w-[820px] flex flex-col gap-6 rounded-[32px] border border-white/18 bg-white/[0.07] p-7 shadow-[0_34px_100px_rgba(0,0,0,0.38)] backdrop-blur-2xl md:p-10 xl:p-12 overflow-hidden"
          >
            {/* Form header */}
            <div className="flex items-baseline justify-between gap-4 mb-1">
              <h3 className="zalando-h3-44 text-brand-white">Start the conversation</h3>
              <span className="text-[11px] uppercase tracking-[0.18em] text-brand-white/55">{progress}% ready</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-brand-orange"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {projectPrompts.map((prompt) => {
                const selected = projectType === prompt
                return (
                  <button
                    key={prompt}
                    type="button"
                    disabled={isSending || isSuccess}
                    onClick={() => {
                      setProjectType(prompt)
                      if (!message.trim()) {
                        setMessage(`I'm interested in ${prompt}. I want to build...`)
                      }
                    }}
                    className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] transition-all disabled:opacity-60 ${
                      selected
                        ? 'border-brand-orange bg-brand-orange text-brand-white'
                        : 'border-white/15 bg-white/[0.06] text-brand-white/72 hover:border-white/35 hover:bg-white/[0.10] hover:text-brand-white'
                    }`}
                  >
                    {selected && <Sparkles className="h-3.5 w-3.5" aria-hidden />}
                    {prompt}
                  </button>
                )
              })}
            </div>

            {/* Honeypot */}
            <input type="checkbox" name="botcheck" tabIndex={-1} className="hidden" defaultChecked={false} />

            {/* Floating-label Name */}
            <div className="relative">
              <input
                id="cta-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isSending || isSuccess}
                placeholder=" "
                autoComplete="name"
                className="peer w-full bg-white/[0.06] border border-white/15 rounded-2xl px-6 pt-7 pb-4 text-xl font-semibold text-brand-white outline-none transition-all focus:border-brand-orange focus:bg-white/[0.10] focus:shadow-[0_0_0_4px_rgba(255,122,26,0.18)] disabled:opacity-60"
              />
              <label
                htmlFor="cta-name"
                className="pointer-events-none absolute left-5 top-4 text-brand-white/65 transition-all peer-focus:top-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.18em] peer-focus:text-brand-orange peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.18em] peer-[:not(:placeholder-shown)]:text-brand-white/70"
              >
                Your name
              </label>
            </div>

            {/* Floating-label Email */}
            <div className="relative">
              <input
                id="cta-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                disabled={isSending || isSuccess}
                placeholder=" "
                autoComplete="email"
                className="peer w-full bg-white/[0.06] border border-white/15 rounded-2xl px-6 pt-7 pb-4 text-xl font-semibold text-brand-white outline-none transition-all focus:border-brand-orange focus:bg-white/[0.10] focus:shadow-[0_0_0_4px_rgba(255,122,26,0.18)] disabled:opacity-60"
              />
              <label
                htmlFor="cta-email"
                className="pointer-events-none absolute left-5 top-4 text-brand-white/65 transition-all peer-focus:top-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.18em] peer-focus:text-brand-orange peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.18em] peer-[:not(:placeholder-shown)]:text-brand-white/70"
              >
                Email address
              </label>
            </div>

            {/* Floating-label Project + char counter */}
            <div className="relative">
              <textarea
                id="cta-project"
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, MESSAGE_LIMIT))}
                required
                rows={7}
                disabled={isSending || isSuccess}
                placeholder=" "
                className="peer w-full bg-white/[0.06] border border-white/15 rounded-2xl px-6 pt-7 pb-4 text-xl font-semibold text-brand-white outline-none transition-all focus:border-brand-orange focus:bg-white/[0.10] focus:shadow-[0_0_0_4px_rgba(255,122,26,0.18)] resize-none disabled:opacity-60"
              />
              <label
                htmlFor="cta-project"
                className="pointer-events-none absolute left-5 top-4 text-brand-white/65 transition-all peer-focus:top-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.18em] peer-focus:text-brand-orange peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.18em] peer-[:not(:placeholder-shown)]:text-brand-white/70"
              >
                Tell us about your project
              </label>
              <span className="absolute bottom-3 right-4 text-[11px] text-brand-white/45 tabular-nums">
                {message.length}/{MESSAGE_LIMIT}
              </span>
            </div>

            {/* Submit button with animated states */}
            <motion.button
              whileHover={{ scale: isSending || isSuccess ? 1 : 1.02, y: isSending || isSuccess ? 0 : -1 }}
              whileTap={{ scale: isSending || isSuccess ? 1 : 0.98 }}
              type="submit"
              disabled={isSending || isSuccess}
              className="group relative overflow-hidden self-start inline-flex items-center gap-3 rounded-full bg-brand-white text-brand-orange px-11 py-5 text-sm font-bold uppercase tracking-[0.18em] shadow-[0_20px_50px_rgba(255,255,255,0.20)] disabled:opacity-80 disabled:cursor-not-allowed"
            >
              {/* Sliding sheen on hover */}
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-brand-orange/15 to-transparent group-hover:translate-x-full transition-transform duration-700"
              />
              <AnimatePresence mode="wait" initial={false}>
                {isSuccess ? (
                  <motion.span
                    key="ok"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="relative z-10 inline-flex items-center gap-2"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
                      <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Message sent
                  </motion.span>
                ) : isSending ? (
                  <motion.span
                    key="sending"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="relative z-10 inline-flex items-center gap-2"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 animate-spin" aria-hidden>
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.5" />
                      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                    Sending…
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="relative z-10 inline-flex items-center gap-2"
                  >
                    Start The Experience
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Status messages */}
            <AnimatePresence>
              {status.kind === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="dm-p14-semi text-brand-white bg-emerald-500/30 border border-emerald-400/40 rounded-2xl px-5 py-3.5 flex items-start gap-3">
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 shrink-0 mt-0.5" aria-hidden>
                      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M8 12.5l2.5 2.5L16 9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Thanks — your message is in. We'll reply within one business day.</span>
                  </div>
                </motion.div>
              )}
              {status.kind === 'error' && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="dm-p14-semi text-brand-white bg-red-500/30 border border-red-400/40 rounded-2xl px-5 py-3.5">
                    {status.message}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-[11px] text-brand-white/55 mt-1 leading-relaxed">
              By submitting you agree to be contacted about your inquiry. We never share your details.
            </p>
          </motion.form>
        </div>
      </motion.div>
    </section>
  )
}
