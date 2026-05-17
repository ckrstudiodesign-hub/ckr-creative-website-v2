import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * React Router doesn't auto-scroll on route changes. Without this, navigating
 * from a deep scroll position on /work to /blog lands the visitor mid-page.
 *
 * Behavior:
 *   - On first mount (page load / hard refresh): always land on the Hero.
 *     Any URL hash (e.g. /#contact) is stripped so the browser doesn't jump
 *     to a section, and the scroll position is forced to (0, 0).
 *   - On subsequent in-app navigations with a hash, scroll smoothly to the
 *     targeted section once it has mounted.
 *   - On subsequent in-app navigations without a hash, jump to the top.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const isInitialMount = useRef(true)

  useEffect(() => {
    // Prevent the browser from restoring the prior scroll position on refresh.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    // Strip any hash so a refresh on /#contact doesn't jump to the contact
    // section — every refresh should land on the Hero.
    if (window.location.hash) {
      window.history.replaceState(
        null,
        '',
        window.location.pathname + window.location.search,
      )
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  useEffect(() => {
    // Skip the very first run — the mount effect above already handled it,
    // and we never want a refresh to scroll to a hash target.
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    if (hash) {
      // Wait a tick so the target route has mounted before we query the DOM.
      // Two RAFs cover the React commit + layout flush.
      const id = hash.replace(/^#/, '')
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const el = document.getElementById(id)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          } else {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
          }
        })
      })
      return
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  return null
}
