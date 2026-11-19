import { Link } from 'react-router-dom'
import { MapPin, Bed, Calendar, MessageCircle, Shield, Heart, Star } from 'lucide-react'
import { PageMeta } from '../components/PageMeta'
import { SITE_CONFIG } from '../config/site'

const PRINCIPLES = [
  {
    icon: <Heart size={22} className="text-sage" />,
    title: 'Our Mission',
    desc: 'To provide comfortable, fully furnished stays with a home-like experience across Hyderabad\'s most connected neighbourhoods.',
  },
  {
    icon: <Star size={22} className="text-sage" />,
    title: 'Our Vision',
    desc: 'To be Hyderabad\'s most trusted serviced apartment brand, known for quality, reliability, and genuine hospitality.',
  },
  {
    icon: <Shield size={22} className="text-sage" />,
    title: 'Why Choose Us',
    desc: 'Prime locations, modern amenities, and flexible stay options — we make every guest feel truly at home.',
  },
]

const WHY_FEATURES = [
  { icon: <MapPin size={20} />, label: 'Prime Locations' },
  { icon: <Bed size={20} />, label: 'Fully Furnished' },
  { icon: <Calendar size={20} />, label: 'Flexible Stays' },
  { icon: <Shield size={20} />, label: 'Secure & Safe' },
  { icon: <MessageCircle size={20} />, label: 'Dedicated Support' },
]

export function AboutPage() {
  return (
    <>
      <PageMeta
        title="About Pearl Homestays"
        description="Pearl Homestays offers modern, fully furnished service apartments across Hyderabad's most sought-after areas. Short stays, long stays, and everything in between."
      />

      <div className="pt-20 bg-ivory min-h-screen">
        {/* Hero section */}
        <div className="bg-white border-b border-sand/60 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="section-label mb-4">About Pearl Homestays</p>
                <h1 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight mb-6">
                  Comfort, Convenience<br />and Care
                </h1>
                <p className="text-charcoal/70 font-sans text-sm leading-relaxed mb-5">
                  Pearl Homestays offers modern, fully furnished service apartments across Hyderabad's most sought-after locations. 
                  Whether it's a short business trip, a family visit, or a long corporate stay, Pearl Homestays provides a 
                  home-like experience with hotel-level convenience.
                </p>
                <p className="text-charcoal/70 font-sans text-sm leading-relaxed mb-8">
                  We serve guests across five prime Hyderabad areas — Gachibowli, Kondapur, Madhapur, KPHB, and Gowlidoddy — 
                  with a range of 1BHK, 2BHK, and 3BHK apartments designed for comfort and functionality. Every apartment 
                  comes fully furnished, so you can move in and feel at home from day one.
                </p>
                <a
                  href={SITE_CONFIG.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <MessageCircle size={16} />
                  Enquire on WhatsApp
                </a>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-card-hover">
                  <img
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"
                    alt="Bright, comfortable Pearl Homestays apartment interior"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&q=80'
                    }}
                  />
                </div>
                {/* Accent block */}
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-sage/20 rounded-2xl -z-10" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-forest py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: '5+', label: 'Prime Locations' },
                { number: '30+', label: 'Apartments' },
                { number: '1,000+', label: 'Happy Stays' },
                { number: 'Flexible', label: 'Short & Long Stays' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-3xl md:text-4xl text-white mb-1">{stat.number}</p>
                  <p className="text-sm font-sans text-white/60">{stat.label}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-xs font-sans text-white/40 mt-6">
              Approximate figures for illustration. Actual counts may vary.
            </p>
          </div>
        </div>

        {/* Mission, Vision, Why */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Our Principles</p>
            <h2 className="section-title">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="bg-white rounded-xl p-6 shadow-card">
                <div className="w-11 h-11 bg-ivory rounded-xl flex items-center justify-center mb-4">
                  {p.icon}
                </div>
                <h3 className="font-serif text-lg text-charcoal mb-2">{p.title}</h3>
                <p className="text-sm font-sans text-charcoal/60 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white py-16 border-y border-sand/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="section-title">Why Choose Pearl Homestays?</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {WHY_FEATURES.map((f) => (
                <div key={f.label} className="flex flex-col items-center gap-3 w-28 md:w-32">
                  <div className="w-14 h-14 bg-ivory rounded-2xl flex items-center justify-center text-sage">
                    {f.icon}
                  </div>
                  <span className="text-sm font-sans font-medium text-charcoal text-center">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Service Areas */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <p className="section-label mb-3">Where We Operate</p>
            <h2 className="section-title">Our Service Areas</h2>
            <p className="mt-4 text-charcoal/60 font-sans text-sm max-w-md mx-auto">
              We currently operate across five prime locations in Hyderabad, with more areas being explored.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {SITE_CONFIG.areas.map((area) => (
              <Link
                key={area}
                to={`/locations/${area.toLowerCase()}`}
                className="flex items-center gap-2 px-5 py-3 bg-white rounded-xl border border-sand/60 hover:border-forest/30 hover:bg-ivory transition-colors text-sm font-sans font-medium text-charcoal shadow-card"
              >
                <MapPin size={14} className="text-sage" />
                {area}
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-sand-light py-14">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl text-charcoal mb-4">Ready to Find Your Stay?</h2>
            <p className="text-charcoal/60 font-sans text-sm mb-8 max-w-sm mx-auto">
              Browse our demo listings across Hyderabad and find an apartment that feels like home.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/stays" className="btn-primary">
                Explore Stays
              </Link>
              <Link to="/contact" className="btn-outline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

