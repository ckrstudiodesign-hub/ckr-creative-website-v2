import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function SiteLoader() {
  const [isVisible, setIsVisible] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const dismiss = () => setIsVisible(false)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.playbackRate = 1.6
      video.play().catch(() => {})
    }
    // Shorter fallback since the video plays faster
    const fallback = window.setTimeout(dismiss, 5500)
    return () => window.clearTimeout(fallback)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
          aria-label="CKR Creatives loading"
          role="status"
        >
          {/* Cinematic letterbox bars */}
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

          {/* Subtle radial glow behind the signature */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.4, 0.2], scale: [0.5, 1.2, 1.5] }}
            transition={{ duration: 3, ease: 'easeOut', delay: 0.5 }}
            className="absolute z-0"
            style={{
              width: '600px',
              height: '400px',
              background: 'radial-gradient(ellipse at center, rgba(205,164,94,0.15) 0%, rgba(205,164,94,0.05) 40%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          {/* Cinematic zoom-out container for the signature video */}
          <motion.div
            initial={{ opacity: 0, scale: 1.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              opacity: { duration: 0.4, ease: 'easeOut' },
              scale: { duration: 3.5, ease: [0.16, 1, 0.3, 1] },
            }}
            className="relative z-10 h-[149px] w-[300px] max-w-[72vw] overflow-hidden rounded-2xl md:h-[249px] md:w-[460px]"
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

          {/* Bottom tagline that fades in after signature begins */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 1.4 }}
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
