/**
 * Local FAQ knowledge base for the Nova chatbot — no LLM, no API key required.
 *
 * Each entry has a list of keywords. When a user types a question, we pick the
 * entry with the highest keyword-overlap score. If nothing scores above the
 * threshold, we return the fallback answer.
 */

export type FaqEntry = {
  id: string
  question: string // canonical phrasing — shown as a quick-prompt button
  keywords: string[]
  answer: string // supports basic markdown: **bold**, *italic*, `code`, [label](url), and line breaks
}

export const FAQ: FaqEntry[] = [
  {
    id: 'services',
    question: 'What services do you offer?',
    keywords: ['service', 'services', 'offer', 'do', 'what', 'capabilities', 'discipline'],
    answer: `CKR Creatives delivers six disciplines under one studio:

**1. Brand Identity & Visual Systems** — logos, typography, color, motion identity.
**2. Web Design & Development** — cinematic editorial sites and conversion-tuned landing pages.
**3. AI Automation & Smart Systems** — workflows, lead-gen pipelines, chatbots like this one.
**4. SEO, GEO, AEO & LLMO Optimization** — technical SEO + structuring content so AI engines cite you.
**5. Social Media & Content Marketing** — reels, campaigns, short-form content engines.
**6. Cybersecurity & Digital Protection** — hardening, audits, penetration testing.

Want to start a project? Tap **Start a project** above.`,
  },
  {
    id: 'aeo-vs-seo',
    question: 'How does AEO differ from SEO?',
    keywords: ['aeo', 'seo', 'difference', 'differ', 'vs', 'versus', 'answer', 'engine', 'optimization'],
    answer: `**SEO (Search Engine Optimization)** targets classical search engines — Google, Bing, DuckDuckGo. The goal is to rank URLs on the results page.

**AEO (Answer Engine Optimization)** targets AI search — ChatGPT, Perplexity, Gemini, Google AI Overviews. The goal is to be *cited by name* in the AI's answer.

The techniques overlap (clean structure, fast pages, schema), but AEO leans harder on:
- Entity-rich JSON-LD
- Q&A formatting
- Fact-dense, atomic answers AI can quote verbatim
- An llms.txt file for direct LLM ingestion

CKR Creatives builds both into every site by default.`,
  },
  {
    id: 'geo',
    question: 'What is GEO in the SEO context?',
    keywords: ['geo', 'geographic', 'generative', 'targeting', 'local', 'dubai'],
    answer: `GEO has two meanings in 2026:

**1. Geographic SEO** — city/region targeting via hreflang, local schema, Google Maps, Apple Maps optimization.

**2. Generative Engine Optimization** — structuring content so generative AI engines retrieve and cite it (closely related to [[AEO]]).

CKR Creatives delivers both — the local angle for Dubai/GCC ranking and the generative angle for AI search visibility.`,
  },
  {
    id: 'llmo',
    question: 'What is LLMO?',
    keywords: ['llmo', 'llm', 'large', 'language', 'model', 'optimization'],
    answer: `**LLMO (Large Language Model Optimization)** is the practice of making a website discoverable and quotable by large language models — ChatGPT, Claude, Gemini, Perplexity, You.com, etc.

Key techniques:
- Publish an \`llms.txt\` and \`llms-full.txt\` file at the site root
- Use entity-rich JSON-LD schema
- Write fact-dense, atomic copy that LLMs can chunk cleanly
- Explicitly opt-in AI crawlers in \`robots.txt\` (GPTBot, ClaudeBot, PerplexityBot, etc.)

This site has all of those — you can see them at [/llms.txt](/llms.txt) and [/llms-full.txt](/llms-full.txt).`,
  },
  {
    id: 'rag',
    question: 'Do you build RAG systems?',
    keywords: ['rag', 'retrieval', 'augmented', 'generation', 'vector', 'embedding'],
    answer: `Yes. **RAG (Retrieval-Augmented Generation)** sits inside our AI Automation discipline.

We design and ship:
- Embedding storage (Pinecone, Weaviate, pgvector, Turbopuffer)
- Semantic retrieval layers
- Prompt orchestration and grounded answer generation
- Internal knowledge-base chatbots and AI search for content libraries

Tap **Start a project** if you'd like to scope a RAG build.`,
  },
  {
    id: 'location',
    question: 'Where are you located?',
    keywords: ['where', 'located', 'location', 'based', 'office', 'city', 'dubai', 'uae', 'address'],
    answer: `CKR Creatives is headquartered in **Dubai, United Arab Emirates**.

We work with clients across:
- The GCC (UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman)
- Europe
- North America
- Worldwide remote engagements

Languages: English (primary), Arabic (regional).`,
  },
  {
    id: 'contact',
    question: 'How do I contact you?',
    keywords: ['contact', 'reach', 'email', 'whatsapp', 'call', 'phone', 'get', 'in', 'touch', 'message'],
    answer: `Three easy ways:

- **Email:** ckrstudiodesign@gmail.com
- **Book a 30-min call:** [calendly.com/ckrstudiodesign/30min](https://calendly.com/ckrstudiodesign/30min)
- **WhatsApp:** [+971 52 104 6611](https://wa.me/971521046611)

Or just tap **Start a project** above and we'll have your brief in our inbox within seconds.`,
  },
  {
    id: 'pricing',
    question: 'What does it cost? / Pricing?',
    keywords: ['cost', 'pricing', 'price', 'budget', 'how', 'much', 'rate', 'fee', 'quote', 'expensive'],
    answer: `Every engagement is scoped individually — pricing depends on:

- Scope (one discipline vs. a full ecosystem)
- Timeline (rush vs. standard 6-12 week builds)
- Complexity (single landing page vs. multi-stack platform)

Typical brand + web engagements start in the **$5k-$15k** range. Full ecosystems with AI, SEO architecture, and content systems sit higher.

For a real number, [book a 30-min call](https://calendly.com/ckrstudiodesign/30min) or tap **Start a project** — we'll send a tailored proposal within one business day.`,
  },
  {
    id: 'international',
    question: 'Do you work with international clients?',
    keywords: ['international', 'global', 'worldwide', 'overseas', 'foreign', 'remote', 'usa', 'europe'],
    answer: `Yes — over half our work is outside the UAE.

We've shipped projects for clients in:
- The GCC
- Western Europe (UK, Germany, France, Netherlands)
- North America (US, Canada)
- Australia and Asia

All engagements run async-friendly: Slack/Notion/Loom, structured weekly check-ins, and a single point of contact at CKR.`,
  },
  {
    id: 'timeline',
    question: 'How long does a project take?',
    keywords: ['long', 'timeline', 'time', 'duration', 'when', 'fast', 'urgency', 'asap', 'launch', 'deliver'],
    answer: `Typical timelines:

- **Logo / brand identity:** 2-3 weeks
- **Marketing site (5-10 pages):** 4-6 weeks
- **Cinematic editorial site:** 6-10 weeks
- **Full brand + web + content ecosystem:** 10-16 weeks
- **AI automation / RAG build:** 3-8 weeks depending on scope

Rush timelines available — we can compress most engagements by 30-40% with a slight premium.`,
  },
  {
    id: 'ai-chatbots',
    question: 'Can you build AI chatbots like this one?',
    keywords: ['chatbot', 'chat', 'bot', 'ai', 'assistant', 'like', 'this', 'build', 'develop'],
    answer: `Yes — you're talking to one we built. 🟧

We design and deploy:
- Concierge bots for websites (like Nova)
- Internal knowledge-base assistants
- WhatsApp / Telegram / Slack bots
- RAG-powered AI search
- Lead-qualification flows with CRM sync

Tap **Start a project** if you want one for your business.`,
  },
  {
    id: 'process',
    question: 'How do you work? / What is your process?',
    keywords: ['process', 'work', 'workflow', 'how', 'methodology', 'approach', 'phases', 'steps'],
    answer: `Every engagement follows four phases:

**1. Discovery & strategy** — workshops, audit, positioning. We don't touch visuals until the strategy is locked.

**2. Identity / experience design** — visual system, motion grammar, UX architecture.

**3. Build & integrate** — engineering, CMS, AI workflows, SEO/GEO/AEO architecture.

**4. Launch & optimize** — measurable launch, search tuning, performance review.

One point of contact, async-first communication, weekly Loom check-ins.`,
  },
  {
    id: 'portfolio',
    question: 'Can I see your work?',
    keywords: ['work', 'portfolio', 'case', 'study', 'studies', 'projects', 'examples', 'show', 'see'],
    answer: `Of course — our selected work is at [/work](/work).

A few recent highlights:
- **NovaGrid Systems** — AI infrastructure brand + product UX
- **Veloré Dynamics** — luxury mobility identity + cinematic site
- **AetherX Aerospace** — investor-ready aerospace brand
- **Neurovia Health** — clinical-grade AI healthcare experience

Tap **Start a project** above when you're ready to brief us.`,
  },
  {
    id: 'who',
    question: 'Who is CKR Creatives?',
    keywords: ['who', 'about', 'ckr', 'creatives', 'company', 'agency', 'studio', 'tell', 'me'],
    answer: `**CKR Creatives** is a Dubai-based creative digital agency designing future-ready brands, cinematic websites, AI automation, and SEO-optimized digital experiences.

We work with founders, luxury brands, and modern operators across the GCC, Europe, North America, and worldwide. Six disciplines under one studio — strategy-first, AI search-ready by default, built to compound in value over years.

Read more at [/studio](/studio).`,
  },
]

