import { Link } from 'react-router-dom'
import { SEO } from '../components/SEO'
import { SITE_ORIGIN, buildBreadcrumbs } from '../components/seo-utils'
import { PageHero } from '../components/PageHero'

/* ─────────────────────────────────────────────────────────────────────
   Terms of Use — governs use of the CKR Creatives website and services.
   Aligned in style and tone with the Privacy Policy page. Same sticky
   TOC + numbered-section layout for consistency.
   ───────────────────────────────────────────────────────────────────── */

type Section = {
  id: string
  title: string
  body: React.ReactNode
}

const sections: Section[] = [
  {
    id: 'agreement',
    title: '1. Agreement to Terms',
    body: (
      <>
        <p>
          These Terms of Use ("Terms") constitute a binding agreement between you and{' '}
          <strong>CKR Creatives</strong> ("CKR Creatives," "we," "our," or "us"), a Dubai-based
          Creative Technology Agency.
        </p>
        <p>
          By accessing or using our website (<a className="text-brand-orange underline" href="https://www.ckrcreatives.com/">www.ckrcreatives.com</a>),
          requesting a proposal, engaging us for services, or otherwise interacting with CKR
          Creatives, you confirm that you have read, understood, and agree to be bound by these
          Terms and our <Link to="/privacy" className="text-brand-orange underline">Privacy Policy</Link>.
        </p>
        <p>If you do not agree with any part of these Terms, you must not use our website or services.</p>
      </>
    ),
  },
  {
    id: 'eligibility',
    title: '2. Eligibility',
    body: (
      <>
        <p>To use our website and engage our services, you must:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Be at least 18 years of age, or the age of majority in your jurisdiction;</li>
          <li>Have the legal capacity to enter into a binding contract;</li>
          <li>Be authorized to act on behalf of any organization you represent; and</li>
          <li>Comply with all applicable laws and regulations.</li>
        </ul>
        <p className="mt-3">
          We do not knowingly provide services to individuals or entities prohibited by applicable
          sanctions, embargoes, or export control regulations.
        </p>
      </>
    ),
  },
  {
    id: 'services',
    title: '3. Description of Services',
    body: (
      <>
        <p>CKR Creatives provides creative and technology services that may include:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Web design and development</li>
          <li>Brand identity and visual systems</li>
          <li>Digital marketing and SEO / AEO / GEO optimization</li>
          <li>AI automation and workflow integration</li>
          <li>Cybersecurity assessments and consulting</li>
          <li>Content creation, photography, and videography</li>
          <li>Social media management</li>
          <li>Business and technology consulting</li>
        </ul>
        <p className="mt-3">
          Specific deliverables, timelines, fees, and acceptance criteria for each engagement are
          defined in a separate Statement of Work, Proposal, or contract executed between CKR
          Creatives and the client. Those documents take precedence over these Terms in case of
          conflict, with respect to that specific engagement.
        </p>
      </>
    ),
  },
  {
    id: 'use',
    title: '4. Acceptable Use of Our Website',
    body: (
      <>
        <p>You agree not to use our website or services to:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Violate any applicable law, regulation, or third-party right;</li>
          <li>Infringe or misappropriate intellectual property rights;</li>
          <li>Upload or transmit malware, viruses, or harmful code;</li>
          <li>Attempt to gain unauthorized access to our systems, accounts, or data;</li>
          <li>Interfere with the operation, security, or integrity of our website;</li>
          <li>Scrape, harvest, or otherwise collect data without express written permission;</li>
          <li>Impersonate any person or entity, or misrepresent your affiliation;</li>
          <li>Use our website for any fraudulent, deceptive, or unlawful purpose; or</li>
          <li>Engage in conduct that could damage our reputation or business.</li>
        </ul>
        <p className="mt-3">
          We reserve the right to suspend or terminate access to our website or services for any
          violation of these Terms, with or without notice.
        </p>
      </>
    ),
  },
  {
    id: 'ip',
    title: '5. Intellectual Property',
    body: (
      <>
        <h3 className="zalando-h4-28 mt-6 mb-2">Our Content</h3>
        <p>
          All content on our website — including text, graphics, logos, images, videos, code,
          designs, software, and underlying intellectual property — is owned by or licensed to CKR
          Creatives and is protected by applicable copyright, trademark, and other intellectual
          property laws.
        </p>
        <p>
          You may not reproduce, distribute, modify, create derivative works of, publicly display,
          publicly perform, republish, download, store, or transmit any of the material on our
          website without our prior written consent, except for personal, non-commercial viewing.
        </p>
        <h3 className="zalando-h4-28 mt-6 mb-2">Client Deliverables</h3>
        <p>
          Ownership of project deliverables is governed by the applicable Statement of Work or
          contract. In the absence of a separate written agreement:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Final, paid-for deliverables transfer to the client upon full payment;</li>
          <li>CKR Creatives retains ownership of pre-existing tools, frameworks, libraries, and methodologies; and</li>
          <li>CKR Creatives retains the right to display, reference, and discuss completed work in case studies, portfolios, and marketing materials, unless otherwise agreed in writing.</li>
        </ul>
        <h3 className="zalando-h4-28 mt-6 mb-2">Client-Provided Materials</h3>
        <p>
          You retain ownership of brand assets, content, and information you provide to us. By
          providing such materials, you grant CKR Creatives a non-exclusive, royalty-free license to
          use them solely for the purpose of delivering the agreed services.
        </p>
      </>
    ),
  },
  {
    id: 'fees',
    title: '6. Fees, Invoicing, and Payment',
    body: (
      <>
        <p>
          Service fees, payment schedules, and currency are specified in the applicable Statement of
          Work, Proposal, or contract.
        </p>
        <p>Unless otherwise agreed in writing:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Invoices are payable within fourteen (14) days of issuance;</li>
          <li>Fees are exclusive of applicable taxes, duties, and bank charges, which are the client&apos;s responsibility;</li>
          <li>Late payments may incur reasonable interest charges and suspension of services;</li>
          <li>Initial deposits are non-refundable once work has commenced; and</li>
          <li>Third-party costs (hosting, licenses, stock assets, etc.) are passed through at cost or with a stated handling fee.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'confidentiality',
    title: '7. Confidentiality',
    body: (
      <>
        <p>
          Both CKR Creatives and the client may exchange confidential information during an
          engagement. Each party agrees to:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Use confidential information solely for the purpose of the engagement;</li>
          <li>Maintain reasonable security safeguards to prevent unauthorized disclosure;</li>
          <li>Limit access to personnel with a need to know;</li>
          <li>Comply with applicable confidentiality and data protection laws.</li>
        </ul>
        <p className="mt-3">
          Confidentiality obligations survive termination of any engagement for a period of three
          (3) years, except for trade secrets, which remain protected indefinitely.
        </p>
      </>
    ),
  },
  {
    id: 'thirdparty',
    title: '8. Third-Party Services and Links',
    body: (
      <>
        <p>
          Our website and services may integrate with or link to third-party platforms, tools, or
          websites (e.g., analytics providers, hosting services, social media platforms, payment
          processors).
        </p>
        <p>
          We do not control and are not responsible for the content, terms, privacy practices, or
          availability of third-party services. Your use of those services is governed by their own
          terms and policies, and you assume all associated risks.
        </p>
      </>
    ),
  },
  {
    id: 'security',
    title: '9. Security and Cybersecurity',
    body: (
      <>
        <p>
          CKR Creatives implements commercially reasonable technical and organizational measures to
          protect our website, infrastructure, and client data, as described in our{' '}
          <Link to="/privacy" className="text-brand-orange underline">Privacy Policy</Link>.
        </p>
        <p>
          However, no online system can be guaranteed to be completely secure. You acknowledge that
          using the internet involves inherent risks, and you accept those risks when interacting
          with our website and services.
        </p>
        <p>
          You agree to promptly notify us of any suspected security incident, vulnerability, or
          unauthorized use that you become aware of in connection with our services.
        </p>
      </>
    ),
  },
  {
    id: 'warranties',
    title: '10. Disclaimer of Warranties',
    body: (
      <>
        <p>
          Our website and services are provided on an <strong>"AS IS"</strong> and{' '}
          <strong>"AS AVAILABLE"</strong> basis, without warranties of any kind, whether express,
          implied, statutory, or otherwise, to the maximum extent permitted by applicable law.
        </p>
        <p>
          CKR Creatives does not warrant that:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>The website will be uninterrupted, error-free, or free of harmful components;</li>
          <li>Information on the website is complete, accurate, or current;</li>
          <li>Specific business, financial, traffic, or ranking outcomes will be achieved;</li>
          <li>Services will meet your subjective expectations beyond the agreed deliverables.</li>
        </ul>
        <p className="mt-3">
          You are responsible for verifying the suitability of our services for your specific needs.
        </p>
      </>
    ),
  },
  {
    id: 'liability',
    title: '11. Limitation of Liability',
    body: (
      <>
        <p>
          To the maximum extent permitted by applicable law, CKR Creatives, its directors,
          employees, contractors, and affiliates shall not be liable for any indirect, incidental,
          special, consequential, punitive, or exemplary damages, including but not limited to loss
          of profits, revenue, data, goodwill, or business opportunities, arising out of or in
          connection with your use of our website or services.
        </p>
        <p>
          In any event, CKR Creatives&apos; total aggregate liability for any claim arising under or
          in connection with these Terms or any specific engagement shall not exceed the fees paid
          to CKR Creatives by the client in the three (3) months preceding the event giving rise to
          the claim.
        </p>
      </>
    ),
  },
  {
    id: 'indemnity',
    title: '12. Indemnification',
    body: (
      <>
        <p>
          You agree to indemnify, defend, and hold harmless CKR Creatives and its affiliates from
          any claims, damages, liabilities, costs, and expenses (including reasonable legal fees)
          arising out of or related to:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Your breach of these Terms;</li>
          <li>Your violation of any law or third-party right;</li>
          <li>Content, data, or materials you provide to us;</li>
          <li>Your misuse of our website, services, or deliverables.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'termination',
    title: '13. Suspension and Termination',
    body: (
      <>
        <p>
          We reserve the right to suspend or terminate your access to our website or services at any
          time, with or without notice, for any reason, including but not limited to:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Violation of these Terms or any contract with us;</li>
          <li>Suspected fraudulent, abusive, or unlawful activity;</li>
          <li>Non-payment of fees;</li>
          <li>Risk to security, reputation, or operations.</li>
        </ul>
        <p className="mt-3">
          Termination of services is otherwise governed by the applicable Statement of Work or
          contract. Sections that by their nature survive termination — including intellectual
          property, confidentiality, disclaimers, limitation of liability, indemnification, and
          governing law — shall continue to apply.
        </p>
      </>
    ),
  },
  {
    id: 'law',
    title: '14. Governing Law and Jurisdiction',
    body: (
      <>
        <p>
          These Terms are governed by and construed in accordance with the laws of the{' '}
          <strong>United Arab Emirates</strong> and the applicable laws of the Emirate of Dubai,
          without regard to conflict-of-laws principles.
        </p>
        <p>
          Any dispute, controversy, or claim arising out of or in connection with these Terms or
          our services shall be subject to the exclusive jurisdiction of the competent courts of
          Dubai, United Arab Emirates, unless the parties have agreed in writing to an alternative
          dispute resolution mechanism.
        </p>
      </>
    ),
  },
  {
    id: 'changes',
    title: '15. Changes to These Terms',
    body: (
      <>
        <p>
          We may update these Terms from time to time to reflect changes in our services, legal
          requirements, technology, or business operations.
        </p>
        <p>
          Updated Terms become effective upon posting to our website with a revised Effective Date.
          Continued use of our website or services after changes constitutes acceptance of the
          revised Terms.
        </p>
        <p>
          We encourage you to review these Terms periodically.
        </p>
      </>
    ),
  },
  {
    id: 'contact',
    title: '16. Contact Information',
    body: (
      <>
        <p>For questions, concerns, or notices regarding these Terms, please contact:</p>
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
      </>
    ),
  },
]

export default function Terms() {
  const canonical = `${SITE_ORIGIN}/terms-of-use`
  const ogImage = `${SITE_ORIGIN}/images/fsahkf.png`

  const breadcrumbs = buildBreadcrumbs(SITE_ORIGIN, [
    ['Home', '/'],
    ['Terms of Use', '/terms-of-use'],
  ])

  return (
    <>
      <SEO
        title="Terms of Use — CKR Creatives"
        description="The terms that govern your use of the CKR Creatives website and services — eligibility, intellectual property, fees, liability, and governing law."
        canonical={canonical}
        ogImage={ogImage}
        keywords="CKR Creatives terms of use, Dubai agency contract terms, service terms, website terms"
        jsonLd={[breadcrumbs]}
      />

      <PageHero
        eyebrow="Legal"
        heading="Terms of Use."
        description="The agreement that governs your use of the CKR Creatives website and services — written in clear language and aligned with UAE law."
        bgImage="/images/fsahkf.png"
        actions={
          <Link
            to="/privacy"
            className="inline-flex items-center justify-center rounded-full bg-brand-white px-6 py-4 dm-p14-semi text-brand-orange uppercase tracking-[0.5px]"
          >
            Read Privacy Policy
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
          </article>
        </div>
      </section>
    </>
  )
}
