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

/* Mobile uses a smaller, h.264-baseline, CRF-28, 720p-wide cut of the same
   signature video. ~165 KB vs the 4 MB desktop cut — boots smoothly on phones
   without dropping the cinematic intro entirely. */
const SIGNATURE_DESKTOP = '/ckr-signature.mp4'
const SIGNATURE_MOBILE = '/ckr-signature-mobile.mp4'

export default function SiteLoader() {
  const [isVisible, setIsVisible] = useState(true)
  const [mobile] = useState<boolean>(() => isMobile())
  const videoRef = useRef<HTMLVideoElement>(null)

  const dismiss = () => setIsVisible(false)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      // Mobile plays at native rate (the cut is short already, ~5s); desktop
      // keeps the snappier 1.6x rate it had before.
      video.playbackRate = mobile ? 1.0 : 1.6
      video.play().catch(() => {})
    }
    // Hard fallback in case the video never finishes (network failure, etc.)
    const fallback = window.setTimeout(dismiss, mobile ? 5500 : 4500)
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
            transition={{ duration: mobile ? 2.2 : 3, ease: 'easeOut', delay: 0.2 }}
            className="absolute z-0 pointer-events-none"
            style={{
              width: '600px',
              height: '400px',
              background:
                'radial-gradient(ellipse at center, rgba(205,164,94,0.20) 0%, rgba(205,164,94,0.06) 40%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          {/* Cinematic letterbox bars (both mobile and desktop now — they keep
              the intro feeling intentional even on small screens) */}
          <motion.div
            initial={{ height: '0%' }}
            animate={{ height: '8%' }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="absolute top-0 left-0 right-0 bg-black z-30"
          />
          <motion.div
            initial={{ height: '0%' }}
            animate={{ height: '8%' }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="absolute bottom-0 left-0 right-0 bg-black z-30"
          />

          {/* Cinematic zoom-out container for the signature video.
              Sizes down on mobile so the small file fills the frame without
              upscaling. */}
          <motion.div
            initial={{ opacity: 0, scale: 1.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              opacity: { duration: 0.4, ease: 'easeOut' },
              scale: { duration: mobile ? 2.6 : 3.5, ease: [0.16, 1, 0.3, 1] },
            }}
            className="relative z-10 overflow-hidden rounded-2xl h-[170px] w-[300px] max-w-[78vw] md:h-[249px] md:w-[460px]"
          >
            <video
              ref={videoRef}
              className="h-[calc(100%+20px)] w-full object-cover object-top"
              src={mobile ? SIGNATURE_MOBILE : SIGNATURE_DESKTOP}
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
            transition={{ duration: 0.8, ease: 'easeOut', delay: 1.0 }}
            className="absolute bottom-[12%] z-20 text-[10px] md:text-xs tracking-[0.35em] uppercase text-white/40 font-light"
          >
            Dubai Creative Agency
          </motion.p>

          <span className="sr-only">Loading CKR Creatives</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
