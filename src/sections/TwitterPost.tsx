import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useCallback } from 'react'

const TWITTER_URL = 'https://x.com/ckrcreatives'

const postImage = '/images/instagram-post-2.png'

const xReplies = [
  { username: 'elonmusk', name: 'Elon Musk', handle: '@elonmusk', initial: 'EM', color: '#000000', verified: true, text: 'Beautifully done. Future of brand systems right here. 🚀', time: '1h', likes: 18400, retweets: 2100 },
  { username: 'naval', name: 'Naval', handle: '@naval', initial: 'N', color: '#5B6770', verified: true, text: 'Taste is the new moat.', time: '45m', likes: 12300, retweets: 1800 },
  { username: 'paulg', name: 'Paul Graham', handle: '@paulg', initial: 'PG', color: '#FF6600', verified: true, text: 'The best design feels inevitable. This does.', time: '20m', likes: 9800, retweets: 1200 },
  { username: 'sahil', name: 'Sahil Bloom', handle: '@SahilBloom', initial: 'SB', color: '#1DA1F2', verified: true, text: 'Saving this thread. Masterclass in brand presentation.', time: '12m', likes: 4200, retweets: 580 },
]

function Avatar({ initial, color, size = 40 }: { initial: string; color: string; size?: number }) {
  return (
    <div
      className="rounded-full flex items-center justify-center shrink-0 font-bold text-white"
      style={{ width: size, height: size, backgroundColor: color, fontSize: size * 0.42 }}
    >
      {initial}
    </div>
  )
}

function XVerified({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="#1d9bf0">
      <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.751-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
    </svg>
  )
}

function ReplyIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z" />
    </svg>
  )
}
function RetweetIcon({ active, size = 18 }: { active?: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={active ? '#00ba7c' : 'currentColor'}>
      <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z" />
    </svg>
  )
}
function HeartIcon({ active, size = 18 }: { active?: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={active ? '#f91880' : 'currentColor'}>
      <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z" />
    </svg>
  )
}
function BookmarkIcon({ active, size = 18 }: { active?: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={active ? '#1d9bf0' : 'currentColor'}>
      <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z" />
    </svg>
  )
}
function ShareIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z" />
    </svg>
  )
}
function MoreIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="2" />
      <circle cx="6" cy="12" r="2" />
      <circle cx="18" cy="12" r="2" />
    </svg>
  )
}

