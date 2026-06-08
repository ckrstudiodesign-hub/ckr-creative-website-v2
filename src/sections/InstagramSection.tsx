import { motion, AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import LinkedInPost, { LINKEDIN_URL } from './LinkedInPost'
import TwitterPost, { TWITTER_URL } from './TwitterPost'
import PhoneFrame from '../components/PhoneFrame'

const INSTAGRAM_URL = 'https://www.instagram.com/ckrcreatives/'

/* Real CKR Creatives reels — pulled from instagram.com/ckrcreatives via
   yt-dlp and saved locally so the IG mock can autoplay them muted in a
   continuous loop (Instagram's own embeds don't allow muted-autoplay).
   Each entry deep-links back to the original reel when the user taps. */
type Reel = {
  src: string
  permalink: string
  caption: string
}

const reels: Reel[] = [
  {
    src: '/videos/reel-1.mp4',
    permalink: 'https://www.instagram.com/reel/DZSTrPcgiIw/',
    caption: 'Premium animated websites built for modern brands. ✨',
  },
  {
    src: '/videos/reel-2.mp4',
    permalink: 'https://www.instagram.com/reel/DZSmWFZsRIC/',
    caption: 'Branding that earns attention. Dubai-based, global mindset.',
  },
  {
    src: '/videos/reel-3.mp4',
    permalink: 'https://www.instagram.com/reel/DZUUPlqMaY-/',
    caption: 'Behind the scenes — crafting the future of creative tech.',
  },
]

/* ─── Real IG-style reels feed (autoplay · muted · loops one-by-one) ─── */
function InstagramReels() {
  const [idx, setIdx] = useState(0)
  const [muted, setMuted] = useState(true)
  const [liked, setLiked] = useState<Set<number>>(new Set())
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  // Only the active reel plays; others are paused and rewound so the next
  // visit starts clean — mimics how IG Reels handles the vertical feed.
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return
      if (i === idx) {
        v.currentTime = 0
        v.muted = muted
        v.play().catch(() => {})
      } else {
        v.pause()
      }
    })
  }, [idx, muted])

  const advance = useCallback(() => {
    setIdx((i) => (i + 1) % reels.length)
  }, [])

  const toggleLike = (i: number) => {
    setLiked((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  const igFont: React.CSSProperties = {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  }

  return (
    <div className="relative w-full h-full bg-black overflow-hidden flex flex-col" style={igFont}>
      {/* Fixed top "Reels" header */}
      <div className="absolute top-0 inset-x-0 z-40 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/70 to-transparent text-white">
        <span className="text-[18px] font-semibold tracking-tight">Reels</span>
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? 'Unmute' : 'Mute'}
          className="bg-black/40 backdrop-blur-md rounded-full p-1.5"
        >
          {muted ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.17v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>
      </div>

      {/* Vertical reel stack — only the active one is rendered visibly */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={idx}
            className="absolute inset-0"
            initial={{ y: '8%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-8%', opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <video
              ref={(el) => { videoRefs.current[idx] = el }}
              src={reels[idx].src}
              className="absolute inset-0 w-full h-full object-cover bg-black"
              autoPlay
              muted={muted}
              playsInline
              preload="auto"
              onEnded={advance}
              onClick={() => {
                const v = videoRefs.current[idx]
                if (!v) return
                if (v.paused) v.play().catch(() => {})
                else v.pause()
              }}
            />

            {/* Right-side action rail (like / comment / share / save / more) */}
            <div className="absolute right-2.5 bottom-24 z-20 flex flex-col items-center gap-4 text-white">
              <button type="button" onClick={() => toggleLike(idx)} className="flex flex-col items-center gap-0.5">
                <svg width="26" height="26" viewBox="0 0 24 24" fill={liked.has(idx) ? '#FF3040' : 'none'} stroke={liked.has(idx) ? '#FF3040' : 'currentColor'} strokeWidth="1.8">
                  <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-1.816-1.521-4.303-3.752C5.152 14.08 2.5 12.194 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938z" strokeLinejoin="round" />
                </svg>
                <span className="text-[10px] font-semibold drop-shadow">{liked.has(idx) ? '12.4k' : '12.3k'}</span>
              </button>
              <a
                href={reels[idx].permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-0.5"
                aria-label="Open comments on Instagram"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22z" strokeLinejoin="round" />
                </svg>
                <span className="text-[10px] font-semibold drop-shadow">284</span>
              </a>
              <a
                href={reels[idx].permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-0.5"
                aria-label="Open reel on Instagram"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <line x1="22" y1="3" x2="9.218" y2="10.083" />
                  <polygon points="22 3 15 22 11 13 2 9" strokeLinejoin="round" />
                </svg>
                <span className="text-[10px] font-semibold drop-shadow">Share</span>
              </a>
              <button type="button" className="flex flex-col items-center gap-0.5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <polygon points="20 21 12 13.44 4 21 4 3 20 3" strokeLinejoin="round" />
                </svg>
              </button>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-md overflow-hidden ring-1 ring-white/60"
                aria-label="Open CKR Creatives on Instagram"
              >
                <img src="/images/logo.png" alt="" className="w-full h-full object-cover" />
              </a>
            </div>

            {/* Bottom caption + profile chip */}
            <div className="absolute left-3 right-14 bottom-20 z-20 text-white">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 mb-2"
              >
                <div className="w-8 h-8 rounded-full ring-2 ring-white overflow-hidden bg-white">
                  <img src="/images/logo.png" alt="" className="w-full h-full object-cover" />
                </div>
                <span className="text-[13px] font-semibold drop-shadow">ckrcreatives</span>
                <span className="text-[11px] border border-white/80 rounded-md px-1.5 py-[1px] font-semibold ml-1">
                  Follow
                </span>
              </a>
              <p className="text-[12px] leading-tight drop-shadow line-clamp-2">
                {reels[idx].caption}
              </p>
              <p className="mt-1 text-[11px] text-white/80 drop-shadow flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
                Original audio · ckrcreatives
              </p>
            </div>

            {/* Progress bar for the active reel */}
            <ReelProgress active key={`p-${idx}`} reelIdx={idx} videoEl={videoRefs.current[idx]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* IG bottom tab bar */}
      <div className="relative z-30 bg-black border-t border-white/10 flex items-center justify-around py-2.5 text-white">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1z" /></svg>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" /></svg>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="5" /><polygon points="10 9 16 12 10 15" fill="black" /></svg>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="14" rx="2" /><path d="M8 6V4a4 4 0 0 1 8 0v2" /></svg>
        <div className="w-[26px] h-[26px] rounded-full p-[1.5px] ring-2 ring-white">
          <img src="/images/logo.png" alt="" className="w-full h-full rounded-full object-cover" />
        </div>
      </div>
    </div>
  )
}

/* Thin progress bar that fills with the active reel's playback. */
function ReelProgress({ videoEl }: { active: boolean; reelIdx: number; videoEl: HTMLVideoElement | null }) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (!videoEl) return
    let raf = 0
    const tick = () => {
      if (videoEl.duration) setProgress((videoEl.currentTime / videoEl.duration) * 100)
      raf = window.requestAnimationFrame(tick)
    }
    raf = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(raf)
  }, [videoEl])
  return (
    <div className="absolute left-0 right-0 bottom-0 z-20 h-[2px] bg-white/15">
      <div className="h-full bg-white/85" style={{ width: `${progress}%` }} />
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
