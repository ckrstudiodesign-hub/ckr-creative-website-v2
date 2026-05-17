type SEOProps = {
  title: string
  description: string
  /** Canonical URL — should include the production origin */
  canonical: string
  /** Absolute URL to a preview image (1200x630 ideal) */
  ogImage?: string
  /** One or more JSON-LD schema.org objects */
  jsonLd?: object | object[]
  /** Extra keywords (comma-separated). Most search engines ignore this, but
   *  it remains useful as a hint for LLM crawlers and internal CMS searches. */
  keywords?: string
  /** Defaults to "website". For articles use "article". */
  ogType?: string
  /** Article metadata — only used when ogType === "article". */
  article?: {
    publishedTime?: string
    modifiedTime?: string
    author?: string
    section?: string
    tags?: string[]
  }
}

/**
 * Per-page metadata for SEO + AEO + GEO + LLMO + RAG.
 *
 * Relies on React 19's native head hoisting: <title>, <meta>, <link>, and
 * <script type="application/ld+json"> placed anywhere in a component are
 * automatically moved into <head> and deduped against the static index.html
 * fallbacks.
 *
 * Optimizes for:
 *   - SEO   — canonical, OG, Twitter, sitemap-friendly metadata
 *   - GEO   — geo.region, geo.position, ICBM, schema PostalAddress + GeoCoordinates
 *   - AEO   — FAQPage / BreadcrumbList / Q&A formatting, structured headings
 *   - LLMO  — explicit AI bot allow-list, content-language, llms.txt link, entity-rich JSON-LD
 *   - RAG   — alternate machine-readable representations (ai.json, llms-full.txt)
 */
export function SEO({
  title,
  description,
  canonical,
  ogImage,
  jsonLd,
  keywords,
  ogType = 'website',
  article,
}: SEOProps) {
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />

      {/* Crawler directives — classical SEO + AI/LLM allow-list (LLMO) */}
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large" />
      <meta name="bingbot" content="index, follow" />
      <meta name="GPTBot" content="index, follow" />
      <meta name="ClaudeBot" content="index, follow" />
      <meta name="PerplexityBot" content="index, follow" />
      <meta name="Google-Extended" content="index, follow" />
      <meta name="Applebot-Extended" content="index, follow" />
      <meta name="OAI-SearchBot" content="index, follow" />

      {/* Content language hints (helps LLM retrieval + hreflang) */}
      <meta httpEquiv="content-language" content="en" />
      <meta name="language" content="English" />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="CKR Creatives" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="ar_AE" />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogImage && <meta property="og:image:alt" content={title} />}
      {ogImage && <meta property="og:image:width" content="1200" />}
      {ogImage && <meta property="og:image:height" content="630" />}

      {/* Article metadata for OG (used by AEO/LLMO when ogType="article") */}
      {ogType === 'article' && article?.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {ogType === 'article' && article?.modifiedTime && (
        <meta property="article:modified_time" content={article.modifiedTime} />
      )}
      {ogType === 'article' && article?.author && (
        <meta property="article:author" content={article.author} />
      )}
      {ogType === 'article' && article?.section && (
        <meta property="article:section" content={article.section} />
      )}
      {ogType === 'article' &&
        article?.tags?.map((t) => <meta key={t} property="article:tag" content={t} />)}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@ckrcreatives" />
      <meta name="twitter:creator" content="@ckrcreatives" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      {ogImage && <meta name="twitter:image:alt" content={title} />}

      {/* GEO targeting (geographic SEO) */}
      <meta name="geo.region" content="AE-DU" />
      <meta name="geo.placename" content="Dubai" />
      <meta name="geo.position" content="25.2048;55.2708" />
      <meta name="ICBM" content="25.2048, 55.2708" />

      {/* RAG / LLMO discovery — point machines to the structured sources */}
      <link rel="alternate" type="text/plain" title="llms.txt" href="/llms.txt" />
      <link rel="alternate" type="text/plain" title="llms-full.txt" href="/llms-full.txt" />
      <link rel="alternate" type="application/json" title="ai.json" href="/ai.json" />
      <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />

      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  )
}
