import { Link } from 'react-router-dom'
import { SEO } from '../components/SEO'
import { SITE_ORIGIN, buildBreadcrumbs } from '../components/seo-utils'
import { PageHero } from '../components/PageHero'

/* ─────────────────────────────────────────────────────────────────────
   Privacy Policy — content authored by CKR Creatives, June 8 2026.
   Structured for readability: each numbered section is its own block,
   with sub-headings and bullet lists. Kept legally faithful to the
   source copy provided by the client.
   ───────────────────────────────────────────────────────────────────── */

type Section = {
  id: string
  title: string
  body: React.ReactNode
}

const sections: Section[] = [
  {
    id: 'introduction',
    title: '1. Introduction',
    body: (
      <>
        <p>
          Welcome to <strong>CKR Creatives</strong> ("CKR Creatives," "we," "our," or "us"), a Dubai-based
          Creative Technology Agency providing innovative digital solutions, including Web Development,
          AI Automation, Cybersecurity Services, SEO, AEO &amp; GEO Optimization, Digital Marketing,
          Branding, Content Creation, Photography &amp; Videography, Social Media Management, Business
          Consulting, and Technology Solutions.
        </p>
        <p>
          We are committed to protecting the privacy, confidentiality, and security of personal and
          business information entrusted to us. This Privacy Policy explains how we collect, use,
          process, disclose, store, and safeguard information when you visit our website, engage with
          our services, communicate with us, or otherwise interact with CKR Creatives.
        </p>
        <p>
          This Privacy Policy has been designed to align with applicable privacy and data protection
          laws, including the United Arab Emirates Federal Decree-Law No. 45 of 2021 on the Protection
          of Personal Data (PDPL), the General Data Protection Regulation (GDPR), and internationally
          recognized privacy and cybersecurity best practices.
        </p>
        <p>
          By accessing our website or using our services, you acknowledge that you have read and
          understood this Privacy Policy.
        </p>
      </>
    ),
  },
  {
    id: 'information-collected',
    title: '2. Information We Collect',
    body: (
      <>
        <h3 className="zalando-h4-28 mt-6 mb-2">A. Personal Information</h3>
        <p>We may collect personal information that you voluntarily provide, including:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Full name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Company name</li>
          <li>Job title</li>
          <li>Billing and payment information</li>
          <li>Communication preferences</li>
          <li>Information submitted through contact forms</li>
        </ul>
        <h3 className="zalando-h4-28 mt-6 mb-2">B. Business Information</h3>
        <p>As part of our professional services, we may collect and process:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Business contact information</li>
          <li>Project requirements</li>
          <li>Website and application data</li>
          <li>Marketing materials</li>
          <li>Brand assets</li>
          <li>Business performance metrics</li>
          <li>Technical infrastructure information</li>
          <li>Security-related information necessary for cybersecurity assessments</li>
        </ul>
        <h3 className="zalando-h4-28 mt-6 mb-2">C. Website Usage Data</h3>
        <p>When you visit our website, we may automatically collect:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>IP address</li>
          <li>Browser type and version</li>
          <li>Device information</li>
          <li>Operating system</li>
          <li>Referral source</li>
          <li>Website pages visited</li>
          <li>Time spent on pages</li>
          <li>Date and time of visits</li>
          <li>Clickstream and interaction data</li>
        </ul>
        <h3 className="zalando-h4-28 mt-6 mb-2">D. Cookies and Tracking Technologies</h3>
        <p>We may use:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Cookies</li>
          <li>Analytics tools</li>
          <li>Tracking pixels</li>
          <li>Session technologies</li>
          <li>Marketing and advertising technologies</li>
        </ul>
        <p className="mt-3">
          These technologies help us improve website performance, user experience, marketing
          effectiveness, and service delivery.
        </p>
      </>
    ),
  },
  {
    id: 'how-we-use',
    title: '3. How We Use Information',
    body: (
      <>
        <p>We use collected information to:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Provide requested services</li>
          <li>Manage client projects</li>
          <li>Deliver web development and technology solutions</li>
          <li>Conduct cybersecurity assessments</li>
          <li>Improve website performance</li>
          <li>Respond to inquiries and support requests</li>
          <li>Process payments and invoices</li>
          <li>Maintain business relationships</li>
          <li>Provide updates regarding services</li>
          <li>Personalize user experiences</li>
          <li>Conduct research and analytics</li>
          <li>Comply with legal obligations</li>
          <li>Detect and prevent fraud, abuse, and security threats</li>
          <li>Protect our rights and interests</li>
        </ul>
        <p className="mt-3">
          We process information only when we have a legitimate business purpose and legal basis for
          doing so.
        </p>
      </>
    ),
  },
  {
    id: 'legal-basis',
    title: '4. Legal Basis for Processing Data',
    body: (
      <>
        <p>
          Where required by applicable law, we process personal information based on one or more of the
          following legal grounds:
        </p>
        <h3 className="zalando-h4-28 mt-6 mb-2">Consent</h3>
        <p>Where you have provided clear permission for us to process your information.</p>
        <h3 className="zalando-h4-28 mt-6 mb-2">Contractual Necessity</h3>
        <p>
          Where processing is necessary to fulfill contractual obligations or provide requested
          services.
        </p>
        <h3 className="zalando-h4-28 mt-6 mb-2">Legitimate Interests</h3>
        <p>Where processing is necessary for our legitimate business interests, including:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Service improvement</li>
          <li>Website optimization</li>
          <li>Cybersecurity protection</li>
          <li>Business development</li>
          <li>Client communication</li>
        </ul>
        <h3 className="zalando-h4-28 mt-6 mb-2">Legal Compliance</h3>
        <p>
          Where processing is required to comply with applicable laws, regulations, governmental
          requests, legal proceedings, or enforcement actions.
        </p>
      </>
    ),
  },
  {
    id: 'data-sharing',
    title: '5. Data Sharing and Third Parties',
    body: (
      <>
        <p><strong>We do not sell personal information.</strong></p>
        <p>
          We may share information with trusted third parties when necessary to operate our business
          and deliver services, including:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Cloud hosting providers</li>
          <li>Website hosting companies</li>
          <li>Analytics providers</li>
          <li>Payment processors</li>
          <li>Marketing platforms</li>
          <li>Email communication providers</li>
          <li>Customer relationship management systems</li>
          <li>Cybersecurity service providers</li>
          <li>Professional advisors and consultants</li>
          <li>Government authorities when legally required</li>
        </ul>
        <p className="mt-3">
          All third-party service providers are expected to maintain appropriate confidentiality,
          security, and privacy safeguards.
        </p>
        <p>We may also disclose information if necessary to:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Protect our legal rights</li>
          <li>Enforce agreements</li>
          <li>Investigate security incidents</li>
          <li>Prevent fraud or illegal activities</li>
          <li>Comply with legal obligations</li>
        </ul>
      </>
    ),
  },
  {
    id: 'security',
    title: '6. Data Storage and Security Measures',
    body: (
      <>
        <p>
          CKR Creatives takes information security seriously and implements commercially reasonable
          technical, organizational, and administrative safeguards to protect data against
          unauthorized access, disclosure, alteration, or destruction.
        </p>
        <p>Security measures may include:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Secure hosting environments</li>
          <li>SSL/TLS encryption</li>
          <li>Access controls</li>
          <li>Multi-factor authentication</li>
          <li>Security monitoring</li>
          <li>Firewalls</li>
          <li>Malware protection</li>
          <li>Data backup systems</li>
          <li>Security audits</li>
          <li>Employee confidentiality obligations</li>
          <li>Restricted access policies</li>
        </ul>
        <p className="mt-3">
          While we strive to protect information using industry-standard security practices, no method
          of electronic transmission or storage can be guaranteed to be completely secure.
        </p>
        <p>Accordingly, we cannot guarantee absolute security.</p>
      </>
    ),
  },
  {
    id: 'cybersecurity',
    title: '7. Cybersecurity and Data Protection Commitment',
    body: (
      <>
        <p>
          As a technology and cybersecurity-focused organization, CKR Creatives is committed to
          maintaining high standards of information security.
        </p>
        <p>Our cybersecurity practices may include:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Security assessments</li>
          <li>Vulnerability identification</li>
          <li>Risk management procedures</li>
          <li>Secure development practices</li>
          <li>Infrastructure protection measures</li>
          <li>Incident response planning</li>
          <li>Access management controls</li>
          <li>Data protection reviews</li>
        </ul>
        <p className="mt-3">
          We continuously evaluate and improve our security practices to address evolving threats and
          maintain client trust.
        </p>
      </>
    ),
  },
  {
    id: 'transfers',
    title: '8. International Data Transfers',
    body: (
      <>
        <p>
          Due to the global nature of technology services, information may be processed, stored, or
          transferred to jurisdictions outside the United Arab Emirates.
        </p>
        <p>
          When international transfers occur, we implement appropriate safeguards designed to protect
          personal information and ensure compliance with applicable privacy laws.
        </p>
        <p>These safeguards may include:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Contractual protections</li>
          <li>Security controls</li>
          <li>Data processing agreements</li>
          <li>Compliance assessments</li>
          <li>Industry-standard transfer mechanisms</li>
        </ul>
        <p className="mt-3">
          By using our services, you acknowledge that data may be transferred and processed
          internationally where necessary for service delivery.
        </p>
      </>
    ),
  },
  {
    id: 'rights',
    title: '9. User Rights',
    body: (
      <>
        <p>
          Subject to applicable laws, individuals may have the following rights regarding their
          personal information.
        </p>
        <h3 className="zalando-h4-28 mt-6 mb-2">Right of Access</h3>
        <p>You may request access to personal information we hold about you.</p>
        <h3 className="zalando-h4-28 mt-6 mb-2">Right to Correction</h3>
        <p>You may request correction of inaccurate or incomplete information.</p>
        <h3 className="zalando-h4-28 mt-6 mb-2">Right to Deletion</h3>
        <p>You may request deletion of personal information where legally permissible.</p>
        <h3 className="zalando-h4-28 mt-6 mb-2">Right to Restriction</h3>
        <p>You may request restriction of certain processing activities.</p>
        <h3 className="zalando-h4-28 mt-6 mb-2">Right to Data Portability</h3>
        <p>
          Where applicable, you may request a copy of your personal information in a structured and
          commonly used format.
        </p>
        <h3 className="zalando-h4-28 mt-6 mb-2">Right to Object</h3>
        <p>You may object to certain processing activities based on legitimate interests.</p>
        <h3 className="zalando-h4-28 mt-6 mb-2">Right to Withdraw Consent</h3>
        <p>Where processing is based on consent, you may withdraw consent at any time.</p>
        <p className="mt-3">
          To exercise your rights, please contact us using the details provided in this Privacy
          Policy. We may verify your identity before processing requests.
        </p>
      </>
    ),
  },
  {
    id: 'cookies',
    title: '10. Cookies Policy',
    body: (
      <>
        <p>
          Our website uses cookies and related technologies to improve functionality, security,
          analytics, and user experience.
        </p>
        <p>Cookies may be categorized as:</p>
        <h3 className="zalando-h4-28 mt-6 mb-2">Essential Cookies</h3>
        <p>Required for website operation and security.</p>
        <h3 className="zalando-h4-28 mt-6 mb-2">Performance Cookies</h3>
        <p>Help us understand website usage and improve functionality.</p>
        <h3 className="zalando-h4-28 mt-6 mb-2">Analytics Cookies</h3>
        <p>Provide insights regarding visitor behavior and website performance.</p>
        <h3 className="zalando-h4-28 mt-6 mb-2">Marketing Cookies</h3>
        <p>Assist with advertising effectiveness and audience engagement.</p>
        <p className="mt-3">
          Users may control cookies through browser settings. Disabling certain cookies may affect
          website functionality.
        </p>
      </>
    ),
  },
  {
    id: 'third-party',
    title: '11. Third-Party Links and Services',
    body: (
      <>
        <p>Our website may contain links to third-party websites, platforms, applications, or services.</p>
        <p>
          We do not control third-party privacy practices and are not responsible for the content,
          security, or policies of external websites.
        </p>
        <p>Users are encouraged to review the privacy policies of any third-party services they access.</p>
      </>
    ),
  },
  {
    id: 'children',
    title: "12. Children's Privacy",
    body: (
      <>
        <p>
          Our services are intended for businesses, organizations, professionals, and individuals over
          the age of 18.
        </p>
        <p>We do not knowingly collect personal information from children.</p>
        <p>
          If we become aware that personal information from a child has been collected without
          appropriate authorization, we will take reasonable steps to delete such information.
        </p>
        <p>
          Parents or guardians who believe a child has provided personal information should contact us
          immediately.
        </p>
      </>
    ),
  },
  {
    id: 'retention',
    title: '13. Data Retention Policy',
    body: (
      <>
        <p>We retain personal and business information only for as long as necessary to:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Deliver services</li>
          <li>Maintain business records</li>
          <li>Fulfill contractual obligations</li>
          <li>Resolve disputes</li>
          <li>Enforce agreements</li>
          <li>Comply with legal requirements</li>
        </ul>
        <p className="mt-3">Retention periods may vary depending on:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Service type</li>
          <li>Legal obligations</li>
          <li>Regulatory requirements</li>
          <li>Security considerations</li>
          <li>Business needs</li>
        </ul>
        <p className="mt-3">
          When information is no longer required, it will be securely deleted, anonymized, or
          destroyed.
        </p>
      </>
    ),
  },
  {
    id: 'marketing',
    title: '14. Marketing Communications',
    body: (
      <>
        <p>
          We may send marketing communications regarding services, updates, promotions, insights, and
          industry information where permitted by law.
        </p>
        <p>You may opt out of marketing communications at any time by:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Following unsubscribe instructions</li>
          <li>Contacting us directly</li>
          <li>Updating communication preferences</li>
        </ul>
        <p className="mt-3">
          Opting out of marketing communications does not affect transactional or service-related
          communications.
        </p>
      </>
    ),
  },
  {
    id: 'changes',
    title: '15. Changes to This Privacy Policy',
    body: (
      <>
        <p>We may update this Privacy Policy periodically to reflect:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Legal requirements</li>
          <li>Regulatory changes</li>
          <li>Technology developments</li>
          <li>Service enhancements</li>
          <li>Business operations</li>
        </ul>
        <p className="mt-3">
          Any revisions will be posted on our website with an updated Effective Date.
        </p>
        <p>
          Continued use of our website or services after changes become effective constitutes
          acceptance of the revised Privacy Policy.
        </p>
      </>
    ),
  },
  {
    id: 'contact',
    title: '16. Contact Information',
    body: (
      <>
        <p>
          For questions, requests, concerns, or privacy-related inquiries, please contact:
        </p>
        <div className="mt-3 rounded-2xl border border-brand-off-gray/70 bg-brand-light-white p-5">
          <p className="font-semibold text-brand-black">CKR Creatives</p>
          <p>Dubai, United Arab Emirates</p>
          <p className="mt-2">
            <span className="font-semibold">Website:</span>{' '}
            <a className="text-brand-orange underline" href="https://www.ckrcreatives.com/" target="_blank" rel="noopener noreferrer">
              https://www.ckrcreatives.com/
            </a>
          </p>
          <p>
            <span className="font-semibold">Email:</span>{' '}
            <a className="text-brand-orange underline" href="mailto:ckrstudiodesign@gmail.com">
              ckrstudiodesign@gmail.com
            </a>
          </p>
        </div>
        <p className="mt-4">
          We are committed to addressing privacy concerns promptly and in accordance with applicable
          data protection laws.
        </p>
      </>
    ),
  },
]

