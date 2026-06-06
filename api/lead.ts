import type { VercelRequest, VercelResponse } from '@vercel/node'

/**
 * POST /api/lead
 *
 * Body: { name: string; email: string; phone: string; service: string; hp?: string }
 *
 * Forwards the lead payload to a Google Sheets webhook (a deployed Google
 * Apps Script `doPost` endpoint). The webhook URL is read from the
 * GOOGLE_SHEET_WEBHOOK_URL env var so the URL itself stays server-side.
 *
 * Defenses (lightweight — appropriate for a low-volume agency contact form):
 *   1. Origin / Referer allow-list — only requests from our own domains.
 *   2. Honeypot field (`hp`) — non-empty value = bot, silently drop.
 *   3. In-memory IP rate limit — 5 requests / 10 minutes per IP. Resets on
 *      cold starts, which is fine for this use case.
 *   4. Strict input validation (length caps, regex).
 */

type LeadPayload = {
  name?: string
  email?: string
  phone?: string
  service?: string
  hp?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+()\d\s.-]{6,40}$/
const ALLOWED_SERVICES = new Set(['Brand', 'Web', 'AI', 'SEO', 'Other'])

const ALLOWED_ORIGINS = [
  'https://www.ckrcreatives.com',
  'https://ckrcreatives.com',
  // Vercel preview deployments share the *.vercel.app namespace.
  /^https:\/\/.+\.vercel\.app$/,
  // Local dev.
  'http://localhost:5173',
  'http://localhost:3000',
]

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const RATE_LIMIT_MAX = 5 // 5 submissions per window per IP

// Cold-start-scoped — fine for low-volume abuse prevention. For stronger
// guarantees swap in Vercel KV / Upstash Redis later.
const ipHits = new Map<string, number[]>()

function isAllowedOrigin(origin: string | undefined): boolean {
  if (!origin) return false
  for (const allowed of ALLOWED_ORIGINS) {
    if (typeof allowed === 'string' && origin === allowed) return true
    if (allowed instanceof RegExp && allowed.test(origin)) return true
  }
  return false
}

function getClientIp(req: VercelRequest): string {
  const xff = req.headers['x-forwarded-for']
  if (typeof xff === 'string') return xff.split(',')[0].trim()
  if (Array.isArray(xff) && xff.length) return xff[0].trim()
  return req.socket?.remoteAddress ?? 'unknown'
}

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const cutoff = now - RATE_LIMIT_WINDOW_MS
  const hits = (ipHits.get(ip) ?? []).filter((t) => t > cutoff)
  if (hits.length >= RATE_LIMIT_MAX) {
    ipHits.set(ip, hits)
    return true
  }
  hits.push(now)
  ipHits.set(ip, hits)
  return false
}

// Web3Forms access key — same one the website contact form uses, so the
// notification email lands in the CKR inbox (ckrstudiodesign@gmail.com).
// Overridable via env var if the key is ever rotated.
const WEB3FORMS_ACCESS_KEY =
  process.env.WEB3FORMS_ACCESS_KEY ?? '1e5585e5-f8f8-4d9b-9b0f-b7e1b27cd459'

/**
 * Fire an email notification to the CKR inbox after a brief is saved.
 * Best-effort: failures are logged but never fail the request, because the
 * lead is already safely stored in the spreadsheet by that point.
 */
