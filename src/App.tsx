import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import SiteLoader from './components/SiteLoader'
import { ScrollToTop } from './components/ScrollToTop'
import Home from './pages/Home'
import Studio from './pages/Studio'
import Work from './pages/Work'
import Blog from './pages/Blog'

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
          <Route path="/blog" element={<Blog />} />
          <Route
            path="*"
            element={
              <div className="px-[72px] py-32 text-center">
                <span className="zalando-h2-lh69">404 - Page coming soon</span>
              </div>
            }
          />
        </Route>
      </Routes>
    </>
  )
}
