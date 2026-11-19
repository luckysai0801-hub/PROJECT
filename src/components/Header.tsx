import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, MessageCircle } from 'lucide-react'
import { Logo } from './Logo'
import { SITE_CONFIG } from '../config/site'

const locations = [
  { label: 'Gachibowli', slug: 'gachibowli' },
  { label: 'Kondapur', slug: 'kondapur' },
  { label: 'Madhapur', slug: 'madhapur' },
  { label: 'KPHB', slug: 'kphb' },
  { label: 'Gowlidoddy', slug: 'gowlidoddy' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [locationDropOpen, setLocationDropOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dropRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  const isHome = location.pathname === '/'
  const isTransparent = isHome && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setLocationDropOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
    setLocationDropOpen(false)
  }, [location.pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? 'bg-gradient-to-b from-black/70 via-black/30 to-transparent py-2'
          : 'bg-white/95 backdrop-blur-md shadow-sm border-b border-sand/60 py-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 md:h-20">
          {/* Logo */}
          <Logo variant={isTransparent ? 'light' : 'dark'} size="md" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-9" aria-label="Main navigation">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `text-sm font-sans font-medium transition-colors relative py-1 ${
                  isTransparent
                    ? isActive
                      ? 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white'
                      : 'text-white/85 hover:text-white'
                    : isActive
                    ? 'text-charcoal font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-forest'
                    : 'text-charcoal/75 hover:text-charcoal'
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/stays"
              className={({ isActive }) =>
                `text-sm font-sans font-medium transition-colors relative py-1 ${
                  isTransparent
                    ? isActive
                      ? 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white'
                      : 'text-white/85 hover:text-white'
                    : isActive
                    ? 'text-charcoal font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-forest'
                    : 'text-charcoal/75 hover:text-charcoal'
                }`
              }
            >
              Explore Stays
            </NavLink>

            {/* Locations Dropdown */}
            <div ref={dropRef} className="relative">
              <button
                className={`text-sm font-sans font-medium transition-colors flex items-center gap-1.5 py-1 ${
                  isTransparent
                    ? 'text-white/85 hover:text-white'
                    : 'text-charcoal/75 hover:text-charcoal'
                }`}
                onClick={() => setLocationDropOpen((v) => !v)}
                aria-expanded={locationDropOpen}
                aria-haspopup="true"
              >
                <span>Locations</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${locationDropOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {locationDropOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-sand/70 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link
                    to="/locations"
                    className="block px-4 py-2.5 text-xs font-sans font-semibold tracking-wider uppercase text-charcoal/50 hover:bg-ivory hover:text-forest transition-colors border-b border-sand/40 mb-1"
                    onClick={() => setLocationDropOpen(false)}
                  >
                    View All Locations →
                  </Link>
                  {locations.map((loc) => (
                    <Link
                      key={loc.slug}
                      to={`/locations/${loc.slug}`}
                      className="block px-4 py-2 text-sm font-sans text-charcoal/80 hover:bg-ivory hover:text-charcoal transition-colors"
                      onClick={() => setLocationDropOpen(false)}
                    >
                      {loc.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-sm font-sans font-medium transition-colors relative py-1 ${
                  isTransparent
                    ? isActive
                      ? 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white'
                      : 'text-white/85 hover:text-white'
                    : isActive
                    ? 'text-charcoal font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-forest'
                    : 'text-charcoal/75 hover:text-charcoal'
                }`
              }
            >
              About Us
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-sm font-sans font-medium transition-colors relative py-1 ${
                  isTransparent
                    ? isActive
                      ? 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white'
                      : 'text-white/85 hover:text-white'
                    : isActive
                    ? 'text-charcoal font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-forest'
                    : 'text-charcoal/75 hover:text-charcoal'
                }`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href={SITE_CONFIG.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-sans font-medium transition-all shadow-sm ${
                isTransparent
                  ? 'bg-white text-forest hover:bg-sand-light active:scale-95'
                  : 'bg-forest text-white hover:bg-forest-light active:scale-95'
              }`}
              aria-label="Enquire on WhatsApp"
            >
              <MessageCircle size={15} />
              <span>Enquire Now</span>
            </a>

            <button
              className={`md:hidden p-2 rounded-xl transition-colors ${
                isTransparent ? 'text-white hover:bg-white/20' : 'text-charcoal hover:bg-ivory'
              }`}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 top-18 z-40 bg-white overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <nav className="max-w-7xl mx-auto px-5 py-6 flex flex-col gap-1">
            <Link
              to="/"
              className="px-4 py-3.5 text-base font-sans font-medium text-charcoal hover:bg-ivory rounded-xl transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/stays"
              className="px-4 py-3.5 text-base font-sans font-medium text-charcoal hover:bg-ivory rounded-xl transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Explore Stays
            </Link>
            <Link
              to="/locations"
              className="px-4 py-3.5 text-base font-sans font-medium text-charcoal hover:bg-ivory rounded-xl transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              All Locations
            </Link>
            <div className="pl-4 flex flex-col gap-0.5">
              {locations.map((loc) => (
                <Link
                  key={loc.slug}
                  to={`/locations/${loc.slug}`}
                  className="px-4 py-2.5 text-sm font-sans text-charcoal/70 hover:bg-ivory hover:text-charcoal rounded-xl transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  — {loc.label}
                </Link>
              ))}
            </div>
            <Link
              to="/about"
              className="px-4 py-3.5 text-base font-sans font-medium text-charcoal hover:bg-ivory rounded-xl transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="px-4 py-3.5 text-base font-sans font-medium text-charcoal hover:bg-ivory rounded-xl transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </Link>

            <div className="mt-4 pt-4 border-t border-sand">
              <a
                href={SITE_CONFIG.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full justify-center py-3.5"
                onClick={() => setMobileOpen(false)}
              >
                <MessageCircle size={16} />
                Enquire on WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
