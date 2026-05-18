import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function SiteLoader() {
  const [isVisible, setIsVisible] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const dismiss = () => setIsVisible(false)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.play().catch(() => {})
    }
    const fallback = window.setTimeout(dismiss, 8500)
    return () => window.clearTimeout(fallback)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          aria-label="CKR Creatives loading"
          role="status"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
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
          <span className="sr-only">Loading CKR Creatives</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
