import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import SiteLoader from './components/SiteLoader'
import { ScrollToTop } from './components/ScrollToTop'
import Home from './pages/Home'
import Studio from './pages/Studio'
import Work from './pages/Work'
import WorkDetail from './pages/WorkDetail'
import Blog from './pages/Blog'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'

export default function App() {
  return (
    <>
      <SiteLoader />
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<WorkDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms-of-use" element={<Terms />} />
          <Route
            path="*"
            element={
              <div className="px-[72px] py-20 text-center">
                <span className="zalando-h2-lh69">404 — Page not found</span>
              </div>
            }
          />
        </Route>
      </Routes>
    </>
  )
}
