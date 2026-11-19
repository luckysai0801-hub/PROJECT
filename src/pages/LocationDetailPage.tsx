import { useParams, Link } from 'react-router-dom'
import { MapPin, ArrowRight } from 'lucide-react'
import { getLocationBySlug, getPropertiesByArea } from '../data/properties'
import { PropertyCard } from '../components/PropertyCard'
import { Breadcrumb } from '../components/Breadcrumb'
import { PageMeta } from '../components/PageMeta'

export function LocationDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const location = slug ? getLocationBySlug(slug) : undefined
  const properties = slug ? getPropertiesByArea(slug) : []

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 pb-16">
        <div className="text-center px-4">
          <div className="text-6xl mb-4">📍</div>
          <h1 className="font-serif text-3xl text-charcoal mb-3">Location Not Found</h1>
          <p className="text-charcoal/60 font-sans text-sm mb-6">
            We couldn't find this location in our demo data.
          </p>
          <Link to="/locations" className="btn-primary">← All Locations</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <PageMeta
        title={`${location.name} Serviced Apartments`}
        description={`Pearl Homestays in ${location.name}, Hyderabad — ${location.tagline}. Browse fully furnished 1BHK, 2BHK, and 3BHK apartments.`}
      />

      <div className="pt-20 bg-ivory min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb
            items={[
              { label: 'Locations', to: '/locations' },
              { label: location.name },
            ]}
          />
        </div>

        {/* Hero */}
        <div className="relative h-72 md:h-96 overflow-hidden">
          <img
            src={location.image}
            alt={`${location.name}, Hyderabad`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 to-charcoal/30" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2 text-white/70 text-sm font-sans mb-3">
                <MapPin size={14} />
                <span>Hyderabad, Telangana</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl text-white mb-2">{location.name}</h1>
              <p className="text-white/80 text-base font-sans">{location.tagline}</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Description */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-card sticky top-24">
                <h2 className="font-serif text-xl text-charcoal mb-4">About {location.name}</h2>
                <p className="text-sm font-sans text-charcoal/70 leading-relaxed">
                  {location.description}
                </p>
                <div className="mt-5 pt-5 border-t border-sand/60">
                  <div className="flex items-center gap-2 text-sm text-charcoal/60 font-sans">
                    <MapPin size={14} className="text-sage" />
                    <span>{location.propertyCount} apartments available</span>
                  </div>
                </div>
                <Link
                  to={`/stays?location=${location.name}`}
                  className="mt-4 flex items-center gap-2 text-sm font-sans font-medium text-forest hover:underline"
                >
                  View all stays in {location.name}
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Properties */}
            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl text-charcoal mb-6">
                Stays in {location.name}
                <span className="text-sm font-sans font-normal text-charcoal/40 ml-3">
                  ({properties.length} demo listing{properties.length !== 1 ? 's' : ''})
                </span>
              </h2>

              {properties.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl border border-sand/60">
                  <div className="text-4xl mb-3">🏠</div>
                  <p className="text-charcoal/60 font-sans text-sm">
                    No demo listings for this area yet.
                  </p>
                  <Link to="/stays" className="mt-4 btn-outline inline-flex">
                    Browse All Stays
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              )}

              <div className="mt-8 text-center">
                <Link to="/stays" className="btn-outline">
                  Explore All Stays →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

