import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/* ─── Mobile detection (runs once on first paint) ─── */
const isMobile = () => {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia('(max-width: 768px)').matches ||
    /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
  )
}

export default function SiteLoader() {
  const [isVisible, setIsVisible] = useState(true)
  const [mobile] = useState<boolean>(() => isMobile())
  const videoRef = useRef<HTMLVideoElement>(null)

  const dismiss = () => setIsVisible(false)

  useEffect(() => {
    // Mobile path: skip the 4MB video — show a quick logo splash and dismiss.
    if (mobile) {
      const t = window.setTimeout(dismiss, 1400)
      return () => window.clearTimeout(t)
    }

    // Desktop path: cinematic signature video.
    const video = videoRef.current
    if (video) {
      video.playbackRate = 1.6
      video.play().catch(() => {})
    }
    const fallback = window.setTimeout(dismiss, 4500)
    return () => window.clearTimeout(fallback)
  }, [mobile])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
          aria-label="CKR Creatives loading"
          role="status"
        >
          {/* Subtle radial glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 0.45, 0.22], scale: [0.6, 1.2, 1.5] }}
            transition={{ duration: mobile ? 1.2 : 3, ease: 'easeOut', delay: 0.2 }}
            className="absolute z-0 pointer-events-none"
            style={{
              width: '600px',
              height: '400px',
              background:
                'radial-gradient(ellipse at center, rgba(205,164,94,0.20) 0%, rgba(205,164,94,0.06) 40%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          {mobile ? (
            /* ───── Mobile splash: tiny, GPU-friendly, no video ───── */
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex flex-col items-center gap-4"
            >
              <motion.img
                src="/images/logo.png"
                alt="CKR Creatives"
                className="h-16 w-16 object-contain"
                draggable={false}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
              <motion.span
                initial={{ opacity: 0, letterSpacing: '0.15em' }}
                animate={{ opacity: 1, letterSpacing: '0.35em' }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
                className="text-[11px] uppercase text-white/70 font-light"
              >
                CKR Creatives
              </motion.span>
              {/* slim progress sweep */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="h-[1.5px] bg-gradient-to-r from-transparent via-amber-300/80 to-transparent"
              />
            </motion.div>
          ) : (
            <>
              {/* Cinematic letterbox bars (desktop only) */}
              <motion.div
                initial={{ height: '0%' }}
                animate={{ height: '8%' }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                className="absolute top-0 left-0 right-0 bg-black z-30"
              />
              <motion.div
                initial={{ height: '0%' }}
                animate={{ height: '8%' }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                className="absolute bottom-0 left-0 right-0 bg-black z-30"
              />

              {/* Cinematic signature video */}
              <motion.div
                initial={{ opacity: 0, scale: 1.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  opacity: { duration: 0.4, ease: 'easeOut' },
                  scale: { duration: 3.5, ease: [0.16, 1, 0.3, 1] },
                }}
                className="relative z-10 h-[249px] w-[460px] max-w-[72vw] overflow-hidden rounded-2xl"
              >
                <video
                  ref={videoRef}
                  className="h-[calc(100%+20px)] w-full object-cover object-top"
                  src="/ckr-signature.mp4"
                  autoPlay
                  muted
                  playsInline
                  preload="auto"
                  onEnded={dismiss}
                />
              </motion.div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 0.5, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 1.2 }}
                className="absolute bottom-[12%] z-20 text-xs tracking-[0.35em] uppercase text-white/40 font-light"
              >
                Dubai Creative Agency
              </motion.p>
            </>
          )}

          <span className="sr-only">Loading CKR Creatives</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
