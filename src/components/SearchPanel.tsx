import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Calendar, Users, Search, ChevronDown } from 'lucide-react'

interface SearchPanelProps {
  initialLocation?: string
  initialCheckin?: string
  initialCheckout?: string
  initialGuests?: number
  onSearch?: (params: SearchParams) => void
  compact?: boolean
}

export interface SearchParams {
  location: string
  checkin: string
  checkout: string
  guests: number
}

const AREAS = ['', 'Gachibowli', 'Kondapur', 'Madhapur', 'KPHB', 'Gowlidoddy']

function formatDate(d: Date): string {
  return d.toISOString().split('T')[0]
}

export function SearchPanel({
  initialLocation = '',
  initialCheckin = '',
  initialCheckout = '',
  initialGuests = 1,
  onSearch,
  compact = false,
}: SearchPanelProps) {
  const navigate = useNavigate()
  const [location, setLocation] = useState(initialLocation)
  const [checkin, setCheckin] = useState(initialCheckin)
  const [checkout, setCheckout] = useState(initialCheckout)
  const [guests, setGuests] = useState(initialGuests)
  const [guestOpen, setGuestOpen] = useState(false)

  const today = formatDate(new Date())

  useEffect(() => {
    setLocation(initialLocation)
    setCheckin(initialCheckin)
    setCheckout(initialCheckout)
    setGuests(initialGuests)
  }, [initialLocation, initialCheckin, initialCheckout, initialGuests])

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (location) params.set('location', location)
    if (checkin) params.set('checkin', checkin)
    if (checkout) params.set('checkout', checkout)
    params.set('guests', String(guests))

    if (onSearch) {
      onSearch({ location, checkin, checkout, guests })
    } else {
      navigate(`/stays?${params.toString()}`)
    }
  }

  return (
    <div
      className={`bg-white rounded-2xl md:rounded-full border border-sand/70 shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all ${
        compact ? 'p-2' : 'p-2 sm:p-2.5'
      }`}
    >
      <div className="flex flex-col md:flex-row items-stretch md:items-center divide-y md:divide-y-0 md:divide-x divide-sand/50">
        {/* 1. Location */}
        <div className="flex-1 flex items-center gap-3 px-4 py-2.5 hover:bg-ivory/50 rounded-xl md:rounded-l-full transition-colors relative cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-forest/5 flex items-center justify-center flex-shrink-0 text-forest">
            <MapPin size={17} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-sans font-bold text-charcoal leading-tight">
              Select Location
            </p>
            <div className="relative">
              <select
                id="search-location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-xs font-sans text-charcoal/60 bg-transparent border-none outline-none cursor-pointer appearance-none pr-5 truncate mt-0.5"
              >
                <option value="">Choose your preferred area</option>
                {AREAS.filter(Boolean).map((area) => (
                  <option key={area} value={area}>
                    {area}, Hyderabad
                  </option>
                ))}
              </select>
              <ChevronDown size={13} className="absolute right-0 top-1/2 -translate-y-1/2 text-charcoal/40 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 2. Check-in */}
        <div className="flex-1 flex items-center gap-3 px-4 py-2.5 hover:bg-ivory/50 transition-colors">
          <div className="w-9 h-9 rounded-full bg-forest/5 flex items-center justify-center flex-shrink-0 text-forest">
            <Calendar size={17} />
          </div>
          <div className="flex-1 min-w-0">
            <label className="block text-[13px] font-sans font-bold text-charcoal leading-tight cursor-pointer" htmlFor="search-checkin">
              Check-in
            </label>
            <input
              id="search-checkin"
              type="date"
              value={checkin}
              min={today}
              onChange={(e) => {
                setCheckin(e.target.value)
                if (checkout && e.target.value >= checkout) setCheckout('')
              }}
              className="w-full text-xs font-sans text-charcoal/60 bg-transparent border-none outline-none cursor-pointer mt-0.5"
            />
          </div>
        </div>

        {/* 3. Check-out */}
        <div className="flex-1 flex items-center gap-3 px-4 py-2.5 hover:bg-ivory/50 transition-colors">
          <div className="w-9 h-9 rounded-full bg-forest/5 flex items-center justify-center flex-shrink-0 text-forest">
            <Calendar size={17} />
          </div>
          <div className="flex-1 min-w-0">
            <label className="block text-[13px] font-sans font-bold text-charcoal leading-tight cursor-pointer" htmlFor="search-checkout">
              Check-out
            </label>
            <input
              id="search-checkout"
              type="date"
              value={checkout}
              min={checkin || today}
              onChange={(e) => setCheckout(e.target.value)}
              className="w-full text-xs font-sans text-charcoal/60 bg-transparent border-none outline-none cursor-pointer mt-0.5"
            />
          </div>
        </div>

        {/* 4. Guests */}
        <div
          className="flex-1 flex items-center gap-3 px-4 py-2.5 hover:bg-ivory/50 transition-colors relative cursor-pointer"
          onClick={() => setGuestOpen((v) => !v)}
        >
          <div className="w-9 h-9 rounded-full bg-forest/5 flex items-center justify-center flex-shrink-0 text-forest">
            <Users size={17} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-sans font-bold text-charcoal leading-tight">
              Guests
            </p>
            <div className="flex items-center justify-between mt-0.5">
              <span className="text-xs font-sans text-charcoal/60">
                {guests} {guests === 1 ? 'Guest' : 'Guests'}
              </span>
              <ChevronDown size={13} className="text-charcoal/40" />
            </div>
          </div>

          {/* Guest selector dropdown */}
          {guestOpen && (
            <div
              className="absolute top-full left-0 mt-3 w-56 bg-white rounded-2xl border border-sand shadow-xl p-4 z-40"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-xs font-sans font-bold text-charcoal mb-3">Number of Guests</p>
              <div className="flex items-center justify-between py-1">
                <span className="text-xs font-sans text-charcoal/70">Guests</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    disabled={guests <= 1}
                    className="w-7 h-7 rounded-full border border-sand flex items-center justify-center hover:bg-ivory disabled:opacity-30 transition-colors font-bold text-xs"
                    aria-label="Decrease guests"
                  >
                    −
                  </button>
                  <span className="font-sans font-semibold text-charcoal text-xs w-4 text-center">{guests}</span>
                  <button
                    type="button"
                    onClick={() => setGuests(Math.min(8, guests + 1))}
                    disabled={guests >= 8}
                    className="w-7 h-7 rounded-full border border-sand flex items-center justify-center hover:bg-ivory disabled:opacity-30 transition-colors font-bold text-xs"
                    aria-label="Increase guests"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setGuestOpen(false)}
                className="mt-3 w-full py-1.5 bg-forest text-white hover:bg-forest-light rounded-lg text-xs font-sans font-semibold transition-colors"
              >
                Apply
              </button>
            </div>
          )}
        </div>

        {/* 5. Search Button */}
        <div className="p-1 md:pl-2">
          <button
            onClick={handleSearch}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-forest hover:bg-forest-light text-white text-sm font-sans font-semibold rounded-xl md:rounded-full shadow-md transition-all active:scale-95 whitespace-nowrap"
            aria-label="Search stays"
          >
            <Search size={16} />
            <span>Search Stays</span>
          </button>
        </div>
      </div>
    </div>
  )
}
