/* ─────────────────────────────────────────────────────────────────────
   TwitterPost — renders the real @CKRCreatives X profile screenshot
   inside the phone frame on the homepage social-trio. The mock UI we
   used to ship here has been replaced with the live screenshot so the
   profile, follower count, and pinned post visible to visitors are the
   actual ones from x.com/ckrcreatives.
   ───────────────────────────────────────────────────────────────────── */

const TWITTER_URL = 'https://x.com/ckrcreatives'

export default function TwitterPost() {
  return (
    <div className="w-full h-full bg-black overflow-hidden flex flex-col">
      <a
        href={TWITTER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex-1 block"
        aria-label="Open CKR Creatives on X (Twitter)"
      >
        <img
          src="/images/x-profile.jpg"
          alt="CKR Creatives on X (Twitter)"
          className="w-full h-full object-cover object-top select-none"
          draggable={false}
        />
        {/* Subtle gradient + CTA pill so the screenshot reads as a live profile */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
          style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%)' }}
        />
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-white text-black px-3 py-1.5 text-[11px] font-semibold tracking-wide shadow-lg">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Open profile
        </span>
      </a>
    </div>
  )
}

export { TWITTER_URL }
