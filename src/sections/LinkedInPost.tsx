/* ─────────────────────────────────────────────────────────────────────
   LinkedInPost — full-screen mock of the CKR Creatives LinkedIn
   company page. The real mobile screenshot fills the phone
   edge-to-edge and is scrollable inside the frame so visitors can
   browse banner, About, and the pinned post. Tapping anywhere opens
   the live company page in a new tab.
   ───────────────────────────────────────────────────────────────────── */

const LINKEDIN_URL = 'https://www.linkedin.com/company/ckrcreatives/'

export default function LinkedInPost() {
  return (
    <a
      href={LINKEDIN_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open CKR Creatives on LinkedIn"
      className="relative block w-full bg-white"
    >
      <img
        src="/images/linkedin-profile.jpg"
        alt="CKR Creatives on LinkedIn"
        className="block w-full h-auto select-none"
        draggable={false}
      />
    </a>
  )
}

export { LINKEDIN_URL }