async function sendEmailNotification(payload: {
  name: string
  email: string
  phone: string
  service: string
  timestamp: string
}): Promise<void> {
  try {
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New project brief — ${payload.service} — ${payload.name}`,
        from_name: 'CKR Nova Chatbot',
        replyto: payload.email,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        service: payload.service,
        message:
          'New brief submitted via the Nova chatbot:\n\n' +
          `Service: ${payload.service}\n` +
          `Name:    ${payload.name}\n` +
          `Email:   ${payload.email}\n` +
          `Phone:   ${payload.phone}\n` +
          `Time:    ${payload.timestamp}`,
        botcheck: '',
      }),
    })
  } catch (err) {
    console.error('[/api/lead] email notification failed:', err)
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed. Use POST.' })
    return
  }

  // 1. Origin / Referer allow-list — blocks third-party sites from POSTing.
  const origin = (req.headers.origin as string | undefined) ?? ''
  const referer = (req.headers.referer as string | undefined) ?? ''
  const refererOrigin = referer ? new URL(referer).origin : ''
  if (!isAllowedOrigin(origin) && !isAllowedOrigin(refererOrigin)) {
    res.status(403).json({ error: 'Forbidden origin.' })
    return
  }

  // 2. Rate limit
  const ip = getClientIp(req)
  if (rateLimited(ip)) {
    res.status(429).json({ error: 'Too many requests. Please try again later.' })
    return
  }

  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL
  if (!webhookUrl) {
    res.status(500).json({
      error:
        'Missing GOOGLE_SHEET_WEBHOOK_URL. Deploy the Apps Script webhook and add the URL to environment variables.',
    })
    return
  }

  try {
    const body = req.body as LeadPayload

    // 3. Honeypot — real users never fill this; bots usually do.
    if (typeof body?.hp === 'string' && body.hp.trim().length > 0) {
      // Silent success so bots don't learn to bypass.
      res.status(200).json({ success: true })
      return
    }

    const name = (body?.name ?? '').trim().slice(0, 120)
    const email = (body?.email ?? '').trim().slice(0, 200)
    const phone = (body?.phone ?? '').trim().slice(0, 40)
    const service = (body?.service ?? '').trim()

    if (!name || !email || !phone || !service) {
      res.status(400).json({ error: 'Name, email, phone, and service are all required.' })
      return
    }

    if (name.length < 2) {
      res.status(400).json({ error: 'Please enter your full name.' })
      return
    }

    if (!EMAIL_RE.test(email)) {
      res.status(400).json({ error: 'Please provide a valid email address.' })
      return
    }

    if (!PHONE_RE.test(phone)) {
      res.status(400).json({ error: 'Please provide a valid phone or WhatsApp number.' })
      return
    }

    if (!ALLOWED_SERVICES.has(service)) {
      res.status(400).json({ error: 'Invalid service selection.' })
      return
    }

    const payload = {
      name,
      email,
      phone,
      service,
      source: 'website-chatbot',
      timestamp: new Date().toISOString(),
      userAgent: req.headers['user-agent'] ?? '',
      ip,
    }

    // Apps Script is most reliable with form-encoded POSTs. Sending JSON or
    // text/plain triggers a 302 to script.googleusercontent.com whose redirect
    // mangles the body (411 Length Required). Form-encoded POSTs land on
    // doPost cleanly. The payload is stuffed into a single "data" field so the
    // Apps Script side only has to read `e.parameter.data`.
    const upstream = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ data: JSON.stringify(payload) }).toString(),
      redirect: 'follow',
    })

    const upstreamText = await upstream.text().catch(() => '')

    let upstreamJson: { success?: boolean; error?: string } | null = null
    try {
      upstreamJson = JSON.parse(upstreamText)
    } catch {
      // not JSON
    }

    if (!upstream.ok || !upstreamJson?.success) {
      console.error('[/api/lead] upstream failure:', {
        status: upstream.status,
        statusText: upstream.statusText,
        body: upstreamText.slice(0, 500),
      })
      res.status(502).json({
        error: 'Saving the lead failed. Please try again or email us directly.',
      })
      return
    }

    // Lead is safely in the spreadsheet — now email a notification to the CKR
    // inbox. Awaited (so it completes before the serverless function freezes)
    // but non-fatal: an email hiccup must not break a successful submission.
    await sendEmailNotification({ name, email, phone, service, timestamp: payload.timestamp })

    res.status(200).json({ success: true })
  } catch (err) {
    console.error('[/api/lead] error:', err)
    res.status(500).json({ error: 'Something went wrong while saving the lead.' })
  }
}
