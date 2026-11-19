// ============================================================
// PEARL HOMESTAYS — CENTRALIZED SAMPLE DATA
// All prices, listings, and details are illustrative demo data
// Edit here to update property information site-wide
// ============================================================

export interface Property {
  id: string
  slug: string
  name: string
  area: string
  areaSlug: string
  type: '1BHK' | '2BHK' | '3BHK'
  guests: number
  bedrooms: number
  bathrooms: number
  pricePerNight: number // INR — illustrative demo price
  image: string
  images: string[]
  amenities: string[]
  description: string
  highlights: string[]
  houseRules: string[]
  featured: boolean
}

export interface Location {
  slug: string
  name: string
  tagline: string
  description: string
  image: string
  propertyCount: string
}

// ============================================================
// UNSPLASH IMAGE URLS — High-quality royalty-free interiors
// These are illustrative demo images, not Pearl's own photos
// ============================================================
const IMAGES = {
  // Living rooms / apartments
  apt1: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&q=80',
  apt2: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
  apt3: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
  apt4: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
  apt5: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
  apt6: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
  apt7: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
  apt8: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
  apt9: 'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800&q=80',
  apt10: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
  apt11: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
  apt12: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
  // Bedrooms
  bed1: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
  bed2: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
  bed3: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80',
  // Kitchens
  kit1: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
  kit2: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80',
  // Buildings / exteriors
  bld1: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
  bld2: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
  bld3: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
  bld4: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
  bld5: 'https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=800&q=80',
  // Hero
  hero: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=1600&q=85',
}

// ============================================================
// LOCATIONS DATA
// ============================================================
export const LOCATIONS: Location[] = [
  {
    slug: 'gachibowli',
    name: 'Gachibowli',
    tagline: 'Hyderabad\'s Premier IT Hub',
    description: 'Gachibowli is one of Hyderabad\'s most sought-after destinations, known for its proximity to major IT campuses and international companies. Pearl Homestays in Gachibowli offer modern, fully furnished apartments ideal for business travelers, long-stay professionals, and families looking for a comfortable base in the heart of the city\'s tech corridor.',
    image: '/images/gachibowli.jpg',
    propertyCount: '12+',
  },
  {
    slug: 'kondapur',
    name: 'Kondapur',
    tagline: 'Comfortable Homes Near Tech Parks',
    description: 'Kondapur is a well-connected neighborhood adjacent to Gachibowli, blending residential calm with easy access to IT hubs and lifestyle amenities. Our Kondapur apartments are ideal for those who want a quieter stay while remaining close to work and the city\'s vibrant dining and retail scene.',
    image: '/images/kondapur.jpg',
    propertyCount: '8+',
  },
  {
    slug: 'madhapur',
    name: 'Madhapur',
    tagline: 'Vibrant & Well-Connected',
    description: 'Madhapur sits at the heart of Hyderabad\'s HITEC City corridor, buzzing with cafes, restaurants, coworking spaces, and lifestyle conveniences. Pearl Homestays here are perfect for professionals, creatives, and families who want an energetic urban neighbourhood with every convenience within reach.',
    image: '/images/madhapur.jpg',
    propertyCount: '10+',
  },
  {
    slug: 'kphb',
    name: 'KPHB',
    tagline: 'Convenient Stays Near the Metro',
    description: 'Kukatpally Housing Board (KPHB) is a large residential locality with excellent metro connectivity, making it an ideal base for those commuting across Hyderabad. Our KPHB apartments offer spacious, affordable stays with all modern amenities in a well-serviced neighbourhood.',
    image: '/images/kphb.jpg',
    propertyCount: '6+',
  },
  {
    slug: 'gowlidoddy',
    name: 'Gowlidoddy',
    tagline: 'Peaceful Stays Near Jubilee Hills',
    description: 'Gowlidoddy is a tranquil residential pocket close to Jubilee Hills and Film Nagar, offering a peaceful retreat with easy access to both the IT corridor and the city\'s cultural and entertainment districts. Ideal for extended stays and families seeking a quieter, greener neighbourhood.',
    image: '/images/gowlidoddy.jpg',
    propertyCount: '5+',
  },
]

