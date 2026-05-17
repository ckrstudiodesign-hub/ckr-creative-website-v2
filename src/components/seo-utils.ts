export function buildBreadcrumbs(
  origin: string,
  crumbs: Array<[name: string, path: string]>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: `${origin}${path}`,
    })),
  }
}

export const SITE_ORIGIN = 'https://www.ckrcreatives.com'
