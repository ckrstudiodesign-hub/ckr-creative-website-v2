import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import LinkedInPost, { LINKEDIN_URL } from './LinkedInPost'
import TwitterPost, { TWITTER_URL } from './TwitterPost'
import PhoneFrame from '../components/PhoneFrame'

const INSTAGRAM_URL = 'https://www.instagram.com/ckrcreatives/'

/* Real CKR Creatives reels — shortcodes pulled from the public IG profile.
   The IG mock cycles through these every ~12s using Instagram's official
   embed iframe, so the post you see in the phone is the actual live reel
   on instagram.com/ckrcreatives, not a simulated one. */
const reelShortcodes = [
  'DZSTrPcgiIw',
  'DZSmWFZsRIC',
  'DZUUPlqMaY-',
]

const embedSrc = (shortcode: string) =>
  `https://www.instagram.com/reel/${shortcode}/embed/captioned/`

/* ─── Compact, embed-based IG reels viewer (replaces the old fake-IG simulator) ─── */
function InstagramReels() {
  const [idx, setIdx] = useState(0)

  // Auto-advance through the reels. IG embeds don't autoplay-loop on their own
  // (they show a tap-to-play poster), so we rotate which one is mounted.
  useEffect(() => {
    const id = window.setInterval(() => {
      setIdx((i) => (i + 1) % reelShortcodes.length)
    }, 12000)
    return () => window.clearInterval(id)
  }, [])

  const igFont: React.CSSProperties = {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  }

  return (
    <div className="w-full bg-white overflow-hidden flex flex-col min-h-full" style={igFont}>
      {/* IG top bar (kept for visual fidelity with the LinkedIn/X mocks) */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 sticky top-0 bg-white z-30">
        <span
          className="text-[24px] text-gray-900"
          style={{ fontFamily: '"Billabong","Snell Roundhand","Apple Chancery",cursive', letterSpacing: '0.5px' }}
        >
          Instagram
        </span>
        <div className="flex items-center gap-4 text-gray-900">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <polygon points="12 2 15 9 22 9 17 14 19 22 12 18 5 22 7 14 2 9 9 9" strokeLinejoin="round" />
          </svg>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <line x1="22" y1="3" x2="9.218" y2="10.083" strokeLinecap="round" />
            <polygon points="22 3 15 22 11 13 2 9" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Header row — profile + Reels label */}
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between px-3.5 py-2.5 no-underline"
      >
        <div className="flex items-center gap-2.5">
          <div
            className="relative w-[34px] h-[34px] rounded-full p-[2px]"
            style={{
              background: 'linear-gradient(135deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)',
            }}
          >
            <div className="w-full h-full rounded-full bg-white p-[1.5px]">
              <img src="/images/logo.png" alt="CKR Creatives" className="w-full h-full rounded-full object-cover" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-semibold text-gray-900">ckrcreatives</span>
            <span className="text-[11px] text-gray-500 -mt-0.5">Dubai, UAE · Reels</span>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] font-semibold text-gray-900 bg-gray-100 rounded-full px-2 py-1">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <polygon points="10 9 16 12 10 15" fill="currentColor" />
          </svg>
          Live
        </span>
      </a>

      {/* The actual IG embed — cycles through reelShortcodes */}
      <div className="relative w-full" style={{ aspectRatio: '9 / 16', background: '#000' }}>
        <AnimatePresence mode="wait">
          <motion.iframe
            key={reelShortcodes[idx]}
            src={embedSrc(reelShortcodes[idx])}
            title={`CKR Creatives reel ${idx + 1}`}
            className="absolute inset-0 w-full h-full"
            style={{ border: 0, background: '#000' }}
            allow="autoplay; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            scrolling="no"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          />
        </AnimatePresence>
      </div>

      {/* Slide indicator + manual nav */}
      <div className="flex items-center justify-center gap-3 px-3.5 py-3">
        <button
          type="button"
          onClick={() => setIdx((i) => (i - 1 + reelShortcodes.length) % reelShortcodes.length)}
          aria-label="Previous reel"
          className="text-gray-500 hover:text-gray-900 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="flex items-center gap-1.5">
          {reelShortcodes.map((_, i) => (
            <motion.span
              key={i}
              className="rounded-full"
              animate={{
                width: i === idx ? 18 : 5,
                height: 5,
                backgroundColor: i === idx ? '#0095F6' : '#D7D7D7',
              }}
              transition={{ duration: 0.25 }}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setIdx((i) => (i + 1) % reelShortcodes.length)}
          aria-label="Next reel"
          className="text-gray-500 hover:text-gray-900 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* IG bottom tab bar */}
      <div className="mt-auto sticky bottom-0 bg-white border-t border-gray-200 flex items-center justify-around py-2.5 z-30">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-gray-900">
          <path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1z" />
        </svg>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-900">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
        </svg>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-gray-900">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <polygon points="10 9 16 12 10 15" fill="white" />
        </svg>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-900">
          <rect x="2" y="6" width="20" height="14" rx="2" />
          <path d="M8 6V4a4 4 0 0 1 8 0v2" />
        </svg>
        <div className="w-[26px] h-[26px] rounded-full p-[1.5px] ring-2 ring-gray-900">
          <img src="/images/logo.png" alt="" className="w-full h-full rounded-full object-cover" />
        </div>
      </div>
    </div>
  )
}

/* ─── Section wrapper (LinkedIn · Instagram · X) ─── */
export default function InstagramSection() {
  return (
    <section className="w-full bg-brand-white px-5 py-8 md:px-10 md:py-12 xl:px-[56px] overflow-hidden">
      <div className="w-full max-w-[1300px] mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center gap-4 mb-8"
        >
          <div className="flex items-center gap-3">
            <span className="dm-p18-semi opacity-50">(FOLLOW US)</span>
          </div>
          <h2 className="zalando-h2-lh69 max-w-[820px]">See Our Latest Work</h2>
          <p className="dm-p18-semi opacity-60 max-w-[560px]">
            Follow our journey across LinkedIn, Instagram, and X for behind-the-scenes,
            project showcases, and creative insights.
          </p>
        </motion.div>

        {/* Three-platform grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-5 xl:gap-6 items-start justify-items-center">
          {/* LEFT — LinkedIn */}
          <motion.div
            initial={{ opacity: 0, y: 24, rotate: -1 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.0, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full flex justify-center"
          >
            <div
              className="absolute -inset-10 -z-10 opacity-40 blur-[60px]"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(10,102,194,0.30) 0%, rgba(10,102,194,0.12) 50%, transparent 70%)',
              }}
            />
            <div className="flex flex-col items-center gap-4">
              <PhoneFrame bezel="silver">
                <LinkedInPost />
              </PhoneFrame>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-[#0a66c2] px-4 py-2 text-white text-[12px] font-semibold tracking-wide shadow-[0_10px_30px_rgba(10,102,194,0.35)] hover:shadow-[0_14px_40px_rgba(10,102,194,0.50)] transition-shadow"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Visit LinkedIn Page
                <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
              </a>
            </div>
          </motion.div>

          {/* MIDDLE — Instagram reels (real embeds) */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full flex justify-center lg:-mt-3"
          >
            <div
              className="absolute -inset-10 -z-10 opacity-50 blur-[70px]"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(255,122,26,0.35) 0%, rgba(214,41,118,0.18) 50%, transparent 70%)',
              }}
            />
            <div className="flex flex-col items-center gap-4">
              <PhoneFrame bezel="desert">
                <InstagramReels />
              </PhoneFrame>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] px-4 py-2 text-white text-[12px] font-semibold tracking-wide shadow-[0_10px_30px_rgba(131,58,180,0.35)] hover:shadow-[0_14px_40px_rgba(131,58,180,0.50)] transition-shadow"
              >
                <img src="/images/instagram_logo.png" alt="" className="w-3.5 h-3.5 object-contain brightness-0 invert" />
                Visit Instagram Page
                <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
              </a>
            </div>
          </motion.div>

          {/* RIGHT — X / Twitter */}
          <motion.div
            initial={{ opacity: 0, y: 24, rotate: 1 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full flex justify-center"
          >
            <div
              className="absolute -inset-10 -z-10 opacity-40 blur-[60px]"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(29,155,240,0.30) 0%, rgba(0,0,0,0.10) 50%, transparent 70%)',
              }}
            />
            <div className="flex flex-col items-center gap-4">
              <PhoneFrame bezel="graphite">
                <TwitterPost />
              </PhoneFrame>
              <a
                href={TWITTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-white text-[12px] font-semibold tracking-wide shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_14px_40px_rgba(0,0,0,0.55)] transition-shadow"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Visit X Profile
                <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
