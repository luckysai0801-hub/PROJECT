import { useState, type FormEvent } from 'react'
import { MessageCircle, Phone, MapPin, CheckCircle2, ChevronDown } from 'lucide-react'
import { PageMeta } from '../components/PageMeta'
import { SITE_CONFIG } from '../config/site'

type FormState = 'idle' | 'submitted'

const STAY_DURATIONS = ['1–3 nights', '4–7 nights', '1–4 weeks', '1–3 months', '3+ months', 'Flexible / Not sure']
const SERVICE_AREAS = SITE_CONFIG.areas

export function ContactPage() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    duration: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Enter a valid 10-digit Indian mobile number'
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (validate()) {
      setFormState('submitted')
    }
  }

  const handleChange = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field]) {
      setErrors((e) => { const n = { ...e }; delete n[field]; return n })
    }
  }

  const resetForm = () => {
    setForm({ name: '', phone: '', email: '', location: '', duration: '', message: '' })
    setErrors({})
    setFormState('idle')
  }

  return (
    <>
      <PageMeta
        title="Contact Us"
        description="Get in touch with Pearl Homestays. Enquire about serviced apartments in Gachibowli, Kondapur, Madhapur, KPHB, and Gowlidoddy, Hyderabad."
      />

      <div className="pt-20 bg-ivory min-h-screen">
        {/* Page header */}
        <div className="bg-white border-b border-sand/60 py-14">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <p className="section-label mb-3">Get in Touch</p>
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">We're Here to Help</h1>
            <p className="text-charcoal/60 font-sans text-sm leading-relaxed">
              Have a question, need a custom stay, or planning a long-term arrangement? Reach out to us.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-6">
              {/* WhatsApp — primary */}
              <a
                href={SITE_CONFIG.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-[#25D366]/10 border border-[#25D366]/30 rounded-xl hover:bg-[#25D366]/15 transition-colors group"
              >
                <div className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={22} className="text-white" />
                </div>
                <div>
                  <p className="font-sans font-semibold text-charcoal text-sm">WhatsApp</p>
                  <p className="text-charcoal/70 font-sans text-sm mt-0.5">{SITE_CONFIG.contact.whatsappDisplay}</p>
                  <p className="text-xs text-[#25D366] font-sans mt-1 group-hover:underline">Chat with us →</p>
                </div>
              </a>

              {/* Phone */}
              <div className="flex items-center gap-4 p-5 bg-white rounded-xl border border-sand/60">
                <div className="w-12 h-12 bg-ivory rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-sage" />
                </div>
                <div>
                  <p className="font-sans font-semibold text-charcoal text-sm">Phone</p>
                  <p className="text-charcoal/70 font-sans text-sm mt-0.5">{SITE_CONFIG.contact.phone}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-sand/60">
                <div className="w-12 h-12 bg-ivory rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-sage" />
                </div>
                <div>
                  <p className="font-sans font-semibold text-charcoal text-sm">Service Areas</p>
                  <p className="text-charcoal/70 font-sans text-sm mt-0.5">
                    {SERVICE_AREAS.join(', ')}<br />
                    Hyderabad, Telangana
                  </p>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="bg-forest rounded-xl p-5">
                <h3 className="font-serif text-lg text-white mb-2">Prefer WhatsApp?</h3>
                <p className="text-white/70 text-sm font-sans mb-4 leading-relaxed">
                  Chat directly with our team for the fastest response.
                </p>
                <a
                  href={SITE_CONFIG.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white text-sm font-sans font-medium rounded-lg hover:bg-[#1ebe5a] transition-colors"
                >
                  <MessageCircle size={15} />
                  Chat on WhatsApp →
                </a>
              </div>
            </div>

            {/* Enquiry Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-sand/60 shadow-card p-6 md:p-8">
                {formState === 'submitted' ? (
                  /* Success state */
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={32} className="text-forest" />
                    </div>
                    <h3 className="font-serif text-2xl text-charcoal mb-2">Enquiry Preview</h3>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-xs font-sans text-amber-700 mb-4">
                      {SITE_CONFIG.demo.formNotice}
                    </div>
                    <p className="text-charcoal/60 font-sans text-sm mb-6 max-w-xs mx-auto">
                      In a live website, your message would be sent to our team.
                      For now, please use WhatsApp for the fastest response.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <a
                        href={SITE_CONFIG.contact.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-whatsapp justify-center"
                      >
                        <MessageCircle size={16} />
                        Chat on WhatsApp
                      </a>
                      <button onClick={resetForm} className="btn-secondary justify-center">
                        Submit Another Enquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <h2 className="font-serif text-2xl text-charcoal mb-6">Send an Enquiry</h2>

                    <div className="space-y-4">
                      {/* Name */}
                      <div>
                        <label className="form-label" htmlFor="ct-name">Your Name *</label>
                        <input
                          id="ct-name"
                          type="text"
                          value={form.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          className={`form-input ${errors.name ? 'border-red-400' : ''}`}
                          placeholder="Your full name"
                          autoComplete="name"
                        />
                        {errors.name && <p className="text-xs text-red-500 mt-1 font-sans">{errors.name}</p>}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="form-label" htmlFor="ct-phone">Phone Number *</label>
                        <input
                          id="ct-phone"
                          type="tel"
                          value={form.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          className={`form-input ${errors.phone ? 'border-red-400' : ''}`}
                          placeholder="10-digit mobile number"
                          autoComplete="tel"
                          inputMode="numeric"
                        />
                        {errors.phone && <p className="text-xs text-red-500 mt-1 font-sans">{errors.phone}</p>}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="form-label" htmlFor="ct-email">Email Address (optional)</label>
                        <input
                          id="ct-email"
                          type="email"
                          value={form.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          className={`form-input ${errors.email ? 'border-red-400' : ''}`}
                          placeholder="your@email.com"
                          autoComplete="email"
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1 font-sans">{errors.email}</p>}
                      </div>

                      {/* Two-col row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="form-label" htmlFor="ct-location">Preferred Location</label>
                          <div className="relative">
                            <select
                              id="ct-location"
                              value={form.location}
                              onChange={(e) => handleChange('location', e.target.value)}
                              className="form-input appearance-none pr-8"
                            >
                              <option value="">Select area</option>
                              {SERVICE_AREAS.map((area) => (
                                <option key={area} value={area}>{area}</option>
                              ))}
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 pointer-events-none" />
                          </div>
                        </div>
                        <div>
                          <label className="form-label" htmlFor="ct-duration">Stay Duration</label>
                          <div className="relative">
                            <select
                              id="ct-duration"
                              value={form.duration}
                              onChange={(e) => handleChange('duration', e.target.value)}
                              className="form-input appearance-none pr-8"
                            >
                              <option value="">Select duration</option>
                              {STAY_DURATIONS.map((d) => (
                                <option key={d} value={d}>{d}</option>
                              ))}
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="form-label" htmlFor="ct-message">Message</label>
                        <textarea
                          id="ct-message"
                          value={form.message}
                          onChange={(e) => handleChange('message', e.target.value)}
                          className="form-input resize-none h-28"
                          placeholder="Tell us about your requirements…"
                        />
                      </div>

                      <button type="submit" className="btn-primary w-full justify-center py-3.5 text-sm">
                        <MessageCircle size={16} />
                        Send Enquiry (Demo)
                      </button>

                      <p className="text-[11px] font-sans text-charcoal/40 text-center">
                        {SITE_CONFIG.demo.formNotice}
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

