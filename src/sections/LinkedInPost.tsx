import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useCallback } from 'react'

const LINKEDIN_URL = 'https://www.linkedin.com/company/ckrcreatives/'

const postImage = '/images/instagram-post-1.png'

const liReactions = [
  { username: 'sundarpichai', name: 'Sundar Pichai', role: 'CEO at Google', initial: 'SP', color: '#4285F4', emoji: '👍' },
  { username: 'sherylsandberg', name: 'Sheryl Sandberg', role: 'Founder, LeanIn.Org', initial: 'SS', color: '#1F8AED', emoji: '❤️' },
  { username: 'satyanadella', name: 'Satya Nadella', role: 'Chairman & CEO, Microsoft', initial: 'SN', color: '#00A4EF', emoji: '🎉' },
  { username: 'rezahedayat', name: 'Reza Hedayat', role: 'Head of Brand · Adobe', initial: 'RH', color: '#FA0F00', emoji: '💡' },
  { username: 'jeffweiner', name: 'Jeff Weiner', role: 'Exec Chairman, LinkedIn', initial: 'JW', color: '#0077B5', emoji: '👏' },
]

const liComments = [
  { ...liReactions[0], text: 'Brilliant execution. This is exactly the kind of forward-thinking work we look for.', time: '2h', likes: 482 },
  { ...liReactions[1], text: 'Truly inspiring — the strategy behind this is just as impressive as the visuals.', time: '1h', likes: 318 },
  { ...liReactions[3], text: 'Bookmarking this. Studio-grade branding done right.', time: '38m', likes: 174 },
]

/* Avatar */
function Avatar({ initial, color, size = 48 }: { initial: string; color: string; size?: number }) {
  return (
    <div
      className="rounded-full flex items-center justify-center shrink-0 font-semibold text-white"
      style={{ width: size, height: size, backgroundColor: color, fontSize: size * 0.36 }}
    >
      {initial}
    </div>
  )
}

/* LinkedIn icons */
function ThumbIcon({ filled, size = 20 }: { filled?: boolean; size?: number }) {
  return filled ? (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#0a66c2">
      <path d="M19 9h-5V4a3 3 0 0 0-3-3l-4 9H4v11h11l5-1v-9a2 2 0 0 0-1-2zM2 21h2v-9H2z" />
    </svg>
  ) : (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
      <path d="M19 9h-5V4a3 3 0 0 0-3-3l-4 9H4v11h11l5-1v-9a2 2 0 0 0-1-2z" />
      <path d="M2 12h2v9H2z" />
    </svg>
  )
}
function CommentIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
    </svg>
  )
}
function RepostIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  )
}
function SendIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
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