export default function TwitterPost() {
  const [liked, setLiked] = useState(false)
  const [retweeted, setRetweeted] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [following, setFollowing] = useState(false)
  const [likeCount, setLikeCount] = useState(48700)
  const [retweetCount, setRetweetCount] = useState(7820)
  const [showReplies, setShowReplies] = useState(false)
  const [showBigHeart, setShowBigHeart] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [userReplies, setUserReplies] = useState<{ text: string; time: string }[]>([])
  const lastTapRef = useRef(0)
  const replyInputRef = useRef<HTMLInputElement>(null)
  const handleReplyClick = () => {
    setShowReplies(true)
    setTimeout(() => {
      replyInputRef.current?.focus()
    }, 100)
  }

  const handleLike = useCallback(() => {
    setLiked((l) => {
      setLikeCount((c) => c + (l ? -1 : 1))
      if (!l) {
        setShowBigHeart(true)
        setTimeout(() => setShowBigHeart(false), 900)
      }
      return !l
    })
  }, [])

  const handleDoubleTap = useCallback(() => {
    const now = Date.now()
    if (now - lastTapRef.current < 350) {
      if (!liked) {
        setLiked(true)
        setLikeCount((c) => c + 1)
      }
      setShowBigHeart(true)
      setTimeout(() => setShowBigHeart(false), 900)
    }
    lastTapRef.current = now
  }, [liked])

  const handleRetweet = useCallback(() => {
    setRetweeted((r) => {
      setRetweetCount((c) => c + (r ? -1 : 1))
      return !r
    })
  }, [])

  const handlePostReply = () => {
    if (replyText.trim()) {
      setUserReplies((p) => [...p, { text: replyText.trim(), time: 'now' }])
      setReplyText('')
    }
  }

  const formatCount = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1).replace(/\.0$/, '')}M`
    if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`
    return n.toString()
  }

  const xFont: React.CSSProperties = {
    fontFamily: 'TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  }

  return (
    <>
      <div className="w-full bg-white overflow-hidden flex flex-col min-h-full" style={xFont}>
        {/* ─── X app top bar ─── */}
        <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100">
          <div className="flex items-center justify-between px-4 py-2.5">
            <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-gray-200">
              <img src="/images/logo.png" alt="" className="w-full h-full object-cover" />
            </div>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-black">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 3l2.5 4 4-1.5L14 9l4 2-4 2 1.5 3.5L11.5 15 9 19l-2.5-4-4 1.5L4 13l-4-2 4-2L2.5 5.5 6.5 7 9 3z" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex items-center text-[14px] font-bold border-b border-gray-100">
            <span className="flex-1 text-center py-3 text-gray-900 relative">
              For you
              <span className="absolute left-1/2 -translate-x-1/2 bottom-0 h-1 w-12 bg-[#1d9bf0] rounded-full" />
            </span>
            <span className="flex-1 text-center py-3 text-gray-500">Following</span>
          </div>
        </div>

        <div className="flex-1">
        {/* Header */}
        <div className="flex items-start gap-3 px-4 pt-3">
          <a href={TWITTER_URL} target="_blank" rel="noopener noreferrer" className="shrink-0">
            <div className="w-11 h-11 rounded-full overflow-hidden ring-1 ring-gray-100">
              <img src="/images/logo.png" alt="" className="w-full h-full object-cover" />
            </div>
          </a>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-[15px] font-bold text-gray-900 hover:underline cursor-pointer">CKR Creatives</span>
                  <XVerified />
                </div>
                <span className="text-[14px] text-gray-500">@ckrcreatives · 2h</span>
              </div>
              <div className="flex items-center gap-2 -mt-0.5">
                <button
                  onClick={() => setFollowing((f) => !f)}
                  className={`text-[13px] font-bold px-3.5 py-1 rounded-full transition-colors ${
                    following ? 'bg-white text-gray-900 border border-gray-300 hover:border-red-500 hover:text-red-500' : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  {following ? 'Following' : 'Follow'}
                </button>
                <button className="text-gray-500 hover:bg-blue-500/10 hover:text-blue-500 rounded-full p-1.5">
                  <MoreIcon />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tweet text */}
        <div className="px-4 pt-2 pb-3 text-[15px] text-gray-900 leading-[20px]">
          <p>
            Brands today don't compete on logos — they compete on the entire experience. We build that experience end-to-end. 🧵👇
          </p>
          <p className="mt-2 text-[#1d9bf0]">
            #BrandDesign <span className="ml-1">#WebDev</span> <span className="ml-1">#AI</span>{' '}
            <span className="ml-1">#CKRCreatives</span>
          </p>
        </div>

        {/* Image */}
        <div
          className="relative w-full aspect-[4/5] mx-0 overflow-hidden bg-gray-100 select-none"
          onClick={handleDoubleTap}
        >
          <img src={postImage} alt="CKR Creatives tweet" className="w-full h-full object-cover" draggable={false} />
          <AnimatePresence>
            {showBigHeart && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.svg
                  viewBox="0 0 24 24"
                  fill="#f91880"
                  className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.3, 1] }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{ width: 90, height: 90 }}
                >
                  <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91z" />
                </motion.svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Timestamp + views */}
        <div className="px-4 pt-3 text-[14px] text-gray-500 border-b border-gray-100 pb-3">
          2:24 PM · Today · <strong className="text-gray-900">{formatCount(298000)}</strong> Views
        </div>

        {/* Engagement counts */}
        <div className="px-4 py-2.5 flex items-center gap-5 text-[14px] text-gray-500 border-b border-gray-100">
          <span><strong className="text-gray-900">{formatCount(retweetCount)}</strong> Retweets</span>
          <span><strong className="text-gray-900">1.2k</strong> Quotes</span>
          <span><strong className="text-gray-900">{formatCount(likeCount)}</strong> Likes</span>
        </div>

        {/* Action row */}
        <div className="flex items-center justify-around px-2 py-2 border-b border-gray-100 text-gray-500">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handleReplyClick}
            className="p-2 rounded-full transition-colors hover:text-[#1d9bf0] hover:bg-[#1d9bf0]/10 text-gray-500"
          >
            <ReplyIcon />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handleRetweet}
            className={`p-2 rounded-full transition-colors hover:text-[#00ba7c] hover:bg-[#00ba7c]/10 ${
              retweeted ? 'text-[#00ba7c]' : 'text-gray-500'
            }`}
          >
            <RetweetIcon active={retweeted} />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handleLike}
            className={`p-2 rounded-full transition-colors hover:text-[#f91880] hover:bg-[#f91880]/10 ${
              liked ? 'text-[#f91880]' : 'text-gray-500'
            }`}
          >
            <HeartIcon active={liked} />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setBookmarked((b) => !b)}
            className={`p-2 rounded-full transition-colors hover:text-[#1d9bf0] hover:bg-[#1d9bf0]/10 ${
              bookmarked ? 'text-[#1d9bf0]' : 'text-gray-500'
            }`}
          >
            <BookmarkIcon active={bookmarked} />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.85 }}
            className="p-2 rounded-full transition-colors hover:text-[#1d9bf0] hover:bg-[#1d9bf0]/10 text-gray-500"
          >
            <ShareIcon />
          </motion.button>
        </div>

        {/* Inline reply input */}
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 ring-1 ring-gray-100">
            <img src="/images/logo.png" alt="" className="w-full h-full object-cover" />
          </div>
          <input
            ref={replyInputRef}
            type="text"
            placeholder="Tweet your reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handlePostReply()}
            className="flex-1 text-[14px] text-gray-900 placeholder-gray-500 outline-none bg-transparent"
            style={xFont}
          />
          <AnimatePresence>
            {replyText.trim() && (
              <motion.button
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                onClick={handlePostReply}
                className="bg-[#1d9bf0] text-white text-[13px] font-bold px-3.5 py-1 rounded-full hover:bg-[#1a8cd8]"
              >
                Reply
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        </div>

        {/* ─── X bottom tab bar ─── */}
        <div className="sticky bottom-0 z-30 bg-white border-t border-gray-200 flex items-center justify-around py-2.5">
          {[
            { label: 'Home', active: true, icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.591 7.146L12.52.92a1 1 0 0 0-1.04 0L2.41 7.146a1 1 0 0 0-.41.806V21.5a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v7a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5V7.952a1 1 0 0 0-.41-.806z" />
              </svg>
            ) },
            { label: 'Search', icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
              </svg>
            ) },
            { label: 'Grok', icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M5 4l14 16M19 4L5 20" strokeLinecap="round" />
              </svg>
            ) },
            { label: 'Notifs', icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" strokeLinejoin="round" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" />
              </svg>
            ) },
            { label: 'DMs', icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="4" width="18" height="14" rx="2" />
                <polyline points="3 7 12 13 21 7" strokeLinejoin="round" />
              </svg>
            ) },
          ].map((t) => (
            <button key={t.label} className={t.active ? 'text-black' : 'text-gray-500'}>
              {t.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Replies overlay */}
      <AnimatePresence>
        {showReplies && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowReplies(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-full max-w-[440px] bg-white rounded-t-2xl sm:rounded-2xl overflow-hidden max-h-[70vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
              style={xFont}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 shrink-0">
                <h3 className="text-[17px] font-bold text-gray-900">Replies</h3>
                <button onClick={() => setShowReplies(false)} className="text-gray-500 hover:text-gray-900 rounded-full p-1.5 hover:bg-gray-100">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                {xReplies.map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex gap-3 px-4 py-3 border-b border-gray-100 hover:bg-gray-50/60"
                  >
                    <Avatar initial={r.initial} color={r.color} size={40} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 text-[14px]">
                        <strong className="font-bold text-gray-900 hover:underline cursor-pointer">{r.name}</strong>
                        {r.verified && <XVerified size={13} />}
                        <span className="text-gray-500">{r.handle} · {r.time}</span>
                      </div>
                      <p className="text-[14px] text-gray-900 leading-[20px] mt-0.5">{r.text}</p>
                      <div className="flex items-center justify-between mt-2 max-w-[280px] text-[13px] text-gray-500">
                        <span className="flex items-center gap-1.5 hover:text-[#1d9bf0]"><ReplyIcon size={14} /> 142</span>
                        <span className="flex items-center gap-1.5 hover:text-[#00ba7c]"><RetweetIcon size={14} /> {formatCount(r.retweets)}</span>
                        <span className="flex items-center gap-1.5 hover:text-[#f91880]"><HeartIcon size={14} /> {formatCount(r.likes)}</span>
                        <span className="flex items-center gap-1.5 hover:text-[#1d9bf0]"><ShareIcon size={14} /></span>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {userReplies.map((ur, i) => (
                  <motion.div key={`u-${i}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3 px-4 py-3 border-b border-gray-100">
                    <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 ring-1 ring-gray-100">
                      <img src="/images/logo.png" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 text-[14px]">
                        <strong className="font-bold text-gray-900">You</strong>
                        <span className="text-gray-500">@you · {ur.time}</span>
                      </div>
                      <p className="text-[14px] text-gray-900 leading-[20px] mt-0.5">{ur.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center gap-3 px-4 py-3 border-t border-gray-200 shrink-0 bg-white">
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 ring-1 ring-gray-100">
                  <img src="/images/logo.png" alt="" className="w-full h-full object-cover" />
                </div>
                <input
                  type="text"
                  placeholder="Tweet your reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handlePostReply()}
                  className="flex-1 text-[14px] text-gray-900 placeholder-gray-500 outline-none bg-transparent"
                  style={xFont}
                  autoFocus
                />
                <AnimatePresence>
                  {replyText.trim() && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      onClick={handlePostReply}
                      className="bg-[#1d9bf0] text-white text-[13px] font-bold px-3.5 py-1 rounded-full"
                    >
                      Reply
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export { TWITTER_URL }