// ============================================================
// PROPERTIES SAMPLE DATA — Illustrative demo inventory
// ============================================================
export const PROPERTIES: Property[] = [
  // --- GACHIBOWLI ---
  {
    id: 'g1',
    slug: 'modern-1bhk-gachibowli',
    name: 'Modern 1BHK in Gachibowli',
    area: 'Gachibowli',
    areaSlug: 'gachibowli',
    type: '1BHK',
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    pricePerNight: 2000,
    image: IMAGES.apt1,
    images: [IMAGES.apt1, IMAGES.bed1, IMAGES.kit1, IMAGES.apt3],
    amenities: ['Wi-Fi', 'AC', 'TV', 'Full Kitchen', 'Washing Machine', 'Power Backup'],
    description: 'A stylish and thoughtfully furnished 1BHK apartment in the heart of Gachibowli, ideal for solo professionals or couples. The apartment features a well-equipped kitchen, modern bathroom, and a bright living space. Perfect for short stays or extended projects near the IT corridor.',
    highlights: ['Fully furnished', 'All utilities included', 'Weekly housekeeping', 'Ground floor parking'],
    houseRules: [
      'Check-in: 2:00 PM | Check-out: 11:00 AM',
      'No smoking inside the apartment',
      'Pets not permitted',
      'Guests must carry valid ID',
      'Quiet hours: 10 PM – 7 AM',
    ],
    featured: true,
  },
  {
    id: 'g2',
    slug: 'premium-2bhk-gachibowli',
    name: 'Premium 2BHK in Gachibowli',
    area: 'Gachibowli',
    areaSlug: 'gachibowli',
    type: '2BHK',
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    pricePerNight: 3500,
    image: IMAGES.apt2,
    images: [IMAGES.apt2, IMAGES.bed2, IMAGES.kit2, IMAGES.apt4, IMAGES.apt5],
    amenities: ['Wi-Fi', 'AC', 'TV', 'Full Kitchen', 'Washing Machine', 'Parking', 'Power Backup', 'Housekeeping'],
    description: 'A spacious and well-appointed 2BHK apartment designed for families and teams. Features two comfortable bedrooms, a fully equipped modular kitchen, and a generous living area. All essentials are provided for a comfortable, home-like stay in one of Hyderabad\'s busiest business districts.',
    highlights: ['Spacious layout', 'Two attached bathrooms', 'Modular kitchen', 'Dedicated parking'],
    houseRules: [
      'Check-in: 2:00 PM | Check-out: 11:00 AM',
      'No smoking inside the apartment',
      'Pets not permitted',
      'Guests must carry valid ID',
      'Maximum occupancy: 4 guests',
    ],
    featured: true,
  },
  {
    id: 'g3',
    slug: 'spacious-3bhk-gachibowli',
    name: 'Spacious 3BHK in Gachibowli',
    area: 'Gachibowli',
    areaSlug: 'gachibowli',
    type: '3BHK',
    guests: 6,
    bedrooms: 3,
    bathrooms: 3,
    pricePerNight: 5200,
    image: IMAGES.apt6,
    images: [IMAGES.apt6, IMAGES.bed3, IMAGES.kit1, IMAGES.apt7],
    amenities: ['Wi-Fi', 'AC', 'TV', 'Full Kitchen', 'Washing Machine', 'Parking', 'Power Backup', 'Housekeeping', 'Lift'],
    description: 'A generous 3BHK apartment perfect for large families or multi-person corporate teams. Spread across a well-planned layout with three spacious bedrooms, a large living and dining area, and a full-sized kitchen. Ideal for longer stays requiring ample space and privacy.',
    highlights: ['Three bedrooms', 'Large living and dining space', 'Full kitchen with appliances', 'Two covered parking spots'],
    houseRules: [
      'Check-in: 2:00 PM | Check-out: 11:00 AM',
      'No smoking inside the apartment',
      'Pets not permitted',
      'Maximum occupancy: 6 guests',
    ],
    featured: false,
  },
  // --- KONDAPUR ---
  {
    id: 'k1',
    slug: 'cozy-1bhk-kondapur',
    name: 'Cozy 1BHK in Kondapur',
    area: 'Kondapur',
    areaSlug: 'kondapur',
    type: '1BHK',
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    pricePerNight: 1900,
    image: IMAGES.apt3,
    images: [IMAGES.apt3, IMAGES.bed1, IMAGES.kit2, IMAGES.apt9],
    amenities: ['Wi-Fi', 'AC', 'TV', 'Kitchenette', 'Power Backup'],
    description: 'A warm and comfortable 1BHK apartment in a well-maintained Kondapur complex. Great natural light, clean interiors, and all essential appliances make this an ideal choice for short-stay professionals and solo travelers.',
    highlights: ['Great natural light', 'Quiet residential setting', 'Essentials fully stocked', 'Close to tech parks'],
    houseRules: [
      'Check-in: 2:00 PM | Check-out: 11:00 AM',
      'No smoking inside the apartment',
      'No parties or events',
      'Guests must carry valid ID',
    ],
    featured: false,
  },
  {
    id: 'k2',
    slug: 'premium-2bhk-kondapur',
    name: 'Premium 2BHK in Kondapur',
    area: 'Kondapur',
    areaSlug: 'kondapur',
    type: '2BHK',
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    pricePerNight: 3200,
    image: IMAGES.apt4,
    images: [IMAGES.apt4, IMAGES.bed2, IMAGES.kit1, IMAGES.apt10],
    amenities: ['Wi-Fi', 'AC', 'TV', 'Full Kitchen', 'Washing Machine', 'Parking', 'Power Backup'],
    description: 'A spacious and modern 2BHK in the heart of Kondapur. Ideal for families, business travelers, or long corporate stays. The apartment is fully furnished with quality appliances and comfortable bedrooms, offering a home-like experience.',
    highlights: ['Modern furnishings', 'Well-equipped kitchen', 'Two separate bedrooms', 'Parking available'],
    houseRules: [
      'Check-in: 2:00 PM | Check-out: 11:00 AM',
      'No smoking inside the apartment',
      'Pets not permitted',
      'Maximum occupancy: 4 guests',
    ],
    featured: true,
  },
  {
    id: 'k3',
    slug: 'family-3bhk-kondapur',
    name: 'Family 3BHK in Kondapur',
    area: 'Kondapur',
    areaSlug: 'kondapur',
    type: '3BHK',
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    pricePerNight: 4800,
    image: IMAGES.apt5,
    images: [IMAGES.apt5, IMAGES.bed3, IMAGES.kit2, IMAGES.apt6],
    amenities: ['Wi-Fi', 'AC', 'TV', 'Full Kitchen', 'Washing Machine', 'Parking', 'Power Backup', 'Housekeeping'],
    description: 'A large, family-friendly 3BHK apartment in a serene Kondapur locality. Features three well-proportioned bedrooms, a bright living area, and a fully equipped kitchen. Great for extended family stays or long corporate assignments.',
    highlights: ['Family-friendly layout', 'Bright, airy rooms', 'Ample storage space', 'Weekly housekeeping'],
    houseRules: [
      'Check-in: 2:00 PM | Check-out: 11:00 AM',
      'No smoking inside the apartment',
      'Maximum occupancy: 6 guests',
    ],
    featured: false,
  },
  // --- MADHAPUR ---
  {
    id: 'm1',
    slug: 'studio-1bhk-madhapur',
    name: 'Studio 1BHK in Madhapur',
    area: 'Madhapur',
    areaSlug: 'madhapur',
    type: '1BHK',
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    pricePerNight: 2100,
    image: IMAGES.apt7,
    images: [IMAGES.apt7, IMAGES.bed1, IMAGES.kit1, IMAGES.apt8],
    amenities: ['Wi-Fi', 'AC', 'TV', 'Kitchenette', 'Power Backup'],
    description: 'A compact and stylish 1BHK apartment in Madhapur, perfect for the modern business traveler. Located close to HITEC City, cafes, and restaurants, with everything you need for a productive and comfortable short stay.',
    highlights: ['Central Madhapur location', 'Smart, compact layout', 'High-speed Wi-Fi', 'Close to HITEC City'],
    houseRules: [
      'Check-in: 2:00 PM | Check-out: 11:00 AM',
      'No smoking inside',
      'No parties or events',
      'Guests must carry valid ID',
    ],
    featured: false,
  },
  {
    id: 'm2',
    slug: 'premium-2bhk-madhapur',
    name: 'Premium 2BHK in Madhapur',
    area: 'Madhapur',
    areaSlug: 'madhapur',
    type: '2BHK',
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    pricePerNight: 3800,
    image: IMAGES.apt8,
    images: [IMAGES.apt8, IMAGES.bed2, IMAGES.kit2, IMAGES.apt11],
    amenities: ['Wi-Fi', 'AC', 'TV', 'Full Kitchen', 'Washing Machine', 'Parking', 'Power Backup', 'Housekeeping'],
    description: 'A premium 2BHK apartment in the vibrant Madhapur neighbourhood. Well-designed interiors, quality furnishings, and all modern amenities make this an excellent choice for professionals and families. Steps away from popular dining and lifestyle options.',
    highlights: ['Premium interiors', 'Two attached bathrooms', 'Fully stocked kitchen', 'Prime Madhapur location'],
    houseRules: [
      'Check-in: 2:00 PM | Check-out: 11:00 AM',
      'No smoking inside the apartment',
      'Maximum occupancy: 4 guests',
    ],
    featured: true,
  },
  {
    id: 'm3',
    slug: 'spacious-3bhk-madhapur',
    name: 'Spacious 3BHK in Madhapur',
    area: 'Madhapur',
    areaSlug: 'madhapur',
    type: '3BHK',
    guests: 6,
    bedrooms: 3,
    bathrooms: 3,
    pricePerNight: 5500,
    image: IMAGES.apt9,
    images: [IMAGES.apt9, IMAGES.bed3, IMAGES.kit1, IMAGES.apt12],
    amenities: ['Wi-Fi', 'AC', 'TV', 'Full Kitchen', 'Washing Machine', 'Parking', 'Power Backup', 'Housekeeping', 'Lift'],
    description: 'An expansive 3BHK apartment in Madhapur with generous living spaces and high-quality furnishings throughout. Perfect for large groups, extended corporate stays, or families who need room to breathe in a well-connected urban location.',
    highlights: ['Expansive floor plan', 'Three en-suite bedrooms', 'Gourmet kitchen setup', 'Two parking spots'],
    houseRules: [
      'Check-in: 2:00 PM | Check-out: 11:00 AM',
      'No smoking inside the apartment',
      'Maximum occupancy: 6 guests',
    ],
    featured: false,
  },
  // --- KPHB ---
  {
    id: 'kp1',
    slug: 'cozy-1bhk-kphb',
    name: 'Cozy 1BHK in KPHB',
    area: 'KPHB',
    areaSlug: 'kphb',
    type: '1BHK',
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    pricePerNight: 1700,
    image: IMAGES.apt10,
    images: [IMAGES.apt10, IMAGES.bed1, IMAGES.kit2, IMAGES.apt1],
    amenities: ['Wi-Fi', 'AC', 'TV', 'Kitchenette', 'Power Backup'],
    description: 'An affordable and comfortable 1BHK apartment in KPHB with excellent metro connectivity. Great for solo travelers and couples wanting a well-maintained space with easy access to the rest of Hyderabad.',
    highlights: ['Metro access nearby', 'Value for money', 'Fully furnished', 'All utilities included'],
    houseRules: [
      'Check-in: 2:00 PM | Check-out: 11:00 AM',
      'No smoking inside',
      'Guests must carry valid ID',
    ],
    featured: false,
  },
  {
    id: 'kp2',
    slug: 'comfortable-2bhk-kphb',
    name: 'Comfortable 2BHK in KPHB',
    area: 'KPHB',
    areaSlug: 'kphb',
    type: '2BHK',
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    pricePerNight: 2800,
    image: IMAGES.apt11,
    images: [IMAGES.apt11, IMAGES.bed2, IMAGES.kit1, IMAGES.apt2],
    amenities: ['Wi-Fi', 'AC', 'TV', 'Full Kitchen', 'Washing Machine', 'Power Backup', 'Parking'],
    description: 'A well-priced 2BHK apartment in KPHB with great metro connectivity and all modern amenities. Comfortable bedrooms, a fully equipped kitchen, and a welcoming living area make this a smart choice for families and corporate stays.',
    highlights: ['Good value', 'Metro connectivity', 'Spacious layout', 'Fully equipped kitchen'],
    houseRules: [
      'Check-in: 2:00 PM | Check-out: 11:00 AM',
      'No smoking inside the apartment',
      'Maximum occupancy: 4 guests',
    ],
    featured: false,
  },
  // --- GOWLIDODDY ---
  {
    id: 'gw1',
    slug: 'quiet-1bhk-gowlidoddy',
    name: 'Quiet 1BHK in Gowlidoddy',
    area: 'Gowlidoddy',
    areaSlug: 'gowlidoddy',
    type: '1BHK',
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    pricePerNight: 1850,
    image: IMAGES.apt12,
    images: [IMAGES.apt12, IMAGES.bed1, IMAGES.kit2, IMAGES.apt3],
    amenities: ['Wi-Fi', 'AC', 'TV', 'Kitchenette', 'Power Backup'],
    description: 'A peaceful and tastefully furnished 1BHK apartment in Gowlidoddy, close to Jubilee Hills. A quiet retreat with modern comforts, ideal for solo travelers or couples wanting a relaxed atmosphere away from the bustle.',
    highlights: ['Quiet neighbourhood', 'Near Jubilee Hills', 'Tasteful furnishings', 'All essentials provided'],
    houseRules: [
      'Check-in: 2:00 PM | Check-out: 11:00 AM',
      'No smoking inside',
      'Pets not permitted',
      'Guests must carry valid ID',
    ],
    featured: false,
  },
  {
    id: 'gw2',
    slug: 'premium-2bhk-gowlidoddy',
    name: 'Premium 2BHK in Gowlidoddy',
    area: 'Gowlidoddy',
    areaSlug: 'gowlidoddy',
    type: '2BHK',
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    pricePerNight: 3100,
    image: IMAGES.apt1,
    images: [IMAGES.apt1, IMAGES.bed2, IMAGES.kit1, IMAGES.apt5],
    amenities: ['Wi-Fi', 'AC', 'TV', 'Full Kitchen', 'Washing Machine', 'Parking', 'Power Backup'],
    description: 'A premium 2BHK apartment in the tranquil Gowlidoddy locality. Features quality furnishings, two comfortable bedrooms, and a fully equipped kitchen. Well-suited for families or couples on extended stays who value peace and privacy.',
    highlights: ['Tranquil setting', 'Quality furnishings', 'Two private bedrooms', 'Parking included'],
    houseRules: [
      'Check-in: 2:00 PM | Check-out: 11:00 AM',
      'No smoking inside the apartment',
      'Maximum occupancy: 4 guests',
    ],
    featured: false,
  },
]

