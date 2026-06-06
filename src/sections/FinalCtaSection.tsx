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

  // Mouse-following warm halo — subtle Apple-glass shimmer
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
    <section
      id="contact"
      ref={panelRef}
      className="relative w-full overflow-hidden bg-brand-light-white px-4 py-8 text-brand-black md:px-8 md:py-12 lg:px-10 xl:px-[56px]"
    >
      {/* Ambient glassy backdrop — soft warm halos + hairline grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,122,26,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,122,26,0.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at center, black 35%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 35%, transparent 85%)',
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-32 h-[560px] w-[560px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(255,122,26,0.22) 0%, rgba(255,122,26,0) 70%)',
          filter: 'blur(24px)',
        }}
        animate={{ y: [0, 24, 0], x: [0, -18, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-32 h-[600px] w-[600px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(255,180,120,0.26) 0%, rgba(255,180,120,0) 70%)',
          filter: 'blur(26px)',
        }}
        animate={{ y: [0, -22, 0], x: [0, 20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Mouse-following orb */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute hidden lg:block rounded-full"
        style={{
          width: 480,
          height: 480,
          left: orbX,
          top: orbY,
          x: '-50%',
          y: '-50%',
          background:
            'radial-gradient(circle, rgba(255,122,26,0.18) 0%, rgba(255,122,26,0) 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1300px] flex-col items-start gap-6 lg:flex-row lg:gap-7 xl:gap-8">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.08 }}
          className="flex-1 flex flex-col gap-5 max-w-[640px]"
        >
          {/* Live availability pill — glassy */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex w-fit items-center gap-2.5 rounded-full border border-brand-off-gray/80 bg-white/70 backdrop-blur-md px-4 py-2"
          >
            <Pulse color="#22c55e" />
            <span className="dm-p14-semi text-brand-black/80 uppercase tracking-[0.18em] text-[11px]">
              Available · taking 2 projects this month
            </span>
          </motion.div>

          <span className="dm-p18-semi text-brand-black/55">(Contact)</span>

          <h2 className="font-zalando text-[clamp(1.4rem,2.5vw,2.25rem)] font-semibold leading-[1.08] text-brand-black">
            <span className="block">Ready To Build A</span>
            <span className="block">Future-Ready</span>
            <span className="block">
              <RotatingText
                items={contactRotateWords}
                interval={2.2}
                className="text-brand-orange"
              />
            </span>
          </h2>

          <p className="dm-p18-semi text-brand-black/65 max-w-[560px]">
            Partner with CKR Creatives for branding, web design, SEO optimization, AI automation,
            and high-performance digital experiences designed for modern businesses.
          </p>

          {/* Trust badges — glassy white cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1">
            {trustBadges.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                className="rounded-2xl border border-brand-off-gray/70 bg-white/60 backdrop-blur-xl p-3.5 hover:bg-white/80 hover:border-brand-orange/40 transition-colors"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-3 top-0 h-px"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)',
                  }}
                />
                <div className="dm-p14-semi text-brand-black">{b.label}</div>
                <div className="text-xs text-brand-black/60 mt-1 leading-snug">{b.detail}</div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-row items-center gap-3 mt-2 text-brand-black/75">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
              <path d="M12 21s-7-6.5-7-12a7 7 0 1 1 14 0c0 5.5-7 12-7 12Z" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.6" />
            </svg>
            <span className="dm-p14-semi">Dubai, United Arab Emirates</span>
          </div>

          <div className="mt-3 flex w-full flex-wrap items-center gap-3 sm:gap-4">
            <motion.a
              href="https://www.instagram.com/ckrcreatives/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CKR Creatives on Instagram"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_12px_30px_-10px_rgba(131,58,180,0.45)] sm:w-auto"
            >
              <img src="/images/instagram_logo.png" alt="" aria-hidden className="h-5 w-5 object-contain brightness-0 invert" loading="lazy" />
              Instagram
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </motion.a>
            <motion.a
              href="https://wa.me/971521046611"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-brand-off-gray/80 bg-white/70 px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-brand-black backdrop-blur-md transition-colors hover:bg-white/85 sm:w-auto"
            >
              <img src="/images/whatsapp%20logo.png" alt="" aria-hidden className="h-5 w-5 object-contain" loading="lazy" />
              WhatsApp
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </motion.a>
          </div>

          <div className="flex w-full flex-wrap items-center gap-3 sm:gap-4">
            <motion.a
              href="https://calendly.com/ckrstudiodesign/30min"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book a 30-min call on Calendly"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-brand-off-gray/80 bg-white/70 px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-brand-black backdrop-blur-md transition-colors hover:bg-white/85 sm:w-auto"
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
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-brand-off-gray/80 bg-white/70 px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-brand-black backdrop-blur-md transition-colors hover:bg-white/85 sm:w-auto"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
                <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
                <path d="m5 8 7 5 7-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Email
            </motion.a>
          </div>
        </motion.div>

        {/* Right column — glassy form card */}
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.18 }}
          onSubmit={handleSubmit}
          className="relative flex w-full max-w-[820px] flex-[1.25] flex-col gap-4 overflow-hidden rounded-[28px] border border-brand-off-gray/70 bg-white/65 p-5 shadow-[0_30px_80px_-30px_rgba(36,16,6,0.18)] backdrop-blur-2xl md:rounded-[32px] md:p-6 xl:p-7"
        >
          {/* Apple-glass top sheen */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-8 top-0 h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent)',
            }}
          />

          {/* Form header */}
          <div className="mb-1 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
            <h3 className="font-zalando text-[22px] md:text-[26px] font-semibold text-brand-black">
              Start the conversation
            </h3>
            <span className="text-[11px] uppercase tracking-[0.18em] text-brand-black/55">{progress}% ready</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-brand-off-gray/60">
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
                      ? 'border-brand-orange bg-brand-orange text-white'
                      : 'border-brand-off-gray/80 bg-white/70 text-brand-black/70 hover:border-brand-orange/40 hover:bg-white/90 hover:text-brand-black'
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
              className="peer w-full rounded-2xl border border-brand-off-gray/80 bg-white/70 px-5 pb-3.5 pt-6 text-base font-semibold text-brand-black outline-none transition-all focus:border-brand-orange focus:bg-white/90 focus:shadow-[0_0_0_4px_rgba(255,122,26,0.15)] disabled:opacity-60 md:px-6 md:text-lg"
            />
            <label
              htmlFor="cta-name"
              className="pointer-events-none absolute left-5 top-4 text-brand-black/55 transition-all peer-focus:top-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.18em] peer-focus:text-brand-orange peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.18em] peer-[:not(:placeholder-shown)]:text-brand-black/65"
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
              className="peer w-full rounded-2xl border border-brand-off-gray/80 bg-white/70 px-5 pb-3.5 pt-6 text-base font-semibold text-brand-black outline-none transition-all focus:border-brand-orange focus:bg-white/90 focus:shadow-[0_0_0_4px_rgba(255,122,26,0.15)] disabled:opacity-60 md:px-6 md:text-lg"
            />
            <label
              htmlFor="cta-email"
              className="pointer-events-none absolute left-5 top-4 text-brand-black/55 transition-all peer-focus:top-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.18em] peer-focus:text-brand-orange peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.18em] peer-[:not(:placeholder-shown)]:text-brand-black/65"
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
              rows={4}
              disabled={isSending || isSuccess}
              placeholder=" "
              className="peer w-full resize-none rounded-2xl border border-brand-off-gray/80 bg-white/70 px-5 pb-3.5 pt-6 text-base font-semibold text-brand-black outline-none transition-all focus:border-brand-orange focus:bg-white/90 focus:shadow-[0_0_0_4px_rgba(255,122,26,0.15)] disabled:opacity-60 md:px-6 md:text-lg"
            />
            <label
              htmlFor="cta-project"
              className="pointer-events-none absolute left-5 top-4 text-brand-black/55 transition-all peer-focus:top-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.18em] peer-focus:text-brand-orange peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.18em] peer-[:not(:placeholder-shown)]:text-brand-black/65"
            >
              Tell us about your project
            </label>
            <span className="absolute bottom-3 right-4 text-[11px] text-brand-black/40 tabular-nums">
              {message.length}/{MESSAGE_LIMIT}
            </span>
          </div>

          {/* Submit button */}
          <motion.button
            whileHover={{ scale: isSending || isSuccess ? 1 : 1.02, y: isSending || isSuccess ? 0 : -1 }}
            whileTap={{ scale: isSending || isSuccess ? 1 : 0.98 }}
            type="submit"
            disabled={isSending || isSuccess}
            className="group relative inline-flex w-full items-center justify-center gap-3 self-start overflow-hidden rounded-full bg-brand-orange px-7 py-3.5 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-[0_18px_40px_-12px_rgba(255,122,26,0.55)] disabled:cursor-not-allowed disabled:opacity-80 sm:w-auto sm:px-10"
          >
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-700"
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
                <div className="dm-p14-semi text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-3.5 flex items-start gap-3">
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 shrink-0 mt-0.5 text-emerald-600" aria-hidden>
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
                <div className="dm-p14-semi text-red-900 bg-red-50 border border-red-200 rounded-2xl px-5 py-3.5">
                  {status.message}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-[11px] text-brand-black/45 mt-1 leading-relaxed">
            By submitting you agree to be contacted about your inquiry. We never share your details.
          </p>
        </motion.form>
      </div>
    </section>
  )
}
