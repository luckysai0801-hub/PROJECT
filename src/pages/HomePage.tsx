import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Bed, Wifi, MapPin, ShieldCheck, Calendar,
  ArrowUpRight, ChevronLeft, ChevronRight, Play, X,
  CheckCircle2
} from 'lucide-react'
import { SearchPanel } from '../components/SearchPanel'
import { PropertyCard } from '../components/PropertyCard'
import { PageMeta } from '../components/PageMeta'
import { LOCATIONS, PROPERTIES } from '../data/properties'

const FEATURES = [
  { icon: <Bed size={22} />, title: 'Fully Furnished Homes', desc: 'Move in and feel at home' },
  { icon: <Wifi size={22} />, title: 'High-Speed Wi-Fi', desc: 'Stay connected always' },
  { icon: <MapPin size={22} />, title: 'Prime Locations', desc: 'Gachibowli, Kondapur & more' },
  { icon: <ShieldCheck size={22} />, title: 'Safe & Secure', desc: 'Verified, well-maintained stays' },
  { icon: <Calendar size={22} />, title: 'Flexible Stays', desc: 'Short or long-term options' },
]

export function HomePage() {
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [tourOpen, setTourOpen] = useState(false)

  // Top featured stays matching the layout
  const featuredProperties = PROPERTIES.filter((p) => p.featured || ['g1', 'k2', 'm2', 'kp1'].includes(p.id))

  const cardsPerPage = 4
  const maxIndex = Math.max(0, featuredProperties.length - cardsPerPage)

  const handlePrev = () => setCarouselIndex((i) => Math.max(0, i - 1))
  const handleNext = () => setCarouselIndex((i) => Math.min(maxIndex, i + 1))

  return (
    <>
      <PageMeta
        title="Pearl Homestays — Serviced Apartments in Hyderabad"
        description="Modern, fully furnished service apartments across Hyderabad's prime locations: Gachibowli, Kondapur, Madhapur, KPHB, and Gowlidoddy. Stay short-term or long-term."
      />

      {/* ============================================================
          1. HERO SECTION (100% Matching 01-homepage-concept.png)
      ============================================================ */}
      <section className="relative overflow-visible bg-charcoal" aria-label="Hero">
        {/* Background living room photograph with left gradient */}
        <div className="relative min-h-[580px] lg:min-h-[640px] flex items-center">
          <div className="absolute inset-0 z-0">
            <img
              src="/images/hero_bg.jpg"
              alt="Pearl Homestays luxury serviced apartment living room in Hyderabad"
              className="w-full h-full object-cover object-center"
              fetchPriority="high"
            />
            {/* Soft vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
          </div>

          {/* Hero Content (Left-aligned) */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-20">
            <div className="max-w-xl">
              {/* Eyebrow */}
              <p className="text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-sand mb-4">
                SERVICED APARTMENTS IN HYDERABAD
              </p>

              {/* Editorial Serif Headline */}
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-[68px] text-white leading-[1.08] mb-5 tracking-tight font-normal">
                Your Home,<br />
                Away From Home
              </h1>

              {/* Subheading */}
              <p className="text-white/85 text-sm sm:text-base leading-relaxed mb-8 max-w-lg font-sans font-normal">
                Modern, fully furnished service apartments across Hyderabad's prime locations. Stay short-term or long-term with the comfort, privacy and convenience you deserve.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/stays"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white hover:bg-sand-light text-forest text-sm font-sans font-semibold rounded-xl shadow-lg transition-all active:scale-95"
                >
                  <Bed size={17} className="text-forest" />
                  <span>Explore Stays</span>
                  <span>→</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setTourOpen(true)}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-black/25 hover:bg-black/40 text-white backdrop-blur-md text-sm font-sans font-medium rounded-xl border border-white/30 transition-all active:scale-95"
                >
                  <div className="w-5 h-5 rounded-full border border-white/70 flex items-center justify-center">
                    <Play size={10} className="fill-white text-white ml-0.5" />
                  </div>
                  <span>Watch Tour</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Search Console (Overlapping hero bottom & features strip) */}
        <div className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 -mt-10 sm:-mt-12">
          <SearchPanel />
        </div>
      </section>

      {/* ============================================================
          2. FEATURES STRIP (Directly below Search Console)
      ============================================================ */}
      <section className="bg-white border-b border-sand/50 pt-16 pb-8" aria-label="Key features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-0 md:divide-x divide-sand/50">
            {FEATURES.map((f, i) => (
              <div key={i} className="flex items-center gap-3.5 md:justify-center md:px-5 py-2">
                <div className="text-forest flex-shrink-0">
                  {f.icon}
                </div>
                <div>
                  <p className="text-sm font-sans font-bold text-charcoal leading-tight">{f.title}</p>
                  <p className="text-xs font-sans text-charcoal/50 mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          3. EXPLORE BY LOCATION (Matching 01-homepage-concept.png)
      ============================================================ */}
      <section className="py-20 bg-ivory" aria-label="Explore by location">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left side text block (~3.5 cols) */}
            <div className="lg:col-span-4 xl:col-span-3">
              <p className="text-xs font-sans font-bold tracking-[0.18em] uppercase text-sage mb-2.5">
                EXPLORE BY LOCATION
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal leading-tight mb-4">
                Our Stay Locations<br />
                in Hyderabad
              </h2>
              <p className="text-charcoal/60 font-sans text-sm leading-relaxed mb-6 max-w-sm">
                Well-connected, prime and IT-friendly locations across the city.
              </p>

              <Link
                to="/locations"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-sand hover:border-forest text-forest rounded-full font-sans text-xs font-semibold transition-all hover:bg-forest hover:text-white shadow-sm"
              >
                <span>View All Locations</span>
                <span>→</span>
              </Link>
            </div>

            {/* Right side 5 Location Cards (~8.5 cols) */}
            <div className="lg:col-span-8 xl:col-span-9 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
              {LOCATIONS.map((loc) => (
                <Link
                  key={loc.slug}
                  to={`/locations/${loc.slug}`}
                  className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-charcoal shadow-card hover:shadow-card-hover transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-forest"
                  aria-label={`Explore stays in ${loc.name}`}
                >
                  {/* Real building photograph from reference */}
                  <img
                    src={loc.image}
                    alt={`${loc.name}, Hyderabad`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/25 to-black/20" />

                  {/* Circular white arrow up-right badge */}
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-charcoal transition-all duration-300 group-hover:bg-white group-hover:scale-105">
                    <ArrowUpRight size={14} className="text-charcoal" />
                  </div>

                  {/* Bottom text */}
                  <div className="absolute bottom-0 left-0 right-0 p-3.5">
                    <h3 className="font-serif text-base font-semibold text-white leading-tight mb-0.5">
                      {loc.name}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] text-white/80 font-sans">
                      <MapPin size={11} className="text-sand" />
                      <span>{loc.propertyCount} Stays</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          4. FEATURED STAYS ("Handpicked Apartments for Your Stay")
      ============================================================ */}
      <section className="py-20 bg-white" aria-label="Featured apartments">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-sans font-bold tracking-[0.18em] uppercase text-sage mb-2">
                FEATURED STAYS
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal">
                Handpicked Apartments for Your Stay
              </h2>
            </div>

            {/* Pagination buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={carouselIndex === 0}
                className="w-9 h-9 rounded-full border border-sand flex items-center justify-center hover:bg-ivory disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-charcoal"
                aria-label="Previous stays"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                disabled={carouselIndex >= maxIndex}
                className="w-9 h-9 rounded-full border border-sand flex items-center justify-center hover:bg-ivory disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-charcoal"
                aria-label="Next stays"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties
              .slice(carouselIndex, carouselIndex + cardsPerPage)
              .map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          5. IDEAL FOR WORK, TRAVEL & EXTENDED STAYS
          (Matching 03-page-layout-overview.png)
      ============================================================ */}
      <section className="py-20 bg-ivory border-t border-sand/50" aria-label="Extended stay highlight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Image */}
            <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-card">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=80"
                alt="Modern serviced apartment with stylish sofa and comfortable ambience"
                className="w-full h-full object-cover min-h-[340px]"
                loading="lazy"
              />
            </div>

            {/* Right Forest Green Card */}
            <div className="lg:col-span-6 bg-forest text-white rounded-3xl p-8 sm:p-12 flex flex-col justify-center shadow-xl">
              <h2 className="font-serif text-3xl sm:text-4xl text-white leading-tight mb-8">
                Ideal for Work, Travel<br />
                & Extended Stays
              </h2>

              <ul className="space-y-4 mb-10">
                {[
                  'Fully Equipped Apartments',
                  'Housekeeping Support',
                  'High-Speed Internet',
                  'Flexible Stay Durations',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm sm:text-base font-sans text-white/90">
                    <CheckCircle2 size={18} className="text-sand-light flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div>
                <Link
                  to="/stays"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-forest hover:bg-sand-light font-sans text-sm font-semibold rounded-xl shadow-md transition-all active:scale-95"
                >
                  <span>Explore Stays</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          6. VIRTUAL TOUR MODAL
      ============================================================ */}
      {tourOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Virtual apartment tour"
        >
          <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-sand/60 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl text-charcoal">Virtual Property Tour</h3>
                <p className="text-xs font-sans text-charcoal/60 mt-0.5">Explore the interior quality of Pearl Homestays</p>
              </div>
              <button
                onClick={() => setTourOpen(false)}
                className="w-10 h-10 rounded-full bg-ivory flex items-center justify-center text-charcoal hover:bg-sand/50 transition-colors"
                aria-label="Close tour"
              >
                <X size={20} />
              </button>
            </div>

            <div className="aspect-[16/9] relative overflow-hidden bg-charcoal">
              <img
                src="/images/hero_bg.jpg"
                alt="Full panoramic view of a Pearl Homestay apartment"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md rounded-2xl p-4 text-white">
                <p className="font-serif text-lg font-medium">Executive Living Room & Dining Suite</p>
                <p className="text-xs font-sans text-white/80 mt-1">
                  All Pearl Homestay units feature floor-to-ceiling natural lighting, premium wooden furnishings, air conditioning, and high-speed Wi-Fi.
                </p>
              </div>
            </div>

            <div className="p-6 bg-ivory flex items-center justify-between">
              <span className="text-xs font-sans text-charcoal/60">Demo interactive walkthrough</span>
              <div className="flex gap-3">
                <button
                  onClick={() => setTourOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-sand text-charcoal text-xs font-sans font-semibold hover:bg-white transition-colors"
                >
                  Close
                </button>
                <Link
                  to="/stays"
                  className="btn-primary text-xs py-2.5 px-6"
                  onClick={() => setTourOpen(false)}
                >
                  Browse Stays →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
