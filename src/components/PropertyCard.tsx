import { useState, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Users, Wifi, Wind, Tv, UtensilsCrossed, Car, Zap, Heart, Star } from 'lucide-react'
import type { Property } from '../data/properties'
import { SITE_CONFIG } from '../config/site'

const amenityIconMap: Record<string, React.ReactNode> = {
  'Wi-Fi': <Wifi size={12} />,
  'AC': <Wind size={12} />,
  'TV': <Tv size={12} />,
  'Full Kitchen': <UtensilsCrossed size={12} />,
  'Kitchenette': <UtensilsCrossed size={12} />,
  'Parking': <Car size={12} />,
  'Power Backup': <Zap size={12} />,
}

interface PropertyCardProps {
  property: Property
  rating?: number
  reviewsCount?: number
}

export function PropertyCard({ property, rating = 4.8, reviewsCount = 124 }: PropertyCardProps) {
  const [isLiked, setIsLiked] = useState(false)

  const toggleLike = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  return (
    <Link
      to={`/stays/${property.slug}`}
      className="card block group focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 rounded-2xl border border-sand/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
      aria-label={`View ${property.name}`}
    >
      {/* Image container */}
      <div className="relative aspect-[16/11] overflow-hidden bg-sand-light rounded-t-2xl">
        <img
          src={property.image}
          alt={`${property.name} interior`}
          className="property-card-img"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget
            target.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80'
          }}
        />

        {/* Gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-black/20 pointer-events-none" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span className="px-2.5 py-1 bg-forest/90 backdrop-blur-md text-white text-[11px] font-sans font-semibold rounded-md shadow-sm">
            {property.type}
          </span>

          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 bg-white/90 backdrop-blur-md text-[10px] font-sans font-medium text-charcoal/80 rounded border border-sand/50 shadow-sm">
              Demo
            </span>
            <button
              onClick={toggleLike}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all backdrop-blur-md shadow-sm ${
                isLiked
                  ? 'bg-red-500 text-white'
                  : 'bg-white/80 hover:bg-white text-charcoal/70 hover:text-red-500'
              }`}
              aria-label={isLiked ? 'Remove from wishlist' : 'Save to wishlist'}
            >
              <Heart size={15} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        {/* Bottom image overlay with rating */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between z-10 text-white">
          <div className="flex items-center gap-1 px-2 py-0.5 bg-black/50 backdrop-blur-md rounded-md text-xs font-sans">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            <span className="font-semibold">{rating}</span>
            <span className="text-white/70 text-[10px]">({reviewsCount})</span>
          </div>
          <span className="text-[11px] font-sans text-white/90 drop-shadow-sm font-medium">
            {property.bedrooms} Bed • {property.bathrooms} Bath
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h3 className="font-serif text-lg font-medium text-charcoal leading-snug group-hover:text-forest transition-colors mb-1">
          {property.name}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-charcoal/60 mb-3 font-sans">
          <MapPin size={12} className="text-sage flex-shrink-0" />
          <span>{property.area}, Hyderabad</span>
        </div>

        {/* Amenities */}
        <div className="flex items-center gap-1.5 flex-wrap mb-4">
          <span className="flex items-center gap-1 px-2 py-1 bg-ivory rounded text-[11px] font-sans text-charcoal/70 font-medium">
            <Users size={11} className="text-sage" />
            {property.guests} guests
          </span>
          {Object.keys(amenityIconMap)
            .filter((a) => property.amenities.includes(a))
            .slice(0, 3)
            .map((amenity) => (
              <span
                key={amenity}
                className="flex items-center gap-1 px-2 py-1 bg-ivory rounded text-[11px] font-sans text-charcoal/70"
              >
                {amenityIconMap[amenity]}
                {amenity}
              </span>
            ))}
        </div>

        {/* Price & action */}
        <div className="flex items-center justify-between pt-3 border-t border-sand/50">
          <div>
            <span className="font-serif text-xl font-bold text-charcoal">
              ₹{property.pricePerNight.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-charcoal/50 font-sans ml-1">/ night</span>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-sans font-semibold text-forest group-hover:translate-x-0.5 transition-transform">
            View Details →
          </span>
        </div>

        <p className="text-[10px] font-sans text-charcoal/40 mt-1.5">
          {SITE_CONFIG.demo.pricingNotice}
        </p>
      </div>
    </Link>
  )
}
