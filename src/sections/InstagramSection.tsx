import { motion, AnimatePresence, type PanInfo } from 'framer-motion'
import { useState, useRef, useCallback, useEffect } from 'react'
import LinkedInPost, { LINKEDIN_URL } from './LinkedInPost'
import TwitterPost, { TWITTER_URL } from './TwitterPost'
import PhoneFrame from '../components/PhoneFrame'

const INSTAGRAM_URL = 'https://www.instagram.com/ckrcreatives/'

/* Reels played in the IG mock — muted, autoplaying, advancing one-by-one in a loop.
   These come from the project's existing /public/videos folder so the IG mock
   showcases real CKR Creatives footage instead of static stills. */
const reelVideos = [
  '/videos/camera.mp4',
  '/videos/catme.mp4',
  '/videos/tape.mp4',
  '/videos/faq2.mp4',
]

/* Fallback poster stills (used only while a reel is loading). */
const postImages = [
  '/images/instagram-post-1.png',
  '/images/instagram-post-2.png',
]

/* ─── Celebrity data ─── */
const celebrities = [
  { username: 'leomessi', displayName: 'Leo Messi', initial: 'LM', color: '#4F8EF7', verified: true },
  { username: 'tomcruise', displayName: 'Tom Cruise', initial: 'TC', color: '#E74C3C', verified: true },
  { username: 'johnnydepp', displayName: 'Johnny Depp', initial: 'JD', color: '#8E44AD', verified: true },
  { username: 'amitabhbachchan', displayName: 'Amitabh Bachchan', initial: 'AB', color: '#F39C12', verified: true },
  { username: 'rajaborealrajinikanth', displayName: 'Rajinikanth', initial: 'RK', color: '#E67E22', verified: true },
]

const celebrityComments = [
  { celeb: celebrities[0], text: 'Incredible work! This is next level 🔥⚽', time: '1h', likes: 2341 },
  { celeb: celebrities[1], text: 'Now THIS is what premium looks like. Mission accomplished 🎬', time: '45m', likes: 1876 },
  { celeb: celebrities[2], text: 'Art in its purest form. Absolutely stunning ✨🏴‍☠️', time: '32m', likes: 3102 },
  { celeb: celebrities[3], text: 'Bahut badhiya! The future of creativity is here 🙏', time: '28m', likes: 4520 },
  { celeb: celebrities[4], text: 'Style. Class. Power. This is superstar level 💥🔥', time: '15m', likes: 5890 },
]

/* ─── Tiny inline SVG icons (matches real IG) ─── */
function HeartIcon({ filled, className = '' }: { filled?: boolean; className?: string }) {
  if (filled) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="#FF3040" width="24" height="24">
        <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-1.816-1.521-4.303-3.752C5.152 14.08 2.5 12.194 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938z" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
      <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-1.816-1.521-4.303-3.752C5.152 14.08 2.5 12.194 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938z" strokeLinejoin="round" />
    </svg>
  )
}

function SmallHeartIcon({ filled }: { filled: boolean }) {
  if (filled) {
    return (
      <svg viewBox="0 0 24 24" fill="#FF3040" width="12" height="12">
        <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-1.816-1.521-4.303-3.752C5.152 14.08 2.5 12.194 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938z" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
      <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-1.816-1.521-4.303-3.752C5.152 14.08 2.5 12.194 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938z" strokeLinejoin="round" />
    </svg>
  )
}

function CommentIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
      <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22z" strokeLinejoin="round" />
    </svg>
  )
}

function ShareIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
      <line x1="22" y1="3" x2="9.218" y2="10.083" />
      <polygon points="22 3 15 22 11 13 2 9" strokeLinejoin="round" />
    </svg>
  )
}

function SaveIcon({ filled, className = '' }: { filled?: boolean; className?: string }) {
  if (filled) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" width="24" height="24">
        <polygon points="20 21 12 13.44 4 21 4 3 20 3" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
      <polygon points="20 21 12 13.44 4 21 4 3 20 3" strokeLinejoin="round" />
    </svg>
  )
}

function VerifiedBadge({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#3897F0">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16l-6.24 6.24a.75.75 0 0 1-1.06 0l-3.12-3.12a.75.75 0 1 1 1.06-1.06l2.59 2.59 5.71-5.71a.75.75 0 1 1 1.06 1.06z" />
    </svg>
  )
}

function MoreIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="6" cy="12" r="1.5" />
      <circle cx="18" cy="12" r="1.5" />
    </svg>
  )
}

function EmojiIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24" className="text-gray-400">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" strokeLinecap="round" />
      <circle cx="9" cy="9.5" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="15" cy="9.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

/* Avatar circle with initials */
function CelebAvatar({ initial, color, size = 28 }: { initial: string; color: string; size?: number }) {
  return (
    <div
      className="rounded-full flex items-center justify-center shrink-0 font-bold text-white"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        fontSize: size * 0.36,
        letterSpacing: '-0.5px',
      }}
    >
      {initial}
    </div>
  )
}

/* ─── Share Modal ─── */
function ShareModal({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState(false)

  const shareOptions = [
    { icon: '💬', label: 'WhatsApp', color: '#25D366' },
    { icon: '✈️', label: 'Telegram', color: '#0088CC' },
    { icon: '🐦', label: 'X / Twitter', color: '#1DA1F2' },
    { icon: '📘', label: 'Facebook', color: '#1877F2' },
    { icon: '🔗', label: 'Copy Link', color: '#666' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="w-full max-w-[420px] bg-white rounded-t-2xl sm:rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
      >
        <div className="flex justify-center py-2">
          <div className="w-9 h-1 rounded-full bg-gray-300" />
        </div>
        <h3 className="text-center text-[15px] font-semibold text-gray-900 pb-3 border-b border-gray-200">Share to...</h3>
        <div className="grid grid-cols-5 gap-2 p-5">
          {shareOptions.map((opt) => (
            <button
              key={opt.label}
              onClick={() => {
                if (opt.label === 'Copy Link') {
                  setCopied(true)
                  setTimeout(() => setCopied(false), 2000)
                }
              }}
              className="flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl" style={{ backgroundColor: `${opt.color}18` }}>
                {opt.icon}
              </div>
              <span className="text-[10px] text-gray-600 font-medium">
                {opt.label === 'Copy Link' && copied ? 'Copied!' : opt.label}
              </span>
            </button>
          ))}
        </div>
        <button onClick={onClose} className="w-full py-3.5 text-[14px] font-semibold text-gray-500 border-t border-gray-200 hover:bg-gray-50 transition-colors">
          Cancel
        </button>
      </motion.div>
    </motion.div>
  )
}

/* ─── The Instagram Post Simulator ─── */
function InstagramPost() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showBigHeart, setShowBigHeart] = useState(false)
  const [likeCount, setLikeCount] = useState(284749)
  const [showComments, setShowComments] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [userComments, setUserComments] = useState<{ text: string; time: string }[]>([])
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set())
  const lastTapRef = useRef(0)
  const commentInputRef = useRef<HTMLInputElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  // Keep only the active reel playing; pause and rewind the rest.
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return
      if (i === currentSlide) {
        v.currentTime = 0
        v.play().catch(() => {})
      } else {
        v.pause()
      }
    })
  }, [currentSlide])

  // When the active reel ends, advance to the next — looping back to 0 at the end.
  const handleReelEnded = useCallback(() => {
    setCurrentSlide((c) => (c + 1) % reelVideos.length)
  }, [])

  const handleLike = useCallback(() => {
    if (!isLiked) {
      setIsLiked(true)
      setLikeCount((c) => c + 1)
      setShowBigHeart(true)
      setTimeout(() => setShowBigHeart(false), 900)
    } else {
      setIsLiked(false)
      setLikeCount((c) => c - 1)
    }
  }, [isLiked])

  const handleDoubleTap = useCallback(() => {
    const now = Date.now()
    if (now - lastTapRef.current < 350) {
      if (!isLiked) {
        setIsLiked(true)
        setLikeCount((c) => c + 1)
      }
      setShowBigHeart(true)
      setTimeout(() => setShowBigHeart(false), 900)
    }
    lastTapRef.current = now
  }, [isLiked])

  const handleDragEnd = (_: never, info: PanInfo) => {
    const threshold = 50
    if (info.offset.x < -threshold) {
      setCurrentSlide((c) => (c + 1) % reelVideos.length)
    } else if (info.offset.x > threshold) {
      setCurrentSlide((c) => (c - 1 + reelVideos.length) % reelVideos.length)
    }
  }

  const handlePostComment = () => {
    if (commentText.trim()) {
      setUserComments((prev) => [...prev, { text: commentText.trim(), time: 'now' }])
      setCommentText('')
    }
  }

  const toggleCommentLike = (idx: number) => {
    setLikedComments((prev) => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  const formatCount = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1).replace(/\.0$/, '')}M`
    if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`
    return n.toString()
  }

  const igFont: React.CSSProperties = {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  }

  return (
    <>
      <div className="w-full bg-white overflow-hidden flex flex-col min-h-full" style={igFont}>
        {/* ─── Instagram app top bar ─── */}
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
              <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-1.816-1.521-4.303-3.752C5.152 14.08 2.5 12.194 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938z" strokeLinejoin="round" />
            </svg>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <line x1="22" y1="3" x2="9.218" y2="10.083" strokeLinecap="round" />
              <polygon points="22 3 15 22 11 13 2 9" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <div className="flex-1">
        {/* ─── Header ─── */}
        <div className="flex items-center justify-between px-3.5 py-2.5">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 no-underline">
            <div
              className="relative w-[34px] h-[34px] rounded-full p-[2px] cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)',
              }}
            >
              <div className="w-full h-full rounded-full bg-white p-[1.5px]">
                <img src="/images/logo.png" alt="CKR Creatives" className="w-full h-full rounded-full object-cover" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-[13px] font-semibold text-gray-900 cursor-pointer hover:opacity-70">ckrcreatives</span>
                <VerifiedBadge />
              </div>
              <span className="text-[11px] text-gray-500 -mt-0.5">Dubai, UAE</span>
            </div>
          </a>
          <button className="p-1 text-gray-900 hover:opacity-60 transition-opacity">
            <MoreIcon />
          </button>
        </div>

        {/* ─── Image Carousel with Drag ─── */}
        <div
          className="relative w-full aspect-square overflow-hidden bg-gray-100 cursor-grab active:cursor-grabbing select-none"
          onClick={handleDoubleTap}
        >
          {/* "REELS" pill + slide counter */}
          <div className="absolute top-3 left-3 z-20 flex items-center gap-1 bg-black/55 backdrop-blur-sm text-white text-[10px] font-semibold tracking-[0.18em] uppercase px-2 py-1 rounded-full">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <polygon points="10 9 16 12 10 15" fill="currentColor" />
            </svg>
            Reels
          </div>
          <div className="absolute top-3 right-3 z-20 bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
            {currentSlide + 1}/{reelVideos.length}
          </div>

          {/* Draggable reel container (videos auto-advance on ended) */}
          <motion.div
            className="flex w-full h-full touch-pan-y"
            animate={{ x: `-${currentSlide * 100}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
          >
            {reelVideos.map((src, i) => (
              <video
                key={src}
                ref={(el) => { videoRefs.current[i] = el }}
                src={src}
                poster={postImages[i % postImages.length]}
                className="w-full h-full object-cover shrink-0 pointer-events-none bg-black"
                muted
                playsInline
                preload="metadata"
                autoPlay={i === 0}
                onEnded={i === currentSlide ? handleReelEnded : undefined}
              />
            ))}
          </motion.div>

          {/* Muted indicator */}
          <div className="absolute bottom-3 right-3 z-20 bg-black/55 backdrop-blur-sm text-white p-1.5 rounded-full pointer-events-none">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.17v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          </div>

          {/* Double-tap heart animation */}
          <AnimatePresence>
            {showBigHeart && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <motion.svg
                  viewBox="0 0 24 24"
                  fill="white"
                  className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 1] }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{ width: 80, height: 80 }}
                >
                  <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-1.816-1.521-4.303-3.752C5.152 14.08 2.5 12.194 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938z" />
                </motion.svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ─── Action Buttons ─── */}
        <div className="px-3.5 pt-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button whileTap={{ scale: 0.75 }} onClick={handleLike} className="p-0.5">
                <HeartIcon filled={isLiked} className={isLiked ? 'text-red-500' : 'text-gray-900'} />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => { setShowComments(true); setTimeout(() => commentInputRef.current?.focus(), 100) }}
                className="p-0.5 text-gray-900"
              >
                <CommentIcon />
              </motion.button>
              <motion.button whileTap={{ scale: 0.85 }} onClick={() => setShowShareModal(true)} className="p-0.5 text-gray-900">
                <ShareIcon />
              </motion.button>
            </div>

            {/* Dot indicators */}
            <div className="flex items-center gap-1">
              {reelVideos.map((_, i) => (
                <motion.div
                  key={i}
                  className="rounded-full cursor-pointer"
                  animate={{
                    width: i === currentSlide ? 6 : 5,
                    height: i === currentSlide ? 6 : 5,
                    backgroundColor: i === currentSlide ? '#3897F0' : '#C7C7CC',
                  }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setCurrentSlide(i)}
                />
              ))}
            </div>

            <motion.button whileTap={{ scale: 0.75 }} onClick={() => setIsSaved(!isSaved)} className="p-0.5 text-gray-900">
              <SaveIcon filled={isSaved} />
            </motion.button>
          </div>

          {/* ─── Like Count with celebrity avatars ─── */}
          <div className="flex items-center gap-1.5 mt-2.5">
            <div className="flex -space-x-1.5">
              {celebrities.slice(0, 3).map((c) => (
                <CelebAvatar key={c.username} initial={c.initial} color={c.color} size={17} />
              ))}
            </div>
            <span className="text-[13px] text-gray-900">
              Liked by <strong className="font-semibold cursor-pointer">{celebrities[0].username}</strong> and{' '}
              <strong className="font-semibold">{formatCount(likeCount)} others</strong>
            </span>
          </div>

          {/* ─── Caption ─── */}
          <div className="mt-2">
            <p className="text-[13px] text-gray-900 leading-[18px]">
              <strong className="font-semibold cursor-pointer">ckrcreatives</strong>{' '}
              Crafting future-ready brands & cinematic digital experiences ✨ From strategy to execution — we build brands that stand out in the modern world. 🚀
            </p>
            <div className="flex flex-wrap gap-x-1 mt-0.5">
              {['#DubaiCreativeAgency', '#Branding', '#WebDesign', '#CKRCreatives'].map((tag) => (
                <span key={tag} className="text-[13px] text-[#00376b] cursor-pointer hover:opacity-70">{tag}</span>
              ))}
            </div>
          </div>

          {/* ─── Celebrity Comments Preview ─── */}
          <button
            onClick={() => setShowComments(true)}
            className="text-[13px] text-gray-500 mt-1.5 cursor-pointer hover:opacity-70"
          >
            View all {celebrityComments.length + userComments.length} comments
          </button>

          {/* Show 2 celebrity comments inline */}
          <div className="mt-1 flex flex-col gap-1.5">
            {celebrityComments.slice(0, 2).map((c, i) => (
              <div key={i} className="flex items-start gap-1">
                <p className="text-[13px] text-gray-900 leading-[18px] flex-1">
                  <strong className="font-semibold cursor-pointer">{c.celeb.username}</strong>{' '}
                  {c.text}
                </p>
              </div>
            ))}
            {userComments.length > 0 && (
              <div className="flex items-start gap-1">
                <p className="text-[13px] text-gray-900 leading-[18px] flex-1">
                  <strong className="font-semibold cursor-pointer">you</strong>{' '}
                  {userComments[userComments.length - 1].text}
                </p>
              </div>
            )}
          </div>

          {/* ─── Timestamp ─── */}
          <p className="text-[10px] text-gray-400 uppercase tracking-wide mt-2">2 hours ago</p>

          {/* ─── Comment Input ─── */}
          <div className="flex items-center gap-3 py-3 border-t border-gray-100 mt-2">
            <EmojiIcon />
            <input
              ref={commentInputRef}
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
              className="flex-1 text-[13px] text-gray-900 placeholder-gray-400 outline-none bg-transparent"
              style={igFont}
            />
            <AnimatePresence>
              {commentText.trim() && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={handlePostComment}
                  className="text-[13px] font-semibold text-[#3897F0] hover:text-[#00376b] transition-colors"
                >
                  Post
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
        </div>

        {/* ─── Instagram bottom tab bar ─── */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 flex items-center justify-around py-2.5 z-30">
          {/* Home */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-gray-900">
            <path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1z" />
          </svg>
          {/* Search */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-900">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
          </svg>
          {/* Reels (play icon) */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-gray-900">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <polygon points="10 9 16 12 10 15" fill="currentColor" />
          </svg>
          {/* Shop / Plus */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-900">
            <rect x="2" y="6" width="20" height="14" rx="2" />
            <path d="M8 6V4a4 4 0 0 1 8 0v2" />
          </svg>
          {/* Profile */}
          <div
            className="w-[26px] h-[26px] rounded-full p-[1.5px] ring-2 ring-gray-900"
            aria-label="Profile"
          >
            <img src="/images/logo.png" alt="" className="w-full h-full rounded-full object-cover" />
          </div>
        </div>
      </div>

      {/* ─── Full Comments Overlay ─── */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowComments(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-full max-w-[420px] bg-white rounded-t-2xl sm:rounded-2xl overflow-hidden max-h-[70vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
              style={igFont}
            >
              {/* Comments header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 shrink-0">
                <div className="w-6" />
                <h3 className="text-[15px] font-semibold text-gray-900">Comments</h3>
                <button onClick={() => setShowComments(false)} className="text-gray-500 hover:text-gray-900 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Comments list */}
              <div className="flex-1 overflow-y-auto px-4 py-3">
                {/* Caption at top */}
                <div className="flex gap-3 mb-5 pb-4 border-b border-gray-100">
                  <div
                    className="w-[34px] h-[34px] rounded-full p-[2px] shrink-0"
                    style={{ background: 'linear-gradient(135deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)' }}
                  >
                    <div className="w-full h-full rounded-full bg-white p-[1.5px]">
                      <img src="/images/logo.png" alt="" className="w-full h-full rounded-full object-cover" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] text-gray-900 leading-[18px]">
                      <strong className="font-semibold">ckrcreatives</strong>{' '}
                      Crafting future-ready brands & cinematic digital experiences ✨ From strategy to execution — we build brands that stand out in the modern world. 🚀
                    </p>
                    <span className="text-[11px] text-gray-400 mt-1 block">2h</span>
                  </div>
                </div>

                {/* Celebrity comments */}
                {celebrityComments.map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex gap-3 mb-4"
                  >
                    <CelebAvatar initial={c.celeb.initial} color={c.celeb.color} size={34} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-gray-900 leading-[18px]">
                        <strong className="font-semibold cursor-pointer">{c.celeb.username}</strong>
                        {c.celeb.verified && (
                          <span className="inline-flex align-middle ml-0.5"><VerifiedBadge size={10} /></span>
                        )}
                        {' '}{c.text}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[11px] text-gray-400">{c.time}</span>
                        <span className="text-[11px] text-gray-400 font-semibold cursor-pointer">
                          {formatCount(c.likes + (likedComments.has(i) ? 1 : 0))} likes
                        </span>
                        <span className="text-[11px] text-gray-400 font-semibold cursor-pointer">Reply</span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleCommentLike(i)}
                      className="mt-1 shrink-0 text-gray-400"
                    >
                      <SmallHeartIcon filled={likedComments.has(i)} />
                    </button>
                  </motion.div>
                ))}

                {/* User comments */}
                {userComments.map((uc, i) => (
                  <motion.div
                    key={`user-${i}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3 mb-4"
                  >
                    <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-brand-orange to-amber-500 flex items-center justify-center shrink-0">
                      <span className="text-white text-[12px] font-bold">Y</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-gray-900 leading-[18px]">
                        <strong className="font-semibold cursor-pointer">you</strong>{' '}
                        {uc.text}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[11px] text-gray-400">{uc.time}</span>
                        <span className="text-[11px] text-gray-400 font-semibold cursor-pointer">0 likes</span>
                        <span className="text-[11px] text-gray-400 font-semibold cursor-pointer">Reply</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Comment input in modal */}
              <div className="flex items-center gap-3 px-4 py-3 border-t border-gray-200 shrink-0 bg-white">
                <EmojiIcon />
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
                  className="flex-1 text-[13px] text-gray-900 placeholder-gray-400 outline-none bg-transparent"
                  style={igFont}
                  autoFocus
                />
                <AnimatePresence>
                  {commentText.trim() && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={handlePostComment}
                      className="text-[13px] font-semibold text-[#3897F0] hover:text-[#00376b] transition-colors"
                    >
                      Post
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Share Modal ─── */}
      <AnimatePresence>
        {showShareModal && <ShareModal onClose={() => setShowShareModal(false)} />}
      </AnimatePresence>
    </>
  )
}

/* ─── The Section Wrapper ─── */
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

        {/* Three-platform simulation grid */}
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

          {/* MIDDLE — Instagram (slightly raised + accent halo) */}
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
                <InstagramPost />
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

          {/* RIGHT — Twitter / X */}
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
