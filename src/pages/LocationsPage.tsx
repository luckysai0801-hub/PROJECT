import { Link } from 'react-router-dom'
import { MapPin, ArrowRight } from 'lucide-react'
import { LOCATIONS } from '../data/properties'
import { PageMeta } from '../components/PageMeta'

export function LocationsPage() {
  return (
    <>
      <PageMeta
        title="Our Locations"
        description="Pearl Homestays serviced apartments across Gachibowli, Kondapur, Madhapur, KPHB, and Gowlidoddy in Hyderabad."
      />

      <div className="pt-20 bg-ivory min-h-screen">
        {/* Page header */}
        <div className="bg-white border-b border-sand/60 py-14 text-center">
          <div className="max-w-2xl mx-auto px-4">
            <p className="section-label mb-3">Our Locations</p>
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal">Stays Across Hyderabad</h1>
            <p className="mt-4 text-charcoal/60 font-sans text-sm leading-relaxed">
              Well-connected, prime and IT-friendly locations for your comfortable stay.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Top 3 cards — large */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {LOCATIONS.slice(0, 3).map((loc) => (
              <LocationCard key={loc.slug} loc={loc} large />
            ))}
          </div>
          {/* Bottom 2 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:max-w-3xl">
            {LOCATIONS.slice(3).map((loc) => (
              <LocationCard key={loc.slug} loc={loc} large />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function LocationCard({ loc, large }: { loc: typeof LOCATIONS[0]; large?: boolean }) {
  return (
    <Link
      to={`/locations/${loc.slug}`}
      className="card group focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 rounded-xl"
      aria-label={`Explore ${loc.name}`}
    >
      <div className={`relative overflow-hidden ${large ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
        <img
          src={loc.image}
          alt={`${loc.name} area`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h2 className="font-serif text-xl text-white font-medium">{loc.name}</h2>
          <p className="text-white/70 text-xs font-sans mt-0.5">{loc.tagline}</p>
        </div>
      </div>
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-sm text-charcoal/60 font-sans">
          <MapPin size={13} className="text-sage" />
          <span>{loc.propertyCount} Apartments</span>
        </div>
        <span className="flex items-center gap-1 text-xs font-sans font-medium text-forest group-hover:gap-2 transition-all">
          Explore
          <ArrowRight size={13} />
        </span>
      </div>
    </Link>
  )
}

