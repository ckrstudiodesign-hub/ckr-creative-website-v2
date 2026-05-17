// Quick diagnostic: hits the Apps Script webhook exactly the way our server
// does, then prints the full response so we can see what's failing.
// Run: node scripts/test-webhook.mjs

const url =
  'https://script.google.com/macros/s/AKfycbyr-0UWyk9-fP25bD1IXQfZGV8PLg0hbhbNETUfX6ME50ef-FUsNMmBpjWdCOZkzwfSJg/exec'

const payload = {
  name: 'NodeDiagnostic',
  email: 'diag-node@ckr.test',
  phone: '+971500000000',
  service: 'Web',
  source: 'node-diagnostic',
  timestamp: new Date().toISOString(),
}

console.log('--> POSTing form-encoded payload to', url)

const res = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({ data: JSON.stringify(payload) }).toString(),
  redirect: 'follow',
})

console.log('<-- status:', res.status, res.statusText)
console.log('<-- final url:', res.url)
console.log('<-- content-type:', res.headers.get('content-type'))
const body = await res.text()
console.log('<-- body (first 800 chars):\n', body.slice(0, 800))