export default function Privacy() {
  const canonical = `${SITE_ORIGIN}/privacy`
  const ogImage = `${SITE_ORIGIN}/images/fsahkf.png`

  const breadcrumbs = buildBreadcrumbs(SITE_ORIGIN, [
    ['Home', '/'],
    ['Privacy Policy', '/privacy'],
  ])

  return (
    <>
      <SEO
        title="Privacy Policy — CKR Creatives"
        description="How CKR Creatives collects, uses, processes, and safeguards personal and business information. Aligned with UAE PDPL, GDPR, and international privacy best practices."
        canonical={canonical}
        ogImage={ogImage}
        keywords="CKR Creatives privacy policy, Dubai data protection, PDPL, GDPR, privacy practices"
        jsonLd={[breadcrumbs]}
      />

      <PageHero
        eyebrow="Legal"
        heading="Privacy Policy."
        description="How we collect, use, and safeguard the information you entrust to CKR Creatives — aligned with UAE PDPL, GDPR, and international privacy best practices."
        bgImage="/images/fsahkf.png"
        actions={
          <Link
            to="/#contact"
            className="inline-flex items-center justify-center rounded-full bg-brand-white px-6 py-4 dm-p14-semi text-brand-orange uppercase tracking-[0.5px]"
          >
            Contact Privacy Team
          </Link>
        }
      />

      <section className="w-full bg-brand-white px-5 py-12 md:px-10 md:py-16 xl:px-[72px]">
        <div className="mx-auto w-full max-w-[1180px] grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
          {/* Sticky TOC */}
          <aside className="lg:sticky lg:top-24 self-start hidden lg:block">
            <p className="dm-p14-semi uppercase tracking-[0.22em] text-brand-light-black mb-3">
              On this page
            </p>
            <ul className="flex flex-col gap-1.5 text-[13px] leading-relaxed text-brand-light-black">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="hover:text-brand-orange transition-colors">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[11px] uppercase tracking-[0.22em] text-brand-light-black/70">
              Effective: 8 June 2026
            </p>
          </aside>

          {/* Body */}
          <article className="prose-like flex flex-col gap-12 text-brand-black">
            <p className="dm-p18-semi text-brand-light-black">
              <strong>Effective Date:</strong> June 8, 2026
            </p>
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="zalando-h3-44 text-brand-black mb-4">{s.title}</h2>
                <div className="dm-p18-semi text-brand-light-black space-y-3">{s.body}</div>
              </section>
            ))}

            <section id="disclaimer" className="scroll-mt-24 rounded-2xl bg-brand-light-white border border-brand-off-gray/70 p-6">
              <h2 className="zalando-h4-28 text-brand-black mb-3">Disclaimer</h2>
              <p className="dm-p14-semi text-brand-light-black">
                While CKR Creatives implements industry-standard security measures and follows
                recognized cybersecurity best practices, no website, network, system, or method of
                electronic transmission over the Internet is completely secure. Users acknowledge and
                accept this inherent risk when providing information online.
              </p>
              <p className="dm-p14-semi text-brand-light-black mt-3">
                By using our website and services, you consent to the collection, processing, storage,
                and use of information as described in this Privacy Policy.
              </p>
            </section>
          </article>
        </div>
      </section>
    </>
  )
}
