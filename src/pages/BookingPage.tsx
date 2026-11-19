import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MapPin, Users, Bed, Calendar, Info, AlertTriangle, CheckCircle2, MessageCircle, ArrowLeft } from 'lucide-react'
import { getPropertyBySlug } from '../data/properties'
import { PageMeta } from '../components/PageMeta'
import { SITE_CONFIG, WHATSAPP_ENQUIRY_URL } from '../config/site'

type BookingStep = 'details' | 'summary'

export function BookingPage() {
  const { slug } = useParams<{ slug: string }>()
  const property = slug ? getPropertyBySlug(slug) : undefined

  const [step, setStep] = useState<BookingStep>('details')
  const [checkin, setCheckin] = useState('')
  const [checkout, setCheckout] = useState('')
  const [guests, setGuests] = useState(1)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const today = new Date().toISOString().split('T')[0]

  const nights = (() => {
    if (!checkin || !checkout) return 0
    const a = new Date(checkin)
    const b = new Date(checkout)
    const diff = Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24))
    return diff > 0 ? diff : 0
  })()

  const baseAmount = property ? nights * property.pricePerNight : 0
  const serviceFee = Math.round(baseAmount * 0.05) // 5% illustrative service fee
  const totalAmount = baseAmount + serviceFee

  useEffect(() => {
    if (checkin && checkout && checkout <= checkin) {
      setErrors((e) => ({ ...e, checkout: 'Check-out must be after check-in' }))
    } else {
      setErrors((e) => { const n = { ...e }; delete n.checkout; return n })
    }
  }, [checkin, checkout])

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!checkin) newErrors.checkin = 'Please select a check-in date'
    if (!checkout) newErrors.checkout = 'Please select a check-out date'
    if (checkin && checkout && checkout <= checkin) newErrors.checkout = 'Check-out must be after check-in'
    if (nights < 1) newErrors.nights = 'Minimum stay is 1 night'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = () => {
    if (validate()) setStep('summary')
  }

  const formatDate = (d: string) => {
    if (!d) return '—'
    return new Date(d + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 pb-16">
        <div className="text-center px-4">
          <div className="text-6xl mb-4">🏠</div>
          <h1 className="font-serif text-3xl text-charcoal mb-3">Property Not Found</h1>
          <Link to="/stays" className="btn-primary">← Browse Stays</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <PageMeta
        title={`Book ${property.name} (Demo)`}
        description={`Preview a demo booking for ${property.name} in ${property.area}, Hyderabad. No real reservation will be processed.`}
      />

      <div className="pt-20 bg-ivory min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Demo Disclaimer Banner */}
          <div className="mb-6 flex items-start gap-3 px-4 py-3.5 bg-amber-50 border border-amber-200 rounded-xl">
            <AlertTriangle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-sans font-semibold text-amber-800">Demo Booking Flow</p>
              <p className="text-xs font-sans text-amber-700 mt-0.5">
                {SITE_CONFIG.demo.bookingNotice} This is a visual preview only.
              </p>
            </div>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-4 mb-8">
            {['Stay Details', 'Preview Summary'].map((label, i) => {
              const stepKey: BookingStep = i === 0 ? 'details' : 'summary'
              const isActive = step === stepKey
              const isDone = step === 'summary' && stepKey === 'details'
              return (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-sans font-semibold ${
                      isDone ? 'bg-forest text-white' : isActive ? 'bg-forest text-white' : 'bg-sand text-charcoal/50'
                    }`}
                  >
                    {isDone ? '✓' : i + 1}
                  </div>
                  <span className={`text-sm font-sans ${isActive ? 'font-medium text-charcoal' : 'text-charcoal/50'}`}>
                    {label}
                  </span>
                  {i < 1 && <span className="mx-2 text-charcoal/20">—</span>}
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main form / summary */}
            <div className="lg:col-span-2">
              {step === 'details' ? (
                <div className="bg-white rounded-2xl border border-sand/60 shadow-card p-6 md:p-8">
                  <h1 className="font-serif text-2xl text-charcoal mb-6">Book Your Stay</h1>
                  <p className="text-xs font-sans text-charcoal/50 mb-6 flex items-center gap-1.5">
                    <Info size={12} />
                    {SITE_CONFIG.demo.bookingNotice}
                  </p>

                  <div className="space-y-5">
                    {/* Location & Property (read-only) */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">Location</label>
                        <div className="form-input text-sm text-charcoal/60 bg-ivory border-sand/40 cursor-not-allowed">
                          {property.area}
                        </div>
                      </div>
                      <div>
                        <label className="form-label">Property</label>
                        <div className="form-input text-sm text-charcoal/60 bg-ivory border-sand/40 cursor-not-allowed truncate">
                          {property.name}
                        </div>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="form-label" htmlFor="bk-checkin">Check-in *</label>
                        <input
                          id="bk-checkin"
                          type="date"
                          value={checkin}
                          min={today}
                          onChange={(e) => setCheckin(e.target.value)}
                          className={`form-input text-sm ${errors.checkin ? 'border-red-400 ring-1 ring-red-300' : ''}`}
                          aria-describedby={errors.checkin ? 'err-checkin' : undefined}
                        />
                        {errors.checkin && (
                          <p id="err-checkin" className="text-xs text-red-500 mt-1 font-sans">{errors.checkin}</p>
                        )}
                      </div>
                      <div>
                        <label className="form-label" htmlFor="bk-checkout">Check-out *</label>
                        <input
                          id="bk-checkout"
                          type="date"
                          value={checkout}
                          min={checkin || today}
                          onChange={(e) => setCheckout(e.target.value)}
                          className={`form-input text-sm ${errors.checkout ? 'border-red-400 ring-1 ring-red-300' : ''}`}
                          aria-describedby={errors.checkout ? 'err-checkout' : undefined}
                        />
                        {errors.checkout && (
                          <p id="err-checkout" className="text-xs text-red-500 mt-1 font-sans">{errors.checkout}</p>
                        )}
                      </div>
                    </div>

                    {/* Night count indicator */}
                    {checkin && checkout && nights > 0 && (
                      <div className="flex items-center gap-2 px-3 py-2.5 bg-forest/5 rounded-lg border border-forest/20">
                        <Calendar size={14} className="text-forest" />
                        <span className="text-sm font-sans text-forest font-medium">
                          {nights} night{nights !== 1 ? 's' : ''} selected
                        </span>
                      </div>
                    )}

                    {/* Guests */}
                    <div>
                      <label className="form-label" htmlFor="bk-guests">Guests</label>
                      <select
                        id="bk-guests"
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="form-input text-sm"
                      >
                        {Array.from({ length: property.guests }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>{n} Guest{n !== 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={handleContinue}
                      className="btn-primary w-full justify-center py-3.5 text-sm"
                    >
                      Continue →
                    </button>
                    <Link
                      to={`/stays/${property.slug}`}
                      className="flex items-center gap-1.5 text-sm font-sans text-charcoal/50 hover:text-charcoal transition-colors"
                    >
                      <ArrowLeft size={14} />
                      Back to property
                    </Link>
                  </div>
                </div>
              ) : (
                /* ============================================================
                   BOOKING SUMMARY / PREVIEW STATE
                ============================================================ */
                <div className="bg-white rounded-2xl border border-sand/60 shadow-card p-6 md:p-8">
                  {/* Success-like preview state */}
                  <div className="text-center mb-8 py-6 border-b border-sand/60">
                    <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={32} className="text-forest" />
                    </div>
                    <h2 className="font-serif text-2xl text-charcoal mb-2">Booking Preview</h2>
                    <p className="text-sm font-sans text-charcoal/60 max-w-xs mx-auto">
                      This is a demo summary. No booking has been confirmed or payment processed.
                    </p>
                  </div>

                  <h3 className="font-sans font-semibold text-sm text-charcoal mb-4">Your Stay Details</h3>
                  <div className="space-y-3 mb-6">
                    {[
                      { label: 'Property', value: property.name },
                      { label: 'Location', value: `${property.area}, Hyderabad` },
                      { label: 'Check-in', value: formatDate(checkin) },
                      { label: 'Check-out', value: formatDate(checkout) },
                      { label: 'Duration', value: `${nights} night${nights !== 1 ? 's' : ''}` },
                      { label: 'Guests', value: `${guests} guest${guests !== 1 ? 's' : ''}` },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-center justify-between py-2 border-b border-sand/40 last:border-0">
                        <span className="text-sm font-sans text-charcoal/50">{label}</span>
                        <span className="text-sm font-sans font-medium text-charcoal">{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price breakdown */}
                  <div className="bg-ivory rounded-xl p-5 mb-6">
                    <h3 className="font-sans font-semibold text-sm text-charcoal mb-4">
                      Illustrative Price Breakdown
                      <span className="ml-2 demo-badge">Demo rates</span>
                    </h3>
                    <div className="space-y-2.5">
                      <div className="flex justify-between text-sm font-sans text-charcoal/70">
                        <span>₹{property.pricePerNight.toLocaleString('en-IN')} × {nights} nights</span>
                        <span>₹{baseAmount.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-sm font-sans text-charcoal/70">
                        <span>Service fee (illustrative)</span>
                        <span>₹{serviceFee.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between font-sans font-semibold text-charcoal pt-3 border-t border-sand">
                        <span>Total (demo estimate)</span>
                        <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    <p className="text-[10px] font-sans text-charcoal/40 mt-3">{SITE_CONFIG.demo.pricingNotice}</p>
                  </div>

                  <a
                    href={WHATSAPP_ENQUIRY_URL(
                      `Hi! I'd like to enquire about ${property.name} in ${property.area} from ${formatDate(checkin)} to ${formatDate(checkout)} for ${guests} guest(s).`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp w-full justify-center py-3.5 text-sm mb-3 inline-flex"
                  >
                    <MessageCircle size={16} />
                    Continue on WhatsApp
                  </a>
                  <button
                    onClick={() => setStep('details')}
                    className="btn-secondary w-full justify-center text-sm"
                  >
                    ← Edit Details
                  </button>
                </div>
              )}
            </div>

            {/* Property summary panel */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-sand/60 shadow-card overflow-hidden sticky top-24">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80'
                    }}
                  />
                </div>
                <div className="p-4">
                  <span className="demo-badge text-[10px] mb-2 inline-flex">Demo listing</span>
                  <h3 className="font-serif text-base text-charcoal leading-snug mt-1">{property.name}</h3>
                  <div className="flex items-center gap-1.5 mt-1.5 text-xs text-charcoal/50 font-sans">
                    <MapPin size={11} className="text-sage" />
                    <span>{property.area}</span>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-sand/60">
                    <div className="flex items-center gap-1 text-xs text-charcoal/60 font-sans">
                      <span className="font-medium">{property.type}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-charcoal/60 font-sans">
                      <Users size={11} />
                      <span>{property.guests} guests</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-charcoal/60 font-sans">
                      <Bed size={11} />
                      <span>{property.bedrooms} bed</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-sand/60">
                    <span className="font-serif text-lg font-semibold text-charcoal">
                      ₹{property.pricePerNight.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-charcoal/50 font-sans ml-1">/ night</span>
                    {nights > 0 && (
                      <p className="text-xs font-sans text-charcoal/50 mt-0.5">
                        {nights} night{nights !== 1 ? 's' : ''} = ₹{baseAmount.toLocaleString('en-IN')} (est.)
                      </p>
                    )}
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

