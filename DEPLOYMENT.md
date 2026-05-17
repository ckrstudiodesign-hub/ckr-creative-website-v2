# 🚀 Deploying CKR Creatives to Vercel with a GoDaddy Domain

This guide walks you through:

1. Pushing the site to GitHub
2. Deploying to Vercel
3. Setting environment variables
4. Connecting your **GoDaddy** domain (`ckrcreatives.com`)
5. Verifying security & SSL

> The repo already includes a hardened `vercel.json` with HSTS, CSP, Permissions-Policy, COOP/CORP, X-Frame-Options, no-cache for HTML, immutable cache for assets, and a serverless function for `/api/lead`.

---

## 1. Prerequisites

- A **GitHub** account (free).
- A **Vercel** account (free hobby plan is fine) — sign up at [vercel.com](https://vercel.com).
- Access to your **GoDaddy** domain DNS settings.
- The Google Sheets Apps Script webhook URL (see `LEAD_CAPTURE_SETUP.md`).

---

## 2. Push the project to GitHub

```bash
# from the project root
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/ckrcreatives-website.git
git push -u origin main
```

> The `.gitignore` already excludes `node_modules`, `dist`, `.env*`, `.vercel`, and editor folders.

---

## 3. Deploy to Vercel

1. Go to **[vercel.com/new](https://vercel.com/new)**.
2. **Import** the GitHub repo.
3. Vercel auto-detects the **Vite** framework (confirmed in `vercel.json`).
   - Build command: `npm run build`
   - Output directory: `dist`
4. **Before clicking Deploy**, expand **Environment Variables** and add:

   | Name                       | Value                                                      |
   | -------------------------- | ---------------------------------------------------------- |
   | `GOOGLE_SHEET_WEBHOOK_URL` | `https://script.google.com/macros/s/AKfycb.../exec`        |

   Apply it to **Production, Preview, and Development**.

5. Click **Deploy**.

After ~60 s you'll get a `https://<project>.vercel.app` URL. Open it and confirm:

- The homepage loads.
- The chatbot opens and the lead form submits successfully (a row should land in your Google Sheet).
- Open DevTools → Network → click any page request → confirm the headers in the next section.

---

## 4. Connect your GoDaddy domain

You'll point **`ckrcreatives.com`** and **`www.ckrcreatives.com`** to Vercel.
The repo's `vercel.json` already redirects the apex (`ckrcreatives.com`) → `www.ckrcreatives.com`, which matches the canonical URL used throughout the site.

### 4.1 Add the domain in Vercel

1. In Vercel → your project → **Settings → Domains**.
2. Add **`ckrcreatives.com`** → click **Add**.
3. Add **`www.ckrcreatives.com`** → click **Add**.
4. Vercel will show you exactly which DNS records to create. They will look like:

   | Record type | Name (host) | Value                       | TTL  |
   | ----------- | ----------- | --------------------------- | ---- |
   | **A**       | `@`         | `76.76.21.21`               | 600  |
   | **CNAME**   | `www`       | `cname.vercel-dns.com`      | 600  |

   > Always copy the exact values from Vercel's UI — they occasionally change.

### 4.2 Add the DNS records in GoDaddy

1. Sign in to [godaddy.com](https://godaddy.com) → **My Products** → next to your domain click **DNS**.
2. You'll see the **DNS Management** page.

#### A. Apex record (`ckrcreatives.com`)

- Find any existing `A` record where **Name = `@`** (often points to a GoDaddy parking IP). Click the pencil ✏️.
- Set:
  - **Type:** `A`
  - **Name:** `@`
  - **Value:** `76.76.21.21` (from Vercel)
  - **TTL:** `600 seconds` (or "Custom" → 600)
- Save.

#### B. WWW subdomain (`www.ckrcreatives.com`)

- Find any existing `CNAME` where **Name = `www`** (often points to `@`). Click ✏️.
- Set:
  - **Type:** `CNAME`
  - **Name:** `www`
  - **Value:** `cname.vercel-dns.com`
  - **TTL:** `600 seconds`
- Save.

#### C. Remove conflicting records

GoDaddy parks domains by default. Delete any of these if they exist on `@` or `www`:

- Extra `A` records on `@` pointing to non-Vercel IPs (`Parked` IPs, `15.197.x.x`, etc.).
- `AAAA` records on `@` or `www` (Vercel doesn't need IPv6 records for apex hosting).
- `CNAME` on `www` pointing to anything other than `cname.vercel-dns.com`.

> Keep `MX`, `TXT` (SPF/DMARC/DKIM), and any verification records — those are for email and stay as-is.

### 4.3 Wait for DNS propagation

- GoDaddy normally propagates in **5–30 minutes**, but can take up to **24 hours**.
- Check propagation with [dnschecker.org](https://dnschecker.org) → enter `ckrcreatives.com`.
- In Vercel → **Settings → Domains** both entries should turn into a green ✅ "Valid Configuration".

### 4.4 SSL

Vercel **automatically** provisions a free Let's Encrypt SSL certificate as soon as DNS resolves. You'll see `https://www.ckrcreatives.com` working with a padlock 🔒 within a few minutes after the green check.

---

## 5. Verify security headers

After deployment, open the live site and run:

```bash
curl -I https://www.ckrcreatives.com
```

You should see:

- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `Content-Security-Policy: default-src 'self'; ...`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), ...`
- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Resource-Policy: same-site`
- `X-Permitted-Cross-Domain-Policies: none`

Or scan with one of these (target an **A** or **A+**):

- 🔍 [securityheaders.com](https://securityheaders.com/?q=https%3A%2F%2Fwww.ckrcreatives.com)
- 🔒 [ssllabs.com/ssltest](https://www.ssllabs.com/ssltest/analyze.html?d=www.ckrcreatives.com)
- 🛡️ [observatory.mozilla.org](https://observatory.mozilla.org/analyze/www.ckrcreatives.com)

---

## 6. Security features already built-in

| Layer            | Where                                        | What it does                                                                                       |
| ---------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| HSTS             | `vercel.json`                                | Forces HTTPS for 2 years, includes subdomains, eligible for browser preload list.                  |
| CSP              | `vercel.json`                                | Whitelists script/style/font/img/media/connect/frame sources — blocks injected third-party code.  |
| Clickjacking     | `X-Frame-Options` + `frame-ancestors`        | Stops your site being iframed by anyone except your own domain.                                    |
| MIME sniffing    | `X-Content-Type-Options: nosniff`            | Stops browsers from guessing types and running things they shouldn't.                              |
| Referrer         | `Referrer-Policy`                            | Sends only the origin (not the path) when users click out.                                         |
| Permissions      | `Permissions-Policy`                         | Denies camera/mic/geolocation/payment/usb/FLoC.                                                    |
| COOP / CORP      | Both headers                                 | Isolates the browsing context — defense against cross-origin leaks (Spectre etc.).                 |
| API origin lock  | `api/lead.ts` → `ALLOWED_ORIGINS`            | Only accepts POSTs from your own domains.                                                          |
| Rate limit       | `api/lead.ts`                                | 5 lead submissions / 10 min / IP.                                                                  |
| Honeypot         | `api/lead.ts` → `hp` field                   | Silently drops bot submissions.                                                                    |
| Input validation | `api/lead.ts`                                | Length caps, regex on email/phone, whitelist on service.                                           |
| Webhook secret   | `GOOGLE_SHEET_WEBHOOK_URL` env               | Sheet webhook URL stays server-side; never exposed to the browser.                                 |
| No `.env` leaks  | `.gitignore` excludes `.env`, `.env.*`       | Secrets never committed.                                                                           |
| HTML no-cache    | `vercel.json`                                | New deploys ship immediately to all visitors.                                                      |
| Asset immutable  | `vercel.json` (`/assets/*`, media)           | Hashed assets cached forever for performance.                                                      |
| API no-cache     | `vercel.json` (`/api/*`)                     | `Cache-Control: no-store` + `X-Robots-Tag: noindex` on API responses.                              |

---

## 7. Optional hardening (later)

If you ever want to push security further:

- **Vercel KV / Upstash Redis** — replace the in-memory rate limiter with a durable one (so it survives cold starts and works across regions).
- **Turnstile / hCaptcha** — add invisible captcha to the lead form for stronger bot defense.
- **HSTS preload submission** — once you're confident the site will stay HTTPS, submit `ckrcreatives.com` at [hstspreload.org](https://hstspreload.org/).
- **CSP nonces** — move from `'unsafe-inline'` to nonces (requires SSR or a build-step Vite plugin).
- **Sentry / Vercel Logs** — surface errors from `api/lead.ts` to your inbox.

---

## 8. Updating the site after deploy

Any push to `main` auto-deploys to production. Pull requests get their own preview URL (e.g. `https://ckrcreatives-website-git-feature.vercel.app`) with the **same** security headers thanks to `vercel.json`.

To deploy manually from your machine:

```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## 9. Quick troubleshooting

| Symptom                                                | Likely cause                                                        | Fix                                                                                   |
| ------------------------------------------------------ | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Domain stuck on "Invalid Configuration" in Vercel      | Old GoDaddy A record on `@` still pointing to parking IP            | Delete extra `A`/`AAAA` records; keep only the Vercel one. Re-check in 10 min.        |
| Site loads on `www` but not on apex                    | Apex `A` record missing or pointing elsewhere                       | Set `@` → `A` → `76.76.21.21` in GoDaddy.                                            |
| Fonts don't load / styling broken                      | CSP blocked Google Fonts or Fontshare                               | Already allowed in `vercel.json` CSP. If you add a new CDN, extend `style-src`/`font-src`. |
| `/api/lead` returns 403                                | Origin not in `ALLOWED_ORIGINS`                                     | Add your new domain to `api/lead.ts → ALLOWED_ORIGINS` and redeploy.                  |
| Mixed content warning                                  | Hardcoded `http://` URL somewhere                                   | Search the codebase for `http://`; replace with `https://`.                           |
| Lead saved locally but not to sheet                    | `GOOGLE_SHEET_WEBHOOK_URL` env var missing in Vercel                | Add it under Settings → Environment Variables and redeploy.                           |

---

That's it. After step 4 finishes, **`https://www.ckrcreatives.com`** is live, secure, and fully production-ready. 🎉
