// ============================================================
// PEARL HOMESTAYS — CENTRAL CONFIGURATION
// Edit this file to update contact details site-wide
// ============================================================

export const SITE_CONFIG = {
  brand: {
    name: 'Pearl',
    tagline: 'HOMESTAYS',
    fullName: 'Pearl Homestays',
    positioning: 'Modern Serviced Apartments in Hyderabad',
  },
  contact: {
    whatsappNumber: '919866478811',
    whatsappDisplay: '+91 98664 78811',
    whatsappUrl: 'https://wa.me/919866478811',
    // Optional fields — set to empty string to hide
    email: '',
    phone: '+91 98664 78811',
    city: 'Hyderabad, Telangana',
  },
  areas: ['Gachibowli', 'Kondapur', 'Madhapur', 'KPHB', 'Gowlidoddy'] as const,
  demo: {
    notice: 'Demo listing — illustrative details only',
    pricingNotice: 'Sample rate — not a confirmed commercial offer',
    bookingNotice: 'Demo only — no reservation or payment will be processed.',
    formNotice: 'Demo form submitted — no message was sent.',
  },
} as const

export type AreaSlug = 'gachibowli' | 'kondapur' | 'madhapur' | 'kphb' | 'gowlidoddy'

export const WHATSAPP_ENQUIRY_URL = (message?: string) => {
  const base = SITE_CONFIG.contact.whatsappUrl
  if (message) return `${base}?text=${encodeURIComponent(message)}`
  return base
}

