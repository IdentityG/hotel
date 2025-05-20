/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors
        teal: {
          DEFAULT: '#1A5F7A',
          light: '#3A8891'
        },
        sand: {
          DEFAULT: '#E6D2AA',
          dark: '#D4BC79'
        },
        terracotta: {
          DEFAULT: '#C27664',
          light: '#D9938A'
        },
        
        // Background colors
        ivory: '#F8F4EA',
        charcoal: '#2C3333',
        
        // Text color
        slate: '#395B64',
      },
      fontFamily: {
        serif: ['var(--font-kaisei-opti)'],
        sans: ['var(--font-plus-jakarta-sans)'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #1A5F7A, #3A8891)',
      },
    },
  },
  plugins: [],
}