export const AMENITY_ICONS: Record<string, string> = {
  'Wi-Fi': 'wifi',
  'AC': 'wind',
  'TV': 'tv',
  'Full Kitchen': 'utensils',
  'Kitchenette': 'utensils',
  'Washing Machine': 'shirt',
  'Parking': 'car',
  'Power Backup': 'zap',
  'Housekeeping': 'sparkles',
  'Lift': 'arrow-up',
}

export const FEATURES = [
  {
    icon: 'bed',
    title: 'Fully Furnished Homes',
    description: 'Move in and feel at home',
  },
  {
    icon: 'wifi',
    title: 'High-Speed Wi-Fi',
    description: 'Stay connected always',
  },
  {
    icon: 'map-pin',
    title: 'Prime Locations',
    description: 'Gachibowli, Kondapur & more',
  },
  {
    icon: 'shield-check',
    title: 'Safe & Secure',
    description: 'Verified, well-maintained stays',
  },
  {
    icon: 'calendar',
    title: 'Flexible Stays',
    description: 'Short or long-term options',
  },
]

export const getPropertyBySlug = (slug: string): Property | undefined =>
  PROPERTIES.find((p) => p.slug === slug)

export const getLocationBySlug = (slug: string): Location | undefined =>
  LOCATIONS.find((l) => l.slug === slug)

export const getPropertiesByArea = (areaSlug: string): Property[] =>
  PROPERTIES.filter((p) => p.areaSlug === areaSlug)

export const getFeaturedProperties = (): Property[] =>
  PROPERTIES.filter((p) => p.featured)

