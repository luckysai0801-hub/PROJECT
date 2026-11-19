/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#F7F5EF',
        forest: '#1F3528',
        sage: '#82927A',
        sand: '#E8D7C2',
        charcoal: '#292B27',
        'forest-light': '#2A4A38',
        'forest-dark': '#162619',
        'sage-light': '#A8B5A0',
        'sand-light': '#F0E8D8',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '16/9': '16 / 9',
      },
      boxShadow: {
        'card': '0 2px 12px rgba(31, 53, 40, 0.08)',
        'card-hover': '0 8px 32px rgba(31, 53, 40, 0.14)',
      },
    },
  },
  plugins: [],
}