export default function LinkedInPost() {
  const [reacted, setReacted] = useState(false)
  const [reactionCount, setReactionCount] = useState(1247)
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [userComments, setUserComments] = useState<{ text: string; time: string }[]>([])
  const [followed, setFollowed] = useState(false)
  const commentInputRef = useRef<HTMLInputElement>(null)

  const handleCommentClick = () => {
    setShowComments(true)
    setTimeout(() => {
      commentInputRef.current?.focus()
    }, 100)
  }

  const handleReact = useCallback(() => {
    setReacted((r) => {
      setReactionCount((c) => c + (r ? -1 : 1))
      return !r
    })
  }, [])

  const handlePostComment = () => {
    if (commentText.trim()) {
      setUserComments((p) => [...p, { text: commentText.trim(), time: 'now' }])
      setCommentText('')
    }
  }

  const formatCount = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k` : n.toString())



  const liFont: React.CSSProperties = {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  }

  return (
    <>
      <div className="w-full bg-white overflow-hidden flex flex-col min-h-full" style={liFont}>
        {/* ─── LinkedIn app top bar ─── */}
        <div className="sticky top-0 z-30 flex items-center gap-2 px-3 py-2 border-b border-gray-200 bg-white">
          <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-gray-200">
            <img src="/images/logo.png" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 flex items-center gap-2 rounded bg-[#edf3f8] px-2.5 py-1.5">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
            </svg>
            <span className="text-[13px] text-gray-500">Search</span>
          </div>
          <button className="p-1 text-gray-700">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="4" width="18" height="14" rx="2" />
              <polyline points="3 7 12 13 21 7" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Feed tabs */}
        <div className="flex items-center gap-5 px-4 py-2 border-b border-gray-100 text-[13px] font-semibold">
          <span className="text-gray-900 relative pb-2">
            For you
            <span className="absolute inset-x-0 -bottom-[2px] h-[2px] bg-[#0a66c2] rounded-full" />
          </span>
          <span className="text-gray-500">Following</span>
        </div>

        <div className="flex-1">
        {/* Header */}
        <div className="flex items-start justify-between px-4 pt-3 pb-2">
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 no-underline">
            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 ring-1 ring-gray-200">
              <img src="/images/logo.png" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-[14px] font-semibold text-gray-900 hover:text-[#0a66c2] hover:underline">CKR Creatives</span>
                <span className="text-[12px] text-gray-500">· 1st</span>
              </div>
              <span className="text-[12px] text-gray-600">Dubai-based creative & digital agency</span>
              <span className="text-[11px] text-gray-500 flex items-center gap-1">
                2h · <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm0-14a1 1 0 0 0-1 1v5h5a1 1 0 0 0 0-2h-3V7a1 1 0 0 0-1-1z" /></svg>
              </span>
            </div>
          </a>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFollowed((f) => !f)}
              className={`text-[13px] font-semibold px-2 py-1 rounded transition-colors ${
                followed ? 'text-gray-500 hover:bg-gray-100' : 'text-[#0a66c2] hover:bg-[#0a66c2]/10'
              }`}
            >
              {followed ? '✓ Following' : '+ Follow'}
            </button>
            <button className="p-1 text-gray-600 hover:bg-gray-100 rounded-full">
              <MoreIcon />
            </button>
          </div>
        </div>

        {/* Caption */}
        <div className="px-4 pb-3 text-[14px] text-gray-900 leading-[20px]">
          <p>
            Strategy → identity → product → growth. We build the full stack of how modern brands are seen and remembered. 🌐
          </p>
          <p className="mt-2 text-[#0a66c2]">
            #BrandStrategy <span className="ml-1">#DigitalAgency</span> <span className="ml-1">#DubaiBusiness</span>{' '}
            <span className="ml-1">#CKRCreatives</span>
          </p>
        </div>

        {/* Image */}
        <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
          <img src={postImage} alt="CKR Creatives post" className="w-full h-full object-cover" draggable={false} />
        </div>

        {/* Reactions row */}
        <div className="px-4 pt-2.5 pb-1 flex items-center justify-between text-[12px] text-gray-500">
          <div className="flex items-center gap-1">
            <div className="flex -space-x-1">
              {['#0a66c2', '#df704d', '#6dae4f'].map((c, i) => (
                <span
                  key={i}
                  className="grid h-[18px] w-[18px] place-items-center rounded-full ring-2 ring-white text-[10px]"
                  style={{ backgroundColor: c }}
                >
                  {['👍', '❤️', '🎉'][i]}
                </span>
              ))}
            </div>
            <span className="ml-1 hover:text-[#0a66c2] hover:underline cursor-pointer">
              <strong className="font-semibold text-gray-700">{liReactions[0].name.split(' ')[0]}</strong> and {formatCount(reactionCount)} others
            </span>
          </div>
          <button onClick={() => setShowComments(true)} className="hover:text-[#0a66c2] hover:underline">
            {liComments.length + userComments.length} comments · 142 reposts
          </button>
        </div>

        {/* Action buttons */}
        <div className="mx-3 mt-1 flex border-t border-gray-200">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleReact}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-md hover:bg-gray-100 transition-colors text-[13px] font-semibold ${
              reacted ? 'text-[#0a66c2]' : 'text-gray-600'
            }`}
          >
            <ThumbIcon filled={reacted} />
            <span className="hidden sm:inline">{reacted ? 'Liked' : 'Like'}</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleCommentClick}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-md hover:bg-gray-100 transition-colors text-[13px] font-semibold text-gray-600"
          >
            <CommentIcon />
            <span className="hidden sm:inline">Comment</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.96 }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-md hover:bg-gray-100 transition-colors text-[13px] font-semibold text-gray-600"
          >
            <RepostIcon />
            <span className="hidden sm:inline">Repost</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.96 }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-md hover:bg-gray-100 transition-colors text-[13px] font-semibold text-gray-600"
          >
            <SendIcon />
            <span className="hidden sm:inline">Send</span>
          </motion.button>
        </div>

        {/* Inline comment */}
        <div className="flex items-center gap-2.5 px-4 py-3 border-t border-gray-100">
          <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 ring-1 ring-gray-200">
            <img src="/images/logo.png" alt="" className="w-full h-full object-cover" />
          </div>
          <input
            ref={commentInputRef}
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
            className="flex-1 text-[13px] text-gray-900 placeholder-gray-500 outline-none bg-gray-50 rounded-full border border-gray-200 px-3.5 py-2"
            style={liFont}
          />
          <AnimatePresence>
            {commentText.trim() && (
              <motion.button
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                onClick={handlePostComment}
                className="text-[13px] font-semibold text-[#0a66c2] hover:underline"
              >
                Post
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        </div>

        {/* ─── LinkedIn bottom tab bar ─── */}
        <div className="sticky bottom-0 z-30 bg-white border-t border-gray-200 flex items-center justify-around py-2">
          {[
            { label: 'Home', active: true, icon: (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 9v2h-2v7a3 3 0 0 1-3 3h-4v-6h-4v6H6a3 3 0 0 1-3-3v-7H1V9l11-7z" />
              </svg>
            ) },
            { label: 'Network', icon: (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="9" cy="8" r="3" />
                <circle cx="17" cy="10" r="2.5" />
                <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" strokeLinecap="round" />
                <path d="M14 18.5c0-2 1.5-3.5 3-3.5s3 1.5 3 3.5" strokeLinecap="round" />
              </svg>
            ) },
            { label: 'Post', icon: (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <line x1="12" y1="8" x2="12" y2="16" strokeLinecap="round" />
                <line x1="8" y1="12" x2="16" y2="12" strokeLinecap="round" />
              </svg>
            ) },
            { label: 'Notifications', icon: (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" strokeLinejoin="round" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" />
              </svg>
            ) },
            { label: 'Jobs', icon: (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            ) },
          ].map((t) => (
            <button key={t.label} className={`flex flex-col items-center gap-0.5 ${t.active ? 'text-gray-900' : 'text-gray-500'}`}>
              {t.icon}
              <span className="text-[10px] font-medium">{t.label}</span>
              {t.active && <span className="absolute bottom-0 h-[2px] w-6 bg-gray-900 rounded-full" />}
            </button>
          ))}
        </div>
      </div>

      {/* Comments overlay */}
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
              style={liFont}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 shrink-0">
                <h3 className="text-[15px] font-semibold text-gray-900">Comments</h3>
                <button onClick={() => setShowComments(false)} className="text-gray-500 hover:text-gray-900">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-4 py-3">
                {liComments.map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex gap-2.5 mb-4"
                  >
                    <Avatar initial={c.initial} color={c.color} size={38} />
                    <div className="flex-1 min-w-0 bg-gray-50 rounded-lg px-3 py-2">
                      <div className="flex items-center justify-between">
                        <strong className="text-[13px] font-semibold text-gray-900">{c.name}</strong>
                        <span className="text-[11px] text-gray-500">{c.time}</span>
                      </div>
                      <span className="text-[11px] text-gray-500 block -mt-0.5">{c.role}</span>
                      <p className="text-[13px] text-gray-800 leading-[18px] mt-1.5">{c.text}</p>
                      <div className="flex items-center gap-3 mt-2 text-[12px] font-semibold text-gray-500">
                        <button className="hover:text-[#0a66c2]">Like · {c.likes}</button>
                        <button className="hover:text-[#0a66c2]">Reply</button>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {userComments.map((uc, i) => (
                  <motion.div key={`u-${i}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2.5 mb-4">
                    <div className="w-[38px] h-[38px] rounded-full overflow-hidden shrink-0 ring-1 ring-gray-200">
                      <img src="/images/logo.png" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0 bg-gray-50 rounded-lg px-3 py-2">
                      <div className="flex items-center justify-between">
                        <strong className="text-[13px] font-semibold text-gray-900">You</strong>
                        <span className="text-[11px] text-gray-500">{uc.time}</span>
                      </div>
                      <p className="text-[13px] text-gray-800 leading-[18px] mt-1.5">{uc.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-200 shrink-0 bg-white">
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 ring-1 ring-gray-200">
                  <img src="/images/logo.png" alt="" className="w-full h-full object-cover" />
                </div>
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
                  className="flex-1 text-[13px] text-gray-900 placeholder-gray-500 outline-none bg-gray-50 rounded-full border border-gray-200 px-3.5 py-2"
                  style={liFont}
                  autoFocus
                />
                <AnimatePresence>
                  {commentText.trim() && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      onClick={handlePostComment}
                      className="text-[13px] font-semibold text-[#0a66c2]"
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
    </>
  )
}

export { LINKEDIN_URL }
