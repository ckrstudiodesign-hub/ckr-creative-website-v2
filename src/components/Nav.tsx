import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

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
    <header className="w-full bg-brand-white/90 px-5 md:px-10 xl:px-[72px] py-3 md:py-5 sticky top-0 z-50 backdrop-blur-xl transition-all duration-300">
      <div className="relative w-full max-w-[1920px] mx-auto flex flex-row items-center justify-between gap-4 md:gap-8">
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
        <div className="lg:hidden absolute left-0 top-0 flex items-center">
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
        <div className="lg:hidden absolute left-1/2 top-0 -translate-x-1/2 flex items-center">
          <Link to="/" onClick={goHome} aria-label="CKR Creatives - home" className="shrink-0">
            <img
              src="/images/logo name.png"
              alt="CKR Creatives Text"
              className="h-[36px] w-auto object-contain drop-shadow-md"
            />
          </Link>
        </div>

        {/* Desktop/Tablet Navigation */}
        <nav className="nav-orbit hidden lg:flex flex-row items-center gap-8 rounded-full border border-brand-off-gray bg-brand-white/80 p-2.5 px-8 shadow-[0_18px_50px_rgba(0,0,0,0.06)]">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={link.to === '/' ? goHome : undefined}
              className={({ isActive }) =>
                `relative overflow-hidden rounded-full px-5 py-2.5 dm-p16-medium transition-colors duration-300 ${
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
            className="lg:hidden p-2 text-brand-black flex flex-col justify-center items-center gap-1.5 w-10 h-10 rounded-full border border-brand-off-gray bg-brand-white/80"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation"
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
