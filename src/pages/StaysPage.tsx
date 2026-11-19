import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { PropertyCard } from '../components/PropertyCard'
import { SearchPanel } from '../components/SearchPanel'
import { PageMeta } from '../components/PageMeta'
import { PROPERTIES } from '../data/properties'
import { SITE_CONFIG } from '../config/site'

type SortOption = 'popular' | 'price-asc' | 'price-desc'
type BHKType = '1BHK' | '2BHK' | '3BHK'

const AREAS = ['Gachibowli', 'Kondapur', 'Madhapur', 'KPHB', 'Gowlidoddy']
const BHK_TYPES: BHKType[] = ['1BHK', '2BHK', '3BHK']
const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6]
const PRICE_MIN = 1000
const PRICE_MAX = 6000

export function StaysPage() {
  const [searchParams] = useSearchParams()

  const [selectedAreas, setSelectedAreas] = useState<string[]>(() => {
    const loc = searchParams.get('location')
    return loc ? [loc] : []
  })
  const [selectedTypes, setSelectedTypes] = useState<BHKType[]>([])
  const [selectedGuests, setSelectedGuests] = useState<number>(
    Number(searchParams.get('guests') || 1)
  )
  const [priceRange, setPriceRange] = useState<[number, number]>([PRICE_MIN, PRICE_MAX])
  const [sortBy, setSortBy] = useState<SortOption>('popular')
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Sync area filter when URL location param changes
  useEffect(() => {
    const loc = searchParams.get('location')
    if (loc) setSelectedAreas([loc])
  }, [searchParams])

  const toggleArea = (area: string) => {
    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    )
  }

  const toggleType = (type: BHKType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const clearAll = () => {
    setSelectedAreas([])
    setSelectedTypes([])
    setSelectedGuests(1)
    setPriceRange([PRICE_MIN, PRICE_MAX])
    setSortBy('popular')
  }

  const hasFilters =
    selectedAreas.length > 0 ||
    selectedTypes.length > 0 ||
    selectedGuests > 1 ||
    priceRange[0] > PRICE_MIN ||
    priceRange[1] < PRICE_MAX

  const filtered = useMemo(() => {
    let result = [...PROPERTIES]

    if (selectedAreas.length > 0) {
      result = result.filter((p) => selectedAreas.includes(p.area))
    }
    if (selectedTypes.length > 0) {
      result = result.filter((p) => selectedTypes.includes(p.type))
    }
    if (selectedGuests > 1) {
      result = result.filter((p) => p.guests >= selectedGuests)
    }
    result = result.filter(
      (p) => p.pricePerNight >= priceRange[0] && p.pricePerNight <= priceRange[1]
    )

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.pricePerNight - b.pricePerNight)
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.pricePerNight - a.pricePerNight)
    } else {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return result
  }, [selectedAreas, selectedTypes, selectedGuests, priceRange, sortBy])

  // Area counts for filter labels
  const areaCounts = useMemo(() => {
    const map: Record<string, number> = {}
    PROPERTIES.forEach((p) => {
      map[p.area] = (map[p.area] || 0) + 1
    })
    return map
  }, [])

  return (
    <>
      <PageMeta
        title="Explore Stays"
        description="Browse fully furnished serviced apartments across Gachibowli, Kondapur, Madhapur, KPHB, and Gowlidoddy. 1BHK, 2BHK, and 3BHK options."
      />

      {/* Page header */}
      <div className="bg-white border-b border-sand/60 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-2">Explore Our Stays</h1>
          <p className="text-charcoal/60 font-sans text-sm">
            Choose from a range of fully furnished apartments across Hyderabad's prime locations.
          </p>
          <div className="mt-6">
            <SearchPanel compact />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ============================================================
              SIDEBAR FILTERS (desktop)
          ============================================================ */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-sans font-semibold text-charcoal text-sm">Filters</h2>
                {hasFilters && (
                  <button
                    onClick={clearAll}
                    className="text-xs font-sans text-sage hover:text-forest transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Location */}
              <div>
                <h3 className="font-sans text-xs font-semibold tracking-wide uppercase text-charcoal/50 mb-3">Location</h3>
                <div className="space-y-2">
                  {AREAS.map((area) => (
                    <label key={area} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedAreas.includes(area)}
                        onChange={() => toggleArea(area)}
                        className="w-4 h-4 rounded border-sand text-forest focus:ring-forest/30"
                      />
                      <span className="text-sm font-sans text-charcoal/70 group-hover:text-charcoal transition-colors">
                        {area}
                      </span>
                      <span className="ml-auto text-xs text-charcoal/40">({areaCounts[area] || 0})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Type */}
              <div>
                <h3 className="font-sans text-xs font-semibold tracking-wide uppercase text-charcoal/50 mb-3">Property Type</h3>
                <div className="space-y-2">
                  {BHK_TYPES.map((type) => (
                    <label key={type} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => toggleType(type)}
                        className="w-4 h-4 rounded border-sand text-forest focus:ring-forest/30"
                      />
                      <span className="text-sm font-sans text-charcoal/70 group-hover:text-charcoal transition-colors">
                        {type}
                      </span>
                      <span className="ml-auto text-xs text-charcoal/40">
                        ({PROPERTIES.filter((p) => p.type === type).length})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Guests */}
              <div>
                <h3 className="font-sans text-xs font-semibold tracking-wide uppercase text-charcoal/50 mb-3">Guests</h3>
                <div className="flex flex-wrap gap-2">
                  {GUEST_OPTIONS.map((n) => (
                    <button
                      key={n}
                      onClick={() => setSelectedGuests(selectedGuests === n ? 1 : n)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-colors ${
                        selectedGuests === n
                          ? 'bg-forest text-white'
                          : 'bg-ivory text-charcoal/70 hover:bg-sand'
                      }`}
                    >
                      {n}+
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-sans text-xs font-semibold tracking-wide uppercase text-charcoal/50 mb-3">Price (per night)</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-sans text-charcoal/60">
                    <span>₹{priceRange[0].toLocaleString('en-IN')}</span>
                    <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    step={100}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full accent-forest"
                    aria-label="Maximum price filter"
                  />
                  <p className="text-[10px] font-sans text-charcoal/40">{SITE_CONFIG.demo.pricingNotice}</p>
                </div>
              </div>
            </div>
          </aside>

          {/* ============================================================
              MAIN CONTENT
          ============================================================ */}
          <div className="flex-1 min-w-0">
            {/* Mobile filter toggle */}
            <div className="lg:hidden mb-5">
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-lg border border-sand text-sm font-sans font-medium text-charcoal"
              >
                <SlidersHorizontal size={15} />
                Filters {hasFilters && `(${[selectedAreas.length, selectedTypes.length, selectedGuests > 1 ? 1 : 0].reduce((a, b) => a + b, 0)} active)`}
                <ChevronDown size={14} className={`ml-auto transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
              </button>

              {filtersOpen && (
                <div className="mt-3 bg-white rounded-xl border border-sand/60 p-5 space-y-5">
                  {/* Mobile filters — same as desktop */}
                  <div>
                    <h3 className="font-sans text-xs font-semibold tracking-wide uppercase text-charcoal/50 mb-3">Location</h3>
                    <div className="flex flex-wrap gap-2">
                      {AREAS.map((area) => (
                        <button
                          key={area}
                          onClick={() => toggleArea(area)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-colors ${
                            selectedAreas.includes(area) ? 'bg-forest text-white' : 'bg-ivory text-charcoal/70 hover:bg-sand'
                          }`}
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-sans text-xs font-semibold tracking-wide uppercase text-charcoal/50 mb-3">Type</h3>
                    <div className="flex gap-2">
                      {BHK_TYPES.map((type) => (
                        <button
                          key={type}
                          onClick={() => toggleType(type)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-colors ${
                            selectedTypes.includes(type) ? 'bg-forest text-white' : 'bg-ivory text-charcoal/70 hover:bg-sand'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                  {hasFilters && (
                    <button onClick={clearAll} className="text-sm font-sans text-sage hover:text-forest transition-colors">
                      Clear all filters
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Results header */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div>
                <p className="font-sans text-sm text-charcoal/60">
                  <span className="font-semibold text-charcoal">{filtered.length}</span> stays found
                  <span className="ml-1 demo-badge">Demo inventory</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                {hasFilters && (
                  <button
                    onClick={clearAll}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-sand-light rounded-lg text-xs font-sans text-charcoal/70 hover:text-charcoal transition-colors"
                  >
                    <X size={12} />
                    Clear filters
                  </button>
                )}
                <div className="flex items-center gap-2">
                  <label htmlFor="sort-select" className="text-xs font-sans text-charcoal/50">Sort by:</label>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="text-xs font-sans text-charcoal border border-sand rounded-lg px-2.5 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-forest/30"
                  >
                    <option value="popular">Popular</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Active filter chips */}
            {hasFilters && (
              <div className="flex flex-wrap gap-2 mb-5">
                {selectedAreas.map((area) => (
                  <button
                    key={area}
                    onClick={() => toggleArea(area)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-forest/10 text-forest rounded-full text-xs font-sans font-medium"
                  >
                    {area}
                    <X size={11} />
                  </button>
                ))}
                {selectedTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => toggleType(type)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-forest/10 text-forest rounded-full text-xs font-sans font-medium"
                  >
                    {type}
                    <X size={11} />
                  </button>
                ))}
              </div>
            )}

            {/* Grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-xl border border-sand/60">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-serif text-2xl text-charcoal mb-2">No stays found</h3>
                <p className="text-charcoal/50 font-sans text-sm mb-6 max-w-xs mx-auto">
                  Try adjusting your filters to find the perfect apartment.
                </p>
                <button onClick={clearAll} className="btn-outline">
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

