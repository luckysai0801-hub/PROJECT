import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  MapPin, Users, Bed, Bath, Wifi, Wind, Tv, UtensilsCrossed,
  Car, Zap, ChevronLeft, ChevronRight, MessageCircle, Share2, X,
  CheckCircle2, Info
} from 'lucide-react'
import { getPropertyBySlug } from '../data/properties'
import { Breadcrumb } from '../components/Breadcrumb'
import { PageMeta } from '../components/PageMeta'
import { SITE_CONFIG, WHATSAPP_ENQUIRY_URL } from '../config/site'

const amenityIconMap: Record<string, React.ReactNode> = {
  'Wi-Fi': <Wifi size={16} />,
  'AC': <Wind size={16} />,
  'TV': <Tv size={16} />,
  'Full Kitchen': <UtensilsCrossed size={16} />,
  'Kitchenette': <UtensilsCrossed size={16} />,
  'Parking': <Car size={16} />,
  'Power Backup': <Zap size={16} />,
  'Housekeeping': <CheckCircle2 size={16} />,
  'Washing Machine': <CheckCircle2 size={16} />,
  'Lift': <ChevronRight size={16} />,
}

export function PropertyPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const property = slug ? getPropertyBySlug(slug) : undefined

  const [galleryIndex, setGalleryIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'amenities' | 'policies'>('overview')

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 pb-16">
        <div className="text-center px-4">
          <div className="text-6xl mb-4">🏠</div>
          <h1 className="font-serif text-3xl text-charcoal mb-3">Property Not Found</h1>
          <p className="text-charcoal/60 font-sans text-sm mb-6">
            We couldn't find this listing. It may have been removed from our demo data.
          </p>
          <Link to="/stays" className="btn-primary">← Browse All Stays</Link>
        </div>
      </div>
    )
  }

  const prevImage = () => setGalleryIndex((i) => Math.max(0, i - 1))
  const nextImage = () => setGalleryIndex((i) => Math.min(property.images.length - 1, i + 1))

  const whatsappMsg = `Hi, I'm interested in ${property.name} in ${property.area}. Could you share more details?`

  return (
    <>
      <PageMeta
        title={property.name}
        description={`${property.type} serviced apartment in ${property.area}, Hyderabad. ${property.guests} guests, ${property.bedrooms} bedroom(s). ${property.description.slice(0, 120)}`}
      />

      <div className="pt-20 bg-ivory min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: 'Explore Stays', to: '/stays' },
              { label: property.area, to: `/locations/${property.areaSlug}` },
              { label: property.name },
            ]}
          />

          {/* Demo notice */}
          <div className="mt-4 flex items-center gap-2 px-3 py-2 bg-sand/50 rounded-lg border border-sand w-fit">
            <Info size={13} className="text-charcoal/50 flex-shrink-0" />
            <p className="text-xs font-sans text-charcoal/60">{SITE_CONFIG.demo.notice}</p>
          </div>

          {/* Gallery */}
          <div className="mt-6 grid grid-cols-4 gap-3 rounded-2xl overflow-hidden" style={{ height: 420 }}>
            {/* Main image */}
            <div
              className="col-span-4 md:col-span-2 lg:col-span-2 relative cursor-pointer group"
              onClick={() => setLightboxOpen(true)}
            >
              <img
                src={property.images[galleryIndex]}
                alt={`${property.name} — photo ${galleryIndex + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80'
                }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              {/* Nav arrows */}
              <div className="absolute inset-0 flex items-center justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage() }}
                  disabled={galleryIndex === 0}
                  className="w-9 h-9 bg-white/80 rounded-full flex items-center justify-center disabled:opacity-30 hover:bg-white transition-colors shadow-sm"
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage() }}
                  disabled={galleryIndex === property.images.length - 1}
                  className="w-9 h-9 bg-white/80 rounded-full flex items-center justify-center disabled:opacity-30 hover:bg-white transition-colors shadow-sm"
                  aria-label="Next photo"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
              {/* Photo count */}
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxOpen(true) }}
                className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 rounded-lg text-xs font-sans font-medium text-charcoal shadow-sm hover:bg-white transition-colors"
              >
                View All Photos ({property.images.length})
              </button>
            </div>

            {/* Thumbnails */}
            <div className="hidden md:grid col-span-2 grid-cols-2 gap-3">
              {property.images.slice(0, 4).map((img, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden cursor-pointer rounded-lg ${
                    i === galleryIndex ? 'ring-2 ring-forest' : ''
                  }`}
                  onClick={() => setGalleryIndex(i)}
                >
                  <img
                    src={img}
                    alt={`${property.name} — thumbnail ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80'
                    }}
                  />
                  {i === 3 && property.images.length > 4 && (
                    <div
                      className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer"
                      onClick={() => setLightboxOpen(true)}
                    >
                      <span className="text-white font-sans text-sm font-medium">
                        +{property.images.length - 4} More
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Lightbox */}
          {lightboxOpen && (
            <div
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              role="dialog"
              aria-modal="true"
              aria-label="Photo gallery"
            >
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                aria-label="Close gallery"
              >
                <X size={20} className="text-white" />
              </button>
              <button
                onClick={prevImage}
                disabled={galleryIndex === 0}
                className="absolute left-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center disabled:opacity-30 hover:bg-white/30 transition-colors"
                aria-label="Previous photo"
              >
                <ChevronLeft size={20} className="text-white" />
              </button>
              <img
                src={property.images[galleryIndex]}
                alt={`${property.name} — photo ${galleryIndex + 1}`}
                className="max-h-[85vh] max-w-full object-contain rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80'
                }}
              />
              <button
                onClick={nextImage}
                disabled={galleryIndex === property.images.length - 1}
                className="absolute right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center disabled:opacity-30 hover:bg-white/30 transition-colors"
                aria-label="Next photo"
              >
                <ChevronRight size={20} className="text-white" />
              </button>
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 font-sans text-sm">
                {galleryIndex + 1} / {property.images.length}
              </p>
            </div>
          )}

          {/* Main content */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="font-serif text-3xl md:text-4xl text-charcoal leading-tight">
                    {property.name}
                  </h1>
                  <div className="flex items-center gap-1.5 mt-2 text-sm text-charcoal/60 font-sans">
                    <MapPin size={14} className="text-sage" />
                    <span>{property.area}, Hyderabad</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => navigator.share?.({ title: property.name, url: window.location.href })}
                    className="w-10 h-10 rounded-full border border-sand flex items-center justify-center hover:bg-ivory transition-colors"
                    aria-label="Share property"
                  >
                    <Share2 size={15} />
                  </button>
                </div>
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-4 py-4 border-y border-sand/60">
                {[
                  { icon: <span className="text-sm font-semibold">{property.type}</span>, label: 'BHK Type' },
                  { icon: <Users size={18} className="text-sage" />, label: `${property.guests} Guests` },
                  { icon: <Bed size={18} className="text-sage" />, label: `${property.bedrooms} Bedroom${property.bedrooms !== 1 ? 's' : ''}` },
                  { icon: <Bath size={18} className="text-sage" />, label: `${property.bathrooms} Bathroom${property.bathrooms !== 1 ? 's' : ''}` },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm font-sans text-charcoal/70">
                    {stat.icon}
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <div>
                <div className="flex gap-0 border-b border-sand/60">
                  {(['overview', 'amenities', 'policies'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-5 py-3 text-sm font-sans font-medium capitalize transition-colors border-b-2 -mb-px ${
                        activeTab === tab
                          ? 'border-forest text-charcoal'
                          : 'border-transparent text-charcoal/50 hover:text-charcoal'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="mt-6">
                  {activeTab === 'overview' && (
                    <div>
                      <p className="text-charcoal/70 font-sans text-sm leading-relaxed mb-5">
                        {property.description}
                      </p>
                      <h3 className="font-sans font-semibold text-sm text-charcoal mb-3">Highlights</h3>
                      <ul className="space-y-2">
                        {property.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2.5 text-sm font-sans text-charcoal/70">
                            <CheckCircle2 size={15} className="text-forest flex-shrink-0 mt-0.5" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === 'amenities' && (
                    <div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {property.amenities.map((amenity) => (
                          <div
                            key={amenity}
                            className="flex items-center gap-2.5 px-3 py-3 bg-white rounded-lg border border-sand/60 text-sm font-sans text-charcoal/70"
                          >
                            <span className="text-sage">
                              {amenityIconMap[amenity] || <CheckCircle2 size={16} />}
                            </span>
                            {amenity}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'policies' && (
                    <div>
                      <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-sand/40 rounded-lg">
                        <Info size={13} className="text-charcoal/50 flex-shrink-0" />
                        <p className="text-xs font-sans text-charcoal/60">
                          Demo policies — illustrative copy, not confirmed terms
                        </p>
                      </div>
                      <ul className="space-y-3">
                        {property.houseRules.map((rule) => (
                          <li key={rule} className="flex items-start gap-2.5 text-sm font-sans text-charcoal/70">
                            <span className="w-1.5 h-1.5 rounded-full bg-sage flex-shrink-0 mt-2" />
                            {rule}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Booking panel */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-2xl border border-sand/60 shadow-card overflow-hidden">
                <div className="p-5 border-b border-sand/60">
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-3xl font-semibold text-charcoal">
                      ₹{property.pricePerNight.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm font-sans text-charcoal/50">/ night</span>
                  </div>
                  <p className="text-[10px] font-sans text-charcoal/40 mt-0.5">{SITE_CONFIG.demo.pricingNotice}</p>
                </div>

                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="form-label" htmlFor="pd-checkin">Check-in</label>
                      <input
                        id="pd-checkin"
                        type="date"
                        className="form-input text-sm"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="pd-checkout">Check-out</label>
                      <input
                        id="pd-checkout"
                        type="date"
                        className="form-input text-sm"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="form-label" htmlFor="pd-guests">Guests</label>
                    <select id="pd-guests" className="form-input text-sm">
                      {Array.from({ length: property.guests }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>{n} Guest{n !== 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={() => navigate(`/booking/${property.slug}`)}
                    className="btn-primary w-full justify-center text-sm py-3"
                  >
                    Preview Booking (Demo)
                  </button>

                  <a
                    href={WHATSAPP_ENQUIRY_URL(whatsappMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp w-full justify-center text-sm py-3 inline-flex"
                  >
                    <MessageCircle size={16} />
                    Enquire on WhatsApp
                  </a>

                  <div className="flex items-center gap-2 px-3 py-2.5 bg-sand/40 rounded-lg">
                    <Info size={13} className="text-charcoal/50 flex-shrink-0" />
                    <p className="text-xs font-sans text-charcoal/60">
                      {SITE_CONFIG.demo.bookingNotice}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

