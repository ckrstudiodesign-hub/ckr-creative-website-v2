import { useState, useRef, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FAQ, answerFor } from './faq'

type Role = 'user' | 'assistant'
type Message = { id: string; role: Role; content: string }

type Service = 'Brand' | 'Web' | 'AI' | 'SEO' | 'Other'

type LeadStep =
  | 'idle' // free Q&A
  | 'service' // ask service
  | 'name' // ask name
  | 'email' // ask email
  | 'phone' // ask phone
  | 'confirm' // review + submit
  | 'submitting'
  | 'done'

const SERVICES: Service[] = ['Brand', 'Web', 'AI', 'SEO', 'Other']

const INITIAL_GREETING: Message = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hi, I'm Nova — the AI concierge for CKR Creatives. Ask me about services, AEO/GEO/LLMO, RAG, pricing, or tap **Start a project** to brief us in under a minute.",
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+()\d\s.-]{6,}$/

// Quick-prompt suggestions shown before the user sends their first message.
const QUICK_PROMPTS = [
  FAQ.find((f) => f.id === 'services')?.question,
  FAQ.find((f) => f.id === 'aeo-vs-seo')?.question,
  FAQ.find((f) => f.id === 'pricing')?.question,
].filter((s): s is string => Boolean(s))

/**
 * Nova — the CKR Creatives floating Q&A bot + lead-capture flow.
 *
 * Free-Q&A mode uses a local keyword-matched FAQ (faq.ts) — no external API,
 * no streaming. The guided lead-capture flow still POSTs to /api/lead so the
 * brief lands in the Google Sheet.
 */
