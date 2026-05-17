import { useState } from 'react'
import SectionShell from '../components/SectionShell'

const WEB3FORMS_ACCESS_KEY = '1e5585e5-f8f8-4d9b-9b0f-b7e1b27cd459'

type SubmitState =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'success' }
  | { kind: 'error'; message: string }

export default function FormSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<SubmitState>({ kind: 'idle' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus({ kind: 'sending' })

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New inquiry from ${name || 'CKR Creatives site'}`,
          from_name: name,
          email,
          message,
          botcheck: '',
        }),
      })

      const data = await res.json()
      if (data?.success) {
        setStatus({ kind: 'success' })
        setName('')
        setEmail('')
        setMessage('')
      } else {
        setStatus({ kind: 'error', message: data?.message ?? 'Something went wrong. Please try again.' })
      }
    } catch (err) {
      setStatus({
        kind: 'error',
        message: err instanceof Error ? err.message : 'Network error. Please try again.',
      })
    }
  }

  const isSending = status.kind === 'sending'

  return (
    <SectionShell
      eyebrow="Contact"
      heading="Tell us about your project"
      description="Brief us in a sentence or a paragraph — whichever feels right. We'll reply within one business day."
    >
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mt-4"
      >
        {/* Honeypot — Web3Forms ignores submissions where this is non-empty */}
        <input type="checkbox" name="botcheck" tabIndex={-1} className="hidden" defaultChecked={false} />

        <label className="flex flex-col gap-2 col-span-1">
          <span className="dm-p14-semi uppercase tracking-wider text-brand-light-black">Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isSending}
            className="bg-brand-off-white rounded-2xl px-5 py-4 dm-p18-semi outline-none focus:ring-2 ring-brand-orange/30 disabled:opacity-60"
          />
        </label>
        <label className="flex flex-col gap-2 col-span-1">
          <span className="dm-p14-semi uppercase tracking-wider text-brand-light-black">Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            disabled={isSending}
            className="bg-brand-off-white rounded-2xl px-5 py-4 dm-p18-semi outline-none focus:ring-2 ring-brand-orange/30 disabled:opacity-60"
          />
        </label>
        <label className="flex flex-col gap-2 col-span-1 md:col-span-2">
          <span className="dm-p14-semi uppercase tracking-wider text-brand-light-black">Project</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={6}
            disabled={isSending}
            className="bg-brand-off-white rounded-2xl px-5 py-4 dm-p18-semi outline-none focus:ring-2 ring-brand-orange/30 resize-none disabled:opacity-60"
          />
        </label>
        <div className="col-span-1 md:col-span-2 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <button
            type="submit"
            disabled={isSending}
            className="rounded-full bg-brand-orange text-brand-white px-8 py-4 dm-p14-semi uppercase tracking-[0.5px] hover:scale-[1.02] transition-transform disabled:opacity-60 disabled:hover:scale-100"
          >
            {isSending ? 'Sending…' : 'Send inquiry'}
          </button>
          <a
            href="https://calendly.com/ckrstudiodesign/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-brand-black/20 px-8 py-4 dm-p14-semi uppercase tracking-[0.5px] hover:border-brand-black transition-colors"
          >
            Or book a 30-min call
          </a>
          {status.kind === 'success' && (
            <span className="dm-p14-semi text-brand-orange">Thanks — we'll be in touch within one business day.</span>
          )}
          {status.kind === 'error' && (
            <span className="dm-p14-semi text-red-600">{status.message}</span>
          )}
        </div>
      </form>
    </SectionShell>
  )
}
