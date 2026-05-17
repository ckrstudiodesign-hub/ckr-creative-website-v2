import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+()\d\s.-]{6,40}$/
const ALLOWED_SERVICES = new Set(['Brand', 'Web', 'AI', 'SEO', 'Other'])

async function readJson(req: import('http').IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = []
  for await (const chunk of req) chunks.push(chunk as Buffer)
  return JSON.parse(Buffer.concat(chunks).toString('utf-8'))
}

/**
 * Vite dev middleware that serves /api/lead — mirrors api/lead.ts (Vercel).
 * Forwards lead payloads to the Google Sheets Apps Script webhook so the
 * chatbot's guided flow can save data during local development.
 */
function devLeadApi(webhookUrl: string | undefined): Plugin {
  return {
    name: 'dev-lead-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/lead', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Method not allowed. Use POST.' }))
          return
        }

        if (!webhookUrl) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              error:
                'Missing GOOGLE_SHEET_WEBHOOK_URL in .env.local. Deploy the Apps Script webhook and paste the URL.',
            }),
          )
          return
        }

        try {
          const body = (await readJson(req)) as {
            name?: string
            email?: string
            phone?: string
            service?: string
            hp?: string
          }

          // Honeypot — silent success on bot fill.
          if (typeof body?.hp === 'string' && body.hp.trim().length > 0) {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: true }))
            return
          }

          const name = (body?.name ?? '').trim().slice(0, 120)
          const email = (body?.email ?? '').trim().slice(0, 200)
          const phone = (body?.phone ?? '').trim().slice(0, 40)
          const service = (body?.service ?? '').trim()

          if (!name || !email || !phone || !service) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Name, email, phone, and service are all required.' }))
            return
          }

          if (!EMAIL_RE.test(email)) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Please provide a valid email address.' }))
            return
          }

          if (!PHONE_RE.test(phone)) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Please provide a valid phone or WhatsApp number.' }))
            return
          }

          if (!ALLOWED_SERVICES.has(service)) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Invalid service selection.' }))
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
          }

          // Apps Script is most reliable with form-encoded POSTs (avoids the
          // 302 → 411 redirect bug from text/plain or JSON bodies). The payload
          // is stuffed into a single "data" field — Apps Script reads it via
          // e.parameter.data.
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
            console.error('[dev /api/lead] upstream failure:', {
              status: upstream.status,
              statusText: upstream.statusText,
              finalUrl: upstream.url,
              body: upstreamText.slice(0, 800),
            })
            res.statusCode = 502
            res.setHeader('Content-Type', 'application/json')
            res.end(
              JSON.stringify({
                error: `Apps Script returned ${upstream.status}: ${
                  upstreamJson?.error ?? upstreamText.slice(0, 240) ?? 'no body'
                }`,
              }),
            )
            return
          }

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ success: true }))
        } catch (err) {
          console.error('[dev /api/lead] error:', err)
          if (!res.headersSent) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Something went wrong while saving the lead.' }))
          } else {
            res.end()
          }
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), devLeadApi(env.GOOGLE_SHEET_WEBHOOK_URL)],
  }
})
