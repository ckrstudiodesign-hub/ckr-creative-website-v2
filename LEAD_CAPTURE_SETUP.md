# Lead Capture Setup — Google Sheets

The chatbot's "Start a project" flow collects **Service · Name · Email · Phone**
and POSTs it to `/api/lead`, which forwards the data to a Google Sheets webhook.

You need to do this **once** to get the webhook URL.

---

## 1. Create the spreadsheet

1. Go to https://sheets.google.com and create a new sheet.
2. Name it something like **"CKR Creatives — Leads"**.
3. In **row 1**, add these column headers (in this order):

   | A         | B    | C     | D     | E       | F      | G          |
   |-----------|------|-------|-------|---------|--------|------------|
   | Timestamp | Name | Email | Phone | Service | Source | User Agent |

---

## 2. Create the Apps Script webhook

1. Inside the spreadsheet, go to **Extensions → Apps Script**.
2. Delete any boilerplate code and paste this in:

```js
// CKR Creatives — Lead capture webhook
// Triggered by POST requests from /api/lead.

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.service || '',
      data.source || 'website-chatbot',
      data.userAgent || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click the **disk icon** to save (name the project "CKR Lead Webhook").

---

## 3. Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear icon → **Web app**.
3. Configure:
   - **Description:** `CKR lead webhook v1`
   - **Execute as:** `Me (your-email@gmail.com)`
   - **Who has access:** `Anyone` *(required — Vercel's server hits the URL anonymously)*
4. Click **Deploy**.
5. Google will ask to authorize the script — click **Authorize access**, pick your account, click **Advanced → Go to (unsafe)** *(this warning is normal — the script is yours)*, then **Allow**.
6. Copy the **Web app URL** that looks like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

---

## 4. Paste the URL into `.env.local`

Open [`.env.local`](.env.local) and replace the placeholder:

```env
GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/AKfycb.../exec
```

Restart `npm run dev` so Vite picks up the new env var.

---

## 5. Add the same env var on Vercel (for production)

1. Go to your Vercel dashboard → **Project Settings → Environment Variables**.
2. Add:
   - **Name:** `GOOGLE_SHEET_WEBHOOK_URL`
   - **Value:** the same URL from step 3.
   - **Environments:** Production, Preview, Development (tick all three).
3. Redeploy.

---

## 6. Test the flow

1. Open the site, click the floating orange orb.
2. Click **Start a project**.
3. Walk through Service → Name → Email → Phone → Send brief.
4. Check the spreadsheet — a new row should appear within ~2 seconds.

If nothing appears, check:
- The browser DevTools Network tab — what does `/api/lead` respond with?
- Apps Script → **Executions** tab — did `doPost` run? Any errors?
- The deployment URL ends in `/exec` (not `/dev`).

---

## Updating the script later

If you edit the Apps Script after deploying, you must create a **new deployment**:
**Deploy → Manage deployments → Pencil icon → Version → New version → Deploy.**
Otherwise the live webhook still runs the old code.

The Web app URL stays the same across versions of the same deployment, so you
don't need to update `.env.local` after re-deploying — only after creating a
**brand-new deployment**.
