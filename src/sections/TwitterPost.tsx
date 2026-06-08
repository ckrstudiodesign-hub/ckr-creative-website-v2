/* ─────────────────────────────────────────────────────────────────────
   TwitterPost — full-screen mock of the @CKRCreatives X profile. The
   real mobile screenshot fills the phone edge-to-edge and is
   scrollable inside the frame so visitors can browse the whole
   profile (banner, bio, pinned post). Tapping anywhere opens the
   live profile at x.com/ckrcreatives in a new tab.
   ───────────────────────────────────────────────────────────────────── */

const TWITTER_URL = 'https://x.com/ckrcreatives'

export default function TwitterPost() {
  return (
    <a
      href={TWITTER_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open CKR Creatives on X (Twitter)"
      className="relative block w-full bg-black"
    >
      <img
        src="/images/x-profile.jpg"
        alt="CKR Creatives on X (Twitter)"
        className="block w-full h-auto select-none"
        draggable={false}
      />
    </a>
  )
}

export { TWITTER_URL }
