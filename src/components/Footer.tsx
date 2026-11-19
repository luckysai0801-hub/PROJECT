import { Link } from 'react-router-dom'
import { MessageCircle, Instagram, Facebook, Twitter, MapPin, Phone } from 'lucide-react'
import { Logo } from './Logo'
import { SITE_CONFIG } from '../config/site'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo variant="light" size="md" />
            <p className="mt-5 text-sm text-white/60 leading-relaxed max-w-xs">
              Modern, fully furnished service apartments across Hyderabad's prime locations. 
              Short stays or long stays — your home away from home.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-white/50 hover:bg-white/10 transition-colors"
                aria-label="Follow on Instagram"
              >
                <Instagram size={15} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-white/50 hover:bg-white/10 transition-colors"
                aria-label="Follow on Facebook"
              >
                <Facebook size={15} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-white/50 hover:bg-white/10 transition-colors"
                aria-label="Follow on Twitter"
              >
                <Twitter size={15} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-sans text-xs font-semibold tracking-[0.15em] uppercase text-white/40 mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'Explore Stays', to: '/stays' },
                { label: 'All Locations', to: '/locations' },
                { label: 'About Us', to: '/about' },
                { label: 'Contact', to: '/contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="font-sans text-xs font-semibold tracking-[0.15em] uppercase text-white/40 mb-5">
              Our Locations
            </h3>
            <ul className="space-y-3">
              {SITE_CONFIG.areas.map((area) => (
                <li key={area}>
                  <Link
                    to={`/locations/${area.toLowerCase()}`}
                    className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <MapPin size={12} className="text-sage flex-shrink-0" />
                    {area}, Hyderabad
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-sans text-xs font-semibold tracking-[0.15em] uppercase text-white/40 mb-5">
              Get in Touch
            </h3>
            <div className="space-y-4">
              <a
                href={SITE_CONFIG.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors group"
              >
                <span className="w-8 h-8 rounded-full bg-[#25D366]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#25D366]/30 transition-colors">
                  <MessageCircle size={14} className="text-[#25D366]" />
                </span>
                {SITE_CONFIG.contact.whatsappDisplay}
              </a>
              {SITE_CONFIG.contact.phone && (
                <div className="flex items-center gap-3 text-sm text-white/60">
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Phone size={14} />
                  </span>
                  {SITE_CONFIG.contact.phone}
                </div>
              )}
              <div className="flex items-start gap-3 text-sm text-white/60">
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={14} />
                </span>
                <span>
                  Serviced Apartments across<br />
                  Hyderabad, Telangana
                </span>
              </div>
            </div>

            <div className="mt-6">
              <a
                href={SITE_CONFIG.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white text-sm font-sans font-medium rounded-lg hover:bg-[#1ebe5a] transition-colors"
              >
                <MessageCircle size={15} />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {year} Pearl Homestays. All rights reserved.</p>
          <p className="text-center sm:text-right">
            This is a demo website. All listings and prices are illustrative only.
          </p>
        </div>
      </div>
    </footer>
  )
}