export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([INITIAL_GREETING])
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Guided lead-capture state machine
  const [leadStep, setLeadStep] = useState<LeadStep>('idle')
  const [lead, setLead] = useState<{ service?: Service; name?: string; email?: string; phone?: string }>({})
  // Honeypot — real users never see/touch this. If it has a value at submit
  // time, the server silently drops the request.
  const [honeypot, setHoneypot] = useState('')

  const scrollRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages, isThinking, leadStep])

  const pushMessage = useCallback((role: Role, content: string) => {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role, content }])
  }, [])

  // ---------------------------------------------------------------------------
  // Free Q&A — local FAQ matcher, no API call
  // ---------------------------------------------------------------------------
  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || isThinking) return

      setError(null)
      pushMessage('user', trimmed)
      setInput('')
      setIsThinking(true)

      // Tiny artificial delay so it feels like the bot is "thinking" — keeps
      // the UI from feeling robotic without actually calling an LLM.
      window.setTimeout(() => {
        const { answer } = answerFor(trimmed)
        pushMessage('assistant', answer)
        setIsThinking(false)
      }, 350)
    },
    [isThinking, pushMessage],
  )

  const clear = () => {
    setMessages([{ ...INITIAL_GREETING, content: "Conversation cleared. What's next?" }])
    setError(null)
    setLeadStep('idle')
    setLead({})
    setInput('')
    setHoneypot('')
  }

  // ---------------------------------------------------------------------------
  // Guided lead-capture flow
  // ---------------------------------------------------------------------------
  const startLeadFlow = () => {
    setError(null)
    setLead({})
    pushMessage('user', 'Start a project')
    pushMessage(
      'assistant',
      "Perfect — quick 30-second brief. **Which service are you interested in?**",
    )
    setLeadStep('service')
  }

  const cancelLeadFlow = () => {
    setLeadStep('idle')
    setLead({})
    pushMessage('assistant', 'No problem — happy to keep chatting. Ask me anything from the list above.')
  }

  const pickService = (service: Service) => {
    setLead((l) => ({ ...l, service }))
    pushMessage('user', service)
    pushMessage('assistant', "Great. **What's your name?**")
    setLeadStep('name')
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  const submitLeadField = (rawValue: string) => {
    const value = rawValue.trim()
    if (!value) return

    if (leadStep === 'name') {
      if (value.length < 2) {
        setError('Please enter your full name.')
        return
      }
      setError(null)
      setLead((l) => ({ ...l, name: value }))
      pushMessage('user', value)
      pushMessage('assistant', "Thanks. **What's the best email to reach you?**")
      setInput('')
      setLeadStep('email')
      return
    }

    if (leadStep === 'email') {
      if (!EMAIL_RE.test(value)) {
        setError("That doesn't look like a valid email — please double-check.")
        return
      }
      setError(null)
      setLead((l) => ({ ...l, email: value }))
      pushMessage('user', value)
      pushMessage(
        'assistant',
        "Got it. **Phone or WhatsApp number?** Include the country code (e.g. +971 50 123 4567).",
      )
      setInput('')
      setLeadStep('phone')
      return
    }

    if (leadStep === 'phone') {
      if (!PHONE_RE.test(value)) {
        setError('Please enter a valid phone or WhatsApp number with country code.')
        return
      }
      setError(null)
      setLead((l) => ({ ...l, phone: value }))
      pushMessage('user', value)
      pushMessage(
        'assistant',
        "Quick review before we send — confirm the details below and we'll be in touch within one business day.",
      )
      setInput('')
      setLeadStep('confirm')
      return
    }
  }

  const submitLead = async () => {
    if (!lead.name || !lead.email || !lead.phone || !lead.service) return
    setError(null)
    setLeadStep('submitting')

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...lead, hp: honeypot }),
      })

      const data = (await res.json().catch(() => ({}))) as { success?: boolean; error?: string }

      if (!res.ok || !data?.success) {
        throw new Error(data?.error ?? `Saving failed (${res.status})`)
      }

      pushMessage(
        'assistant',
        `Thanks, **${lead.name}** — your brief is in. We'll reply to ${lead.email} within one business day. Want to fast-track? [Book a 30-min call](https://calendly.com/ckrstudiodesign/30min).`,
      )
      setLeadStep('done')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Saving failed. Please try again.'
      setError(msg)
      setLeadStep('confirm')
    }
  }

  // ---------------------------------------------------------------------------
  // Input handling — Enter in lead steps advances the flow instead of sending
  // a chat message.
  // ---------------------------------------------------------------------------
  const onPrimaryAction = () => {
    if (leadStep === 'name' || leadStep === 'email' || leadStep === 'phone') {
      submitLeadField(input)
    } else {
      sendMessage(input)
    }
  }

  const placeholder =
    leadStep === 'name'
      ? 'Your full name…'
      : leadStep === 'email'
        ? 'name@example.com'
        : leadStep === 'phone'
          ? '+971 50 123 4567'
          : 'Ask Nova anything…'

  const inputDisabled =
    isThinking ||
    leadStep === 'service' ||
    leadStep === 'confirm' ||
    leadStep === 'submitting' ||
    leadStep === 'done'

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className="fixed bottom-24 right-4 z-[60] w-[calc(100vw-2rem)] max-w-[420px] md:bottom-28 md:right-8"
          >
            <div className="relative flex h-[640px] max-h-[80vh] flex-col overflow-hidden rounded-[28px] border border-white/15 bg-brand-black/90 shadow-[0_30px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
              {/* Ambient gradient wash */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-80"
                style={{
                  background:
                    'radial-gradient(120% 60% at 20% 0%, rgba(255,122,26,0.32) 0%, rgba(36,16,6,0) 60%), radial-gradient(80% 50% at 100% 100%, rgba(255,122,26,0.18) 0%, rgba(0,0,0,0) 60%)',
                }}
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

              {/* Header */}
              <header className="relative z-10 flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-3">
                  <span
                    className="relative grid h-9 w-9 place-items-center rounded-full"
                    style={{
                      background:
                        'conic-gradient(from 180deg at 50% 50%, #ff7a1a, #ffb27a, #ff7a1a)',
                    }}
                  >
                    <span className="absolute h-7 w-7 rounded-full bg-brand-black/70" />
                    <span className="relative text-[11px] font-bold tracking-widest text-brand-white">
                      N
                    </span>
                  </span>
                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold text-brand-white">Nova</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-brand-white/55">
                      {leadStep === 'idle'
                        ? 'CKR Creatives AI'
                        : leadStep === 'done'
                          ? 'Brief received'
                          : 'Project brief'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={clear}
                    aria-label="Clear conversation"
                    className="rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-white/65 hover:bg-white/10 hover:text-brand-white"
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close chat"
                    className="rounded-full p-2 text-brand-white/70 hover:bg-white/10 hover:text-brand-white"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
                      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </header>

              {/* Messages */}
              <div
                ref={scrollRef}
                className="relative z-10 flex-1 overflow-y-auto px-4 py-5 space-y-4"
              >
                {messages.map((m) => (
                  <MessageRow key={m.id} message={m} />
                ))}

                {isThinking && <TypingDots />}

                {/* Service picker */}
                {leadStep === 'service' && (
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => pickService(s)}
                        className="rounded-full border border-brand-orange/40 bg-brand-orange/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-white hover:border-brand-orange hover:bg-brand-orange/20"
                      >
                        {s}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={cancelLeadFlow}
                      className="rounded-full border border-white/15 bg-white/[0.05] px-3 py-2 text-[11px] text-brand-white/65 hover:border-white/30"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {/* Confirm / submit step */}
                {leadStep === 'confirm' && (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-sm text-brand-white/90">
                    <div className="mb-3 text-[10px] uppercase tracking-[0.2em] text-brand-white/55">
                      Brief summary
                    </div>
                    <dl className="space-y-1.5">
                      <SummaryRow label="Service" value={lead.service} />
                      <SummaryRow label="Name" value={lead.name} />
                      <SummaryRow label="Email" value={lead.email} />
                      <SummaryRow label="Phone" value={lead.phone} />
                    </dl>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={submitLead}
                        className="rounded-full bg-brand-orange px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-brand-white shadow-[0_10px_30px_rgba(255,122,26,0.45)]"
                      >
                        Send brief
                      </button>
                      <button
                        type="button"
                        onClick={cancelLeadFlow}
                        className="rounded-full border border-white/15 px-4 py-2.5 text-xs text-brand-white/70 hover:border-white/35 hover:text-brand-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {leadStep === 'submitting' && <TypingDots label="Saving your brief…" />}

                {error && (
                  <div className="rounded-2xl border border-red-400/40 bg-red-500/15 px-4 py-3 text-xs text-red-100">
                    {error}
                  </div>
                )}
              </div>

              {/* Quick prompts — only before the user has sent anything */}
              {messages.length === 1 && leadStep === 'idle' && (
                <div className="relative z-10 flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
                  <button
                    type="button"
                    onClick={startLeadFlow}
                    className="rounded-full bg-brand-orange px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-white shadow-[0_8px_22px_rgba(255,122,26,0.45)]"
                  >
                    Start a project
                  </button>
                  {QUICK_PROMPTS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => sendMessage(p)}
                      className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[11px] text-brand-white/80 hover:border-brand-orange hover:text-brand-white"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}

              {/* Start-a-project pill in active free-chat mode */}
              {messages.length > 1 && leadStep === 'idle' && (
                <div className="relative z-10 flex flex-wrap items-center gap-2 border-t border-white/10 px-4 py-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-brand-white/40">
                    Ready to brief us?
                  </span>
                  <button
                    type="button"
                    onClick={startLeadFlow}
                    className="rounded-full bg-brand-orange px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-white"
                  >
                    Start a project →
                  </button>
                </div>
              )}

              {/* Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  onPrimaryAction()
                }}
                className="relative z-10 flex items-end gap-2 border-t border-white/10 bg-black/30 px-3 py-3"
              >
                {/* Honeypot — visually hidden, not focusable, off-screen. Real
                    users never fill it; bots scraping forms usually do. */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      onPrimaryAction()
                    }
                  }}
                  placeholder={placeholder}
                  disabled={inputDisabled}
                  rows={1}
                  inputMode={
                    leadStep === 'email' ? 'email' : leadStep === 'phone' ? 'tel' : 'text'
                  }
                  autoComplete={
                    leadStep === 'name'
                      ? 'name'
                      : leadStep === 'email'
                        ? 'email'
                        : leadStep === 'phone'
                          ? 'tel'
                          : 'off'
                  }
                  className="flex-1 resize-none rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-brand-white placeholder:text-brand-white/40 outline-none focus:border-brand-orange/70 focus:bg-white/[0.07] disabled:opacity-60"
                  style={{ maxHeight: 120 }}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || inputDisabled}
                  aria-label={
                    leadStep === 'idle' || leadStep === 'done' ? 'Send' : 'Next'
                  }
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-orange text-brand-white shadow-[0_10px_30px_rgba(255,122,26,0.5)] disabled:opacity-40 disabled:shadow-none"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
                    <path
                      d="M5 12h14m0 0-5-5m5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating launcher orb */}
      <div className="fixed bottom-5 right-5 z-[59] md:bottom-8 md:right-8">
        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close chat' : 'Open chat with Nova'}
          className="group relative grid h-16 w-16 place-items-center rounded-full"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          animate={{ y: [0, -6, 0] }}
          transition={{ y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
        >
          <span className="absolute inset-0 rounded-full bg-brand-orange/40 blur-xl animate-pulse" />
          <span className="absolute -inset-1 rounded-full bg-gradient-to-br from-brand-orange via-orange-400 to-amber-300 opacity-70 blur-md" />
          <span
            className="relative grid h-14 w-14 place-items-center rounded-full shadow-[0_18px_45px_rgba(255,122,26,0.55)]"
            style={{
              background:
                'conic-gradient(from 180deg at 50% 50%, #ff7a1a, #ffb27a, #ffd9c2, #ff7a1a)',
              backgroundSize: '200% 200%',
            }}
          >
            <span className="absolute inset-[3px] rounded-full bg-brand-black/65 backdrop-blur-md" />
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.svg
                  key="x"
                  viewBox="0 0 24 24"
                  fill="none"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  className="relative h-5 w-5 text-brand-white"
                  aria-hidden
                >
                  <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </motion.svg>
              ) : (
                <motion.svg
                  key="msg"
                  viewBox="0 0 24 24"
                  fill="none"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  className="relative h-5 w-5 text-brand-white"
                  aria-hidden
                >
                  <path
                    d="M21 12a8 8 0 0 1-11.6 7.15L4 20l1-4.4A8 8 0 1 1 21 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              )}
            </AnimatePresence>
          </span>
        </motion.button>
      </div>
    </>
  )
}

function MessageRow({ message }: { message: Message }) {
  const isUser = message.role === 'user'
  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
          isUser
            ? 'bg-brand-orange text-brand-white rounded-br-md'
            : 'bg-white/[0.07] text-brand-white border border-white/10 rounded-bl-md'
        }`}
      >
        <RichText text={message.content} />
      </div>
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/[0.06] pb-1.5">
      <dt className="text-[10px] uppercase tracking-[0.2em] text-brand-white/45">{label}</dt>
      <dd className="text-sm text-brand-white">{value || '—'}</dd>
    </div>
  )
}

/**
 * Lightweight markdown-ish renderer: handles **bold**, *italic*, `inline code`,
 * fenced ```code blocks```, [label](url) links, and preserves line breaks.
 */
function RichText({ text }: { text: string }) {
  if (!text) return null
  const blocks = text.split(/```/)
  return (
    <>
      {blocks.map((block, i) => {
        if (i % 2 === 1) {
          return (
            <pre
              key={i}
              className="my-2 overflow-x-auto rounded-xl bg-black/55 px-3 py-2 text-[12px] leading-relaxed text-brand-white/90"
            >
              <code>{block.replace(/^\w+\n/, '')}</code>
            </pre>
          )
        }
        return (
          <span key={i} className="whitespace-pre-wrap">
            {formatInline(block)}
          </span>
        )
      })}
    </>
  )
}

function formatInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g)
  return parts.map((part, i) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) {
      return (
        <strong key={i} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (/^`[^`]+`$/.test(part)) {
      return (
        <code key={i} className="rounded bg-white/10 px-1 py-0.5 text-[12px]">
          {part.slice(1, -1)}
        </code>
      )
    }
    if (/^\*[^*]+\*$/.test(part)) {
      return (
        <em key={i} className="italic">
          {part.slice(1, -1)}
        </em>
      )
    }
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part)
    if (link) {
      return (
        <a
          key={i}
          href={link[2]}
          target={link[2].startsWith('http') ? '_blank' : undefined}
          rel={link[2].startsWith('http') ? 'noopener noreferrer' : undefined}
          className="underline decoration-brand-orange/70 underline-offset-2 hover:text-brand-orange"
        >
          {link[1]}
        </a>
      )
    }
    return <span key={i}>{part}</span>
  })
}

function TypingDots({ label }: { label?: string } = {}) {
  return (
    <div className="flex w-fit items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3">
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block h-1.5 w-1.5 rounded-full bg-brand-orange"
            animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
      {label && <span className="text-[11px] text-brand-white/65">{label}</span>}
    </div>
  )
}
