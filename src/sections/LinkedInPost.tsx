/* ─────────────────────────────────────────────────────────────────────
   LinkedInPost — renders the real CKR Creatives LinkedIn company page
   screenshot inside the phone frame on the homepage social-trio. The
   mock UI we used to ship here has been replaced with the live
   screenshot so the profile, employee count, and pinned post visible
   to visitors are the actual ones from linkedin.com.
   ───────────────────────────────────────────────────────────────────── */

const LINKEDIN_URL = 'https://www.linkedin.com/company/ckrcreatives/'

export default function LinkedInPost() {
  return (
    <div className="w-full h-full bg-white overflow-hidden flex flex-col">
      <a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex-1 block"
        aria-label="Open CKR Creatives on LinkedIn"
      >
        <img
          src="/images/linkedin-profile.jpg"
          alt="CKR Creatives on LinkedIn"
          className="w-full h-full object-cover object-top select-none"
          draggable={false}
        />
        {/* Subtle gradient + CTA pill so the screenshot reads as a live profile */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
          style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.85) 100%)' }}
        />
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-[#0a66c2] text-white px-3 py-1.5 text-[11px] font-semibold tracking-wide shadow-lg">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          Open profile
        </span>
      </a>
    </div>
  )
}

export { LINKEDIN_URL }