const FALLBACK_ANSWER = `That's a bit outside my scripted knowledge — but the team can answer in detail.

Quick options:
- Tap **Start a project** above and brief us in 30 seconds
- Email us at ckrstudiodesign@gmail.com
- [Book a 30-min call](https://calendly.com/ckrstudiodesign/30min)

Or ask me about: **services**, **AEO vs SEO**, **GEO**, **LLMO**, **RAG**, **pricing**, **timelines**, **process**, or **how to contact us**.`

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'do', 'does', 'for', 'from',
  'how', 'i', 'if', 'in', 'is', 'it', 'me', 'my', 'of', 'on', 'or', 'our', 'so',
  'that', 'the', 'to', 'us', 'we', 'what', 'when', 'where', 'who', 'with', 'you',
  'your',
])

/**
 * Returns the best-matching FAQ answer for a free-text query.
 *
 * Scoring: tokens are lowercased, stripped of punctuation, and stop-words are
 * dropped. We count how many of an entry's keywords appear in the query, with
 * an exact-question-match bonus. The highest-scoring entry wins.
 */
export function answerFor(query: string): { entry: FaqEntry | null; answer: string } {
  const q = query.trim().toLowerCase()
  if (!q) return { entry: null, answer: FALLBACK_ANSWER }

  // Exact / near-exact match against canonical question — instant win.
  const exact = FAQ.find((f) => f.question.toLowerCase() === q)
  if (exact) return { entry: exact, answer: exact.answer }

  const tokens = q
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t))

  let bestEntry: FaqEntry | null = null
  let bestScore = 0

  for (const entry of FAQ) {
    let score = 0
    for (const kw of entry.keywords) {
      if (tokens.includes(kw)) score += 1
    }
    // Bonus if the entry's question shares many tokens with the query.
    const qTokens = entry.question
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((t) => t.length > 1 && !STOP_WORDS.has(t))
    for (const qt of qTokens) {
      if (tokens.includes(qt)) score += 0.5
    }
    if (score > bestScore) {
      bestScore = score
      bestEntry = entry
    }
  }

  if (!bestEntry || bestScore < 1) return { entry: null, answer: FALLBACK_ANSWER }
  return { entry: bestEntry, answer: bestEntry.answer }
}
