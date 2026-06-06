import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Pulse from './Pulse'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Studio', to: '/studio' },
  { label: 'Projects', to: '/work' },
  { label: 'Blog', to: '/blog' },
] as const

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  function goHome(e: React.MouseEvent) {
    e.preventDefault()
    setIsOpen(false)
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-off-gray/45 bg-brand-white/82 px-4 py-3 shadow-[0_12px_34px_rgba(36,16,6,0.04)] backdrop-blur-xl transition-all duration-300 md:px-8 lg:px-10 xl:px-[72px]">
      <div className="relative mx-auto flex min-h-[48px] w-full max-w-[1480px] flex-row items-center justify-between gap-4 md:min-h-[58px] md:gap-8">
        {/* Desktop: logo block on the left. Mobile: hidden (we render a centered version below) */}
        <div className="hidden lg:flex items-center gap-3 md:gap-5">
          <motion.div whileHover={{ rotate: -10, scale: 1.08 }} whileTap={{ scale: 0.96 }}>
            <Link to="/" onClick={goHome} className="block w-[48px] h-[48px] md:w-[54px] md:h-[54px] shrink-0" aria-label="CKR Creatives - home">
              <img
                src="/images/logo.png"
                alt="CKR Creatives"
                className="w-full h-full object-contain"
              />
            </Link>
          </motion.div>
          {/* New written script logo */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="shrink-0"
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Link to="/" onClick={goHome} aria-label="CKR Creatives - home">
              <img
                src="/images/logo name.png"
                alt="CKR Creatives Text"
                className="h-[40px] md:h-[50px] w-auto object-contain drop-shadow-md"
              />
            </Link>
          </motion.div>
        </div>

        {/* Mobile/tablet: mark stays left, signature sits centered */}
        <div className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center lg:hidden">
          <motion.div whileHover={{ rotate: -10, scale: 1.08 }} whileTap={{ scale: 0.96 }}>
            <Link to="/" onClick={goHome} className="block w-[42px] h-[42px] shrink-0" aria-label="CKR Creatives - home">
              <img
                src="/images/logo.png"
                alt="CKR Creatives"
                className="w-full h-full object-contain"
              />
            </Link>
          </motion.div>
        </div>
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center lg:hidden">
          <Link to="/" onClick={goHome} aria-label="CKR Creatives - home" className="shrink-0">
            <img
              src="/images/logo name.png"
              alt="CKR Creatives Text"
              className="h-[32px] w-auto max-w-[170px] object-contain drop-shadow-md sm:h-[36px]"
            />
          </Link>
        </div>

        {/* Desktop/Tablet Navigation */}
        <nav className="nav-orbit hidden flex-row items-center gap-2 rounded-full border border-brand-off-gray bg-brand-white/80 p-2 shadow-[0_18px_50px_rgba(0,0,0,0.06)] lg:flex xl:gap-4 xl:px-4">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={link.to === '/' ? goHome : undefined}
              className={({ isActive }) =>
                `relative overflow-hidden rounded-full px-4 py-2.5 dm-p16-medium transition-colors duration-300 xl:px-5 ${
                  isActive ? 'text-brand-black' : 'text-brand-black/60 hover:text-brand-black'
                }`
              }
              end={link.to === '/'}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-brand-orange"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  {/* Dancing Hover Animation for Text */}
                  <motion.span
                    className="relative z-10 inline-block"
                    whileHover={{ 
                      y: [0, -6, 2, -4, 0],
                      rotate: [0, -4, 4, -2, 0],
                      scale: 1.05
                    }}
                    transition={{ 
                      duration: 0.6,
                      ease: "easeInOut"
                    }}
                  >
                    {link.label}
                  </motion.span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto lg:ml-0 flex items-center gap-3">
          {/* Availability indicator — moved here from the hero card */}
          <div className="hidden xl:flex items-center gap-2 rounded-full border border-brand-off-gray bg-white/70 px-3.5 py-2 backdrop-blur-sm">
            <Pulse color="rgb(34, 197, 94)" />
            <span className="dm-p14-semi text-brand-black/70">Available for new projects</span>
          </div>
          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} className="hidden lg:block">
            <Link
              to="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-brand-orange px-6 py-3 dm-p14-semi text-brand-white uppercase tracking-[0.5px] max-w-[200px]"
            >
              Contact Us
            </Link>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <button
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-brand-off-gray bg-brand-white/90 p-2 text-brand-black shadow-[0_8px_24px_rgba(36,16,6,0.08)] lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation"
            aria-expanded={isOpen}
          >
            <span className={`block w-5 h-0.5 bg-current transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-current transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-current transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden w-full pt-4"
          >
            <nav className="flex flex-col items-center gap-2 rounded-2xl border border-brand-off-gray bg-brand-white p-4 shadow-lg">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={link.to === '/' ? goHome : () => setIsOpen(false)}
                  className={({ isActive }) =>
                    `w-full text-center rounded-full px-4 py-3 text-lg font-medium transition-colors duration-300 ${
                      isActive ? 'bg-brand-orange text-brand-white' : 'text-brand-black/70 hover:bg-brand-orange/10'
                    }`
                  }
                  end={link.to === '/'}
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/#contact"
                onClick={() => setIsOpen(false)}
                className="w-full mt-2 inline-flex items-center justify-center rounded-full bg-brand-black px-6 py-4 dm-p14-semi text-brand-white uppercase tracking-[0.5px]"
              >
                Contact Us
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
